import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { GlassPanel } from '@/components/GlassCard';
import { Section } from '@/components/Section';
import { StructuredData } from '@/components/StructuredData';
import { CopyButton } from '@/components/CopyButton';
import { SITE_URL } from '@/lib/routes';
import { getRecipePrompt, recipes } from '@/data/recipes';
import { LightBulbIcon, WindowsIcon, MacWindowIcon } from '@/components/icons';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);
  return {
    title: dict.cookbook.pageTitle,
    description: dict.cookbook.pageSubtitle,
    alternates: {
      canonical: `${SITE_URL}/${rawLocale}/cookbook`,
      languages: {
        'zh-CN': `${SITE_URL}/zh/cookbook`,
        'en-US': `${SITE_URL}/en/cookbook`,
      },
    },
  };
}

export default async function CookbookPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: dict.cookbook.pageTitle,
    itemListElement: recipes.map((r, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: locale === 'zh' ? r.titleZh : r.titleEn,
    })),
  };

  return (
    <>
      <StructuredData data={ld} />
      <Section title={dict.cookbook.pageTitle} subtitle={dict.cookbook.pageSubtitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {recipes.map((r) => {
            const title = locale === 'zh' ? r.titleZh : r.titleEn;
            const pain = locale === 'zh' ? r.painZh : r.painEn;
            const prompt = getRecipePrompt(r, locale);
            return (
              <GlassPanel key={r.id} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white/85 text-ink">
                    <LightBulbIcon size={18} />
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="chip">
                      <WindowsIcon size={10} />
                      Windows
                    </span>
                    <span className="chip">
                      <MacWindowIcon size={10} />
                      macOS
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[13px] leading-[1.75] text-ink-soft">{pain}</p>

                <pre className="mt-4 flex-1 max-h-56 overflow-auto rounded-xl border border-[color:var(--line)] bg-[#0F1115] p-3 text-[11.5px] leading-[1.7] text-[#E5E7EB]">
                  <code className="whitespace-pre-wrap break-words">{prompt}</code>
                </pre>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] text-ink-mute">{dict.cookbook.recipeAfter}</p>
                  <CopyButton
                    value={prompt}
                    label={dict.cookbook.copyRecipe}
                    copiedLabel={dict.cases.copied}
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
