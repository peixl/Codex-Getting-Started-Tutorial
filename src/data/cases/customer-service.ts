import type { CaseBundle } from './types';

export const customerServiceReplyHelper: CaseBundle = {
  slug: 'customer-service-reply-helper',
  department: 'customer-service',
  i18n: {
    zh: {
      title: '客服话术速查助手',
      departmentLabel: '客服',
      summary:
        '常用回复整理成库，输入关键词秒搜，一键复制贴回聊天窗口。新人上手速度翻倍。',
      painTitle: '这是什么问题',
      painBody:
        '电商客服每天答重复问题：快递到哪了、怎么退货、尺码怎么选、发票怎么开。话术散在 Word、Excel、群文件里，找一次要半分钟，高峰期根本跟不过来。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个桌面小工具：按分类 + 关键词组织所有话术。快捷键呼出搜索框，秒级出结果，一键复制。含变量（客户姓名、订单号）时，复制前弹窗让客服填入自动替换。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        'Windows 桌面软件，常驻任务栏；Ctrl+Shift+R 呼出主窗口。',
        '主界面极简：搜索框 + 结果列表。',
        '搜索框下方分类标签：物流 / 退换货 / 尺码 / 发票 / 售后。',
        '每条话术右侧有圆形「复制」按钮，复制成功变绿。',
        '含变量的话术，复制前弹小窗填值，自动替换。',
        '支持 Excel 批量导入与导出，方便管理员维护。',
      ],
      keywords: ['客服', '话术', '快捷键', '电商售后'],
    },
    en: {
      title: 'Customer Service Reply Helper',
      departmentLabel: 'Customer Service',
      summary:
        'Reply templates organized and keyword-searchable. One keystroke, one click, paste back into the chat. Newcomers ramp up in days.',
      painTitle: 'The problem',
      painBody:
        'E-commerce support answers the same questions hundreds of times a day: tracking, returns, sizing, invoices. Scripts are scattered across documents. Finding one takes 30 seconds. During peak hours, it collapses.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A desktop helper. Templates organized by category + keyword. Global shortcut summons the window; top matches appear instantly. One-click copy; variable substitution before copy.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Windows app pinned to taskbar; Ctrl+Shift+R to summon.',
        'Minimal UI: search box + results.',
        'Category chips below: Shipping / Returns / Sizing / Invoices / Post-purchase.',
        'Each template card has a round Copy button; turns green on success.',
        'Templates with {variables} prompt for values before copy, then substitute.',
        'Excel bulk import/export for admins.',
      ],
      keywords: ['customer support', 'reply templates', 'shortcuts'],
    },
  },
  prompt: {
    zh: `你是一名擅长 Windows 桌面软件的资深工程师。请帮我做一个本地运行的 Windows 小工具，使用者是电商公司客服，不懂代码。

【目标】
把分散的几百条客服话术集中成一个小工具，搜索后一键复制，提升回复速度。

【平台与技术】
- Windows 10/11 桌面应用
- Electron + React + TypeScript
- 本地 SQLite 存话术 + 本地配置存偏好
- 全局快捷键 Ctrl+Shift+R 唤起
- 打包 Windows .exe 安装包，完全离线

【核心功能】
1. 窗口尺寸小巧（约 600x500），无需最大化。仅搜索框 + 结果列表两部分。
2. 搜索模糊匹配：标题 / 正文 / 关键词标签任一命中。按相关度排序。输入 300ms 后触发。
3. 分类标签：全部 / 物流 / 退换货 / 尺码 / 发票 / 售后 / 自定义。
4. 结果卡片：分类小标签 + 标题 + 正文预览（2 行，可展开）；右侧圆形「复制」按钮。
5. 变量支持：\`{客户姓名}\` \`{订单号}\` \`{快递单号}\`。复制前弹出填值小窗，确认后复制替换后文本。
6. Excel 批量导入，表头：分类 / 标题 / 正文 / 关键词（逗号分隔）。
7. Excel 导出全部话术。
8. 全局快捷键 Ctrl+Shift+R 显示 / 隐藏。窗口失焦自动隐藏。
9. 记录每条话术使用次数；管理员可以按使用频率降序查看。

【界面风格】
- 简洁清爽：浅色背景、白色卡片、圆角 16。
- 复制按钮成功变绿；其他按钮柔和灰蓝。
- 深浅模式跟随系统。
- 中英双语切换（设置里）。

【稳健性】
- Excel 表头错给高亮提示。
- 正文含 HTML 或特殊字符时复制为纯文本。
- 数据库损坏自动恢复。

【交付】
1. 结构 + 搜索页 + 变量填值弹窗线框图。
2. 分三步：搜索 + 复制 + 快捷键 -> 变量替换 -> 导入 / 导出 + 使用频率。
3. 打包 .exe，300 字内中文使用说明。

中文沟通。从结构和线框图开始。`,
    en: `You are a senior engineer experienced with Windows desktop apps. Build a local Windows tool for customer service agents. Non-developer user.

[Goal]
Consolidate hundreds of reply templates into one searchable desktop helper.

[Platform & Stack]
- Windows 10/11 desktop app
- Electron + React + TypeScript
- Local SQLite + config file
- Global shortcut: Ctrl+Shift+R
- Windows .exe installer; fully offline

[Core Features]
1. Compact window (~600x500). Search box + results.
2. Fuzzy search across title, body, keywords. Relevance ranking. 300ms debounce.
3. Category chips: All / Shipping / Returns / Sizing / Invoices / Post-purchase / Custom.
4. Result card: category chip + title + 2-line preview (expandable) + round Copy button.
5. Variables: {customer}, {order_id}, {tracking}. Popup to fill before copy.
6. Excel import with headers Category / Title / Body / Keywords (comma).
7. Excel export all.
8. Global shortcut toggles visibility; auto-hide on blur.
9. Per-template usage count; admin sort by frequency.

[Visual Style]
- Minimal: light background, white cards, radius 16.
- Copy button greens on success; others soft gray-blue.
- Follows system dark mode; bilingual toggle.

[Robustness]
- Highlight bad Excel headers.
- Plain-text copy for templates with HTML/special chars.
- Auto-recover from DB corruption.

[Delivery]
1. Structure + search + variable popup wireframes.
2. Phase 1: search + copy + shortcut. Phase 2: variables. Phase 3: import/export + stats.
3. Package .exe; 300-word user guide.

Start with structure and wireframe.`,
  },
};
