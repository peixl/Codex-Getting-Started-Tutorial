import {
  QUICK_START_ZH,
  QUICK_START_EN,
  ANTI_PATTERNS_ZH,
  ANTI_PATTERNS_EN,
  DOD_ZH,
  DOD_EN,
  FINAL_REPORT_ZH,
  FINAL_REPORT_EN,
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

${DOD_ZH}

${FINAL_REPORT_ZH}`;

const QUALITY_TAIL_EN = `[High-Quality Delivery Addendum]
If the prompt says to wait for confirmation, summarize in ≤8 lines, then implement/run/fix/verify; stop only for real files, accounts, certificates, or irreversible actions.

${QUICK_START_EN}

${ANTI_PATTERNS_EN}

${DOD_EN}

${FINAL_REPORT_EN}`;

// ─── Blank-line folding ──────────────────────────────────────────

function dedupeBlankLines(prompt: string): string {
  return prompt.replace(/\n{3,}/g, '\n\n').trim();
}

// ─── Public API ──────────────────────────────────────────────────

export function withDesktopQualityBar(prompt: string, lang: PromptQualityLang): string {
  const marker = lang === 'zh' ? QUALITY_MARKER_ZH : QUALITY_MARKER_EN;
  const compacted = dedupeBlankLines(prompt);
  if (compacted.includes(marker)) return compacted;

  const tail = lang === 'zh' ? QUALITY_TAIL_ZH : QUALITY_TAIL_EN;
  return `${compacted}\n\n${tail}`;
}
