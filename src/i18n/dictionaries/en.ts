export const en = {
  meta: {
    siteName: 'Codex Business Guide',
    siteTagline: 'Know the work? Turn it into a desktop tool with Codex.',
    description:
      'A practical Codex Desktop guide for business professionals: prompt generator, department cases, and recipes to build local Windows / macOS tools.',
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
    ],
  },

  nav: {
    home: 'Home',
    generator: 'Prompt',
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
    heroTitleLine2: 'Just tell Codex clearly.',
    heroSubtitle:
      'Describe the goal and flow, copy the prompt into Codex Desktop. Minutes later, a working local tool appears.',
    heroCtaPrimary: 'Generate your first prompt',
    heroCtaSecondary: 'See how it works',
    heroStatsLabel1: 'Ready-made cases',
    heroStatsValue1: '90+',
    heroStatsLabel2: 'Fill-in-the-blank',
    heroStatsValue2: 'Prompts',
    heroStatsLabel3: 'Your own tool',
    heroStatsValue3: 'Local',
    heroBadgeWindows: 'Windows 11 · 10',
    heroBadgeMac: 'macOS ready',

    flowTitle: 'Three steps from workflow to tool',
    flowSubtitle: 'Describe. Copy. Run.',
    flowStep1Title: 'Describe the goal and flow',
    flowStep1Body:
      'Say who uses it, what goes in, and what comes out. Sensible defaults are pre-selected.',
    flowStep2Title: 'Click "Copy prompt"',
    flowStep2Body:
      'The system assembles a complete prompt. You just copy it.',
    flowStep3Title: 'Paste into Codex Desktop',
    flowStep3Body:
      'Codex writes, runs, fixes, and verifies. When a window appears, your tool is ready.',

    featuresTitle: 'Why it works when you know the work',
    featuresSubtitle: 'No command line. No GitHub.',
    feature1Title: 'Business language first',
    feature1Body:
      'Start with the scenario, flow, and acceptance criteria. Technical details come later.',
    feature2Title: 'Fill-in-the-blank prompts',
    feature2Body:
      'Platform, UI, and storage are multiple-choice. You only write the goal and features.',
    feature3Title: 'Ready-made department cases',
    feature3Body:
      'Real scenarios across finance, operations, support, HR, logistics, procurement, marketing, legal, data, admin, and product teams.',
    feature4Title: 'Local desktop tools first',
    feature4Body:
      'Core cases produce double-clickable tools: reconciliation, order cleanup, Excel automation, and file batch processing.',
    feature5Title: 'Bilingual (CN / EN)',
    feature5Body:
      'Chinese for understanding, English for Codex. Same content throughout.',
    feature6Title: 'Ship first, polish later',
    feature6Body:
      'Get one real workflow running today.',

    ctaTitle: 'Start with one workflow',
    ctaBody: 'Turn the most repetitive task on your desk into a tool.',
    ctaButton: 'Generate prompt',

    caseTeaserTitle: 'Your team already has a case',
    caseTeaserSubtitle: 'Pick a close scenario and adjust a few words.',
    caseTeaserMore: 'Browse all department cases',

    trustTitle: 'Content principles',
    trustLine1: 'Real workflows, tested prompts.',
    trustLine2: 'Bilingual, fast in mainland China.',
    trustLine3: 'Open source, transparent updates.',
  },

  generator: {
    pageTitle: 'Prompt Generator',
    pageSubtitle:
      'Describe the goal, input, and output. The defaults handle the rest.',

    defaultsHint: 'Sensible defaults are pre-selected — ready to use as-is.',

    sectionPlatform: '1. What platform?',
    platformWindows: 'Windows',
    platformMac: 'macOS',
    platformBoth: 'Both Windows and macOS',
    platformHint: 'Most offices run Windows, so it is pre-selected.',

    sectionTech: '2. How should it be built?',
    techLabel: 'Approach',
    techHintRecommended: 'Recommended',
    techOptionElectron: 'Standard (most stable, largest community)',
    techOptionTauri: 'Lightweight (smaller binary, faster startup)',
    techOptionPyQt: 'Utility (great for quick one-off tools)',
    techOptionAuto: 'Let Codex decide (recommended)',

    sectionUI: '3. Look and feel',
    uiLabel: 'Style',
    uiOptionMinimal: 'Minimal (white, clean, spacious)',
    uiOptionDark: 'Dark (system-aware, easy on the eyes)',
    uiOptionFresh: 'Fresh (light, subtle accents, soft dividers)',
    uiOptionBusiness: 'Dashboard (dense information, tables)',

    sectionData: '4. Where should data live?',
    dataLabel: 'Storage',
    dataOptionLocalFile: 'Local files (Excel / CSV — simplest)',
    dataOptionSqlite: 'Local database (handles tens of thousands of rows)',
    dataOptionNone: 'No storage (one-shot tool)',

    sectionComplexity: '5. How complete should it be?',
    complexityHint: 'Standard is the default. Pick Starter for a quick first try.',
    complexityOptionStarter: 'Starter (main flow only)',
    complexityOptionStandard: 'Standard (recommended for sharing with colleagues)',
    complexityOptionAdvanced: 'Team-ready (settings, history, recovery)',

    sectionGoal: '6. Who is it for? What problem does it solve?',
    goalLabel: 'Goal (one or two sentences)',
    goalPlaceholder:
      'Example: For the finance team. Monthly reconciliation takes two days — cut it to one hour.',

    sectionFeatures: '7. What should it do?',
    featuresLabel: 'Features (one per line, be specific)',
    featuresPlaceholder:
      '- Import Excel files for orders and bank statements\n- Auto-match by order ID and highlight mismatches\n- Export mismatches as a new Excel file',

    sectionExtras: '8. Extra requirements (optional)',
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
      'Copy the entire block into Codex Desktop. It will outline the plan briefly, then build.',
    copyButton: 'Copy prompt',
    copied: 'Copied',
    copyFailed: 'Copy failed',
    copyNextPrompt: 'Copied. Next: Codex Desktop → new task → paste → send.',
    copyNextRecovery: 'Fix prompt copied. Send it along with the error message.',
    recoveryTitle: 'If something goes wrong, copy this',
    recoveryHint: 'If launch or packaging gets stuck, send this to Codex.',
    recoveryEvidenceLabel: 'Optional: paste the error or log here',
    recoveryEvidencePlaceholder:
      'Example: last 80 terminal lines, error dialog text, and what you clicked. It gets appended when you copy the fix prompt.',
    recoveryEvidenceHint: 'Nothing is uploaded — only appended locally to the fix prompt.',
    copyRecoveryButton: 'Copy fix prompt',
    resetButton: 'Reset form',
    langToggle: 'Switch language',
    langToggleHint:
      'English prompts tend to be more stable; Chinese works too.',
    qualityTitle: 'Pre-copy check',
    qualityReady: 'Looks good',
    qualityNeedsInput: 'Needs more detail',
    qualityCoverage: 'Coverage: {passed}/{total} key inputs',
    qualityGoal: 'Goal',
    qualityFeatures: 'Features',
    qualityIo: 'Input/output',
    qualityAcceptance: 'Acceptance',
    qualityPass: 'OK',
    qualityImprove: 'Add',

    quickTemplatesTitle: 'Don\'t want to start from scratch? Pick a template',
    quickTemplatesHint: 'One click fills the form. Tweak a few words.',

    validationMissingGoal: 'Add a goal first.',
    validationMissingFeatures: 'Add at least one feature first.',

    historyTitle: 'Recent prompts',
    historyEmpty: 'No history yet. Saved only in your browser.',
    historyLoad: 'Load',
    historyDelete: 'Delete',
    historyClearAll: 'Clear all',

    tipCardTitle: 'Tip',
    tipCardBody:
      'You provide the business judgment; Codex handles implementation. Say who uses it, what goes in, and what comes out.',
    promptStep1Title: 'Pick a template',
    promptStep1Body: 'When unsure, keep the recommended defaults.',
    promptStep2Title: 'Describe goal and flow',
    promptStep2Body: 'Clarify input, processing, and output.',
    promptStep3Title: 'Hand it to Codex',
    promptStep3Body: 'Paste and let Codex build, run, and verify.',
  },

  guide: {
    pageTitle: 'Quick start',
    pageSubtitle:
      'From opening Codex to shipping a small tool — only the steps that matter.',

    tocTitle: 'Contents',

    sec1Title: 'Chapter 1 — What Codex is',
    sec1P1:
      'Think of Codex as a coding partner. You describe the business goal; it writes the code.',
    sec1P2:
      'The clearer your description, the closer the first version will be to what you need.',
    sec1P3:
      'This tutorial covers desktop tools only: Windows / macOS, double-click to open.',

    sec2Title: 'Chapter 2 — What you need',
    sec2Item1Title: 'A Windows or macOS computer',
    sec2Item1Body: 'Windows 10/11 or recent macOS. 8 GB RAM minimum; 16 GB is more comfortable.',
    sec2Item2Title: 'A ChatGPT account',
    sec2Item2Body: 'Sign in with your OpenAI account. Your ChatGPT login works.',
    sec2Item3Title: 'The Codex Desktop installer',
    sec2Item3Body: 'Download from OpenAI and install.',
    sec2Item4Title: 'No technical background required',
    sec2Item4Body: 'If you can describe the workflow and verify the result, that is enough.',

    sec3Title: 'Chapter 3 — Opening Codex for the first time',
    sec3P1: 'Sign in on first launch. You will see a chat-style interface.',
    sec3P2: 'Left panel: tasks. Center: conversation. Right: file preview.',
    sec3P3:
      'Remember three actions: new task, enter prompt, wait for the result.',

    sec4Title: 'Chapter 4 — Core actions in plain English',
    sec4Item1Title: 'New task = new conversation',
    sec4Item1Body:
      'One goal per conversation. Don\'t mix multiple apps in one thread.',
    sec4Item2Title: 'Prompt = what you tell Codex',
    sec4Item2Body:
      'Describe the input, output, and screen layout. Don\'t just say “build a tool.”',
    sec4Item3Title: 'Wait = let it work',
    sec4Item3Body:
      'Ignore the technical details while it works. Just check whether the app runs.',
    sec4Item4Title: 'Run = see your app',
    sec4Item4Body: 'When it finishes, a window appears. That is your program.',
    sec4Item5Title: 'Problem? = keep talking',
    sec4Item5Body:
      'If something is off, say it plainly. Codex will fix it.',

    sec5Title: 'Chapter 5 — Five rules for good prompts',
    sec5Rule1Title: '1. Say who will use it',
    sec5Rule1Body: 'The user determines the workflow and UI design.',
    sec5Rule2Title: '2. Say what problem it solves',
    sec5Rule2Body:
      'Don\'t just list features — describe the pain they remove.',
    sec5Rule3Title: '3. Give examples',
    sec5Rule3Body:
      '”Order ID, Amount, Date — group by month” beats “build me some stats.”',
    sec5Rule4Title: '4. Change one thing at a time',
    sec5Rule4Body:
      'One change per request. Higher success rate.',
    sec5Rule5Title: '5. Don\'t panic on errors',
    sec5Rule5Body:
      'Copy the full error back to Codex and let it fix itself.',

    sec6Title: 'Chapter 6 — Common issues',
    sec6Pit1Title: 'Issue 1 — The app won\'t start',
    sec6Pit1Body: 'Copy the full error and ask: “How do I fix this?”',
    sec6Pit2Title: 'Issue 2 — Things get messier with each tweak',
    sec6Pit2Body: 'If several fixes fail, start a fresh task with cleaner requirements.',
    sec6Pit3Title: 'Issue 3 — Too much too soon',
    sec6Pit3Body:
      'Start small: import one sheet, show one column. Expand once it works.',
    sec6Pit4Title: 'Issue 4 — You can\'t tell what it\'s doing',
    sec6Pit4Body: 'Ask: “What are you doing right now?”',

    secStopTitle: 'Chapter 7 — When to stop',
    secStopItem1Title: 'Stop when the artifact is real',
    secStopItem1Body: 'If the app opens, sample data completes, and a file exports — pause feature work.',
    secStopItem2Title: 'Don\'t force the same bug forever',
    secStopItem2Body: 'If the same issue fails three fixes, ask Codex to disable the edge feature and keep the main flow.',
    secStopItem3Title: 'Save new ideas for v2',
    secStopItem3Body: 'Write extra ideas into a v2 list instead of turning version one into an endless project.',
    secStopItem4Title: 'Open a new task for big changes',
    secStopItem4Body: 'After the main flow works, use a fresh task for redesigns, stack changes, or many new features.',

    sec7Title: 'Chapter 8 — Sharing what you built',
    sec7P1: 'Ask Codex to package as Windows .exe or macOS .dmg.',
    sec7P2: 'Send it by email, chat, or drive. Recipients double-click to install.',
    sec7P3: 'If antivirus warns, tell them “this is an internal tool” to allow it.',

    nextStepTitle: 'What\'s next',
    nextStepGenerator: 'Generate your first prompt',
    nextStepLessons: '7-day learning path',
    nextStepCookbook: 'Scenario cookbook',
    nextStepCases: 'Browse department cases',
  },

  tips: {
    pageTitle: 'Practical Tips',
    pageSubtitle: 'Habits that save time and reduce frustration.',

    tip1Title: 'Use a role prompt for sharper answers',
    tip1Body:
      'Start with: “You are a desktop app engineer.” Codex will stay more focused.',
    tip2Title: 'Ask for a summary, then let it build',
    tip2Body:
      'Request a 10-line plan first. If nothing blocks it, let it continue to build and verify.',
    tip3Title: 'Show it the real file shape',
    tip3Body:
      'Paste headers or a sanitized sample. It beats any verbal description.',
    tip4Title: 'Learn to roll back',
    tip4Body:
      'If something breaks, say “Go back to the last working version.”',
    tip5Title: 'Use both Chinese and English',
    tip5Body:
      'Draft in Chinese, then ask Codex to turn it into an English prompt.',
    tip6Title: 'Save your best prompts',
    tip6Body:
      'Keep successful prompts in a notes app. Reuse and tweak them for similar tasks.',
    tip7Title: 'Ask it to write the user manual',
    tip7Body:
      'After it works, ask for a plain user guide under 500 words.',
    tip8Title: 'Request friendly error handling',
    tip8Body:
      'Add: “Invalid input should show a friendly message, not crash.”',
    tip9Title: 'Ask for acceptance criteria first',
    tip9Body:
      'Have it list 3 user scenarios and acceptance checks before building.',
    tip10Title: 'Say what NOT to change',
    tip10Body:
      'When editing A, say: “Keep B and C unchanged.”',
    tip11Title: 'Show, don\'t describe',
    tip11Body:
      'Don\'t say “make it clean.” Paste a screenshot and say “like this.”',
    tip12Title: 'Start a fresh chat after a milestone',
    tip12Body:
      'After a milestone, open a new chat with the latest prompt and working version.',

    pitfallsTitle: 'Common misconceptions',
    pitfall1Title: 'It doesn\'t know what you didn\'t write',
    pitfall1Body:
      'Unwritten requirements are invisible to Codex.',
    pitfall2Title: 'Don\'t be intimidated by technical details',
    pitfall2Body:
      'Ignore the internals. Focus on the app\'s behavior.',
    pitfall3Title: 'Don\'t dump 20 requirements at once',
    pitfall3Body:
      'Split into rounds of four or five. Quality improves noticeably.',
    pitfall4Title: 'Don\'t start over on every error',
    pitfall4Body:
      'Errors are useful clues. Paste them back.',
    pitfall5Title: 'Don\'t explain WHY — just say WHAT',
    pitfall5Body:
      'State what you want. Skip the long rationale.',
    pitfall6Title: 'Don\'t skip checkpoints',
    pitfall6Body:
      'When it runs, copy the folder with a timestamp.',
  },

  faq: {
    pageTitle: 'FAQ',
    pageSubtitle: 'Common questions from people who know the work, not code.',

    q1: 'Does Codex cost money?',
    a1: 'Codex requires an OpenAI account with a paid ChatGPT plan. Check OpenAI for current pricing.',

    q2: 'I know the business, not code. Can I use this?',
    a2: 'Absolutely. You define the workflow and acceptance criteria; Codex handles the implementation.',

    q3: 'Can I share what I build with teammates?',
    a3: 'Yes. Ask Codex to package as .exe or .dmg, then share the installer.',

    q4: 'Is what Codex generates safe?',
    a4: 'Local tools are lower risk. For sensitive data, have a technical colleague review it.',

    q5: 'My app is slow. What do I do?',
    a5: 'Tell Codex: “The app is slow on large files. Please optimize.” It will find and fix the bottleneck.',

    q6: 'Can I build a mobile app?',
    a6: 'Yes, but this tutorial covers desktop only. Mobile publishing is more involved.',

    q7: 'Can it connect to the internet?',
    a7: 'Yes, but start offline for stability. Have a technical colleague review online features.',

    q8: 'How do I know the result is correct?',
    a8: 'You are the acceptance tester — check the behavior and final output.',

    q9: 'Can I collaborate with teammates?',
    a9: 'Yes. Share your prompts or the packaged installer.',

    q10: 'Who do I contact if something breaks?',
    a10: 'Ask Codex first. For account or billing issues, contact OpenAI support.',

    q11: 'Can an average computer run it?',
    a11: 'Usually yes. 8 GB RAM and about 10 GB free disk space is a good baseline.',

    q12: 'Will Codex upload my local files to the internet?',
    a12: 'It only reads files you provide. Anonymize sensitive data before sending.',

    q13: 'The first response is full of jargon. What do I do?',
    a13: 'Say: “Plain language only. Explain the next step in one sentence, then continue and verify.”',

    q14: 'How do I keep usage costs in check?',
    a14: 'One task per chat. Start fresh after it runs. Reuse proven prompts.',

    q15: 'Can I commercialize what I build?',
    a15: 'Internal use is usually fine. Before resale, check OpenAI terms and dependency licenses.',

    q16: 'Friends ask: “did you really build this?” — what do I say?',
    a16: 'Say: “I wrote the requirements. Codex generated the first version. I tested and iterated.”',
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
    contactBody: 'Found an issue or have a case to share? Open an issue.',
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
    pageSubtitle: '15 minutes a day. Ship a working tool in a week.',
    dayLabel: 'Day {n}',
    startLabel: 'Start',
    day1Title: 'Meet Codex Desktop',
    day1Hook: 'Install, open, and get comfortable with the layout',
    day1Goals: 'Install Codex · Sign in · Learn the three panels',
    day2Title: 'Ship your first tiny tool',
    day2Hook: 'Run a small Excel summary tool end to end',
    day2Goals: 'Copy a tutorial prompt · Paste into Codex · See a window appear',
    day3Title: 'Describe the flow clearly',
    day3Hook: 'Clearer descriptions, better results',
    day3Goals: 'Define the user role · Give examples · Change one thing at a time',
    day4Title: 'Let Codex fix its own problems',
    day4Hook: 'Errors are not failures — feed them back',
    day4Goals: 'Paste errors · Roll back · Distinguish crashes from wrong behavior',
    day5Title: 'Show it real data',
    day5Hook: 'Real headers lead to better results',
    day5Goals: 'Paste headers · Explain fields · Build around your data',
    day6Title: 'Package and share',
    day6Hook: 'From "works for you" to "works for the team"',
    day6Goals: 'Package .exe / .dmg · Test install · Write a short guide',
    day7Title: 'Ship v2',
    day7Hook: 'Two small rounds turn "works" into "feels good"',
    day7Goals: 'Collect feedback · Fix one thing at a time · Plan the next tool',
    recapTitle: 'After day seven, you can ship independently',
    recapBody:
      'You can install, prompt, verify, and share. Now turn repetitive work into tools, one at a time.',
  },

  cases: {
    pageTitle: 'Department Cases',
    pageSubtitle:
      'Pick a department case. Copy the prompt. Change a few words to fit.',

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

    sectionPain: 'The problem',
    sectionSolution: 'Solution',
    sectionExpected: 'Expected result',
    sampleFieldsTitle: 'Example input fields',
    sampleFieldsHint: 'Before copying, rename your Excel / CSV headers to match these fields, or paste your real headers into Codex.',
    sectionPrompt: 'Ready-to-use prompt',
    sectionAfter: 'After copying',
    after1: 'Open Codex Desktop and create a new task',
    after2: 'Paste the full prompt and send',
    after3: 'Let Codex build and verify, then adjust names, fields, and buttons as needed',

    backToCases: 'Back to cases',
    tryInGenerator: 'Customize this case in the generator',
    relatedCases: 'More from this department',
    windowsBadge: 'Windows app',
  },

  cookbook: {
    pageTitle: 'Scenario Cookbook',
    pageSubtitle:
      'Common small tasks, each with a copy-ready prompt. Covers office work, data cleanup, and daily e-commerce tools.',
    copyRecipe: 'Copy prompt',
    recipeAfter: 'Paste into Codex and follow along',
  },
} as const;
