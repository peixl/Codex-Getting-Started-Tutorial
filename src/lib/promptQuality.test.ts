import { describe, expect, it } from 'vitest';
import { withDesktopQualityBar } from './promptQuality';

describe('withDesktopQualityBar', () => {
  it('adds the Chinese quality bar once', () => {
    const first = withDesktopQualityBar('请做一个本地桌面工具。', 'zh');
    const second = withDesktopQualityBar(first, 'zh');

    expect(first).toContain('【高质量交付补充】');
    expect(first).toContain('【快速启动协议】');
    expect(first).toContain('【DoD');
    expect(first).toContain('【反模式清单');
    expect(first).toContain('sample-data');
    expect(first).toContain('≤8 行摘要');
    expect(second).toBe(first);
  });

  it('compacts old repeated Chinese prompt endings', () => {
    const first = withDesktopQualityBar(
      '请做一个本地桌面工具。\n先给简短方案摘要，然后直接实现、运行和验证。中文。',
      'zh'
    );

    expect(first).not.toContain('先给简短方案摘要');
    expect(first).toContain('≤8 行摘要');
  });

  it('adds the English quality bar once', () => {
    const first = withDesktopQualityBar('Build a local desktop tool.', 'en');
    const second = withDesktopQualityBar(first, 'en');

    expect(first).toContain('[High-Quality Delivery Addendum]');
    expect(first).toContain('[Quick Start Protocol]');
    expect(first).toContain('[DoD');
    expect(first).toContain('[Anti-Patterns');
    expect(first).toContain('sample-data');
    expect(first).toContain('summarize in ≤8 lines');
    expect(second).toBe(first);
  });

  it('compacts old repeated English prompt endings', () => {
    const first = withDesktopQualityBar(
      'Build a local desktop tool.\nStart with a brief plan summary, then implement, run, and verify. English throughout.',
      'en'
    );

    expect(first).not.toContain('brief plan summary');
    expect(first).toContain('summarize in ≤8 lines');
  });

  it('places the final report schema at the very end of the tail (zh)', () => {
    const wrapped = withDesktopQualityBar('请做一个本地桌面工具。', 'zh');
    const reportIdx = wrapped.indexOf('【收尾汇报模板】');
    const dodIdx = wrapped.indexOf('【DoD');
    const antiIdx = wrapped.indexOf('【反模式清单');
    expect(reportIdx).toBeGreaterThan(-1);
    expect(reportIdx).toBeGreaterThan(dodIdx);
    expect(reportIdx).toBeGreaterThan(antiIdx);
    expect(wrapped.trim().endsWith('TODO 列表。')).toBe(true);
  });

  it('places the final report schema at the very end of the tail (en)', () => {
    const wrapped = withDesktopQualityBar('Build a local desktop tool.', 'en');
    const reportIdx = wrapped.indexOf('[Final Report Schema]');
    const dodIdx = wrapped.indexOf('[DoD');
    const antiIdx = wrapped.indexOf('[Anti-Patterns');
    expect(reportIdx).toBeGreaterThan(-1);
    expect(reportIdx).toBeGreaterThan(dodIdx);
    expect(reportIdx).toBeGreaterThan(antiIdx);
    expect(wrapped.trim().endsWith('not a TODO list.')).toBe(true);
  });
});
