import type { CaseBundle } from './types';

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
    zh: `你是一名擅长 Windows 桌面软件的资深工程师。请帮我做一个本地运行的 Windows 桌面小工具，目标用户是电商公司的财务人员，完全不懂代码。

【目标】
解决财务每月手动对账花 1-2 天的问题。财务只需点几下按钮，就能自动完成订单与银行流水的对账，并导出差异明细。

【平台与技术】
- 平台：Windows 10 / 11 桌面应用
- 框架：Electron + React + TypeScript
- 表格处理：SheetJS
- 不需要服务器，不需要联网，纯本地运行
- 交付时打包成 Windows .exe 安装包

【核心功能】
1. 首页两个醒目按钮：「导入订单 Excel」「导入银行流水 Excel」，支持拖拽。
2. 导入后自动显示表头和前 5 行预览，让用户从下拉框里选「订单号」「金额」「交易时间」「备注」字段。记住选择下次默认回填。
3. 示例字段兼容：订单表常见列「订单号 / 实付金额 / 下单时间 / 店铺」；银行流水常见列「交易单号 / 收入金额 / 交易时间 / 摘要」。列名可有细微差异。
4. 「开始对账」按钮显示进度条。匹配逻辑：订单号去空格后作为主键；金额差 <= 0.01 元视为匹配；重复订单号要合并提示；退款 / 冲正流水单独标记，不直接当异常。
5. 结果页两栏：左边展示匹配数、差异数、匹配率、总金额；右边表格列出每一条差异，字段包括订单号、订单金额、银行金额、差额、可能原因（金额不一致 / 银行流水缺失 / 订单缺失 / 重复订单 / 疑似退款）。
6. 「导出差异明细到 Excel」按钮，默认文件名 "差异明细-YYYY-MM.xlsx"。
7. 全部离线，数据不上传。

【界面风格】
- 简洁桌面工具风：浅色背景、清晰分区、圆角 8、信息密度适中。
- 主按钮用低饱和深色，次要用浅灰。
- 支持跟随 Windows 的深浅模式。
- 字体使用系统默认（微软雅黑 / Segoe UI），不用联网字体。

【稳健性】
- 文件格式不对时，弹出友好的中文提示，不要直接扔技术错误。
- 字段识别失败时引导手动选择，不要崩溃。
- 支持几万行数据；超过 10 万行分批处理并显示进度。
- 附带 3 个脱敏测试样例文件：完全匹配、金额差异、重复订单 + 退款流水，方便新用户一打开就能跑通。

【交付流程】
1. 先给 10 行以内方案摘要（含主界面安排和关键文件职责），然后直接实现、运行和验证。
2. 每完成一个模块就运行验证一次，发现问题先自行修复。
3. 最后：
   - 打包成 Windows .exe 安装包。
   - 写一份 500 字内给财务同事看的中文使用说明，包括"安装 → 第一次使用 → 常见问题"。
   - 列出已知限制和后续可优化方向。

【沟通】
- 一次推进一件事。不确定的地方直接问我。
- 公司名、字段名之类的个性化信息用占位符（如 {{公司名}}），最后集中列出让我替换。
- 全程中文沟通，代码注释用中文。

请先给 10 行以内方案摘要，然后直接实现、运行和验证。`,
    en: `You are a senior engineer experienced with Windows desktop apps. Build a local Windows desktop tool for the finance team at an e-commerce company. The user is a non-developer.

[Goal]
Replace 1-2 days of monthly manual reconciliation with a tool that matches orders to bank statements and exports mismatches in a few clicks.

[Platform & Stack]
- Platform: Windows 10 / 11 desktop app
- Framework: Electron + React + TypeScript
- Spreadsheet parsing: SheetJS
- No servers, no network required
- Deliver a Windows .exe installer

[Core Features]
1. Home screen with two prominent buttons: "Import Orders Excel" and "Import Bank Excel". Drag-and-drop works.
2. After import, show headers and first 5 rows. Let the user pick Order ID / Amount / Transaction Time / Notes columns from dropdowns. Remember and pre-fill next time.
3. Example headers to support: orders may use Order ID / Paid Amount / Order Time / Store; bank statements may use Transaction ID / Income Amount / Transaction Time / Memo. Tolerate minor header wording differences.
4. "Reconcile" button triggers a progress bar. Rule: trim order IDs and use them as keys; difference <= 0.01 = match; duplicate order IDs are grouped and flagged; refunds / reversals are tagged separately, not treated as ordinary mismatches.
5. Results page has two panes. Left: matched count, mismatched count, match rate, total amount. Right: a mismatch table with order ID, order amount, bank amount, diff, reason (amounts differ / missing in bank / missing in orders / duplicate order / likely refund).
6. "Export mismatches to Excel" with default filename "diff-YYYY-MM.xlsx".
7. Fully offline; no uploads.

[Visual Style]
- Minimal desktop-tool style: light background, clear sections, radius 8, moderate information density.
- Primary button: muted dark. Secondary: light gray.
- Follows Windows light/dark setting.
- Use system fonts (Segoe UI / Microsoft YaHei). No web fonts.

[Robustness]
- On invalid file formats, show a friendly message, not a raw stack trace.
- If field auto-detection fails, prompt for manual selection instead of crashing.
- Handle tens of thousands of rows; batch processing for > 100k with progress.
- Ship 3 anonymized sample sets: fully matched, amount differences, duplicate orders + refund statements, so new users can see it work immediately.

[Delivery]
1. Start with a plan summary under 10 lines, then implement, run, and verify.
2. After each module, run a focused verification and fix issues yourself first.
3. Final step:
   - Package as a Windows .exe installer.
   - Write a 500-word plain-language user guide covering Install -> First run -> Common issues.
   - List known limitations and future improvements.

[Working Style]
- Advance one thing at a time. Ask me if unsure.
- Use placeholders like {{COMPANY_NAME}} for personal details; summarize items to replace at the end.

Start with a brief plan summary, then implement, run, and verify.`,
  },
};
