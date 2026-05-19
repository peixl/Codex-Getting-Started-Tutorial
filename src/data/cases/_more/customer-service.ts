import type { CaseBundle } from '../types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

export const customerServiceComplaintClassifier: CaseBundle = {
  slug: 'customer-service-complaint-classifier',
  department: 'customer-service',
  i18n: {
    zh: {
      title: '投诉分类与升级提醒',
      departmentLabel: '客服',
      summary:
        '把每天的投诉粘进来按类型自动归类，命中"加急词"立刻提醒主管。',
      painTitle: '这是什么问题',
      painBody:
        '客服每天处理几十条投诉，类目靠人脑判断；"要曝光"、"要工商"这种紧急词如果漏看，问题会被放大。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：粘贴或导入投诉文本，自动按关键字归类，命中"升级词"立刻置顶并提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '粘贴/导入投诉，几秒出分类。',
        '类目（物流、商品质量、服务态度、价格、退款…）可改。',
        '升级词（曝光、投诉、工商、法务…）命中后整行飘红并弹通知。',
        '导出"今日投诉摘要"给主管。',
      ],
      keywords: ['投诉', '分类', '客服', '升级'],
    },
    en: {
      title: 'Complaint Classifier & Escalation Alerts',
      departmentLabel: 'Customer Service',
      summary:
        'Paste in complaints; auto-bucket by type and ping a supervisor when escalation keywords appear.',
      painTitle: 'The problem',
      painBody:
        'Dozens of daily complaints, manual categorization, and easy-to-miss escalation phrases like "I\'ll go public" or "I\'ll file a complaint".',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool. Paste or import complaints; keyword rules auto-classify; escalation matches pinned and announced.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Paste/import; classified in seconds.',
        'Editable categories (logistics, quality, attitude, price, refund…).',
        'Escalation keywords flash red and trigger an in-app toast.',
        'Export daily complaint summary for the supervisor.',
      ],
      keywords: ['complaint', 'classification', 'escalation', 'customer service'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('客服主管', 'zh'),
      goal: '把每天的投诉文本快速归类，并对升级词第一时间提醒，避免漏处理引发更大问题。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 顶部大文本框，粘贴一段或多段投诉，每段一行，回车确认。\n2. 类目预置 8 类（物流 / 质量 / 服务 / 价格 / 退款 / 安装 / 售后 / 其他），关键字规则可改。\n3. 升级词列表（曝光、投诉、工商、消协、315、法务、媒体…）命中后整行染红，并弹出系统通知。\n4. 中间表格列出每条投诉 + 类目 + 风险等级（普通 / 关注 / 升级）。\n5. 顶部统计：今日总数、各类占比、升级 N 条。\n6. "导出今日摘要 Markdown / Excel" 一键给主管。',
      deliveryPhases: ['搭建 Electron 框架，实现投诉输入和 8 类关键字规则引擎。', '完成升级词检测、系统通知和风险等级分类。', '实现统计卡片和摘要导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 粘贴投诉后自动分类结果正确', '□ 升级词命中后整行变红并弹通知', '□ 导出今日摘要格式正确', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a CS supervisor', 'en'),
      goal: 'Quickly bucket daily complaints and shout when escalation phrases appear.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Big text box at top; paste one or many complaints; one per line.\n2. 8 default buckets (logistics / quality / service / price / refund / install / aftersales / other) with editable keyword rules.\n3. Escalation keywords trigger row-red + OS notification.\n4. Middle table: complaint + category + risk level (normal / watch / escalate).\n5. Top summary: total today, share per type, N escalations.\n6. One-click export of today\'s summary (Markdown / Excel).',
      deliveryPhases: ['Scaffold Electron shell, implement complaint input and 8-category keyword engine.', 'Complete escalation keyword detection, OS notification, and risk-level classification.', 'Add summary cards and daily summary export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Pasting complaints produces correct auto-classification', '☐ Escalation keywords turn row red and trigger notification', '☐ Today\'s summary export format is correct', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const customerServiceFAQBuilder: CaseBundle = {
  slug: 'customer-service-faq-builder',
  department: 'customer-service',
  i18n: {
    zh: {
      title: 'FAQ 知识卡片整理工具',
      departmentLabel: '客服',
      summary:
        '把零散的问答整理成一张张知识卡片，新人入职翻一遍就能上手。',
      painTitle: '这是什么问题',
      painBody:
        '老员工脑子里全是答案，新人靠问；常见问题答案散在不同 Word 和聊天里，找的时候永远找不到那一份。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地知识卡工具：每张卡一个问题+答案+关键词；按部门/场景分组；输入问题秒搜出最相关的卡。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '左侧分组列表（售前 / 售后 / 物流 / 退款…），右侧卡片网格。',
        '顶部搜索框，输入两个字立即匹配。',
        '每张卡显示问题、答案、最近更新人、被搜次数。',
        '一键复制答案到剪贴板。',
        '导入老 Word/Excel；导出成 Markdown 知识库。',
      ],
      keywords: ['FAQ', '知识库', '客服', '新人'],
    },
    en: {
      title: 'FAQ Knowledge Card Builder',
      departmentLabel: 'Customer Service',
      summary:
        'Turn scattered Q&A into a deck of knowledge cards. New hires get productive after one read-through.',
      painTitle: 'The problem',
      painBody:
        'Veterans hold the answers in their heads. Newcomers ask repeatedly. Reference docs scatter across Word files and chats.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local knowledge-card tool: one card per Q&A with keywords; grouped by team/scenario; instant search.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Left: group list (pre-sale, after-sale, logistics, refund…). Right: card grid.',
        'Top search instantly matches as you type.',
        'Each card shows question, answer, last editor, search count.',
        'One-click "copy answer" to clipboard.',
        'Import old Word/Excel; export the deck as Markdown.',
      ],
      keywords: ['faq', 'knowledge base', 'customer service', 'onboarding'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('客服培训负责人', 'zh'),
      goal: '把分散的问答沉淀成可搜索的知识卡片，给新人当上手手册。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 左侧分组树，可自定义增删（售前、售后、物流、退款、安装…）。\n2. 右侧卡片网格，每张卡：问题（一句）、答案（多段）、关键词标签、最近更新人、被搜次数。\n3. 顶部搜索框：分词 + 关键词匹配，输入即过滤；按命中相关度排序。\n4. 卡片操作：编辑、复制答案、收藏、归档；改动留版本历史，可回滚。\n5. 导入：Word / Excel / Markdown；导出：单分组或全部 Markdown。',
      deliveryPhases: ['搭建 Electron 框架，实现分组树和知识卡片数据模型。', '完成搜索、卡片操作和版本历史功能。', '实现 Word/Excel/Markdown 导入导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 分组树可增删改，卡片可编辑保存', '□ 搜索输入即过滤，结果按相关度排序', '□ 导入 Word/Excel/Markdown 正确解析', '□ 导出 Markdown 格式正确'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a CS training lead', 'en'),
      goal: 'Turn scattered Q&A into a searchable card deck for new-hire onboarding.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Left group tree (pre-sale, after-sale, logistics, refund…), fully editable.\n2. Right card grid; each card: question, answer (multi-line), keyword tags, last editor, search count.\n3. Top search with tokenized keyword matching; filters as you type; results sorted by relevance.\n4. Card actions: edit, copy answer, favorite, archive; version history with rollback.\n5. Import Word / Excel / Markdown; export one group or all as Markdown.',
      deliveryPhases: ['Scaffold Electron shell, implement group tree and knowledge card data model.', 'Complete search, card actions, and version history features.', 'Add Word/Excel/Markdown import/export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Group tree supports CRUD; cards can be edited and saved', '☐ Search filters as you type; results sorted by relevance', '☐ Word/Excel/Markdown import parses correctly', '☐ Markdown export format is correct'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- HR ----------

export const customerServiceCompensationDesk: CaseBundle = {
  slug: 'customer-service-compensation-desk',
  department: 'customer-service',
  i18n: {
    zh: {
      title: '售后补偿记录台',
      departmentLabel: '客服',
      summary:
        '把退款、补券、补发、补差价统一记录，避免重复补偿和漏跟进。',
      painTitle: '这是什么问题',
      painBody:
        '客服补偿分散在聊天记录和表格里，同一个订单可能重复补，或者答应了补偿却忘记执行。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地补偿台：按订单号查历史补偿，新增补偿时自动提示重复风险，并生成待跟进清单。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '按订单号、手机号、旺旺/昵称快速搜索。',
        '补偿类型：退款、补券、补发、补差价、赠品。',
        '新增补偿时自动检查同订单历史记录。',
        '导出每日补偿汇总和未完成跟进清单。',
      ],
      keywords: ['售后', '客服', '补偿', '退款', '跟进'],
    },
    en: {
      title: 'After-Sales Compensation Desk',
      departmentLabel: 'Customer Service',
      summary:
        'Record refunds, coupons, reships, and price differences in one place to avoid duplicate compensation and missed follow-up.',
      painTitle: 'The problem',
      painBody:
        'Compensation decisions live in chats and sheets. The same order may be compensated twice, or promised compensation may be forgotten.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local compensation desk: search order history, warn on duplicate risk, and produce a follow-up list.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Search by order id, phone, or customer nickname.',
        'Compensation types: refund, coupon, reship, price difference, gift.',
        'Warn when the same order already has compensation history.',
        'Export daily compensation summary and pending follow-up list.',
      ],
      keywords: ['after-sales', 'support', 'compensation', 'refund'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole('客服主管', 'zh'),
      goal: '统一记录售后补偿，避免重复补偿、漏执行和月底无法统计。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite；支持 Excel 导入导出',
      features: `1. 新增补偿记录：订单号、客户昵称/手机号、问题类型、补偿方式、金额/券额、承诺时间、负责人、状态。
2. 搜索：订单号、手机号、昵称都能查；打开订单时展示历史补偿时间线。
3. 重复提醒：同订单 30 天内已有补偿时弹提醒，显示历史记录。
4. 看板：待执行、已执行、待确认、已关闭四栏；支持拖拽改状态。
5. 导出：每日补偿明细、未完成跟进清单、按客服统计的补偿金额。`,
      deliveryPhases: ['搭建 Electron 框架，实现补偿记录新增和搜索功能。', '完成重复提醒、看板拖拽和时间线展示。', '实现各类导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 补偿记录新增正常，字段齐全', '□ 搜索支持订单号、手机号、昵称', '□ 同订单 30 天内重复补偿弹提醒', '□ 看板四栏拖拽正常，导出功能正常'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a customer-service lead', 'en'),
      goal: 'Keep after-sales compensation in one place to prevent duplicate compensation, missed execution, and messy month-end stats.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite; Excel import/export',
      features: `1. New compensation record: order id, customer nickname/phone, issue type, compensation method, amount/coupon value, promised date, owner, status.
2. Search by order id, phone, nickname; order detail shows compensation timeline.
3. Duplicate warning: if the same order has compensation in the last 30 days, show the history before saving.
4. Board columns: to execute, executed, confirm, closed; drag to change status.
5. Exports: daily compensation detail, pending follow-up, compensation amount by support agent.`,
      deliveryPhases: ['Scaffold Electron shell, implement compensation record creation and search.', 'Complete duplicate warnings, board drag-and-drop, and timeline display.', 'Add export features, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Compensation record creation works with all fields', '☐ Search supports order id, phone, nickname', '☐ Duplicate compensation within 30 days triggers warning', '☐ Board four-column drag works; exports work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};
