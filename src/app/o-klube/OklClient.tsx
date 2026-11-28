'use client';

import { useEffect, useState } from 'react';

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

const ANCHORS = [
  { id: 'facts', label: 'Факты' },
  { id: 'numbers', label: 'В цифрах' },
  { id: 'diff', label: 'Отличия' },
  { id: 'fit', label: 'Кому подходит' },
  { id: 'founders', label: 'Основатели' },
  { id: 'join', label: 'Как вступить' },
  { id: 'faq', label: 'FAQ' },
];

/** Лента якорей в шапке; активный пункт подсвечивается по прокрутке. */
export function AnchorNav() {
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
    <nav className="anchors" aria-label="Разделы страницы">
      {ANCHORS.map((a) => (
        <a key={a.id} href={`#${a.id}`} className={active === a.id ? 'is-active' : undefined}>
          {a.label}
        </a>
      ))}
    </nav>
  );
}
