import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { GlassCard, GlassPanel } from '@/components/GlassCard';
import { Section } from '@/components/Section';
import { StructuredData } from '@/components/StructuredData';
import { SITE_URL } from '@/lib/routes';
import { LightBulbIcon, SparkleIcon } from '@/components/icons';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);
  return {
    title: dict.tips.pageTitle,
    description: dict.tips.pageSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${rawLocale}/tips`,
      languages: {
        'zh-CN': `${SITE_URL}/zh/tips`,
        'en-US': `${SITE_URL}/en/tips`,
      },
    },
  };
}

export default async function TipsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const tips = [
    { title: dict.tips.tip1Title, body: dict.tips.tip1Body },
    { title: dict.tips.tip2Title, body: dict.tips.tip2Body },
    { title: dict.tips.tip3Title, body: dict.tips.tip3Body },
    { title: dict.tips.tip4Title, body: dict.tips.tip4Body },
    { title: dict.tips.tip5Title, body: dict.tips.tip5Body },
    { title: dict.tips.tip6Title, body: dict.tips.tip6Body },
    { title: dict.tips.tip7Title, body: dict.tips.tip7Body },
    { title: dict.tips.tip8Title, body: dict.tips.tip8Body },
    { title: dict.tips.tip9Title, body: dict.tips.tip9Body },
    { title: dict.tips.tip10Title, body: dict.tips.tip10Body },
    { title: dict.tips.tip11Title, body: dict.tips.tip11Body },
    { title: dict.tips.tip12Title, body: dict.tips.tip12Body },
  ];

  const pitfalls = [
    { title: dict.tips.pitfall1Title, body: dict.tips.pitfall1Body },
    { title: dict.tips.pitfall2Title, body: dict.tips.pitfall2Body },
    { title: dict.tips.pitfall3Title, body: dict.tips.pitfall3Body },
    { title: dict.tips.pitfall4Title, body: dict.tips.pitfall4Body },
    { title: dict.tips.pitfall5Title, body: dict.tips.pitfall5Body },
    { title: dict.tips.pitfall6Title, body: dict.tips.pitfall6Body },
  ];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: dict.tips.pageTitle,
    description: dict.tips.pageSubtitle,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
  };

  return (
    <>
      <StructuredData data={ld} />
      <Section title={dict.tips.pageTitle} subtitle={dict.tips.pageSubtitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {tips.map((t, idx) => (
            <GlassCard key={t.title} className="p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/75 text-aurora-violet">
                  <LightBulbIcon size={20} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  TIP · 0{idx + 1}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{t.title}</h3>
              <p className="mt-2 text-sm leading-[1.8] text-slate-600">{t.body}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title={dict.tips.pitfallsTitle} align="left">
        <div className="grid gap-4 md:grid-cols-2">
          {pitfalls.map((p) => (
            <GlassPanel key={p.title}>
              <div className="mb-2 flex items-center gap-2">
                <SparkleIcon size={18} />
                <h4 className="text-sm font-semibold text-slate-900">{p.title}</h4>
              </div>
              <p className="text-sm leading-[1.8] text-slate-600">{p.body}</p>
            </GlassPanel>
          ))}
        </div>
      </Section>
    </>
  );
}
