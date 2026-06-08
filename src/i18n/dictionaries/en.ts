export const en = {
  meta: {
    siteName: 'Codex Business Guide',
    siteTagline: 'You know the work — Codex turns it into desktop tools.',
    description:
      'Codex Desktop guide: prompt generator, department cases, and recipes for building Windows / macOS tools from your everyday workflows.',
    keywords: [
      'Codex',
      'OpenAI Codex',
      'Codex desktop',
      'Codex tutorial',
      'Codex prompt',
      'business guide',
      'desktop task assistant',
      'Windows desktop app',
      'macOS desktop app',
      'business automation',
      'AI business assistant',
      'WeChat AI',
      'WeChat assistant',
      'OpenClaw',
    ],
  },

  nav: {
    home: 'Home',
    generator: 'Prompt',
    wechatAi: 'WeChat AI',
    guide: 'Quick start',
    lessons: '7-day path',
    cookbook: 'Cookbook',
    cases: 'Cases',
    tips: 'Tips',
    faq: 'FAQ',
    tryNow: 'Get started',
    switchLang: 'Switch language',
  },

  home: {
    heroEyebrow: 'For people who know the work',
    heroTitleLine1: 'Turn your workflow',
    heroTitleHighlight: 'into a tool.',
    heroTitleLine2: 'Just tell Codex what you need.',
    heroSubtitle:
      'Write down your goal and workflow, paste into Codex Desktop. Minutes later, your tool is ready.',
    heroCtaPrimary: 'Generate your first prompt',
    heroCtaSecondary: 'See what others built',
    heroStatsLabel1: 'Ready-made cases',
    heroStatsValue1: '90+',
    heroStatsLabel2: 'Just fill in the blanks',
    heroStatsValue2: 'Prompts',
    heroStatsLabel3: 'Yours alone',
    heroStatsValue3: 'Runs locally',
    heroBadgeWindows: 'Windows 11 · 10',
    heroBadgeMac: 'macOS ready',

    flowTitle: 'Three steps: workflow to tool',
    flowSubtitle: 'Fill in. Copy. Run.',
    flowStep1Title: 'Describe the goal and workflow',
    flowStep1Body:
      'Say who uses it, what goes in, what comes out. Defaults are pre-selected.',
    flowStep2Title: 'Copy the prompt',
    flowStep2Body:
      'The system assembles the full prompt. You just copy.',
    flowStep3Title: 'Paste into Codex Desktop',
    flowStep3Body:
      'Codex writes the code, runs it, fixes bugs. When a window pops up, your tool is ready.',

    featuresTitle: 'You bring the work, Codex brings the code',
    featuresSubtitle: 'Describe your workflow. Codex writes, runs, and debugs.',
    feature1Title: 'Plain language',
    feature1Body:
      'Scenario, workflow, acceptance criteria. Technical details are on Codex.',
    feature2Title: 'Fill-in-the-blank prompts',
    feature2Body:
      'Platform, UI, storage — all multiple choice. You only write goal and features.',
    feature3Title: 'Department cases',
    feature3Body:
      'Finance, operations, support, HR, logistics, procurement, marketing, legal, data, admin, product — copy and adapt.',
    feature4Title: 'Local desktop tools',
    feature4Body:
      'Double-click tools: reconciliation, order cleanup, Excel automation, batch processing.',
    feature5Title: 'Bilingual site',
    feature5Body:
      'Mirrored in Chinese and English for easy sharing.',
    feature6Title: 'Ship first, polish later',
    feature6Body:
      'Get one real workflow running today.',

    ctaTitle: 'Start with one small workflow',
    ctaBody: 'Turn your most repetitive task into a tool.',
    ctaButton: 'Generate prompt',

    caseTeaserTitle: 'Your team probably has a case already',
    caseTeaserSubtitle: 'Pick a close scenario, tweak a few words.',
    caseTeaserMore: 'Browse all department cases',

    trustTitle: 'Promise',
    trustLine1: 'Real scenarios, tested prompts.',
    trustLine2: 'Bilingual. Fast in China.',
    trustLine3: 'Open source.',
  },

  generator: {
    pageTitle: 'Prompt Generator',
    pageSubtitle:
      'Goal, input, output. Defaults handle the rest.',

    defaultsHint: 'Defaults are pre-selected — ready to use.',

    sectionPlatform: '1. Platform',
    platformWindows: 'Windows',
    platformMac: 'macOS',
    platformBoth: 'Both Windows and macOS',
    platformHint: 'Most offices use Windows — pre-selected.',

    sectionTech: '2. How to build (default if unsure)',
    techLabel: 'Approach',
    techHintRecommended: 'Recommended',
    techOptionElectron: 'Standard (most stable, most resources online)',
    techOptionTauri: 'Lightweight (smaller file, faster startup)',
    techOptionPyQt: 'Utility (best for quick small tools)',
    techOptionAuto: 'Let Codex decide (easiest)',

    sectionUI: '3. Look and feel',
    uiLabel: 'Style',
    uiOptionMinimal: 'Minimal (white, spacious, clean)',
    uiOptionDark: 'Dark (follows the system, easy on the eyes)',
    uiOptionFresh: 'Fresh (light background, subtle accents, soft dividers)',
    uiOptionBusiness: 'Dashboard (dense info, great for admin panels)',

    sectionData: '4. Data storage',
    dataLabel: 'Storage',
    dataOptionLocalFile: 'Local files (Excel / CSV)',
    dataOptionSqlite: 'Local database (tens of thousands of rows)',
    dataOptionNone: 'No storage (one-shot)',

    sectionComplexity: '5. Completeness',
    complexityHint: 'Standard is the default. Pick Starter for your first try.',
    complexityOptionStarter: 'Starter (main flow only)',
    complexityOptionStandard: 'Standard (recommended for sharing with colleagues)',
    complexityOptionAdvanced: 'Team-ready (settings, history, recovery)',

    sectionGoal: '6. Who is it for? What problem does it solve?',
    goalLabel: 'Goal (one or two sentences)',
    goalPlaceholder:
      'Example: Finance team. Monthly reconciliation takes two days — cut to one hour.',

    sectionFeatures: '7. What should it do?',
    featuresLabel: 'Features (one per line, be specific)',
    featuresPlaceholder:
      '- Drag in order Excel and bank statement Excel\n- Auto-match by order ID, highlight mismatches\n- Export mismatches as a new Excel file',

    sectionExtras: '8. Extras (optional)',
    extraOfflineLabel: 'Works offline',
    extraOfflineHint: 'Runs without internet',
    extraBilingualLabel: 'Bilingual UI',
    extraBilingualHint: 'Switchable English / Chinese',
    extraExportLabel: 'Export results',
    extraExportHint: 'Save as shareable files',
    extraShortcutLabel: 'Keyboard shortcuts',
    extraShortcutHint: 'Faster for power users',
    extraAccessibilityLabel: 'Accessible',
    extraAccessibilityHint: 'Works with screen readers',

    sectionOutput: 'Your prompt — ready to copy',
    outputHint:
      'Copy into Codex Desktop. It will sketch the plan, then build.',
    copyButton: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed — select manually',
    copyNextPrompt: 'Copied. Next: Codex Desktop → new task → paste → send.',
    copyNextRecovery: 'Fix prompt copied. Send it along with the error message.',
    recoveryTitle: 'Something wrong? Copy this',
    recoveryHint: 'If launch fails or packaging gets stuck, send this to Codex.',
    recoveryEvidenceLabel: 'Optional: paste error here',
    recoveryEvidencePlaceholder:
      'Last 80 terminal lines, error dialog text, what you clicked. Appended on copy.',
    recoveryEvidenceHint: 'Nothing uploaded — appended locally.',
    copyRecoveryButton: 'Copy fix prompt',
    resetButton: 'Reset',
    langToggle: 'Switch language',
    langToggleHint:
      'English prompts tend to be more stable; Chinese works too.',
    qualityTitle: 'Pre-copy check',
    qualityReady: 'Ready',
    qualityNeedsInput: 'Needs detail',
    qualityCoverage: '{passed}/{total} covered',
    qualityGoal: 'Goal',
    qualityFeatures: 'Features',
    qualityIo: 'Input & output',
    qualityAcceptance: 'Acceptance',
    qualityWho: 'Who it serves',
    qualityMetric: 'Measurable gain',
    qualityMetricBonus: '(bonus)',
    qualityPass: 'OK',
    qualityImprove: 'Add',
    qualityGoalHint: 'In one or two sentences, say who it is for, what it solves, and the outcome.',
    qualityFeaturesHint: 'One line each — be concrete: which file to drag in, which button to click, what comes out.',
    qualityIoHint: 'Name the input and output, e.g. "Import Excel → export diff sheet".',
    qualityAcceptanceHint: 'Spell out what counts as done in one line, e.g. "main flow runs, empty data does not crash, double-click to open".',
    qualityWhoHint: 'Say who will use it in one phrase, e.g. "finance teammate / teacher / just me".',
    qualityMetricHint: 'Give one measurable metric, e.g. "from 2 days to 1 hour" or "one click replaces 30 manual steps".',

    quickTemplatesTitle: 'Start from a template',
    quickTemplatesHint: 'One click fills the form. Tweak and go.',

    validationMissingGoal: 'Write a goal first.',
    validationMissingFeatures: 'Add at least one feature.',

    historyTitle: 'Recent prompts',
    historyEmpty: 'No history yet. Saved in your browser only.',
    historyLoad: 'Load',
    historyDelete: 'Delete',
    historyClearAll: 'Clear all',

    tipCardTitle: 'Tip',
    tipCardBody:
      'You handle business judgment; Codex handles code. Say who uses it, what goes in, what comes out.',
    promptStep1Title: 'Pick a template',
    promptStep1Body: 'When unsure, keep defaults.',
    promptStep2Title: 'Write goal and flow',
    promptStep2Body: 'Input, processing, output.',
    promptStep3Title: 'Hand it to Codex',
    promptStep3Body: 'Paste. Codex writes, runs, verifies.',
  },

  wechatAi: {
    eyebrow: 'A new WeChat workflow',
    pageTitle: 'Put an assistant into WeChat',
    pageSubtitle:
      'Enter your access code, copy the message into Codex, then follow the final scan or link on screen.',
    formTitle: 'Fill in one thing',
    formBody:
      'Paste the access code from your service provider. The ready-to-send message will be created for you.',
    keyLabel: 'Access code',
    keyPlaceholder: 'Paste your access code',
    keyHint:
      'This page only uses it to create the message. It is not saved.',
    validationMissingKey: 'Enter the access code first.',
    privacyNote:
      'It is included only when you copy to Codex. This page does not save it or add it to history.',
    copyTitle: 'What Codex will do',
    copyHint:
      'The complete message is ready. This page shows the plain-language plan; copy includes everything Codex needs.',
    copyButton: 'Copy for Codex',
    copyButtonShort: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed — select manually',
    copyNext:
      'Copied. Open Codex, start a new task, paste, and send. When a QR code or link appears, follow it.',
    step1Title: 'Enter access code',
    step1Body:
      'This lets the assistant work for you. The page does not save it.',
    step2Title: 'Hand it to Codex',
    step2Body:
      'Paste and send. Codex will prepare everything in order.',
    step3Title: 'Confirm in WeChat',
    step3Body:
      'When a QR code or link appears, finish the confirmation in WeChat.',
    guardTitle: 'Codex will go step by step',
    guard1: 'The first step must succeed before the second starts.',
    guard2: 'If anything gets stuck, Codex handles the current step first.',
    guard3: 'At the end, you only scan or open the shown link to confirm.',
    defaultsTitle: 'Already chosen for you',
    default1: 'Everyday questions use a balanced mode.',
    default2: 'Harder questions get more careful handling.',
    default3: 'Instructions stay plain and easy to follow.',
  },

  guide: {
    pageTitle: 'Quick start',
    pageSubtitle:
      'From opening Codex to shipping a small tool — only the steps that matter.',

    tocTitle: 'Contents',

    sec1Title: 'Chapter 1 — What Codex is',
    sec1P1:
      'Think of Codex as a coding partner. You explain the business goal clearly; the rest is on Codex.',
    sec1P2:
      'The more clearly you describe what you want, the closer the first version will be to your vision.',
    sec1P3:
      'This tutorial covers desktop tools only: Windows / macOS. Double-click to open when done.',

    sec2Title: 'Chapter 2 — What you need',
    sec2Item1Title: 'A Windows or macOS computer',
    sec2Item1Body: 'Windows 10/11 or a recent macOS. 8 GB RAM is the minimum; 16 GB is more comfortable.',
    sec2Item2Title: 'A ChatGPT account',
    sec2Item2Body: 'Just sign in with your ChatGPT account.',
    sec2Item3Title: 'The Codex Desktop installer',
    sec2Item3Body: 'Download from the OpenAI site and double-click to install.',
    sec2Item4Title: 'No technical background needed',
    sec2Item4Body: 'If you can describe the workflow and judge whether the result is right, that\'s enough.',

    sec3Title: 'Chapter 3 — Opening Codex for the first time',
    sec3P1: 'You\'ll sign in on first launch and land in a chat-style interface.',
    sec3P2: 'Left: tasks. Center: conversation. Right: file preview.',
    sec3P3:
      'Just remember three moves: new task, paste a prompt, wait for the result.',

    sec4Title: 'Chapter 4 — Core actions in plain English',
    sec4Item1Title: 'New task = new conversation',
    sec4Item1Body:
      'One goal = one conversation. Don\'t mix several things in one thread.',
    sec4Item2Title: 'Prompt = what you tell Codex',
    sec4Item2Body:
      'Describe the input, the output, and what the screen looks like. Don\'t just say "build a tool."',
    sec4Item3Title: 'Wait = let it work',
    sec4Item3Body:
      'Ignore the technical details while it\'s working. Just check whether the app runs in the end.',
    sec4Item4Title: 'Run = see your app',
    sec4Item4Body: 'When it finishes, a window pops up — that\'s your tool.',
    sec4Item5Title: 'Not right? = keep talking',
    sec4Item5Body:
      'If something\'s off, just say so. Like "the button color is wrong" or "import crashes the app." Codex will fix it.',

    sec5Title: 'Chapter 5 — Five rules for great prompts',
    sec5Rule1Title: '1. Say who will use it',
    sec5Rule1Body: 'The user shapes the interface and the workflow.',
    sec5Rule2Title: '2. Say what problem it solves',
    sec5Rule2Body:
      'Don\'t just list features — describe the pain you want to remove.',
    sec5Rule3Title: '3. Give examples',
    sec5Rule3Body:
      '"Order ID, Amount, Date — group by month" beats "build me some stats" by a mile.',
    sec5Rule4Title: '4. Change one thing at a time',
    sec5Rule4Body:
      'One change per request. Much higher success rate.',
    sec5Rule5Title: '5. Don\'t panic on errors',
    sec5Rule5Body:
      'Copy the full error back to Codex and let it diagnose and fix itself.',

    sec6Title: 'Chapter 6 — Common issues',
    sec6Pit1Title: 'Issue 1 — The app won\'t start',
    sec6Pit1Body: 'Copy the full error and ask: "How do I fix this?"',
    sec6Pit2Title: 'Issue 2 — Things get messier with each tweak',
    sec6Pit2Body: 'If several fixes in a row don\'t help, start a new task and describe the need fresh.',
    sec6Pit3Title: 'Issue 3 — Too much too soon',
    sec6Pit3Body:
      'Start small: import one sheet, show one column. Once that works, add features.',
    sec6Pit4Title: 'Issue 4 — You can\'t tell what it\'s doing',
    sec6Pit4Body: 'Just ask: "What are you doing right now?"',

    secStopTitle: 'Chapter 7 — When to stop',
    secStopItem1Title: 'Stop once the artifact is real',
    secStopItem1Body: 'When the app opens, sample data runs through, and a file exports — pause feature work.',
    secStopItem2Title: 'Don\'t force the same bug forever',
    secStopItem2Body: 'If the same issue resists three fixes, ask Codex to disable the edge feature and keep the main flow.',
    secStopItem3Title: 'Save new ideas for v2',
    secStopItem3Body: 'Write extra ideas into a v2 list instead of turning version one into an endless project.',
    secStopItem4Title: 'Big changes deserve a new task',
    secStopItem4Body: 'Once the main flow works, use a fresh task for redesigns, stack swaps, or piles of new features.',

    sec7Title: 'Chapter 8 — Sharing what you built',
    sec7P1: 'Ask Codex to package as a Windows .exe or macOS .dmg installer.',
    sec7P2: 'Send it by chat, email, or cloud drive. Recipients double-click to install.',
    sec7P3: 'If antivirus warns them, just tell them "this is an internal tool" and let them allow it.',

    nextStepTitle: 'What\'s next',
    nextStepGenerator: 'Generate your first prompt',
    nextStepLessons: '7-day learning path',
    nextStepCookbook: 'Scenario cookbook',
    nextStepCases: 'Browse department cases',
  },

  tips: {
    pageTitle: 'Practical Tips',
    pageSubtitle: 'Small habits that save time and reduce frustration.',

    tip1Title: 'Use a role prompt for sharper answers',
    tip1Body:
      'Open with "You are a desktop app engineer." Codex will stay sharper and more focused.',
    tip2Title: 'Ask for a summary, then let it build',
    tip2Body:
      'Have it sketch a 10-line plan first. Once that looks right, let it implement and verify.',
    tip3Title: 'Show it the real file shape',
    tip3Body:
      'Paste real headers or a sanitized sample. It beats any verbal description.',
    tip4Title: 'Learn to roll back',
    tip4Body:
      'When something breaks, say "Go back to the last working version."',
    tip5Title: 'Use both Chinese and English',
    tip5Body:
      'Draft in Chinese to think it through, then have Codex turn it into an English prompt.',
    tip6Title: 'Keep your best prompts',
    tip6Body:
      'Save what works in a notes app. Tweak a few words next time and reuse it.',
    tip7Title: 'Have it write the user guide',
    tip7Body:
      'After the tool works, ask for a 500-word plain user guide.',
    tip8Title: 'Ask for friendly error handling',
    tip8Body:
      'Add: "Show a friendly message on invalid input — don\'t just crash."',
    tip9Title: 'Get acceptance criteria first',
    tip9Body:
      'Have it list 3 scenarios and acceptance checks. Confirm them before it starts building.',
    tip10Title: 'Say what NOT to change',
    tip10Body:
      'Before editing A, say: "Leave B and C exactly as they are."',
    tip11Title: 'Show, don\'t describe',
    tip11Body:
      'Skip "make it nicer." Paste a screenshot and say "this feel."',
    tip12Title: 'Start fresh after a milestone',
    tip12Body:
      'When a stage wraps up, open a new chat. Bring the latest prompt and the working version with you.',

    pitfallsTitle: 'Common misconceptions',
    pitfall1Title: 'It can\'t read what you didn\'t write',
    pitfall1Body:
      'Anything you leave out is invisible to Codex.',
    pitfall2Title: 'Don\'t be intimidated by technical details',
    pitfall2Body:
      'Skip the internals. Judge the app by how it actually behaves.',
    pitfall3Title: 'Don\'t dump 20 requirements at once',
    pitfall3Body:
      'Pack too many in and details slip. Split into rounds of four or five and quality jumps.',
    pitfall4Title: 'Don\'t start over on every error',
    pitfall4Body:
      'Errors are the best clue. Paste them back as-is and let Codex fix it.',
    pitfall5Title: 'Don\'t explain WHY — just say WHAT',
    pitfall5Body:
      'State the result you want. Skip the long rationale.',
    pitfall6Title: 'Don\'t skip checkpoints',
    pitfall6Body:
      'Every version that runs deserves a backup. Add a date to the folder name.',
  },

  faq: {
    pageTitle: 'FAQ',
    pageSubtitle: 'The questions people who know the work ask most often.',

    q1: 'Does Codex cost money?',
    a1: 'Codex needs an OpenAI account with a paid ChatGPT plan. See the OpenAI site for current pricing.',

    q2: 'I know my work, not code. Will this work for me?',
    a2: 'Absolutely. You describe the workflow and acceptance criteria; the technical work goes to Codex.',

    q3: 'Can I share what I build with teammates?',
    a3: 'Yes. Have Codex package it as an .exe or .dmg installer, and send it along.',

    q4: 'Is what Codex generates safe?',
    a4: 'Local tools carry relatively low risk. For sensitive data, it helps to have a technical colleague take a look.',

    q5: 'My app is slow. What do I do?',
    a5: 'Tell Codex: "The app is slow on large files — please optimize." It will track down the bottleneck and fix it.',

    q6: 'Can I build a mobile app?',
    a6: 'You can, but this tutorial covers desktop only. Mobile publishing is quite a bit more involved.',

    q7: 'Can it connect to the internet?',
    a7: 'Yes, but start with offline tools to get your feet wet. Have a technical colleague look over the online parts.',

    q8: 'How do I know the result is correct?',
    a8: 'You are the acceptance tester — judge the app by its behavior and final output.',

    q9: 'Can I collaborate with teammates?',
    a9: 'Yes. Share your prompts, or pass around the packaged installer.',

    q10: 'Who do I contact when something breaks?',
    a10: 'Ask Codex first — it can solve most issues. For account or billing problems, contact OpenAI support.',

    q11: 'Can an average computer run it?',
    a11: 'Usually yes. 8 GB RAM and about 10 GB free disk space is a comfortable baseline.',

    q12: 'Will Codex upload my local files to the internet?',
    a12: 'It only reads the files you hand to it. Anonymize sensitive data before sharing.',

    q13: 'The first response is full of jargon. What do I do?',
    a13: 'Send this back: "Plain language only, skip the jargon. Five sentences for the next step, then continue and verify."',

    q14: 'How do I keep usage costs in check?',
    a14: 'One task per chat. Start fresh after it runs. Reuse your best prompts for repeat work.',

    q15: 'Can I commercialize what I build?',
    a15: 'Internal use is usually fine. Before selling externally, check OpenAI terms and dependency licenses.',

    q16: 'Friends ask "did you really build this?" — what do I say?',
    a16: 'Try: "I wrote the requirements. Codex built the first version. I verified and iterated."',
  },

  footer: {
    about: 'About',
    aboutBody:
      'A Codex Desktop guide for people who know the work.',
    resourcesTitle: 'Resources',
    resourceOpenAI: 'Codex site',
    resourceCodexDocs: 'Codex docs',
    resourceGithub: 'GitHub repo',
    builtWith: 'Modern frontend, edge-hosted, optimized for mainland China.',
    copyright: '© 2026 codex.ifq.ai — MIT License',

    languageLabel: 'Language',
    contactTitle: 'Feedback',
    contactBody: 'Spotted an issue or have a case to share? Open an issue on GitHub.',
  },

  common: {
    back: 'Back',
    next: 'Next',
    more: 'More',
    less: 'Less',
    loading: 'Loading',
    error: 'Error',
  },

  lessons: {
    pageTitle: '7-day Path',
    pageSubtitle: '15 minutes a day. Ship a working tool by the end of the week.',
    dayLabel: 'Day {n}',
    startLabel: 'Start',
    day1Title: 'Meet Codex Desktop',
    day1Hook: 'Install, open, find your way around',
    day1Goals: 'Install Codex · Sign in · Get to know the three panels',
    day2Title: 'Ship your first tiny tool',
    day2Hook: 'Run a small Excel summary tool end to end',
    day2Goals: 'Copy a tutorial prompt · Paste into Codex · See a window pop up',
    day3Title: 'Describe the workflow clearly',
    day3Hook: 'Clearer description, steadier results',
    day3Goals: 'Define the user · Give examples · Change one thing at a time',
    day4Title: 'Let Codex fix its own problems',
    day4Hook: 'Errors aren\'t failures — hand them back',
    day4Goals: 'Paste errors · Roll back · Tell crashes from wrong behavior',
    day5Title: 'Speak in real data',
    day5Hook: 'Real fields lead to better results',
    day5Goals: 'Paste real headers · Explain each field · Build features around the data',
    day6Title: 'Package and share',
    day6Hook: 'From "works on your machine" to "works for the team"',
    day6Goals: 'Package .exe / .dmg · Test the install · Write a short user guide',
    day7Title: 'Ship v2',
    day7Hook: 'Two small rounds take you from "works" to "feels good"',
    day7Goals: 'Collect feedback · Fix one thing at a time · Plan the next tool',
    recapTitle: 'After seven days, you can ship on your own',
    recapBody:
      'You can install, brief, debug, package, and share. From here, turn the repetitive parts of your work into tools, one at a time.',
  },

  cases: {
    pageTitle: 'Department Cases',
    pageSubtitle:
      'Pick a department case, copy the prompt, tweak a few words, and you\'re ready.',

    filterAll: 'All',
    filterFinance: 'Finance',
    filterOperations: 'Operations',
    filterCustomerService: 'Customer Service',
    filterHR: 'HR',
    filterLogistics: 'Logistics',
    filterProcurement: 'Procurement',
    filterMarketing: 'Marketing',
    filterLegal: 'Legal',
    filterData: 'Data',
    filterAdmin: 'Admin',
    filterProduct: 'Product',

    readCase: 'Open case',
    copyPrompt: 'Copy prompt',
    copyPromptZh: 'Copy Chinese prompt',
    copyPromptEn: 'Copy English prompt',
    copied: 'Copied',

    sectionPain: 'The problem to solve',
    sectionSolution: 'Solution',
    sectionExpected: 'Expected outcome',
    sampleFieldsTitle: 'Example input fields',
    sampleFieldsHint: 'Before copying, rename your Excel / CSV headers to match these fields — or just paste your real headers into Codex along with the prompt.',
    sectionPrompt: 'Copy-ready prompt',
    sectionAfter: 'After you copy',
    after1: 'Open Codex Desktop and start a new task',
    after2: 'Paste the whole prompt into the chat and send',
    after3: 'Let Codex build and verify, then tweak names, fields, and buttons as you like',

    backToCases: 'Back to cases',
    tryInGenerator: 'Customize this case in the generator',
    relatedCases: 'More from this department',
    windowsBadge: 'Windows app',
  },

  cookbook: {
    pageTitle: 'Scenario Cookbook',
    pageSubtitle:
      'Small everyday needs — each with a copy-ready prompt. Covers office work, data cleanup, and daily e-commerce tasks.',
    copyRecipe: 'Copy prompt',
    recipeAfter: 'Paste into Codex and follow along',
  },
} as const;
