export type Platform = 'windows' | 'mac' | 'both';
export type TechStack = 'electron' | 'tauri' | 'pyqt' | 'auto';
export type UiStyle = 'minimal' | 'dark' | 'fresh' | 'business';
export type Storage = 'localFile' | 'sqlite' | 'none';
export type Complexity = 'starter' | 'standard' | 'advanced';

export type Extras = {
  offline: boolean;
  bilingual: boolean;
  exportable: boolean;
  shortcut: boolean;
  accessibility: boolean;
};

export type FormState = {
  platform: Platform;
  tech: TechStack;
  ui: UiStyle;
  storage: Storage;
  complexity: Complexity;
  goal: string;
  features: string;
  extras: Extras;
  custom: string;
};

export const DEFAULT_FORM: FormState = {
  platform: 'windows',
  tech: 'auto',
  ui: 'minimal',
  storage: 'localFile',
  complexity: 'standard',
  goal: '',
  features: '',
  extras: {
    offline: true,
    bilingual: false,
    exportable: true,
    shortcut: false,
    accessibility: false,
  },
  custom: '',
};

export type PromptLang = 'zh' | 'en';

const PLATFORM_ZH: Record<Platform, string> = {
  windows: '只做 Windows 桌面应用（Windows 10 / 11）',
  mac: '只做 macOS 桌面应用（适配常见新版 macOS）',
  both: '跨平台桌面应用：同时支持 Windows 和 macOS',
};
const PLATFORM_EN: Record<Platform, string> = {
  windows: 'Windows desktop app (Windows 10 / 11)',
  mac: 'macOS desktop app (recent macOS versions)',
  both: 'Cross-platform desktop app: both Windows and macOS',
};

const ROLE_DOMAIN_ZH: Record<Platform, string> = {
  windows: 'Windows 桌面软件',
  mac: 'macOS 桌面软件',
  both: 'Windows 和 macOS 桌面软件',
};
const ROLE_DOMAIN_EN: Record<Platform, string> = {
  windows: 'Windows desktop apps',
  mac: 'macOS desktop apps',
  both: 'Windows and macOS desktop apps',
};

const ACCESSIBILITY_ZH: Record<Platform, string> = {
  windows: '适配 Windows 讲述人',
  mac: '适配 macOS VoiceOver',
  both: '适配 Windows 讲述人和 macOS VoiceOver',
};
const ACCESSIBILITY_EN: Record<Platform, string> = {
  windows: 'Accessible; Windows Narrator compatible',
  mac: 'Accessible; macOS VoiceOver compatible',
  both: 'Accessible; Windows Narrator and macOS VoiceOver compatible',
};

const SHORTCUT_ZH: Record<Platform, string> = {
  windows: '常用操作给快捷键；Windows 使用 Ctrl / Alt，避开系统快捷键',
  mac: '常用操作给快捷键；macOS 使用 Command / Option，避开系统快捷键',
  both: '常用操作给快捷键：Windows 使用 Ctrl / Alt，macOS 使用 Command / Option；同功能保持平台习惯',
};
const SHORTCUT_EN: Record<Platform, string> = {
  windows: 'Shortcuts for common actions using Windows-style Ctrl / Alt combinations; avoid system shortcuts',
  mac: 'Shortcuts for common actions using macOS-style Command / Option combinations; avoid system shortcuts',
  both: 'Shortcuts: Windows uses Ctrl / Alt, macOS uses Command / Option; keep actions familiar per platform',
};

const TECH_ZH: Record<TechStack, string> = {
  electron: 'Electron + React + TypeScript（办公文件/表格/PDF/图片首选）。TS strict；contextIsolation+sandbox 开，nodeIntegration 关，preload 最小 IPC。',
  tauri: 'Tauri + React + TypeScript（体积小、启动快）；仅 Rust 就绪才选，命令权限按需白名单。',
  pyqt: 'Python + PyQt6（极简单窗口工具）；Python ≥3.10，venv/uv 管依赖，早测 PyInstaller/briefcase。',
  auto: '默认 Electron + React + TypeScript；单窗口本地脚本可选 PyQt6；Tauri 仅用户要求且 Rust 就绪。先 1 行说明取舍。',
};
const TECH_EN: Record<TechStack, string> = {
  electron: 'Electron + React + TypeScript (office files/PDF/images). TS strict; contextIsolation+sandbox on, nodeIntegration off, minimal preload IPC.',
  tauri: 'Tauri + React + TypeScript (small, fast). Use only when Rust is ready; allowlist commands on demand.',
  pyqt: 'Python + PyQt6 (tiny single-window tools). Python ≥3.10; venv/uv deps; verify PyInstaller/briefcase early.',
  auto: 'Default to Electron + React + TypeScript; use PyQt6 only for a tiny local-script window; use Tauri only if requested and Rust is ready. State the choice in one line.',
};

const UI_ZH: Record<UiStyle, string> = {
  minimal: '简洁：浅色底、清晰层级、适中留白，控件像原生桌面工具',
  dark: '深色：跟随系统深色，背景与文字对比清楚，层级明确，不用纯黑',
  fresh: '清新：浅色底 + 少量强调色 + 柔和分隔，不用大渐变/插画/装饰',
  business: '业务型：信息密度高、表格清晰、分隔柔和，适合反复处理数据',
};
const UI_EN: Record<UiStyle, string> = {
  minimal: 'Minimal: light bg, clear hierarchy, moderate whitespace, native-feeling controls',
  dark: 'Dark: follow system dark mode with clear contrast and hierarchy; avoid pure black',
  fresh: 'Fresh: light surfaces, restrained accents, subtle dividers; no large gradients/illustrations/flourishes',
  business: 'Business: dense info, clean tables, subtle dividers; built for repeated data work',
};

const STORAGE_ZH: Record<Storage, string> = {
  localFile: '存到本地文件（Excel / CSV / JSON），简单可迁移',
  sqlite: '本地 SQLite，适合千~万级数据',
  none: '无需持久化，运行完即可',
};
const STORAGE_EN: Record<Storage, string> = {
  localFile: 'Local files (Excel / CSV / JSON) — simple, portable',
  sqlite: 'Local SQLite — good for thousands to tens of thousands of rows',
  none: 'No persistence; stateless per run',
};

const COMPLEXITY_ZH: Record<Complexity, string> = {
  starter: '最小可用版：只做核心流程，少设置/少权限/少边缘功能。',
  standard: '标准业务版：主流程、示例数据、友好错误、导出、基础测试、打包脚本。',
  advanced: '团队增强版：加设置、历史、权限/隐私、批量处理、恢复记录和更完整测试。',
};
const COMPLEXITY_EN: Record<Complexity, string> = {
  starter: 'Starter MVP: one core workflow; few settings/permissions/edge features.',
  standard: 'Standard business version: main flow, sample data, friendly errors, export, basic tests, packaging scripts.',
  advanced: 'Team-ready: add settings, history, permission/privacy, batch processing, recovery records, broader tests.',
};

const FONT_ZH: Record<Platform, string> = {
  windows: '字体优先使用 Segoe UI、微软雅黑',
  mac: '字体优先使用系统字体（San Francisco / 苹方）',
  both: '字体使用系统默认（Windows 上用 Segoe UI / 微软雅黑，macOS 上用 San Francisco / 苹方）',
};
const FONT_EN: Record<Platform, string> = {
  windows: 'Use system fonts (Segoe UI / Microsoft YaHei)',
  mac: 'Use system fonts (San Francisco / PingFang)',
  both: 'Use system fonts (Segoe UI / Microsoft YaHei on Windows, San Francisco / PingFang on macOS)',
};

function packageLine(platform: Platform, lang: PromptLang) {
  if (lang === 'zh') {
    switch (platform) {
      case 'windows':
        return '生成 Windows 安装包（优先 .exe，必要时 .msi）；无法签名则出可运行未签名包，并在 README 写清首次打开提示。';
      case 'mac':
        return '生成 macOS .dmg；无法签名/公证则出可运行未签名包，并在 README 写清首次打开安全提示。';
      case 'both':
        return '生成 Windows 安装包和 macOS .dmg；本机不能跨平台打包时，配脚本并写清命令、签名限制和未签名试用方式。';
    }
  } else {
    switch (platform) {
      case 'windows':
        return 'Final: build a Windows installer (prefer .exe; .msi if useful). If unsigned, build a runnable package and document first-launch warnings.';
      case 'mac':
        return 'Final: build a macOS .dmg installer. If unsigned/not notarized, build a runnable package and document first-launch warnings.';
      case 'both':
        return 'Final: build a Windows installer and a macOS .dmg installer; if this machine cannot do both, configure scripts and document commands, signing limits, and unsigned trial.';
    }
  }
}

function deliveryZh(complexity: Complexity): string {
  if (complexity === 'starter') {
    return `1. 先给 ≤6 行摘要：目标 / 主流程 / 技术栈 / M1。
2. 只问真实阻塞问题（真实文件、账号、证书、不可逆操作）；其他合理假设并继续。
3. M1≤15 分钟：可启动窗口 + 主工作台 + 脱敏 sample-data/试用模式 + 一行假结果，先让用户看到成果。M1 卡住 → 换更简单的实现方式，不要死磕。
4. M2 接通真实主流程并跑示例数据；随后补最必要的错误提示、测试、打包脚本和说明。同一问题 3 次失败 → 降级边缘功能，先交付主流程。`;
  }

  if (complexity === 'advanced') {
    return `1. 先给 ≤8 行摘要：目标 / 主流程 / 技术栈 / 验收 / M1 / 风险。
2. 最多问 3 个真实阻塞问题；其他合理假设并继续实现、运行、修复、验证。
3. M1≤15 分钟：可启动窗口 + 主工作台 + 脱敏 sample-data/试用模式 + 一行假结果。M1 卡住 → 换更简单方案先出窗口。
4. M2 接通真实主流程：导入/填写 → 预览 → 生成/保存。M2 卡住 → 先跑通核心 3 步，边缘路径后面补。
5. M3 补设置、历史、批量、权限/隐私、撤销/恢复和团队使用状态；M4 跑完整验证、打包、文档。
6. 里程碑汇报 ≤6 行：完成 / 验证 / 跳过原因 / 下一步+预计时间。同一问题 3 次失败 → 降级或禁用，先交付主流程。`;
  }

  return `1. 先给 ≤8 行摘要：目标 / 主流程 / 技术栈 / 验收 / M1。
2. 最多问 3 个真实阻塞问题（真实文件、账号、证书、不可逆操作）；其他合理假设并继续。
3. M1≤15 分钟：可启动窗口 + 主工作台 + 脱敏 sample-data/试用模式 + 一行假结果，先让用户看到成果。M1 卡住 → 换方案先出窗口。
4. M2 接通真实主流程：导入/填写 → 预览 → 生成/保存；M3 补异常、隐私、撤销/恢复、UI；M4 测试、打包、文档。
5. 里程碑汇报 ≤6 行，只写：完成 / 验证 / 跳过原因 / 下一步+预计时间。同一问题 3 次失败 → 降级边缘功能，先交付主流程。`;
}

function deliveryEn(complexity: Complexity): string {
  if (complexity === 'starter') {
    return `1. Start with a ≤6-line summary: goal / main flow / stack / M1.
2. Ask only for true blockers (real files, accounts, certificates, irreversible actions); otherwise assume reasonably and continue.
3. M1≤15 min: launchable window + workspace + anonymized sample/demo data + one fake result. If M1 stalls, simplify the approach — get a window up first.
4. M2 wires the real main flow and runs sample data; then add essential errors, tests, package script, and guide. Same bug fails 3 times → downgrade edge features, ship the main flow.`;
  }

  if (complexity === 'advanced') {
    return `1. Start with a ≤8-line summary: goal / main flow / stack / acceptance / M1 / risks.
2. Ask at most 3 truly blocking questions; otherwise assume reasonably and continue implementing, running, fixing, and verifying.
3. M1≤15 min: launchable window + workspace + anonymized sample/demo data + one fake result. If M1 stalls, simplify — get a window first.
4. M2 wires the real main flow: import/fill → preview → generate/save. If M2 stalls, wire the core 3 steps first, fill edges later.
5. M3 adds settings, history, batch, permissions/privacy, undo/recovery, and team-use states. M4 runs full verification, packaging, and docs.
6. Milestone updates are ≤6 lines: done / verification / skipped reason / next+ETA. Same bug fails 3 times → downgrade or disable, ship the main flow.`;
  }

  return `1. Start with a ≤8-line summary: goal / main flow / stack / acceptance / M1.
2. Ask at most 3 truly blocking questions (real files, accounts, certificates, irreversible actions); otherwise assume reasonably and continue.
3. M1≤15 min: launchable window + workspace + anonymized sample/demo data + one fake result. If M1 stalls, simplify — get a window up first.
4. M2 wires the real main flow: import/fill → preview → generate/save. M3 adds errors, privacy, undo/recovery, UI. M4 runs tests, packaging, docs.
5. Milestone updates are ≤6 lines: done / verification / skipped reason / next+ETA. Same bug fails 3 times → downgrade edge features, ship the main flow.`;
}

function dodZh(state: FormState): string {
  const pack = packageLine(state.platform, 'zh');
  if (state.complexity === 'starter') {
    return `完成标准（逐条检查，全部通过才停手）：
- 能双击或一条命令启动，第一屏就是主工作台。
- 示例数据跑通真实主流程，并产生文件/图/表格等可检查产物。
- 至少覆盖空数据、错格式、取消、重名冲突，不闪退。
- 核心逻辑有测试；lint、类型检查、构建通过；无 TODO、空函数、假接线冒充完成。
- 有 README、≤300 字使用说明、sample-data 和 package/dev 脚本；${pack}
满足以上就最终汇报并停手；新想法写进已知限制。`;
  }

  if (state.complexity === 'advanced') {
    return `完成标准（逐条检查，全部通过才停手）：
- 能双击或一条命令启动，第一屏就是主工作台。
- 示例数据和至少 2 个异常样例跑通真实主流程，并产生可检查产物。
- 空数据、错格式、取消、无权限、重名冲突、大文件、重复数据都有友好状态，不闪退。
- lint、类型检查、测试、构建通过；核心逻辑、导入导出、错误分支都有自动化测试；无 TODO、空函数、假接线冒充完成。
- 有 setup/dev/package 脚本、README、≤500 字使用说明、已知限制（含 v2 想法）、sample-data、恢复/备份说明，以及 ${pack}
满足以上就最终汇报并停手；新想法写进已知限制。同一问题连续 3 次失败就降级或禁用边缘功能，先交付主流程。`;
  }

  return `完成标准（逐条检查，全部通过才停手）：
- 能双击或一条命令启动，第一屏就是主工作台。
- 示例数据跑通真实主流程，并产生文件/图/表格等可检查产物。
- 空数据、错格式、取消、无权限、重名冲突、大文件都有友好状态，不闪退。
- lint、类型检查、测试、构建通过；核心逻辑至少 1 个自动化测试；无 TODO、空函数、假接线冒充完成。
- 有 setup/dev/package 脚本、README、≤500 字使用说明、已知限制（含 v2 想法）、sample-data，以及 ${pack}
满足以上就最终汇报并停手；新想法写进已知限制。同一问题连续 3 次失败就降级或禁用边缘功能，先交付主流程。`;
}

function dodEn(state: FormState): string {
  const pack = packageLine(state.platform, 'en');
  if (state.complexity === 'starter') {
    return `Done criteria (check each — all must pass before reporting):
- App launches by double-click or one command; first screen is the workspace.
- Sample data completes the real flow and creates a checkable artifact.
- Empty data, bad formats, cancel, and name conflicts are friendly, not crashes.
- Core logic has a test; lint, typecheck, and build pass; no TODOs, empty functions, or fake wiring count as done.
- README, ≤300-word guide, sample-data, package/dev scripts, and ${pack}
When these hold, send the final report and stop. Put new ideas in known limitations.`;
  }

  if (state.complexity === 'advanced') {
    return `Done criteria (check each — all must pass before reporting):
- App launches by double-click or one command; first screen is the workspace.
- Sample data and at least 2 bad-path samples complete the real flow and create checkable artifacts.
- Empty data, bad formats, cancel, no permission, name conflicts, large files, and duplicates have friendly states, not crashes.
- lint, typecheck, tests, and build pass; core logic, import/export, and error branches have automated tests; no TODOs, empty functions, or fake wiring count as done.
- setup/dev/package scripts, README, ≤500-word guide, known limitations with v2 ideas, sample-data, recovery/backup notes, and ${pack}
When these hold, send the final report and stop. If the same bug fails 3 times, downgrade or disable the edge feature and ship the main flow.`;
  }

  return `Done criteria (check each — all must pass before reporting):
- App launches by double-click or one command; first screen is the workspace.
- Sample data completes the real flow and produces a checkable file/image/sheet artifact.
- Empty data, bad formats, cancel, no permission, name conflicts, and large files have friendly states, not crashes.
- lint, typecheck, tests, and build pass; core logic has at least one automated test; no TODOs, empty functions, or fake wiring count as done.
- setup/dev/package scripts, README, ≤500-word user guide, known limitations with v2 ideas, sample-data, and ${pack}
When these hold, send the final report and stop. Put new ideas in known limitations. If the same bug fails 3 times, downgrade or disable the edge feature and ship the main flow.`;
}

function uxZh(complexity: Complexity): string {
  if (complexity === 'starter') {
    return `- 主流程 ≤3 步：导入/填写 → 预览 → 生成/保存；第一屏是可用工作台。
- 用系统打开/保存对话框和剪贴板；支持拖拽；完成后给"打开输出文件夹"。
- 路径兼容中文、空格、括号和 Windows/macOS 分隔差异；每页有空/加载/成功/失败状态。`;
  }

  const base = `- 主流程 ≤3 步：导入/填写 → 预览 → 生成/保存；第一屏是可用工作台，不做落地页。
- 用系统打开/保存对话框、应用数据目录、剪贴板；支持拖拽；完成后给"打开输出文件夹"。
- 路径兼容中文、空格、括号、长路径和 Windows/macOS 分隔差异；适配高 DPI、窗口尺寸和深浅模式。
- 每页有空/加载/成功/失败/下一步状态；高级设置默认收起；首次引导短且不挡主流程。`;

  if (complexity === 'advanced') {
    return `${base}
- 团队增强功能放在设置/历史/批量页，不挤占主流程；危险操作二次确认并可恢复。`;
  }

  return base;
}

function uxEn(complexity: Complexity): string {
  if (complexity === 'starter') {
    return `- Main flow ≤3 steps: import/fill → preview → generate/save; first screen is the workspace.
- Use native open/save dialogs and clipboard APIs; support drag-and-drop; show "Open output folder" after completion.
- Paths handle Chinese, spaces, parentheses, and Windows/macOS separators; every screen has empty/loading/success/error states.`;
  }

  const base = `- Main flow ≤3 steps: import/fill → preview → generate/save; first screen is a usable workspace, not a landing page.
- Use native open/save dialogs, app data dirs, and clipboard APIs; support drag-and-drop; show "Open output folder" after completion.
- Paths handle Chinese characters, spaces, parentheses, long paths, and Windows/macOS separators; support high DPI, window sizes, and light/dark.
- Every screen has empty/loading/success/error/next-step states; advanced settings collapse by default; first-run hints are short and non-blocking.`;

  if (complexity === 'advanced') {
    return `${base}
- Put team features in settings/history/batch pages, not in the main path; confirm and recover dangerous actions.`;
  }

  return base;
}

function implementationZh(state: FormState): string {
  const retryLine =
    state.storage === 'none'
      ? '- 无持久化也缓存最近输出和失败原因到内存/临时目录，便于重试。'
      : '- 重要数据每次保存生成本地快照，保留最近 3 个版本。';

  if (state.complexity === 'starter') {
    return `- 不确定库/API 时先 \`npm view <pkg>\` 或读官方文档；不编造包名。
- 不写死 API Key、绝对路径、个人邮箱、内网地址；改既有文件前先读，最小 diff。
- 输出不覆盖原文件，冲突加时间后缀；只读用户选/拖入的文件。
- 缺真实文件时先创建 \`sample-data/\` 脱敏样例，不让用户先准备数据才开工。
- 分层：desktop shell / 受控 API / UI / core / tests / sample-data / docs；真实接线按钮、导入、预览、生成/保存、错误状态。`;
  }

  const base = `- 不确定库/API 时先 \`npm view <pkg>\` 或读官方文档；不编造包名。
- README 写 Node 版本（配 \`.nvmrc\` 或 \`engines\`）；提供 \`npm run setup\` / \`npm run dev\` / \`npm run package\`。
- 不写死 API Key、绝对路径、个人邮箱、内网地址；配置走 \`.env.example\`；改既有文件前先读，最小 diff。
- 输出不覆盖原文件，冲突加时间后缀；改文件/数据前预览或确认；支持撤销/恢复。
${retryLine}
- 缺真实文件时先创建 \`sample-data/\` 脱敏样例，不让用户先准备数据才开工。
- 只读用户选/拖入的文件；敏感字段导出前脱敏或提醒，日志不记敏感内容。
- 分层：desktop shell / preload 或受控 API / renderer UI / core / tests / sample-data / docs；IPC 类型化、白名单化，UI 不直接执行本地命令。
- 真实接线：按钮、导入、预览、生成/保存、导出、错误状态都可用；核心逻辑小模块、类型明确、错误分层。`;

  if (state.complexity === 'advanced') {
    return `${base}
- 批量处理要可取消、可恢复、可查看失败行；权限/隐私/日志策略写进文档。
- 历史记录、设置和恢复记录使用本地存储；迁移或 schema 变化要有兼容处理。`;
  }

  return base;
}

function implementationEn(state: FormState): string {
  const retryLine =
    state.storage === 'none'
      ? '- Even without persistence, keep the last output and failure reason in memory/temp dir for quick retry.'
      : '- Snapshot important data on every save; keep the last 3 versions.';

  if (state.complexity === 'starter') {
    return `- If unsure about a library/API, run \`npm view <pkg>\` or read official docs; do not invent package names.
- No hard-coded API keys, absolute paths, personal emails, or internal hosts; read existing files first; minimum diff.
- Never overwrite inputs; timestamp conflicts; read only picked/dropped files.
- No real files? create anonymized \`sample-data/\` first; do not block the user.
- Layers: desktop shell / controlled API / UI / core / tests / sample-data / docs; real wiring for buttons, import, preview, generate/save, and errors.`;
  }

  const base = `- If unsure about a library/API, run \`npm view <pkg>\` or read official docs; do not invent package names.
- README documents Node version plus \`.nvmrc\` or \`engines\`; provide \`npm run setup\` / \`npm run dev\` / \`npm run package\`.
- No hard-coded API keys, absolute paths, personal emails, or internal hosts; use \`.env.example\`; read existing files first; minimum diff.
- Never overwrite inputs; timestamp conflicts; preview/confirm before mutations; support undo/recovery.
${retryLine}
- No real files? create anonymized \`sample-data/\` first; do not block the user.
- Read only picked/dropped files; warn or mask sensitive fields before export; logs exclude sensitive content.
- Layers: desktop shell / preload or controlled API / renderer UI / core / tests / sample-data / docs; IPC typed and allowlisted, renderer never runs local commands.
- Real wiring: buttons, import, preview, generate/save, export, and error states work; core logic uses small typed modules and layered errors.`;

  if (state.complexity === 'advanced') {
    return `${base}
- Batch jobs must be cancellable, recoverable, and show failed rows; document permission, privacy, and logging policy.
- History, settings, and recovery records use local storage; migrations or schema changes need compatibility handling.`;
  }

  return base;
}

export function buildPrompt(state: FormState, lang: PromptLang): string {
  const goal = state.goal.trim();
  const features = state.features.trim();
  const custom = state.custom.trim();

  if (lang === 'zh') {
    const extras: string[] = [];
    if (state.extras.offline) extras.push('必须能完全离线运行，不联网也能使用');
    if (state.extras.bilingual) extras.push('界面支持中英双语切换');
    if (state.extras.exportable) extras.push('关键结果支持导出为 PDF / Excel');
    if (state.extras.shortcut) extras.push(SHORTCUT_ZH[state.platform]);
    if (state.extras.accessibility) extras.push(ACCESSIBILITY_ZH[state.platform]);
    if (custom) extras.push(custom);

    return `你是资深桌面应用工程师，擅长 ${ROLE_DOMAIN_ZH[state.platform]}。交付本地可运行应用，不是建议。用户负责业务判断，不负责技术实现；沟通、按钮、错误和文档都用业务语言。全程中文。

【快速交付】
${deliveryZh(state.complexity)}

【DoD / 停止 Vibe Coding】
${dodZh(state)}

【选择】
- 平台：${PLATFORM_ZH[state.platform]}
- 栈：${TECH_ZH[state.tech]} 只用成熟、活跃、文档全的库；不为炫技加服务、云或后端。
- 界面：${UI_ZH[state.ui]}。${FONT_ZH[state.platform]}；跟随系统深浅模式；禁用网络字体/CDN；360px 窄窗不遮挡，主按钮点击区 ≥32px。
- 数据：${STORAGE_ZH[state.storage]}；默认本地，不上传外部服务。
- 复杂度：${COMPLEXITY_ZH[state.complexity]}

【需求】
目标：${goal || '（请补充：给谁用？解决什么业务痛点？例："帮财务同事把每月对账从 2 天压到 1 小时"）'}
功能：
${features || '（请补充：一行一条，写清"做什么 → 用户看到什么"。例：\n- 拖入两张 Excel → 自动按订单号比对 → 差异标红\n- 点"导出" → 生成差异明细 Excel\n- 超过 10 万行 → 分批处理并显示进度条）'}

${extras.length ? `附加要求：\n${extras.map((e) => `- ${e}`).join('\n')}\n\n` : ''}【桌面与 UX 硬要求】
${uxZh(state.complexity)}

【实现纪律 / 安全】
${implementationZh(state)}

【验证与最终汇报】
自检清单（全部通过才算完成）：
□ lint、类型检查、测试、构建全部通过
□ 双击/一条命令启动，第一屏是主工作台
□ 示例数据跑通主流程，产出可检查的文件/表格
□ 已用 sample-data 做启动 → 主流程 → 导出/保存烟测
□ 空数据、错格式、取消、重名冲突 → 友好提示，不闪退
□ 路径含中文/空格/括号 → 正常工作

最终只报：做了什么 | 如何打开 | 产物路径 | 验证结果 | 剩余限制。

开始：先给 ≤8 行摘要，然后立刻做 M1。`;
  }

  const extras: string[] = [];
  if (state.extras.offline) extras.push('Must run fully offline; no internet required');
  if (state.extras.bilingual) extras.push('UI supports switching between Chinese and English');
  if (state.extras.exportable) extras.push('Key results can be exported as PDF / Excel');
  if (state.extras.shortcut) extras.push(SHORTCUT_EN[state.platform]);
  if (state.extras.accessibility) extras.push(ACCESSIBILITY_EN[state.platform]);
  if (custom) extras.push(custom);

  return `You are a senior ${ROLE_DOMAIN_EN[state.platform]} engineer. Deliver a runnable local desktop app, not advice. The user owns business judgment, not technical implementation; use business-language labels, errors, docs, and updates. Use plain English.

[Fast Delivery]
${deliveryEn(state.complexity)}

[DoD / Stop-Vibe-Coding]
${dodEn(state)}

[Choices]
- Platform: ${PLATFORM_EN[state.platform]}
- Stack: ${TECH_EN[state.tech]} Use mature, active, documented libraries; do not add servers/cloud/backends to show off.
- Visual: ${UI_EN[state.ui]}. ${FONT_EN[state.platform]}; follow system light/dark; no web fonts/CDNs; no clipping at 360px; primary hit area ≥32px.
- Data: ${STORAGE_EN[state.storage]}. Local by default; never upload.
- Scope: ${COMPLEXITY_EN[state.complexity]}

[Request]
Goal: ${goal || '(Please fill in: who is it for, what business pain? Example: "Help finance cut monthly reconciliation from 2 days to 1 hour."'}
Features:
${features || '(Please fill in: one per line, write "action → user sees what". Example:\n- Drop two Excel files → auto-match by order ID → mismatches highlighted red\n- Click "Export" → generates a diff-detail Excel\n- Over 100k rows → batch with progress bar)'}

${extras.length ? `[Additional Requirements]\n${extras.map((e) => `- ${e}`).join('\n')}\n\n` : ''}[Desktop + UX Requirements]
${uxEn(state.complexity)}

[Implementation / Safety]
${implementationEn(state)}

[Verification + Final Report]
Self-check (all must pass before reporting done):
☐ lint, typecheck, tests, build all pass
☐ Launches by double-click or one command; first screen is the workspace
☐ Sample data completes the main flow, producing a checkable file/sheet
☐ Smoke-tested sample-data: launch → main flow → export/save
☐ Empty data, bad format, cancel, name conflict → friendly message, no crash
☐ Paths with Chinese/spaces/parentheses → work correctly

Final report only: what built | how to open | artifact path | verification results | remaining limits.

Start now: give the ≤8-line summary, then build M1.`;
}

export function buildRecoveryPrompt(state: FormState, lang: PromptLang): string {
  const goal = state.goal.trim() || (lang === 'zh' ? '（目标见上一轮对话）' : '(goal from the previous conversation)');
  const features = state.features.trim() || (lang === 'zh' ? '（功能见上一轮对话）' : '(features from the previous conversation)');

  if (lang === 'zh') {
    return `刚才这个桌面应用没有顺利跑通。请继续修复到能运行，或明确指出真实阻塞点；不要让我自己排查，也不要只解释原因。

【修复循环】
1. 先用 ≤5 行写清失败现象和日志指向的根因；不猜。
2. 读相关文件后最小 diff 修改；不要覆盖、删除功能或改技术栈来绕过。
3. 重新运行必要命令：安装依赖 / lint / 类型检查 / 测试 / 构建 / 启动；读完整输出再判断。
4. 同一问题 3 次失败：降级或禁用边缘功能，先恢复主流程。
5. 打包失败要区分代码、依赖、权限、签名/公证、跨平台限制，并给出可运行替代产物或准确命令。
6. 修完后启动应用，用示例数据走完主流程并看到产物，再说修好。
7. 中文汇报：改了什么 | 根因 | 如何打开 | 验证 | 剩余限制。

【底线】不引入不存在的库；不写死 API Key、绝对路径或内网地址；不把 TODO/假接线当完成。

【原应用背景】
平台：${PLATFORM_ZH[state.platform]} | 复杂度：${COMPLEXITY_ZH[state.complexity]}
目标：${goal}
功能：
${features}

现在直接排查并修复；除非需要真实业务文件、账号、证书或不可逆操作，否则不要停下等确认。`;
  }

  return `The desktop app did not run successfully. Keep fixing until it runs or a truly blocking issue is proven. Do not ask me to debug, and do not only explain the cause.

[Fix Loop]
1. In ≤5 lines, state the symptom and log-based root cause; do not guess.
2. Read related files, then change code/config with minimum diff; do not overwrite, delete features, or swap stacks to bypass the issue.
3. Re-run needed commands: install / lint / typecheck / tests / build / launch; read the full output before deciding.
4. If the same bug fails 3 fixes, downgrade or disable the edge feature and restore the main flow first.
5. For packaging failures, separate code, dependency, permission, signing/notarization, and cross-platform limits; provide a runnable fallback or exact command.
6. After fixing, launch the app and complete the sample-data main flow; only say fixed after seeing the artifact.
7. Report: what changed | root cause | how to open | verification | remaining limits.

[Non-Negotiables] No fake npm/PyPI packages; no hard-coded API keys, absolute paths, or internal hosts; no TODO/fake wiring counted as done.

[Original App Context]
Platform: ${PLATFORM_EN[state.platform]} | Scope: ${COMPLEXITY_EN[state.complexity]}
Goal: ${goal}
Features:
${features}

Start debugging and fixing now. Stop only for real business files, accounts, certificates, or irreversible actions.`;
}

/** Named templates for the "quick templates" panel in the generator. */
export type QuickTemplate = {
  id: string;
  titleZh: string;
  titleEn: string;
  taglineZh: string;
  taglineEn: string;
  state: Partial<FormState>;
};

export const quickTemplates: QuickTemplate[] = [
  {
    id: 'excel-merge',
    titleZh: '把几张 Excel 合并成一张',
    titleEn: 'Merge several Excel files',
    taglineZh: '经典办公场景：拖进来自动汇总，输出一张新表',
    taglineEn: 'Drop them in, auto-merge, output a clean sheet',
    state: {
      platform: 'both',
      ui: 'minimal',
      storage: 'localFile',
      goal:
        '帮我把每月从不同门店发过来的十几张 Excel 自动合并成一张总表，方便汇报时直接用。',
      features:
        '- 把一批 Excel 一起拖进窗口\n- 自动识别列名（允许细微差异）\n- 生成一张总表，带"来源门店"列\n- 导出合并后的 Excel',
    },
  },
  {
    id: 'excel-to-app',
    titleZh: '把一张 Excel 变成一个可点的小程序',
    titleEn: 'Turn an Excel into a clickable mini-app',
    taglineZh: '不给同事看 Excel，给他们看界面；查询、筛选、导出都有',
    taglineEn: 'Give teammates a UI, not a spreadsheet',
    state: {
      platform: 'both',
      ui: 'fresh',
      storage: 'localFile',
      goal:
        '我有一份商品清单（SKU、名称、单价、库存），希望做成一个小程序，同事可以搜索、筛选、导出，而不是直接打开 Excel 改来改去。',
      features:
        '- 软件打开后自动读取本地 products.xlsx\n- 搜索框支持按名称 / SKU 模糊搜索\n- 支持按"库存低于 N"筛选\n- 一键导出筛选结果到新 Excel\n- 不允许普通同事直接改源文件',
    },
  },
  {
    id: 'data-snapshot',
    titleZh: '每天一张漂亮的业务快报图',
    titleEn: 'A daily business snapshot image',
    taglineZh: '导入今日数据，一键生成适合发群的图片 / PDF',
    taglineEn: 'Import today\'s data, one-click a shareable image or PDF',
    state: {
      platform: 'both',
      ui: 'minimal',
      storage: 'sqlite',
      extras: {
        offline: true,
        bilingual: false,
        exportable: true,
        shortcut: false,
        accessibility: false,
      },
      goal:
        '帮我做一个"每日数据快报"桌面工具：每天早上把昨日数据导入，一键生成一张适合发群的长图或 PDF。',
      features:
        '- 支持拖入多张 Excel（GMV、订单、流量）\n- 智能识别类型，支持手动调整\n- 可配置日报标题 / 核心指标顺序 / 品牌色\n- 一键导出 PNG（1200×1800）或 PDF（A4）\n- 保留最近 30 天日报',
    },
  },
  {
    id: 'followup-ledger',
    titleZh: '跟进台账（任何"今天要跟的事"）',
    titleEn: 'Follow-up ledger (for anything on your plate)',
    taglineZh: '合同、回款、候选人、客户投诉……都能套这个模板',
    taglineEn: 'Contracts, collections, candidates, complaints — all fit this template',
    state: {
      platform: 'both',
      ui: 'business',
      storage: 'sqlite',
      goal:
        '帮我做一个本地台账软件：每条事项一张卡片，记录对方、金额、关键日期、当前状态，到期前自动提醒。',
      features:
        '- 卡片字段：对方 / 类型 / 金额 / 关键日期 / 当前状态 / 备注\n- 卡片左侧色块显示状态\n- 设置阈值（如到期前 N 天）自动变红\n- 一键导出本周待办到 Excel',
    },
  },
];
