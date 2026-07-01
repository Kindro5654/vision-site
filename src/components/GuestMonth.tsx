'use client';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { asset } from '@/lib/site';

const BENEFITS = [
  { num: '01', text: 'Персональный бизнес-менеджер сведёт с теми, кто нужен тебе прямо сейчас' },
  { num: '02', text: 'Форум-группа из 10 равных по масштабу разберёт твой бизнес и даст честные ответы' },
  { num: '03', text: '220+ предпринимателей из 70+ отраслей, которые уже прошли твой путь' },
  { num: '04', text: '20+ событий в месяц: ужины, разборы, гольф, факап-найты, выезды с семьями' },
];

function revFade(mounted: boolean, delay: number): React.CSSProperties {
  return mounted
    ? {
        opacity: 1,
        transform: 'scale(1)',
        transition: `transform 1.3s cubic-bezier(.4,0,.2,1) ${delay}s`,
      }
    : { opacity: 1, transform: 'scale(1.04)' };
}

export default function GuestMonth() {
  const m = useMounted();

  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg,#0B0B0D 0%,#140D07 46%,#0B0B0D 100%)',
        color: 'var(--text)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,.07)',
        borderBottom: '1px solid rgba(255,255,255,.07)',
      }}
      aria-labelledby="vc-gm-title"
    >
      {/* warm spotlight */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 1100,
          height: 680,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse,rgba(233,107,30,.16),transparent 68%)',
          filter: 'blur(30px)',
          animation: 'vcGmGlow 8s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      {/* diagonal campaign stripes */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(-45deg,rgba(233,107,30,.05) 0 2px,transparent 2px 26px)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 80% at 50% 50%,#000,transparent 78%)',
          maskImage:
            'radial-gradient(ellipse 70% 80% at 50% 50%,#000,transparent 78%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="vc-gm-shell"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1620,
          margin: '0 auto',
          padding: '76px 44px 84px',
        }}
      >
        <div
          className="vc-gm-panel"
          style={{
            position: 'relative',
            border: '1px solid rgba(233,107,30,.3)',
            borderRadius: 30,
            background:
              'linear-gradient(135deg,rgba(233,107,30,.08),rgba(255,255,255,.012) 55%)',
            boxShadow:
              '0 50px 130px -50px rgba(233,107,30,.4), inset 0 1px 0 rgba(255,255,255,.05)',
            padding: '64px 60px',
            overflow: 'hidden',
          }}
        >
          {/* corner ticket tag */}
          <div
            className="vc-gm-tag"
            style={{
              position: 'absolute',
              top: 0,
              left: 60,
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              transform: 'translateY(-50%)',
              background: 'var(--accent)',
              color: '#1A0E03',
              padding: '9px 20px',
              borderRadius: 999,
              boxShadow: '0 12px 30px -8px rgba(233,107,30,.7)',
              ...reveal(m, 0),
            }}
          >
            <span
              style={{
                position: 'relative',
                width: 8,
                height: 8,
                flexShrink: 0,
              }}
              aria-hidden
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#1A0E03',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#1A0E03',
                  animation: 'vcGmPulse 2.4s ease-out infinite',
                }}
              />
            </span>
            <span
              className="osw"
              style={{
                fontWeight: 700,
                fontSize: 12.5,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
              }}
            >
              Гостевой доступ · спецпредложение
            </span>
          </div>

          <div
            className="vc-gm-body"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr .95fr',
              gap: 60,
              alignItems: 'center',
            }}
          >
            {/* left content */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="eyebrow" style={reveal(m, 0.06)}>
                <span className="eyebrow-line" />
                <span className="eyebrow-text">Гостевой месяц в Vision Club</span>
              </div>

              <h2
                id="vc-gm-title"
                className="osw vc-gm-head"
                style={{
                  margin: '20px 0 0',
                  fontWeight: 700,
                  fontSize: 52,
                  lineHeight: 1.08,
                  letterSpacing: '.005em',
                  textTransform: 'uppercase',
                  color: 'var(--heading)',
                  textWrap: 'balance' as any,
                  ...reveal(m, 0.12),
                }}
              >
                Один месяц в Vision меняет больше,{' '}
                <span style={{ color: 'var(--accent)' }}>чем год в одиночку</span>
              </h2>

              <p
                style={{
                  margin: '22px 0 0',
                  maxWidth: 520,
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: '#B8B4AB',
                  ...reveal(m, 0.2),
                }}
              >
                За 30 дней ты гарантированно закроешь конкретную бизнес-задачу или личный запрос —
                опытом, связями и инструментами резидентов клуба.
              </p>

              <div
                style={{
                  marginTop: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 11,
                  ...reveal(m, 0.28),
                }}
              >
                {BENEFITS.map((b) => (
                  <div
                    key={b.num}
                    className="vc-gm-item"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 18,
                      padding: '17px 20px',
                      border: '1px solid rgba(255,255,255,.1)',
                      borderRadius: 14,
                      background: 'rgba(11,11,13,.4)',
                    }}
                  >
                    <span
                      className="vc-gm-num osw"
                      style={{
                        fontWeight: 700,
                        fontSize: 22,
                        lineHeight: 1,
                        color: '#6E5236',
                        flexShrink: 0,
                        minWidth: 34,
                      }}
                    >
                      {b.num}
                    </span>
                    <span style={{ fontSize: 16, lineHeight: 1.5, color: '#DAD6CE' }}>
                      {b.text}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="vc-gm-foot"
                style={{
                  marginTop: 32,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  ...reveal(m, 0.36),
                }}
              >
                <a
                  href="#apply"
                  className="vc-gm-cta osw"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    height: 64,
                    padding: '0 34px',
                    borderRadius: 14,
                    background: 'linear-gradient(180deg,#F2851B,#E0691C)',
                    color: '#1A0E03',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: 17,
                    letterSpacing: '.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  Забронировать гостевой месяц
                  <span style={{ fontSize: 19 }}>→</span>
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    className="osw"
                    style={{
                      fontWeight: 700,
                      fontSize: 40,
                      lineHeight: 1,
                      color: 'var(--accent)',
                    }}
                  >
                    30
                  </span>
                  <span style={{ fontSize: 13, lineHeight: 1.35, color: '#98948B' }}>
                    дней —
                    <br />
                    один спринт
                  </span>
                </div>
              </div>
            </div>

            {/* right media */}
            <div
              className="vc-gm-media"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                minHeight: 620,
                ...revFade(m, 0.14),
              }}
            >
              <div
                className="vc-gm-photo vc-gm-main"
                style={{
                  position: 'relative',
                  flex: 1.55,
                  borderRadius: 18,
                  overflow: 'hidden',
                  minHeight: 0,
                }}
              >
                <Image
                  src={asset('/assets/guest/handshake.jpeg')}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 100vw, 45vw"
                  loading="lazy"
                  className="vc-gm-ph"
                  style={{ objectFit: 'cover', objectPosition: 'center 22%' }}
                />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)',
                    borderRadius: 18,
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 18,
                    bottom: 18,
                    backdropFilter: 'blur(14px)',
                    background: 'rgba(14,14,16,.55)',
                    border: '1px solid rgba(255,255,255,.14)',
                    borderRadius: 13,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      boxShadow: '0 0 10px var(--accent)',
                    }}
                  />
                  <span
                    className="osw"
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                      color: 'var(--text)',
                    }}
                  >
                    Твоё окружение с первого дня
                  </span>
                </div>
              </div>
              <div
                className="vc-gm-photo vc-gm-second"
                style={{
                  position: 'relative',
                  flex: 1,
                  borderRadius: 18,
                  overflow: 'hidden',
                  minHeight: 0,
                }}
              >
                <Image
                  src={asset('/assets/guest/trio.jpg')}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 100vw, 45vw"
                  loading="lazy"
                  className="vc-gm-ph"
                  style={{ objectFit: 'cover', objectPosition: 'center 18%' }}
                />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)',
                    borderRadius: 18,
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
