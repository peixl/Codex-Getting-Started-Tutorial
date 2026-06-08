import type { MetadataRoute } from 'next';
import { caseBundles } from '@/data/cases';
import { AI_RESOURCE_PATHS, SITE_URL } from '@/lib/routes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', 'generator', 'wechat-ai', 'guide', 'lessons', 'cases', 'cookbook', 'tips', 'faq'];
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const path of staticPaths) {
    for (const locale of ['zh', 'en'] as const) {
      const url = path ? `${SITE_URL}/${locale}/${path}` : `${SITE_URL}/${locale}`;
      const languages: Record<string, string> = {
        'zh-CN': path ? `${SITE_URL}/zh/${path}` : `${SITE_URL}/zh`,
        'en-US': path ? `${SITE_URL}/en/${path}` : `${SITE_URL}/en`,
      };
      if (path === '') languages['x-default'] = SITE_URL;

      entries.push({
        url,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : path === 'generator' || path === 'wechat-ai' ? 0.9 : 0.8,
        alternates: { languages },
      });
    }
  }

  for (const c of caseBundles) {
    for (const locale of ['zh', 'en'] as const) {
      entries.push({
        url: `${SITE_URL}/${locale}/cases/${c.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
        alternates: {
          languages: {
            'zh-CN': `${SITE_URL}/zh/cases/${c.slug}`,
            'en-US': `${SITE_URL}/en/cases/${c.slug}`,
          },
        },
      });
    }
  }

  for (const path of AI_RESOURCE_PATHS) {
    entries.push({
      url: `${SITE_URL}/${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: path === 'llms.txt' ? 0.85 : 0.8,
    });
  }

  return entries;
}
