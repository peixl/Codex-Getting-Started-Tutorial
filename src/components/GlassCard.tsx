import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/cn';

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'strong' | 'subtle';
};

export function GlassCard({
  className,
  children,
  variant = 'default',
  ...rest
}: PropsWithChildren<GlassCardProps>) {
  return (
    <div
      {...rest}
      className={cn(
        'relative overflow-hidden',
        variant === 'strong' && 'rounded-3xl border border-[color:var(--line)] bg-white/90 backdrop-blur-2xl shadow-lift',
        variant === 'default' && 'surface-card',
        variant === 'subtle' && 'surface-card-quiet',
        className
      )}
    >
      {children}
    </div>
  );
}

export function GlassPanel({
  className,
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...rest} className={cn('surface-panel', className)}>
      {children}
    </div>
  );
}
