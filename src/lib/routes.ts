import type { Locale } from '@/i18n/config';

export const SITE_URL = 'https://codex.ifq.ai';
export const SITE_NAME = 'Codex Tutorial';
export const SITE_REPOSITORY_URL = 'https://github.com/peixl/Codex-Getting-Started-Tutorial';
export const IFQ_URL = 'https://ifq.ai';

export const AI_RESOURCE_PATHS = [
  'llms.txt',
  'llms-full.txt',
  'agent.md',
  'agents.md',
] as const;

export const AGENT_SITE_URL = 'https://agent.ifq.ai';

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
