export type Recipe = {
  id: string;
  icon: string;
  titleZh: string;
  titleEn: string;
  painZh: string;
  painEn: string;
  promptZh: string;
  promptEn: string;
};

export const recipes: Recipe[] = [
  {
    id: 'excel-to-report',
    icon: 'excel',
    titleZh: '把一张 Excel 变成一份漂亮日报',
    titleEn: 'Turn one Excel into a polished daily report',
    painZh: '每天把 Excel 数据贴到 PPT 里太累。想让同事收到一张美观图片或 PDF。',
    painEn: 'Pasting Excel into PPT every day is a grind. You want a clean image/PDF.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript
- 功能：把一张 Excel 文件（列：指标名、数值、环比）导入后，自动生成一张 1200×1800 的日报长图（和一份 A4 PDF），带标题 + 三张 KPI 卡 + 一条横条排名 + 页脚。
- 配色以白底 + 深灰字为主，强调排版层级。
- 同时打包成 Windows .exe 安装包和 macOS .dmg 安装包；附一份 500 字以内的中文使用说明。
先给项目结构和界面线框图，确认后再写代码。全程中文沟通。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript
- Feature: import one Excel (columns: metric, value, delta) and auto-render a 1200x1800 PNG daily report plus an A4 PDF — title, 3 KPI cards, one ranking bar chart, footer.
- Palette: white background, deep gray text; emphasize typographic hierarchy.
- Package as Windows .exe and macOS .dmg; include a 500-word plain-language user guide.
Start with project structure + wireframe. English throughout.`,
  },
  {
    id: 'pdf-to-excel',
    icon: 'pdf',
    titleZh: '把一堆 PDF 发票整理成 Excel',
    titleEn: 'Turn a pile of PDF invoices into an Excel',
    painZh: '每月收到几十张 PDF 发票，要一张一张抄到 Excel 里。',
    painEn: 'Dozens of PDF invoices land each month; typing them into Excel is painful.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + pdfjs 解析
- 功能：拖入一个包含多份 PDF 的文件夹；软件批量读取每份发票的"发票号 / 开票日期 / 销方 / 购方 / 金额 / 税额 / 价税合计"；输出一张 Excel 台账。
- 对识别不全的字段高亮为黄色，让用户手动补。
- 同时打包成 Windows .exe 和 macOS .dmg；附 500 字中文使用说明。
先给项目结构和界面线框图。中文沟通。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript with pdfjs parsing
- Feature: drop a folder of PDFs; extract invoice id / date / seller / buyer / amount / tax / total; write an Excel ledger.
- Highlight uncertain fields in yellow for manual fix.
- Package as Windows .exe and macOS .dmg; 500-word user guide.
Start with structure + wireframe. English throughout.`,
  },
  {
    id: 'folder-rename',
    icon: 'folder',
    titleZh: '按规则批量重命名一堆文件',
    titleEn: 'Bulk-rename files by a rule',
    painZh: '几百张照片、视频文件命名乱，想按日期 + 编号统一起来。',
    painEn: 'Hundreds of photos or videos with messy names; want a consistent "date + index" scheme.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript
- 功能：拖入一个文件夹；列出所有文件；允许用规则模板（如"YYYYMMDD-{序号3位}"）批量重命名，改名前预览对照，用户确认后再执行。
- 支持撤销：每次重命名保存一份"还原对照表"到本地，最近三次操作都可回退。
- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字使用说明。
先给结构 + 界面线框图。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript
- Feature: drop a folder; show the file list; rename in bulk by a template (e.g. "YYYYMMDD-{idx3}"). Preview before/after, confirm, then execute.
- Undo: save a reversal map locally so users can roll back the last three operations.
- Package as Windows .exe and macOS .dmg; 300-word user guide.
Start with structure + wireframe.`,
  },
  {
    id: 'quick-lookup',
    icon: 'search',
    titleZh: '做一个小小的"查数表"',
    titleEn: 'Build a tiny lookup table app',
    painZh: '公司有一份内部手册或产品参数表（Excel），同事总在群里问。',
    painEn: 'Your company has an internal handbook or SKU spec Excel, and teammates keep asking in the group chat.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript
- 功能：软件打开后自动读取一份 Excel（路径可配置）；主界面只有一个大搜索框 + 结果列表。模糊搜索任意列；结果卡片展示全部字段。
- 支持"一键复制某字段"，如复制产品编码到剪贴板。
- Excel 更新后重启软件会自动重载。
- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字说明。
先给结构 + 线框图。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript
- Feature: on launch, read one Excel (configurable path). Main UI: a big search box + result list. Fuzzy search any column. Cards show all fields.
- One-click copy a specific field (e.g. copy SKU to clipboard).
- Reload when Excel changes on disk, or on restart.
- Package as Windows .exe and macOS .dmg; 300-word guide.
Start with structure + wireframe.`,
  },
  {
    id: 'timer-tracker',
    icon: 'timer',
    titleZh: '记一下我每天花多少时间在哪件事上',
    titleEn: 'Track where your day goes',
    painZh: '不知道时间都去哪了。想自己记一下，周末看汇总。',
    painEn: 'Unsure where your day goes. Want to log it and review weekly.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地时间记录小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + 本地 SQLite
- 功能：
  1. 顶部输入"我在做什么"+ 开始按钮；点停止停下计时。
  2. 今日事项列表，显示每件事的时长。
  3. 周视图：本周累计时间按事项分组饼图或横条。
  4. 一键导出到 Excel。
- 窗口小（320x420），固定置顶可选。
- 同时打包成 Windows .exe 和 macOS .dmg；300 字说明。
先给结构 + 线框图。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform time-tracker:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + local SQLite
- Features:
  1. "What are you doing" input + Start button; Stop to end.
  2. Today's entries with durations.
  3. Week view: group totals as a bar or pie.
  4. One-click Excel export.
- Small window (320x420); always-on-top option.
- Package as Windows .exe and macOS .dmg; 300-word guide.
Start with structure + wireframe.`,
  },
  {
    id: 'mini-kanban',
    icon: 'kanban',
    titleZh: '给自己做一个极简 Todo 看板',
    titleEn: 'A dead-simple personal Kanban',
    painZh: '网上那些待办 App 都太复杂。想一个只给自己用的、打开就顺手的。',
    painEn: 'Most todo apps feel heavy. You want something instant and personal.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地 Todo 看板：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + 本地 SQLite
- 三列：待办 / 进行中 / 完成。卡片拖拽切列。回车新增。双击改标题。
- 软件启动默认打开最近一次工作视图。
- 深浅模式跟随系统。
- 同时打包成 Windows .exe 和 macOS .dmg；200 字说明。
先给结构 + 线框图。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a personal cross-platform Kanban:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + local SQLite
- Three columns: Todo / Doing / Done. Drag cards. Enter to add. Double-click to rename.
- Opens in the last-used view.
- Follows system dark mode.
- Package as Windows .exe and macOS .dmg; 200-word guide.
Start with structure + wireframe.`,
  },
];
