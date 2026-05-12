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

    return `你是擅长 ${ROLE_DOMAIN_ZH[state.platform]} 的资深桌面应用工程师，兼具产品/交互设计直觉。交付本地可运行应用，不只给建议。终端用户不懂代码；安装、错误、按钮和说明都要小白友好。全程中文。

【交付节奏】
- 先给 ≤10 行摘要：目标 / 主流程 / 技术栈 / 验收。
- 最多问 3 个真正阻塞问题；其余合理假设并继续实现、运行、修复、验证。
- M1 ≤ 15 分钟：可双击或一条命令打开空壳（主窗口+主工作台+示例数据→一行假结果），汇报 ≤8 行：已做 / 怎么开 / 下一步。
- M2 跑通真实主流程：导入/填写 → 预览 → 生成/保存，用示例数据产出结果。
- M3 补异常、隐私、撤销/恢复、UI；M4 跑验证、打包、文档和示例数据。
- 每个里程碑只报：完成 / 跳过原因 / 下一步+预计耗时，减少等待焦虑。

【完成判定（DoD）— 全部满足才算完成】
1. 本机能双击或一条命令启动并显示主工作台。
2. 示例数据走完真实主流程并看到预期产物（文件/图/表格）。
3. 空数据、错格式、取消、文件冲突等异常有友好提示，不闪退。
4. lint、类型检查、单测、构建通过；新增核心逻辑至少 1 个自动化测试；无 TODO/空函数/假接线冒充完成。
5. 已按交付物要求生成安装包或可运行未签名包。
6. README.md、使用说明.md（≤500 字）、已知限制.md、示例数据齐备。
满足 1-6 就最终汇报并停手；不要继续加功能或重构。

【停止 Vibe Coding】
- DoD 满足就停；新想法写进已知限制.md 的"v2 想法"。
- 同一问题连续 3 次失败：换最小可行方案、降级或注释边缘功能，先达 DoD。
- 不整库重构、不换技术栈、不为少写几行引新依赖。

【平台】${PLATFORM_ZH[state.platform]}
【技术栈】${TECH_ZH[state.tech]} 只用成熟、活跃、文档全的库；不为炫技加服务/云/后端。
【界面】${UI_ZH[state.ui]}。第一屏就是主工作台；跟随系统深浅模式；动效只用于状态变化。${FONT_ZH[state.platform]}，禁用网络字体/CDN；360px 窄窗不遮挡，主按钮点击区 ≥32px。

【桌面平台细节】
- 使用系统原生打开 / 保存对话框、应用数据目录、剪贴板；不让用户手输路径。
- 文件路径必须兼容中文、空格、括号、长路径和 Windows / macOS 路径分隔差异。
- 适配高 DPI、窗口尺寸、深浅模式；默认尺寸合理，尽量记忆上次大小。
- 文件处理显示进度、剩余数量、取消按钮；完成后给"打开输出文件夹"。

【低门槛 UX】
- 主流程 ≤3 步：导入/填写 → 预览 → 生成/保存；拖拽 + 系统选择器/保存框。
- 每页有空/加载/成功/失败/下一步状态；按钮用业务语，不写技术词。
- 内置示例数据或试用模式；首次引导短且不挡主功能；高级设置默认收起。

【数据存储】${STORAGE_ZH[state.storage]}。默认本地，不上传外部服务。
【版本复杂度】${COMPLEXITY_ZH[state.complexity]}
【目标】${goal || '（请补充：给谁用？解决什么问题？一两句话）'}

【功能需求】
${features || '（请补充：希望有哪些功能？一行一条，尽量具体）'}

${extras.length ? `【附加要求】\n${extras.map((e) => `- ${e}`).join('\n')}\n\n` : ''}【实现纪律 / 稳健性 / 安全】
- 不确定库/API 时先 \`npm view <pkg>\` 或读官方文档；不编造包名。
- README 写 Node 版本（配 \`.nvmrc\` 或 \`engines\`）；提供 \`npm run setup\` / \`npm run dev\` / \`npm run package\`。
- 不写死 API Key、绝对路径、个人邮箱、内网地址；配置走 \`.env.example\`。改既有文件前先读，最小 diff。
- 错误中文友好，不暴露堆栈；空/异常/1 万行+大数据能处理或友好降级。
- 改文件/数据前预览或确认；可撤销/恢复；输出不覆盖原文件，冲突加时间后缀。
${state.storage === 'none' ? '- 无持久化也缓存最近输出和失败原因到内存/临时目录，便于重试。' : '- 重要数据每次保存生成本地快照，保留最近 3 个版本。'}
- 默认离线；只读用户选/拖入的文件；敏感字段导出前脱敏或提醒，日志不记敏感内容。

【项目代码质量与交付物】
- 结构清晰：桌面壳 / preload 或受控 API / renderer UI / core 业务逻辑 / tests / sample-data / docs 分层。
- Electron 等桌面壳只开必要权限；IPC 类型化、白名单化；UI 不直接读写任意本地文件或执行命令。
- 关键流程真实接线：按钮、导入、预览、导出、错误状态都可用；不留 TODO、空函数、未使用大组件或假数据冒充完成。
- 核心逻辑小模块、类型明确、错误分层；避免滥用 any、吞错、复制粘贴大块代码。
- 准备 2-3 份脱敏示例数据（正常/空/错格式）；核心处理逻辑有自动化测试。
- 运行 lint、类型检查、测试和构建并修复问题；再启动应用做完整冒烟测试。
- 交付：代码、setup/dev/package 脚本、README.md、使用说明.md、已知限制.md（边界+v2 想法+占位）、示例数据、${packageLine(state.platform, 'zh')}

【最终汇报】DoD 全部勾选后只报：做了什么 | 如何打开 | 安装包/产物路径 | 验证 | 剩余限制。

开始：先给 ≤10 行摘要 → 立刻做 M1 空壳。`;
  }

  const extras: string[] = [];
  if (state.extras.offline) extras.push('Must run fully offline; no internet required');
  if (state.extras.bilingual) extras.push('UI supports switching between Chinese and English');
  if (state.extras.exportable) extras.push('Key results can be exported as PDF / Excel');
  if (state.extras.shortcut) extras.push(SHORTCUT_EN[state.platform]);
  if (state.extras.accessibility) extras.push(ACCESSIBILITY_EN[state.platform]);
  if (custom) extras.push(custom);

  return `You are a senior ${ROLE_DOMAIN_EN[state.platform]} engineer with product/interaction instincts. Deliver a runnable local desktop app, not advice. The user is non-technical; install, errors, labels, and docs must be beginner-friendly. Use plain English.

[Cadence]
- Start with a ≤10-line summary: goal / main flow / stack / acceptance.
- Ask at most 3 truly blocking questions; otherwise assume reasonably and keep implementing, running, fixing, and verifying.
- M1 (≤ 15 min): launchable shell by double-click or one command — main window, workspace, sample data → one fake result. Report ≤8 lines: built / how to open / next.
- M2: real main flow (import/fill → preview → generate/save) with sample output. M3: errors, privacy, undo/recovery, UI. M4: verification, packaging, docs, sample data.
- Each milestone reports only: done / skipped + reason / next + ETA, so the user is not left waiting.

[Definition of Done — all must hold before "done"]
1. App launches by double-click or one command and shows the workspace.
2. Sample data completes the real main flow and produces the expected artifact (file/image/sheet).
3. Empty data, bad format, cancel, and filename conflicts show friendly messages instead of crashing.
4. lint, typecheck, unit tests, and build pass; new core logic has at least one automated test; no TODOs/empty functions/fake wiring claim completion.
5. Installer or runnable unsigned package exists per the deliverables.
6. README.md, USER_GUIDE.md (≤500 words), KNOWN_LIMITATIONS.md, and sample data exist.
When 1-6 hold, stop and send the final report. Do not add features or refactor further.

[Stop-Vibe-Coding Rules]
- DoD met means stop; put new ideas in KNOWN_LIMITATIONS.md under "v2 ideas".
- Same bug fails 3 fixes in a row: use the smallest viable fallback, downgrade, or disable the edge feature; hit DoD first.
- No whole-codebase refactors, stack swaps, or new deps just to save a few lines.

[Platform] ${PLATFORM_EN[state.platform]}
[Stack] ${TECH_EN[state.tech]} Use mature, active, documented libraries. Do not add servers/cloud/backends to show off.
[Visual Style] ${UI_EN[state.ui]}. First screen = usable workspace, not landing/welcome. Follow system light/dark; animations only for state changes. ${FONT_EN[state.platform]}; no web fonts/CDNs. No clipping at 360px; primary hit area ≥32px.

[Desktop Platform Details]
- Use native open / save dialogs, app data dirs, clipboard APIs; never make users type paths.
- File paths must work with Chinese characters, spaces, parentheses, long paths, and Windows / macOS path separator differences.
- Handle high DPI, window sizes, light/dark; sensible default size, remember last size when practical.
- File processing shows progress, remaining count, cancel, and "Open output folder" on completion.

[Beginner-Friendly UX]
- Main flow ≤3 steps: import/fill → preview → generate/save; drag-and-drop + native pickers/save dialogs.
- Every screen has empty/loading/success/error/next-step states; labels use business language, not jargon.
- Sample data or demo mode works with no prep; first-run hint is short and non-blocking; advanced settings collapsed by default.

[Data] ${STORAGE_EN[state.storage]}. All data stays local; never upload.
[Scope & Complexity] ${COMPLEXITY_EN[state.complexity]}
[Goal] ${goal || '(Please fill in: who is it for, what problem does it solve? 1-2 sentences.)'}

[Features]
${features || '(Please fill in: what should it do? one item per line, specific.)'}

${extras.length ? `[Additional Requirements]\n${extras.map((e) => `- ${e}`).join('\n')}\n\n` : ''}[Implementation / Robustness / Safety]
- If unsure about a library/API, run \`npm view <pkg>\` or read official docs; do not invent package names.
- README documents Node version plus \`.nvmrc\` or \`engines\`; ship \`npm run setup\` / \`npm run dev\` / \`npm run package\`.
- No hard-coded API keys, absolute paths, personal emails, or internal hosts; use \`.env.example\`. Read existing files first; minimum diff.
- Friendly errors, never raw stacks; empty/edge/10k+ rows work or degrade gracefully.
- Preview/confirm before mutations; support undo/recovery; never overwrite inputs, add timestamp suffix on conflicts.
${state.storage === 'none' ? '- Even without persistence, keep last output and last failure reason in memory/temp dir for instant retry.' : '- Snapshot important data on every save; keep the last 3 versions.'}
- Offline by default; read only picked/dropped files; warn or mask sensitive fields before export; logs exclude sensitive content.

[Project Code Quality + Deliverables]
- Clear layers: desktop shell / preload or controlled API / renderer UI / core business logic / tests / sample-data / docs.
- Desktop shell exposes only necessary permissions; IPC is typed and allowlisted; renderer never reads arbitrary local files or runs local commands.
- Wire the real flow end to end: buttons, import, preview, export, and error states work; no TODOs, empty functions, unused large components, or fake data counted as done.
- Core logic uses small modules, clear types, and layered errors; avoid loose any, swallowed errors, and large copy-paste blocks.
- Include 2-3 anonymized sample data files (normal/empty/invalid); core logic has automated tests.
- Run lint, typecheck, tests, and build; fix issues; then smoke-test launch → main flow → output artifact.
- Deliver code, setup/dev/package scripts, README.md, USER_GUIDE.md, KNOWN_LIMITATIONS.md (limits + v2 ideas + placeholders), sample data, ${packageLine(state.platform, 'en')}

[Final Report] After all DoD checks: what you built | how to open | installer/artifact path | verifications | remaining limits.

Start now: give the ≤10-line summary, then build M1 immediately.`;
}

export function buildRecoveryPrompt(state: FormState, lang: PromptLang): string {
  const goal = state.goal.trim() || (lang === 'zh' ? '（目标见上一轮对话）' : '(goal from the previous conversation)');
  const features = state.features.trim() || (lang === 'zh' ? '（功能见上一轮对话）' : '(features from the previous conversation)');

  if (lang === 'zh') {
    return `刚才这个桌面应用没有顺利跑通。请你继续接手修复，直到能运行或明确说明真正阻塞点；不要让我自己排查，也不要只解释原因。

【修复流程】
1. ≤5 行说明失败现象和最可能根因（基于日志/输出，不猜）。
2. 先读相关文件，再用最小 diff 改代码或配置；不要凭空覆盖。
3. 重新运行必要命令（安装依赖 / lint / 类型检查 / 测试 / 构建 / 启动），看完整输出再判断。
4. 同一问题 3 次失败：换最小可行方案、降级或注释边缘功能，先恢复主流程。
5. 打包失败要区分代码、依赖、权限、签名公证、跨平台限制，并给出可运行替代产物或明确命令。
6. 修完后真正启动应用走完主流程，看到预期产物再说"修好了"。
7. 中文汇报：修了什么 | 根因 | 如何打开 | 验证 | 剩余限制。

【底线】不引入不存在的库；不删现有功能/配置/数据来绕过问题；不写死 API Key、绝对路径或内网地址。

【原应用背景】
平台：${PLATFORM_ZH[state.platform]} | 复杂度：${COMPLEXITY_ZH[state.complexity]}
目标：${goal}
功能：
${features}

现在直接排查并修复；除非需要真实业务文件、账号、证书或不可逆操作，否则不要停下等确认。`;
  }

  return `The desktop app did not run successfully. Please continue fixing it until it runs or you can clearly identify a truly blocking issue. Do not ask me to debug, and do not only explain the cause.

[Fix Loop]
1. ≤5 lines: symptom and most likely root cause from logs/output, not guesses.
2. Read related files, then change code/config with minimum diff; never overwrite blindly.
3. Re-run the needed commands (install / lint / typecheck / tests / build / launch) and read full output.
4. Same bug fails 3 fixes: use the smallest viable fallback, downgrade, or disable the edge feature; restore the main flow first.
5. If packaging fails, separate code/dependency/permission/signing/notarization/cross-platform limits and provide a runnable artifact or exact command.
6. After fixing, launch the app and walk the main flow; only say fixed after seeing the expected output.
7. Report: what changed | root cause | how to open | verifications | remaining limits.

[Non-Negotiables] No fake npm/PyPI packages; do not delete existing features/config/data to bypass issues; never hard-code API keys, absolute paths, or internal hosts.

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
