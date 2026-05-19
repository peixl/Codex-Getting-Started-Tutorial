import { describe, it, expect } from 'vitest';
import {
  CONSTRAINTS_ZH,
  CONSTRAINTS_EN,
  DOD_ZH,
  DOD_EN,
  DELIVERY_CONTRACT_ZH,
  DELIVERY_CONTRACT_EN,
  RECIPE_CONSTRAINTS_ZH,
  RECIPE_CONSTRAINTS_EN,
  ACCEPTANCE_COMMON_ZH,
  ACCEPTANCE_COMMON_EN,
  OPENING_BRIEF_ZH,
  OPENING_BRIEF_EN,
  WARM_UX_ZH,
  WARM_UX_EN,
  SUCCESS_PICTURE_ZH,
  SUCCESS_PICTURE_EN,
  FINAL_REPORT_ZH,
  FINAL_REPORT_EN,
  WARM_UX_INLINE_ZH,
  WARM_UX_INLINE_EN,
  FINAL_REPORT_INLINE_ZH,
  FINAL_REPORT_INLINE_EN,
  ANTI_PATTERNS_ZH,
  ANTI_PATTERNS_EN,
  errorRecovery,
  uiStandards,
  deliveryBlock,
  acceptanceChecklist,
  withSharedConstraints,
  composeCasePrompt,
  composeRecipePrompt,
} from './promptModules';

// ─── Constants: non-empty and contain key phrases ────────────────

describe('prompt module constants', () => {
  it('CONSTRAINTS_ZH contains key rules', () => {
    expect(CONSTRAINTS_ZH).toContain('本地处理');
    expect(CONSTRAINTS_ZH).toContain('脱敏 sample-data');
    expect(CONSTRAINTS_ZH).toContain('npm view');
    expect(CONSTRAINTS_ZH).toContain('立即运行验证');
    expect(CONSTRAINTS_ZH).toContain('另存为');
  });

  it('CONSTRAINTS_EN contains key rules', () => {
    expect(CONSTRAINTS_EN).toContain('local');
    expect(CONSTRAINTS_EN).toContain('anonymized sample-data');
    expect(CONSTRAINTS_EN).toContain('npm view');
    expect(CONSTRAINTS_EN).toContain('Verify each feature');
    expect(CONSTRAINTS_EN).toContain('Save as');
  });

  it('DOD_ZH has checklist format', () => {
    expect(DOD_ZH).toContain('完成标准');
    expect(DOD_ZH).toContain('□');
    expect(DOD_ZH).toContain('烟测');
  });

  it('DOD_EN has checklist format', () => {
    expect(DOD_EN).toContain('Done criteria');
    expect(DOD_EN).toContain('☐');
    expect(DOD_EN).toContain('Smoke test');
  });

  it('DELIVERY_CONTRACT_ZH mentions milestones', () => {
    expect(DELIVERY_CONTRACT_ZH).toContain('M1');
    expect(DELIVERY_CONTRACT_ZH).toContain('M2');
    expect(DELIVERY_CONTRACT_ZH).toContain('卡住');
  });

  it('DELIVERY_CONTRACT_EN mentions milestones', () => {
    expect(DELIVERY_CONTRACT_EN).toContain('M1');
    expect(DELIVERY_CONTRACT_EN).toContain('M2');
    expect(DELIVERY_CONTRACT_EN).toContain('stalls');
  });

  it('RECIPE_CONSTRAINTS_ZH preserves critical recipe rules', () => {
    expect(RECIPE_CONSTRAINTS_ZH).toContain('约束');
    expect(RECIPE_CONSTRAINTS_ZH).toContain('sample-data');
    expect(RECIPE_CONSTRAINTS_ZH).toContain('不覆盖原文件');
    expect(RECIPE_CONSTRAINTS_ZH).toContain('不造包名');
  });

  it('RECIPE_CONSTRAINTS_EN preserves critical recipe rules', () => {
    expect(RECIPE_CONSTRAINTS_EN).toContain('Constraints');
    expect(RECIPE_CONSTRAINTS_EN).toContain('sample-data');
    expect(RECIPE_CONSTRAINTS_EN).toContain('never overwrite originals');
    expect(RECIPE_CONSTRAINTS_EN).toContain('no fake packages');
  });

  it('ACCEPTANCE_COMMON_ZH has all keys', () => {
    expect(ACCEPTANCE_COMMON_ZH.launchOk).toContain('启动');
    expect(ACCEPTANCE_COMMON_ZH.sampleFlowOk).toContain('主流程');
    expect(ACCEPTANCE_COMMON_ZH.emptyStateFriendly).toContain('不闪退');
    expect(ACCEPTANCE_COMMON_ZH.pathCompatible).toContain('中文');
    expect(ACCEPTANCE_COMMON_ZH.exportOk).toContain('导出');
  });

  it('ACCEPTANCE_COMMON_EN has all keys', () => {
    expect(ACCEPTANCE_COMMON_EN.launchOk).toContain('Launches');
    expect(ACCEPTANCE_COMMON_EN.sampleFlowOk).toContain('main flow');
    expect(ACCEPTANCE_COMMON_EN.emptyStateFriendly).toContain('no crash');
    expect(ACCEPTANCE_COMMON_EN.pathCompatible).toContain('Chinese');
    expect(ACCEPTANCE_COMMON_EN.exportOk).toContain('Export');
  });

  it('OPENING_BRIEF_ZH primes Codex to greet the user in 3-8 numbered lines', () => {
    expect(OPENING_BRIEF_ZH).toContain('【开工前的开场白】');
    expect(OPENING_BRIEF_ZH).toContain('3-8 句');
    expect(OPENING_BRIEF_ZH).toContain('带数字序号');
    expect(OPENING_BRIEF_ZH).toContain('不等回话');
    expect(OPENING_BRIEF_ZH).toContain('不要承诺时间');
  });

  it('OPENING_BRIEF_EN primes Codex to greet the user in 3-8 numbered lines', () => {
    expect(OPENING_BRIEF_EN).toContain('[Opening Brief]');
    expect(OPENING_BRIEF_EN).toContain('3-8 numbered lines');
    expect(OPENING_BRIEF_EN).toContain('numbered');
    expect(OPENING_BRIEF_EN).toContain("Don't wait");
    expect(OPENING_BRIEF_EN).toContain("Don't promise a timeline");
  });

  it('WARM_UX_ZH carries the warm-experience contract', () => {
    expect(WARM_UX_ZH).toContain('温暖体验契约');
    expect(WARM_UX_ZH).toContain('Demo 模式');
    expect(WARM_UX_ZH).toContain('用示例数据试一试');
    expect(WARM_UX_ZH).toContain('业务语言');
    expect(WARM_UX_ZH).toContain('系统通知');
  });

  it('errorRecovery returns Electron-specific advice by default', () => {
    const zh = errorRecovery('electron', 'zh');
    expect(zh).toContain('Electron 白屏');
    expect(zh).toContain('preload');
    expect(zh).not.toContain('Rust');
  });

  it('errorRecovery returns Tauri-specific advice', () => {
    const zh = errorRecovery('tauri', 'zh');
    expect(zh).toContain('Rust 编译失败');
    expect(zh).toContain('#[tauri::command]');
    expect(zh).not.toContain('Electron 白屏');
    const en = errorRecovery('tauri', 'en');
    expect(en).toContain('Rust compile error');
    expect(en).toContain('invoke_handler');
  });

  it('errorRecovery returns PyQt-specific advice', () => {
    const zh = errorRecovery('pyqt', 'zh');
    expect(zh).toContain('pip install');
    expect(zh).toContain('app.exec()');
    expect(zh).not.toContain('Electron');
    const en = errorRecovery('pyqt', 'en');
    expect(en).toContain('pip install fails');
    expect(en).toContain('widget.show()');
  });

  it('errorRecovery auto falls back to Electron', () => {
    expect(errorRecovery('auto', 'zh')).toContain('Electron 白屏');
    expect(errorRecovery('auto', 'en')).toContain('Electron white screen');
  });

  it('uiStandards returns web-based standards for Electron/Tauri', () => {
    const zh = uiStandards('electron', 'zh');
    expect(zh).toContain('CSS 变量');
    expect(zh).toContain('圆角');
    const en = uiStandards('tauri', 'en');
    expect(en).toContain('CSS variables');
    expect(en).toContain('border-radius');
  });

  it('uiStandards returns native widget guidance for PyQt', () => {
    const zh = uiStandards('pyqt', 'zh');
    expect(zh).toContain('QPushButton');
    expect(zh).toContain('QProgressBar');
    expect(zh).not.toContain('CSS 变量');
    const en = uiStandards('pyqt', 'en');
    expect(en).toContain('QPushButton');
    expect(en).toContain('QProgressBar');
    expect(en).not.toContain('CSS variables');
  });

  it('WARM_UX_EN carries the warm-experience contract', () => {
    expect(WARM_UX_EN).toContain('Warm UX Contract');
    expect(WARM_UX_EN).toContain('demo mode');
    expect(WARM_UX_EN).toContain('Try with sample data');
    expect(WARM_UX_EN).toContain('business language');
    expect(WARM_UX_EN).toContain('system notification');
  });

  it('SUCCESS_PICTURE_ZH paints the moment of completion', () => {
    expect(SUCCESS_PICTURE_ZH).toContain('完成态画面');
    expect(SUCCESS_PICTURE_ZH).toContain('30 字');
    expect(SUCCESS_PICTURE_ZH).toContain('打开输出文件夹');
    expect(SUCCESS_PICTURE_ZH).toContain('再做一次');
  });

  it('SUCCESS_PICTURE_EN paints the moment of completion', () => {
    expect(SUCCESS_PICTURE_EN).toContain('Success Picture');
    expect(SUCCESS_PICTURE_EN).toContain('30-word');
    expect(SUCCESS_PICTURE_EN).toContain('Open output folder');
    expect(SUCCESS_PICTURE_EN).toContain('Run again');
  });

  it('FINAL_REPORT_ZH defines the four-section schema', () => {
    expect(FINAL_REPORT_ZH).toContain('收尾汇报模板');
    expect(FINAL_REPORT_ZH).toContain('✅ 已交付');
    expect(FINAL_REPORT_ZH).toContain('▶ 如何打开');
    expect(FINAL_REPORT_ZH).toContain('✔ 已跑过的验证');
    expect(FINAL_REPORT_ZH).toContain('⚠ 已知限制');
  });

  it('FINAL_REPORT_EN defines the four-section schema', () => {
    expect(FINAL_REPORT_EN).toContain('Final Report Schema');
    expect(FINAL_REPORT_EN).toContain('✅ Delivered');
    expect(FINAL_REPORT_EN).toContain('▶ How to open');
    expect(FINAL_REPORT_EN).toContain('✔ What I verified');
    expect(FINAL_REPORT_EN).toContain('⚠ Known limits');
  });

  it('WARM_UX_INLINE and FINAL_REPORT_INLINE stay on one line each', () => {
    expect(WARM_UX_INLINE_ZH.split('\n')).toHaveLength(1);
    expect(WARM_UX_INLINE_EN.split('\n')).toHaveLength(1);
    expect(FINAL_REPORT_INLINE_ZH.split('\n')).toHaveLength(1);
    expect(FINAL_REPORT_INLINE_EN.split('\n')).toHaveLength(1);
    expect(WARM_UX_INLINE_ZH).toContain('Demo');
    expect(WARM_UX_INLINE_EN).toContain('demo');
    expect(FINAL_REPORT_INLINE_ZH).toContain('已交付');
    expect(FINAL_REPORT_INLINE_EN).toContain('Delivered');
  });

  it('ANTI_PATTERNS now bars desktop-specific bad behaviors', () => {
    expect(ANTI_PATTERNS_ZH).toContain('空白');
    expect(ANTI_PATTERNS_ZH).toContain('进度条');
    expect(ANTI_PATTERNS_ZH).toContain('覆盖原文件');
    expect(ANTI_PATTERNS_EN).toContain('blank');
    expect(ANTI_PATTERNS_EN).toContain('progress bar');
    expect(ANTI_PATTERNS_EN).toContain('Overwriting original');
  });
});

// ─── Formatting helpers ─────────────────────────────────────────

describe('deliveryBlock', () => {
  it('produces numbered list for zh', () => {
    const result = deliveryBlock(['步骤一', '步骤二', '步骤三'], 'zh');
    expect(result).toContain('【交付】');
    expect(result).toContain('1. 步骤一');
    expect(result).toContain('2. 步骤二');
    expect(result).toContain('3. 步骤三');
  });

  it('produces numbered list for en', () => {
    const result = deliveryBlock(['Step one', 'Step two'], 'en');
    expect(result).toContain('[Delivery]');
    expect(result).toContain('1. Step one');
    expect(result).toContain('2. Step two');
  });
});

describe('acceptanceChecklist', () => {
  it('produces checklist with header for zh', () => {
    const result = acceptanceChecklist(['□ 项目一', '□ 项目二'], 'zh');
    expect(result).toContain('验收清单');
    expect(result).toContain('□ 项目一');
    expect(result).toContain('□ 项目二');
  });

  it('produces checklist with header for en', () => {
    const result = acceptanceChecklist(['☐ Item one', '☐ Item two'], 'en');
    expect(result).toContain('Acceptance checklist');
    expect(result).toContain('☐ Item one');
    expect(result).toContain('☐ Item two');
  });
});

// ─── withSharedConstraints ──────────────────────────────────────

describe('withSharedConstraints', () => {
  it('appends constraints to a plain prompt (zh)', () => {
    const result = withSharedConstraints('做一些功能', 'zh');
    expect(result).toContain('做一些功能');
    expect(result).toContain('【安全底线】');
    expect(result).toContain('本地处理');
  });

  it('appends constraints to a plain prompt (en)', () => {
    const result = withSharedConstraints('Build something', 'en');
    expect(result).toContain('Build something');
    expect(result).toContain('[Safety Rules]');
    expect(result).toContain('local');
  });

  it('is idempotent — does not double-append (zh)', () => {
    const once = withSharedConstraints('做一些功能', 'zh');
    const twice = withSharedConstraints(once, 'zh');
    expect(twice).toBe(once);
  });

  it('is idempotent — does not double-append (en)', () => {
    const once = withSharedConstraints('Build something', 'en');
    const twice = withSharedConstraints(once, 'en');
    expect(twice).toBe(once);
  });
});

// ─── composeCasePrompt ──────────────────────────────────────────

describe('composeCasePrompt', () => {
  const sections = {
    role: '你是一名工程师。',
    goal: '做一个对账工具。',
    platform: 'Windows 10/11 + Electron',
    features: '1. 导入\n2. 对账\n3. 导出',
    style: '简洁风格',
    robustness: '友好错误提示',
    deliveryPhases: ['摘要', '分步实现', '打包'],
    acceptanceItems: ['□ 能启动', '□ 跑通主流程'],
    communication: '全程中文。',
  };

  it('contains all sections in zh', () => {
    const result = composeCasePrompt(sections, 'zh');
    expect(result).toContain('你是一名工程师。');
    expect(result).toContain('【目标】');
    expect(result).toContain('做一个对账工具。');
    expect(result).toContain('【平台与技术】');
    expect(result).toContain('【核心功能】');
    expect(result).toContain('【界面风格】');
    expect(result).toContain('【稳健性】');
    expect(result).toContain('【安全底线】');
    expect(result).toContain('【交付】');
    expect(result).toContain('验收清单');
    expect(result).toContain('全程中文。');
  });

  it('contains all sections in en', () => {
    const enSections = {
      role: 'You are an engineer.',
      goal: 'Build a reconciliation tool.',
      platform: 'Windows 10/11 + Electron',
      features: '1. Import\n2. Reconcile\n3. Export',
      deliveryPhases: ['Summary', 'Build step by step', 'Package'],
      acceptanceItems: ['☐ Launches', '☐ Main flow works'],
    };
    const result = composeCasePrompt(enSections, 'en');
    expect(result).toContain('[Goal]');
    expect(result).toContain('[Platform & Stack]');
    expect(result).toContain('[Core Features]');
    expect(result).toContain('[Safety Rules]');
    expect(result).toContain('[Delivery]');
    expect(result).toContain('Acceptance checklist');
  });

  it('auto-includes constraints without manual addition', () => {
    const result = composeCasePrompt(sections, 'zh');
    expect(result).toContain('本地处理');
    expect(result).toContain('npm view');
  });

  it('auto-includes DoD via quality bar when wrapped', () => {
    // composeCasePrompt itself doesn't add DoD — that's withDesktopQualityBar's job
    // But it should include delivery and acceptance
    const result = composeCasePrompt(sections, 'zh');
    expect(result).toContain('1. 摘要');
    expect(result).toContain('□ 能启动');
  });

  it('omits optional sections when not provided', () => {
    const minimal = {
      role: '工程师。',
      goal: '目标。',
      platform: '平台。',
      features: '功能。',
      deliveryPhases: ['步骤'],
      acceptanceItems: ['□ 验收'],
    };
    const result = composeCasePrompt(minimal, 'zh');
    expect(result).not.toContain('【界面风格】');
    expect(result).not.toContain('【稳健性】');
  });

  it('includes the opening brief right after the role (zh)', () => {
    const result = composeCasePrompt(sections, 'zh');
    expect(result).toContain('【开工前的开场白】');
    const roleIdx = result.indexOf('你是一名工程师。');
    const briefIdx = result.indexOf('【开工前的开场白】');
    const goalIdx = result.indexOf('【目标】');
    expect(roleIdx).toBeLessThan(briefIdx);
    expect(briefIdx).toBeLessThan(goalIdx);
  });

  it('includes the opening brief right after the role (en)', () => {
    const enSections = {
      role: 'You are an engineer.',
      goal: 'Build a tool.',
      platform: 'Stack',
      features: '1. one',
      deliveryPhases: ['ship'],
      acceptanceItems: ['☐ ok'],
    };
    const result = composeCasePrompt(enSections, 'en');
    expect(result).toContain('[Opening Brief]');
    const roleIdx = result.indexOf('You are an engineer.');
    const briefIdx = result.indexOf('[Opening Brief]');
    const goalIdx = result.indexOf('[Goal]');
    expect(roleIdx).toBeLessThan(briefIdx);
    expect(briefIdx).toBeLessThan(goalIdx);
  });

  it('injects warm UX and success picture between constraints and project structure (zh)', () => {
    const result = composeCasePrompt(sections, 'zh');
    const safetyIdx = result.indexOf('【安全底线】');
    const warmIdx = result.indexOf('【温暖体验契约】');
    const successIdx = result.indexOf('【完成态画面】');
    const structureIdx = result.indexOf('【项目结构】');
    expect(safetyIdx).toBeGreaterThan(-1);
    expect(warmIdx).toBeGreaterThan(safetyIdx);
    expect(successIdx).toBeGreaterThan(warmIdx);
    expect(structureIdx).toBeGreaterThan(successIdx);
  });

  it('leaves the final report to the quality tail (zh)', () => {
    const result = composeCasePrompt(sections, 'zh');
    expect(result).not.toContain('【收尾汇报模板】');
  });

  it('leaves the final report to the quality tail (en)', () => {
    const enSections = {
      role: 'You are an engineer.',
      goal: 'Build a tool.',
      platform: 'Stack',
      features: '1. one',
      deliveryPhases: ['ship'],
      acceptanceItems: ['☐ ok'],
    };
    const result = composeCasePrompt(enSections, 'en');
    expect(result).not.toContain('[Final Report Schema]');
  });
});

// ─── composeRecipePrompt ────────────────────────────────────────

describe('composeRecipePrompt', () => {
  const parts = {
    role: '你是一名工程师。',
    goal: '做一个小工具。',
    platform: 'Windows + macOS',
    stack: 'Electron + React + TypeScript',
    features: '拖入文件 → 处理 → 导出',
    acceptance: '拖入文件 → 处理成功 → 导出正确',
    packaging: '- 打包 .exe 和 .dmg；附使用说明。',
  };

  it('produces structured zh output', () => {
    const result = composeRecipePrompt(parts, 'zh');
    expect(result).toContain('你是一名工程师。');
    expect(result).toContain('- 目标：做一个小工具。');
    expect(result).toContain('- 平台：Windows + macOS');
    expect(result).toContain('- 做法：Electron + React + TypeScript');
    expect(result).toContain('- 功能：拖入文件 → 处理 → 导出');
    expect(result).toContain('约束');
    expect(result).toContain('- 验收：拖入文件 → 处理成功 → 导出正确');
    expect(result).toContain('打包 .exe 和 .dmg');
  });

  it('produces structured en output', () => {
    const enParts = {
      role: 'You are an engineer.',
      goal: 'Build a tool.',
      platform: 'Windows + macOS',
      stack: 'Electron + React + TypeScript',
      features: 'Drop file → process → export',
      acceptance: 'Drop file → process → export correct',
      packaging: '- Package .exe and .dmg; user guide.',
    };
    const result = composeRecipePrompt(enParts, 'en');
    expect(result).toContain('- Goal: Build a tool.');
    expect(result).toContain('- Platform: Windows + macOS');
    expect(result).toContain('- Stack: Electron + React + TypeScript');
    expect(result).toContain('- Features: Drop file → process → export');
    expect(result).toContain('Constraints');
    expect(result).toContain('- Acceptance: Drop file → process → export correct');
  });

  it('auto-includes recipe constraints', () => {
    const result = composeRecipePrompt(parts, 'zh');
    expect(result).toContain('默认本地处理');
    expect(result).toContain('不覆盖原文件');
    expect(result).toContain('sample-data');
  });

  it('includes extra when provided', () => {
    const withExtra = { ...parts, extra: '- 全程不联网。' };
    const result = composeRecipePrompt(withExtra, 'zh');
    expect(result).toContain('全程不联网。');
  });

  it('keeps recipes short with condensed warm UX and final report lines (zh)', () => {
    const result = composeRecipePrompt(parts, 'zh');
    expect(result).toContain('温暖体验');
    expect(result).toContain('Demo 模式');
    expect(result).toContain('收尾汇报四段');
    const warmLine = result.split('\n').find((line) => line.startsWith('- 温暖体验'));
    const reportLine = result.split('\n').find((line) => line.startsWith('- 收尾汇报四段'));
    expect(warmLine).toBeDefined();
    expect(reportLine).toBeDefined();
  });

  it('keeps recipes short with condensed warm UX and final report lines (en)', () => {
    const enParts = {
      role: 'You are an engineer.',
      goal: 'Build a tool.',
      platform: 'Windows + macOS',
      stack: 'Electron + React + TypeScript',
      features: 'Drop file → process → export',
      acceptance: 'Drop file → process → export correct',
      packaging: '- Package .exe and .dmg; user guide.',
    };
    const result = composeRecipePrompt(enParts, 'en');
    expect(result).toContain('Warm UX');
    expect(result).toContain('demo');
    expect(result).toContain('Final report in four sections');
  });
});
