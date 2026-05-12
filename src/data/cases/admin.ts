import type { CaseBundle } from './types';

export const adminConferenceRoom: CaseBundle = {
  slug: 'admin-conference-room-booking',
  department: 'admin',
  i18n: {
    zh: {
      title: '会议室与访客登记小助手',
      departmentLabel: '行政',
      summary:
        '把公司会议室预订、访客登记、快递签收三件小事放进同一个台账，行政不再被各种找。',
      painTitle: '这是什么问题',
      painBody:
        '行政小姐姐每天被问"这个会议室有人吗？""今天下午张总来找李总，几点到？""我那个快递有没有到？"。信息散在群里和 Excel 里，翻找一次就打断一次。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地小台账：三个标签页——会议室今日表、访客登记、快递签收。同事自己扫一眼就行，行政只需维护数据。支持打印今日日程，贴前台。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '左侧标签栏三项：会议室 / 访客 / 快递。',
        '会议室页：今日所有会议室时间轴视图，空闲时段用浅灰，占用用彩色块显示主题 + 组织人。',
        '访客页：今日到访人列表，字段含访客姓名、公司、被访人、预计到达、状态（未到 / 已到 / 已离）。',
        '快递页：今日签收清单，字段含收件人、快递公司、单号、签收状态。',
        '支持快速新建、支持导出今日全部为 Excel 存档。',
        '"打印今日日程"按钮，一键生成 A4 格式的前台贴纸。',
      ],
      keywords: ['行政', '会议室', '访客', '快递', '台账'],
    },
    en: {
      title: 'Office Reception Helper',
      departmentLabel: 'Admin',
      summary:
        'Room bookings, visitor sign-ins, and parcel tracking in one local tool. Reception stops getting interrupted.',
      painTitle: 'The problem',
      painBody:
        'Admin gets asked all day: "Is this room free?" "When is today\'s guest arriving?" "Has my package arrived?" Information scatters across chats and spreadsheets.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local ledger with three tabs — Rooms / Visitors / Parcels. Anyone can glance at it. Admin only maintains data. One-click print for the reception desk.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Left sidebar with three tabs: Rooms, Visitors, Parcels.',
        'Rooms: today\'s timeline view; free slots in light gray, booked slots colored with topic + organizer.',
        'Visitors: list for today — name, company, host, ETA, status (Pending / Arrived / Left).',
        'Parcels: today\'s deliveries — recipient, carrier, tracking id, status.',
        'Quick create; one-click export of today to Excel for archive.',
        '"Print today" generates an A4 sheet for the reception desk.',
      ],
      keywords: ['admin', 'reception', 'booking', 'visitors', 'parcels'],
    },
  },
  prompt: {
    zh: `你是一名擅长 Windows 桌面软件的资深工程师。请帮我做一个本地运行的 Windows 小工具，使用者是公司行政 / 前台同事，不懂代码。

【目标】
把"会议室预订 / 访客登记 / 快递签收"三件高频小事集中到一个台账，减少行政被打断的次数。

【平台与技术】
- Windows 10/11 桌面应用
- Electron + React + TypeScript
- 本地 SQLite
- 完全离线，打包成 Windows .exe 安装包

【结构】
左侧三个标签页：会议室 / 访客 / 快递。右侧主内容区按标签切换。

【会议室页】
1. 顶部日期选择（默认今天）+ 会议室筛选器。
2. 主区是横向时间轴（8:00 - 20:00），每间会议室一行。空闲格浅灰；占用格有色块，显示主题 + 组织人 + 时段。
3. 点空闲格弹出"新建预订"表单：主题、组织人、起止时间、人数、备注。
4. 支持拖拽改动时段；冲突时高亮提示。
5. 列表视图可切换，方便打印。

【访客页】
1. 今日到访表：访客姓名、来自公司、被访人、预计时间、实际到达时间、离开时间、备注。
2. "新增访客"表单；到访时点一下切成已到；离开时点一下切成已离。
3. 快速搜索（姓名 / 公司）。

【快递页】
1. 今日签收表：收件人、快递公司、单号、签收时间、领取状态。
2. 新增 / 快速勾选"已领取"。
3. 未领超过 3 天的快递高亮提示。

【通用功能】
- "打印今日日程"按钮：一键生成 A4 PDF（含三块今日汇总），方便前台贴墙。
- "导出今日到 Excel"按钮，存档用。
- 所有数据本地保存。

【界面风格】
- 简洁商务，柔和色块；色不刺眼。
- 时间轴密度适中，点击区域足够大。
- 深浅模式跟随系统。

【稳健性】
- 时间冲突友好提示而不是冷冰冰报错。
- 空状态引导："今日暂无 XX"。
- 数据库损坏自动恢复。

【交付】
1. 摘要需包含三个标签页安排。
2. 分三步：会议室 -> 访客 -> 快递（每一步都能独立跑）。
3. 打包 Windows .exe，附 500 字中文使用说明。
`,
    en: `You are a senior engineer experienced with Windows desktop apps. Build a local Windows tool for office admins / reception staff. Non-developer user.

[Goal]
Consolidate the three biggest daily interruptions — room booking, visitor sign-in, parcel handoff — into one lightweight ledger.

[Platform & Stack]
- Windows 10/11 desktop app
- Electron + React + TypeScript
- Local SQLite; offline; ship a Windows .exe installer

[Structure]
Left sidebar tabs: Rooms / Visitors / Parcels.

[Rooms tab]
1. Top: date picker (default today) + room filter.
2. Main: horizontal timeline 8:00-20:00; each room is a row; free slots light gray, booked slots colored with topic + organizer + range.
3. Clicking a free slot opens a New Booking form (topic, organizer, start, end, people count, notes).
4. Drag to edit a booking; conflicts highlighted.
5. Toggle to a list view for printing.

[Visitors tab]
1. Today's list: name, company, host, ETA, actual arrival, departure, notes.
2. Create form; one click sets Arrived / Left.
3. Quick search (name / company).

[Parcels tab]
1. Today: recipient, carrier, tracking id, signed-at, picked-up status.
2. Create; one-click mark picked-up.
3. Flag parcels uncollected after 3 days.

[Shared features]
- "Print today" creates a one-page A4 PDF summarizing all three.
- "Export today to Excel" for archive.
- Everything saved locally.

[Visual Style]
- Clean business; soft color blocks.
- Reasonable timeline density; large click targets.
- Follows system dark mode.

[Robustness]
- Friendly conflict warnings.
- Empty states.
- Auto-recover the DB.

[Delivery]
1. Summary should include all three tabs.
2. Phase 1: rooms. Phase 2: visitors. Phase 3: parcels.
3. Package .exe; 500-word user guide.
`,
  },
};
