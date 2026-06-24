'use client';
import { useMounted, reveal } from '@/lib/useMounted';

const POSTS = [
  {
    date: '12 июня 2026',
    read: '6 мин',
    title: 'Как резиденты находят партнёров в Дубае',
    excerpt: 'Реальные истории сделок и коллабораций, которые начались на встречах клуба.',
    cover: 'linear-gradient(135deg,#2a221b,#1a1a1f)',
  },
  {
    date: '4 июня 2026',
    read: '8 мин',
    title: 'Рынок ОАЭ 2026: куда идут деньги',
    excerpt: 'Обзор ключевых отраслей и точек роста для предпринимателей на Ближнем Востоке.',
    cover: 'linear-gradient(135deg,#241b18,#171a1f)',
  },
  {
    date: '27 мая 2026',
    read: '5 мин',
    title: 'Зачем бизнесу форум-группы',
    excerpt: 'Как закрытый совет из равных помогает принимать сложные решения быстрее.',
    cover: 'linear-gradient(135deg,#1f1d24,#15151a)',
  },
];

export default function Blog() {
  const m = useMounted();
  return (
    <section
      className="vc-blog-root"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '84px 48px 96px',
      }}
    >
      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto' }}>
        <div
          className="vc-blog-head"
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 44, ...reveal(m, 0.02) }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              <span className="eyebrow-line" />
              <span className="eyebrow-text">Журнал клуба</span>
            </div>
            <h2
              className="osw"
              style={{
                fontWeight: 700,
                fontSize: 62,
                lineHeight: 1,
                letterSpacing: '.01em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: 'var(--heading)' }}>Блог</span>{' '}
              <span style={{ color: 'var(--accent)' }}>Vision</span>
            </h2>
          </div>
          <a
            href="#"
            className="vc-more-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              flexShrink: 0,
              color: 'var(--muted)',
              textDecoration: 'none',
              fontSize: 17,
              fontWeight: 500,
            }}
          >
            Все статьи
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div
          className="vc-blog-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}
        >
          {POSTS.map((p, i) => (
            <a
              key={p.title}
              href="#"
              className="vc-post"
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--panel-2)',
                border: '1px solid rgba(255,255,255,.07)',
                borderRadius: 20,
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                ...reveal(m, 0.08 + i * 0.07),
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <div
                  className="vc-post-img"
                  aria-hidden
                  style={{ height: 200, background: p.cover }}
                />
              </div>
              <div
                className="vc-post-body"
                style={{
                  padding: '24px 24px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <div style={{ fontSize: 13, color: 'var(--dim)', letterSpacing: '.02em' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{p.read}</span> · {p.date}
                </div>
                <h3
                  className="osw vc-post-title"
                  style={{
                    fontWeight: 600,
                    fontSize: 23,
                    lineHeight: 1.12,
                    letterSpacing: '.01em',
                    textTransform: 'uppercase',
                    color: 'var(--heading)',
                    marginTop: 12,
                    minHeight: 78,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="vc-post-excerpt"
                  style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--muted-2)', marginTop: 12, minHeight: 48, flex: 1 }}
                >
                  {p.excerpt}
                </p>
                <span
                  className="vc-read-btn osw"
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: 22,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                    border: '1px solid rgba(233,107,30,.5)',
                    borderRadius: 999,
                    padding: '11px 22px',
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                  }}
                >
                  Читать
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
