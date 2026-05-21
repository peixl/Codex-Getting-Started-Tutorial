import type { CaseBundle } from '../types';
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
      role: caseRole('a finance teammate', 'en'),
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
