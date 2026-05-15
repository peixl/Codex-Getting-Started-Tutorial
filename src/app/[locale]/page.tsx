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
import { IFQ_URL, SITE_REPOSITORY_URL, SITE_URL } from '@/lib/routes';

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
      isAccessibleForFree: true,
      license: 'https://opensource.org/license/mit',
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
      parentOrganization: {
        '@type': 'Organization',
        name: 'ifq.ai',
        url: IFQ_URL,
      },
      sameAs: [IFQ_URL, SITE_REPOSITORY_URL, 'https://openai.com/codex'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: dict.meta.siteName,
      description: dict.meta.description,
      provider: { '@type': 'Organization', name: 'ifq.ai', url: IFQ_URL },
      inLanguage: [locale === 'zh' ? 'zh-CN' : 'en-US'],
      isAccessibleForFree: true,
      license: 'https://opensource.org/license/mit',
      learningResourceType: ['Tutorial', 'Guide', 'Prompt generator'],
      teaches: [
        'OpenAI Codex desktop app basics',
        'Prompt writing for business workflows',
        'Local Windows and macOS desktop app workflows',
      ],
      audience: {
        '@type': 'Audience',
        audienceType: 'Business experts and teams',
      },
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
