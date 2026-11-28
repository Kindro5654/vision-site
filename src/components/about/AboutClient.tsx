'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/lib/i18n';

/** Кнопка, открывающая общую модалку заявки (MainCTAModal слушает 'vc:open-cta'). */
export function ApplyButton({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event('vc:open-cta'))}
    >
      {children}
    </button>
  );
}

const ANCHORS: { id: string; ru: string; en: string }[] = [
  { id: 'facts', ru: 'Факты', en: 'Facts' },
  { id: 'numbers', ru: 'В цифрах', en: 'In numbers' },
  { id: 'diff', ru: 'Отличия', en: 'What sets us apart' },
  { id: 'fit', ru: 'Кому подходит', en: 'Who it’s for' },
  { id: 'founders', ru: 'Основатели', en: 'Founders' },
  { id: 'join', ru: 'Как вступить', en: 'How to join' },
  { id: 'faq', ru: 'FAQ', en: 'FAQ' },
];

/** Лента якорей в шапке; активный пункт подсвечивается по прокрутке. */
export function AnchorNav({ lang }: { lang: Lang }) {
  const [active, setActive] = useState('facts');

  useEffect(() => {
    const sections = ANCHORS.map((a) => document.getElementById(a.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -55% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="anchors" aria-label={lang === 'en' ? 'Page sections' : 'Разделы страницы'}>
      {ANCHORS.map((a) => (
        <a key={a.id} href={`#${a.id}`} className={active === a.id ? 'is-active' : undefined}>
          {a[lang]}
        </a>
      ))}
    </nav>
  );
}
