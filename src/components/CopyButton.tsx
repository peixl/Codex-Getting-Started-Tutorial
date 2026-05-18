'use client';

import { useEffect, useState } from 'react';
import { CheckIcon, CopyIcon } from './icons';
import { cn } from '@/lib/cn';

type Props = {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: 'primary' | 'glass' | 'chip';
  size?: 'sm' | 'md';
  onCopied?: () => void;
  disabled?: boolean;
  disabledTitle?: string;
  failedLabel?: string;
};

export function CopyButton({
  value,
  label = 'Copy',
  copiedLabel = 'Copied',
  className,
  variant = 'glass',
  size = 'md',
  onCopied,
  disabled = false,
  disabledTitle,
  failedLabel = 'Copy failed',
}: Props) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    if (!failed) return;
    const t = setTimeout(() => setFailed(false), 2600);
    return () => clearTimeout(t);
  }, [failed]);

  const handleCopy = async () => {
    if (disabled) return;
    setFailed(false);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      onCopied?.();
    } catch {
      setCopied(false);
      setFailed(true);
    }
  };

  const padding =
    size === 'sm' ? 'px-3 py-1.5 text-[12px] rounded-full' : 'px-4 py-2 text-[13px] rounded-full';

  const styles =
    variant === 'primary'
      ? 'bg-ink text-white shadow-soft hover:-translate-y-0.5'
      : variant === 'chip'
        ? 'border border-[color:var(--line)] bg-white/70 text-ink-soft backdrop-blur-xl hover:bg-white hover:text-ink'
        : 'border border-[color:var(--line)] bg-white/80 text-ink backdrop-blur-xl shadow-soft hover:bg-white';

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled}
      aria-live="polite"
      aria-disabled={disabled || undefined}
      title={disabled ? disabledTitle : undefined}
      className={cn(
        'focus-ring inline-flex max-w-full min-w-0 items-center justify-center gap-2 text-center font-medium leading-snug transition',
        padding,
        styles,
        disabled && 'cursor-not-allowed opacity-50 hover:translate-y-0',
        className
      )}
    >
      <span className="shrink-0">
        {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      </span>
      <span className="min-w-0 break-words">{failed ? failedLabel : copied ? copiedLabel : label}</span>
    </button>
  );
}
