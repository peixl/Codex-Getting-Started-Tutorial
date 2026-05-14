import { describe, expect, it } from 'vitest';
import { withDesktopQualityBar } from './promptQuality';

describe('withDesktopQualityBar', () => {
  it('adds the Chinese quality bar once', () => {
    const first = withDesktopQualityBar('请做一个本地桌面工具。', 'zh');
    const second = withDesktopQualityBar(first, 'zh');

    expect(first).toContain('【高质量交付补充】');
    expect(first).toContain('Windows 快捷键用 Ctrl/Alt');
    expect(first).toContain('示例数据/试用模式');
    expect(first).toContain('脱敏 sample-data');
    expect(first).toContain('烟测');
    expect(first).toContain('M1≤15 分钟');
    expect(first).toContain('真实接线');
    expect(first).toContain('TODO、空函数');
    expect(first).toContain('DoD / 停止 Vibe Coding');
    expect(first).toContain('停止 Vibe Coding');
    expect(first).toContain('完成标准（逐条检查');
    expect(first).toContain('M1 卡住');
    expect(second).toBe(first);
  });

  it('compacts old repeated Chinese prompt endings', () => {
    const first = withDesktopQualityBar(
      '请做一个本地桌面工具。\n先给简短方案摘要，然后直接实现、运行和验证。中文。',
      'zh'
    );

    expect(first).not.toContain('先给简短方案摘要');
    expect(first).toContain('≤8 行摘要');
    expect(first).toContain('【桌面交付契约】');
  });

  it('adds the English quality bar once', () => {
    const first = withDesktopQualityBar('Build a local desktop tool.', 'en');
    const second = withDesktopQualityBar(first, 'en');

    expect(first).toContain('[High-Quality Delivery Addendum]');
    expect(first).toContain('Command/Option');
    expect(first).toContain('sample/demo data');
    expect(first).toContain('anonymized sample-data');
    expect(first).toContain('Smoke test');
    expect(first).toContain('M1≤15 min');
    expect(first).toContain('Real wiring');
    expect(first).toContain('fake data do not count as done');
    expect(first).toContain('DoD / Stop-Vibe-Coding');
    expect(first).toContain('Stop-Vibe-Coding');
    expect(first).toContain('Done criteria (check each');
    expect(first).toContain('M1 stalls');
    expect(second).toBe(first);
  });

  it('compacts old repeated English prompt endings', () => {
    const first = withDesktopQualityBar(
      'Build a local desktop tool.\nStart with a brief plan summary, then implement, run, and verify. English throughout.',
      'en'
    );

    expect(first).not.toContain('brief plan summary');
    expect(first).toContain('summarize in ≤8 lines');
    expect(first).toContain('[Desktop Delivery Contract]');
  });
});
