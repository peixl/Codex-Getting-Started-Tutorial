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

type ProviderConfig = {
  baseUrl: string;
  protocol: WeChatAiProtocol;
  model: string;
};

/**
 * Derive which provider a config corresponds to. Returns the matching preset
 * id when every field equals a known (non-custom) preset, otherwise 'custom'.
 * Keeps the UI's provider selector and status badge honest about what will
 * actually be used.
 */
export function matchProviderId(config: ProviderConfig): WeChatAiProviderId {
  const found = PROVIDER_PRESETS.find(
    (preset) =>
      preset.id !== 'custom' &&
      preset.baseUrl === config.baseUrl &&
      preset.protocol === config.protocol &&
      preset.model === config.model,
  );
  return found ? found.id : 'custom';
}

export type BaseUrlIssue = 'empty' | 'insecure' | null;

/**
 * Non-blocking validation for a user-entered Base URL. 'empty' is informational
 * (falls back to the default gateway); 'insecure' warns about non-https.
 */
export function baseUrlIssue(baseUrl: string): BaseUrlIssue {
  const value = baseUrl.trim();
  if (!value) return 'empty';
  if (!/^https:\/\//i.test(value)) return 'insecure';
  return null;
}
