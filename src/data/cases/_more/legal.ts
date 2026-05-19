import type { CaseBundle } from '../types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

export const legalNDAVault: CaseBundle = {
  slug: 'legal-nda-vault',
  department: 'legal',
  i18n: {
    zh: {
      title: '保密协议台账',
      departmentLabel: '法务',
      summary:
        '把公司所有 NDA 集中登记一张本地表：签了谁、范围、有效期、文件存哪儿都查得到。',
      painTitle: '这是什么问题',
      painBody:
        'NDA 签了一摞，签完没人统一存档；到期忘了续，或者需要时找不到那一份扫描件。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小台账：每份 NDA 一行，包含对方、范围、签订日、有效期、本地文件路径；到期自动提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        'NDA 列表：编号、对方、范围、签订日、有效期、状态。',
        '到期前 60 / 30 / 7 天分级提醒。',
        '搜索：按对方名、关键词秒搜。',
        '点行打开本地扫描件（PDF / 图片）。',
        '导出全部 NDA 索引 Excel。',
      ],
      keywords: ['NDA', '保密协议', '法务', '台账'],
    },
    en: {
      title: 'NDA Vault',
      departmentLabel: 'Legal',
      summary:
        'A local registry for every NDA: counterparty, scope, validity, file path. Searchable, with expiry alerts.',
      painTitle: 'The problem',
      painBody:
        'NDAs accumulate without a central index. Expirations slip; finding "that one" wastes hours.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local ledger. One row per NDA with all key fields and a local-file path; tiered expiry alerts.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'NDA list: number, counterparty, scope, signed date, validity, status.',
        'Alerts at 60 / 30 / 7 days before expiry.',
        'Instant search by counterparty or keyword.',
        'Click a row to open the local scan (PDF / image).',
        'Export full index Excel.',
      ],
      keywords: ['nda', 'legal', 'vault', 'expiry'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('法务/行政', 'zh'),
      goal: '让所有 NDA 都进同一张表，查、提醒、归档都顺手。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. NDA 列表：编号（自动）、对方、签订日、有效期、范围（多选标签）、状态（生效 / 即将到期 / 已到期 / 已终止）、扫描件本地路径、备注。\n2. 顶部"到期提醒"卡片：分三档颜色（60/30/7 天）。\n3. 搜索：对方名、范围关键词；过滤：状态、签订年份。\n4. 单条详情抽屉：可双击附件路径直接打开本地 PDF / 图片。\n5. 导入：从一个文件夹批量导入扫描件，按文件名前缀建立基础记录，再手工补充。\n6. 导出：全部 NDA 索引 Excel；单个 NDA 信息卡 PDF（HTML 打印）。',
      deliveryPhases: ['搭建 Electron 框架，实现 NDA 列表和三档到期提醒。', '完成搜索过滤、详情抽屉和本地文件打开功能。', '实现批量导入和 Excel/PDF 导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ NDA 列表可增删改，三档到期提醒正常', '□ 搜索过滤功能正确', '□ 双击附件路径可打开本地 PDF / 图片', '□ 导出索引 Excel 和信息卡 PDF 正确'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('legal/admin', 'en'),
      goal: 'Bring every NDA into one searchable ledger with expiry alerts.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. NDA list: auto-id, counterparty, signed date, validity, scope tags, status, scan path, notes.\n2. Top "Expiry" card with 60/30/7-day bands.\n3. Search by counterparty / scope keyword; filter by status / year.\n4. Detail drawer: double-click attachment path to open local PDF / image.\n5. Bulk import from a folder, generating base records by filename prefix.\n6. Export full index Excel; single NDA info-card PDF.',
      deliveryPhases: ['Scaffold Electron shell, implement NDA list and three-band expiry alerts.', 'Complete search/filter, detail drawer, and local file open features.', 'Add bulk import and Excel/PDF export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ NDA list supports CRUD; three-band expiry alerts work', '☐ Search and filter functions work correctly', '☐ Double-click attachment path opens local PDF/image', '☐ Index Excel and info-card PDF export correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const legalTrademarkMonitor: CaseBundle = {
  slug: 'legal-trademark-monitor',
  department: 'legal',
  i18n: {
    zh: {
      title: '商标续展提醒台账',
      departmentLabel: '法务',
      summary:
        '把公司全部商标的注册号、类别、有效期登记好，续展节点提前一年提醒。',
      painTitle: '这是什么问题',
      painBody:
        '商标十年一续，节点稀疏；交接几次后没人记得清，错过续展窗口可能被抢注。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小台账：每个商标一行，记录注册号、类别、有效期；提前 12/6/3 个月提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '商标列表：注册号、名称、类别、注册日、到期日、状态。',
        '到期前 12 / 6 / 3 个月分级提醒（首页 + 系统通知）。',
        '一键导出本年度需续展商标清单给代理机构。',
        '附件路径指向本地证书扫描件。',
      ],
      keywords: ['商标', '续展', '法务', '到期提醒'],
    },
    en: {
      title: 'Trademark Renewal Tracker',
      departmentLabel: 'Legal',
      summary:
        'Register every trademark with number, class, and expiry. Alerts a year, six months, and three months ahead of renewal.',
      painTitle: 'The problem',
      painBody:
        'Trademark renewals are ten years apart. After handovers, knowledge fades and missed windows risk loss of mark.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local ledger: one row per mark with key fields; tiered renewal alerts.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Trademark list: number, name, class, registered date, expiry, status.',
        'Alerts at 12 / 6 / 3 months (in-app + OS notification).',
        'One-click export of this year\'s renewal list for the agent.',
        'Attachment paths to local certificate scans.',
      ],
      keywords: ['trademark', 'renewal', 'legal', 'expiry'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('法务/品牌', 'zh'),
      goal: '不再因为忘了续展而失去商标。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 商标列表：注册号、名称、类别（多选标签）、注册日、有效期、申请人、状态、证书本地路径。\n2. 自动算到期日并按 12 / 6 / 3 个月三档颜色提醒。\n3. 首页"今年需续展"卡片：本年内到期且未提交续展申请的全部列出。\n4. 单条详情：提交续展后填写提交日和受理号，状态转为"续展中"，到期日延后 10 年。\n5. 导出本年度续展清单 Excel 给代理机构。',
      deliveryPhases: ['搭建 Electron 框架，实现商标列表和三档到期提醒。', '完成续展提交、状态更新和今年需续展卡片功能。', '实现续展清单 Excel 导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 商标列表可增删改，三档到期提醒正常', '□ 提交续展后状态和到期日正确更新', '□ 导出本年度续展清单 Excel 正确', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('legal/brand', 'en'),
      goal: 'Never lose a trademark to a missed renewal.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Trademark list: number, name, class tags, registered, expiry, applicant, status, cert path.\n2. Auto-derive expiry; alerts at 12 / 6 / 3 months with three colors.\n3. Home "This year\'s renewals" card.\n4. Detail: enter renewal submission date and receipt ID; status moves to "in renewal"; expiry +10 years.\n5. Export this-year renewal list Excel for the agent.',
      deliveryPhases: ['Scaffold Electron shell, implement trademark list and three-band expiry alerts.', 'Complete renewal submission, status update, and this-year renewals card features.', 'Add renewal list Excel export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Trademark list supports CRUD; three-band expiry alerts work', '☐ Renewal submission correctly updates status and expiry', '☐ This-year renewal list Excel export is correct', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Data ----------
