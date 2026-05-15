/**
 * Single source of truth for all reusable prompt text.
 * Every shared constraint, DoD rule, acceptance pattern, and delivery
 * guidance lives here. Other files import — never duplicate.
 */

export type ModuleLang = 'zh' | 'en';

// ─── Shared Constraints ───────────────────────────────────────────

export const CONSTRAINTS_ZH = `【约束】
- 本地离线，不上传
- 缺真实文件先造脱敏 sample-data
- 不造 npm 包名，不确定先查 npm view
- 不硬编码密钥/路径/邮箱/内网地址
- 不覆盖原文件，冲突加时间戳
- 同 bug 3 次失败→降级边缘功能先交付`;

export const CONSTRAINTS_EN = `[Constraints]
- Local/offline; no uploads
- No real files? create anonymized sample-data first
- No fake npm packages; verify with npm view
- No hardcoded keys/paths/emails/internal hosts
- Never overwrite inputs; timestamp conflicts
- Same bug fails 3 times → downgrade, ship main flow`;

// ─── DoD / Stop-Vibe-Coding ───────────────────────────────────────

export const DOD_ZH = `【DoD / 停止 Vibe Coding】
完成标准（逐条检查，全过才停）：
□ 启动→示例数据跑通主流程→产生产物
□ 空/错格式/取消/重名冲突→友好提示不闪退
□ lint/typecheck/test/build 全过
□ sample-data 烟测：启动→主流程→导出/保存，记录结果
□ setup/dev/package 脚本、README、说明、限制、示例数据齐全
达标即停，新想法记 v2。同 bug 3 败→降级/禁用先交付。`;

export const DOD_EN = `[DoD / Stop-Vibe-Coding]
Done criteria (check each — all must pass):
☐ Launches; sample data creates artifact
☐ Edge cases friendly (empty/bad/cancel/conflict → no crash)
☐ lint/typecheck/test/build pass
☐ Smoke test: launch→main flow→export/save with sample-data; note result
☐ setup/dev/package scripts, README, guide, limits, samples
Stop; new ideas→v2. Same bug fails 3×: downgrade/disable, ship main flow.`;

// ─── Desktop Delivery Contract ────────────────────────────────────

export const DELIVERY_CONTRACT_ZH = `【桌面交付契约】
- 交付可运行应用非方案，首屏即工作台。M1≤15分钟：可启动窗口+示例数据/试用模式；M2：接通真实主流程；M3：异常/UI/隐私；M4：测试+打包+文档。
- 缺真实文件先造脱敏 sample-data 继续。
- 降级：M1 卡住→简化为先出窗口；M2 卡住→先跑通核心3步；同问题3次失败→降级/禁用先交付。
- 汇报≤6行：完成/验证/跳过/下步+预计。
- 按钮/错误/说明用业务语言；拖拽+系统打开/保存；异常友好不暴露堆栈。
- 路径兼容中文/空格/括号/长路径。Windows 快捷键用 Ctrl/Alt，macOS 用 Command/Option。
- 本地离线；不覆盖；不硬编码密钥/路径/邮箱。
- 分层：shell/受控API/UI/core/tests/sample-data/docs；IPC白名单。
- 真实接线：导入/预览/生成保存/导出/错误都可用；不把 TODO、空函数或假数据当完成。`;

export const DELIVERY_CONTRACT_EN = `[Desktop Delivery Contract]
- Deliver runnable app, not advice; workspace first. M1≤15 min: launchable window+sample/demo data; M2: real flow; M3: errors/UI/privacy; M4: tests+package+docs.
- No files? create anonymized sample-data; continue.
- Fallbacks: M1 stalls→simplify, get window up; M2 stalls→wire core 3 steps; same bug 3×→downgrade/disable, ship main flow.
- Updates ≤6 lines: done/verification/skipped/next+ETA.
- Business labels/errors; drag/drop+open/save; edge cases friendly, no raw stacks.
- Paths handle Chinese/spaces/parentheses/long paths. Ctrl/Alt on Windows, Command/Option on macOS.
- Local/offline; never overwrite; no hardcoded keys/paths/emails.
- Layers: shell/controlled API/UI/core/tests/sample-data/docs; IPC allowlisted.
- Real wiring: import/preview/generate save/export/errors work; TODOs/empty functions/fake data do not count as done.`;

// ─── Agent Behavior ───────────────────────────────────────────────

export const AGENT_BEHAVIOR_ZH = `【与用户沟通】
- 用户是业务人员，用业务语言汇报，不展示代码/终端/技术细节
- 提问用选择题（"列名是A还是B？"）
- 汇报≤6行：做了什么/在哪/如何打开/验证/还需什么
- 说"已做好双击打开"，不解释框架/命令`;

export const AGENT_BEHAVIOR_EN = `[How to communicate with the user]
- User is business; use plain language, no code/terminal/tech details
- Ask multiple-choice ("Column A or B?") not open-ended
- Report ≤6 lines: what/where/how to open/verify/needed
- "Done, double-click to open" — no framework/command explanations`;

// ─── Common Acceptance Criteria Items ──────────────────────────────

export const ACCEPTANCE_COMMON_ZH = {
  launchOk: '□ 双击/一条命令启动，第一屏是主工作台',
  sampleFlowOk: '□ 示例数据跑通主流程，产出可检查的文件/表格',
  emptyStateFriendly: '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退',
  pathCompatible: '□ 路径含中文/空格/括号 → 正常工作',
  exportOk: '□ 导出功能正常，文件名带日期/月份',
} as const;

export const ACCEPTANCE_COMMON_EN = {
  launchOk: '☐ Launches by double-click or one command; first screen is the workspace',
  sampleFlowOk: '☐ Sample data completes the main flow, producing a checkable file/sheet',
  emptyStateFriendly: '☐ Empty data, bad format, cancel → friendly message, no crash',
  pathCompatible: '☐ Paths with Chinese/spaces/parentheses → work correctly',
  exportOk: '☐ Export works; filename includes date/month',
} as const;

// ─── Recipe Constraints (shorter, inline format) ───────────────────

export const RECIPE_CONSTRAINTS_ZH = `- 约束：本地离线；不覆盖原文件；不造包名；缺真实数据先造脱敏 sample-data。`;
export const RECIPE_CONSTRAINTS_EN = `- Constraints: local/offline; never overwrite originals; no fake packages; make anonymized sample-data first.`;

// ─── Formatting Helpers ───────────────────────────────────────────

export function deliveryBlock(phases: string[], lang: ModuleLang): string {
  const header = lang === 'zh' ? '【交付】' : '[Delivery]';
  return `${header}\n${phases.map((p, i) => `${i + 1}. ${p}`).join('\n')}`;
}

export function acceptanceChecklist(items: string[], lang: ModuleLang): string {
  const header = lang === 'zh'
    ? '验收清单（全部通过才算完成）：'
    : 'Acceptance checklist (all must pass):';
  return `${header}\n${items.join('\n')}`;
}

// ─── Incremental Helper ───────────────────────────────────────────
// Appends shared constraints to an existing prompt (idempotent via marker).

const CONSTRAINTS_MARKER_ZH = '【约束】';
const CONSTRAINTS_MARKER_EN = '[Constraints]';

export function withSharedConstraints(prompt: string, lang: ModuleLang): string {
  const marker = lang === 'zh' ? CONSTRAINTS_MARKER_ZH : CONSTRAINTS_MARKER_EN;
  if (prompt.includes(marker)) return prompt;
  const constraints = lang === 'zh' ? CONSTRAINTS_ZH : CONSTRAINTS_EN;
  return `${prompt}\n\n${constraints}`;
}

// ─── Full Case Prompt Composer ────────────────────────────────────

type CaseSections = {
  role: string;
  goal: string;
  platform: string;
  features: string;
  style?: string;
  robustness?: string;
  extra?: string;
  deliveryPhases: string[];
  acceptanceItems: string[];
  communication?: string;
};

export function composeCasePrompt(sections: CaseSections, lang: ModuleLang): string {
  const parts: string[] = [];

  parts.push(sections.role);
  parts.push(lang === 'zh' ? '【目标】' : '[Goal]');
  parts.push(sections.goal);
  parts.push(lang === 'zh' ? '【平台与技术】' : '[Platform & Stack]');
  parts.push(sections.platform);
  parts.push(lang === 'zh' ? '【核心功能】' : '[Core Features]');
  parts.push(sections.features);

  if (sections.style) {
    parts.push(lang === 'zh' ? '【界面风格】' : '[Visual Style]');
    parts.push(sections.style);
  }
  if (sections.robustness) {
    parts.push(lang === 'zh' ? '【稳健性】' : '[Robustness]');
    parts.push(sections.robustness);
  }
  if (sections.extra) parts.push(sections.extra);

  parts.push(lang === 'zh' ? CONSTRAINTS_ZH : CONSTRAINTS_EN);
  parts.push(deliveryBlock(sections.deliveryPhases, lang));
  parts.push(acceptanceChecklist(sections.acceptanceItems, lang));

  if (sections.communication) parts.push(sections.communication);

  return parts.join('\n\n');
}

// ─── Full Recipe Prompt Composer ──────────────────────────────────

type RecipeParts = {
  role: string;
  goal: string;
  platform: string;
  stack: string;
  features: string;
  extra?: string;
  acceptance: string;
  packaging: string;
};

export function composeRecipePrompt(parts: RecipeParts, lang: ModuleLang): string {
  const lines: string[] = [];

  lines.push(parts.role);
  lines.push(lang === 'zh' ? `- 目标：${parts.goal}` : `- Goal: ${parts.goal}`);
  lines.push(lang === 'zh' ? `- 平台：${parts.platform}` : `- Platform: ${parts.platform}`);
  lines.push(lang === 'zh' ? `- 做法：${parts.stack}` : `- Stack: ${parts.stack}`);
  lines.push(lang === 'zh' ? `- 功能：${parts.features}` : `- Features: ${parts.features}`);

  if (parts.extra) lines.push(parts.extra);

  lines.push(lang === 'zh' ? RECIPE_CONSTRAINTS_ZH : RECIPE_CONSTRAINTS_EN);
  lines.push(lang === 'zh' ? `- 验收：${parts.acceptance}` : `- Acceptance: ${parts.acceptance}`);
  lines.push(parts.packaging);

  return lines.join('\n');
}
