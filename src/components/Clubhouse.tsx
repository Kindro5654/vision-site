'use client';
import { useEffect, useRef, useState } from 'react';
import { useMounted, reveal } from '@/lib/useMounted';
import { href, type Lang } from '@/lib/i18n';

const COPY = {
  ru: {
    head: ['Клубный дом Vision', 'Место силы и доверия'],
    iframe: 'Vision Clubhouse — онлайн-экскурсия',
    watch: 'Смотреть видео',
    tour: 'Онлайн-экскурсия по Клубному Дому',
    desc: 'Расположен в самом сердце Дубая — это не коворкинг и не бизнес-центр, а частное пространство для встреч предпринимателей, форум-групп и глубоких разговоров единомышленников.',
    address: 'Адрес и как добраться →',
    quote: 'Здесь свои. Обсуждаем то, что не выносят наружу — стратегические, финансовые и личные вопросы бизнеса.',
  },
  en: {
    head: ['The Vision Clubhouse', 'A home built on trust'],
    iframe: 'Vision Clubhouse — virtual tour',
    watch: 'Watch the video',
    tour: 'Virtual tour of the Clubhouse',
    desc: 'Set in the heart of Dubai, it is neither a co-working space nor an office centre, but a private space for entrepreneurs to meet, for forum groups and for meaningful conversations between like-minded people.',
    address: 'Address and directions →',
    quote: 'Here, you are among peers. We discuss what never leaves the room — the strategic, financial and personal sides of running a business.',
  },
};

const VIDEO_ID = 'WDTME_9tmpQ';

export default function Clubhouse({ lang = 'ru' }: { lang?: Lang }) {
  const t = COPY[lang];
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
        padding: '72px clamp(16px, 4vw, 96px) 92px',
      }}
    >
      <div style={{ position: 'relative', maxWidth: 2400, margin: '0 auto' }}>
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
          <span style={{ color: 'var(--accent)' }}>{t.head[0]}</span>
          <br />
          <span style={{ color: 'var(--heading)' }}>{t.head[1]}</span>
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
              title={t.iframe}
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

        <a
          href="https://vision-club.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="vc-tour-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginTop: 22,
            background: 'linear-gradient(135deg,#F2851B,#E0691C)',
            border: '1px solid rgba(255,255,255,.16)',
            borderRadius: 16,
            padding: '15px 18px',
            textDecoration: 'none',
            boxShadow:
              '0 14px 34px -14px rgba(233,107,30,.85), inset 0 1px 0 rgba(255,255,255,.28)',
            transition: 'transform .25s, box-shadow .25s, filter .25s',
            ...reveal(m, 0.16),
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
              {t.watch}
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
              {t.tour}
            </span>
          </span>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(26,14,3,.7)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flex: '0 0 22px' }}
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </a>

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
            {t.desc} <a
              href={href('clubhouse', lang)}
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                borderBottom: '1px dashed var(--accent)',
                paddingBottom: 1,
                whiteSpace: 'nowrap',
              }}
            >{t.address}</a>
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
              {t.quote}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
