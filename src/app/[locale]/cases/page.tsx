import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { caseBundles } from '@/data/cases';
import { CasesExplorer } from '@/components/cases/CasesExplorer';
import { Section } from '@/components/Section';
import { StructuredData } from '@/components/StructuredData';
import { SITE_URL, caseUrl } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);
  return {
    title: dict.cases.pageTitle,
    description: dict.cases.pageSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${rawLocale}/cases`,
      languages: {
        'zh-CN': `${SITE_URL}/zh/cases`,
        'en-US': `${SITE_URL}/en/cases`,
      },
    },
  };
}

export default async function CasesIndexPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: dict.cases.pageTitle,
    itemListElement: caseBundles.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${SITE_URL}${caseUrl(locale, c.slug)}`,
      name: c.i18n[locale].title,
    })),
  };

  return (
    <>
      <StructuredData data={ld} />
      <Section
        title={dict.cases.pageTitle}
        subtitle={dict.cases.pageSubtitle}
      >
        <CasesExplorer cases={caseBundles} locale={locale} dict={dict} />
      </Section>
    </>
  );
}
