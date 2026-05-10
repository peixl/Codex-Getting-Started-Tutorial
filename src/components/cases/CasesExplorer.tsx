'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { CaseBundle, Department } from '@/data/cases';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import { caseUrl } from '@/lib/routes';
import { GlassCard } from '@/components/GlassCard';
import { cn } from '@/lib/cn';
import {
  ArrowRightIcon,
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
import { CopyButton } from '@/components/CopyButton';

type Props = {
  cases: CaseBundle[];
  locale: Locale;
  dict: Dictionary;
};

const departmentOptions: Array<Department | 'all'> = [
  'all',
  'finance',
  'operations',
  'customer-service',
  'hr',
  'logistics',
  'procurement',
  'marketing',
  'legal',
  'data',
  'admin',
  'product',
];

export const deptIcons: Record<Department, React.ReactNode> = {
  finance: <FinanceIcon size={24} />,
  operations: <OpsIcon size={24} />,
  'customer-service': <SupportIcon size={24} />,
  hr: <HRIcon size={24} />,
  logistics: <LogisticsIcon size={24} />,
  procurement: <ProcurementIcon size={24} />,
  marketing: <MarketingIcon size={24} />,
  legal: <LegalIcon size={24} />,
  data: <DataIcon size={24} />,
  admin: <AdminIcon size={24} />,
  product: <ProductIcon size={24} />,
};

export function CasesExplorer({ cases, locale, dict }: Props) {
  const [filter, setFilter] = useState<Department | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (filter !== 'all' && c.department !== filter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const copy = c.i18n[locale];
        const hay = [copy.title, copy.summary, copy.departmentLabel, ...copy.keywords]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [cases, filter, query, locale]);

  const filterLabels: Record<Department | 'all', string> = {
    all: dict.cases.filterAll,
    finance: dict.cases.filterFinance,
    operations: dict.cases.filterOperations,
    'customer-service': dict.cases.filterCustomerService,
    hr: dict.cases.filterHR,
    logistics: dict.cases.filterLogistics,
    procurement: dict.cases.filterProcurement,
    marketing: dict.cases.filterMarketing,
    legal: dict.cases.filterLegal,
    data: dict.cases.filterData,
    admin: dict.cases.filterAdmin,
    product: dict.cases.filterProduct,
  };

  return (
    <>
      <div className="mx-auto mb-8 flex max-w-5xl flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {departmentOptions.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFilter(d)}
              className={cn(
                'focus-ring rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition',
                filter === d
                  ? 'border-ink/25 bg-white text-ink shadow-soft'
                  : 'border-[color:var(--line)] bg-white/60 text-ink-soft hover:bg-white hover:text-ink'
              )}
            >
              {filterLabels[d]}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={locale === 'zh' ? '搜索案例（关键词、部门名、痛点）…' : 'Search cases…'}
            className="glass-input"
            aria-label="Search cases"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <GlassCard className="mx-auto max-w-xl p-10 text-center">
          <p className="text-ink-soft">
            {locale === 'zh'
              ? '没有匹配的案例。试着换个关键词。'
              : 'No cases match. Try a different keyword.'}
          </p>
        </GlassCard>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const copy = c.i18n[locale];
            return (
              <GlassCard
                key={c.slug}
                className="flex h-full flex-col p-6 transition duration-500 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/80 text-ink">
                    {deptIcons[c.department]}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="chip">{copy.departmentLabel}</span>
                    <span className="chip">
                      <WindowsIcon size={10} />
                      {dict.cases.windowsBadge}
                    </span>
                  </div>
                </div>
                <Link
                  href={caseUrl(locale, c.slug)}
                  className="focus-ring mt-5 block rounded-lg"
                >
                  <h3 className="text-[15px] font-semibold leading-snug text-ink">{copy.title}</h3>
                </Link>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-soft">
                  {copy.summary}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                  <Link
                    href={caseUrl(locale, c.slug)}
                    className="focus-ring inline-flex items-center gap-1 text-[13px] font-semibold text-ink hover:opacity-70"
                  >
                    {dict.cases.readCase}
                    <ArrowRightIcon size={14} />
                  </Link>
                  <CopyButton
                    value={c.prompt[locale]}
                    label={dict.cases.copyPrompt}
                    copiedLabel={dict.cases.copied}
                    size="sm"
                    variant="chip"
                  />
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </>
  );
}
