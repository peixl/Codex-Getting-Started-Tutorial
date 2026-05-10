import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { locales, isLocale, type Locale, localeHtmlLang } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { AuroraBackdrop } from '@/components/AuroraBackdrop';
import { HtmlLangSetter } from '@/components/HtmlLangSetter';
import { SITE_URL } from '@/lib/routes';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);
  return {
    title: {
      default: `${dict.meta.siteName} · ${dict.meta.siteTagline}`,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
    keywords: [...dict.meta.keywords],
    alternates: {
      canonical: `${SITE_URL}/${rawLocale}`,
      languages: {
        'zh-CN': `${SITE_URL}/zh`,
        'en-US': `${SITE_URL}/en`,
        'x-default': SITE_URL,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${rawLocale}`,
      title: `${dict.meta.siteName} · ${dict.meta.siteTagline}`,
      description: dict.meta.description,
      siteName: dict.meta.siteName,
      locale: localeHtmlLang[rawLocale],
      alternateLocale: rawLocale === 'zh' ? 'en_US' : 'zh_CN',
      images: [
        {
          url: '/og-image.svg',
          width: 1200,
          height: 630,
          alt: dict.meta.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dict.meta.siteName} · ${dict.meta.siteTagline}`,
      description: dict.meta.description,
      images: ['/og-image.svg'],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <AuroraBackdrop />
      <HtmlLangSetter locale={locale} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow-glass"
      >
        {locale === 'zh' ? '跳到主要内容' : 'Skip to main content'}
      </a>
      <NavBar locale={locale} dict={dict} />
      <main id="main-content" className="relative">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
