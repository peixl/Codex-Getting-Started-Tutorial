import type { CaseBundle } from '../types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

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
