'use client';

import { useId, useState } from 'react';
import type { Dictionary } from '@/i18n';
import {
  PROVIDER_PRESETS,
  baseUrlIssue,
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
  onReset: () => void;
};

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  onReset,
}: Props) {
  const t = dict.wechatAi.advanced;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const introId = useId();
  const baseUrlHintId = useId();

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

  const issue = baseUrlIssue(baseUrl);

  return (
    <div className="mt-5 rounded-2xl border border-[color:var(--line)] bg-white/55 px-4 py-3">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="text-[13px] font-semibold text-ink">{t.toggle}</span>
        <span className="flex items-center gap-2 text-[12px] text-ink-mute">
          <span className="max-w-[10rem] truncate">{providerLabel[providerId]}</span>
          <ChevronDownIcon
            className={`shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
              open ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p id={introId} className="mt-3 text-[11.5px] leading-relaxed text-ink-mute">
            {t.intro}
          </p>

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
                className="glass-select text-base"
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
                inputMode="url"
                value={baseUrl}
                onChange={(event) => onBaseUrlChange(event.target.value)}
                placeholder={t.baseUrlPlaceholder}
                autoComplete="off"
                spellCheck={false}
                aria-describedby={issue ? baseUrlHintId : introId}
                className="glass-input text-base"
              />
              {issue === 'insecure' && (
                <p id={baseUrlHintId} className="mt-1.5 text-[11px] leading-relaxed text-amber-700">
                  {t.baseUrlHintInsecure}
                </p>
              )}
              {issue === 'empty' && (
                <p id={baseUrlHintId} className="mt-1.5 text-[11px] leading-relaxed text-ink-mute">
                  {t.baseUrlHintEmpty}
                </p>
              )}
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
                className="glass-select text-base"
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
                className="glass-input text-base"
              />
            </div>

            {providerId !== 'default' && (
              <button
                type="button"
                onClick={onReset}
                className="text-[12px] font-semibold text-[color:var(--accent)] hover:underline"
              >
                {t.resetLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
