import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, asset } from '@/lib/site';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import MainCTAModal from '@/components/MainCTAModal';
import LangSwitch from '@/components/LangSwitch';
import { AnchorNav, ApplyButton } from '@/components/about/AboutClient';
import { alternatesFor, href, OG_LOCALE, SCHEMA_LANG, type Lang } from '@/lib/i18n';
import '@/components/clubhouse/clubhouse.css';

// Страница «Клубный дом»: /klubnyi-dom/ (ru) и /en/clubhouse/ (en).
// Дизайн — макет владельца 28.11 (~/Desktop/vision-klubnyi-dom), стили изолированы под .hse.

const ANCHORS = [
  { id: 'inside', ru: 'Что внутри', en: 'Inside' },
  { id: 'gallery', ru: 'Атмосфера', en: 'Atmosphere' },
  { id: 'route', ru: 'Как добраться', en: 'Getting here' },
];

const PHOTO = {
  hero: '/assets/clubhouse/lounge-hero.webp',
  overview: '/assets/clubhouse/overview.webp',
};

const GALLERY: { src: string; w: number; h: number; cls: string; pos?: string; alt: { ru: string; en: string } }[] = [
  { src: '/assets/clubhouse/mezzanine.webp', w: 1300, h: 867, cls: 'gallery__item--big', pos: '50% 40%', alt: { ru: 'Мезонин клубного дома', en: 'The Clubhouse mezzanine' } },
  { src: '/assets/clubhouse/crowd.webp', w: 866, h: 1300, cls: 'gallery__item--tall', pos: '50% 30%', alt: { ru: 'Резиденты в клубном доме', en: 'Members at the Clubhouse' } },
  { src: '/assets/clubhouse/networking.webp', w: 1300, h: 866, cls: '', alt: { ru: 'Нетворкинг резидентов', en: 'Members networking' } },
  { src: '/assets/clubhouse/forum.webp', w: 1300, h: 866, cls: '', pos: '60% 40%', alt: { ru: 'Встреча в клубном доме', en: 'A gathering at the Clubhouse' } },
  { src: '/assets/clubhouse/speaker.webp', w: 1300, h: 867, cls: 'gallery__item--wide', pos: '45% 45%', alt: { ru: 'Выступление в клубном доме', en: 'A talk at the Clubhouse' } },
];

const COPY = {
  ru: {
    title: 'Клубный дом Vision Club — приватное пространство в Дубае',
    description:
      'Клубный дом Vision — приватное пространство в Dubai Internet City для встреч 220+ резидентов бизнес-клуба. Адрес, как добраться, что внутри, часы работы для резидентов.',
    ldName: 'Клубный дом Vision Club',
    ldHours: 'Только для резидентов и приглашённых гостей — по предварительной записи через менеджера клуба.',
    apply: 'Оставить заявку',
    logoAria: 'Vision Club — на главную',
    home: 'Главная',
    crumb: 'Клубный дом',
    crumbsAria: 'Хлебные крошки',
    pill: 'Закрыто для внешних посетителей',
    h1: ['Клубный дом', 'Vision Club', 'в Дубае'],
    heroAlt: 'Лаунж клубного дома с логотипом Vision',
    lead: 'Клубный дом Vision — приватное пространство в Dubai Internet City, где собираются 220+ резидентов клуба. Здесь проходят форум-группы, ужины, встречи с гостями, разборы бизнесов и подклубы. Не коворкинг и не бизнес-центр — закрытая территория для своих.',
    heroCta: 'Попасть в клубный дом →',
    heroRoute: 'Как добраться',
    factsAria: 'Коротко',
    facts: [
      { b: 'Dubai Internet City', s: 'Loft Offices 3, вход B' },
      { b: '2 этаж, офис 206', s: 'Al Sufouh 2, Dubai' },
      { b: 'Пн–Сб 10:00–23:00', s: 'по предварительной записи' },
      { b: 'Только свои', s: 'резиденты и приглашённые гости' },
    ],
    insideHead: ['Что происходит', 'внутри'],
    insideSub:
      'Клубный дом — это не коворкинг и не бизнес-центр. Это закрытое пространство, куда мы приводим только резидентов клуба и приглашённых гостей.',
    cards: [
      {
        title: 'Форум-группы и разборы',
        body: 'Здесь проходят форум-группы — закрытые встречи 10 равных по масштабу предпринимателей, где разбираются стратегические, финансовые и личные вопросы бизнеса.',
      },
      { title: 'Ужины и подклубы', body: 'Регулярные ужины резидентов, встречи подклубов и другие форматы.' },
      {
        title: 'Встречи с гостями',
        body: 'Кандидаты на резидентство приглашаются в Клубный дом на знакомство с сооснователями и другими резидентами клуба.',
      },
      { title: 'Приватное место', body: 'Не коворкинг и не бизнес-центр — только резиденты клуба и приглашённые гости.' },
    ],
    tags: ['AI & IT', 'Music & Arts', 'Маркетинг', 'Чайный подклуб', 'Синемалогия'],
    overviewAlt: 'Клубный дом Vision — общий вид сверху',
    capMembers: 'резидентов собираются здесь',
    capForum: 'человек в форум-группе',
    galleryHead: 'Атмосфера',
    note: [
      'Клубный дом закрыт для внешних посетителей. Попасть внутрь можно только через вступление в клуб или по приглашению резидента.',
      'Кандидаты приглашаются на ознакомительную встречу после подачи заявки.',
    ],
    noteMobile:
      'Клубный дом закрыт для внешних посетителей — попасть внутрь можно через вступление в клуб или по приглашению резидента.',
    routeHead: ['Адрес и', 'как добраться'],
    addressLabel: 'Адрес',
    addressSub: 'Dubai Internet City, Al Sufouh 2, Dubai, ОАЭ',
    openMap: 'Открыть в Google Maps →',
    hoursLabel: 'Режим работы',
    hours: 'Пн–Сб 10:00–23:00 для резидентов и приглашённых гостей (по предварительной записи).',
    ways: [
      { b: 'Метро', p: 'Red Line, станция «Nakheel» или «Internet City» — 10–15 минут пешком до Loft Offices 3.', c: '#e53935' },
      { b: 'Такси / Careem', p: 'Назовите ориентир «Loft Offices 3, Dubai Internet City, Entrance B». Клубный дом на 2 этаже, офис 206.' },
    ],
    parkingTitle: 'Парковка',
    parking: 'Уличная рядом с Loft Offices 3 или многоэтажная (первый час бесплатно, далее 10 AED в час) —',
    parkingLink: 'парковка на карте',
    mapTitle: 'Клубный дом Vision на карте',
    ctaTitle: 'Хотите попасть в клубный дом?',
    ctaBody:
      'Оставьте заявку — менеджер клуба свяжется, расскажет об условиях резидентства и пригласит на ближайшую встречу в Клубный дом.',
    ctaBtn: 'Оставить заявку →',
  },
  en: {
    title: 'The Clubhouse — a private members’ space in Dubai',
    description:
      'The Vision Club Clubhouse is a private space in Dubai Internet City where the business club’s 220+ members meet. Address, directions, what happens inside and opening hours for members.',
    ldName: 'Vision Clubhouse',
    ldHours: 'Members and invited guests only, by prior appointment through the club team.',
    apply: 'Apply',
    logoAria: 'Vision Club — home page',
    home: 'Home',
    crumb: 'Clubhouse',
    crumbsAria: 'Breadcrumb',
    pill: 'Closed to the public',
    h1: ['The', 'Vision Club', 'Clubhouse in Dubai'],
    heroAlt: 'The Clubhouse lounge with the Vision logo',
    lead: 'The Vision Clubhouse is a private space in Dubai Internet City where the club’s 220+ members come together. It hosts forum groups, dinners, meetings with guests, business deep dives and member circles. Neither a co-working space nor an office centre, it is reserved for members and their guests.',
    heroCta: 'Visit the Clubhouse →',
    heroRoute: 'Getting here',
    factsAria: 'At a glance',
    facts: [
      { b: 'Dubai Internet City', s: 'Loft Offices 3, Entrance B' },
      { b: '2nd floor, Unit 206', s: 'Al Sufouh 2, Dubai' },
      { b: 'Mon–Sat, 10:00–23:00', s: 'by appointment' },
      { b: 'Members only', s: 'members and invited guests' },
    ],
    insideHead: ['Inside the', 'Clubhouse'],
    insideSub:
      'The Clubhouse is neither a co-working space nor an office centre. It is a private space, open only to club members and their invited guests.',
    cards: [
      {
        title: 'Forum groups and deep dives',
        body: 'This is where forum groups meet: confidential sessions of ten entrepreneurs operating at a similar scale, working through the strategic, financial and personal sides of their businesses.',
      },
      { title: 'Dinners and circles', body: 'Regular member dinners, circle meetings and other formats.' },
      {
        title: 'Meeting prospective members',
        body: 'Candidates for membership are invited to the Clubhouse to meet the co-founders and other members of the club.',
      },
      { title: 'A private space', body: 'Not a co-working space or an office centre — members and invited guests only.' },
    ],
    tags: ['AI & IT', 'Music & Arts', 'Marketing', 'Tea Circle', 'Cinemalogy'],
    overviewAlt: 'The Vision Clubhouse from above',
    capMembers: 'members gather here',
    capForum: 'people in a forum group',
    galleryHead: 'Atmosphere',
    note: [
      'The Clubhouse is closed to the public. Entry is only through membership or at the invitation of a member.',
      'Candidates are invited to an introductory meeting once they have applied.',
    ],
    noteMobile: 'The Clubhouse is closed to the public — entry is through membership or at the invitation of a member.',
    routeHead: ['Address and', 'getting here'],
    addressLabel: 'Address',
    addressSub: 'Dubai Internet City, Al Sufouh 2, Dubai, UAE',
    openMap: 'Open in Google Maps →',
    hoursLabel: 'Opening hours',
    hours: 'Mon–Sat, 10:00–23:00, for members and invited guests (by appointment).',
    ways: [
      { b: 'Metro', p: 'Red Line to Nakheel or Internet City station, then a 10–15-minute walk to Loft Offices 3.', c: '#e53935' },
      { b: 'Taxi / Careem', p: 'Ask for “Loft Offices 3, Dubai Internet City, Entrance B”. The Clubhouse is on the 2nd floor, Unit 206.' },
    ],
    parkingTitle: 'Parking',
    parking: 'Street parking next to Loft Offices 3, or a multi-storey car park (first hour free, then AED 10 an hour) —',
    parkingLink: 'car park on the map',
    mapTitle: 'The Vision Clubhouse on the map',
    ctaTitle: 'Would you like to visit the Clubhouse?',
    ctaBody:
      'Submit an application and a member of our team will be in touch to explain how membership works and invite you to our next gathering at the Clubhouse.',
    ctaBtn: 'Apply for membership →',
  },
};

const MAP_EMBED = 'https://www.google.com/maps?q=Loft+Offices+3,+Entrance+B,+Dubai+Internet+City,+Dubai&z=16&output=embed';

export function clubhouseMetadata(lang: Lang): Metadata {
  const t = COPY[lang];
  const url = `${SITE.url}${href('clubhouse', lang)}`;
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor('clubhouse', lang),
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[lang],
      url,
      siteName: SITE.name,
      title: t.title,
      description: t.description,
      images: [{ url: PHOTO.hero, width: 1307, height: 1961, alt: t.heroAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: [PHOTO.hero],
    },
  };
}

const Ico = ({ d, children }: { d?: string; children?: React.ReactNode }) => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f2851b" strokeWidth="1.7">
    {d ? <path d={d} /> : children}
  </svg>
);
const LockIcon = ({ size = 24 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f2851b" strokeWidth="1.7">
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </svg>
);

export default function ClubhousePage({ lang = 'ru' }: { lang?: Lang }) {
  const t = COPY[lang];
  const en = lang === 'en';
  const PAGE_URL = `${SITE.url}${href('clubhouse', lang)}`;
  const homeUrl = en ? `${SITE.url}/en/` : SITE.url;
  const street = en ? SITE.address.street : SITE.address.streetRu;

  const address = {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  };
  const placeLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${PAGE_URL}#place`,
    name: t.ldName,
    description: t.description,
    ...(en ? { inLanguage: SCHEMA_LANG.en } : {}),
    address,
    url: PAGE_URL,
    image: `${SITE.url}${PHOTO.hero}`,
    hasMap: SITE.address.mapUrl,
    isAccessibleForFree: false,
    publicAccess: false,
    containedInPlace: {
      '@type': 'Place',
      name: 'Dubai Internet City',
      address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    },
  };
  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${PAGE_URL}#business`,
    name: t.ldName,
    alternateName: 'Vision Club House Dubai',
    description: t.description,
    ...(en ? { inLanguage: SCHEMA_LANG.en } : {}),
    url: PAGE_URL,
    telephone: SITE.phone,
    email: SITE.email,
    address,
    image: [PHOTO.hero, PHOTO.overview, ...GALLERY.map((g) => g.src)].map((s) => `${SITE.url}${s}`),
    priceRange: '$$$$',
    parentOrganization: { '@id': `${SITE.url}/#organization` },
    hasMap: SITE.address.mapUrl,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '23:00',
      description: t.ldHours,
    },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.crumb, item: PAGE_URL },
    ],
  };

  const factIcons = [
    <Ico key="pin">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Ico>,
    <Ico key="house">
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6" />
    </Ico>,
    <Ico key="clock">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Ico>,
    <LockIcon key="lock" />,
  ];
  const cardIcons = [
    <svg key="f" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f2851b" strokeWidth="1.7">
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="7" r="2" />
      <circle cx="19" cy="7" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
    </svg>,
    <svg key="d" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f2851b" strokeWidth="1.7">
      <path d="M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-2 6 0 8v10" />
    </svg>,
    <svg key="g" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f2851b" strokeWidth="1.7">
      <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2.5 20c.5-3 3-5 5.5-5s5 2 5.5 5M13 15.5c.9-.3 1.9-.5 3-.5 2.5 0 5 2 5.5 5" />
    </svg>,
    <LockIcon key="l" size={22} />,
  ];

  return (
    <>
      <div className="hse">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        <div className="glow glow--3" aria-hidden="true" />
        <div className="glow glow--4" aria-hidden="true" />
        <div className="glow glow--5" aria-hidden="true" />

        <header className="header">
          <div className="header__row">
            <Link className="header__logo" href={href('home', lang)} aria-label={t.logoAria}>
              <Image src={asset('/assets/logo-vision.png')} alt="Vision Club" width={110} height={24} priority style={{ height: 24, width: 'auto' }} />
            </Link>
            <AnchorNav lang={lang} items={ANCHORS} />
            <LangSwitch lang={lang} page="clubhouse" className="okl-lang" />
            <ApplyButton className="btn btn--primary btn--sm header__cta">{t.apply}</ApplyButton>
          </div>
        </header>

        <section className="house-hero">
          <div className="house-hero__halo" aria-hidden="true" />
          <Image
            className="house-hero__photo"
            src={asset(PHOTO.hero)}
            alt={t.heroAlt}
            width={1307}
            height={1961}
            priority
            sizes="(max-width: 640px) 100vw, 56vw"
          />
          <div className="house-hero__fade-x" aria-hidden="true" />
          <div className="house-hero__fade-y" aria-hidden="true" />
          <div className="house-hero__content">
            <nav className="breadcrumbs" aria-label={t.crumbsAria}>
              <Link href={href('home', lang)}>{t.home}</Link> · {t.crumb}
            </nav>
            <span className="pill pill--glass">{t.pill}</span>
            <h1>
              {t.h1[0]}
              <br />
              <span className="accent">{t.h1[1]}</span> {t.h1[2]}
            </h1>
            <p className="house-hero__lead">{t.lead}</p>
            <div className="hero__actions house-hero__actions">
              <ApplyButton className="btn btn--primary">{t.heroCta}</ApplyButton>
              <a className="btn btn--ghost" href="#route">
                {t.heroRoute}
              </a>
            </div>
          </div>
        </section>

        <main className="container">
          <section className="facts-strip" aria-label={t.factsAria}>
            {t.facts.map((f, i) => (
              <div className={`fact${i === 3 ? ' fact--accent' : ''}`} key={f.b}>
                {factIcons[i]}
                <div>
                  <b>{f.b}</b>
                  <span>{f.s}</span>
                </div>
              </div>
            ))}
          </section>

          <section className="section" id="inside">
            <div className="section__head">
              <h2>
                {t.insideHead[0]}
                <br />
                <span className="accent">{t.insideHead[1]}</span>
              </h2>
              <p>{t.insideSub}</p>
            </div>
            <div className="inside">
              <div className="inside__cards">
                {t.cards.map((c, i) => (
                  <article className={`inside-card${i === 3 ? ' inside-card--accent' : ''}`} key={c.title}>
                    <span className="icon-box">{cardIcons[i]}</span>
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.body}</p>
                      {i === 1 && (
                        <div className="tags">
                          {t.tags.map((g) => (
                            <span className="tag" key={g}>
                              {g}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <div className="inside__photo">
                <Image src={asset(PHOTO.overview)} alt={t.overviewAlt} fill sizes="(max-width: 1024px) 100vw, 600px" style={{ objectFit: 'cover', objectPosition: '45% 55%' }} />
                <div className="inside__caption">
                  <div>
                    <div className="inside__num accent">220+</div>
                    <small>{t.capMembers}</small>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="inside__num">10</div>
                    <small>{t.capForum}</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="gallery">
            <h2>{t.galleryHead}</h2>
            <div className="gallery">
              {GALLERY.map((g) => (
                <figure className={`gallery__item ${g.cls}`.trim()} key={g.src}>
                  <Image
                    src={asset(g.src)}
                    alt={g.alt[lang]}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 50vw, 600px"
                    style={{ objectFit: 'cover', objectPosition: g.pos ?? '50% 50%' }}
                  />
                </figure>
              ))}
              <div className="gallery__note">
                <LockIcon size={28} />
                <p>{t.note[0]}</p>
                <p>{t.note[1]}</p>
              </div>
            </div>
            <p className="gallery-note-mobile">{t.noteMobile}</p>
          </section>

          <section className="section" id="route">
            <h2>
              {t.routeHead[0]} <span className="accent">{t.routeHead[1]}</span>
            </h2>
            <div className="route">
              <div className="route__left">
                <div className="address">
                  <div className="address__label">{t.addressLabel}</div>
                  <p className="address__main">{street}</p>
                  <p className="address__sub">{t.addressSub}</p>
                  <div className="address__actions">
                    <a className="btn btn--primary" href={SITE.address.mapUrl} target="_blank" rel="noopener noreferrer">
                      {t.openMap}
                    </a>
                    <a className="btn btn--ghost" href={en ? SITE.whatsappEn : SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="1.8" strokeLinejoin="round">
                        <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" />
                      </svg>
                      {SITE.phone}
                    </a>
                  </div>
                  <dl>
                    <dt>{t.hoursLabel}</dt>
                    <dd>{t.hours}</dd>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                    </dd>
                  </dl>
                </div>
                <div className="ways">
                  {t.ways.map((w) => (
                    <div className="way" key={w.b}>
                      <span className="dot" style={w.c ? ({ '--c': w.c } as React.CSSProperties) : undefined} />
                      <div>
                        <b>{w.b}</b>
                        <p>{w.p}</p>
                      </div>
                    </div>
                  ))}
                  <div className="way">
                    <span className="dot" style={{ '--c': '#8f8b83' } as React.CSSProperties} />
                    <div>
                      <b>{t.parkingTitle}</b>
                      <p>
                        {t.parking}{' '}
                        <a href={SITE.address.parkingMapUrl} target="_blank" rel="noopener noreferrer">
                          {t.parkingLink}
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="map">
                <iframe title={t.mapTitle} src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </section>

          <section className="cta" id="cta">
            <div className="cta__text">
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaBody}</p>
            </div>
            <div className="cta__actions">
              <ApplyButton className="btn btn--dark">{t.ctaBtn}</ApplyButton>
            </div>
          </section>
        </main>
      </div>
      <Footer lang={lang} page="clubhouse" />
      <StickyCTA lang={lang} />
      <MainCTAModal lang={lang} />
    </>
  );
}
