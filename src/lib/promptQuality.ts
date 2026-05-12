export type PromptQualityLang = 'zh' | 'en';

const QUALITY_MARKER_ZH = '【高质量交付补充】';
const QUALITY_MARKER_EN = '[High-Quality Delivery Addendum]';

const QUALITY_TAIL_ZH = `【高质量交付补充】
若上文要求等待确认，改为：≤8 行摘要后直接实现、运行、修复、验证；只因真实文件、账号、证书或不可逆操作停下。

【桌面交付契约】
- 交付本地可运行应用，不是方案；第一屏就是主工作台。M1≤15 分钟先出可启动窗口+示例数据/试用模式，M2 接通真实主流程，M3 补异常/UI/隐私，M4 测试+打包+文档。
- 每次汇报≤6行：完成、验证、跳过原因、下一步+预计时间，减少小白用户等待焦虑。
- 用业务语言写按钮、错误和说明；支持拖拽+系统打开/保存；空/错格式/取消/无权限/大文件/重名冲突都友好处理，不暴露堆栈。
- 路径兼容中文、空格、括号、长路径和 Windows/macOS 分隔差异；Windows 快捷键用 Ctrl/Alt，macOS 用 Command/Option。
- 默认离线、本地处理；不覆盖原文件；不写死密钥、绝对路径、个人邮箱或内网地址。
- 项目分层：desktop shell / controlled API / UI / core / tests / sample-data / docs；IPC 白名单化，UI 不直接执行本地命令。
- 真实接线：导入、预览、生成/保存、导出、错误状态都可用；不把 TODO、空函数、未用大组件或假数据当完成。

【DoD / 停止 Vibe Coding】
能启动；示例数据跑通真实主流程并产生产物；异常路径友好；lint/typecheck/test/build 通过；有 setup/dev/package 脚本、README、使用说明、已知限制、示例数据。满足即停，新想法写 v2；同一 bug 3 次失败就降级或禁用边缘功能，先交付主流程。`;

const QUALITY_TAIL_EN = `[High-Quality Delivery Addendum]
If the prompt says to wait for confirmation, summarize in ≤8 lines, then implement/run/fix/verify; stop only for real files, accounts, certificates, or irreversible actions.

[Desktop Delivery Contract]
- Runnable local app, not advice; workspace first. M1≤15 min gets a launchable window + sample/demo data; M2 real flow; M3 errors/UI/privacy; M4 tests+package+docs.
- Updates ≤6 lines: done, verification, skipped reason, next+ETA.
- Business labels/errors/help; drag/drop + native open/save; bad/cancel/no-permission/large/conflict cases are friendly, no raw stacks.
- Paths handle Chinese, spaces, parentheses, long paths, and Windows/macOS separators; use Ctrl/Alt on Windows and Command/Option on macOS.
- Offline/local; never overwrite inputs; no hard-coded secrets, absolute paths, personal emails, or internal hosts.
- Layers: shell / controlled API / UI / core / tests / sample-data / docs; IPC allowlisted; renderer never runs local commands.
- Real wiring: import, preview, generate/save, export, and error states work; TODOs, empty functions, or fake data do not count as done.

[DoD / Stop-Vibe-Coding]
Launches; sample data creates the artifact; edge cases are friendly; lint/typecheck/test/build pass; setup/dev/package scripts, README, guide, limits, and samples exist. Stop; new ideas go to v2. Same bug fails 3 times: downgrade/disable the edge feature and ship the main flow.`;

function compactLegacyBoilerplate(prompt: string): string {
  return prompt
    .replace(/\n?请先给\s*10\s*行以内方案摘要，然后直接实现、运行和验证。/g, '')
    .replace(/\n?先给\s*(?:10\s*行以内|简短)方案摘要，然后直接实现、运行和验证。(?:全程)?中文(?:沟通)?。/g, '')
    .replace(/\n?Start with a brief plan summary, then implement, run, and verify\.(?: English throughout\.)?/g, '')
    .replace(/不确定的地方直接问我/g, '只有真实阻塞问题再问我')
    .replace(/Ask me if unsure\./g, 'Ask only for true blockers.')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function withDesktopQualityBar(prompt: string, lang: PromptQualityLang): string {
  const marker = lang === 'zh' ? QUALITY_MARKER_ZH : QUALITY_MARKER_EN;
  const compacted = compactLegacyBoilerplate(prompt);
  if (compacted.includes(marker)) return compacted;

  const tail = lang === 'zh' ? QUALITY_TAIL_ZH : QUALITY_TAIL_EN;
  return `${compacted}\n\n${tail}`;
}
