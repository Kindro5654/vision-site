'use client';
import { useMounted, reveal } from '@/lib/useMounted';

const YES = [
  'Команда и действующая бизнес-система',
  'Твёрдая ниша и понятный рынок',
  'Сильная деловая репутация',
  'Запрос на масштабирование через окружение',
  'Готовность выйти на международный уровень',
];
const NO = [
  'Стартапы без выручки',
  'Инфобизнес без устойчивой модели',
  'Посреднические схемы без сильного продукта',
  'Предпринимателей без команды и системы',
  'Тех, кто не готов к отбору и репутационному чеку',
];

export default function Audience() {
  const m = useMounted();
  return (
    <section
      className="vc-sec"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '84px 48px 100px',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 120,
          left: -120,
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(233,107,30,.1),transparent 64%)',
          filter: 'blur(34px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="vc-aud-head"
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 50,
          ...reveal(m, 0.02),
        }}
      >
        <div className="chip-pill">
          <span className="chip-dot" />
          <span style={{ fontSize: 17, color: '#EDEAE4', letterSpacing: '.01em' }}>
            Для кого Vision
          </span>
        </div>
      </div>

      <div
        className="vc-aud-grid"
        style={{
          position: 'relative',
          maxWidth: 1600,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 26,
        }}
      >
        {/* YES */}
        <div
          className="vc-aud-card vc-aud-yes"
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(165deg,#221c16,#161311)',
            border: '1px solid rgba(233,107,30,.28)',
            borderRadius: 24,
            padding: '42px 40px 38px',
            ...reveal(m, 0.1),
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -90,
              right: -70,
              width: 280,
              height: 280,
              borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(233,107,30,.2),transparent 64%)',
              filter: 'blur(14px)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 18 }}>
            <span
              className="vc-ico-box"
              style={{
                flexShrink: 0,
                width: 56,
                height: 56,
                borderRadius: 15,
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 30px -10px rgba(233,107,30,.7)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#160B03" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 6" />
              </svg>
            </span>
            <h3
              className="osw"
              style={{
                fontWeight: 700,
                fontSize: 30,
                lineHeight: 1.04,
                letterSpacing: '.01em',
                textTransform: 'uppercase',
                color: 'var(--heading)',
              }}
            >
              Для кого
              <br />
              создан Vision
            </h3>
          </div>

          <div
            className="vc-turnover"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginTop: 26,
              border: '1px solid rgba(233,107,30,.35)',
              borderRadius: 14,
              padding: '16px 22px',
              background: 'rgba(233,107,30,.06)',
            }}
          >
            <span style={{ fontSize: 14, lineHeight: 1.2, color: '#C9C5BD', maxWidth: 80 }}>
              Годовой оборот
            </span>
            <span
              style={{
                width: 1,
                height: 36,
                background: 'rgba(233,107,30,.32)',
                flexShrink: 0,
              }}
            />
            <span
              className="osw vc-turn-val"
              style={{
                fontWeight: 700,
                fontSize: 26,
                color: 'var(--accent)',
                whiteSpace: 'nowrap',
              }}
            >
              $1M — $50M+
            </span>
          </div>

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {YES.map((it) => (
              <div
                key={it}
                className="vc-row"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  padding: '11px 12px',
                  borderRadius: 11,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: 3,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(233,107,30,.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 6" />
                  </svg>
                </span>
                <span style={{ fontSize: 17, lineHeight: 1.4, color: '#D8D4CC' }}>{it}</span>
              </div>
            ))}
          </div>

          <p
            className="vc-aud-summary"
            style={{
              marginTop: 'auto',
              paddingTop: 22,
              borderTop: '1px solid rgba(255,255,255,.09)',
              fontSize: 16.5,
              lineHeight: 1.55,
              color: 'var(--muted)',
            }}
          >
            Мы создаём среду, где предприниматель выходит из постоянной операционки, усиливает систему,
            находит сильное окружение и переходит на новый уровень бизнеса и роли собственника.
          </p>
        </div>

        {/* NO */}
        <div
          className="vc-aud-card vc-aud-no"
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(165deg,#1c1c20,#141417)',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 24,
            padding: '42px 40px 38px',
            ...reveal(m, 0.18),
          }}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 18 }}>
            <span
              className="vc-ico-box"
              style={{
                flexShrink: 0,
                width: 56,
                height: 56,
                borderRadius: 15,
                border: '1px solid rgba(255,255,255,.18)',
                background: 'rgba(255,255,255,.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8C887F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </span>
            <h3
              className="osw"
              style={{
                fontWeight: 700,
                fontSize: 30,
                lineHeight: 1.04,
                letterSpacing: '.01em',
                textTransform: 'uppercase',
                color: '#CFCBC2',
              }}
            >
              Кого мы
              <br />
              не принимаем
            </h3>
          </div>

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {NO.map((it) => (
              <div
                key={it}
                className="vc-row"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  padding: '11px 12px',
                  borderRadius: 11,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: 3,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8C887F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                <span style={{ fontSize: 17, lineHeight: 1.4, color: 'var(--muted-2)' }}>{it}</span>
              </div>
            ))}
          </div>

          <p
            className="vc-aud-summary"
            style={{
              marginTop: 'auto',
              paddingTop: 22,
              borderTop: '1px solid rgba(255,255,255,.09)',
              fontSize: 16.5,
              lineHeight: 1.55,
              color: '#86837B',
            }}
          >
            Мы не принимаем тех, кто не готов выстраивать устойчивый бизнес, расти в роли собственника и
            ставит краткосрочную выгоду выше репутации, ценностей и качества окружения.
          </p>
        </div>
      </div>

      <div
        className="vc-rep-bar"
        style={{
          position: 'relative',
          maxWidth: 1600,
          margin: '26px auto 0',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          background: 'linear-gradient(90deg,#1A1A1E,#161618)',
          border: '1px solid rgba(233,107,30,.22)',
          borderRadius: 20,
          padding: '24px 34px',
          ...reveal(m, 0.26),
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" style={{ flex: '0 0 50px' }} aria-hidden>
          <circle cx="25" cy="25" r="25" fill="var(--accent)" />
          <text x="25" y="25" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-oswald)" fontWeight={700} fontSize="30" fill="#160B03">
            !
          </text>
        </svg>
        <div
          className="osw vc-rep-text"
          style={{
            fontWeight: 600,
            fontSize: 25,
            lineHeight: 1.14,
            letterSpacing: '.02em',
            textTransform: 'uppercase',
            color: 'var(--text)',
          }}
        >
          Каждый участник проходит <span style={{ color: 'var(--accent)' }}>репутационный чек</span>
        </div>
      </div>
    </section>
  );
}
