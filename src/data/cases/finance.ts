import type { CaseBundle } from './types';
import { composeCasePrompt, caseRole } from '@/lib/promptModules';

export const financeReconciliation: CaseBundle = {
  slug: 'finance-order-reconciliation',
  department: 'finance',
  i18n: {
    zh: {
      title: '月度订单对账小助手',
      departmentLabel: '财务',
      summary:
        '把订单表和银行流水自动按订单号比对，对不上的挑出来，对账从两天压到一小时。',
      painTitle: '这是什么问题',
      painBody:
        '每个月财务都要拿平台订单导出，和公司银行账户的流水做对账。几百上千条数据，手动 VLOOKUP 很容易漏。对不上的订单要一个个打电话核实，常常要加班。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地小工具：把两张 Excel 拖进去，点一下"开始对账"，软件自动按订单号比对金额。对得上的打勾，对不上的单独列出来，标注差异金额和可能原因。整个过程几秒钟就够。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '一个简洁的 Windows 桌面软件，双击图标就能打开。',
        '首页两个大按钮：「导入订单 Excel」「导入银行流水 Excel」，也支持拖拽。',
        '导入后自动预览表头，让你确认字段没选错。',
        '点「开始对账」显示进度条；完成后列出匹配数、差异数、总金额。',
        '底部「导出差异明细到 Excel」按钮，文件名自动带上月份。',
        '全部在你电脑上跑，数据不会发到网上。',
      ],
      keywords: ['对账', '财务', 'Excel', '自动化', '订单匹配'],
    },
    en: {
      title: 'Monthly Order Reconciliation Helper',
      departmentLabel: 'Finance',
      summary:
        'Auto-match order exports with bank statements by order ID. Cut monthly reconciliation from two days to one hour.',
      painTitle: 'The problem',
      painBody:
        'Every month, finance exports orders and compares them line-by-line to bank statements. Hundreds to thousands of rows, manual VLOOKUP, high error rate, and late-night follow-ups.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local Windows app. Drop both Excel files in, click "Reconcile", and it matches by order ID and amount. Matched rows checked off; mismatches land in a separate table with the diff and likely reason. Seconds per run.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'A clean Windows desktop app — double-click to launch.',
        'Two big buttons on the home screen: "Import order Excel" and "Import bank Excel". Drag-and-drop works too.',
        'Header preview after import so you can confirm correct columns.',
        'Reconcile triggers a progress bar; totals appear afterwards.',
        'Footer button exports mismatches as "diff-YYYY-MM.xlsx".',
        'Runs entirely on your PC. No data leaves the machine.',
      ],
      keywords: ['reconciliation', 'finance', 'excel', 'automation', 'order matching'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('电商公司的财务人员', 'zh'),
      goal: '解决财务每月手动对账花 1-2 天的问题。财务只需点几下按钮，就能自动完成订单与银行流水的对账，并导出差异明细。',
      platform: `- 平台：Windows 10 / 11 桌面应用
- 框架：Electron + React + TypeScript
- 表格处理：SheetJS
- 交付时打包成 Windows .exe 安装包`,
      features: `1. 首页两个醒目按钮：「导入订单 Excel」「导入银行流水 Excel」，支持拖拽。
2. 导入后自动显示表头和前 5 行预览，让用户从下拉框里选「订单号」「金额」「交易时间」「备注」字段。记住选择下次默认回填。
3. 示例字段兼容：订单表常见列「订单号 / 实付金额 / 下单时间 / 店铺」；银行流水常见列「交易单号 / 收入金额 / 交易时间 / 摘要」。列名可有细微差异。
4. 「开始对账」按钮显示进度条。匹配逻辑：订单号去空格后作为主键；金额差 <= 0.01 元视为匹配；重复订单号要合并提示；退款 / 冲正流水单独标记，不直接当异常。
5. 结果页两栏：左边展示匹配数、差异数、匹配率、总金额；右边表格列出每一条差异，字段包括订单号、订单金额、银行金额、差额、可能原因（金额不一致 / 银行流水缺失 / 订单缺失 / 重复订单 / 疑似退款）。
6. 「导出差异明细到 Excel」按钮，默认文件名 "差异明细-YYYY-MM.xlsx"。`,
      sampleData: `sample-data/ 中放两个文件：
orders.xlsx — 列：订单号, 实付金额, 下单时间, 店铺（示例：DD202401001, 299.00, 2024-01-05, 旗舰店）
bank.xlsx — 列：交易单号, 收入金额, 交易时间, 摘要（示例：DD202401001, 299.00, 2024-01-06, 支付宝转入）
包含 50 行正常匹配 + 5 行金额差异 + 3 行订单缺失 + 2 行退款流水。`,
      style: `- 简洁桌面工具风：浅色背景、清晰分区、圆角 8、信息密度适中。
- 主按钮用低饱和深色，次要用浅灰。
- 支持跟随 Windows 的深浅模式。
- 字体使用系统默认（微软雅黑 / Segoe UI），不用联网字体。`,
      robustness: `- 文件格式不对时，弹出友好的中文提示，不要直接扔技术错误。
- 字段识别失败时引导手动选择，不要崩溃。
- 支持几万行数据；超过 10 万行分批处理并显示进度。
- 附带 3 个脱敏测试样例文件：完全匹配、金额差异、重复订单 + 退款流水，方便新用户一打开就能跑通。`,
      deliveryPhases: [
        '摘要需包含主界面安排和关键文件职责。',
        '每完成一个模块就运行验证一次，发现问题先自行修复。',
        '打包成 Windows .exe 安装包；写 500 字中文使用说明；列出已知限制。',
      ],
      acceptanceItems: [
        '□ 双击 .exe 启动，第一屏是导入界面',
        '□ 拖入两张示例 Excel → 自动预览表头 → 选字段 → 对账 → 差异标红',
        '□ 导出差异明细 Excel，文件名带月份',
        '□ 空文件、格式错误、取消操作 → 友好中文提示，不闪退',
        '□ 路径含中文/空格 → 正常工作',
      ],
      communication: '一次推进一件事。只有真实阻塞问题再问我。公司名、字段名用占位符（如 {{公司名}}），最后集中列出。全程中文沟通。',
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('the finance team at an e-commerce company', 'en'),
      goal: 'Replace 1-2 days of monthly manual reconciliation with a tool that matches orders to bank statements and exports mismatches in a few clicks.',
      platform: `- Platform: Windows 10 / 11 desktop app
- Framework: Electron + React + TypeScript
- Spreadsheet parsing: SheetJS
- Deliver a Windows .exe installer`,
      features: `1. Home screen with two prominent buttons: "Import Orders Excel" and "Import Bank Excel". Drag-and-drop works.
2. After import, show headers and first 5 rows. Let the user pick Order ID / Amount / Transaction Time / Notes columns from dropdowns. Remember and pre-fill next time.
3. Example headers to support: orders may use Order ID / Paid Amount / Order Time / Store; bank statements may use Transaction ID / Income Amount / Transaction Time / Memo. Tolerate minor header wording differences.
4. "Reconcile" button triggers a progress bar. Rule: trim order IDs and use them as keys; difference <= 0.01 = match; duplicate order IDs are grouped and flagged; refunds / reversals are tagged separately, not treated as ordinary mismatches.
5. Results page has two panes. Left: matched count, mismatched count, match rate, total amount. Right: a mismatch table with order ID, order amount, bank amount, diff, reason (amounts differ / missing in bank / missing in orders / duplicate order / likely refund).
6. "Export mismatches to Excel" with default filename "diff-YYYY-MM.xlsx".`,
      style: `- Minimal desktop-tool style: light background, clear sections, radius 8, moderate information density.
- Primary button: muted dark. Secondary: light gray.
- Follows Windows light/dark setting.
- Use system fonts (Segoe UI / Microsoft YaHei). No web fonts.`,
      robustness: `- On invalid file formats, show a friendly message, not a raw stack trace.
- If field auto-detection fails, prompt for manual selection instead of crashing.
- Handle tens of thousands of rows; batch processing for > 100k with progress.
- Ship 3 anonymized sample sets: fully matched, amount differences, duplicate orders + refund statements, so new users can see it work immediately.`,
      deliveryPhases: [
        'Summary should include the main screen, acceptance, and key file responsibilities.',
        'After each module, run a focused verification and fix issues yourself first.',
        'Package as .exe; write a 500-word user guide; list known limitations.',
      ],
      acceptanceItems: [
        '☐ Double-click .exe launches; first screen is the import interface',
        '☐ Drop two sample Excel files → auto-preview headers → select fields → reconcile → mismatches highlighted red',
        '☐ Export diff-detail Excel with month in filename',
        '☐ Empty file, bad format, cancel → friendly message, no crash',
        '☐ Paths with Chinese/spaces → work correctly',
      ],
      communication: 'Advance one thing at a time. Ask only for true blockers. Use placeholders like {{COMPANY_NAME}} for personal details; summarize items to replace at the end.',
    }, 'en'),
  },
};
