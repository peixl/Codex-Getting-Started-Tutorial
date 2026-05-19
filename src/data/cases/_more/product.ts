import type { CaseBundle } from '../types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

export const productPriorityBoard: CaseBundle = {
  slug: 'product-priority-board',
  department: 'product',
  i18n: {
    zh: {
      title: '需求优先级看板',
      departmentLabel: '产品',
      summary:
        '把待办需求按"价值 × 工作量"摆在一张本地二维矩阵里，哪个先做不用再吵。',
      painTitle: '这是什么问题',
      painBody:
        '需求列表越拉越长，谁来都说自己的事最急；按 ICE / RICE 评分的人懒得维护，最后又回到拍脑袋。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小看板：每个需求卡片有价值 / 工作量两个滑块，自动放进四象限，本周怎么排一眼看清。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '四象限矩阵：价值 ↑ / 工作量 →。',
        '需求卡片可拖；价值/工作量打分自动归位。',
        '右上角"先做"象限自动置顶。',
        '导出"本周优先级清单"给老板和开发。',
      ],
      keywords: ['需求', '优先级', '产品', '矩阵'],
    },
    en: {
      title: 'Feature Priority Matrix',
      departmentLabel: 'Product',
      summary:
        'Drop every feature into a local Value × Effort matrix. The "do first" quadrant is obvious.',
      painTitle: 'The problem',
      painBody:
        'Everyone says their feature is urgent. Formal RICE/ICE rotting in a spreadsheet ends back in gut feel.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local 2x2 board. Each card has two sliders; quadrant auto-derived; this week\'s top items always visible.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Quadrant matrix: Value ↑ / Effort →.',
        'Cards drag; sliders snap them to the right quadrant.',
        '"Do first" quadrant pinned on top.',
        'Export weekly priority list for boss + engineering.',
      ],
      keywords: ['priority', 'matrix', 'product', 'planning'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('产品经理', 'zh'),
      goal: '让"哪个需求先做"有依据，而不是会议室里谁声音大。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 需求卡片：标题、来源（业务 / 客户 / 内部 / Bug）、价值（1-5 滑块）、工作量（1-5 滑块）、负责人、备注。\n2. 主视图：2×2 矩阵，X 轴工作量、Y 轴价值；卡片按打分自动定位，可拖动调整。\n3. 顶部"本周先做"卡片：自动列出右上象限（价值高 / 工作量低）。\n4. 列表视图作备选，可按价值、工作量、来源排序、搜索。\n5. 一键导出"本周需求优先级" Markdown，按象限分组。',
      deliveryPhases: ['搭建 Electron 框架，实现核心数据模型和主界面。', '完成主要业务逻辑和交互功能。', '实现导入导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 示例数据跑通主流程，产出可检查的文件/表格', '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退', '□ 导出功能正常，文件名带日期/月份', '□ 路径含中文/空格/括号 → 正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a PM', 'en'),
      goal: 'Make "what to do next" defensible — not the loudest voice in the room.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Feature card: title, source (biz / customer / internal / bug), value slider (1–5), effort slider (1–5), owner, notes.\n2. Main view: 2×2 matrix (X = effort, Y = value); cards auto-place, draggable.\n3. Top "This week\\\'s do-first" card auto-lists the high-value/low-effort quadrant.\n4. List view as a fallback with sort/filter/search.\n5. One-click "weekly priorities" Markdown export by quadrant.',
      deliveryPhases: ['Scaffold Electron shell, implement core data model and main interface.', 'Complete main business logic and interaction features.', 'Add import/export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Sample data completes the main flow, producing a checkable file/sheet', '☐ Empty data, bad format, cancel → friendly message, no crash', '☐ Export works; filename includes date/month', '☐ Paths with Chinese/spaces/parentheses → work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const productBetaTesterTracker: CaseBundle = {
  slug: 'product-beta-tester-tracker',
  department: 'product',
  i18n: {
    zh: {
      title: '内测用户跟进表',
      departmentLabel: '产品',
      summary:
        '把每位内测用户的反馈、最新状态、是否已回访都记在一张本地表里，不漏人。',
      painTitle: '这是什么问题',
      painBody:
        '招了 50 个内测用户后，谁说过什么、谁还在用、谁要被回访全靠脑袋，最后多半流失。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小表：每个用户一行，记录加入日、最新反馈、活跃状态、下次回访日；过期自动提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '内测用户列表：昵称、联系方式、入组日、最新反馈、活跃状态、下次回访日。',
        '14 天没新反馈 -> 自动标"沉默"，建议联系。',
        '反馈记录抽屉：按时间线记录，每条标"已采纳/已修复/待评估"。',
        '导出反馈汇总 Markdown 给产品和设计。',
      ],
      keywords: ['内测', '用户', '反馈', '产品'],
    },
    en: {
      title: 'Beta Tester Tracker',
      departmentLabel: 'Product',
      summary:
        'Track every beta tester\'s feedback, latest status, and next check-in date in one local sheet.',
      painTitle: 'The problem',
      painBody:
        'Recruit 50 testers, then forget who said what. Most quietly churn.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local sheet: one row per tester with feedback log, activity status, next check-in date; nudges on overdue.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Tester list: handle, contact, joined, latest feedback, status, next check-in.',
        '14 days silent -> auto-marked "quiet"; reach-out suggested.',
        'Feedback drawer: timeline; each item tagged "adopted / fixed / to-evaluate".',
        'Export feedback summary Markdown for product + design.',
      ],
      keywords: ['beta', 'tester', 'feedback', 'product'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('产品经理', 'zh'),
      goal: '让每一位内测用户都被持续跟进，反馈被认真分类处理。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 用户列表：昵称、联系方式、来源（朋友 / 招募 / 客户）、入组日、活跃状态、上次反馈日、下次回访日、备注。\n2. 活跃规则（可改）：14 天有反馈 = 活跃；14-30 天 = 沉默；> 30 天 = 流失。\n3. 反馈记录抽屉：按时间线添加反馈，每条带标签（功能建议 / Bug / 体验 / 商务），状态（待评估 / 已采纳 / 已修复 / 不采纳）。\n4. 顶部"今日待回访"卡片：下次回访日 = 今天的全部列出。\n5. 导出"本周反馈汇总" Markdown，按类型分组、按用户加注。',
      deliveryPhases: ['搭建 Electron 框架，实现核心数据模型和主界面。', '完成主要业务逻辑和交互功能。', '实现导入导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 示例数据跑通主流程，产出可检查的文件/表格', '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退', '□ 导出功能正常，文件名带日期/月份', '□ 路径含中文/空格/括号 → 正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('a PM', 'en'),
      goal: 'Every beta tester gets ongoing follow-up; feedback gets categorized and answered.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Tester list: handle, contact, source (friend / recruited / customer), joined, status, last feedback, next check-in, notes.\n2. Editable activity rules: feedback in 14d = active; 14–30d = quiet; > 30d = lost.\n3. Feedback timeline drawer: each item tagged (feature / bug / UX / commercial) with status (to-evaluate / adopted / fixed / declined).\n4. Top "Today\\\'s check-ins" card.\n5. Weekly feedback Markdown export, grouped by type with user notes.',
      deliveryPhases: ['Scaffold Electron shell, implement core data model and main interface.', 'Complete main business logic and interaction features.', 'Add import/export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Sample data completes the main flow, producing a checkable file/sheet', '☐ Empty data, bad format, cancel → friendly message, no crash', '☐ Export works; filename includes date/month', '☐ Paths with Chinese/spaces/parentheses → work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Round-out trio (so cases divide evenly into 2 / 3 / 6 columns) ----------

export const productListingQualityChecker: CaseBundle = {
  slug: 'product-listing-quality-checker',
  department: 'product',
  i18n: {
    zh: {
      title: '商品信息质量巡检台',
      departmentLabel: '产品',
      summary:
        '批量检查标题、卖点、规格、图片、价格和资质是否缺失或冲突，上架前少返工。',
      painTitle: '这是什么问题',
      painBody:
        '商品资料常常标题不统一、规格冲突、图片缺失、资质没传，等上线前才发现很赶。',
      solutionTitle: '怎么解决',
      solutionBody:
        '导入商品资料表和图片清单，按规则检查字段缺失、冲突和风险，并给出补齐清单。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '按 SKU 展示资料完整度分数。',
        '检查标题、类目、规格、价格、库存、图片、卖点、资质。',
        '缺失/冲突/建议优化分层提示。',
        '导出给商品同事的补齐清单。',
      ],
      keywords: ['商品', '上新', '资料', 'SKU', '质检'],
    },
    en: {
      title: 'Listing Quality Checker',
      departmentLabel: 'Product',
      summary:
        'Batch-check titles, selling points, specs, images, prices, and certificates before launch.',
      painTitle: 'The problem',
      painBody:
        'Listing materials often have inconsistent titles, spec conflicts, missing images, or missing certificates, found too late before launch.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'Import product data and image list, run rules for missing fields, conflicts, and risks, then output a fix list.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Completeness score by SKU.',
        'Checks title, category, specs, price, stock, images, selling points, certificates.',
        'Layered hints: missing / conflict / should improve.',
        'Export fix list for merchandising.',
      ],
      keywords: ['listing', 'launch', 'SKU', 'quality'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: '你是一名擅长本地桌面小工具的资深工程师。用户是商品/产品同事，操作要自然易用。',
      goal: '批量检查商品上架资料是否完整、前后一致，减少上线前反复返工。',
      platform: '- Windows + macOS；Electron + React + TypeScript；SheetJS；本地 JSON 规则',
      features: `1. 导入商品资料表、图片清单、资质文件清单。
2. 检查规则：商品名、类目、规格、价格、库存、主图/详情图、卖点、售后说明、资质是否齐全。
3. 冲突检查：规格前后不一致、价格低于成本、库存为 0 仍标记上架、图片数量不足、资质过期。
4. 每个 SKU 生成完整度分数和状态：可上线 / 补齐后上线 / 退回补资料。
5. 导出"商品资料补齐清单.xlsx"，备注列可直接发给商品同事。`,
      deliveryPhases: ['搭建 Electron 框架，实现商品资料和图片清单导入。', '完成检查规则引擎和冲突检测逻辑。', '实现完整度评分和补齐清单导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 商品资料表、图片清单、资质文件清单导入正常', '□ 检查规则覆盖名、类目、规格、价格、库存、图片、资质', '□ 冲突检查正确标红', '□ 导出"商品资料补齐清单.xlsx"正常'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('merchandising/product teammates — the tool should feel natural in their hands, one-click with no setup', 'en'),
      goal: 'Batch-check listing materials for completeness and consistency to reduce last-minute rework before launch.',
      platform: '- Windows + macOS; Electron + React + TypeScript; SheetJS; local JSON rules',
      features: `1. Import product sheet, image list, certificate file list.
2. Check product name, category, specs, price, stock, hero/detail images, selling points, after-sales notes, certificates.
3. Conflict checks: inconsistent specs, price below cost, stock 0 but marked live, insufficient images, expired certificates.
4. Per-SKU completeness score and status: ready / ready after fixes / return for materials.
5. Export "listing-fix-list.xlsx" with notes ready to send to merchandising.`,
      deliveryPhases: ['Scaffold Electron shell, implement product data and image list import.', 'Complete check rule engine and conflict detection logic.', 'Add completeness scoring and fix list export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Product sheet, image list, and certificate list import correctly', '☐ Checks cover name, category, specs, price, stock, images, certificates', '☐ Conflict checks flag correctly', '☐ "listing-fix-list.xlsx" exports correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};
