import { describe, expect, it } from 'vitest';
import { getPromptHealth } from './generatorPromptHealth';

describe('getPromptHealth', () => {
  it('starts at zero and exposes six checks for short input', () => {
    const health = getPromptHealth({
      goal: '太短',
      features: '- 导入 Excel',
    });

    expect(health).toMatchObject({
      passed: 0,
      total: 6,
      ready: false,
    });
    expect(Object.fromEntries(health.checks.map((check) => [check.id, check.ok]))).toEqual({
      goal: false,
      features: false,
      io: false,
      acceptance: false,
      who: false,
      metric: false,
    });
  });

  it('marks prompts ready when at least four checks pass', () => {
    const health = getPromptHealth({
      goal: '帮财务同事把每月对账从 2 天压到 1 小时，减少手工核对。',
      features:
        '- 导入订单 Excel\n- 导入银行流水 CSV\n- 导出差异结果\n- 测试空数据和格式错误',
    });

    expect(health.ready).toBe(true);
    expect(health.passed).toBeGreaterThanOrEqual(5);
    const byId = Object.fromEntries(health.checks.map((check) => [check.id, check.ok]));
    expect(byId.who).toBe(true);
    expect(byId.metric).toBe(true);
  });

  it('still falls short of ready when who or metric are missing', () => {
    const health = getPromptHealth({
      goal: '做一个本地工具来处理表格内容。',
      features: '- 导入 Excel\n- 导出结果',
    });

    expect(health.checks.find((check) => check.id === 'who')?.ok).toBe(false);
    expect(health.checks.find((check) => check.id === 'metric')?.ok).toBe(false);
    expect(health.ready).toBe(false);
  });

  it('recognizes English input, output, who, and metric wording', () => {
    const health = getPromptHealth({
      goal: 'Help finance teammates cut monthly reconciliation from 2 days to 1 hour.',
      features:
        '- Import order files\n- Save export result\n- Test bad formats before packaging',
    });

    const byId = Object.fromEntries(health.checks.map((check) => [check.id, check.ok]));
    expect(byId.io).toBe(true);
    expect(byId.acceptance).toBe(true);
    expect(byId.who).toBe(true);
    expect(byId.metric).toBe(true);
    expect(health.ready).toBe(true);
  });
});
