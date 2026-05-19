import type { CaseBundle } from '../types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

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
