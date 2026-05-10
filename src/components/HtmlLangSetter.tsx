'use client';

import { useEffect } from 'react';
import type { Locale } from '@/i18n/config';
import { localeHtmlLang } from '@/i18n/config';

export function HtmlLangSetter({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = localeHtmlLang[locale];
    }
  }, [locale]);
  return null;
}
