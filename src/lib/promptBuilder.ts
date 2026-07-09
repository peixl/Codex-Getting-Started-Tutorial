import {
  quickStart,
  projectStructure,
  errorRecovery,
  uiStandards,
  DOD_ZH,
  DOD_EN,
  ANTI_PATTERNS_ZH,
  ANTI_PATTERNS_EN,
  OPENING_BRIEF_ZH,
  OPENING_BRIEF_EN,
  SAFETY_RULES_ZH,
  SAFETY_RULES_EN,
  QUALITY_RULES_ZH,
  QUALITY_RULES_EN,
  CODEX_EXECUTION_LOOP_ZH,
  CODEX_EXECUTION_LOOP_EN,
  WARM_UX_ZH,
  WARM_UX_EN,
  SUCCESS_PICTURE_ZH,
  SUCCESS_PICTURE_EN,
  FINAL_REPORT_ZH,
  FINAL_REPORT_EN,
  type ModuleTech,
} from './promptModules';

export type Platform = 'web' | 'windows' | 'mac' | 'both';
export type TechStack = 'nextjs' | 'electron' | 'tauri' | 'pyqt' | 'auto';
export type UiStyle = 'minimal' | 'dark' | 'fresh' | 'business';
export type Storage = 'browser' | 'localFile' | 'sqlite' | 'none';
export type Complexity = 'starter' | 'standard' | 'advanced';

export type Extras = {
  onlinePublish: boolean;
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
  platform: 'web',
  tech: 'nextjs',
  ui: 'minimal',
  storage: 'browser',
  complexity: 'standard',
  goal: '',
  features: '',
  extras: {
    onlinePublish: true,
    bilingual: false,
    exportable: true,
    shortcut: false,
    accessibility: false,
  },
  custom: '',
};

export type PromptLang = 'zh' | 'en';

const PLATFORM_ZH: Record<Platform, string> = {
  web: '网站应用（默认推荐：可在 Windows / macOS / Linux 构建部署）',
  windows: '只做 Windows 桌面应用（Windows 10 / 11）',
  mac: '只做 macOS 桌面应用（适配常见新版 macOS）',
  both: '跨平台桌面应用：同时支持 Windows 和 macOS',
};
const PLATFORM_EN: Record<Platform, string> = {
  web: 'Web app (default; build/deploy from Windows / macOS / Linux)',
  windows: 'Windows desktop app (Windows 10 / 11)',
  mac: 'macOS desktop app (recent macOS versions)',
  both: 'Cross-platform desktop app: both Windows and macOS',
};

const ROLE_DOMAIN_ZH: Record<Platform, string> = {
  web: '网站应用和业务工具',
  windows: 'Windows 桌面软件',
  mac: 'macOS 桌面软件',
  both: 'Windows 和 macOS 桌面软件',
};
const ROLE_DOMAIN_EN: Record<Platform, string> = {
  web: 'web apps and business tools',
  windows: 'Windows desktop apps',
  mac: 'macOS desktop apps',
  both: 'Windows and macOS desktop apps',
};

const ACCESSIBILITY_ZH: Record<Platform, string> = {
  web: '符合 Web 无障碍：键盘可用、读屏标签清楚、颜色对比达标',
  windows: '适配 Windows 讲述人',
  mac: '适配 macOS VoiceOver',
  both: '适配 Windows 讲述人和 macOS VoiceOver',
};
const ACCESSIBILITY_EN: Record<Platform, string> = {
  web: 'Accessible web UI: keyboard usable, clear screen-reader labels, sufficient contrast',
  windows: 'Accessible; Windows Narrator compatible',
  mac: 'Accessible; macOS VoiceOver compatible',
  both: 'Accessible; Windows Narrator and macOS VoiceOver compatible',
};

const SHORTCUT_ZH: Record<Platform, string> = {
  web: '常用操作给键盘快捷键；网站使用 Ctrl / Command 兼容写法，避开浏览器系统快捷键',
  windows: '常用操作给快捷键；Windows 使用 Ctrl / Alt，避开系统快捷键',
  mac: '常用操作给快捷键；macOS 使用 Command / Option，避开系统快捷键',
  both: '常用操作给快捷键：Windows 使用 Ctrl / Alt，macOS 使用 Command / Option；同功能保持平台习惯',
};
const SHORTCUT_EN: Record<Platform, string> = {
  web: 'Shortcuts for common actions using Ctrl / Command-compatible web patterns; avoid browser/system shortcuts',
  windows: 'Shortcuts for common actions using Windows-style Ctrl / Alt combinations; avoid system shortcuts',
  mac: 'Shortcuts for common actions using macOS-style Command / Option combinations; avoid system shortcuts',
  both: 'Shortcuts: Windows uses Ctrl / Alt, macOS uses Command / Option; keep actions familiar per platform',
};

const ONLINE_PUBLISH_ZH: Record<Platform, string> = {
  web: '可部署上线并发链接给同事；README 写清域名、环境变量、预览、回滚和正式发布步骤',
  windows: 'Windows 桌面应用也要在线可用：可接 HTTPS API / 云同步 / 自动更新；README 写清网络配置、账号和失败重试方式',
  mac: 'macOS 桌面应用也要在线可用：可接 HTTPS API / 云同步 / 自动更新；README 写清网络配置、账号和失败重试方式',
  both: '桌面应用也要在线可用：Windows / macOS 都可接 HTTPS API、云同步和自动更新；README 写清网络配置、账号和失败重试方式',
};
const ONLINE_PUBLISH_EN: Record<Platform, string> = {
  web: 'Deployable and shareable by link; README covers domain, environment variables, preview, rollback, and production release steps',
  windows: 'Windows desktop apps must also be online-usable: connect to HTTPS APIs, cloud sync, and auto-update; README covers network config, accounts, and retry behavior',
  mac: 'macOS desktop apps must also be online-usable: connect to HTTPS APIs, cloud sync, and auto-update; README covers network config, accounts, and retry behavior',
  both: 'Desktop apps must also be online-usable on Windows and macOS: connect to HTTPS APIs, cloud sync, and auto-update; README covers network config, accounts, and retry behavior',
};

const TECH_ZH: Record<TechStack, string> = {
  nextjs: '网站应用方案（内部使用 Next.js + React + TypeScript）。使用 App Router；先跑 npm run dev，再确保 npm run build / npm run start 通过；支持 Windows / macOS / Linux 全平台构建部署。',
  electron: 'Electron + React + TypeScript（办公文件/表格/PDF/图片首选）。TS strict；contextIsolation+sandbox 开，nodeIntegration 关，preload 最小 IPC。',
  tauri: 'Tauri + React + TypeScript（体积小、启动快）；仅 Rust 就绪才选，命令权限按需白名单。',
  pyqt: 'Python + PyQt6（极简单窗口工具）；Python ≥3.10，venv/uv 管依赖，早测 PyInstaller/briefcase。',
  auto: '网站应用默认使用网站方案；桌面工具默认 Electron；单窗口本地脚本可选 PyQt6；Tauri 仅用户要求且 Rust 就绪。先 1 行说明取舍。',
};
const TECH_EN: Record<TechStack, string> = {
  nextjs: 'Website app stack (internally Next.js + React + TypeScript). Use App Router; run npm run dev first, then ensure npm run build / npm run start pass; supports Windows / macOS / Linux build and deployment.',
  electron: 'Electron + React + TypeScript (office files/PDF/images). TS strict; contextIsolation+sandbox on, nodeIntegration off, minimal preload IPC.',
  tauri: 'Tauri + React + TypeScript (small, fast). Use only when Rust is ready; allowlist commands on demand.',
  pyqt: 'Python + PyQt6 (tiny single-window tools). Python ≥3.10; venv/uv deps; verify PyInstaller/briefcase early.',
  auto: 'Default to the website stack for web apps; default to Electron for desktop tools; use PyQt6 only for a tiny local-script window; use Tauri only if requested and Rust is ready. State the choice in one line.',
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
  browser: '浏览器本地存储 / 下载文件（网站应用默认，简单可部署）',
  localFile: '存到本地文件（Excel / CSV / JSON），简单可迁移',
  sqlite: '本地 SQLite，适合千~万级数据',
  none: '无需持久化，运行完即可',
};
const STORAGE_EN: Record<Storage, string> = {
  browser: 'Browser local storage / downloadable files (default for web apps; easy to deploy)',
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
  web: '字体使用系统默认，兼容 Windows / macOS / Linux',
  windows: '字体优先使用 Segoe UI、微软雅黑',
  mac: '字体优先使用系统字体（San Francisco / 苹方）',
  both: '字体使用系统默认（Windows 上用 Segoe UI / 微软雅黑，macOS 上用 San Francisco / 苹方）',
};
const FONT_EN: Record<Platform, string> = {
  web: 'Use system fonts compatible with Windows / macOS / Linux',
  windows: 'Use system fonts (Segoe UI / Microsoft YaHei)',
  mac: 'Use system fonts (San Francisco / PingFang)',
  both: 'Use system fonts (Segoe UI / Microsoft YaHei on Windows, San Francisco / PingFang on macOS)',
};

const WEB_MIGRATION_ZH = `【桌面应用迁移为网站应用】
- 如果用户目标是把原有 Windows/macOS 桌面应用迁移为网站应用，先保留原有核心流程、字段、验收标准和用户语言，不要为了换框架重做业务。
- 盘点旧实现：Electron / Tauri / PyQt 的窗口、菜单、文件读写、本地数据库、快捷键和导出能力，逐项映射到 Web 形态。
- 本地打开/保存文件 → 文件上传 / 浏览器下载；本地 SQLite/JSON → 浏览器本地存储或服务端存储；系统通知 → 页面内 Toast / 浏览器通知。
- 桌面多窗口 → Web 路由、标签页或弹窗；菜单/快捷键 → 顶部工具栏和可发现的按钮。
- 迁移完成后必须给一份对照表：旧能力、Web 替代方案、已实现状态、暂不迁移原因。`;

const WEB_MIGRATION_EN = `[Desktop-to-web migration]
- If the goal is converting an existing Windows/macOS desktop app into a web app, preserve the core workflow, fields, acceptance criteria, and user language first; do not rewrite the business just because the framework changed.
- Inventory the old implementation: Electron / Tauri / PyQt windows, menus, file reads/writes, local database, shortcuts, and export behavior, then map each item to the web.
- Local open/save files → file upload / browser download; local SQLite/JSON → browser local storage or server storage; system notification → in-page toast / browser notification.
- Multi-window desktop UI → web routes, tabs, or dialogs; menus/shortcuts → top toolbar and discoverable buttons.
- After migration, provide a comparison table: old capability, web replacement, implemented status, and reason if deferred.`;

const ONLINE_STANDARD_ZH = `【在线网站标准】
- 默认按在线网站标准设计：可部署、可分享链接、可在浏览器或联网桌面客户端使用，不把单机执行当交付目标。
- 先拆成页面/路由、表单与上传、预览与结果、导出与分享、设置与权限、失败与恢复六类能力；每类都要有可点击的真实状态。
- 需要账号、API、数据库或文件存储时，用环境变量和可替换配置；先用 sample-data / mock service 跑通，再写清接真实服务的位置。
- 写清浏览器端/服务端边界：哪些数据只在浏览器处理，哪些请求进入服务端，哪些字段需要脱敏、权限、审计或删除入口。
- 网络异常、接口超时、权限失效、部署失败都要有页面级反馈和重试路径；不能白屏，也不能只让用户看终端。
- 桌面应用也要在线可用：把桌面壳视为网站/服务的客户端，保留 HTTPS API、同步、账号、更新和远程配置边界。`;

const ONLINE_STANDARD_EN = `[Online Website Standard]
- Design to online website standards by default: deployable and shareable by link, usable in browsers or connected desktop clients; single-machine execution is not the delivery goal.
- Break the product into pages/routes, forms/uploads, preview/results, export/share, settings/permissions, and failure/recovery; each area needs real clickable states.
- When accounts, APIs, databases, or file storage are needed, use environment variables and replaceable config; ship sample-data / mock services first, then document where real services connect.
- Document the browser/server boundary: what stays in the browser, what reaches the server, and which fields need masking, permissions, audit, or deletion controls.
- Network failure, API timeout, expired permission, and deployment failure need page-level feedback plus retry paths; no blank screens and no terminal-only recovery.
- Desktop apps must also be online-usable: treat the desktop shell as a client for the website/service, with HTTPS API, sync, account, update, and remote-config boundaries.`;

function isWebTarget(state: Pick<FormState, 'platform'>) {
  return state.platform === 'web';
}

function effectiveTech(state: Pick<FormState, 'platform' | 'tech'>): TechStack {
  if (state.platform === 'web') return 'nextjs';
  return state.tech === 'nextjs' ? 'auto' : state.tech;
}

function effectiveStorage(state: Pick<FormState, 'platform' | 'storage'>): Storage {
  if (state.platform === 'web') return state.storage;
  return state.storage === 'browser' ? 'localFile' : state.storage;
}

function packageLine(platform: Platform, lang: PromptLang) {
  if (lang === 'zh') {
    switch (platform) {
      case 'web':
        return '生成可部署的网站应用，不是桌面安装包；npm run build 必须通过；README 写清 npm run dev / build / start，以及 Vercel、Cloudflare 或 Node 部署方式，确保 Windows / macOS / Linux 都能构建部署。';
      case 'windows':
        return '生成 Windows 安装包（优先 .exe，必要时 .msi）；无法签名则出可运行未签名包，并在 README 写清首次打开提示。';
      case 'mac':
        return '生成 macOS .dmg；无法签名/公证则出可运行未签名包，并在 README 写清首次打开安全提示。';
      case 'both':
        return '生成 Windows 安装包和 macOS .dmg；本机不能跨平台打包时，配脚本并写清命令、签名限制和未签名试用方式。';
    }
  } else {
    switch (platform) {
      case 'web':
        return 'Final: deliver a deployable web app, not a desktop installer. npm run build must pass. README documents npm run dev / build / start plus Vercel, Cloudflare, or Node deployment, ensuring Windows / macOS / Linux can build and deploy it.';
      case 'windows':
        return 'Final: build a Windows installer (prefer .exe; .msi if useful). If unsigned, build a runnable package and document first-launch warnings.';
      case 'mac':
        return 'Final: build a macOS .dmg installer. If unsigned/not notarized, build a runnable package and document first-launch warnings.';
      case 'both':
        return 'Final: build a Windows installer and a macOS .dmg installer; if this machine cannot do both, configure scripts and document commands, signing limits, and unsigned trial.';
    }
  }
}

function deliveryRequirementsZh(state: FormState): string {
  const pack = packageLine(state.platform, 'zh');
  if (isWebTarget(state)) {
    const lines = [
      '- 先创建 sample-data/ 或 src/data/seed.ts，放入贴近业务的脱敏示例数据，确保首次打开网站就能走完主流程。',
      '- 主流程 ≤3 步：填写/上传 → 预览 → 生成/下载。第一屏就是工作台，不做欢迎页。',
      '- 支持拖拽上传和文件选择；结果用浏览器下载、复制或页面内保存，不使用系统打开/保存对话框。',
      '- 空数据、格式错误、刷新页面、网络失败 → 给友好中文提示，不白屏、不暴露技术错误。',
      '- 响应式适配桌面和手机；路径兼容中文、空格、括号，文件名和表头也要兼容。',
      `- ${pack}`,
      '- 附 ≤500 字中文使用说明 + README，写清本地启动、构建、部署、已知限制。',
      '- 真实接线：每个按钮能点、每次上传能用、每次导出都有浏览器产物；TODO、空函数、假数据不算完成。',
    ];
    if (state.complexity === 'advanced') {
      lines.splice(5, 0,
        '- 加设置页、历史记录、批量处理；需要登录/权限时先做最小可用权限模型并写清数据边界。',
      );
    }
    return lines.join('\n');
  }
  const lines = [
    '- 先创建 sample-data/ 放入贴近业务的脱敏示例数据，确保首次启动就能走完主流程。',
    '- 主流程 ≤3 步：导入/填写 → 预览 → 生成/保存。第一屏就是工作台，不做欢迎页。',
    '- 支持拖拽导入；用系统打开/保存对话框；完成后给"打开输出文件夹"按钮。',
    '- 桌面应用也要在线可用：提供网络状态、HTTPS API 配置、账号/同步/自动更新入口或清晰的接入边界；网络异常要能重试并保留本地草稿。',
    '- 空数据、格式错误、取消操作 → 弹友好中文提示，不闪退、不暴露技术错误。',
    '- 路径兼容中文、空格、括号；适配深浅模式。',
    `- ${pack}`,
    '- 附 ≤500 字中文使用说明 + README。',
    '- 真实接线：每个按钮能点、每次导入能用、每次导出都有文件落地；TODO、空函数、假数据不算完成。',
  ];
  if (state.complexity === 'advanced') {
    lines.splice(4, 0,
      '- 加设置页、历史记录、批量处理；危险操作二次确认并可恢复。',
    );
  }
  return lines.join('\n');
}

function deliveryRequirementsEn(state: FormState): string {
  const pack = packageLine(state.platform, 'en');
  if (isWebTarget(state)) {
    const lines = [
      '- Create sample-data/ or src/data/seed.ts with realistic anonymized data so the web app works on first visit.',
      '- Main flow ≤3 steps: fill/upload → preview → generate/download. First screen is the workspace, no welcome page.',
      '- Support drag-and-drop upload and file picker; output via browser download, copy, or in-page save, not native open/save dialogs.',
      '- Empty data, bad format, refresh, network failure → friendly message, no blank screen, no raw errors.',
      '- Responsive for desktop and mobile; Paths handle Chinese, spaces, and parentheses, and filenames/headers do too.',
      `- ${pack}`,
      '- Include a ≤500-word user guide + README covering local start, build, deployment, and known limits.',
      '- Real-wired delivery: every button works, every upload loads, every export creates a browser artifact; TODOs / empty functions / fake data do not count as done.',
    ];
    if (state.complexity === 'advanced') {
      lines.splice(5, 0,
        '- Add settings, history, batch processing; if auth/permissions are needed, ship the smallest usable permission model and document data boundaries.',
      );
    }
    return lines.join('\n');
  }
  const lines = [
    '- Create sample-data/ with realistic anonymized data so the app works on first launch.',
    '- Main flow ≤3 steps: import/fill → preview → generate/save. First screen is the workspace, no welcome page.',
    '- Support drag-and-drop; use native open/save dialogs; show "Open output folder" after completion.',
    '- Desktop apps must also be online-usable: provide network status, HTTPS API config, account/sync/auto-update entry points or clear integration boundaries; network failure supports retry and keeps local drafts.',
    '- Empty data, bad format, cancel → friendly message, no crash, no raw errors.',
    '- Paths handle Chinese, spaces, parentheses; support light/dark mode.',
    `- ${pack}`,
    '- Include a ≤500-word user guide + README.',
    '- Real-wired delivery: every button works, every import loads, every export produces a file; TODOs / empty functions / fake data do not count as done.',
  ];
  if (state.complexity === 'advanced') {
    lines.splice(4, 0,
      '- Add settings, history, batch processing; confirm dangerous actions and support recovery.',
    );
  }
  return lines.join('\n');
}


export function buildPrompt(state: FormState, lang: PromptLang): string {
  const goal = state.goal.trim();
  const features = state.features.trim();
  const custom = state.custom.trim();
  const webTarget = isWebTarget(state);
  const tech = effectiveTech(state);
  const storage = effectiveStorage(state);

  if (lang === 'zh') {
    const extras: string[] = [];
    if (state.extras.onlinePublish) extras.push(ONLINE_PUBLISH_ZH[state.platform]);
    if (state.extras.bilingual) extras.push('界面支持中英双语切换');
    if (state.extras.exportable) extras.push('结果可导出为 PDF / Excel');
    if (state.extras.shortcut) extras.push(SHORTCUT_ZH[state.platform]);
    if (state.extras.accessibility) extras.push(ACCESSIBILITY_ZH[state.platform]);
    if (custom) extras.push(custom);
    const role = webTarget
      ? `你是资深网站应用工程师，擅长 ${ROLE_DOMAIN_ZH[state.platform]}，也是一名体贴的产品经理。你写代码前先把自己当成用户走一遍：第一眼看到什么、第一次怎么用、第一次出错怎么自救。你的任务是做出一个可构建、可部署、可在浏览器使用的网站应用，不是给建议。收到后直接动手实现，全程中文。`
      : `你是资深桌面应用工程师，擅长 ${ROLE_DOMAIN_ZH[state.platform]}，也是一名体贴的产品经理。你写代码前先把自己当成用户走一遍：第一眼看到什么、第一次怎么用、第一次出错怎么自救。你的任务是做出一个本地窗口可用、同时能接在线服务的桌面工具，不是给建议。收到后直接动手实现，全程中文。`;
    const productBlock = webTarget ? `\n\n${WEB_MIGRATION_ZH}` : '';

    return `${role}

${OPENING_BRIEF_ZH}${productBlock}

【任务】
目标：${goal || '（请补充：给谁用？解决什么问题？例："帮财务同事把每月对账从 2 天压到 1 小时"）'}

功能：
${features || '（请补充：一行一条。例：\n- 拖入两张 Excel → 自动按订单号比对 → 差异标红\n- 点"导出" → 生成差异明细 Excel\n- 超过 10 万行 → 分批处理并显示进度条）'}
${extras.length ? `\n附加：${extras.join('；')}` : ''}

【技术】
平台：${PLATFORM_ZH[state.platform]}。技术栈：${TECH_ZH[tech]}
界面：${UI_ZH[state.ui]}。${FONT_ZH[state.platform]}。
数据：${STORAGE_ZH[storage]}。

${quickStart(tech as ModuleTech, 'zh')}

${projectStructure(tech as ModuleTech, 'zh')}

${uiStandards(tech as ModuleTech, 'zh')}

${CODEX_EXECUTION_LOOP_ZH}

${ONLINE_STANDARD_ZH}

【交付要求】
${deliveryRequirementsZh(state)}

${WARM_UX_ZH}

${SUCCESS_PICTURE_ZH}

${errorRecovery(tech as ModuleTech, 'zh')}

${SAFETY_RULES_ZH}

${QUALITY_RULES_ZH}

${ANTI_PATTERNS_ZH}

${DOD_ZH}

${FINAL_REPORT_ZH}`;
  }

  const extras: string[] = [];
  if (state.extras.onlinePublish) extras.push(ONLINE_PUBLISH_EN[state.platform]);
  if (state.extras.bilingual) extras.push('UI supports Chinese/English switching');
  if (state.extras.exportable) extras.push('Results exportable as PDF / Excel');
  if (state.extras.shortcut) extras.push(SHORTCUT_EN[state.platform]);
  if (state.extras.accessibility) extras.push(ACCESSIBILITY_EN[state.platform]);
  if (custom) extras.push(custom);
  const role = webTarget
    ? `You are a senior ${ROLE_DOMAIN_EN[state.platform]} engineer and a thoughtful product manager. Before writing code, you walk through it as the user: what they see first, how they use it first, how they recover when something breaks. Build a deployable browser-based web app, not advice. Start immediately. Plain English.`
    : `You are a senior ${ROLE_DOMAIN_EN[state.platform]} engineer and a thoughtful product manager. Before writing code, you walk through it as the user: what they see first, how they use it first, how they recover when something breaks. Build a desktop tool with a local window and online-service connectivity, not advice. Start immediately. Plain English.`;
  const productBlock = webTarget ? `\n\n${WEB_MIGRATION_EN}` : '';

  return `${role}

${OPENING_BRIEF_EN}${productBlock}

[Task]
Goal: ${goal || '(Fill in: who is it for, what problem? Example: "Help finance cut monthly reconciliation from 2 days to 1 hour")'}

Features:
${features || '(Fill in, one per line. Example:\n- Drop two Excel files → auto-match by order ID → mismatches highlighted red\n- Click "Export" → generates a diff-detail Excel\n- Over 100k rows → batch with progress bar)'}
${extras.length ? `\nAdditional: ${extras.join('; ')}` : ''}

[Tech]
Platform: ${PLATFORM_EN[state.platform]}. Stack: ${TECH_EN[tech]}
Visual: ${UI_EN[state.ui]}. ${FONT_EN[state.platform]}.
Data: ${STORAGE_EN[storage]}.

${quickStart(tech as ModuleTech, 'en')}

${projectStructure(tech as ModuleTech, 'en')}

${uiStandards(tech as ModuleTech, 'en')}

${CODEX_EXECUTION_LOOP_EN}

[Online Website Standard]
${ONLINE_STANDARD_EN.split('\n').slice(1).join('\n')}

[Delivery Requirements]
${deliveryRequirementsEn(state)}

${WARM_UX_EN}

${SUCCESS_PICTURE_EN}

${errorRecovery(tech as ModuleTech, 'en')}

${SAFETY_RULES_EN}

${QUALITY_RULES_EN}

${ANTI_PATTERNS_EN}

${DOD_EN}

${FINAL_REPORT_EN}`;
}

export function buildRecoveryPrompt(state: FormState, lang: PromptLang): string {
  const goal = state.goal.trim() || (lang === 'zh' ? '（目标见上一轮对话）' : '(goal from the previous conversation)');
  const features = state.features.trim() || (lang === 'zh' ? '（功能见上一轮对话）' : '(features from the previous conversation)');
  const webTarget = isWebTarget(state);

  if (lang === 'zh') {
    const appName = webTarget ? '网站应用' : '桌面应用';
    const rerun = webTarget
      ? '安装 / lint / 类型检查 / npm run build / npm run start'
      : '安装 / lint / 类型检查 / 构建 / 启动';
    const smoke = webTarget
      ? '修完后用示例数据走完主流程，看到浏览器结果页或下载产物才算修好'
      : '修完后用示例数据走完主流程，看到产物才算修好';

    return `这个${appName}没跑通。请直接修复到能运行。

【修复步骤】
1. ≤5 行写清失败现象和根因（读日志，不猜）
2. 最小 diff 修改；不删功能、不换技术栈来绕过
3. 重新运行：${rerun}
4. 同一问题 3 次失败 → 降级边缘功能，先恢复主流程
5. ${smoke}

遵守原提示词的所有安全底线和执行纪律。

【原应用】
平台：${PLATFORM_ZH[state.platform]} | 复杂度：${COMPLEXITY_ZH[state.complexity]}
目标：${goal}
功能：
${features}

现在直接排查并修复。`;
  }

  const appName = webTarget ? 'web app' : 'desktop app';
  const rerun = webTarget
    ? 'install / lint / typecheck / npm run build / npm run start'
    : 'install / lint / typecheck / build / launch';
  const smoke = webTarget
    ? 'After fixing, run sample-data through the main flow; only report fixed after seeing the browser result page or downloaded artifact'
    : 'After fixing, run sample-data through the main flow; only report fixed after seeing the artifact';

  return `The ${appName} did not run. Fix it until it works.

[Fix Steps]
1. In ≤5 lines, state the symptom and log-based root cause (no guessing)
2. Minimum diff fix; do not delete features or swap stacks to bypass
3. Re-run: ${rerun}
4. Same bug fails 3 times → downgrade edge feature, restore main flow
5. ${smoke}

Follow all safety rules and execution discipline from the original prompt.

[Original App]
Platform: ${PLATFORM_EN[state.platform]} | Scope: ${COMPLEXITY_EN[state.complexity]}
Goal: ${goal}
Features:
${features}

Start debugging and fixing now.`;
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
    id: 'desktop-to-web',
    titleZh: '桌面工具改成网站应用',
    titleEn: 'Convert a desktop tool to web',
    taglineZh: '保留原流程，做成全平台可部署的网站',
    taglineEn: 'Keep the workflow, rebuild as a deployable website',
    state: {
      platform: 'web',
      tech: 'nextjs',
      ui: 'business',
      storage: 'browser',
      extras: {
        onlinePublish: true,
        bilingual: false,
        exportable: true,
        shortcut: true,
        accessibility: true,
      },
      goal: '把原来只能在 Windows / macOS 本地运行的桌面工具，迁移成团队都能用的网站应用。',
      features:
        '- 保留原有核心流程、字段和验收标准\n- 把本地打开/保存改为文件上传和浏览器下载\n- 把本地存储改为浏览器本地存储，后续可接服务端数据库\n- 生成旧能力到网站替代方案的迁移对照表\n- 支持 Windows / macOS / Linux 环境构建部署',
    },
  },
  {
    id: 'excel-merge',
    titleZh: '把几张 Excel 合并成一张',
    titleEn: 'Merge several Excel files',
    taglineZh: '拖进来自动汇总，输出一张新表',
    taglineEn: 'Drop them in, auto-merge, output one sheet',
    state: {
      platform: 'both',
      tech: 'auto',
      ui: 'minimal',
      storage: 'localFile',
      goal: '把每月从不同门店发来的十几张 Excel 自动合并成一张总表。',
      features:
        '- 拖入一批 Excel\n- 自动识别列名并合并\n- 生成总表，带"来源"列\n- 导出合并后的 Excel',
    },
  },
  {
    id: 'shared-inventory-web',
    titleZh: '库存查询网站',
    titleEn: 'Inventory lookup website',
    taglineZh: '团队打开网页，按 SKU 查库存和风险',
    taglineEn: 'Team web lookup for stock and risk',
    state: {
      platform: 'web',
      tech: 'nextjs',
      ui: 'business',
      storage: 'browser',
      goal: '把库存 Excel 变成团队都能打开的网站应用，销售和运营输入 SKU 就能查库存。',
      features:
        '- 首页提供 SKU / 商品名 / 仓库搜索\n- 上传库存 CSV 或 Excel 后自动校验表头\n- 库存低于安全线标黄，缺货标红\n- 支持导出当前筛选结果 CSV\n- npm run build 通过并写清部署方式',
    },
  },
  {
    id: 'excel-to-app',
    titleZh: '把一张 Excel 变成可查询的小工具',
    titleEn: 'Turn an Excel into a searchable tool',
    taglineZh: '给同事一个界面，不给他们直接改 Excel',
    taglineEn: 'Give teammates a UI instead of a raw spreadsheet',
    state: {
      platform: 'both',
      tech: 'auto',
      ui: 'fresh',
      storage: 'localFile',
      goal: '把商品清单 Excel 做成可搜索、可筛选、可导出的小工具。',
      features:
        '- 打开后自动读取本地 products.xlsx\n- 按名称/SKU 模糊搜索\n- 按库存阈值筛选\n- 导出筛选结果到新 Excel',
    },
  },
  {
    id: 'team-file-intake-web',
    titleZh: '团队文件收集网站',
    titleEn: 'Team file intake website',
    taglineZh: '网页提交文件，自动看谁已交缺交',
    taglineEn: 'Collect files and track missing people',
    state: {
      platform: 'web',
      tech: 'nextjs',
      ui: 'minimal',
      storage: 'browser',
      extras: {
        onlinePublish: true,
        bilingual: false,
        exportable: true,
        shortcut: false,
        accessibility: true,
      },
      goal: '做一个团队文件收集网站，让同事提交文件和备注，负责人能看到谁已提交、谁还缺交。',
      features:
        '- 提交表单：姓名、部门、文件类型、备注、文件上传\n- 负责人看板：已提交 / 未提交 / 需补充\n- 可粘贴名单，自动比对缺交人员\n- 导出提交清单 CSV，复制缺交提醒文案\n- npm run build 通过并写清部署方式',
    },
  },
  {
    id: 'data-snapshot',
    titleZh: '每天一张业务快报图',
    titleEn: 'Daily business snapshot',
    taglineZh: '导入数据，一键生成发群的图片/PDF',
    taglineEn: 'Import data, one-click export a shareable image',
    state: {
      platform: 'both',
      tech: 'auto',
      ui: 'minimal',
      storage: 'sqlite',
      extras: {
        onlinePublish: true,
        bilingual: false,
        exportable: true,
        shortcut: false,
        accessibility: false,
      },
      goal: '每天导入昨日数据，一键生成适合发群的日报长图或 PDF。',
      features:
        '- 拖入 Excel（GMV、订单、流量）\n- 自动识别类型，可手动调整\n- 一键导出 PNG 或 PDF\n- 保留最近 30 天日报',
    },
  },
  {
    id: 'kpi-dashboard-web',
    titleZh: '业务指标看板网站',
    titleEn: 'KPI dashboard website',
    taglineZh: '上传每日数据，团队打开网页看趋势',
    taglineEn: 'Upload daily data, share trends online',
    state: {
      platform: 'web',
      tech: 'nextjs',
      ui: 'business',
      storage: 'browser',
      extras: {
        onlinePublish: true,
        bilingual: false,
        exportable: true,
        shortcut: false,
        accessibility: true,
      },
      goal: '做一个团队业务指标看板网站，上传每日 CSV 后自动更新 KPI、趋势和异常提醒。',
      features:
        '- 首屏展示 GMV、订单数、转化率、客单价\n- 上传 CSV 后刷新指标和近 14 天趋势\n- 波动超过阈值时给异常提醒\n- 渠道表可排序筛选\n- 导出日报 PNG 或 CSV，npm run build 通过',
    },
  },
  {
    id: 'followup-ledger',
    titleZh: '跟进台账',
    titleEn: 'Follow-up ledger',
    taglineZh: '合同、回款、候选人……都能套这个模板',
    taglineEn: 'Contracts, collections, candidates — one template fits all',
    state: {
      platform: 'both',
      tech: 'auto',
      ui: 'business',
      storage: 'sqlite',
      goal: '做一个本地台账：每条事项一张卡片，到期前自动变红提醒。',
      features:
        '- 卡片字段：对方/类型/金额/关键日期/状态\n- 色块显示状态\n- 到期前 N 天自动变红\n- 导出本周待办到 Excel',
    },
  },
];
