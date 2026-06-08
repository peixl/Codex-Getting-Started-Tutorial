import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { Section } from '@/components/Section';
import { StructuredData } from '@/components/StructuredData';
import { WechatAiApp } from '@/components/wechat-ai/WechatAiApp';
import { SITE_URL } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);
  return {
    title: dict.wechatAi.pageTitle,
    description: dict.wechatAi.pageSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${rawLocale}/wechat-ai`,
      languages: {
        'zh-CN': `${SITE_URL}/zh/wechat-ai`,
        'en-US': `${SITE_URL}/en/wechat-ai`,
      },
    },
  };
}

export default async function WechatAiPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: dict.wechatAi.pageTitle,
    description: dict.wechatAi.pageSubtitle,
    step: [
      { '@type': 'HowToStep', position: 1, name: dict.wechatAi.step1Title },
      { '@type': 'HowToStep', position: 2, name: dict.wechatAi.step2Title },
      { '@type': 'HowToStep', position: 3, name: dict.wechatAi.step3Title },
    ],
  };

  return (
    <>
      <StructuredData data={ld} />
      <Section
        eyebrow={dict.wechatAi.eyebrow}
        title={dict.wechatAi.pageTitle}
        subtitle={dict.wechatAi.pageSubtitle}
        align="left"
      >
        <WechatAiApp locale={locale} dict={dict} />
      </Section>
    </>
  );
}
