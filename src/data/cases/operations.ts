import type { CaseBundle } from './types';

export const operationsCampaign: CaseBundle = {
  slug: 'operations-campaign-tracker',
  department: 'operations',
  i18n: {
    zh: {
      title: '大促任务看板',
      departmentLabel: '运营',
      summary:
        '把双 11、618 这些大促里几十件事放进一个本地看板，按阶段看进度，谁卡在哪一步一目了然。',
      painTitle: '这是什么问题',
      painBody:
        '每次大促要同时推进几十件事：素材、优惠券、商详、活动页、推文、客服话术……信息散在群里和文档里，没人说得清每一件到底到哪一步了。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地的任务看板：每次大促一组卡片，分四列——预热、爆发、返场、复盘。每张卡片有负责人、截止日、状态。改状态自动记录时间，复盘很方便。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '首页是大促列表，每场大促显示总进度条。',
        '点进去是四列看板，卡片可以拖拽换列。',
        '每张卡片：任务名、负责人、截止日、状态。',
        '临近截止 3 天内的卡片右上角黄色小点；已延期的红色。',
        '支持从 Excel 批量导入，支持导出整场大促的任务明细。',
      ],
      keywords: ['大促', '看板', '电商运营', '协作', '任务'],
    },
    en: {
      title: 'Campaign Task Board',
      departmentLabel: 'Operations',
      summary:
        'A local Kanban board for big sales. Columns for warm-up, peak, post-sale, retro. Drag to update. Knows who is stuck where.',
      painTitle: 'The problem',
      painBody:
        'Every big sale is dozens of parallel tasks — creatives, coupons, listings, campaign pages, social posts, support scripts. Status scatters across chats and docs. Nobody knows who is stuck where.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local task board. One campaign, one board with four stage columns. Cards carry owner, due date, status. Status changes auto-timestamp. Retros become easy.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Home lists campaigns with an overall progress bar each.',
        'Click into a board with four columns; drag cards across.',
        'Cards show task, owner, due, status.',
        'Due within 3 days: yellow dot; overdue: red.',
        'Bulk-import from Excel; export full campaign details.',
      ],
      keywords: ['campaign', 'kanban', 'e-commerce ops', 'collaboration'],
    },
  },
  prompt: {
    zh: `你是一名擅长 Windows 桌面软件的资深工程师。请帮我做一个本地运行的 Windows 小工具，使用者是电商公司运营部的同事，不懂代码。

【目标】
解决大促期间几十件任务同时推进导致状态混乱、责任不清、复盘困难的问题。

【平台与技术】
- Windows 10/11 桌面应用
- Electron + React + TypeScript
- 本地 SQLite
- 离线运行，打包 Windows .exe 安装包

【核心功能】
1. 首页：大促卡片列表（双 11、618、年货节…），每张卡显示起止日、总进度条（已完成 / 总任务），"新建大促"按钮。
2. 大促详情页：四列看板——预热、爆发、返场、复盘。每列可装多张任务卡。
3. 任务卡片：任务名、负责人（文本）、截止日、状态（待办 / 进行中 / 已完成 / 延期）、备注。
4. 拖拽切换列或点卡片从下拉框切状态。每次状态变化记录时间戳，点开卡片可查看历史。
5. Excel 批量导入，表头：阶段 / 任务名 / 负责人 / 截止日 / 状态。
6. Excel 导出：当前大促所有任务 + 状态历史。
7. 临近截止（3 天内）卡片角标黄色；已延期红色。

【界面风格】
- 清新简洁：浅色背景，白色卡片，圆角 16。
- 四列列头用柔和不同色（蓝 / 橙红 / 绿 / 紫），饱和度低。
- 拖拽时卡片轻微放大、阴影加深。
- 深浅模式跟随系统。

【稳健性】
- 所有操作自动本地保存。
- 每天自动备份到 backup 文件夹，保留 7 天。
- Excel 字段错时友好提示。

【交付】
1. 先给 10 行以内方案摘要（含首页 / 看板 / 导入页界面安排），然后直接实现、运行和验证。
2. 分三步：新建 + 拖拽 -> Excel 导入导出 -> 状态历史 + 到期染色。
3. 打包 .exe，附 500 字中文使用说明。

中文沟通。先给简短方案摘要，然后直接实现、运行和验证。`,
    en: `You are a senior engineer experienced with Windows desktop apps. Build a local Windows tool for an ops team at an e-commerce company. Non-developer user.

[Goal]
Tame big-sale chaos: a single board with clear status, owners, and history.

[Platform & Stack]
- Windows 10/11 desktop app
- Electron + React + TypeScript
- Local SQLite; offline; ship Windows .exe

[Core Features]
1. Home: campaign cards with start/end + overall progress bar. "New campaign" button.
2. Detail: Kanban with four columns — Warm-up, Peak, Post-sale, Retro.
3. Task card: title, owner (free text), due date, status (Todo / In progress / Done / Delayed), notes.
4. Drag to change column or use dropdown; status changes auto-timestamp; open card to see history.
5. Excel import: Stage / Task / Owner / Due / Status.
6. Excel export: current campaign with history.
7. Due-within-3-days: yellow corner dot; overdue: red.

[Visual Style]
- Fresh + minimal: light background, white cards, radius 16.
- Column headers in muted distinct colors (blue / coral / green / violet).
- Subtle drag animation.
- Follows system dark mode.

[Robustness]
- Autosave; backup folder with 7-day rolling copies.
- Friendly warnings on bad Excel columns.

[Delivery]
1. Start with a plan summary under 10 lines, then implement, run, and verify. Include home / board / import screens in the plan.
2. Phase 1: create + drag. Phase 2: Excel import/export. Phase 3: history + due coloring.
3. Package .exe; 500-word user guide.

Start with a brief plan summary, then implement, run, and verify.`,
  },
};
