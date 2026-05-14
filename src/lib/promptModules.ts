/**
 * Single source of truth for all reusable prompt text.
 * Every shared constraint, DoD rule, acceptance pattern, and delivery
 * guidance lives here. Other files import — never duplicate.
 */

export type ModuleLang = 'zh' | 'en';

// ─── Shared Constraints ───────────────────────────────────────────

export const CONSTRAINTS_ZH = `【约束】
- 全部本地处理，数据不上传外部服务。
- 缺真实数据时先造脱敏 sample-data，不等用户提供文件才开工。
- 不引入不存在的 npm 包；不确定时先查 npm view。
- 不写死 API Key、绝对路径、个人邮箱或内网地址。
- 输出不覆盖原文件，冲突加时间后缀。
- 同一问题 3 次失败 → 降级边缘功能，先交付主流程。`;

export const CONSTRAINTS_EN = `[Constraints]
- All processing local; no data uploads.
- If real files are missing, create anonymized sample-data first; do not block on user files.
- Do not invent npm packages; verify with npm view first.
- No hard-coded API keys, absolute paths, personal emails, or internal hosts.
- Never overwrite inputs; timestamp conflicts.
- Same bug fails 3 times → downgrade edge features, ship the main flow.`;

// ─── DoD / Stop-Vibe-Coding ───────────────────────────────────────

export const DOD_ZH = `【DoD / 停止 Vibe Coding】
完成标准（逐条检查，全部通过才停手）：
□ 能启动；示例数据跑通真实主流程并产生产物
□ 异常路径友好（空数据、错格式、取消、重名冲突 → 不闪退）
□ lint/typecheck/test/build 通过
□ 已用 sample-data 完成 启动 → 主流程 → 导出/保存 烟测，并记录结果
□ 有 setup/dev/package 脚本、README、使用说明、已知限制、示例数据
满足即停，新想法写 v2；同一 bug 3 次失败就降级或禁用边缘功能，先交付主流程。`;

export const DOD_EN = `[DoD / Stop-Vibe-Coding]
Done criteria (check each — all must pass before reporting):
☐ Launches; sample data creates the artifact
☐ Edge cases are friendly (empty data, bad format, cancel, name conflict → no crash)
☐ lint/typecheck/test/build pass
☐ Smoke test: launch → main flow → export/save with sample-data; note result
☐ setup/dev/package scripts, README, guide, limits, and samples exist
Stop; new ideas go to v2. Same bug fails 3 times: downgrade/disable the edge feature and ship the main flow.`;

// ─── Desktop Delivery Contract ────────────────────────────────────

export const DELIVERY_CONTRACT_ZH = `【桌面交付契约】
- 交付本地可运行应用，不是方案；第一屏就是主工作台。M1≤15 分钟先出可启动窗口+示例数据/试用模式，M2 接通真实主流程，M3 补异常/UI/隐私，M4 测试+打包+文档。
- 没有用户真实文件时，先创建贴近业务的脱敏 sample-data 并继续推进。
- 每个里程碑卡住时的降级策略：M1 卡住 → 换更简单的实现方式先出窗口；M2 卡住 → 先跑通核心 3 步，边缘路径后面补；同一问题 3 次失败 → 降级或禁用边缘功能，先交付主流程。
- 每次汇报≤6行：完成、验证、跳过原因、下一步+预计时间，减少小白用户等待焦虑。
- 用业务语言写按钮、错误和说明；支持拖拽+系统打开/保存；空/错格式/取消/无权限/大文件/重名冲突都友好处理，不暴露堆栈。
- 路径兼容中文、空格、括号、长路径和 Windows/macOS 分隔差异；Windows 快捷键用 Ctrl/Alt，macOS 用 Command/Option。
- 默认离线、本地处理；不覆盖原文件；不写死密钥、绝对路径、个人邮箱或内网地址。
- 项目分层：desktop shell / controlled API / UI / core / tests / sample-data / docs；IPC 白名单化，UI 不直接执行本地命令。
- 真实接线：导入、预览、生成/保存、导出、错误状态都可用；不把 TODO、空函数、未用大组件或假数据当完成。`;

export const DELIVERY_CONTRACT_EN = `[Desktop Delivery Contract]
- Runnable local app, not advice; workspace first. M1≤15 min gets a launchable window + sample/demo data; M2 real flow; M3 errors/UI/privacy; M4 tests+package+docs.
- No files? make anonymized sample-data; continue.
- Milestone fallbacks: M1 stalls → simplify approach, get a window up first; M2 stalls → wire core 3 steps, fill edges later; same bug fails 3 times → downgrade/disable edge features, ship the main flow.
- Updates ≤6 lines: done, verification, skipped reason, next+ETA.
- Business labels/errors/help for non-technical AI beginners; drag/drop + native open/save; bad/cancel/no-permission/large/conflict cases are friendly, no raw stacks.
- Paths handle Chinese, spaces, parentheses, long paths, and Windows/macOS separators; use Ctrl/Alt on Windows and Command/Option on macOS.
- Offline/local; never overwrite inputs; no hard-coded secrets, absolute paths, personal emails, or internal hosts.
- Layers: shell / controlled API / UI / core / tests / sample-data / docs; IPC allowlisted; renderer never runs local commands.
- Real wiring: import, preview, generate/save, export, and error states work; TODOs, empty functions, or fake data do not count as done.`;

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

export const RECIPE_CONSTRAINTS_ZH = `- 约束：本地离线/不联网；不覆盖原文件；不造包名；缺真实数据先造脱敏 sample-data。`;
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
