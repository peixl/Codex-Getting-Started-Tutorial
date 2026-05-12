import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { CopyButton } from '@/components/CopyButton';
import { GlassPanel } from '@/components/GlassCard';
import { Section } from '@/components/Section';
import { StructuredData } from '@/components/StructuredData';
import { ChatBubbleIcon, CheckIcon, RocketIcon, SparkleIcon } from '@/components/icons';
import { agentCases, getAgentCasePrompt } from '@/data/agentCases';
import { SITE_URL } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);
  return {
    title: dict.agentCases.pageTitle,
    description: dict.agentCases.pageSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${rawLocale}/agent-cases`,
      languages: {
        'zh-CN': `${SITE_URL}/zh/agent-cases`,
        'en-US': `${SITE_URL}/en/agent-cases`,
      },
    },
  };
}

export default async function AgentCasesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: dict.agentCases.pageTitle,
    description: dict.agentCases.pageSubtitle,
    itemListElement: agentCases.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: locale === 'zh' ? item.titleZh : item.titleEn,
    })),
  };

  return (
    <>
      <StructuredData data={ld} />
      <Section
        eyebrow={dict.agentCases.eyebrow}
        title={dict.agentCases.pageTitle}
        subtitle={dict.agentCases.pageSubtitle}
      >
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <GlassPanel className="p-6 md:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/85 text-ink">
              <SparkleIcon size={22} />
            </div>
            <h3 className="mt-5 text-[18px] font-semibold text-ink">
              {dict.agentCases.agentModeTitle}
            </h3>
            <p className="mt-3 text-[13.5px] leading-[1.8] text-ink-soft">
              {dict.agentCases.agentModeBody}
            </p>
            <ul className="mt-6 space-y-3">
              {[dict.agentCases.rule1, dict.agentCases.rule2, dict.agentCases.rule3].map((rule) => (
                <li key={rule} className="flex gap-3 text-[13px] leading-relaxed text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                    <CheckIcon size={11} />
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [dict.agentCases.stat1Value, dict.agentCases.stat1Label],
              [dict.agentCases.stat2Value, dict.agentCases.stat2Label],
              [dict.agentCases.stat3Value, dict.agentCases.stat3Label],
              [dict.agentCases.stat4Value, dict.agentCases.stat4Label],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-[color:var(--line)] bg-white/70 p-5 backdrop-blur-xl"
              >
                <div className="text-[28px] font-semibold text-ink">{value}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-ink-mute">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {agentCases.map((item) => {
            const title = locale === 'zh' ? item.titleZh : item.titleEn;
            const category = locale === 'zh' ? item.categoryZh : item.categoryEn;
            const pain = locale === 'zh' ? item.painZh : item.painEn;
            const deliverable = locale === 'zh' ? item.deliverableZh : item.deliverableEn;
            const prompt = getAgentCasePrompt(item, locale);

            return (
              <GlassPanel key={item.id} className="flex flex-col p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="chip">
                    <RocketIcon size={11} />
                    {category}
                  </span>
                  <span className="chip">
                    <ChatBubbleIcon size={11} />
                    {dict.agentCases.copyReady}
                  </span>
                </div>

                <h3 className="mt-4 text-[16px] font-semibold leading-snug text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.75] text-ink-soft">
                  {pain}
                </p>

                <div className="mt-4 rounded-2xl border border-[color:var(--line)] bg-white/70 p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
                    {dict.agentCases.deliverableLabel}
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
                    {deliverable}
                  </p>
                </div>

                <pre className="mt-4 max-h-56 flex-1 overflow-auto rounded-xl border border-[color:var(--line)] bg-[#0F1115] p-3 text-[11.5px] leading-[1.7] text-[#E5E7EB]">
                  <span className="whitespace-pre-wrap break-words">{prompt}</span>
                </pre>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] text-ink-mute">{dict.agentCases.afterCopy}</p>
                  <CopyButton
                    value={prompt}
                    label={dict.agentCases.copyPrompt}
                    copiedLabel={dict.cases.copied}
                    failedLabel={dict.generator.copyFailed}
                    variant="primary"
                    size="sm"
                  />
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </Section>
    </>
  );
}
