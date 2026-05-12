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

    expect(prompt).toContain('【桌面与 UX 硬要求】');
    expect(prompt).toContain('路径兼容中文、空格、括号、长路径');
    expect(prompt).toContain('系统打开/保存对话框');
    expect(prompt).toContain('【实现纪律 / 安全】');
    expect(prompt).toContain('IPC 类型化');
    expect(prompt).toContain('真实接线');
    expect(prompt).toContain('无 TODO、空函数、假接线冒充完成');
    expect(prompt).toContain('标准业务版');
    expect(prompt).toContain('运行 lint、类型检查、测试、构建');
    expect(prompt).toContain('M1≤15 分钟');
    expect(prompt).toContain('M2 接通真实主流程');
    expect(prompt).not.toContain('串通真实主流程');
    expect(prompt).toContain('DoD / 停止 Vibe Coding');
    expect(prompt.length).toBeLessThan(3300);
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
    expect(prompt).toContain('native open/save dialogs');
    expect(prompt).toContain('M1≤15 min');
    expect(prompt).toContain('DoD / Stop-Vibe-Coding');
    expect(prompt).toContain('Stop-Vibe-Coding');
    expect(prompt).toContain('Implementation / Safety');
    expect(prompt).toContain('no TODOs, empty functions, or fake wiring');
    expect(prompt.length).toBeLessThan(5200);
  });

  it('scales prompt detail by complexity', () => {
    const starter = buildPrompt(makeState({ complexity: 'starter' }), 'en');
    const standard = buildPrompt(makeState({ complexity: 'standard' }), 'en');
    const advanced = buildPrompt(makeState({ complexity: 'advanced' }), 'en');

    expect(starter.length).toBeLessThan(standard.length);
    expect(standard.length).toBeLessThan(advanced.length);
    expect(starter).not.toContain('Batch jobs must be cancellable');
    expect(advanced).toContain('Batch jobs must be cancellable');
    expect(advanced).toContain('settings, history, batch');
  });

  it('keeps a stable generator prompt length profile', () => {
    const profile = (['starter', 'standard', 'advanced'] as const).flatMap((complexity) =>
      (['zh', 'en'] as const).map((lang) => {
        const text = buildPrompt(makeState({ complexity }), lang);
        return {
          complexity,
          lang,
          chars: [...text].length,
          hasStopRule: text.includes(lang === 'zh' ? '停止 Vibe Coding' : 'Stop-Vibe-Coding'),
        };
      })
    );

    expect(profile).toMatchInlineSnapshot(`
      [
        {
          "chars": 1501,
          "complexity": "starter",
          "hasStopRule": true,
          "lang": "zh",
        },
        {
          "chars": 3357,
          "complexity": "starter",
          "hasStopRule": true,
          "lang": "en",
        },
        {
          "chars": 1982,
          "complexity": "standard",
          "hasStopRule": true,
          "lang": "zh",
        },
        {
          "chars": 4462,
          "complexity": "standard",
          "hasStopRule": true,
          "lang": "en",
        },
        {
          "chars": 2133,
          "complexity": "advanced",
          "hasStopRule": true,
          "lang": "zh",
        },
        {
          "chars": 4866,
          "complexity": "advanced",
          "hasStopRule": true,
          "lang": "en",
        },
      ]
    `);
  });
});

describe('buildRecoveryPrompt', () => {
  it('keeps context and asks Codex to continue fixing in Chinese', () => {
    const prompt = buildRecoveryPrompt(makeState({ complexity: 'starter' }), 'zh');

    expect(prompt).toContain('请继续修复到能运行');
    expect(prompt).toContain('最小可用版');
    expect(prompt).toContain('给财务同事做一个本地对账工具');
    expect(prompt).toContain('重新运行必要命令');
    expect(prompt.length).toBeLessThan(850);
  });

  it('keeps context and asks Codex to continue fixing in English', () => {
    const prompt = buildRecoveryPrompt(makeState({ platform: 'mac' }), 'en');

    expect(prompt).toContain('Keep fixing until it runs');
    expect(prompt).toContain('macOS desktop app');
    expect(prompt).toContain('Re-run needed commands');
    expect(prompt.length).toBeLessThan(1600);
  });
});
