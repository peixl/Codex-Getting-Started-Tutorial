'use client';

import { useEffect } from 'react';
import Link from 'next/link';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <div className="text-6xl font-bold aurora-text">!</div>
      <h1 className="text-xl font-semibold text-ink">
        出了点问题 / Something went wrong
      </h1>
      <p className="text-sm text-ink-soft">
        页面加载时遇到了错误。可以试试刷新，或者回到首页。
      </p>
      <p className="text-sm text-ink-soft">
        An error occurred while loading this page. Try refreshing or head home.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-ink shadow-glass backdrop-blur-xl transition hover:bg-white"
        >
          重试 / Retry
        </button>
        <Link
          href="/zh"
          className="rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-ink shadow-glass backdrop-blur-xl transition hover:bg-white"
        >
          中文首页
        </Link>
        <Link
          href="/en"
          className="rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-ink shadow-glass backdrop-blur-xl transition hover:bg-white"
        >
          English home
        </Link>
      </div>
    </div>
  );
}
