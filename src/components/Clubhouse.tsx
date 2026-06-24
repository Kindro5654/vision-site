'use client';
import { useEffect, useRef, useState } from 'react';
import { useMounted, reveal } from '@/lib/useMounted';

const VIDEO_ID = 'WDTME_9tmpQ';

export default function Clubhouse() {
  const m = useMounted();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
    `?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}` +
    `&playsinline=1&modestbranding=1&rel=0&controls=1`;

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
          ref={wrapRef}
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
          {inView ? (
            <iframe
              src={embedSrc}
              title="Vision Clubhouse — онлайн-экскурсия"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          ) : (
            <>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(60% 80% at 30% 40%, rgba(233,107,30,.22), transparent), linear-gradient(160deg,#2a2a30,#0d0d10)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
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
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </>
          )}
        </div>

        <div
          className="vc-club-below"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 22,
            marginTop: 22,
            ...reveal(m, 0.18),
          }}
        >
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
