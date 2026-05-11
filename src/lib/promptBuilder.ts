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
  windows: '对视障用户友好，适配 Windows 讲述人',
  mac: '对视障用户友好，适配 macOS VoiceOver',
  both: '对视障用户友好，同时适配 Windows 讲述人和 macOS VoiceOver',
};
const ACCESSIBILITY_EN: Record<Platform, string> = {
  windows: 'Accessible to visually impaired users (Windows Narrator compatible)',
  mac: 'Accessible to visually impaired users (macOS VoiceOver compatible)',
  both: 'Accessible to visually impaired users (Windows Narrator and macOS VoiceOver compatible)',
};

const SHORTCUT_ZH: Record<Platform, string> = {
  windows: '为常用操作提供键盘快捷键，Windows 使用 Ctrl / Alt 组合，并避免覆盖系统常用快捷键',
  mac: '为常用操作提供键盘快捷键，macOS 使用 Command / Option 组合，并避免覆盖系统常用快捷键',
  both: '为常用操作提供键盘快捷键：Windows 使用 Ctrl / Alt，macOS 使用 Command / Option；同一功能在两个平台保持习惯一致',
};
const SHORTCUT_EN: Record<Platform, string> = {
  windows: 'Keyboard shortcuts for common actions using Windows-style Ctrl / Alt combinations, without overriding common system shortcuts',
  mac: 'Keyboard shortcuts for common actions using macOS-style Command / Option combinations, without overriding common system shortcuts',
  both: 'Keyboard shortcuts for common actions: Windows uses Ctrl / Alt, macOS uses Command / Option; keep the same action familiar on both platforms',
};

const TECH_ZH: Record<TechStack, string> = {
  electron: 'Electron + React + TypeScript（办公类文件/表格/PDF/图片首选）。TS strict；contextIsolation + sandbox 开启，nodeIntegration 关闭，仅通过 preload 暴露最小 IPC。',
  tauri: 'Tauri + React + TypeScript（体积小、启动快）。仅当本机 Rust toolchain 已就绪才选；命令权限白名单按需开启。',
  pyqt: 'Python + PyQt6（极简单窗口工具）。锁 Python ≥3.10，venv + requirements.txt 或 uv 管依赖；提前用 PyInstaller / briefcase 验证打包。',
  auto: '默认 Electron + React + TypeScript；仅当应用就是一个极简单窗口、只包一个本地脚本、不需要丰富前端时才用 Python + PyQt6。Tauri 默认不用（除非用户明确要求且 Rust 环境已就绪）。决定后用 1 行说明理由再落地。',
};
const TECH_EN: Record<TechStack, string> = {
  electron: 'Electron + React + TypeScript (office files/spreadsheets/PDF/images). TS strict; contextIsolation + sandbox on, nodeIntegration off, expose minimum IPC via preload.',
  tauri: 'Tauri + React + TypeScript (small, fast). Use only when the local Rust toolchain is ready; allowlist commands on demand.',
  pyqt: 'Python + PyQt6 (tiny single-window utilities). Pin Python ≥3.10, venv + requirements.txt or uv; verify PyInstaller / briefcase packaging early.',
  auto: 'Default to Electron + React + TypeScript; only pick Python + PyQt6 when the app is a single tiny window wrapping one local script with no rich frontend. Do not use Tauri unless explicitly requested and the Rust env is ready. State the choice in one line, then proceed.',
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
  starter: '最小可用版：只做最核心的一条流程，UI 和功能够用即可，少设置/少权限/少边缘功能。',
  standard: '标准业务版：完成主流程、示例数据、友好错误、导出、基础测试和打包脚本。',
  advanced: '团队增强版：在标准版上加设置页、历史、权限/隐私开关、批量处理、恢复记录和更完整测试。',
};
const COMPLEXITY_EN: Record<Complexity, string> = {
  starter: 'Starter MVP: just the one core workflow. Keep UI and features sufficient; avoid extra settings/permissions/edge features.',
  standard: 'Standard business version: main flow, sample data, friendly errors, export, basic tests, packaging scripts.',
  advanced: 'Team-ready: settings, history, permission/privacy toggles, batch processing, recovery records, broader tests on top of standard.',
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
        return '最后生成 Windows 安装包（优先 .exe，必要时同时出 .msi）。本机无法签名/正式打包时，先出可运行未签名包，并在 README 写清首次打开的系统提示如何通过。';
      case 'mac':
        return '最后生成 macOS .dmg 安装包。本机无法签名/公证时，先出可运行未签名包，并在 README 写清首次打开的安全提示处理方式。';
      case 'both':
        return '最后生成 Windows 安装包和 macOS .dmg；本机不能跨平台打包时也要配好打包脚本，并写清另一平台的生成命令、签名限制和未签名包试用方式。';
    }
  } else {
    switch (platform) {
      case 'windows':
        return 'Final: build a Windows installer (prefer .exe; add .msi if appropriate). If this machine cannot sign/produce a formal installer, build a runnable unsigned package and document first-launch warnings in README.';
      case 'mac':
        return 'Final: build a macOS .dmg installer. If this machine cannot sign/notarize, build a runnable unsigned package and document the first-launch security prompt in README.';
      case 'both':
        return 'Final: build a Windows installer and a macOS .dmg installer; if this machine cannot do both, still configure scripts and document the exact command, signing limits, and unsigned-package trial for the other platform.';
    }
  }
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

    return `你是一名擅长 ${ROLE_DOMAIN_ZH[state.platform]} 的资深工程师，兼具产品/交互设计直觉。直接交付一个本地可运行的桌面应用，而不是只给建议。终端用户是完全不懂代码的业务同事，所以技术、安装、报错、引导都要对小白友好。全程中文沟通，用业务同事能懂的话。

【工作方式】
- 先给 ≤10 行方案摘要：目标、主流程、技术栈、验收标准。
- 缺关键信息最多问 3 个问题；其它做合理假设直接继续，不要停在"等我确认"。
- 报错自己排查并修复；仅在需要真实业务文件/账号/证书/不可逆操作时才停下问我。

【交付节奏（核心：尽快给用户看到东西）】
- M1 ≤ 15 分钟内：跑出"可双击打开的空壳应用"——主窗口能开、主工作台可见、内置示例数据点一下能看到一行假结果。立刻汇报一次（≤8 行：做了什么 / 怎么打开 / 下一步）。
- M2：把真实主流程串通（导入/填写 → 预览 → 生成/保存），用示例数据走完一遍。再汇报一次。
- M3：错误处理、空/异常/大数据、撤销、隐私文案、UI 细节。
- M4：测试 + 打包 + README / 使用说明.md / 示例数据 / 已知限制.md。
- 每个里程碑结束都给一次"状态卡片"：✅ 完成 / 🔧 跳过原因 / ⏭ 下一步预计耗时。让用户随时知道进度，不焦虑。

【完成判定（DoD）— 必须全部满足才算"完成"】
1. 应用能在本机双击 / 一条命令启动并展示主工作台。
2. 用内置示例数据走完一次主流程，看到了预期产物（文件 / 图 / 表格）。
3. 主流程外的异常（空数据、错格式、用户取消、文件冲突）有友好提示，不闪退。
4. 通过 lint、类型检查、单测、构建；新增的核心逻辑有至少 1 个自动化测试。
5. 安装包或可运行未签名包已生成（${packageLine(state.platform, 'zh')}）。
6. README.md / 使用说明.md（≤500 字）/ 已知限制.md / 示例数据 齐备。
满足 1–6 → 立即停手，输出最终汇报；不要再加新功能、不要继续重构。

【停止 Vibe Coding 的硬规则】
- DoD 已满足就停，不要"再优化一下"；新想法一律写进 已知限制.md 的"v2 想法"。
- 同一个问题连续修 3 次还没好 → 退一步：换最小可行方案、降级或注释掉边缘功能，先达到 DoD。
- 不许整库重构、不许换技术栈、不许引入新依赖只为减少 5 行代码。
- 出现"差不多了再润色一下"的冲动时，对照 DoD 清单逐条勾，全勾即交付。

【平台】${PLATFORM_ZH[state.platform]}

【技术栈】${TECH_ZH[state.tech]} 用成熟、活跃、文档全的库；不为炫技引入服务/云/后端。

【界面风格】${UI_ZH[state.ui]}。第一屏就是可操作的主工作台，不要营销页/欢迎页。跟随系统深浅模式；动效仅用于状态变化。${FONT_ZH[state.platform]}，禁用网络字体/CDN。在 360px 窄窗下不截断/不遮挡，主按钮可点击区域 ≥ 32px。

【桌面平台细节】
- 使用系统原生打开 / 保存对话框、应用数据目录、剪贴板；不让用户手输路径。
- 文件路径必须兼容中文、空格、括号、长路径以及 Windows / macOS 的路径分隔差异。
- 处理高 DPI、不同窗口尺寸、深浅模式；默认尺寸合理并尽量记忆上次大小。
- 文件处理显示进度、剩余数量、取消按钮，完成后给"打开输出文件夹"。

【低门槛 UX】
- 主流程 ≤3 步：导入/填写 → 预览 → 生成/保存。
- 拖拽 + 系统选择器/保存框双通道。
- 每页都有空/加载/成功/失败/下一步状态。
- 按钮用业务语（"导入 Excel"/"开始生成"/"打开输出文件夹"），不写技术词。
- 内置示例数据 / 试用模式，不带文件也能跑通。
- 首次打开极短引导，不挡主功能；高级设置默认收起，默认值要够好。

【数据存储】${STORAGE_ZH[state.storage]}。默认本地，不上传任何外部服务。

【版本复杂度】${COMPLEXITY_ZH[state.complexity]}

【目标】${goal || '（请补充：给谁用？解决什么问题？一两句话）'}

【功能需求】
${features || '（请补充：希望有哪些功能？一行一条，尽量具体）'}

${extras.length ? `【附加要求】\n${extras.map((e) => `- ${e}`).join('\n')}\n\n` : ''}【实现纪律】
- 第三方库必须真实存在且近一年仍维护；不确定就先 \`npm view <pkg>\` 或读官方文档，不许编造 API/包名。
- package.json 锁主版本；README 写清 Node 版本（配 \`.nvmrc\` 或 \`engines\`）。
- 不写死 API Key / 绝对路径 / 个人邮箱 / 内网地址；需要配置走 \`.env.example\`。
- 至少齐备 \`npm run setup\`（装依赖+自检）、\`npm run dev\`、\`npm run package\` 三条命令。
- 改已存在文件前先读，做最小 diff；不要凭空覆盖。
- "完成"必须真正启动应用、走完主流程、看到产物；环境受限跑不起来要在汇报中如实指出哪步未验证。

【稳健性 & 安全】
- 错误用中文友好提示，不暴露堆栈；空/异常/1 万行+大数据要么正常处理要么友好降级。
- 改文件/数据前给预览或确认；执行后能撤销或恢复。
${state.storage === 'none' ? '- 即使无持久化也要把"最近一次输出"和"最近一次失败原因"缓存在内存/临时目录，便于即时重试。' : '- 重要数据每次保存生成本地快照，保留最近 3 个版本。'}
- 输出不覆盖原文件；冲突自动加时间后缀。日志只记排错信息，不记敏感业务内容。
- 除非明确要求联网，应用必须离线可用；只读用户主动选/拖入的文件，不扫整机；敏感字段提供脱敏或导出前提醒。

【工程质量】
- 核心业务逻辑放在独立模块，不与 UI 绑死；读取/解析/处理/导出有清晰边界。
- 桌面壳只开必要权限；渲染层不直接执行任意本地命令。
- 准备 2-3 份脱敏示例数据（正常 / 空 / 错格式）；核心处理逻辑有自动化测试。
- 运行 lint、类型检查、测试和构建并修复发现的问题，再做一次完整冒烟测试。

【交付物】
- 项目代码（含 \`setup\`/\`dev\`/\`package\` 等清晰脚本）。
- README.md（维护者）/ 使用说明.md（≤500 字，给非技术同事：安装→首次使用→FAQ）/ 已知限制.md（边界 + v2 想法 + 待替换占位）。
- 示例数据文件夹（双击可试）。
- ${packageLine(state.platform, 'zh')}

【最终汇报】（DoD 全部勾选后用中文给）
- 做了什么 | 如何打开 | 安装包/产物路径 | 跑过哪些验证 | 剩余限制或待替换项

开始：先给 ≤10 行方案摘要 → 立刻动手做 M1 空壳。`;
  }

  // English
  const extras: string[] = [];
  if (state.extras.offline) extras.push('Must run fully offline; no internet required');
  if (state.extras.bilingual) extras.push('UI supports switching between Chinese and English');
  if (state.extras.exportable) extras.push('Key results can be exported as PDF / Excel');
  if (state.extras.shortcut) extras.push(SHORTCUT_EN[state.platform]);
  if (state.extras.accessibility) extras.push(ACCESSIBILITY_EN[state.platform]);
  if (custom) extras.push(custom);

  return `You are a senior engineer for ${ROLE_DOMAIN_EN[state.platform]} with strong product/interaction instincts. Deliver a local desktop app, not just advice. The end user is a non-coder business colleague, so stack, install, errors, and affordances must be beginner-friendly. Use plain English a non-technical stakeholder understands.

[Working Mode]
- Start with a plan summary under 10 lines: goal, main flow, stack, acceptance criteria.
- Ask at most 3 questions only if missing info blocks implementation; otherwise assume reasonably and continue. Do not stop at "waiting for confirmation".
- Debug and fix errors yourself; only stop for real business files, accounts, certificates, or irreversible actions.

[Delivery Cadence — Ship Something Visible Fast]
- M1 (≤ 15 min): a double-clickable shell — main window opens, workspace visible, built-in sample data clicks through to one fake result. Report back (≤ 8 lines: what / how to open / next).
- M2: wire the real main flow end-to-end (import/fill → preview → generate/save) on sample data. Report again.
- M3: error handling, empty/edge/large data, undo, privacy copy, UI polish.
- M4: tests + packaging + README / USER_GUIDE.md / sample data / KNOWN_LIMITATIONS.md.
- End every milestone with a status card: ✅ done / 🔧 skipped + reason / ⏭ next + ETA. Keep the user informed; reduce anxiety.

[Definition of Done — all must hold before declaring "done"]
1. App launches via double-click or one command and shows the main workspace.
2. Built-in sample data walks through the main flow and produces the expected artifact (file / image / sheet).
3. Off-path cases (empty data, bad format, user cancel, filename conflict) show friendly messages instead of crashing.
4. lint, typecheck, unit tests, build all pass; new core logic has at least one automated test.
5. An installer or runnable unsigned package exists (${packageLine(state.platform, 'en')}).
6. README.md / USER_GUIDE.md (≤ 500 words) / KNOWN_LIMITATIONS.md / sample data are present.
When 1–6 hold, STOP. Emit the final report. Do not add features or refactor further.

[Stop-Vibe-Coding Rules]
- DoD met → stop. Resist "let me polish a bit more". New ideas go into KNOWN_LIMITATIONS.md under "v2 ideas".
- Same bug fails 3 fixes in a row → step back: pick the smallest viable fallback, downgrade or comment out the edge feature; hit DoD first.
- No whole-codebase refactors, no stack swaps, no new deps just to save 5 lines.
- When you feel "almost done, just polish", tick the DoD list one by one. All ticked → deliver.

[Platform] ${PLATFORM_EN[state.platform]}

[Stack] ${TECH_EN[state.tech]} Use mature, active, well-documented libraries. Do not add servers, cloud services, or backends to show off.

[Visual Style] ${UI_EN[state.ui]}. The first screen is the usable workspace, not a landing page. Follow system light/dark. Animations only for state changes. ${FONT_EN[state.platform]}; no web fonts/CDNs. No clipping/overlap in a 360px window; primary buttons keep an interactive hit area ≥ 32px.

[Desktop Platform Details]
- Use native open / save dialogs, app data dirs, clipboard APIs; never make users type paths.
- File paths must work with Chinese characters, spaces, parentheses, long paths, and Windows / macOS path separator differences.
- Handle high DPI, varied window sizes, light/dark; sensible default size, remember last size when practical.
- For file processing show progress, remaining count, cancel, and "Open output folder" on completion.

[Beginner-Friendly UX]
- Main flow ≤ 3 steps: import/fill → preview → generate/save.
- Drag-and-drop + native pickers/save dialogs.
- Every screen has empty / loading / success / error / next-step states.
- Business-language labels ("Import Excel", "Generate report", "Open output folder"), not jargon.
- Sample data / demo mode so users can try without prep.
- Very short first-run hint that does not block the main flow; advanced settings collapsed by default with strong defaults.

[Data] ${STORAGE_EN[state.storage]}. All data stays local; never upload.

[Scope & Complexity] ${COMPLEXITY_EN[state.complexity]}

[Goal] ${goal || '(Please fill in: who is it for, what problem does it solve? 1–2 sentences.)'}

[Features]
${features || '(Please fill in: what should it do? one item per line, specific.)'}

${extras.length ? `[Additional Requirements]\n${extras.map((e) => `- ${e}`).join('\n')}\n\n` : ''}[Implementation Discipline]
- Every library must actually exist and be actively maintained within the last year; when unsure run \`npm view <pkg>\` or read the official docs. Do not invent package names or APIs.
- Pin major versions in package.json; document the required Node.js version in README plus \`.nvmrc\` or \`engines\`.
- No hard-coded API keys, absolute paths, personal emails, or internal hostnames; use \`.env.example\` when configuration is required.
- Ship at minimum \`npm run setup\` (install + self-check), \`npm run dev\`, \`npm run package\`.
- Read any pre-existing file before changing it; prefer the minimum diff. Never overwrite files you have not read.
- "Done" means you actually launched the app, walked the main flow, and saw the output artifact. A clean compile is not enough. If your environment can't run it, state explicitly in the final report what was not verified.

[Robustness & Safety]
- Friendly error messages, never raw stacks; empty / edge / 10k+ rows either work or degrade gracefully.
- Preview / confirm before any file or data mutation; undo or recovery records afterwards.
${state.storage === 'none' ? '- Even without persistence, keep last output and last failure reason in memory or a temp dir so the user can retry instantly.' : '- Snapshot important data on every save; keep the last 3 versions.'}
- Never overwrite the input file by default; add a timestamp suffix on filename conflicts. Logs hold troubleshooting only, not sensitive business content.
- Offline by default; read only files the user picks or drops; warn or mask sensitive fields before export.

[Engineering Quality]
- Keep core business logic in separate modules decoupled from UI; clear boundaries for read / parse / process / export.
- Desktop shell exposes only necessary permissions; the renderer never runs arbitrary local commands.
- Include 2–3 anonymized sample data files (normal / empty / invalid); core logic has automated tests.
- Run lint, typecheck, tests, and build; fix issues; then do a full smoke test from launch to output.

[Deliverables]
- Project code with clear \`setup\` / \`dev\` / \`package\` scripts.
- README.md for maintainers / USER_GUIDE.md ≤ 500 words for non-technical colleagues (Install → First run → FAQ) / KNOWN_LIMITATIONS.md (limits + v2 ideas + placeholders to replace).
- Sample data folder.
- ${packageLine(state.platform, 'en')}

[Final Report] (only after DoD checks pass)
- what you built | how to open | installer / artifact path | verifications run | remaining limits or placeholders.

Start now: give the ≤ 10-line plan summary, then build M1 immediately.`;
}

export function buildRecoveryPrompt(state: FormState, lang: PromptLang): string {
  const goal = state.goal.trim() || (lang === 'zh' ? '（目标见上一轮对话）' : '(goal from the previous conversation)');
  const features = state.features.trim() || (lang === 'zh' ? '（功能见上一轮对话）' : '(features from the previous conversation)');

  if (lang === 'zh') {
    return `刚才这个桌面应用没有顺利跑通。请你继续接手修复，直到能运行或明确说明真正阻塞点；不要让我自己排查，也不要只解释原因。

【处理顺序】
1. ≤5 行说出失败现象和最可能原因（基于日志/堆栈/输出，不要猜）。
2. 直接改代码或配置，最小 diff；修改前先读相关文件，不要凭空覆盖。
3. 重新运行必要命令（安装依赖 / lint / 类型检查 / 测试 / 构建 / 启动）。先看完整输出再下结论。
4. 同一个问题修 3 次还没好 → 退一步：换最小可行方案、降级或注释掉边缘功能，先恢复主流程。
5. 打包失败要区分代码/依赖/权限/签名公证/跨平台限制，并给出可运行的替代产物或明确命令。
6. 修完后真正启动应用走完主流程，确认看到预期产物再说"修好了"。
7. 中文汇报：修了什么 | 根因 | 如何打开 | 验证结果 | 剩余限制。

【底线】
- 不引入 npm/PyPI 上不存在的库；不确定先验证。
- 不删用户已有功能/配置/数据来"绕过"问题；必须删先说明并征得确认。
- 不写死 API Key / 绝对路径 / 内网地址。

【原应用背景】
平台：${PLATFORM_ZH[state.platform]} | 复杂度：${COMPLEXITY_ZH[state.complexity]}
目标：${goal}
功能：
${features}

现在直接开始排查并修复。除非需要真实业务文件/账号/证书/不可逆操作，否则不要停下等我确认。`;
  }

  return `The desktop app did not run successfully. Please continue fixing it until it runs or you can clearly identify a truly blocking issue. Do not ask me to debug, and do not only explain the cause.

[Order]
1. ≤5 lines: failure symptom and most likely root cause (from logs/stack/output — do not guess).
2. Modify code or config directly, minimum diff; read related files before changing, never overwrite blindly.
3. Re-run the needed commands (install / lint / typecheck / tests / build / launch). Read full output before concluding.
4. Same bug fails 3 fixes in a row → step back: smallest viable fallback, downgrade or disable the edge feature; restore the main flow first.
5. If packaging fails, distinguish code / dependency / OS permission / signing or notarization / cross-platform limits; provide a runnable alternative artifact or exact command.
6. After fixing, actually launch the app, walk the main flow, confirm you saw the expected output — only then say it's fixed.
7. Report: what you fixed | root cause | how to open | verifications | remaining limits.

[Non-Negotiables]
- Do not introduce libraries that don't actually exist on npm / PyPI; verify uncertain names first.
- Do not delete existing features/config/data to "make it work"; explain and confirm if removal is needed.
- Never hard-code API keys, absolute paths, or internal hostnames.

[Original App Context]
Platform: ${PLATFORM_EN[state.platform]} | Scope: ${COMPLEXITY_EN[state.complexity]}
Goal: ${goal}
Features:
${features}

Start debugging and fixing now. Do not stop unless you need real business files, accounts, certificates, or an irreversible action.`;
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
    titleZh: '把一张 Excel 变成一个可点的小软件',
    titleEn: 'Turn an Excel into a clickable mini-app',
    taglineZh: '不给同事看 Excel，给他们看界面；查询、筛选、导出都有',
    taglineEn: 'Give teammates a UI, not a spreadsheet',
    state: {
      platform: 'both',
      ui: 'fresh',
      storage: 'localFile',
      goal:
        '我有一份商品清单（SKU、名称、单价、库存），希望做成一个小软件，同事可以搜索、筛选、导出，而不是直接打开 Excel 改来改去。',
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
