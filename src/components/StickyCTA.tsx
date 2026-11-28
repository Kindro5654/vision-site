'use client';
import { useEffect, useRef } from 'react';
import { SITE } from '@/lib/site';
import type { Lang } from '@/lib/i18n';
import './footer.css';

// Нижняя панель на телефоне (макет 28.11): «Получить приглашение» + Telegram.
// Заменяет плавающую кнопку, пузырь Telegram и стрелку «наверх».
// Появляется после первого экрана и прячется, когда виден подвал или блок заявки — ничего не перекрывает.
// Стили — в components/footer.css (.vbar), на десктопе панель скрыта.

const COPY: Record<Lang, { cta: string; tg: string }> = {
  ru: { cta: 'Получить приглашение', tg: 'Задать вопрос в Telegram' },
  en: { cta: 'Request an invitation', tg: 'Ask a question on Telegram' },
};

export default function StickyCTA({ lang = 'ru' }: { lang?: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const t = COPY[lang];

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const blockers = new Set<Element>();
    let pastHero = false;
    const apply = () => bar.classList.toggle('is-hidden', !pastHero || blockers.size > 0);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      apply();
    };
    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => (e.isIntersecting ? blockers.add(e.target) : blockers.delete(e.target)));
              apply();
            },
            { threshold: 0.05 },
          )
        : null;
    document.querySelectorAll('.vf, #cta, #apply').forEach((el) => io?.observe(el));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div className="vbar is-hidden" ref={ref}>
      <button type="button" className="vbar__cta" onClick={() => window.dispatchEvent(new Event('vc:open-cta'))}>
        {t.cta} <span aria-hidden="true">→</span>
      </button>
      <a className="vbar__tg" href={SITE.socials.telegram} target="_blank" rel="noopener noreferrer" aria-label={t.tg}>
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f4f1ec" strokeWidth="1.7" strokeLinejoin="round">
          <path d="M21 4L3 11l6 2 2 6 3-4 5 4z" />
          <path d="M9 13l12-9" />
        </svg>
      </a>
    </div>
  );
}
