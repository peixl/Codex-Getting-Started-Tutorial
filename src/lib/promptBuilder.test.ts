import { describe, expect, it } from 'vitest';
import { buildPrompt, buildRecoveryPrompt, DEFAULT_FORM, type FormState } from './promptBuilder';

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

    expect(prompt).toContain('【桌面平台细节】');
    expect(prompt).toContain('文件路径必须兼容中文、空格、括号、长路径');
    expect(prompt).toContain('系统原生打开 / 保存对话框');
    expect(prompt).toContain('核心业务逻辑放在独立模块');
    expect(prompt).toContain('标准业务版');
    expect(prompt).toContain('运行 lint、类型检查、测试和构建');
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
    expect(prompt).toContain('Command / Option combinations');
    expect(prompt).toContain('build a macOS .dmg installer');
    expect(prompt).toContain('native open / save dialogs');
  });
});

describe('buildRecoveryPrompt', () => {
  it('keeps context and asks Codex to continue fixing in Chinese', () => {
    const prompt = buildRecoveryPrompt(makeState({ complexity: 'starter' }), 'zh');

    expect(prompt).toContain('请你继续接手修复');
    expect(prompt).toContain('最小可用版');
    expect(prompt).toContain('给财务同事做一个本地对账工具');
    expect(prompt).toContain('重新运行必要命令');
  });

  it('keeps context and asks Codex to continue fixing in English', () => {
    const prompt = buildRecoveryPrompt(makeState({ platform: 'mac' }), 'en');

    expect(prompt).toContain('continue fixing it until it runs');
    expect(prompt).toContain('macOS desktop app');
    expect(prompt).toContain('Re-run the needed commands');
  });
});