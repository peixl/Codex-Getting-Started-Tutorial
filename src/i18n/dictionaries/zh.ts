export const zh = {
  meta: {
    siteName: 'Codex 上手指南',
    siteTagline: '懂业务就够了，Codex 帮你把想法做成工具',
    description:
      '写给懂业务的你：从提示词生成到部门案例，把熟悉的流程做成 Windows / macOS 桌面工具。',
    keywords: [
      'Codex',
      'OpenAI Codex',
      'Codex 桌面版',
      'Codex 教程',
      'Codex 提示词',
      '上手指南',
      '懂业务的你',
      'Windows 桌面应用',
      'macOS 桌面应用',
      '电商运营',
      '财务自动化',
      'AI 工作流',
    ],
  },

  nav: {
    home: '首页',
    generator: '提示词',
    guide: '快速上手',
    lessons: '七天上手',
    cookbook: '场景食谱',
    cases: '部门案例',
    tips: '进阶',
    faq: '常见问答',
    tryNow: '开始使用',
    switchLang: '切换语言',
  },

  home: {
    heroEyebrow: '写给懂业务的你',
    heroTitleLine1: '把想法',
    heroTitleHighlight: '变成工具',
    heroTitleLine2: '说给 Codex 听就行',
    heroSubtitle:
      '写下目标和流程，复制到 Codex 桌面版，几分钟后工具就出来了。',
    heroCtaPrimary: '生成你的第一段提示词',
    heroCtaSecondary: '先看看别人做出了什么',
    heroStatsLabel1: '现成案例',
    heroStatsValue1: '90+',
    heroStatsLabel2: '填空就能用',
    heroStatsValue2: '提示词',
    heroStatsLabel3: '只属于你',
    heroStatsValue3: '本机运行',
    heroBadgeWindows: 'Windows 11 · 10',
    heroBadgeMac: 'macOS 可用',

    flowTitle: '三步，把流程变成工具',
    flowSubtitle: '填一下 · 复制 · 运行',
    flowStep1Title: '描述目标和流程',
    flowStep1Body:
      '写清给谁用、输入什么、输出什么。其他选项已预设好。',
    flowStep2Title: '一键复制提示词',
    flowStep2Body:
      '系统拼好整段提示词，你只管复制。',
    flowStep3Title: '粘贴到 Codex 桌面版',
    flowStep3Body:
      'Codex 会自己写代码、自己跑、自己改 bug。窗口弹出来的那一刻，工具就做好了。',

    featuresTitle: '懂业务就够了',
    featuresSubtitle: '说清流程，Codex 负责写代码、跑起来、调 bug。',
    feature1Title: '用大白话描述',
    feature1Body:
      '说清场景、流程、验收标准，技术细节交给 Codex。',
    feature2Title: '填空式提示词',
    feature2Body:
      '平台、界面、存储都是选择题，你只写目标和功能。',
    feature3Title: '现成部门案例',
    feature3Body:
      '财务、运营、客服、人事、物流、采购、市场、法务、数据、行政、产品——每个团队都有可直接照搬的案例。',
    feature4Title: '本地桌面工具',
    feature4Body:
      '双击就能打开：对账、订单清洗、Excel 自动化、文件批处理。',
    feature5Title: '中英双语站点',
    feature5Body:
      '中英文对照，方便和海外同事共享。',
    feature6Title: '先跑起来，再打磨',
    feature6Body:
      '今天先让一个流程跑起来。',

    ctaTitle: '从一个小流程开始',
    ctaBody: '把手上最烦的重复活，交给 Codex 做成工具。',
    ctaButton: '生成提示词',

    caseTeaserTitle: '你的部门可能已有现成案例',
    caseTeaserSubtitle: '挑一个类似场景，改几个字就能用。',
    caseTeaserMore: '浏览全部部门案例',

    trustTitle: '承诺',
    trustLine1: '案例来自真实场景，提示词经过验证。',
    trustLine2: '中英双语，国内打开快。',
    trustLine3: '开源透明。',
  },

  generator: {
    pageTitle: '提示词生成器',
    pageSubtitle:
      '说清目标、输入、输出，其他交给默认项。',

    defaultsHint: '默认项已选好，不改也能用。',

    sectionPlatform: '① 哪种电脑',
    platformWindows: 'Windows 电脑',
    platformMac: 'macOS 电脑',
    platformBoth: 'Windows 和 macOS 都要',
    platformHint: '大多数公司用 Windows，已默认选中。',

    sectionTech: '② 用什么方式做（不确定就选默认）',
    techLabel: '技术方向',
    techHintRecommended: '推荐',
    techOptionElectron: '通用方案（最稳定，资料最多）',
    techOptionTauri: '轻量方案（文件小，启动快）',
    techOptionPyQt: '工具方案（最适合做小工具）',
    techOptionAuto: '让 Codex 自动决定（最省心）',

    sectionUI: '③ 界面风格',
    uiLabel: '风格',
    uiOptionMinimal: '简洁（白底大空间，干净清爽）',
    uiOptionDark: '深色（跟随系统，护眼不刺眼）',
    uiOptionFresh: '清新（浅色底，少量点缀，柔和分隔）',
    uiOptionBusiness: '商务型（信息密集，适合管理后台）',

    sectionData: '④ 数据放在哪里',
    dataLabel: '存储方式',
    dataOptionLocalFile: '本地文件（Excel / CSV，最直观）',
    dataOptionSqlite: '本地小数据库（几万条也跑得顺）',
    dataOptionNone: '不需要保存（用完即走）',

    sectionComplexity: '⑤ 做到什么程度',
    complexityHint: '默认标准版。第一次试手建议选最小可用版。',
    complexityOptionStarter: '最小可用版（先把主流程跑通）',
    complexityOptionStandard: '标准业务版（推荐，可以发给同事用）',
    complexityOptionAdvanced: '团队加强版（带设置、历史记录、错误恢复）',

    sectionGoal: '⑥ 给谁用？解决什么问题？',
    goalLabel: '目标（一两句话）',
    goalPlaceholder:
      '比如：给财务部，每月核对几百张订单和流水要两天，希望缩到一小时。',

    sectionFeatures: '⑦ 希望它能做什么',
    featuresLabel: '功能（一行一条，越具体越好）',
    featuresPlaceholder:
      '- 把订单 Excel 和银行流水 Excel 拖进去\n- 自动按订单号比对，标出对不上的\n- 把差异项导出成一份新 Excel',

    sectionExtras: '⑧ 额外要求（可选）',
    extraOfflineLabel: '离线可用',
    extraOfflineHint: '断网也能正常运行',
    extraBilingualLabel: '中英双语界面',
    extraBilingualHint: '界面语言可切换',
    extraExportLabel: '结果可导出',
    extraExportHint: '保存为文件方便分享',
    extraShortcutLabel: '键盘快捷键',
    extraShortcutHint: '熟练用户操作更快',
    extraAccessibilityLabel: '无障碍支持',
    extraAccessibilityHint: '兼容读屏软件',

    sectionOutput: '这就是你要复制的提示词',
    outputHint:
      '整段复制到 Codex 桌面版，它会先说思路再动手。',
    copyButton: '一键复制',
    copied: '已复制',
    copyFailed: '复制失败，请手动选中',
    copyNextPrompt: '已复制。下一步：Codex 桌面版 → 新建任务 → 粘贴 → 发送。',
    copyNextRecovery: '修复提示词已复制，和错误信息一起发给 Codex。',
    recoveryTitle: '出了问题？复制这段',
    recoveryHint: '启动失败或打包卡住，把这段发给 Codex。',
    recoveryEvidenceLabel: '可选：贴上错误信息',
    recoveryEvidencePlaceholder:
      '终端最后 80 行、弹窗报错、你刚才的操作。复制时会自动带上。',
    recoveryEvidenceHint: '不会上传，只在本地拼入提示词。',
    copyRecoveryButton: '复制修复提示词',
    resetButton: '清空重来',
    langToggle: '切换语言',
    langToggleHint:
      '英文提示词通常更稳，中文也可以。',
    qualityTitle: '复制前自检',
    qualityReady: '信息齐全',
    qualityNeedsInput: '建议补充',
    qualityCoverage: '{passed}/{total} 项已覆盖',
    qualityGoal: '目标',
    qualityFeatures: '功能',
    qualityIo: '输入与输出',
    qualityAcceptance: '验收标准',
    qualityPass: '已填',
    qualityImprove: '待补充',

    quickTemplatesTitle: '不想从零开始？挑个模板',
    quickTemplatesHint: '一键填好，改几个字就能用。',

    validationMissingGoal: '先写一两句目标。',
    validationMissingFeatures: '至少写一条功能。',

    historyTitle: '最近生成的提示词',
    historyEmpty: '暂无记录，仅保存在你的浏览器中。',
    historyLoad: '载入',
    historyDelete: '删除',
    historyClearAll: '全部清空',

    tipCardTitle: '提示',
    tipCardBody:
      '你管业务判断，Codex 管技术。写清给谁用、输入什么、输出什么就够了。',
    promptStep1Title: '选模板',
    promptStep1Body: '不确定就保留默认。',
    promptStep2Title: '写目标和流程',
    promptStep2Body: '输入、处理、输出说清楚。',
    promptStep3Title: '交给 Codex',
    promptStep3Body: '复制粘贴，让它写代码、跑起来、自己验证。',
  },

  guide: {
    pageTitle: '快速上手',
    pageSubtitle:
      '从打开 Codex 到交付一个小工具，只留必要步骤。',

    tocTitle: '目录',

    sec1Title: '第一章 · Codex 是什么',
    sec1P1:
      '把 Codex 想象成会写代码的搭档。你说清目标，它来实现。',
    sec1P2:
      '描述越清楚，第一版越贴近你的想法。',
    sec1P3:
      '本教程只讲桌面工具：Windows / macOS，做完双击就能打开。',

    sec2Title: '第二章 · 需要准备什么',
    sec2Item1Title: '一台 Windows 或 macOS 电脑',
    sec2Item1Body: 'Windows 10/11 或较新的 macOS，内存 8GB 起步，16GB 更从容。',
    sec2Item2Title: '一个 ChatGPT 账号',
    sec2Item2Body: '用 ChatGPT 账号登录即可。',
    sec2Item3Title: 'Codex 桌面版安装包',
    sec2Item3Body: '从 OpenAI 官网下载，双击安装。',
    sec2Item4Title: '不需要技术基础',
    sec2Item4Body: '能讲清流程、能判断结果，就够了。',

    sec3Title: '第三章 · 第一次打开 Codex',
    sec3P1: '首次启动需登录，登录后进入聊天式界面。',
    sec3P2: '左边任务列表，中间对话区，右边文件预览。',
    sec3P3: '记住三个动作：新建任务、贴入提示词、等结果。',

    sec4Title: '第四章 · 核心操作一句话说清',
    sec4Item1Title: '新建任务 = 开一次新对话',
    sec4Item1Body: '一个目标一次对话，别混在一起。',
    sec4Item2Title: '提示词 = 你对 Codex 说的话',
    sec4Item2Body:
      '说清输入、输出和界面长什么样。别只说「做个工具」。',
    sec4Item3Title: '等待 = 让它干活',
    sec4Item3Body:
      '技术细节不用看，只看最后能不能跑。',
    sec4Item4Title: '运行 = 看到你的软件',
    sec4Item4Body: '完成后弹出窗口——那就是你的工具。',
    sec4Item5Title: '不对 = 继续说',
    sec4Item5Body: '哪里不对就直接说，比如「按钮颜色错了」「点导入就闪退」，它会自己改。',

    sec5Title: '第五章 · 写好提示词的五条原则',
    sec5Rule1Title: '1. 说清「给谁用」',
    sec5Rule1Body: '用户是谁，决定界面和流程。',
    sec5Rule2Title: '2. 说清「解决什么问题」',
    sec5Rule2Body: '不只列功能，也说清要消除的麻烦。',
    sec5Rule3Title: '3. 多给例子',
    sec5Rule3Body: '「订单号、金额、日期，按月汇总」比「做个统计」清楚十倍。',
    sec5Rule4Title: '4. 一次只改一件事',
    sec5Rule4Body: '每次只改一处，成功率更高。',
    sec5Rule5Title: '5. 出错别慌',
    sec5Rule5Body: '把错误信息原样复制回去，让它自己看自己改。',

    sec6Title: '第六章 · 常见问题',
    sec6Pit1Title: '问题一 · 软件跑不起来',
    sec6Pit1Body: '复制完整错误信息，问它「怎么修」。',
    sec6Pit2Title: '问题二 · 改来改去越来越乱',
    sec6Pit2Body: '改几次没效果，新开任务重新描述。',
    sec6Pit3Title: '问题三 · 一开始就想做太多',
    sec6Pit3Body: '先做最小版本：导入一张表、显示一列数据。跑通再加功能。',
    sec6Pit4Title: '问题四 · 不知道它在干什么',
    sec6Pit4Body: '直接问：「你现在在做什么？」',

    secStopTitle: '第七章 · 什么时候该停',
    secStopItem1Title: '看到成品就停',
    secStopItem1Body: '能打开、数据能跑完、能导出——先停，别急着加功能。',
    secStopItem2Title: '同一问题别硬修',
    secStopItem2Body: '连改三次没好，让 Codex 降级或关掉边缘功能，保主流程。',
    secStopItem3Title: '新想法放到 v2',
    secStopItem3Body: '「再加一个功能」记到 v2 清单，别让第一版变无底洞。',
    secStopItem4Title: '大改动开新任务',
    secStopItem4Body: '换界面、换技术栈或加大量功能，都开新任务。',

    sec7Title: '第八章 · 分享给同事',
    sec7P1: '让 Codex 打包成 .exe 或 .dmg。',
    sec7P2: '微信、邮件或网盘发给同事，双击安装。',
    sec7P3: '安全软件拦截时，告诉同事「内部工具」允许运行即可。',

    nextStepTitle: '接下来做什么',
    nextStepGenerator: '生成你的第一段提示词',
    nextStepLessons: '七天上手路线',
    nextStepCookbook: '场景食谱',
    nextStepCases: '浏览部门案例',
  },

  tips: {
    pageTitle: '实用技巧',
    pageSubtitle: '这些小习惯帮你少走弯路。',

    tip1Title: '用角色设定让回答更聚焦',
    tip1Body:
      '开头加一句「你是一名桌面应用工程师」。',
    tip2Title: '先要摘要，再动手',
    tip2Body:
      '让它先给 10 行方案摘要，确认后再实现。',
    tip3Title: '给它看真实文件',
    tip3Body:
      '贴 Excel 表头或脱敏样本，比口头描述精准。',
    tip4Title: '学会说「回退」',
    tip4Body:
      '改坏了就说：「回到上一个能跑的版本。」',
    tip5Title: '善用中英互译',
    tip5Body:
      '中文写需求，再让 Codex 翻成英文提示词。',
    tip6Title: '存好用的提示词',
    tip6Body:
      '好用的存备忘录，下次改几个字就能复用。',
    tip7Title: '让它写使用说明',
    tip7Body:
      '工具做好后，让它写一份 500 字内的说明。',
    tip8Title: '要求友好的错误提示',
    tip8Body:
      '「输入有误时弹友好提示，不要崩溃。」',
    tip9Title: '先要验收标准',
    tip9Body:
      '让它先列 3 个场景和验收条件，确认再动手。',
    tip10Title: '改动时先说「不动什么」',
    tip10Body:
      '「B 和 C 不动，只改 A。」',
    tip11Title: '用对比代替抽象描述',
    tip11Body:
      '别说「好看点」，贴截图说「要这种感觉」。',
    tip12Title: '阶段性开新对话',
    tip12Body:
      '一个阶段结束就新开对话，带上最新提示词和可跑版本。',

    pitfallsTitle: '常见误区',
    pitfall1Title: '以为它能读懂没写出来的需求',
    pitfall1Body:
      '没写出来的，它看不到。',
    pitfall2Title: '看到技术细节就慌',
    pitfall2Body:
      '不用管，只看软件最终表现。',
    pitfall3Title: '一次提 20 个需求',
    pitfall3Body:
      '太多容易遗漏，拆几轮效果更好。',
    pitfall4Title: '出错就重来',
    pitfall4Body:
      '错误信息是最好的线索，发回去让它修。',
    pitfall5Title: '跟它讲道理',
    pitfall5Body:
      '直接说要什么结果，不必铺原因。',
    pitfall6Title: '不保存中间版本',
    pitfall6Body:
      '能跑的版本都备份，文件名带日期。',
  },

  faq: {
    pageTitle: '常见问答',
    pageSubtitle: '懂业务的同学最常问的问题。',

    q1: 'Codex 收费吗？',
    a1: '需要订阅 ChatGPT Plus 或更高套餐，价格见 OpenAI 官网。',

    q2: '我只懂业务，能用吗？',
    a2: '可以。你描述流程和验收标准，Codex 负责实现。',

    q3: '做出来能给同事用吗？',
    a3: '可以。让 Codex 打包成 .exe 或 .dmg，发给同事装。',

    q4: '生成的软件安全吗？',
    a4: '本地工具风险较低。涉及敏感数据建议让技术同事审查。',

    q5: '软件很慢怎么办？',
    a5: '告诉 Codex「软件很慢，请优化」，它会自己定位并修复。',

    q6: '能做手机 App 吗？',
    a6: '可以，但本教程只讲桌面应用。',

    q7: '能联网获取数据吗？',
    a7: '可以，建议先从离线工具开始。联网功能让技术同事过一下。',

    q8: '怎么判断结果对不对？',
    a8: '你是验收人——看行为和输出是否符合预期。',

    q9: '能和同事协作吗？',
    a9: '可以。分享提示词或直接发安装包。',

    q10: '出了问题找谁？',
    a10: '先问 Codex。账号或付费问题联系 OpenAI 客服。',

    q11: '普通电脑跑得动吗？',
    a11: '内存 8GB 以上、硬盘留 10GB 就够。',

    q12: 'Codex 会把文件传到网上吗？',
    a12: '只读取你主动给它的文件。敏感数据建议先脱敏。',

    q13: '输出看不懂怎么办？',
    a13: '发这句：「用中文，少术语，五句话讲清下一步，然后继续。」',

    q14: '怎么控制费用？',
    a14: '一次做一件事，跑通后新开对话，复用已有提示词。',

    q15: '做出来能商用吗？',
    a15: '内部使用没问题。对外销售请先确认 OpenAI 条款和开源许可。',

    q16: '别人问「这是你写的吗？」',
    a16: '「我提需求，Codex 写初版，我验收和迭代。」',
  },

  footer: {
    about: '关于',
    aboutBody:
      'Codex 桌面版上手指南。',
    resourcesTitle: '相关资源',
    resourceOpenAI: 'Codex 官网',
    resourceCodexDocs: 'Codex 官方文档',
    resourceGithub: 'GitHub 开源仓库',
    builtWith: '现代前端架构，边缘网络部署，国内访问已优化。',
    copyright: '© 2026 codex.ifq.ai · MIT License',

    languageLabel: '语言',
    contactTitle: '反馈',
    contactBody: '发现问题或想贡献案例？欢迎提 issue。',
  },

  common: {
    back: '返回',
    next: '下一步',
    more: '更多',
    less: '收起',
    loading: '加载中',
    error: '出错了',
  },

  lessons: {
    pageTitle: '七天上手',
    pageSubtitle: '每天 15 分钟，一周做出一个能用的工具。',
    dayLabel: '第 {n} 天',
    startLabel: '开始',
    day1Title: '认识 Codex 桌面版',
    day1Hook: '装好、打开、熟悉界面',
    day1Goals: '安装 Codex · 登录账号 · 认识三个区域',
    day2Title: '做出第一个小工具',
    day2Hook: '跑通一个 Excel 汇总工具',
    day2Goals: '复制教程提示词 · 粘贴到 Codex · 看到窗口弹出',
    day3Title: '把流程描述清楚',
    day3Hook: '描述得越清楚，结果越稳定',
    day3Goals: '定义角色 · 给出示例 · 一次只改一件事',
    day4Title: '让 Codex 自己修问题',
    day4Hook: '出错别慌，让它自己看、自己改',
    day4Goals: '回传错误信息 · 学会回退 · 区分卡住和结果不对',
    day5Title: '用真实数据沟通',
    day5Hook: '给它真实字段，理解更准确',
    day5Goals: '贴 Excel 表头 · 说明字段含义 · 围绕字段做功能',
    day6Title: '打包分享给同事',
    day6Hook: '从「只有你能用」到「整个部门都能用」',
    day6Goals: '打包 .exe / .dmg · 测试安装 · 写使用说明',
    day7Title: '迭代第二版',
    day7Hook: '小改两轮，从「能用」到「好用」',
    day7Goals: '收集反馈 · 一次只修一个问题 · 规划下一个工具',
    recapTitle: '七天后，你能独立做工具了',
    recapBody:
      '安装、提需求、修问题、打包分享——都会了。接下来把重复工作一个个变成工具。',
  },

  cases: {
    pageTitle: '部门案例',
    pageSubtitle:
      '挑一个部门场景，复制提示词，改几个字就能用。',

    filterAll: '全部',
    filterFinance: '财务',
    filterOperations: '运营',
    filterCustomerService: '客服',
    filterHR: '人事',
    filterLogistics: '物流',
    filterProcurement: '采购',
    filterMarketing: '市场',
    filterLegal: '法务',
    filterData: '数据',
    filterAdmin: '行政',
    filterProduct: '产品',

    readCase: '查看案例',
    copyPrompt: '复制提示词',
    copyPromptZh: '复制中文提示词',
    copyPromptEn: '复制英文提示词',
    copied: '已复制',

    sectionPain: '要解决的问题',
    sectionSolution: '解决方案',
    sectionExpected: '预期效果',
    sampleFieldsTitle: '示例输入字段',
    sampleFieldsHint: '复制前把 Excel / CSV 表头改成这些字段名，或把真实表头一起贴给 Codex。',
    sectionPrompt: '可直接复制的提示词',
    sectionAfter: '复制之后',
    after1: '打开 Codex 桌面版，新建任务',
    after2: '整段粘贴到对话框，发送',
    after3: '让 Codex 实现并验证，再按需调整',

    backToCases: '返回案例列表',
    tryInGenerator: '在生成器中自定义',
    relatedCases: '同部门其他案例',
    windowsBadge: 'Windows 应用',
  },

  cookbook: {
    pageTitle: '场景食谱',
    pageSubtitle:
      '常见小需求，每个附带可复制的提示词。涵盖办公、数据清洗和电商场景。',
    copyRecipe: '复制提示词',
    recipeAfter: '粘贴到 Codex，跟着步骤做',
  },
} as const;
