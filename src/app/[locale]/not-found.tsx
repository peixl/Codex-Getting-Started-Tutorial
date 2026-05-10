import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <div className="text-6xl font-bold aurora-text">404</div>
      <h1 className="text-xl font-semibold text-slate-900">没找到这一页 / Page not found</h1>
      <p className="text-sm text-slate-600">
        页面可能被移走了，或者链接打错了。回到首页重新找找。
      </p>
      <p className="text-sm text-slate-600">
        This page has moved or never existed. Head back to the home page.
      </p>
      <div className="mt-4 flex gap-3">
        <Link
          href="/zh"
          className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-slate-900 shadow-glass backdrop-blur-xl hover:bg-white"
        >
          中文首页
        </Link>
        <Link
          href="/en"
          className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-slate-900 shadow-glass backdrop-blur-xl hover:bg-white"
        >
          English home
        </Link>
      </div>
    </div>
  );
}
