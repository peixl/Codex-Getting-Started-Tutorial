import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/routes';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Gemini', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'Meta-ExternalFetcher', allow: '/' },
      { userAgent: 'AI2Bot', allow: '/' },
      { userAgent: 'Diffbot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Baiduspider', allow: '/' },
      { userAgent: 'Sogou web spider', allow: '/' },
      { userAgent: '360Spider', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'FacebookBot', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'Yandex', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
      { userAgent: 'Slurp', allow: '/' },
      { userAgent: 'PetalBot', allow: '/' },
      { userAgent: 'Timpibot', allow: '/' },
      { userAgent: 'omgili', allow: '/' },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemap-index.xml`],
    host: SITE_URL,
  };
}
