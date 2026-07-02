'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { ARTICLES } from '@/lib/articles';
import { asset } from '@/lib/site';

export default function Blog() {
  const m = useMounted();
  return (
    <section
      id="blog"
      className="vc-blog-root vc-sec"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '84px 48px 96px',
      }}
    >
      <div style={{ position: 'relative', maxWidth: 1600, margin: '0 auto' }}>
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
        </div>

        <div
          className="vc-blog-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}
        >
          {ARTICLES.map((p, i) => {
            const date = new Date(p.publishedAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
            return (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
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
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16 / 9' }}>
                  <Image
                    src={asset(p.cover)}
                    alt={p.coverAlt}
                    fill
                    sizes="(max-width: 820px) 80vw, 33vw"
                    loading="lazy"
                    className="vc-post-img"
                    style={{ objectFit: 'cover' }}
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
                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{p.readingTime}</span> · {date}
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
                    {p.description}
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
