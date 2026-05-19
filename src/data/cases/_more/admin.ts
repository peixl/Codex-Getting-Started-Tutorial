import type { CaseBundle } from '../types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

export const adminVisitorLog: CaseBundle = {
  slug: 'admin-visitor-log',
  department: 'admin',
  i18n: {
    zh: {
      title: '访客登记小助手',
      departmentLabel: '行政',
      summary:
        '前台访客登记从纸质表换成本地小程序：姓名、单位、被访人、出入时间清清楚楚。',
      painTitle: '这是什么问题',
      painBody:
        '前台用纸质本登记访客，字迹潦草、月底统计困难；老板偶尔要追"上个月谁来过"就要翻一沓本子。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：访客来登记几个字段，自动记录进入时间；离开时一键签退；月报一键导出。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '前台输入框：姓名、单位、电话、被访人、事由 -> 一键签入。',
        '右侧"在场访客"列表实时显示，点条目签出，记录离开时间。',
        '今日 / 本周 / 本月 统计卡片。',
        '按月导出 Excel。',
      ],
      keywords: ['访客', '登记', '行政', '前台'],
    },
    en: {
      title: 'Visitor Log Helper',
      departmentLabel: 'Admin',
      summary:
        'Replace the paper visitor book with a small local app: name, company, host, in/out times — searchable forever.',
      painTitle: 'The problem',
      painBody:
        'Paper visitor logs are illegible and a pain to summarize. "Who visited us last month?" becomes a chore.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local app: a few fields on check-in, auto in-time; one-click check-out; monthly export.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Reception form: name, company, phone, host, purpose -> check-in.',
        'Right pane: live "currently in" list; click to check out.',
        'Today / week / month stats cards.',
        'Export by month to Excel.',
      ],
      keywords: ['visitor', 'log', 'admin', 'reception'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('公司前台/行政', 'zh'),
      goal: '让访客登记又快又准，月度统计一键搞定。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 主界面左侧"新增访客"表单：姓名、单位、电话、被访人（下拉，员工列表）、事由（下拉，可改）、备注；提交后右侧"在场"列表新增条目并记进入时间。\n2. "在场"列表每行有"签出"按钮，点击记离开时间，移到"今日记录"。\n3. 顶部统计卡片：今日访客数 / 在场数 / 本周 / 本月。\n4. 历史搜索：按时间段、姓名、单位、被访人。\n5. 员工列表（被访人候选）：本地维护，支持 Excel 导入。\n6. 导出本月访客 Excel。',
      deliveryPhases: ['搭建 Electron 框架，实现核心数据模型和主界面。', '完成主要业务逻辑和交互功能。', '实现导入导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 示例数据跑通主流程，产出可检查的文件/表格', '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退', '□ 导出功能正常，文件名带日期/月份', '□ 路径含中文/空格/括号 → 正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('the company receptionist/admin', 'en'),
      goal: 'Make visitor logging fast and reliable; monthly stats in one click.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. "New visitor" form on the left: name, company, phone, host (dropdown), purpose, notes -> submit creates an "in-house" record with in-time.\n2. "In-house" right list: each row has check-out button -> records out-time and moves to "today".\n3. Top stats: today / in-house / week / month.\n4. History search by date range, name, company, host.\n5. Employee list (host candidates) locally managed; Excel import supported.\n6. Monthly export Excel.',
      deliveryPhases: ['Scaffold Electron shell, implement core data model and main interface.', 'Complete main business logic and interaction features.', 'Add import/export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Sample data completes the main flow, producing a checkable file/sheet', '☐ Empty data, bad format, cancel → friendly message, no crash', '☐ Export works; filename includes date/month', '☐ Paths with Chinese/spaces/parentheses → work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const adminAssetInventory: CaseBundle = {
  slug: 'admin-asset-inventory',
  department: 'admin',
  i18n: {
    zh: {
      title: '办公资产盘点工具',
      departmentLabel: '行政',
      summary:
        '电脑、显示器、椅子、投影仪都登记好，谁在用、放哪儿一查就有。',
      painTitle: '这是什么问题',
      painBody:
        '资产几百件，离职交接、工位调整时容易丢；年底盘点对账经常对不上。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：每件资产一行，记录编号、名称、领用人、位置、状态；离职交接自动产生工单。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '资产列表：编号、类型、品牌型号、领用人、位置、状态。',
        '员工离职 -> 自动生成"待回收"清单。',
        '盘点模式：扫码或手工核对，差异列单独显示。',
        '导出资产明细 Excel；打印每件资产标签。',
      ],
      keywords: ['资产', '盘点', '行政', '台账'],
    },
    en: {
      title: 'Office Asset Inventory',
      departmentLabel: 'Admin',
      summary:
        'Track every laptop, monitor, chair, and projector. Who has it, where it lives, and what state it\'s in.',
      painTitle: 'The problem',
      painBody:
        'Hundreds of assets, churned by offboarding and seat changes. Year-end audits never quite match.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool: one row per asset; offboarding auto-generates a recovery list.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Asset list: id, type, model, holder, location, status.',
        'Offboarding triggers a "to recover" list.',
        'Inventory mode: scan or manual reconcile; diffs flagged.',
        'Export Excel; print per-asset labels.',
      ],
      keywords: ['asset', 'inventory', 'admin'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole('行政/IT 资产管理员', 'zh'),
      goal: '让每件资产都有据可查，离职交接和年度盘点不再手忙脚乱。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 资产列表：编号（自动）、类型（笔记本 / 显示器 / 椅子 / 投影仪 / 其他）、品牌型号、采购日、单价、领用人、位置、状态（在用 / 闲置 / 维修 / 报废）。\n2. "员工离职"操作：选择员工 -> 自动生成"待回收"清单，逐项打勾确认回收/转交。\n3. "盘点"模式：导入物理盘点 Excel，按编号比对，列出差异（找不到 / 多出 / 状态对不上）。\n4. 资产详情：变更历史时间线，每次更换领用人、位置都自动记录。\n5. 导出资产明细 Excel；打印资产标签（含编号 + 二维码占位）。',
      deliveryPhases: ['搭建 Electron 框架，实现核心数据模型和主界面。', '完成主要业务逻辑和交互功能。', '实现导入导出功能，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 示例数据跑通主流程，产出可检查的文件/表格', '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退', '□ 导出功能正常，文件名带日期/月份', '□ 路径含中文/空格/括号 → 正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an admin/IT asset manager', 'en'),
      goal: 'Every asset traceable; offboarding and audits clean.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Asset list: auto-id, type (laptop / monitor / chair / projector / other), model, purchased, price, holder, location, status (in-use / idle / repair / disposed).\n2. "Offboard": pick employee -> generate to-recover list; check off each.\n3. "Audit" mode: import a count Excel; diff by id; flag missing / extra / status mismatch.\n4. Detail: change history timeline (holder, location).\n5. Export Excel; print labels (id + QR placeholder).',
      deliveryPhases: ['Scaffold Electron shell, implement core data model and main interface.', 'Complete main business logic and interaction features.', 'Add import/export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Sample data completes the main flow, producing a checkable file/sheet', '☐ Empty data, bad format, cancel → friendly message, no crash', '☐ Export works; filename includes date/month', '☐ Paths with Chinese/spaces/parentheses → work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Product ----------
