import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n';
import { localePath } from '@/lib/routes';
import { CodexLogo } from './icons';

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const GITHUB_URL = 'https://github.com/peixl/Codex-Getting-Started-Tutorial';
const IFQ_URL = 'https://ifq.ai';

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  const navLinks = [
    { href: localePath(locale), label: dict.nav.home },
    { href: localePath(locale, 'generator'), label: dict.nav.generator },
    { href: localePath(locale, 'guide'), label: dict.nav.guide },
    { href: localePath(locale, 'lessons'), label: dict.nav.lessons },
    { href: localePath(locale, 'cases'), label: dict.nav.cases },
    { href: localePath(locale, 'cookbook'), label: dict.nav.cookbook },
    { href: localePath(locale, 'tips'), label: dict.nav.tips },
    { href: localePath(locale, 'faq'), label: dict.nav.faq },
  ];

  const isZh = locale === 'zh';
  const navTitle = isZh ? '导航' : 'Navigate';
  const resourcesTitle = dict.footer.resourcesTitle;
  const craftedBy = isZh ? '由' : 'Crafted with care by';
  const craftedSuffix = isZh ? '团队用心打磨' : '';

  return (
    <footer className="relative mt-24">
      <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[color:var(--line)] bg-white/75 p-8 backdrop-blur-2xl shadow-soft md:p-12">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5">
                <CodexLogo size={28} />
                <span className="text-[14px] font-semibold tracking-tight text-ink">
                  {dict.meta.siteName}
                </span>
              </div>
              <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-ink-soft">
                {dict.footer.aboutBody}
              </p>
              <p className="mt-3 max-w-sm text-[12px] leading-relaxed text-ink-mute">
                {dict.footer.builtWith}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href={IFQ_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/80 px-3.5 py-1.5 text-[12px] font-medium text-ink-soft transition hover:bg-white hover:text-ink"
                >
                  <IfqMark />
                  <span className="tracking-tight">
                    {craftedBy} <span className="font-semibold text-ink">ifq.ai</span> {craftedSuffix}
                  </span>
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1.5 text-[12px] font-medium text-ink-soft transition hover:bg-white hover:text-ink"
                >
                  <GithubMark />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ink-mute">
                {navTitle}
              </h3>
              <ul className="mt-4 space-y-2 text-[13px]">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="focus-ring text-ink-soft transition hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ink-mute">
                {resourcesTitle}
              </h3>
              <ul className="mt-4 space-y-2 text-[13px]">
                <li>
                  <a
                    href="https://openai.com/codex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-ink-soft transition hover:text-ink"
                  >
                    {dict.footer.resourceOpenAI}
                  </a>
                </li>
                <li>
                  <a
                    href="https://platform.openai.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-ink-soft transition hover:text-ink"
                  >
                    {dict.footer.resourceCodexDocs}
                  </a>
                </li>
                <li>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-ink-soft transition hover:text-ink"
                  >
                    {dict.footer.resourceGithub}
                  </a>
                </li>
                <li>
                  <a
                    href={IFQ_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-ink-soft transition hover:text-ink"
                  >
                    ifq.ai · {isZh ? '作品集' : 'Studio'}
                  </a>
                </li>
              </ul>
              <p className="mt-6 text-[12px] leading-relaxed text-ink-mute">
                {dict.footer.contactBody}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[color:var(--line)] pt-6 text-[12px] text-ink-mute md:flex-row md:items-center">
            <div>
              {dict.footer.copyright.replace('2026', String(year))}
            </div>
            <div className="flex items-center gap-4">
              <a
                href={IFQ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring transition hover:text-ink"
              >
                ifq.ai
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring transition hover:text-ink"
              >
                Open source on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function IfqMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ifq-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A84FF" />
          <stop offset="100%" stopColor="#5E5CE6" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#ifq-mark)" opacity="0.15" />
      <path
        d="M9 7v10M15 7v6a4 4 0 01-4 4"
        stroke="url(#ifq-mark)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.67 5.56.67 11.83c0 5.01 3.25 9.26 7.76 10.76.57.1.78-.25.78-.55l-.01-2.16c-3.16.69-3.82-1.35-3.82-1.35-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.02 1.73 2.66 1.23 3.31.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.62 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.16.91-.25 1.88-.38 2.85-.38.97 0 1.94.13 2.85.38 2.17-1.47 3.13-1.16 3.13-1.16.62 1.57.23 2.73.11 3.02.73.8 1.17 1.81 1.17 3.05 0 4.37-2.66 5.33-5.2 5.61.41.35.78 1.03.78 2.08l-.01 3.08c0 .3.2.65.79.55 4.51-1.5 7.75-5.74 7.75-10.75C23.33 5.56 18.27.5 12 .5z" />
    </svg>
  );
}
