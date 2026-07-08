import type { CaseBundle } from './types';
import { composeCasePrompt } from '@/lib/promptModules';

const WEB_ROLE_ZH = '你是资深网站应用工程师，也是一名体贴的产品经理。请直接做出可运行、可构建、可部署的网站应用，界面用业务语言，默认替用户选好稳妥实现路径。';
const WEB_ROLE_EN = 'You are a senior web app engineer and a thoughtful product manager. Build a runnable, buildable, deployable web app directly. Use business language in the UI and choose sensible implementation defaults.';

export const financeExpensePortalWeb: CaseBundle = {
  slug: 'finance-expense-portal-web',
  department: 'finance',
  platforms: ['web'],
  i18n: {
    zh: {
      title: '团队报销收集网站',
      departmentLabel: '财务',
      summary: '把员工报销从聊天截图和零散 Excel 改成统一网站收集，财务每天打开看待审、已退回、可付款。',
      painTitle: '这是什么问题',
      painBody: '报销材料分散在群聊、邮件和共享盘里。财务要反复追发票、补字段、核金额，月底汇总时还要手工合并。',
      solutionTitle: '怎么解决',
      solutionBody: '做一个网站应用：员工填写报销单、上传票据，财务在审核工作台按状态处理，最后导出付款清单。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '员工页：填写金额、部门、用途、付款账号，上传票据。',
        '财务页：待审 / 已通过 / 已退回三栏，卡片显示金额和缺失项。',
        '退回时填写原因，员工页能看到需要补什么。',
        '一键导出本周付款清单 CSV / Excel。',
        '浏览器本地保存草稿和最近审核记录，后续可接数据库。',
      ],
      keywords: ['财务', '报销', '网站', '审核', '导出'],
    },
    en: {
      title: 'Team Expense Collection Site',
      departmentLabel: 'Finance',
      summary: 'Replace reimbursement screenshots and scattered spreadsheets with one web intake and finance review workspace.',
      painTitle: 'The problem',
      painBody: 'Expense materials arrive through chat, email, and shared folders. Finance chases invoices, missing fields, and amount checks, then merges everything manually at month end.',
      solutionTitle: 'The solution approach',
      solutionBody: 'Build a web app: employees submit expense claims and receipts; finance reviews by status and exports a payment list.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Employee page: amount, department, purpose, payment account, receipt upload.',
        'Finance page: pending / approved / returned lanes with amount and missing-field chips.',
        'Return reason is visible on the employee page.',
        'One-click weekly payment list export as CSV / Excel.',
        'Browser local drafts and recent review history; ready for a database later.',
      ],
      keywords: ['finance', 'expense', 'web', 'review', 'export'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: WEB_ROLE_ZH,
      goal: '把团队报销从群聊截图和零散 Excel 改成统一网站收集，财务能集中审核并导出付款清单。',
      platform: `- 网站应用，使用 Next.js + React + TypeScript
- 使用 App Router
- 浏览器本地存储保存草稿和审核记录
- 支持 Windows / macOS / Linux 构建部署
- npm run dev / npm run build / npm run start 都要通过`,
      tech: 'nextjs',
      features: `1. 员工提交页：姓名、部门、费用类型、金额、发生日期、用途、付款账号、票据上传。
2. 财务审核工作台：待审核 / 已通过 / 已退回三栏；支持搜索、状态筛选、金额区间筛选。
3. 缺失项检查：金额为空、票据缺失、付款账号缺失时在卡片上显示黄色提示。
4. 退回流程：财务填写退回原因，员工回到提交页能看到原因并补充。
5. 导出：按周导出付款清单 CSV / Excel，包含姓名、部门、金额、账号、审核时间。
6. 示例数据：预置 12 条报销单，覆盖待审、通过、退回、缺票据。`,
      style: '业务型网站：第一屏就是审核工作台，表格和状态栏清楚，不做欢迎页，不显示技术术语。',
      robustness: '刷新页面不丢草稿；上传非图片/PDF 时给友好提示；导出为空时说明原因并给示例数据入口。',
      deliveryPhases: [
        '先搭建网站应用和示例数据，首页能看到审核工作台。',
        '实现员工提交、财务审核、退回补充和状态筛选。',
        '补导出、README、本地启动和部署说明，验证 npm run build。',
      ],
      acceptanceItems: [
        '□ 打开网站第一屏就是财务审核工作台',
        '□ 员工提交报销单后进入待审核',
        '□ 财务通过 / 退回后状态正确变化',
        '□ 缺票据、缺账号有明确提示',
        '□ 导出付款清单文件可下载',
        '□ npm run build 通过',
      ],
    }, 'zh'),
    en: composeCasePrompt({
      role: WEB_ROLE_EN,
      goal: 'Turn scattered expense screenshots and spreadsheets into one web intake so finance can review and export payment lists.',
      platform: `- Web app using Next.js + React + TypeScript
- Use App Router
- Browser local storage for drafts and review history
- Build/deploy from Windows / macOS / Linux
- npm run dev / npm run build / npm run start must pass`,
      tech: 'nextjs',
      features: `1. Employee submit page: name, department, expense type, amount, date, purpose, payment account, receipt upload.
2. Finance workspace: pending / approved / returned lanes with search, status filter, and amount filter.
3. Missing-field checks: empty amount, missing receipt, or missing payment account shows a yellow chip on the card.
4. Return flow: finance writes a reason; employee sees it and resubmits.
5. Export weekly payment list as CSV / Excel with name, department, amount, account, review time.
6. Seed 12 sample claims covering pending, approved, returned, and missing receipt.`,
      style: 'Business web app: first screen is the review workspace; clear tables and status lanes; no welcome page or technical UI terms.',
      robustness: 'Refresh does not lose drafts; non-image/PDF upload gets a friendly message; empty export explains why and offers sample data.',
      deliveryPhases: [
        'Scaffold the web app and seed data; home shows the review workspace.',
        'Implement employee submission, finance review, return/resubmit, and filters.',
        'Add export, README, local start/deploy notes, and verify npm run build.',
      ],
      acceptanceItems: [
        '☐ First screen is the finance review workspace',
        '☐ Employee submission appears in Pending',
        '☐ Approve / return changes status correctly',
        '☐ Missing receipt/account shows a clear warning',
        '☐ Payment list downloads successfully',
        '☐ npm run build passes',
      ],
    }, 'en'),
  },
};

export const customerServiceSelfServePortalWeb: CaseBundle = {
  slug: 'customer-service-self-serve-portal-web',
  department: 'customer-service',
  platforms: ['web'],
  i18n: {
    zh: {
      title: '客服自助查询网站',
      departmentLabel: '客服',
      summary: '把常见订单、退款、物流查询做成内部网站，客服输入订单号就能看到处理建议和可复制话术。',
      painTitle: '这是什么问题',
      painBody: '新人客服查规则慢，经常在群里问。订单、退款、物流规则散在多个表里，回复质量不稳定。',
      solutionTitle: '怎么解决',
      solutionBody: '做一个客服自助查询网站：输入订单号或问题关键词，展示订单状态、规则命中、推荐话术和下一步动作。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '顶部搜索框输入订单号或关键词。',
        '结果页分为订单信息、规则命中、推荐回复、下一步动作。',
        '话术一键复制，复制后计入使用次数。',
        '规则库可导入 CSV，支持按类目筛选。',
      ],
      keywords: ['客服', '网站', '订单查询', '话术', '规则库'],
    },
    en: {
      title: 'Support Self-Serve Lookup Site',
      departmentLabel: 'Customer Service',
      summary: 'An internal web lookup for order, refund, and logistics questions. Agents enter an order ID and get guidance plus copy-ready replies.',
      painTitle: 'The problem',
      painBody: 'New support agents spend too long asking in chat. Order, refund, and logistics rules live in separate sheets, so replies are inconsistent.',
      solutionTitle: 'The solution approach',
      solutionBody: 'Build a support lookup site: search by order ID or issue keyword, then show order state, matched rules, suggested reply, and next action.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Top search for order ID or keyword.',
        'Result sections: order info, matched rules, recommended reply, next action.',
        'One-click copy replies; copied count increases.',
        'CSV rule import and category filtering.',
      ],
      keywords: ['support', 'web', 'order lookup', 'reply', 'rules'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: WEB_ROLE_ZH,
      goal: '给客服团队做一个内部自助查询网站，输入订单号或问题关键词后直接给处理建议和可复制话术。',
      platform: `- 网站应用，使用 Next.js + React + TypeScript
- 使用 App Router
- 规则和示例订单先放 src/data/seed.ts
- 浏览器本地存储记录话术使用次数
- npm run build 必须通过`,
      tech: 'nextjs',
      features: `1. 搜索工作台：输入订单号或关键词，回车展示结果。
2. 订单信息：状态、物流、退款、付款时间、风险标签。
3. 规则命中：按退款 / 物流 / 质量 / 发票分类展示命中的规则和原因。
4. 推荐话术：给 2-3 条可复制话术，按普通 / 安抚 / 升级三种语气。
5. 规则库：支持导入 CSV，字段为类目、关键词、条件、建议动作、话术。
6. 统计：今日查询次数、复制次数、升级建议次数。`,
      style: '工具型网站：搜索框大、结果区清楚、复制按钮醒目，避免营销式大图。',
      robustness: '找不到订单时给示例入口；规则冲突时按优先级展示；CSV 表头缺失时提示缺哪一列。',
      deliveryPhases: [
        '先完成搜索工作台和 seed 示例订单。',
        '实现规则命中、推荐话术、一键复制和统计。',
        '补 CSV 导入、异常提示、README 和 build 验证。',
      ],
      acceptanceItems: [
        '□ 输入示例订单号能展示完整结果',
        '□ 输入关键词能命中规则',
        '□ 话术复制后复制次数增加',
        '□ 导入规则 CSV 后可立即查询',
        '□ 表头缺失时提示缺少字段',
        '□ npm run build 通过',
      ],
    }, 'zh'),
    en: composeCasePrompt({
      role: WEB_ROLE_EN,
      goal: 'Build an internal support lookup site where agents enter an order ID or issue keyword and get guidance plus copy-ready replies.',
      platform: `- Web app using Next.js + React + TypeScript
- Use App Router
- Rules and sample orders in src/data/seed.ts first
- Browser local storage tracks reply usage counts
- npm run build must pass`,
      tech: 'nextjs',
      features: `1. Search workspace: order ID or keyword; Enter shows results.
2. Order info: status, logistics, refund, payment time, risk tags.
3. Matched rules by refund / logistics / quality / invoice with reason.
4. Suggested replies: 2-3 copy-ready replies in normal / calming / escalation tones.
5. Rule library: CSV import with category, keywords, condition, action, reply.
6. Stats: today searches, copied replies, escalation suggestions.`,
      style: 'Tool-like web app: large search, clear result sections, prominent copy buttons; no marketing hero.',
      robustness: 'No order found offers sample data; rule conflicts display by priority; missing CSV headers say exactly which column is missing.',
      deliveryPhases: [
        'Build search workspace and seeded sample orders.',
        'Implement rule matching, suggested replies, copy action, and stats.',
        'Add CSV import, friendly errors, README, and build verification.',
      ],
      acceptanceItems: [
        '☐ Sample order ID displays full results',
        '☐ Keyword search matches rules',
        '☐ Copying a reply increments copy count',
        '☐ Imported CSV rules are immediately searchable',
        '☐ Missing headers report the exact fields',
        '☐ npm run build passes',
      ],
    }, 'en'),
  },
};

export const dataKpiPortalWeb: CaseBundle = {
  slug: 'data-kpi-portal-web',
  department: 'data',
  platforms: ['web'],
  i18n: {
    zh: {
      title: '业务指标看板网站',
      departmentLabel: '数据',
      summary: '把每日指标做成团队都能打开的网站看板，老板看趋势，运营看异常，数据同事少发重复截图。',
      painTitle: '这是什么问题',
      painBody: '日报截图每天都要重做，指标口径一变就要重新解释。团队成员想看最新数据，只能翻群消息。',
      solutionTitle: '怎么解决',
      solutionBody: '做一个网站看板：上传每日 CSV 后自动更新 KPI、趋势、异常提醒和下载区。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '首页顶部是 GMV、订单、转化率、客单价四张 KPI 卡。',
        '趋势区显示近 14 天变化和环比。',
        '异常区列出超过阈值的指标。',
        '上传 CSV 后看板立即刷新，可下载日报图片。',
      ],
      keywords: ['数据', '网站', '看板', 'KPI', '日报'],
    },
    en: {
      title: 'Business KPI Dashboard Site',
      departmentLabel: 'Data',
      summary: 'A team web dashboard for daily KPIs: leaders see trends, ops sees anomalies, and data stops reposting screenshots.',
      painTitle: 'The problem',
      painBody: 'Daily report screenshots are rebuilt every day. Metric definitions change and require repeated explanations. Teammates dig through chat to find the latest numbers.',
      solutionTitle: 'The solution approach',
      solutionBody: 'Build a web dashboard: upload daily CSV and automatically refresh KPIs, trends, anomaly alerts, and downloads.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Top KPI cards for GMV, orders, conversion rate, AOV.',
        '14-day trend charts and day-over-day changes.',
        'Anomaly section for metrics beyond thresholds.',
        'CSV upload refreshes the dashboard; daily image can be downloaded.',
      ],
      keywords: ['data', 'web', 'dashboard', 'KPI', 'daily report'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: WEB_ROLE_ZH,
      goal: '做一个团队可打开的业务指标看板网站，上传每日 CSV 后自动更新 KPI、趋势和异常提醒。',
      platform: `- 网站应用，使用 Next.js + React + TypeScript
- 使用 App Router
- 示例数据放 src/data/seed.ts
- 浏览器本地存储保存最近 30 天上传记录
- npm run build / npm run start 必须通过`,
      tech: 'nextjs',
      features: `1. 首页 KPI：GMV、订单数、转化率、客单价，显示当前值、环比、状态色。
2. 上传区：拖入 CSV，字段为日期、GMV、订单数、UV、转化率、客单价、渠道。
3. 趋势区：近 14 天折线图，支持切换指标。
4. 异常提醒：环比波动超过阈值时列出原因候选和建议动作。
5. 渠道表：按渠道展示 GMV、订单、转化率，可排序。
6. 下载：导出日报 PNG 或 CSV 汇总。`,
      style: '数据看板网站：信息密度高、卡片克制、表格清楚，第一屏能看到关键指标。',
      robustness: 'CSV 表头不匹配时给映射建议；空数据不白屏；上传新文件前保留旧数据备份。',
      deliveryPhases: [
        '先完成 seed 数据和 KPI 首页。',
        '实现上传、趋势、异常提醒和渠道表。',
        '补下载、README、部署说明，并验证 npm run build / start。',
      ],
      acceptanceItems: [
        '□ 首屏展示四张 KPI 卡和趋势入口',
        '□ 上传 CSV 后指标刷新',
        '□ 表头错误时能提示并建议映射',
        '□ 异常阈值触发后出现提醒',
        '□ 日报 PNG / CSV 可下载',
        '□ npm run build 和 npm run start 通过',
      ],
    }, 'zh'),
    en: composeCasePrompt({
      role: WEB_ROLE_EN,
      goal: 'Build a team-accessible KPI dashboard web app that updates KPIs, trends, and anomaly alerts after daily CSV upload.',
      platform: `- Web app using Next.js + React + TypeScript
- Use App Router
- Seed data in src/data/seed.ts
- Browser local storage keeps 30 days of uploads
- npm run build / npm run start must pass`,
      tech: 'nextjs',
      features: `1. KPI cards: GMV, orders, conversion rate, AOV with current value, delta, status color.
2. Upload area: drag CSV with date, GMV, orders, UV, conversion, AOV, channel.
3. Trend area: 14-day line chart with metric switcher.
4. Anomaly alerts: when delta exceeds threshold, show candidate reasons and suggested action.
5. Channel table: GMV, orders, conversion by channel; sortable.
6. Downloads: daily PNG or CSV summary.`,
      style: 'Dashboard web app: dense but calm, restrained cards, clear tables, first screen shows key metrics.',
      robustness: 'Header mismatch offers mapping suggestions; empty data never blanks the page; keep previous data before new upload.',
      deliveryPhases: [
        'Build seed data and KPI home first.',
        'Implement upload, trends, anomaly alerts, and channel table.',
        'Add downloads, README, deployment notes, and verify build/start.',
      ],
      acceptanceItems: [
        '☐ First screen shows four KPI cards and trend entry',
        '☐ CSV upload refreshes metrics',
        '☐ Bad headers show mapping suggestions',
        '☐ Threshold breach creates an alert',
        '☐ Daily PNG / CSV downloads work',
        '☐ npm run build and npm run start pass',
      ],
    }, 'en'),
  },
};

export const productFeedbackPortalWeb: CaseBundle = {
  slug: 'product-feedback-portal-web',
  department: 'product',
  platforms: ['web'],
  i18n: {
    zh: {
      title: '产品反馈收集网站',
      departmentLabel: '产品',
      summary: '给销售、客服、内测用户一个统一反馈入口，产品经理看到标签、热度和本周优先级。',
      painTitle: '这是什么问题',
      painBody: '反馈散在飞书、微信、工单和会议纪要里。产品经理要手工复制、去重、分优先级，很难判断本周先看什么。',
      solutionTitle: '怎么解决',
      solutionBody: '做一个反馈收集网站：提交端足够简单，产品端自动聚合标签、来源、热度和优先级。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '提交页只有问题、影响、截图、联系方式四块。',
        '产品工作台按新反馈、待确认、已排期、暂不做分栏。',
        '相似反馈自动提示合并，保留来源。',
        '一键导出本周优先级清单 Markdown。',
      ],
      keywords: ['产品', '反馈', '网站', '优先级', '用户声音'],
    },
    en: {
      title: 'Product Feedback Collection Site',
      departmentLabel: 'Product',
      summary: 'One feedback entry point for sales, support, and beta users. PMs see tags, heat, and weekly priority.',
      painTitle: 'The problem',
      painBody: 'Feedback is scattered across docs, chat, tickets, and meeting notes. PMs copy, dedupe, and prioritize by hand, making weekly focus unclear.',
      solutionTitle: 'The solution approach',
      solutionBody: 'Build a feedback collection web app: simple submitter form and PM workspace with tags, source, heat, and priority.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Submit page has problem, impact, screenshot, contact.',
        'PM workspace lanes: new, validating, planned, not now.',
        'Similar feedback suggests merging while preserving sources.',
        'One-click weekly priority Markdown export.',
      ],
      keywords: ['product', 'feedback', 'web', 'priority', 'user voice'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: WEB_ROLE_ZH,
      goal: '做一个产品反馈收集网站，让销售、客服、内测用户提交反馈，产品经理集中看标签、热度和本周优先级。',
      platform: `- 网站应用，使用 Next.js + React + TypeScript
- 使用 App Router
- 浏览器本地存储保存反馈和看板状态
- 支持 Windows / macOS / Linux 构建部署
- npm run build 必须通过`,
      tech: 'nextjs',
      features: `1. 反馈提交页：问题描述、影响范围、来源角色、截图上传、联系方式。
2. 产品工作台：新反馈 / 待确认 / 已排期 / 暂不做四栏看板。
3. 自动标签：性能、体验、Bug、新功能、文案、价格，允许手动改。
4. 相似反馈：按关键词和标题相似度提示合并，合并后保留全部来源。
5. 优先级：价值 1-5、紧急度 1-5、影响用户数；自动排序“本周先看”。
6. 导出：本周优先级 Markdown 和全部反馈 CSV。`,
      style: '产品工作台风格：高信息密度、状态清楚、拖拽稳定，提交页极简。',
      robustness: '截图过大给压缩提示；空描述不能提交；合并操作可撤销；刷新不丢看板状态。',
      deliveryPhases: [
        '先完成提交页、seed 反馈和工作台四栏。',
        '实现自动标签、相似合并、优先级排序。',
        '补导出、异常、README、部署说明和 build 验证。',
      ],
      acceptanceItems: [
        '□ 提交反馈后工作台出现新卡片',
        '□ 标签自动生成且可修改',
        '□ 相似反馈能提示合并并保留来源',
        '□ 本周先看列表按优先级排序',
        '□ Markdown / CSV 导出可下载',
        '□ npm run build 通过',
      ],
    }, 'zh'),
    en: composeCasePrompt({
      role: WEB_ROLE_EN,
      goal: 'Build a product feedback collection web app for sales, support, and beta users, with PM workspace for tags, heat, and weekly priority.',
      platform: `- Web app using Next.js + React + TypeScript
- Use App Router
- Browser local storage stores feedback and board state
- Build/deploy from Windows / macOS / Linux
- npm run build must pass`,
      tech: 'nextjs',
      features: `1. Submit page: problem, impact, source role, screenshot upload, contact.
2. PM workspace: New / Validating / Planned / Not now kanban lanes.
3. Auto-tags: performance, UX, bug, feature, copy, price; user can edit.
4. Similar feedback: suggest merge by keyword/title similarity, preserving all sources.
5. Priority: value 1-5, urgency 1-5, affected users; auto-sort "look this week".
6. Export weekly priority Markdown and all-feedback CSV.`,
      style: 'Product workspace: dense information, clear statuses, stable drag; submit page stays minimal.',
      robustness: 'Large screenshot gets compression hint; empty description cannot submit; merge can undo; refresh keeps board state.',
      deliveryPhases: [
        'Build submit page, seed feedback, and four-lane workspace.',
        'Implement auto-tags, similar merge, and priority sorting.',
        'Add export, errors, README, deployment notes, and build verification.',
      ],
      acceptanceItems: [
        '☐ Submitted feedback appears as a new workspace card',
        '☐ Tags auto-generate and can be edited',
        '☐ Similar feedback suggests merge and preserves sources',
        '☐ Weekly focus list sorts by priority',
        '☐ Markdown / CSV downloads work',
        '☐ npm run build passes',
      ],
    }, 'en'),
  },
};
