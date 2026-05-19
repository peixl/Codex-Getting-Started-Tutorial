/**
 * Single source of truth for all reusable prompt text.
 * Every shared constraint, DoD rule, acceptance pattern, and delivery
 * guidance lives here. Other files import — never duplicate.
 */

export type ModuleLang = 'zh' | 'en';
export type ModuleTech = 'electron' | 'tauri' | 'pyqt' | 'auto';

// ─── Safety Rules (non-negotiable baseline) ─────────────────────

export const SAFETY_RULES_ZH = `【安全底线】
- 默认本地处理；需要联网时须加密传输并明确告知用户。
- 不写死 API Key、绝对路径、个人邮箱或内网地址。
- 输出不覆盖原文件，冲突加时间后缀。
- 不引入不存在的 npm 包；不确定时先查 npm view。
- 缺真实数据时先造脱敏 sample-data，不等用户提供文件才开工。`;

export const SAFETY_RULES_EN = `[Safety Rules]
- Process locally by default; network calls require encryption and explicit user consent.
- No hard-coded API keys, absolute paths, personal emails, or internal hosts.
- Never overwrite inputs; timestamp conflicts.
- Do not invent npm packages; verify with npm view first.
- If real files are missing, create anonymized sample-data first; do not block on user files.`;

// ─── Quality Rules (execution discipline) ────────────────────────

export const QUALITY_RULES_ZH = `【执行纪律】
- 每个功能写完立即运行验证，不要攒到最后才测。`;

export const QUALITY_RULES_EN = `[Execution Discipline]
- Verify each feature immediately after writing it; do not batch all testing to the end.`;

// Keep legacy exports for backward compatibility with tests
export const CONSTRAINTS_ZH = `${SAFETY_RULES_ZH}\n\n${QUALITY_RULES_ZH}`;
export const CONSTRAINTS_EN = `${SAFETY_RULES_EN}\n\n${QUALITY_RULES_EN}`;

// ─── Opening Brief (talk to the user before you build) ──────────

export const OPENING_BRIEF_ZH = `【开工前的开场白】
动手之前，先用 3-8 句告诉用户接下来会发生什么。3 句够就只用 3 句。

每句一行，带数字序号。短句。干净。有节奏。不用专业词。用「你」对话。讲画面、讲体感、讲结果——不讲实现。

下面是可选的素材清单，挑用得上的写，按这个顺序排——用不上的直接跳过，宁缺毋滥：
- 一句话点题：要做的是什么。
- 它替你解决什么。
- 关键的几步，一步一句。
- 用到了什么，一行带过。
- 打开后，你会看到什么。
- 你的文件存在哪，谁能看到。
- 下一步看什么。

不要承诺时间（"X 分钟内可用"），因为不准。说完不等回话，按下面的流程立刻动手。`;

export const OPENING_BRIEF_EN = `[Opening Brief]
Before you build, use 3-8 lines to tell the user what's coming. If 3 lines do it, use 3.

One sentence per line, numbered. Short. Clean. Rhythmic. No jargon. Speak to "you". Picture, feel, result — not implementation.

Pick from this checklist — keep them in order, skip what doesn't fit. Better to leave one out than fill in fluff:
- What you'll build, in one line.
- The friction it removes.
- The key steps — one per line.
- The stack, in a line.
- What you'll see when it opens.
- Where your files live. Who sees them.
- What to look at next.

Don't promise a timeline ("ready in X minutes") — you can't know. Don't wait for a reply. Follow the flow below immediately.`;

// ─── Warm UX Contract (treat the user with care) ────────────────

export const WARM_UX_ZH = `【温暖体验契约】
代码之外的事，比代码本身更重要。完成时要让用户觉得「这正是我要的」。
- 首次启动 = Demo 模式：自动加载 sample-data/ 跑完主流程一次，让用户立刻看到结果界面，而不是空状态。
- 工作台顶部永远有「用示例数据试一试」按钮，任何时候都能一键演示。
- 按钮、提示、错误一律用业务语言。例：「找不到订单号这一列」，不是「Column "order_id" not found」。
- 任何写盘操作默认走「另存为」；从不覆盖原文件，冲突自动加时间后缀。
- 步骤 ≥3 的操作给"撤销"或"取消"出口；≥5 步的关键操作要二次确认。
- 大批量任务显示进度条 + 预估剩余时间，最长每 1 秒刷新一次。
- 主流程一完成就在应用内给反馈；若窗口在后台，再发一次系统通知（Toast），点击直达结果。
- 失败时永远给出"下一步可以做什么"（重试 / 换文件 / 查看日志 / 复制错误），不要只留一行红色字。`;

export const WARM_UX_EN = `[Warm UX Contract]
What happens around the code matters more than the code itself. The finish should feel like a gift.
- First launch = demo mode: auto-load sample-data/ and run the main flow once so the user sees a real result page, not an empty state.
- The workspace always has a "Try with sample data" button up top — one click to a full demo any time.
- Buttons, hints, and errors in business language. Example: "Can't find the Order ID column", not "Column 'order_id' not found".
- Any write goes through "Save as"; never overwrite originals; timestamp on conflict.
- Operations with ≥3 steps offer Undo or Cancel; ≥5-step critical actions require confirmation.
- Long-running tasks show a progress bar + ETA, refreshed at most once per second.
- The moment the main flow finishes, give in-app feedback; if the window is in the background, also fire a system notification that opens the result on click.
- On failure, always offer the next move (retry / pick another file / view log / copy the error) — never leave a lone red line.`;

// ─── Success Picture (the moment of "wow") ──────────────────────

export const SUCCESS_PICTURE_ZH = `【完成态画面】
主流程结束的那一屏，是用户对这个工具的第一印象。把它当礼物来做。
- 大号数字 + 业务语言小结，30 字以内。例：「对账 482 单，差异 5 单。已存到 桌面/差异-2026-05.xlsx」。
- 关键发现用一行带颜色的 chip 摘要：「⚠ 3 单金额不一致 · ✦ 2 单疑似退款」。
- 三个动作按钮固定位置：「打开输出文件夹」「再做一次」「换一个文件」。
- 留一个"刚才做了什么"折叠面板，里面是可复制的 5-10 行操作日志。
- 不展示底层细节（毫秒、进程 ID、堆栈）；要给时间就用人话——写「用时 4 秒，处理 482 行」，不写「4231ms」。`;

export const SUCCESS_PICTURE_EN = `[Success Picture]
The screen at the end of the main flow is the user's lasting impression. Make it feel like a gift.
- Big-number outcome + a ≤30-word business-language summary. Example: "Reconciled 482 orders, 5 mismatches. Saved to Desktop/diff-2026-05.xlsx".
- Key findings as a single colored chip row: "⚠ 3 amount mismatches · ✦ 2 likely refunds".
- Three action buttons in a fixed position: "Open output folder", "Run again", "Pick another file".
- Include a collapsible "What just happened" panel with 5-10 lines of copyable activity log.
- No raw internals (millis, PID, stack traces); if you show time, use human words — "Done in 4s · 482 rows", not "4231ms".`;

// ─── Final Report Schema (how to wrap up) ───────────────────────

export const FINAL_REPORT_ZH = `【收尾汇报模板】
全部做完后，在对话里按这个固定 4 段格式向我（用户）汇报，不是 UI 文案。每段用 emoji 引导，正文用业务语言。
✅ 已交付：≤5 条核心能力，业务表述，不写技术名词。
▶ 如何打开：一条命令或"双击哪个文件"，让用户立刻能用。
✔ 已跑过的验证：lint / typecheck / build / 用 sample-data 烟测主流程，逐项写结果（PASS / FAIL）。
⚠ 已知限制 & v2 想法：≤3 条，每条一句话，不是 TODO 列表。`;

export const FINAL_REPORT_EN = `[Final Report Schema]
When everything is done, post this 4-section schema back to me (the user) in chat — not as UI copy. Each section opens with an emoji; body in business language.
✅ Delivered: ≤5 core capabilities, business framing, no jargon.
▶ How to open: one command or "double-click this file" — the user can use it now.
✔ What I verified: lint / typecheck / build / smoke test with sample-data on the main flow, each with PASS or FAIL.
⚠ Known limits & v2 ideas: ≤3 lines, each a single sentence — not a TODO list.`;

// ─── Inline condensed versions for recipes (short by design) ────

export const WARM_UX_INLINE_ZH = `- 温暖体验：首启 Demo 模式跑通一次；顶部常驻「用示例数据试一试」；按钮/错误用业务语言；不覆盖原文件；完成有 30 字小结 + 系统通知 + 「打开输出文件夹/再做一次」按钮。`;

export const WARM_UX_INLINE_EN = `- Warm UX: first launch auto-runs sample-data demo; keep a "Try with sample data" button up top; buttons/errors in business language; never overwrite originals; finish with a ≤30-word summary + system notification + "Open output folder / Run again" buttons.`;

export const FINAL_REPORT_INLINE_ZH = `- 收尾汇报四段：✅已交付 / ▶如何打开 / ✔已跑过的验证 / ⚠已知限制 & v2 想法。`;

export const FINAL_REPORT_INLINE_EN = `- Final report in four sections: ✅ Delivered / ▶ How to open / ✔ What I verified / ⚠ Known limits & v2 ideas.`;

export const ERROR_RECOVERY_INLINE_ZH = `- 错误自救：同一错误尝试不超过 3 次；超过则降级该功能、记下问题、先恢复主流程。依赖装不上换大版本或 --legacy-peer-deps；TypeScript 红字过多先 any 跑通；Electron 白屏查 preload / CSP；打包失败先回到 dev 正常态。`;

export const ERROR_RECOVERY_INLINE_EN = `- Error recovery: retry the same fix ≤3 times; beyond that, downgrade the feature, log the issue, restore the main flow. Install fail → bump major or --legacy-peer-deps; too many TS errors → any-type through main flow first; Electron blank → check preload/CSP; build fail → return to a clean dev mode first.`;

// ─── Quick Start Protocol ────────────────────────────────────────

export function quickStart(tech: ModuleTech, lang: ModuleLang): string {
  if (lang === 'zh') {
    const techNote = tech === 'auto'
      ? '（默认 Electron；若功能极简可选 PyQt，Rust 就绪可选 Tauri）\n'
      : '';
    const deps = tech === 'tauri'
      ? '@tauri-apps/cli, @tauri-apps/api, react, typescript'
      : tech === 'pyqt'
        ? 'python ≥3.10, pyqt6（用 venv 或 uv 管理）'
        : 'electron, react, react-dom, typescript, @types/react';
    const verify = tech === 'pyqt'
      ? '写最小 main.py（创建窗口），确认窗口能弹出'
      : tech === 'tauri'
        ? '写最小 src/main.tsx + src-tauri/src/main.rs，确认窗口能弹出'
        : '写最小 main.ts（创建窗口）+ index.html + renderer 入口，确认窗口能弹出';
    return `【快速启动协议】
${techNote}输出【开场白】之后立刻按以下顺序执行，不要先输出方案等确认：
1. 创建项目目录，初始化配置文件
2. 安装核心依赖：${deps}
3. ${verify}
4. 创建 sample-data/ 目录，放入贴近业务的脱敏示例数据
5. 按功能逐个实现，每完成一个功能立即运行验证
6. 最后补文档、打包脚本、使用说明`;
  }

  const techNote = tech === 'auto'
    ? '(Default: Electron. Use PyQt for minimal tools; Tauri only if Rust is ready.)\n'
    : '';
  const deps = tech === 'tauri'
    ? '@tauri-apps/cli, @tauri-apps/api, react, typescript'
    : tech === 'pyqt'
      ? 'python ≥3.10, pyqt6 (use venv or uv)'
      : 'electron, react, react-dom, typescript, @types/react';
  const verify = tech === 'pyqt'
    ? 'Write minimal main.py (create window); confirm the window launches'
    : tech === 'tauri'
      ? 'Write minimal src/main.tsx + src-tauri/src/main.rs; confirm the window launches'
      : 'Write minimal main.ts (create window) + index.html + renderer entry; confirm the window launches';
  return `[Quick Start Protocol]
${techNote}After outputting the [Opening Brief], execute in this order — do not output a plan and wait:
1. Create project directory, init config files
2. Install core deps: ${deps}
3. ${verify}
4. Create sample-data/ with realistic anonymized business data
5. Implement features one by one; verify each immediately after writing
6. Finish with docs, packaging scripts, and user guide`;
}

export const QUICK_START_ZH = quickStart('electron', 'zh');
export const QUICK_START_EN = quickStart('electron', 'en');

// ─── Project Structure ───────────────────────────────────────────

export function projectStructure(tech: ModuleTech, lang: ModuleLang): string {
  if (lang === 'zh') {
    if (tech === 'tauri') {
      return `【项目结构】
├── src/               # React UI（pages, components, hooks）
├── src-tauri/src/     # Rust 后端（commands, state）
├── src/core/          # 纯业务逻辑（可独立测试）
├── sample-data/       # 脱敏示例数据
├── scripts/           # dev / build / package 脚本
├── docs/              # 使用说明 + 已知限制
└── package.json`;
    }
    if (tech === 'pyqt') {
      return `【项目结构】
├── src/               # 主程序（main.py, windows, widgets）
├── src/core/          # 纯业务逻辑（可独立测试）
├── ui/                # Qt Designer .ui 文件（如有）
├── sample-data/       # 脱敏示例数据
├── scripts/           # dev / build / package 脚本
├── docs/              # 使用说明 + 已知限制
└── requirements.txt`;
    }
    return `【项目结构】
├── src/main/          # Electron 主进程（main.ts, preload.ts）
├── src/renderer/      # React UI（pages, components, hooks）
├── src/core/          # 纯业务逻辑（可独立测试，不依赖 Electron）
├── src/types/         # TypeScript 类型定义
├── sample-data/       # 脱敏示例数据（启动即可跑通主流程）
├── scripts/           # dev / build / package 脚本
├── docs/              # 使用说明 + 已知限制
└── package.json       # 入口、脚本、依赖`;
  }

  if (tech === 'tauri') {
    return `[Project Structure]
├── src/               # React UI (pages, components, hooks)
├── src-tauri/src/     # Rust backend (commands, state)
├── src/core/          # Pure business logic (testable independently)
├── sample-data/       # Anonymized sample data
├── scripts/           # dev / build / package scripts
├── docs/              # User guide + known limitations
└── package.json`;
  }
  if (tech === 'pyqt') {
    return `[Project Structure]
├── src/               # Main app (main.py, windows, widgets)
├── src/core/          # Pure business logic (testable independently)
├── ui/                # Qt Designer .ui files (if any)
├── sample-data/       # Anonymized sample data
├── scripts/           # dev / build / package scripts
├── docs/              # User guide + known limitations
└── requirements.txt`;
  }
  return `[Project Structure]
├── src/main/          # Electron main process (main.ts, preload.ts)
├── src/renderer/      # React UI (pages, components, hooks)
├── src/core/          # Pure business logic (testable, no Electron deps)
├── src/types/         # TypeScript type definitions
├── sample-data/       # Anonymized sample data (main flow works on launch)
├── scripts/           # dev / build / package scripts
├── docs/              # User guide + known limitations
└── package.json       # entry, scripts, dependencies`;
}

export const PROJECT_STRUCTURE_ZH = projectStructure('electron', 'zh');
export const PROJECT_STRUCTURE_EN = projectStructure('electron', 'en');

// ─── Error Recovery ──────────────────────────────────────────────

export function errorRecovery(tech: ModuleTech, lang: ModuleLang): string {
  if (lang === 'zh') {
    const shared = `- 样式错乱 → 检查 CSS 加载顺序和选择器优先级
- 同一错误 3 次 → 换方案或降级该功能，不要死磕`;
    if (tech === 'tauri') {
      return `【错误自救】
遇到问题时按以下策略处理，不要反复尝试同一方法：
- Rust 编译失败 → 读 borrow checker 提示，简化所有权；必要时用 clone() 先跑通
- Tauri command 前端调不到 → 确认 #[tauri::command] 注解 + .invoke_handler() 注册
- 前端白屏 → 检查 devtools console、确认 tauri.conf.json 里 devPath 正确
- JS 依赖安装失败 → 检查包名拼写，降一个大版本，或 --legacy-peer-deps
- 打包失败 → 分别确认 cargo build 和前端 build 各自通过
${shared}`;
    }
    if (tech === 'pyqt') {
      return `【错误自救】
遇到问题时按以下策略处理，不要反复尝试同一方法：
- pip install 失败 → 确认 Python 版本 ≥3.10，用 venv/uv 隔离环境
- ImportError → 确认 venv 已激活，注意包名和 import 名不一致（如 pyqt6 vs PyQt6）
- 窗口不显示 → 确认 app.exec() 和 widget.show() 都调了
- 布局错乱 → 检查 stretch factor、size policy、minimum size
- 崩溃无报错 → 用 python -u 运行并检查 stderr，主入口加 try/except
${shared}`;
    }
    return `【错误自救】
遇到问题时按以下策略处理，不要反复尝试同一方法：
- 依赖安装失败 → 检查包名拼写，尝试降一个大版本，或换 --legacy-peer-deps
- TypeScript 报错过多 → 先用 any 跑通主流程，再逐步补类型
- Electron 白屏 → 检查 preload 路径、CSP 策略、console 报错
- 打包失败 → 先确认 dev 模式完全正常，再排查打包配置
${shared}`;
  }

  const shared = `- Styles broken → check CSS load order and selector specificity
- Same error 3 times → switch approach or downgrade that feature, do not keep retrying`;
  if (tech === 'tauri') {
    return `[Error Recovery]
When hitting issues, follow these strategies instead of retrying the same approach:
- Rust compile error → read borrow checker hints, simplify ownership; clone() to unblock if needed
- Tauri command not reachable → verify #[tauri::command] annotation + .invoke_handler() registration
- White screen → check devtools console, confirm devPath in tauri.conf.json
- JS dependency install fails → check spelling, try one major version down, or --legacy-peer-deps
- Build fails → confirm cargo build and frontend build pass independently
${shared}`;
  }
  if (tech === 'pyqt') {
    return `[Error Recovery]
When hitting issues, follow these strategies instead of retrying the same approach:
- pip install fails → confirm Python ≥3.10, use venv/uv for isolation
- ImportError → confirm venv is active; watch for package vs import name mismatch (pyqt6 vs PyQt6)
- Window doesn't show → confirm app.exec() and widget.show() are both called
- Layout broken → check stretch factors, size policies, minimum sizes
- Crash with no error → run with python -u, check stderr, wrap main in try/except
${shared}`;
  }
  return `[Error Recovery]
When hitting issues, follow these strategies instead of retrying the same approach:
- Dependency install fails → check spelling, try one major version down, or use --legacy-peer-deps
- Too many TypeScript errors → use any to get the main flow running, then add types incrementally
- Electron white screen → check preload path, CSP policy, console errors
- Packaging fails → confirm dev mode works perfectly first, then debug packaging config
${shared}`;
}

export const ERROR_RECOVERY_ZH = errorRecovery('electron', 'zh');
export const ERROR_RECOVERY_EN = errorRecovery('electron', 'en');

// ─── UI Standards ────────────────────────────────────────────────

export function uiStandards(tech: ModuleTech, lang: ModuleLang): string {
  if (lang === 'zh') {
    if (tech === 'pyqt') {
      return `【UI 最低视觉标准】
- 使用系统原生控件（QPushButton, QTableView, QLabel 等），不自绘除非必要
- 布局用 QVBoxLayout / QHBoxLayout / QGridLayout，设 spacing ≥ 8、margin ≥ 16
- 字体跟随系统默认；标题用 setBold + pointSize +2，正文不小于系统默认
- 所有按钮有 setToolTip；禁用态用 setEnabled(False) 而非隐藏
- 空状态显示 QLabel 引导文案 + 操作按钮，不要留空白窗口
- 加载状态用 QProgressBar 或 QProgressDialog，不要无反馈
- 错误状态用 QMessageBox.warning / critical + 具体原因 + 重试选项
- 窗口最小尺寸 setMinimumSize(640, 480)，支持拖拽缩放`;
    }
    return `【UI 最低视觉标准】
- 标题 ≥ 20px 加粗，正文 ≥ 14px，辅助文字 ≥ 12px
- 元素间距 ≥ 8px，区块间距 ≥ 16px，页面边距 ≥ 24px
- 主色、辅色、强调色不超过 3 个，用 CSS 变量统一管理
- 所有按钮/可点击元素有 hover 和 active 状态反馈
- 空状态显示引导文案和操作按钮，不要留白屏
- 加载状态用 spinner 或骨架屏，不要无反馈
- 错误状态用红色边框/文字 + 具体原因 + 重试按钮
- 圆角统一（推荐 6-8px），阴影柔和（0 2px 8px rgba(0,0,0,0.1)）`;
  }

  if (tech === 'pyqt') {
    return `[Minimum UI Standards]
- Use native widgets (QPushButton, QTableView, QLabel, etc.); no custom painting unless necessary
- Layout with QVBoxLayout / QHBoxLayout / QGridLayout; spacing ≥ 8, margins ≥ 16
- Follow system font; headings use setBold + pointSize +2; body no smaller than system default
- All buttons have setToolTip; disabled state via setEnabled(False), not hiding
- Empty states show a QLabel with guidance + action button, never a blank window
- Loading states use QProgressBar or QProgressDialog, never no feedback
- Error states use QMessageBox.warning/critical + specific reason + retry option
- Minimum window size setMinimumSize(640, 480); support resize`;
  }
  return `[Minimum UI Standards]
- Headings ≥ 20px bold, body ≥ 14px, secondary ≥ 12px
- Element spacing ≥ 8px, section spacing ≥ 16px, page margins ≥ 24px
- Max 3 colors (primary, secondary, accent); manage via CSS variables
- All buttons/clickable elements must have hover and active feedback
- Empty states show guidance text and an action button, never a blank screen
- Loading states use a spinner or skeleton, never no feedback
- Error states use red border/text + specific reason + retry button
- Consistent border-radius (6-8px recommended), soft shadows (0 2px 8px rgba(0,0,0,0.1))`;
}

export const UI_STANDARDS_ZH = uiStandards('electron', 'zh');
export const UI_STANDARDS_EN = uiStandards('electron', 'en');

// ─── Anti-Patterns ──────────────────────────────────────────────

export const ANTI_PATTERNS_ZH = `【反模式清单 — 以下行为禁止】
- 写空函数体或 TODO 注释当完成
- 用假数据渲染 UI 却不接通真实逻辑
- 不安装依赖就开始写 import
- 一次性写完所有代码再运行（应逐功能验证）
- 报错后反复尝试同一方案超过 3 次
- 用 console.log 代替真实的错误处理 UI
- 忽略空状态和加载状态
- 启动后第一屏是空白 / 欢迎页 / 设置页（应是工作台 + Demo 数据）
- 错误信息暴露技术名词（"Cannot read property"、"Column not found"）
- 大批量操作没有进度条 / 预估时间
- 写盘时覆盖原文件（必须另存为，冲突加时间后缀）
- 完成后无任何反馈（没有小结、没有按钮、没有系统通知）`;

export const ANTI_PATTERNS_EN = `[Anti-Patterns — Never Do These]
- Empty function bodies or TODO comments as "done"
- Rendering UI with fake data without wiring real logic
- Writing imports before installing dependencies
- Writing all code at once then running (verify per feature instead)
- Retrying the same failing approach more than 3 times
- Using console.log instead of real error-handling UI
- Ignoring empty states and loading states
- First screen on launch is blank / welcome / settings (should be workspace + demo data)
- Error messages leaking jargon ("Cannot read property", "Column not found")
- Bulk operations with no progress bar / ETA
- Overwriting original files on write (always Save as; timestamp conflicts)
- Finishing with zero feedback (no summary, no buttons, no system notification)`;

// ─── DoD / Stop-Vibe-Coding ───────────────────────────────────────

export const DOD_ZH = `【DoD / 停止 Vibe Coding】
完成标准（逐条检查，全部通过才停手）：
□ 能启动；示例数据跑通主流程并产生产物
□ 异常路径友好（空数据、错格式、取消、重名冲突 → 不闪退）
□ UI 符合最低视觉标准（字号层级清晰、间距舒适、空状态有引导）
□ lint/typecheck/test/build 通过
□ 已用 sample-data 完成 启动 → 主流程 → 导出/保存 烟测
□ 有 setup/dev/package 脚本、README、使用说明、已知限制、示例数据
满足即停，新想法写 v2。`;

export const DOD_EN = `[DoD / Stop-Vibe-Coding]
Done criteria (check each — all must pass before reporting):
☐ Launches; sample data creates the artifact
☐ Edge cases are friendly (empty data, bad format, cancel, name conflict → no crash)
☐ UI meets minimum standards (clear type hierarchy, comfortable spacing, empty states have guidance)
☐ lint/typecheck/test/build pass
☐ Smoke test: launch → main flow → export/save with sample-data; note result
☐ setup/dev/package scripts, README, guide, limits, and samples exist
Stop; new ideas go to v2.`;

// ─── Desktop Delivery Contract ────────────────────────────────────

export const DELIVERY_CONTRACT_ZH = `【桌面交付契约】
- 交付本地可运行应用，不是方案；第一屏就是主工作台。M1≤15 分钟先出可启动窗口+示例数据/试用模式，M2 接通真实主流程，M3 补异常/UI/隐私，M4 测试+打包+文档。
- 每个里程碑卡住时的降级策略：M1 卡住 → 换更简单的实现方式先出窗口；M2 卡住 → 先跑通核心 3 步，边缘路径后面补。
- 每次汇报≤6行：完成、验证、跳过原因、下一步+预计时间。
- 用业务语言写按钮、错误和说明；支持拖拽+系统打开/保存；空/错格式/取消/无权限/大文件/重名冲突都友好处理，不暴露堆栈。
- 路径兼容中文、空格、括号、长路径和 Windows/macOS 分隔差异；Windows 快捷键用 Ctrl/Alt，macOS 用 Command/Option。
- 项目分层：desktop shell / controlled API / UI / core / tests / sample-data / docs；IPC 白名单化，UI 不直接执行本地命令。
- 真实接线：导入、预览、生成/保存、导出、错误状态都可用；不把 TODO、空函数、未用大组件或假数据当完成。`;

export const DELIVERY_CONTRACT_EN = `[Desktop Delivery Contract]
- Runnable local app, not advice; workspace first. M1≤15 min gets a launchable window + sample/demo data; M2 real flow; M3 errors/UI/privacy; M4 tests+package+docs.
- Milestone fallbacks: M1 stalls → simplify approach, get a window up first; M2 stalls → wire core 3 steps, fill edges later.
- Updates ≤6 lines: done, verification, skipped reason, next+ETA.
- Business labels/errors/help; drag/drop + native open/save; bad/cancel/no-permission/large/conflict cases are friendly, no raw stacks.
- Paths handle Chinese, spaces, parentheses, long paths, and Windows/macOS separators; use Ctrl/Alt on Windows and Command/Option on macOS.
- Layers: shell / controlled API / UI / core / tests / sample-data / docs; IPC allowlisted; renderer never runs local commands.
- Real wiring: import, preview, generate/save, export, and error states work; TODOs, empty functions, or fake data do not count as done.`;

// ─── Common Acceptance Criteria Items ──────────────────────────────

export const ACCEPTANCE_COMMON_ZH = {
  launchOk: '□ 双击/一条命令启动，第一屏是主工作台',
  sampleFlowOk: '□ 示例数据跑通主流程，产出可检查的文件/表格',
  emptyStateFriendly: '□ 空数据、格式错误、取消操作 → 友好中文提示，不闪退',
  pathCompatible: '□ 路径含中文/空格/括号 → 正常工作',
  exportOk: '□ 导出功能正常，文件名带日期/月份',
} as const;

export const ACCEPTANCE_COMMON_EN = {
  launchOk: '☐ Launches by double-click or one command; first screen is the workspace',
  sampleFlowOk: '☐ Sample data completes the main flow, producing a checkable file/sheet',
  emptyStateFriendly: '☐ Empty data, bad format, cancel → friendly message, no crash',
  pathCompatible: '☐ Paths with Chinese/spaces/parentheses → work correctly',
  exportOk: '☐ Export works; filename includes date/month',
} as const;

// ─── Recipe Constraints (shorter, inline format) ───────────────────

export const RECIPE_CONSTRAINTS_ZH = `- 约束：默认本地处理，联网须加密并告知用户；不覆盖原文件；不造包名；缺真实数据先造脱敏 sample-data。`;
export const RECIPE_CONSTRAINTS_EN = `- Constraints: process locally by default, network calls require encryption and user consent; never overwrite originals; no fake packages; make anonymized sample-data first.`;

// ─── Communication Defaults ──────────────────────────────────────

export const COMMUNICATION_ZH = '本地处理；桌面工具风格；中文沟通。';
export const COMMUNICATION_EN = 'Process locally; keep a desktop-tool feel; use plain English.';

// ─── Role Templates ──────────────────────────────────────────────

export function caseRole(userDesc: string, lang: ModuleLang): string {
  if (lang === 'zh') {
    return `你是一名擅长本地桌面小工具的资深工程师，也是一名体贴的产品经理。你写代码前先把自己当成用户走一遍：第一眼看到什么、第一次怎么用、第一次出错怎么自救。请帮我做一个本地运行的桌面小工具，使用的人是${userDesc}，关注业务结果和操作体验。`;
  }
  return `You are a senior engineer building local desktop tools and a thoughtful product manager. Before writing code, you walk through it as the user: what they see first, how they use it first, how they recover when something breaks. Build a runnable local desktop tool. The user is ${userDesc}, focused on business outcomes and usability.`;
}

// ─── Packaging Templates ─────────────────────────────────────────

export function packagingInstruction(
  wordCount: number,
  lang: ModuleLang,
  extra?: string,
): string {
  if (lang === 'zh') {
    const base = `- 同时打包成 Windows .exe 安装包和 macOS .dmg 安装包；附 ${wordCount} 字以内中文使用说明`;
    return extra ? `${base}，${extra}。` : `${base}。`;
  }
  const base = `- Package as Windows .exe and macOS .dmg; include a ${wordCount}-word user guide`;
  return extra ? `${base}, ${extra}.` : `${base}.`;
}

// ─── Recipe Role Templates ───────────────────────────────────────

export const RECIPE_ROLE_ZH = '你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个本地小工具：';
export const RECIPE_ROLE_EN = 'You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform desktop tool:';

export function recipeRole(toolDesc: string, lang: ModuleLang): string {
  if (lang === 'zh') {
    return `你是一名擅长 Windows 和 macOS 桌面软件的工程师，帮我做一个${toolDesc}：`;
  }
  return `You are a senior engineer for Windows and macOS desktop apps. Build a local cross-platform ${toolDesc}:`;
}

// ─── Formatting Helpers ───────────────────────────────────────────

export function deliveryBlock(phases: string[], lang: ModuleLang): string {
  const header = lang === 'zh' ? '【交付】' : '[Delivery]';
  return `${header}\n${phases.map((p, i) => `${i + 1}. ${p}`).join('\n')}`;
}

export function acceptanceChecklist(items: string[], lang: ModuleLang): string {
  const header = lang === 'zh'
    ? '验收清单（全部通过才算完成）：'
    : 'Acceptance checklist (all must pass):';
  return `${header}\n${items.join('\n')}`;
}

// ─── Incremental Helper ───────────────────────────────────────────
// Appends shared constraints to an existing prompt (idempotent via marker).

const CONSTRAINTS_MARKER_ZH = '【安全底线】';
const CONSTRAINTS_MARKER_EN = '[Safety Rules]';

export function withSharedConstraints(prompt: string, lang: ModuleLang): string {
  const marker = lang === 'zh' ? CONSTRAINTS_MARKER_ZH : CONSTRAINTS_MARKER_EN;
  if (prompt.includes(marker)) return prompt;
  const constraints = lang === 'zh' ? CONSTRAINTS_ZH : CONSTRAINTS_EN;
  return `${prompt}\n\n${constraints}`;
}

// ─── Full Case Prompt Composer ────────────────────────────────────

type CaseSections = {
  role: string;
  goal: string;
  platform: string;
  features: string;
  sampleData?: string;
  style?: string;
  robustness?: string;
  extra?: string;
  deliveryPhases: string[];
  acceptanceItems: string[];
  communication?: string;
  tech?: ModuleTech;
};

export function composeCasePrompt(sections: CaseSections, lang: ModuleLang): string {
  const parts: string[] = [];

  parts.push(sections.role);
  parts.push(lang === 'zh' ? OPENING_BRIEF_ZH : OPENING_BRIEF_EN);
  parts.push(lang === 'zh' ? '【目标】' : '[Goal]');
  parts.push(sections.goal);
  parts.push(lang === 'zh' ? '【平台与技术】' : '[Platform & Stack]');
  parts.push(sections.platform);
  parts.push(lang === 'zh' ? '【核心功能】' : '[Core Features]');
  parts.push(sections.features);

  if (sections.sampleData) {
    parts.push(lang === 'zh' ? '【示例数据格式】' : '[Sample Data Format]');
    parts.push(sections.sampleData);
  }
  if (sections.style) {
    parts.push(lang === 'zh' ? '【界面风格】' : '[Visual Style]');
    parts.push(sections.style);
  } else {
    parts.push(uiStandards(sections.tech ?? 'electron', lang));
  }
  if (sections.robustness) {
    parts.push(lang === 'zh' ? '【稳健性】' : '[Robustness]');
    parts.push(sections.robustness);
  }
  if (sections.extra) parts.push(sections.extra);

  parts.push(lang === 'zh' ? CONSTRAINTS_ZH : CONSTRAINTS_EN);
  parts.push(lang === 'zh' ? WARM_UX_ZH : WARM_UX_EN);
  parts.push(lang === 'zh' ? SUCCESS_PICTURE_ZH : SUCCESS_PICTURE_EN);
  parts.push(projectStructure(sections.tech ?? 'electron', lang));
  parts.push(errorRecovery(sections.tech ?? 'electron', lang));
  parts.push(deliveryBlock(sections.deliveryPhases, lang));
  parts.push(acceptanceChecklist(sections.acceptanceItems, lang));

  if (sections.communication) parts.push(sections.communication);

  return parts.join('\n\n');
}

// ─── Full Recipe Prompt Composer ──────────────────────────────────

type RecipeParts = {
  role: string;
  goal: string;
  platform: string;
  stack: string;
  features: string;
  extra?: string;
  acceptance: string;
  packaging: string;
};

export function composeRecipePrompt(parts: RecipeParts, lang: ModuleLang): string {
  const lines: string[] = [];

  lines.push(parts.role);
  lines.push(lang === 'zh' ? `- 目标：${parts.goal}` : `- Goal: ${parts.goal}`);
  lines.push(lang === 'zh' ? `- 平台：${parts.platform}` : `- Platform: ${parts.platform}`);
  lines.push(lang === 'zh' ? `- 做法：${parts.stack}` : `- Stack: ${parts.stack}`);
  lines.push(lang === 'zh' ? `- 功能：${parts.features}` : `- Features: ${parts.features}`);

  if (parts.extra) lines.push(parts.extra);

  lines.push(lang === 'zh' ? RECIPE_CONSTRAINTS_ZH : RECIPE_CONSTRAINTS_EN);
  lines.push(lang === 'zh' ? WARM_UX_INLINE_ZH : WARM_UX_INLINE_EN);
  lines.push(lang === 'zh' ? `- 验收：${parts.acceptance}` : `- Acceptance: ${parts.acceptance}`);
  lines.push(parts.packaging);
  lines.push(lang === 'zh' ? FINAL_REPORT_INLINE_ZH : FINAL_REPORT_INLINE_EN);
  lines.push(lang === 'zh' ? ERROR_RECOVERY_INLINE_ZH : ERROR_RECOVERY_INLINE_EN);

  return lines.join('\n');
}
