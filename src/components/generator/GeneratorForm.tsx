'use client';

import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import type {
  FormState,
  Complexity,
  Platform,
  Storage,
  TechStack,
  UiStyle,
} from '@/lib/promptBuilder';
import { GlassPanel } from '@/components/GlassCard';
import { cn } from '@/lib/cn';
import { CheckIcon, MacWindowIcon, WindowsIcon } from '@/components/icons';

type Props = {
  state: FormState;
  update: (partial: Partial<FormState>) => void;
  dict: Dictionary;
  locale: Locale;
};

export function GeneratorForm({ state, update, dict, locale }: Props) {
  const platformOptions: Array<{
    value: Platform;
    label: string;
    icon?: React.ReactNode;
    recommended?: boolean;
  }> = [
    {
      value: 'windows',
      label: dict.generator.platformWindows,
      icon: <WindowsIcon size={20} />,
      recommended: true,
    },
    {
      value: 'mac',
      label: dict.generator.platformMac,
      icon: <MacWindowIcon size={20} />,
    },
    {
      value: 'both',
      label: dict.generator.platformBoth,
      icon: (
        <span className="inline-flex items-center gap-1">
          <WindowsIcon size={18} />
          <MacWindowIcon size={18} />
        </span>
      ),
    },
  ];

  const techOptions: Array<{ value: TechStack; label: string; recommended?: boolean }> = [
    { value: 'auto', label: dict.generator.techOptionAuto, recommended: true },
    { value: 'electron', label: dict.generator.techOptionElectron },
    { value: 'tauri', label: dict.generator.techOptionTauri },
    { value: 'pyqt', label: dict.generator.techOptionPyQt },
  ];

  const uiOptions: Array<{ value: UiStyle; label: string; recommended?: boolean }> = [
    { value: 'minimal', label: dict.generator.uiOptionMinimal, recommended: true },
    { value: 'fresh', label: dict.generator.uiOptionFresh },
    { value: 'dark', label: dict.generator.uiOptionDark },
    { value: 'business', label: dict.generator.uiOptionBusiness },
  ];

  const dataOptions: Array<{ value: Storage; label: string; recommended?: boolean }> = [
    { value: 'localFile', label: dict.generator.dataOptionLocalFile, recommended: true },
    { value: 'sqlite', label: dict.generator.dataOptionSqlite },
    { value: 'none', label: dict.generator.dataOptionNone },
  ];

  const complexityOptions: Array<{ value: Complexity; label: string; recommended?: boolean }> = [
    { value: 'starter', label: dict.generator.complexityOptionStarter },
    { value: 'standard', label: dict.generator.complexityOptionStandard, recommended: true },
    { value: 'advanced', label: dict.generator.complexityOptionAdvanced },
  ];

  const extraItems: Array<{
    key: keyof FormState['extras'];
    label: string;
    hint: string;
  }> = [
    {
      key: 'offline',
      label: dict.generator.extraOfflineLabel,
      hint: dict.generator.extraOfflineHint,
    },
    {
      key: 'exportable',
      label: dict.generator.extraExportLabel,
      hint: dict.generator.extraExportHint,
    },
    {
      key: 'bilingual',
      label: dict.generator.extraBilingualLabel,
      hint: dict.generator.extraBilingualHint,
    },
    {
      key: 'shortcut',
      label: dict.generator.extraShortcutLabel,
      hint: dict.generator.extraShortcutHint,
    },
    {
      key: 'accessibility',
      label: dict.generator.extraAccessibilityLabel,
      hint: dict.generator.extraAccessibilityHint,
    },
  ];

  const customPlaceholder =
    locale === 'zh'
      ? '例如：不要用亮色；或"生成的代码带详细中文注释"；或"界面上放一个帮助按钮，点了弹出使用说明"。'
      : 'e.g. "avoid bright colors", or "include detailed comments in code", or "add a Help button that opens a user guide popup".';

  return (
    <div className="space-y-5">
      <GlassPanel>
        <h3 className="mb-1 text-[14px] font-semibold text-ink">
          {dict.generator.sectionPlatform}
        </h3>
        <p className="mb-4 text-[12px] text-ink-mute">{dict.generator.platformHint}</p>
        <div className="grid gap-3 md:grid-cols-3" role="group" aria-label={dict.generator.sectionPlatform}>
          {platformOptions.map((opt) => (
            <OptionCard
              key={opt.value}
              active={state.platform === opt.value}
              onClick={() => update({ platform: opt.value })}
              label={opt.label}
              icon={opt.icon}
              badge={opt.recommended ? dict.generator.techHintRecommended : undefined}
            />
          ))}
        </div>
      </GlassPanel>

      <GlassPanel>
        <h3 className="mb-4 text-[14px] font-semibold text-ink">
          {dict.generator.sectionTech}
        </h3>
        <div className="grid gap-3 md:grid-cols-2" role="group" aria-label={dict.generator.sectionTech}>
          {techOptions.map((opt) => (
            <OptionCard
              key={opt.value}
              active={state.tech === opt.value}
              onClick={() => update({ tech: opt.value })}
              label={opt.label}
              badge={opt.recommended ? dict.generator.techHintRecommended : undefined}
            />
          ))}
        </div>
      </GlassPanel>

      <GlassPanel>
        <h3 className="mb-4 text-[14px] font-semibold text-ink">{dict.generator.sectionUI}</h3>
        <div className="grid gap-3 md:grid-cols-2" role="group" aria-label={dict.generator.sectionUI}>
          {uiOptions.map((opt) => (
            <OptionCard
              key={opt.value}
              active={state.ui === opt.value}
              onClick={() => update({ ui: opt.value })}
              label={opt.label}
              badge={opt.recommended ? dict.generator.techHintRecommended : undefined}
            />
          ))}
        </div>
      </GlassPanel>

      <GlassPanel>
        <h3 className="mb-4 text-[14px] font-semibold text-ink">{dict.generator.sectionData}</h3>
        <div className="grid gap-3 md:grid-cols-2" role="group" aria-label={dict.generator.sectionData}>
          {dataOptions.map((opt) => (
            <OptionCard
              key={opt.value}
              active={state.storage === opt.value}
              onClick={() => update({ storage: opt.value })}
              label={opt.label}
              badge={opt.recommended ? dict.generator.techHintRecommended : undefined}
            />
          ))}
        </div>
      </GlassPanel>

      <GlassPanel>
        <h3 className="mb-1 text-[14px] font-semibold text-ink">
          {dict.generator.sectionComplexity}
        </h3>
        <p className="mb-4 text-[12px] text-ink-mute">
          {dict.generator.complexityHint}
        </p>
        <div className="grid gap-3 md:grid-cols-2" role="group" aria-label={dict.generator.sectionComplexity}>
          {complexityOptions.map((opt) => (
            <OptionCard
              key={opt.value}
              active={state.complexity === opt.value}
              onClick={() => update({ complexity: opt.value })}
              label={opt.label}
              badge={opt.recommended ? dict.generator.techHintRecommended : undefined}
            />
          ))}
        </div>
      </GlassPanel>

      <GlassPanel>
        <label
          htmlFor="goal-input"
          className="mb-2 block text-[14px] font-semibold text-ink"
        >
          {dict.generator.sectionGoal}
        </label>
        <p className="mb-3 text-[12px] text-ink-mute">{dict.generator.goalLabel}</p>
        <textarea
          id="goal-input"
          value={state.goal}
          onChange={(e) => update({ goal: e.target.value })}
          placeholder={dict.generator.goalPlaceholder}
          rows={3}
          className="glass-textarea"
          lang={locale === 'zh' ? 'zh-CN' : 'en-US'}
        />
      </GlassPanel>

      <GlassPanel>
        <label
          htmlFor="features-input"
          className="mb-2 block text-[14px] font-semibold text-ink"
        >
          {dict.generator.sectionFeatures}
        </label>
        <p className="mb-3 text-[12px] text-ink-mute">{dict.generator.featuresLabel}</p>
        <textarea
          id="features-input"
          value={state.features}
          onChange={(e) => update({ features: e.target.value })}
          placeholder={dict.generator.featuresPlaceholder}
          rows={6}
          className="glass-textarea"
          lang={locale === 'zh' ? 'zh-CN' : 'en-US'}
        />
      </GlassPanel>

      <GlassPanel>
        <h3 className="mb-4 text-[14px] font-semibold text-ink">
          {dict.generator.sectionExtras}
        </h3>
        <div className="grid gap-2.5 md:grid-cols-2">
          {extraItems.map((item) => (
            <label
              key={item.key}
              className={cn(
                'relative flex min-h-[78px] cursor-pointer items-start gap-3 overflow-hidden rounded-2xl border px-4 py-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-[color:var(--accent)] focus-within:ring-offset-2 focus-within:ring-offset-[color:var(--surface)]',
                state.extras[item.key]
                  ? 'border-[color:var(--accent)] bg-[linear-gradient(135deg,rgba(10,132,255,0.12),rgba(255,255,255,0.96))] shadow-[0_0_0_1px_rgba(10,132,255,0.22),0_14px_34px_rgba(10,132,255,0.12)] ring-2 ring-[rgba(10,132,255,0.18)]'
                  : 'border-[color:var(--line)] bg-white/55 hover:border-[color:var(--line-strong)] hover:bg-white/85 hover:shadow-soft'
              )}
            >
              {state.extras[item.key] && (
                <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-[color:var(--accent)]" aria-hidden="true" />
              )}
              <input
                type="checkbox"
                checked={state.extras[item.key]}
                onChange={(e) =>
                  update({ extras: { ...state.extras, [item.key]: e.target.checked } })
                }
                className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--accent)]"
              />
              <div className="min-w-0 flex-1">
                <div className={cn('text-[13px] text-ink', state.extras[item.key] ? 'font-semibold' : 'font-medium')}>
                  {item.label}
                </div>
                <div className="text-[11.5px] text-ink-mute">{item.hint}</div>
              </div>
            </label>
          ))}
        </div>

        <label
          htmlFor="custom-input"
          className="mt-5 mb-2 block text-[13px] font-medium text-ink"
        >
          {locale === 'zh' ? '还想加点什么？（自定义要求，可选）' : 'Anything else? (Custom, optional)'}
        </label>
        <textarea
          id="custom-input"
          value={state.custom}
          onChange={(e) => update({ custom: e.target.value })}
          placeholder={customPlaceholder}
          rows={3}
          className="glass-textarea"
          lang={locale === 'zh' ? 'zh-CN' : 'en-US'}
        />
      </GlassPanel>
    </div>
  );
}

function OptionCard({
  active,
  onClick,
  label,
  icon,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}) {
  const hasMeta = Boolean(icon || badge || active);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'focus-ring relative min-w-0 w-full overflow-hidden rounded-2xl border px-4 py-3 text-left transition-all duration-200',
        hasMeta ? 'flex min-h-[88px] flex-col justify-between' : 'flex min-h-[76px] items-center',
        active
          ? 'border-[color:var(--accent)] bg-[linear-gradient(135deg,rgba(10,132,255,0.14),rgba(255,255,255,0.96))] pl-5 shadow-[0_0_0_1px_rgba(10,132,255,0.24),0_14px_34px_rgba(10,132,255,0.14)] ring-2 ring-[rgba(10,132,255,0.2)]'
          : 'border-[color:var(--line)] bg-white/55 hover:border-[color:var(--line-strong)] hover:bg-white/85 hover:shadow-soft'
      )}
    >
      {active && (
        <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-[color:var(--accent)]" aria-hidden="true" />
      )}
      {hasMeta && (
        <span className="flex w-full min-w-0 items-start gap-2" aria-hidden="true">
          {icon ? (
            <span
              className={cn(
                'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border px-1 transition-colors duration-200',
                active
                  ? 'border-[rgba(10,132,255,0.28)] bg-white/80 text-accent'
                  : 'border-[color:var(--line)] bg-white/60 text-ink'
              )}
            >
              {icon}
            </span>
          ) : null}
          <span className="ml-auto flex min-w-0 max-w-full flex-wrap items-center justify-end gap-1.5">
            {badge && (
              <span
                className={cn(
                  'max-w-full rounded-full px-2 py-0.5 text-center text-[10px] font-semibold leading-[1.2] tracking-normal',
                  active ? 'bg-[color:var(--accent)] text-white' : 'bg-accent-soft text-accent'
                )}
              >
                {badge}
              </span>
            )}
            {active && (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] text-white">
                <CheckIcon size={13} strokeWidth={4} />
              </span>
            )}
          </span>
        </span>
      )}
      <span
        className={cn(
          'block w-full break-words text-[13px] leading-relaxed text-ink',
          hasMeta && 'mt-2',
          active ? 'font-semibold' : 'font-medium'
        )}
      >
        {label}
      </span>
    </button>
  );
}
