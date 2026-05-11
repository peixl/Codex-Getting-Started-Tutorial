import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { GlassPanel } from '@/components/GlassCard';
import { Section } from '@/components/Section';
import { StructuredData } from '@/components/StructuredData';
import { QuestionIcon } from '@/components/icons';
import { SITE_URL } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);
  return {
    title: dict.faq.pageTitle,
    description: dict.faq.pageSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${rawLocale}/faq`,
      languages: {
        'zh-CN': `${SITE_URL}/zh/faq`,
        'en-US': `${SITE_URL}/en/faq`,
      },
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const items: Array<{ q: string; a: string }> = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
    { q: dict.faq.q6, a: dict.faq.a6 },
    { q: dict.faq.q7, a: dict.faq.a7 },
    { q: dict.faq.q8, a: dict.faq.a8 },
    { q: dict.faq.q9, a: dict.faq.a9 },
    { q: dict.faq.q10, a: dict.faq.a10 },
    { q: dict.faq.q11, a: dict.faq.a11 },
    { q: dict.faq.q12, a: dict.faq.a12 },
    { q: dict.faq.q13, a: dict.faq.a13 },
    { q: dict.faq.q14, a: dict.faq.a14 },
    { q: dict.faq.q15, a: dict.faq.a15 },
    { q: dict.faq.q16, a: dict.faq.a16 },
  ];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <>
      <StructuredData data={ld} />
      <Section title={dict.faq.pageTitle} subtitle={dict.faq.pageSubtitle} align="left">
        <div className="mx-auto max-w-3xl space-y-4">
          {items.map((it, idx) => (
            <GlassPanel key={idx}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-aurora-violet">
                      <QuestionIcon size={22} />
                    </span>
                    <h3 className="text-base font-semibold text-slate-900">{it.q}</h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 h-6 w-6 shrink-0 rounded-full border border-white/60 bg-white/70 text-center text-sm leading-5 text-slate-500 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 pl-8 text-sm leading-[1.9] text-slate-700">{it.a}</p>
              </details>
            </GlassPanel>
          ))}
        </div>
      </Section>
    </>
  );
}
