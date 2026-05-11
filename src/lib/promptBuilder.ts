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
  electron: 'Electron + React + TypeScript（最通用，适合文件处理、表格、PDF、图片等办公工具）。开启 TypeScript strict 模式；启用 contextIsolation、sandbox，nodeIntegration=false，渲染层只通过 preload 暴露最小必要 IPC。',
  tauri: 'Tauri + React + TypeScript（体积小、启动快）。只有当本机已具备 Rust toolchain 且不会让新手卡在环境时才选；命令权限按需白名单开启。',
  pyqt: 'Python + PyQt6（适合很小的单窗口工具）。固定 Python 版本（>=3.10），用 venv + requirements.txt 或 uv 管理依赖；提前用 PyInstaller / briefcase 验证打包，避免最后一步卡死。',
  auto: '按以下规则二选一，不要犹豫：① 默认选 Electron + React + TypeScript（涉及文件、表格、PDF、图片、跨平台打包、安装体验都用它）；② 仅当应用就是一个极简单窗口、只跑本地脚本、又明确不需要前端体验时，才用 Python + PyQt6。Tauri 默认不用，除非用户明确要求且 Rust 环境已就绪。决定后说明 1 行理由，然后落地。',
};
const TECH_EN: Record<TechStack, string> = {
  electron: 'Electron + React + TypeScript (most common; strong fit for file, spreadsheet, PDF, and image office tools). Enable TypeScript strict mode; turn on contextIsolation and sandbox, set nodeIntegration=false, and expose only the minimum IPC needed via preload.',
  tauri: 'Tauri + React + TypeScript (small binary, fast startup). Use only when the Rust toolchain is already installed and will not block a beginner; whitelist Tauri command permissions on demand.',
  pyqt: 'Python + PyQt6 (good for tiny single-window utilities). Pin a Python version (>=3.10), manage deps with venv + requirements.txt or uv, and verify PyInstaller / briefcase packaging early so packaging does not block the final step.',
  auto: 'Pick using this rule and do not waffle: (1) default to Electron + React + TypeScript for anything involving files, tables, PDFs, images, cross-platform packaging, or a polished install experience; (2) only choose Python + PyQt6 when the app is a single tiny window wrapping a local script and a richer frontend is unnecessary. Do not use Tauri unless explicitly requested and the Rust environment is ready. State the choice in one line, then proceed.',
};

const UI_ZH: Record<UiStyle, string> = {
  minimal: '简洁：浅色背景、清晰层级、适中留白，控件像真正的桌面工具',
  dark: '深色：跟随系统深色模式，背景和文字对比清楚，层级明确，不使用纯黑压迫感界面',
  fresh: '清新：浅色底、少量强调色、柔和分隔线和清楚内容区，不使用大面积渐变、插画或花哨装饰',
  business: '业务型：信息密度高、表格清晰、分隔线柔和，适合反复处理数据',
};
const UI_EN: Record<UiStyle, string> = {
  minimal: 'Minimal: light background, clear hierarchy, moderate whitespace, native-feeling desktop controls',
  dark: 'Dark: follow system dark mode with clear contrast and clear hierarchy; avoid harsh pure-black surfaces',
  fresh: 'Fresh: light surfaces, restrained accent colors, subtle dividers, clear content areas; avoid large gradients, illustrations, or decorative flourishes',
  business: 'Business: dense information, clean tables, subtle dividers, built for repeated data work',
};

const STORAGE_ZH: Record<Storage, string> = {
  localFile: '存到本地文件（Excel / CSV / JSON），简单可迁移',
  sqlite: '使用本地 SQLite 数据库，适合几千到几万条数据',
  none: '不需要持久化存储，运行完即可',
};
const STORAGE_EN: Record<Storage, string> = {
  localFile: 'Persist to local files (Excel / CSV / JSON) — simple and portable',
  sqlite: 'Use a local SQLite database — good for thousands to tens of thousands of rows',
  none: 'No persistence needed; stateless per run',
};

const COMPLEXITY_ZH: Record<Complexity, string> = {
  starter: '最小可用版：先只做最核心的一条流程，界面和功能够用即可；避免过多设置、权限和边缘功能。适合第一次试做。',
  standard: '标准业务版：完成主流程、示例数据、友好错误处理、导出、基础测试和打包脚本。适合发给同事试用。',
  advanced: '团队增强版：在标准版基础上增加设置页、历史记录、权限/隐私开关、批量处理、恢复记录和更完整测试。适合多人长期使用。',
};
const COMPLEXITY_EN: Record<Complexity, string> = {
  starter: 'Starter MVP: build only the one core workflow first. Keep UI and features sufficient, avoid extra settings, permissions, and edge features. Best for a first trial.',
  standard: 'Standard business version: complete the main flow, sample data, friendly errors, export, basic tests, and packaging scripts. Good for colleague trial use.',
  advanced: 'Team-ready version: add settings, history, permission/privacy toggles, batch processing, recovery records, and broader tests on top of the standard version. Good for long-term team use.',
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
        return '最后生成 Windows 安装包（优先 .exe；项目适合时可同时提供 .msi）。如果当前机器无法签名或生成正式安装包，先生成可运行的未签名包，并在 README 写清用户首次打开可能遇到的系统提示。';
      case 'mac':
        return '最后生成 macOS .dmg 安装包。如果当前机器无法签名或公证，先生成可运行的未签名包，并在 README 写清首次打开和系统安全提示的处理方式。';
      case 'both':
        return '最后生成 Windows 安装包和 macOS .dmg 安装包；如果当前电脑无法跨平台打包，仍要配置好打包脚本并写清楚另一平台的生成命令、签名限制和未签名包的试用方式。';
    }
  } else {
    switch (platform) {
      case 'windows':
        return 'Final step: build a Windows installer (prefer .exe; optionally add .msi when appropriate). If this machine cannot sign or produce a formal installer, create a runnable unsigned package and document the first-launch system warnings in README.';
      case 'mac':
        return 'Final step: build a macOS .dmg installer. If this machine cannot sign or notarize it, create a runnable unsigned package and document the first-launch security prompt flow in README.';
      case 'both':
        return 'Final step: build a Windows installer and a macOS .dmg installer; if this machine cannot build both platforms, still configure the packaging scripts and document the exact command, signing limitation, and unsigned-package trial path for the other platform.';
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

    return `你是一名擅长 ${ROLE_DOMAIN_ZH[state.platform]} 的资深工程师，同时有丰富的产品和交互设计经验。请直接交付一个本地运行的桌面应用，而不是只给建议。使用者是企业里完全不懂代码的业务同事，所以技术选型、安装方式、报错提示、操作引导都要对小白友好。

【工作方式】
- 先用不超过 10 行列出你理解的目标、主要使用流程、技术选择和验收标准。
- 如果缺少会阻塞实现的关键信息，只问最多 3 个问题；否则做合理假设并直接继续。
- 不要停在"等我确认"。完成简短方案后，继续创建项目、写代码、运行、修复、验证和交付。
- 先做最小可用版本跑通，再补界面细节、错误处理、示例数据和打包；每一步都以实际可运行为准。
- 遇到报错先自己排查并修复；只有需要真实业务文件、账号、证书或不可逆操作时才问我。
- 全程用中文沟通；解释时用非技术同事能听懂的话。

【平台】
${PLATFORM_ZH[state.platform]}

【技术栈】
${TECH_ZH[state.tech]}。使用成熟、社区活跃、文档齐全的库；避免过于小众、长时间未维护或需要复杂环境配置的依赖。不要为了炫技引入服务器、云服务或数据库后台。如果选择 Electron，渲染层和 Node 能力通过安全 preload / IPC 隔离；如果选择 Python，确保依赖安装和打包命令简单明确。

【界面风格】
${UI_ZH[state.ui]}。第一屏必须是可用的主工作台，不要做营销页或空洞介绍页。支持跟随系统切换深浅模式。关键操作给出明确反馈；动效只用于状态变化，不要喧宾夺主。${FONT_ZH[state.platform]}，不要引入网络字体或 CDN。按钮、表格、输入框和提示文字在 360px 宽小窗口也不能截断或互相遮挡，关键按钮的可点击区域 ≥ 32px。

【桌面平台细节】
- 使用系统原生打开 / 保存对话框、应用数据目录和剪贴板；不要让用户输入复杂路径。
- 文件路径必须兼容中文、空格、括号、长路径以及 Windows / macOS 的路径分隔差异。
- 处理高 DPI、不同窗口尺寸、系统深浅模式；主窗口默认尺寸合理，并尽量记住上次窗口大小。
- 有文件处理时显示进度、剩余数量、取消按钮和完成后的"打开输出文件夹"。

【低门槛体验】
- 常用流程控制在 3 步内：导入 / 填写 → 预览确认 → 生成或保存。
- 同时支持拖拽文件和系统文件选择器；文件保存使用系统保存对话框。
- 每个页面都要有空状态、加载状态、成功状态、失败状态和下一步提示。
- 按钮文案使用业务语言，例如"导入 Excel"、"开始生成"、"打开输出文件夹"，不要写技术词。
- 内置"示例数据 / 试用模式"，让用户不准备文件也能看到软件跑通。
- 首次打开显示一个很短的引导，但不遮挡主要功能。
- 高级设置默认收起；默认值要足够好，让非技术同事不改设置也能完成主流程。

【数据存储】
${STORAGE_ZH[state.storage]}。数据默认存本地，不上传任何外部服务。

【版本复杂度】
${COMPLEXITY_ZH[state.complexity]}

【目标】
${goal || '（请补充：这个应用是给谁用的？解决他们什么问题？用一两句话描述）'}

【功能需求】
${features || '（请补充：希望这个应用具备哪些功能？一行一条，尽量具体）'}

${extras.length ? `【附加要求】\n${extras.map((e) => `- ${e}`).join('\n')}\n\n` : ''}【实现纪律】
- 用到的第三方库必须真实存在、近一年仍在维护；不要凭印象编造 API 或包名，不确定时先在终端跑 \`npm view <pkg>\` 或读官方文档。
- 在 package.json 中显式锁定主版本，避免新手 \`npm install\` 后行为漂移；记录所需 Node.js 版本（写进 README 与 \`.nvmrc\` 或 \`engines\`）。
- 不要把 API Key、本机绝对路径、个人邮箱、内网地址写进代码；如必须配置，提供 \`.env.example\` 并在 README 说明。
- 提供一键脚本，让不会用命令行的同事跟着 README 就能跑起来：\`npm run setup\`（装依赖 + 首次自检）、\`npm run dev\`、\`npm run package\` 至少要齐。
- 改任何已存在的文件前先读，再以最小改动的方式修改；不要凭空覆盖未读过的内容。
- 完成后必须真正启动应用、走完一次主流程、看到生成的产物，再宣布完成；只通过编译不算"完成"。如果环境受限跑不起来，在最终汇报里如实说明哪一步未验证。

【稳健性与错误处理】
- 任何错误都给出中文、友好的提示，不要直接暴露技术堆栈。
- 输入格式不对时，先提示并引导修正，而不是崩溃。
- 空数据、极端数据、大数据量（超过 1 万行）都要能正常处理或友好退化。
- 所有会改动文件或数据的操作，先给预览或确认页；执行后提供撤销方式或恢复记录。
${state.storage === 'none' ? '- 不需要持久化存储时，也要把"最近一次输出"和"最近一次失败原因"暂存在内存或临时目录，方便用户立即重试。' : '- 重要数据每次保存都生成本地快照，至少保留最近 3 个版本。'}
- 输出文件默认不覆盖原文件；如文件名冲突，自动加时间后缀。
- 本地日志只记录排错必要信息，不记录敏感业务内容。

【安全与隐私】
- 除非我明确要求联网，否则应用必须离线可用。
- 只读取用户主动选择或拖入的文件，不扫描整台电脑。
- 对路径、文件名、表格内容做基础校验，避免误删、覆盖或读取无关文件。
- 如果需要处理敏感字段，提供脱敏显示或导出前提醒。

【工程质量】
- 把核心业务逻辑放在独立模块，不和 UI 控件绑死，便于测试和后续修改。
- 数据读取、解析、处理、导出要有清晰边界；不要硬编码用户文件路径或本机绝对路径。
- 桌面壳只开放必要权限；渲染层不直接执行任意本地命令。
- 提供清晰脚本：开发启动、测试、类型检查、构建、打包；如果某脚本无法在当前系统运行，说明原因和替代命令。

【质量验收】
- 至少准备 2-3 份脱敏示例数据，覆盖正常、空数据、格式错误场景。
- 为核心处理逻辑写自动化测试；至少验证导入、处理、导出或保存流程。
- 运行 lint、类型检查、测试和构建；如果项目还没有这些脚本，先补齐再运行。修复发现的问题后再交付。
- 本地启动应用，完成一次从导入到导出的冒烟测试。
- 检查窗口在常见尺寸下不遮挡、不溢出、不出现英文技术错误。

【交付物】
- 可运行的项目代码，包含清晰的 npm / Python 脚本。
- README.md：写给维护者，说明如何开发、测试、打包。
- 使用说明.md：写给非技术同事，500 字以内，包含"安装 → 第一次使用 → 常见问题"。
- 示例数据文件夹：用户双击打开后可直接试用。
- 已知限制.md：列出当前版本边界、后续可优化方向和需要我替换的占位符。
- ${packageLine(state.platform, 'zh')}

【最终汇报】
完成后用中文简短汇报：
- 做好了什么；
- 如何打开和试用；
- 安装包或打包产物在哪里；
- 运行过哪些验证；
- 还剩哪些限制或需要人工替换的信息。

请现在开始：先给 10 行以内方案摘要，然后直接实现并验证。`;
  }

  // English
  const extras: string[] = [];
  if (state.extras.offline) extras.push('Must run fully offline; no internet required');
  if (state.extras.bilingual) extras.push('UI supports switching between Chinese and English');
  if (state.extras.exportable) extras.push('Key results can be exported as PDF / Excel');
  if (state.extras.shortcut) extras.push(SHORTCUT_EN[state.platform]);
  if (state.extras.accessibility) extras.push(ACCESSIBILITY_EN[state.platform]);
  if (custom) extras.push(custom);

  return `You are a senior engineer experienced with ${ROLE_DOMAIN_EN[state.platform]}, with strong product and interaction design sensibilities. Deliver a local desktop application, not just advice. The end user is a business colleague who does NOT code, so stack choices, installation, error messages, and UX affordances must be beginner-friendly.

[Working Mode]
- Start with a summary under 10 lines: understood goal, main workflow, stack choice, and acceptance criteria.
- Ask at most 3 questions only if missing information blocks implementation; otherwise make reasonable assumptions and continue.
- Do not stop at "waiting for confirmation". After the short plan, proceed to create the project, implement, run, fix, verify, and hand off.
- Get the smallest useful version running first, then add UI polish, error handling, sample data, and packaging; every step should be judged by a real runnable app.
- When errors appear, debug and fix them yourself first. Ask me only for real business files, accounts, certificates, or irreversible decisions.
- Communicate in plain English suitable for a non-technical stakeholder.

[Platform]
${PLATFORM_EN[state.platform]}

[Stack]
${TECH_EN[state.tech]}. Use mature, well-documented, actively maintained libraries. Avoid obscure, abandoned, or setup-heavy dependencies. Do not introduce servers, cloud services, or backend infrastructure unless explicitly requested. If using Electron, isolate renderer and Node capabilities through a safe preload / IPC boundary; if using Python, keep dependency installation and packaging commands simple and explicit.

[Visual Style]
${UI_EN[state.ui]}. The first screen must be the usable workspace, not a landing page or feature explainer. Follow the system light/dark preference. Use clear feedback for key actions; animations should only support state changes. ${FONT_EN[state.platform]}; no web fonts or CDNs. Buttons, tables, inputs, and helper text must not clip or overlap even in a 360px-wide small window, and primary buttons keep an interactive hit area of at least 32px.

[Desktop Platform Details]
- Use native open / save dialogs, app data directories, and clipboard APIs; do not ask users to type complex paths.
- File paths must work with Chinese characters, spaces, parentheses, long paths, and Windows / macOS path separator differences.
- Handle high DPI, common window sizes, and system light/dark mode; choose a sensible default window size and remember the last size when practical.
- For file processing, show progress, remaining count, a cancel action, and an "Open output folder" action when done.

[Beginner-Friendly UX]
- Keep the main workflow within 3 steps: import / fill in -> preview -> generate or save.
- Support both drag-and-drop and native file picker dialogs; use native save dialogs for outputs.
- Every screen needs empty, loading, success, error, and next-step states.
- Button labels should use business language like "Import Excel", "Generate report", "Open output folder" instead of technical wording.
- Include sample data / demo mode so users can see the app work without preparing files.
- Show a very short first-run guide without blocking the main workflow.
- Collapse advanced settings by default; defaults should be good enough for a non-technical user to finish the main flow without changing settings.

[Data]
${STORAGE_EN[state.storage]}. All data stays local; do not upload anything to external services.

[Scope & Complexity]
${COMPLEXITY_EN[state.complexity]}

[Goal]
${goal || '(Please fill in: who is the app for, and what problem does it solve? One or two sentences.)'}

[Features]
${features || '(Please fill in: what should it do? One item per line, as specific as possible.)'}

${extras.length ? `[Additional Requirements]\n${extras.map((e) => `- ${e}`).join('\n')}\n\n` : ''}[Implementation Discipline]
- Every third-party library you import must actually exist and be actively maintained within the last year. Do not invent package names or APIs; when unsure, run \`npm view <pkg>\` or read the official docs first.
- Pin major versions in package.json so a beginner's \`npm install\` does not drift; record the required Node.js version in README plus \`.nvmrc\` or \`engines\`.
- Never hard-code API keys, machine-specific absolute paths, personal emails, or internal hostnames. Use \`.env.example\` and document it in README when configuration is required.
- Provide one-command scripts so a non-developer can follow the README and bring the app up: at minimum \`npm run setup\` (install + self-check), \`npm run dev\`, and \`npm run package\`.
- Read any pre-existing file before changing it and prefer the minimum diff; never overwrite files you have not read.
- "Done" means you actually launched the app, walked the main flow, and produced an output artifact — a successful compile is not enough. If your environment cannot run it, say so explicitly in the final report and list what was not verified.

[Robustness & Error Handling]
- Show friendly messages for every error — never expose raw stack traces.
- On bad input, prompt and guide the user rather than crashing.
- Handle empty data, edge cases, and large volumes (10k+ rows) gracefully.
- For any action that changes files or data, show a preview or confirmation screen first; after execution, provide undo or recovery records.
${state.storage === 'none' ? '- Even without persistence, keep the last output and last failure reason in memory or a temp directory so the user can retry instantly.' : '- Snapshot important data on every save and keep at least the last 3 versions.'}
- Never overwrite the original input file by default; add a timestamp suffix on filename conflicts.
- Local logs should include only troubleshooting details, not sensitive business content.

[Security & Privacy]
- Unless I explicitly request online features, the app must work fully offline.
- Read only files the user selects or drops into the app; do not scan the whole machine.
- Validate paths, filenames, and table contents to prevent accidental deletion, overwrite, or unrelated reads.
- If sensitive fields are involved, provide masked display or a warning before export.

[Engineering Quality]
- Keep core business logic in separate modules rather than coupling it to UI controls, so it is testable and easy to change.
- Use clear boundaries for reading, parsing, processing, and exporting data; do not hard-code user file paths or machine-specific absolute paths.
- Grant the desktop shell only the permissions it needs; the renderer must not directly execute arbitrary local commands.
- Provide clear scripts for dev, test, typecheck, build, and package; if a script cannot run on this OS, explain why and give the alternate command.

[Quality Bar]
- Include 2-3 anonymized sample data files covering normal, empty, and invalid-input cases.
- Add automated tests for the core processing logic; at minimum cover import, processing, export or save.
- Run lint, typecheck, tests, and build; if the project lacks those scripts, add them first. Fix issues before handoff.
- Launch the app locally and complete one smoke test from import to output.
- Check common window sizes for overflow, clipped text, and raw technical error messages.

[Deliverables]
- Runnable project code with clear npm / Python scripts.
- README.md for maintainers: development, testing, packaging.
- USER_GUIDE.md for non-technical colleagues, <= 500 words, covering Install -> First run -> FAQ.
- Sample data folder so users can try the app immediately.
- KNOWN_LIMITATIONS.md with version boundaries, future improvements, and placeholders I need to replace.
- ${packageLine(state.platform, 'en')}

[Final Report]
When done, briefly report:
- what you built;
- how to open and try it;
- where the installer or build artifact is;
- what verification you ran;
- remaining limitations or placeholders.

Start now: give the under-10-line plan summary, then implement and verify.`;
}

export function buildRecoveryPrompt(state: FormState, lang: PromptLang): string {
  const goal = state.goal.trim() || (lang === 'zh' ? '（目标见上一轮对话）' : '(goal from the previous conversation)');
  const features = state.features.trim() || (lang === 'zh' ? '（功能见上一轮对话）' : '(features from the previous conversation)');

  if (lang === 'zh') {
    return `刚才这个桌面应用没有顺利跑通。请不要让我自己排查，也不要只解释原因；请你继续接手修复，直到能运行或明确说明真正阻塞点。

【请按这个顺序处理】
1. 先用 5 行以内说明你看到的失败现象和最可能原因。
2. 查看终端输出、日志、报错堆栈和相关文件，定位根因；不要凭印象猜，必要时加临时日志再删掉。
3. 直接修改代码或配置；不要让我手动改文件。修改前先读相关文件，做最小改动。
4. 重新运行必要命令：安装依赖、lint、类型检查、测试、构建或启动应用。命令报错先看完整输出再下结论。
5. 如果是打包失败，区分是代码问题、依赖问题、系统权限、签名/公证限制还是跨平台限制，并给出可运行的替代产物或明确命令。
6. 修完后必须真正启动一次应用并走完主流程，截图或文字描述确认看到了预期输出。
7. 最后用中文汇报：修了什么、根因是什么、如何打开、验证结果、还剩什么限制。

【底线要求】
- 不要引入未在 npm / PyPI 上真实存在的库；不确定的包名先验证。
- 不要为了"修好"而删除掉用户已有的功能、配置或数据；如必须删除请先说明并征得确认。
- 不要把 API Key、绝对路径、内网地址写进代码。

【原应用背景】
平台：${PLATFORM_ZH[state.platform]}
版本复杂度：${COMPLEXITY_ZH[state.complexity]}
目标：${goal}
功能：
${features}

请现在继续排查并修复。遇到真实业务文件、账号、证书或不可逆操作之前，不要停下来等我确认。`;
  }

  return `The desktop app did not run successfully. Do not ask me to debug it manually, and do not only explain the cause. Please continue fixing it until it runs or until you can clearly identify a truly blocking issue.

[Follow This Order]
1. In 5 lines or fewer, summarize the failure symptom and most likely cause.
2. Inspect terminal output, logs, stack traces, and relevant files to locate the root cause; do not guess — add temporary logging if useful, then remove it.
3. Modify code or configuration directly; do not ask me to edit files manually. Read related files first, prefer the minimum diff.
4. Re-run the needed commands: dependency install, lint, typecheck, tests, build, or app launch. Read the full error output before concluding.
5. If packaging fails, distinguish code issues, dependency issues, OS permissions, signing/notarization limits, and cross-platform limits; provide a runnable alternative artifact or exact command.
6. After fixing, actually launch the app and walk through the main flow; confirm in words (or a screenshot) that you saw the expected output.
7. Final report: what you fixed, the root cause, how to open it, verification results, and remaining limits.

[Non-Negotiables]
- Do not introduce libraries that do not actually exist on npm / PyPI; verify any uncertain package name first.
- Do not delete existing features, config, or data just to "make it work" — explain and confirm first if removal is needed.
- Never hard-code API keys, absolute paths, or internal hostnames.

[Original App Context]
Platform: ${PLATFORM_EN[state.platform]}
Scope: ${COMPLEXITY_EN[state.complexity]}
Goal: ${goal}
Features:
${features}

Please continue debugging and fixing now. Do not stop for confirmation unless you need real business files, accounts, certificates, or an irreversible action.`;
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
