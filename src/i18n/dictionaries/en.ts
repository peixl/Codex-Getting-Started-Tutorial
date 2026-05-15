export const en = {
  meta: {
    siteName: 'Codex Business Guide',
    siteTagline: 'Turn business expertise into desktop tools with Codex',
    description:
      'A concise Codex Desktop guide for business teams: prompt generator, workflow practice, department cases, and recipes for local Windows / macOS tools.',
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
    lessons: '7-day sprint',
    cookbook: 'Cookbook',
    cases: 'Cases',
    tips: 'Practical tips',
    faq: 'FAQ',
    tryNow: 'Get started',
    switchLang: 'Switch language',
  },

  home: {
    heroEyebrow: 'For business teams',
    heroTitleLine1: 'Turn business expertise',
    heroTitleHighlight: 'into a working tool.',
    heroTitleLine2: 'Tell Codex clearly.',
    heroSubtitle:
      'Fill in the goal and flow, copy the prompt, paste into Codex Desktop. A few minutes later, see a local tool running.',
    heroCtaPrimary: 'Generate your first prompt',
    heroCtaSecondary: 'See how it works',
    heroStatsLabel1: 'Ready-made cases',
    heroStatsValue1: '90+',
    heroStatsLabel2: 'Fill the blanks',
    heroStatsValue2: 'Prompts',
    heroStatsLabel3: 'Your own tool',
    heroStatsValue3: 'Local',
    heroBadgeWindows: 'Windows 11 · 10',
    heroBadgeMac: 'macOS ready',

    flowTitle: 'Three steps from workflow to tool',
    flowSubtitle: 'Fill. Copy. Run.',
    flowStep1Title: 'Describe the goal and flow',
    flowStep1Body:
      'Say who uses it, what goes in, and what comes out. Defaults are ready.',
    flowStep2Title: 'Click "Copy prompt"',
    flowStep2Body:
      'We assemble the prompt. You just copy it.',
    flowStep3Title: 'Paste into Codex Desktop',
    flowStep3Body:
      'Codex writes, runs, fixes, and verifies. A new window means your tool is alive.',

    featuresTitle: 'Why this works for business teams',
    featuresSubtitle: 'No command line or GitHub required.',
    feature1Title: 'Business language first',
    feature1Body:
      'Start with scenario, flow, and acceptance. Add technical details only when needed.',
    feature2Title: 'Fill-in-the-blank prompts',
    feature2Body:
      'Platform, UI, and storage are choices. You write only goal and features.',
    feature3Title: 'Ready-made department cases',
    feature3Body:
      'Real scenarios across finance, operations, support, HR, logistics, procurement, marketing, legal, data, admin, and product teams.',
    feature4Title: 'Start with local desktop tools',
    feature4Body:
      'Core cases build double-clickable tools: reconciliation, order cleanup, Excel automation, and local file batch processing.',
    feature5Title: 'Bilingual (CN / EN)',
    feature5Body:
      'Chinese for learning, English for Codex. Same content.',
    feature6Title: 'Ship first, refine next',
    feature6Body:
      'Get one real workflow running today.',

    ctaTitle: 'Start with one workflow',
    ctaBody: 'Turn the most repetitive task on your desk into a tool.',
    ctaButton: 'Generate prompt',

    caseTeaserTitle: 'Your team already has a case',
    caseTeaserSubtitle: 'Pick a close scenario and adjust a few words.',
    caseTeaserMore: 'See all department cases',

    trustTitle: 'Content principles',
    trustLine1: 'Real workflows, tested prompts.',
    trustLine2: 'Bilingual and fast in mainland China.',
    trustLine3: 'Open source, with transparent updates.',
  },

  generator: {
    pageTitle: 'Prompt Generator',
    pageSubtitle:
      'Write the goal, input, and output. The defaults are ready to use.',

    defaultsHint: 'Good defaults are already selected.',

    sectionPlatform: '1. What kind of software?',
    platformWindows: 'For Windows PCs',
    platformMac: 'For macOS',
    platformBoth: 'Both Windows and macOS',
    platformHint: 'Most offices use Windows, so it is pre-selected.',

    sectionTech: '2. How should it be built (pick a direction)',
    techLabel: 'Approach',
    techHintRecommended: 'Recommended',
    techOptionElectron: 'Standard (most stable, largest community)',
    techOptionTauri: 'Lightweight (smaller binary, faster startup)',
    techOptionPyQt: 'Utility style (great for small one-off tools)',
    techOptionAuto: 'Let Codex decide (recommended)',

    sectionUI: '3. What should it look like',
    uiLabel: 'Look and feel',
    uiOptionMinimal: 'Minimal (white background, clean, spacious)',
    uiOptionDark: 'Dark (system-aware, clear, easy on the eyes)',
    uiOptionFresh: 'Fresh (light, restrained accents, subtle dividers)',
    uiOptionBusiness: 'Dashboard (dense information, tables)',

    sectionData: '4. Where should data live?',
    dataLabel: 'Storage',
    dataOptionLocalFile: 'In files on your PC (Excel / CSV — simplest)',
    dataOptionSqlite: 'In a local mini-database (handles tens of thousands of rows)',
    dataOptionNone: 'No storage (one-shot tool)',

    sectionComplexity: '5. How complete should it be?',
    complexityHint: 'Standard is the default. Pick Starter for a quick first try.',
    complexityOptionStarter: 'Starter MVP (main flow first)',
    complexityOptionStandard: 'Standard business version (recommended)',
    complexityOptionAdvanced: 'Team-ready version (settings, history, recovery)',

    sectionGoal: '6. Who is it for? What problem does it solve?',
    goalLabel: 'Goal (one or two sentences)',
    goalPlaceholder:
      'Example: For finance. Monthly reconciliation takes two days; cut it to one hour.',

    sectionFeatures: '7. What should it do?',
    featuresLabel: 'Features (one per line, be specific)',
    featuresPlaceholder:
      '- Import Excel files for orders and bank statements\n- Auto-match by order ID and highlight mismatches\n- Export the mismatches as a new Excel file',

    sectionExtras: '8. Extra requests (optional)',
    extraOfflineLabel: 'Works offline',
    extraOfflineHint: 'Runs without the internet',
    extraBilingualLabel: 'Bilingual UI',
    extraBilingualHint: 'Switchable English / Chinese',
    extraExportLabel: 'Export results',
    extraExportHint: 'Save as files you can share',
    extraShortcutLabel: 'Keyboard shortcuts',
    extraShortcutHint: 'Faster for power users',
    extraAccessibilityLabel: 'Accessible (screen reader friendly)',
    extraAccessibilityHint: 'Works with screen readers',

    sectionOutput: 'The prompt to copy',
    outputHint:
      'Copy the whole block into Codex Desktop. It will summarize briefly, then build.',
    copyButton: 'Copy prompt',
    copied: 'Copied',
    copyFailed: 'Copy failed',
    copyNextPrompt: 'Copied. Next: Codex Desktop → new task → paste → send.',
    copyNextRecovery: 'Fix prompt copied. Send it with the error message.',
    recoveryTitle: 'If it fails, copy this next',
    recoveryHint: 'If launch, errors, or packaging get stuck, send this to Codex.',
    recoveryEvidenceLabel: 'Optional: paste the error/log here',
    recoveryEvidencePlaceholder:
      'Example: last 80 terminal lines, error dialog text, and what you clicked. It is appended when you copy the fix prompt.',
    recoveryEvidenceHint: 'Not uploaded; only appended locally to the fix prompt.',
    copyRecoveryButton: 'Copy fix prompt',
    resetButton: 'Reset form',
    langToggle: 'Switch language',
    langToggleHint:
      'English is usually steadier; Chinese works too.',
    qualityTitle: 'Pre-copy check',
    qualityReady: 'Clear enough',
    qualityNeedsInput: 'Add detail',
    qualityCoverage: 'Quality coverage: {passed}/{total} key inputs',
    qualityGoal: 'Goal',
    qualityFeatures: 'Features',
    qualityIo: 'Input/output',
    qualityAcceptance: 'Acceptance',
    qualityGoalSpecific: 'Specific goal',
    qualityFeatureClarity: 'Actionable features',
    qualityScopeReasonable: 'Reasonable scope',
    qualityPass: 'OK',
    qualityImprove: 'Add',

    quickTemplatesTitle: 'Don’t feel like writing? Start from a template',
    quickTemplatesHint: 'One click fills the form. Tweak a few words.',

    validationMissingGoal: 'Add a goal first.',
    validationMissingFeatures: 'Add at least one request first.',

    historyTitle: 'Recent prompts',
    historyEmpty: 'No history yet. Saved only in your browser.',
    historyLoad: 'Load',
    historyDelete: 'Delete',
    historyClearAll: 'Clear all',

    tipCardTitle: 'Note',
    tipCardBody:
      'You provide the business judgment; Codex handles implementation. Say who uses it, what goes in, and what comes out.',
    promptStep1Title: 'Pick a template',
    promptStep1Body: 'When unsure, keep the recommended defaults.',
    promptStep2Title: 'Write goal and flow',
    promptStep2Body: 'Clarify input, processing, and output.',
    promptStep3Title: 'Hand it to Codex',
    promptStep3Body: 'Paste it and let Codex build, run, and verify.',
  },

  guide: {
    pageTitle: 'Quick start',
    pageSubtitle:
      'From opening Codex to shipping a small tool, with only the necessary steps.',

    tocTitle: 'Contents',

    sec1Title: 'Chapter 1 — What Codex is',
    sec1P1:
      'Think of Codex as an implementation partner. You describe the business goal; it writes the code.',
    sec1P2:
      'Describe the idea clearly, and Codex can build the first version.',
    sec1P3:
      'This tutorial covers desktop tools only: Windows / macOS, double-click to open.',

    sec2Title: 'Chapter 2 — What you need',
    sec2Item1Title: 'A Windows PC or macOS computer',
    sec2Item1Body: 'Windows 10/11 or recent macOS. 8 GB RAM minimum; 16 GB is nicer.',
    sec2Item2Title: 'A ChatGPT account',
    sec2Item2Body: 'Use an OpenAI account. Your ChatGPT login works.',
    sec2Item3Title: 'The Codex Desktop installer',
    sec2Item3Body: 'Download it from OpenAI and install.',
    sec2Item4Title: 'You do not need the tech stack first',
    sec2Item4Body: 'Describe the workflow and verify the result. That is enough.',

    sec3Title: 'Chapter 3 — Opening Codex for the first time',
    sec3P1: 'On first launch, sign in.',
    sec3P2: 'Left: tasks. Middle: chat. Right: preview.',
    sec3P3:
      'Remember three actions: new task, prompt, wait.',

    sec4Title: 'Chapter 4 — Core actions in plain English',
    sec4Item1Title: 'New task = new conversation',
    sec4Item1Body:
      'One goal per conversation. Do not mix multiple apps in one place.',
    sec4Item2Title: 'Prompt = what you tell Codex',
    sec4Item2Body:
      'Say the input, output, and screen. Do not just say “build a tool”.',
    sec4Item3Title: 'Wait = let it work',
    sec4Item3Body:
      'Ignore the inner details while it works. Check whether the app runs.',
    sec4Item4Title: 'Run = see your app',
    sec4Item4Body: 'It launches a window for you. That is your program.',
    sec4Item5Title: 'Problems = keep chatting',
    sec4Item5Body:
      'If something is wrong, say it plainly. Codex can fix it.',

    sec5Title: 'Chapter 5 — Five rules for good prompts',
    sec5Rule1Title: '1. Say who will use it',
    sec5Rule1Body: 'The user decides the workflow and UI.',
    sec5Rule2Title: '2. Say what problem it solves',
    sec5Rule2Body:
      'Do not just list features. Say what pain they remove.',
    sec5Rule3Title: '3. Give examples',
    sec5Rule3Body:
      '“Order ID, Amount, Date, group by month” beats “build stats”.',
    sec5Rule4Title: '4. Change one thing at a time',
    sec5Rule4Body:
      'Ask for one change at a time.',
    sec5Rule5Title: '5. Do not panic on errors',
    sec5Rule5Body:
      'Copy the full error back to Codex.',

    sec6Title: 'Chapter 6 — Common issues',
    sec6Pit1Title: 'Issue 1 — The app will not start',
    sec6Pit1Body: 'Copy the full error and ask: “How do I fix this?”',
    sec6Pit2Title: 'Issue 2 — Things get messy after many tweaks',
    sec6Pit2Body: 'If several fixes fail, start fresh with cleaner requirements.',
    sec6Pit3Title: 'Issue 3 — You are asking for too much at once',
    sec6Pit3Body:
      'Start small: import one sheet, show one column. Then expand.',
    sec6Pit4Title: 'Issue 4 — You cannot tell what it is doing',
    sec6Pit4Body: 'Ask: “What are you doing right now?”',

    secStopTitle: 'Chapter 7 — When to stop',
    secStopItem1Title: 'Stop when the artifact is real',
    secStopItem1Body: 'If the app opens, sample data completes, and a file exports, pause feature work.',
    secStopItem2Title: 'Do not force the same bug forever',
    secStopItem2Body: 'If the same issue fails three fixes, ask Codex to downgrade or disable the edge feature and keep the main flow.',
    secStopItem3Title: 'Put new ideas in v2',
    secStopItem3Body: 'Write extra ideas into known limitations or v2 notes instead of turning version one into an endless project.',
    secStopItem4Title: 'Open a new task for big changes',
    secStopItem4Body: 'After the main flow works, use a fresh task for a redesign, stack change, or many new features.',

    sec7Title: 'Chapter 8 — Sharing what you built',
    sec7P1: 'Ask Codex to package as Windows .exe or macOS .dmg.',
    sec7P2: 'Send it by email, chat, or drive. They double-click to install.',
    sec7P3: 'If antivirus warns, tell them "this is an internal tool" to allow it.',

    nextStepTitle: 'Where to next',
    nextStepGenerator: 'Generate your first prompt',
    nextStepLessons: '7-day sprint',
    nextStepCookbook: 'Scenario cookbook',
    nextStepCases: 'See cases for your department',
  },

  tips: {
    pageTitle: 'Practical Tips',
    pageSubtitle: 'Useful habits that save time.',

    tip1Title: 'Use a role prompt for sharper answers',
    tip1Body:
      'Start with: “You are a desktop app engineer.” Codex will focus better.',
    tip2Title: 'Ask for a summary, then let it work',
    tip2Body:
      'Ask for a 10-line summary. If nothing blocks it, continue to build and verify.',
    tip3Title: 'Show it the real file shape',
    tip3Body:
      'Paste headers or a sanitized sample. It beats description.',
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
    tip8Title: 'Request robust UX',
    tip8Body:
      'Add: “Invalid input should show a friendly message, not crash.”',
    tip9Title: 'Ask for acceptance criteria first',
    tip9Body:
      'Ask for 3 user scenarios and acceptance checks before it starts.',
    tip10Title: 'Say what NOT to change',
    tip10Body:
      'When editing A, say: “Keep B and C unchanged.”',
    tip11Title: 'Show, do not describe',
    tip11Body:
      'Do not say “make it clean”. Paste a screenshot and say “like this”.',
    tip12Title: 'Start a fresh chat after a milestone',
    tip12Body:
      'After a milestone, start a fresh chat with the latest prompt and working version.',

    pitfallsTitle: 'Common misconceptions',
    pitfall1Title: 'It does not know what you did not write',
    pitfall1Body:
      'If you do not write it, Codex does not know it.',
    pitfall2Title: 'Do NOT be intimidated by inner details',
    pitfall2Body:
      'Ignore the inner details. Check the app behavior.',
    pitfall3Title: 'Do NOT dump 20 requirements at once',
    pitfall3Body:
      'Split across five rounds of four. Quality jumps noticeably.',
    pitfall4Title: 'Do NOT start over on every error',
    pitfall4Body:
      'Errors are useful. Paste them back.',
    pitfall5Title: 'Do NOT explain WHY, just say WHAT',
    pitfall5Body:
      'Say what you want. Skip long rationale.',
    pitfall6Title: 'Do NOT skip checkpoints',
    pitfall6Body:
      'When it runs, copy the folder with a timestamp.',
  },

  faq: {
    pageTitle: 'FAQ',
    pageSubtitle: 'The questions business teams ask most.',

    q1: 'Does Codex cost money?',
    a1: 'Codex needs an OpenAI account and paid ChatGPT plan. Check OpenAI for pricing.',

    q2: 'I know the business, not code. Can I use this?',
    a2: 'Yes. You define the workflow and acceptance checks; Codex handles implementation.',

    q3: 'Can I share what I build with teammates?',
    a3: 'Yes. Ask Codex to package as .exe or .dmg, then share the installer.',

    q4: 'Is what Codex generates safe?',
    a4: 'Local tools are lower risk. For sensitive data, get a technical review.',

    q5: 'My app is slow. What do I do?',
    a5: 'Say: “The app is slow on big files. Please optimize.”',

    q6: 'Can I build a mobile app?',
    a6: 'Yes, but this tutorial covers desktop. Mobile publishing is harder.',

    q7: 'Can it connect to the internet?',
    a7: 'Yes, but start offline. Ask a technical teammate to review online features.',

    q8: 'How do I know the result is correct?',
    a8: 'You check behavior and the final result.',

    q9: 'Can I collaborate with teammates?',
    a9: 'Yes. Share your prompts or workspace. Or ship the packaged installer.',

    q10: 'Who do I contact if something breaks?',
    a10: 'Ask Codex first. For account or billing issues, contact OpenAI support.',

    q11: 'Can an average computer run it?',
    a11: 'Usually yes. 8GB RAM and about 10GB free disk space are a good baseline.',

    q12: 'Will Codex upload my local files to the internet?',
    a12: 'It reads files you provide. Anonymize sensitive sheets before sending them.',

    q13: 'The first response is full of jargon I cannot follow. What do I do?',
    a13: 'Say: “Plain language only. Explain the next step, then continue and verify.”',

    q14: 'How do I keep usage costs in check?',
    a14: 'One task per chat. Start fresh after it runs. Reuse proven prompts.',

    q15: 'Can I commercialize what I build?',
    a15: 'Internal use is usually fine. Before resale, check terms and licenses.',

    q16: 'Friends ask: "did you really build this?" — what do I say?',
    a16: 'Say: “I wrote the requirements. Codex generated the first version. I tested and iterated.”',
  },

  footer: {
    about: 'About',
    aboutBody:
      'Codex Desktop guide for business experts. Maintained by ifq.ai. Not OpenAI official.',
    resourcesTitle: 'Resources',
    resourceOpenAI: 'Codex site',
    resourceCodexDocs: 'Codex docs',
    resourceGithub: 'GitHub repo',
    builtWith: 'Modern frontend stack, edge-hosted, optimized for mainland China.',
    copyright: '© 2026 codex.ifq.ai — MIT License',

    languageLabel: 'Language',
    contactTitle: 'Feedback',
    contactBody: 'Found an issue or have a case? Open an issue.',
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
    pageTitle: '7-day Sprint',
    pageSubtitle: '15 minutes a day. Ship a working tool in a week.',
    dayLabel: 'Day {n}',
    startLabel: 'Start',
    day1Title: 'Meet Codex Desktop',
    day1Hook: 'Install it, open it, get comfortable with the layout',
    day1Goals: 'Install Codex · Sign in · Learn the three panels',
    day2Title: 'Ship your first tiny tool',
    day2Hook: 'First, run a tiny Excel summary tool',
    day2Goals: 'Copy a tutorial prompt · Paste into Codex · See a window pop up',
    day3Title: 'Describe the flow clearly',
    day3Hook: 'Clear flow, better result',
    day3Goals: 'Define role · Give examples · Change one thing at a time',
    day4Title: 'Let Codex fix its own problems',
    day4Hook: 'Errors are not failures. Feed them back.',
    day4Goals: 'Paste errors · Roll back · Separate crashes from wrong behavior',
    day5Title: 'Show it real data',
    day5Hook: 'Give real headers, get better results',
    day5Goals: 'Paste headers · Explain fields · Build around your data',
    day6Title: 'Package and share',
    day6Hook: 'From "works for you" to "works for the whole team"',
    day6Goals: 'Package .exe / .dmg · Test install · Write a short guide',
    day7Title: 'Ship v2',
    day7Hook: 'Two small rounds turn "works" into "feels good"',
    day7Goals: 'Collect feedback · Fix one thing at a time · Plan the next tool',
    recapTitle: 'After day seven, you can ship independently',
    recapBody:
      'You can install, ask, verify, and share. Now turn repetitive work into tools.',
  },

  cases: {
    pageTitle: 'Department Cases',
    pageSubtitle:
      'Pick a department case. Copy the prompt. Change a few words.',

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
    sectionExpected: 'Result',
    sampleFieldsTitle: 'Example input fields',
    sampleFieldsHint: 'Before copying the prompt, rename your Excel / CSV headers to these fields, or paste your real headers into Codex.',
    sectionPrompt: 'Ready-to-use prompt',
    sectionAfter: 'After copying',
    after1: 'Open Codex Desktop and create a new task',
    after2: 'Paste the prompt and send',
    after3: 'Let Codex build and verify; then tweak names, fields, and buttons',

    backToCases: 'Back to cases',
    tryInGenerator: 'Customize this case in the generator',
    relatedCases: 'More cases from this department',
    windowsBadge: 'Windows app',
  },

  cookbook: {
    pageTitle: 'Scenario Cookbook',
    pageSubtitle:
      'Common small tasks, each with a copy-ready prompt across office work, data cleanup, and daily e-commerce tools.',
    copyRecipe: 'Copy this prompt',
    recipeAfter: 'Paste into Codex, follow along',
  },
} as const;
