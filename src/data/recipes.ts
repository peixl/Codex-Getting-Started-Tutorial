import { withDesktopQualityBar, type PromptQualityLang } from '@/lib/promptQuality';

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
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript
- 功能：把一张 Excel 文件（列：指标名、数值、环比）导入后，自动生成一张 1200×1800 的日报长图（和一份 A4 PDF），带标题 + 三张 KPI 卡 + 一条横条排名 + 页脚。
- 配色以白底 + 深灰字为主，强调排版层级。
- 同时打包成 Windows .exe 安装包和 macOS .dmg 安装包；附一份 500 字以内的中文使用说明。
先给 10 行以内方案摘要，然后直接实现、运行和验证。全程中文沟通。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript
- Feature: import one Excel (columns: metric, value, delta) and auto-render a 1200x1800 PNG daily report plus an A4 PDF — title, 3 KPI cards, one ranking bar chart, footer.
- Palette: white background, deep gray text; emphasize typographic hierarchy.
- Package as Windows .exe and macOS .dmg; include a 500-word plain-language user guide.
Start with a brief plan summary, then implement, run, and verify. English throughout.`,
  },
  {
    id: 'pdf-to-excel',
    icon: 'pdf',
    titleZh: '把一堆 PDF 发票整理成 Excel',
    titleEn: 'Turn a pile of PDF invoices into an Excel',
    painZh: '几十张 PDF 发票，要手动抄进 Excel。',
    painEn: 'Dozens of PDF invoices need to become one Excel ledger.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + pdfjs 解析
- 功能：拖入一个包含多份 PDF 的文件夹；软件批量读取每份发票的"发票号 / 开票日期 / 销方 / 购方 / 金额 / 税额 / 价税合计"；输出一张 Excel 台账。
- 对识别不全的字段高亮为黄色，让用户手动补。
- 同时打包成 Windows .exe 和 macOS .dmg；附 500 字中文使用说明。
先给简短方案摘要，然后直接实现、运行和验证。中文沟通。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript with pdfjs parsing
- Feature: drop a folder of PDFs; extract invoice id / date / seller / buyer / amount / tax / total; write an Excel ledger.
- Highlight uncertain fields in yellow for manual fix.
- Package as Windows .exe and macOS .dmg; 500-word user guide.
Start with a brief plan summary, then implement, run, and verify. English throughout.`,
  },
  {
    id: 'folder-rename',
    icon: 'folder',
    titleZh: '按规则批量重命名一堆文件',
    titleEn: 'Bulk-rename files by a rule',
    painZh: '照片、视频命名太乱，想按日期 + 编号统一。',
    painEn: 'Messy photo/video names. Rename by date + index.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript
- 功能：拖入一个文件夹；列出所有文件；允许用规则模板（如"YYYYMMDD-{序号3位}"）批量重命名，改名前预览对照，用户确认后再执行。
- 支持撤销：每次重命名保存一份"还原对照表"到本地，最近三次操作都可回退。
- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字使用说明。
先给简短方案摘要，然后直接实现、运行和验证。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript
- Feature: drop a folder; show the file list; rename in bulk by a template (e.g. "YYYYMMDD-{idx3}"). Preview before/after, confirm, then execute.
- Undo: save a reversal map locally so users can roll back the last three operations.
- Package as Windows .exe and macOS .dmg; 300-word user guide.
Start with a brief plan summary, then implement, run, and verify.`,
  },
  {
    id: 'quick-lookup',
    icon: 'search',
    titleZh: '做一个小小的"查数表"',
    titleEn: 'Build a tiny lookup table app',
    painZh: '内部手册在 Excel 里，同事总在群里问。',
    painEn: 'Internal handbook in Excel; teammates keep asking in chat.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript
- 功能：软件打开后自动读取一份 Excel（路径可配置）；主界面只有一个大搜索框 + 结果列表。模糊搜索任意列；结果卡片展示全部字段。
- 支持"一键复制某字段"，如复制产品编码到剪贴板。
- Excel 更新后重启软件会自动重载。
- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字说明。
先给简短方案摘要，然后直接实现、运行和验证。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript
- Feature: on launch, read one Excel (configurable path). Main UI: a big search box + result list. Fuzzy search any column. Cards show all fields.
- One-click copy a specific field (e.g. copy SKU to clipboard).
- Reload when Excel changes on disk, or on restart.
- Package as Windows .exe and macOS .dmg; 300-word guide.
Start with a brief plan summary, then implement, run, and verify.`,
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
先给简短方案摘要，然后直接实现、运行和验证。中文。`,
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
Start with a brief plan summary, then implement, run, and verify.`,
  },
  {
    id: 'mini-kanban',
    icon: 'kanban',
    titleZh: '给自己做一个极简 Todo 看板',
    titleEn: 'A dead-simple personal Kanban',
    painZh: '待办 App 太复杂。想要一个打开就能用的。',
    painEn: 'Todo apps feel heavy. Build one that opens fast.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地 Todo 看板：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + 本地 SQLite
- 三列：待办 / 进行中 / 完成。卡片拖拽切列。回车新增。双击改标题。
- 软件启动默认打开最近一次工作视图。
- 深浅模式跟随系统。
- 同时打包成 Windows .exe 和 macOS .dmg；200 字说明。
先给简短方案摘要，然后直接实现、运行和验证。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a personal cross-platform Kanban:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + local SQLite
- Three columns: Todo / Doing / Done. Drag cards. Enter to add. Double-click to rename.
- Opens in the last-used view.
- Follows system dark mode.
- Package as Windows .exe and macOS .dmg; 200-word guide.
Start with a brief plan summary, then implement, run, and verify.`,
  },
  {
    id: 'pdf-merge-split',
    icon: 'pdf',
    titleZh: '一键合并 / 拆分一堆 PDF',
    titleEn: 'Merge & split a pile of PDFs',
    painZh: 'PDF 要合并、拆分、归档，手动太麻烦。',
    painEn: 'Merge, split, and archive PDFs without manual steps.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + pdf-lib
- 功能：
  1. 合并模式：拖入若干 PDF，可上下拖动调顺序，输入输出文件名后一键合并。
  2. 拆分模式：拖入一份 PDF，输入页码区间（如"1-10, 11-25, 26-end"），按区间导出为多份 PDF。
- 全程不联网，文件只在本地处理；处理完后弹一个"打开输出文件夹"的按钮。
- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字中文使用说明。
先给 10 行以内方案摘要，然后直接实现、运行和验证。中文沟通。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + pdf-lib
- Features:
  1. Merge: drop several PDFs, drag to reorder, type output filename, click merge.
  2. Split: drop one PDF, type page ranges (e.g. "1-10, 11-25, 26-end"), export each range as a separate PDF.
- Fully offline; files stay local. After completion, show an "Open output folder" button.
- Package as Windows .exe and macOS .dmg; 300-word user guide.
Start with a brief plan summary, then implement, run, and verify. English throughout.`,
  },
  {
    id: 'screenshot-watermark',
    icon: 'image',
    titleZh: '给一批截图统一加水印 / 改尺寸',
    titleEn: 'Watermark and resize a batch of screenshots',
    painZh: '截图要加水印、压缩、统一尺寸，手动太慢。',
    painEn: 'Watermark, compress, and resize screenshots in one pass.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + sharp
- 功能：
  1. 拖入一个文件夹（含 .png .jpg .webp）。
  2. 设置：水印图片或文字（位置可选右下/左下/居中）、最长边像素（如 1600）、输出格式（jpg/png/webp）、jpg 压缩质量。
  3. 一键批量处理，输出到"原目录_processed"。处理过程显示进度。
- 不修改原图；保留原始 EXIF 时间。
- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字使用说明。
先给简短方案摘要，然后直接实现、运行和验证。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + sharp
- Features:
  1. Drop a folder containing .png .jpg .webp.
  2. Settings: watermark image or text (corner choice), longest-edge pixels (e.g. 1600), output format (jpg/png/webp), jpg quality.
  3. One-click batch with progress; output to "<originalFolder>_processed".
- Never modify originals; preserve original EXIF timestamps.
- Package as Windows .exe and macOS .dmg; 300-word user guide.
Start with a brief plan summary, then implement, run, and verify.`,
  },
  {
    id: 'csv-cleaner',
    icon: 'excel',
    titleZh: '把脏脏的 CSV / Excel 一键洗干净',
    titleEn: 'One-click clean a messy CSV / Excel',
    painZh: '系统导出的表有空行、重复、乱格式，每次都要清洗。',
    painEn: 'System exports are messy. Clean blanks, duplicates, dates, and spaces.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + xlsx + papaparse
- 功能：
  1. 拖入一份 CSV 或 Excel；自动展示前 20 行预览。
  2. 提供"清洗动作清单"，复选打勾即可：去除空行、去除完全重复行、去除前后空格、统一日期格式（YYYY-MM-DD）、全角转半角、按某列去重保留首条。
  3. 右侧实时预览清洗后的结果；满意后导出为新文件，原文件不动。
- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明，含"如何向 Codex 描述新清洗规则"的小段。
先给简短方案摘要，然后直接实现、运行和验证。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + xlsx + papaparse
- Features:
  1. Drop a CSV or Excel; preview the first 20 rows.
  2. Show a checklist of cleaning actions: remove blank rows, drop exact duplicates, trim whitespace, normalize dates (YYYY-MM-DD), convert full-width to half-width, dedupe by chosen column keeping the first.
  3. Live-preview the cleaned result on the right; export to a new file when ready, leaving the original untouched.
- Package as Windows .exe and macOS .dmg; 400-word user guide including a short section on "how to describe new cleaning rules to Codex".
Start with a brief plan summary, then implement, run, and verify.`,
  },
  {
    id: 'audio-to-text',
    icon: 'mic',
    titleZh: '会议录音一键转文字 + 提炼要点',
    titleEn: 'Turn meeting audio into text + key points',
    painZh: '会议录音整理太慢，还希望全程本地处理。',
    painEn: 'Summaries take too long. Keep audio processing local.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + 本地 whisper.cpp（small 中文模型，首次使用自动下载）
- 功能：
  1. 拖入 mp3/m4a/wav；显示音频时长。
  2. 一键转写为带时间戳的中文文本，旁边一栏支持手动微调。
  3. 转写完成后，再点"提炼要点"按钮，按"决议 / 待办 / 风险"三段输出 Markdown 摘要（提示词内置，可在设置里改）。
  4. 一键导出为 .docx 和 .md。
- 全程在本机跑，不联网；首次模型下载提示用户磁盘占用。
- 同时打包成 Windows .exe 和 macOS .dmg；附 500 字中文使用说明。
先给简短方案摘要，然后直接实现、运行和验证。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + local whisper.cpp (small multilingual model, auto-downloaded on first use)
- Features:
  1. Drop an mp3/m4a/wav; show audio length.
  2. One-click transcribe with timestamps; right pane allows manual edits.
  3. After transcription, click "Extract key points" to produce a Markdown summary in three sections: Decisions / Action items / Risks (built-in prompt, editable in settings).
  4. Export to .docx and .md.
- Fully offline; warn the user about disk space when downloading the model.
- Package as Windows .exe and macOS .dmg; 500-word user guide.
Start with a brief plan summary, then implement, run, and verify.`,
  },
  {
    id: 'sticky-notes',
    icon: 'note',
    titleZh: '桌面便签：常驻一角，开机自启',
    titleEn: 'Desktop sticky notes that boot with you',
    painZh: '常查的小信息，总埋在聊天和便签里。',
    painEn: 'Small notes keep getting buried in chat and note apps.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + 本地 SQLite
- 功能：
  1. 一个 320×480 的小窗口，常驻屏幕右上角；可以"置顶 / 取消置顶"。
  2. 窗口里是分组便签列表：每个便签有标题 + 多行内容；点标题展开，再点收起。
  3. 一键复制单行便签到剪贴板。支持简单 Markdown（粗体、链接、列表）。
  4. 关闭窗口最小化到任务栏 / Dock；开机自启可在设置里打开。
  5. 全部数据存在本地 SQLite，可一键导出为 .json 备份。
- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字中文使用说明。
先给简短方案摘要，然后直接实现、运行和验证。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + local SQLite
- Features:
  1. A 320×480 window that lives in the top-right corner; toggleable "always on top".
  2. Grouped sticky list inside: each note has a title and multi-line body; click title to expand, click again to collapse.
  3. One-click copy single line to clipboard; basic Markdown (bold, links, lists).
  4. Close minimizes to tray/dock; launch-at-login optional in settings.
  5. All data in local SQLite; one-click export to .json backup.
- Package as Windows .exe and macOS .dmg; 300-word user guide.
Start with a brief plan summary, then implement, run, and verify.`,
  },
  {
    id: 'image-resizer',
    icon: 'image',
    titleZh: '一键把图片转成需要的尺寸 / 格式',
    titleEn: 'Bulk-convert images to the size & format you need',
    painZh: '不同渠道要不同尺寸，每次开 PS 太麻烦。',
    painEn: 'Different channels need different sizes. Photoshop is overkill.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + sharp
- 功能：
  1. 拖入若干张图片，列表显示缩略图、原尺寸、原大小。
  2. 预设三档常用规格（"公众号头图 900×500 jpg"、"朋友圈方图 1080×1080 jpg"、"网站缩略图 600 长边 webp"），可一键切换；也可自定义"长边像素 + 输出格式 + 质量"。
  3. 支持"按比例裁剪"或"留白填充"两种适配方式。
  4. 一键批量导出到"原目录_resized"文件夹，原图不动。
- 全程本地处理，不联网；处理过程显示进度。
- 同时打包成 Windows .exe 和 macOS .dmg；附 300 字中文使用说明。
先给 10 行以内方案摘要，然后直接实现、运行和验证。中文沟通。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + sharp
- Features:
  1. Drop several images; list shows thumbnail, original size, file size.
  2. Three preset profiles ("WeChat header 900×500 jpg", "Square social 1080×1080 jpg", "Website thumb 600 longest-edge webp"). Custom mode: longest-edge px + format + quality.
  3. Two fit modes: crop by ratio, or pad with whitespace.
  4. One-click batch export to a sibling "<originalFolder>_resized"; originals untouched.
- Fully offline; show progress.
- Package as Windows .exe and macOS .dmg; 300-word user guide.
Start with a brief plan summary, then implement, run, and verify.`,
  },
  {
    id: 'contact-deduper',
    icon: 'search',
    titleZh: '通讯录 / 客户名单去重合并',
    titleEn: 'Dedupe & merge a contacts / customer list',
    painZh: '客户名单一合并，重复和格式问题一大堆。',
    painEn: 'Customer lists merge into duplicates and messy formats.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + xlsx
- 功能：
  1. 拖入多份 Excel/CSV，自动识别"姓名 / 公司 / 手机 / 邮箱"列（可手动指定）。
  2. 标准化：手机号统一去掉 +86 / 空格 / -；邮箱小写；姓名去前后空格。
  3. 去重规则可选：手机号相同 / 邮箱相同 / 手机+姓名 都视为同一人；冲突时保留信息最完整的一条，并把其他来源的备注合并到一栏。
  4. 输出一份合并后的 Excel + 一份"被去掉的可疑重复条目"Excel 供复核，原文件不动。
- 全程本地处理，不联网。
- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明。
先给简短方案摘要，然后直接实现、运行和验证。中文。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + xlsx
- Features:
  1. Drop multiple Excel/CSV files; auto-detect name / company / phone / email columns (manual override allowed).
  2. Normalize: strip +86, spaces, dashes from phone; lowercase email; trim names.
  3. Configurable dedupe key: phone / email / phone+name. On collision, keep the most complete row and merge other sources' notes into a "merged_notes" column.
  4. Export a merged Excel plus a "removed-as-duplicate" Excel for review; originals untouched.
- Fully offline.
- Package as Windows .exe and macOS .dmg; 400-word user guide.
Start with a brief plan summary, then implement, run, and verify.`,
  },
  {
    id: 'markdown-to-pptx',
    icon: 'kanban',
    titleZh: '把一份 Markdown 大纲变成 PPT',
    titleEn: 'Turn a Markdown outline into a PPTX deck',
    painZh: 'Markdown 写完汇报，还要手动排成 PPT。',
    painEn: 'Markdown drafts still need manual slide building.',
    promptZh: `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：
- 平台：Windows 10/11 和 macOS
- 做法：Electron + React + TypeScript + pptxgenjs
- 功能：
  1. 左侧 Markdown 编辑区，右侧实时预览 PPT 缩略图。
  2. 转换规则：一级标题 = 章节封面页；二级标题 = 内容页标题；二级标题下的项目符号 = 内容页要点（最多 6 条，多了自动分页）；三个连续 --- = 强插一张过渡页。
  3. 提供三套主题（极简白、深色科技、暖橙商务），可在顶部一键切换；字体使用系统默认。
  4. 一键导出 .pptx 文件到指定文件夹；同时保存当前 .md 草稿到本地。
- 全程本地处理，不联网。
- 同时打包成 Windows .exe 和 macOS .dmg；附 400 字中文使用说明，含 Markdown 速查表。
先给 10 行以内方案摘要，然后直接实现、运行和验证。中文沟通。`,
    promptEn: `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:
- Platform: Windows 10/11 and macOS
- Stack: Electron + React + TypeScript + pptxgenjs
- Features:
  1. Markdown editor on the left, live PPT thumbnail preview on the right.
  2. Conversion rules: H1 → section cover slide; H2 → content slide title; bullets under H2 → content slide bullets (max 6, auto-paginate beyond); a triple --- inserts a transition slide.
  3. Three themes (Minimal White, Dark Tech, Warm Business Orange) with one-click switch in the top bar; system fonts.
  4. One-click export to .pptx; auto-save the current .md draft locally.
- Fully offline.
- Package as Windows .exe and macOS .dmg; 400-word user guide including a Markdown cheatsheet.
Start with a brief plan summary, then implement, run, and verify.`,
  },
];
