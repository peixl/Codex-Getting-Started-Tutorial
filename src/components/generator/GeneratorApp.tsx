'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import {
  buildPrompt,
  buildRecoveryPrompt,
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

type CopiedNotice = 'prompt' | 'recovery' | null;

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

function includesAny(text: string, words: string[]) {
  const normalized = text.toLowerCase();
  return words.some((word) => normalized.includes(word.toLowerCase()));
}

export function GeneratorApp({ locale, dict }: Props) {
  const [state, setState] = useState<FormState>(DEFAULT_FORM);
  const [lang, setLang] = useState<PromptLang>(locale);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copiedNotice, setCopiedNotice] = useState<CopiedNotice>(null);
  const [recoveryNote, setRecoveryNote] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { state?: FormState };
        if (parsed.state) setState(normalizeFormState(parsed.state)); // eslint-disable-line react-hooks/set-state-in-effect -- hydration-safe localStorage restore
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
    setLang(locale); // eslint-disable-line react-hooks/set-state-in-effect -- sync prompt lang with locale
  }, [locale]);

  useEffect(() => {
    if (!copiedNotice) return;
    const timer = window.setTimeout(() => setCopiedNotice(null), 5200);
    return () => window.clearTimeout(timer);
  }, [copiedNotice]);

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
  const recoveryPrompt = useMemo(() => buildRecoveryPrompt(state, lang), [state, lang]);
  const recoveryCopyValue = useMemo(() => {
    const note = recoveryNote.trim();
    if (!note) return recoveryPrompt;
    const title = lang === 'zh' ? '【我看到的错误/日志】' : '[Observed Error / Logs]';
    return `${recoveryPrompt}\n\n${title}\n${note}`;
  }, [lang, recoveryNote, recoveryPrompt]);
  const promptHealth = useMemo(() => {
    const goal = state.goal.trim();
    const features = state.features.trim();
    const featureLines = features.split('\n').filter((line) => line.trim().length > 0);
    const requestText = `${goal}\n${features}`;
    const checks = [
      { id: 'goal', label: dict.generator.qualityGoal, ok: goal.length >= 12 },
      { id: 'features', label: dict.generator.qualityFeatures, ok: featureLines.length >= 2 },
      {
        id: 'io',
        label: dict.generator.qualityIo,
        ok:
          includesAny(requestText, ['导入', '输入', '拖入', '文件', 'Excel', 'CSV', 'import', 'input', 'file']) &&
          includesAny(requestText, ['导出', '生成', '保存', '结果', 'output', 'export', 'save', 'result']),
      },
      {
        id: 'acceptance',
        label: dict.generator.qualityAcceptance,
        ok: includesAny(requestText, ['验收', '成功', '完成', '打包', '测试', 'verify', 'test', 'done', 'package']),
      },
    ];
    const passed = checks.filter((check) => check.ok).length;
    return {
      checks,
      passed,
      total: checks.length,
      ready: passed >= 3,
    };
  }, [dict, state.features, state.goal]);

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
                    macOS
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
          <div className="mb-3 rounded-2xl border border-[color:var(--line)] bg-white/65 p-4 text-[12px] text-ink-soft backdrop-blur-xl">
            <div className="flex flex-wrap items-start gap-2">
              <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                {dict.generator.tipCardTitle}
              </span>
              <p className="min-w-0 flex-1 leading-relaxed">{dict.generator.tipCardBody}</p>
            </div>
            <ol className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                [dict.generator.promptStep1Title, dict.generator.promptStep1Body],
                [dict.generator.promptStep2Title, dict.generator.promptStep2Body],
                [dict.generator.promptStep3Title, dict.generator.promptStep3Body],
              ].map(([title, body], index) => (
                <li
                  key={title}
                  className="rounded-xl border border-[color:var(--line)] bg-white/65 px-3 py-2"
                >
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-ink">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] text-white">
                      {index + 1}
                    </span>
                    <span>{title}</span>
                  </div>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink-mute">{body}</p>
                </li>
              ))}
            </ol>
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
                  failedLabel={dict.generator.copyFailed}
                  variant="primary"
                  size="sm"
                  onCopied={() => {
                    saveToHistory();
                    setCopiedNotice('prompt');
                  }}
                  disabled={!valid}
                  disabledTitle={validationMessage}
                />
              </div>
            </div>
            <p className="mb-3 text-[12px] leading-relaxed text-ink-soft">
              {dict.generator.outputHint}
            </p>
            {copiedNotice && (
              <div
                role="status"
                className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-2 text-[12px] leading-relaxed text-emerald-800"
              >
                {copiedNotice === 'prompt'
                  ? dict.generator.copyNextPrompt
                  : dict.generator.copyNextRecovery}
              </div>
            )}
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
            <div className="mb-3 rounded-2xl border border-[color:var(--line)] bg-white/65 p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-[12.5px] font-semibold text-ink">
                  {dict.generator.qualityTitle}
                </h4>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 text-[11px] font-semibold',
                    promptHealth.ready
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  )}
                >
                  {promptHealth.ready
                    ? dict.generator.qualityReady
                    : dict.generator.qualityNeedsInput}
                </span>
              </div>
              <p className="mt-2 text-[11.5px] text-ink-mute">
                {dict.generator.qualityCoverage
                  .replace('{passed}', String(promptHealth.passed))
                  .replace('{total}', String(promptHealth.total))}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {promptHealth.checks.map((check) => (
                  <span
                    key={check.id}
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-[11px]',
                      check.ok
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-amber-200 bg-amber-50 text-amber-700'
                    )}
                  >
                    {check.ok ? dict.generator.qualityPass : dict.generator.qualityImprove}
                    {' · '}
                    {check.label}
                  </span>
                ))}
              </div>
            </div>
            <pre className="max-h-[520px] overflow-auto rounded-2xl border border-[color:var(--line)] bg-[#0F1115] p-4 text-[12.5px] leading-[1.75] text-[#E5E7EB]">
              <code className="whitespace-pre-wrap break-words">{prompt}</code>
            </pre>

            <div className="mt-4 rounded-2xl border border-[color:var(--line)] bg-white/65 p-3.5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="text-[12.5px] font-semibold text-ink">
                    {dict.generator.recoveryTitle}
                  </h4>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink-mute">
                    {dict.generator.recoveryHint}
                  </p>
                </div>
                <CopyButton
                  value={recoveryCopyValue}
                  label={dict.generator.copyRecoveryButton}
                  copiedLabel={dict.generator.copied}
                  failedLabel={dict.generator.copyFailed}
                  variant="chip"
                  size="sm"
                  onCopied={() => setCopiedNotice('recovery')}
                  disabled={!valid}
                  disabledTitle={validationMessage}
                />
              </div>
              <label
                htmlFor="recovery-note"
                className="mt-3 block text-[11.5px] font-semibold text-ink-soft"
              >
                {dict.generator.recoveryEvidenceLabel}
              </label>
              <textarea
                id="recovery-note"
                value={recoveryNote}
                onChange={(event) => setRecoveryNote(event.target.value)}
                placeholder={dict.generator.recoveryEvidencePlaceholder}
                rows={4}
                className="mt-2 w-full rounded-xl border border-[color:var(--line)] bg-white/75 px-3 py-2 text-[12px] leading-relaxed text-ink outline-none transition placeholder:text-ink-mute/70 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[rgba(10,132,255,0.18)]"
              />
              <p className="mt-1.5 text-[11px] leading-relaxed text-ink-mute">
                {dict.generator.recoveryEvidenceHint}
              </p>
            </div>
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
