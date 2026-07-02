import Image from 'next/image';
import { asset, SITE } from '@/lib/site';

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Клуб',
    links: [
      { label: 'О клубе', href: '/#top' },
      { label: 'Резиденты', href: '/#residents' },
      { label: 'Спикеры', href: '/#speakers' },
      { label: 'Клубный дом', href: '/klubnyi-dom/' },
    ],
  },
  {
    title: 'Форматы',
    links: [
      { label: 'Мероприятия', href: '/#events' },
      { label: 'Форум-группы', href: '/blog/zachem-biznesu-forum-gruppy/' },
      { label: 'Альянс клубов', href: '/#alliance' },
      { label: 'Приложение', href: '/#app' },
    ],
  },
  {
    title: 'Контакты',
    links: [
      { label: 'WhatsApp', href: SITE.whatsapp },
      { label: 'Instagram', href: SITE.socials.instagram },
      { label: 'LinkedIn', href: SITE.socials.linkedin },
      { label: SITE.email, href: `mailto:${SITE.email}` },
    ],
  },
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
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Написать в WhatsApp ${SITE.phone}`}
              className="vc-flink"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 20,
                color: '#C9C5BD',
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#25D366"
                aria-hidden
                style={{ flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
              </svg>
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
                {col.links.map((l) => {
                  const external = l.href.startsWith('http') || l.href.startsWith('mailto:');
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="vc-flink"
                      style={{ color: 'var(--muted)', fontSize: 16 }}
                    >
                      {l.label}
                    </a>
                  );
                })}
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
