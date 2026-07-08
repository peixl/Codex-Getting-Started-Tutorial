import { describe, expect, it } from 'vitest';
import { caseBundles, getCasePrompt } from '@/data/cases';
import { recipes, getRecipePrompt } from '@/data/recipes';
import {
  buildPrompt,
  buildRecoveryPrompt,
  DEFAULT_FORM,
  quickTemplates,
  type FormState,
} from './promptBuilder';
import { mergeFormState } from './generatorStorage';
import { buildWeChatAiPrompt } from './wechatAiPrompt';

type PromptSample = {
  id: string;
  text: string;
};

const SAMPLE_FORM: FormState = {
  ...DEFAULT_FORM,
  goal: '帮财务同事把每月对账从 2 天压到 1 小时，减少手工核对。',
  features:
    '- 导入订单 Excel\n- 导入银行流水 CSV\n- 预览差异并标红\n- 导出差异结果并完成验收测试',
};

const FORBIDDEN_INTERNAL_POSITIONING = [
  /字节跳动式产品方法/i,
  /ByteDance-style product method/i,
  /字节跳动/i,
  /ByteDance/i,
  /北极星目标/i,
  /north[- ]star goal/i,
  /目标填空\s*(?:→|->)\s*复制提示词\s*(?:→|->)\s*粘贴到\s*Codex/i,
  /fill goal\s*(?:→|->)\s*copy prompt\s*(?:→|->)\s*paste into\s*Codex/i,
  /流程目标：/i,
  /process goal:/i,
  /先定义用户、场景、北极星目标/i,
  /define users?, scenarios?,.*north[- ]star/i,
  /小步快跑/i,
  /数据闭环/i,
  /极致体验/i,
  /不把技术决策丢回给用户/i,
  /不要为了完整性拖慢首版/i,
  /这是给你的定位/i,
  /internal positioning/i,
  /产品方法/i,
  /product method/i,
] as const;

function collectCopyablePrompts(): PromptSample[] {
  const formStates: Array<{ id: string; state: FormState }> = [
    { id: 'generator-default', state: SAMPLE_FORM },
    { id: 'generator-web', state: mergeFormState(SAMPLE_FORM, { platform: 'web' }) },
    {
      id: 'generator-windows',
      state: mergeFormState(SAMPLE_FORM, {
        platform: 'windows',
        tech: 'auto',
        storage: 'localFile',
      }),
    },
    {
      id: 'generator-mac',
      state: mergeFormState(SAMPLE_FORM, {
        platform: 'mac',
        tech: 'auto',
        storage: 'localFile',
      }),
    },
    {
      id: 'generator-both',
      state: mergeFormState(SAMPLE_FORM, {
        platform: 'both',
        tech: 'auto',
        storage: 'localFile',
      }),
    },
    ...quickTemplates.map((template) => ({
      id: `template-${template.id}`,
      state: mergeFormState(SAMPLE_FORM, template.state),
    })),
  ];

  return [
    ...formStates.flatMap(({ id, state }) => [
      { id: `${id}-zh`, text: buildPrompt(state, 'zh') },
      { id: `${id}-en`, text: buildPrompt(state, 'en') },
      { id: `${id}-recovery-zh`, text: buildRecoveryPrompt(state, 'zh') },
      { id: `${id}-recovery-en`, text: buildRecoveryPrompt(state, 'en') },
    ]),
    ...caseBundles.flatMap((bundle) => [
      { id: `case-${bundle.slug}-zh`, text: getCasePrompt(bundle, 'zh') },
      { id: `case-${bundle.slug}-en`, text: getCasePrompt(bundle, 'en') },
    ]),
    ...recipes.flatMap((recipe) => [
      { id: `recipe-${recipe.id}-zh`, text: getRecipePrompt(recipe, 'zh') },
      { id: `recipe-${recipe.id}-en`, text: getRecipePrompt(recipe, 'en') },
    ]),
    {
      id: 'wechat-ai-default-zh',
      text: buildWeChatAiPrompt({ accessKey: 'sk-test', lang: 'zh' }),
    },
    {
      id: 'wechat-ai-default-en',
      text: buildWeChatAiPrompt({ accessKey: 'sk-test', lang: 'en' }),
    },
    {
      id: 'wechat-ai-anthropic-en',
      text: buildWeChatAiPrompt({
        accessKey: 'sk-test',
        lang: 'en',
        baseUrl: 'https://api.anthropic.com',
        protocol: 'anthropic',
        model: 'claude-opus-4-8',
      }),
    },
    {
      id: 'wechat-ai-gemini-en',
      text: buildWeChatAiPrompt({
        accessKey: 'sk-test',
        lang: 'en',
        baseUrl: 'https://generativelanguage.googleapis.com',
        protocol: 'gemini',
        model: 'gemini-3.1-pro-preview',
      }),
    },
  ];
}

describe('copyable prompt leakage', () => {
  it('keeps internal product-positioning guidance out of every copyable prompt', () => {
    const leaked = collectCopyablePrompts().flatMap((sample) =>
      FORBIDDEN_INTERNAL_POSITIONING
        .filter((pattern) => pattern.test(sample.text))
        .map((pattern) => `${sample.id}: ${pattern.source}`),
    );

    expect(leaked).toEqual([]);
  });
});
