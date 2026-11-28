import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, asset } from '@/lib/site';
import { PASSPORT } from '@/lib/passport';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import MainCTAModal from '@/components/MainCTAModal';
import { AnchorNav, ApplyButton } from './OklClient';
import './o-klube.css';

const PAGE_URL = `${SITE.url}/o-klube/`;
const PAGE_TITLE = 'Vision Club — факты и цифры о бизнес-клубе в Дубае';
const PAGE_DESCRIPTION =
  'Vision Club в цифрах: основан в 2021 году, 220+ предпринимателей в Дубае из 70+ отраслей, 1 200+ резидентов Альянса, вход от $1 млн оборота, 250+ мероприятий в год, 18 форум-групп.';

const UPDATED_RU = '28 ноября 2026';
const UPDATED_SHORT = '28.11.2026';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: PAGE_URL,
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SITE.ogImage],
  },
};

const fact = (label: string) => PASSPORT.facts.find((f) => f.label === label)?.value ?? '';

const FOR_WHOM = [
  'Собственники действующего бизнеса с годовым оборотом от $1 млн',
  'Топ-менеджеры и C-level крупных компаний',
  'Инвесторы и семейные офисы',
  'Эксперты и консультанты с сильной деловой репутацией',
];

const NOT_FOR = [
  'Стартапы без выручки',
  'Инфобизнес без устойчивой бизнес-модели',
  'Посреднические схемы без сильного продукта',
  'Кандидаты, не готовые к отбору и репутационному чеку',
];

const STEPS = [
  { title: 'Заявка', body: 'На сайте или в WhatsApp.' },
  { title: 'Разговор с менеджером', body: 'Бизнес, запросы, ожидания.' },
  { title: 'Репутационная проверка', body: 'Проверяем деловую репутацию кандидата.' },
  { title: 'Знакомство с клубом', body: 'Встреча в клубном доме или ближайшее мероприятие.' },
  { title: 'Резидентство', body: 'Решение о резидентстве и подключение бизнес-менеджера.' },
];

const FAQ = [
  {
    q: 'Что такое Vision Club?',
    a: 'Vision Club — русскоязычный бизнес-клуб в Дубае для собственников бизнеса и топ-менеджеров. Основан в 2021 году, объединяет 220+ предпринимателей из 70+ отраслей и входит в международный Альянс клубов с 1 200+ резидентами.',
  },
  {
    q: 'Какой порог входа в Vision Club?',
    a: 'Годовой оборот бизнеса от $1 млн. Средний оборот бизнеса резидентов — около $10 млн. Для собственников с оборотом от $50 млн внутри клуба есть отдельный круг X Club.',
  },
  {
    q: 'Как вступить в Vision Club?',
    a: 'Оставить заявку на сайте, пройти разговор с менеджером и репутационную проверку, познакомиться с клубом на встрече. Вступление только по приглашению после отбора.',
  },
  {
    q: 'Vision Club — это ночной клуб?',
    a: 'Нет. Vision Club — бизнес-клуб для предпринимателей. Он не связан с ночным клубом VISION в H Hotel Dubai.',
  },
  {
    q: 'Сколько мероприятий проводит клуб?',
    a: '250+ мероприятий в год: большие встречи, 18 форум-групп, ужины, разборы бизнесов, подклубы по интересам, выезды и встречи клубов Альянса.',
  },
];

const FOUNDERS = [
  {
    name: 'Алексей Наказный',
    photo: '/assets/people/aleksey-nakazny.webp',
    pos: '50% 15%',
    role: 'Сооснователь Vision Club и Alliance Clubs',
    bio: 'Серийный предприниматель. За 13 лет выстроил международную сеть бизнес-лидеров и лично провёл тысячи встреч с предпринимателями по всему миру.',
    facts: [{ n: '13', t: 'лет' }],
  },
  {
    name: 'Дарья Наказная',
    photo: '/assets/people/daria-nakaznaya.webp',
    pos: '50% 15%',
    role: 'Сооснователь Vision Club и Alliance Clubs',
    bio: 'За 8 лет запустила 5 бизнес-клубов в разных странах и провела 2000+ мероприятий.',
    facts: [
      { n: '5', t: 'клубов' },
      { n: '2000+', t: 'мероприятий' },
    ],
  },
];

const CheckIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#f2851b" strokeWidth="2">
    <path d="M4 10.5l4 4 8-9" />
  </svg>
);
const CrossIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8f8b83" strokeWidth="2">
    <path d="M5 5l10 10M15 5L5 15" />
  </svg>
);

export default function AboutPage() {
  const orgRef = { '@id': `${SITE.url}/#organization` };

  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${PAGE_URL}#page`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: 'ru-RU',
    dateModified: PASSPORT.updatedAt,
    about: orgRef,
    mainEntity: orgRef,
    isPartOf: { '@id': `${SITE.url}/#website` },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'О клубе', item: PAGE_URL },
    ],
  };

  // Кольцевая диаграмма: накопленные проценты для conic-gradient
  let acc = 0;
  const donutStops = PASSPORT.industries
    .map((i) => {
      const from = acc;
      acc += i.v;
      return `${i.color} ${from}% ${acc}%`;
    })
    .join(', ');
  const donutLabel =
    'Отрасли резидентов: ' + PASSPORT.industries.map((i) => `${i.name.toLowerCase()} ${i.v}%`).join(', ');

  const xclub = PASSPORT.advantages[4];

  return (
    <>
    <div className="okl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="glow glow--1" aria-hidden="true" />
      <div className="glow glow--2" aria-hidden="true" />
      <div className="glow glow--3" aria-hidden="true" />
      <div className="glow glow--4" aria-hidden="true" />
      <div className="glow glow--5" aria-hidden="true" />
      <div className="glow glow--6" aria-hidden="true" />

      <header className="header">
        <div className="header__row">
          <Link className="header__logo" href="/" aria-label="Vision Club — на главную">
            <Image
              src={asset('/assets/logo-vision.png')}
              alt="Vision Club"
              width={110}
              height={24}
              priority
              style={{ height: 24, width: 'auto' }}
            />
          </Link>
          <AnchorNav />
          <ApplyButton className="btn btn--primary btn--sm header__cta">Оставить заявку</ApplyButton>
        </div>
      </header>

      <main className="container">
        {/* Hero + паспорт клуба */}
        <section className="hero" id="facts">
          <div className="hero__text">
            <nav className="breadcrumbs" aria-label="Хлебные крошки">
              <Link href="/">Главная</Link> · О клубе
            </nav>
            <span className="pill">Только по приглашению · Дубай</span>
            <h1>
              <span className="accent">Vision Club</span>
              <br />
              факты и цифры
            </h1>
            <p className="hero__lead">
              Vision Club — русскоязычный бизнес-клуб в Дубае для собственников бизнеса и топ-менеджеров.
              Основан в {PASSPORT.foundingYear} году. В клубе {fact('Предпринимателей в Дубае')} предпринимателей из{' '}
              {fact('Отраслей бизнеса')} отраслей, вход от {fact('Входной порог оборота')} годового оборота, средний оборот
              бизнеса резидентов около {fact('Средний оборот бизнеса').replace('~', '')}. Через международный Альянс клубов
              резиденты связаны с {fact('Резидентов Альянса')} предпринимателями.
            </p>
            <div className="hero__actions">
              <ApplyButton className="btn btn--primary">Стать резидентом →</ApplyButton>
              <a className="btn btn--ghost" href="#join">
                Как вступить
              </a>
            </div>
          </div>

          <div className="hero__aside">
            <div className="ring ring--1" aria-hidden="true" />
            <div className="ring ring--2" aria-hidden="true" />
            <aside className="passport" aria-label="Паспорт клуба">
              <div className="passport__head">
                <span className="passport__title">Паспорт клуба</span>
                <span className="passport__date">на {UPDATED_SHORT}</span>
              </div>
              <dl>
                <dt>Тип</dt>
                <dd>Закрытый бизнес-клуб, вступление по приглашению</dd>
                <dt>Город</dt>
                <dd>Дубай, ОАЭ</dd>
                <dt>Язык</dt>
                <dd>Русский</dd>
                <dt>Основатели</dt>
                <dd>{SITE.founders.map((f) => f.name).join(', ')}</dd>
                <dt>Клубный дом</dt>
                <dd>
                  {SITE.address.street}, Dubai Internet City · <Link href="/klubnyi-dom/">Подробнее</Link>
                </dd>
                <dt>Сайт</dt>
                <dd>
                  <a href={SITE.url}>vision-club.ae</a>
                </dd>
              </dl>
            </aside>
          </div>
        </section>

        {/* Цифры + инфографика */}
        <section className="numbers" id="numbers">
          <div className="numbers__label">
            <span className="pill">Vision в цифрах</span>
          </div>

          <div className="stats">
            <div className="stat stat--hot">
              <div className="stat__value">{fact('Предпринимателей в Дубае')}</div>
              <div className="stat__label">
                предпринимателей <br />в Дубае
              </div>
            </div>
            <div className="stat stat--hot stat--hot-2">
              <div className="stat__value">{fact('Резидентов Альянса')}</div>
              <div className="stat__label">
                резидентов Альянса <br />в {PASSPORT.allianceCountries} странах
              </div>
            </div>
            <div className="stat">
              <div className="stat__value">{fact('Мероприятий в год')}</div>
              <div className="stat__label">
                мероприятий <br />в год
              </div>
            </div>
            <div className="stat">
              <div className="stat__value">{fact('Форум-групп')}</div>
              <div className="stat__label">форум-групп</div>
            </div>
          </div>

          <div className="charts">
            <div className="panel">
              <h3>Оборот бизнеса резидентов</h3>
              <ul className="bars">
                {PASSPORT.turnover.map((b) => (
                  <li className="bar" key={b.label}>
                    <span className="bar__name">{b.label}</span>
                    <span className="bar__pct" hidden>
                      {b.pct}
                    </span>
                    <div className="bar__track">
                      <div className="bar__fill" style={{ '--w': `${Math.round((b.v / 40) * 100)}%` } as React.CSSProperties}>
                        {b.pct}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="panel__foot">
                <div>
                  <div className="kpi__value">от {fact('Входной порог оборота')}</div>
                  <div className="kpi__label">порог входа</div>
                </div>
                <div>
                  <div className="kpi__value">{fact('Средний оборот бизнеса')}</div>
                  <div className="kpi__label">средний оборот</div>
                </div>
                <div>
                  <div className="kpi__value accent">$50 млн+</div>
                  <div className="kpi__label">X Club</div>
                </div>
              </div>
            </div>

            <div className="panel">
              <h3>Ключевые отрасли</h3>
              <div className="donut-wrap">
                <div className="donut" role="img" aria-label={donutLabel} style={{ background: `conic-gradient(${donutStops})` }}>
                  <div className="donut__hole">
                    <span className="donut__value">{fact('Отраслей бизнеса')}</span>
                    <span className="donut__label">отраслей</span>
                  </div>
                </div>
                <ul className="legend">
                  {PASSPORT.industries.map((i) => (
                    <li key={i.name} style={{ '--c': i.color } as React.CSSProperties}>
                      <span>{i.name}</span>
                      <b>{i.v}%</b>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="panel__foot">
                <div>
                  <div className="kpi__value">{PASSPORT.foundingYear}</div>
                  <div className="kpi__label">год основания</div>
                </div>
                <div>
                  <div className="kpi__value">{PASSPORT.entrepreneursPct}%</div>
                  <div className="kpi__label">предприниматели</div>
                </div>
                <div>
                  <div className="kpi__value">{PASSPORT.allianceCountries}</div>
                  <div className="kpi__label">стран в Альянсе</div>
                </div>
              </div>
            </div>
          </div>
          <p className="note">Данные на {UPDATED_RU}.</p>
        </section>

        {/* Чем отличается */}
        <section className="section" id="diff">
          <div className="section__head">
            <h2>
              Чем Vision Club
              <br />
              <span className="accent">отличается</span>
            </h2>
            <p>Пять вещей, которые резидент получает с первого дня.</p>
          </div>
          <div className="grid-2 features">
            {PASSPORT.advantages.slice(0, 4).map((a, idx) => (
              <article className="feature" key={a.title}>
                <span className="feature__num">{String(idx + 1).padStart(2, '0')}</span>
                <div className="feature__body">
                  <h3>{a.title.replace('Репутационная проверка участников', 'Репутационная проверка')}</h3>
                  <p>{a.body}</p>
                </div>
              </article>
            ))}
          </div>
          <article className="xclub">
            <div className="xclub__text">
              <span className="xclub__kicker">05 · ЗАКРЫТЫЙ КРУГ</span>
              <h3>X Club</h3>
              <p>{xclub.body}</p>
            </div>
            <div className="xclub__value">
              $50M<span className="accent">+</span>
            </div>
          </article>
        </section>

        {/* Кому подходит */}
        <section className="section" id="fit">
          <h2>Кому подходит клуб</h2>
          <div className="grid-2">
            <div className="fit fit--yes">
              <div className="fit__title">Подходит</div>
              <ul>
                {FOR_WHOM.map((t) => (
                  <li key={t}>
                    <CheckIcon />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="fit fit--no">
              <div className="fit__title">Кому не подходит</div>
              <ul>
                {NOT_FOR.map((t) => (
                  <li key={t}>
                    <CrossIcon />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Основатели */}
        <section className="section" id="founders">
          <h2>Основатели</h2>
          <div className="grid-2">
            {FOUNDERS.map((f) => (
              <article className="founder" key={f.name}>
                <Image
                  className="founder__photo"
                  src={asset(f.photo)}
                  alt={f.name}
                  width={160}
                  height={200}
                  sizes="160px"
                  loading="eager"
                  style={{ objectPosition: f.pos }}
                />
                <div className="founder__body">
                  <h3>{f.name}</h3>
                  <div className="founder__role">{f.role}</div>
                  <p>{f.bio}</p>
                  <div className="founder__facts">
                    {f.facts.map((x) => (
                      <span key={x.t}>
                        <b>{x.n}</b> {x.t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Как вступить */}
        <section className="section" id="join">
          <h2>Как вступить</h2>
          <ol className="steps">
            {STEPS.map((s, idx) => (
              <li className="step" key={s.title}>
                <span className="step__num">{idx + 1}</span>
                <strong>{s.title}</strong>
                <span>{s.body}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="section faq" id="faq">
          <div className="faq__intro">
            <h2>
              Частые
              <br />
              вопросы
            </h2>
            <p className="muted">
              Не нашли ответ? Напишите менеджеру в{' '}
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              .
            </p>
          </div>
          <div className="faq__list">
            {FAQ.map((f, idx) => (
              <details key={f.q} open={idx === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Все факты: полная таблица, свернута. Нужна для поисковиков и ИИ */}
        <details className="allfacts">
          <summary>Все факты о клубе</summary>
          <table>
            <tbody>
              <tr>
                <th>Название</th>
                <td>Vision Club</td>
              </tr>
              <tr>
                <th>Тип</th>
                <td>Закрытый бизнес-клуб для предпринимателей и топ-менеджеров, вступление по приглашению</td>
              </tr>
              <tr>
                <th>Город</th>
                <td>Дубай, ОАЭ</td>
              </tr>
              <tr>
                <th>Язык сообщества</th>
                <td>Русский</td>
              </tr>
              {PASSPORT.facts.map((f) => (
                <tr key={f.label}>
                  <th>{f.label}</th>
                  <td>{f.value}</td>
                </tr>
              ))}
              <tr>
                <th>Основатели</th>
                <td>{SITE.founders.map((f) => f.name).join(', ')}</td>
              </tr>
              <tr>
                <th>Клубный дом</th>
                <td>
                  {SITE.address.street}, {SITE.address.locality}, Дубай
                </td>
              </tr>
              <tr>
                <th>Сайт</th>
                <td>vision-club.ae</td>
              </tr>
            </tbody>
          </table>
        </details>

        {/* CTA */}
        <section className="cta" id="cta">
          <div className="cta__text">
            <h2>Хотите стать резидентом?</h2>
            <p>
              Оставьте заявку — менеджер клуба свяжется, расскажет об условиях резидентства и пригласит на встречу в
              клубный дом.
            </p>
          </div>
          <div className="cta__actions">
            <ApplyButton className="btn btn--dark">Оставить заявку →</ApplyButton>
            <a className="btn btn--outline-dark" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </section>

        <p style={{ textAlign: 'center', margin: '-64px 0 64px' }}>
          <Link href="/" className="muted">
            ← Вернуться на главную
          </Link>
        </p>
      </main>
    </div>
    {/* Общие компоненты сайта — вне .okl, чтобы стили страницы их не задевали */}
    <Footer />
    <StickyCTA />
    <MainCTAModal />
    </>
  );
}
