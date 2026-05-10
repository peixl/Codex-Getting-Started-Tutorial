import type { MetadataRoute } from 'next';

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
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Baiduspider', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'FacebookBot', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
    ],
    sitemap: 'https://codex.ifq.ai/sitemap.xml',
    host: 'https://codex.ifq.ai',
  };
}
