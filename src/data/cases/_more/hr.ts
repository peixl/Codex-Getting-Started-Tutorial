import type { CaseBundle } from '../types';
import { composeCasePrompt, caseRole, COMMUNICATION_ZH, COMMUNICATION_EN } from '@/lib/promptModules';

// Helper to keep extra cases compact. Each bundle still ships a full bilingual
// prompt and copy block so /cases/[slug] pages and AI ingestion stay rich.

// ---------- Finance ----------

export const hrLeaveTracker: CaseBundle = {
  slug: 'hr-leave-balance-tracker',
  department: 'hr',
  i18n: {
    zh: {
      title: '休假与调休余额台账',
      departmentLabel: '人事',
      summary:
        '把每个人的年假、调休、病假余额做成一张本地台账，月底不用再算到崩溃。',
      painTitle: '这是什么问题',
      painBody:
        '请假单分散在 OA、邮件、群里；每月算余额时来回核对，加班、调休、年假混在一起，员工一问 HR 答不上来。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地台账：每人四列余额（年假、调休、病假、事假），录入请假单自动加减；月底一键生成余额表。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '员工列表 + 四种余额；新增请假单选类型、天数自动扣减。',
        '加班录入自动累加调休额度。',
        '余额小于阈值的员工置顶提醒。',
        '导出"本月余额表"、"本人请假明细" Excel。',
      ],
      keywords: ['请假', '调休', '人事', '台账'],
    },
    en: {
      title: 'Leave & TOIL Balance Tracker',
      departmentLabel: 'HR',
      summary:
        'A local ledger for annual leave, TOIL, sick, and personal days. Month-end totals in one click.',
      painTitle: 'The problem',
      painBody:
        'Leave requests scatter across OA, email, and chats. Month-end balance math gets tangled.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local ledger: four balance columns per employee; entering a leave request auto-adjusts; monthly export.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Employee list with four balances; new leave deducts the right one.',
        'Logging overtime adds to TOIL.',
        'Below-threshold balances bubble to the top.',
        'Export monthly balance sheet and per-employee log.',
      ],
      keywords: ['leave', 'TOIL', 'hr', 'ledger'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole(' HR', 'zh'),
      goal: '让请假和调休的余额一直清楚，不靠脑子记。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 员工列表：姓名、部门、入职日、四种余额（年假 / 调休 / 病假 / 事假）。\n2. "新增请假单"：选员工、类型、起止日、备注；保存后自动算工作日并扣减。\n3. "新增加班"：选员工、加班时长，自动按 1:1.5 折算调休加到余额上（系数可改）。\n4. 月度结算页：每人四种余额、本月新增、本月使用、期末余额；一键导出 Excel。\n5. 员工档案抽屉：年度年假按入职年限按规则发放（可改），自动按月或按年初一次性发放。',
      deliveryPhases: ['搭建 Electron 框架，实现员工列表和四种余额数据模型。', '完成请假单、加班录入和自动计算功能。', '实现月度结算和 Excel 导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 员工列表可增删改，余额自动计算', '□ 新增请假单自动扣减正确余额', '□ 加班录入按系数折算调休正确', '□ 月度结算导出 Excel 数据完整'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an HR teammate', 'en'),
      goal: 'Keep leave and TOIL balances always clear without memorizing.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Employee list: name, dept, hire date, four balances (annual / TOIL / sick / personal).\n2. "New leave": pick employee, type, dates, notes; auto-computes working days and deducts.\n3. "Log overtime": pick employee, hours; converted by 1:1.5 (editable) and added to TOIL.\n4. Monthly settlement: per-employee four balances, this-month added/used/ending; export Excel.\n5. Employee drawer: annual leave granted by tenure rule (editable), monthly accrual or year-start lump.',
      deliveryPhases: ['Scaffold Electron shell, implement employee list and four-balance data model.', 'Complete leave request, overtime logging, and auto-calculation features.', 'Add monthly settlement and Excel export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Employee list supports CRUD; balances auto-calculated', '☐ New leave request deducts correct balance', '☐ Overtime logging converts to TOIL correctly', '☐ Monthly settlement Excel export is complete'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

export const hrInterviewSchedule: CaseBundle = {
  slug: 'hr-interview-schedule-board',
  department: 'hr',
  i18n: {
    zh: {
      title: '面试日程统筹看板',
      departmentLabel: '人事',
      summary:
        '把每周的面试安排做成一张本地看板，候选人、面试官、时间不再撞车。',
      painTitle: '这是什么问题',
      painBody:
        '每周几十场面试，邀请、改时间、协调面试官全靠群里和邮件，最怕的就是同一时段两个候选人撞上。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小看板：候选人一行，时间一列，拖拽安排面试官；冲突立刻红色提示。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '本周时间表：行=候选人，列=半小时格，单元格放面试官名。',
        '同一面试官同一时段重复时单元格变红。',
        '点格子可填岗位、面试轮次、备注。',
        '一键导出"本周面试安排表" Markdown / Excel。',
      ],
      keywords: ['面试', '排期', '人事', '看板'],
    },
    en: {
      title: 'Interview Schedule Board',
      departmentLabel: 'HR',
      summary:
        'A local board for weekly interviews. Candidates × time × interviewer with instant conflict warnings.',
      painTitle: 'The problem',
      painBody:
        'Dozens of weekly interviews juggled across chats and emails. Easy to double-book an interviewer.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local board. Candidates as rows, half-hour columns; drop in interviewer; conflicts flash red.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Weekly grid: rows = candidates, columns = 30-min slots.',
        'Same interviewer in two slots = red.',
        'Click a cell to add role, round, notes.',
        'One-click export of the weekly schedule (Markdown / Excel).',
      ],
      keywords: ['interview', 'schedule', 'hr', 'kanban'],
    },
  },
  prompt: {
    zh: composeCasePrompt({
      role: caseRole(' HR 招聘负责人', 'zh'),
      goal: '让一周的面试排期一目了然，避免面试官撞车。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: '1. 候选人池：左侧抽屉可增删候选人（姓名、岗位、HR、备注）。\n2. 主面板：本周时间表（周一到周日，9:00-21:00，30 分钟一格）。\n3. 把候选人卡片拖到对应格子里 -> 弹窗填面试官、轮次、地点、备注。\n4. 冲突检测：同一面试官出现在重叠时段 -> 整行红色提示；同一候选人同一时段被排两次 -> 红色。\n5. 切换"周视图"/"日视图"。\n6. "导出本周安排" -> 一份 Markdown，分日列出候选人、时间、岗位、面试官、地点。',
      deliveryPhases: ['搭建 Electron 框架，实现候选人池和周时间表布局。', '完成拖拽排期、弹窗填写和冲突检测功能。', '实现周/日视图切换和安排导出，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 候选人可增删，拖拽到时间格排期', '□ 冲突检测：同面试官重叠时段标红', '□ 导出本周安排 Markdown 格式正确', '□ 路径含中文/空格时正常工作'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an HR recruiter lead', 'en'),
      goal: 'See the whole week of interviews at a glance and stop double-booking interviewers.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: '1. Candidate pool drawer (name, role, HR, notes).\n2. Main view: this week, Mon–Sun, 9:00–21:00, 30-min cells.\n3. Drag a candidate to a cell -> popup for interviewer / round / location / notes.\n4. Conflicts: same interviewer overlapping slots = red; same candidate twice = red.\n5. Toggle week / day view.\n6. Export this week as Markdown by day with all fields.',
      deliveryPhases: ['Scaffold Electron shell, implement candidate pool and weekly time grid layout.', 'Complete drag-to-schedule, popup form, and conflict detection features.', 'Add week/day view toggle and schedule export, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Candidates can be added and dragged to time slots', '☐ Conflict detection: overlapping slots for same interviewer turn red', '☐ Weekly schedule Markdown export is correct', '☐ Paths with Chinese/spaces/parentheses work correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- Logistics ----------

export const hrBirthdayReminder: CaseBundle = {
  slug: 'hr-birthday-anniversary-reminder',
  department: 'hr',
  i18n: {
    zh: {
      title: '生日 & 入职周年提醒台',
      departmentLabel: '人事',
      summary:
        '把全公司的生日和入职周年集中到一张本地小桌面，提前一周自动提醒。',
      painTitle: '这是什么问题',
      painBody:
        '同事生日、入职周年常常忘记，临时发祝福不真诚。需要提前一周看到名单。',
      solutionTitle: '怎么解决',
      solutionBody:
        '本地小工具：导入员工花名册，自动算下次生日 / 周年的日子，按"今日 / 7 天内 / 本月"分组提醒。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '导入花名册 Excel（姓名 / 部门 / 生日 / 入职日 / 联系方式）。',
        '主视图三栏：今日庆祝、未来 7 天、本月剩余。',
        '每位同事卡片：今年是 X 岁生日 / 入职第 N 年；一键复制定制祝福语模板。',
        '一键导出"本月生日 & 周年"PDF 给行政贴公告板。',
      ],
      keywords: ['生日', '入职周年', '员工关怀', '人事'],
    },
    en: {
      title: 'Birthday & Work Anniversary Console',
      departmentLabel: 'HR',
      summary:
        'Bring everyone\'s birthday and work anniversary onto one local desktop with a week-ahead heads-up.',
      painTitle: 'The problem',
      painBody:
        'Birthdays and work anniversaries quietly slip past; last-minute wishes feel hollow. You need a week\'s lead time.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local tool: import the staff roster, compute the next birthday/anniversary, group by Today / Next 7 days / Rest of month.',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Import roster Excel (name / dept / birthday / hire date / contact).',
        'Three-column view: Today, Next 7 days, Rest of this month.',
        'Per-person card: turning X this year / Year N at company; one-click copy a templated greeting.',
        'One-click "this month\'s birthdays & anniversaries" PDF for admin\'s noticeboard.',
      ],
      keywords: ['birthday', 'anniversary', 'employee', 'hr'],
    },
  },
    prompt: {
    zh: composeCasePrompt({
      role: caseRole(' HR 同事', 'zh'),
      goal: '让每位同事的生日和入职周年都被提前注意到，公司氛围更暖。',
      platform: '- Windows + macOS；Electron + React + TypeScript；本地 SQLite',
      features: `1. 导入花名册 Excel（姓名 / 部门 / 生日 / 入职日 / 联系方式 / 备注）。生日字段允许"只填月日"（隐去年份）。
2. 主视图三栏：今日庆祝、未来 7 天、本月剩余；按部门筛选。
3. 每位同事卡片显示：今年是第 X 岁生日 / 入职第 N 年；可在"祝福语模板"里编辑两套模板（生日 / 周年），点卡片一键复制对应模板。
4. "本月汇总"一键导出 PDF：按日期排序，含姓名 / 部门 / 庆祝事项；行政可直接打印贴公告板。
5. 设置里可勾选"系统通知开启"：每天上午 9 点提醒今日和未来 3 天的庆祝事项。`,
      deliveryPhases: ['搭建 Electron 框架，实现花名册导入和生日/周年计算。', '完成三栏视图、祝福语模板和一键复制功能。', '实现 PDF 导出和系统通知设置，打包 .exe，附使用说明。'],
      acceptanceItems: ['□ 双击启动，第一屏是主工作台', '□ 花名册 Excel 导入正常，生日"只填月日"可识别', '□ 三栏视图按"今日 / 7 天内 / 本月"分组正确', '□ 祝福语模板可编辑，一键复制正常', '□ PDF 本月汇总导出正常'],
      communication: COMMUNICATION_ZH,
    }, 'zh'),
    en: composeCasePrompt({
      role: caseRole('an HR teammate', 'en'),
      goal: 'Surface every teammate\'s birthday and work anniversary in time so the workplace feels warmer.',
      platform: '- Windows + macOS; Electron + React + TypeScript; local SQLite',
      features: `1. Import roster Excel (name / dept / birthday / hire date / contact / notes). Birthday may be month-day only (year hidden).
2. Three-column view: Today, Next 7 days, Rest of this month; filter by department.
3. Per-person card: "turning X this year" / "Year N at the company"; editable greeting templates (birthday / anniversary), one-click copy.
4. "This month" one-click PDF export sorted by date with name / dept / event — admin can print and post.
5. Settings toggle for OS notifications: 9am daily heads-up of today + next 3 days.`,
      deliveryPhases: ['Scaffold Electron shell, implement roster import and birthday/anniversary computation.', 'Complete three-column view, greeting templates, and one-click copy.', 'Add PDF export and notification settings, package .exe with usage guide.'],
      acceptanceItems: ['☐ Launches by double-click; first screen is the workspace', '☐ Roster Excel imports correctly; month-day birthday recognized', '☐ Three-column view groups correctly: Today / 7 days / this month', '☐ Greeting templates editable; one-click copy works', '☐ "This month" PDF export works correctly'],
      communication: COMMUNICATION_EN,
    }, 'en'),
  },
};

// ---------- E-commerce full-chain scenarios ----------
