'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import { localePath } from '@/lib/routes';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CodexLogo, MenuIcon, CloseIcon } from './icons';
import { cn } from '@/lib/cn';

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function NavBar({ locale, dict }: Props) {
  const pathname = usePathname() ?? '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: localePath(locale, 'generator'), label: dict.nav.generator },
    { href: localePath(locale, 'guide'), label: dict.nav.guide },
    { href: localePath(locale, 'lessons'), label: dict.nav.lessons },
    { href: localePath(locale, 'cases'), label: dict.nav.cases },
    { href: localePath(locale, 'cookbook'), label: dict.nav.cookbook },
    { href: localePath(locale, 'tips'), label: dict.nav.tips },
    { href: localePath(locale, 'faq'), label: dict.nav.faq },
  ];

  const isActive = (href: string) => {
    if (href === localePath(locale) || href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-500',
        scrolled ? 'pt-2' : 'pt-4'
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav
          className={cn(
            'flex items-center justify-between gap-4 rounded-full border border-[color:var(--line)] backdrop-blur-2xl transition-all duration-500',
            scrolled
              ? 'bg-white/80 shadow-soft px-3 py-2'
              : 'bg-white/60 px-4 py-2.5'
          )}
          aria-label={locale === 'zh' ? '主导航' : 'Primary navigation'}
        >
          <Link
            href={localePath(locale)}
            className="focus-ring flex items-center gap-2 rounded-full pl-1 pr-3 py-1"
          >
            <CodexLogo size={28} />
            <span className="hidden text-[13px] font-semibold tracking-tight text-ink sm:inline">
              {dict.meta.siteName}
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    'focus-ring rounded-full px-3 py-1.5 text-[13px] font-medium transition',
                    isActive(l.href)
                      ? 'bg-black/5 text-ink'
                      : 'text-ink-soft hover:bg-black/5 hover:text-ink'
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} compact />
            <Link
              href={localePath(locale, 'generator')}
              className="focus-ring hidden rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-semibold text-white shadow-soft transition hover:-translate-y-0.5 sm:inline-flex"
            >
              {dict.nav.tryNow}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={locale === 'zh' ? '切换菜单' : 'Toggle menu'}
              className="focus-ring lg:hidden rounded-full p-2 text-ink-soft hover:bg-black/5"
            >
              {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            id="mobile-nav"
            className="mt-2 rounded-3xl border border-[color:var(--line)] bg-white/90 p-2 shadow-soft backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      'block rounded-2xl px-4 py-3 text-sm font-medium transition',
                      isActive(l.href)
                        ? 'bg-black/5 text-ink'
                        : 'text-ink-soft hover:bg-black/5'
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={localePath(locale, 'generator')}
                  className="mt-2 block rounded-2xl bg-ink px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  {dict.nav.tryNow}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
