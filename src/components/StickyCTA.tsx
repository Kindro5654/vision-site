'use client';
import { useEffect } from 'react';
import type { Lang } from '@/lib/i18n';

const LABEL: Record<Lang, string> = { ru: 'Получить приглашение', en: 'Request an invitation' };

export default function StickyCTA({ lang = 'ru' }: { lang?: Lang }) {
  useEffect(() => {
    const cta = document.getElementById('vc-sticky-cta');
    if (!cta) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.72) cta.classList.add('show');
      else cta.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const id = window.setTimeout(onScroll, 400);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(id);
    };
  }, []);

  const click = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('vc:open-cta'));
  };

  return (
    <div id="vc-sticky-cta">
      <a href="#" onClick={click}>
        {LABEL[lang]}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#160B03" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  );
}
