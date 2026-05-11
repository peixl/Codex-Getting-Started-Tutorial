export type PromptQualityLang = 'zh' | 'en';

const QUALITY_MARKER_ZH = '【高质量交付补充】';
const QUALITY_MARKER_EN = '[High-Quality Delivery Addendum]';

const QUALITY_TAIL_ZH = `【高质量交付补充】
如果上文说"等我确认再写代码"，改为：先给 ≤10 行方案摘要；无真阻塞就继续实现、运行、修复、验证。

必须满足：
- 交付本地可运行桌面应用，不是方案/伪代码。
- M1 ≤15 分钟：可双击空壳（主窗口 + 主工作台 + 示例数据点一下出一行假结果）并汇报；每个里程碑给"✅完成 / 🔧跳过原因 / ⏭下一步预计耗时"状态卡片。
- 第一屏就是主工作台；按钮/错误/说明用业务语言，不暴露命令行/依赖/堆栈。
- 拖拽 + 系统打开/保存对话框；输出不覆盖原文件，冲突加时间后缀；文件路径兼容中文、空格、括号、长路径和 Windows / macOS 差异。
- 快捷键：Windows 使用 Ctrl / Alt，macOS 使用 Command / Option，避开系统快捷键。
- 提供示例数据或试用模式；空/错格式/重复/大文件/无权限/取消都友好处理。
- 核心逻辑与 UI 分离；读取/解析/处理/导出边界清晰；桌面壳最小权限，渲染层不执行任意本地命令。
- 库必须真实存在且近一年维护；不编造 API/包名；package.json 锁主版本，README 写 Node 版本。
- 不写死 API Key / 绝对路径 / 个人邮箱 / 内网地址；配置走 \`.env.example\`。
- 至少有 \`npm run setup\` / \`npm run dev\` / \`npm run package\`；交付前跑 lint、类型检查、测试、构建，并启动应用看见产物。
- 交付 README.md、使用说明.md（≤500 字）、已知限制.md（含 v2 想法 + 占位）、示例数据；无法本机打包时仍配脚本并写清限制。

【完成判定（DoD）】
1. 双击 / 一条命令启动并显示主工作台。
2. 示例数据走通主流程并看到产物。
3. 异常路径友好提示不崩溃。
4. lint、类型检查、单测、构建全过；新增核心逻辑有 ≥1 个自动化测试。
5. 安装包或可运行未签名包已生成。
6. README.md / 使用说明.md / 已知限制.md / 示例数据齐备。

【停止 Vibe Coding】
- DoD 满足 → 立即停手；新想法进已知限制.md 的"v2 想法"。
- 同一问题修 3 次还没好 → 降级/注释边缘功能，先达 DoD。
- 不整库重构、换技术栈或为减 5 行代码引新依赖。`;

const QUALITY_TAIL_EN = `[High-Quality Delivery Addendum]
If the prompt above says "wait for my confirmation before writing code", reinterpret it as: give a plan summary under 10 lines, then implement/run/fix/verify unless truly blocked.

Must satisfy:
- Deliver a local-runnable desktop app, not a plan/pseudocode.
- M1 ≤ 15 min: double-clickable shell (main window + workspace + sample data clicks to one fake result) and a brief report; each milestone ends with "✅ done / 🔧 skipped + reason / ⏭ next + ETA".
- First screen is the workspace; labels/errors/help use business language, never raw CLI/dependency/stack details.
- Drag-and-drop + native open/save dialogs; never overwrite inputs; timestamp conflicts; paths handle Chinese characters, spaces, parentheses, long paths, and Windows / macOS differences.
- Shortcuts: Ctrl / Alt combinations on Windows and Command / Option combinations on macOS; avoid system shortcuts.
- Include sample data or demo mode; handle empty/bad/duplicate/large/no-permission/cancel gracefully.
- Keep core logic separate from UI; clear read/parse/process/export boundaries; minimal desktop-shell permissions, renderer never runs arbitrary local commands.
- Libraries must exist and be maintained within the last year; do not invent names/APIs. Pin major versions and document Node.js version in README.
- No hard-coded API keys, absolute paths, personal emails, or internal hostnames; use \`.env.example\`.
- Provide \`npm run setup\` / \`npm run dev\` / \`npm run package\`; before handoff run lint, typecheck, tests, build, launch, and see the output artifact.
- Deliver README.md, USER_GUIDE.md (≤500 words), KNOWN_LIMITATIONS.md (v2 ideas + placeholders), sample data; if packaging is unavailable locally, still configure scripts and document limits.

[Definition of Done]
1. App launches by double-click or one command and shows the main workspace.
2. Sample data completes the main flow and produces the artifact.
3. Off-path cases show friendly messages instead of crashing.
4. lint, typecheck, unit tests, build pass; new core logic has ≥1 automated test.
5. Installer or runnable unsigned package exists.
6. README.md / USER_GUIDE.md / KNOWN_LIMITATIONS.md / sample data are present.

[Stop-Vibe-Coding]
- DoD met → stop immediately; new ideas go to KNOWN_LIMITATIONS.md under "v2 ideas".
- Same bug fails 3 fixes → downgrade/disable edge feature and hit DoD first.
- No whole-codebase refactors, stack swaps, or new deps just to save 5 lines.`;

export function withDesktopQualityBar(prompt: string, lang: PromptQualityLang): string {
  const marker = lang === 'zh' ? QUALITY_MARKER_ZH : QUALITY_MARKER_EN;
  if (prompt.includes(marker)) return prompt.trim();

  const tail = lang === 'zh' ? QUALITY_TAIL_ZH : QUALITY_TAIL_EN;
  return `${prompt.trim()}\n\n${tail}`;
}
