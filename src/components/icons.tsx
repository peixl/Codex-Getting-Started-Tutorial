import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const baseProps = (size: number): Partial<SVGProps<SVGSVGElement>> => ({
  width: size,
  height: size,
  viewBox: '0 0 48 48',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 2,
  stroke: 'currentColor',
});

export function SparkleIcon({ size = 32, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path
        d="M24 6c1.5 6.5 5 10 11.5 11.5-6.5 1.5-10 5-11.5 11.5-1.5-6.5-5-10-11.5-11.5C19 16 22.5 12.5 24 6z"
        className="hand-stroke"
      />
      <path d="M38 32c.7 3 2.3 4.7 5.3 5.3-3 .7-4.7 2.3-5.3 5.3-.7-3-2.3-4.7-5.3-5.3 3-.6 4.7-2.3 5.3-5.3z" className="hand-stroke" />
      <path d="M10 30c.5 2 1.5 3 3.5 3.5-2 .5-3 1.5-3.5 3.5-.5-2-1.5-3-3.5-3.5 2-.5 3-1.5 3.5-3.5z" className="hand-stroke" />
    </svg>
  );
}

export function MacWindowIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M6 12c0-2 1.4-4 4-4h28c2.6 0 4 2 4 4v22c0 2.2-1.6 4-4 4H10c-2.4 0-4-1.8-4-4V12z" className="hand-stroke" />
      <path d="M6 16h36" className="hand-stroke" />
      <circle cx="10" cy="12" r="1.2" fill="currentColor" />
      <circle cx="14" cy="12" r="1.2" fill="currentColor" />
      <circle cx="18" cy="12" r="1.2" fill="currentColor" />
      <path d="M12 23l4 4 8-8" className="hand-stroke" />
      <path d="M28 24h10M28 29h6" className="hand-stroke" />
    </svg>
  );
}

export function WindowsIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M8 10l14-2v16H8V10z" className="hand-stroke" />
      <path d="M24 7.5L42 5v19H24V7.5z" className="hand-stroke" />
      <path d="M8 26h14v14L8 38V26z" className="hand-stroke" />
      <path d="M24 26h18v17L24 40.5V26z" className="hand-stroke" />
    </svg>
  );
}

export function WandIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M32 8l8 8M12 40l22-22 6 6-22 22-6-6z" className="hand-stroke" />
      <path d="M38 6l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4zM8 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" className="hand-stroke" />
    </svg>
  );
}

export function ChatBubbleIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M8 14c0-3.3 2.7-6 6-6h20c3.3 0 6 2.7 6 6v14c0 3.3-2.7 6-6 6H20l-8 6v-6h-2c-1 0-2-1-2-2V14z" className="hand-stroke" />
      <circle cx="18" cy="21" r="1.5" fill="currentColor" />
      <circle cx="24" cy="21" r="1.5" fill="currentColor" />
      <circle cx="30" cy="21" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function CopyIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <rect x="14" y="14" width="26" height="26" rx="4" className="hand-stroke" />
      <path d="M10 34H8c-2 0-4-2-4-4V10c0-2 2-4 4-4h20c2 0 4 2 4 4v2" className="hand-stroke" />
    </svg>
  );
}

export function CheckIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M8 24l10 10 22-22" className="hand-stroke" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M8 24h32M28 12l12 12-12 12" className="hand-stroke" />
    </svg>
  );
}

export function FinanceIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <circle cx="24" cy="24" r="16" className="hand-stroke" />
      <path d="M24 14v20M18 18c0-2 2.5-3 6-3s6 1 6 3-3 3-6 3-6 1-6 3 2.5 3 6 3 6-1 6-3" className="hand-stroke" />
    </svg>
  );
}

export function OpsIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M8 40V22l8-6 6 4 8-8 10 6v22H8z" className="hand-stroke" />
      <path d="M16 40v-8M24 40v-12M32 40v-6" className="hand-stroke" />
    </svg>
  );
}

export function SupportIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M10 26c0-8 6-14 14-14s14 6 14 14v8c0 2-2 4-4 4h-2v-14h6M10 26v8c0 2 2 4 4 4h2V24h-6" className="hand-stroke" />
      <path d="M20 38c0 2 2 4 4 4h4" className="hand-stroke" />
    </svg>
  );
}

export function HRIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <circle cx="18" cy="18" r="6" className="hand-stroke" />
      <circle cx="33" cy="20" r="5" className="hand-stroke" />
      <path d="M6 40c0-6 5-10 12-10s12 4 12 10" className="hand-stroke" />
      <path d="M28 40c2-4 6-7 11-7s7 3 7 7" className="hand-stroke" />
    </svg>
  );
}

export function LogisticsIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M4 14h22v20H4zM26 20h10l6 6v8H26V20z" className="hand-stroke" />
      <circle cx="12" cy="38" r="3" className="hand-stroke" />
      <circle cx="34" cy="38" r="3" className="hand-stroke" />
    </svg>
  );
}

export function ProcurementIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M10 14l4-8h20l4 8" className="hand-stroke" />
      <path d="M6 14h36v8H6zM10 22v18a4 4 0 004 4h20a4 4 0 004-4V22" className="hand-stroke" />
      <path d="M20 30h8" className="hand-stroke" />
    </svg>
  );
}

export function MarketingIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M8 30V20l28-12v32L8 28" className="hand-stroke" />
      <path d="M8 20h4v12H8a2 2 0 01-2-2v-8a2 2 0 012-2z" className="hand-stroke" />
      <path d="M14 34c.7 4 2 6 4 6s3-2 3-5" className="hand-stroke" />
    </svg>
  );
}

export function LegalIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M24 6v6M14 12h20M10 14l4 14M34 14l4 14M6 28h12l-6-14M30 28h12l-6-14" className="hand-stroke" />
      <path d="M14 40h20M24 12v28" className="hand-stroke" />
    </svg>
  );
}

export function DataIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <ellipse cx="24" cy="12" rx="14" ry="5" className="hand-stroke" />
      <path d="M10 12v12c0 2.8 6.3 5 14 5s14-2.2 14-5V12M10 24v12c0 2.8 6.3 5 14 5s14-2.2 14-5V24" className="hand-stroke" />
    </svg>
  );
}

export function AdminIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M8 42V18l16-10 16 10v24" className="hand-stroke" />
      <path d="M8 42h32M20 42V28h8v14M30 22h4M30 28h4" className="hand-stroke" />
    </svg>
  );
}

export function ProductIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <rect x="6" y="10" width="36" height="28" rx="6" className="hand-stroke" />
      <path d="M12 18h20M12 24h14M12 30h18" className="hand-stroke" />
      <circle cx="36" cy="30" r="3" className="hand-stroke" />
    </svg>
  );
}

export function BookIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M6 10c6 0 12 1 18 4 6-3 12-4 18-4v28c-6 0-12 1-18 4-6-3-12-4-18-4V10z" className="hand-stroke" />
      <path d="M24 14v28" className="hand-stroke" />
    </svg>
  );
}

export function PuzzleIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path
        d="M10 10h10v4c0 1.5 1.5 3 3 3s3-1.5 3-3v-4h10v10h4c1.5 0 3 1.5 3 3s-1.5 3-3 3h-4v10H26v-4c0-1.5-1.5-3-3-3s-3 1.5-3 3v4H10V28H6c-1.5 0-3-1.5-3-3s1.5-3 3-3h4V10z"
        className="hand-stroke"
      />
    </svg>
  );
}

export function LightBulbIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M16 30c-3-3-5-6-5-10 0-7 6-12 13-12s13 5 13 12c0 4-2 7-5 10v6c0 1.5-1.5 3-3 3H19c-1.5 0-3-1.5-3-3v-6z" className="hand-stroke" />
      <path d="M20 42h8" className="hand-stroke" />
    </svg>
  );
}

export function ShieldIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M24 6l16 5v14c0 10-8 16-16 17-8-1-16-7-16-17V11l16-5z" className="hand-stroke" />
      <path d="M16 24l6 6 12-12" className="hand-stroke" />
    </svg>
  );
}

export function RocketIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M24 4c8 6 12 14 12 22l-6 4h-12l-6-4c0-8 4-16 12-22z" className="hand-stroke" />
      <circle cx="24" cy="20" r="3" className="hand-stroke" />
      <path d="M18 34l-4 6 6-2M30 34l4 6-6-2M18 40c-2 2-2 4-2 4s2 0 4-2M30 40c2 2 2 4 2 4s-2 0-4-2" className="hand-stroke" />
    </svg>
  );
}

export function QuestionIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <circle cx="24" cy="24" r="18" className="hand-stroke" />
      <path d="M18 19c0-3 3-5 6-5s6 2 6 5c0 3-3 4-5 5-1 .5-1 1-1 3" className="hand-stroke" />
      <circle cx="24" cy="34" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M8 14h32M8 24h32M8 34h32" className="hand-stroke" />
    </svg>
  );
}

export function CloseIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size)} {...props}>
      <path d="M12 12l24 24M36 12L12 36" className="hand-stroke" />
    </svg>
  );
}

export function CodexLogo({ size = 40, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="codex-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9EC4" />
          <stop offset="45%" stopColor="#B8A4FF" />
          <stop offset="100%" stopColor="#9CCEFF" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="url(#codex-logo-grad)" opacity="0.25" />
      <path
        d="M16 17l-6 7 6 7M32 17l6 7-6 7M27 14l-6 20"
        stroke="url(#codex-logo-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
