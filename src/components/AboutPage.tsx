import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, asset } from '@/lib/site';
import { PASSPORT } from '@/lib/passport';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import MainCTAModal from '@/components/MainCTAModal';
import LangSwitch from '@/components/LangSwitch';
import { AnchorNav, ApplyButton } from '@/components/about/AboutClient';
import { alternatesFor, href, OG_LOCALE, SCHEMA_LANG, type Lang } from '@/lib/i18n';
import '@/components/about/about.css';

// Страница «О клубе / Факты и цифры»: /o-klube/ (ru) и /en/about/ (en).
// Дизайн — макет владельца (~/Desktop/vision-o-klube), стили изолированы под .okl.
// Тексты — в COPY, цифры — из PASSPORT: меняются в одном месте для обоих языков.

const COPY = {
  ru: {
    title: 'Vision Club — факты и цифры о бизнес-клубе в Дубае',
    description:
      'Vision Club в цифрах: основан в 2021 году, 220+ предпринимателей в Дубае из 70+ отраслей, 1 200+ резидентов Альянса, вход от $1 млн оборота, 250+ мероприятий в год, 18 форум-групп.',
    updated: '28 ноября 2026',
    updatedShort: '28.11.2026',
    apply: 'Оставить заявку',
    home: 'Главная',
    crumb: 'О клубе',
    crumbsAria: 'Хлебные крошки',
    pill: 'Только по приглашению · Дубай',
    h1: 'факты и цифры',
    lead: (f: (l: string) => string) =>
      `Vision Club — русскоязычный бизнес-клуб в Дубае для собственников бизнеса и топ-менеджеров. Основан в ${PASSPORT.foundingYear} году. В клубе ${f('Предпринимателей в Дубае')} предпринимателей из ${f('Отраслей бизнеса')} отраслей, вход от ${f('Входной порог оборота')} годового оборота, средний оборот бизнеса резидентов около ${f('Средний оборот бизнеса').replace('~', '')}. Через международный Альянс клубов резиденты связаны с ${f('Резидентов Альянса')} предпринимателями.`,
    becomeMember: 'Стать резидентом →',
    howToJoin: 'Как вступить',
    passport: 'Паспорт клуба',
    asOf: 'на',
    pType: 'Тип',
    pTypeValue: 'Закрытый бизнес-клуб, вступление по приглашению',
    pCity: 'Город',
    pCityValue: 'Дубай, ОАЭ',
    pLang: 'Язык',
    pLangValue: 'Русский',
    pFounders: 'Основатели',
    pClubhouse: 'Клубный дом',
    pMore: 'Подробнее',
    pSite: 'Сайт',
    numbersPill: 'Vision в цифрах',
    statDubai: ['предпринимателей', 'в Дубае'],
    statAlliance: (n: number) => ['резидентов Альянса', `в ${n} странах`],
    statEvents: ['мероприятий', 'в год'],
    statForum: 'форум-групп',
    turnoverHead: 'Оборот бизнеса резидентов',
    kpiThreshold: 'порог входа',
    kpiThresholdPrefix: 'от ',
    kpiAvg: 'средний оборот',
    kpiXClub: '$50 млн+',
    industriesHead: 'Ключевые отрасли',
    industriesAria: 'Отрасли резидентов',
    industriesCount: 'отраслей',
    kpiFounded: 'год основания',
    kpiEntrepreneurs: 'предприниматели',
    kpiCountries: 'стран в Альянсе',
    dataAsOf: 'Данные на',
    diffHead: ['Чем Vision Club', 'отличается'],
    diffSub: 'Пять вещей, которые резидент получает с первого дня.',
    xKicker: '05 · ЗАКРЫТЫЙ КРУГ',
    fitHead: 'Кому подходит клуб',
    fitYes: 'Подходит',
    fitNo: 'Кому не подходит',
    forWhom: [
      'Собственники действующего бизнеса с годовым оборотом от $1 млн',
      'Топ-менеджеры и C-level крупных компаний',
      'Инвесторы и семейные офисы',
      'Эксперты и консультанты с сильной деловой репутацией',
    ],
    notFor: [
      'Стартапы без выручки',
      'Инфобизнес без устойчивой бизнес-модели',
      'Посреднические схемы без сильного продукта',
      'Кандидаты, не готовые к отбору и репутационному чеку',
    ],
    foundersHead: 'Основатели',
    founders: [
      {
        name: 'Алексей Наказный',
        role: 'Сооснователь Vision Club и Alliance Clubs',
        bio: 'Серийный предприниматель. За 13 лет выстроил международную сеть бизнес-лидеров и лично провёл тысячи встреч с предпринимателями по всему миру.',
        facts: [{ n: '13', t: 'лет' }],
      },
      {
        name: 'Дарья Наказная',
        role: 'Сооснователь Vision Club и Alliance Clubs',
        bio: 'За 8 лет запустила 5 бизнес-клубов в разных странах и провела 2000+ мероприятий.',
        facts: [
          { n: '5', t: 'клубов' },
          { n: '2000+', t: 'мероприятий' },
        ],
      },
    ],
    joinHead: 'Как вступить',
    steps: [
      { title: 'Заявка', body: 'На сайте или в WhatsApp.' },
      { title: 'Разговор с менеджером', body: 'Бизнес, запросы, ожидания.' },
      { title: 'Репутационная проверка', body: 'Проверяем деловую репутацию кандидата.' },
      { title: 'Знакомство с клубом', body: 'Встреча в клубном доме или ближайшее мероприятие.' },
      { title: 'Резидентство', body: 'Решение о резидентстве и подключение бизнес-менеджера.' },
    ],
    faqHead: ['Частые', 'вопросы'],
    faqNote: ['Не нашли ответ? Напишите менеджеру в', 'WhatsApp'],
    faq: [
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
    ],
    allFacts: 'Все факты о клубе',
    rows: {
      name: 'Название',
      type: 'Тип',
      typeValue: 'Закрытый бизнес-клуб для предпринимателей и топ-менеджеров, вступление по приглашению',
      city: 'Город',
      cityValue: 'Дубай, ОАЭ',
      language: 'Язык сообщества',
      languageValue: 'Русский',
      founders: 'Основатели',
      clubhouse: 'Клубный дом',
      clubhouseCity: 'Дубай',
      site: 'Сайт',
    },
    ctaTitle: 'Хотите стать резидентом?',
    ctaBody:
      'Оставьте заявку — менеджер клуба свяжется, расскажет об условиях резидентства и пригласит на встречу в клубный дом.',
    ctaBtn: 'Оставить заявку →',
    back: '← Вернуться на главную',
    logoAria: 'Vision Club — на главную',
  },
  en: {
    title: 'Facts and figures about the business club in Dubai',
    description:
      'Vision Club in numbers: founded in 2021, 220+ entrepreneurs in Dubai from 70+ industries, 1,200+ members across Alliance Clubs, a $1M annual revenue threshold, 250+ events a year and 18 forum groups.',
    updated: '28 November 2026',
    updatedShort: '28.11.2026',
    apply: 'Apply',
    home: 'Home',
    crumb: 'About',
    crumbsAria: 'Breadcrumb',
    pill: 'By invitation only · Dubai',
    h1: 'facts and figures',
    lead: (f: (l: string) => string) =>
      `Vision Club is a Russian-speaking business club in Dubai for business owners and senior executives, founded in ${PASSPORT.foundingYear}. It has ${f('Entrepreneurs in Dubai')} members from ${f('Industries represented')} industries. Membership starts at ${f('Minimum annual revenue')} in annual revenue, and the average member’s business turns over around ${f('Average member business revenue').replace('~', '')}. Through the international Alliance Clubs network, members are connected with ${f('Members across Alliance Clubs')} entrepreneurs.`,
    becomeMember: 'Apply for membership →',
    howToJoin: 'How to join',
    passport: 'Club at a glance',
    asOf: 'as of',
    pType: 'Type',
    pTypeValue: 'Private business club, membership by invitation',
    pCity: 'City',
    pCityValue: 'Dubai, UAE',
    pLang: 'Language',
    pLangValue: 'Russian',
    pFounders: 'Founders',
    pClubhouse: 'Clubhouse',
    pMore: 'Details',
    pSite: 'Website',
    numbersPill: 'Vision in numbers',
    statDubai: ['entrepreneurs', 'in Dubai'],
    statAlliance: (n: number) => ['Alliance Clubs members', `in ${n} countries`],
    statEvents: ['events', 'a year'],
    statForum: 'forum groups',
    turnoverHead: 'Member business revenue',
    kpiThreshold: 'minimum to join',
    kpiThresholdPrefix: '',
    kpiAvg: 'average revenue',
    kpiXClub: '$50M+',
    industriesHead: 'Key industries',
    industriesAria: 'Member industries',
    industriesCount: 'industries',
    kpiFounded: 'founded',
    kpiEntrepreneurs: 'business owners',
    kpiCountries: 'Alliance countries',
    dataAsOf: 'Data as of',
    diffHead: ['What sets Vision Club', 'apart'],
    diffSub: 'Five things every member gets from day one.',
    xKicker: '05 · INNER CIRCLE',
    fitHead: 'Who the club is for',
    fitYes: 'A good fit',
    fitNo: 'Not a fit',
    forWhom: [
      'Owners of established businesses with annual revenue of $1M or more',
      'Senior executives and C-suite leaders of major companies',
      'Investors and family offices',
      'Experts and advisers with a strong business reputation',
    ],
    notFor: [
      'Pre-revenue start-ups',
      'Info-product businesses without a sustainable business model',
      'Middleman schemes without a strong product',
      'Candidates unwilling to go through selection and a reputation check',
    ],
    foundersHead: 'Founders',
    founders: [
      {
        name: 'Aleksey Nakazny',
        role: 'Co-founder of Vision Club and Alliance Clubs',
        bio: 'Serial entrepreneur. Over 13 years, he has built an international network of business leaders and personally met thousands of entrepreneurs around the world.',
        facts: [{ n: '13', t: 'years' }],
      },
      {
        name: 'Daria Nakaznaya',
        role: 'Co-founder of Vision Club and Alliance Clubs',
        bio: 'Over 8 years, she has launched five business clubs in different countries and hosted 2,000+ events.',
        facts: [
          { n: '5', t: 'clubs' },
          { n: '2,000+', t: 'events' },
        ],
      },
    ],
    joinHead: 'How to join',
    steps: [
      { title: 'Apply', body: 'On this website or via WhatsApp.' },
      { title: 'Intro call', body: 'Your business, your needs, your expectations.' },
      { title: 'Reputation check', body: 'We verify the candidate’s business reputation.' },
      { title: 'Meet the club', body: 'A visit to the Clubhouse or an upcoming event.' },
      { title: 'Membership', body: 'A membership decision and an introduction to your relationship manager.' },
    ],
    faqHead: ['Frequently asked', 'questions'],
    faqNote: ['Can’t find your answer? Message our team on', 'WhatsApp'],
    faq: [
      {
        q: 'What is Vision Club?',
        a: 'Vision Club is a Russian-speaking business club in Dubai for business owners and senior executives. Founded in 2021, it brings together 220+ entrepreneurs from 70+ industries and is part of Alliance Clubs, an international network with 1,200+ members.',
      },
      {
        q: 'What does it take to join Vision Club?',
        a: 'Annual business revenue of $1M or more. The average member’s business turns over around $10M. For owners of businesses with revenue above $50M, the club has a separate inner circle, X Club.',
      },
      {
        q: 'How do I join Vision Club?',
        a: 'Apply on this website, have a conversation with a member of our team, pass a reputation check and get to know the club at one of our gatherings. Membership is by invitation only, following selection.',
      },
      {
        q: 'Is Vision Club a nightclub?',
        a: 'No. Vision Club is a business club for entrepreneurs. It has no connection to the VISION nightclub at H Hotel Dubai.',
      },
      {
        q: 'How many events does the club hold?',
        a: '250+ events a year: monthly gatherings, 18 forum groups, dinners, business deep dives, special-interest circles, trips and Alliance Clubs events.',
      },
    ],
    allFacts: 'All facts about the club',
    rows: {
      name: 'Name',
      type: 'Type',
      typeValue: 'Private business club for entrepreneurs and senior executives; membership by invitation',
      city: 'City',
      cityValue: 'Dubai, UAE',
      language: 'Community language',
      languageValue: 'Russian',
      founders: 'Founders',
      clubhouse: 'Clubhouse',
      clubhouseCity: 'Dubai',
      site: 'Website',
    },
    ctaTitle: 'Interested in membership?',
    ctaBody:
      'Submit an application and a member of our team will be in touch to explain how membership works and invite you to meet us at the Clubhouse.',
    ctaBtn: 'Apply for membership →',
    back: '← Back to the home page',
    logoAria: 'Vision Club — home page',
  },
};

export function aboutMetadata(lang: Lang): Metadata {
  const t = COPY[lang];
  const url = `${SITE.url}${href('about', lang)}`;
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor('about', lang),
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[lang],
      url,
      siteName: SITE.name,
      title: t.title,
      description: t.description,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: t.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: [SITE.ogImage],
    },
  };
}

const PHOTOS = ['/assets/people/aleksey-nakazny.webp', '/assets/people/daria-nakaznaya.webp'];

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

export default function AboutPage({ lang = 'ru' }: { lang?: Lang }) {
  const t = COPY[lang];
  const en = lang === 'en';
  const PAGE_URL = `${SITE.url}${href('about', lang)}`;
  const homeUrl = en ? `${SITE.url}/en/` : SITE.url;
  const whatsapp = en ? SITE.whatsappEn : SITE.whatsapp;

  const facts = PASSPORT.facts.map((f) =>
    en ? { label: f.labelEn as string, value: f.valueEn as string } : { label: f.label as string, value: f.value as string },
  );
  const fact = (label: string) => facts.find((f) => f.label === label)?.value ?? '';
  const F = en
    ? {
        dubai: fact('Entrepreneurs in Dubai'),
        industries: fact('Industries represented'),
        alliance: fact('Members across Alliance Clubs'),
        threshold: fact('Minimum annual revenue'),
        avg: fact('Average member business revenue'),
        events: fact('Events a year'),
        forum: fact('Forum groups'),
      }
    : {
        dubai: fact('Предпринимателей в Дубае'),
        industries: fact('Отраслей бизнеса'),
        alliance: fact('Резидентов Альянса'),
        threshold: fact('Входной порог оборота'),
        avg: fact('Средний оборот бизнеса'),
        events: fact('Мероприятий в год'),
        forum: fact('Форум-групп'),
      };
  const advantages = PASSPORT.advantages.map((a) =>
    en ? { title: a.titleEn as string, body: a.bodyEn as string } : { title: a.title as string, body: a.body as string },
  );
  const founderNames = t.founders.map((f) => f.name).join(', ');

  const orgRef = { '@id': `${SITE.url}/#organization` };
  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${PAGE_URL}#page`,
    url: PAGE_URL,
    name: t.title,
    description: t.description,
    inLanguage: SCHEMA_LANG[lang],
    dateModified: PASSPORT.updatedAt,
    about: orgRef,
    mainEntity: orgRef,
    isPartOf: { '@id': `${SITE.url}/#website` },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: SCHEMA_LANG[lang],
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.crumb, item: PAGE_URL },
    ],
  };

  let acc = 0;
  const donutStops = PASSPORT.industries
    .map((i) => {
      const from = acc;
      acc += i.v;
      return `${i.color} ${from}% ${acc}%`;
    })
    .join(', ');
  const industryName = (i: (typeof PASSPORT.industries)[number]) => (en ? i.nameEn : i.name);
  const donutLabel =
    `${t.industriesAria}: ` + PASSPORT.industries.map((i) => `${industryName(i).toLowerCase()} ${i.v}%`).join(', ');
  const xclub = advantages[4];
  const statAlliance = t.statAlliance(PASSPORT.allianceCountries);

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
            <Link className="header__logo" href={href('home', lang)} aria-label={t.logoAria}>
              <Image
                src={asset('/assets/logo-vision.png')}
                alt="Vision Club"
                width={110}
                height={24}
                priority
                style={{ height: 24, width: 'auto' }}
              />
            </Link>
            <AnchorNav lang={lang} />
            <LangSwitch lang={lang} page="about" className="okl-lang" />
            <ApplyButton className="btn btn--primary btn--sm header__cta">{t.apply}</ApplyButton>
          </div>
        </header>

        <main className="container">
          <section className="hero" id="facts">
            <div className="hero__text">
              <nav className="breadcrumbs" aria-label={t.crumbsAria}>
                <Link href={href('home', lang)}>{t.home}</Link> · {t.crumb}
              </nav>
              <span className="pill">{t.pill}</span>
              <h1>
                <span className="accent">Vision Club</span>
                <br />
                {t.h1}
              </h1>
              <p className="hero__lead">{t.lead(fact)}</p>
              <div className="hero__actions">
                <ApplyButton className="btn btn--primary">{t.becomeMember}</ApplyButton>
                <a className="btn btn--ghost" href="#join">
                  {t.howToJoin}
                </a>
              </div>
            </div>

            <div className="hero__aside">
              <div className="ring ring--1" aria-hidden="true" />
              <div className="ring ring--2" aria-hidden="true" />
              <aside className="passport" aria-label={t.passport}>
                <div className="passport__head">
                  <span className="passport__title">{t.passport}</span>
                  <span className="passport__date">
                    {t.asOf} {t.updatedShort}
                  </span>
                </div>
                <dl>
                  <dt>{t.pType}</dt>
                  <dd>{t.pTypeValue}</dd>
                  <dt>{t.pCity}</dt>
                  <dd>{t.pCityValue}</dd>
                  <dt>{t.pLang}</dt>
                  <dd>{t.pLangValue}</dd>
                  <dt>{t.pFounders}</dt>
                  <dd>{founderNames}</dd>
                  <dt>{t.pClubhouse}</dt>
                  <dd>
                    {en ? SITE.address.street : SITE.address.streetRu}, Dubai Internet City · <Link href={href('clubhouse', lang)}>{t.pMore}</Link>
                  </dd>
                  <dt>{t.pSite}</dt>
                  <dd>
                    <a href={homeUrl}>vision-club.ae</a>
                  </dd>
                </dl>
              </aside>
            </div>
          </section>

          <section className="numbers" id="numbers">
            <div className="numbers__label">
              <span className="pill">{t.numbersPill}</span>
            </div>

            <div className="stats">
              <div className="stat stat--hot">
                <div className="stat__value">{F.dubai}</div>
                <div className="stat__label">
                  {t.statDubai[0]} <br />
                  {t.statDubai[1]}
                </div>
              </div>
              <div className="stat stat--hot stat--hot-2">
                <div className="stat__value">{F.alliance}</div>
                <div className="stat__label">
                  {statAlliance[0]} <br />
                  {statAlliance[1]}
                </div>
              </div>
              <div className="stat">
                <div className="stat__value">{F.events}</div>
                <div className="stat__label">
                  {t.statEvents[0]} <br />
                  {t.statEvents[1]}
                </div>
              </div>
              <div className="stat">
                <div className="stat__value">{F.forum}</div>
                <div className="stat__label">{t.statForum}</div>
              </div>
            </div>

            <div className="charts">
              <div className="panel">
                <h3>{t.turnoverHead}</h3>
                <ul className="bars">
                  {PASSPORT.turnover.map((b) => {
                    const pct = en ? b.pctEn : b.pct;
                    return (
                      <li className="bar" key={b.label}>
                        <span className="bar__name">{en ? b.labelEn : b.label}</span>
                        <span className="bar__pct" hidden>
                          {pct}
                        </span>
                        <div className="bar__track">
                          <div
                            className="bar__fill"
                            style={{ '--w': `${Math.round((b.v / 40) * 100)}%` } as React.CSSProperties}
                          >
                            {pct}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="panel__foot">
                  <div>
                    <div className="kpi__value">
                      {t.kpiThresholdPrefix}
                      {F.threshold}
                      {en ? '+' : ''}
                    </div>
                    <div className="kpi__label">{t.kpiThreshold}</div>
                  </div>
                  <div>
                    <div className="kpi__value">{F.avg}</div>
                    <div className="kpi__label">{t.kpiAvg}</div>
                  </div>
                  <div>
                    <div className="kpi__value accent">{t.kpiXClub}</div>
                    <div className="kpi__label">X Club</div>
                  </div>
                </div>
              </div>

              <div className="panel">
                <h3>{t.industriesHead}</h3>
                <div className="donut-wrap">
                  <div
                    className="donut"
                    role="img"
                    aria-label={donutLabel}
                    style={{ background: `conic-gradient(${donutStops})` }}
                  >
                    <div className="donut__hole">
                      <span className="donut__value">{F.industries}</span>
                      <span className="donut__label">{t.industriesCount}</span>
                    </div>
                  </div>
                  <ul className="legend">
                    {PASSPORT.industries.map((i) => (
                      <li key={i.name} style={{ '--c': i.color } as React.CSSProperties}>
                        <span>{industryName(i)}</span>
                        <b>{i.v}%</b>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="panel__foot">
                  <div>
                    <div className="kpi__value">{PASSPORT.foundingYear}</div>
                    <div className="kpi__label">{t.kpiFounded}</div>
                  </div>
                  <div>
                    <div className="kpi__value">{PASSPORT.entrepreneursPct}%</div>
                    <div className="kpi__label">{t.kpiEntrepreneurs}</div>
                  </div>
                  <div>
                    <div className="kpi__value">{PASSPORT.allianceCountries}</div>
                    <div className="kpi__label">{t.kpiCountries}</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="note">
              {t.dataAsOf} {t.updated}.
            </p>
          </section>

          <section className="section" id="diff">
            <div className="section__head">
              <h2>
                {t.diffHead[0]}
                <br />
                <span className="accent">{t.diffHead[1]}</span>
              </h2>
              <p>{t.diffSub}</p>
            </div>
            <div className="grid-2 features">
              {advantages.slice(0, 4).map((a, idx) => (
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
                <span className="xclub__kicker">{t.xKicker}</span>
                <h3>X Club</h3>
                <p>{xclub.body}</p>
              </div>
              <div className="xclub__value">
                $50M<span className="accent">+</span>
              </div>
            </article>
          </section>

          <section className="section" id="fit">
            <h2>{t.fitHead}</h2>
            <div className="grid-2">
              <div className="fit fit--yes">
                <div className="fit__title">{t.fitYes}</div>
                <ul>
                  {t.forWhom.map((x) => (
                    <li key={x}>
                      <CheckIcon />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="fit fit--no">
                <div className="fit__title">{t.fitNo}</div>
                <ul>
                  {t.notFor.map((x) => (
                    <li key={x}>
                      <CrossIcon />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="section" id="founders">
            <h2>{t.foundersHead}</h2>
            <div className="grid-2">
              {t.founders.map((f, idx) => (
                <article className="founder" key={f.name}>
                  <Image
                    className="founder__photo"
                    src={asset(PHOTOS[idx])}
                    alt={f.name}
                    width={160}
                    height={200}
                    sizes="160px"
                    loading="eager"
                    style={{ objectPosition: '50% 15%' }}
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

          <section className="section" id="join">
            <h2>{t.joinHead}</h2>
            <ol className="steps">
              {t.steps.map((s, idx) => (
                <li className="step" key={s.title}>
                  <span className="step__num">{idx + 1}</span>
                  <strong>{s.title}</strong>
                  <span>{s.body}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="section faq" id="faq">
            <div className="faq__intro">
              <h2>
                {t.faqHead[0]}
                <br />
                {t.faqHead[1]}
              </h2>
              <p className="muted">
                {t.faqNote[0]}{' '}
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  {t.faqNote[1]}
                </a>
                .
              </p>
            </div>
            <div className="faq__list">
              {t.faq.map((f, idx) => (
                <details key={f.q} open={idx === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Полная таблица фактов, свернута. Нужна для поисковиков и ИИ */}
          <details className="allfacts">
            <summary>{t.allFacts}</summary>
            <table>
              <tbody>
                <tr>
                  <th>{t.rows.name}</th>
                  <td>Vision Club</td>
                </tr>
                <tr>
                  <th>{t.rows.type}</th>
                  <td>{t.rows.typeValue}</td>
                </tr>
                <tr>
                  <th>{t.rows.city}</th>
                  <td>{t.rows.cityValue}</td>
                </tr>
                <tr>
                  <th>{t.rows.language}</th>
                  <td>{t.rows.languageValue}</td>
                </tr>
                {facts.map((f) => (
                  <tr key={f.label}>
                    <th>{f.label}</th>
                    <td>{f.value}</td>
                  </tr>
                ))}
                <tr>
                  <th>{t.rows.founders}</th>
                  <td>{founderNames}</td>
                </tr>
                <tr>
                  <th>{t.rows.clubhouse}</th>
                  <td>
                    {en ? SITE.address.street : SITE.address.streetRu}, {SITE.address.locality}, {t.rows.clubhouseCity}
                  </td>
                </tr>
                <tr>
                  <th>{t.rows.site}</th>
                  <td>vision-club.ae</td>
                </tr>
              </tbody>
            </table>
          </details>

          <section className="cta" id="cta">
            <div className="cta__text">
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaBody}</p>
            </div>
            <div className="cta__actions">
              <ApplyButton className="btn btn--dark">{t.ctaBtn}</ApplyButton>
              <a className="btn btn--outline-dark" href={whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </section>

          <p style={{ textAlign: 'center', margin: '-64px 0 64px' }}>
            <Link href={href('home', lang)} className="muted">
              {t.back}
            </Link>
          </p>
        </main>
      </div>
      {/* Общие компоненты сайта — вне .okl, чтобы стили страницы их не задевали */}
      <Footer lang={lang} page="about" />
      <StickyCTA lang={lang} />
      <MainCTAModal lang={lang} />
    </>
  );
}
