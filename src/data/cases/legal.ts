import type { CaseBundle } from './types';

export const legalContractTracker: CaseBundle = {
  slug: 'legal-contract-tracker',
  department: 'legal',
  i18n: {
    zh: {
      title: '合同到期与审批跟进台账',
      departmentLabel: '法务',
      summary:
        '把公司所有合同集中登记，到期前自动提醒，未签回、未寄送的一目了然，不会再漏掉续约。',
      painTitle: '这是什么问题',
      painBody:
        '法务同事每天要盯一堆合同：有没有寄出去、对方签回来没、什么时候到期、要不要续签。信息散在邮件、微信、Excel 里，一不小心就漏。',
      solutionTitle: '怎么解决',
      solutionBody:
        '做一个本地台账软件：每份合同一张卡片，记录对方、类型、金额、关键日期、当前状态。到期前 30 天自动红色提醒；长期卡在"待寄送 / 待签回"的单独列出，方便催办。',
      expectedTitle: '做出来是什么样',
      expectedBullets: [
        '首页是合同卡片列表，可按状态筛选：起草中 / 待寄送 / 待签回 / 已生效 / 到期 / 已终止。',
        '每张卡片显示：对方名称、合同类型、金额、签署日、到期日、当前状态。',
        '到期前 30 天自动红色，60 天黄色，其他绿色。',
        '"待办看板"汇总所有需要跟进的合同，便于周会使用。',
        '支持从 Excel 批量导入，导出待办清单到 Excel。',
        '敏感字段（金额、甲方/乙方）支持查看权限开关，避免同事共享屏幕时误读。',
      ],
      keywords: ['法务', '合同', '台账', '续约', '提醒'],
    },
    en: {
      title: 'Contract Lifecycle Tracker',
      departmentLabel: 'Legal',
      summary:
        'Central ledger for every contract. Auto reminders before expiry. Outstanding sends and counter-signatures surface instantly.',
      painTitle: 'The problem',
      painBody:
        'Legal teams track sends, counter-signatures, renewal dates, and terminations across many contracts. Information hides in email, chat, and spreadsheets. Things slip.',
      solutionTitle: 'The solution approach',
      solutionBody:
        'A local ledger. One card per contract: counterparty, type, amount, key dates, status. Auto-red flag 30 days before expiry; a dashboard surfaces anything stuck in "to send" or "awaiting counter-sign".',
      expectedTitle: 'What you will end up with',
      expectedBullets: [
        'Home shows contract cards filterable by status (Drafting / To send / Awaiting signature / Active / Expiring / Terminated).',
        'Each card: counterparty, type, amount, signed date, expiry date, status.',
        'Red 30 days before expiry, yellow at 60 days, green otherwise.',
        'A "follow-up" view aggregates anything needing action — perfect for weekly review.',
        'Bulk import from Excel. Export follow-ups to Excel.',
        'Sensitive fields (amount, counterparties) have a visibility toggle to avoid accidental exposure during screen-sharing.',
      ],
      keywords: ['legal', 'contracts', 'ledger', 'renewal', 'reminders'],
    },
  },
  prompt: {
    zh: `你是一名擅长 Windows 桌面软件的资深工程师。请帮我做一个本地运行的 Windows 小工具，使用者是公司法务同事，不懂代码。

【目标】
把所有合同集中登记、按状态跟进、到期前自动提醒，避免漏签漏催。

【平台与技术】
- Windows 10/11 桌面应用
- Electron + React + TypeScript
- 本地 SQLite
- 打包成 Windows .exe 安装包
- 完全离线

【数据模型】
合同字段：编号（自动）、对方名称、合同类型、金额、币种、签署日、生效日、到期日、续约周期、经办人、当前状态、备注、附件路径（指向本地文件）。

状态：起草中、待寄送、待签回、已生效、到期、已终止。

【核心功能】
1. 首页卡片列表：可按状态筛选；可按到期日排序；每张卡片左侧有状态色块（红黄绿）。
2. 新建 / 编辑合同：表单清晰，必填项标注；"附件"字段支持选本地文件，保存相对路径而非复制。
3. 待办看板：单独一页，汇总所有"待寄送 / 待签回 / 30 天内到期"的合同，便于每周例会使用。
4. 自动提醒规则（可在设置里改）：
   - 到期前 30 天 -> 红色
   - 到期前 60 天 -> 黄色
   - 其他 -> 绿色
5. 导入 / 导出：
   - Excel 批量导入，表头：对方 / 类型 / 金额 / 币种 / 签署日 / 生效日 / 到期日 / 状态 / 备注。
   - 导出待办清单到 Excel，作为法务周会材料。
6. 隐私保护：
   - 敏感字段（金额、对方名称）在列表页可切换"隐藏"按钮，临时遮蔽便于共享屏幕。
   - 不联网，不上传。
7. 搜索 / 筛选：支持关键词搜索合同编号、对方、备注。

【界面风格】
- 业务型：表格清晰、信息密度适中、分隔线柔和。
- 状态色块饱和度低；不用刺眼红。
- 字体系统默认；中英双语可切换。
- 深浅模式跟随系统。

【稳健性】
- 数据库损坏自动恢复到最近备份。
- 表单必填项缺失时友好提示不崩溃。
- 日期错乱（生效日晚于到期日）给出提示。

【交付】
1. 先给项目结构 + 首页 / 编辑页 / 待办看板线框图。
2. 分三步：卡片列表 + 新建 -> 待办看板 + 自动染色 -> 导入导出 + 隐私遮蔽。
3. 打包 .exe，附 500 字内中文使用说明。

全程中文沟通。请从结构 + 线框图开始。`,
    en: `You are a senior engineer experienced with Windows desktop apps. Build a local Windows tool for an in-house legal team. User is a non-developer.

[Goal]
Central ledger for all contracts. Track by status. Auto-remind before expiry. Nothing slips.

[Platform & Stack]
- Windows 10/11 desktop app
- Electron + React + TypeScript
- Local SQLite; offline; ship a Windows .exe installer

[Data Model]
Contract: id (auto), counterparty, type, amount, currency, signed date, effective date, expiry date, renewal cadence, owner, status, notes, attachment path (relative).

Statuses: Drafting, To send, Awaiting signature, Active, Expiring, Terminated.

[Core Features]
1. Home card list: filter by status; sort by expiry; left-edge status color band.
2. Create/edit form with clear required fields. Attachment field picks a local file; store relative path, do not copy.
3. Follow-up board: aggregates To-send, Awaiting-signature, and Expiring-within-30-days — weekly-review ready.
4. Rules (configurable): <=30 days red, <=60 days yellow, else green.
5. Excel import/export. Import headers: Counterparty / Type / Amount / Currency / Signed / Effective / Expiry / Status / Notes. Export follow-ups to Excel.
6. Privacy: toggle hide for sensitive fields (amount, counterparty) in list view. Nothing uploaded.
7. Search by id, counterparty, notes.

[Visual Style]
- Dashboard density with soft dividers.
- Muted status colors — no harsh reds.
- System fonts; bilingual toggle.
- Follows system dark mode.

[Robustness]
- Auto-recover DB from last backup.
- Friendly validation on required fields.
- Catch invalid date ranges with a gentle hint.

[Delivery]
1. Structure + wireframes for list, edit, follow-up board.
2. Phase 1: list + create. Phase 2: follow-up + auto-coloring. Phase 3: import/export + privacy toggle.
3. Package .exe; write a 500-word user guide.

Start with structure and wireframe.`,
  },
};
