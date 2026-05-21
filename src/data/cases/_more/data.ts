import type { CaseBundle } from '../types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

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
      role: caseRole('数据分析同事', 'zh'),
      goal: '把每周拉指标、写周报的重复活儿压成 5 分钟。',
      platform: '- Windows + macOS；Electron + React + TypeScript；SheetJS；图表用纯 SVG 自绘小折线',
      features: '1. 导入 Excel，自动识别"指标名"列和过去 N 周（W-N..W-1）列；最右一列视为本周。\n2. 每个指标渲染一张卡：本周值、环比、4-8 周迷你折线。\n3. 阈值规则（可改）：环比 > +5% 绿色 + "增长"； < -5% 红色 + "下滑"；接近 0 灰色 + "持平"。\n4. 解读模板（可编辑）：根据涨跌方向自动填充一句中文，例如"本周 GMV 较上周增长 7.2%，主要受 618 预热影响"——预热文案占位允许人工编辑。\n5. "导出周报 Markdown"按钮，按指标分组输出。',
      deliveryPhases: ['搭建 Electron 框架，实现 Excel 导入和指标列识别。', '完成指标卡片、迷你折线和阈值规则功能。', '实现解读模板和周报 Markdown 导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 导入 Excel 后指标列自动识别正确', '□ 指标卡片显示本周值、环比和迷你折线', '□ 阈值规则标色和解读模板填充正确', '□ 导出周报 Markdown 按指标分组'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a data analyst', 'en'),
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
      role: caseRole('电商数据分析同事', 'zh'),
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
      role: caseRole('an e-commerce data analyst whose teammates across the business will use this tool', 'en'),
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
