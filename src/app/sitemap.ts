import type { MetadataRoute } from 'next';
import { caseBundles } from '@/data/cases';

const BASE = 'https://codex.ifq.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', 'generator', 'guide', 'lessons', 'cases', 'cookbook', 'tips', 'faq'];
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const path of staticPaths) {
    for (const locale of ['zh', 'en'] as const) {
      const url = path ? `${BASE}/${locale}/${path}` : `${BASE}/${locale}`;
      const languages: Record<string, string> = {
        'zh-CN': path ? `${BASE}/zh/${path}` : `${BASE}/zh`,
        'en-US': path ? `${BASE}/en/${path}` : `${BASE}/en`,
      };
      if (path === '') languages['x-default'] = BASE;

      entries.push({
        url,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : path === 'generator' ? 0.9 : 0.8,
        alternates: { languages },
      });
    }
  }

  for (const c of caseBundles) {
    for (const locale of ['zh', 'en'] as const) {
      entries.push({
        url: `${BASE}/${locale}/cases/${c.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
        alternates: {
          languages: {
            'zh-CN': `${BASE}/zh/cases/${c.slug}`,
            'en-US': `${BASE}/en/cases/${c.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
