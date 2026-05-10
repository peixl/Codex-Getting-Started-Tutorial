import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import { localePath, caseUrl } from '@/lib/routes';
import { GlassCard } from '@/components/GlassCard';
import { LinkButton } from '@/components/Button';
import {
  ArrowRightIcon,
  WindowsIcon,
  MacWindowIcon,
  WandIcon,
  ChatBubbleIcon,
  SparkleIcon,
  BookIcon,
  PuzzleIcon,
  ShieldIcon,
  RocketIcon,
  LightBulbIcon,
} from '@/components/icons';
import { caseBundles } from '@/data/cases';
import { deptIcons } from '@/components/cases/CasesExplorer';

type Props = { locale: Locale; dict: Dictionary };

export function HomeHero({ locale, dict }: Props) {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 md:pb-28 md:pt-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-center">
          <span className="chip-accent">
            <SparkleIcon size={12} />
            {dict.home.heroEyebrow}
          </span>
        </div>

        <h1 className="display-title text-balance text-center text-ink">
          {dict.home.heroTitleLine1}
          <span className="mx-2 inline-block align-baseline text-ink/90">
            {dict.home.heroTitleHighlight}
          </span>
          <br />
          <span className="mt-2 block text-ink-soft/90 font-medium">
            {dict.home.heroTitleLine2}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-[16px] leading-relaxed text-ink-soft md:text-[17px]">
          {dict.home.heroSubtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href={localePath(locale, 'generator')} variant="primary" size="lg">
            {dict.home.heroCtaPrimary}
            <ArrowRightIcon size={16} />
          </LinkButton>
          <LinkButton href={localePath(locale, 'guide')} variant="glass" size="lg">
            {dict.home.heroCtaSecondary}
          </LinkButton>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="chip">
            <WindowsIcon size={12} />
            {dict.home.heroBadgeWindows}
          </span>
          <span className="chip">
            <MacWindowIcon size={12} />
            {dict.home.heroBadgeMac}
          </span>
        </div>

        <div className="relative mt-16 md:mt-20">
          <HeroVisual locale={locale} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard value={dict.home.heroStatsValue1} label={dict.home.heroStatsLabel1} />
          <StatCard value={dict.home.heroStatsValue2} label={dict.home.heroStatsLabel2} />
          <StatCard value={dict.home.heroStatsValue3} label={dict.home.heroStatsLabel3} />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[22px] border border-[color:var(--line)] bg-white/70 px-6 py-5 text-center backdrop-blur-xl">
      <div className="text-[28px] font-semibold tracking-tight text-ink md:text-[32px]" style={{ letterSpacing: '-0.02em' }}>
        {value}
      </div>
      <div className="mt-1 text-[12px] uppercase tracking-wider text-ink-mute">{label}</div>
    </div>
  );
}

function HeroVisual({ locale }: { locale: Locale }) {
  const copy =
    locale === 'zh'
      ? {
          formWindow: 'Codex · 新建任务',
          formTitle: '你的第一个小工具',
          formMeta: 'Windows / Mac · 对账助手',
          platform: '平台 ·  Windows / Mac',
          ui: '界面 ·  简洁',
          data: '数据 ·  本地 Excel',
          goalLabel: '目标',
          goalLine1: '每月订单对账',
          goalLine2: '从两天压到一小时',
          copyButton: '复制提示词',
          appWindow: '对账助手 v1.0  ·  Desktop',
          appTitle: '对账结果',
          appMeta: '2026 年 4 月',
          matched: '匹配数',
          mismatched: '差异数',
          orderId: '订单号',
          delta: '差额',
          reason: '原因',
          reasonAmount: '金额不一致',
          reasonMissing: '银行流水缺失',
          exportButton: '导出差异 Excel',
        }
      : {
          formWindow: 'Codex · New task',
          formTitle: 'Your first tool',
          formMeta: 'Windows / Mac · Reconciliation helper',
          platform: 'Platform ·  Windows / Mac',
          ui: 'UI ·  Minimal',
          data: 'Data ·  Local Excel',
          goalLabel: 'Goal',
          goalLine1: 'Reconcile monthly orders',
          goalLine2: 'Cut work from two days to one hour',
          copyButton: 'Copy prompt',
          appWindow: 'Reconciliation Helper v1.0 · Desktop',
          appTitle: 'Reconciliation results',
          appMeta: 'April 2026',
          matched: 'Matches',
          mismatched: 'Differences',
          orderId: 'Order ID',
          delta: 'Delta',
          reason: 'Reason',
          reasonAmount: 'Amount mismatch',
          reasonMissing: 'Missing bank record',
          exportButton: 'Export difference Excel',
        };

  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="relative rounded-[32px] border border-[color:var(--line)] bg-white/60 p-3 backdrop-blur-2xl shadow-lift md:p-5">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] border border-[color:var(--line)] bg-gradient-to-br from-white/95 to-white/60">
          <svg
            viewBox="0 0 1200 675"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter id="heroBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="28" />
              </filter>
              <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8B7BFF" />
                <stop offset="100%" stopColor="#4DA3FF" />
              </linearGradient>
            </defs>
            <ellipse cx="220" cy="200" rx="220" ry="160" fill="#C5D5FF" opacity="0.5" filter="url(#heroBlur)" />
            <ellipse cx="960" cy="240" rx="240" ry="170" fill="#E8D5FF" opacity="0.4" filter="url(#heroBlur)" />
            <ellipse cx="600" cy="520" rx="280" ry="170" fill="#FFD5E5" opacity="0.4" filter="url(#heroBlur)" />

            {/* Left: Codex form card */}
            <g transform="translate(150 100)">
              <rect width="380" height="470" rx="24" fill="white" opacity="0.92" stroke="#E6E8EE" strokeWidth="1" />
              <g transform="translate(18 18)">
                <circle cx="8" cy="8" r="5.5" fill="#FF6060" opacity="0.8" />
                <circle cx="26" cy="8" r="5.5" fill="#FFBE2E" opacity="0.8" />
                <circle cx="44" cy="8" r="5.5" fill="#2ACA44" opacity="0.85" />
                <text x="190" y="11" textAnchor="middle" fontSize="11" fill="#7A7E88" fontFamily="system-ui">{copy.formWindow}</text>
              </g>
              <g transform="translate(28 60)" fontFamily="system-ui" fill="#0F1115">
                <text y="0" fontSize="17" fontWeight="700">{copy.formTitle}</text>
                <text y="26" fontSize="12" fill="#7A7E88">{copy.formMeta}</text>

                <g transform="translate(0 52)">
                  <rect width="324" height="36" rx="10" fill="#F4F4F6" />
                  <text x="14" y="23" fontSize="12" fill="#0F1115">{copy.platform}</text>
                </g>
                <g transform="translate(0 98)">
                  <rect width="324" height="36" rx="10" fill="#F4F4F6" />
                  <text x="14" y="23" fontSize="12" fill="#0F1115">{copy.ui}</text>
                </g>
                <g transform="translate(0 144)">
                  <rect width="324" height="36" rx="10" fill="#F4F4F6" />
                  <text x="14" y="23" fontSize="12" fill="#0F1115">{copy.data}</text>
                </g>
                <g transform="translate(0 190)">
                  <rect width="324" height="96" rx="10" fill="#0F1115" />
                  <text x="14" y="22" fontSize="11" fill="#9CA3AF">{copy.goalLabel}</text>
                  <text x="14" y="44" fontSize="13" fill="#E5E7EB">{copy.goalLine1}</text>
                  <text x="14" y="66" fontSize="13" fill="#E5E7EB">{copy.goalLine2}</text>
                </g>
                <g transform="translate(0 300)">
                  <rect width="140" height="36" rx="18" fill="#0F1115" />
                  <text x="48" y="23" fontSize="12" fill="white" fontWeight="600">{copy.copyButton}</text>
                </g>
              </g>
            </g>

            {/* Right: running desktop app */}
            <g transform="translate(640 130)">
              <rect width="420" height="410" rx="12" fill="white" opacity="0.96" stroke="#E6E8EE" strokeWidth="1" />
              <g transform="translate(0 0)">
                <rect width="420" height="32" rx="12" fill="#F4F4F6" />
                <text x="12" y="20" fontSize="11" fill="#7A7E88" fontFamily="system-ui">{copy.appWindow}</text>
                <g transform="translate(370 8)">
                  <rect x="0" y="0" width="14" height="14" fill="none" />
                  <path d="M2 7h10" stroke="#7A7E88" strokeWidth="1.5" />
                  <rect x="20" y="0" width="14" height="14" rx="1" stroke="#7A7E88" strokeWidth="1.3" fill="none" />
                  <path d="M40 2l8 8M48 2l-8 8" stroke="#7A7E88" strokeWidth="1.3" />
                </g>
              </g>
              <g transform="translate(24 56)" fontFamily="system-ui" fill="#0F1115">
                <text y="0" fontSize="16" fontWeight="700">{copy.appTitle}</text>
                <text y="22" fontSize="12" fill="#7A7E88">{copy.appMeta}</text>

                <g transform="translate(0 40)">
                  <rect width="180" height="74" rx="14" fill="#F4F4F6" />
                  <text x="16" y="24" fontSize="11" fill="#7A7E88">{copy.matched}</text>
                  <text x="16" y="52" fontSize="26" fontWeight="700">236</text>
                </g>
                <g transform="translate(192 40)">
                  <rect width="180" height="74" rx="14" fill="#FFF0EE" />
                  <text x="16" y="24" fontSize="11" fill="#B3261E">{copy.mismatched}</text>
                  <text x="16" y="52" fontSize="26" fontWeight="700" fill="#B3261E">14</text>
                </g>

                <g transform="translate(0 130)">
                  <rect width="372" height="1" fill="#EEEFF2" />
                </g>

                <g transform="translate(0 146)" fontSize="12">
                  <text y="0" fill="#7A7E88">{copy.orderId}</text>
                  <text x="180" y="0" fill="#7A7E88">{copy.delta}</text>
                  <text x="280" y="0" fill="#7A7E88">{copy.reason}</text>

                  <text y="28">A20260401-129</text>
                  <text x="180" y="28">¥ 12.00</text>
                  <text x="280" y="28" fill="#B3261E">{copy.reasonAmount}</text>

                  <text y="52">A20260401-134</text>
                  <text x="180" y="52">¥ 0</text>
                  <text x="280" y="52" fill="#B3261E">{copy.reasonMissing}</text>

                  <text y="76">A20260401-221</text>
                  <text x="180" y="76">¥ 8.50</text>
                  <text x="280" y="76" fill="#B3261E">{copy.reasonAmount}</text>
                </g>

                <g transform="translate(0 252)">
                  <rect width="180" height="36" rx="10" fill="#0F1115" />
                  <text x="34" y="23" fontSize="12" fill="white" fontWeight="600">{copy.exportButton}</text>
                </g>
              </g>
            </g>

            {/* Connector arrow */}
            <g fill="none" stroke="url(#heroLine)" strokeWidth="2" strokeLinecap="round">
              <path d="M530 310 C 580 300 600 300 640 335" />
              <path d="M632 329 l10 8 l-14 0 M640 335 l-3 13" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function HomeFlow({ locale, dict }: Props) {
  const steps = [
    { icon: <WandIcon size={22} />, title: dict.home.flowStep1Title, body: dict.home.flowStep1Body },
    { icon: <ChatBubbleIcon size={22} />, title: dict.home.flowStep2Title, body: dict.home.flowStep2Body },
    { icon: <SparkleIcon size={22} />, title: dict.home.flowStep3Title, body: dict.home.flowStep3Body },
  ];
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="section-heading">{dict.home.flowTitle}</h2>
        <p className="section-subheading mx-auto">{dict.home.flowSubtitle}</p>
      </header>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {steps.map((step, idx) => (
          <GlassCard key={step.title} className="p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/80 text-ink">
                {step.icon}
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-ink-mute">
                {locale === 'zh' ? `第 0${idx + 1} 步` : `Step · 0${idx + 1}`}
              </span>
            </div>
            <h3 className="mt-5 text-[17px] font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-[13.5px] leading-[1.8] text-ink-soft">{step.body}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export function HomeFeatures({ dict }: Props) {
  const features = [
    { icon: <BookIcon size={22} />, title: dict.home.feature1Title, body: dict.home.feature1Body },
    { icon: <PuzzleIcon size={22} />, title: dict.home.feature2Title, body: dict.home.feature2Body },
    { icon: <LightBulbIcon size={22} />, title: dict.home.feature3Title, body: dict.home.feature3Body },
    { icon: <ShieldIcon size={22} />, title: dict.home.feature4Title, body: dict.home.feature4Body },
    { icon: <ChatBubbleIcon size={22} />, title: dict.home.feature5Title, body: dict.home.feature5Body },
    { icon: <RocketIcon size={22} />, title: dict.home.feature6Title, body: dict.home.feature6Body },
  ];
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="section-heading">{dict.home.featuresTitle}</h2>
        <p className="section-subheading mx-auto">{dict.home.featuresSubtitle}</p>
      </header>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <GlassCard key={f.title} variant="subtle" className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/80 text-ink">
              {f.icon}
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-ink">{f.title}</h3>
            <p className="mt-2 text-[13px] leading-[1.75] text-ink-soft">{f.body}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export function HomeCasesTeaser({ locale, dict }: Props) {
  const cases = caseBundles.slice(0, 8);
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="section-heading">{dict.home.caseTeaserTitle}</h2>
        <p className="section-subheading mx-auto">{dict.home.caseTeaserSubtitle}</p>
      </header>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cases.map((c) => {
          const copy = c.i18n[locale];
          return (
            <Link
              key={c.slug}
              href={caseUrl(locale, c.slug)}
              className="focus-ring group rounded-3xl"
            >
              <GlassCard className="h-full p-5 transition duration-500 group-hover:-translate-y-0.5 group-hover:shadow-lift">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white/85 text-ink">
                    {deptIcons[c.department]}
                  </div>
                  <span className="chip">{copy.departmentLabel}</span>
                </div>
                <h3 className="mt-4 text-[14px] font-semibold leading-snug text-ink line-clamp-2">
                  {copy.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft line-clamp-3">
                  {copy.summary}
                </p>
              </GlassCard>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center">
        <LinkButton href={localePath(locale, 'cases')} variant="glass" size="md">
          {dict.home.caseTeaserMore}
          <ArrowRightIcon size={14} />
        </LinkButton>
      </div>
    </section>
  );
}

export function HomeTrust({ locale, dict }: Props) {
  const lines = [dict.home.trustLine1, dict.home.trustLine2, dict.home.trustLine3];
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-[color:var(--line)] bg-white/60 p-8 backdrop-blur-2xl shadow-soft md:p-12">
        <h2 className="section-heading text-center">{dict.home.trustTitle}</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {lines.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white text-[11px] font-semibold">
                {i + 1}
              </span>
              <span className="text-[13.5px] leading-[1.75] text-ink-soft">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeCTA({ locale, dict }: Props) {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[32px] border border-[color:var(--line)] bg-white/75 p-10 backdrop-blur-2xl shadow-lift md:p-14">
        <div aria-hidden="true" className="absolute -left-16 -top-20 h-72 w-72 rounded-full bg-[#C5D5FF]/60 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-10 -bottom-20 h-80 w-80 rounded-full bg-[#FFD5E5]/50 blur-3xl" />
        <div className="relative text-center">
          <h2 className="display-title text-balance text-ink" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            {dict.home.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft md:text-base">
            {dict.home.ctaBody}
          </p>
          <div className="mt-8 flex justify-center">
            <LinkButton href={localePath(locale, 'generator')} variant="primary" size="lg">
              {dict.home.ctaButton}
              <ArrowRightIcon size={16} />
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
