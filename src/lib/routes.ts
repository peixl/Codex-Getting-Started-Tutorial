import type { Locale } from '@/i18n/config';

export const SITE_URL = 'https://codex.ifq.ai';
export const SITE_NAME = 'Codex Tutorial';

export const ROUTES = {
  home: '',
  generator: 'generator',
  guide: 'guide',
  lessons: 'lessons',
  cases: 'cases',
  cookbook: 'cookbook',
  tips: 'tips',
  faq: 'faq',
} as const;

export function localePath(locale: Locale, path: string = '') {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${locale}/${trimmed}` : `/${locale}`;
}

export function caseUrl(locale: Locale, slug: string) {
  return `/${locale}/cases/${slug}`;
}

export function absoluteUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
