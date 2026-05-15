import { withDesktopQualityBar, type PromptQualityLang } from '@/lib/promptQuality';
import { composeRecipePrompt } from '@/lib/promptModules';

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

export function getRecipePrompt(recipe: Recipe, locale: PromptQualityLang): string {
  return withDesktopQualityBar(locale === 'zh' ? recipe.promptZh : recipe.promptEn, locale);
}

export const recipes: Recipe[] = [
  {
    id: 'excel-to-report',
    icon: 'excel',
    titleZh: '把一张 Excel 变成一份漂亮日报',
    titleEn: 'Turn one Excel into a polished daily report',
    painZh: 'Excel 数据每天手动贴 PPT，太慢。想一键出图片或 PDF。',
    painEn: 'Manual Excel-to-PPT reporting is slow. Generate an image/PDF instead.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: '每天手动把 Excel 数据贴 PPT 太慢，想一键生成可发群的日报图片/PDF。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript',
      features: '把一张 Excel 文件（列：指标名、数值、环比）导入后，自动生成一张 1200×1800 的日报长图（和一份 A4 PDF），带标题 + 三张 KPI 卡 + 一条横条排名 + 页脚。',
      extra: '- 配色以白底 + 深灰字为主，强调排版层级。',
      acceptance: '拖入 Excel → 预览日报 → 一键导出 PNG/PDF；空数据、格式错误 → 友好提示，不闪退。',
      packaging: '- 同时打包成 Windows .exe 安装包和 macOS .dmg 安装包；附一份 500 字以内的中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'manual Excel-to-PPT daily reporting is too slow; generate a shareable image/PDF in one click.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript',
      features: 'import one Excel (columns: metric, value, delta) and auto-render a 1200x1800 PNG daily report plus an A4 PDF — title, 3 KPI cards, one ranking bar chart, footer.',
      extra: '- Palette: white background, deep gray text; emphasize typographic hierarchy.',
      acceptance: 'drop Excel → preview report → one-click export PNG/PDF; empty data, bad format → friendly message, no crash.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a clear 500-word user guide.',
    }, 'en'),
  },
  {
    id: 'pdf-to-excel',
    icon: 'pdf',
    titleZh: '把一堆 PDF 发票整理成 Excel',
    titleEn: 'Turn a pile of PDF invoices into an Excel',
    painZh: '几十张 PDF 发票，要手动抄进 Excel。',
    painEn: 'Dozens of PDF invoices need to become one Excel ledger.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: '几十张 PDF 发票手动抄进 Excel 太慢，想批量提取自动整理成台账。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + pdfjs 解析',
      features: '拖入一个包含多份 PDF 的文件夹；软件批量读取每份发票的"发票号 / 开票日期 / 销方 / 购方 / 金额 / 税额 / 价税合计"；输出一张 Excel 台账。',
      extra: '- 对识别不全的字段高亮为黄色，让用户手动补。',
      acceptance: '拖入 PDF 文件夹 → 自动提取 → 生成 Excel 台账；识别不全字段黄色高亮；空文件夹、非 PDF → 友好提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 500 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'manually copying dozens of PDF invoices into Excel is too slow; batch-extract and organize into a ledger.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript with pdfjs parsing',
      features: 'drop a folder of PDFs; extract invoice id / date / seller / buyer / amount / tax / total; write an Excel ledger.',
      extra: '- Highlight uncertain fields in yellow for manual fix.',
      acceptance: 'drop PDF folder → auto-extract → generate Excel; uncertain fields yellow; empty folder, non-PDF → friendly message.',
      packaging: '- Package as Windows .exe and macOS .dmg; 500-word user guide.',
    }, 'en'),
  },
  {
    id: 'folder-rename',
    icon: 'folder',
    titleZh: '按规则批量重命名一堆文件',
    titleEn: 'Bulk-rename files by a rule',
    painZh: '照片、视频命名太乱，想按日期 + 编号统一。',
    painEn: 'Messy photo/video names. Rename by date + index.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: '照片、视频命名太乱，想按日期+编号规则批量统一命名。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript',
      features: '拖入一个文件夹；列出所有文件；允许用规则模板（如"YYYYMMDD-{序号3位}"）批量重命名，改名前预览对照，用户确认后再执行。',
      extra: '- 支持撤销：每次重命名保存一份"还原对照表"到本地，最近三次操作都可回退。',
      acceptance: '拖入文件夹 → 文件列表显示 → 设置规则 → 预览对照 → 确认执行；撤销可回退最近三次。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'messy photo/video names need bulk renaming by date + index rules.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript',
      features: 'drop a folder; show the file list; rename in bulk by a template (e.g. "YYYYMMDD-{idx3}"). Preview before/after, confirm, then execute.',
      extra: '- Undo: save a reversal map locally so users can roll back the last three operations.',
      acceptance: 'drop folder → file list → set rule → preview → confirm; undo rolls back last 3 operations.',
      packaging: '- Package as Windows .exe and macOS .dmg; 300-word user guide.',
    }, 'en'),
  },
  {
    id: 'quick-lookup',
    icon: 'search',
    titleZh: '做一个小小的"查数表"',
    titleEn: 'Build a tiny lookup table app',
    painZh: '内部手册在 Excel 里，同事总在群里问。',
    painEn: 'Internal handbook in Excel; teammates keep asking in chat.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: '内部手册/商品清单在 Excel 里，同事总在群里问，想做个搜索工具让他们自己查。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript',
      features: `软件打开后自动读取一份 Excel（路径可配置）；主界面只有一个大搜索框 + 结果列表。模糊搜索任意列；结果卡片展示全部字段。
- 支持"一键复制某字段"，如复制产品编码到剪贴板。
- Excel 更新后重启软件会自动重载。`,
      acceptance: '打开软件 → 自动加载 Excel → 输入关键词 → 搜索出结果 → 一键复制字段；Excel 更新后重启自动重载。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'internal handbook/product list is in Excel; teammates keep asking in chat. Build a search tool so they can look it up themselves.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript',
      features: `on launch, read one Excel (configurable path). Main UI: a big search box + result list. Fuzzy search any column. Cards show all fields.
- One-click copy a specific field (e.g. copy SKU to clipboard).
- Reload when Excel changes on disk, or on restart.`,
      acceptance: 'launch → auto-load Excel → type keyword → results appear → one-click copy; Excel update → restart → auto-reload.',
      packaging: '- Package as Windows .exe and macOS .dmg; 300-word guide.',
    }, 'en'),
  },
  {
    id: 'timer-tracker',
    icon: 'timer',
    titleZh: '记一下我每天花多少时间在哪件事上',
    titleEn: 'Track where your day goes',
    painZh: '不知道时间都去哪了。想自己记一下，周末看汇总。',
    painEn: 'Unsure where your day goes. Want to log it and review weekly.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地时间记录小工具：',
      goal: '不知道时间都去哪了，想记录每天花多少时间在哪件事上，周末看汇总。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + 本地 SQLite',
      features: `1. 顶部输入"我在做什么"+ 开始按钮；点停止停下计时。
  2. 今日事项列表，显示每件事的时长。
  3. 周视图：本周累计时间按事项分组饼图或横条。
  4. 一键导出到 Excel。`,
      extra: '- 窗口小（320x420），固定置顶可选。',
      acceptance: '输入事项 → 开始计时 → 停止 → 今日列表显示时长；周视图显示饼图/横条；导出 Excel。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；300 字说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform time-tracker:',
      goal: 'unsure where your day goes; want to log time per task and review weekly.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + local SQLite',
      features: `1. "What are you doing" input + Start button; Stop to end.
  2. Today's entries with durations.
  3. Week view: group totals as a bar or pie.
  4. One-click Excel export.`,
      extra: '- Small window (320x420); always-on-top option.',
      acceptance: 'enter task → start timer → stop → today\'s list shows duration; week view shows bar/pie; export Excel.',
      packaging: '- Package as Windows .exe and macOS .dmg; 300-word guide.',
    }, 'en'),
  },
  {
    id: 'mini-kanban',
    icon: 'kanban',
    titleZh: '给自己做一个极简 Todo 看板',
    titleEn: 'A dead-simple personal Kanban',
    painZh: '待办 App 太复杂。想要一个打开就能用的。',
    painEn: 'Todo apps feel heavy. Build one that opens fast.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地 Todo 看板：',
      goal: '待办 App 太复杂，想要一个打开就能用的极简看板。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + 本地 SQLite',
      features: '三列：待办 / 进行中 / 完成。卡片拖拽切列。回车新增。双击改标题。',
      extra: `- 软件启动默认打开最近一次工作视图。
- 深浅模式跟随系统。`,
      acceptance: '打开软件 → 三列看板显示 → 回车新增卡片 → 拖拽切列 → 双击改标题；重启后数据还在。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；200 字说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a personal cross-platform Kanban:',
      goal: 'todo apps feel heavy; build one that opens fast and just works.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + local SQLite',
      features: 'Three columns: Todo / Doing / Done. Drag cards. Enter to add. Double-click to rename.',
      extra: `- Opens in the last-used view.
- Follows system dark mode.`,
      acceptance: 'launch → three columns → Enter adds card → drag to move → double-click to rename; data persists on restart.',
      packaging: '- Package as Windows .exe and macOS .dmg; 200-word guide.',
    }, 'en'),
  },
  {
    id: 'pdf-merge-split',
    icon: 'pdf',
    titleZh: '一键合并 / 拆分一堆 PDF',
    titleEn: 'Merge & split a pile of PDFs',
    painZh: 'PDF 要合并、拆分、归档，手动太麻烦。',
    painEn: 'Merge, split, and archive PDFs without manual steps.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: 'PDF 要合并、拆分、归档，手动太麻烦，想一键搞定。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + pdf-lib',
      features: `1. 合并模式：拖入若干 PDF，可上下拖动调顺序，输入输出文件名后一键合并。
  2. 拆分模式：拖入一份 PDF，输入页码区间（如"1-10, 11-25, 26-end"），按区间导出为多份 PDF。`,
      extra: '- 全程不联网，文件只在本地处理；处理完后弹一个"打开输出文件夹"的按钮。',
      acceptance: '拖入 PDF → 合并或拆分 → 输出文件正确；空文件、格式错误 → 友好提示，不闪退。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'merge, split, and archive PDFs without manual steps.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + pdf-lib',
      features: `1. Merge: drop several PDFs, drag to reorder, type output filename, click merge.
  2. Split: drop one PDF, type page ranges (e.g. "1-10, 11-25, 26-end"), export each range as a separate PDF.`,
      extra: '- Fully offline; files stay local. After completion, show an "Open output folder" button.',
      acceptance: 'drop PDFs → merge or split → output correct; empty file, bad format → friendly message, no crash.',
      packaging: '- Package as Windows .exe and macOS .dmg; 300-word user guide.',
    }, 'en'),
  },
  {
    id: 'screenshot-watermark',
    icon: 'image',
    titleZh: '给一批截图统一加水印 / 改尺寸',
    titleEn: 'Watermark and resize a batch of screenshots',
    painZh: '截图要加水印、压缩、统一尺寸，手动太慢。',
    painEn: 'Watermark, compress, and resize screenshots in one pass.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: '截图要加水印、压缩、统一尺寸，手动太慢，想批量处理。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + sharp',
      features: `1. 拖入一个文件夹（含 .png .jpg .webp）。
  2. 设置：水印图片或文字（位置可选右下/左下/居中）、最长边像素（如 1600）、输出格式（jpg/png/webp）、jpg 压缩质量。
  3. 一键批量处理，输出到"原目录_processed"。处理过程显示进度。`,
      acceptance: '拖入文件夹 → 设置水印/尺寸 → 批量处理 → 输出正确；空文件夹、非图片 → 友好提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'watermark, compress, and resize screenshots in one batch pass.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + sharp',
      features: `1. Drop a folder containing .png .jpg .webp.
  2. Settings: watermark image or text (corner choice), longest-edge pixels (e.g. 1600), output format (jpg/png/webp), jpg quality.
  3. One-click batch with progress; output to "<originalFolder>_processed".`,
      acceptance: 'drop folder → set watermark/size → batch process → output correct; empty folder, non-image → friendly message.',
      packaging: '- Package as Windows .exe and macOS .dmg; 300-word user guide.',
    }, 'en'),
  },
  {
    id: 'csv-cleaner',
    icon: 'excel',
    titleZh: '把脏脏的 CSV / Excel 一键洗干净',
    titleEn: 'One-click clean a messy CSV / Excel',
    painZh: '系统导出的表有空行、重复、乱格式，每次都要清洗。',
    painEn: 'System exports are messy. Clean blanks, duplicates, dates, and spaces.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: '系统导出的表有空行、重复、乱格式，每次都要清洗，想一键搞定。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + xlsx + papaparse',
      features: `1. 拖入一份 CSV 或 Excel；自动展示前 20 行预览。
  2. 提供"清洗动作清单"，复选打勾即可：去除空行、去除完全重复行、去除前后空格、统一日期格式（YYYY-MM-DD）、全角转半角、按某列去重保留首条。
  3. 右侧实时预览清洗后的结果；满意后导出为新文件，原文件不动。`,
      acceptance: '拖入文件 → 选清洗动作 → 预览 → 导出新文件；空文件、格式错误 → 友好提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明，含"如何向 Codex 描述新清洗规则"的小段。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'system exports are messy; clean blanks, duplicates, dates, and spaces in one click.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + xlsx + papaparse',
      features: `1. Drop a CSV or Excel; preview the first 20 rows.
  2. Show a checklist of cleaning actions: remove blank rows, drop exact duplicates, trim whitespace, normalize dates (YYYY-MM-DD), convert full-width to half-width, dedupe by chosen column keeping the first.
  3. Live-preview the cleaned result on the right; export to a new file when ready, leaving the original untouched.`,
      acceptance: 'drop file → pick actions → preview → export new file; empty file, bad format → friendly message.',
      packaging: '- Package as Windows .exe and macOS .dmg; 400-word user guide including a short section on "how to describe new cleaning rules to Codex".',
    }, 'en'),
  },
  {
    id: 'audio-to-text',
    icon: 'mic',
    titleZh: '会议录音一键转文字 + 提炼要点',
    titleEn: 'Turn meeting audio into text + key points',
    painZh: '会议录音整理太慢，还希望全程本地处理。',
    painEn: 'Summaries take too long. Keep audio processing local.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: '会议录音整理太慢，想一键转文字并提炼要点，全程本地处理。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + 本地 whisper.cpp（small 中文模型，首次使用自动下载）',
      features: `1. 拖入 mp3/m4a/wav；显示音频时长。
  2. 一键转写为带时间戳的中文文本，旁边一栏支持手动微调。
  3. 转写完成后，再点"提炼要点"按钮，按"决议 / 待办 / 风险"三段输出 Markdown 摘要（提示词内置，可在设置里改）。
  4. 一键导出为 .docx 和 .md。`,
      extra: '- 全程在本机跑，不联网；首次模型下载提示用户磁盘占用。',
      acceptance: '拖入音频 → 转写成功 → 提炼要点 → 导出 .docx/.md；空文件、格式错误 → 友好提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 500 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'meeting audio summaries take too long; transcribe and extract key points locally.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + local whisper.cpp (small multilingual model, auto-downloaded on first use)',
      features: `1. Drop an mp3/m4a/wav; show audio length.
  2. One-click transcribe with timestamps; right pane allows manual edits.
  3. After transcription, click "Extract key points" to produce a Markdown summary in three sections: Decisions / Action items / Risks (built-in prompt, editable in settings).
  4. Export to .docx and .md.`,
      extra: '- Fully offline; warn the user about disk space when downloading the model.',
      acceptance: 'drop audio → transcribe → extract points → export .docx/.md; empty file, bad format → friendly message.',
      packaging: '- Package as Windows .exe and macOS .dmg; 500-word user guide.',
    }, 'en'),
  },
  {
    id: 'sticky-notes',
    icon: 'note',
    titleZh: '桌面便签：常驻一角，开机自启',
    titleEn: 'Desktop sticky notes that boot with you',
    painZh: '常查的小信息，总埋在聊天和便签里。',
    painEn: 'Small notes keep getting buried in chat and note apps.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: '常查的小信息总埋在聊天和便签里，想要一个常驻桌面的极简便签。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + 本地 SQLite',
      features: `1. 一个 320×480 的小窗口，常驻屏幕右上角；可以"置顶 / 取消置顶"。
  2. 窗口里是分组便签列表：每个便签有标题 + 多行内容；点标题展开，再点收起。
  3. 一键复制单行便签到剪贴板。支持简单 Markdown（粗体、链接、列表）。
  4. 关闭窗口最小化到任务栏 / Dock；开机自启可在设置里打开。
  5. 全部数据存在本地 SQLite，可一键导出为 .json 备份。`,
      acceptance: '打开软件 → 便签列表显示 → 新增/编辑/复制 → 重启数据还在；空数据 → 友好提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'small notes keep getting buried; build a desktop sticky that boots with you.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + local SQLite',
      features: `1. A 320×480 window that lives in the top-right corner; toggleable "always on top".
  2. Grouped sticky list inside: each note has a title and multi-line body; click title to expand, click again to collapse.
  3. One-click copy single line to clipboard; basic Markdown (bold, links, lists).
  4. Close minimizes to tray/dock; launch-at-login optional in settings.
  5. All data in local SQLite; one-click export to .json backup.`,
      acceptance: 'launch → note list shows → add/edit/copy → data persists on restart; empty data → friendly message.',
      packaging: '- Package as Windows .exe and macOS .dmg; 300-word user guide.',
    }, 'en'),
  },
  {
    id: 'image-resizer',
    icon: 'image',
    titleZh: '一键把图片转成需要的尺寸 / 格式',
    titleEn: 'Bulk-convert images to the size & format you need',
    painZh: '不同渠道要不同尺寸，每次开 PS 太麻烦。',
    painEn: 'Different channels need different sizes. Photoshop is overkill.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: '不同渠道要不同尺寸，每次开 PS 太麻烦，想批量转换。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + sharp',
      features: `1. 拖入若干张图片，列表显示缩略图、原尺寸、原大小。
  2. 预设三档常用规格（"公众号头图 900×500 jpg"、"朋友圈方图 1080×1080 jpg"、"网站缩略图 600 长边 webp"），可一键切换；也可自定义"长边像素 + 输出格式 + 质量"。
  3. 支持"按比例裁剪"或"留白填充"两种适配方式。
  4. 一键批量导出到"原目录_resized"文件夹，原图不动。`,
      extra: '- 全程本地处理，不联网；处理过程显示进度。',
      acceptance: '拖入图片 → 选规格/自定义 → 批量导出；空文件夹、非图片 → 友好提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'different channels need different sizes; bulk-convert without opening Photoshop.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + sharp',
      features: `1. Drop several images; list shows thumbnail, original size, file size.
  2. Three preset profiles ("WeChat header 900×500 jpg", "Square social 1080×1080 jpg", "Website thumb 600 longest-edge webp"). Custom mode: longest-edge px + format + quality.
  3. Two fit modes: crop by ratio, or pad with whitespace.
  4. One-click batch export to a sibling "<originalFolder>_resized"; originals untouched.`,
      extra: '- Fully offline; show progress.',
      acceptance: 'drop images → pick size → batch export; empty folder, non-image → friendly message.',
      packaging: '- Package as Windows .exe and macOS .dmg; 300-word user guide.',
    }, 'en'),
  },
  {
    id: 'contact-deduper',
    icon: 'search',
    titleZh: '通讯录 / 客户名单去重合并',
    titleEn: 'Dedupe & merge a contacts / customer list',
    painZh: '客户名单一合并，重复和格式问题一大堆。',
    painEn: 'Customer lists merge into duplicates and messy formats.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: '客户名单一合并，重复和格式问题一大堆，想自动去重合并。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + xlsx',
      features: `1. 拖入多份 Excel/CSV，自动识别"姓名 / 公司 / 手机 / 邮箱"列（可手动指定）。
  2. 标准化：手机号统一去掉 +86 / 空格 / -；邮箱小写；姓名去前后空格。
  3. 去重规则可选：手机号相同 / 邮箱相同 / 手机+姓名 都视为同一人；冲突时保留信息最完整的一条，并把其他来源的备注合并到一栏。
  4. 输出一份合并后的 Excel + 一份"被去掉的可疑重复条目"Excel 供复核，原文件不动。`,
      extra: '- 全程本地处理，不联网。',
      acceptance: '拖入多份 Excel → 自动识别 → 去重合并 → 导出合并表和可疑表；空文件、格式错误 → 友好提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'customer lists merge into duplicates and messy formats; automate deduplication.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + xlsx',
      features: `1. Drop multiple Excel/CSV files; auto-detect name / company / phone / email columns (manual override allowed).
  2. Normalize: strip +86, spaces, dashes from phone; lowercase email; trim names.
  3. Configurable dedupe key: phone / email / phone+name. On collision, keep the most complete row and merge other sources' notes into a "merged_notes" column.
  4. Export a merged Excel plus a "removed-as-duplicate" Excel for review; originals untouched.`,
      extra: '- Fully offline.',
      acceptance: 'drop multiple files → auto-detect → dedupe → export merged + suspicious; empty file, bad format → friendly message.',
      packaging: '- Package as Windows .exe and macOS .dmg; 400-word user guide.',
    }, 'en'),
  },
  {
    id: 'markdown-to-pptx',
    icon: 'kanban',
    titleZh: '把一份 Markdown 大纲变成 PPT',
    titleEn: 'Turn a Markdown outline into a PPTX deck',
    painZh: 'Markdown 写完汇报，还要手动排成 PPT。',
    painEn: 'Markdown drafts still need manual slide building.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：',
      goal: 'Markdown 写完汇报，还要手动排成 PPT，想一键转换。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + pptxgenjs',
      features: `1. 左侧 Markdown 编辑区，右侧实时预览 PPT 缩略图。
  2. 转换规则：一级标题 = 章节封面页；二级标题 = 内容页标题；二级标题下的项目符号 = 内容页要点（最多 6 条，多了自动分页）；三个连续 --- = 强插一张过渡页。
  3. 提供三套主题（极简白、深色科技、暖橙商务），可在顶部一键切换；字体使用系统默认。
  4. 一键导出 .pptx 文件到指定文件夹；同时保存当前 .md 草稿到本地。`,
      extra: '- 全程本地处理，不联网。',
      acceptance: '写 Markdown → 实时预览 → 一键导出 .pptx；空内容、格式错误 → 友好提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明，含 Markdown 速查表。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:',
      goal: 'Markdown drafts still need manual slide building; convert to PPTX in one click.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + pptxgenjs',
      features: `1. Markdown editor on the left, live PPT thumbnail preview on the right.
  2. Conversion rules: H1 → section cover slide; H2 → content slide title; bullets under H2 → content slide bullets (max 6, auto-paginate beyond); a triple --- inserts a transition slide.
  3. Three themes (Minimal White, Dark Tech, Warm Business Orange) with one-click switch in the top bar; system fonts.
  4. One-click export to .pptx; auto-save the current .md draft locally.`,
      extra: '- Fully offline.',
      acceptance: 'write Markdown → live preview → one-click export .pptx; empty content, bad format → friendly message.',
      packaging: '- Package as Windows .exe and macOS .dmg; 400-word user guide including a Markdown cheatsheet.',
    }, 'en'),
  },
  {
    id: 'marketplace-order-merger',
    icon: 'excel',
    titleZh: '合并多平台订单导出表',
    titleEn: 'Merge order exports from multiple marketplaces',
    painZh: '不同平台导出的订单列名不一样，每天合并总表很费时间。',
    painEn: 'Order exports from each marketplace use different columns, making daily consolidation slow.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个电商订单合并小工具：',
      goal: '不同平台导出的订单列名不一样，每天合并总表很费时间，想自动统一。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + xlsx + papaparse',
      features: `1. 拖入多个 Excel/CSV 订单表，自动识别平台来源，也允许手动选择平台模板。
  2. 把不同列名统一成标准字段：平台、店铺、订单号、下单时间、SKU、商品名、数量、实付金额、运费、订单状态、收货省市。
  3. 订单号重复时合并明细并标红提示；字段缺失用黄色提示。
  4. 导出"订单总表.xlsx"和"异常订单.xlsx"，原文件不动。`,
      acceptance: '拖入多平台 Excel → 自动识别 → 统一字段 → 导出总表和异常表；重复订单标红，缺字段黄色。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明，说明如何新增平台字段映射。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build an e-commerce order merge tool:',
      goal: 'order exports from each marketplace use different columns, making daily consolidation slow; automate the normalization.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + xlsx + papaparse',
      features: `1. Drop multiple Excel/CSV order exports; auto-detect marketplace source, with manual template override.
  2. Normalize columns into: marketplace, store, order ID, order time, SKU, product name, quantity, paid amount, freight, status, province/city.
  3. Merge duplicate order IDs and flag them in red; highlight missing fields in yellow.
  4. Export "merged-orders.xlsx" and "order-exceptions.xlsx"; originals untouched.`,
      acceptance: 'drop multi-platform Excel → auto-detect → normalize → export merged + exceptions; duplicates red, missing yellow.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 400-word user guide explaining how to add a new marketplace mapping.',
    }, 'en'),
  },
  {
    id: 'sku-image-packager',
    icon: 'image',
    titleZh: '按 SKU 整理商品图片素材包',
    titleEn: 'Package product images by SKU',
    painZh: '商品图、详情图、短图散在文件夹里，上传前总要人工改名和分包。',
    painEn: 'Product images are scattered across folders and need manual renaming before upload.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个商品图片整理小工具：',
      goal: '商品图、详情图散在文件夹里，上传前总要人工改名和分包，想自动整理。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + sharp',
      features: `1. 拖入图片文件夹和 SKU 对照 Excel。
  2. 按文件名、子文件夹名或 Excel 映射，把图片归到对应 SKU。
  3. 批量重命名为 SKU-main-01、SKU-detail-01、SKU-size-01 等规则；改名前展示预览。
  4. 检查每个 SKU 是否缺主图、详情图、尺寸图；缺失项导出 Excel。
  5. 一键输出每个 SKU 一个文件夹的素材包，原图不动。`,
      acceptance: '拖入图片+Excel → 自动归类 → 重命名预览 → 输出素材包；缺失项 Excel 提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a product image packaging tool:',
      goal: 'product images are scattered; auto-sort and rename by SKU before upload.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + sharp',
      features: `1. Drop an image folder and a SKU mapping Excel.
  2. Match images to SKUs by filename, subfolder name, or Excel mapping.
  3. Batch rename to patterns like SKU-main-01, SKU-detail-01, SKU-size-01; preview before applying.
  4. Check whether each SKU is missing hero, detail, or size images; export missing items to Excel.
  5. Output one folder per SKU; originals untouched.`,
      acceptance: 'drop images+Excel → auto-sort → rename preview → output packages; missing items exported.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 400-word user guide.',
    }, 'en'),
  },
  {
    id: 'shipping-exception-checker',
    icon: 'folder',
    titleZh: '每天筛出物流异常件',
    titleEn: 'Find daily shipment exceptions',
    painZh: '物流表里有停滞、退回、派送失败、地址异常，客服容易漏跟。',
    painEn: 'Shipment exports hide stalled, returned, failed-delivery, and bad-address orders.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个物流异常筛查小工具：',
      goal: '物流表里有停滞、退回、派送失败等异常件，客服容易漏跟，想自动筛出来。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + xlsx',
      features: `1. 拖入快递状态 Excel/CSV，自动识别订单号、运单号、状态、更新时间、收件省市、手机号。
  2. 内置规则：48 小时未更新、派送失败、已退回、地址异常、破损、拒收、关键词命中。
  3. 支持在设置里调整小时阈值和关键词。
  4. 输出按严重程度排序的异常清单，手机号默认脱敏。
  5. 一键导出"今日物流异常.xlsx"，含建议客服跟进话术。`,
      extra: '- 手机号默认脱敏。',
      acceptance: '拖入快递 Excel → 自动识别字段 → 异常列表标红 → 导出 Excel 含跟进话术；手机号脱敏。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a shipment exception checker:',
      goal: 'shipment exports hide stalled, returned, failed-delivery orders; CS easily misses them. Auto-filter exceptions.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + xlsx',
      features: `1. Drop shipment Excel/CSV; auto-detect order ID, tracking ID, status, update time, province/city, phone.
  2. Built-in rules: no update for 48 hours, failed delivery, returned, bad address, damaged, refused, keyword hit.
  3. Let users adjust hour threshold and keywords in settings.
  4. Output a severity-ranked exception list with masked phone numbers by default.
  5. Export "shipment-exceptions-today.xlsx" with suggested support wording.`,
      extra: '- Phone masked by default.',
      acceptance: 'drop shipment Excel → auto-detect → exception list highlighted → export Excel with CS wording; phone masked.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 300-word user guide.',
    }, 'en'),
  },
  {
    id: 'product-label-printer',
    icon: 'excel',
    titleZh: '批量生成商品标签和条码贴纸',
    titleEn: 'Generate product labels and barcode stickers',
    painZh: '仓库要打印 SKU 标签、价格签、库位贴纸，手动排版容易错。',
    painEn: 'Warehouse label printing for SKUs, price tags, and bin labels is error-prone by hand.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个商品标签生成小工具：',
      goal: '仓库要打印 SKU 标签、价格签、库位贴纸，手动排版容易错，想批量生成。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + bwip-js + pdf-lib',
      features: `1. 导入 SKU Excel，字段包括 SKU、商品名、条码、规格、售价、库位、打印数量。
  2. 选择标签尺寸：40×30、60×40、80×50，也可自定义毫米尺寸。
  3. 自动生成条码/二维码，支持预览单张和整页。
  4. 导出适合 A4 或热敏打印的 PDF；打印数量按 Excel 字段重复。
  5. 长商品名自动换行，不挤出标签边界。`,
      acceptance: '导入 Excel → 选尺寸 → 预览 → 导出 PDF；空数据、格式错误 → 友好提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a product label generator:',
      goal: 'warehouse label printing for SKUs, price tags, and bin labels is error-prone; automate it.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + bwip-js + pdf-lib',
      features: `1. Import SKU Excel with SKU, product name, barcode, spec, price, bin location, print quantity.
  2. Choose label size: 40x30, 60x40, 80x50 mm, or custom.
  3. Generate barcode/QR code; preview single label and full page.
  4. Export PDF for A4 or thermal printer; repeat labels by quantity.
  5. Long product names wrap without overflowing the label.`,
      acceptance: 'import Excel → pick size → preview → export PDF; empty data, bad format → friendly message.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 300-word user guide.',
    }, 'en'),
  },
  {
    id: 'platform-bill-reconciliation',
    icon: 'pdf',
    titleZh: '平台账单和订单一键核对',
    titleEn: 'Reconcile marketplace bills with orders',
    painZh: '平台账单里佣金、退款、运费、服务费太多，和订单总额经常对不上。',
    painEn: 'Marketplace bills include commission, refunds, freight, and service fees, often not matching order totals.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个平台账单核对小工具：',
      goal: '平台账单里佣金、退款、运费、服务费太多，和订单总额经常对不上，想自动核对。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + xlsx',
      features: `1. 导入订单表和平台账单表。
  2. 按订单号匹配成交、退款、佣金、服务费、运费、补贴、实际到账。
  3. 自动计算差异金额和差异原因；匹配不到的订单单独列出。
  4. 首页展示总订单额、总到账、总费用、总差异和异常数量。
  5. 导出"账单核对结果.xlsx"，含明细页、异常页、汇总页。`,
      acceptance: '导入订单+账单 → 自动匹配 → 差异标红 → 首页显示汇总 → 导出 Excel 含三页。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 500 字中文使用说明，解释常见差异原因。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a marketplace bill reconciliation tool:',
      goal: 'marketplace bills include commission, refunds, freight, and service fees, often not matching order totals. Automate reconciliation.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + xlsx',
      features: `1. Import order sheet and marketplace bill sheet.
  2. Match by order ID across sales, refunds, commission, service fee, freight, subsidy, actual settlement.
  3. Calculate variance amount and likely reason; list unmatched orders separately.
  4. Home view shows total orders, settlement, fees, variance, and exception count.
  5. Export "bill-reconciliation-result.xlsx" with detail, exception, and summary sheets.`,
      acceptance: 'import orders + bill → auto-match → differences red → home summary → export Excel with 3 sheets.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 500-word guide explaining common variance reasons.',
    }, 'en'),
  },
  {
    id: 'campaign-calendar-planner',
    icon: 'kanban',
    titleZh: '大促节点日历和任务提醒',
    titleEn: 'Campaign calendar and task reminders',
    painZh: '报名、备货、素材、价格、直播、复盘节点太多，经常靠人记。',
    painEn: 'Campaign enrollment, stock, materials, price, live sessions, and recap milestones are hard to track manually.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个电商大促日历小工具：',
      goal: '报名、备货、素材、价格、直播、复盘节点太多，经常靠人记，想自动提醒。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + 本地 SQLite',
      features: `1. 新建活动：名称、开始/结束日期、平台、负责人。
  2. 内置任务模板：报名、选品、备货、价格确认、素材提交、客服话术、直播排期、上线检查、复盘。
  3. 日历视图 + 看板视图，任务可拖拽改日期和状态。
  4. 逾期任务红色提醒；今天任务可导出为 Excel。
  5. 支持从 Excel 批量导入任务。`,
      acceptance: '新建活动 → 任务模板生成 → 日历/看板视图 → 逾期提醒 → 导出 Excel。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build an e-commerce campaign calendar:',
      goal: 'campaign milestones are hard to track manually; automate reminders and task templates.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + local SQLite',
      features: `1. Create campaign: name, start/end date, marketplace, owner.
  2. Built-in task templates: enrollment, product selection, stock, price confirmation, materials, support wording, live schedule, launch check, recap.
  3. Calendar view + board view; drag tasks to change date and status.
  4. Overdue tasks turn red; today's tasks export to Excel.
  5. Bulk import tasks from Excel.`,
      acceptance: 'create campaign → tasks generated → calendar/board view → overdue alert → export Excel.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 400-word user guide.',
    }, 'en'),
  },
  {
    id: 'support-macro-library',
    icon: 'search',
    titleZh: '客服快捷话术库',
    titleEn: 'Customer support macro library',
    painZh: '客服话术散在文档和聊天里，新人找不到，老人也复制错版本。',
    painEn: 'Support macros are scattered across docs and chats, so agents find or copy the wrong version.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个客服话术库小工具：',
      goal: '客服话术散在文档和聊天里，新人找不到，老人也复制错版本，想统一管理。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + 本地 SQLite',
      features: `1. 话术按场景分类：物流、退款、换货、质量、活动规则、发票、投诉。
  2. 大搜索框支持关键词和标签搜索；结果可一键复制。
  3. 支持变量占位：{昵称}、{订单号}、{商品名}，复制前弹窗填写。
  4. 话术有版本号、更新时间、适用店铺和禁用状态。
  5. 支持从 Excel 导入/导出，记录每条话术复制次数。`,
      acceptance: '搜索话术 → 一键复制 → 变量填写 → 导入/导出 Excel；空数据 → 友好提示。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a customer support macro library:',
      goal: 'support macros are scattered across docs and chats; centralize and version them.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + local SQLite',
      features: `1. Categorize macros by logistics, refund, exchange, quality, campaign rules, invoice, complaint.
  2. Large search box supports keyword and tag search; one-click copy.
  3. Variable placeholders: {name}, {orderId}, {productName}; prompt for values before copy.
  4. Each macro has version, updated date, applicable store, and disabled status.
  5. Excel import/export; record copy count per macro.`,
      acceptance: 'search macro → one-click copy → fill variables → import/export Excel; empty data → friendly message.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 400-word user guide.',
    }, 'en'),
  },
  {
    id: 'creator-sample-desktop',
    icon: 'folder',
    titleZh: '达人样品寄送跟进表',
    titleEn: 'Creator sample follow-up board',
    painZh: '寄样、签收、发布、复盘状态分散，市场同事每天要翻很多记录。',
    painEn: 'Sample shipment, receipt, publish status, and recap are scattered across records.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个达人样品跟进小工具：',
      goal: '寄样、签收、发布、复盘状态分散，市场同事每天要翻很多记录，想集中管理。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + 本地 SQLite',
      features: `1. 导入达人名单和寄样表，字段包括达人名、平台、粉丝量、SKU、快递单号、约定发布时间、负责人。
  2. 看板列：待寄出、运输中、已签收、待发布、已发布、待复盘、暂停。
  3. 逾期未签收和逾期未发布自动高亮。
  4. 每个达人卡片可记录内容链接、播放/互动/成交数据和备注。
  5. 导出今日跟进清单和复盘表。`,
      acceptance: '导入名单 → 看板显示 → 逾期高亮 → 记录数据 → 导出清单。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a creator sample follow-up board:',
      goal: 'sample shipment, receipt, publish, and recap status are scattered; centralize tracking.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + local SQLite',
      features: `1. Import creator list and sample sheet: creator, platform, followers, SKU, tracking ID, promised publish date, owner.
  2. Board columns: to send, in transit, received, waiting publish, published, waiting recap, paused.
  3. Highlight overdue receipt and overdue publish.
  4. Creator card stores content link, views/interactions/sales, and notes.
  5. Export today's follow-up list and recap sheet.`,
      acceptance: 'import list → board shows → overdue highlights → record data → export list.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 400-word user guide.',
    }, 'en'),
  },
  {
    id: 'competitor-price-sheet',
    icon: 'excel',
    titleZh: '竞品价格采集表整理器',
    titleEn: 'Competitor price tracker cleaner',
    painZh: '竞品价格表每天复制回来格式很乱，很难看出谁降价了。',
    painEn: 'Daily competitor price sheets come back messy, making price drops hard to spot.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个竞品价格整理小工具：',
      goal: '竞品价格表每天复制回来格式很乱，很难看出谁降价了，想自动整理对比。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + xlsx',
      features: `1. 导入今日竞品价格表和历史价格表。
  2. 自动清洗价格字段，识别券后价、赠品、店铺名、商品链接、采集时间。
  3. 和历史价格对比，标出降价、涨价、新增、下架、赠品变化。
  4. 支持按我方 SKU 映射竞品商品，展示价差和变化幅度。
  5. 导出"竞品价格变化.xlsx"和一页摘要图片。`,
      acceptance: '导入价格表 → 自动清洗 → 对比标红/标绿 → 导出 Excel 和摘要图。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a competitor price tracker cleaner:',
      goal: 'daily competitor price sheets come back messy; automate cleaning and comparison.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + xlsx',
      features: `1. Import today's competitor price sheet and historical price sheet.
  2. Clean price fields and detect final price after coupon, gifts, store name, product link, capture time.
  3. Compare with history and flag price down, price up, new item, delisted item, gift change.
  4. Map competitor products to our SKUs and show price gap and movement.
  5. Export "competitor-price-changes.xlsx" and a one-page summary image.`,
      acceptance: 'import price sheets → auto-clean → compare with flags → export Excel + summary image.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 400-word user guide.',
    }, 'en'),
  },
  {
    id: 'live-run-sheet-timer',
    icon: 'timer',
    titleZh: '直播排品计时器',
    titleEn: 'Live run-sheet timer',
    painZh: '直播时商品顺序、讲解时长、上链接提醒都靠人工盯，容易错过节奏。',
    painEn: 'During live sessions, product order, speaking time, and link reminders are hard to manage manually.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个直播排品计时小工具：',
      goal: '直播时商品顺序、讲解时长、上链接提醒都靠人工盯，容易错过节奏。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + 本地 SQLite',
      features: `1. 导入直播排品 Excel：时间、SKU、商品名、价格、卖点、链接、主播话术、场控提醒。
  2. 大屏计时视图显示当前商品、下一商品、剩余时间、提醒事项。
  3. 到点自动提醒"上链接 / 发券 / 切下一个品 / 库存确认"。
  4. 直播中可一键标记跳过、延长、异常，并记录实际时间。
  5. 直播后导出复盘表。`,
      acceptance: '导入排品 → 计时视图 → 到点提醒 → 标记异常 → 导出复盘表。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a live run-sheet timer:',
      goal: 'product order, speaking time, and link reminders during live sessions are hard to manage manually.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + local SQLite',
      features: `1. Import live run-sheet Excel: time, SKU, product, price, selling points, link, host wording, control reminder.
  2. Big timer view shows current product, next product, remaining time, reminders.
  3. Timed reminders for link, coupon, next product, stock check.
  4. During live, mark skipped, extended, exception, and actual time.
  5. Export recap sheet after the session.`,
      acceptance: 'import run-sheet → timer view → timed reminders → mark exceptions → export recap.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 400-word user guide.',
    }, 'en'),
  },
  {
    id: 'sku-listing-auditor',
    icon: 'search',
    titleZh: '商品资料上架前巡检',
    titleEn: 'SKU listing preflight auditor',
    painZh: '商品标题、价格、库存、图片、资质经常有缺漏，等上线前才返工。',
    painEn: 'Titles, prices, stock, images, and certificates often miss pieces until the last minute.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个商品资料巡检小工具：',
      goal: '商品标题、价格、库存、图片、资质经常有缺漏，等上线前才返工，想提前巡检。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + xlsx',
      features: `1. 导入商品资料表、图片清单、资质清单。
  2. 检查标题、类目、规格、售价、成本、库存、主图、详情图、卖点、售后说明、资质有效期。
  3. 标出缺失、冲突和高风险项，例如售价低于成本、库存为 0、图片不足、资质过期。
  4. 每个 SKU 生成完整度分数：可上线 / 补齐后上线 / 暂缓。
  5. 导出"商品资料补齐清单.xlsx"。`,
      acceptance: '导入资料 → 自动巡检 → 标出问题 → 完整度评分 → 导出补齐清单。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a SKU listing preflight auditor:',
      goal: 'titles, prices, stock, images, and certificates often miss pieces until launch day; preflight early.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + xlsx',
      features: `1. Import product sheet, image list, certificate list.
  2. Check title, category, spec, price, cost, stock, hero image, detail image, selling points, after-sales note, certificate expiry.
  3. Flag missing, conflicting, and high-risk items such as price below cost, zero stock, insufficient images, expired certificate.
  4. Generate completeness score per SKU: ready / ready after fixes / pause.
  5. Export "listing-fix-list.xlsx".`,
      acceptance: 'import sheets → auto-audit → flag issues → score SKUs → export fix list.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 400-word user guide.',
    }, 'en'),
  },
  {
    id: 'inventory-transfer-planner',
    icon: 'excel',
    titleZh: '多仓库存调拨建议器',
    titleEn: 'Multi-warehouse transfer planner',
    painZh: '多仓库存一边断货一边积压，手工算调拨数量太慢。',
    painEn: 'One warehouse stocks out while another overstock; manual transfer planning is slow.',
    promptZh: composeRecipePrompt({
      role: '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个多仓库存调拨小工具：',
      goal: '多仓库存一边断货一边积压，手工算调拨数量太慢，想自动建议。',
      platform: 'Windows 10/11 和 macOS',
      stack: 'Electron + React + TypeScript + xlsx + ECharts',
      features: `1. 导入各仓库存表、近 30 天销量表、在途库存表。
  2. 计算每个 SKU 在每个仓的日均销量、可售天数、断货风险和积压风险。
  3. 自动建议从库存过高仓调往库存不足仓，给出建议数量和理由。
  4. 可设置安全库存天数、最低调拨数量、活动保留量。
  5. 导出"调拨建议.xlsx"和"断货风险.xlsx"。`,
      acceptance: '导入库存表 → 自动计算 → 调拨建议 → 风险标红 → 导出 Excel。',
      packaging: '- 同时打包成 Windows .exe 和 macOS .dmg；附 500 字中文使用说明。',
    }, 'zh'),
    promptEn: composeRecipePrompt({
      role: 'You are a senior engineer for Windows and macOS desktop apps. Build a multi-warehouse transfer planner:',
      goal: 'one warehouse stocks out while another overstock; automate transfer planning.',
      platform: 'Windows 10/11 and macOS',
      stack: 'Electron + React + TypeScript + xlsx + ECharts',
      features: `1. Import warehouse stock, last-30-day sales, and incoming stock sheets.
  2. Calculate daily average sales, days of supply, stockout risk, and overstock risk per SKU per warehouse.
  3. Recommend transfers from overstocked warehouses to low-stock warehouses, with quantity and reason.
  4. Configurable safety stock days, minimum transfer quantity, campaign reserve.
  5. Export "transfer-suggestions.xlsx" and "stockout-risk.xlsx".`,
      acceptance: 'import stock → auto-calculate → transfer suggestions → risk flags red → export Excel.',
      packaging: '- Package as Windows .exe and macOS .dmg; include a 500-word user guide.',
    }, 'en'),
  },
];
