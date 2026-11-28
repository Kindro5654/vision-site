'use client';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { asset } from '@/lib/site';
import type { Lang } from '@/lib/i18n';

const PEOPLE = [
  { name: 'Павел\nГительман', role: 'Предприниматель, основатель и CEO агентства RTA', src: '/assets/people/sp-gitelman.webp', objPos: 'center 22%', en: { name: 'Pavel\nGitelman', role: 'Entrepreneur, founder and CEO of RTA agency' } },
  { name: 'Олег\nТорбосов', role: 'Предприниматель, основатель и CEO международной компании Whitewill', src: '/assets/people/sp-torbosov.webp', objPos: 'center 25%', en: { name: 'Oleg\nTorbosov', role: 'Entrepreneur, founder and CEO of the international company Whitewill' } },
  { name: 'Евгений\nЧичваркин', role: 'Предприниматель, сооснователь сети салонов «Евросеть»', src: '/assets/people/sp-chichvarkin.webp', objPos: 'center 25%', en: { name: 'Evgeny\nChichvarkin', role: 'Entrepreneur, co-founder of the Euroset retail chain' } },
  { name: 'Оскар\nХартман', role: 'Предприниматель, серийный инвестор и основатель более 150 международных компаний', src: '/assets/people/sp-hartman.webp', objPos: 'center 25%', en: { name: 'Oskar\nHartmann', role: 'Entrepreneur, serial investor and founder of more than 150 international companies' } },
  null, // CTA placeholder
  { name: 'Федор\nОвчинников', role: 'Предприниматель, основатель сети Додо Пицца', src: '/assets/people/sp-ovchinnikov.webp', objPos: 'center 22%', en: { name: 'Fedor\nOvchinnikov', role: 'Entrepreneur, founder of Dodo Pizza' } },
  { name: 'Виктор\nКузнецов', role: 'Предприниматель, сооснователь онлайн-гипермаркета «ВсеИнструменты.ру»', src: '/assets/people/sp-kuznetsov.webp', objPos: 'center 25%', en: { name: 'Viktor\nKuznetsov', role: 'Entrepreneur, co-founder of the online hypermarket VseInstrumenti.ru' } },
  { name: 'Михаил\nДашкиев', role: 'Предприниматель и методолог с 15-летним опытом развития компаний', src: '/assets/people/sp-dashkiev.webp', objPos: 'center 25%', en: { name: 'Mikhail\nDashkiev', role: 'Entrepreneur and business methodologist with 15 years of experience in growing companies' } },
] as const;

const COPY = {
  ru: { mentors: 'Эти спикеры станут вашими наставниками для развития' },
  en: { mentors: 'Speakers who become your mentors as you grow' },
};

export default function Speakers({ lang = 'ru' }: { lang?: Lang }) {
  const t = COPY[lang];
  const people = PEOPLE.map((p) => (p && lang === 'en' ? { ...p, ...p.en } : p));
  const m = useMounted();
  return (
    <section
      className="vc-sec"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '84px clamp(16px, 4vw, 96px) 96px',
      }}
    >
      <div style={{ position: 'relative', maxWidth: 2400, margin: '0 auto' }}>
        <h2
          className="osw vc-sp-head"
          style={{
            fontWeight: 700,
            fontSize: 62,
            lineHeight: 1,
            letterSpacing: '.01em',
            textTransform: 'uppercase',
            marginBottom: 48,
            ...reveal(m, 0.02),
          }}
        >
          {lang === 'en' ? (
            <>
              <span style={{ color: 'var(--heading)' }}>Vision</span>{' '}
              <span style={{ color: 'var(--accent)' }}>speakers</span>
            </>
          ) : (
            <>
              <span style={{ color: 'var(--accent)' }}>Спикеры</span>{' '}
              <span style={{ color: 'var(--heading)' }}>Vision</span>
            </>
          )}
        </h2>

        <div
          className="vc-sp-banner"
          style={{
            alignItems: 'center',
            gap: 15,
            background: 'linear-gradient(135deg,#F2851B,#E0691C)',
            borderRadius: 18,
            padding: '20px 22px',
            marginBottom: 22,
            boxShadow: '0 16px 40px -18px rgba(233,107,30,.55)',
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#160B03" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 30px' }}>
            <path d="M22 10L12 5 2 10l10 5 10-5z" />
            <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
          </svg>
          <div
            className="osw"
            style={{
              fontWeight: 700,
              fontSize: 19,
              lineHeight: 1.14,
              letterSpacing: '.01em',
              textTransform: 'uppercase',
              color: '#160B03',
            }}
          >
            {t.mentors}
          </div>
        </div>

        <div
          className="vc-sp-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '28px 26px' }}
        >
          {people.map((p, i) =>
            p === null ? (
              <div
                key={`cta-${i}`}
                className="vc-sp-cta osw"
                style={{
                  gridRow: 'span 2',
                  background: 'var(--accent)',
                  borderRadius: 22,
                  padding: '38px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  ...reveal(m, 0.06 + i * 0.05),
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 34,
                    lineHeight: 1.12,
                    letterSpacing: '.01em',
                    textTransform: 'uppercase',
                    color: '#1A0E03',
                  }}
                >
                  {t.mentors}
                </div>
              </div>
            ) : (
              <article key={p.name} className="vc-sp" style={{ display: 'flex', flexDirection: 'column', ...reveal(m, 0.06 + i * 0.05) }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 11,
                    marginBottom: 16,
                    minHeight: 62,
                  }}
                >
                  <span
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      flexShrink: 0,
                      marginTop: 7,
                      boxShadow: '0 0 8px rgba(233,107,30,.7)',
                    }}
                  />
                  <h3
                    className="osw"
                    style={{
                      fontWeight: 700,
                      fontSize: 24,
                      lineHeight: 1.08,
                      letterSpacing: '.02em',
                      textTransform: 'uppercase',
                      color: 'var(--heading)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {p.name}
                  </h3>
                </div>
                <div className="vc-ph" style={{ borderRadius: 18, overflow: 'hidden', background: 'var(--panel)' }}>
                  <Image
                    src={asset(p.src)}
                    alt={p.name.replace('\n', ' ')}
                    width={310}
                    height={340}
                    loading="lazy"
                    className="vc-ph-img"
                    style={{ objectPosition: p.objPos }}
                  />
                </div>
                <div
                  className="vc-role"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    marginTop: 16,
                    background: 'linear-gradient(165deg,#202024,#161619)',
                    border: '1px solid rgba(255,255,255,.07)',
                    borderRadius: 16,
                    padding: '20px 22px',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                  }}
                >
                  <span
                    className="vc-rbar"
                    style={{
                      flexShrink: 0,
                      width: 3,
                      alignSelf: 'stretch',
                      borderRadius: 3,
                      background: 'linear-gradient(180deg,var(--accent),rgba(233,107,30,.12))',
                    }}
                  />
                  <p
                    style={{
                      position: 'relative',
                      fontSize: 16.5,
                      lineHeight: 1.45,
                      color: '#B6B2A9',
                      textAlign: 'left',
                    }}
                  >
                    {p.role}
                  </p>
                  <span
                    aria-hidden
                    className="osw"
                    style={{
                      position: 'absolute',
                      right: 14,
                      bottom: 6,
                      fontWeight: 700,
                      fontSize: 60,
                      lineHeight: 1,
                      color: 'rgba(233,107,30,.08)',
                      pointerEvents: 'none',
                    }}
                  >
                    ”
                  </span>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
