'use client';

import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import type {
  FormState,
  Platform,
  Storage,
  TechStack,
  UiStyle,
} from '@/lib/promptBuilder';
import { GlassPanel } from '@/components/GlassCard';
import { cn } from '@/lib/cn';
import { MacWindowIcon, WindowsIcon } from '@/components/icons';

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
        <div className="grid gap-3 md:grid-cols-3">
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
        <label className="sr-only" htmlFor="tech-select">
          {dict.generator.techLabel}
        </label>
        <div className="grid gap-3 md:grid-cols-2">
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
        <div className="grid gap-3 md:grid-cols-2">
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
        <div className="grid gap-3 md:grid-cols-3">
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
                'flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition',
                state.extras[item.key]
                  ? 'border-ink/20 bg-white shadow-soft'
                  : 'border-[color:var(--line)] bg-white/55 hover:bg-white/80'
              )}
            >
              <input
                type="checkbox"
                checked={state.extras[item.key]}
                onChange={(e) =>
                  update({ extras: { ...state.extras, [item.key]: e.target.checked } })
                }
                className="mt-0.5 h-4 w-4 accent-[color:var(--fg-primary)]"
              />
              <div>
                <div className="text-[13px] font-medium text-ink">{item.label}</div>
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
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'focus-ring relative flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition',
        active
          ? 'border-ink/25 bg-white shadow-soft'
          : 'border-[color:var(--line)] bg-white/55 hover:bg-white/85'
      )}
    >
      {icon && <span className="mt-0.5 text-ink">{icon}</span>}
      <span className="text-[13px] font-medium leading-relaxed text-ink">{label}</span>
      {badge && (
        <span className="ml-auto shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
          {badge}
        </span>
      )}
    </button>
  );
}
