export type PromptQualityLang = 'zh' | 'en';

const QUALITY_MARKER_ZH = '【高质量交付补充】';
const QUALITY_MARKER_EN = '[High-Quality Delivery Addendum]';

const QUALITY_TAIL_ZH = `【高质量交付补充】
如果上文有"等我确认后再写代码"之类的旧指令，请改为：先给 10 行以内方案摘要；如果没有真正阻塞的问题，就继续实现、运行、修复和验证，不要停在等待确认。

请额外满足这些要求：
- 交付的是能在本机运行的桌面应用，不是只给方案或伪代码。
- 先做最小可用版本跑通，再补体验、边界和打包；不要把工作停在脚手架或静态页面。
- 第一屏就是可操作的主工作台；不要做营销页、空白欢迎页或只有介绍文字的页面。
- 用业务语言设计按钮、错误提示和说明文案，避免把命令行、依赖、堆栈错误暴露给非技术用户。
- 支持拖拽和系统文件选择器 / 保存对话框；输出文件不覆盖原文件，冲突时自动加时间后缀。
- 文件路径要兼容中文、空格、括号、长路径以及 Windows / macOS 路径分隔差异。
- 如涉及快捷键，Windows 使用 Ctrl / Alt 组合，macOS 使用 Command / Option 组合，并避免覆盖系统常用快捷键。
- 提供示例数据或试用模式，让用户不准备真实文件也能看到完整流程。
- 对空数据、格式错误、重复文件、大文件、权限不足和用户取消操作做友好处理。
- 核心业务逻辑要和界面分离，文件读取、解析、处理、导出边界清楚，方便测试和后续修改。
- Electron / Tauri 等桌面壳只开放必要权限（contextIsolation、sandbox 开启，nodeIntegration 关闭）；渲染层不要直接执行任意本地命令。
- 用到的第三方库必须真实存在、近一年仍在维护；不要凭印象编造 API 或包名。在 package.json 中显式锁定主版本，并在 README 写清 Node.js 版本。
- 不要把 API Key、本机绝对路径、个人邮箱、内网地址写进代码；如需配置，提供 \`.env.example\`。
- 提供一键脚本（\`npm run setup\` / \`npm run dev\` / \`npm run package\`），让不会用命令行的同事跟着 README 就能跑起来。
- 核心逻辑要有测试；完成后运行 lint、类型检查、测试、构建，并真正启动应用做一次从打开到生成结果的冒烟测试，看到产物再说"完成"。
- 最后交付 README.md（给维护者）、使用说明.md（给非技术同事，500 字以内）、已知限制.md、示例数据，以及开发 / 测试 / 构建 / 打包脚本。
- 如果当前电脑不能直接生成目标平台安装包，也要配置好打包命令，并清楚说明在 Windows 或 macOS 上如何生成、签名限制是什么、未签名包如何试用。`;

const QUALITY_TAIL_EN = `[High-Quality Delivery Addendum]
If the prompt above says "wait for my confirmation before writing code", reinterpret it as: give a plan summary under 10 lines, then continue implementing, running, fixing, and verifying unless a truly blocking question remains.

Also satisfy these requirements:
- Deliver a desktop app that runs locally, not only a plan or pseudocode.
- Get the smallest useful version running first, then add UX, edge cases, and packaging; do not stop at scaffolding or a static screen.
- The first screen is the usable workspace; do not build a marketing page, empty welcome screen, or feature explainer as the main experience.
- Use business-language labels, error messages, and help text. Do not expose command-line jargon, dependency details, or raw stack traces to non-technical users.
- Support drag-and-drop plus native file picker / save dialogs; never overwrite input files by default, and add timestamp suffixes on output filename conflicts.
- File paths must work with Chinese characters, spaces, parentheses, long paths, and Windows / macOS path separator differences.
- If shortcuts are involved, use Ctrl / Alt combinations on Windows and Command / Option combinations on macOS, without overriding common system shortcuts.
- Include sample data or demo mode so users can complete the flow without preparing real files.
- Handle empty data, invalid formats, duplicate files, large files, missing permissions, and user-cancelled actions gracefully.
- Keep core business logic separate from the UI, with clear boundaries for file reading, parsing, processing, and exporting so it is testable and easy to change.
- Desktop shells such as Electron / Tauri should expose only necessary permissions (contextIsolation and sandbox on, nodeIntegration off); the renderer must not directly execute arbitrary local commands.
- Every third-party library you import must actually exist and be actively maintained within the last year. Do not invent package names or APIs. Pin major versions in package.json and document the required Node.js version in README.
- Never hard-code API keys, machine-specific absolute paths, personal emails, or internal hostnames; use \`.env.example\` when configuration is required.
- Provide one-command scripts (\`npm run setup\` / \`npm run dev\` / \`npm run package\`) so a non-developer can follow the README and bring the app up.
- Add tests for core logic; before handoff run lint, typecheck, tests, build, and one smoke test that actually launches the app and produces an output artifact. "Done" means you saw that artifact.
- Final deliverables include README.md for maintainers, USER_GUIDE.md for non-technical colleagues under 500 words, KNOWN_LIMITATIONS.md, sample data, and dev / test / build / package scripts.
- If this machine cannot produce the target-platform installer directly, still configure the packaging command and clearly document how to build it on Windows or macOS, what signing limits apply, and how to try an unsigned package.`;

export function withDesktopQualityBar(prompt: string, lang: PromptQualityLang): string {
  const marker = lang === 'zh' ? QUALITY_MARKER_ZH : QUALITY_MARKER_EN;
  if (prompt.includes(marker)) return prompt.trim();

  const tail = lang === 'zh' ? QUALITY_TAIL_ZH : QUALITY_TAIL_EN;
  return `${prompt.trim()}\n\n${tail}`;
}
