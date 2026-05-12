import { build } from 'esbuild';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const args = new Set(process.argv.slice(2));
const json = args.has('--json');
const limitArg = process.argv.find((arg) => arg.startsWith('--limit='));
const limit = Number(limitArg?.split('=')[1] ?? 10);

const entry = `
import { caseBundles, getCasePrompt } from './src/data/cases/index.ts';
import { recipes, getRecipePrompt } from './src/data/recipes.ts';
import { buildPrompt, DEFAULT_FORM } from './src/lib/promptBuilder.ts';

const sampleState = {
  ...DEFAULT_FORM,
  platform: 'both',
  goal: 'For finance and operations teammates, build a local desktop helper that reduces repetitive Excel work.',
  features: '- Import one or more Excel files\\n- Preview detected fields\\n- Generate a clean result file\\n- Export an exception list',
};

export function collectPrompts() {
  return [
    ...caseBundles.flatMap((bundle) => [
      { group: 'case', id: bundle.slug, lang: 'zh', text: getCasePrompt(bundle, 'zh') },
      { group: 'case', id: bundle.slug, lang: 'en', text: getCasePrompt(bundle, 'en') },
    ]),
    ...recipes.flatMap((recipe) => [
      { group: 'recipe', id: recipe.id, lang: 'zh', text: getRecipePrompt(recipe, 'zh') },
      { group: 'recipe', id: recipe.id, lang: 'en', text: getRecipePrompt(recipe, 'en') },
    ]),
    ...(['starter', 'standard', 'advanced']).flatMap((complexity) => [
      { group: 'generator', id: complexity, lang: 'zh', text: buildPrompt({ ...sampleState, complexity }, 'zh') },
      { group: 'generator', id: complexity, lang: 'en', text: buildPrompt({ ...sampleState, complexity }, 'en') },
    ]),
  ];
}
`;

function estimateTokens(text) {
  const cjk = text.match(/[\u3400-\u9FFF]/gu)?.length ?? 0;
  const compactOther = text.replace(/[\s\u3400-\u9FFF]/gu, '');
  return Math.ceil(cjk * 1.05 + compactOther.length / 4);
}

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return sorted[index];
}

function summarize(rows) {
  const groups = new Map();
  for (const row of rows) {
    const bucket = `${row.group}:${row.lang}`;
    const list = groups.get(bucket) ?? [];
    list.push(row);
    groups.set(bucket, list);
  }

  return [...groups.entries()].map(([bucket, list]) => {
    const chars = list.map((item) => item.chars);
    const tokens = list.map((item) => item.tokens);
    return {
      bucket,
      count: list.length,
      avgChars: Math.round(chars.reduce((sum, value) => sum + value, 0) / list.length),
      p95Chars: percentile(chars, 95),
      maxChars: Math.max(...chars),
      avgTokens: Math.round(tokens.reduce((sum, value) => sum + value, 0) / list.length),
      maxTokens: Math.max(...tokens),
    };
  });
}

const { outputFiles } = await build({
  stdin: {
    contents: entry,
    resolveDir: root,
    sourcefile: 'prompt-stats-entry.ts',
    loader: 'ts',
  },
  bundle: true,
  write: false,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  alias: {
    '@': join(root, 'src'),
  },
  tsconfig: join(root, 'tsconfig.json'),
  logLevel: 'silent',
});

const code = outputFiles[0].text;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
const { collectPrompts } = await import(moduleUrl);

const rows = collectPrompts()
  .map((item) => ({
    ...item,
    chars: [...item.text].length,
    bytes: Buffer.byteLength(item.text, 'utf8'),
    tokens: estimateTokens(item.text),
  }))
  .sort((a, b) => b.tokens - a.tokens);

const result = {
  generatedAt: new Date().toISOString(),
  total: rows.length,
  summary: summarize(rows),
  longest: rows.slice(0, Number.isFinite(limit) ? limit : 10),
};

if (json) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`Prompt stats (${result.total} final copy prompts)`);
  console.table(result.summary);
  console.log(`\nTop ${limit} longest prompts:`);
  console.table(
    result.longest.map(({ group, id, lang, chars, tokens }) => ({
      group,
      id,
      lang,
      chars,
      approxTokens: tokens,
    }))
  );
  console.log('\nTip: run npm run prompt:stats -- --json for machine-readable output.');
}
