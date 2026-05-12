import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@/components/Analytics';
import './globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F0FF' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F1E' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://codex.ifq.ai'),
  applicationName: 'Codex Beginner Tutorial',
  authors: [{ name: 'ifq.ai', url: 'https://ifq.ai' }],
  creator: 'ifq.ai',
  publisher: 'ifq.ai',
  category: 'education',
  classification: 'AI tutorial, Codex desktop, business automation, e-commerce agent tasks',
  title: {
    default: 'Codex Beginner Tutorial · Codex 新手教程',
    template: '%s',
  },
  description:
    'Beginner-friendly OpenAI Codex tutorial for business teams — prompt generator, plain-language guide, Windows/macOS app cases, and e-commerce agent task cases.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/zh',
      'en-US': '/en',
      'x-default': '/',
    },
    types: {
      'text/plain': [
        { url: '/llms.txt', title: 'LLM Summary' },
        { url: '/llms-full.txt', title: 'LLM Full Index' },
      ],
      'text/markdown': [
        { url: '/agent.md', title: 'Agent Guide' },
        { url: '/agents.md', title: 'Agents Guide' },
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://codex.ifq.ai',
    siteName: 'Codex Beginner Tutorial',
    title: 'Codex Beginner Tutorial · Codex 新手教程',
    description:
      'Beginner-friendly OpenAI Codex tutorial for business teams — prompt generator, plain-language guide, Windows/macOS app cases, and e-commerce agent task cases.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Codex Beginner Tutorial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codex Beginner Tutorial · Codex 新手教程',
    description:
      'Beginner-friendly OpenAI Codex tutorial for business teams — prompt generator, plain-language guide, Windows/macOS app cases, and e-commerce agent task cases.',
    images: ['/og-image.svg'],
  },
  other: {
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'llms-txt': 'https://codex.ifq.ai/llms.txt',
    'llms-full': 'https://codex.ifq.ai/llms-full.txt',
    'agent-guide': 'https://codex.ifq.ai/agent.md',
    'ai-crawl': 'allow',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM Full Index" />
        <link rel="alternate" type="text/markdown" href="/agent.md" title="Agent Guide" />
        <link rel="alternate" type="text/markdown" href="/agents.md" title="Agents Guide" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
