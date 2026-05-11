export type PromptQualityLang = 'zh' | 'en';

const QUALITY_MARKER_ZH = '【高质量交付补充】';
const QUALITY_MARKER_EN = '[High-Quality Delivery Addendum]';

const QUALITY_TAIL_ZH = `【高质量交付补充】
如果上文说"等我确认再写代码"，请改为：先给 ≤10 行方案摘要，没有真阻塞就继续实现/运行/修复/验证。

请额外满足：
- 交付能本地运行的桌面应用，不只是方案或伪代码。
- M1 ≤15 分钟做出可双击打开的空壳（主窗口 + 示例数据点一下出一行假结果）并汇报一次；之后每个里程碑都给"✅完成 / 🔧跳过原因 / ⏭下一步预计耗时"的状态卡片，让用户随时知道进度、不焦虑。
- 第一屏就是可操作的主工作台，不做营销页/欢迎页/介绍页。
- 用业务语言写按钮、错误和说明，不暴露命令行/依赖/堆栈。
- 拖拽 + 系统打开/保存对话框；输出不覆盖原文件，冲突自动加时间后缀。
- 文件路径兼容中文、空格、括号、长路径以及 Windows / macOS 路径分隔差异。
- 涉及快捷键时，Windows 使用 Ctrl / Alt，macOS 使用 Command / Option，避免覆盖系统常用快捷键。
- 提供示例数据或试用模式，不带文件也能跑通。
- 空数据/错格式/重复文件/大文件/无权限/用户取消都要友好处理。
- 核心业务逻辑与 UI 分离，读取/解析/处理/导出边界清晰，便于测试与改动。
- Electron / Tauri 桌面壳只开必要权限（contextIsolation 与 sandbox 开启，nodeIntegration 关闭），渲染层不直接执行任意本地命令。
- 第三方库必须真实存在、近一年仍维护；不许凭印象编造 API/包名。package.json 锁主版本，README 写清 Node 版本。
- 不写死 API Key / 绝对路径 / 个人邮箱 / 内网地址；如需配置走 \`.env.example\`。
- 至少齐备 \`npm run setup\` / \`npm run dev\` / \`npm run package\` 三条命令。
- 核心逻辑有测试；交付前跑 lint、类型检查、测试和构建并真正启动应用走通一次，看到产物再说"完成"。
- 交付物：README.md（维护者）、使用说明.md（≤500 字给非技术同事）、已知限制.md（含 v2 想法 + 待替换占位）、示例数据，及开发/测试/构建/打包脚本。
- 当前机器不能产生目标平台安装包时，仍配好打包脚本，并写清另一平台如何生成、签名限制和未签名包试用方式。

【完成判定（DoD）— 全部满足才算"完成"，否则继续修】
1. 应用能双击 / 一条命令启动并显示主工作台。
2. 示例数据走通一次主流程，看到预期产物。
3. 异常路径（空/错格式/取消/冲突）友好提示不崩溃。
4. lint、类型检查、单测、构建全过；新增核心逻辑有 ≥1 个自动化测试。
5. 安装包或可运行未签名包已生成。
6. README.md / 使用说明.md / 已知限制.md / 示例数据齐备。

【停止 Vibe Coding】
- DoD 已满足 → 立即停手；新想法写进 已知限制.md 的"v2 想法"。
- 同一个问题修 3 次还没好 → 退一步降级或注释边缘功能，先达到 DoD。
- 不许整库重构、换技术栈或为减 5 行代码引入新依赖。`;

const QUALITY_TAIL_EN = `[High-Quality Delivery Addendum]
If the prompt above says "wait for my confirmation before writing code", reinterpret it as: give a plan summary under 10 lines, then continue implementing/running/fixing/verifying unless truly blocked.

Also satisfy:
- Deliver a local-runnable desktop app, not a plan or pseudocode.
- M1 ≤ 15 min: a double-clickable shell (main window + sample data clicks through to one fake result) and a brief report. Then end each milestone with a status card "✅ done / 🔧 skipped + reason / ⏭ next + ETA" so the user always knows progress and stays calm.
- The first screen is the usable workspace; no marketing/welcome/explainer page.
- Business-language labels, errors, and help; never expose CLI jargon, dependency details, or raw stacks.
- Drag-and-drop + native open/save dialogs; never overwrite input files by default; add a timestamp suffix on filename conflicts.
- File paths must work with Chinese characters, spaces, parentheses, long paths, and Windows / macOS path separator differences.
- If shortcuts are involved, use Ctrl / Alt combinations on Windows and Command / Option combinations on macOS, without overriding common system shortcuts.
- Include sample data or demo mode so users can complete the flow without preparing real files.
- Handle empty data, invalid formats, duplicate files, large files, missing permissions, and user-cancelled actions gracefully.
- Keep core business logic separate from UI, with clear boundaries for read/parse/process/export so it is testable and easy to change.
- Desktop shells (Electron / Tauri) expose only necessary permissions (contextIsolation and sandbox on, nodeIntegration off); the renderer never runs arbitrary local commands.
- Every library must actually exist and be maintained within the last year; do not invent names/APIs. Pin major versions in package.json and document the required Node.js version in README.
- No hard-coded API keys, absolute paths, personal emails, or internal hostnames; use \`.env.example\` when configuration is required.
- Provide at minimum \`npm run setup\` / \`npm run dev\` / \`npm run package\`.
- Add tests for core logic; before handoff run lint, typecheck, tests, build, and one smoke test that actually launches the app and produces an output artifact. "Done" means you saw that artifact.
- Deliverables: README.md (maintainers), USER_GUIDE.md (≤ 500 words, non-technical), KNOWN_LIMITATIONS.md (incl. v2 ideas + placeholders), sample data, plus dev/test/build/package scripts.
- If this machine cannot produce the target-platform installer, still configure the packaging command and document how to build on the other OS, signing limits, and how to try an unsigned package.

[Definition of Done — all must hold]
1. App launches via double-click or one command and shows the main workspace.
2. Sample data walks through the main flow and produces the expected artifact.
3. Off-path cases (empty / bad format / cancel / conflict) show friendly messages instead of crashing.
4. lint, typecheck, unit tests, build pass; new core logic has at least one automated test.
5. Installer or runnable unsigned package exists.
6. README.md / USER_GUIDE.md / KNOWN_LIMITATIONS.md / sample data are present.

[Stop-Vibe-Coding]
- DoD met → stop immediately; new ideas go to KNOWN_LIMITATIONS.md under "v2 ideas".
- Same bug fails 3 fixes in a row → step back, downgrade or disable the edge feature, hit DoD first.
- No whole-codebase refactors, stack swaps, or new deps just to save 5 lines.`;

export function withDesktopQualityBar(prompt: string, lang: PromptQualityLang): string {
  const marker = lang === 'zh' ? QUALITY_MARKER_ZH : QUALITY_MARKER_EN;
  if (prompt.includes(marker)) return prompt.trim();

  const tail = lang === 'zh' ? QUALITY_TAIL_ZH : QUALITY_TAIL_EN;
  return `${prompt.trim()}\n\n${tail}`;
}
