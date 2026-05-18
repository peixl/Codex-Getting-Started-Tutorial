import type { CaseBundle } from './types';
import { composeCasePrompt, caseRole } from '@/lib/promptModules';

export const dataDailyReport: CaseBundle = {
  slug: 'data-daily-report-builder',
  department: 'data',
  i18n: {
    zh: {
      title: '每日数据快报生成器',
      departmentLabel: '数据',
      summary:
        '把多张 Excel（GMV、订单、流量）拖进去，一键合并，自动生成"一图读懂今日业务"的日报图片，十分钟内发群。',
      painTitle: '这是什么问题',
      painBody:
        '业务同事每天早上问"昨日 GMV 多少"，数据同学要手动跑 SQL、拉表、拼图、发群，每天重复一小时。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地小工具：把今天要用的几张 Excel 拖进去，选好字段映射（记住后下次自动），点击"生成日报"，出一张带核心数据、趋势曲线和环比的图片或 PDF。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '首页三块区：数据导入 / 日报模板设置 / 生成日报。',
        '支持一次拖入多张 Excel，软件自动识别是"GMV / 订单 / 流量"哪一类（也可手选）。',
        '日报模板可调：标题、核心指标、图表类型（折线 / 柱状）。',
        '一键生成带品牌色的日报图片或 PDF，命名格式"日报-YYYY-MM-DD"。',
        '支持保存模板，每天只需拖文件点一下即可。',
      ],
      keywords: ['数据', '日报', '自动化', '图表', '业务快报'],
    },
    en: {
      title: 'Daily Data Report Builder',
      departmentLabel: 'Data',
      summary:
        'Drop in today\'s Excel files (GMV, orders, traffic). Merge with saved mappings. Generate a "today at a glance" image or PDF in minutes.',
      painTitle: 'The problem',
      painBody:
        'Every morning, business asks "what was yesterday\'s GMV?". Data team runs SQL, pulls tables, stitches charts, posts to chat — a daily hour wasted.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local app. Drop in today\'s Excels, pick field mappings (remembered for next time), click "Generate Report", get an image or PDF with headline metrics, trend lines, and day-over-day changes.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Home has three panes: Import / Template / Generate.',
        'Drag multiple Excels at once; auto-detect GMV / Orders / Traffic type (manual override available).',
        'Template is configurable: title, KPIs, chart types (line / bar).',
        'One-click branded report as PNG or PDF, named "daily-YYYY-MM-DD".',
        'Save templates; subsequent days are drag + click.',
      ],
      keywords: ['data', 'daily report', 'automation', 'dashboard', 'KPIs'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('数据 / 运营分析同事', 'zh'),
      goal: '每天把多张业务 Excel（GMV、订单、流量）合并生成"今日业务快报"的图片或 PDF，省掉重复手工活。',
      platform: `- Windows 10/11 桌面应用
- Electron + React + TypeScript
- SheetJS 处理 Excel
- html-to-image 或 puppeteer-core（离线渲染）生成图片 / PDF
- 本地 SQLite 保存模板和映射
- 完全离线，打包成 Windows .exe 安装包`,
      features: `1. 首页三块：
   - 数据导入：拖拽区 + 已识别数据预览。
   - 模板设置：日报标题、品牌色、核心指标顺序、图表类型。
   - 生成日报：一键按钮，预览当前日报效果。
2. 智能识别：
   - 根据表头关键词（GMV / 订单 / PV 等）自动识别数据类型，允许手动修改。
   - 字段映射记住一次，下次自动套用。
3. 日报内容：
   - 顶部：日期 + 公司 Logo 占位（支持上传本地 PNG）。
   - 第一行：核心 KPI 卡片（GMV、订单数、UV、转化率），每张带环比箭头。
   - 中间：近 7 天趋势折线图（软件自己用过去数据画）。
   - 底部：TOP 渠道 / TOP 品类 排行条形图。
4. 输出：
   - 一键导出 PNG（1200x1800，方便发群 / 朋友圈）。
   - 一键导出 PDF（A4 竖版）。
5. 历史记录：保存最近 30 天日报于本地，随时回看。`,
      sampleData: `sample-data/ 中放三个文件：
gmv.xlsx — 列：日期, GMV, 订单数, UV, 转化率（示例：2024-01-15, 128000, 420, 8500, 4.9%）
channel.xlsx — 列：日期, 渠道, GMV, 占比（示例：2024-01-15, 直播, 52000, 40.6%）
category.xlsx — 列：日期, 品类, 销量, 金额（示例：2024-01-15, 护肤, 180, 36000）
每个文件 7 天数据，方便画趋势图。`,
      style: `- 简洁商务：白底、大卡片、轻分隔。
- 品牌色用户自选，避免写死。
- 图表细线、低饱和。
- 字体系统默认，深浅模式跟随系统。`,
      robustness: `- 拖入非 Excel 文件给友好提示。
- 字段映射冲突时弹窗让用户确认。
- 生成失败时给出定位（哪一块出错）。
- 中英数字混排时避免乱码。`,
      deliveryPhases: [
        '摘要需包含导入区、模板区、生成区安排。',
        '分三步：数据导入 + 预览 -> 模板编辑 + 预览 -> 图片 / PDF 导出。',
        '打包 Windows .exe，附 500 字中文使用说明。',
      ],
      acceptanceItems: [
        '□ 双击 .exe 启动，首页三块：导入 / 模板 / 生成',
        '□ 拖入多张 Excel → 自动识别类型 → 预览数据',
        '□ 编辑模板（标题、指标、图表类型）→ 预览日报效果',
        '□ 一键导出 PNG (1200x1800) 和 PDF (A4)',
        '□ 保存模板 → 下次拖文件直接生成',
        '□ 非 Excel 文件、映射冲突 → 友好提示，不闪退',
      ],
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a data / ops-analytics colleague', 'en'),
      goal: 'Merge multiple daily Excel files (GMV, orders, traffic) into a "today at a glance" image or PDF — no more manual daily stitching.',
      platform: `- Windows 10/11 desktop app
- Electron + React + TypeScript
- SheetJS for Excel
- html-to-image or offline puppeteer-core for PNG/PDF rendering
- Local SQLite for templates + mappings
- Fully offline; ship a Windows .exe installer`,
      features: `1. Home has three panes: Import, Template, Generate.
2. Smart detection: infer data kind (GMV / Orders / Traffic) from header keywords; allow manual override. Remember field mapping for future.
3. Report contents:
   - Top: date + logo placeholder (user uploads local PNG).
   - KPI cards with day-over-day arrows.
   - 7-day trend line chart (drawn from stored past data).
   - Bottom: top channels / top categories bar chart.
4. Export:
   - PNG (1200x1800, easy to share).
   - PDF (A4 portrait).
5. Keep last 30 daily reports locally.`,
      style: `- Clean business: white background, large cards, soft dividers.
- User-picked brand color; no hard-coded palette.
- Minimal charts.
- System fonts; follows dark mode.`,
      robustness: `- Friendly message on non-Excel drops.
- Resolve mapping conflicts via a confirmation dialog.
- On render failure, report which block failed.
- Handle mixed CJK + Latin without glyph issues.`,
      deliveryPhases: [
        'Summary should include the three-pane layout.',
        'Phase 1: import + preview. Phase 2: template edit. Phase 3: PNG/PDF export.',
        'Package .exe; 500-word user guide.',
      ],
      acceptanceItems: [
        '☐ Double-click .exe launches; home has three panes: Import / Template / Generate',
        '☐ Drop multiple Excel files → auto-detect types → preview data',
        '☐ Edit template (title, KPIs, chart type) → preview report',
        '☐ One-click export PNG (1200x1800) and PDF (A4)',
        '☐ Save template → next time drag files and generate directly',
        '☐ Non-Excel files, mapping conflicts → friendly message, no crash',
      ],
    }, 'en'),
  },
};
