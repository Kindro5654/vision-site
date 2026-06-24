'use client';
import { useState } from 'react';
import { useMounted, reveal } from '@/lib/useMounted';

export default function Clubhouse() {
  const m = useMounted();
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  return (
    <section
      className="vc-clubhouse"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '72px 48px 92px',
      }}
    >
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto' }}>
        <h2
          className="osw vc-club-head"
          style={{
            fontWeight: 700,
            fontSize: 58,
            lineHeight: 1.02,
            letterSpacing: '.01em',
            textTransform: 'uppercase',
            marginBottom: 34,
            ...reveal(m, 0.02),
          }}
        >
          <span style={{ color: 'var(--accent)' }}>Клубный дом Vision</span>
          <br />
          <span style={{ color: 'var(--heading)' }}>Место силы и доверия</span>
        </h2>

        <div
          style={{
            position: 'relative',
            borderRadius: 24,
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            background: '#111114',
            boxShadow: '0 40px 90px -44px rgba(0,0,0,.7)',
            ...reveal(m, 0.12),
          }}
        >
          {/* placeholder gradient — drop in a real video here */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(60% 80% at 30% 40%, rgba(233,107,30,.18), transparent), linear-gradient(160deg,#2a2a30,#0d0d10)',
            }}
          />

          {/* scrim */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg,rgba(8,8,10,.45) 0%,transparent 22%,transparent 50%,rgba(8,8,10,.72) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* top bar */}
          <div
            className="vc-club-top"
            style={{
              position: 'absolute',
              top: 22,
              left: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(233,107,30,.6)',
              }}
            >
              <span
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  border: '3px solid #1A0E03',
                }}
              />
            </span>
            <div className="vc-club-meta">
              <div style={{ fontWeight: 600, fontSize: 16, color: '#fff', lineHeight: 1.1 }}>
                Vision Club House
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>Vision Club</div>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 22,
              right: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              color: 'rgba(255,255,255,.85)',
            }}
          >
            <span
              className="vc-ico"
              onClick={() => setMuted((v) => !v)}
              style={{ cursor: 'pointer', display: 'flex' }}
              role="button"
              aria-label={muted ? 'Включить звук' : 'Выключить звук'}
            >
              {muted ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M22 9l-6 6M16 9l6 6" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
                </svg>
              )}
            </span>
          </div>

          {/* center controls */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 26,
            }}
          >
            <span className="vc-mini" style={{ opacity: 0.8, color: '#fff', cursor: 'pointer', display: 'flex' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M11 12l8-6v12zM4 6h2v12H4z" /></svg>
            </span>
            <button
              className="vc-pp vc-club-pp"
              onClick={() => setPlaying((v) => !v)}
              style={{
                width: 78,
                height: 78,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.18)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                border: 0,
              }}
              aria-label={playing ? 'Пауза' : 'Воспроизвести'}
            >
              {playing ? (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <span className="vc-mini" style={{ opacity: 0.8, color: '#fff', cursor: 'pointer', display: 'flex' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M13 12L5 6v12zM18 6h2v12h-2z" /></svg>
            </span>
          </div>

          {/* chip */}
          <div
            className="vc-club-chip osw"
            style={{
              position: 'absolute',
              left: 24,
              bottom: 60,
              background: 'var(--accent)',
              borderRadius: 13,
              padding: '14px 22px',
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: '.02em',
              color: '#1A0E03',
              boxShadow: '0 12px 30px -12px rgba(233,107,30,.7)',
            }}
          >
            Онлайн-экскурсия по Клубному Дому
          </div>

          {/* progress */}
          <div
            style={{
              position: 'absolute',
              left: 24,
              right: 24,
              bottom: 26,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span className="tn" style={{ fontSize: 13, color: 'rgba(255,255,255,.85)' }}>
              0:02 / 1:00
            </span>
            <div
              style={{
                flex: 1,
                height: 4,
                borderRadius: 999,
                background: 'rgba(255,255,255,.25)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '4%',
                  background: 'var(--accent)',
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        </div>

        <div className="vc-club-below" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginTop: 22, ...reveal(m, 0.18) }}>
          <a
            href="#"
            className="vc-club-tour-btn"
            style={{
              alignItems: 'center',
              gap: 14,
              background: 'linear-gradient(135deg,#F2851B,#E0691C)',
              border: '1px solid rgba(255,255,255,.16)',
              borderRadius: 16,
              padding: '15px 18px',
              textDecoration: 'none',
              boxShadow:
                '0 14px 34px -14px rgba(233,107,30,.85),inset 0 1px 0 rgba(255,255,255,.28)',
              gridColumn: '1 / -1',
            }}
          >
            <span
              style={{
                flex: '0 0 44px',
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(22,11,3,.92)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,.3)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ display: 'block', marginLeft: 2 }}>
                <path d="M8 5l12 7-12 7z" fill="#F2851B" />
              </svg>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
              <span
                className="osw"
                style={{
                  fontWeight: 600,
                  fontSize: 10.5,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(26,14,3,.62)',
                }}
              >
                Смотреть видео
              </span>
              <span
                className="osw"
                style={{
                  fontWeight: 600,
                  fontSize: 17,
                  lineHeight: 1.15,
                  letterSpacing: '.01em',
                  textTransform: 'uppercase',
                  color: '#160B03',
                }}
              >
                Онлайн-экскурсия по Клубному Дому
              </span>
            </span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(26,14,3,.7)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 22px' }}>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </a>
          <p
            className="vc-club-desc"
            style={{
              margin: 0,
              background: 'linear-gradient(165deg,#202024,#161619)',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 18,
              padding: '26px 28px',
              fontSize: 18,
              lineHeight: 1.55,
              color: '#C9C5BD',
            }}
          >
            Расположен в самом сердце Дубая — это не коворкинг и не бизнес-центр, а частное пространство для
            встреч предпринимателей, форум-групп и глубоких разговоров единомышленников.
          </p>
          <div
            className="vc-club-quote"
            style={{
              background: 'var(--accent)',
              borderRadius: 18,
              padding: '26px 28px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              className="osw"
              style={{
                fontWeight: 600,
                fontSize: 22,
                lineHeight: 1.16,
                letterSpacing: '.01em',
                textTransform: 'uppercase',
                color: '#1A0E03',
              }}
            >
              Здесь свои. Обсуждаем то, что не выносят наружу — стратегические, финансовые и личные вопросы
              бизнеса.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
