import type { CaseBundle } from './types';
import { composeCasePrompt } from '@/lib/promptModules';

export const hrOnboardingTracker: CaseBundle = {
  slug: 'hr-onboarding-tracker',
  department: 'hr',
  i18n: {
    zh: {
      title: '新员工入职进度追踪',
      departmentLabel: '人事',
      summary:
        '每位新同事一张卡片，十项入职事务可视化跟进，超期变红。领导问到哪一步了，五秒给出答案。',
      painTitle: '这是什么问题',
      painBody:
        '每周都有几个新同事入职。合同、社保、邮箱、电脑、工牌、培训……信息散在 Excel 和邮件里，常常漏一两项。被问到"小张到哪一步了"时 HR 得翻半天。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地追踪小程序：每个新员工一张卡片，显示十项入职事务完成状态。HR 打勾即可更新；超过预期天数自动变红。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '首页员工列表，按入职日倒序，每张卡片显示进度（X/10）和整体颜色。',
        '点进详情页看十项任务：合同 / 社保 / 邮箱 / 内部账号 / 电脑 / 工牌 / 培训 / 师父 / 一周复盘 / 试用期评估。',
        '勾选完成时弹窗填写经办人和日期。',
        '超期任务自动红色；临近红色前黄色提醒。',
        '支持从 Excel 批量导入新员工。',
        '"本周待办"视图汇总所有红色任务，便于周会使用。',
      ],
      keywords: ['HR', '人事', '入职', '流程', '清单'],
    },
    en: {
      title: 'New Hire Onboarding Tracker',
      departmentLabel: 'HR',
      summary:
        'One card per hire, ten checklist items, red when overdue. Managers get answers in five seconds.',
      painTitle: 'The problem',
      painBody:
        'Every week brings new hires. Contract, benefits, email, laptop, badge, orientation... info scatters across spreadsheets and emails. Things get missed. Status questions take forever.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tracker. One card per hire with ten tasks. HR ticks items off. Overdue items auto-turn red.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Home list sorted by start date; each card shows progress (X/10) and overall color.',
        'Detail view shows ten tasks: contract / benefits / email / internal accounts / laptop / badge / orientation / buddy / week-one retro / probation review.',
        'Ticking a task opens a small popup for completed-by and date.',
        'Overdue tasks auto-red; yellow before that.',
        'Excel bulk import of new hires.',
        'A "weekly follow-up" view aggregates red tasks for the HR meeting.',
      ],
      keywords: ['HR', 'onboarding', 'people ops', 'checklist'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: '你是一名擅长 Windows 桌面软件的资深工程师。请帮我做一个本地运行的 Windows 小工具，使用者是电商公司 HR，关注业务结果和操作体验。',
      goal: '让 HR 一眼看清每个新员工当前入职进度；领导提问 5 秒内回答；漏项降低到零。',
      platform: `- Windows 10/11 桌面应用
- Electron + React + TypeScript
- 本地 SQLite
- 完全离线，打包 Windows .exe 安装包

【数据模型】
员工：姓名、工号（可选）、岗位、部门、入职日、师父、状态（在办 / 完成 / 离职）。
入职任务十项：合同签署、社保公积金、公司邮箱、内部账号、电脑配发、工牌、入职培训、师父分配、一周复盘、试用期评估。每项含完成状态、完成日、经办人、备注。
支持自定义增删任务。`,
      features: `1. 首页员工卡片，按入职日倒序。卡片显示姓名、岗位、入职日、进度（X/10）、整体颜色（红 / 黄 / 绿）。
2. 新建员工：单个或从 Excel 批量导入。
3. 详情页十项任务，勾选弹出经办人 + 备注。
4. 超期自动变红（默认：合同 / 电脑 / 工牌在入职日前完成；其他在入职日后 7 天内。可在设置中调整）。
5. "本周待办"视图，汇总所有红色任务，一键导出 Excel。
6. 隐私：不录入身份证、薪资等敏感信息。
7. 搜索 + 筛选。`,
      style: `- 清新：浅蓝背景，白色卡片，柔和配色。
- 红 / 黄 / 绿三色状态同时用图标区分（✓ / ⏳ / ⚠），色盲友好。
- 深浅模式跟随系统；中英切换。`,
      robustness: `- 数据修改自动快照；支持"恢复到最近备份"。
- Excel 字段错高亮提示。
- 数据库损坏自动修复。`,
      deliveryPhases: [
        '摘要需包含列表页 / 详情页 / 待办视图界面安排。',
        '分三步：新建 + 勾选 -> 批量导入 + 超期染色 -> 待办视图 + 导出。',
        '打包 .exe，500 字中文使用说明。',
      ],
      acceptanceItems: [
        '□ 双击 .exe 启动，首页是员工卡片列表',
        '□ 新建员工 → 详情页十项任务 → 勾选完成 → 弹窗填经办人',
        '□ Excel 批量导入 → 卡片列表显示 → 超期自动变红',
        '□ "本周待办"视图汇总红色任务 → 导出 Excel',
        '□ 空数据、字段错误 → 友好提示，不闪退',
      ],
    }, 'zh'),
    en: composeCasePrompt({
      role: 'You are a senior engineer experienced with Windows desktop apps. Build a local Windows tool for HR at an e-commerce company. The user cares about business outcomes.',
      goal: 'Instant visibility into every new hire\'s onboarding status. Zero missed items. Managers get answers in 5 seconds.',
      platform: `- Windows 10/11 desktop app
- Electron + React + TypeScript
- Local SQLite; offline; Windows .exe installer

[Data Model]
Employee: name, employee id (optional), role, department, start date, buddy, status (In progress / Done / Left).
Ten onboarding tasks: contract, benefits, work email, internal accounts, laptop, badge, orientation, buddy, week-one retro, probation review. Each has status, completed date, completed-by, notes.
Support custom add/remove.`,
      features: `1. Home cards sorted by start date. Card shows name, role, start, progress (X/10), overall color.
2. New hire: single or bulk from Excel.
3. Detail view with ten tasks; ticking opens a small popup for completed-by + notes.
4. Overdue auto-red (default: contract/laptop/badge due by start date; others within 7 days; configurable).
5. "Weekly follow-up" aggregates red tasks; one-click Excel export.
6. Privacy: do not collect IDs or salary.
7. Search + filter.`,
      style: `- Fresh: soft blue background, white cards.
- Red/yellow/green with icons (check/hourglass/warning) for color-blind support.
- Follows system dark mode; bilingual toggle.`,
      robustness: `- Auto-snapshot on change; "restore from backup" available.
- Highlight bad Excel columns.
- Auto-repair DB.`,
      deliveryPhases: [
        'Summary should include list / detail / follow-up screens.',
        'Phase 1: create + tick. Phase 2: bulk import + overdue coloring. Phase 3: follow-up + export.',
        'Package .exe; 500-word user guide.',
      ],
      acceptanceItems: [
        '☐ Double-click .exe launches; home shows employee card list',
        '☐ New hire → detail view ten tasks → tick complete → popup for completed-by',
        '☐ Excel bulk import → card list displays → overdue auto-red',
        '☐ "Weekly follow-up" view aggregates red tasks → export Excel',
        '☐ Empty data, bad columns → friendly message, no crash',
      ],
    }, 'en'),
  },
};
