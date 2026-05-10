import type { PropsWithChildren, HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Props = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export function Section({
  className,
  children,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  ...rest
}: PropsWithChildren<Props>) {
  return (
    <section
      {...rest}
      className={cn('relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-8', className)}
    >
      {(eyebrow || title || subtitle) && (
        <header
          className={cn(
            'mb-12 md:mb-16',
            align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl text-left'
          )}
        >
          {eyebrow && (
            <div className={cn('mb-4 flex', align === 'center' ? 'justify-center' : 'justify-start')}>
              <span className="chip-accent">{eyebrow}</span>
            </div>
          )}
          {title && <h2 className="section-heading">{title}</h2>}
          {subtitle && <p className={cn('section-subheading', align === 'center' && 'mx-auto')}>{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
