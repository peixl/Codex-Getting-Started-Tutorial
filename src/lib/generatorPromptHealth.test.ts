import { describe, expect, it } from 'vitest';
import { getPromptHealth } from './generatorPromptHealth';

describe('getPromptHealth', () => {
  it('requires a clear goal and multiple feature lines', () => {
    const health = getPromptHealth({
      goal: '太短',
      features: '- 导入 Excel',
    });

    expect(health).toMatchObject({
      passed: 0,
      total: 4,
      ready: false,
    });
    expect(Object.fromEntries(health.checks.map((check) => [check.id, check.ok]))).toEqual({
      goal: false,
      features: false,
      io: false,
      acceptance: false,
    });
  });

  it('marks prompts ready when goal, features, io, and acceptance are present', () => {
    const health = getPromptHealth({
      goal: '帮财务同事做一个本地对账工具，减少手工核对时间。',
      features:
        '- 导入订单 Excel\n- 导入银行流水 CSV\n- 导出差异结果\n- 测试空数据和格式错误',
    });

    expect(health.ready).toBe(true);
    expect(health.passed).toBe(4);
  });

  it('recognizes English input, output, and acceptance wording', () => {
    const health = getPromptHealth({
      goal: 'Build a local reconciliation helper for finance teammates.',
      features:
        '- Import order files\n- Save export result\n- Test bad formats before packaging',
    });

    expect(health.ready).toBe(true);
    expect(health.checks.find((check) => check.id === 'io')?.ok).toBe(true);
    expect(health.checks.find((check) => check.id === 'acceptance')?.ok).toBe(true);
  });
});
