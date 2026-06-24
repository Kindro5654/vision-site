'use client';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { useDragSlider } from '@/lib/useDragSlider';
import { asset } from '@/lib/site';

const EVENTS = [
  { num: '01', tag: 'Главное', title: 'Большая встреча VISION CLUB', desc: 'Главное событие месяца, где мы подводим итоги, делимся результатами, инсайтами и кейсами резидентов.', src: '/assets/events/big-meeting.jpg', objPos: 'center 40%' },
  { num: '02', tag: 'Закрытый формат', title: 'Форум-группы', desc: 'Закрытый форум, где участники делятся бизнес-задачами, получают опыт коллег и находят решения от практиков.', src: '/assets/events/forum.webp', objPos: 'center 30%' },
  { num: '03', tag: 'Неформально', title: 'VISION Факап Найт', desc: 'Вечер, когда резиденты делятся личными историями факапов и главными выводами из них.', src: '/assets/events/fakap.webp', objPos: 'center 35%' },
  { num: '04', tag: 'Актив', title: 'Неформальные встречи', desc: 'Гольф, яхты, хайкинг, мафия, выезды с семьями — и многие другие!', src: '/assets/events/informal.jpeg', objPos: 'center 30%' },
  { num: '05', tag: 'Бизнес', title: 'Company Visit', desc: 'Закрытые визиты к компаниям-резидентам и на знаковые объекты Дубая — смотрим бизнес изнутри.', src: '/assets/events/company-visit.webp', objPos: 'center 35%' },
  { num: '06', tag: 'Тревел', title: 'Путешествия клуба', desc: 'Совместные поездки по миру: новые страны, приключения и нетворкинг за пределами Дубая.', src: '/assets/events/travel.jpeg', objPos: 'center 50%' },
  { num: '07', tag: 'Кино', title: 'Синемалогия', desc: 'Совместный просмотр и глубокий разбор фильмов — о людях, бизнесе и решениях.', src: '/assets/events/cinema.jpg', objPos: 'center 40%' },
  { num: '08', tag: 'Семья', title: 'Подклуб Дети', desc: 'Семейные встречи и активности для детей резидентов — растём и развиваемся вместе.', src: '/assets/events/kids.webp', objPos: 'center 30%' },
  { num: '09', tag: 'Дискуссия', title: 'Дискуссионный подклуб', desc: 'Острые честные дискуссии о бизнесе, обществе и личных ценностях.', src: '/assets/events/discussion.webp', objPos: 'center 30%' },
  { num: '10', tag: 'Чай', title: 'Чайный подклуб', desc: 'Камерные чайные церемонии и медленные разговоры в тёплом кругу единомышленников.', src: '/assets/events/tea.webp', objPos: 'center 45%' },
  { num: '11', tag: 'AI & IT', title: 'Подклуб AI & IT', desc: 'Практика искусственного интеллекта и технологий: инструменты, кейсы и тренды.', src: '/assets/events/ai-it.webp', objPos: 'center 30%' },
  { num: '12', tag: 'Культура', title: 'Подклуб Music & Arts', desc: 'Искусство, музыка и культура — вечера для тех, кто ценит прекрасное.', src: '/assets/events/music-arts.webp', objPos: 'center 35%' },
  { num: '13', tag: 'Маркетинг', title: 'Подклуб Маркетинг', desc: 'Разбор маркетинговых стратегий и обмен рабочими инструментами роста.', src: '/assets/events/marketing.webp', objPos: 'center 35%' },
];

export default function Events() {
  const m = useMounted();
  const { ref, step } = useDragSlider(456);

  return (
    <section
      className="vc-ev-root"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '84px 0 96px',
      }}
    >
      <div
        className="vc-ev-head"
        style={{
          maxWidth: 1320,
          margin: '0 auto 48px',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          ...reveal(m, 0.02),
        }}
      >
        <h2
          className="osw vc-ev-title"
          style={{
            fontWeight: 700,
            fontSize: 64,
            lineHeight: 0.96,
            letterSpacing: '.01em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>Мероприятия</span>
          <br />
          <span style={{ color: 'var(--heading)' }}>Vision Club</span>
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
          <span style={{ fontSize: 15, color: 'var(--dim)', letterSpacing: '.02em' }}>
            Листайте&nbsp;→
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="vc-arrow" onClick={() => step(-1)} aria-label="Назад">
              <Arrow dir="left" />
            </button>
            <button className="vc-arrow" onClick={() => step(1)} aria-label="Вперёд">
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="vc-track vc-track-events"
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
        {EVENTS.map((ev) => (
          <article
            key={ev.num}
            className="vc-card-evt"
            style={{
              scrollSnapAlign: 'start',
              flex: '0 0 432px',
              background: 'var(--panel-4)',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 22,
              padding: '16px 16px 28px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ borderRadius: 16, overflow: 'hidden' }}>
              <Image
                src={asset(ev.src)}
                alt={ev.title}
                width={432}
                height={300}
                loading="lazy"
                className="vc-card-img"
                style={{ objectPosition: ev.objPos }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                margin: '22px 4px 0',
              }}
            >
              <span
                className="osw"
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'var(--accent)',
                  letterSpacing: '.04em',
                }}
              >
                {ev.num}
              </span>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,.25)',
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#8C887F',
                }}
              >
                {ev.tag}
              </span>
            </div>
            <h3
              className="osw"
              style={{
                fontWeight: 700,
                fontSize: 27,
                lineHeight: 1.05,
                textTransform: 'uppercase',
                color: 'var(--heading)',
                margin: '12px 4px 0',
                minHeight: 60,
              }}
            >
              {ev.title}
            </h3>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--muted-2)', margin: '14px 4px 0', minHeight: 102 }}>
              {ev.desc}
            </p>
          </article>
        ))}
        <div style={{ flex: '0 0 24px' }} />
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}
