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
  deliveryBlock,
  acceptanceChecklist,
  withSharedConstraints,
  composeCasePrompt,
  composeRecipePrompt,
} from './promptModules';

// ─── Constants: non-empty and contain key phrases ────────────────

describe('prompt module constants', () => {
  it('CONSTRAINTS_ZH contains key rules', () => {
    expect(CONSTRAINTS_ZH).toContain('本地离线');
    expect(CONSTRAINTS_ZH).toContain('脱敏 sample-data');
    expect(CONSTRAINTS_ZH).toContain('npm view');
    expect(CONSTRAINTS_ZH).toContain('3 次失败');
  });

  it('CONSTRAINTS_EN contains key rules', () => {
    expect(CONSTRAINTS_EN).toContain('offline');
    expect(CONSTRAINTS_EN).toContain('anonymized sample-data');
    expect(CONSTRAINTS_EN).toContain('npm view');
    expect(CONSTRAINTS_EN).toContain('3 times');
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
    expect(DELIVERY_CONTRACT_ZH).toContain('降级');
  });

  it('DELIVERY_CONTRACT_EN mentions milestones', () => {
    expect(DELIVERY_CONTRACT_EN).toContain('M1');
    expect(DELIVERY_CONTRACT_EN).toContain('M2');
    expect(DELIVERY_CONTRACT_EN).toContain('downgrade');
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
    expect(result).toContain('【约束】');
    expect(result).toContain('本地离线');
  });

  it('appends constraints to a plain prompt (en)', () => {
    const result = withSharedConstraints('Build something', 'en');
    expect(result).toContain('Build something');
    expect(result).toContain('[Constraints]');
    expect(result).toContain('offline');
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
    expect(result).toContain('【约束】');
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
    expect(result).toContain('[Constraints]');
    expect(result).toContain('[Delivery]');
    expect(result).toContain('Acceptance checklist');
  });

  it('auto-includes constraints without manual addition', () => {
    const result = composeCasePrompt(sections, 'zh');
    expect(result).toContain('本地离线');
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
    expect(result).toContain('本地离线');
    expect(result).toContain('不覆盖原文件');
    expect(result).toContain('sample-data');
  });

  it('includes extra when provided', () => {
    const withExtra = { ...parts, extra: '- 全程不联网。' };
    const result = composeRecipePrompt(withExtra, 'zh');
    expect(result).toContain('全程不联网。');
  });
});
