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

【第 3 步：接入微信，并生成清晰可扫的二维码】
- 在终端执行（保留完整输出，方便读取链接）：
\`\`\`bash
npx -y @tencent-weixin/openclaw-weixin-cli@latest install
\`\`\`
- 保持输出可见，直到出现二维码和登录链接。
- 终端直接渲染的二维码经常因字体、编码或窗口宽度问题变成乱码、无法扫描。所以不要让用户扫终端里的二维码，而是按下面方式用链接重新生成一张清晰的二维码图片：
  1. 从命令输出中提取微信登录/确认用的 URL 链接（通常是一条 https 开头的链接）。
  2. 把这条 URL 生成为一张二维码**图片文件**（PNG 或 SVG），不要用字符拼出来的二维码。要求：纠错等级 M 或更高、四周留白（quiet zone）≥ 2 个模块、每个模块约 8–10 像素、整张约 400–600 像素见方，保证清晰可辨、方便扫码。
  3. 用本地任意一种可用工具生成即可，例如（哪个能用就用哪个，并按上面的要求调整参数）：
     - \`qrencode -o wechat-login.png -s 10 -m 2 "<URL>"\`
     - \`npx -y qrcode "<URL>" -o wechat-login.png\`
     - Python：\`python3 -c "import qrcode; qrcode.make('<URL>').save('wechat-login.png')"\`（缺库就先 \`pip install 'qrcode[pil]'\`）
  4. 生成成功后，用系统默认看图程序打开这张图片（macOS：\`open wechat-login.png\`；Windows：\`start wechat-login.png\`；Linux：\`xdg-open wechat-login.png\`）。
- 然后暂停自动推进，用普通话告诉用户：请用微信扫描刚打开的这张二维码图片完成确认；如果不方便扫码，也可以直接打开这条链接：<URL>。
- 如果几种生成方式都失败，就把这条 URL 清楚地展示给用户，让其在手机微信里打开，绝不要让用户去扫乱码的终端二维码。
- 用户完成扫码或打开链接后，再检查流程是否完成。

【完成标准】
- OpenClaw 已安装并能正常打开或响应。
- ${model} 已按指定地址和 Key 配好，深度思考已开启。
- 微信接入命令已运行，并已根据登录链接生成一张清晰可扫的二维码图片展示给用户（必要时同时给出链接）。
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

[Step 3: Connect WeChat and generate a clean, scannable QR code]
- Run this in the terminal (keep the full output so the link stays readable):
\`\`\`bash
npx -y @tencent-weixin/openclaw-weixin-cli@latest install
\`\`\`
- Keep the output visible until the QR code and login link appear.
- The QR code rendered directly in the terminal often turns into garbled, unscannable characters because of font, encoding, or window-width issues. So do not ask the user to scan the terminal QR code. Instead, regenerate a clean QR image from the link:
  1. Extract the WeChat login/confirmation URL from the command output (usually an https link).
  2. Turn that URL into a QR **image file** (PNG or SVG) — not an ASCII/character QR. Requirements: error correction level M or higher, a quiet zone of >= 2 modules, about 8–10 pixels per module, and a final image around 400–600 pixels square so it stays crisp and easy to scan.
  3. Use any local tool that works, for example (use whichever is available and adjust flags to meet the requirements above):
     - \`qrencode -o wechat-login.png -s 10 -m 2 "<URL>"\`
     - \`npx -y qrcode "<URL>" -o wechat-login.png\`
     - Python: \`python3 -c "import qrcode; qrcode.make('<URL>').save('wechat-login.png')"\` (if the library is missing, run \`pip install 'qrcode[pil]'\` first)
  4. Once generated, open the image with the system default viewer (macOS: \`open wechat-login.png\`; Windows: \`start wechat-login.png\`; Linux: \`xdg-open wechat-login.png\`).
- Then pause automatic progress and tell the user plainly: scan with WeChat the QR image that just opened; if scanning is inconvenient, open this link instead: <URL>.
- If every generation method fails, show the URL clearly so the user can open it in WeChat on their phone. Never ask the user to scan the garbled terminal QR code.
- After the user completes scanning or opens the link, check that the flow is complete.

[Done Means]
- OpenClaw is installed and can open or respond normally.
- ${model} is configured with the specified address and Key, with deep thinking enabled.
- The WeChat connection command ran, and a clean, scannable QR image was generated from the login link and shown to the user (with the link as a fallback).
- After the user confirms by scanning or opening the link, tell the user that the new AI assistant is ready in WeChat.`;
}
