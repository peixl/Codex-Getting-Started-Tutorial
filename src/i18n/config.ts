export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';
export const localeCookieName = 'codex-locale';

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
};

export const localeHtmlLang: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en-US',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
