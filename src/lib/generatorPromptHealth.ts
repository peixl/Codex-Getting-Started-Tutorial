import type { FormState } from './promptBuilder';

export type PromptHealthCheckId = 'goal' | 'features' | 'io' | 'acceptance';

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
  ];
  const passed = checks.filter((check) => check.ok).length;

  return {
    checks,
    passed,
    total: checks.length,
    ready: passed >= 3,
  };
}
