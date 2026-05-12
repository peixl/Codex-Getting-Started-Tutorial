import type { CaseBundle } from './types';

export const logisticsTracker: CaseBundle = {
  slug: 'logistics-shipment-inspector',
  department: 'logistics',
  i18n: {
    zh: {
      title: '异常件排查小工具',
      departmentLabel: '物流',
      summary:
        '导入每日快递状态表，自动挑出"卡 48 小时"、"派送 3 次未签收"等异常件，交给客服跟进，投诉少一半。',
      painTitle: '这是什么问题',
      painBody:
        '物流同事每天要看几千条订单的快递状态。卡在某节点两天、派送三次未签、退回转运的单子，如果没人及时发现，轻则客户投诉，重则赔钱。肉眼扫 Excel 跟不过来。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个桌面小工具：快递导出表拖进去，按四条异常规则自动筛选。列出问题单，一键导出给客服跟进。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '首页三块：导入快递表 / 异常列表 / 规则设置。',
        '导入后显示总单数、异常单数、正常单数。',
        '四条内置规则可开关可调参：卡 >= 48 小时、派送次数 >= 3、退回、关键词匹配。',
        '异常列表按严重度排序；电话脱敏显示（138****1234）。',
        '一键导出异常清单到 Excel，发给客服。',
        '支持今日 / 近 3 日 / 近 7 日时间粒度。',
      ],
      keywords: ['物流', '快递', '异常件', '仓储', '跟单'],
    },
    en: {
      title: 'Shipment Exception Inspector',
      departmentLabel: 'Logistics',
      summary:
        'Load the daily shipment export. Four rules flag stuck, failed, returned parcels. Hand the list to CS. Complaints drop by half.',
      painTitle: 'The problem',
      painBody:
        'Logistics teams watch thousands of parcels daily. Stuck 48+ hours, failed delivery three times, returned to sender — if nobody catches them, complaints and refunds pile up.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A desktop tool. Drop in the daily export. Four rules flag exceptions. One click exports a severity-ranked list for customer service.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Home with three panes: Import / Exception list / Rule settings.',
        'After import: totals of all / exceptions / normal.',
        'Four built-in toggleable rules: stuck >= 48h, attempts >= 3, returned, keyword match.',
        'Exception list sorted by severity; phone masked (138****1234).',
        'One-click Excel export for CS.',
        'Time windows: today / 3 days / 7 days.',
      ],
      keywords: ['logistics', 'shipping', 'exceptions', 'e-commerce ops'],
    },
  },
  prompt: {
    zh: `你是一名擅长 Windows 桌面软件的资深工程师。请帮我做一个本地运行的 Windows 小工具，使用者是电商公司物流 / 客服同事，不懂代码。

【目标】
把每天几千条订单中的异常件挑出来，交给客服跟进，减少投诉和赔付。

【平台与技术】
- Windows 10/11 桌面应用
- Electron + React + TypeScript
- SheetJS 处理 Excel / CSV
- 本地 SQLite 保留最近 30 天导入历史
- 完全离线，打包 Windows .exe 安装包

【字段映射】
导入时支持列名映射（中英兼容）：订单号、快递公司、快递单号、收件人姓名、收件人电话、当前状态、最近更新时间、派送次数、异常标签。首次映射后记住。

【核心功能】
1. 首页三入口：导入 / 异常列表 / 规则设置。
2. 导入：支持多文件，一次性导入，自动识别编码（UTF-8 / GBK）。显示基础统计。
3. 异常规则（可开关 + 调参）：
   - A：最近更新 >= N 小时（默认 48）且状态不是已签收 / 已退回。
   - B：派送次数 >= N（默认 3）且未签收。
   - C：状态含"退回 / 退件 / 拒收 / 异常"关键词。
   - D：用户自定义关键词。
4. 异常列表：按严重度排序。字段：订单号、快递公司、电话（脱敏）、原因、卡住小时数、推荐动作。
5. 时间粒度：今日 / 近 3 日 / 近 7 日，支持历史对比。
6. 导出异常清单到 Excel，文件名 "异常件-YYYY-MM-DD.xlsx"。

【隐私】
- 全离线。
- 电话默认脱敏；"查看完整号码"需点击按钮，动作计入轻量日志。
- 关闭软件前询问是否清理当日数据。

【界面风格】
- 业务型：表格清晰、柔和分隔线。
- 严重度红 / 黄 / 蓝三级。
- 深浅模式跟随系统；中英切换。

【稳健性】
- 字段映射失败时手动引导。
- 大文件（> 5 万行）分批处理显示进度。
- 导入出错保留已解析部分。

【交付】
1. 摘要需包含列表、异常、规则页安排。
2. 分三步：导入 + 识别 + 列表 -> 规则自定义 + 时间粒度 -> 导出 + 历史对比。
3. 打包 .exe，500 字中文使用说明。
`,
    en: `You are a senior engineer experienced with Windows desktop apps. Build a local Windows tool for an e-commerce logistics / customer service team. Non-developer user.

[Goal]
Surface exception shipments in minutes, not hours. Hand them to customer service before customers complain.

[Platform & Stack]
- Windows 10/11 desktop app
- Electron + React + TypeScript
- SheetJS for Excel/CSV
- Local SQLite rolling 30-day history
- Offline; ship Windows .exe installer

[Column Mapping]
Handle common headers (Chinese + English): order id, carrier, tracking id, recipient name, recipient phone, current status, last update time, delivery attempts, exception tag. Remember mappings.

[Core Features]
1. Home: Import / Exception list / Rule settings.
2. Import: multi-file drop; auto-detect encoding (UTF-8/GBK). Show totals.
3. Rules (toggleable + tunable):
   - A: last update >= N hours (default 48) AND status not delivered/returned.
   - B: delivery attempts >= N (default 3) AND not delivered.
   - C: status contains return/reject/exception keywords.
   - D: user-defined keywords.
4. Exception list sorted by severity; fields: order id, carrier, masked phone, reason, hours stuck, recommended action.
5. Time windows: today / 3 days / 7 days with historical compare.
6. Export to Excel as "exceptions-YYYY-MM-DD.xlsx".

[Privacy]
- Fully offline.
- Phone masked by default; "reveal" behind a button, lightly logged.
- On quit, ask whether to clear today.

[Visual Style]
- Dashboard clarity with soft dividers.
- Severity red/yellow/blue.
- Follows system dark mode; bilingual.

[Robustness]
- Manual guidance on mapping failures.
- Batch processing for > 50k rows with progress.
- Preserve parsed data on error.

[Delivery]
1. Summary should include the list / exceptions / rules screens.
2. Phase 1: import + detection + list. Phase 2: rule customization + time windows. Phase 3: export + history compare.
3. Package .exe; 500-word user guide.
`,
  },
};
