export const en = {
  meta: {
    siteName: 'Codex Beginner Tutorial',
    siteTagline: 'Any department, any role — ship your own desktop tool with Codex',
    description:
      'Beginner-friendly tutorial for the OpenAI Codex desktop app, built for non-developers. Guided prompt generator, plain-language walkthrough, and ready-to-use cases covering ten departments (finance, operations, customer service, HR, logistics, procurement, marketing, legal, data, admin). Focused on local Windows and macOS desktop apps.',
    keywords: [
      'Codex',
      'OpenAI Codex',
      'Codex desktop',
      'Codex tutorial',
      'Codex prompt',
      'beginner tutorial',
      'no-code desktop app',
      'Windows desktop app',
      'macOS desktop app',
      'business automation',
      'AI coding for non-developers',
    ],
  },

  nav: {
    home: 'Home',
    generator: 'Prompt',
    guide: 'Get started',
    lessons: '7-day sprint',
    cookbook: 'Cookbook',
    cases: 'Cases',
    tips: 'Pro tips',
    faq: 'FAQ',
    tryNow: 'Get started',
    switchLang: 'Switch language',
  },

  home: {
    heroEyebrow: 'Made for you — even if you don’t code',
    heroTitleLine1: 'You want',
    heroTitleHighlight: 'a small tool of your own.',
    heroTitleLine2: 'One message to Codex is enough.',
    heroSubtitle:
      'Fill in a short form, copy the prompt, paste it into Codex Desktop. A few minutes later, a useful little tool lives on your desktop. No code, no servers, no jargon — just you and an idea.',
    heroCtaPrimary: 'Generate a prompt in 3 minutes',
    heroCtaSecondary: 'See how it works',
    heroStatsLabel1: 'Ready-made cases',
    heroStatsValue1: '10+',
    heroStatsLabel2: 'Fill the blanks',
    heroStatsValue2: 'Prompts',
    heroStatsLabel3: 'Your own tool',
    heroStatsValue3: 'Local',
    heroBadgeWindows: 'Windows 11 · 10',
    heroBadgeMac: 'macOS ready',

    flowTitle: 'Three steps from sentence to software',
    flowSubtitle: 'Every step feels like filling out a form. No jargon anywhere.',
    flowStep1Title: 'Tell Codex what you want',
    flowStep1Body:
      'Write your goal and features in plain words. UI style, how data is stored — we already picked sensible defaults for you.',
    flowStep2Title: 'Click "Copy prompt"',
    flowStep2Body:
      'We assemble a professional instruction for you. Just copy. You never have to understand how it is phrased.',
    flowStep3Title: 'Paste into Codex Desktop',
    flowStep3Body:
      'Codex takes it from there — writes the code, runs the app, pops up a window. That is your first tool.',

    featuresTitle: 'Why this tutorial works for beginners',
    featuresSubtitle: 'We assume zero coding, zero command line, zero GitHub experience.',
    feature1Title: 'Plain-language everything',
    feature1Body:
      'No "repo", no "branch", no "build". Everything is explained with everyday analogies you can grasp on the first read.',
    feature2Title: 'Fill-in-the-blank prompts',
    feature2Body:
      'Platform, UI, storage — all dropdowns with smart defaults. You only write a sentence or two about your goal and features.',
    feature3Title: 'Ten ready-made cases',
    feature3Body:
      'Finance, operations, customer service, HR, logistics, procurement, marketing, legal, data, admin — real scenarios with complete prompts.',
    feature4Title: 'Just small desktop tools',
    feature4Body:
      'Every case is a focused desktop tool you double-click and use — built to solve one real problem in front of you.',
    feature5Title: 'Bilingual (CN / EN)',
    feature5Body:
      'Chinese to understand concepts, English to talk to Codex more effectively. Full parity.',
    feature6Title: 'Output on day one',
    feature6Body:
      'The whole tutorial is designed around "get something working today". No dry theory — just follow along.',

    caseTeaserTitle: 'Your department already has a case',
    caseTeaserSubtitle: 'Open it, copy the prompt, ten minutes to a working tool.',
    caseTeaserMore: 'See all ten department cases',

    ctaTitle: 'Ready to try?',
    ctaBody: 'Three minutes from now, your desktop could have a brand-new tool — built by you.',
    ctaButton: 'Start now',

    trustTitle: 'What we care about',
    trustLine1: 'Every case is grounded in a real workflow. Every prompt has been tested.',
    trustLine2: 'Bilingual end-to-end. Fast access from mainland China — no third-party fonts or CDNs.',
    trustLine3: 'Open-sourced on GitHub. You can see the code, the updates, and the care behind it.',
  },

  generator: {
    pageTitle: 'Prompt Generator',
    pageSubtitle:
      'As easy as filling a form. You do not need to understand any technical term — beginner-friendly defaults are already selected. Just describe your goal and features, and you get a prompt Codex will understand.',

    defaultsHint: 'We’ve pre-selected the friendliest defaults. Use them as is — no need to change a thing.',

    sectionPlatform: '1. What kind of software?',
    platformWindows: 'For Windows PCs',
    platformMac: 'For Macs',
    platformBoth: 'Both Windows and Mac',
    platformHint: 'Most offices use Windows, so this is pre-selected.',

    sectionTech: '2. How should it be built (pick a direction)',
    techLabel: 'Approach',
    techHintRecommended: 'Recommended',
    techOptionElectron: 'Standard (most stable, largest community)',
    techOptionTauri: 'Lightweight (smaller binary, faster startup)',
    techOptionPyQt: 'Utility style (great for small one-off tools)',
    techOptionAuto: 'Let Codex decide (beginner-safe)',

    sectionUI: '3. What should it look like',
    uiLabel: 'Look and feel',
    uiOptionMinimal: 'Minimal (white background, clean, spacious)',
    uiOptionDark: 'Dark (black background, high contrast)',
    uiOptionFresh: 'Soft (pastel gradients, rounded, airy)',
    uiOptionBusiness: 'Dashboard (dense information, tables)',

    sectionData: '4. Where should data live?',
    dataLabel: 'Storage',
    dataOptionLocalFile: 'In files on your PC (Excel / CSV — simplest)',
    dataOptionSqlite: 'In a local mini-database (handles tens of thousands of rows)',
    dataOptionNone: 'No storage (one-shot tool)',

    sectionGoal: '5. Who is it for? What problem does it solve?',
    goalLabel: 'Goal (one or two sentences)',
    goalPlaceholder:
      'Example: For our finance team. Today reconciling hundreds of orders against bank records takes two full days a month. I want to cut that to one hour.',

    sectionFeatures: '6. What should it do?',
    featuresLabel: 'Features (one per line, be specific)',
    featuresPlaceholder:
      '- Import Excel files for orders and bank statements\n- Auto-match by order ID and highlight mismatches\n- Export the mismatches as a new Excel file',

    sectionExtras: '7. Extra requests (optional)',
    extraOfflineLabel: 'Works offline',
    extraOfflineHint: 'Runs without the internet',
    extraBilingualLabel: 'Bilingual UI',
    extraBilingualHint: 'Switchable English / Chinese',
    extraExportLabel: 'Export results',
    extraExportHint: 'Save as files you can share',
    extraShortcutLabel: 'Keyboard shortcuts',
    extraShortcutHint: 'Faster for power users',
    extraAccessibilityLabel: 'Accessible (screen reader friendly)',
    extraAccessibilityHint: 'Works with Windows Narrator',

    sectionOutput: 'The prompt to copy',
    outputHint:
      'Copy the whole block. Open Codex Desktop, start a new task, paste it in. No edits needed.',
    copyButton: 'Copy prompt',
    copied: 'Copied',
    resetButton: 'Reset form',
    langToggle: 'Switch language',
    langToggleHint:
      'English prompts usually work a bit better, but Chinese works fine too. If in doubt, try both — it only takes a minute.',

    quickTemplatesTitle: 'Don’t feel like writing? Start from a template',
    quickTemplatesHint: 'One click fills the form. Tweak a few words and you’re ready.',

    validationMissingGoal: 'Add a sentence about the goal first — then you can copy.',
    validationMissingFeatures: 'Add at least one feature first — then you can copy.',

    historyTitle: 'Recent prompts',
    historyEmpty: 'Nothing here yet. Anything you generate is saved in your browser only — nothing is uploaded.',
    historyLoad: 'Load',
    historyDelete: 'Delete',
    historyClearAll: 'Clear all',

    tipCardTitle: 'Friendly heads-up',
    tipCardBody:
      'The technical wording in the generated prompt is for Codex — not for you. Just focus on the goal and features; the smart defaults take care of the rest.',
  },

  guide: {
    pageTitle: 'Get started',
    pageSubtitle:
      'Pretend you’ve never heard the word “programming”. Everything below is in plain English — read along, and you’ll get it the first time.',

    tocTitle: 'Contents',

    sec1Title: 'Chapter 1 — What Codex really is',
    sec1P1:
      'Think of Codex as a coding intern that never sleeps. You describe what you want in plain language and it writes the program for you.',
    sec1P2:
      'In the past, building a desktop tool meant hiring engineers and waiting weeks. Now you describe your idea and Codex scaffolds it in minutes.',
    sec1P3:
      'This tutorial covers only one thing: Windows or macOS apps that double-click to open. No websites, no servers, no mobile.',

    sec2Title: 'Chapter 2 — What you need',
    sec2Item1Title: 'A Windows PC or Mac',
    sec2Item1Body: 'Windows 10/11 or a recent macOS version. 8 GB RAM minimum, 16 GB is nicer.',
    sec2Item2Title: 'A ChatGPT account',
    sec2Item2Body: 'Codex Desktop signs in with an OpenAI account. If you already use ChatGPT, the same login works.',
    sec2Item3Title: 'The Codex Desktop installer',
    sec2Item3Body: 'Download the desktop app for your operating system from OpenAI and install it. Feels like installing Chrome.',
    sec2Item4Title: 'You really do not need to code',
    sec2Item4Body: 'Typing, copy-paste, double-click — that is the full skill list.',

    sec3Title: 'Chapter 3 — Opening Codex for the first time',
    sec3P1: 'On first launch, Codex asks you to sign in. Use your OpenAI credentials.',
    sec3P2: 'You see a chat-like interface. Left: projects. Middle: conversation. Right: preview.',
    sec3P3:
      'Do not panic. Just three actions matter: new project, type a prompt, wait for the result.',

    sec4Title: 'Chapter 4 — Core actions in plain English',
    sec4Item1Title: 'New project = new conversation',
    sec4Item1Body:
      'One app per project. Do not mix multiple apps in one project.',
    sec4Item2Title: 'Prompt = what you tell Codex',
    sec4Item2Body:
      'The clearer you are, the better. Do not say "build a reconciliation tool". Say what the input is, what the output is, how the UI should look.',
    sec4Item3Title: 'Wait = let it work',
    sec4Item3Body:
      'Codex writes files as it thinks. You do not have to read them. You only care whether it runs.',
    sec4Item4Title: 'Run = see your app',
    sec4Item4Body: 'It launches a window for you. That is your program.',
    sec4Item5Title: 'Bugs = keep chatting',
    sec4Item5Body:
      'If something looks wrong, just say: "the button should be red", "Excel import crashed". It will fix itself.',

    sec5Title: 'Chapter 5 — Five plain-language rules for good prompts',
    sec5Rule1Title: '1. Say who will use it',
    sec5Rule1Body: 'Finance team, support, your boss — different users need different UIs.',
    sec5Rule2Title: '2. Say what problem it solves',
    sec5Rule2Body:
      'Do not just list features. Explain why each feature matters and what pain it removes.',
    sec5Rule3Title: '3. Give examples',
    sec5Rule3Body:
      '"I have an Excel with columns Order ID, Amount, Date. After import, group totals by month." Beats "build a stats feature" ten times over.',
    sec5Rule4Title: '4. Change one thing at a time',
    sec5Rule4Body:
      'Ask for a new button, then a color change, then a font change. Do not stack requests.',
    sec5Rule5Title: '5. Do not panic on errors',
    sec5Rule5Body:
      'Copy the full error text and paste it back. Codex reads error messages better than anyone.',

    sec6Title: 'Chapter 6 — Common pitfalls',
    sec6Pit1Title: 'Pitfall 1 — The app will not start',
    sec6Pit1Body: 'Copy the full error and ask: "How do I fix this?" No need to Google it.',
    sec6Pit2Title: 'Pitfall 2 — Things get messy after many tweaks',
    sec6Pit2Body: 'If five changes have not helped, open a fresh project and rewrite requirements cleanly.',
    sec6Pit3Title: 'Pitfall 3 — You are asking for too much at once',
    sec6Pit3Body:
      'Start with a minimum viable version: import one sheet, display one column. Get that working first.',
    sec6Pit4Title: 'Pitfall 4 — You cannot tell what it is doing',
    sec6Pit4Body: 'Ask: "What are you doing right now?" It will happily explain.',

    sec7Title: 'Chapter 7 — Sharing what you built',
    sec7P1: 'Say: "Package this app as a Windows .exe or macOS .dmg installer." You will get a shareable installer.',
    sec7P2: 'Send it to your teammate (email, chat, network drive). They double-click to install.',
    sec7P3: 'If antivirus warns, tell them "this is an internal tool" to allow it.',

    nextStepTitle: 'Where to next',
    nextStepGenerator: 'Generate your first prompt',
    nextStepCases: 'See cases for your department',
    nextStepLessons: '7-day sprint',
    nextStepCookbook: 'Scenario cookbook',
  },

  cases: {
    pageTitle: 'Department Cases',
    pageSubtitle:
      'Real scenarios from ten departments. Each case ships a complete prompt — copy, paste, tweak a few words for your company, done.',

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
    sectionSolution: 'The solution approach',
    sectionExpected: 'What you will end up with',
    sectionPrompt: 'Ready-to-use prompt',
    sectionAfter: 'After copying',
    after1: 'Open Codex Desktop and create a new project',
    after2: 'Paste the prompt and send',
    after3: 'Wait for Codex to finish; tweak company names, column names, button text as needed',

    backToCases: 'Back to cases',
    tryInGenerator: 'Customize this case in the generator',
    relatedCases: 'More cases from this department',
    windowsBadge: 'Windows app',
  },

  tips: {
    pageTitle: 'Pro Tips',
    pageSubtitle: 'Once you have the basics, these tricks will double your productivity with Codex.',

    tip1Title: 'Use a role prompt for sharper answers',
    tip1Body:
      'Start with "You are an engineer who specializes in Windows and macOS desktop apps." Codex responds with a more focused style.',
    tip2Title: 'Confirm in steps',
    tip2Body:
      'Ask for a feature list first. Once you approve, let it write code. Checking the plan mid-way prevents drift.',
    tip3Title: 'Show it the real file shape',
    tip3Body:
      'Paste the first few rows of your Excel (with header) into the chat, or attach a sanitized sample. Much better than describing.',
    tip4Title: 'Learn to roll back',
    tip4Body:
      'If something breaks, say "Go back to the last working version." Codex keeps history.',
    tip5Title: 'Use both Chinese and English',
    tip5Body:
      'English prompts often work better. Draft in Chinese, then ask Codex to translate the draft into an English prompt.',
    tip6Title: 'Save your best prompts',
    tip6Body:
      'Keep successful prompts in a notes app. Reuse and tweak them for similar tasks.',
    tip7Title: 'Ask it to write the user manual',
    tip7Body:
      'After it works: "Write a short user manual for my teammates, under 500 words, plain language."',
    tip8Title: 'Request robust UX',
    tip8Body:
      'Add: "If the user provides invalid input, show a friendly message and do not crash." Your app will hold up.',

    pitfallsTitle: 'Common misconceptions',
    pitfall1Title: 'It does NOT read your mind',
    pitfall1Body:
      'Everything obvious in your head is invisible to Codex. Write every instruction as if to someone who just walked in.',
    pitfall2Title: 'Do NOT be intimidated by code',
    pitfall2Body:
      'The code that scrolls by is not for you. You only check whether the app runs and looks right.',
    pitfall3Title: 'Do NOT dump 20 requirements at once',
    pitfall3Body:
      'Split across five rounds of four. Quality jumps noticeably.',
    pitfall4Title: 'Do NOT start over on every error',
    pitfall4Body:
      'An error is information — the most digestible kind for Codex. Paste it back.',
  },

  faq: {
    pageTitle: 'FAQ',
    pageSubtitle: 'The questions beginners ask most.',

    q1: 'Does Codex cost money?',
    a1: 'Codex requires an OpenAI account. It is available on paid ChatGPT plans (Plus or higher). Check OpenAI for current pricing.',

    q2: 'I really do not code. Can I use this?',
    a2: 'Yes. Every case is designed for non-coders. If you can type, copy, paste, and double-click, you are ready.',

    q3: 'Can I share what I build with teammates?',
    a3: 'Yes. Ask Codex to "package as a Windows .exe or macOS .dmg installer" and you get a shareable file.',

    q4: 'Is what Codex generates safe?',
    a4: 'For local personal tools, risk is low. But do not feed it sensitive data without review. For mission-critical use, have a technical teammate take a look.',

    q5: 'My app is slow. What do I do?',
    a5: 'Say: "The app is slow / freezes on big files — please optimize." It will analyze and improve.',

    q6: 'Can I build a mobile app?',
    a6: 'Technically yes, but this tutorial sticks to desktop. Mobile involves developer accounts and publishing rules that are tough for beginners.',

    q7: 'Can it connect to the internet?',
    a7: 'Yes, but with care. This tutorial focuses on offline tools. For online features, have a technical teammate review for legal and ToS risks.',

    q8: 'How do I know the code is correct?',
    a8: 'You check behavior, not code. You are the reviewer of results.',

    q9: 'Can I collaborate with teammates?',
    a9: 'Yes. Share your prompts or workspace. Or ship the packaged installer.',

    q10: 'Who do I contact if something breaks?',
    a10: 'Codex itself is your first responder — tell it what broke. For account or billing issues, contact OpenAI support.',
  },

  footer: {
    about: 'About',
    aboutBody:
      'A community tutorial on the Codex desktop app, written for non-developers. Maintained by the ifq.ai team. Not affiliated with OpenAI.',
    resourcesTitle: 'Resources',
    resourceOpenAI: 'Codex site',
    resourceCodexDocs: 'Codex docs',
    resourceGithub: 'GitHub repo',
    builtWith: 'Built with Next.js, deployed on Cloudflare Workers, tuned for access from mainland China.',
    copyright: '© 2026 codex.ifq.ai — MIT License',

    languageLabel: 'Language',
    contactTitle: 'Feedback',
    contactBody: 'Found a bug or want to contribute a case? Open an issue on GitHub.',
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
    pageSubtitle: 'We broke "learning Codex" into seven bite-sized days. Fifteen minutes a day. By day seven, you can ship a useful tool on your own.',
    dayLabel: 'Day {n}',
    startLabel: 'Start',
    day1Title: 'Meet Codex Desktop',
    day1Hook: 'Install it, open it, get comfortable with the layout',
    day1Goals: 'Install Codex Desktop · Sign in with your ChatGPT account · Recognize the three panels',
    day2Title: 'Ship your first tiny tool',
    day2Hook: 'A toy that turns an Excel into a summary — the first win is what sticks',
    day2Goals: 'Copy a tutorial prompt · Paste into Codex · See a window pop up',
    day3Title: 'Say it clearly',
    day3Hook: 'Same request, different clarity, 10x different results',
    day3Goals: 'Learn role prompts · Learn to give examples · Learn to change one thing at a time',
    day4Title: 'Let Codex fix its own bugs',
    day4Hook: 'Errors are not failures. Feed them back.',
    day4Goals: 'Paste the full error · Learn to say "roll back" · Tell apart crashes from wrong features',
    day5Title: 'Show it real data',
    day5Hook: 'Anonymize a table, paste the headers — Codex gets much smarter',
    day5Goals: 'Paste your Excel headers · Describe what each column means · Have it build around your columns',
    day6Title: 'Package and share',
    day6Hook: 'From "works for you" to "works for the whole team"',
    day6Goals: 'Ask Codex to package as .exe / .dmg · Test double-click install · Write a short user guide',
    day7Title: 'Ship v2',
    day7Hook: 'Two small rounds turn "works" into "feels good"',
    day7Goals: 'Collect teammate feedback · Fix one thing at a time · Plan your next tool',
    recapTitle: 'After day seven, you are no longer a beginner',
    recapBody:
      'Codex installed, first tool shipped, communication mastered, bug-fixing comfortable. Now turn this skill loose on every repetitive chore in your department.',
  },

  cookbook: {
    pageTitle: 'Scenario Cookbook',
    pageSubtitle:
      'The most common small tasks — each with a copy-ready prompt. Pick what matches your need, no brainstorming required.',
    copyRecipe: 'Copy this prompt',
    recipeAfter: 'Paste into Codex, follow along',
  },
} as const;
