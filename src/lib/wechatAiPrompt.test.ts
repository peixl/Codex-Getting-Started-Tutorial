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

  it('keeps user-facing WeChat AI page copy plain and comfortable', () => {
    const zhVisibleCopy = Object.values(zh.wechatAi).join('\n');
    const enVisibleCopy = Object.values(en.wechatAi).join('\n');

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
