'use client';
import { useMounted, reveal } from '@/lib/useMounted';

export default function Unique() {
  const m = useMounted();
  return (
    <section
      className="vc-uni-root"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '62px clamp(16px, 4vw, 96px) 76px',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 40,
          right: -120,
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(233,107,30,.1),transparent 64%)',
          filter: 'blur(34px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 2400, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 18, ...reveal(m, 0.02) }}>
          <span className="eyebrow-line" />
          <span className="eyebrow-text">Почему Vision</span>
        </div>
        <h2
          className="osw vc-uni-head"
          style={{
            fontWeight: 700,
            fontSize: 54,
            lineHeight: 1,
            letterSpacing: '.01em',
            textTransform: 'uppercase',
            color: 'var(--heading)',
            maxWidth: 760,
            marginBottom: 30,
            ...reveal(m, 0.08),
          }}
        >
          Что делает Vision <span style={{ color: 'var(--accent)' }}>уникальным</span>
        </h2>

        <div
          className="vc-uni-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridAutoRows: '1fr',
            gap: 18,
          }}
        >
          {/* tile 1 */}
          <div
            className="vc-tile accent"
            style={{
              gridColumn: 1,
              gridRow: '1 / span 2',
              background: 'linear-gradient(160deg,#F2851B,#DF6418)',
              borderRadius: 24,
              padding: 30,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 312,
              ...reveal(m, 0.16),
            }}
          >
            <TileHead num="01" dark icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3.5a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85M12 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM2 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
            } />
            <div>
              <div className="osw" style={{ fontWeight: 700, fontSize: 74, lineHeight: 0.86, color: '#1A0E03' }}>80%</div>
              <div
                className="osw"
                style={{
                  fontWeight: 600,
                  fontSize: 26,
                  textTransform: 'uppercase',
                  color: '#1A0E03',
                  marginTop: 6,
                }}
              >
                участников
              </div>
              <p style={{ fontSize: 18, lineHeight: 1.45, color: '#3A1F08', marginTop: 14, maxWidth: 280 }}>
                Постоянно проживают и ведут бизнес в Дубае.
              </p>
            </div>
            <div
              aria-hidden
              style={{
                position: 'absolute',
                right: -40,
                bottom: -40,
                width: 170,
                height: 170,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.12)',
                animation: 'vcDrift 9s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* tile 2 wide */}
          <DarkTile num="02" title="Клубный дом" body="Собственное место силы и доверия в центре Дубая — место, где решения становятся действиями." icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-7 9 7M5 9v11a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9" /></svg>
          } gridColumn="2 / span 2" gridRow="1" minHeight={248} headSize={30} bodyMax={540} delay={0.24} m={m} />

          {/* tile 3 */}
          <DarkTile num="03" title="Forum-group" body="Конфиденциальное пространство, где все равны. Ваш личный совет директоров." icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          } gridColumn="2" gridRow="2" minHeight={200} headSize={27} delay={0.32} m={m} />

          {/* tile 4 */}
          <DarkTile num="04" title="Персональный бизнес-менеджер" body="Соединяет с нужными людьми и помогает решить запросы." icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" /></svg>
          } gridColumn="3" gridRow="2" minHeight={200} headSize={24} delay={0.4} m={m} />
        </div>
      </div>
    </section>
  );
}

function TileHead({ num, icon, dark }: { num: string; icon: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span
        className="osw"
        style={{
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: '.08em',
          color: dark ? 'rgba(26,14,3,.65)' : 'var(--dim)',
        }}
      >
        {num}
      </span>
      <span
        className="vc-ic"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          borderRadius: 13,
          background: dark ? 'rgba(26,14,3,.14)' : 'transparent',
          border: dark ? '0' : '1px solid rgba(255,255,255,.16)',
          color: dark ? '#1A0E03' : '#E9E5DE',
        }}
      >
        {icon}
      </span>
    </div>
  );
}

function DarkTile({
  num,
  title,
  body,
  icon,
  gridColumn,
  gridRow,
  minHeight,
  headSize,
  bodyMax,
  delay,
  m,
}: {
  num: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  gridColumn: string;
  gridRow: string;
  minHeight: number;
  headSize: number;
  bodyMax?: number;
  delay: number;
  m: boolean;
}) {
  return (
    <div
      className="vc-tile dark"
      style={{
        gridColumn,
        gridRow,
        background: 'linear-gradient(160deg,#26262B,#191A1E)',
        border: '1px solid rgba(255,255,255,.08)',
        borderRadius: 24,
        padding: 28,
        minHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...reveal(m, delay),
      }}
    >
      <TileHead num={num} icon={icon} />
      <div style={{ marginTop: 'auto' }}>
        <h3
          className="osw"
          style={{
            fontWeight: 600,
            fontSize: headSize,
            textTransform: 'uppercase',
            letterSpacing: '.02em',
            color: 'var(--accent)',
            lineHeight: 1.05,
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: 18, lineHeight: 1.5, color: '#A29E95', marginTop: 12, maxWidth: bodyMax }}>
          {body}
        </p>
      </div>
    </div>
  );
}
