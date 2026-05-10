import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import {
  HomeHero,
  HomeFlow,
  HomeFeatures,
  HomeCasesTeaser,
  HomeTrust,
  HomeCTA,
} from '@/components/home/HomeSections';
import { StructuredData } from '@/components/StructuredData';
import { SITE_URL } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: dict.meta.siteName,
      url: `${SITE_URL}/${locale}`,
      description: dict.meta.description,
      inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/${locale}/cases?q={query}`,
        'query-input': 'required name=query',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: dict.meta.siteName,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      sameAs: ['https://openai.com', 'https://github.com'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: dict.meta.siteName,
      description: dict.meta.description,
      provider: { '@type': 'Organization', name: 'codex.ifq.ai' },
      inLanguage: [locale === 'zh' ? 'zh-CN' : 'en-US'],
      hasCourseInstance: [
        {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT30M',
        },
      ],
    },
  ];

  return (
    <>
      <StructuredData data={ld} />
      <HomeHero locale={locale} dict={dict} />
      <HomeFlow locale={locale} dict={dict} />
      <HomeFeatures locale={locale} dict={dict} />
      <HomeCasesTeaser locale={locale} dict={dict} />
      <HomeTrust locale={locale} dict={dict} />
      <HomeCTA locale={locale} dict={dict} />
    </>
  );
}
