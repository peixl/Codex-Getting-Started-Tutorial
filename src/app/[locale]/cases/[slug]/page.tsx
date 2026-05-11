import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { caseBundles, getCaseBySlug, getCasePrompt, getCasesByDepartment } from '@/data/cases';
import { GlassCard, GlassPanel } from '@/components/GlassCard';
import { Section } from '@/components/Section';
import { CopyButton } from '@/components/CopyButton';
import { StructuredData } from '@/components/StructuredData';
import { LinkButton } from '@/components/Button';
import { SITE_URL, caseUrl, localePath } from '@/lib/routes';
import {
  ArrowRightIcon,
  CheckIcon,
  LightBulbIcon,
  PuzzleIcon,
  RocketIcon,
  SparkleIcon,
  FinanceIcon,
  OpsIcon,
  SupportIcon,
  HRIcon,
  LogisticsIcon,
  ProcurementIcon,
  MarketingIcon,
  LegalIcon,
  DataIcon,
  AdminIcon,
  ProductIcon,
  WindowsIcon,
} from '@/components/icons';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of ['zh', 'en']) {
    for (const c of caseBundles) {
      params.push({ locale, slug: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const bundle = getCaseBySlug(slug);
  if (!bundle) return {};
  const copy = bundle.i18n[rawLocale];
  return {
    title: copy.title,
    description: copy.summary,
    keywords: copy.keywords,
    alternates: {
      canonical: `${SITE_URL}${caseUrl(rawLocale, slug)}`,
      languages: {
        'zh-CN': `${SITE_URL}${caseUrl('zh', slug)}`,
        'en-US': `${SITE_URL}${caseUrl('en', slug)}`,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.summary,
      type: 'article',
    },
  };
}

const deptIcons = {
  finance: <FinanceIcon size={28} />,
  operations: <OpsIcon size={28} />,
  'customer-service': <SupportIcon size={28} />,
  hr: <HRIcon size={28} />,
  logistics: <LogisticsIcon size={28} />,
  procurement: <ProcurementIcon size={28} />,
  marketing: <MarketingIcon size={28} />,
  legal: <LegalIcon size={28} />,
  data: <DataIcon size={28} />,
  admin: <AdminIcon size={28} />,
  product: <ProductIcon size={28} />,
} as const;

export default async function CasePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const bundle = getCaseBySlug(slug);
  if (!bundle) notFound();
  const dict = getDictionary(locale);
  const copy = bundle.i18n[locale];
  const promptZh = getCasePrompt(bundle, 'zh');
  const promptEn = getCasePrompt(bundle, 'en');
  const localizedPrompt = locale === 'zh' ? promptZh : promptEn;
  const related = getCasesByDepartment(bundle.department).filter(
    (c) => c.slug !== bundle.slug
  );

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: copy.title,
    description: copy.summary,
    step: [
      { '@type': 'HowToStep', position: 1, name: dict.cases.after1 },
      { '@type': 'HowToStep', position: 2, name: dict.cases.after2 },
      { '@type': 'HowToStep', position: 3, name: dict.cases.after3 },
    ],
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
  };

  return (
    <>
      <StructuredData data={ld} />
      <section className="relative mx-auto max-w-5xl px-4 pt-12 pb-6 sm:px-6 lg:px-8">
        <Link
          href={localePath(locale, 'cases')}
          className="focus-ring inline-flex items-center gap-1 text-[13px] text-ink-mute transition hover:text-ink"
        >
          <span aria-hidden="true">←</span>
          {dict.cases.backToCases}
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/80 text-ink">
            {deptIcons[bundle.department]}
          </div>
          <span className="chip">{copy.departmentLabel}</span>
          <span className="chip">
            <WindowsIcon size={12} />
            {dict.cases.windowsBadge}
          </span>
        </div>
        <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-ink md:text-5xl" style={{ letterSpacing: '-0.03em' }}>
          {copy.title}
        </h1>
        <p className="mt-4 max-w-3xl text-pretty text-[15px] leading-relaxed text-ink-soft md:text-base">
          {copy.summary}
        </p>
      </section>

      <section className="relative mx-auto max-w-5xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <GlassPanel>
            <div className="mb-3 flex items-center gap-2">
              <PuzzleIcon size={20} />
              <h2 className="text-[14px] font-semibold text-ink">
                {dict.cases.sectionPain}
              </h2>
            </div>
            <p className="text-[14px] leading-[1.85] text-ink-soft">{copy.painBody}</p>
          </GlassPanel>
          <GlassPanel>
            <div className="mb-3 flex items-center gap-2">
              <LightBulbIcon size={20} />
              <h2 className="text-[14px] font-semibold text-ink">
                {dict.cases.sectionSolution}
              </h2>
            </div>
            <p className="text-[14px] leading-[1.85] text-ink-soft">{copy.solutionBody}</p>
          </GlassPanel>
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-4 pb-6 sm:px-6 lg:px-8">
        <GlassPanel>
          <div className="mb-3 flex items-center gap-2">
            <RocketIcon size={20} />
            <h2 className="text-[14px] font-semibold text-ink">
              {dict.cases.sectionExpected}
            </h2>
          </div>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {copy.expectedBullets.map((b, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <CheckIcon size={12} />
                </span>
                <span className="text-[13.5px] leading-[1.75] text-ink-soft">{b}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </section>

      <section className="relative mx-auto max-w-5xl px-4 pb-6 sm:px-6 lg:px-8">
        <GlassPanel className="relative overflow-hidden">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SparkleIcon size={20} />
              <h2 className="text-[14px] font-semibold text-ink">
                {dict.cases.sectionPrompt}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyButton
                value={promptZh}
                label={dict.cases.copyPromptZh}
                copiedLabel={dict.cases.copied}
                variant="chip"
                size="sm"
              />
              <CopyButton
                value={promptEn}
                label={dict.cases.copyPromptEn}
                copiedLabel={dict.cases.copied}
                variant="primary"
                size="sm"
              />
            </div>
          </div>
          <pre className="max-h-[480px] overflow-auto rounded-2xl border border-[color:var(--line)] bg-[#0F1115] p-4 text-[12.5px] leading-[1.75] text-[#E5E7EB]">
            <code className="whitespace-pre-wrap break-words">{localizedPrompt}</code>
          </pre>
        </GlassPanel>
      </section>

      <Section title={dict.cases.sectionAfter} className="pt-4 pb-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[dict.cases.after1, dict.cases.after2, dict.cases.after3].map((step, idx) => (
            <GlassCard key={idx} variant="subtle" className="p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white font-semibold text-[13px]">
                  {idx + 1}
                </span>
              </div>
              <p className="mt-4 text-[13.5px] leading-[1.75] text-ink-soft">{step}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <LinkButton
            href={localePath(locale, 'generator')}
            variant="primary"
            size="lg"
          >
            {dict.cases.tryInGenerator}
            <ArrowRightIcon size={16} />
          </LinkButton>
        </div>
      </Section>

      {related.length > 0 && (
        <Section title={dict.cases.relatedCases} className="pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={caseUrl(locale, r.slug)}
                className="focus-ring group rounded-3xl"
              >
                <GlassCard className="h-full p-5 transition group-hover:-translate-y-0.5 group-hover:shadow-lift">
                  <h3 className="text-[14px] font-semibold text-ink">
                    {r.i18n[locale].title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-ink-soft">
                    {r.i18n[locale].summary}
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
