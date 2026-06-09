import { describe, expect, it } from 'vitest';
import { zh } from '@/i18n/dictionaries/zh';
import { en } from '@/i18n/dictionaries/en';
import { buildWeChatAiPrompt } from './wechatAiPrompt';

describe('buildWeChatAiPrompt', () => {
  it('builds the required Chinese OpenClaw and WeChat setup prompt', () => {
    const prompt = buildWeChatAiPrompt({ accessKey: ' sk-test-123 ', lang: 'zh' });

    expect(prompt).toContain('https://openclaw.ai');
    expect(prompt).toContain('https://www.packyapi.com/v1');
    expect(prompt).toContain('gpt-5.5');
    expect(prompt).toContain('"sk-test-123"');
    expect(prompt).toContain('reasoning effort: medium');
    expect(prompt).toContain('reasoning effort: xhigh');
    expect(prompt).toContain('npx -y @tencent-weixin/openclaw-weixin-cli@latest install');
    expect(prompt).toContain('第 1 步成功后才做第 2 步');
    expect(prompt).toContain('普通用户');
    expect(prompt).not.toContain('不懂技术');
    expect(prompt).not.toContain('不要让用户理解');
  });

  it('tells Codex to regenerate a clean QR image from the link instead of the garbled terminal QR (zh)', () => {
    const prompt = buildWeChatAiPrompt({ accessKey: 'sk-x', lang: 'zh' });

    expect(prompt).toContain('乱码');
    expect(prompt).toContain('二维码图片');
    expect(prompt).toContain('提取');
    expect(prompt).toContain('wechat-login.png');
    expect(prompt).toContain('纠错等级');
  });

  it('tells Codex to regenerate a clean QR image from the link instead of the garbled terminal QR (en)', () => {
    const prompt = buildWeChatAiPrompt({ accessKey: 'sk-x', lang: 'en' });

    expect(prompt).toContain('garbled');
    expect(prompt).toContain('QR image');
    expect(prompt).toContain('Extract the WeChat login/confirmation URL');
    expect(prompt).toContain('wechat-login.png');
    expect(prompt).toContain('error correction level M');
  });

  it('builds the required English prompt', () => {
    const prompt = buildWeChatAiPrompt({ accessKey: 'sk-live', lang: 'en' });

    expect(prompt).toContain('Install OpenClaw');
    expect(prompt).toContain('Base URL: https://www.packyapi.com/v1');
    expect(prompt).toContain('Model: gpt-5.5');
    expect(prompt).toContain('"sk-live"');
    expect(prompt).toContain('step 1 must succeed before step 2');
    expect(prompt).toContain('scan with WeChat');
    expect(prompt).toContain('everyday user');
    expect(prompt).not.toContain('non-technical');
  });

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

  it('keeps user-facing WeChat AI page copy plain and comfortable', () => {
    const simpleCopy = (dict: typeof zh) => {
      const { advanced: _advanced, ...simple } = dict.wechatAi;
      return Object.values(simple).join('\n');
    };
    const zhVisibleCopy = simpleCopy(zh);
    const enVisibleCopy = simpleCopy(en);

    for (const phrase of [
      '不懂技术',
      '不会技术',
      'API Key',
      'Base URL',
      'Model:',
      'reasoning',
      'npx',
      '终端',
      '命令',
      'OpenClaw',
      'gpt-5.5',
      'GPT-5.5',
    ]) {
      expect(zhVisibleCopy).not.toContain(phrase);
    }

    for (const phrase of [
      'non-technical',
      'API Key',
      'Base URL',
      'Model:',
      'reasoning',
      'npx',
      'terminal',
      'command',
      'OpenClaw',
      'gpt-5.5',
      'GPT-5.5',
    ]) {
      expect(enVisibleCopy).not.toContain(phrase);
    }
  });
});
