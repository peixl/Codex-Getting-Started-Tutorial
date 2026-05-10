import { NextResponse, type NextRequest } from 'next/server';
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  locales,
  type Locale,
} from '@/i18n/config';

function localeFromAcceptLanguage(value: string | null): Locale {
  if (!value) return defaultLocale;

  const candidates = value
    .split(',')
    .map((part) => {
      const [tag = '', qValue = 'q=1'] = part.trim().split(';');
      const q = Number(qValue.replace('q=', '')) || 0;
      return { tag: tag.toLowerCase(), q };
    })
    .sort((a, b) => b.q - a.q);

  for (const candidate of candidates) {
    if (candidate.tag.startsWith('zh')) return 'zh';
    if (candidate.tag.startsWith('en')) return 'en';
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const savedLocale = request.cookies.get(localeCookieName)?.value;
  const locale = isLocale(savedLocale ?? '')
    ? (savedLocale as Locale)
    : localeFromAcceptLanguage(request.headers.get('accept-language'));

  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (candidate) => pathname === `/${candidate}` || pathname.startsWith(`/${candidate}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
