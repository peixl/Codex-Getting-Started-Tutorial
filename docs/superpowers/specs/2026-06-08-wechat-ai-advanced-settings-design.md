# 微信 AI 高级设置(多厂商适配)设计

日期:2026-06-08
状态:待评审

## 背景

`/wechat-ai` 页面帮普通用户把 AI 接入微信。当前实现:

- `WechatAiApp.tsx` 只暴露**一个输入框**(通行密钥),调用 `buildWeChatAiPrompt()` 生成一段给 Codex 的提示词并复制。
- `wechatAiPrompt.ts` 把厂商配置**硬编码**:Base URL `https://www.packyapi.com/v1`、模型 `gpt-5.5`、OpenAI 兼容协议、reasoning effort medium/xhigh。
- 用户可见文案**刻意不含任何技术词**,且 `wechatAiPrompt.test.ts` 有一条断言会在 `API Key`/`Base URL`/`Model:`/`reasoning`/`OpenClaw`/`gpt-5.5` 等词出现在可见文案时**失败**。这是对普通用户体验的强约束。

## 目标

为高阶用户增加可配置项:**接口地址(Base URL)、接口协议(默认 OpenAI 兼容)、模型**,使 OpenAI、Anthropic、Google 等主流 AI 都能接入微信。同时:

- 普通用户的「只填一项」体验**一字不动**。
- 默认仍走现有 PackyAPI 网关,并在界面上**明确标识这是默认配置**;需要修改的用户打开「高级设置」自行修改。
- 仅持久化非敏感项(Base URL/协议/模型);通行密钥永不落盘。

## 非目标

- 不在浏览器里直接调用各厂商 API(页面只生成给 Codex 的提示词,真正的安装/配置仍由 Codex 执行)。
- 不做账号体系、不保存密钥。
- 不改简单模式的视觉与文案。

## 核心张力与解法

简单模式刻意无技术词(有测试强制),高级设置天然需要技术词。

**解法**:简单模式保持原样;新增一个**默认折叠**的「高级设置」面板,技术词只允许出现在该面板。实现上:

- 高级文案放入 `wechatAi.advanced.*` 子结构。
- 把 `wechatAiPrompt.test.ts` 里的「禁词扫描」范围从「整个 `wechatAi`」**收窄到简单模式键**(排除 `advanced` 子树)。这是本方案**唯一**改动既有测试断言之处。

## 架构

### 1. 厂商预设:单一数据源 `src/lib/wechatAiProviders.ts`(新增)

被「提示词生成」和「UI 预填」共用,保证两边一致。

```ts
export type WeChatAiProtocol = 'openai' | 'anthropic' | 'gemini';
export type WeChatAiProviderId =
  | 'default' | 'openai' | 'anthropic' | 'google' | 'custom';

export type ProviderPreset = {
  id: WeChatAiProviderId;
  baseUrl: string;      // 'custom' 为空
  protocol: WeChatAiProtocol;
  model: string;        // 'custom' 为空
};
```

预设值:

| id | Base URL | 协议 | 默认模型 |
|---|---|---|---|
| `default`(默认网关,简单模式用) | `https://www.packyapi.com/v1` | `openai` | `gpt-5.5` |
| `openai` | `https://api.openai.com/v1` | `openai` | `gpt-5.5` |
| `anthropic` | `https://api.anthropic.com` | `anthropic` | `claude-opus-4-8` |
| `google` | `https://generativelanguage.googleapis.com` | `gemini` | `gemini-3.1-pro-preview` |
| `custom` | `''` | `openai` | `''` |

说明:
- `custom` 与缺省协议 = `openai`(OpenAI 兼容),呼应「默认 openai 兼容接口」。
- Anthropic 默认模型 `claude-opus-4-8` 为当前最强且真实存在的模型 ID(已核对 claude-api 参考)。
- 选厂商后三项可逐项改写;协议字段独立,高阶用户可把 Anthropic 端点切回 OpenAI 兼容。

### 2. 提示词生成 `src/lib/wechatAiPrompt.ts`(修改)

`buildWeChatAiPrompt` 选项扩展为:

```ts
type BuildWeChatAiPromptOptions = {
  accessKey: string;
  lang: PromptLang;
  baseUrl?: string;             // 缺省 https://www.packyapi.com/v1
  protocol?: WeChatAiProtocol;  // 缺省 'openai'
  model?: string;               // 缺省 'gpt-5.5'
};
```

行为:
- **不传任何新参数时,生成结果与现状逐字节一致**(packyapi + gpt-5.5 + reasoning 措辞),现有断言不受影响。
- 第 2 步的 Base URL、模型用变量替换;标题/正文里写死的 `GPT-5.5` 改用模型变量(简单模式仍解析为 `gpt-5.5`,可见文案不受影响,因为模型词只出现在提示词里、不在 UI 文案里)。
- 第 2 步的「深度思考」措辞按协议切换(各协议对应一句自然语言指引):
  - `openai`:reasoning effort medium,复杂任务 xhigh(保持现状)。
  - `anthropic`:开启 extended thinking;effort high,复杂任务 xhigh。
  - `gemini`:开启 thinking,复杂任务调高 thinking budget。

措辞为给 Codex 看的自然语言,不是直接调用 API,故无需 SDK 绑定。

### 3. 高级设置面板 `src/components/wechat-ai/AdvancedSettings.tsx`(新增)

默认折叠的 `<details>`/受控折叠面板,内容:

- 厂商选择(下拉:默认网关 / OpenAI / Anthropic / Google / 自定义)。
- 三个字段:Base URL、协议(下拉)、模型——选厂商时预填,可逐项改写。
- 顶部一行说明:当前默认走站点网关(PackyAPI),想直连自带 Key 的官方端点可在此修改。

把这块复杂度从 `WechatAiApp` 隔离出来,保持组件聚焦。

### 4. 主组件 `WechatAiApp.tsx`(修改)

- 简单模式区块上方/旁边**明确标识默认配置**(例如「默认通过站点网关接入 · 如需自定义请展开高级设置」)。
- 接入 `AdvancedSettings`,新增 state:`providerId/baseUrl/protocol/model`。
- 这四项存 `localStorage`(键名如 `wechat-ai-advanced`),**通行密钥仍不存**;初始化时读取,缺省回落到 `default` 预设。
- 把解析后的 `{ baseUrl, protocol, model }` 传入 `buildWeChatAiPrompt`。
- 当用户处于默认预设且未改动时,传参等价于不传(保持简单模式提示词逐字节不变)。

### 5. 文案 `src/i18n/dictionaries/{zh,en}.ts`(修改)

新增 `wechatAi.advanced.*` 双语键(面向跨语言读者,与站点既有双语定位一致):面板标题、说明、厂商标签、各字段 label/placeholder、默认标识文案等。

## 数据流

```
用户 → [简单模式] 填通行密钥
     → [可选] 展开 AdvancedSettings → 选厂商/改 Base URL/协议/模型
                                   ↓ (localStorage 持久化非敏感项)
WechatAiApp 组装 { accessKey, lang, baseUrl, protocol, model }
     → buildWeChatAiPrompt() → 按协议生成提示词 → 复制给 Codex
```

## 错误处理与边界

- 高级面板留空 Base URL/模型(custom 未填):提示词回落到默认网关值并在 UI 给出轻提示,不阻断复制(与现有「缺密钥才拦」一致,密钥仍是唯一必填)。
- `localStorage` 不可用(隐私模式)时静默降级为不持久化。
- 协议与厂商解耦:允许任意组合(如 Anthropic 端点 + OpenAI 协议),由高阶用户自负。

## 测试

- `wechatAiPrompt.test.ts`:
  - 保留全部现有断言(默认调用仍输出 packyapi/gpt-5.5/reasoning 措辞)。
  - 新增:`anthropic` 预设 → 含 `https://api.anthropic.com`、`claude-opus-4-8`、extended thinking 措辞;`google` 预设 → 含 Gemini Base URL、`gemini-3.1-pro-preview`、thinking 措辞;`openai` 预设 → 含官方端点。
  - 把「可见文案禁词」断言的扫描对象从整个 `wechatAi` 收窄到简单模式键(排除 `advanced`)。
- i18n parity 测试:新增键自动覆盖(无需改测试)。
- `wechatAiProviders.ts`:可加一条断言确保每个预设 protocol/baseUrl/model 自洽(可选)。

## 关键决策(需确认)

1. **唯一改既有测试**:禁词扫描收窄到简单模式键,使高级面板可显示技术词。
2. **默认走网关 + 明确标识**:简单模式默认 PackyAPI 网关,界面标注「默认」;高级面板供自带官方 Key 直连。
3. **持久化**:仅记 Base URL/协议/模型;通行密钥永不落盘。
