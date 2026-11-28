import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { ARTICLES } from '@/lib/articles';
import { PASSPORT } from '@/lib/passport';
import { ROUTES, type PageKey } from '@/lib/i18n';

// Пары ru/en: обе версии в карте сайта, у каждой — ссылки на языковые альтернативы.
function pair(
  page: PageKey,
  opts: { lastModified: Date; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number },
): MetadataRoute.Sitemap {
  const ru = `${SITE.url}${ROUTES[page].ru}`;
  const en = `${SITE.url}${ROUTES[page].en}`;
  const alternates = { languages: { ru, en, 'x-default': ru } };
  return [
    { url: ru, ...opts, alternates },
    { url: en, ...opts, priority: Math.round(opts.priority * 0.9 * 10) / 10, alternates },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...pair('home', { lastModified: now, changeFrequency: 'weekly', priority: 1 }),
    ...pair('privacy', { lastModified: now, changeFrequency: 'yearly', priority: 0.2 }),
    ...pair('about', {
      lastModified: new Date(PASSPORT.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.9,
    }),
    ...pair('clubhouse', { lastModified: now, changeFrequency: 'monthly', priority: 0.8 }),
    ...ARTICLES.map((a) => ({
      url: `${SITE.url}/blog/${a.slug}/`,
      lastModified: new Date(a.updatedAt ?? a.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
