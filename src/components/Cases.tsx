'use client';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { asset } from '@/lib/site';

const CASES = [
  {
    title: '$12 млн инвестиций, 11 локаций и 3 производства в Дубае',
    name: 'Константин Гарбуз и Иван Крошный',
    desc: 'Один диалог в клубе: старт $650k → масштаб $12 млн. История, которая вдохновляет.',
    photos: [
      { src: '/assets/cases/case1-a.jpg', pos: 'center 28%' },
      { src: '/assets/cases/case1-b.jpg', pos: 'center 42%' },
    ],
  },
  {
    title: 'Digital-сервис в Дубае',
    name: 'Ольга Нойбергер',
    desc: 'Запустила digital-сервис в Дубае за 3 недели вместо долгих месяцев регистрации.',
    photos: [{ src: '/assets/cases/case2.jpg', pos: 'center 32%' }],
  },
  {
    title: '+4 млн AED к обороту и переход к роли CEO',
    name: 'Катерина Кузнецова',
    desc: 'Как окружение Vision Club помогает навести порядок в хаосе и выйти на новый уровень.',
    photos: [{ src: '/assets/cases/case3.jpg', pos: 'center 60%' }],
  },
];

export default function Cases() {
  const m = useMounted();
  return (
    <section
      className="vc-sec"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '88px clamp(16px, 4vw, 96px) 104px',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 120,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1000,
          height: 600,
          background: 'radial-gradient(ellipse,rgba(233,107,30,.07),transparent 65%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 2400, margin: '0 auto' }}>
        <div className="vc-cases-head" style={reveal(m, 0.02)}>
          <h2
            className="osw"
            style={{
              fontWeight: 700,
              fontSize: 64,
              lineHeight: 1,
              letterSpacing: '.01em',
              textTransform: 'uppercase',
              color: 'var(--heading)',
              marginBottom: 44,
            }}
          >
            Кейсы
          </h2>
          <span
            className="vc-cases-hint"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 7,
              fontSize: 14,
              color: 'var(--dim)',
            }}
          >
            Листайте
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h17M14 2l5 5-5 5" />
            </svg>
          </span>
        </div>

        <div
          className="vc-cases-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 28,
            ...reveal(m, 0.1),
          }}
        >
          {CASES.map((c) => (
            <article
              key={c.name}
              className="vc-case"
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#161618',
                border: '1px solid rgba(233,107,30,.28)',
                borderRadius: 22,
                padding: '30px 28px 30px',
              }}
            >
              <h3
                className="osw"
                style={{
                  fontWeight: 700,
                  fontSize: 25,
                  lineHeight: 1.12,
                  letterSpacing: '.01em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  minHeight: 140,
                }}
              >
                {c.title}
              </h3>
              <div className={`vc-photo ${c.photos.length > 1 ? 'multi' : ''}`}>
                {c.photos.map((ph) => (
                  <Image
                    key={ph.src}
                    src={asset(ph.src)}
                    alt=""
                    fill
                    sizes="(max-width: 820px) 84vw, 33vw"
                    loading="lazy"
                    className="vc-cimg"
                    style={{ objectPosition: ph.pos }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-golos)',
                  fontWeight: 700,
                  fontSize: 21,
                  lineHeight: 1.25,
                  color: 'var(--text)',
                  marginTop: 22,
                  minHeight: 80,
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  height: 1,
                  background: 'rgba(255,255,255,.12)',
                  margin: '18px 0',
                }}
              />
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: 'var(--muted-2)',
                  minHeight: 96,
                  marginBottom: 24,
                }}
              >
                {c.desc}
              </p>
              <a
                href="#"
                className="vc-more osw"
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 58,
                  borderRadius: 13,
                  background: 'var(--accent)',
                  color: '#1A0E03',
                  fontWeight: 600,
                  fontSize: 16,
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                }}
              >
                Подробнее
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
