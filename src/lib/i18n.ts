import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

// Языки сайта. Русский — основной (без префикса), английский живёт под /en/.
// Компоненты получают проп `lang` (по умолчанию 'ru') и берут тексты из своих словарей.
export type Lang = 'ru' | 'en';

// Пары страниц ru ↔ en. По ним строятся переключатель языка и hreflang.
export const ROUTES = {
  home: { ru: '/', en: '/en/' },
  clubhouse: { ru: '/klubnyi-dom/', en: '/en/clubhouse/' },
  about: { ru: '/o-klube/', en: '/en/about/' },
  privacy: { ru: '/privacy/', en: '/en/privacy/' },
} as const;

export type PageKey = keyof typeof ROUTES;

/** Путь страницы на нужном языке: href('about', 'en') → '/en/about/'. */
export const href = (page: PageKey, lang: Lang) => ROUTES[page][lang];

/** Ссылка на якорь главной: anchor('en', 'apply') → '/en/#apply'. */
export const anchor = (lang: Lang, id: string) => `${ROUTES.home[lang]}#${id}`;

/** canonical на свою версию + hreflang ru / en / x-default (= ru). */
export function alternatesFor(page: PageKey, lang: Lang): Metadata['alternates'] {
  const ru = `${SITE.url}${ROUTES[page].ru}`;
  const en = `${SITE.url}${ROUTES[page].en}`;
  return {
    canonical: lang === 'en' ? en : page === 'home' ? SITE.url : ru,
    languages: { ru, en, 'x-default': ru },
  };
}

export const OG_LOCALE: Record<Lang, string> = { ru: 'ru_RU', en: 'en_US' };
export const SCHEMA_LANG: Record<Lang, string> = { ru: 'ru-RU', en: 'en' };
