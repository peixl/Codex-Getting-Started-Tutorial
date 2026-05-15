import { describe, expect, it } from 'vitest';
import { buildPrompt, buildRecoveryPrompt, DEFAULT_FORM, type FormState } from './promptBuilder';

const GENERATOR_QUALITY_MARKERS = {
  zh: [
    '用户管业务',
    '脱敏 sample-data',
    '自检',
    '烟测',
    '路径含中文/空格/括号',
    '真实接线',
    '无 TODO',
    'DoD',
    '3 次失败',
  ],
  en: [
    'User owns business',
    'anonymized sample',
    'Self-check',
    'Smoke test',
    'Paths with Chinese',
    'Real wiring',
    'no TODOs',
    'DoD',
    'bug fails 3',
  ],
} as const;

function makeState(partial: Partial<FormState> = {}): FormState {
  return {
    ...DEFAULT_FORM,
    goal: '给财务同事做一个本地对账工具，减少手工核对时间。',
    features: '- 导入订单 Excel\n- 导入银行流水 Excel\n- 导出差异清单',
    ...partial,
    extras: { ...DEFAULT_FORM.extras, ...(partial.extras ?? {}) },
  };
}

describe('buildPrompt', () => {
  it('includes desktop quality requirements in Chinese prompts', () => {
    const prompt = buildPrompt(makeState({ platform: 'both' }), 'zh');

    expect(prompt).toContain('【桌面 UX】');
    expect(prompt).toContain('用户管业务');
    expect(prompt).toContain('脱敏 sample-data');
    expect(prompt).toContain('烟测');
    expect(prompt).toContain('路径兼容中文/空格/括号');
    expect(prompt).toContain('系统打开/保存');
    expect(prompt).toContain('【实现纪律】');
    expect(prompt).toContain('IPC');
    expect(prompt).toContain('真实接线');
    expect(prompt).toContain('无 TODO');
    expect(prompt).toContain('标准业务版');
    expect(prompt).toContain('自检');
    expect(prompt).toContain('lint/typecheck/test/build');
    expect(prompt).toContain('M1≤15');
    expect(prompt).toContain('M2');
    expect(prompt).not.toContain('串通真实主流程');
    expect(prompt).toContain('DoD');
  });

  it('uses platform-specific shortcut wording in Chinese prompts', () => {
    const prompt = buildPrompt(
      makeState({ platform: 'both', extras: { ...DEFAULT_FORM.extras, shortcut: true } }),
      'zh'
    );

    expect(prompt).toContain('Windows 使用 Ctrl / Alt');
    expect(prompt).toContain('macOS 使用 Command / Option');
  });

  it('uses macOS packaging and shortcut wording in English prompts', () => {
    const prompt = buildPrompt(
      makeState({ platform: 'mac', extras: { ...DEFAULT_FORM.extras, shortcut: true } }),
      'en'
    );

    expect(prompt).toContain('macOS desktop app');
    expect(prompt).toContain('User owns business');
    expect(prompt).toContain('No real files? create anonymized');
    expect(prompt).toContain('Command / Option');
    expect(prompt).toContain('.dmg installer');
    expect(prompt).toContain('Native open/save');
    expect(prompt).toContain('M1≤15');
    expect(prompt).toContain('DoD');
    expect(prompt).toContain('Implementation');
    expect(prompt).toContain('no TODOs');
  });

  it('scales prompt detail by complexity', () => {
    const starter = buildPrompt(makeState({ complexity: 'starter' }), 'en');
    const standard = buildPrompt(makeState({ complexity: 'standard' }), 'en');
    const advanced = buildPrompt(makeState({ complexity: 'advanced' }), 'en');

    expect(starter).toContain('Starter MVP');
    expect(standard).toContain('Standard business version');
    expect(standard).toContain('main flow, sample data, friendly errors');
    expect(starter).not.toContain('Batch: cancellable');
    expect(advanced).toContain('Batch: cancellable');
    expect(advanced).toContain('History/settings/recovery');
  });

  it('keeps quality signals stable across generator prompts by content and structure', () => {
    for (const complexity of ['starter', 'standard', 'advanced'] as const) {
      for (const lang of ['zh', 'en'] as const) {
        const text = buildPrompt(makeState({ complexity }), lang);
        const normalized = text.toLowerCase();
        const missing = GENERATOR_QUALITY_MARKERS[lang].filter(
          (marker) => !normalized.includes(marker.toLowerCase())
        );

        expect(missing, `${lang}/${complexity} missing quality markers`).toEqual([]);
      }
    }
  });
});

describe('buildRecoveryPrompt', () => {
  it('keeps context and asks Codex to continue fixing in Chinese', () => {
    const prompt = buildRecoveryPrompt(makeState({ complexity: 'starter' }), 'zh');

    expect(prompt).toContain('请继续修复到能运行');
    expect(prompt).toContain('最小可用版');
    expect(prompt).toContain('给财务同事做一个本地对账工具');
    expect(prompt).toContain('重新运行必要命令');
  });

  it('keeps context and asks Codex to continue fixing in English', () => {
    const prompt = buildRecoveryPrompt(makeState({ platform: 'mac' }), 'en');

    expect(prompt).toContain('Keep fixing until it runs');
    expect(prompt).toContain('macOS desktop app');
    expect(prompt).toContain('Re-run needed commands');
  });
});
