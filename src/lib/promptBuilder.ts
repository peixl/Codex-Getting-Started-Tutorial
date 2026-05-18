import {
  quickStart,
  projectStructure,
  ERROR_RECOVERY_ZH,
  ERROR_RECOVERY_EN,
  DOD_ZH,
  DOD_EN,
  ANTI_PATTERNS_ZH,
  ANTI_PATTERNS_EN,
  type ModuleTech,
} from './promptModules';

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

function deliveryRequirementsZh(state: FormState): string {
  const pack = packageLine(state.platform, 'zh');
  const lines = [
    '- 收到后直接动手，不要问方案、不要等确认。',
    '- 先创建 sample-data/ 放入贴近业务的脱敏示例数据，确保首次启动就能走完主流程。',
    '- 主流程 ≤3 步：导入/填写 → 预览 → 生成/保存。第一屏就是工作台，不做欢迎页。',
    '- 支持拖拽导入；用系统打开/保存对话框；完成后给"打开输出文件夹"按钮。',
    '- 每个功能写完立即运行验证，不要攒到最后。',
    '- 空数据、格式错误、取消操作 → 弹友好中文提示，不闪退、不暴露技术错误。',
    '- 路径兼容中文、空格、括号；适配深浅模式。',
    `- ${pack}`,
    '- 附 ≤500 字中文使用说明 + README。',
    '- 同一问题连续 3 次失败 → 降级该功能，先保主流程能跑。',
  ];
  if (state.complexity === 'advanced') {
    lines.splice(6, 0,
      '- 加设置页、历史记录、批量处理；危险操作二次确认并可恢复。',
    );
  }
  return lines.join('\n');
}

function deliveryRequirementsEn(state: FormState): string {
  const pack = packageLine(state.platform, 'en');
  const lines = [
    '- Start building immediately. Do not ask for confirmation or present a plan.',
    '- Create sample-data/ with realistic anonymized data so the app works on first launch.',
    '- Main flow ≤3 steps: import/fill → preview → generate/save. First screen is the workspace, no welcome page.',
    '- Support drag-and-drop; use native open/save dialogs; show "Open output folder" after completion.',
    '- Verify each feature immediately after writing it.',
    '- Empty data, bad format, cancel → friendly message, no crash, no raw errors.',
    '- Paths handle Chinese, spaces, parentheses; support light/dark mode.',
    `- ${pack}`,
    '- Include a ≤500-word user guide + README.',
    '- Same bug fails 3 times → downgrade that feature, keep the main flow working.',
  ];
  if (state.complexity === 'advanced') {
    lines.splice(6, 0,
      '- Add settings, history, batch processing; confirm dangerous actions and support recovery.',
    );
  }
  return lines.join('\n');
}


export function buildPrompt(state: FormState, lang: PromptLang): string {
  const goal = state.goal.trim();
  const features = state.features.trim();
  const custom = state.custom.trim();

  if (lang === 'zh') {
    const extras: string[] = [];
    if (state.extras.offline) extras.push('完全离线运行，不联网');
    if (state.extras.bilingual) extras.push('界面支持中英双语切换');
    if (state.extras.exportable) extras.push('结果可导出为 PDF / Excel');
    if (state.extras.shortcut) extras.push(SHORTCUT_ZH[state.platform]);
    if (state.extras.accessibility) extras.push(ACCESSIBILITY_ZH[state.platform]);
    if (custom) extras.push(custom);

    return `你是资深桌面应用工程师，擅长 ${ROLE_DOMAIN_ZH[state.platform]}。你的任务是做出一个本地可运行的桌面工具，不是给建议。收到后直接动手实现，全程中文。

【任务】
目标：${goal || '（请补充：给谁用？解决什么问题？例："帮财务同事把每月对账从 2 天压到 1 小时"）'}

功能：
${features || '（请补充：一行一条。例：\n- 拖入两张 Excel → 自动按订单号比对 → 差异标红\n- 点"导出" → 生成差异明细 Excel\n- 超过 10 万行 → 分批处理并显示进度条）'}
${extras.length ? `\n附加：${extras.join('；')}` : ''}

【技术】
平台：${PLATFORM_ZH[state.platform]}。技术栈：${TECH_ZH[state.tech]}
界面：${UI_ZH[state.ui]}。${FONT_ZH[state.platform]}。
数据：${STORAGE_ZH[state.storage]}。

${quickStart(state.tech, 'zh')}

${projectStructure(state.tech, 'zh')}

【交付要求】
${deliveryRequirementsZh(state)}

${ERROR_RECOVERY_ZH}

【底线】
- 默认本地处理；联网传输须加密并告知用户。
- 不编造 npm 包名；不写死密钥、绝对路径、个人邮箱。
- 输出不覆盖原文件，冲突加时间后缀。
- 不把 TODO、空函数、假数据当完成。
- 每个功能都要真实接线：按钮能点、导入能用、导出有文件。

${ANTI_PATTERNS_ZH}

${DOD_ZH}

做完后只报：做了什么 | 如何打开 | 验证结果 | 剩余限制。
开始。`;
  }

  const extras: string[] = [];
  if (state.extras.offline) extras.push('Fully offline, no internet');
  if (state.extras.bilingual) extras.push('UI supports Chinese/English switching');
  if (state.extras.exportable) extras.push('Results exportable as PDF / Excel');
  if (state.extras.shortcut) extras.push(SHORTCUT_EN[state.platform]);
  if (state.extras.accessibility) extras.push(ACCESSIBILITY_EN[state.platform]);
  if (custom) extras.push(custom);

  return `You are a senior ${ROLE_DOMAIN_EN[state.platform]} engineer. Build a runnable local desktop tool, not advice. Start immediately. Plain English.

[Task]
Goal: ${goal || '(Fill in: who is it for, what problem? Example: "Help finance cut monthly reconciliation from 2 days to 1 hour")'}

Features:
${features || '(Fill in, one per line. Example:\n- Drop two Excel files → auto-match by order ID → mismatches highlighted red\n- Click "Export" → generates a diff-detail Excel\n- Over 100k rows → batch with progress bar)'}
${extras.length ? `\nAdditional: ${extras.join('; ')}` : ''}

[Tech]
Platform: ${PLATFORM_EN[state.platform]}. Stack: ${TECH_EN[state.tech]}
Visual: ${UI_EN[state.ui]}. ${FONT_EN[state.platform]}.
Data: ${STORAGE_EN[state.storage]}.

${quickStart(state.tech, 'en')}

${projectStructure(state.tech, 'en')}

[Delivery Requirements]
${deliveryRequirementsEn(state)}

${ERROR_RECOVERY_EN}

[Non-Negotiables]
- Process locally by default; network calls require encryption and user consent.
- Do not invent package names; no hard-coded secrets, absolute paths, or emails.
- Never overwrite input files; timestamp conflicts.
- TODOs, empty functions, or fake data do not count as done.
- Every feature must be real-wired: buttons work, imports load, exports produce files.

${ANTI_PATTERNS_EN}

${DOD_EN}

When done, report only: what was built | how to open | verification results | remaining limits.
Start now.`;
}

export function buildRecoveryPrompt(state: FormState, lang: PromptLang): string {
  const goal = state.goal.trim() || (lang === 'zh' ? '（目标见上一轮对话）' : '(goal from the previous conversation)');
  const features = state.features.trim() || (lang === 'zh' ? '（功能见上一轮对话）' : '(features from the previous conversation)');

  if (lang === 'zh') {
    return `这个桌面应用没跑通。请直接修复到能运行。

【修复步骤】
1. ≤5 行写清失败现象和根因（读日志，不猜）
2. 最小 diff 修改；不删功能、不换技术栈来绕过
3. 重新运行：安装 / lint / 类型检查 / 构建 / 启动
4. 同一问题 3 次失败 → 降级边缘功能，先恢复主流程
5. 修完后用示例数据走完主流程，看到产物再说修好

遵守原提示词的所有安全底线和执行纪律。

【原应用】
平台：${PLATFORM_ZH[state.platform]} | 复杂度：${COMPLEXITY_ZH[state.complexity]}
目标：${goal}
功能：
${features}

现在直接排查并修复。`;
  }

  return `The desktop app did not run. Fix it until it works.

[Fix Steps]
1. In ≤5 lines, state the symptom and log-based root cause (no guessing)
2. Minimum diff fix; do not delete features or swap stacks to bypass
3. Re-run: install / lint / typecheck / build / launch
4. Same bug fails 3 times → downgrade edge feature, restore main flow
5. After fixing, run sample-data through the main flow; only report fixed after seeing the artifact

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
    id: 'excel-merge',
    titleZh: '把几张 Excel 合并成一张',
    titleEn: 'Merge several Excel files',
    taglineZh: '拖进来自动汇总，输出一张新表',
    taglineEn: 'Drop them in, auto-merge, output one sheet',
    state: {
      platform: 'both',
      ui: 'minimal',
      storage: 'localFile',
      goal: '把每月从不同门店发来的十几张 Excel 自动合并成一张总表。',
      features:
        '- 拖入一批 Excel\n- 自动识别列名并合并\n- 生成总表，带"来源"列\n- 导出合并后的 Excel',
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
      ui: 'fresh',
      storage: 'localFile',
      goal: '把商品清单 Excel 做成可搜索、可筛选、可导出的小工具。',
      features:
        '- 打开后自动读取本地 products.xlsx\n- 按名称/SKU 模糊搜索\n- 按库存阈值筛选\n- 导出筛选结果到新 Excel',
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
      ui: 'minimal',
      storage: 'sqlite',
      extras: {
        offline: true,
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
    id: 'followup-ledger',
    titleZh: '跟进台账',
    titleEn: 'Follow-up ledger',
    taglineZh: '合同、回款、候选人……都能套这个模板',
    taglineEn: 'Contracts, collections, candidates — one template fits all',
    state: {
      platform: 'both',
      ui: 'business',
      storage: 'sqlite',
      goal: '做一个本地台账：每条事项一张卡片，到期前自动变红提醒。',
      features:
        '- 卡片字段：对方/类型/金额/关键日期/状态\n- 色块显示状态\n- 到期前 N 天自动变红\n- 导出本周待办到 Excel',
    },
  },
];
