import { describe, expect, it } from 'vitest';
import { buildPrompt, buildRecoveryPrompt, DEFAULT_FORM, type FormState } from './promptBuilder';

const GENERATOR_QUALITY_MARKERS = {
  zh: [
    '直接动手',
    'sample-data',
    '友好',
    '路径兼容中文',
    '真实接线',
    'TODO',
    '3 次',
    '快速启动协议',
    '错误自救',
    '反模式清单',
    '完成标准',
  ],
  en: [
    'Start immediately',
    'sample-data',
    'friendly message',
    'Paths handle Chinese',
    'real-wired',
    'TODOs',
    '3 times',
    'Quick Start Protocol',
    'Error Recovery',
    'Anti-Patterns',
    'Done criteria',
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
  it('includes core delivery requirements in Chinese prompts', () => {
    const prompt = buildPrompt(makeState({ platform: 'both' }), 'zh');

    expect(prompt).toContain('【交付要求】');
    expect(prompt).toContain('【安全底线】');
    expect(prompt).toContain('sample-data');
    expect(prompt).toContain('路径兼容中文、空格、括号');
    expect(prompt).toContain('系统打开/保存对话框');
    expect(prompt).toContain('真实接线');
    expect(prompt).toContain('TODO、空函数、假数据不算完成');
    expect(prompt).toContain('直接动手');
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
    expect(prompt).toContain('[Safety Rules]');
    expect(prompt).toContain('do not count as done');
  });

  it('scales prompt detail by complexity', () => {
    const starter = buildPrompt(makeState({ complexity: 'starter' }), 'en');
    const advanced = buildPrompt(makeState({ complexity: 'advanced' }), 'en');

    expect(starter).not.toContain('settings, history, batch');
    expect(advanced).toContain('settings, history, batch');
  });

  it('keeps quality signals stable across generator prompts', () => {
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

  it('inserts the opening brief between role and task in zh', () => {
    const prompt = buildPrompt(makeState(), 'zh');
    expect(prompt).toContain('【开工前的开场白】');
    const roleIdx = prompt.indexOf('你是资深桌面应用工程师');
    const briefIdx = prompt.indexOf('【开工前的开场白】');
    const taskIdx = prompt.indexOf('【任务】');
    expect(roleIdx).toBeLessThan(briefIdx);
    expect(briefIdx).toBeLessThan(taskIdx);
  });

  it('inserts the opening brief between role and task in en', () => {
    const prompt = buildPrompt(makeState(), 'en');
    expect(prompt).toContain('[Opening Brief]');
    const roleIdx = prompt.indexOf('You are a senior');
    const briefIdx = prompt.indexOf('[Opening Brief]');
    const taskIdx = prompt.indexOf('[Task]');
    expect(roleIdx).toBeLessThan(briefIdx);
    expect(briefIdx).toBeLessThan(taskIdx);
  });

  it('threads warm UX and success picture into the generator prompt (zh)', () => {
    const prompt = buildPrompt(makeState(), 'zh');
    expect(prompt).toContain('【温暖体验契约】');
    expect(prompt).toContain('【完成态画面】');
    expect(prompt).toContain('Demo 模式');
    expect(prompt).toContain('打开输出文件夹');
  });

  it('threads warm UX and success picture into the generator prompt (en)', () => {
    const prompt = buildPrompt(makeState(), 'en');
    expect(prompt).toContain('[Warm UX Contract]');
    expect(prompt).toContain('[Success Picture]');
    expect(prompt).toContain('demo mode');
    expect(prompt).toContain('Open output folder');
  });

  it('replaces the ad-hoc closing line with the final report schema (zh)', () => {
    const prompt = buildPrompt(makeState(), 'zh');
    expect(prompt).toContain('【收尾汇报模板】');
    expect(prompt).toContain('✅ 已交付');
    expect(prompt).not.toContain('做了什么 | 如何打开 | 验证结果 | 剩余限制');
  });

  it('replaces the ad-hoc closing line with the final report schema (en)', () => {
    const prompt = buildPrompt(makeState(), 'en');
    expect(prompt).toContain('[Final Report Schema]');
    expect(prompt).toContain('✅ Delivered');
  });

  it('reuses the shared safety rules block instead of inlining a duplicate (zh)', () => {
    const prompt = buildPrompt(makeState(), 'zh');
    expect(prompt).toContain('【安全底线】');
    const safetyOccurrences = prompt.match(/【安全底线】/g) ?? [];
    expect(safetyOccurrences.length).toBe(1);
  });

  it('reuses the shared safety rules block instead of inlining a duplicate (en)', () => {
    const prompt = buildPrompt(makeState(), 'en');
    expect(prompt).toContain('[Safety Rules]');
    const safetyOccurrences = prompt.match(/\[Safety Rules\]/g) ?? [];
    expect(safetyOccurrences.length).toBe(1);
  });

  it('maintains consistent section ordering (snapshot)', () => {
    const prompt = buildPrompt(makeState({ platform: 'both' }), 'zh');
    const sections = prompt.split('\n\n').filter((s) => s.trim());
    const sectionHeaders = sections
      .filter((s) => s.startsWith('【') || s.startsWith('#'))
      .map((s) => s.split('\n')[0]);
    expect(sectionHeaders).toMatchInlineSnapshot(`
      [
        "【开工前的开场白】",
        "【任务】",
        "【技术】",
        "【快速启动协议】",
        "【项目结构】",
        "【UI 最低视觉标准】",
        "【交付要求】",
        "【温暖体验契约】",
        "【完成态画面】",
        "【错误自救】",
        "【安全底线】",
        "【执行纪律】",
        "【反模式清单 — 以下行为禁止】",
        "【DoD / 停止 Vibe Coding】",
        "【收尾汇报模板】",
      ]
    `);
  });
});

describe('buildRecoveryPrompt', () => {
  it('keeps context and asks Codex to continue fixing in Chinese', () => {
    const prompt = buildRecoveryPrompt(makeState({ complexity: 'starter' }), 'zh');

    expect(prompt).toContain('直接修复到能运行');
    expect(prompt).toContain('最小可用版');
    expect(prompt).toContain('给财务同事做一个本地对账工具');
    expect(prompt).toContain('重新运行');
  });

  it('keeps context and asks Codex to continue fixing in English', () => {
    const prompt = buildRecoveryPrompt(makeState({ platform: 'mac' }), 'en');

    expect(prompt).toContain('Fix it until it works');
    expect(prompt).toContain('macOS desktop app');
    expect(prompt).toContain('Re-run');
  });
});
