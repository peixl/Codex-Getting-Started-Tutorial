'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useTransition } from 'react';
import { localeCookieName, locales, type Locale, localeNames } from '@/i18n/config';
import { cn } from '@/lib/cn';

type Props = {
  currentLocale: Locale;
  compact?: boolean;
  className?: string;
};

function persistLocalePreference(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ currentLocale, compact = false, className }: Props) {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const [isPending, startTransition] = useTransition();

  const targetPath = useCallback(
    (locale: Locale) => {
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length === 0) return `/${locale}`;
      segments[0] = locale;
      return '/' + segments.join('/');
    },
    [pathname]
  );

  const switchTo = useCallback(
    (locale: Locale) => {
      if (locale === currentLocale) return;
      persistLocalePreference(locale);
      startTransition(() => {
        router.push(targetPath(locale));
      });
    },
    [currentLocale, router, targetPath]
  );

  const label = useMemo(() => {
    if (compact) return currentLocale === 'zh' ? 'EN' : '中';
    return localeNames[currentLocale === 'zh' ? 'en' : 'zh'];
  }, [compact, currentLocale]);

  const otherLocale: Locale = currentLocale === 'zh' ? 'en' : 'zh';

  return (
    <button
      type="button"
      onClick={() => switchTo(otherLocale)}
      disabled={isPending}
      aria-label={
        currentLocale === 'zh'
          ? `切换到${localeNames[otherLocale]}`
          : `Switch to ${localeNames[otherLocale]}`
      }
      className={cn(
        'focus-ring inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-white/70 px-3 py-1.5 text-[12px] font-medium text-ink-soft backdrop-blur-xl transition hover:bg-white hover:text-ink',
        isPending && 'opacity-60',
        className
      )}
    >
      <span aria-hidden="true" className="text-ink-mute">
        {currentLocale === 'zh' ? 'CN' : 'EN'}
      </span>
      <span aria-hidden="true" className="text-ink-mute">
        /
      </span>
      <span>{label}</span>
      <span className="sr-only">
        {currentLocale === 'zh'
          ? `，当前语言为${localeNames[currentLocale]}`
          : `, current language is ${localeNames[currentLocale]}`}
      </span>
    </button>
  );
}

export function LocaleList({
  currentLocale,
  className,
}: {
  currentLocale: Locale;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname() ?? '/';

  const targetPath = (locale: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${locale}`;
    segments[0] = locale;
    return '/' + segments.join('/');
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => {
            persistLocalePreference(locale);
            router.push(targetPath(locale));
          }}
          aria-current={locale === currentLocale ? 'true' : undefined}
          className={cn(
            'focus-ring rounded-full border px-3.5 py-1.5 text-xs font-medium transition',
            locale === currentLocale
              ? 'border-ink/20 bg-white text-ink'
              : 'border-[color:var(--line)] bg-white/50 text-ink-soft hover:bg-white/80'
          )}
        >
          {localeNames[locale]}
        </button>
      ))}
    </div>
  );
}
