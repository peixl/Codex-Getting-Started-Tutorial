import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { GlassCard, GlassPanel } from '@/components/GlassCard';
import { StructuredData } from '@/components/StructuredData';
import { Section } from '@/components/Section';
import { LinkButton } from '@/components/Button';
import { SITE_URL, localePath } from '@/lib/routes';
import {
  ArrowRightIcon,
  BookIcon,
  ChatBubbleIcon,
  CheckIcon,
  LightBulbIcon,
  MacWindowIcon,
  PuzzleIcon,
  RocketIcon,
  SparkleIcon,
  WindowsIcon,
} from '@/components/icons';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);
  return {
    title: dict.guide.pageTitle,
    description: dict.guide.pageSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${rawLocale}/guide`,
      languages: {
        'zh-CN': `${SITE_URL}/zh/guide`,
        'en-US': `${SITE_URL}/en/guide`,
      },
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const sections = [
    { id: 'what', title: dict.guide.sec1Title, icon: <BookIcon size={22} /> },
    { id: 'prep', title: dict.guide.sec2Title, icon: <PuzzleIcon size={22} /> },
    { id: 'first-open', title: dict.guide.sec3Title, icon: <MacWindowIcon size={22} /> },
    { id: 'core-actions', title: dict.guide.sec4Title, icon: <ChatBubbleIcon size={22} /> },
    { id: 'good-prompts', title: dict.guide.sec5Title, icon: <LightBulbIcon size={22} /> },
    { id: 'pitfalls', title: dict.guide.sec6Title, icon: <SparkleIcon size={22} /> },
    { id: 'stop', title: dict.guide.secStopTitle, icon: <CheckIcon size={22} /> },
    { id: 'share', title: dict.guide.sec7Title, icon: <RocketIcon size={22} /> },
  ];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: dict.guide.pageTitle,
    description: dict.guide.pageSubtitle,
    articleSection: sections.map((s) => s.title),
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    datePublished: '2026-01-01',
    author: { '@type': 'Organization', name: 'codex.ifq.ai' },
  };

  return (
    <>
      <StructuredData data={ld} />
      <Section title={dict.guide.pageTitle} subtitle={dict.guide.pageSubtitle} align="left">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <GlassCard variant="subtle" className="p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {dict.guide.tocTitle}
              </h3>
              <nav>
                <ol className="space-y-1 text-sm">
                  {sections.map((s, idx) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="focus-ring block rounded-xl px-3 py-2 text-slate-600 transition hover:bg-white/70 hover:text-slate-900"
                      >
                        <span className="mr-2 text-xs font-semibold text-slate-400">
                          0{idx + 1}
                        </span>
                        {s.title.replace(/^第[一二三四五六七八]章 · /, '').replace(/^Chapter \d+ — /, '')}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </GlassCard>
          </aside>

          <div className="space-y-10">
            <GuideSection id="what" title={dict.guide.sec1Title} icon={<BookIcon size={22} />}>
              <p className="prose-paragraph">{dict.guide.sec1P1}</p>
              <p className="prose-paragraph">{dict.guide.sec1P2}</p>
              <p className="prose-paragraph">{dict.guide.sec1P3}</p>
            </GuideSection>

            <GuideSection id="prep" title={dict.guide.sec2Title} icon={<PuzzleIcon size={22} />}>
              <div className="grid gap-4 md:grid-cols-2">
                <GuideItem
                  icon={<MacWindowIcon size={20} />}
                  title={dict.guide.sec2Item1Title}
                  body={dict.guide.sec2Item1Body}
                />
                <GuideItem
                  icon={<ChatBubbleIcon size={20} />}
                  title={dict.guide.sec2Item2Title}
                  body={dict.guide.sec2Item2Body}
                />
                <GuideItem
                  icon={<WindowsIcon size={20} />}
                  title={dict.guide.sec2Item3Title}
                  body={dict.guide.sec2Item3Body}
                />
                <GuideItem
                  icon={<LightBulbIcon size={20} />}
                  title={dict.guide.sec2Item4Title}
                  body={dict.guide.sec2Item4Body}
                />
              </div>
            </GuideSection>

            <GuideSection id="first-open" title={dict.guide.sec3Title} icon={<MacWindowIcon size={22} />}>
              <p className="prose-paragraph">{dict.guide.sec3P1}</p>
              <p className="prose-paragraph">{dict.guide.sec3P2}</p>
              <p className="prose-paragraph">{dict.guide.sec3P3}</p>
            </GuideSection>

            <GuideSection id="core-actions" title={dict.guide.sec4Title} icon={<ChatBubbleIcon size={22} />}>
              <div className="space-y-3">
                <GuideRow title={dict.guide.sec4Item1Title} body={dict.guide.sec4Item1Body} />
                <GuideRow title={dict.guide.sec4Item2Title} body={dict.guide.sec4Item2Body} />
                <GuideRow title={dict.guide.sec4Item3Title} body={dict.guide.sec4Item3Body} />
                <GuideRow title={dict.guide.sec4Item4Title} body={dict.guide.sec4Item4Body} />
                <GuideRow title={dict.guide.sec4Item5Title} body={dict.guide.sec4Item5Body} />
              </div>
            </GuideSection>

            <GuideSection id="good-prompts" title={dict.guide.sec5Title} icon={<LightBulbIcon size={22} />}>
              <div className="space-y-3">
                <GuideRow title={dict.guide.sec5Rule1Title} body={dict.guide.sec5Rule1Body} />
                <GuideRow title={dict.guide.sec5Rule2Title} body={dict.guide.sec5Rule2Body} />
                <GuideRow title={dict.guide.sec5Rule3Title} body={dict.guide.sec5Rule3Body} />
                <GuideRow title={dict.guide.sec5Rule4Title} body={dict.guide.sec5Rule4Body} />
                <GuideRow title={dict.guide.sec5Rule5Title} body={dict.guide.sec5Rule5Body} />
              </div>
            </GuideSection>

            <GuideSection id="pitfalls" title={dict.guide.sec6Title} icon={<SparkleIcon size={22} />}>
              <div className="grid gap-4 md:grid-cols-2">
                <GuideItem title={dict.guide.sec6Pit1Title} body={dict.guide.sec6Pit1Body} />
                <GuideItem title={dict.guide.sec6Pit2Title} body={dict.guide.sec6Pit2Body} />
                <GuideItem title={dict.guide.sec6Pit3Title} body={dict.guide.sec6Pit3Body} />
                <GuideItem title={dict.guide.sec6Pit4Title} body={dict.guide.sec6Pit4Body} />
              </div>
            </GuideSection>

            <GuideSection id="stop" title={dict.guide.secStopTitle} icon={<CheckIcon size={22} />}>
              <div className="grid gap-4 md:grid-cols-2">
                <GuideItem title={dict.guide.secStopItem1Title} body={dict.guide.secStopItem1Body} />
                <GuideItem title={dict.guide.secStopItem2Title} body={dict.guide.secStopItem2Body} />
                <GuideItem title={dict.guide.secStopItem3Title} body={dict.guide.secStopItem3Body} />
                <GuideItem title={dict.guide.secStopItem4Title} body={dict.guide.secStopItem4Body} />
              </div>
            </GuideSection>

            <GuideSection id="share" title={dict.guide.sec7Title} icon={<RocketIcon size={22} />}>
              <p className="prose-paragraph">{dict.guide.sec7P1}</p>
              <p className="prose-paragraph">{dict.guide.sec7P2}</p>
              <p className="prose-paragraph">{dict.guide.sec7P3}</p>
            </GuideSection>

            <GlassPanel className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {dict.guide.nextStepTitle}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <LinkButton
                  href={localePath(locale, 'generator')}
                  variant="primary"
                >
                  {dict.guide.nextStepGenerator}
                  <ArrowRightIcon size={16} />
                </LinkButton>
                <LinkButton href={localePath(locale, 'lessons')} variant="glass">
                  {dict.guide.nextStepLessons}
                </LinkButton>
                <LinkButton href={localePath(locale, 'cookbook')} variant="glass">
                  {dict.guide.nextStepCookbook}
                </LinkButton>
                <LinkButton href={localePath(locale, 'cases')} variant="glass">
                  {dict.guide.nextStepCases}
                </LinkButton>
              </div>
            </GlassPanel>
          </div>
        </div>
      </Section>
    </>
  );
}

function GuideSection({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <GlassPanel>
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 text-aurora-violet">
            {icon}
          </span>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">{title}</h2>
        </div>
        <div className="space-y-3 text-[15px] leading-[1.85] text-slate-700">{children}</div>
      </GlassPanel>
    </section>
  );
}

function GuideItem({
  icon,
  title,
  body,
}: {
  icon?: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/55 p-5 backdrop-blur-xl shadow-glass-sm">
      <div className="mb-2 flex items-center gap-2">
        {icon && <span className="text-aurora-violet">{icon}</span>}
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      </div>
      <p className="text-sm leading-[1.8] text-slate-600">{body}</p>
    </div>
  );
}

function GuideRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/55 bg-white/45 p-4 backdrop-blur-xl">
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      <p className="mt-1 text-sm leading-[1.8] text-slate-600">{body}</p>
    </div>
  );
}
