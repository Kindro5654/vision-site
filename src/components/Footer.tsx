'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SITE, asset } from '@/lib/site';
import type { Lang, PageKey } from '@/lib/i18n';
import './footer.css';

// Подвал сайта по макету 28.11: бренд + WhatsApp + соцсети | Клуб | Форматы | Реквизиты.
// На телефоне колонки — аккордеоны, по умолчанию открыт только «Клуб».

type Link = { label: string; href: string };

const COPY: Record<
  Lang,
  {
    tagline: string;
    waNote: string;
    club: string;
    formats: string;
    legal: string;
    clubLinks: Link[];
    formatLinks: Link[];
    tel: string;
    rights: string;
    privacy: Link;
    up: string;
    logoAria: string;
  }
> = {
  ru: {
    tagline: 'Бизнес-клуб в Дубае · Альянс клубов в 10 странах',
    waNote: 'Написать в WhatsApp',
    club: 'Клуб',
    formats: 'Форматы',
    legal: 'Реквизиты',
    clubLinks: [
      { label: 'О клубе', href: '/o-klube/' },
      { label: 'Резиденты', href: '/#residents' },
      { label: 'Спикеры', href: '/#speakers' },
      { label: 'Клубный дом', href: '/klubnyi-dom/' },
    ],
    formatLinks: [
      { label: 'Мероприятия', href: '/#events' },
      { label: 'Форум-группы', href: '/blog/zachem-biznesu-forum-gruppy/' },
      { label: 'Альянс клубов', href: '/#alliance' },
      { label: 'Приложение', href: '/#app' },
    ],
    tel: 'Тел.:',
    rights: 'Все права защищены.',
    privacy: { label: 'Политика конфиденциальности', href: '/privacy/' },
    up: 'Наверх',
    logoAria: 'Vision Club — на главную',
  },
  en: {
    tagline: 'Business club in Dubai · Alliance Clubs in 10 countries',
    waNote: 'Message us on WhatsApp',
    club: 'The club',
    formats: 'Formats',
    legal: 'Company details',
    clubLinks: [
      { label: 'About', href: '/en/about/' },
      { label: 'Members', href: '/en/#residents' },
      { label: 'Speakers', href: '/en/#speakers' },
      { label: 'Clubhouse', href: '/en/clubhouse/' },
    ],
    formatLinks: [
      { label: 'Events', href: '/en/#events' },
      { label: 'Forum groups', href: '/en/#events' },
      { label: 'Alliance Clubs', href: '/en/#alliance' },
      { label: 'App', href: '/en/#app' },
    ],
    tel: 'Tel:',
    rights: 'All rights reserved.',
    privacy: { label: 'Privacy policy', href: '/en/privacy/' },
    up: 'Back to top',
    logoAria: 'Vision Club — home page',
  },
};

const ICON = { stroke: '#f4f1ec', strokeWidth: 1.7, fill: 'none' } as const;

// page принимается для совместимости с вызовами: переключатель языка теперь только в шапке.
export default function Footer({ lang = 'ru' }: { lang?: Lang; page?: PageKey }) {
  const t = COPY[lang];
  const colsRef = useRef<HTMLDivElement>(null);
  const whatsapp = lang === 'en' ? SITE.whatsappEn : SITE.whatsapp;
  const home = lang === 'en' ? '/en/' : '/';

  // Десктоп: все колонки раскрыты. Телефон: аккордеоны, открыта только первая.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 641px)');
    const sync = () => {
      colsRef.current?.querySelectorAll('details').forEach((d, i) => {
        d.open = mq.matches || i === 0;
      });
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <footer className="vf">
      <div className="vf__wrap">
        <div className="vf__grid">
          <div className="vf__brand">
            <a className="vf__logo" href={home} aria-label={t.logoAria}>
              <Image src={asset('/assets/logo-vision.png')} alt="Vision Club" width={130} height={30} style={{ height: 30, width: 'auto' }} />
            </a>
            <p className="vf__tagline">{t.tagline}</p>
            <a className="vf__wa" href={whatsapp} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="1.8" strokeLinejoin="round">
                <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" />
              </svg>
              <span className="vf__wa-text">
                <b>{SITE.phone}</b>
                <small>{t.waNote}</small>
              </span>
              <span aria-hidden="true" className="vf__wa-arrow">→</span>
            </a>
            <div className="vf__socials">
              <a href={SITE.socials.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" {...ICON} strokeLinejoin="round">
                  <path d="M21 4L3 11l6 2 2 6 3-4 5 4z" />
                  <path d="M9 13l12-9" />
                </svg>
              </a>
              <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" {...ICON}>
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r=".8" fill="#f4f1ec" />
                </svg>
              </a>
              <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" {...ICON}>
                  <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                  <path d="M8 10.5v6M8 7.5v.1M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6S16 11.4 16 13v3.5" />
                </svg>
              </a>
              <a href={`mailto:${SITE.email}`} aria-label={`Email ${SITE.email}`}>
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" {...ICON}>
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="vf__cols" ref={colsRef}>
            <details className="vf__col" open>
              <summary>{t.club}</summary>
              <nav className="vf__links" aria-label={t.club}>
                {t.clubLinks.map((l) => (
                  <a key={l.href} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </nav>
            </details>
            <details className="vf__col" open>
              <summary>{t.formats}</summary>
              <nav className="vf__links" aria-label={t.formats}>
                {t.formatLinks.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </nav>
            </details>
            <details className="vf__col" open>
              <summary>{t.legal}</summary>
              <div className="vf__legal">
                <span>{SITE.legal.name}</span>
                <span>{SITE.legal.address}</span>
                <span>
                  {t.tel} <a href={`tel:${SITE.legal.phoneE164}`}>{SITE.legal.phone}</a>
                </span>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </details>
          </div>
        </div>

        <div className="vf__bottom">
          <div className="vf__bottom-left">
            <span>
              © 2026 {SITE.legal.name}. {t.rights}
            </span>
            <a href={t.privacy.href}>{t.privacy.label}</a>
          </div>
          <button type="button" className="vf__up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {t.up} <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
