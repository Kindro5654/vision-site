import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { ARTICLES } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE.url}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/klubnyi-dom/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...ARTICLES.map((a) => ({
      url: `${SITE.url}/blog/${a.slug}/`,
      lastModified: new Date(a.updatedAt ?? a.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
