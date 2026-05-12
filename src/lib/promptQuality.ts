export type PromptQualityLang = 'zh' | 'en';

const QUALITY_MARKER_ZH = '【高质量交付补充】';
const QUALITY_MARKER_EN = '[High-Quality Delivery Addendum]';

const QUALITY_TAIL_ZH = `【高质量交付补充】
若上文要求"等我确认"，改为：≤10 行摘要后直接实现、运行、修复、验证；只因真实文件/账号/证书/不可逆操作停下。

硬要求：
- 交付本地可运行桌面应用，不是方案；第一屏是主工作台。
- M1 ≤15 分钟：可打开空壳（主窗口 + 示例数据 → 一行假结果）；后续 M2 真实主流程、M3 异常/UI/隐私、M4 测试+打包+文档。
- 每个里程碑只报：完成 / 跳过原因 / 下一步+预计耗时，降低等待焦虑。
- 按钮、错误、说明用业务语言；不暴露堆栈。支持拖拽 + 系统打开/保存；输出不覆盖原文件，冲突加时间后缀。
- 路径兼容中文、空格、括号、长路径和 Windows / macOS 差异；快捷键：Windows 使用 Ctrl / Alt，macOS 使用 Command / Option。
- 提供示例数据或试用模式；空/错格式/重复/大文件/无权限/取消友好处理。
- 项目分层清晰：桌面壳 / 受控 API / UI / core / tests / sample-data / docs；IPC 白名单化，UI 不直接执行本地命令。
- 真实接线：按钮、导入、预览、导出、错误状态都能用；不留 TODO、空函数、未使用大组件或假数据冒充完成。
- 核心逻辑小模块、类型明确、错误分层；不编造包名/API；不写死密钥、绝对路径、个人邮箱或内网地址。
- 交付前跑 lint、类型检查、测试、构建并启动冒烟；提供 setup/dev/package 脚本、README、使用说明、已知限制、示例数据；无法打包也写明限制和命令。

【完成判定（DoD）】
1. 能启动并显示主工作台。2. 示例数据走通真实主流程并看到产物。3. 异常路径友好不崩溃。4. lint/类型/测试/构建通过且无 TODO/假接线。5. 安装包或可运行未签名包已生成。6. README/使用说明/已知限制/示例数据齐备。

【停止 Vibe Coding】
- DoD 满足就停；新想法写进已知限制.md 的"v2 想法"。
- 同一问题 3 次未修好：降级或注释边缘功能，先达 DoD。
- 不整库重构、不换技术栈、不为少写几行加新依赖。`;

const QUALITY_TAIL_EN = `[High-Quality Delivery Addendum]
If the prompt says to wait for confirmation, reinterpret it as: summarize in ≤10 lines, then implement/run/fix/verify; stop only for real files, accounts, certificates, or irreversible actions.

Must satisfy:
- Deliver a runnable local desktop app, not advice; first screen is the workspace.
- M1 ≤ 15 min: launchable shell (main window + sample data → one fake result); then M2 real main flow, M3 errors/UI/privacy, M4 tests+packaging+docs.
- Every milestone reports only: done / skipped + reason / next + ETA, so the user is not left waiting.
- Business-language labels/errors/help; no stack traces. Use drag-and-drop + native open/save; never overwrite inputs; timestamp conflicts.
- Paths handle Chinese characters, spaces, parentheses, long paths, and Windows/macOS differences. Use Ctrl / Alt combinations on Windows and Command / Option combinations on macOS.
- Include sample data or demo mode; handle empty/bad/duplicate/large/no-permission/cancel gracefully.
- Clear layers: shell/API/UI/core/tests/samples/docs; IPC allowlisted, renderer never runs local commands.
- Real flow wired: buttons, import, preview, export, and error states; no TODOs, empty functions, unused large components, or fake data counted as done.
- Small typed core modules with layered errors; no fake packages/APIs; no hard-coded secrets, absolute paths, personal emails, or internal hosts.
- Before handoff run lint, typecheck, tests, build, and launch smoke test; provide setup/dev/package scripts, README, user guide, known limitations, sample data; if packaging is unavailable, document limits and commands.

[Definition of Done]
1. App launches and shows the workspace. 2. Sample data completes the real main flow and produces the artifact. 3. Off-path cases fail gracefully. 4. lint/typecheck/tests/build pass with no TODO/fake wiring. 5. Installer or runnable unsigned package exists. 6. README/user guide/known limitations/sample data exist.

[Stop-Vibe-Coding]
- DoD met means stop; put new ideas in KNOWN_LIMITATIONS.md under "v2 ideas".
- Same bug fails 3 fixes: downgrade or disable the edge feature and hit DoD first.
- No whole-codebase refactors, stack swaps, or new deps just to save a few lines.`;

export function withDesktopQualityBar(prompt: string, lang: PromptQualityLang): string {
  const marker = lang === 'zh' ? QUALITY_MARKER_ZH : QUALITY_MARKER_EN;
  if (prompt.includes(marker)) return prompt.trim();

  const tail = lang === 'zh' ? QUALITY_TAIL_ZH : QUALITY_TAIL_EN;
  return `${prompt.trim()}\n\n${tail}`;
}
