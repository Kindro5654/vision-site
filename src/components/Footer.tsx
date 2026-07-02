import Image from 'next/image';
import { asset, SITE } from '@/lib/site';

const COLS = [
  { title: 'Клуб', links: ['О клубе', 'Резиденты', 'Спикеры', 'Клубный дом'] },
  { title: 'Форматы', links: ['Мероприятия', 'Форум-группы', 'Альянс клубов', 'Приложение'] },
  { title: 'Контакты', links: ['Telegram', 'WhatsApp', 'Instagram', SITE.email] },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        borderTop: '1px solid var(--line)',
        padding: '64px clamp(16px, 4vw, 96px) 44px',
      }}
    >
      <div style={{ maxWidth: 2400, margin: '0 auto' }}>
        <div
          className="vc-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: 40,
            alignItems: 'start',
          }}
        >
          <div>
            <Image
              src={asset('/assets/logo-vision.png')}
              alt="Vision"
              width={120}
              height={30}
              style={{ height: 30, width: 'auto', display: 'block' }}
            />
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: '#8C887F',
                marginTop: 16,
                maxWidth: 300,
              }}
            >
              Международный бизнес-клуб для предпринимателей и топ-менеджеров. Дубай · Альянс клубов в 10 странах.
            </p>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, '')}`}
              className="vc-flink"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                marginTop: 20,
                color: '#C9C5BD',
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 10px var(--accent)',
                }}
              />
              {SITE.phone}
            </a>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <div
                className="osw"
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  color: '#6E6A62',
                  marginBottom: 18,
                }}
              >
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {col.links.map((l) => (
                  <a key={l} href="#" className="vc-flink" style={{ color: 'var(--muted)', fontSize: 16 }}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="vc-footer-bottom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            marginTop: 48,
            paddingTop: 26,
            borderTop: '1px solid var(--line)',
          }}
        >
          <span style={{ fontSize: 14, color: '#6E6A62' }}>
            © {new Date().getFullYear()} {SITE.name}. Все права защищены.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <a href="#" className="vc-flink" style={{ color: '#6E6A62', fontSize: 14 }}>
              Политика конфиденциальности
            </a>
            <a
              href="#top"
              className="vc-up"
              aria-label="Наверх"
              style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
