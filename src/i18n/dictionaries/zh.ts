export const zh = {
  meta: {
    siteName: 'Codex 新手教程',
    siteTagline: '让每个小白，都能用 Codex 做出自己的桌面小工具',
    description:
      '面向非技术人员的 Codex 桌面版教程：提示词生成、上手指南、部门案例和电商 Agent 任务案例。重点帮助你做出 Windows / macOS 本地工具，也学会让 Codex 代理完成电商业务工作。',
    keywords: [
      'Codex',
      'OpenAI Codex',
      'Codex 桌面版',
      'Codex 教程',
      'Codex 提示词',
      '新手教程',
      '非技术人员',
      'Windows 桌面应用',
      'macOS 桌面应用',
      '电商运营',
      '财务自动化',
      '小白',
    ],
  },

  nav: {
    home: '首页',
    generator: '提示词',
    guide: '新手上手',
    lessons: '七天上手',
    cookbook: '场景食谱',
    cases: '部门案例',
    agentCases: 'Agent 案例',
    tips: '进阶',
    faq: '常见问答',
    tryNow: '开始使用',
    switchLang: '切换语言',
  },

  home: {
    heroEyebrow: '专为业务小白准备',
    heroTitleLine1: '想做一个',
    heroTitleHighlight: '属于自己的小软件',
    heroTitleLine2: '跟 Codex 说一句话就够了',
    heroSubtitle:
      '填几个空，复制到 Codex 桌面版。几分钟后，你就能得到一个本地小工具。',
    heroCtaPrimary: '三分钟生成一个提示词',
    heroCtaSecondary: '先看看怎么玩',
    heroStatsLabel1: '现成案例',
    heroStatsValue1: '90+',
    heroStatsLabel2: '填空就生成',
    heroStatsValue2: '提示词',
    heroStatsLabel3: '专属小工具',
    heroStatsValue3: '你的电脑',
    heroBadgeWindows: 'Windows 11 · 10',
    heroBadgeMac: 'macOS 可用',

    flowTitle: '三步，把一句话变成一个软件',
    flowSubtitle: '像填表一样，一步步来。',
    flowStep1Title: '告诉 Codex 你想做什么',
    flowStep1Body:
      '写目标和功能。界面、数据存法等默认项已选好。',
    flowStep2Title: '点一下"复制提示词"',
    flowStep2Body:
      '系统会拼好提示词。你只管复制。',
    flowStep3Title: '粘贴到 Codex 桌面版',
    flowStep3Body:
      'Codex 会处理、运行、修正、验证。窗口弹出，就是你的工具。',

    featuresTitle: '为什么这份教程真的适合小白',
    featuresSubtitle: '不要求会命令行或 GitHub。',
    feature1Title: '全部大白话',
    feature1Body:
      '避开术语，用日常话说明。',
    feature2Title: '填空式提示词',
    feature2Body:
      '平台、界面、数据存法都是选择题。你只写目标和功能。',
    feature3Title: '现成部门案例',
    feature3Body:
      '财务、运营、客服、人事、物流、采购、市场、法务、数据、行政、产品等团队都有完整案例，拿来就能用。',
    feature4Title: '先做好本地桌面工具',
    feature4Body:
      '核心案例聚焦「双击就能打开」；Agent 案例教你把电商日报、订单、客服、库存、采购、投放、会员和类目复盘交给 Codex。',
    feature5Title: '中英双语对照',
    feature5Body:
      '中文看懂，英文给 Codex。内容一致。',
    feature6Title: '一上手就能出活',
    feature6Body:
      '目标很简单：今天就做出能跑的东西。',

    caseTeaserTitle: '你所在的部门，已经有现成案例',
    caseTeaserSubtitle: '点进去，复制提示词，马上开工。',
    caseTeaserMore: '看全部部门案例',

    agentTeaserTitle: '也能处理电商业务任务',
    agentTeaserSubtitle: '让 Codex 帮电商团队整理日报、筛异常订单、分析客服问题、检查上新资料、复盘投放、会员分层和类目经营。',
    agentTeaserMore: '看 Agent 任务案例',

    ctaTitle: '准备好了吗？',
    ctaBody: '三分钟后，先拿到第一段提示词。',
    ctaButton: '现在就开始',

    trustTitle: '这份教程背后的诚意',
    trustLine1: '案例来自真实业务场景。',
    trustLine2: '中英双语，国内访问顺畅。',
    trustLine3: '内容开放，更新透明。',
  },

  generator: {
    pageTitle: '提示词生成器',
    pageSubtitle:
      '像填表一样简单。写好“目标”和“功能”，其它默认项先不用改。',

    defaultsHint: '我们已经替你挑好默认项，不改也能直接用。',

    sectionPlatform: '① 你想做什么样的软件',
    platformWindows: 'Windows 电脑上用',
    platformMac: 'macOS 电脑上用',
    platformBoth: 'Windows 和 macOS 都要',
    platformHint: '大部分公司用 Windows，所以默认选它。',

    sectionTech: '② 软件怎么搭（挑个方向就好）',
    techLabel: '做法',
    techHintRecommended: '推荐',
    techOptionElectron: '通用做法（最稳，社区资料最多）',
    techOptionTauri: '轻巧做法（软件体积小，启动更快）',
    techOptionPyQt: '偏工具做法（很小的工具也能快速搭）',
    techOptionAuto: '让 Codex 自己挑（闭眼选这个）',

    sectionUI: '③ 软件长什么样',
    uiLabel: '外观',
    uiOptionMinimal: '简洁（白底，大字，干净清爽）',
    uiOptionDark: '深色（跟随系统，清楚不刺眼）',
    uiOptionFresh: '清新（浅色、少量强调色、柔和分隔）',
    uiOptionBusiness: '业务型（像后台，信息密度高）',

    sectionData: '④ 数据放在哪',
    dataLabel: '存法',
    dataOptionLocalFile: '存在你电脑的文件里（Excel / CSV，最简单）',
    dataOptionSqlite: '存在一个本地小数据库（几万条数据都没问题）',
    dataOptionNone: '不用存（用完就关，不保留）',

    sectionComplexity: '⑤ 想做到什么程度',
    complexityHint: '默认选标准版。第一次试，可以选最小可用版。',
    complexityOptionStarter: '最小可用版（先跑通主流程）',
    complexityOptionStandard: '标准业务版（推荐，能发同事试用）',
    complexityOptionAdvanced: '团队增强版（设置、历史、恢复更完整）',

    sectionGoal: '⑥ 这个软件，是给谁用的？解决他们什么麻烦？',
    goalLabel: '目标（一两句话就好）',
    goalPlaceholder:
      '比如：给我们财务部用，解决每个月手动核对几百张订单和银行流水要花两天的问题。',

    sectionFeatures: '⑦ 你希望它能做什么',
    featuresLabel: '功能（一行一条，越具体越好）',
    featuresPlaceholder:
      '- 我把订单 Excel 和银行流水 Excel 拖进去\n- 它自动按订单号比对，把对不上的挑出来\n- 把对不上的导出成一份新的 Excel',

    sectionExtras: '⑧ 再来点要求（可选）',
    extraOfflineLabel: '没网也能用',
    extraOfflineHint: '不联网也要能跑',
    extraBilingualLabel: '界面中英双语',
    extraBilingualHint: '同一个软件能切换语言',
    extraExportLabel: '结果能导出',
    extraExportHint: '可以保存成文件发给别人',
    extraShortcutLabel: '支持键盘快捷键',
    extraShortcutHint: '熟手可以更快',
    extraAccessibilityLabel: '对视障同事友好',
    extraAccessibilityHint: '读屏软件能正常用',

    sectionOutput: '这段就是你要复制的提示词',
    outputHint:
      '整段复制到 Codex 桌面版。它会先说明方案，再动手实现。',
    copyButton: '一键复制',
    copied: '已复制',
    copyFailed: '复制失败',
    copyNextPrompt: '已复制。下一步：打开 Codex 桌面版 → 新建任务 → 粘贴 → 发送。',
    copyNextRecovery: '修复提示词已复制。连同错误信息一起发给 Codex。',
    recoveryTitle: '跑不起来时，再复制这一段',
    recoveryHint: '启动或打包卡住时，把这段发给 Codex。',
    copyRecoveryButton: '复制修复提示词',
    resetButton: '清空重填',
    langToggle: '切换语言',
    langToggleHint:
      '英文通常更稳；中文也能用。',

    quickTemplatesTitle: '不想自己填？选一个现成模板',
    quickTemplatesHint: '点一下填好，再微调几个字。',

    validationMissingGoal: '先写一两句目标。',
    validationMissingFeatures: '先写至少一条功能。',

    historyTitle: '你最近生成的',
    historyEmpty: '暂无历史记录。内容只存在你的浏览器里。',
    historyLoad: '载入',
    historyDelete: '删除',
    historyClearAll: '全部清空',

    tipCardTitle: '给小白的小提醒',
    tipCardBody:
      '不用懂技术。先写清“给谁用、做什么”，其它推荐项保持默认就行。',
    beginnerStep1Title: '先选模板',
    beginnerStep1Body: '不确定就保留默认推荐项。',
    beginnerStep2Title: '填两段话',
    beginnerStep2Body: '写清给谁用、输入什么、输出什么。',
    beginnerStep3Title: '复制去 Codex',
    beginnerStep3Body: '跑不起来再复制修复提示词。',
  },

  guide: {
    pageTitle: '新手上手',
    pageSubtitle:
      '从零开始。只讲你马上要用的步骤。',

    tocTitle: '目录',

    sec1Title: '第一章 · Codex 到底是什么',
    sec1P1:
      '把 Codex 当成会写软件的助手。你说需求，它写程序。',
    sec1P2:
      '你把需求说清楚，它就能先搭出一个版本。',
    sec1P3:
      '本教程只讲桌面小工具：Windows / macOS，双击打开。',

    sec2Title: '第二章 · 我要准备什么',
    sec2Item1Title: '一台 Windows 或 macOS 电脑',
    sec2Item1Body: 'Windows 10/11 或较新的 macOS。内存 8GB 起步，16GB 更舒服。',
    sec2Item2Title: '一个 ChatGPT 账号',
    sec2Item2Body: '用 OpenAI 账号登录。ChatGPT 账号也可以。',
    sec2Item3Title: 'Codex 桌面版安装包',
    sec2Item3Body: '从 OpenAI 官网下载，双击安装。',
    sec2Item4Title: '真的不用懂底层细节',
    sec2Item4Body: '会打字、会复制粘贴、会双击图标，这些就够了。',

    sec3Title: '第三章 · 第一次打开 Codex',
    sec3P1: '首次打开先登录。登录后会看到一个聊天式界面。',
    sec3P2: '左边是任务，中间是对话，右边可能是文件预览。',
    sec3P3: '只记住三件事：新建任务、输入提示词、等结果。',

    sec4Title: '第四章 · 核心动作用大白话理解',
    sec4Item1Title: '新建任务 = 新开一次对话',
    sec4Item1Body: '一个目标一次对话，不要混在一起。',
    sec4Item2Title: '提示词 = 你跟 Codex 说的话',
    sec4Item2Body:
      '说清输入、输出和界面。别只说“做个工具”。',
    sec4Item3Title: '等待 = 让它干活',
    sec4Item3Body:
      '过程里的内部内容不用看。只看最后能不能跑。',
    sec4Item4Title: '运行 = 看到软件本人',
    sec4Item4Body: '它写完后会自动把软件打开。一个新窗口弹出来，那就是你的程序。',
    sec4Item5Title: '不对 = 继续跟它说',
    sec4Item5Body: '看到哪里不对，就直接说"这里按钮颜色不对"、"点导入就崩了"。它会自己改。',

    sec5Title: '第五章 · 写好提示词的五条大白话',
    sec5Rule1Title: '1. 说清楚"给谁用"',
    sec5Rule1Body: '给谁用，决定界面和流程。',
    sec5Rule2Title: '2. 说清楚"要解决什么问题"',
    sec5Rule2Body: '别只列功能，也说要解决的麻烦。',
    sec5Rule3Title: '3. 多举例子',
    sec5Rule3Body: '“订单号、金额、日期，按月汇总”比“做统计”清楚。',
    sec5Rule4Title: '4. 一次只改一件事',
    sec5Rule4Body: '一次只提一个改动，更稳。',
    sec5Rule5Title: '5. 出错了别急',
    sec5Rule5Body: '把错误原文复制回去，让它自己修。',

    sec6Title: '第六章 · 会遇到的坑和怎么爬出来',
    sec6Pit1Title: '坑一 · 软件跑不起来',
    sec6Pit1Body: '复制完整错误，问它“怎么修”。',
    sec6Pit2Title: '坑二 · 改来改去越改越乱',
    sec6Pit2Body: '连改几次没效果，就新开任务，重写需求。',
    sec6Pit3Title: '坑三 · 一上来想做太复杂',
    sec6Pit3Body: '先做最小能用的版本：导入一张表 + 显示一列。跑通再加下一个功能。',
    sec6Pit4Title: '坑四 · 不知道它在干嘛',
    sec6Pit4Body: '直接问：“你现在在做什么？”',

    sec7Title: '第七章 · 做完了，怎么发给同事',
    sec7P1: '让 Codex 打包成 Windows .exe 或 macOS .dmg。',
    sec7P2: '把这个文件发给同事（微信、邮件、网盘都行），他双击就能安装。',
    sec7P3: '如果同事电脑有安全软件拦截，告诉它"这是我自己做的工具"就能放行。',

    nextStepTitle: '看完了，下一步做什么',
    nextStepGenerator: '去生成你的第一段提示词',
    nextStepCases: '看看部门现成案例',
    nextStepLessons: '七天上手路线',
    nextStepCookbook: '场景食谱直接抄',
  },

  cases: {
    pageTitle: '部门案例',
    pageSubtitle:
      '按部门选场景。复制提示词，改几个字就能用。',

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

    sectionPain: '这是什么问题',
    sectionSolution: '解决办法',
    sectionExpected: '成品效果',
    sectionPrompt: '现成提示词',
    sectionAfter: '拿到提示词之后',
    after1: '打开 Codex 桌面版，新建一个任务',
    after2: '把提示词整段复制，粘贴到对话框里发送',
    after3: '让 Codex 实现、运行、验证，再改公司名、字段名和按钮文字',

    backToCases: '返回案例列表',
    tryInGenerator: '在生成器里自定义这个案例',
    relatedCases: '同部门的其他案例',
    windowsBadge: 'Windows 应用',
  },

  agentCases: {
    eyebrow: '电商业务 Agent',
    pageTitle: '电商 Agent 任务案例',
    pageSubtitle:
      '专注电商公司的运营、订单、客服、商品、库存、采购、投放、会员、风控、直播和类目复盘。',
    agentModeTitle: '把电商业务问题变成可交付任务',
    agentModeBody:
      'Agent 案例的重点不是聊天，而是让 Codex 读取你给的表格、聊天记录、报价单和业务资料，分析后交付清单、摘要和行动建议。',
    rule1: '先说业务目标、输入材料和交付物；不要只说“帮我分析一下”。',
    rule2: '要求它先检查字段和口径，再输出结论、异常、优先级和待人工确认项。',
    rule3: '写清交付对象和使用场景：让结果能直接进入汇报、跟进或分派。',
    stat1Value: '20',
    stat1Label: '类电商高频任务',
    stat2Value: '3 步',
    stat2Label: '读资料、做分析、给动作',
    stat3Value: '复制即用',
    stat3Label: '每个案例都有提示词',
    stat4Value: '少等待',
    stat4Label: '节奏和交付目标更清楚',
    copyReady: '可复制',
    deliverableLabel: '明确交付物',
    afterCopy: '复制后，把对应表格、聊天记录或业务目标一起发给 Codex。',
    copyPrompt: '复制 Agent 提示词',
  },

  tips: {
    pageTitle: '进阶技巧',
    pageSubtitle: '几个常用技巧，少走弯路。',

    tip1Title: '用"角色扮演"让回答更专业',
    tip1Body:
      '开头写：“你是一名桌面应用工程师”。回答会更聚焦。',
    tip2Title: '先要摘要，但不要卡在确认',
    tip2Body:
      '先要 10 行内摘要；没阻塞就继续实现、运行、验证。',
    tip3Title: '给它看真实的文件',
    tip3Body:
      '贴 Excel 表头或脱敏样本，比口头描述准。',
    tip4Title: '学会说"回退"',
    tip4Body:
      '改坏了就说：“回到上一个能跑的版本”。',
    tip5Title: '善用中英互译',
    tip5Body:
      '先中文写清楚，再让 Codex 翻成英文提示词。',
    tip6Title: '保存你的好提示词',
    tip6Body:
      '效果好的提示词存到本地备忘录里，下次做类似的事改几个字就能复用。',
    tip7Title: '让它写说明书',
    tip7Body:
      '做完后让它写一份 500 字内使用说明。',
    tip8Title: '给用户做防呆',
    tip8Body:
      '加一句：“输入错了要友好提示，不要崩溃”。',
    tip9Title: '主动要一份「验收标准」清单',
    tip9Body:
      '先让它列 3 个场景和验收标准，再实现。',
    tip10Title: '迭代时先说「不要动什么」',
    tip10Body:
      '改 A 时先说：“B 和 C 不动，只调 A”。',
    tip11Title: '用「对比示例」代替抽象描述',
    tip11Body:
      '别说“好看”。贴截图，说“要这种感觉”。',
    tip12Title: '每隔几轮「起一个新对话」',
    tip12Body:
      '一个任务做完就新开对话，带上最终提示词和可用版本。',

    pitfallsTitle: '新手常见误区',
    pitfall1Title: '误区 · 以为它能读你心',
    pitfall1Body:
      '你没写出来的需求，它都不知道。',
    pitfall2Title: '误区 · 看到内部内容就退',
    pitfall2Body:
      '内部内容不用看。只验收软件行为。',
    pitfall3Title: '误区 · 一次提 20 个需求',
    pitfall3Body:
      '一次太多容易漏。拆成几轮做。',
    pitfall4Title: '误区 · 出错了就重开',
    pitfall4Body:
      '错误信息最有用，直接发回去。',
    pitfall5Title: '误区 · 跟他「讲道理」',
    pitfall5Body:
      '直接说要什么，不必解释一大段原因。',
    pitfall6Title: '误区 · 不保存中间状态',
    pitfall6Body:
      '每个能跑的版本都复制一份，文件名带时间。',
  },

  faq: {
    pageTitle: '常见问答',
    pageSubtitle: '小白用户最常问的问题都在这里。',

    q1: 'Codex 要钱吗？',
    a1: 'Codex 走 OpenAI 账号。目前需要订阅 ChatGPT Plus 或更高级别的付费计划。具体价格请看 OpenAI 官网。',

    q2: '我完全是小白，真的能用吗？',
    a2: '能。会打字、复制粘贴、双击图标就够了。',

    q3: '做出来的软件能给同事用吗？',
    a3: '能。让 Codex 打包成 .exe 或 .dmg，再发给同事安装。',

    q4: '它做出来的东西安全吗？',
    a4: '本地自用风险较低。涉及敏感数据，先让懂技术的同事看一眼。',

    q5: '软件跑得好慢，怎么办？',
    a5: '告诉 Codex："软件打开很慢 / 处理大文件卡住，帮我优化一下。" 它会自己找原因并改进。',

    q6: '能做手机 App 吗？',
    a6: '可以，但本教程只讲桌面应用。手机 App 发布流程更复杂。',

    q7: '能联网抓网页数据吗？',
    a7: '能，但先做离线工具更稳。联网功能最好请技术同事审一下。',

    q8: '我怎么知道结果对不对？',
    a8: '你只看"软件跑起来的行为"对不对。你是验收方。',

    q9: '能和同事一起做吗？',
    a9: '可以。分享提示词，或直接发安装包。',

    q10: '出了问题找谁？',
    a10: '先问 Codex。账号或付费问题找 OpenAI 客服。',

    q11: '普通电脑跑得动吗？',
    a11: '一般可以。建议内存 8GB 起步，硬盘留 10GB 空间。',

    q12: 'Codex 会不会把我电脑里的文件传到网上？',
    a12: '它只读取你主动提供的文件。敏感表格先脱敏，再发给它。',

    q13: '第一次试完全看不懂输出，怎么办？',
    a13: '发这句：“用中文、少术语，五句话说明下一步，然后继续做完并验证。”',

    q14: '怎么控制使用费用？',
    a14: '一次只做一件事；跑通后新开对话；重复需求复用旧提示词。',

    q15: '做出来的软件能商用吗？',
    a15: '内部使用通常没问题。对外售卖前，请确认 OpenAI 条款和依赖许可证。',

    q16: '朋友 / 同事问「这个是你写的吗」，该怎么答？',
    a16: '可以说：“我提需求，Codex 生成初版，我负责验收和迭代。”',
  },

  footer: {
    about: '关于',
    aboutBody:
      '面向业务小白的 Codex 桌面版教程。由 ifq.ai 维护，非 OpenAI 官方出品。',
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
    pageSubtitle: '每天 15 分钟，一周做出自己的小软件。',
    dayLabel: '第 {n} 天',
    startLabel: '开始学',
    day1Title: '认识 Codex 桌面版',
    day1Hook: '装好它，点开它，认识它长什么样',
    day1Goals: '安装 Codex · 登录账号 · 认识三个区域',
    day2Title: '做你的第一个小工具',
    day2Hook: '先跑通一个 Excel 汇总小工具',
    day2Goals: '复制教程里的提示词 · 粘贴进 Codex · 看到一个窗口弹出来',
    day3Title: '把话说清楚',
    day3Hook: '说清楚，结果更稳',
    day3Goals: '学会"角色扮演" · 学会给例子 · 学会一次只改一件事',
    day4Title: '让 Codex 自己修 Bug',
    day4Hook: '遇到错误不要慌。让它自己看、自己改',
    day4Goals: '回传错误 · 学会回退 · 分清卡住和结果不对',
    day5Title: '用真实数据让它听懂',
    day5Hook: '给它真实表头，它会更懂你',
    day5Goals: '贴 Excel 表头 · 说明字段 · 按字段做功能',
    day6Title: '打包成安装包发给同事',
    day6Hook: '从"只有你能用"到"整个部门都能用"',
    day6Goals: '打包 .exe / .dmg · 测试安装 · 写使用说明',
    day7Title: '迭代你的第二版',
    day7Hook: '小改两轮，从"能用"到"好用"',
    day7Goals: '收集同事反馈 · 一次只改一个问题 · 准备下一个小工具的想法',
    recapTitle: '走到这里，你已经不是小白了',
    recapBody:
      '你已经会安装、提需求、修问题和交付。接下来，把重复工作交给小工具。',
  },

  cookbook: {
    pageTitle: '场景食谱',
    pageSubtitle:
      '常见小需求，一题一段可复制提示词；覆盖办公、数据清洗和电商日常工具。',
    copyRecipe: '复制这段提示词',
    recipeAfter: '粘贴进 Codex，按步骤走就行',
  },
} as const;
