import {
  QUICK_START_ZH,
  QUICK_START_EN,
  ANTI_PATTERNS_ZH,
  ANTI_PATTERNS_EN,
  DOD_ZH,
  DOD_EN,
  type ModuleLang,
} from './promptModules';

export type PromptQualityLang = ModuleLang;

const QUALITY_MARKER_ZH = '【高质量交付补充】';
const QUALITY_MARKER_EN = '[High-Quality Delivery Addendum]';

// ─── Anti-Patterns (imported from promptModules) ────────────────

// ─── Quality Tail Assembly ───────────────────────────────────────

const QUALITY_TAIL_ZH = `【高质量交付补充】
若上文要求等待确认，改为：≤8 行摘要后直接实现、运行、修复、验证；只在需要真实文件、账号、证书或不可逆操作时停下。

${QUICK_START_ZH}

${ANTI_PATTERNS_ZH}

${DOD_ZH}`;

const QUALITY_TAIL_EN = `[High-Quality Delivery Addendum]
If the prompt says to wait for confirmation, summarize in ≤8 lines, then implement/run/fix/verify; stop only for real files, accounts, certificates, or irreversible actions.

${QUICK_START_EN}

${ANTI_PATTERNS_EN}

${DOD_EN}`;

// ─── Legacy Cleanup ──────────────────────────────────────────────

function compactLegacyBoilerplate(prompt: string): string {
  return prompt
    .replace(/\n?请先给\s*10\s*行以内方案摘要，然后直接实现、运行和验证。/g, '')
    .replace(/\n?先给\s*(?:10\s*行以内|简短)方案摘要，然后直接实现、运行和验证。(?:全程)?中文(?:沟通)?。/g, '')
    .replace(/\n?Start with a brief plan summary, then implement, run, and verify\.(?: English throughout\.)?/g, '')
    .replace(/不确定的地方直接问我/g, '只有真实阻塞问题再问我')
    .replace(/Ask me if unsure\./g, 'Ask only for true blockers.')
    .replace(/请先确认方案再动手/g, '')
    .replace(/Please confirm the plan before starting/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ─── Public API ──────────────────────────────────────────────────

export function withDesktopQualityBar(prompt: string, lang: PromptQualityLang): string {
  const marker = lang === 'zh' ? QUALITY_MARKER_ZH : QUALITY_MARKER_EN;
  const compacted = compactLegacyBoilerplate(prompt);
  if (compacted.includes(marker)) return compacted;

  const tail = lang === 'zh' ? QUALITY_TAIL_ZH : QUALITY_TAIL_EN;
  return `${compacted}\n\n${tail}`;
}
