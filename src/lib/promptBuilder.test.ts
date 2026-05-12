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
    expect(prompt).toContain('【项目代码质量与交付物】');
    expect(prompt).toContain('IPC 类型化');
    expect(prompt).toContain('关键流程真实接线');
    expect(prompt).toContain('无 TODO/空函数/假接线冒充完成');
    expect(prompt).toContain('标准业务版');
    expect(prompt).toContain('运行 lint、类型检查、测试和构建');
    expect(prompt).toContain('M1 ≤ 15 分钟');
    expect(prompt).toContain('M2 跑通真实主流程');
    expect(prompt).not.toContain('串通真实主流程');
    expect(prompt).toContain('完成判定（DoD）');
    expect(prompt).toContain('停止 Vibe Coding');
    expect(prompt.length).toBeLessThan(3200);
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
    expect(prompt).toContain('M1 (≤ 15 min)');
    expect(prompt).toContain('Definition of Done');
    expect(prompt).toContain('Stop-Vibe-Coding');
    expect(prompt).toContain('Project Code Quality');
    expect(prompt).toContain('no TODOs/empty functions/fake wiring');
    expect(prompt.length).toBeLessThan(6500);
  });
});

describe('buildRecoveryPrompt', () => {
  it('keeps context and asks Codex to continue fixing in Chinese', () => {
    const prompt = buildRecoveryPrompt(makeState({ complexity: 'starter' }), 'zh');

    expect(prompt).toContain('请你继续接手修复');
    expect(prompt).toContain('最小可用版');
    expect(prompt).toContain('给财务同事做一个本地对账工具');
    expect(prompt).toContain('重新运行必要命令');
    expect(prompt.length).toBeLessThan(900);
  });

  it('keeps context and asks Codex to continue fixing in English', () => {
    const prompt = buildRecoveryPrompt(makeState({ platform: 'mac' }), 'en');

    expect(prompt).toContain('continue fixing it until it runs');
    expect(prompt).toContain('macOS desktop app');
    expect(prompt).toContain('Re-run the needed commands');
    expect(prompt.length).toBeLessThan(1900);
  });
});
