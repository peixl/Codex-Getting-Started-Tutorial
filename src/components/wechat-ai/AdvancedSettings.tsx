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
