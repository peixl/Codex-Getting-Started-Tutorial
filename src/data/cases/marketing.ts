import type { CaseBundle } from './types';
import { composeCasePrompt } from '@/lib/promptModules';

export const marketingCampaignAnalyzer: CaseBundle = {
  slug: 'marketing-campaign-roi-viewer',
  department: 'marketing',
  i18n: {
    zh: {
      title: '投放 ROI 每日速查',
      departmentLabel: '市场',
      summary:
        '把每天各渠道的投放花费和成单数据贴进去，自动算出每个渠道的 ROI 和本周趋势，不用等数据同学排期。',
      painTitle: '这是什么问题',
      painBody:
        '市场投放每天要看各渠道 ROI、花费占比、成本趋势。数据在不同后台，汇总一次要半天，等数据同学又排队。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个小工具：每天把各渠道的「花费 / 曝光 / 成单 / 销售额」按标准 Excel 粘一次，软件自动算 ROI、CPA、本周趋势，生成一张日报卡。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '首页卡片展示"今日整体花费 / 销售额 / ROI"，三个大数字一目了然。',
        '下方按渠道列出每日详情：花费、成单、ROI、与前一天对比。',
        '支持从 Excel 批量导入，按日期汇总。',
        '一键生成"本周日报"（PDF 或图片），可以直接发到群里。',
        '全部本地运行，数据不会流到外部平台。',
      ],
      keywords: ['市场', '投放', 'ROI', '日报', '渠道分析'],
    },
    en: {
      title: 'Daily Campaign ROI Dashboard',
      departmentLabel: 'Marketing',
      summary:
        'Paste daily spend and conversions. The tool computes ROI and weekly trends per channel. No more waiting on data engineers.',
      painTitle: 'The problem',
      painBody:
        'Marketers track channel ROI, spend share, and cost trends daily. Data lives in separate consoles, consolidation takes hours, and data teams are always booked.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A small tool. Paste daily "spend / impressions / orders / revenue" per channel into a standard Excel. The tool computes ROI, CPA, weekly trend, and generates a daily report card.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Top cards: today\'s total spend / revenue / ROI in big numbers.',
        'Per-channel detail table below: spend, orders, ROI, delta vs yesterday.',
        'Bulk import from Excel, auto-aggregated by date.',
        'One-click "weekly report" as PDF or image, ready to drop into chat.',
        'Runs locally; nothing leaves your PC.',
      ],
      keywords: ['marketing', 'ROI', 'campaign', 'daily report', 'channel analytics'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: '你是一名擅长 Windows 桌面软件的资深工程师。请帮我做一个本地运行的 Windows 小工具，使用者是电商公司市场部负责投放的同事，不懂代码。',
      goal: '每天把各渠道的投放数据（花费、成单、销售额）录入一次，自动计算 ROI / CPA / 趋势，并生成可分享的每周日报。',
      platform: `- Windows 10/11 桌面应用
- Electron + React + TypeScript
- 本地 SQLite 存历史数据
- SheetJS 处理 Excel
- PDF 输出用成熟的本地库（如 pdf-lib）
- 完全离线，打包成 Windows .exe 安装包`,
      features: `1. 首页三张大卡片：今日整体花费 / 销售额 / ROI，并显示较昨日的涨跌。
2. 第二区：今日各渠道详情（表格）。列：渠道、花费、曝光、点击、成单、销售额、ROI、CPA、与昨日对比（百分比，红涨绿跌）。
3. 数据录入：
   - 表单方式快速录入当日数据（日期 + 渠道 + 指标）。
   - Excel 批量导入。导入模板包含：日期 / 渠道 / 花费 / 曝光 / 点击 / 成单 / 销售额。
4. 周报生成：选择本周范围，一键生成 PDF 或 PNG 日报。内容包括：
   - 本周整体 ROI / 总花费 / 总销售额
   - 按渠道分布的横条图
   - 每日 ROI 走势折线图
   - 前三强渠道 / 后三弱渠道（文字点评位由 Codex 生成，但避免夸张）
5. 数据全部本地 SQLite。支持按日期 / 渠道筛选。`,
      style: `- 简洁商务：白底、大数字、分块卡片。
- 强调排版节奏：大标题、次级标题、数字三个层级清晰。
- 图表使用细线、低饱和色，避免花哨。
- 中英字体跟随系统（Segoe UI / 微软雅黑）。`,
      robustness: `- 空数据给空状态图和引导。
- PDF 导出失败给友好提示并回退到 PNG。
- 数据异常（如 ROI 为空）不应导致白屏，显示"暂无数据"。`,
      deliveryPhases: [
        '摘要需包含首页、录入页、周报页安排。',
        '分三步：首页 + 录入 -> Excel 导入 -> 周报导出。',
        '打包 Windows .exe，写 500 字内使用说明。',
      ],
      acceptanceItems: [
        '□ 双击 .exe 启动，首页三张大卡片：花费 / 销售额 / ROI',
        '□ 录入当日数据 → 表格显示各渠道详情 → 自动算 ROI/CPA',
        '□ Excel 批量导入 → 按日期汇总显示',
        '□ 生成周报 PDF/PNG → 可直接发群',
        '□ 空数据、PDF 失败 → 友好提示，不闪退',
      ],
    }, 'zh'),
    en: composeCasePrompt({
      role: 'You are a senior engineer experienced with Windows desktop apps. Build a local Windows tool for a marketing team at an e-commerce company. User is a non-developer.',
      goal: 'Enter daily channel campaign data (spend, orders, revenue) once, auto-compute ROI / CPA / trends, and generate a weekly report that can be shared.',
      platform: `- Windows 10/11 desktop app
- Electron + React + TypeScript
- Local SQLite for history
- SheetJS for Excel; pdf-lib for PDF export
- Fully offline; ship a Windows .exe installer`,
      features: `1. Home: three big cards — today's total spend / revenue / ROI — with deltas vs yesterday.
2. Per-channel detail table: channel, spend, impressions, clicks, orders, revenue, ROI, CPA, delta vs yesterday (% up/down).
3. Data entry:
   - Quick form for a single day's entry per channel.
   - Bulk Excel import with template: Date / Channel / Spend / Impressions / Clicks / Orders / Revenue.
4. Weekly report: pick a week, generate a PDF or PNG with:
   - Weekly total ROI / spend / revenue
   - Horizontal bars for channel distribution
   - Daily ROI line chart
   - Top 3 / bottom 3 channels (Codex-generated captions, neutral tone)
5. SQLite; filter by date and channel.`,
      style: `- Clean business look: white background, large numerals, block cards.
- Strong typographic hierarchy: title / subtitle / numerals in three clear tiers.
- Minimal charts — thin strokes, muted colors.
- Segoe UI / Microsoft YaHei from the system.`,
      robustness: `- Empty states everywhere.
- PDF failure falls back to PNG with a friendly message.
- Don't white-screen on missing fields; show "no data".`,
      deliveryPhases: [
        'Summary should include the home, entry, report screens.',
        'Phase 1: home + entry. Phase 2: Excel import. Phase 3: weekly report export.',
        'Package .exe; write a 500-word user guide.',
      ],
      acceptanceItems: [
        '☐ Double-click .exe launches; home shows three big cards: spend / revenue / ROI',
        '☐ Enter daily data → table shows per-channel detail → auto-computes ROI/CPA',
        '☐ Excel bulk import → aggregated by date',
        '☐ Generate weekly report PDF/PNG → shareable',
        '☐ Empty data, PDF failure → friendly message, no crash',
      ],
    }, 'en'),
  },
};
