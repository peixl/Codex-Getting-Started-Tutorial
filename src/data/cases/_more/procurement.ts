import type { CaseBundle } from '../types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

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
