'use client';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { asset } from '@/lib/site';

const CHIPS = ['Доступ к базе знаний', 'Поиск резидентов', 'Чаты', 'Геолокация', 'Запись на ивенты'];

export default function AppSection() {
  const m = useMounted();
  return (
    <section
      className="vc-sec"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '72px 48px 88px',
      }}
    >
      <div
        className="vc-app-grid"
        style={{
          position: 'relative',
          maxWidth: 1320,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.16fr',
          gap: 32,
          alignItems: 'stretch',
        }}
      >
        {/* left */}
        <div
          className="vc-app-left"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(165deg,#27272B,#19191D)',
            border: '1px solid rgba(255,255,255,.06)',
            borderRadius: 26,
            padding: '60px 52px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            ...reveal(m, 0.04),
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -120,
              left: -80,
              width: 420,
              height: 420,
              borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(233,107,30,.12),transparent 64%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                border: '1px solid rgba(233,107,30,.4)',
                borderRadius: 999,
                padding: '8px 18px',
                marginBottom: 26,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 10px var(--accent)',
                }}
              />
              <span
                className="osw"
                style={{
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                Приложение Vision
              </span>
            </div>
            <h2
              className="osw"
              style={{
                fontWeight: 700,
                fontSize: 70,
                lineHeight: 0.98,
                letterSpacing: '.01em',
                textTransform: 'uppercase',
                textWrap: 'balance' as any,
              }}
            >
              <span style={{ color: 'var(--heading)' }}>
                Ваш клуб <span style={{ color: 'var(--accent)' }}>—</span>
              </span>
              <br />
              <span style={{ color: 'var(--accent)' }}>всегда рядом</span>
            </h2>
            <p style={{ fontSize: 21, lineHeight: 1.5, color: '#B6B2A9', marginTop: 24, maxWidth: 520 }}>
              Личный доступ к событиям, контактам, форум-группам и партнёрам Альянса — в одном приложении.
            </p>
            <div className="vc-app-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 13, marginTop: 34, maxWidth: 560 }}>
              {CHIPS.map((c) => (
                <span
                  key={c}
                  className="vc-chip"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    border: '1px solid rgba(255,255,255,.18)',
                    borderRadius: 999,
                    padding: '13px 24px',
                    fontSize: 17,
                    fontWeight: 500,
                    color: '#EDEAE4',
                  }}
                >
                  <span
                    className="vc-cdot"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                    }}
                  />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <div
          className="vc-phones"
          style={{
            position: 'relative',
            background: 'linear-gradient(150deg,#F2851B,#E0691C)',
            borderRadius: 26,
            overflow: 'hidden',
            minHeight: 640,
            ...reveal(m, 0.14),
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -90,
              right: -70,
              width: 380,
              height: 380,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.12)',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: -110,
              left: -60,
              width: 320,
              height: 320,
              borderRadius: '50%',
              background: 'rgba(0,0,0,.06)',
              pointerEvents: 'none',
            }}
          />

          <div className="vc-pb" style={{ position: 'absolute', right: 26, top: 60, zIndex: 1 }}>
            <div style={{ animation: 'vcFloatB 7s ease-in-out infinite' }}>
              <div
                style={{
                  width: 262,
                  height: 540,
                  borderRadius: 42,
                  background: '#0C0C0E',
                  padding: 8,
                  boxShadow: '0 40px 80px -30px rgba(0,0,0,.55)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: 35,
                    overflow: 'hidden',
                    background: '#0C0C0E',
                  }}
                >
                  <Image
                    src={asset('/assets/app/screen-members.jpg')}
                    alt="Vision App — участники"
                    fill
                    sizes="262px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="vc-pa" style={{ position: 'absolute', left: 34, bottom: 46, zIndex: 2 }}>
            <div style={{ animation: 'vcFloatA 6s ease-in-out infinite' }}>
              <div
                style={{
                  width: 278,
                  height: 574,
                  borderRadius: 44,
                  background: '#0C0C0E',
                  padding: 9,
                  boxShadow: '0 50px 90px -28px rgba(0,0,0,.6)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: 36,
                    overflow: 'hidden',
                    background: '#0C0C0E',
                  }}
                >
                  <Image
                    src={asset('/assets/app/screen-events.jpg')}
                    alt="Vision App — встречи"
                    fill
                    sizes="278px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
