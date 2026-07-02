'use client';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { asset } from '@/lib/site';

const FOUNDERS = [
  {
    num: '01',
    dir: 'row' as const,
    src: '/assets/people/aleksey-nakazny.webp',
    objPos: 'center 20%',
    name: 'Алексей Наказный',
    role: 'Серийный предприниматель и сооснователь Vision Club Dubai и Alliance Clubs',
    bio: 'За 13 лет выстроил международную сеть бизнес-лидеров и лично провёл тысячи встреч с предпринимателями по всему миру.',
    quote: 'Vision — не про количество контактов, а про качество окружения',
    instagram: 'https://www.instagram.com/aleksey_nakazny',
    facebook: 'https://www.facebook.com/aleksey.nakaznyi',
  },
  {
    num: '02',
    dir: 'row-reverse' as const,
    src: '/assets/people/daria-nakaznaya.webp',
    objPos: 'center 18%',
    name: 'Дарья Наказная',
    role: 'Сооснователь Vision Club и Alliance Clubs',
    bio: 'За 8 лет запустила 5 бизнес-клубов в разных странах, провела 2000+ мероприятий и выстроила сильные сообщества предпринимателей, соединяя лидеров через реальные проекты и партнёрства.',
    quote: 'Сила Vision — в людях, которые не ищут выгоду, а создают ценность',
    instagram: 'https://www.instagram.com/dariia_nakaznaya/',
    facebook: 'https://www.facebook.com/dariia.rassolova',
  },
];

export default function Founders() {
  const m = useMounted();
  return (
    <section
      className="vc-founders vc-sec"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '96px clamp(16px, 4vw, 96px) 110px',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 340,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(233,107,30,.08),transparent 60%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="vc-founders-head"
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 84,
        }}
      >
        <div className="chip-pill">
          <span className="chip-dot" />
          <span style={{ fontSize: 17, color: '#EDEAE4', letterSpacing: '.01em' }}>
            Люди, которые создали Vision
          </span>
        </div>
      </div>

      <div
        className="vc-founders-list"
        style={{
          position: 'relative',
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 120,
        }}
      >
        {FOUNDERS.map((f, i) => (
          <div
            key={f.num}
            className="vc-founder-row"
            style={{
              display: 'flex',
              gap: 72,
              alignItems: 'center',
              flexDirection: f.dir,
              ...reveal(m, 0.08 + i * 0.08),
            }}
          >
            <div
              className="vc-founder-photo"
              style={{ position: 'relative', flex: '0 0 440px', minWidth: 0 }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '46%',
                  transform: 'translate(-50%,-50%)',
                  width: 380,
                  height: 380,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle,rgba(233,107,30,.22),transparent 62%)',
                  filter: 'blur(26px)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,.09)',
                  borderRadius: 24,
                  background: 'linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01))',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={asset(f.src)}
                  alt={f.name}
                  width={520}
                  height={560}
                  className="vc-founder-img"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 560,
                    objectFit: 'cover',
                    objectPosition: f.objPos,
                  }}
                />
              </div>
            </div>

            <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <h2
                className="osw"
                style={{
                  fontWeight: 700,
                  fontSize: 72,
                  lineHeight: 0.98,
                  letterSpacing: '.005em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  textWrap: 'balance' as any,
                }}
              >
                {f.name}
              </h2>
              <p
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  lineHeight: 1.4,
                  color: '#F2EFE9',
                  fontWeight: 500,
                  maxWidth: 560,
                }}
              >
                {f.role}
              </p>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: 'var(--muted-2)',
                  maxWidth: 560,
                }}
              >
                {f.bio}
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
                <SocialBtn label={`Instagram ${f.name}`} href={f.instagram}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                </SocialBtn>
                <SocialBtn label={`Facebook ${f.name}`} href={f.facebook}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 8.5V6.7c0-.8.2-1.2 1.3-1.2H17V2.3c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v1.8H7.3V12H10v9h3.4v-9h2.5l.4-3.5H14z" />
                  </svg>
                </SocialBtn>
              </div>

              <div
                className="vc-founder-quote osw"
                style={{
                  marginTop: 34,
                  background: 'var(--accent)',
                  borderRadius: 20,
                  padding: '30px 32px',
                  maxWidth: 580,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 30,
                    lineHeight: 1.12,
                    letterSpacing: '.01em',
                    textTransform: 'uppercase',
                    color: '#1A0E03',
                  }}
                >
                  {f.quote}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SocialBtn({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="vc-soc"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 46,
        height: 46,
        border: '1px solid rgba(255,255,255,.2)',
        borderRadius: 13,
        color: '#C9C5BD',
      }}
    >
      {children}
    </a>
  );
}
