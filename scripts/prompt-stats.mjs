import { build } from 'esbuild';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const args = new Set(process.argv.slice(2));
const json = args.has('--json');
const limitArg = process.argv.find((arg) => arg.startsWith('--limit='));
const limit = Number(limitArg?.split('=')[1] ?? 10);

const CONTENT_SIGNALS = {
  zh: [
    ['AI 小白', '不懂代码', '小白'],
    ['sample-data', '示例数据'],
    ['烟测'],
    ['不覆盖原文件'],
    ['不写死', '不写死密钥'],
    ['真实接线'],
    ['友好', '不闪退'],
    ['降级', '3 次失败'],
  ],
  en: [
    ['AI beginner', 'non-technical', 'non-developer'],
    ['sample-data', 'sample data'],
    ['Smoke test', 'smoke-tested'],
    ['Never overwrite', 'never overwrite'],
    ['No hard-coded', 'no hard-coded'],
    ['Real wiring'],
    ['friendly', 'no crash'],
    ['downgrade', '3 times'],
  ],
};

const STRUCTURE_SIGNALS = {
  zh: [
    ['目标：', '【目标】'],
    ['功能：', '【核心功能】'],
    ['平台：', '【平台与技术】', '【环境】'],
    ['【快速交付】', '【交付】'],
    ['完成标准', '验收清单', '自检清单'],
    ['【约束】', '【实现纪律 / 安全】'],
    ['最终只报', '最终汇报', '使用说明'],
  ],
  en: [
    ['Goal:', '[Goal]'],
    ['Features:', '[Core Features]'],
    ['Platform:', '[Platform & Stack]'],
    ['[Fast Delivery]', '[Delivery]', '[Desktop Delivery Contract]'],
    ['Done criteria', 'Acceptance checklist', 'Self-check'],
    ['[Constraints]', '[Implementation / Safety]'],
    ['Final report', 'user guide', 'guide'],
  ],
};

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

function signalCount(text, lang, signals) {
  const normalized = text.toLowerCase();
  return signals[lang].filter((alternatives) =>
    alternatives.some((phrase) => normalized.includes(phrase.toLowerCase()))
  ).length;
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
    const contentSignals = list.map((item) => item.contentSignals);
    const structureSignals = list.map((item) => item.structureSignals);
    const qualityScore = list.map((item) => item.qualityScore);
    return {
      bucket,
      count: list.length,
      avgContentSignals: Number((contentSignals.reduce((sum, value) => sum + value, 0) / list.length).toFixed(1)),
      minContentSignals: Math.min(...contentSignals),
      avgStructureSignals: Number((structureSignals.reduce((sum, value) => sum + value, 0) / list.length).toFixed(1)),
      minStructureSignals: Math.min(...structureSignals),
      avgQualityScore: Number((qualityScore.reduce((sum, value) => sum + value, 0) / list.length).toFixed(1)),
      minQualityScore: Math.min(...qualityScore),
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
    contentSignals: signalCount(item.text, item.lang, CONTENT_SIGNALS),
    structureSignals: signalCount(item.text, item.lang, STRUCTURE_SIGNALS),
  }))
  .map((item) => ({
    ...item,
    qualityScore: item.contentSignals + item.structureSignals,
  }))
  .sort((a, b) => a.qualityScore - b.qualityScore || a.contentSignals - b.contentSignals);

const result = {
  generatedAt: new Date().toISOString(),
  total: rows.length,
  summary: summarize(rows),
  reviewQueue: rows.slice(0, Number.isFinite(limit) ? limit : 10),
};

if (json) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`Prompt quality report (${result.total} final copy prompts)`);
  console.log('Focus: content, structure, safety, verification, and beginner usability coverage.');
  console.table(result.summary);
  console.log(`\nReview queue (${limit} lowest quality-coverage prompts):`);
  console.table(
    result.reviewQueue.map(({ group, id, lang, contentSignals, structureSignals, qualityScore }) => ({
      group,
      id,
      lang,
      contentSignals,
      structureSignals,
      qualityScore,
    }))
  );
  console.log('\nTip: run npm run prompt:stats -- --json for machine-readable output.');
}
