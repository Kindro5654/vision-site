'use client';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { useDragSlider } from '@/lib/useDragSlider';
import { asset } from '@/lib/site';

const RESIDENTS = [
  { role: 'Основательница медицинских проектов в ОАЭ', name: 'Ксения Бутова', brands: 'Detki & Family Clinics, Molodost’, Olempic, VOLNA', desc: 'Запустила сеть клиник и мед-проектов в Дубае и регионе MENA.', src: '/assets/people/res-butova.png', objPos: 'center 22%' },
  { role: 'Основатель клиники остеопатии и образовательных проектов', name: 'Алесь Улищенко', brands: 'Clinic Dr.Ales, Академия фейспластики, Midbodyface', desc: 'Создал международные клиники и платформу по остеопатии и здоровью.', src: '/assets/people/res-ales.jpg', objPos: 'center 25%' },
  { role: 'Психолог, автор метода «Вселенская терапия»', name: 'Леонид Тальпис', brands: 'New Light Consulting Dubai, Вселенская терапия', desc: 'Автор метода «Вселенская терапия» и создатель программ по развитию.', src: '/assets/people/res-talpis.jpg', objPos: 'center 25%' },
  { role: 'Основательница международных косметических брендов', name: 'Наталия Красноперова', brands: 'BrowXenna, Lena Levi, Slide&Tap, Levian, Snail Eco', desc: 'Создала глобальные beauty-бренды, представленные в 50+ странах мира.', src: '/assets/people/res-krasnoperova.jpg', objPos: 'center 25%' },
  { role: 'Corporate Restructuring, Garant Business Consultancy UAE', name: 'Александр Марц', brands: 'Garant Business Consultancy UAE', desc: 'Решает сложные кейсы активов и реструктуризации для бизнеса в ОАЭ.', src: '/assets/people/res-marc.jpg', objPos: 'center 22%' },
  { role: 'Бизнес-авиация и образование', name: 'Пётр Балабин', brands: 'LunaJets, частная школа «Ювенес»', desc: 'Представляет лидера бизнес-авиации LunaJets и школу «Ювенес».', src: '/assets/people/res-balabin.jpg', objPos: 'center 22%' },
  { role: 'Международная торговля агропродукцией', name: 'Аким Талибов', brands: 'AGS — поставки агропродукции', desc: 'Развивает международную торговую сеть с офисами в ОАЭ, Турции и Африке.', src: '/assets/people/res-akim.jpg', objPos: 'center 22%' },
  { role: 'Property Management', name: 'Алексей Щевлягин', brands: 'Stonetree — Property Management', desc: 'Управляет крупнейшим портфелем недвижимости в Дубае — более 450 объектов.', src: '/assets/people/res-shevlyagin.png', objPos: 'center 22%' },
  { role: 'Основатель глобальной платформы драгоценных камней', name: 'Илья Поднебесный', brands: 'GEMSTOCK, ювелирные дома Поднебесных и SORA', desc: 'Создал глобальную платформу драгоценных камней с офисами в БКК, РФ и ОАЭ.', src: '/assets/people/res-podnebesny.jpg', objPos: 'center 22%' },
  { role: 'Юридический бизнес, инвестиции, ресторан Manul', name: 'Ольга Нойбергер', brands: 'Юрфирма, инвестиции, ресторан Manul', desc: 'Управляет юрфирмой и стартапами, владелица ресторана — топ-30/100 России.', src: '/assets/people/res-neuberger.png', objPos: 'center 22%' },
  { role: 'Premium travel и консалтинг', name: 'Татьяна Третьяк', brands: 'Scenario Travel, Aventus Consultancy', desc: 'Создала премиальный travel-сервис и консалтинг по гражданству и бизнесу.', src: '/assets/people/res-tretyak.jpg', objPos: 'center 22%' },
  { role: 'Глобальные бренды обуви, рюкзаков и технологий', name: 'Пётр Малкин', brands: 'Aetrex, IAMRUNBOX, NTMY Inc', desc: 'Запускает глобальные бренды обуви, рюкзаков и технологий в США и Азии.', src: '/assets/people/res-malkin.jpg', objPos: 'center 22%' },
  { role: 'BSI Lifestyle, Banya Forrest Dubai', name: 'Артём Аванесов', brands: 'BSI Lifestyle, Banya Forrest Dubai', desc: 'Руководит сетью из 7 офисов BSI и премиальной баней Forrest в Дубае.', src: '/assets/people/res-avanesov.png', objPos: 'center 22%' },
  { role: 'DDA Real Estate, «Бизнес-Юрист»', name: 'Виктор Слепец', brands: 'DDA Real Estate, «Бизнес-Юрист»', desc: 'Управляет GCC-направлением в двух крупных группах и медиа с 1,4 млн аудиторией.', src: '/assets/people/res-slepets.jpeg', objPos: 'center 25%' },
];

export default function Residents() {
  const m = useMounted();
  const { ref, step } = useDragSlider(432);

  return (
    <section
      className="vc-res-root"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '84px 0 96px',
      }}
    >
      <div
        className="vc-res-head"
        style={{
          maxWidth: 1320,
          margin: '0 auto 46px',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          ...reveal(m, 0.02),
        }}
      >
        <h2
          className="osw"
          style={{
            fontWeight: 700,
            fontSize: 60,
            lineHeight: 1.06,
            letterSpacing: '.01em',
            textTransform: 'uppercase',
            color: 'var(--heading)',
          }}
        >
          Твоё будущее
          <br />
          <span style={{ color: 'var(--accent)' }}>окружение</span> в Дубае
        </h2>
        <div
          className="vc-res-ctrl"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            flexShrink: 0,
          }}
        >
          <span
            className="vc-res-hint"
            style={{ fontSize: 15, color: 'var(--dim)', letterSpacing: '.02em' }}
          >
            Листайте&nbsp;→
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="vc-arrow" onClick={() => step(-1)} aria-label="Назад">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button className="vc-arrow" onClick={() => step(1)} aria-label="Вперёд">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="vc-track vc-track-res"
        style={{
          display: 'flex',
          gap: 24,
          overflowX: 'auto',
          padding: '6px 48px 8px',
          paddingLeft: 'max(48px, calc((100% - 1320px) / 2 + 48px))',
          scrollPaddingLeft: 'max(48px, calc((100% - 1320px) / 2 + 48px))',
          ...reveal(m, 0.12),
        }}
      >
        {RESIDENTS.map((r) => (
          <article
            key={r.name}
            className="vc-rcard"
            style={{
              scrollSnapAlign: 'start',
              flex: '0 0 408px',
              background: '#161618',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 24,
              padding: '24px 22px 26px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 16,
                lineHeight: 1.3,
                color: 'var(--muted-2)',
                textAlign: 'center',
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 6px',
              }}
            >
              {r.role}
            </div>
            <div style={{ borderRadius: 18, overflow: 'hidden', marginTop: 14 }}>
              <Image
                src={asset(r.src)}
                alt={r.name}
                width={408}
                height={392}
                loading="lazy"
                className="vc-rimg"
                style={{ objectPosition: r.objPos }}
              />
            </div>
            <h3
              className="osw"
              style={{
                fontWeight: 700,
                fontSize: 30,
                lineHeight: 1.02,
                textTransform: 'uppercase',
                color: 'var(--heading)',
                marginTop: 22,
                minHeight: 64,
              }}
            >
              {r.name}
            </h3>
            <div
              className="vc-res-brands"
              style={{
                background: 'var(--panel-4)',
                borderRadius: 13,
                padding: '15px 18px',
                marginTop: 14,
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 15.5,
                lineHeight: 1.35,
                color: '#E4E0D9',
                minHeight: 74,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {r.brands}
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--muted-2)', marginTop: 16 }}>
              {r.desc}
            </p>
          </article>
        ))}
        <div style={{ flex: '0 0 24px' }} />
      </div>
    </section>
  );
}
