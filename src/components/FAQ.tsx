'use client';
import { useState } from 'react';
import { useMounted, reveal } from '@/lib/useMounted';

const DATA = [
  {
    q: 'Как стать резидентом клуба?',
    a: 'Оставьте заявку на сайте — менеджер свяжется с вами, расскажет об условиях и пригласит на встречу. Каждый кандидат проходит репутационный чек.',
  },
  {
    q: 'Какие требования к участникам?',
    a: 'Действующий бизнес с годовым оборотом от $1M (для топ-менеджеров — компании от $50M), команда и система, твёрдая ниша и сильная деловая репутация.',
  },
  {
    q: 'Где проходят мероприятия?',
    a: 'Основные события — в Клубном доме Vision в центре Дубая. Резиденты также получают доступ к встречам клубов-партнёров Альянса в 10 странах.',
  },
  {
    q: 'Что входит в резидентство?',
    a: 'Доступ к 220+ предпринимателям Дубая и 1200 резидентам Альянса, форум-группы, персональный бизнес-менеджер, 250+ событий в год и приложение клуба.',
  },
  {
    q: 'Что такое Альянс клубов?',
    a: 'Международная сеть бизнес-клубов в США, Европе, Азии и на Ближнем Востоке. Резидент Vision получает доступ к предпринимателям и саммитам по всему миру.',
  },
  {
    q: 'Можно ли посетить клуб до вступления?',
    a: 'Да. После заявки и знакомства мы приглашаем кандидатов на ближайшую встречу или онлайн-экскурсию по Клубному дому.',
  },
];

export default function FAQ() {
  const m = useMounted();
  const [open, setOpen] = useState(0);

  return (
    <section
      className="vc-faq-root vc-sec"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '84px clamp(16px, 4vw, 96px) 96px',
      }}
    >
      <div style={{ position: 'relative', maxWidth: 2400, margin: '0 auto' }}>
        <div
          className="vc-faq-grid"
          style={{ display: 'grid', gridTemplateColumns: '.74fr 1.26fr', gap: 64, alignItems: 'start' }}
        >
          <aside className="vc-faq-aside" style={{ position: 'sticky', top: 40, ...reveal(m, 0.02) }}>
            <div className="vc-faq-head">
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                <span className="eyebrow-line" />
                <span className="eyebrow-text">Вопросы</span>
              </div>
              <h2
                className="osw"
                style={{
                  fontWeight: 700,
                  fontSize: 58,
                  lineHeight: 1,
                  letterSpacing: '.01em',
                  textTransform: 'uppercase',
                  color: 'var(--heading)',
                }}
              >
                Частые<br />
                <span style={{ color: 'var(--accent)' }}>вопросы</span>
              </h2>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--muted-2)', marginTop: 22, maxWidth: 320 }}>
              Не нашли ответ? Напишите менеджеру клуба — ответим лично.
            </p>
            <a
              href="#"
              className="vc-more osw"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 22,
                border: '1px solid rgba(255,255,255,.2)',
                borderRadius: 999,
                padding: '13px 24px',
                color: 'var(--text)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: '.04em',
                textTransform: 'uppercase',
              }}
            >
              Задать вопрос
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </aside>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {DATA.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className="vc-q"
                  style={{
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: 18,
                    background: 'var(--panel)',
                    overflow: 'hidden',
                    ...reveal(m, 0.06 + i * 0.05),
                  }}
                >
                  <button
                    className="vc-q-head"
                    onClick={() => setOpen((s) => (s === i ? -1 : i))}
                    aria-expanded={isOpen}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      padding: '24px 26px',
                      width: '100%',
                      background: 'transparent',
                      border: 0,
                      color: 'inherit',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      className="osw"
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        color: 'var(--accent)',
                        flexShrink: 0,
                        width: 30,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ flex: 1, fontWeight: 600, fontSize: 19, lineHeight: 1.3, color: 'var(--text)' }}>
                      {item.q}
                    </span>
                    <span
                      className="vc-q-ico"
                      style={{
                        flexShrink: 0,
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        border: isOpen
                          ? '1px solid var(--accent)'
                          : '1px solid rgba(255,255,255,.18)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isOpen ? '#160B03' : 'var(--text)',
                        background: isOpen ? 'var(--accent)' : 'transparent',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div className={`vc-ans ${isOpen ? 'open' : ''}`}>
                    <div>
                      <p style={{ padding: '0 26px 26px 76px', fontSize: 17, lineHeight: 1.6, color: '#A29E95' }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
