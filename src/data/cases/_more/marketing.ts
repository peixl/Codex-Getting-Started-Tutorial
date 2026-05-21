import type { CaseBundle } from '../types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

export const marketingContentCalendar: CaseBundle = {
  slug: 'marketing-content-calendar',
  department: 'marketing',
  i18n: {
    zh: {
      title: '内容发布日历',
      departmentLabel: '市场',
      summary:
        '把公众号、视频号、小红书、抖音这些渠道的发布计划放一张本地日历里，谁负责、什么时候发一目了然。',
      painTitle: '这是什么问题',
      painBody:
        '渠道多、负责人多、节奏不一致；周一开会大家都说"我下周发"，结果撞了选题或漏了节点。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地日历：横轴是日期，纵轴是渠道，每个格子是一篇内容卡片（选题、负责人、状态）。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '月历视图，每个日期下按渠道显示卡片。',
        '卡片：选题、负责人、状态（草稿 / 待审 / 已发），点开可补充链接、文案。',
        '同一周同一选题撞车时高亮提醒。',
        '导出"本周/本月内容计划"给老板看。',
      ],
      keywords: ['内容', '排期', '市场', '社媒'],
    },
    en: {
      title: 'Content Publishing Calendar',
      departmentLabel: 'Marketing',
      summary:
        'A local calendar across all your channels — owners, statuses, and dates side by side.',
      painTitle: 'The problem',
      painBody:
        'Too many channels, owners, and rhythms. Mondays bring vague "I\'ll post next week" — leading to clashing topics or missed dates.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local calendar: dates as columns under channel rows; one card per planned piece (topic, owner, status).',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Month view; each date shows per-channel cards.',
        'Card: topic, owner, status (draft / review / live); open for links + copy.',
        'Same topic in the same week flags as conflict.',
        'Export week/month plan for the boss.',
      ],
      keywords: ['content', 'calendar', 'marketing', 'social'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('市场内容负责人', 'zh'),
      goal: '把多渠道内容计划集中到一张本地日历，团队节奏对齐。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 月历主视图：横向 31 列日期，纵向 N 行渠道（公众号 / 视频号 / 小红书 / 抖音 / 微博 / 知乎 + 自定义）。\n2. 每格点击新建内容卡：选题、负责人、状态、链接、备注；状态颜色化。\n3. 跨渠道选题撞车检测：同周相似选题（关键字匹配）-> 顶部"撞车提醒"卡片。\n4. 切换日历视图 / 列表视图 / 看板视图。\n5. "本周计划"导出 Markdown，按渠道列出卡片。',
      deliveryPhases: ['搭建 Electron 框架，实现月历网格和渠道行布局。', '完成内容卡片、撞车检测和多视图切换功能。', '实现本周计划导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 月历视图按日期×渠道显示内容卡', '□ 同周相似选题撞车时高亮提醒', '□ 导出本周计划 Markdown 按渠道分组', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a content marketing lead', 'en'),
      goal: 'Centralize multi-channel content plans on one local calendar; align team rhythm.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Month grid: 31 date columns × N channel rows (WeChat / Video / Xiaohongshu / Douyin / Weibo / Zhihu + custom).\n2. Click a cell to create a card (topic, owner, status, link, notes); statuses colored.\n3. Conflict detection: similar topics same week (keyword match) -> top "Conflict" card.\n4. Switch between calendar / list / kanban view.\n5. Export weekly plan as Markdown by channel.',
      deliveryPhases: ['Scaffold Electron shell, implement month grid and channel row layout.', 'Complete content cards, conflict detection, and multi-view toggle features.', 'Add weekly plan export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Month view displays content cards by date×channel', '☐ Similar topics in same week flag as conflict', '☐ Weekly plan Markdown export grouped by channel', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const marketingKOLTracker: CaseBundle = {
  slug: 'marketing-kol-collab-tracker',
  department: 'marketing',
  i18n: {
    zh: {
      title: '达人合作跟进表',
      departmentLabel: '市场',
      summary:
        '把每一位合作达人的"对接 → 寄样 → 拍摄 → 发布 → 复盘"做成一张本地表，节奏不乱。',
      painTitle: '这是什么问题',
      painBody:
        '同时和 30 个达人对接，每个进度不一样：有的还没寄样，有的拍完没发，全靠脑子记容易掉链子。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地表格：每位达人一行，五个节点，每个节点有日期；超期变红。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '达人列表：昵称、平台、粉丝量、合作金额、当前节点、负责人。',
        '五节点圆点条：对接 → 寄样 → 收样 → 发布 → 复盘。',
        '每个节点超过自定义天数没推进 -> 红点 + 顶部"待催"卡片。',
        '导出本月合作明细给老板看。',
      ],
      keywords: ['达人', 'KOL', '市场', '合作'],
    },
    en: {
      title: 'KOL Collaboration Tracker',
      departmentLabel: 'Marketing',
      summary:
        'One row per creator across "outreach → sample sent → shoot → published → retro" with auto overdue flags.',
      painTitle: 'The problem',
      painBody:
        'Thirty creators in parallel — some haven\'t got samples, some shot but not posted. Memory fails.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local sheet: one row per creator, five status dots, dates per step, red on overdue.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Creator list: handle, platform, followers, fee, current step, owner.',
        'Five-dot status bar inline.',
        'Step stuck > N days = red and shown in top "Nudge" card.',
        'Export monthly collab Excel for the boss.',
      ],
      keywords: ['kol', 'creator', 'marketing', 'tracker'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('市场达人合作负责人', 'zh'),
      goal: '让每位达人的合作进度都有据可查，不再卡在"我以为已经发了"。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 达人列表字段：昵称、平台、粉丝量、合作金额、对接人、当前节点、最近更新日、备注。\n2. 五节点圆点：对接 / 寄样 / 收样 / 发布 / 复盘；点击切换并自动写入日期。\n3. 节点超期规则可设（默认：对接 3 天 / 寄样 5 天 / 收样 7 天 / 发布 7 天 / 复盘 7 天）。\n4. 顶部"待催"卡片：所有红点条目分组。\n5. 详情抽屉：写笔记、贴成片链接、记录数据快照（点赞 / 评论 / 销量），方便复盘。\n6. Excel 导入新一批达人；导出本月明细。',
      deliveryPhases: ['搭建 Electron 框架，实现达人列表和五节点圆点条。', '完成超期规则、待催卡片和详情抽屉功能。', '实现 Excel 导入和明细导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 达人列表可增删改，五节点圆点可切换', '□ 超期规则自动标红并加入待催卡片', '□ 导出本月明细数据完整', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a KOL collab lead', 'en'),
      goal: 'Make every creator collab\'s progress auditable; stop the "I thought it was posted" trap.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Creator list: handle, platform, followers, fee, owner, current step, last update, notes.\n2. Five-dot bar: outreach / sample sent / sample received / published / retro; clicks set date.\n3. Overdue rules editable per step (default 3 / 5 / 7 / 7 / 7 days).\n4. Top "Nudge" card groups all red items.\n5. Detail drawer: notes, links to published content, metric snapshots (likes / comments / sales) for retros.\n6. Excel import; monthly export.',
      deliveryPhases: ['Scaffold Electron shell, implement creator list and five-dot status bar.', 'Complete overdue rules, nudge card, and detail drawer features.', 'Add Excel import and monthly export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Creator list supports CRUD; five dots can be toggled', '☐ Overdue rules auto-highlight red and add to nudge card', '☐ Monthly export data is complete', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Legal ----------

export const marketingEventChecklist: CaseBundle = {
  slug: 'marketing-event-checklist',
  department: 'marketing',
  i18n: {
    zh: {
      title: '线下活动筹备清单',
      departmentLabel: '市场',
      summary:
        '把线下活动从立项到复盘的几十件事拆成可勾选的清单，按倒计时排好。',
      painTitle: '这是什么问题',
      painBody:
        '一场线下活动几十件事，谁负责、什么时候做、做完没有，全靠脑子记，活动当天总有遗漏。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：内置一个"线下活动通用清单"，按活动日期倒推每件事的截止日，谁负责、状态、备注一栏看全。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '新建活动：填活动名、日期、规模，自动生成 40+ 项任务清单。',
        '每项任务：截止日（按 D-X 自动算）、负责人、状态、备注。',
        '主视图按"今天 / 三天内 / 一周内 / 已完成"分组。',
        '活动结束后一键生成"复盘清单"Markdown：哪些没做完、哪些值得保留。',
      ],
      keywords: ['活动', '线下', '清单', '市场'],
    },
    en: {
      title: 'Offline Event Checklist',
      departmentLabel: 'Marketing',
      summary:
        'Break a live event from kickoff to retro into a tickable checklist, scheduled by countdown.',
      painTitle: 'The problem',
      painBody:
        'A live event has dozens of moving parts. Who, when, done? — all in your head, and something always slips on the day.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool: a built-in "generic live-event checklist" auto-schedules each task back from event day, with owner, status, and notes.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'New event: name, date, scale → auto-generates 40+ task checklist.',
        'Each task: due date (D-X auto), owner, status, notes.',
        'Main view grouped: Today / Within 3 days / Within a week / Done.',
        'Post-event one-click retro checklist Markdown: what slipped, what to keep.',
      ],
      keywords: ['event', 'offline', 'checklist', 'marketing'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole('市场同事', 'zh'),
      goal: '让一场线下活动的所有筹备事项都按时间线井井有条，活动当天不慌。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: `1. 新建活动：名称、日期、规模（小型 < 50 / 中型 50–200 / 大型 > 200）；自动生成默认任务清单（40+ 项，按 D-30 / D-14 / D-7 / D-3 / D-1 / D 当日 / D+3 复盘 分桶）。
2. 任务字段：截止日（D-X 自动计算）、负责人、状态（未开始 / 进行中 / 完成 / 跳过）、备注、附件链接。
3. 主视图：按"今天 / 三天内 / 一周内 / 已完成"分组；可按负责人筛选。
4. 默认任务模板可在"模板"页里改；下次新活动自动用最新模板。
5. 活动结束后一键生成"复盘 Markdown"：哪些任务超时、跳过原因、值得沉淀进模板的新经验。`,
      deliveryPhases: ['搭建 Electron 框架，实现活动创建和默认任务清单生成。', '完成任务管理、分组视图和模板编辑功能。', '实现复盘生成、导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 新建活动自动生成 40+ 项任务清单', '□ 任务按"今天 / 三天内 / 一周内 / 已完成"分组显示正确', '□ 模板可编辑，下次活动自动使用', '□ 复盘 Markdown 导出含超时任务和跳过原因'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a marketing teammate', 'en'),
      goal: 'Make every prep task for a live event ordered by timeline so the day-of is calm.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: `1. New event: name, date, scale (small < 50 / medium 50–200 / large > 200) → auto-generates a 40+ task default checklist bucketed D-30 / D-14 / D-7 / D-3 / D-1 / Day-of / D+3 retro.
2. Task fields: due date (D-X auto), owner, status (not started / doing / done / skipped), notes, attachment link.
3. Main view: groups Today / Within 3 days / Within a week / Done; filter by owner.
4. Editable task template page; next event uses the latest template.
5. Post-event one-click retro Markdown: which tasks slipped, why skipped, what to bake into the template.`,
      deliveryPhases: ['Scaffold Electron shell, implement event creation and default checklist generation.', 'Complete task management, grouped views, and template editing.', 'Add retro generation, export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ New event auto-generates 40+ task checklist', '☐ Tasks grouped correctly: Today / 3 days / 1 week / Done', '☐ Template is editable; next event uses latest', '☐ Retro Markdown export includes slipped tasks and skip reasons'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const marketingLiveRoomRunOfShow: CaseBundle = {
  slug: 'marketing-live-room-run-of-show',
  department: 'marketing',
  i18n: {
    zh: {
      title: '直播间排品与话术节奏表',
      departmentLabel: '市场',
      summary:
        '把直播商品、价格、库存、卖点、主播话术和时间节奏放进一张可执行排班表。',
      painTitle: '这是什么问题',
      painBody:
        '直播前商品多、价格多、库存和话术反复改，最后主播、场控、运营拿的版本不一致。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地直播排品表：导入商品清单，按时间段排品，自动生成主播卡片和场控提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '直播排期时间轴：每 5/10/15 分钟一个坑位。',
        '每个商品卡含价格、库存、利益点、禁说词、赠品。',
        '一键导出主播版、场控版、运营复盘版。',
        '直播中可标记实际上架时间和异常。',
      ],
      keywords: ['直播', '排品', '话术', '投放', '市场'],
    },
    en: {
      title: 'Live Room Run-of-Show Planner',
      departmentLabel: 'Marketing',
      summary:
        'Put live products, prices, stock, selling points, host wording, and timing into one executable run sheet.',
      painTitle: 'The problem',
      painBody:
        'Before a livestream, product order, prices, stock, and scripts change constantly. Host, control desk, and ops often hold different versions.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local live run-of-show planner: import product list, arrange slots by time, auto-generate host cards and control-desk reminders.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Timeline with 5/10/15-minute product slots.',
        'Product card includes price, stock, benefits, forbidden words, gifts.',
        'Export host version, control-desk version, and ops recap version.',
        'During live, mark actual on-air time and exceptions.',
      ],
      keywords: ['live commerce', 'run of show', 'script', 'marketing'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole('直播运营同事', 'zh'),
      goal: '把直播排品、主播话术、场控提醒和复盘记录集中管理，避免多人拿错版本。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite；Excel 导入导出',
      features: `1. 导入商品清单：SKU、商品名、价格、库存、卖点、赠品、佣金、禁说词、链接。
2. 时间轴排品：选择直播开始/结束时间，按 5/10/15 分钟坑位拖拽商品。
3. 商品卡片：主播话术、场控提醒、价格口播、库存预警、禁说词提醒。
4. 导出三版：主播版（话术为主）、场控版（时间和链接为主）、运营版（价格库存和备注完整）。
5. 直播中记录实际开始时间、是否跳过、异常原因；直播后导出复盘表。`,
      deliveryPhases: ['搭建 Electron 框架，实现商品清单导入和时间轴排品。', '完成商品卡片、主播话术和场控提醒功能。', '实现三版导出和复盘记录，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 商品清单导入正常，时间轴拖拽排品流畅', '□ 商品卡片显示话术、禁说词、库存预警', '□ 三版导出内容差异化正确', '□ 复盘表导出含实际时间和异常记录'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a livestream operations teammate', 'en'),
      goal: 'Manage livestream product order, host scripts, control-desk reminders, and recap records in one place so no one uses the wrong version.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite; Excel import/export',
      features: `1. Import product list: SKU, name, price, stock, selling points, gifts, commission, forbidden words, link.
2. Timeline: choose live start/end time; drag products into 5/10/15-minute slots.
3. Product card: host wording, control-desk reminder, price wording, stock alert, forbidden-word alert.
4. Export three versions: host view, control-desk view, operations view.
5. During live, record actual start time, skipped status, exception reason; after live, export recap sheet.`,
      deliveryPhases: ['Scaffold Electron shell, implement product list import and timeline scheduling.', 'Complete product card, host wording, and control-desk reminder features.', 'Add three-version export and recap recording, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Product list imports; timeline drag-to-place is smooth', '☐ Product card shows wording, forbidden words, stock alerts', '☐ Three export versions differ correctly', '☐ Recap sheet export includes actual times and exceptions'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};
