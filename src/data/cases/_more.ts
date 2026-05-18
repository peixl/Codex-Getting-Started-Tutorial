import type { CaseBundle } from './types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

export const financeExpenseClassifier: CaseBundle = {
  slug: 'finance-expense-classifier',
  department: 'finance',
  i18n: {
    zh: {
      title: '报销分类小助手',
      departmentLabel: '财务',
      summary:
        '把同事提交的报销单按类型自动归类、合计金额，月底关账省半天。',
      painTitle: '这是什么问题',
      painBody:
        '每月几百张报销单，类目五花八门：差旅、餐饮、办公、培训……手工归类容易错，月底总要返工。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地小工具：把报销明细 Excel 拖进去，按关键字+金额规则自动分类，未识别的列在一栏让你点几下确认。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '左侧导入 Excel，右侧实时显示分类结果。',
        '十几个常见类目预置规则，可以增删改。',
        '未识别项独立一栏，下拉选类目即可，规则记住下次自动用。',
        '底部按类目汇总金额，一键导出分类后的 Excel。',
        '默认本地运行，联网须加密并告知用户。',
      ],
      keywords: ['报销', '分类', '财务', 'Excel', '关账'],
    },
    en: {
      title: 'Expense Auto-Classifier',
      departmentLabel: 'Finance',
      summary:
        'Auto-bucket reimbursement lines by category and total amounts. Half a day saved every month-end.',
      painTitle: 'The problem',
      painBody:
        'Hundreds of reimbursement lines a month across travel, meals, office, training… manual tagging is slow and error-prone.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool. Drop in the Excel; keyword + amount rules auto-classify. Anything unmatched lands in a side panel for a quick dropdown pick.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Import Excel on the left; live classification on the right.',
        'A dozen default categories with editable rules.',
        'Unmatched items in a side panel; pick once, remembered next time.',
        'Footer totals per category; one-click export.',
        'Runs locally by default; network calls require encryption and user consent.',
      ],
      keywords: ['expense', 'classification', 'finance', 'excel'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('公司财务', 'zh'),
      goal: '把每月几百行报销明细按类目自动分类、汇总金额，未识别的让用户点几下补齐。',
      platform: '- Windows 10/11 + macOS 桌面应用\n- Electron + React + TypeScript\n- 表格用 SheetJS；规则存本地 JSON',
      features: '1. 主界面：左侧"导入报销 Excel"，支持拖拽；右侧表格实时显示分类结果。\n2. 默认 12 个类目（差旅交通、住宿、餐饮、办公用品、培训、招待、通讯、快递、福利、设备、软件、其他），每个类目有关键字规则和金额范围规则，可在"规则设置"页里改。\n3. 自动匹配：备注/摘要含关键字即归类；多条命中按优先级；都不命中归"待确认"。\n4. "待确认"列表里每行下拉选择类目，并可勾选"记住为新规则"。\n5. 底部汇总卡片：每类合计金额、占比、笔数。\n6. "导出已分类 Excel"按钮，文件名 "报销分类-YYYY-MM.xlsx"。',
      deliveryPhases: ['搭建 Electron 框架，实现 Excel 导入和 12 类目规则引擎。', '完成自动分类、待确认列表和规则学习功能。', '实现汇总卡片、导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 导入示例 Excel 后自动分类结果正确', '□ 待确认项可手动分类并记住规则', '□ 导出文件名含日期，数据完整', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('finance staff', 'en'),
      goal: 'Auto-categorize hundreds of reimbursement lines per month, total per category, and let the user resolve unmatched rows with a couple of clicks.',
      platform: '- Windows 10/11 and macOS desktop app\n- Electron + React + TypeScript\n- SheetJS for Excel; local JSON for rules',
      features: '1. Drop-target on the left; live classification table on the right.\n2. 12 default categories (travel, lodging, meals, office, training, entertainment, telecom, shipping, perks, devices, software, other), each with editable keyword + amount-range rules.\n3. Auto-match by keyword priority; misses go to "Needs review".\n4. In "Needs review", dropdown per row to assign; optional "remember as new rule".\n5. Footer summary cards: total amount, share, count per category.\n6. "Export classified Excel" button; default filename "expenses-YYYY-MM.xlsx".',
      deliveryPhases: ['Scaffold Electron shell, implement Excel import and 12-category rule engine.', 'Complete auto-classification, review list, and rule-learning features.', 'Add summary cards, export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Sample Excel import produces correct classification', '☐ Unmatched items can be manually classified and rules remembered', '☐ Export filename includes date; data is complete', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const financeInvoiceTaxChecker: CaseBundle = {
  slug: 'finance-invoice-tax-checker',
  department: 'finance',
  i18n: {
    zh: {
      title: '发票税号核对小工具',
      departmentLabel: '财务',
      summary:
        '批量核对发票抬头和税号是否一致，重复发票、错位税号一眼挑出来。',
      painTitle: '这是什么问题',
      painBody:
        '每月收到几百张电子发票，抬头错字、税号错位、重复开具时有发生。肉眼比对慢，漏掉就要换票。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地工具：导入发票明细，按抬头+税号比对公司维护的"标准抬头表"，标出不一致或重复，方便一次性退回补开。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '导入"发票明细 Excel"和"标准抬头表"，几秒出结果。',
        '红色：抬头/税号对不上；橙色：重复开具；绿色：通过。',
        '点行可看差异高亮（哪几个字不一样）。',
        '一键导出问题清单，附建议处理动作。',
      ],
      keywords: ['发票', '税号', '核对', '财务'],
    },
    en: {
      title: 'Invoice Tax-ID Checker',
      departmentLabel: 'Finance',
      summary:
        'Bulk-verify invoice titles and tax IDs against the standard list. Flags mismatches and duplicates in seconds.',
      painTitle: 'The problem',
      painBody:
        'Hundreds of e-invoices a month with typo titles, wrong tax IDs, or duplicates. Eye-balling is slow and miss-prone.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool. Import the invoice file + the company standard-title sheet; auto-flag mismatches and duplicates for batch return.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Import both Excel files; results in seconds.',
        'Red = title/tax-ID mismatch; orange = duplicate; green = ok.',
        'Click a row to see the exact diff highlighted.',
        'One-click export of the issue list with suggested actions.',
      ],
      keywords: ['invoice', 'tax id', 'reconciliation', 'finance'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('公司财务', 'zh'),
      goal: '批量比对发票抬头/税号与公司标准表，挑出错误与重复。',
      platform: '- Windows + macOS 桌面应用；Electron + React + TypeScript；SheetJS',
      features: '1. 两个导入位：发票明细 Excel、标准抬头表 Excel。表头自动识别，关键字段从下拉框选。\n2. 核对规则：抬头完全匹配 + 税号完全匹配 = 通过；任何一项不匹配 = 标红；同一发票号出现多次 = 标橙。\n3. 结果表格按颜色分组；点行展开"差异详情"，逐字符高亮不同。\n4. 顶部统计：通过 / 不匹配 / 重复 / 总数。\n5. "导出问题清单"按钮，附"建议动作"列（换票 / 联系开票方 / 已重复，请退回）。',
      deliveryPhases: ['搭建 Electron 框架，实现两个 Excel 导入和表头识别。', '完成比对规则引擎、颜色分组和差异高亮。', '实现统计卡片和问题清单导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 导入两张 Excel 后比对结果正确', '□ 不匹配项逐字符高亮差异', '□ 导出问题清单含建议动作列', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('finance staff', 'en'),
      goal: 'Batch-compare invoice titles and tax IDs to a master sheet; surface mismatches and duplicates.',
      platform: '- Windows + macOS desktop; Electron + React + TypeScript; SheetJS',
      features: '1. Two import slots: invoice details and master title sheet. Auto-detect headers; user confirms via dropdown.\n2. Rules: exact-match title + exact-match tax ID = pass; any mismatch = red; duplicate invoice number = orange.\n3. Group results by status; click a row to see a per-character diff.\n4. Top summary: passed / mismatched / duplicated / total.\n5. "Export issues" button with a "suggested action" column.',
      deliveryPhases: ['Scaffold Electron shell, implement dual Excel import and header detection.', 'Complete comparison engine, color grouping, and diff highlighting.', 'Add summary cards and issue export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Importing two Excel files produces correct comparison', '☐ Mismatches show per-character diff highlighting', '☐ Exported issue list includes suggested action column', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Operations ----------

export const operationsDailyStandupBoard: CaseBundle = {
  slug: 'operations-daily-standup-board',
  department: 'operations',
  i18n: {
    zh: {
      title: '运营日报小看板',
      departmentLabel: '运营',
      summary:
        '把每天群里发的"昨天做了啥、今天做啥、卡在哪"沉淀成一张本地周看板。',
      painTitle: '这是什么问题',
      painBody:
        '日报全在群里发，翻聊天记录费劲；周末复盘谁做了什么靠记忆，卡点拿不出证据。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小看板：每人每天三栏（昨日、今日、阻塞），自动按周聚合，谁忙谁闲、卡点在哪一眼看清。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '每人一张日报卡，三个文本块，三秒填完。',
        '周视图：横向是日期，纵向是人，颜色深浅表示工作量。',
        '"阻塞"标红，会被汇总到顶部"本周卡点"卡片。',
        '导出周报 Markdown，可直接贴到群里或文档里。',
      ],
      keywords: ['日报', '看板', '运营', '复盘'],
    },
    en: {
      title: 'Ops Daily Standup Board',
      departmentLabel: 'Operations',
      summary:
        'Capture daily "yesterday / today / blockers" into a local weekly board. No more scrolling chat history.',
      painTitle: 'The problem',
      painBody:
        'Daily standups vanish in group chat. Weekly retros rely on memory; blockers have no paper trail.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local board. Each person, each day, three text blocks (Yesterday / Today / Blocker). Auto-aggregates by week.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'One daily card per person; three short text blocks; under a minute to fill.',
        'Week view: dates × people, color intensity = workload.',
        'Blockers turn red and roll up into a top "This week\'s blockers" card.',
        'Export weekly Markdown; paste straight into chat or docs.',
      ],
      keywords: ['standup', 'kanban', 'ops', 'retro'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('运营负责人', 'zh'),
      goal: '把日常日报从群里沉淀到本地看板，按周自然汇总，挑出阻塞。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 主界面"今日"：列出团队成员，每人一张卡，三个文本框（昨日 / 今日 / 阻塞）。\n2. 切换到"本周"视图：表格行=成员，列=周一到周日，单元格里是该日要点摘要，鼠标悬停看全文。\n3. 顶部"本周阻塞"汇总卡片，自动按人聚合所有标红的阻塞。\n4. "导出本周 Markdown" -> 一份按人组织的周报，附阻塞列表。\n5. 成员列表本地维护；离职/调岗可禁用而不删除历史。',
      deliveryPhases: ['搭建 Electron 框架，实现"今日"视图和成员卡片。', '完成"本周"视图、阻塞汇总和周报导出功能。', '实现成员管理和历史保留，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 今日视图可填写并保存日报', '□ 本周视图按人按日汇总正确', '□ 阻塞项自动标红并汇总到顶部', '□ 导出 Markdown 格式正确'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an ops lead', 'en'),
      goal: 'Move daily standups out of chat into a local board that naturally rolls up by week and surfaces blockers.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. "Today" view: a card per team member with three text fields (Yesterday / Today / Blocker).\n2. "This week" view: rows = members, columns = Mon–Sun; hover for full text.\n3. Top "Blockers this week" rollup card per person.\n4. Export weekly Markdown, organized per person, with blockers list.\n5. Member list local; disable on leave without losing history.',
      deliveryPhases: ['Scaffold Electron shell, implement "Today" view and member cards.', 'Complete "This week" view, blocker rollup, and weekly export.', 'Add member management and history retention, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Today view allows filling and saving daily standups', '☐ Week view summarizes by person and day correctly', '☐ Blockers auto-highlighted red and rolled up to top card', '☐ Markdown export format is correct'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const operationsCustomerLifecycleTracker: CaseBundle = {
  slug: 'operations-customer-lifecycle-tracker',
  department: 'operations',
  i18n: {
    zh: {
      title: '客户生命周期跟进表',
      departmentLabel: '运营',
      summary:
        '把"新客 → 活跃 → 沉睡 → 流失"做成一张本地表，每天提醒今天该联系谁。',
      painTitle: '这是什么问题',
      painBody:
        '一堆客户名单分散在 Excel 和聊天里，谁该联系、谁好久没说话、谁刚成单容易记乱，跟进节奏全凭手感。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：导入客户名单，按最近互动时间自动分阶段；每天打开就显示"今天该联系的人"。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '客户一行一记录：姓名、阶段、最近联系日、备注。',
        '四个阶段（新客 / 活跃 / 沉睡 / 流失）颜色不同；规则可改。',
        '每天打开自动弹"今日跟进"列表（按规则计算的应联系名单）。',
        '点客户可记一句备注，自动更新"最近联系日"。',
        '导出当前名单、本月跟进记录。',
      ],
      keywords: ['客户', '跟进', '生命周期', 'CRM'],
    },
    en: {
      title: 'Customer Lifecycle Tracker',
      departmentLabel: 'Operations',
      summary:
        'A local sheet that maps "new → active → dormant → lost" and tells you who to contact today.',
      painTitle: 'The problem',
      painBody:
        'Customer lists scatter across Excel and chats. Who to reach, who has gone quiet, who just signed — easy to mix up.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local app. Import customers; auto-stage by last interaction; each morning, show "Today\'s follow-ups".',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'One row per customer: name, stage, last contact, notes.',
        'Four colored stages (new / active / dormant / lost); rules editable.',
        '"Today\'s follow-ups" auto-list on open.',
        'Click a customer to log a note; last-contact auto-updates.',
        'Export current list and monthly logs.',
      ],
      keywords: ['customer', 'follow-up', 'lifecycle', 'crm-lite'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('社群/客户运营', 'zh'),
      goal: '把客户跟进从感觉变成节奏：本地表格 + 每日"该联系名单"。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 客户列表：姓名、来源、阶段、最近联系日、负责人、备注。\n2. 阶段规则（可改）：7 天内互动 = 活跃；30 天 = 沉睡；60 天 = 流失；首次接触 14 天内 = 新客。\n3. 顶部"今日跟进"卡片：按规则计算应该联系的人，最多 20 个，可一键移到"已联系"。\n4. 客户详情抽屉：记一句备注、改阶段、改负责人；自动更新最近联系日。\n5. Excel 批量导入；导出当前名单 + 本月跟进日志。',
      deliveryPhases: ['搭建 Electron 框架，实现客户列表和阶段规则引擎。', '完成今日跟进卡片、详情抽屉和状态更新功能。', '实现 Excel 导入导出和月度日志，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 客户列表可增删改查，阶段自动计算', '□ 今日跟进卡片按规则推荐联系人', '□ 导出当前名单和月度跟进日志正确', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a community/customer ops person', 'en'),
      goal: 'Turn customer follow-ups from gut feel into a daily rhythm with a local list and an auto "who to reach today".',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Customer list: name, source, stage, last contact, owner, notes.\n2. Stage rules (editable): contact within 7d = active; 30d = dormant; 60d = lost; first-contact within 14d = new.\n3. Top "Today\'s follow-ups" card up to 20 names; one-click "contacted".\n4. Detail drawer: log a note, change stage/owner; last-contact auto-updates.\n5. Excel bulk import; export current list + monthly logs.',
      deliveryPhases: ['Scaffold Electron shell, implement customer list and stage rule engine.', 'Complete follow-up card, detail drawer, and status update features.', 'Add Excel import/export and monthly logs, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Customer list supports CRUD; stages auto-calculated', '☐ Follow-up card recommends contacts by rules', '☐ Export of current list and monthly logs is correct', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Customer Service ----------

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

export const hrLeaveTracker: CaseBundle = {
  slug: 'hr-leave-balance-tracker',
  department: 'hr',
  i18n: {
    zh: {
      title: '休假与调休余额台账',
      departmentLabel: '人事',
      summary:
        '把每个人的年假、调休、病假余额做成一张本地台账，月底不用再算到崩溃。',
      painTitle: '这是什么问题',
      painBody:
        '请假单分散在 OA、邮件、群里；每月算余额时来回核对，加班、调休、年假混在一起，员工一问 HR 答不上来。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地台账：每人四列余额（年假、调休、病假、事假），录入请假单自动加减；月底一键生成余额表。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '员工列表 + 四种余额；新增请假单选类型、天数自动扣减。',
        '加班录入自动累加调休额度。',
        '余额小于阈值的员工置顶提醒。',
        '导出"本月余额表"、"本人请假明细" Excel。',
      ],
      keywords: ['请假', '调休', '人事', '台账'],
    },
    en: {
      title: 'Leave & TOIL Balance Tracker',
      departmentLabel: 'HR',
      summary:
        'A local ledger for annual leave, TOIL, sick, and personal days. Month-end totals in one click.',
      painTitle: 'The problem',
      painBody:
        'Leave requests scatter across OA, email, and chats. Month-end balance math gets tangled.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local ledger: four balance columns per employee; entering a leave request auto-adjusts; monthly export.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Employee list with four balances; new leave deducts the right one.',
        'Logging overtime adds to TOIL.',
        'Below-threshold balances bubble to the top.',
        'Export monthly balance sheet and per-employee log.',
      ],
      keywords: ['leave', 'TOIL', 'hr', 'ledger'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole(' HR', 'zh'),
      goal: '让请假和调休的余额一直清楚，不靠脑子记。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 员工列表：姓名、部门、入职日、四种余额（年假 / 调休 / 病假 / 事假）。\n2. "新增请假单"：选员工、类型、起止日、备注；保存后自动算工作日并扣减。\n3. "新增加班"：选员工、加班时长，自动按 1:1.5 折算调休加到余额上（系数可改）。\n4. 月度结算页：每人四种余额、本月新增、本月使用、期末余额；一键导出 Excel。\n5. 员工档案抽屉：年度年假按入职年限按规则发放（可改），自动按月或按年初一次性发放。',
      deliveryPhases: ['搭建 Electron 框架，实现员工列表和四种余额数据模型。', '完成请假单、加班录入和自动计算功能。', '实现月度结算和 Excel 导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 员工列表可增删改，余额自动计算', '□ 新增请假单自动扣减正确余额', '□ 加班录入按系数折算调休正确', '□ 月度结算导出 Excel 数据完整'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an HR', 'en'),
      goal: 'Keep leave and TOIL balances always clear without memorizing.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Employee list: name, dept, hire date, four balances (annual / TOIL / sick / personal).\n2. "New leave": pick employee, type, dates, notes; auto-computes working days and deducts.\n3. "Log overtime": pick employee, hours; converted by 1:1.5 (editable) and added to TOIL.\n4. Monthly settlement: per-employee four balances, this-month added/used/ending; export Excel.\n5. Employee drawer: annual leave granted by tenure rule (editable), monthly accrual or year-start lump.',
      deliveryPhases: ['Scaffold Electron shell, implement employee list and four-balance data model.', 'Complete leave request, overtime logging, and auto-calculation features.', 'Add monthly settlement and Excel export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Employee list supports CRUD; balances auto-calculated', '☐ New leave request deducts correct balance', '☐ Overtime logging converts to TOIL correctly', '☐ Monthly settlement Excel export is complete'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const hrInterviewSchedule: CaseBundle = {
  slug: 'hr-interview-schedule-board',
  department: 'hr',
  i18n: {
    zh: {
      title: '面试日程统筹看板',
      departmentLabel: '人事',
      summary:
        '把每周的面试安排做成一张本地看板，候选人、面试官、时间不再撞车。',
      painTitle: '这是什么问题',
      painBody:
        '每周几十场面试，邀请、改时间、协调面试官全靠群里和邮件，最怕的就是同一时段两个候选人撞上。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小看板：候选人一行，时间一列，拖拽安排面试官；冲突立刻红色提示。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '本周时间表：行=候选人，列=半小时格，单元格放面试官名。',
        '同一面试官同一时段重复时单元格变红。',
        '点格子可填岗位、面试轮次、备注。',
        '一键导出"本周面试安排表" Markdown / Excel。',
      ],
      keywords: ['面试', '排期', '人事', '看板'],
    },
    en: {
      title: 'Interview Schedule Board',
      departmentLabel: 'HR',
      summary:
        'A local board for weekly interviews. Candidates × time × interviewer with instant conflict warnings.',
      painTitle: 'The problem',
      painBody:
        'Dozens of weekly interviews juggled across chats and emails. Easy to double-book an interviewer.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local board. Candidates as rows, half-hour columns; drop in interviewer; conflicts flash red.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Weekly grid: rows = candidates, columns = 30-min slots.',
        'Same interviewer in two slots = red.',
        'Click a cell to add role, round, notes.',
        'One-click export of the weekly schedule (Markdown / Excel).',
      ],
      keywords: ['interview', 'schedule', 'hr', 'kanban'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole(' HR 招聘负责人', 'zh'),
      goal: '让一周的面试排期一目了然，避免面试官撞车。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 候选人池：左侧抽屉可增删候选人（姓名、岗位、HR、备注）。\n2. 主面板：本周时间表（周一到周日，9:00-21:00，30 分钟一格）。\n3. 把候选人卡片拖到对应格子里 -> 弹窗填面试官、轮次、地点、备注。\n4. 冲突检测：同一面试官出现在重叠时段 -> 整行红色提示；同一候选人同一时段被排两次 -> 红色。\n5. 切换"周视图"/"日视图"。\n6. "导出本周安排" -> 一份 Markdown，分日列出候选人、时间、岗位、面试官、地点。',
      deliveryPhases: ['搭建 Electron 框架，实现候选人池和周时间表布局。', '完成拖拽排期、弹窗填写和冲突检测功能。', '实现周/日视图切换和安排导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 候选人可增删，拖拽到时间格排期', '□ 冲突检测：同面试官重叠时段标红', '□ 导出本周安排 Markdown 格式正确', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an HR recruiter lead', 'en'),
      goal: 'See the whole week of interviews at a glance and stop double-booking interviewers.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Candidate pool drawer (name, role, HR, notes).\n2. Main view: this week, Mon–Sun, 9:00–21:00, 30-min cells.\n3. Drag a candidate to a cell -> popup for interviewer / round / location / notes.\n4. Conflicts: same interviewer overlapping slots = red; same candidate twice = red.\n5. Toggle week / day view.\n6. Export this week as Markdown by day with all fields.',
      deliveryPhases: ['Scaffold Electron shell, implement candidate pool and weekly time grid layout.', 'Complete drag-to-schedule, popup form, and conflict detection features.', 'Add week/day view toggle and schedule export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Candidates can be added and dragged to time slots', '☐ Conflict detection: overlapping slots for same interviewer turn red', '☐ Weekly schedule Markdown export is correct', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Logistics ----------

export const logisticsWarehouseStock: CaseBundle = {
  slug: 'logistics-warehouse-stock-checker',
  department: 'logistics',
  i18n: {
    zh: {
      title: '仓库库存盘点助手',
      departmentLabel: '物流',
      summary:
        '每月盘点把账面库存和实物清单导进来，差异和金额自动算清楚。',
      painTitle: '这是什么问题',
      painBody:
        '盘点完，账面表和盘点表对不上是常事。一千多个 SKU 一行行核对要好几个小时。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：导入两张表，按 SKU 比对数量；多/少/缺货的分开列出，金额一并算出。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '左：账面库存 Excel；右：盘点结果 Excel。',
        '点"开始盘点"，几秒出三个表：盘盈、盘亏、未盘到。',
        '每个差异附上 SKU、品名、账面数、实盘数、差值、单价、差额金额。',
        '导出盘点差异 Excel 给财务和仓管。',
      ],
      keywords: ['库存', '盘点', '物流', '仓库'],
    },
    en: {
      title: 'Warehouse Stocktake Helper',
      departmentLabel: 'Logistics',
      summary:
        'Monthly stocktake: import the on-paper sheet and the counted sheet; auto-list surplus, shortage, and missing items with values.',
      painTitle: 'The problem',
      painBody:
        'After a count, paper vs. physical never quite matches. Eyeballing thousands of SKUs takes hours.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool. Import both sheets; auto-diff by SKU; group results by type with totals.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Left: on-paper Excel. Right: counted Excel.',
        'Click "Start" — three tables: surplus / shortage / unaccounted.',
        'Each row: SKU, name, on-paper qty, counted qty, diff, unit price, value diff.',
        'Export diff to Excel for finance + warehouse.',
      ],
      keywords: ['inventory', 'stocktake', 'warehouse', 'logistics'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('仓管/物流主管', 'zh'),
      goal: '月度盘点把账面表和实盘表的差异一次性算清楚，连金额一起。',
      platform: '- Windows + macOS；Electron + React + TypeScript；SheetJS',
      features: '1. 两个导入位：账面库存 Excel、盘点结果 Excel。字段（SKU、品名、数量、单价）从下拉框确认。\n2. 比对规则：按 SKU 匹配，盘盈（实>账） / 盘亏（实<账） / 未盘到（账有实无） / 多出（实有账无），四类分开展示。\n3. 每行计算差值数量、差额金额；底部总计金额（盘盈金额、盘亏金额、净差）。\n4. 顶部统计：SKU 总数、差异数、差异率、净差金额。\n5. "导出差异明细" Excel，按四类分 sheet。',
      deliveryPhases: ['搭建 Electron 框架，实现两个 Excel 导入和字段映射。', '完成 SKU 比对引擎和四类差异分组展示。', '实现统计卡片和差异明细导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 导入两张 Excel 后比对结果正确', '□ 四类差异分组展示，金额计算准确', '□ 导出差异明细按四类分 sheet', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a warehouse/logistics lead', 'en'),
      goal: 'Compute monthly stocktake diffs (with values) in one go.',
      platform: '- Windows + macOS; Electron + React + TypeScript; SheetJS',
      features: '1. Two imports: on-paper Excel and counted Excel. Field mapping (SKU, name, qty, price) confirmed via dropdown.\n2. Compare by SKU; classify into surplus / shortage / unaccounted / extra; show each group.\n3. Per-row diff qty and value; bottom totals (surplus, shortage, net).\n4. Top stats: total SKUs, diff count, diff rate, net value.\n5. Export diff Excel with four sheets.',
      deliveryPhases: ['Scaffold Electron shell, implement dual Excel import and field mapping.', 'Complete SKU comparison engine and four-group diff display.', 'Add summary cards and diff detail export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Importing two Excel files produces correct comparison', '☐ Four diff groups displayed; value calculations accurate', '☐ Export diff detail has four sheets', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const logisticsReturnTracker: CaseBundle = {
  slug: 'logistics-return-package-tracker',
  department: 'logistics',
  i18n: {
    zh: {
      title: '退货件跟踪小工具',
      departmentLabel: '物流',
      summary:
        '把"已发出的退货件"集中盯一张本地表，谁还没到、谁卡在路上一眼看清。',
      painTitle: '这是什么问题',
      painBody:
        '退货件回程经常出问题：卡运输、拒收、错地址。客服 / 仓库 / 财务三方信息不同步，钱压在路上。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小台账：录入退货件（订单号、快递单号、寄回地址、应退金额、状态），按状态分组，超期标红。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '退货件列表：四类状态（待寄回 / 在途 / 已签收 / 异常）。',
        '超过 7 天未签收自动标红。',
        '点条目记录最新跟进备注，自动加时间戳。',
        '顶部统计：在途件数 / 异常件数 / 应退金额合计。',
        '导出本月退货台账给财务。',
      ],
      keywords: ['退货', '快递', '物流', '台账'],
    },
    en: {
      title: 'Return Package Tracker',
      departmentLabel: 'Logistics',
      summary:
        'A local sheet to watch outbound returns: who hasn\'t arrived, who is stuck, who is overdue.',
      painTitle: 'The problem',
      painBody:
        'Return shipments hit transit issues, refused deliveries, wrong addresses. CS, warehouse, and finance fall out of sync.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local ledger: enter return shipments (order, tracking, address, refund amount, status); group by status; flag overdue.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Return list with four statuses (pending / in-transit / received / exception).',
        'Over 7 days without signature = red.',
        'Click to add a follow-up note (auto-timestamped).',
        'Top stats: in-transit, exceptions, total refund amount.',
        'Export the monthly ledger for finance.',
      ],
      keywords: ['return', 'shipping', 'logistics', 'tracking'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('电商物流主管', 'zh'),
      goal: '把分散在客服-仓库-财务之间的退货件集中到一张本地台账，每条都看得见状态。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 列表字段：订单号、快递单号、寄回地址、应退金额、寄出日、最新跟进、状态、备注。\n2. 四个状态标签（待寄回 / 在途 / 已签收 / 异常），左侧切换。\n3. 自动规则：寄出日 > 7 天且未签收 -> 整行染红，并加入"逾期"卡片。\n4. 单条记录抽屉：增加一条跟进笔记，自动时间戳；可改状态。\n5. Excel 批量导入：按表头映射 SKU、快递单号等字段；导出"本月退货台账"含跟进历史。',
      deliveryPhases: ['搭建 Electron 框架，实现退货列表和四状态标签。', '完成逾期规则、跟进笔记和状态更新功能。', '实现 Excel 导入导出和月度台账，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 退货列表可增删改，状态标签切换正确', '□ 逾期 7 天自动标红并加入逾期卡片', '□ 导出本月退货台账含跟进历史', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an e-commerce logistics lead', 'en'),
      goal: 'Consolidate scattered return-shipment info into one local ledger, with status always visible.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Columns: order, tracking, return address, refund amount, sent date, last note, status, free notes.\n2. Four status tabs (pending / in-transit / received / exception).\n3. Auto rule: > 7 days since sent without signature -> row red and shown in "overdue" card.\n4. Detail drawer: add a timestamped follow-up note; change status.\n5. Excel import with header mapping; export "monthly return ledger" with history.',
      deliveryPhases: ['Scaffold Electron shell, implement return list and four-status tabs.', 'Complete overdue rule, follow-up notes, and status update features.', 'Add Excel import/export and monthly ledger, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Return list supports CRUD; status tabs switch correctly', '☐ Overdue 7-day auto-red and added to overdue card', '☐ Monthly return ledger export includes follow-up history', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Procurement ----------

export const procurementPOTracker: CaseBundle = {
  slug: 'procurement-po-status-tracker',
  department: 'procurement',
  i18n: {
    zh: {
      title: '采购单跟踪台账',
      departmentLabel: '采购',
      summary:
        '把每一张采购单的"下单、确认、到货、验收、付款"五步串起来，谁卡在哪一步秒看到。',
      painTitle: '这是什么问题',
      painBody:
        '采购流程有五六个节点，分散在群、邮件、ERP；每周老板问"那个 PO 到哪了"，要花十几分钟翻记录。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小台账：每张 PO 一行，五个状态点；切换状态自动记录日期；超期自动提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        'PO 列表：单号、供应商、金额、当前节点、最近更新日。',
        '每行有 5 个圆点状态条；点圆点切换状态。',
        '超期未推进的 PO 自动列入顶部"待催办"。',
        '导出"本周 PO 进度" Markdown 报告。',
      ],
      keywords: ['采购', 'PO', '跟踪', '台账'],
    },
    en: {
      title: 'PO Status Tracker',
      departmentLabel: 'Procurement',
      summary:
        'Track every PO through five steps (placed / confirmed / received / accepted / paid) on a local ledger.',
      painTitle: 'The problem',
      painBody:
        'PO progress lives across chat, email, and ERP. "Where is that PO?" eats minutes weekly.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local ledger. One row per PO; five status dots; status change auto-timestamped; overdue flagged.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'PO list: number, supplier, amount, current step, last update.',
        'Each row has 5 status dots; click to advance.',
        'Stagnant POs auto-appear in a top "Needs nudge" card.',
        'Export weekly PO status as Markdown.',
      ],
      keywords: ['procurement', 'po', 'tracking', 'ledger'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('采购主管', 'zh'),
      goal: '把每张 PO 的五步进度都摆在台面上，避免反复追问。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. PO 列表字段：单号、供应商、品类、金额、负责人、当前节点、最近更新日、备注。\n2. 行内 5 个圆点：下单 / 供应商确认 / 到货 / 验收 / 付款；点亮表示完成，自动写入完成时间。\n3. "待催办"顶部卡片：节点完成日 > 5 天未推进的全部列出。\n4. 搜索 + 过滤（按供应商、节点、负责人）。\n5. Excel 导入新 PO；导出本周进度 Markdown / Excel。',
      deliveryPhases: ['搭建 Electron 框架，实现 PO 列表和五节点圆点条。', '完成待催办规则、搜索过滤和状态切换功能。', '实现 Excel 导入和进度导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ PO 列表可增删改，五节点圆点可切换', '□ 待催办卡片自动列出超期 PO', '□ 导出本周进度 Markdown / Excel 格式正确', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a procurement lead', 'en'),
      goal: 'Put every PO\'s five-step progress on the table; stop chasing for updates.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. PO list: number, supplier, category, amount, owner, current step, last update, notes.\n2. Five dots inline: placed / confirmed / received / accepted / paid; click to mark, auto-timestamp.\n3. Top "Needs nudge" card: > 5 days since last step.\n4. Search + filter by supplier / step / owner.\n5. Excel import; weekly export as Markdown / Excel.',
      deliveryPhases: ['Scaffold Electron shell, implement PO list and five-dot status bar.', 'Complete nudge rule, search/filter, and status toggle features.', 'Add Excel import and progress export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ PO list supports CRUD; five dots can be toggled', '☐ Nudge card auto-lists overdue POs', '☐ Weekly progress export Markdown/Excel is correct', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const procurementSupplierQualification: CaseBundle = {
  slug: 'procurement-supplier-qualification',
  department: 'procurement',
  i18n: {
    zh: {
      title: '供应商资质到期提醒台账',
      departmentLabel: '采购',
      summary:
        '把每个供应商的营业执照、生产许可、合同有效期统一管起来，到期前提前一个月提醒。',
      painTitle: '这是什么问题',
      painBody:
        '供应商资质照片散在邮件附件里；到期忘了续，临时找人补盖章，赶不及就要停采。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地台账：每个供应商一张档案卡，列出所有资质和到期日；到期前 30/15/7 天弹窗提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '供应商档案卡：基本信息 + 资质清单（营业执照、生产许可、ISO、合同…）。',
        '资质行有名称、编号、有效期、备注、附件指向本地文件夹。',
        '到期前 30 / 15 / 7 天在首页"到期提醒"卡片中飘红。',
        '导出本月即将到期资质清单。',
      ],
      keywords: ['供应商', '资质', '采购', '到期提醒'],
    },
    en: {
      title: 'Supplier Qualification Tracker',
      departmentLabel: 'Procurement',
      summary:
        'Track each supplier\'s licenses, certifications, and contract dates. Alerts a month before anything expires.',
      painTitle: 'The problem',
      painBody:
        'Supplier docs scatter in email attachments. Expirations slip past; last-minute scrambles to re-sign block procurement.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local ledger: one card per supplier with all docs and expiry dates; alerts at 30 / 15 / 7 days.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Supplier card: basics + doc list (license, production permit, ISO, contract…).',
        'Each doc has name, number, expiry, notes, local-file path.',
        'Alerts at 30 / 15 / 7 days before expiry on the home dashboard.',
        'Export this month\'s expiring list.',
      ],
      keywords: ['supplier', 'qualification', 'procurement', 'expiry'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('采购助理', 'zh'),
      goal: '让供应商资质到期不再靠记忆。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 供应商档案卡：名称、联系人、电话、采购品类、合作起始日、备注。\n2. 资质子表：每行包括类型（营业执照 / 生产许可 / ISO / 食品 / 合同 / 其他）、证书编号、有效期、附件本地路径。\n3. 首页"到期提醒"卡片：分 30 天 / 15 天 / 7 天 三个色块，行内一键"已续期"-> 弹出更新到期日的小框。\n4. 搜索 + 过滤（按品类 / 即将到期 / 已过期）。\n5. 导出本月即将到期资质清单 Excel；导出某供应商档案 PDF（HTML 打印即可）。',
      deliveryPhases: ['搭建 Electron 框架，实现供应商档案卡和资质子表。', '完成到期提醒卡片、续期操作和搜索过滤功能。', '实现 Excel 和 PDF 导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 供应商档案卡可增删改，资质子表正常', '□ 到期提醒按 30/15/7 天分级显示', '□ 导出资质清单 Excel 和供应商 PDF 正确', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a procurement assistant', 'en'),
      goal: 'Stop relying on memory for supplier document expirations.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Supplier card: name, contact, phone, category, start date, notes.\n2. Documents sub-table: type, number, expiry, local-file path.\n3. Home "Expiry" card grouped into 30 / 15 / 7-day bands; row-level "renewed" with a small popup to update expiry.\n4. Search + filter (category / expiring / expired).\n5. Export expiring list Excel; export a supplier dossier PDF (HTML print is fine).',
      deliveryPhases: ['Scaffold Electron shell, implement supplier card and documents sub-table.', 'Complete expiry alerts, renewal action, and search/filter features.', 'Add Excel and PDF export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Supplier card supports CRUD; documents sub-table works', '☐ Expiry alerts display by 30/15/7-day bands', '☐ Export of expiring list Excel and supplier PDF is correct', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Marketing ----------

export const marketingContentCalendar: CaseBundle = {
  slug: 'marketing-content-calendar',
  department: 'marketing',
  i18n: {
    zh: {
      title: '内容发布日历',
      departmentLabel: '市场',
      summary:
        '把公众号、视频号、小红书、抖音这些渠道的发布计划放一张本地日历里，谁负责、什么时候发一目了然。',
      painTitle: '这是什么问题',
      painBody:
        '渠道多、负责人多、节奏不一致；周一开会大家都说"我下周发"，结果撞了选题或漏了节点。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地日历：横轴是日期，纵轴是渠道，每个格子是一篇内容卡片（选题、负责人、状态）。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '月历视图，每个日期下按渠道显示卡片。',
        '卡片：选题、负责人、状态（草稿 / 待审 / 已发），点开可补充链接、文案。',
        '同一周同一选题撞车时高亮提醒。',
        '导出"本周/本月内容计划"给老板看。',
      ],
      keywords: ['内容', '排期', '市场', '社媒'],
    },
    en: {
      title: 'Content Publishing Calendar',
      departmentLabel: 'Marketing',
      summary:
        'A local calendar across all your channels — owners, statuses, and dates side by side.',
      painTitle: 'The problem',
      painBody:
        'Too many channels, owners, and rhythms. Mondays bring vague "I\'ll post next week" — leading to clashing topics or missed dates.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local calendar: dates as columns under channel rows; one card per planned piece (topic, owner, status).',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Month view; each date shows per-channel cards.',
        'Card: topic, owner, status (draft / review / live); open for links + copy.',
        'Same topic in the same week flags as conflict.',
        'Export week/month plan for the boss.',
      ],
      keywords: ['content', 'calendar', 'marketing', 'social'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('市场内容负责人', 'zh'),
      goal: '把多渠道内容计划集中到一张本地日历，团队节奏对齐。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 月历主视图：横向 31 列日期，纵向 N 行渠道（公众号 / 视频号 / 小红书 / 抖音 / 微博 / 知乎 + 自定义）。\n2. 每格点击新建内容卡：选题、负责人、状态、链接、备注；状态颜色化。\n3. 跨渠道选题撞车检测：同周相似选题（关键字匹配）-> 顶部"撞车提醒"卡片。\n4. 切换日历视图 / 列表视图 / 看板视图。\n5. "本周计划"导出 Markdown，按渠道列出卡片。',
      deliveryPhases: ['搭建 Electron 框架，实现月历网格和渠道行布局。', '完成内容卡片、撞车检测和多视图切换功能。', '实现本周计划导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 月历视图按日期×渠道显示内容卡', '□ 同周相似选题撞车时高亮提醒', '□ 导出本周计划 Markdown 按渠道分组', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a content marketing lead', 'en'),
      goal: 'Centralize multi-channel content plans on one local calendar; align team rhythm.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Month grid: 31 date columns × N channel rows (WeChat / Video / Xiaohongshu / Douyin / Weibo / Zhihu + custom).\n2. Click a cell to create a card (topic, owner, status, link, notes); statuses colored.\n3. Conflict detection: similar topics same week (keyword match) -> top "Conflict" card.\n4. Switch between calendar / list / kanban view.\n5. Export weekly plan as Markdown by channel.',
      deliveryPhases: ['Scaffold Electron shell, implement month grid and channel row layout.', 'Complete content cards, conflict detection, and multi-view toggle features.', 'Add weekly plan export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Month view displays content cards by date×channel', '☐ Similar topics in same week flag as conflict', '☐ Weekly plan Markdown export grouped by channel', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const marketingKOLTracker: CaseBundle = {
  slug: 'marketing-kol-collab-tracker',
  department: 'marketing',
  i18n: {
    zh: {
      title: '达人合作跟进表',
      departmentLabel: '市场',
      summary:
        '把每一位合作达人的"对接 → 寄样 → 拍摄 → 发布 → 复盘"做成一张本地表，节奏不乱。',
      painTitle: '这是什么问题',
      painBody:
        '同时和 30 个达人对接，每个进度不一样：有的还没寄样，有的拍完没发，全靠脑子记容易掉链子。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地表格：每位达人一行，五个节点，每个节点有日期；超期变红。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '达人列表：昵称、平台、粉丝量、合作金额、当前节点、负责人。',
        '五节点圆点条：对接 → 寄样 → 收样 → 发布 → 复盘。',
        '每个节点超过自定义天数没推进 -> 红点 + 顶部"待催"卡片。',
        '导出本月合作明细给老板看。',
      ],
      keywords: ['达人', 'KOL', '市场', '合作'],
    },
    en: {
      title: 'KOL Collaboration Tracker',
      departmentLabel: 'Marketing',
      summary:
        'One row per creator across "outreach → sample sent → shoot → published → retro" with auto overdue flags.',
      painTitle: 'The problem',
      painBody:
        'Thirty creators in parallel — some haven\'t got samples, some shot but not posted. Memory fails.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local sheet: one row per creator, five status dots, dates per step, red on overdue.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Creator list: handle, platform, followers, fee, current step, owner.',
        'Five-dot status bar inline.',
        'Step stuck > N days = red and shown in top "Nudge" card.',
        'Export monthly collab Excel for the boss.',
      ],
      keywords: ['kol', 'creator', 'marketing', 'tracker'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('市场达人合作负责人', 'zh'),
      goal: '让每位达人的合作进度都有据可查，不再卡在"我以为已经发了"。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 达人列表字段：昵称、平台、粉丝量、合作金额、对接人、当前节点、最近更新日、备注。\n2. 五节点圆点：对接 / 寄样 / 收样 / 发布 / 复盘；点击切换并自动写入日期。\n3. 节点超期规则可设（默认：对接 3 天 / 寄样 5 天 / 收样 7 天 / 发布 7 天 / 复盘 7 天）。\n4. 顶部"待催"卡片：所有红点条目分组。\n5. 详情抽屉：写笔记、贴成片链接、记录数据快照（点赞 / 评论 / 销量），方便复盘。\n6. Excel 导入新一批达人；导出本月明细。',
      deliveryPhases: ['搭建 Electron 框架，实现达人列表和五节点圆点条。', '完成超期规则、待催卡片和详情抽屉功能。', '实现 Excel 导入和明细导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 达人列表可增删改，五节点圆点可切换', '□ 超期规则自动标红并加入待催卡片', '□ 导出本月明细数据完整', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a KOL collab lead', 'en'),
      goal: 'Make every creator collab\'s progress auditable; stop the "I thought it was posted" trap.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Creator list: handle, platform, followers, fee, owner, current step, last update, notes.\n2. Five-dot bar: outreach / sample sent / sample received / published / retro; clicks set date.\n3. Overdue rules editable per step (default 3 / 5 / 7 / 7 / 7 days).\n4. Top "Nudge" card groups all red items.\n5. Detail drawer: notes, links to published content, metric snapshots (likes / comments / sales) for retros.\n6. Excel import; monthly export.',
      deliveryPhases: ['Scaffold Electron shell, implement creator list and five-dot status bar.', 'Complete overdue rules, nudge card, and detail drawer features.', 'Add Excel import and monthly export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Creator list supports CRUD; five dots can be toggled', '☐ Overdue rules auto-highlight red and add to nudge card', '☐ Monthly export data is complete', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Legal ----------

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

export const dataWeeklyTrendSnapshot: CaseBundle = {
  slug: 'data-weekly-trend-snapshot',
  department: 'data',
  i18n: {
    zh: {
      title: '周度趋势速览',
      departmentLabel: '数据',
      summary:
        '把每周关键指标的 Excel 倒进来，自动算环比、画趋势，5 分钟出一张周报。',
      painTitle: '这是什么问题',
      painBody:
        '数据同学每周一被业务催周报：从 BI 导 Excel、改格式、画图、写文字描述，一上午就过去了。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：导入一份周指标 Excel，自动算环比、生成迷你折线图和一段中文叙述。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '导入 Excel：每行一个指标，列是过去 N 周数据。',
        '右侧每个指标卡片：本周值、环比变化、迷你折线。',
        '环比涨跌超过自设阈值，自动标红/绿，并出一句中文解读。',
        '一键导出周报 Markdown，可直接贴到群里。',
      ],
      keywords: ['周报', '数据', '趋势', 'BI'],
    },
    en: {
      title: 'Weekly Trend Snapshot',
      departmentLabel: 'Data',
      summary:
        'Import a weekly KPI Excel; auto-compute WoW change, render sparklines, and draft a one-paragraph commentary.',
      painTitle: 'The problem',
      painBody:
        'Mondays: pull from BI, reformat, chart, write commentary. Half a morning gone.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool: import the weekly Excel; auto WoW + sparkline + drafted commentary per metric.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Import: each row = one metric, columns = past N weeks.',
        'Per-metric card: current value, WoW change, sparkline.',
        'WoW beyond a threshold flagged red/green with a one-line commentary.',
        'One-click export of weekly Markdown.',
      ],
      keywords: ['weekly report', 'data', 'trend', 'sparkline'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: '你是一名擅长本地桌面小工具的资深工程师。用户是数据分析师，不懂太多代码。',
      goal: '把每周拉指标、写周报的重复活儿压成 5 分钟。',
      platform: '- Windows + macOS；Electron + React + TypeScript；SheetJS；图表用纯 SVG 自绘小折线',
      features: '1. 导入 Excel，自动识别"指标名"列和过去 N 周（W-N..W-1）列；最右一列视为本周。\n2. 每个指标渲染一张卡：本周值、环比、4-8 周迷你折线。\n3. 阈值规则（可改）：环比 > +5% 绿色 + "增长"； < -5% 红色 + "下滑"；接近 0 灰色 + "持平"。\n4. 解读模板（可编辑）：根据涨跌方向自动填充一句中文，例如"本周 GMV 较上周增长 7.2%，主要受 618 预热影响"——预热文案占位允许人工编辑。\n5. "导出周报 Markdown"按钮，按指标分组输出。',
      deliveryPhases: ['搭建 Electron 框架，实现 Excel 导入和指标列识别。', '完成指标卡片、迷你折线和阈值规则功能。', '实现解读模板和周报 Markdown 导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 导入 Excel 后指标列自动识别正确', '□ 指标卡片显示本周值、环比和迷你折线', '□ 阈值规则标色和解读模板填充正确', '□ 导出周报 Markdown 按指标分组'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a data analyst, light coding', 'en'),
      goal: 'Compress weekly KPI-report grind into five minutes.',
      platform: '- Windows + macOS; Electron + React + TypeScript; SheetJS; tiny inline SVG sparkline',
      features: '1. Import Excel; detect metric column + past-N-week columns; rightmost = this week.\n2. Per-metric card: current value, WoW, 4–8-week sparkline.\n3. Editable thresholds: +5% green "up"; -5% red "down"; near zero gray "flat".\n4. Editable commentary template auto-filled per direction; the user can tweak per metric.\n5. One-click export of the report as Markdown.',
      deliveryPhases: ['Scaffold Electron shell, implement Excel import and metric column detection.', 'Complete metric cards, sparklines, and threshold rule features.', 'Add commentary template and weekly Markdown export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Importing Excel auto-detects metric columns correctly', '☐ Metric cards show current value, WoW, and sparkline', '☐ Threshold coloring and commentary template fill correctly', '☐ Weekly report Markdown export grouped by metric'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const dataKPIDashboard: CaseBundle = {
  slug: 'data-personal-kpi-dashboard',
  department: 'data',
  i18n: {
    zh: {
      title: 'KPI 个人桌面看板',
      departmentLabel: '数据',
      summary:
        '把自己每天关心的几个数（GMV、UV、转化率）固定在桌面看板上，每天打开 3 秒看完。',
      painTitle: '这是什么问题',
      painBody:
        '每天要去 BI 看好几个数，平台慢、入口分散；记忆体不好的还会忘掉前一天的数对比。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小看板：自己定义几张指标卡，每天从 Excel/CSV 导入一行最新数；昨日对比、近 7 天迷你图都齐全。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '指标卡网格：4-12 张卡片任意排布。',
        '每张卡：今日值、昨日值、同比/环比、近 7 天迷你折线。',
        '从 Excel/CSV 增量导入一行最新数，旧数据自动归档。',
        '可固定窗口在桌面右上角作小工具。',
      ],
      keywords: ['KPI', '看板', '数据', '指标'],
    },
    en: {
      title: 'Personal KPI Dashboard',
      departmentLabel: 'Data',
      summary:
        'Pin the handful of numbers you care about (GMV, UV, conversion…) on a tiny desktop dashboard.',
      painTitle: 'The problem',
      painBody:
        'BI tools are slow and fragmented. Memory of yesterday\'s comparison fades.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local dashboard: a few self-defined metric cards; import a new row daily; with WoW, YoY, and 7-day sparkline.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        '4–12 freely arranged metric cards.',
        'Per card: today, yesterday, WoW / YoY, last-7 sparkline.',
        'Incrementally import one row from Excel/CSV; older data archived.',
        'Pinnable as a small desktop widget.',
      ],
      keywords: ['kpi', 'dashboard', 'data'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('业务数据负责人', 'zh'),
      goal: '让自己每天关心的几个数 3 秒看完。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 指标卡定义：名称、单位、计算方式（直接录入）、目标值、阈值。\n2. 主界面：网格布局，4-12 张卡，可拖拽换位。\n3. 每张卡显示：今日值、昨日值、变化箭头、7 天迷你折线、是否达标。\n4. 数据导入：每天导入一行 Excel/CSV，按日期归档；可手工补录某天数据。\n5. "极简窗口"按钮：把窗口缩成一行水平条，常驻桌面右上角。',
      deliveryPhases: ['搭建 Electron 框架，实现核心数据模型和主界面。', '完成主要业务逻辑和交互功能。', '实现导入导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 示例数据跑通主流程，产出可检查的文件/表格', '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退', '□ 导出功能正常，文件名带日期/月份', '□ 路径含中文/空格/括号 → 正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a business data owner', 'en'),
      goal: 'See the few numbers you care about in 3 seconds.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Metric definition: name, unit, manual-entry calc, target, threshold.\n2. Main grid: 4–12 cards, drag to reorder.\n3. Per card: today, yesterday, change arrow, 7-day sparkline, target hit flag.\n4. Daily import from Excel/CSV one row per day; manual backfill allowed.\n5. "Minimal mode" button: shrink to a horizontal bar pinned top-right.',
      deliveryPhases: ['Scaffold Electron shell, implement core data model and main interface.', 'Complete main business logic and interaction features.', 'Add import/export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Sample data completes the main flow, producing a checkable file/sheet', '☐ Empty data, bad format, cancel → friendly message, no crash', '☐ Export works; filename includes date/month', '☐ Paths with Chinese/spaces/parentheses → work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Admin ----------

export const adminVisitorLog: CaseBundle = {
  slug: 'admin-visitor-log',
  department: 'admin',
  i18n: {
    zh: {
      title: '访客登记小助手',
      departmentLabel: '行政',
      summary:
        '前台访客登记从纸质表换成本地小程序：姓名、单位、被访人、出入时间清清楚楚。',
      painTitle: '这是什么问题',
      painBody:
        '前台用纸质本登记访客，字迹潦草、月底统计困难；老板偶尔要追"上个月谁来过"就要翻一沓本子。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：访客来登记几个字段，自动记录进入时间；离开时一键签退；月报一键导出。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '前台输入框：姓名、单位、电话、被访人、事由 -> 一键签入。',
        '右侧"在场访客"列表实时显示，点条目签出，记录离开时间。',
        '今日 / 本周 / 本月 统计卡片。',
        '按月导出 Excel。',
      ],
      keywords: ['访客', '登记', '行政', '前台'],
    },
    en: {
      title: 'Visitor Log Helper',
      departmentLabel: 'Admin',
      summary:
        'Replace the paper visitor book with a small local app: name, company, host, in/out times — searchable forever.',
      painTitle: 'The problem',
      painBody:
        'Paper visitor logs are illegible and a pain to summarize. "Who visited us last month?" becomes a chore.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local app: a few fields on check-in, auto in-time; one-click check-out; monthly export.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Reception form: name, company, phone, host, purpose -> check-in.',
        'Right pane: live "currently in" list; click to check out.',
        'Today / week / month stats cards.',
        'Export by month to Excel.',
      ],
      keywords: ['visitor', 'log', 'admin', 'reception'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('公司前台/行政', 'zh'),
      goal: '让访客登记又快又准，月度统计一键搞定。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 主界面左侧"新增访客"表单：姓名、单位、电话、被访人（下拉，员工列表）、事由（下拉，可改）、备注；提交后右侧"在场"列表新增条目并记进入时间。\n2. "在场"列表每行有"签出"按钮，点击记离开时间，移到"今日记录"。\n3. 顶部统计卡片：今日访客数 / 在场数 / 本周 / 本月。\n4. 历史搜索：按时间段、姓名、单位、被访人。\n5. 员工列表（被访人候选）：本地维护，支持 Excel 导入。\n6. 导出本月访客 Excel。',
      deliveryPhases: ['搭建 Electron 框架，实现核心数据模型和主界面。', '完成主要业务逻辑和交互功能。', '实现导入导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 示例数据跑通主流程，产出可检查的文件/表格', '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退', '□ 导出功能正常，文件名带日期/月份', '□ 路径含中文/空格/括号 → 正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('the company receptionist/admin', 'en'),
      goal: 'Make visitor logging fast and reliable; monthly stats in one click.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. "New visitor" form on the left: name, company, phone, host (dropdown), purpose, notes -> submit creates an "in-house" record with in-time.\n2. "In-house" right list: each row has check-out button -> records out-time and moves to "today".\n3. Top stats: today / in-house / week / month.\n4. History search by date range, name, company, host.\n5. Employee list (host candidates) locally managed; Excel import supported.\n6. Monthly export Excel.',
      deliveryPhases: ['Scaffold Electron shell, implement core data model and main interface.', 'Complete main business logic and interaction features.', 'Add import/export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Sample data completes the main flow, producing a checkable file/sheet', '☐ Empty data, bad format, cancel → friendly message, no crash', '☐ Export works; filename includes date/month', '☐ Paths with Chinese/spaces/parentheses → work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const adminAssetInventory: CaseBundle = {
  slug: 'admin-asset-inventory',
  department: 'admin',
  i18n: {
    zh: {
      title: '办公资产盘点工具',
      departmentLabel: '行政',
      summary:
        '电脑、显示器、椅子、投影仪都登记好，谁在用、放哪儿一查就有。',
      painTitle: '这是什么问题',
      painBody:
        '资产几百件，离职交接、工位调整时容易丢；年底盘点对账经常对不上。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：每件资产一行，记录编号、名称、领用人、位置、状态；离职交接自动产生工单。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '资产列表：编号、类型、品牌型号、领用人、位置、状态。',
        '员工离职 -> 自动生成"待回收"清单。',
        '盘点模式：扫码或手工核对，差异列单独显示。',
        '导出资产明细 Excel；打印每件资产标签。',
      ],
      keywords: ['资产', '盘点', '行政', '台账'],
    },
    en: {
      title: 'Office Asset Inventory',
      departmentLabel: 'Admin',
      summary:
        'Track every laptop, monitor, chair, and projector. Who has it, where it lives, and what state it\'s in.',
      painTitle: 'The problem',
      painBody:
        'Hundreds of assets, churned by offboarding and seat changes. Year-end audits never quite match.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool: one row per asset; offboarding auto-generates a recovery list.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Asset list: id, type, model, holder, location, status.',
        'Offboarding triggers a "to recover" list.',
        'Inventory mode: scan or manual reconcile; diffs flagged.',
        'Export Excel; print per-asset labels.',
      ],
      keywords: ['asset', 'inventory', 'admin'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('行政/IT 资产管理员', 'zh'),
      goal: '让每件资产都有据可查，离职交接和年度盘点不再手忙脚乱。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 资产列表：编号（自动）、类型（笔记本 / 显示器 / 椅子 / 投影仪 / 其他）、品牌型号、采购日、单价、领用人、位置、状态（在用 / 闲置 / 维修 / 报废）。\n2. "员工离职"操作：选择员工 -> 自动生成"待回收"清单，逐项打勾确认回收/转交。\n3. "盘点"模式：导入物理盘点 Excel，按编号比对，列出差异（找不到 / 多出 / 状态对不上）。\n4. 资产详情：变更历史时间线，每次更换领用人、位置都自动记录。\n5. 导出资产明细 Excel；打印资产标签（含编号 + 二维码占位）。',
      deliveryPhases: ['搭建 Electron 框架，实现核心数据模型和主界面。', '完成主要业务逻辑和交互功能。', '实现导入导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 示例数据跑通主流程，产出可检查的文件/表格', '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退', '□ 导出功能正常，文件名带日期/月份', '□ 路径含中文/空格/括号 → 正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an admin/IT asset manager', 'en'),
      goal: 'Every asset traceable; offboarding and audits clean.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Asset list: auto-id, type (laptop / monitor / chair / projector / other), model, purchased, price, holder, location, status (in-use / idle / repair / disposed).\n2. "Offboard": pick employee -> generate to-recover list; check off each.\n3. "Audit" mode: import a count Excel; diff by id; flag missing / extra / status mismatch.\n4. Detail: change history timeline (holder, location).\n5. Export Excel; print labels (id + QR placeholder).',
      deliveryPhases: ['Scaffold Electron shell, implement core data model and main interface.', 'Complete main business logic and interaction features.', 'Add import/export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Sample data completes the main flow, producing a checkable file/sheet', '☐ Empty data, bad format, cancel → friendly message, no crash', '☐ Export works; filename includes date/month', '☐ Paths with Chinese/spaces/parentheses → work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Product ----------

export const productPriorityBoard: CaseBundle = {
  slug: 'product-priority-board',
  department: 'product',
  i18n: {
    zh: {
      title: '需求优先级看板',
      departmentLabel: '产品',
      summary:
        '把待办需求按"价值 × 工作量"摆在一张本地二维矩阵里，哪个先做不用再吵。',
      painTitle: '这是什么问题',
      painBody:
        '需求列表越拉越长，谁来都说自己的事最急；按 ICE / RICE 评分的人懒得维护，最后又回到拍脑袋。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小看板：每个需求卡片有价值 / 工作量两个滑块，自动放进四象限，本周怎么排一眼看清。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '四象限矩阵：价值 ↑ / 工作量 →。',
        '需求卡片可拖；价值/工作量打分自动归位。',
        '右上角"先做"象限自动置顶。',
        '导出"本周优先级清单"给老板和开发。',
      ],
      keywords: ['需求', '优先级', '产品', '矩阵'],
    },
    en: {
      title: 'Feature Priority Matrix',
      departmentLabel: 'Product',
      summary:
        'Drop every feature into a local Value × Effort matrix. The "do first" quadrant is obvious.',
      painTitle: 'The problem',
      painBody:
        'Everyone says their feature is urgent. Formal RICE/ICE rotting in a spreadsheet ends back in gut feel.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local 2x2 board. Each card has two sliders; quadrant auto-derived; this week\'s top items always visible.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Quadrant matrix: Value ↑ / Effort →.',
        'Cards drag; sliders snap them to the right quadrant.',
        '"Do first" quadrant pinned on top.',
        'Export weekly priority list for boss + engineering.',
      ],
      keywords: ['priority', 'matrix', 'product', 'planning'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('产品经理', 'zh'),
      goal: '让"哪个需求先做"有依据，而不是会议室里谁声音大。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 需求卡片：标题、来源（业务 / 客户 / 内部 / Bug）、价值（1-5 滑块）、工作量（1-5 滑块）、负责人、备注。\n2. 主视图：2×2 矩阵，X 轴工作量、Y 轴价值；卡片按打分自动定位，可拖动调整。\n3. 顶部"本周先做"卡片：自动列出右上象限（价值高 / 工作量低）。\n4. 列表视图作备选，可按价值、工作量、来源排序、搜索。\n5. 一键导出"本周需求优先级" Markdown，按象限分组。',
      deliveryPhases: ['搭建 Electron 框架，实现核心数据模型和主界面。', '完成主要业务逻辑和交互功能。', '实现导入导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 示例数据跑通主流程，产出可检查的文件/表格', '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退', '□ 导出功能正常，文件名带日期/月份', '□ 路径含中文/空格/括号 → 正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a PM', 'en'),
      goal: 'Make "what to do next" defensible — not the loudest voice in the room.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Feature card: title, source (biz / customer / internal / bug), value slider (1–5), effort slider (1–5), owner, notes.\n2. Main view: 2×2 matrix (X = effort, Y = value); cards auto-place, draggable.\n3. Top "This week\\\'s do-first" card auto-lists the high-value/low-effort quadrant.\n4. List view as a fallback with sort/filter/search.\n5. One-click "weekly priorities" Markdown export by quadrant.',
      deliveryPhases: ['Scaffold Electron shell, implement core data model and main interface.', 'Complete main business logic and interaction features.', 'Add import/export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Sample data completes the main flow, producing a checkable file/sheet', '☐ Empty data, bad format, cancel → friendly message, no crash', '☐ Export works; filename includes date/month', '☐ Paths with Chinese/spaces/parentheses → work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const productBetaTesterTracker: CaseBundle = {
  slug: 'product-beta-tester-tracker',
  department: 'product',
  i18n: {
    zh: {
      title: '内测用户跟进表',
      departmentLabel: '产品',
      summary:
        '把每位内测用户的反馈、最新状态、是否已回访都记在一张本地表里，不漏人。',
      painTitle: '这是什么问题',
      painBody:
        '招了 50 个内测用户后，谁说过什么、谁还在用、谁要被回访全靠脑袋，最后多半流失。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小表：每个用户一行，记录加入日、最新反馈、活跃状态、下次回访日；过期自动提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '内测用户列表：昵称、联系方式、入组日、最新反馈、活跃状态、下次回访日。',
        '14 天没新反馈 -> 自动标"沉默"，建议联系。',
        '反馈记录抽屉：按时间线记录，每条标"已采纳/已修复/待评估"。',
        '导出反馈汇总 Markdown 给产品和设计。',
      ],
      keywords: ['内测', '用户', '反馈', '产品'],
    },
    en: {
      title: 'Beta Tester Tracker',
      departmentLabel: 'Product',
      summary:
        'Track every beta tester\'s feedback, latest status, and next check-in date in one local sheet.',
      painTitle: 'The problem',
      painBody:
        'Recruit 50 testers, then forget who said what. Most quietly churn.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local sheet: one row per tester with feedback log, activity status, next check-in date; nudges on overdue.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Tester list: handle, contact, joined, latest feedback, status, next check-in.',
        '14 days silent -> auto-marked "quiet"; reach-out suggested.',
        'Feedback drawer: timeline; each item tagged "adopted / fixed / to-evaluate".',
        'Export feedback summary Markdown for product + design.',
      ],
      keywords: ['beta', 'tester', 'feedback', 'product'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('产品经理', 'zh'),
      goal: '让每一位内测用户都被持续跟进，反馈被认真分类处理。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 用户列表：昵称、联系方式、来源（朋友 / 招募 / 客户）、入组日、活跃状态、上次反馈日、下次回访日、备注。\n2. 活跃规则（可改）：14 天有反馈 = 活跃；14-30 天 = 沉默；> 30 天 = 流失。\n3. 反馈记录抽屉：按时间线添加反馈，每条带标签（功能建议 / Bug / 体验 / 商务），状态（待评估 / 已采纳 / 已修复 / 不采纳）。\n4. 顶部"今日待回访"卡片：下次回访日 = 今天的全部列出。\n5. 导出"本周反馈汇总" Markdown，按类型分组、按用户加注。',
      deliveryPhases: ['搭建 Electron 框架，实现核心数据模型和主界面。', '完成主要业务逻辑和交互功能。', '实现导入导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 示例数据跑通主流程，产出可检查的文件/表格', '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退', '□ 导出功能正常，文件名带日期/月份', '□ 路径含中文/空格/括号 → 正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a PM', 'en'),
      goal: 'Every beta tester gets ongoing follow-up; feedback gets categorized and answered.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Tester list: handle, contact, source (friend / recruited / customer), joined, status, last feedback, next check-in, notes.\n2. Editable activity rules: feedback in 14d = active; 14–30d = quiet; > 30d = lost.\n3. Feedback timeline drawer: each item tagged (feature / bug / UX / commercial) with status (to-evaluate / adopted / fixed / declined).\n4. Top "Today\\\'s check-ins" card.\n5. Weekly feedback Markdown export, grouped by type with user notes.',
      deliveryPhases: ['Scaffold Electron shell, implement core data model and main interface.', 'Complete main business logic and interaction features.', 'Add import/export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Sample data completes the main flow, producing a checkable file/sheet', '☐ Empty data, bad format, cancel → friendly message, no crash', '☐ Export works; filename includes date/month', '☐ Paths with Chinese/spaces/parentheses → work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Round-out trio (so cases divide evenly into 2 / 3 / 6 columns) ----------

export const financeMonthlyBudgetTracker: CaseBundle = {
  slug: 'finance-monthly-budget-tracker',
  department: 'finance',
  i18n: {
    zh: {
      title: '部门月度预算跟踪表',
      departmentLabel: '财务',
      summary:
        '把每个部门当月的预算、已用、剩余、超支风险一屏看清，月中预警。',
      painTitle: '这是什么问题',
      painBody:
        '月底才发现某个部门超支了，已经来不及调。需要月中就能看到苗头。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：导入年度预算表，每周更新一次实际支出，自动按"时间过半 / 预算过半"两条线发预警。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '部门预算总览：当月预算、已用、剩余、用预算百分比 vs 时间百分比。',
        '红黄绿三色信号灯：用得快了/正常/用得慢。',
        '点进部门看分类明细（人力 / 推广 / 差旅 / 办公…）。',
        '一键导出"本月预算预警"PDF 给老板。',
      ],
      keywords: ['预算', '财务', '预警', '部门'],
    },
    en: {
      title: 'Monthly Budget Tracker',
      departmentLabel: 'Finance',
      summary:
        'See every department\'s budget, used, remaining, and overrun risk on one screen — mid-month alerts.',
      painTitle: 'The problem',
      painBody:
        'You only spot the overrun at month-end, too late to course-correct. You need to see it building up.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool: import the annual budget, refresh actuals weekly, auto-warn when "time elapsed" and "budget consumed" diverge.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Per-department overview: month budget, used, remaining, % consumed vs % of month elapsed.',
        'Traffic-light status: red/yellow/green for pacing.',
        'Drill into a department for category breakdown (payroll / promo / travel / office…).',
        'One-click "this month\'s budget alerts" PDF for the boss.',
      ],
      keywords: ['budget', 'finance', 'tracking', 'department'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole('公司财务', 'zh'),
      goal: '让每个部门的当月预算执行情况可视化，提前发现超支风险。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: `1. 导入年度预算表（部门 + 类目 + 月度预算）；每周导入一次实际支出 Excel。
2. 主视图：部门卡片网格，每张卡片显示当月预算、已用、剩余、消耗百分比 vs 时间过半线。
3. 信号灯规则可改：消耗百分比 - 时间百分比 > 15% 红，5–15% 黄，其它绿。
4. 点进部门：按类目柱状图，超支项标红。
5. 一键导出 PDF 月度预警报告，第一页是总览，后续每个部门一页。`,
      deliveryPhases: ['搭建 Electron 框架，实现预算导入和部门卡片主视图。', '完成信号灯规则、类目下钻和柱状图。', '实现 PDF 导出、异常处理，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 年度预算表和实际支出 Excel 导入正常', '□ 部门卡片展示预算、已用、剩余、信号灯颜色正确', '□ 点进部门可看类目柱状图，超支项标红', '□ PDF 月度预警报告导出正常'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('finance staff,', 'en'),
      goal: 'Visualize each department\'s mid-month budget execution; catch overruns early.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: `1. Import annual budget (dept + category + monthly amount); weekly import of actual spend Excel.
2. Main view: department card grid showing month budget, used, remaining, % consumed vs % of month elapsed.
3. Editable traffic-light rule: consumed% - elapsed% > 15 → red; 5–15 → yellow; else green.
4. Drill-in: per-category bars; overruns highlighted.
5. One-click PDF monthly alert report — overview page first, then one page per department.`,
      deliveryPhases: ['Scaffold Electron shell, implement budget import and department card main view.', 'Complete traffic-light rules, category drill-down, and bar charts.', 'Add PDF export, error handling, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Annual budget and actual spend Excel import correctly', '☐ Department cards show budget, used, remaining, traffic-light colors correct', '☐ Drill-in shows per-category bar chart with overruns highlighted', '☐ PDF monthly alert report exports correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const marketingEventChecklist: CaseBundle = {
  slug: 'marketing-event-checklist',
  department: 'marketing',
  i18n: {
    zh: {
      title: '线下活动筹备清单',
      departmentLabel: '市场',
      summary:
        '把线下活动从立项到复盘的几十件事拆成可勾选的清单，按倒计时排好。',
      painTitle: '这是什么问题',
      painBody:
        '一场线下活动几十件事，谁负责、什么时候做、做完没有，全靠脑子记，活动当天总有遗漏。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：内置一个"线下活动通用清单"，按活动日期倒推每件事的截止日，谁负责、状态、备注一栏看全。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '新建活动：填活动名、日期、规模，自动生成 40+ 项任务清单。',
        '每项任务：截止日（按 D-X 自动算）、负责人、状态、备注。',
        '主视图按"今天 / 三天内 / 一周内 / 已完成"分组。',
        '活动结束后一键生成"复盘清单"Markdown：哪些没做完、哪些值得保留。',
      ],
      keywords: ['活动', '线下', '清单', '市场'],
    },
    en: {
      title: 'Offline Event Checklist',
      departmentLabel: 'Marketing',
      summary:
        'Break a live event from kickoff to retro into a tickable checklist, scheduled by countdown.',
      painTitle: 'The problem',
      painBody:
        'A live event has dozens of moving parts. Who, when, done? — all in your head, and something always slips on the day.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool: a built-in "generic live-event checklist" auto-schedules each task back from event day, with owner, status, and notes.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'New event: name, date, scale → auto-generates 40+ task checklist.',
        'Each task: due date (D-X auto), owner, status, notes.',
        'Main view grouped: Today / Within 3 days / Within a week / Done.',
        'Post-event one-click retro checklist Markdown: what slipped, what to keep.',
      ],
      keywords: ['event', 'offline', 'checklist', 'marketing'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole('市场同事', 'zh'),
      goal: '让一场线下活动的所有筹备事项都按时间线井井有条，活动当天不慌。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: `1. 新建活动：名称、日期、规模（小型 < 50 / 中型 50–200 / 大型 > 200）；自动生成默认任务清单（40+ 项，按 D-30 / D-14 / D-7 / D-3 / D-1 / D 当日 / D+3 复盘 分桶）。
2. 任务字段：截止日（D-X 自动计算）、负责人、状态（未开始 / 进行中 / 完成 / 跳过）、备注、附件链接。
3. 主视图：按"今天 / 三天内 / 一周内 / 已完成"分组；可按负责人筛选。
4. 默认任务模板可在"模板"页里改；下次新活动自动用最新模板。
5. 活动结束后一键生成"复盘 Markdown"：哪些任务超时、跳过原因、值得沉淀进模板的新经验。`,
      deliveryPhases: ['搭建 Electron 框架，实现活动创建和默认任务清单生成。', '完成任务管理、分组视图和模板编辑功能。', '实现复盘生成、导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 新建活动自动生成 40+ 项任务清单', '□ 任务按"今天 / 三天内 / 一周内 / 已完成"分组显示正确', '□ 模板可编辑，下次活动自动使用', '□ 复盘 Markdown 导出含超时任务和跳过原因'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('on the marketing team,', 'en'),
      goal: 'Make every prep task for a live event ordered by timeline so the day-of is calm.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: `1. New event: name, date, scale (small < 50 / medium 50–200 / large > 200) → auto-generates a 40+ task default checklist bucketed D-30 / D-14 / D-7 / D-3 / D-1 / Day-of / D+3 retro.
2. Task fields: due date (D-X auto), owner, status (not started / doing / done / skipped), notes, attachment link.
3. Main view: groups Today / Within 3 days / Within a week / Done; filter by owner.
4. Editable task template page; next event uses the latest template.
5. Post-event one-click retro Markdown: which tasks slipped, why skipped, what to bake into the template.`,
      deliveryPhases: ['Scaffold Electron shell, implement event creation and default checklist generation.', 'Complete task management, grouped views, and template editing.', 'Add retro generation, export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ New event auto-generates 40+ task checklist', '☐ Tasks grouped correctly: Today / 3 days / 1 week / Done', '☐ Template is editable; next event uses latest', '☐ Retro Markdown export includes slipped tasks and skip reasons'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const hrBirthdayReminder: CaseBundle = {
  slug: 'hr-birthday-anniversary-reminder',
  department: 'hr',
  i18n: {
    zh: {
      title: '生日 & 入职周年提醒台',
      departmentLabel: '人事',
      summary:
        '把全公司的生日和入职周年集中到一张本地小桌面，提前一周自动提醒。',
      painTitle: '这是什么问题',
      painBody:
        '同事生日、入职周年常常忘记，临时发祝福不真诚。需要提前一周看到名单。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：导入员工花名册，自动算下次生日 / 周年的日子，按"今日 / 7 天内 / 本月"分组提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '导入花名册 Excel（姓名 / 部门 / 生日 / 入职日 / 联系方式）。',
        '主视图三栏：今日庆祝、未来 7 天、本月剩余。',
        '每位同事卡片：今年是 X 岁生日 / 入职第 N 年；一键复制定制祝福语模板。',
        '一键导出"本月生日 & 周年"PDF 给行政贴公告板。',
      ],
      keywords: ['生日', '入职周年', '员工关怀', '人事'],
    },
    en: {
      title: 'Birthday & Work Anniversary Console',
      departmentLabel: 'HR',
      summary:
        'Bring everyone\'s birthday and work anniversary onto one local desktop with a week-ahead heads-up.',
      painTitle: 'The problem',
      painBody:
        'Birthdays and work anniversaries quietly slip past; last-minute wishes feel hollow. You need a week\'s lead time.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool: import the staff roster, compute the next birthday/anniversary, group by Today / Next 7 days / Rest of month.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Import roster Excel (name / dept / birthday / hire date / contact).',
        'Three-column view: Today, Next 7 days, Rest of this month.',
        'Per-person card: turning X this year / Year N at company; one-click copy a templated greeting.',
        'One-click "this month\'s birthdays & anniversaries" PDF for admin\'s noticeboard.',
      ],
      keywords: ['birthday', 'anniversary', 'employee', 'hr'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole(' HR 同事', 'zh'),
      goal: '让每位同事的生日和入职周年都被提前注意到，公司氛围更暖。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: `1. 导入花名册 Excel（姓名 / 部门 / 生日 / 入职日 / 联系方式 / 备注）。生日字段允许"只填月日"（隐去年份）。
2. 主视图三栏：今日庆祝、未来 7 天、本月剩余；按部门筛选。
3. 每位同事卡片显示：今年是第 X 岁生日 / 入职第 N 年；可在"祝福语模板"里编辑两套模板（生日 / 周年），点卡片一键复制对应模板。
4. "本月汇总"一键导出 PDF：按日期排序，含姓名 / 部门 / 庆祝事项；行政可直接打印贴公告板。
5. 设置里可勾选"系统通知开启"：每天上午 9 点提醒今日和未来 3 天的庆祝事项。`,
      deliveryPhases: ['搭建 Electron 框架，实现花名册导入和生日/周年计算。', '完成三栏视图、祝福语模板和一键复制功能。', '实现 PDF 导出和系统通知设置，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 花名册 Excel 导入正常，生日"只填月日"可识别', '□ 三栏视图按"今日 / 7 天内 / 本月"分组正确', '□ 祝福语模板可编辑，一键复制正常', '□ PDF 本月汇总导出正常'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('on the HR team,', 'en'),
      goal: 'Surface every teammate\'s birthday and work anniversary in time so the workplace feels warmer.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: `1. Import roster Excel (name / dept / birthday / hire date / contact / notes). Birthday may be month-day only (year hidden).
2. Three-column view: Today, Next 7 days, Rest of this month; filter by department.
3. Per-person card: "turning X this year" / "Year N at the company"; editable greeting templates (birthday / anniversary), one-click copy.
4. "This month" one-click PDF export sorted by date with name / dept / event — admin can print and post.
5. Settings toggle for OS notifications: 9am daily heads-up of today + next 3 days.`,
      deliveryPhases: ['Scaffold Electron shell, implement roster import and birthday/anniversary computation.', 'Complete three-column view, greeting templates, and one-click copy.', 'Add PDF export and notification settings, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Roster Excel imports correctly; month-day birthday recognized', '☐ Three-column view groups correctly: Today / 7 days / this month', '☐ Greeting templates editable; one-click copy works', '☐ "This month" PDF export works correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- E-commerce full-chain scenarios ----------

export const financePlatformFeeReconciliation: CaseBundle = {
  slug: 'finance-platform-fee-reconciliation',
  department: 'finance',
  i18n: {
    zh: {
      title: '平台佣金与手续费核对助手',
      departmentLabel: '财务',
      summary:
        '把订单、退款、平台账单放在一起，核对佣金、支付手续费、技术服务费是否合理。',
      painTitle: '这是什么问题',
      painBody:
        '平台账单科目多、扣费规则复杂，财务很难快速判断哪些费用异常、哪些订单需要复核。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地核对工具：导入订单、退款、平台结算单，按可配置费率重算应扣费用，并把差异订单列出来。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '导入订单表、退款表、平台结算表，自动匹配订单号。',
        '费率规则可配置：佣金率、支付手续费、服务费、活动扣点。',
        '差异表按金额从大到小排序，标出可能原因。',
        '一键导出“平台费用差异明细”和“本月费用汇总”。',
      ],
      keywords: ['平台账单', '佣金', '手续费', '财务', '对账'],
    },
    en: {
      title: 'Marketplace Fee Reconciliation Helper',
      departmentLabel: 'Finance',
      summary:
        'Check whether marketplace commission, payment fees, and service fees match orders and refunds.',
      painTitle: 'The problem',
      painBody:
        'Marketplace settlement files contain many fee items and complex rules. Finance needs a fast way to find suspicious charges.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local reconciliation tool: import orders, refunds, and marketplace settlement files, recalculate expected fees from configurable rates, and list differences.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Import order, refund, and settlement sheets; match by order id.',
        'Configurable fee rules: commission, payment fee, service fee, campaign rate.',
        'Difference table sorted by amount with likely reasons.',
        'One-click exports for fee differences and monthly fee summary.',
      ],
      keywords: ['marketplace', 'commission', 'fee', 'finance', 'reconciliation'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole('电商财务同事', 'zh'),
      goal: '核对平台结算单中的佣金、支付手续费、技术服务费和活动扣点，找出和订单/退款数据不一致的费用。',
      platform: '- Windows + macOS；Electron + React + TypeScript；SheetJS；本地 JSON 保存费率规则',
      features: `1. 导入订单表、退款表、平台结算表，自动识别订单号、成交金额、退款金额、费用科目、扣费金额。
2. 费率规则设置页：按平台/店铺/类目配置佣金率、支付手续费、技术服务费、活动扣点；支持有效期。
3. 自动重算应扣费用，并和平台账单对比，输出差异金额、差异率、可能原因。
4. 差异列表可按金额、平台、店铺、费用科目筛选；高差异标红。
5. 导出两份 Excel：费用差异明细、本月费用汇总。`,
      deliveryPhases: ['搭建 Electron 框架，实现三表导入和订单号自动匹配。', '完成费率规则配置和自动重算对比逻辑。', '实现差异列表筛选、标红和 Excel 导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 订单表、退款表、平台结算表导入正常', '□ 费率规则可按平台/店铺/类目配置', '□ 差异金额和差异率计算正确', '□ 两份 Excel 导出正常（差异明细 + 月度汇总）'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('on an e-commerce finance team', 'en'),
      goal: 'Reconcile marketplace commission, payment fees, service fees, and campaign rates against order and refund data.',
      platform: '- Windows + macOS; Electron + React + TypeScript; SheetJS; local JSON for fee rules',
      features: `1. Import orders, refunds, and settlement sheets; detect order id, order amount, refund amount, fee item, fee amount.
2. Fee rule settings: by marketplace/store/category for commission, payment fee, service fee, campaign rate; support effective dates.
3. Recalculate expected fees and compare with settlement; output difference amount, difference rate, likely reason.
4. Difference list filterable by amount, marketplace, store, and fee item; high differences highlighted.
5. Export two Excel files: fee difference details and monthly fee summary.`,
      deliveryPhases: ['Scaffold Electron shell, implement three-sheet import and order-id matching.', 'Complete fee rule configuration and recalculation comparison logic.', 'Add difference list filtering, highlighting, and Excel export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Orders, refunds, and settlement sheets import correctly', '☐ Fee rules configurable by marketplace/store/category', '☐ Difference amount and rate calculate correctly', '☐ Two Excel files export correctly (differences + monthly summary)'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const operationsPromotionPriceInspector: CaseBundle = {
  slug: 'operations-promotion-price-inspector',
  department: 'operations',
  i18n: {
    zh: {
      title: '大促价格巡检工具',
      departmentLabel: '运营',
      summary:
        '活动前批量检查到手价、券后价、限时折扣，避免低于底价或活动价填错。',
      painTitle: '这是什么问题',
      painBody:
        '大促前价格、优惠券、满减、会员折扣叠加复杂，一个 SKU 价格填错就可能亏钱或被客诉。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地工具导入 SKU 价格表和活动规则，自动算到手价，与底价/毛利线对比，列出风险 SKU。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '导入 SKU 成本价、日常价、活动价、券、满减、会员折扣。',
        '自动计算预计到手价和毛利率。',
        '低于底价、毛利过低、价格倒挂自动标红。',
        '导出活动价格风险清单，给运营和财务复核。',
      ],
      keywords: ['大促', '价格', '优惠券', '运营', '毛利'],
    },
    en: {
      title: 'Promotion Price Inspector',
      departmentLabel: 'Operations',
      summary:
        'Check final promo prices before campaigns so SKUs do not fall below floor price or margin guardrails.',
      painTitle: 'The problem',
      painBody:
        'Campaign price, coupons, bundles, and member discounts stack together. One wrong SKU price can create loss or complaints.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool imports SKU price and campaign rules, calculates final customer price, compares against floor price and margin guardrails, and lists risk SKUs.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Import SKU cost, normal price, promo price, coupons, bundles, member discount.',
        'Auto-calculate final price and gross margin rate.',
        'Highlight below-floor, low-margin, and price-inversion risks.',
        'Export campaign price risk list for operations and finance review.',
      ],
      keywords: ['promotion', 'price', 'coupon', 'operations', 'margin'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole('电商运营同事', 'zh'),
      goal: '活动上线前批量检查 SKU 到手价和毛利风险，避免活动价、券、满减叠加后低于底价。',
      platform: '- Windows + macOS；Electron + React + TypeScript；SheetJS；本地 SQLite',
      features: `1. 导入 SKU 价格表：SKU、成本价、日常价、活动价、底价、类目、库存。
2. 导入活动规则表：优惠券、满减、会员折扣、平台补贴、活动时间。
3. 自动计算预计到手价、毛利额、毛利率，并说明计算口径。
4. 风险规则：低于底价、毛利率低于阈值、活动价高于日常价、价格倒挂、库存不足；阈值可在设置里改。
5. 主界面按红/黄/绿分组；导出"活动价格风险清单.xlsx"。`,
      deliveryPhases: ['搭建 Electron 框架，实现 SKU 价格表和活动规则表导入。', '完成到手价计算、毛利分析和风险规则引擎。', '实现红黄绿分组视图和风险清单导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ SKU 价格表和活动规则表导入正常', '□ 到手价、毛利额、毛利率计算正确', '□ 风险规则（低于底价、毛利过低等）触发准确', '□ 导出"活动价格风险清单.xlsx"正常'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an e-commerce operations teammate', 'en'),
      goal: 'Before a campaign goes live, batch-check final SKU prices and margin risk so stacked discounts do not fall below floor price.',
      platform: '- Windows + macOS; Electron + React + TypeScript; SheetJS; local SQLite',
      features: `1. Import SKU price sheet: SKU, cost, normal price, campaign price, floor price, category, stock.
2. Import campaign rules: coupon, bundle discount, member discount, platform subsidy, campaign time.
3. Auto-calculate final customer price, gross margin amount, gross margin rate, and show calculation assumptions.
4. Risk rules: below floor price, margin below threshold, campaign price above normal price, price inversion, insufficient stock; editable thresholds.
5. Main UI groups red/yellow/green risks; export "campaign-price-risk.xlsx".`,
      deliveryPhases: ['Scaffold Electron shell, implement SKU price sheet and campaign rules import.', 'Complete final price calculation, margin analysis, and risk rule engine.', 'Add red/yellow/green grouped view and risk list export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ SKU price sheet and campaign rules import correctly', '☐ Final price, margin amount, margin rate calculate correctly', '☐ Risk rules (below floor, low margin, etc.) trigger accurately', '☐ "campaign-price-risk.xlsx" exports correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

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

export const logisticsCarrierSlaScorecard: CaseBundle = {
  slug: 'logistics-carrier-sla-scorecard',
  department: 'logistics',
  i18n: {
    zh: {
      title: '快递承运商 SLA 评分表',
      departmentLabel: '物流',
      summary:
        '按快递公司统计揽收、签收、停滞、破损、退回，月度选择承运商更有依据。',
      painTitle: '这是什么问题',
      painBody:
        '不同承运商表现差异大，但数据散在物流导出和售后记录里，很难客观比较。',
      solutionTitle: '怎么解决',
      solutionBody:
        '导入物流轨迹和售后异常表，按承运商自动算时效、异常率和综合评分。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '按承运商展示揽收时效、签收时效、停滞率、退回率、破损率。',
        '支持按省份、仓库、商品类型筛选。',
        '自动生成综合评分和本月建议。',
        '导出承运商月度评分 PDF。',
      ],
      keywords: ['物流', '快递', '承运商', 'SLA', '评分'],
    },
    en: {
      title: 'Carrier SLA Scorecard',
      departmentLabel: 'Logistics',
      summary:
        'Score carriers by pickup, delivery, stalled shipments, damage, and returns so monthly carrier choices are evidence-based.',
      painTitle: 'The problem',
      painBody:
        'Carrier performance differs, but evidence is scattered across logistics exports and after-sales records.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'Import shipment tracking and after-sales exception sheets, then calculate carrier speed, exception rates, and a composite score.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Carrier metrics: pickup speed, delivery speed, stalled rate, return rate, damage rate.',
        'Filter by province, warehouse, product type.',
        'Composite score and monthly recommendation.',
        'Export monthly carrier scorecard PDF.',
      ],
      keywords: ['logistics', 'carrier', 'SLA', 'scorecard'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole('物流主管', 'zh'),
      goal: '按快递承运商统计履约表现，帮助选择更稳定的承运商并发现地区问题。',
      platform: '- Windows + macOS；Electron + React + TypeScript；SheetJS；本地 SQLite',
      features: `1. 导入物流轨迹表（订单号、承运商、仓库、省份、揽收时间、签收时间、当前状态）和售后异常表（破损、丢件、退回、投诉）。
2. 计算每个承运商的揽收时效、签收时效、48 小时停滞率、退回率、破损率、投诉率。
3. 支持按仓库、省份、商品类型、时间范围筛选。
4. 综合评分公式可配置，默认时效 40%、异常率 40%、投诉 20%。
5. 导出月度 PDF：承运商排名、红榜/黑榜、省份异常热力表、建议动作。`,
      deliveryPhases: ['搭建 Electron 框架，实现物流轨迹表和售后异常表导入。', '完成承运商指标计算和综合评分引擎。', '实现筛选、PDF 导出和热力表，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 物流轨迹表和售后异常表导入正常', '□ 承运商各项指标计算正确', '□ 综合评分公式可配置', '□ 月度 PDF 导出含排名和热力表'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a logistics lead', 'en'),
      goal: 'Score carrier fulfillment performance so the team can choose stable carriers and spot regional issues.',
      platform: '- Windows + macOS; Electron + React + TypeScript; SheetJS; local SQLite',
      features: `1. Import shipment tracking sheet (order id, carrier, warehouse, province, pickup time, delivery time, status) and after-sales exceptions (damage, lost, return, complaint).
2. Calculate pickup speed, delivery speed, 48-hour stalled rate, return rate, damage rate, complaint rate by carrier.
3. Filters by warehouse, province, product type, time range.
4. Configurable score formula; default speed 40%, exception rate 40%, complaint 20%.
5. Export monthly PDF: carrier ranking, best/worst list, province exception heatmap, recommended actions.`,
      deliveryPhases: ['Scaffold Electron shell, implement shipment tracking and exception sheet import.', 'Complete carrier metric calculation and composite scoring engine.', 'Add filters, PDF export, and heatmap, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Shipment tracking and exception sheets import correctly', '☐ Carrier metrics calculate correctly', '☐ Composite score formula is configurable', '☐ Monthly PDF export includes ranking and heatmap'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const procurementPackagingDemandPlanner: CaseBundle = {
  slug: 'procurement-packaging-demand-planner',
  department: 'procurement',
  i18n: {
    zh: {
      title: '包材需求预测与采购提醒',
      departmentLabel: '采购',
      summary:
        '根据销量、包材规格和库存，提前知道纸箱、胶带、填充物什么时候该补。',
      painTitle: '这是什么问题',
      painBody:
        '包材不起眼但一缺就影响发货；买多又占仓库。采购需要提前看到消耗速度。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地工具把 SKU 与包材规格关联，结合销量和包材库存，自动预测可用天数和补货量。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        'SKU 与包材规格映射：每单用几个纸箱、胶带、填充物。',
        '根据销量自动预测包材消耗。',
        '低于安全库存自动预警。',
        '生成采购建议单，含供应商和建议下单量。',
      ],
      keywords: ['包材', '采购', '库存', '预测', '仓库'],
    },
    en: {
      title: 'Packaging Demand Planner',
      departmentLabel: 'Procurement',
      summary:
        'Forecast when cartons, tape, and filler need replenishment based on sales, packaging specs, and inventory.',
      painTitle: 'The problem',
      painBody:
        'Packaging is easy to ignore until it blocks shipping. Buying too much wastes warehouse space.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'Map SKUs to packaging specs, combine sales and packaging stock, forecast days of supply and reorder quantity.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'SKU-to-packaging mapping: cartons, tape, filler per order.',
        'Sales-driven packaging consumption forecast.',
        'Safety-stock warnings.',
        'Purchase recommendation sheet with supplier and suggested quantity.',
      ],
      keywords: ['packaging', 'procurement', 'inventory', 'forecast'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole('电商采购和仓库同事', 'zh'),
      goal: '根据近 30 天销量、SKU 包材规则和当前包材库存，预测包材什么时候会缺，并生成采购建议。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite；SheetJS',
      features: `1. 导入 SKU 销量表、包材库存表、SKU-包材映射表、供应商报价表。
2. 映射规则：每个 SKU 对应纸箱规格、胶带用量、填充物用量、贴纸/赠品等，可在界面编辑。
3. 计算每种包材日均消耗、可用天数、安全库存缺口。
4. 生成采购建议：建议下单量、首选供应商、预计到货前风险。
5. 导出"包材补货建议.xlsx"和"未来 14 天包材风险表.xlsx"。`,
      deliveryPhases: ['搭建 Electron 框架，实现多表导入和 SKU-包材映射编辑。', '完成消耗预测、库存缺口计算和采购建议生成。', '实现 Excel 导出和风险预警，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 四张表导入正常，映射关系可编辑', '□ 日均消耗、可用天数、安全库存缺口计算正确', '□ 采购建议含建议下单量和首选供应商', '□ 两份 Excel 导出正常'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('e-commerce procurement and warehouse teammates', 'en'),
      goal: 'Use last-30-day sales, SKU packaging rules, and packaging stock to forecast shortages and generate purchase recommendations.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite; SheetJS',
      features: `1. Import SKU sales, packaging inventory, SKU-packaging mapping, and supplier quote sheets.
2. Mapping rules: carton size, tape usage, filler usage, sticker/gift per SKU; editable in UI.
3. Calculate daily average consumption, days of supply, safety-stock gap per packaging item.
4. Generate purchase suggestions: recommended quantity, preferred supplier, risk before arrival.
5. Export "packaging-replenishment.xlsx" and "14-day-packaging-risk.xlsx".`,
      deliveryPhases: ['Scaffold Electron shell, implement multi-sheet import and SKU-packaging mapping editing.', 'Complete consumption forecast, stock gap calculation, and purchase suggestion generation.', 'Add Excel export and risk alerts, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Four sheets import correctly; mapping is editable', '☐ Daily consumption, days of supply, safety-stock gap calculate correctly', '☐ Purchase suggestions include recommended quantity and preferred supplier', '☐ Two Excel files export correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const marketingLiveRoomRunOfShow: CaseBundle = {
  slug: 'marketing-live-room-run-of-show',
  department: 'marketing',
  i18n: {
    zh: {
      title: '直播间排品与话术节奏表',
      departmentLabel: '市场',
      summary:
        '把直播商品、价格、库存、卖点、主播话术和时间节奏放进一张可执行排班表。',
      painTitle: '这是什么问题',
      painBody:
        '直播前商品多、价格多、库存和话术反复改，最后主播、场控、运营拿的版本不一致。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地直播排品表：导入商品清单，按时间段排品，自动生成主播卡片和场控提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '直播排期时间轴：每 5/10/15 分钟一个坑位。',
        '每个商品卡含价格、库存、利益点、禁说词、赠品。',
        '一键导出主播版、场控版、运营复盘版。',
        '直播中可标记实际上架时间和异常。',
      ],
      keywords: ['直播', '排品', '话术', '投放', '市场'],
    },
    en: {
      title: 'Live Room Run-of-Show Planner',
      departmentLabel: 'Marketing',
      summary:
        'Put live products, prices, stock, selling points, host wording, and timing into one executable run sheet.',
      painTitle: 'The problem',
      painBody:
        'Before a livestream, product order, prices, stock, and scripts change constantly. Host, control desk, and ops often hold different versions.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local live run-of-show planner: import product list, arrange slots by time, auto-generate host cards and control-desk reminders.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Timeline with 5/10/15-minute product slots.',
        'Product card includes price, stock, benefits, forbidden words, gifts.',
        'Export host version, control-desk version, and ops recap version.',
        'During live, mark actual on-air time and exceptions.',
      ],
      keywords: ['live commerce', 'run of show', 'script', 'marketing'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole('直播运营同事', 'zh'),
      goal: '把直播排品、主播话术、场控提醒和复盘记录集中管理，避免多人拿错版本。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite；Excel 导入导出',
      features: `1. 导入商品清单：SKU、商品名、价格、库存、卖点、赠品、佣金、禁说词、链接。
2. 时间轴排品：选择直播开始/结束时间，按 5/10/15 分钟坑位拖拽商品。
3. 商品卡片：主播话术、场控提醒、价格口播、库存预警、禁说词提醒。
4. 导出三版：主播版（话术为主）、场控版（时间和链接为主）、运营版（价格库存和备注完整）。
5. 直播中记录实际开始时间、是否跳过、异常原因；直播后导出复盘表。`,
      deliveryPhases: ['搭建 Electron 框架，实现商品清单导入和时间轴排品。', '完成商品卡片、主播话术和场控提醒功能。', '实现三版导出和复盘记录，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 商品清单导入正常，时间轴拖拽排品流畅', '□ 商品卡片显示话术、禁说词、库存预警', '□ 三版导出内容差异化正确', '□ 复盘表导出含实际时间和异常记录'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a livestream operations teammate', 'en'),
      goal: 'Manage livestream product order, host scripts, control-desk reminders, and recap records in one place so no one uses the wrong version.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite; Excel import/export',
      features: `1. Import product list: SKU, name, price, stock, selling points, gifts, commission, forbidden words, link.
2. Timeline: choose live start/end time; drag products into 5/10/15-minute slots.
3. Product card: host wording, control-desk reminder, price wording, stock alert, forbidden-word alert.
4. Export three versions: host view, control-desk view, operations view.
5. During live, record actual start time, skipped status, exception reason; after live, export recap sheet.`,
      deliveryPhases: ['Scaffold Electron shell, implement product list import and timeline scheduling.', 'Complete product card, host wording, and control-desk reminder features.', 'Add three-version export and recap recording, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Product list imports; timeline drag-to-place is smooth', '☐ Product card shows wording, forbidden words, stock alerts', '☐ Three export versions differ correctly', '☐ Recap sheet export includes actual times and exceptions'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const dataSkuProfitRadar: CaseBundle = {
  slug: 'data-sku-profit-radar',
  department: 'data',
  i18n: {
    zh: {
      title: 'SKU 利润雷达图',
      departmentLabel: '数据',
      summary:
        '把销售额、毛利、广告、退款、库存周转放在一起，找出真正赚钱和虚胖的 SKU。',
      painTitle: '这是什么问题',
      painBody:
        '只看销售额会误判爆品，有些 SKU 卖得多但广告贵、退款高、毛利低。',
      solutionTitle: '怎么解决',
      solutionBody:
        '导入销售、成本、广告、退款和库存表，按 SKU 算真实贡献，并生成红黄绿分层。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        'SKU 排名：销售额、毛利、退款率、广告占比、库存周转。',
        '四象限：高利高量、低利高量、高利低量、低利低量。',
        '识别“虚胖 SKU”：销量高但利润弱。',
        '导出经营动作建议表。',
      ],
      keywords: ['SKU', '利润', '数据', '广告', '库存'],
    },
    en: {
      title: 'SKU Profit Radar',
      departmentLabel: 'Data',
      summary:
        'Combine sales, margin, ads, refunds, and inventory turnover to find truly profitable SKUs versus vanity volume.',
      painTitle: 'The problem',
      painBody:
        'Revenue alone can mislead. Some SKUs sell a lot but have expensive ads, high refunds, and weak margin.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'Import sales, cost, ad, refund, and stock sheets; calculate real contribution by SKU and produce red/yellow/green tiers.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'SKU ranking: revenue, gross profit, refund rate, ad share, inventory turnover.',
        'Quadrants: high profit/high volume, low profit/high volume, high profit/low volume, low profit/low volume.',
        'Spot vanity SKUs: high volume but weak profit.',
        'Export action recommendation table.',
      ],
      keywords: ['SKU', 'profit', 'data', 'ads', 'inventory'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: '你是一名擅长本地桌面小工具的资深工程师。用户是电商数据分析同事，操作要自然易用。',
      goal: '把销售额、毛利、广告、退款和库存周转合在一起，找出真正值得加资源的 SKU。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite；SheetJS；ECharts',
      features: `1. 导入销售表、成本表、广告消耗表、退款表、库存表，按 SKU 自动合并。
2. 计算：销售额、毛利额、毛利率、广告占比、退款率、库存周转天数、综合利润分。
3. 主视图：SKU 排名表 + 四象限图；点击 SKU 展开趋势小图。
4. 自动标记：高利高量、低利高量、高利低量、低利低量、虚胖 SKU。
5. 导出"SKU 利润雷达.xlsx"，含推荐动作：加投、控费、清库存、观察。`,
      deliveryPhases: ['搭建 Electron 框架，实现多表导入和 SKU 自动合并。', '完成指标计算、四象限图和趋势小图。', '实现虚胖 SKU 标记和推荐动作导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 五张表导入并按 SKU 合并正常', '□ 毛利率、广告占比、退款率等指标计算正确', '□ 四象限图展示正确，点击可展开趋势', '□ 导出"SKU 利润雷达.xlsx"含推荐动作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an e-commerce data analyst (tool must be usable by non-technical teammates)', 'en'),
      goal: 'Combine revenue, margin, ads, refunds, and stock turnover to find SKUs worth more resources.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite; SheetJS; ECharts',
      features: `1. Import sales, cost, ad spend, refund, and stock sheets; merge by SKU.
2. Calculate revenue, gross profit, margin rate, ad share, refund rate, days of supply, composite profit score.
3. Main view: SKU ranking table + quadrant chart; click SKU for mini trend.
4. Auto-label: high-profit/high-volume, low-profit/high-volume, high-profit/low-volume, low-profit/low-volume, vanity SKU.
5. Export "sku-profit-radar.xlsx" with recommended actions: scale, control spend, clear stock, observe.`,
      deliveryPhases: ['Scaffold Electron shell, implement multi-sheet import and SKU merge.', 'Complete metric calculation, quadrant chart, and mini trends.', 'Add vanity SKU labeling and action recommendation export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Five sheets import and merge by SKU correctly', '☐ Margin rate, ad share, refund rate, etc. calculate correctly', '☐ Quadrant chart displays correctly; click opens trend', '☐ "sku-profit-radar.xlsx" export includes recommended actions'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const productListingQualityChecker: CaseBundle = {
  slug: 'product-listing-quality-checker',
  department: 'product',
  i18n: {
    zh: {
      title: '商品信息质量巡检台',
      departmentLabel: '产品',
      summary:
        '批量检查标题、卖点、规格、图片、价格和资质是否缺失或冲突，上架前少返工。',
      painTitle: '这是什么问题',
      painBody:
        '商品资料常常标题不统一、规格冲突、图片缺失、资质没传，等上线前才发现很赶。',
      solutionTitle: '怎么解决',
      solutionBody:
        '导入商品资料表和图片清单，按规则检查字段缺失、冲突和风险，并给出补齐清单。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '按 SKU 展示资料完整度分数。',
        '检查标题、类目、规格、价格、库存、图片、卖点、资质。',
        '缺失/冲突/建议优化分层提示。',
        '导出给商品同事的补齐清单。',
      ],
      keywords: ['商品', '上新', '资料', 'SKU', '质检'],
    },
    en: {
      title: 'Listing Quality Checker',
      departmentLabel: 'Product',
      summary:
        'Batch-check titles, selling points, specs, images, prices, and certificates before launch.',
      painTitle: 'The problem',
      painBody:
        'Listing materials often have inconsistent titles, spec conflicts, missing images, or missing certificates, found too late before launch.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'Import product data and image list, run rules for missing fields, conflicts, and risks, then output a fix list.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Completeness score by SKU.',
        'Checks title, category, specs, price, stock, images, selling points, certificates.',
        'Layered hints: missing / conflict / should improve.',
        'Export fix list for merchandising.',
      ],
      keywords: ['listing', 'launch', 'SKU', 'quality'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: '你是一名擅长本地桌面小工具的资深工程师。用户是商品/产品同事，操作要自然易用。',
      goal: '批量检查商品上架资料是否完整、前后一致，减少上线前反复返工。',
      platform: '- Windows + macOS；Electron + React + TypeScript；SheetJS；本地 JSON 规则',
      features: `1. 导入商品资料表、图片清单、资质文件清单。
2. 检查规则：商品名、类目、规格、价格、库存、主图/详情图、卖点、售后说明、资质是否齐全。
3. 冲突检查：规格前后不一致、价格低于成本、库存为 0 仍标记上架、图片数量不足、资质过期。
4. 每个 SKU 生成完整度分数和状态：可上线 / 补齐后上线 / 退回补资料。
5. 导出"商品资料补齐清单.xlsx"，备注列可直接发给商品同事。`,
      deliveryPhases: ['搭建 Electron 框架，实现商品资料和图片清单导入。', '完成检查规则引擎和冲突检测逻辑。', '实现完整度评分和补齐清单导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 商品资料表、图片清单、资质文件清单导入正常', '□ 检查规则覆盖名、类目、规格、价格、库存、图片、资质', '□ 冲突检查正确标红', '□ 导出"商品资料补齐清单.xlsx"正常'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('merchandising/product teammates (must be usable by non-technical staff)', 'en'),
      goal: 'Batch-check listing materials for completeness and consistency to reduce last-minute rework before launch.',
      platform: '- Windows + macOS; Electron + React + TypeScript; SheetJS; local JSON rules',
      features: `1. Import product sheet, image list, certificate file list.
2. Check product name, category, specs, price, stock, hero/detail images, selling points, after-sales notes, certificates.
3. Conflict checks: inconsistent specs, price below cost, stock 0 but marked live, insufficient images, expired certificates.
4. Per-SKU completeness score and status: ready / ready after fixes / return for materials.
5. Export "listing-fix-list.xlsx" with notes ready to send to merchandising.`,
      deliveryPhases: ['Scaffold Electron shell, implement product data and image list import.', 'Complete check rule engine and conflict detection logic.', 'Add completeness scoring and fix list export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Product sheet, image list, and certificate list import correctly', '☐ Checks cover name, category, specs, price, stock, images, certificates', '☐ Conflict checks flag correctly', '☐ "listing-fix-list.xlsx" exports correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};
