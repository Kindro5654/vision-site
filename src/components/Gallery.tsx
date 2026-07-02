'use client';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { asset } from '@/lib/site';

type Tile = {
  src: string;
  pos: string;
  gridColumn?: string;
  gridRow?: string;
};

const TILES: Tile[] = [
  { src: '/assets/gallery/g14.webp', pos: 'center 40%', gridColumn: '1/3', gridRow: '1/3' },
  { src: '/assets/gallery/nr2.webp', pos: 'center 35%', gridColumn: '3/4', gridRow: '1/3' },
  { src: '/assets/gallery/p0216b.webp', pos: 'center 28%', gridColumn: '4/5', gridRow: '1/3' },
  { src: '/assets/gallery/g15.webp', pos: 'center 35%', gridColumn: '1/2', gridRow: '3/5' },
  { src: '/assets/gallery/nr0.webp', pos: 'center 42%', gridColumn: '2/4', gridRow: '3/4' },
  { src: '/assets/gallery/p1109b.webp', pos: 'center 40%', gridColumn: '4/5', gridRow: '3/4' },
  { src: '/assets/gallery/g10.webp', pos: 'center 45%', gridColumn: '2/4', gridRow: '4/5' },
  { src: '/assets/gallery/p1109a.webp', pos: 'center 42%', gridColumn: '4/5', gridRow: '4/5' },
  { src: '/assets/gallery/g01.webp', pos: 'center 40%', gridColumn: '1/3', gridRow: '5/6' },
  { src: '/assets/gallery/mix.webp', pos: 'center 45%', gridColumn: '3/5', gridRow: '5/6' },
  { src: '/assets/gallery/nr1.webp', pos: 'center 45%', gridColumn: '1/3', gridRow: '6/7' },
  { src: '/assets/gallery/g02.webp', pos: 'center 35%', gridColumn: '3/4', gridRow: '6/7' },
  { src: '/assets/gallery/p0216a.webp', pos: 'center 30%', gridColumn: '4/5', gridRow: '6/7' },
];

export default function Gallery() {
  const m = useMounted();
  return (
    <section
      className="vc-sec"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '84px clamp(16px, 4vw, 96px) 96px',
      }}
    >
      <div style={{ position: 'relative', maxWidth: 2400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48, ...reveal(m, 0.02) }}>
          <h2
            className="osw"
            style={{
              fontWeight: 700,
              fontSize: 62,
              lineHeight: 1,
              letterSpacing: '.02em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            <span style={{ color: 'var(--heading)' }}>Атмосфера</span>{' '}
            <span style={{ color: 'var(--accent)' }}>Vision</span>
          </h2>
        </div>

        <div
          className="vc-gal-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gridAutoRows: '212px',
            gap: 18,
            ...reveal(m, 0.1),
          }}
        >
          {TILES.map((t, i) => (
            <div
              key={t.src}
              className="vc-gtile"
              style={{ gridColumn: t.gridColumn, gridRow: t.gridRow }}
            >
              <Image
                src={asset(t.src)}
                alt="Атмосфера Vision"
                fill
                sizes="(max-width: 820px) 50vw, 33vw"
                loading={i < 6 ? 'eager' : 'lazy'}
                fetchPriority={i < 4 ? 'high' : 'auto'}
                className="vc-gimg"
                style={{ objectPosition: t.pos }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
