import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { GeneratorApp } from '@/components/generator/GeneratorApp';
import { Section } from '@/components/Section';
import { StructuredData } from '@/components/StructuredData';
import { SITE_URL } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);
  return {
    title: dict.generator.pageTitle,
    description: dict.generator.pageSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${rawLocale}/generator`,
      languages: {
        'zh-CN': `${SITE_URL}/zh/generator`,
        'en-US': `${SITE_URL}/en/generator`,
      },
    },
  };
}

export default async function GeneratorPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.generator.pageTitle,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Windows, macOS',
    description: dict.generator.pageSubtitle,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <StructuredData data={ld} />
      <Section
        title={dict.generator.pageTitle}
        subtitle={dict.generator.pageSubtitle}
        align="left"
      >
        <GeneratorApp locale={locale} dict={dict} />
      </Section>
    </>
  );
}
