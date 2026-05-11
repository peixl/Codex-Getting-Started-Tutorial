'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import {
  buildPrompt,
  DEFAULT_FORM,
  quickTemplates,
  type FormState,
  type PromptLang,
} from '@/lib/promptBuilder';
import { GlassPanel } from '@/components/GlassCard';
import { CopyButton } from '@/components/CopyButton';
import { cn } from '@/lib/cn';
import { GeneratorForm } from './GeneratorForm';
import { SparkleIcon, LightBulbIcon, WindowsIcon, MacWindowIcon } from '@/components/icons';

type Props = {
  locale: Locale;
  dict: Dictionary;
};

type HistoryEntry = {
  id: string;
  savedAt: string;
  lang: PromptLang;
  state: FormState;
};

const STORAGE_KEY = 'codex-tutorial:generator:v2';
const HISTORY_KEY = 'codex-tutorial:generator:history:v2';
const MAX_HISTORY = 6;

function normalizeFormState(state?: Partial<FormState>): FormState {
  return {
    ...DEFAULT_FORM,
    ...(state ?? {}),
    extras: { ...DEFAULT_FORM.extras, ...(state?.extras ?? {}) },
  };
}

export function GeneratorApp({ locale, dict }: Props) {
  const [state, setState] = useState<FormState>(DEFAULT_FORM);
  const [lang, setLang] = useState<PromptLang>(locale);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { state?: FormState };
        if (parsed.state) setState(normalizeFormState(parsed.state));
      }
      const historyRaw = window.localStorage.getItem(HISTORY_KEY);
      if (historyRaw) {
        setHistory(JSON.parse(historyRaw) as HistoryEntry[]);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    setLang(locale);
  }, [locale]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ state }));
    } catch {
      // ignore
    }
  }, [state, loaded]);

  const update = (partial: Partial<FormState>) =>
    setState((prev) => ({ ...prev, ...partial }));

  const prompt = useMemo(() => buildPrompt(state, lang), [state, lang]);

  const valid = state.goal.trim().length > 0 && state.features.trim().length > 0;

  const validationMessage = useMemo(() => {
    if (!state.goal.trim()) return dict.generator.validationMissingGoal;
    if (!state.features.trim()) return dict.generator.validationMissingFeatures;
    return '';
  }, [state.goal, state.features, dict]);

  const reset = () => {
    setState(normalizeFormState());
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const applyTemplate = (partial: Partial<FormState>) => {
    setState((prev) => ({
      ...DEFAULT_FORM,
      ...prev,
      ...partial,
      extras: { ...DEFAULT_FORM.extras, ...prev.extras, ...(partial.extras ?? {}) },
    }));
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const saveToHistory = () => {
    if (!valid) return;
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      savedAt: new Date().toISOString(),
      lang,
      state,
    };
    const next = [entry, ...history].slice(0, MAX_HISTORY);
    setHistory(next);
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const loadHistory = (entry: HistoryEntry) => {
    setState(normalizeFormState(entry.state));
    setLang(entry.lang);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const deleteHistory = (id: string) => {
    const next = history.filter((h) => h.id !== id);
    setHistory(next);
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      window.localStorage.removeItem(HISTORY_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick templates */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-[14px] font-semibold text-ink">
            {dict.generator.quickTemplatesTitle}
          </h3>
          <p className="hidden text-[11.5px] text-ink-mute md:block">
            {dict.generator.quickTemplatesHint}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {quickTemplates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => applyTemplate(t.state)}
              className="focus-ring group rounded-2xl border border-[color:var(--line)] bg-white/65 p-4 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white text-ink">
                  <LightBulbIcon size={16} />
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="chip">
                    <WindowsIcon size={10} />
                    Windows
                  </span>
                  <span className="chip">
                    <MacWindowIcon size={10} />
                    Mac
                  </span>
                </div>
              </div>
              <h4 className="mt-3 text-[13.5px] font-semibold leading-snug text-ink">
                {locale === 'zh' ? t.titleZh : t.titleEn}
              </h4>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">
                {locale === 'zh' ? t.taglineZh : t.taglineEn}
              </p>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <div className="mb-3 rounded-2xl border border-[color:var(--line)] bg-white/60 px-4 py-3 text-[12px] text-ink-soft backdrop-blur-xl">
            <span className="mr-2 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
              {dict.generator.tipCardTitle}
            </span>
            {dict.generator.tipCardBody}
          </div>
          <GeneratorForm state={state} update={update} dict={dict} locale={locale} />
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={reset}
              className="focus-ring inline-flex items-center gap-1 rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-[12px] font-medium text-ink-soft backdrop-blur-xl transition hover:bg-white hover:text-ink"
            >
              {dict.generator.resetButton}
            </button>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <GlassPanel className="relative overflow-hidden">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <SparkleIcon size={18} />
                <h3 className="text-[14px] font-semibold text-ink">
                  {dict.generator.sectionOutput}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div
                  role="radiogroup"
                  aria-label={dict.generator.langToggle}
                  className="inline-flex rounded-full border border-[color:var(--line)] bg-white/70 p-0.5 text-[11px] font-semibold backdrop-blur-xl"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={lang === 'zh'}
                    onClick={() => setLang('zh')}
                    className={cn(
                      'focus-ring rounded-full px-2.5 py-1 transition',
                      lang === 'zh'
                        ? 'bg-ink text-white'
                        : 'text-ink-soft hover:text-ink'
                    )}
                  >
                    中文
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={lang === 'en'}
                    onClick={() => setLang('en')}
                    className={cn(
                      'focus-ring rounded-full px-2.5 py-1 transition',
                      lang === 'en'
                        ? 'bg-ink text-white'
                        : 'text-ink-soft hover:text-ink'
                    )}
                  >
                    EN
                  </button>
                </div>
                <CopyButton
                  value={prompt}
                  label={dict.generator.copyButton}
                  copiedLabel={dict.generator.copied}
                  variant="primary"
                  size="sm"
                  onCopied={saveToHistory}
                  disabled={!valid}
                  disabledTitle={validationMessage}
                />
              </div>
            </div>
            <p className="mb-3 text-[12px] leading-relaxed text-ink-soft">
              {dict.generator.outputHint}
            </p>
            {!valid && (
              <div
                role="status"
                className="mb-3 rounded-xl border border-amber-200 bg-amber-50/80 px-3.5 py-2 text-[12px] text-amber-800"
              >
                {validationMessage}
              </div>
            )}
            <p className="mb-3 text-[11px] leading-relaxed text-ink-mute">
              {dict.generator.langToggleHint}
            </p>
            <pre className="max-h-[520px] overflow-auto rounded-2xl border border-[color:var(--line)] bg-[#0F1115] p-4 text-[12.5px] leading-[1.75] text-[#E5E7EB]">
              <code className="whitespace-pre-wrap break-words">{prompt}</code>
            </pre>
          </GlassPanel>

          <GlassPanel className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-[13px] font-semibold text-ink">
                {dict.generator.historyTitle}
              </h4>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={clearHistory}
                  className="focus-ring text-[11px] text-ink-mute hover:text-ink"
                >
                  {dict.generator.historyClearAll}
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <p className="text-[12px] text-ink-mute">{dict.generator.historyEmpty}</p>
            ) : (
              <ul className="space-y-2">
                {history.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-[color:var(--line)] bg-white/60 px-3 py-2 text-[12px]"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium text-ink">
                        {h.state.goal || (locale === 'zh' ? '（未填写目标）' : '(empty goal)')}
                      </div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-ink-mute">
                        {new Date(h.savedAt).toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US')} · {h.lang.toUpperCase()}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => loadHistory(h)}
                        className="focus-ring rounded-full border border-[color:var(--line)] bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ink-soft hover:bg-white hover:text-ink"
                      >
                        {dict.generator.historyLoad}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteHistory(h.id)}
                        className="focus-ring rounded-full border border-[color:var(--line)] bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ink-mute hover:bg-white hover:text-ink"
                      >
                        {dict.generator.historyDelete}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
