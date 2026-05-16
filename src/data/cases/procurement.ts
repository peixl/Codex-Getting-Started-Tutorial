import type { CaseBundle } from './types';
import { composeCasePrompt, caseRole } from '@/lib/promptModules';

export const procurementPriceMonitor: CaseBundle = {
  slug: 'procurement-supplier-price-monitor',
  department: 'procurement',
  i18n: {
    zh: {
      title: '供应商报价比较台账',
      departmentLabel: '采购',
      summary:
        '把同一种货在多个供应商的报价集中比一比，自动标出最优价和异常涨幅，订货再也不拍脑袋。',
      painTitle: '这是什么问题',
      painBody:
        '采购每周从各家供应商收一堆报价单，格式五花八门，人眼比价要花几个小时。价格涨了没人及时发现，损失悄悄发生。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地小台账：把每次的报价贴进去或导入 Excel，软件自动按 SKU 汇总不同供应商的历史价格，算出最低、均价、最近涨跌幅。一打开就能看出哪家最划算、哪家异常。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '首页是 SKU 列表，每行显示最新最低价、供应商名、比上期的涨跌百分比。',
        '点进某个 SKU 后显示历史报价曲线（简易折线图），清楚看到价格趋势。',
        '支持导入 Excel（每行：日期 / SKU / 供应商 / 单价 / 单位）。',
        '涨幅超过阈值（默认 5%）自动红色标注，下单前一眼看到。',
        '一键导出"本月最优供应商清单"到 Excel，作为谈判和请款依据。',
      ],
      keywords: ['采购', '报价', '供应商', '比价', '台账'],
    },
    en: {
      title: 'Supplier Price Monitor',
      departmentLabel: 'Procurement',
      summary:
        'Centralize multi-supplier quotes for each SKU. Auto-flag best price and unusual increases. Stop ordering on gut feel.',
      painTitle: 'The problem',
      painBody:
        'Procurement collects quotes from many suppliers in many formats weekly. Manual comparison takes hours. Price creep often goes unnoticed until budgets hurt.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local ledger. Paste or import each round of quotes. The tool aggregates by SKU across suppliers, computes min/mean/latest change, and highlights anomalies at a glance.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Home lists SKUs with latest min price, supplier name, % change vs last period.',
        'Click a SKU to see a simple historical price line chart.',
        'Import from Excel (rows: Date / SKU / Supplier / Unit Price / Unit).',
        'Auto-red flag any jump over threshold (default 5%).',
        'One-click export of "best supplier of the month" to Excel for negotiation.',
      ],
      keywords: ['procurement', 'pricing', 'supplier', 'benchmarking'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('电商公司采购部的同事', 'zh'),
      goal: '把每周从各个供应商收来的报价集中记录、横向比较，自动发现最优价和异常涨幅，让下单更有依据。',
      platform: `- Windows 10/11 桌面应用
- Electron + React + TypeScript
- 本地 SQLite 存报价历史
- SheetJS 处理 Excel
- 离线运行，打包成 Windows .exe 安装包`,
      features: `1. 首页 SKU 列表：每行展示 SKU 名、最新最低价、对应供应商、相对上一期的涨跌百分比（红涨绿跌）。
2. 点击 SKU 进入详情页：横向列出所有供应商最新报价、历史最低 / 平均值、一条简易折线图（最近 12 期）。
3. 数据录入：
   - 支持粘贴单条（日期 / SKU / 供应商 / 单价 / 单位）。
   - 支持 Excel 批量导入，智能匹配表头（中英文兼容），字段不全时提示用户补。
4. 阈值告警：涨幅 > 5%（阈值可调）自动红色；跌幅 > 5% 自动绿色。首页顶部显示"本周异常 N 条"。
5. 导出「本月最优供应商清单」到 Excel，字段：SKU / 最优供应商 / 最优单价 / 节省金额。
6. 支持按 SKU、供应商、日期筛选；支持搜索。
7. 数据本地存储，可一键导出整个台账备份，方便换电脑迁移。`,
      style: `- 业务型：表格清晰、信息密度适中、分隔线柔和。
- 配色保持中性：白底，深灰主文本，红绿仅用于涨跌标注。
- 折线图用细线、柔和色；避免花哨。
- 支持深浅模式跟随系统。`,
      robustness: `- 数据为空时显示空状态提示和"导入 Excel 开始记录"按钮。
- 导入数据缺列时高亮提示哪一列缺失并给出示例。
- 数据库损坏时自动用最近一个备份恢复。`,
      deliveryPhases: [
        '摘要需包含首页、详情页、导入页安排。',
        '分阶段：第一步做"录入 + SKU 列表"；第二步加"详情页 + 曲线"；第三步加"告警 + 导出"。',
        '最后打包 .exe，并写 500 字内的中文使用说明。',
      ],
      acceptanceItems: [
        '□ 双击 .exe 启动，首页是 SKU 列表',
        '□ Excel 导入报价 → SKU 列表显示最新最低价和涨跌',
        '□ 点击 SKU → 详情页显示历史报价折线图',
        '□ 涨幅超阈值自动红色标注',
        '□ 导出"本月最优供应商清单" Excel',
        '□ 空数据、缺列 → 友好提示，不闪退',
      ],
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('the procurement team at an e-commerce company', 'en'),
      goal: 'Aggregate weekly supplier quotes, compare across suppliers, flag best prices and unusual increases, and support data-driven ordering.',
      platform: `- Windows 10/11 desktop app
- Electron + React + TypeScript
- Local SQLite for quote history
- SheetJS for Excel
- Fully offline; ship a Windows .exe installer`,
      features: `1. Home SKU list: name, latest min price, supplier, % change vs last period (red up, green down).
2. SKU detail: all suppliers' latest quotes side by side, min/mean, a simple 12-period line chart.
3. Data input:
   - Single-entry paste (Date / SKU / Supplier / Unit Price / Unit).
   - Excel bulk import with smart header matching (Chinese + English). Prompt when fields are missing.
4. Threshold alerts: increase > 5% (configurable) turns red; drop > 5% green. Top bar shows "N anomalies this week".
5. Export "Best suppliers of the month" to Excel with SKU / Best Supplier / Best Price / Savings.
6. Filter by SKU / Supplier / Date. Search.
7. Local storage; one-click export of full ledger backup for portability.`,
      style: `- Dashboard density, clean tables, subtle dividers.
- Neutral palette: white background, deep gray text, red/green only for delta indicators.
- Minimalist line charts.
- Follows system dark mode.`,
      robustness: `- Empty state with "Import Excel to start tracking".
- Missing columns: highlight which columns are missing with an example.
- Auto-recover DB from last backup on corruption.`,
      deliveryPhases: [
        'Summary should include the home, detail, and import screens.',
        'Phase 1: entry + SKU list. Phase 2: detail + chart. Phase 3: alerts + export.',
        'Package .exe; write a clear 500-word user guide.',
      ],
      acceptanceItems: [
        '☐ Double-click .exe launches; home shows SKU list',
        '☐ Excel import quotes → SKU list shows latest min price and delta',
        '☐ Click SKU → detail page shows historical price line chart',
        '☐ Increase over threshold auto-red flagged',
        '☐ Export "best supplier of the month" Excel',
        '☐ Empty data, missing columns → friendly message, no crash',
      ],
    }, 'en'),
  },
};
