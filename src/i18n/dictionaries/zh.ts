export const zh = {
  meta: {
    siteName: 'Codex 上手指南',
    siteTagline: '懂业务就够了，Codex 帮你把想法变成桌面工具',
    description:
      '写给懂业务的人的 Codex 桌面版指南：从提示词生成到部门实战案例，帮你做出 Windows / macOS 本地工具。',
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
    heroEyebrow: '写给懂业务的人',
    heroTitleLine1: '把想法',
    heroTitleHighlight: '变成工具',
    heroTitleLine2: '跟 Codex 说清楚就行',
    heroSubtitle:
      '写下目标和流程，复制到 Codex 桌面版。几分钟后，一个能用的本地工具就出来了。',
    heroCtaPrimary: '生成你的第一段提示词',
    heroCtaSecondary: '先看看效果',
    heroStatsLabel1: '现成案例',
    heroStatsValue1: '90+',
    heroStatsLabel2: '填空即生成',
    heroStatsValue2: '提示词',
    heroStatsLabel3: '专属工具',
    heroStatsValue3: '你的电脑',
    heroBadgeWindows: 'Windows 11 · 10',
    heroBadgeMac: 'macOS 可用',

    flowTitle: '三步，从流程到工具',
    flowSubtitle: '填写 · 复制 · 运行',
    flowStep1Title: '描述目标和流程',
    flowStep1Body:
      '写清楚给谁用、输入什么、输出什么。常用选项已经帮你选好。',
    flowStep2Title: '点击「复制提示词」',
    flowStep2Body:
      '系统自动拼装好完整提示词，你只需复制。',
    flowStep3Title: '粘贴到 Codex 桌面版',
    flowStep3Body:
      'Codex 会自动编写、运行、修正和验证。窗口弹出的那一刻，工具就做好了。',

    featuresTitle: '为什么懂业务就够了',
    featuresSubtitle: '不需要会编程，也不需要写命令。',
    feature1Title: '业务语言优先',
    feature1Body:
      '先说场景、流程和验收标准，技术细节交给 Codex。',
    feature2Title: '填空式提示词',
    feature2Body:
      '平台、界面、存储方式都是选择题，你只需要写目标和功能。',
    feature3Title: '现成部门案例',
    feature3Body:
      '财务、运营、客服、人事、物流、采购、市场、法务、数据、行政、产品——每个团队都有可直接使用的案例。',
    feature4Title: '聚焦本地桌面工具',
    feature4Body:
      '核心案例都是「双击就能打开」的本地工具：对账、订单清洗、Excel 自动化、文件批处理。',
    feature5Title: '中英双语对照',
    feature5Body:
      '中文帮你理解，英文直接给 Codex，内容完全一致。',
    feature6Title: '先交付，再打磨',
    feature6Body:
      '今天先让一个真实流程跑起来。',

    ctaTitle: '从一个流程开始',
    ctaBody: '把手头最重复的那件事，交给 Codex 做成工具。',
    ctaButton: '生成提示词',

    caseTeaserTitle: '你的团队已经有现成案例',
    caseTeaserSubtitle: '选一个相近的场景，改几个字就能用。',
    caseTeaserMore: '浏览全部部门案例',

    trustTitle: '内容原则',
    trustLine1: '所有案例来自真实业务场景，提示词经过验证。',
    trustLine2: '中英双语，国内访问流畅。',
    trustLine3: '内容开源，更新透明。',
  },

  generator: {
    pageTitle: '提示词生成器',
    pageSubtitle:
      '写清目标、输入和输出，其余交给默认项。',

    defaultsHint: '默认项已经帮你选好，不改也能直接用。',

    sectionPlatform: '① 做什么平台的软件',
    platformWindows: 'Windows 电脑',
    platformMac: 'macOS 电脑',
    platformBoth: 'Windows 和 macOS 都要',
    platformHint: '大多数公司用 Windows，已默认选中。',

    sectionTech: '② 用什么方式搭建（选个方向就好）',
    techLabel: '技术方向',
    techHintRecommended: '推荐',
    techOptionElectron: '通用方案（最稳定，社区资源最丰富）',
    techOptionTauri: '轻量方案（体积小，启动快）',
    techOptionPyQt: '工具方案（适合快速搭建小工具）',
    techOptionAuto: '让 Codex 自动选择（推荐）',

    sectionUI: '③ 界面风格',
    uiLabel: '外观',
    uiOptionMinimal: '简洁（白底留白，干净清爽）',
    uiOptionDark: '深色（跟随系统，柔和不刺眼）',
    uiOptionFresh: '清新（浅色底，少量点缀色，柔和分隔）',
    uiOptionBusiness: '业务型（信息密度高，适合后台）',

    sectionData: '④ 数据存在哪里',
    dataLabel: '存储方式',
    dataOptionLocalFile: '本地文件（Excel / CSV，最简单）',
    dataOptionSqlite: '本地小数据库（几万条数据轻松应对）',
    dataOptionNone: '不需要存储（用完即走）',

    sectionComplexity: '⑤ 做到什么程度',
    complexityHint: '默认选标准版。第一次尝试可以先选最小可用版。',
    complexityOptionStarter: '最小可用版（先跑通主流程）',
    complexityOptionStandard: '标准业务版（推荐，可以发给同事试用）',
    complexityOptionAdvanced: '团队增强版（含设置、历史记录和恢复功能）',

    sectionGoal: '⑥ 给谁用？解决什么问题？',
    goalLabel: '目标（一两句话即可）',
    goalPlaceholder:
      '例如：给财务部用，每月手动核对几百张订单和银行流水要花两天，希望缩短到一小时。',

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
      '整段复制到 Codex 桌面版，它会先简述方案，然后开始实现。',
    copyButton: '一键复制',
    copied: '已复制',
    copyFailed: '复制失败',
    copyNextPrompt: '已复制。下一步：Codex 桌面版 → 新建任务 → 粘贴 → 发送。',
    copyNextRecovery: '修复提示词已复制，连同错误信息一起发给 Codex。',
    recoveryTitle: '遇到问题时，复制这段',
    recoveryHint: '启动或打包卡住时，把这段发给 Codex 即可。',
    recoveryEvidenceLabel: '可选：把错误信息贴在这里',
    recoveryEvidencePlaceholder:
      '例如：终端最后 80 行、错误弹窗文字、你刚才的操作。复制时会自动带上。',
    recoveryEvidenceHint: '不会上传，仅在本地拼入修复提示词。',
    copyRecoveryButton: '复制修复提示词',
    resetButton: '清空重填',
    langToggle: '切换语言',
    langToggleHint:
      '英文提示词通常更稳定，中文也可以。',
    qualityTitle: '复制前检查',
    qualityReady: '信息充分',
    qualityNeedsInput: '建议补充',
    qualityCoverage: '质量覆盖：{passed}/{total} 项关键信息',
    qualityGoal: '目标',
    qualityFeatures: '功能',
    qualityIo: '输入/输出',
    qualityAcceptance: '验收标准',
    qualityPass: '已填',
    qualityImprove: '待补充',

    quickTemplatesTitle: '不想从零开始？选个模板',
    quickTemplatesHint: '一键填入，微调几个字即可。',

    validationMissingGoal: '请先写一两句目标。',
    validationMissingFeatures: '请先写至少一条功能。',

    historyTitle: '最近生成的提示词',
    historyEmpty: '暂无记录，内容仅保存在你的浏览器中。',
    historyLoad: '载入',
    historyDelete: '删除',
    historyClearAll: '全部清空',

    tipCardTitle: '提示',
    tipCardBody:
      '你负责业务判断，Codex 负责技术实现。写清给谁用、输入什么、输出什么就够了。',
    promptStep1Title: '选模板',
    promptStep1Body: '不确定就保留默认推荐项。',
    promptStep2Title: '写目标和流程',
    promptStep2Body: '把输入、处理、输出说清楚。',
    promptStep3Title: '交给 Codex',
    promptStep3Body: '复制粘贴，让它实现、运行、验证。',
  },

  guide: {
    pageTitle: '快速上手',
    pageSubtitle:
      '从打开 Codex 到交付一个小工具，只留必要步骤。',

    tocTitle: '目录',

    sec1Title: '第一章 · Codex 是什么',
    sec1P1:
      '把 Codex 想象成一个会写代码的搭档。你说清业务目标，它来实现。',
    sec1P2:
      '需求描述得越清楚，它给出的第一版就越接近你想要的。',
    sec1P3:
      '本教程只讲桌面工具：Windows / macOS，双击即可打开。',

    sec2Title: '第二章 · 需要准备什么',
    sec2Item1Title: '一台 Windows 或 macOS 电脑',
    sec2Item1Body: 'Windows 10/11 或较新的 macOS，内存 8GB 起步，16GB 更从容。',
    sec2Item2Title: '一个 ChatGPT 账号',
    sec2Item2Body: '用 OpenAI 账号登录即可，ChatGPT 账号通用。',
    sec2Item3Title: 'Codex 桌面版安装包',
    sec2Item3Body: '从 OpenAI 官网下载，双击安装。',
    sec2Item4Title: '不需要提前学技术',
    sec2Item4Body: '会描述流程、会验收结果，就足够了。',

    sec3Title: '第三章 · 第一次打开 Codex',
    sec3P1: '首次启动需要登录，登录后进入聊天式界面。',
    sec3P2: '左侧是任务列表，中间是对话区，右侧是文件预览。',
    sec3P3: '记住三个动作：新建任务、输入提示词、等待结果。',

    sec4Title: '第四章 · 核心操作一句话说清',
    sec4Item1Title: '新建任务 = 开一次新对话',
    sec4Item1Body: '一个目标对应一次对话，不要把多件事混在一起。',
    sec4Item2Title: '提示词 = 你对 Codex 说的话',
    sec4Item2Body:
      '说清输入、输出和界面长什么样。别只说「做个工具」。',
    sec4Item3Title: '等待 = 让它专心干活',
    sec4Item3Body:
      '过程中的技术细节不用管，只看最终能不能跑起来。',
    sec4Item4Title: '运行 = 看到你的软件',
    sec4Item4Body: '写完后它会自动打开软件窗口——那就是你的程序。',
    sec4Item5Title: '不对 = 继续说',
    sec4Item5Body: '哪里不对就直接说，比如「按钮颜色不对」「点导入就崩了」，它会自己修。',

    sec5Title: '第五章 · 写好提示词的五条原则',
    sec5Rule1Title: '1. 说清「给谁用」',
    sec5Rule1Body: '用户是谁，决定了界面和流程怎么设计。',
    sec5Rule2Title: '2. 说清「解决什么问题」',
    sec5Rule2Body: '不只列功能，也说清楚要消除的痛点。',
    sec5Rule3Title: '3. 多给例子',
    sec5Rule3Body: '「订单号、金额、日期，按月汇总」比「做个统计」清楚十倍。',
    sec5Rule4Title: '4. 一次只改一件事',
    sec5Rule4Body: '每次只提一个改动，成功率更高。',
    sec5Rule5Title: '5. 出错别慌',
    sec5Rule5Body: '把错误信息原文复制回去，让它自己修。',

    sec6Title: '第六章 · 常见问题',
    sec6Pit1Title: '问题一 · 软件跑不起来',
    sec6Pit1Body: '复制完整错误信息，问它「怎么修」。',
    sec6Pit2Title: '问题二 · 改来改去越来越乱',
    sec6Pit2Body: '连改几次没效果，就新开任务重新描述需求。',
    sec6Pit3Title: '问题三 · 一开始就想做太多',
    sec6Pit3Body: '先做最小版本：导入一张表、显示一列数据。跑通再加功能。',
    sec6Pit4Title: '问题四 · 不知道它在干什么',
    sec6Pit4Body: '直接问：「你现在在做什么？」',

    secStopTitle: '第七章 · 什么时候该停下来',
    secStopItem1Title: '看到成品就停',
    secStopItem1Body: '软件能打开、示例数据能跑完、能导出文件——到这里就先暂停加功能。',
    secStopItem2Title: '同一个问题别硬修',
    secStopItem2Body: '同一问题连续三次没修好，让 Codex 降级或关掉边缘功能，先保主流程。',
    secStopItem3Title: '新想法放到 v2',
    secStopItem3Body: '把「再加一个功能」写进 v2 计划，别让第一版变成无限工程。',
    secStopItem4Title: '大改动开新任务',
    secStopItem4Body: '主流程跑通后，换界面、换技术栈或加大量功能，都应该新开任务。',

    sec7Title: '第八章 · 怎么分享给同事',
    sec7P1: '让 Codex 打包成 Windows .exe 或 macOS .dmg。',
    sec7P2: '通过微信、邮件或网盘发给同事，双击即可安装。',
    sec7P3: '如果安全软件拦截，告诉同事「这是内部工具」允许运行即可。',

    nextStepTitle: '接下来做什么',
    nextStepGenerator: '生成你的第一段提示词',
    nextStepLessons: '七天上手路线',
    nextStepCookbook: '场景食谱',
    nextStepCases: '浏览部门案例',
  },

  tips: {
    pageTitle: '实用技巧',
    pageSubtitle: '这些习惯能帮你少走弯路。',

    tip1Title: '用角色设定让回答更专业',
    tip1Body:
      '开头加一句「你是一名桌面应用工程师」，回答会更聚焦。',
    tip2Title: '先要摘要，再让它动手',
    tip2Body:
      '让它先给 10 行内的方案摘要，没问题就继续实现和验证。',
    tip3Title: '给它看真实文件',
    tip3Body:
      '贴上 Excel 表头或脱敏样本，比口头描述精准得多。',
    tip4Title: '学会说「回退」',
    tip4Body:
      '改坏了就说：「回到上一个能跑的版本。」',
    tip5Title: '善用中英互译',
    tip5Body:
      '先用中文把需求写清楚，再让 Codex 翻译成英文提示词。',
    tip6Title: '保存好用的提示词',
    tip6Body:
      '效果好的提示词存到备忘录，下次做类似的事改几个字就能复用。',
    tip7Title: '让它写使用说明',
    tip7Body:
      '工具做好后，让它写一份 500 字以内的使用指南。',
    tip8Title: '要求友好的错误提示',
    tip8Body:
      '加一句：「输入有误时给出友好提示，不要直接崩溃。」',
    tip9Title: '先要验收标准再动手',
    tip9Body:
      '让它先列出 3 个使用场景和验收条件，确认后再开始实现。',
    tip10Title: '改动时先说「不动什么」',
    tip10Body:
      '改 A 的时候先声明：「B 和 C 保持不变，只调整 A。」',
    tip11Title: '用对比代替抽象描述',
    tip11Body:
      '别说「好看一点」，贴张截图说「要这种感觉」。',
    tip12Title: '定期开新对话',
    tip12Body:
      '一个阶段做完就新开对话，带上最终提示词和当前可用版本。',

    pitfallsTitle: '常见误区',
    pitfall1Title: '误区 · 以为它能读懂没写出来的需求',
    pitfall1Body:
      '你没写出来的，它一概不知道。',
    pitfall2Title: '误区 · 看到技术细节就慌',
    pitfall2Body:
      '技术细节不用管，只验收最终的软件行为。',
    pitfall3Title: '误区 · 一次提 20 个需求',
    pitfall3Body:
      '一次太多容易遗漏，拆成几轮效果更好。',
    pitfall4Title: '误区 · 出错就重来',
    pitfall4Body:
      '错误信息是最有价值的线索，直接发回去让它修。',
    pitfall5Title: '误区 · 跟它讲道理',
    pitfall5Body:
      '直接说要什么结果，不需要解释一大段原因。',
    pitfall6Title: '误区 · 不保存中间版本',
    pitfall6Body:
      '每个能跑的版本都复制一份，文件名带上日期。',
  },

  faq: {
    pageTitle: '常见问答',
    pageSubtitle: '懂业务、不写代码的人最常问的问题。',

    q1: 'Codex 收费吗？',
    a1: 'Codex 需要 OpenAI 账号，目前需订阅 ChatGPT Plus 或更高计划。具体价格见 OpenAI 官网。',

    q2: '我只懂业务，能用吗？',
    a2: '完全可以。你负责描述流程和验收标准，Codex 负责实现。',

    q3: '做出来的东西能给同事用吗？',
    a3: '可以。让 Codex 打包成 .exe 或 .dmg，发给同事安装即可。',

    q4: '生成的软件安全吗？',
    a4: '本地工具风险较低。涉及敏感数据时，建议让技术同事审查一下。',

    q5: '软件很慢怎么办？',
    a5: '告诉 Codex：「软件打开很慢 / 处理大文件卡住了，请优化。」它会自己定位问题并改进。',

    q6: '能做手机 App 吗？',
    a6: '可以，但本教程只讲桌面应用。手机 App 的发布流程更复杂一些。',

    q7: '能联网获取数据吗？',
    a7: '可以，但建议先从离线工具开始。联网功能最好请技术同事审查。',

    q8: '怎么判断结果对不对？',
    a8: '你是验收方——看软件的实际行为和最终输出是否符合预期。',

    q9: '能和同事协作吗？',
    a9: '可以。分享你的提示词，或者直接发安装包。',

    q10: '出了问题找谁？',
    a10: '先问 Codex。账号或付费问题联系 OpenAI 客服。',

    q11: '普通电脑跑得动吗？',
    a11: '一般没问题。建议内存 8GB 以上，硬盘预留 10GB 空间。',

    q12: 'Codex 会把我的文件传到网上吗？',
    a12: '它只读取你主动提供的文件。敏感数据建议先脱敏再发送。',

    q13: '第一次看到输出完全看不懂怎么办？',
    a13: '发这句：「用中文、少术语，五句话说明下一步，然后继续完成并验证。」',

    q14: '怎么控制费用？',
    a14: '一次只做一件事，跑通后新开对话，重复需求复用已有提示词。',

    q15: '做出来的软件能商用吗？',
    a15: '内部使用通常没问题。对外销售前，请确认 OpenAI 条款和相关许可证。',

    q16: '别人问「这是你写的吗」怎么回答？',
    a16: '可以说：「我提需求，Codex 生成初版，我负责验收和迭代。」',
  },

  footer: {
    about: '关于',
    aboutBody:
      'Codex 桌面版上手指南',
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
    day3Hook: '描述越清楚，结果越稳定',
    day3Goals: '定义角色 · 给出示例 · 一次只改一件事',
    day4Title: '让 Codex 自己修问题',
    day4Hook: '遇到错误不要慌，让它自己看、自己改',
    day4Goals: '回传错误信息 · 学会回退 · 区分卡住和结果不对',
    day5Title: '用真实数据沟通',
    day5Hook: '给它真实表头，它理解得更准确',
    day5Goals: '贴 Excel 表头 · 说明字段含义 · 围绕字段做功能',
    day6Title: '打包分享给同事',
    day6Hook: '从「只有你能用」到「整个部门都能用」',
    day6Goals: '打包 .exe / .dmg · 测试安装 · 写使用说明',
    day7Title: '迭代第二版',
    day7Hook: '小改两轮，从「能用」到「好用」',
    day7Goals: '收集反馈 · 一次修一个问题 · 规划下一个工具',
    recapTitle: '七天之后，你已经能独立交付',
    recapBody:
      '安装、提需求、修问题、打包分享——你都会了。接下来，把重复工作一个个变成工具。',
  },

  cases: {
    pageTitle: '部门案例',
    pageSubtitle:
      '选一个部门场景，复制提示词，改几个字就能用。',

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
    sampleFieldsHint: '复制提示词前，把你的 Excel / CSV 表头改成这些字段名，或把真实表头一起贴给 Codex。',
    sectionPrompt: '可直接使用的提示词',
    sectionAfter: '复制之后',
    after1: '打开 Codex 桌面版，新建任务',
    after2: '整段粘贴到对话框，发送',
    after3: '让 Codex 实现并验证，再根据需要调整名称、字段和按钮',

    backToCases: '返回案例列表',
    tryInGenerator: '在生成器中自定义此案例',
    relatedCases: '同部门其他案例',
    windowsBadge: 'Windows 应用',
  },

  cookbook: {
    pageTitle: '场景食谱',
    pageSubtitle:
      '常见小需求，每个都附带可复制的提示词。覆盖办公、数据清洗和电商日常场景。',
    copyRecipe: '复制提示词',
    recipeAfter: '粘贴到 Codex，按步骤操作即可',
  },
} as const;
