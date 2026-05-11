import { describe, expect, it } from 'vitest';
import { withDesktopQualityBar } from './promptQuality';

describe('withDesktopQualityBar', () => {
  it('adds the Chinese quality bar once', () => {
    const first = withDesktopQualityBar('请做一个本地桌面工具。', 'zh');
    const second = withDesktopQualityBar(first, 'zh');

    expect(first).toContain('【高质量交付补充】');
    expect(first).toContain('Windows 使用 Ctrl / Alt');
    expect(first).toContain('示例数据或试用模式');
    expect(first).toContain('M1 ≤15 分钟');
    expect(first).toContain('完成判定（DoD）');
    expect(first).toContain('停止 Vibe Coding');
    expect(second).toBe(first);
  });

  it('adds the English quality bar once', () => {
    const first = withDesktopQualityBar('Build a local desktop tool.', 'en');
    const second = withDesktopQualityBar(first, 'en');

    expect(first).toContain('[High-Quality Delivery Addendum]');
    expect(first).toContain('Command / Option combinations');
    expect(first).toContain('sample data or demo mode');
    expect(first).toContain('M1 ≤ 15 min');
    expect(first).toContain('Definition of Done');
    expect(first).toContain('Stop-Vibe-Coding');
    expect(second).toBe(first);
  });
});
