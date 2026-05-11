import type { CaseBundle } from './types';

export const productFeedbackInbox: CaseBundle = {
  slug: 'product-feedback-inbox',
  department: 'product',
  i18n: {
    zh: {
      title: '产品反馈收件箱',
      departmentLabel: '产品',
      summary:
        '把散在微信、邮件、脑图、客服工单里的用户反馈集中到一处，自动打标签、分优先级，每周规划会之前一眼看清该做什么。',
      painTitle: '这是什么问题',
      painBody:
        '产品同事每周要整理上百条反馈。微信一条、工单一条、销售转来一条……最后都变成一堆贴满屁股的便利贴。规划会之前总要熬夜整理。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地的反馈收件箱：每条反馈一张卡片，含来源、原文、用户类型。软件按关键词自动打标签（性能 / 体验 / Bug / 新功能…）和优先级（高 / 中 / 低）。规划会前一键导出分组清单。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '首页是反馈卡片瀑布流，可按标签筛选、按日期排序、按热度排序（命中次数）。',
        '新增反馈：手动输入或粘贴多条（一行一条）。自动根据关键词打初步标签。',
        '合并功能：把相似反馈合并成一条，保留原始来源记录。',
        '优先级矩阵视图：横轴影响面，纵轴紧急度。拖拽卡片调整。',
        '一键导出"本周待讨论清单"到 Excel / Markdown，规划会前直接用。',
        '完全本地存储；数据不出电脑。',
      ],
      keywords: ['产品', '反馈', '用户声音', '优先级', '规划'],
    },
    en: {
      title: 'Product Feedback Inbox',
      departmentLabel: 'Product',
      summary:
        'Centralize feedback from chat, email, mindmaps, and support tickets. Auto-tag and prioritize so planning meetings start with clarity, not chaos.',
      painTitle: 'The problem',
      painBody:
        'PMs triage hundreds of feedback notes every week — one from chat, one from support, one forwarded from sales. It ends up as sticky notes on a wall. Planning meeting prep is a late-night job.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local inbox. One card per item with source, raw text, user type. Auto-tag (perf / UX / bug / feature) and assign priority (high / med / low). One click exports a grouped list for planning.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Home feed of feedback cards; filter by tag, sort by date or heat (hit count).',
        'Add: single entry or bulk paste (one per line). Keyword-based auto-tagging.',
        'Merge similar items; source history preserved.',
        'Priority matrix view: impact x urgency; drag to adjust.',
        'One-click export of "this week\'s discussion list" to Excel or Markdown for planning.',
        'Local storage; data never leaves your PC.',
      ],
      keywords: ['product', 'feedback', 'user voice', 'priority', 'roadmap'],
    },
  },
  prompt: {
    zh: `你是一名擅长 Windows 桌面软件的资深工程师。请帮我做一个本地运行的 Windows 小工具，使用者是产品经理，不懂代码也能用。

【目标】
把分散在各处的用户反馈集中起来、自动分类打标、按优先级排序，让每周规划会前不用熬夜整理。

【平台与技术】
- Windows 10/11 桌面应用
- Electron + React + TypeScript
- 本地 SQLite
- 打包成 Windows .exe 安装包
- 完全离线

【数据模型】
反馈卡片：ID、原文、来源（微信 / 邮件 / 工单 / 销售 / 自研测试 / 其他）、用户类型（付费 / 免费 / 内部）、创建时间、标签（多选）、优先级（高 / 中 / 低）、影响面评分（1-5）、紧急度评分（1-5）、状态（待处理 / 已排期 / 已解决 / 不做）、合并来源（数组）。

【核心功能】
1. 首页反馈瀑布流：卡片展示前 150 字 + 标签色块 + 优先级角标 + 来源图标。
2. 筛选：标签多选、来源、用户类型、状态。排序：时间 / 热度（命中次数，多个相似反馈合并后的总数）。
3. 新增：
   - 单条输入：输入框 + 来源 + 用户类型。
   - 批量粘贴：多行文本，每行一条，可以快速录入（可追加自动识别关键词打标签）。
4. 自动打标：根据关键词字典（可由用户编辑）自动识别"性能 / 体验 / Bug / 新功能 / 文案 / 合规"等标签，给出置信度，允许用户在卡片上确认或修改。
5. 合并：选中多张卡片 -> 合并为一张，保留原始来源记录；合并次数计入"热度"。
6. 优先级矩阵视图：横轴影响面 (1-5)、纵轴紧急度 (1-5)。可直接拖拽卡片改分数。
7. 导出：
   - Excel：本周待讨论清单 / 本月汇总。
   - Markdown：规划会可以直接贴入 Notion / 飞书的分组列表。

【界面风格】
- 简洁清新：白底 / 浅灰 / 卡片阴影柔和。
- 标签色块饱和度低，统一体系。
- 深浅模式跟随系统。
- 中英切换。

【稳健性】
- 批量粘贴时对可能的重复项提示。
- 关键词字典可导入 / 导出 JSON，方便跨电脑迁移。
- 数据库损坏自动恢复。

【交付】
1. 先给 10 行以内方案摘要（含首页 / 新增页 / 矩阵页界面安排），然后直接实现、运行和验证。
2. 分三步：反馈录入 + 自动打标 -> 矩阵视图 + 合并 -> 导出（Excel / Markdown）。
3. 打包 .exe，附 500 字中文使用说明。

中文沟通。先给简短方案摘要，然后直接实现、运行和验证。`,
    en: `You are a senior engineer experienced with Windows desktop apps. Build a local Windows tool for a product manager. Non-developer user.

[Goal]
Centralize scattered user feedback, auto-tag and prioritize, so weekly planning starts with a clean list.

[Platform & Stack]
- Windows 10/11 desktop app
- Electron + React + TypeScript
- Local SQLite; offline; ship a Windows .exe installer

[Data Model]
Feedback card: id, body, source (chat / email / ticket / sales / internal / other), user type (paid / free / internal), created, tags (multi), priority (high/med/low), impact (1-5), urgency (1-5), status (open / planned / resolved / wontfix), mergedFrom (array).

[Core Features]
1. Home feed: cards with 150-char snippet, tag chips, priority corner, source icon.
2. Filter by tag (multi) / source / user type / status. Sort by date or heat (merged count).
3. Add: single-entry form with source + user type; bulk paste (one line per item) with keyword-based auto-tagging.
4. Auto-tagging via an editable keyword dictionary — tags like perf / UX / bug / feature / copy / compliance. Show confidence; user confirms or corrects.
5. Merge: select cards -> merge into one; preserve source history; increment heat.
6. Priority matrix: x = impact (1-5), y = urgency (1-5); drag cards to adjust.
7. Export: Excel for weekly list; Markdown groups for pasting into Notion / Feishu.

[Visual Style]
- Minimal fresh: white / light-gray / soft card shadows.
- Desaturated tag colors, a consistent palette.
- Follows system dark mode; bilingual toggle.

[Robustness]
- Flag likely duplicates during bulk paste.
- Keyword dictionary import/export as JSON for cross-machine portability.
- Auto-recover DB from last backup.

[Delivery]
1. Start with a plan summary under 10 lines, then implement, run, and verify. Include the feed, add, matrix screens in the plan.
2. Phase 1: entry + auto-tag. Phase 2: matrix + merge. Phase 3: export.
3. Package .exe; 500-word user guide.

Start with a brief plan summary, then implement, run, and verify.`,
  },
};
