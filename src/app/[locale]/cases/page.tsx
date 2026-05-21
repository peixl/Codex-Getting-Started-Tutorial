import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { caseBundles, getCasePrompt } from '@/data/cases';
import { CasesExplorer, type CasesExplorerItem } from '@/components/cases/CasesExplorer';
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

  const items: CasesExplorerItem[] = caseBundles.map((c) => {
    const copy = c.i18n[locale];
    return {
      slug: c.slug,
      department: c.department,
      title: copy.title,
      summary: copy.summary,
      departmentLabel: copy.departmentLabel,
      prompt: getCasePrompt(c, locale),
      searchHaystack: [copy.title, copy.summary, copy.departmentLabel, ...copy.keywords]
        .join(' ')
        .toLowerCase(),
    };
  });

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: dict.cases.pageTitle,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${SITE_URL}${caseUrl(locale, item.slug)}`,
      name: item.title,
    })),
  };

  return (
    <>
      <StructuredData data={ld} />
      <Section
        title={dict.cases.pageTitle}
        subtitle={dict.cases.pageSubtitle}
      >
        <CasesExplorer items={items} locale={locale} dict={dict} />
      </Section>
    </>
  );
}
