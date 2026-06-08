import { describe, expect, it } from 'vitest';
import {
  PROVIDER_PRESETS,
  DEFAULT_PROVIDER_ID,
  resolveProviderPreset,
  matchProviderId,
  baseUrlIssue,
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

describe('matchProviderId', () => {
  it('matches the exact default preset config', () => {
    expect(
      matchProviderId({
        baseUrl: 'https://www.packyapi.com/v1',
        protocol: 'openai',
        model: 'gpt-5.5',
      }),
    ).toBe('default');
  });

  it('matches a named provider when all three fields equal its preset', () => {
    expect(
      matchProviderId({
        baseUrl: 'https://api.anthropic.com',
        protocol: 'anthropic',
        model: 'claude-opus-4-8',
      }),
    ).toBe('anthropic');
    expect(
      matchProviderId({
        baseUrl: 'https://api.openai.com/v1',
        protocol: 'openai',
        model: 'gpt-5.5',
      }),
    ).toBe('openai');
  });

  it('returns custom when the config diverges from every preset', () => {
    expect(
      matchProviderId({
        baseUrl: 'https://api.anthropic.com',
        protocol: 'anthropic',
        model: 'claude-haiku-4-5',
      }),
    ).toBe('custom');
    expect(matchProviderId({ baseUrl: '', protocol: 'openai', model: '' })).toBe('custom');
  });
});

describe('baseUrlIssue', () => {
  it('flags empty input', () => {
    expect(baseUrlIssue('')).toBe('empty');
    expect(baseUrlIssue('   ')).toBe('empty');
  });

  it('flags non-https input as insecure', () => {
    expect(baseUrlIssue('http://api.example.com')).toBe('insecure');
    expect(baseUrlIssue('api.example.com')).toBe('insecure');
  });

  it('accepts a well-formed https url', () => {
    expect(baseUrlIssue('https://api.openai.com/v1')).toBeNull();
    expect(baseUrlIssue('  https://api.anthropic.com  ')).toBeNull();
  });
});
