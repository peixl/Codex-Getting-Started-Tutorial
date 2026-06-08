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
