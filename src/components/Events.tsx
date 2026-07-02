'use client';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { useDragSlider } from '@/lib/useDragSlider';
import { asset } from '@/lib/site';
import { CLUB_EVENTS as EVENTS } from '@/lib/events';

export default function Events() {
  const m = useMounted();
  const { ref, step } = useDragSlider(456);

  return (
    <section
      className="vc-ev-root"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '84px 0 96px',
      }}
    >
      <div
        className="vc-ev-head"
        style={{
          maxWidth: 2400,
          margin: '0 auto 48px',
          padding: '0 clamp(16px, 4vw, 96px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          ...reveal(m, 0.02),
        }}
      >
        <h2
          className="osw vc-ev-title"
          style={{
            fontWeight: 700,
            fontSize: 64,
            lineHeight: 0.96,
            letterSpacing: '.01em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>Мероприятия</span>
          <br />
          <span style={{ color: 'var(--heading)' }}>Vision Club</span>
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
          <span style={{ fontSize: 15, color: 'var(--dim)', letterSpacing: '.02em' }}>
            Листайте&nbsp;→
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="vc-arrow" onClick={() => step(-1)} aria-label="Назад">
              <Arrow dir="left" />
            </button>
            <button className="vc-arrow" onClick={() => step(1)} aria-label="Вперёд">
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="vc-track vc-track-events"
        style={{
          display: 'flex',
          gap: 24,
          overflowX: 'auto',
          padding: '6px clamp(16px, 4vw, 96px) 8px',
          paddingLeft: 'max(clamp(16px, 4vw, 96px), calc((100% - 2400px) / 2 + clamp(16px, 4vw, 96px)))',
          scrollPaddingLeft: 'max(clamp(16px, 4vw, 96px), calc((100% - 2400px) / 2 + clamp(16px, 4vw, 96px)))',
          ...reveal(m, 0.12),
        }}
      >
        {EVENTS.map((ev) => (
          <article
            key={ev.num}
            className="vc-card-evt"
            style={{
              scrollSnapAlign: 'start',
              flex: '0 0 432px',
              background: 'var(--panel-4)',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 22,
              padding: '16px 16px 28px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ borderRadius: 16, overflow: 'hidden' }}>
              <Image
                src={asset(ev.src)}
                alt={ev.title}
                width={432}
                height={300}
                loading="lazy"
                className="vc-card-img"
                style={{ objectPosition: ev.objPos }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                margin: '22px 4px 0',
              }}
            >
              <span
                className="osw"
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'var(--accent)',
                  letterSpacing: '.04em',
                }}
              >
                {ev.num}
              </span>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,.25)',
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#8C887F',
                }}
              >
                {ev.tag}
              </span>
            </div>
            <h3
              className="osw"
              style={{
                fontWeight: 700,
                fontSize: 27,
                lineHeight: 1.05,
                textTransform: 'uppercase',
                color: 'var(--heading)',
                margin: '12px 4px 0',
                minHeight: 60,
              }}
            >
              {ev.title}
            </h3>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--muted-2)', margin: '14px 4px 0', minHeight: 102 }}>
              {ev.desc}
            </p>
          </article>
        ))}
        <div style={{ flex: '0 0 24px' }} />
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}
