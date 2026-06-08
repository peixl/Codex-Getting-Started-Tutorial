'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import { CopyButton } from '@/components/CopyButton';
import { GlassCard, GlassPanel } from '@/components/GlassCard';
import { buildWeChatAiPrompt } from '@/lib/wechatAiPrompt';
import { AdvancedSettings } from '@/components/wechat-ai/AdvancedSettings';
import {
  matchProviderId,
  resolveProviderPreset,
  type WeChatAiProtocol,
  type WeChatAiProviderId,
} from '@/lib/wechatAiProviders';
import {
  CheckIcon,
  ChatBubbleIcon,
  CopyIcon,
  ShieldIcon,
  SparkleIcon,
} from '@/components/icons';

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function WechatAiApp({ locale, dict }: Props) {
  const [accessKey, setAccessKey] = useState('');
  const [copied, setCopied] = useState(false);
  const valid = accessKey.trim().length > 0;

  const STORAGE_KEY = 'wechat-ai-advanced';
  const [baseUrl, setBaseUrl] = useState('https://www.packyapi.com/v1');
  const [protocol, setProtocol] = useState<WeChatAiProtocol>('openai');
  const [model, setModel] = useState('gpt-5.5');

  // Derive the provider from the actual config so the selector and badge can
  // never disagree with what will be used.
  const providerId: WeChatAiProviderId = matchProviderId({ baseUrl, protocol, model });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<{
        baseUrl: string;
        protocol: WeChatAiProtocol;
        model: string;
      }>;
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
        JSON.stringify({ baseUrl, protocol, model }),
      );
    } catch {
      // ignore unwritable/private-mode storage
    }
  }, [baseUrl, protocol, model]);

  const handleProviderChange = (id: WeChatAiProviderId) => {
    const preset = resolveProviderPreset(id);
    setBaseUrl(preset.baseUrl);
    setProtocol(preset.protocol);
    setModel(preset.model);
    setCopied(false);
  };

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

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 5200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const steps = [
    {
      icon: <ShieldIcon size={22} />,
      title: dict.wechatAi.step1Title,
      body: dict.wechatAi.step1Body,
    },
    {
      icon: <CopyIcon size={22} />,
      title: dict.wechatAi.step2Title,
      body: dict.wechatAi.step2Body,
    },
    {
      icon: <ChatBubbleIcon size={22} />,
      title: dict.wechatAi.step3Title,
      body: dict.wechatAi.step3Body,
    },
  ];

  const guardrails = [
    dict.wechatAi.guard1,
    dict.wechatAi.guard2,
    dict.wechatAi.guard3,
  ];

  const defaults = [
    dict.wechatAi.default1,
    dict.wechatAi.default2,
    dict.wechatAi.default3,
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <GlassCard key={step.title} className="p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/80 text-ink">
                {step.icon}
              </span>
              <span className="text-[12px] font-semibold text-ink-mute">
                {locale === 'zh' ? `第 ${index + 1} 步` : `Step ${index + 1}`}
              </span>
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-[13px] leading-[1.75] text-ink-soft">{step.body}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-5">
          <GlassPanel>
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/80 text-ink">
                <SparkleIcon size={22} />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-ink">
                  {dict.wechatAi.formTitle}
                </h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
                  {dict.wechatAi.formBody}
                </p>
              </div>
            </div>

            <label
              htmlFor="wechat-access-key"
              className="mb-2 block text-[13px] font-semibold text-ink"
            >
              {dict.wechatAi.keyLabel}
            </label>
            <input
              id="wechat-access-key"
              type="password"
              value={accessKey}
              onChange={(event) => {
                setAccessKey(event.target.value);
                setCopied(false);
              }}
              placeholder={dict.wechatAi.keyPlaceholder}
              autoComplete="off"
              spellCheck={false}
              className="glass-input text-base"
            />
            <p className="mt-2 text-[11.5px] leading-relaxed text-ink-mute">
              {dict.wechatAi.keyHint}
            </p>

            {!valid && (
              <div
                role="status"
                className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 px-3.5 py-2 text-[12px] text-amber-800"
              >
                {dict.wechatAi.validationMissingKey}
              </div>
            )}

            {copied && (
              <div
                role="status"
                className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-2 text-[12px] leading-relaxed text-emerald-800"
              >
                {dict.wechatAi.copyNext}
              </div>
            )}

            <div className="mt-5">
              <CopyButton
                value={prompt}
                label={dict.wechatAi.copyButton}
                copiedLabel={dict.wechatAi.copied}
                failedLabel={dict.wechatAi.copyFailed}
                variant="primary"
                disabled={!valid}
                disabledTitle={dict.wechatAi.validationMissingKey}
                onCopied={() => setCopied(true)}
                className="w-full sm:w-auto"
              />
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-ink-mute">
              {dict.wechatAi.privacyNote}
            </p>

            {providerId === 'default' ? (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50/80 px-3 py-1 text-[11px] font-medium text-emerald-800">
                <CheckIcon size={12} strokeWidth={3} />
                {dict.wechatAi.defaultBadge}
              </p>
            ) : (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-white/70 px-3 py-1 text-[11px] font-medium text-ink-soft">
                <SparkleIcon size={12} />
                {dict.wechatAi.customBadge}
              </p>
            )}

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
              onReset={() => handleProviderChange('default')}
            />
          </GlassPanel>

          <GlassPanel>
            <h3 className="text-[14px] font-semibold text-ink">
              {dict.wechatAi.defaultsTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {defaults.map((item) => (
                <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <CheckIcon size={13} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <GlassPanel>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-[14px] font-semibold text-ink">
                  {dict.wechatAi.copyTitle}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">
                  {dict.wechatAi.copyHint}
                </p>
              </div>
              <CopyButton
                value={prompt}
                label={dict.wechatAi.copyButtonShort}
                copiedLabel={dict.wechatAi.copied}
                failedLabel={dict.wechatAi.copyFailed}
                variant="chip"
                size="sm"
                disabled={!valid}
                disabledTitle={dict.wechatAi.validationMissingKey}
                onCopied={() => setCopied(true)}
              />
            </div>

            <div className="rounded-2xl border border-[color:var(--line)] bg-white/65 p-4">
              <ol className="space-y-3">
                {steps.map((step, index) => (
                  <li key={`copy-${step.title}`} className="flex gap-3 text-[13px] leading-relaxed text-ink-soft">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>
                      <span className="font-semibold text-ink">{step.title}</span>
                      {' · '}
                      {step.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </GlassPanel>

          <GlassPanel className="mt-4">
            <h3 className="text-[14px] font-semibold text-ink">
              {dict.wechatAi.guardTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {guardrails.map((item, index) => (
                <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-ink-soft">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
