# 微信 AI 高级设置(多厂商适配)实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 给 `/wechat-ai` 增加默认折叠的「高级设置」面板,让高阶用户自定义 Base URL / 协议 / 模型,使 OpenAI、Anthropic、Google 等主流 AI 都能接入微信;简单模式与默认 PackyAPI 网关行为保持不变。

**Architecture:** 新增单一数据源 `wechatAiProviders.ts`(厂商预设),被提示词生成与 UI 预填共用;`buildWeChatAiPrompt` 增加可选 `baseUrl/protocol/model`,不传时逐字节等价于现状;新增 `AdvancedSettings.tsx` 折叠面板,主组件接入并把非敏感项持久化到 localStorage(密钥不存)。

**Tech Stack:** Next.js (App Router) + React client components + TypeScript + Vitest + Tailwind(`.glass-input` / `.glass-select` 既有样式)+ i18n 字典(zh/en)。

---

## 文件结构

- **Create** `src/lib/wechatAiProviders.ts` — 厂商预设、协议/厂商类型、`resolveProviderPreset` 辅助。单一数据源。
- **Modify** `src/lib/wechatAiPrompt.ts` — `buildWeChatAiPrompt` 增加可选 `baseUrl/protocol/model`,第 2 步按协议生成措辞。
- **Modify** `src/lib/wechatAiPrompt.test.ts` — 新增多厂商断言;禁词扫描收窄到简单模式键。
- **Create** `src/components/wechat-ai/AdvancedSettings.tsx` — 折叠面板 UI(厂商下拉 + Base URL/协议/模型)。
- **Modify** `src/components/wechat-ai/WechatAiApp.tsx` — 接入面板、state、localStorage、默认标识、传参。
- **Modify** `src/i18n/dictionaries/zh.ts` — 新增 `wechatAi.advanced.*`。
- **Modify** `src/i18n/dictionaries/en.ts` — 新增 `wechatAi.advanced.*`(与 zh 对齐)。

测试命令统一为:`npm test`(等价 `vitest run`)。单文件:`npx vitest run <path>`。

---

## Task 1: 厂商预设单一数据源

**Files:**
- Create: `src/lib/wechatAiProviders.ts`
- Test: `src/lib/wechatAiProviders.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/wechatAiProviders.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  PROVIDER_PRESETS,
  DEFAULT_PROVIDER_ID,
  resolveProviderPreset,
} from './wechatAiProviders';

describe('wechatAiProviders', () => {
  it('default preset keeps the current PackyAPI gateway', () => {
    const preset = resolveProviderPreset('default');
    expect(preset.baseUrl).toBe('https://www.packyapi.com/v1');
    expect(preset.protocol).toBe('openai');
    expect(preset.model).toBe('gpt-5.5');
  });

  it('exposes openai / anthropic / google presets with correct endpoints', () => {
    expect(resolveProviderPreset('openai').baseUrl).toBe('https://api.openai.com/v1');
    expect(resolveProviderPreset('anthropic').baseUrl).toBe('https://api.anthropic.com');
    expect(resolveProviderPreset('anthropic').protocol).toBe('anthropic');
    expect(resolveProviderPreset('anthropic').model).toBe('claude-opus-4-8');
    expect(resolveProviderPreset('google').baseUrl).toBe(
      'https://generativelanguage.googleapis.com',
    );
    expect(resolveProviderPreset('google').protocol).toBe('gemini');
    expect(resolveProviderPreset('google').model).toBe('gemini-3.1-pro-preview');
  });

  it('custom preset defaults to OpenAI-compatible protocol with empty fields', () => {
    const preset = resolveProviderPreset('custom');
    expect(preset.protocol).toBe('openai');
    expect(preset.baseUrl).toBe('');
    expect(preset.model).toBe('');
  });

  it('falls back to default for unknown ids', () => {
    expect(resolveProviderPreset('nope' as never).id).toBe(DEFAULT_PROVIDER_ID);
  });

  it('every preset is listed exactly once', () => {
    const ids = PROVIDER_PRESETS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain('default');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/wechatAiProviders.test.ts`
Expected: FAIL — cannot find module `./wechatAiProviders`.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/wechatAiProviders.ts`:

```ts
export type WeChatAiProtocol = 'openai' | 'anthropic' | 'gemini';

export type WeChatAiProviderId =
  | 'default'
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'custom';

export type ProviderPreset = {
  id: WeChatAiProviderId;
  baseUrl: string;
  protocol: WeChatAiProtocol;
  model: string;
};

export const DEFAULT_PROVIDER_ID: WeChatAiProviderId = 'default';

export const PROVIDER_PRESETS: ProviderPreset[] = [
  {
    id: 'default',
    baseUrl: 'https://www.packyapi.com/v1',
    protocol: 'openai',
    model: 'gpt-5.5',
  },
  {
    id: 'openai',
    baseUrl: 'https://api.openai.com/v1',
    protocol: 'openai',
    model: 'gpt-5.5',
  },
  {
    id: 'anthropic',
    baseUrl: 'https://api.anthropic.com',
    protocol: 'anthropic',
    model: 'claude-opus-4-8',
  },
  {
    id: 'google',
    baseUrl: 'https://generativelanguage.googleapis.com',
    protocol: 'gemini',
    model: 'gemini-3.1-pro-preview',
  },
  {
    id: 'custom',
    baseUrl: '',
    protocol: 'openai',
    model: '',
  },
];

export function resolveProviderPreset(id: WeChatAiProviderId): ProviderPreset {
  return (
    PROVIDER_PRESETS.find((preset) => preset.id === id) ??
    PROVIDER_PRESETS.find((preset) => preset.id === DEFAULT_PROVIDER_ID)!
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/wechatAiProviders.test.ts`
Expected: PASS (5 passing).

- [ ] **Step 5: Commit**

```bash
git add src/lib/wechatAiProviders.ts src/lib/wechatAiProviders.test.ts
git commit -m "feat: add WeChat AI provider presets single source of truth"
```

---

## Task 2: 提示词生成支持多厂商参数

**Files:**
- Modify: `src/lib/wechatAiPrompt.ts`
- Test: `src/lib/wechatAiPrompt.test.ts`

本任务先扩展 `buildWeChatAiPrompt`,保持默认调用逐字节不变,并新增协议措辞。

- [ ] **Step 1: Write the failing tests (append to existing describe block)**

In `src/lib/wechatAiPrompt.test.ts`, add these tests **inside** the existing `describe('buildWeChatAiPrompt', ...)` block (after the existing two prompt tests, before the page-copy test):

```ts
  it('keeps the default gateway output when no provider args are passed', () => {
    const prompt = buildWeChatAiPrompt({ accessKey: 'sk-x', lang: 'zh' });
    expect(prompt).toContain('https://www.packyapi.com/v1');
    expect(prompt).toContain('gpt-5.5');
    expect(prompt).toContain('reasoning effort: medium');
    expect(prompt).toContain('reasoning effort: xhigh');
  });

  it('builds an Anthropic prompt with extended thinking wording', () => {
    const prompt = buildWeChatAiPrompt({
      accessKey: 'sk-ant',
      lang: 'en',
      baseUrl: 'https://api.anthropic.com',
      protocol: 'anthropic',
      model: 'claude-opus-4-8',
    });
    expect(prompt).toContain('https://api.anthropic.com');
    expect(prompt).toContain('claude-opus-4-8');
    expect(prompt).toContain('extended thinking');
    expect(prompt).not.toContain('gpt-5.5');
  });

  it('builds a Google Gemini prompt with thinking wording', () => {
    const prompt = buildWeChatAiPrompt({
      accessKey: 'sk-g',
      lang: 'en',
      baseUrl: 'https://generativelanguage.googleapis.com',
      protocol: 'gemini',
      model: 'gemini-3.1-pro-preview',
    });
    expect(prompt).toContain('https://generativelanguage.googleapis.com');
    expect(prompt).toContain('gemini-3.1-pro-preview');
    expect(prompt).toContain('thinking');
  });

  it('builds an OpenAI direct prompt against the official endpoint', () => {
    const prompt = buildWeChatAiPrompt({
      accessKey: 'sk-o',
      lang: 'zh',
      baseUrl: 'https://api.openai.com/v1',
      protocol: 'openai',
      model: 'gpt-5.5',
    });
    expect(prompt).toContain('https://api.openai.com/v1');
    expect(prompt).toContain('reasoning effort: medium');
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/wechatAiPrompt.test.ts`
Expected: FAIL — Anthropic/Google assertions fail because the current builder ignores the new args and always emits packyapi/gpt-5.5.

- [ ] **Step 3: Rewrite `wechatAiPrompt.ts` to accept provider args**

Replace the entire contents of `src/lib/wechatAiPrompt.ts` with:

```ts
import type { PromptLang } from './promptBuilder';
import type { WeChatAiProtocol } from './wechatAiProviders';

type BuildWeChatAiPromptOptions = {
  accessKey: string;
  lang: PromptLang;
  baseUrl?: string;
  protocol?: WeChatAiProtocol;
  model?: string;
};

const DEFAULT_BASE_URL = 'https://www.packyapi.com/v1';
const DEFAULT_MODEL = 'gpt-5.5';
const DEFAULT_PROTOCOL: WeChatAiProtocol = 'openai';

function normalizeAccessKey(accessKey: string) {
  return accessKey.trim().replace(/\s+/g, '');
}

function formatAccessKey(accessKey: string, lang: PromptLang) {
  const normalized = normalizeAccessKey(accessKey);
  if (normalized) return JSON.stringify(normalized);
  return lang === 'zh'
    ? '（复制时会带上你填写的通行密钥）'
    : '(your access code will be inserted when copied)';
}

function thinkingLines(protocol: WeChatAiProtocol, lang: PromptLang): string {
  if (lang === 'zh') {
    if (protocol === 'anthropic') {
      return [
        '- 开启 extended thinking（深度思考）。',
        '- 默认 effort: high。',
        '- 对复杂任务使用 effort: xhigh。',
      ].join('\n');
    }
    if (protocol === 'gemini') {
      return [
        '- 开启 thinking（深度思考）。',
        '- 对复杂任务调高 thinking budget。',
      ].join('\n');
    }
    return [
      '- 开启 deep thinking / reasoning。',
      '- 默认 reasoning effort: medium。',
      '- 对复杂任务使用 reasoning effort: xhigh。',
    ].join('\n');
  }

  if (protocol === 'anthropic') {
    return [
      '- Enable extended thinking.',
      '- Default effort: high.',
      '- For complex tasks, use effort: xhigh.',
    ].join('\n');
  }
  if (protocol === 'gemini') {
    return [
      '- Enable thinking.',
      '- For complex tasks, raise the thinking budget.',
    ].join('\n');
  }
  return [
    '- Enable deep thinking / reasoning.',
    '- Default reasoning effort: medium.',
    '- For complex tasks, use reasoning effort: xhigh.',
  ].join('\n');
}

export function buildWeChatAiPrompt({
  accessKey,
  lang,
  baseUrl = DEFAULT_BASE_URL,
  protocol = DEFAULT_PROTOCOL,
  model = DEFAULT_MODEL,
}: BuildWeChatAiPromptOptions) {
  const key = formatAccessKey(accessKey, lang);
  const thinking = thinkingLines(protocol, lang);

  if (lang === 'zh') {
    return `你是资深本地电脑助手，目标是帮一位普通用户把 ${model} 的 AI 能力接入微信。请直接执行，不要只给建议。全程中文解释；面对用户时使用清楚、友好的日常表达；执行细节只在必要记录里出现。

【用户提供】
- API Key / 通行密钥: ${key}

【硬性规则】
1. 必须按顺序执行：第 1 步成功后才做第 2 步，第 2 步成功后才做第 3 步。
2. 每一步都要先验证成功，再进入下一步；失败时先修复当前步骤，不要跳过。
3. 如果必须让用户操作，只告诉用户一个明确动作，例如“请用微信扫码”或“请打开屏幕上的链接”，避免把执行细节交给用户处理。
4. 最终回复不要复述通行密钥；如需展示配置，请把通行密钥打码。

【第 1 步：安装 OpenClaw】
- 打开并参考官方页面：https://openclaw.ai
- 按当前电脑系统完成 openclaw 安装。
- 安装后验证 OpenClaw 可用；可通过官方自检方式、应用可打开、或可用命令检查来确认。
- 如果安装失败，先排查并修复本步，不进入第 2 步。

【第 2 步：配置 ${model}】
- Base URL: ${baseUrl}
- Model: ${model}
- API Key / 通行密钥: ${key}
${thinking}
- 配置后做一次最小可行验证，确认模型连接可用；失败则先修复本步，不进入第 3 步。

【第 3 步：接入微信】
- 在终端执行：
\`\`\`bash
npx -y @tencent-weixin/openclaw-weixin-cli@latest install
\`\`\`
- 保持输出可见，直到出现二维码和链接。
- 出现二维码和链接后，暂停自动推进，用普通话告诉用户：请用微信扫码，或打开屏幕上显示的链接完成确认。
- 用户完成扫码或打开链接后，再检查流程是否完成。

【完成标准】
- OpenClaw 已安装并能正常打开或响应。
- ${model} 已按指定地址和 Key 配好，深度思考已开启。
- 微信接入命令已运行，二维码或链接已展示给用户。
- 用户完成扫码或打开链接确认后，明确告诉用户“微信里已经可以使用新的 AI 助手”。`;
  }

  return `You are a senior local-computer assistant. Help an everyday user add ${model} AI capability to WeChat. Execute directly; do not merely provide advice. Explain in clear, friendly everyday language, and keep execution details inside notes unless they are necessary.

[User Provided]
- API Key / access code: ${key}

[Hard Rules]
1. Run the steps strictly in order: step 1 must succeed before step 2, and step 2 must succeed before step 3.
2. Verify each step before moving on. If a step fails, fix that step first and do not skip ahead.
3. If the user must act, give exactly one plain action, such as “scan this with WeChat” or “open the link shown on screen.” Do not hand execution details to the user.
4. Do not repeat the access code in the final response. Mask it if configuration needs to be shown.

[Step 1: Install OpenClaw]
- Open and follow the official page: https://openclaw.ai
- Install openclaw for the current operating system.
- Verify that OpenClaw is available after installation, using the official check, app launch, or an available command check.
- If installation fails, diagnose and fix this step before moving to step 2.

[Step 2: Configure ${model}]
- Base URL: ${baseUrl}
- Model: ${model}
- API Key / access code: ${key}
${thinking}
- After configuring, run a minimal working check to confirm the model connection works. If it fails, fix this step before moving to step 3.

[Step 3: Connect WeChat]
- Run this in the terminal:
\`\`\`bash
npx -y @tencent-weixin/openclaw-weixin-cli@latest install
\`\`\`
- Keep the output visible until the QR code and link appear.
- When the QR code and link appear, pause automatic progress and tell the user plainly: scan with WeChat, or open the link shown on screen.
- After the user completes scanning or opens the link, check that the flow is complete.

[Done Means]
- OpenClaw is installed and can open or respond normally.
- ${model} is configured with the specified address and Key, with deep thinking enabled.
- The WeChat connection command ran and showed the QR code or link.
- After the user confirms by scanning or opening the link, tell the user that the new AI assistant is ready in WeChat.`;
}
```

Note: default `protocol='openai'` + default model/baseUrl reproduces the original `reasoning effort: medium/xhigh` wording, so the existing two prompt tests stay green.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/wechatAiPrompt.test.ts`
Expected: PASS — existing assertions plus the 4 new provider tests. (The page-copy test still passes; we adjust it in Task 3.)

- [ ] **Step 5: Commit**

```bash
git add src/lib/wechatAiPrompt.ts src/lib/wechatAiPrompt.test.ts
git commit -m "feat: parameterize WeChat AI prompt by base url, protocol, model"
```

---

## Task 3: 禁词扫描收窄到简单模式键

**Files:**
- Modify: `src/lib/wechatAiPrompt.test.ts`

高级面板会引入技术词到 `wechatAi.advanced.*`。把第三条测试的扫描对象从「整个 `wechatAi`」收窄到「简单模式键」(排除 `advanced` 子树),让简单模式文案仍受禁词约束,高级文案不受约束。

- [ ] **Step 1: Update the page-copy test to exclude the advanced subtree**

In `src/lib/wechatAiPrompt.test.ts`, replace the body of the existing test `it('keeps user-facing WeChat AI page copy plain and comfortable', ...)`. Change the two lines that build the visible-copy strings:

Replace:

```ts
    const zhVisibleCopy = Object.values(zh.wechatAi).join('\n');
    const enVisibleCopy = Object.values(en.wechatAi).join('\n');
```

With:

```ts
    const simpleCopy = (dict: typeof zh) => {
      const { advanced: _advanced, ...simple } = dict.wechatAi;
      return Object.values(simple).join('\n');
    };
    const zhVisibleCopy = simpleCopy(zh);
    const enVisibleCopy = simpleCopy(en);
```

Leave the two `for (const phrase of [...])` loops unchanged — they now scan only simple-mode copy.

- [ ] **Step 2: Run test to verify it still passes (advanced not added yet)**

Run: `npx vitest run src/lib/wechatAiPrompt.test.ts`
Expected: PASS. `advanced` is `undefined` for now; destructuring a missing key is a no-op, so simple copy is unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/lib/wechatAiPrompt.test.ts
git commit -m "test: scope WeChat AI banned-word check to simple-mode copy"
```

---

## Task 4: 高级设置双语文案

**Files:**
- Modify: `src/i18n/dictionaries/zh.ts:229-270` (the `wechatAi` block)
- Modify: `src/i18n/dictionaries/en.ts` (the `wechatAi` block)
- Test: `src/i18n/dictionaries/i18n-parity.test.ts` (existing — no edit, must stay green)

- [ ] **Step 1: Add `advanced` block to zh dictionary**

In `src/i18n/dictionaries/zh.ts`, inside the `wechatAi: { ... }` object, add a new `advanced` key right after `default3: '所有说明尽量用听得懂的话。',` and before the closing `},` of `wechatAi`:

```ts
    defaultBadge: '默认通过站点网关接入，已配置好',
    advanced: {
      toggle: '高级设置',
      intro:
        '默认通过站点网关接入，无需改动。如果你自带 OpenAI、Anthropic、Google 等官方密钥，想直连官方接口，可在这里修改。',
      providerLabel: '接入方',
      providerDefault: '默认网关（推荐）',
      providerOpenai: 'OpenAI',
      providerAnthropic: 'Anthropic',
      providerGoogle: 'Google',
      providerCustom: '自定义',
      baseUrlLabel: '接口地址（Base URL）',
      baseUrlPlaceholder: '例如 https://api.openai.com/v1',
      protocolLabel: '接口协议',
      protocolOpenai: 'OpenAI 兼容',
      protocolAnthropic: 'Anthropic Messages',
      protocolGemini: 'Google Gemini',
      modelLabel: '模型',
      modelPlaceholder: '例如 gpt-5.5',
      resetLabel: '恢复默认',
    },
```

- [ ] **Step 2: Add the matching `advanced` block to en dictionary**

In `src/i18n/dictionaries/en.ts`, inside the `wechatAi: { ... }` object at the same position (after the `default3` line, before `wechatAi`'s closing `},`):

```ts
    defaultBadge: 'Connected through the site gateway by default — already set up',
    advanced: {
      toggle: 'Advanced settings',
      intro:
        'Connected through the site gateway by default — no change needed. If you bring your own OpenAI, Anthropic, or Google key and want to reach the official endpoint directly, adjust it here.',
      providerLabel: 'Provider',
      providerDefault: 'Default gateway (recommended)',
      providerOpenai: 'OpenAI',
      providerAnthropic: 'Anthropic',
      providerGoogle: 'Google',
      providerCustom: 'Custom',
      baseUrlLabel: 'Base URL',
      baseUrlPlaceholder: 'e.g. https://api.openai.com/v1',
      protocolLabel: 'Protocol',
      protocolOpenai: 'OpenAI-compatible',
      protocolAnthropic: 'Anthropic Messages',
      protocolGemini: 'Google Gemini',
      modelLabel: 'Model',
      modelPlaceholder: 'e.g. gpt-5.5',
      resetLabel: 'Reset to default',
    },
```

- [ ] **Step 3: Run i18n + prompt tests**

Run: `npx vitest run src/i18n/dictionaries/i18n-parity.test.ts src/lib/wechatAiPrompt.test.ts`
Expected: PASS — keys are at parity (zh ↔ en), and the page-copy test now excludes the `advanced` subtree so the new technical words (`Base URL`, `Model`, `OpenAI`) don't trip the banned-word loops.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/dictionaries/zh.ts src/i18n/dictionaries/en.ts
git commit -m "feat: add bilingual copy for WeChat AI advanced settings"
```

---

## Task 5: 高级设置面板组件

**Files:**
- Create: `src/components/wechat-ai/AdvancedSettings.tsx`

纯展示/受控组件:由父组件传入当前值与回调。无独立单测(行为在 Task 6 的集成中由构建/lint 验证;逻辑已在 providers/prompt 层覆盖)。

- [ ] **Step 1: Create the component**

Create `src/components/wechat-ai/AdvancedSettings.tsx`:

```tsx
'use client';

import type { Dictionary } from '@/i18n';
import {
  PROVIDER_PRESETS,
  type WeChatAiProtocol,
  type WeChatAiProviderId,
} from '@/lib/wechatAiProviders';

type Props = {
  dict: Dictionary;
  providerId: WeChatAiProviderId;
  baseUrl: string;
  protocol: WeChatAiProtocol;
  model: string;
  onProviderChange: (id: WeChatAiProviderId) => void;
  onBaseUrlChange: (value: string) => void;
  onProtocolChange: (value: WeChatAiProtocol) => void;
  onModelChange: (value: string) => void;
};

export function AdvancedSettings({
  dict,
  providerId,
  baseUrl,
  protocol,
  model,
  onProviderChange,
  onBaseUrlChange,
  onProtocolChange,
  onModelChange,
}: Props) {
  const t = dict.wechatAi.advanced;

  const providerLabel: Record<WeChatAiProviderId, string> = {
    default: t.providerDefault,
    openai: t.providerOpenai,
    anthropic: t.providerAnthropic,
    google: t.providerGoogle,
    custom: t.providerCustom,
  };

  const protocolLabel: Record<WeChatAiProtocol, string> = {
    openai: t.protocolOpenai,
    anthropic: t.protocolAnthropic,
    gemini: t.protocolGemini,
  };

  return (
    <details className="mt-5 rounded-2xl border border-[color:var(--line)] bg-white/55 px-4 py-3">
      <summary className="cursor-pointer select-none text-[13px] font-semibold text-ink">
        {t.toggle}
      </summary>

      <p className="mt-3 text-[11.5px] leading-relaxed text-ink-mute">{t.intro}</p>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="wechat-provider"
            className="mb-1.5 block text-[12.5px] font-semibold text-ink"
          >
            {t.providerLabel}
          </label>
          <select
            id="wechat-provider"
            value={providerId}
            onChange={(event) =>
              onProviderChange(event.target.value as WeChatAiProviderId)
            }
            className="glass-select text-[13px]"
          >
            {PROVIDER_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {providerLabel[preset.id]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="wechat-base-url"
            className="mb-1.5 block text-[12.5px] font-semibold text-ink"
          >
            {t.baseUrlLabel}
          </label>
          <input
            id="wechat-base-url"
            type="text"
            value={baseUrl}
            onChange={(event) => onBaseUrlChange(event.target.value)}
            placeholder={t.baseUrlPlaceholder}
            autoComplete="off"
            spellCheck={false}
            className="glass-input text-[13px]"
          />
        </div>

        <div>
          <label
            htmlFor="wechat-protocol"
            className="mb-1.5 block text-[12.5px] font-semibold text-ink"
          >
            {t.protocolLabel}
          </label>
          <select
            id="wechat-protocol"
            value={protocol}
            onChange={(event) =>
              onProtocolChange(event.target.value as WeChatAiProtocol)
            }
            className="glass-select text-[13px]"
          >
            {(['openai', 'anthropic', 'gemini'] as WeChatAiProtocol[]).map((value) => (
              <option key={value} value={value}>
                {protocolLabel[value]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="wechat-model"
            className="mb-1.5 block text-[12.5px] font-semibold text-ink"
          >
            {t.modelLabel}
          </label>
          <input
            id="wechat-model"
            type="text"
            value={model}
            onChange={(event) => onModelChange(event.target.value)}
            placeholder={t.modelPlaceholder}
            autoComplete="off"
            spellCheck={false}
            className="glass-input text-[13px]"
          />
        </div>
      </div>
    </details>
  );
}
```

- [ ] **Step 2: Typecheck via lint**

Run: `npm run lint`
Expected: PASS (no unused vars, no type errors in the new file).

- [ ] **Step 3: Commit**

```bash
git add src/components/wechat-ai/AdvancedSettings.tsx
git commit -m "feat: add WeChat AI advanced settings panel component"
```

---

## Task 6: 主组件接入(state、持久化、默认标识、传参)

**Files:**
- Modify: `src/components/wechat-ai/WechatAiApp.tsx`

- [ ] **Step 1: Add imports**

At the top of `src/components/wechat-ai/WechatAiApp.tsx`, after the existing `buildWeChatAiPrompt` import, add:

```tsx
import { AdvancedSettings } from '@/components/wechat-ai/AdvancedSettings';
import {
  DEFAULT_PROVIDER_ID,
  resolveProviderPreset,
  type WeChatAiProtocol,
  type WeChatAiProviderId,
} from '@/lib/wechatAiProviders';
```

- [ ] **Step 2: Add advanced state + localStorage load/save**

Inside `WechatAiApp`, just after the existing `const [copied, setCopied] = useState(false);` line, add:

```tsx
  const STORAGE_KEY = 'wechat-ai-advanced';
  const [providerId, setProviderId] = useState<WeChatAiProviderId>(DEFAULT_PROVIDER_ID);
  const [baseUrl, setBaseUrl] = useState('https://www.packyapi.com/v1');
  const [protocol, setProtocol] = useState<WeChatAiProtocol>('openai');
  const [model, setModel] = useState('gpt-5.5');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<{
        providerId: WeChatAiProviderId;
        baseUrl: string;
        protocol: WeChatAiProtocol;
        model: string;
      }>;
      if (saved.providerId) setProviderId(saved.providerId);
      if (typeof saved.baseUrl === 'string') setBaseUrl(saved.baseUrl);
      if (saved.protocol) setProtocol(saved.protocol);
      if (typeof saved.model === 'string') setModel(saved.model);
    } catch {
      // ignore unreadable/private-mode storage
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ providerId, baseUrl, protocol, model }),
      );
    } catch {
      // ignore unwritable/private-mode storage
    }
  }, [providerId, baseUrl, protocol, model]);

  const handleProviderChange = (id: WeChatAiProviderId) => {
    setProviderId(id);
    if (id !== 'custom') {
      const preset = resolveProviderPreset(id);
      setBaseUrl(preset.baseUrl);
      setProtocol(preset.protocol);
      setModel(preset.model);
    }
    setCopied(false);
  };
```

- [ ] **Step 3: Feed resolved config into the prompt builder**

Replace the existing `prompt` memo:

```tsx
  const prompt = useMemo(
    () => buildWeChatAiPrompt({ accessKey, lang: locale }),
    [accessKey, locale]
  );
```

with:

```tsx
  const prompt = useMemo(
    () =>
      buildWeChatAiPrompt({
        accessKey,
        lang: locale,
        baseUrl: baseUrl.trim() || resolveProviderPreset('default').baseUrl,
        protocol,
        model: model.trim() || resolveProviderPreset('default').model,
      }),
    [accessKey, locale, baseUrl, protocol, model]
  );
```

- [ ] **Step 4: Render the default badge + panel inside the form GlassPanel**

In the first `<GlassPanel>` (the form), locate the closing of the privacy note paragraph:

```tsx
            <p className="mt-3 text-[11px] leading-relaxed text-ink-mute">
              {dict.wechatAi.privacyNote}
            </p>
          </GlassPanel>
```

Insert the badge **above** the CopyButton block and the panel **after** the privacy note, so the panel sits at the end of the form GlassPanel. Replace the snippet above with:

```tsx
            <p className="mt-3 text-[11px] leading-relaxed text-ink-mute">
              {dict.wechatAi.privacyNote}
            </p>

            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50/80 px-3 py-1 text-[11px] font-medium text-emerald-800">
              <CheckIcon size={12} strokeWidth={3} />
              {dict.wechatAi.defaultBadge}
            </p>

            <AdvancedSettings
              dict={dict}
              providerId={providerId}
              baseUrl={baseUrl}
              protocol={protocol}
              model={model}
              onProviderChange={handleProviderChange}
              onBaseUrlChange={(value) => {
                setBaseUrl(value);
                setCopied(false);
              }}
              onProtocolChange={(value) => {
                setProtocol(value);
                setCopied(false);
              }}
              onModelChange={(value) => {
                setModel(value);
                setCopied(false);
              }}
            />
          </GlassPanel>
```

(`CheckIcon` is already imported in this file.)

- [ ] **Step 5: Run lint + full test suite**

Run: `npm run lint && npm test`
Expected: PASS — lint clean; all vitest suites green (providers, prompt with multi-provider, i18n parity, page-copy scoped to simple mode).

- [ ] **Step 6: Commit**

```bash
git add src/components/wechat-ai/WechatAiApp.tsx
git commit -m "feat: wire advanced settings into WeChat AI app with persistence"
```

---

## Task 7: 构建验证与收尾

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `npm run build:next`
Expected: build succeeds (the `/[locale]/wechat-ai` route compiles with the new client component).

- [ ] **Step 2: Manual smoke (optional but recommended)**

Run: `npm run dev`, open `/zh/wechat-ai`:
- 默认看到「默认通过站点网关接入」徽标,折叠的「高级设置」。
- 展开 → 选 Anthropic → Base URL/协议/模型自动变为 `https://api.anthropic.com` / Anthropic Messages / `claude-opus-4-8`。
- 填密钥 → 复制 → 提示词第 2 步含 Anthropic 端点与 extended thinking。
- 刷新页面 → 高级设置保留;密钥需重填。

- [ ] **Step 3: Final commit (if any cleanup)**

```bash
git add -A
git commit -m "chore: finalize WeChat AI advanced settings" || echo "nothing to commit"
```

---

## 自检对照(spec coverage)

- 厂商预设单一数据源 → Task 1 ✅
- 提示词按 Base URL/协议/模型生成,默认逐字节不变 → Task 2 ✅
- 各协议「深度思考」措辞(openai/anthropic/gemini) → Task 2 ✅
- 禁词扫描收窄到简单模式 → Task 3 ✅
- 双语 `advanced.*` 文案 → Task 4 ✅
- 折叠面板 UI(厂商+Base URL+协议+模型) → Task 5 ✅
- 默认标识徽标 → Task 6 Step 4 ✅
- 选厂商预填、可逐项改写 → Task 5/Task 6 `handleProviderChange` ✅
- 仅持久化非敏感项,密钥不存 → Task 6 Step 2(只存 providerId/baseUrl/protocol/model)✅
- localStorage 不可用静默降级 → Task 6 try/catch ✅
- 空值回落默认 → Task 6 Step 3 ✅
- 测试与构建验证 → Task 2/3/4/6/7 ✅
- Google 默认模型 `gemini-3.1-pro-preview` → Task 1/Task 2 ✅
