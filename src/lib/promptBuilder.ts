export type Platform = 'windows' | 'mac' | 'both';
export type TechStack = 'electron' | 'tauri' | 'pyqt' | 'auto';
export type UiStyle = 'minimal' | 'dark' | 'fresh' | 'business';
export type Storage = 'localFile' | 'sqlite' | 'none';

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
  mac: '只做 macOS 桌面应用',
  both: '跨平台桌面应用：同时支持 Windows 和 macOS',
};
const PLATFORM_EN: Record<Platform, string> = {
  windows: 'Windows desktop app (Windows 10 / 11)',
  mac: 'macOS desktop app',
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

const TECH_ZH: Record<TechStack, string> = {
  electron: 'Electron + React + TypeScript（最通用，社区资源丰富）',
  tauri: 'Tauri + React + TypeScript（体积更小，启动更快）',
  pyqt: 'Python + PyQt6（适合简单工具，代码量少）',
  auto: '由你根据具体需求选最合适的轻量方案（优先考虑 Electron + React）',
};
const TECH_EN: Record<TechStack, string> = {
  electron: 'Electron + React + TypeScript (most common, rich ecosystem)',
  tauri: 'Tauri + React + TypeScript (smaller binary, faster startup)',
  pyqt: 'Python + PyQt6 (good for small utilities, less code)',
  auto: 'Pick the lightest sensible stack yourself (prefer Electron + React)',
};

const UI_ZH: Record<UiStyle, string> = {
  minimal: '简洁：白底、大字号、圆角卡片、留白多，强调功能清晰',
  dark: '深色：黑底、高对比，强调信息密度',
  fresh: '清新：淡蓝 / 淡紫渐变、大圆角、柔和色、多留白',
  business: '业务型：信息密度高、表格清晰、分隔线柔和，偏后台工具风格',
};
const UI_EN: Record<UiStyle, string> = {
  minimal: 'Minimal: white background, generous whitespace, rounded cards, large type',
  dark: 'Dark: black background, high contrast, dense information',
  fresh: 'Fresh: soft blue / violet gradients, large radius, muted palette, spacious',
  business: 'Business: dense data, clean tables, subtle dividers, dashboard-like',
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

function packageLine(platform: Platform, lang: PromptLang) {
  if (lang === 'zh') {
    switch (platform) {
      case 'windows':
        return '最后打包成 Windows 的 .exe 安装包。';
      case 'mac':
        return '最后打包成 macOS 的 .dmg 安装包。';
      case 'both':
        return '最后同时生成 Windows .exe 安装包和 macOS .dmg 安装包。';
    }
  } else {
    switch (platform) {
      case 'windows':
        return 'Final step: build a Windows .exe installer.';
      case 'mac':
        return 'Final step: build a macOS .dmg installer.';
      case 'both':
        return 'Final step: build a Windows .exe installer AND a macOS .dmg installer.';
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
    if (state.extras.shortcut) extras.push('为常用操作提供键盘快捷键');
    if (state.extras.accessibility) extras.push(ACCESSIBILITY_ZH[state.platform]);
    if (custom) extras.push(custom);

    return `你是一名擅长 ${ROLE_DOMAIN_ZH[state.platform]} 的资深工程师，同时有丰富的产品和交互设计经验。请帮我搭建一个本地运行的桌面应用。使用者是企业里完全不懂代码的业务同事，所以技术选型、打包方式、报错提示、操作引导都要对小白友好。

【平台】
${PLATFORM_ZH[state.platform]}

【技术栈】
${TECH_ZH[state.tech]}。使用成熟、社区活跃、文档齐全的库；避免过于小众或长时间未维护的依赖。

【界面风格】
${UI_ZH[state.ui]}。支持跟随系统切换深浅模式。动画柔和、过渡自然；关键操作给出明显视觉反馈。字体使用系统默认（微软雅黑 / Segoe UI / 苹方），不要引入网络字体。

【数据存储】
${STORAGE_ZH[state.storage]}。数据默认存本地，不上传任何外部服务。

【目标】
${goal || '（请补充：这个应用是给谁用的？解决他们什么问题？用一两句话描述）'}

【功能需求】
${features || '（请补充：希望这个应用具备哪些功能？一行一条，尽量具体）'}

${extras.length ? `【附加要求】\n${extras.map((e) => `- ${e}`).join('\n')}\n` : ''}
【稳健性与错误处理】
- 任何错误都给出中文、友好的提示，不要直接暴露技术堆栈。
- 输入格式不对时，先提示并引导修正，而不是崩溃。
- 空数据、极端数据、大数据量（超过 1 万行）都要能正常处理或友好退化。
- 关键操作都可撤销；重要数据每次保存都生成快照，用户可回退到最近 3 个版本。

【交付步骤】
1. 先输出项目结构和每个关键文件的职责，并给出主要界面的简单线框图（ASCII 或纯文字描述均可），等我确认后再动手写代码。
2. 按功能模块分阶段交付，每完成一个模块就帮我跑起来看效果，并简述这一步做了什么、还缺什么。
3. 做完最后一步：
   - ${packageLine(state.platform, 'zh').replace(/^最后/, '')}
   - 写一份给非技术同事看的中文使用说明（500 字以内，大白话，分步骤说明"安装 → 第一次使用 → 常见问题"）。
   - 列出当前版本的已知限制和后续可优化方向。

【沟通方式】
- 一次只推进一件事；不清楚的地方直接问我，不要擅自假设。
- 涉及公司名、字段名、品牌色等个性化内容时使用占位符（如 {{公司名}}），末尾集中列出需要我替换的项。
- 全程用中文沟通，代码注释也用中文。

请从第 1 步开始：项目结构和界面线框图。`;
  }

  // English
  const extras: string[] = [];
  if (state.extras.offline) extras.push('Must run fully offline; no internet required');
  if (state.extras.bilingual) extras.push('UI supports switching between Chinese and English');
  if (state.extras.exportable) extras.push('Key results can be exported as PDF / Excel');
  if (state.extras.shortcut) extras.push('Keyboard shortcuts for common operations');
  if (state.extras.accessibility) extras.push(ACCESSIBILITY_EN[state.platform]);
  if (custom) extras.push(custom);

  return `You are a senior engineer experienced with ${ROLE_DOMAIN_EN[state.platform]}, with strong product and interaction design sensibilities. Build a local desktop application for a business colleague who does NOT code. Technology choices, packaging, error messages, and UX affordances should all be beginner-friendly.

[Platform]
${PLATFORM_EN[state.platform]}

[Stack]
${TECH_EN[state.tech]}. Use mature, well-documented, actively maintained libraries. Avoid obscure or abandoned dependencies.

[Visual Style]
${UI_EN[state.ui]}. Follow the system light/dark preference. Keep animations subtle and transitions smooth. Give clear visual feedback on key actions. Use system fonts only (Segoe UI / Microsoft YaHei / San Francisco / PingFang). No web fonts.

[Data]
${STORAGE_EN[state.storage]}. All data stays local; do not upload anything to external services.

[Goal]
${goal || '(Please fill in: who is the app for, and what problem does it solve? One or two sentences.)'}

[Features]
${features || '(Please fill in: what should it do? One item per line, as specific as possible.)'}

${extras.length ? `[Additional Requirements]\n${extras.map((e) => `- ${e}`).join('\n')}\n` : ''}
[Robustness & Error Handling]
- Show friendly messages for every error — never expose raw stack traces.
- On bad input, prompt and guide the user rather than crashing.
- Handle empty data, edge cases, and large volumes (10k+ rows) gracefully.
- All critical actions are undoable; snapshot important data on every save and let the user roll back to the last 3 versions.

[Delivery Steps]
1. First, outline the project structure and the role of each key file, plus a simple wireframe (ASCII or text) of the main views. Wait for my confirmation before writing code.
2. Deliver in phases per feature module. After each module, run it and tell me what you built and what is still missing.
3. Final step:
   - ${packageLine(state.platform, 'en').replace(/^Final step: /, '')}
   - Write a user guide for non-technical colleagues (<= 500 words, plain language, sections for "install", "first run", "FAQ").
   - List known limitations and future improvements.

[Working Style]
- Advance one thing at a time. Ask me if something is unclear rather than assuming.
- For company-specific details (company name, field names, brand colors) use placeholders like {{COMPANY_NAME}} and summarize the items I need to fill in at the end.
- Communicate in English, with English code comments.

Please start with step 1: project structure and wireframe.`;
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
