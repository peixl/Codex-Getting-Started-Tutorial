'use client';

import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/cn';

type BaseProps = {
  variant?: 'primary' | 'glass' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
};

const sizeClasses: Record<NonNullable<BaseProps['size']>, string> = {
  md: 'px-4 py-2 text-[13px]',
  lg: 'px-6 py-3 text-[15px]',
};

const variantClasses: Record<NonNullable<BaseProps['variant']>, string> = {
  primary: 'btn-primary',
  glass: 'btn-secondary',
  ghost: 'btn-ghost',
};

export function Button({
  className,
  children,
  variant = 'glass',
  size = 'md',
  ...rest
}: PropsWithChildren<BaseProps & ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      {...rest}
      className={cn('btn', sizeClasses[size], variantClasses[variant], className)}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  className,
  children,
  variant = 'glass',
  size = 'md',
  ...rest
}: PropsWithChildren<
  BaseProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    }
>) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
        className={cn('btn', sizeClasses[size], variantClasses[variant], className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      {...rest}
      className={cn('btn', sizeClasses[size], variantClasses[variant], className)}
    >
      {children}
    </Link>
  );
}
