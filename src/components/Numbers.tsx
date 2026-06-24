'use client';
import { useEffect, useRef, useState } from 'react';
import { useMounted, reveal } from '@/lib/useMounted';

const BAR_DATA = [
  { pct: '25,6 %', v: 25.6, label: 'от 1 до 3 млн $' },
  { pct: '37,5 %', v: 37.5, label: 'от 3 до 10 млн $' },
  { pct: '10 %', v: 10, label: 'от 10 до 30 млн $' },
  { pct: '8,7 %', v: 8.7, label: 'от 30 до 70 млн $' },
  { pct: '15 %', v: 15, label: 'от 70 млн $' },
];

const INDUSTRIES = [
  { name: 'Услуги', v: 20, color: '#F2851B' },
  { name: 'IT', v: 17, color: '#E0691C' },
  { name: 'Торговля', v: 16, color: '#C85A1B' },
  { name: 'Инвестиции', v: 13, color: '#A8481A' },
  { name: 'Финансы', v: 11, color: '#7E3414' },
  { name: 'Производство', v: 9, color: '#43200E' },
  { name: 'Логистика', v: 6, color: '#F7DCC2' },
  { name: 'Ремонт и строительство', v: 8, color: '#F4C49A' },
];

function useCountUp(active: boolean, dur = 1150): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      let k = Math.min(1, (now - t0) / dur);
      k = 1 - Math.pow(1 - k, 3);
      setP(k);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const fb = window.setTimeout(() => {
      cancelAnimationFrame(raf);
      setP(1);
    }, dur + 500);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fb);
    };
  }, [active, dur]);
  return p;
}

function useInView<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}

export default function Numbers() {
  const m = useMounted();
  const [rootRef, inView] = useInView<HTMLDivElement>();
  const p = useCountUp(inView);
  const [hov, setHov] = useState<number | null>(null);

  const maxV = 37.5;
  const bars = BAR_DATA.map((b) => ({
    ...b,
    w: `${((b.v / maxV) * 44 + 12) * p}%`,
  }));
  const single = (pct: number, r: number) => {
    const C = 2 * Math.PI * r;
    const drawn = (pct / 100) * C;
    return `${drawn.toFixed(2)} ${(C - drawn).toFixed(2)}`;
  };
  const d97 = single(97 * p, 84);
  const d31 = single(3.1 * p, 84);
  const n220 = Math.round(220 * p);
  const n250 = Math.round(250 * p);
  const n97 = Math.round(97 * p);
  const n31 = (3.1 * p).toFixed(1).replace('.', ',');

  const R = 86;
  const C = 2 * Math.PI * R;
  const gap = 3;
  let cum = 0;
  const inds = INDUSTRIES.map((s, i) => {
    const frac = s.v / 100;
    const drawn = Math.max(frac * C * p - gap, 0);
    const seg = {
      ...s,
      label: `${s.v} %`,
      dash: `${drawn.toFixed(2)} ${(C - drawn).toFixed(2)}`,
      off: (-cum * C).toFixed(2),
      sw: hov === i ? 36 : 30,
      opacity: hov === null ? 1 : hov === i ? 1 : 0.32,
      i,
    };
    cum += frac;
    return seg;
  });

  const centerNum = hov === null ? '70+' : `${INDUSTRIES[hov].v} %`;
  const centerLabel = hov === null ? 'отраслей в клубе' : INDUSTRIES[hov].name;
  const centerColor = hov === null ? '#F7F4EF' : INDUSTRIES[hov].color;

  return (
    <section
      ref={rootRef}
      className="vc-sec"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '76px 48px 92px',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 52,
          ...reveal(m, 0.02),
        }}
      >
        <div className="chip-pill">
          <span className="chip-dot" />
          <span style={{ fontSize: 17, color: '#EDEAE4', letterSpacing: '.01em' }}>
            Vision в цифрах
          </span>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          maxWidth: 1320,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* block 1 */}
        <div
          className="vc-num-block1"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            gap: 32,
            alignItems: 'stretch',
            ...reveal(m, 0.1),
          }}
        >
          <div>
            <h2
              className="osw vc-num-head"
              style={{
                fontWeight: 700,
                fontSize: 46,
                lineHeight: 1,
                letterSpacing: '.01em',
                textTransform: 'uppercase',
                color: 'var(--heading)',
                marginBottom: 34,
              }}
            >
              Оборот участников клуба
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {bars.map((b) => (
                <div
                  key={b.label}
                  className="vc-bar"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    height: 52,
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: 999,
                    overflow: 'hidden',
                    background: '#161619',
                  }}
                >
                  <div
                    className="vc-fill"
                    style={{
                      height: '100%',
                      flex: `0 0 ${b.w}`,
                      minWidth: 'max-content',
                      display: 'flex',
                      alignItems: 'center',
                      background: 'linear-gradient(90deg,#C2541A,#F2851B)',
                      borderRadius: 999,
                      boxShadow: '0 0 26px rgba(242,133,27,.32)',
                      transition: 'flex-basis .15s linear',
                    }}
                  >
                    <span
                      className="osw"
                      style={{
                        margin: '0 16px 0 24px',
                        fontWeight: 600,
                        fontSize: 20,
                        color: '#1A0E03',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {b.pct}
                    </span>
                  </div>
                  <span
                    style={{
                      marginLeft: 'auto',
                      marginRight: 24,
                      paddingLeft: 14,
                      fontSize: 16,
                      color: '#A29E95',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              className="vc-stat-cards"
              style={{ display: 'grid', gridTemplateColumns: '1.12fr 1fr', gap: 24 }}
            >
              <StatCard num={`${n220}`} suffix="+" sub={'резидентов\nиз 70+ отраслей'} />
              <StatCard num={`${n250}`} suffix="+" sub={'событий\nв год'} />
            </div>

            <div
              className="vc-donut-card"
              style={{
                flex: 1,
                background: 'linear-gradient(180deg,#232327,#1B1B1F)',
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: 22,
                padding: 24,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 18,
                alignContent: 'center',
              }}
            >
              <DonutSingle title="Предприниматели" dash={d97} number={`${n97}`} pct />
              <DonutSingle
                title={
                  <>
                    <span style={{ fontSize: 16, color: '#E7E3DC', lineHeight: 1.2 }}>
                      Топ-менеджеры крупных компаний
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--accent)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      оборот от 50 млн
                    </span>
                  </>
                }
                dash={d31}
                number={`${n31}`}
                pct
              />
            </div>
          </div>
        </div>

        {/* block 2: industries */}
        <div
          className="vc-ind-card"
          style={{
            background: 'linear-gradient(180deg,#232327,#1B1B1F)',
            border: '1px solid rgba(255,255,255,.06)',
            borderRadius: 22,
            padding: '48px 52px',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: 48,
            alignItems: 'center',
            ...reveal(m, 0.18),
          }}
        >
          <h2
            className="osw vc-ind-head"
            style={{
              fontWeight: 700,
              fontSize: 52,
              lineHeight: 0.98,
              letterSpacing: '.01em',
              textTransform: 'uppercase',
              color: 'var(--heading)',
              maxWidth: 300,
            }}
          >
            Ключевые <span style={{ color: 'var(--accent)' }}>отрасли</span> клуба
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="vc-ind-donut"
              style={{ position: 'relative', width: 310, height: 310 }}
            >
              <svg
                width="310"
                height="310"
                viewBox="0 0 240 240"
                style={{ transform: 'rotate(-90deg)' }}
                aria-label="Распределение отраслей"
              >
                {inds.map((seg) => (
                  <circle
                    key={seg.i}
                    cx="120"
                    cy="120"
                    r="86"
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={seg.sw}
                    strokeDasharray={seg.dash}
                    strokeDashoffset={seg.off}
                    opacity={seg.opacity}
                    onMouseEnter={() => setHov(seg.i)}
                    onMouseLeave={() => setHov(null)}
                    style={{
                      cursor: 'pointer',
                      transition: 'opacity .3s, stroke-width .3s',
                    }}
                  />
                ))}
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  pointerEvents: 'none',
                }}
              >
                <div
                  className="osw"
                  style={{
                    fontWeight: 700,
                    fontSize: 44,
                    lineHeight: 1,
                    color: centerColor,
                  }}
                >
                  {centerNum}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'var(--muted-2)',
                    marginTop: 6,
                    maxWidth: 150,
                  }}
                >
                  {centerLabel}
                </div>
              </div>
            </div>
          </div>

          <div
            className="vc-ind-legend"
            style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 248 }}
          >
            {inds.map((seg) => (
              <div
                key={seg.i}
                className="vc-leg"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  padding: '8px 12px',
                  borderRadius: 10,
                  opacity: seg.opacity,
                }}
                onMouseEnter={() => setHov(seg.i)}
                onMouseLeave={() => setHov(null)}
              >
                <span
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: '50%',
                    background: seg.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{ fontSize: 17, color: '#E7E3DC', flex: 1, minWidth: 0 }}
                >
                  {seg.name}
                </span>
                <span
                  className="osw"
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    color: '#C7C3BB',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {seg.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ num, suffix, sub }: { num: string; suffix: string; sub: string }) {
  return (
    <div
      className="vc-num-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(155deg,#F2851B,#E0691C)',
        borderRadius: 22,
        padding: 26,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 150,
      }}
    >
      <div
        className="osw"
        style={{ fontWeight: 700, fontSize: 52, lineHeight: 0.9, color: '#1A0E03' }}
      >
        {num}
        <span style={{ fontWeight: 600 }}>{suffix}</span>
      </div>
      <div
        style={{
          fontSize: 21,
          lineHeight: 1.2,
          color: '#23130A',
          fontWeight: 500,
          whiteSpace: 'pre-line',
        }}
      >
        {sub}
      </div>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: -30,
          top: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255,255,255,.12)',
        }}
      />
    </div>
  );
}

function DonutSingle({
  title,
  dash,
  number,
  pct,
}: {
  title: React.ReactNode;
  dash: string;
  number: string;
  pct?: boolean;
}) {
  const single = typeof title === 'string';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        className="vc-donut-label"
        style={{
          fontSize: 18,
          color: '#E7E3DC',
          fontWeight: 500,
          minHeight: 56,
          display: 'flex',
          flexDirection: single ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: single ? 0 : 3,
        }}
      >
        {title}
      </div>
      <div
        className="vc-donut"
        style={{ position: 'relative', width: 166, height: 166, marginTop: 6 }}
      >
        <svg width="166" height="166" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id="vcOG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F7A24B" />
              <stop offset="1" stopColor="#E0691C" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="84" fill="none" stroke="#34343A" strokeWidth="15" />
          <circle
            cx="100"
            cy="100"
            r="84"
            fill="none"
            stroke="url(#vcOG)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray={dash}
            style={{ filter: 'drop-shadow(0 0 6px rgba(242,133,27,.55))' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="osw"
        >
          <span style={{ fontWeight: 700, fontSize: 40, color: 'var(--heading)' }}>{number}</span>
          {pct && <span style={{ fontSize: 24, marginLeft: 3 }}>%</span>}
        </div>
      </div>
    </div>
  );
}
