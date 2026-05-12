import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { GlassPanel } from '@/components/GlassCard';
import { Section } from '@/components/Section';
import { StructuredData } from '@/components/StructuredData';
import { LinkButton } from '@/components/Button';
import { SITE_URL, localePath } from '@/lib/routes';
import { ArrowRightIcon, RocketIcon, CheckIcon } from '@/components/icons';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);
  return {
    title: dict.lessons.pageTitle,
    description: dict.lessons.pageSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${rawLocale}/lessons`,
      languages: {
        'zh-CN': `${SITE_URL}/zh/lessons`,
        'en-US': `${SITE_URL}/en/lessons`,
      },
    },
  };
}

export default async function LessonsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const days = [
    { title: dict.lessons.day1Title, hook: dict.lessons.day1Hook, goals: dict.lessons.day1Goals },
    { title: dict.lessons.day2Title, hook: dict.lessons.day2Hook, goals: dict.lessons.day2Goals },
    { title: dict.lessons.day3Title, hook: dict.lessons.day3Hook, goals: dict.lessons.day3Goals },
    { title: dict.lessons.day4Title, hook: dict.lessons.day4Hook, goals: dict.lessons.day4Goals },
    { title: dict.lessons.day5Title, hook: dict.lessons.day5Hook, goals: dict.lessons.day5Goals },
    { title: dict.lessons.day6Title, hook: dict.lessons.day6Hook, goals: dict.lessons.day6Goals },
    { title: dict.lessons.day7Title, hook: dict.lessons.day7Hook, goals: dict.lessons.day7Goals },
  ];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: dict.lessons.pageTitle,
    description: dict.lessons.pageSubtitle,
    provider: { '@type': 'Organization', name: 'codex.ifq.ai' },
    hasCourseInstance: days.map((d, i) => ({
      '@type': 'CourseInstance',
      name: d.title,
      courseMode: 'online',
      courseWorkload: 'PT15M',
      position: i + 1,
    })),
  };

  return (
    <>
      <StructuredData data={ld} />
      <Section title={dict.lessons.pageTitle} subtitle={dict.lessons.pageSubtitle}>
        <div className="mx-auto max-w-4xl space-y-4">
          {days.map((d, idx) => (
            <GlassPanel key={idx} className="relative">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex shrink-0 items-center gap-3 md:w-48">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white text-[13px] font-semibold">
                    {idx + 1}
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-ink-mute">
                    {dict.lessons.dayLabel.replace('{n}', String(idx + 1))}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-semibold text-ink">{d.title}</h3>
                  <p className="mt-1 text-[13px] text-ink-soft">{d.hook}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {d.goals.split(' · ').map((g, i) => (
                      <li
                        key={i}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-white/70 px-2.5 py-1 text-[12px] text-ink-soft"
                      >
                        <CheckIcon size={12} />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-[28px] border border-[color:var(--line)] bg-white/65 p-8 text-center backdrop-blur-xl">
          <RocketIcon size={28} />
          <h3 className="mt-3 text-[18px] font-semibold text-ink">
            {dict.lessons.recapTitle}
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-ink-soft">
            {dict.lessons.recapBody}
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <LinkButton href={localePath(locale, 'generator')} variant="primary">
              {dict.guide.nextStepGenerator}
              <ArrowRightIcon size={14} />
            </LinkButton>
            <LinkButton href={localePath(locale, 'cookbook')} variant="glass">
              {dict.cookbook.pageTitle}
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
