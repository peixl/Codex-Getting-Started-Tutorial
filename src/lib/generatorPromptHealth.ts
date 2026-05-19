import type { FormState } from './promptBuilder';

export type PromptHealthCheckId = 'goal' | 'features' | 'io' | 'acceptance' | 'who' | 'metric';

export type PromptHealthCheck = {
  id: PromptHealthCheckId;
  ok: boolean;
};

export type PromptHealth = {
  checks: PromptHealthCheck[];
  passed: number;
  total: number;
  ready: boolean;
};

const INPUT_WORDS = [
  '导入',
  '输入',
  '拖入',
  '文件',
  'Excel',
  'CSV',
  'import',
  'input',
  'file',
] as const;

const OUTPUT_WORDS = [
  '导出',
  '生成',
  '保存',
  '结果',
  'output',
  'export',
  'save',
  'result',
] as const;

const ACCEPTANCE_WORDS = [
  '验收',
  '成功',
  '完成',
  '打包',
  '测试',
  'verify',
  'test',
  'done',
  'package',
] as const;

const WHO_WORDS = [
  '财务',
  '运营',
  '客服',
  '销售',
  '行政',
  '人事',
  'hr',
  '法务',
  '采购',
  '市场',
  '产品',
  '同事',
  '团队',
  '老板',
  '部门',
  '门店',
  '小伙伴',
  '客户',
  '用户',
  '学生',
  '老师',
  'team',
  'finance',
  'ops',
  'support',
  'sales',
  'admin',
  'legal',
  'procurement',
  'marketing',
  'product',
  'colleague',
  'department',
  'store',
  'teammate',
  'customer',
  'user',
  'student',
  'teacher',
] as const;

const METRIC_WORDS = [
  '小时',
  '分钟',
  '秒',
  '倍',
  '减少',
  '压到',
  '压缩',
  '缩短',
  '提高',
  '提升',
  '节省',
  '省下',
  '快',
  '批量',
  '一键',
  '成倍',
  'hour',
  'minute',
  'second',
  'reduce',
  'cut',
  'shorten',
  'faster',
  'times',
  'save time',
  'batch',
  'one-click',
  'instant',
  'in one go',
] as const;

// Number + unit pattern: "2 天", "1 小时", "10 万行", "100k rows", "30%".
// A measurable goal usually has a quantified change; this catches more cases
// than the keyword list alone.
const METRIC_NUMBER_UNIT = /\d+\s*(?:%|天|时|分|秒|周|月|年|倍|万|千|百|个|条|行|次|页|kb|mb|gb|k|m|day|hour|min|sec|week|month|year|row|item|page|file)/i;

function includesAny(text: string, words: readonly string[]) {
  const normalized = text.toLowerCase();
  return words.some((word) => normalized.includes(word.toLowerCase()));
}

export function getPromptHealth(
  state: Pick<FormState, 'goal' | 'features'>,
): PromptHealth {
  const goal = state.goal.trim();
  const features = state.features.trim();
  const featureLines = features.split('\n').filter((line) => line.trim().length > 0);
  const requestText = `${goal}\n${features}`;
  const checks: PromptHealthCheck[] = [
    { id: 'goal', ok: goal.length >= 12 },
    { id: 'features', ok: featureLines.length >= 2 },
    {
      id: 'io',
      ok: includesAny(requestText, INPUT_WORDS) && includesAny(requestText, OUTPUT_WORDS),
    },
    {
      id: 'acceptance',
      ok: includesAny(requestText, ACCEPTANCE_WORDS),
    },
    {
      id: 'who',
      ok: includesAny(requestText, WHO_WORDS),
    },
    {
      id: 'metric',
      ok: includesAny(requestText, METRIC_WORDS) || METRIC_NUMBER_UNIT.test(requestText),
    },
  ];
  const passed = checks.filter((check) => check.ok).length;

  return {
    checks,
    passed,
    total: checks.length,
    ready: passed >= 4,
  };
}
