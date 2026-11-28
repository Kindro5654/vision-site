import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, asset } from '@/lib/site';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import ContactWidget from '@/components/ContactWidget';
import MainCTAModal from '@/components/MainCTAModal';
import ArticlePageHeader from '@/components/ArticlePageHeader';
import { alternatesFor, anchor, href, OG_LOCALE, SCHEMA_LANG, type Lang } from '@/lib/i18n';

// Страница «Клубный дом»: /klubnyi-dom/ (ru) и /en/clubhouse/ (en) — один компонент, два словаря.

const GALLERY = [
  { src: '/assets/gallery/g14.webp', pos: 'center 40%' },
  { src: '/assets/gallery/nr0.webp', pos: 'center 42%' },
  { src: '/assets/gallery/g10.webp', pos: 'center 45%' },
  { src: '/assets/gallery/g01.webp', pos: 'center 40%' },
];

const COPY = {
  ru: {
    title: 'Клубный дом Vision Club — приватное пространство в Дубае',
    description:
      'Клубный дом Vision — приватное пространство в Dubai Internet City для встреч 220+ резидентов бизнес-клуба. Адрес, как добраться, что внутри, часы работы для резидентов.',
    highlights: [
      {
        title: 'Приватное место, не коворкинг',
        body: 'Клубный дом — это не коворкинг и не бизнес-центр. Это закрытое пространство, куда мы приводим только резидентов клуба и приглашённых гостей.',
      },
      {
        title: 'Форум-группы и разборы',
        body: 'Здесь проходят форум-группы — закрытые встречи 10 равных по масштабу предпринимателей, где разбираются стратегические, финансовые и личные вопросы бизнеса.',
      },
      {
        title: 'Ужины и подклубы',
        body: 'Регулярные ужины резидентов, встречи подклубов AI & IT, Music & Arts, Маркетинг, Чайный подклуб, Синемалогия и другие форматы.',
      },
      {
        title: 'Встречи с гостями',
        body: 'Кандидаты на резидентство приглашаются в Клубный дом на знакомство с сооснователями и другими резидентами клуба.',
      },
    ],
    ldName: 'Клубный дом Vision Club',
    ldHours: 'Только для резидентов и приглашённых гостей — по предварительной записи через менеджера клуба.',
    home: 'Главная',
    crumb: 'Клубный дом',
    crumbsAria: 'Хлебные крошки',
    h1: ['Клубный дом ', 'Vision Club', ' в Дубае'],
    lead: 'Клубный дом Vision — приватное пространство в Dubai Internet City, где собираются 220+ резидентов клуба. Здесь проходят форум-группы, ужины, встречи с гостями, разборы бизнесов и подклубы. Не коворкинг и не бизнес-центр — закрытая территория для своих.',
    coverAlt: 'Клубный дом Vision в Дубае',
    addressHead: 'Адрес и контакты',
    addressLabel: 'Адрес',
    country: 'ОАЭ',
    area: 'Район',
    whatsappAria: 'Написать в WhatsApp',
    hoursLabel: 'Режим работы',
    hours: 'Пн–Сб 10:00–23:00 для резидентов и приглашённых гостей (по предварительной записи).',
    howHead: 'Как добраться',
    metroLabel: 'На метро:',
    metro: 'Red Line, станция «Nakheel» или «Internet City» — 10–15 минут пешком до Loft Offices 3.',
    taxiLabel: 'На такси / Careem:',
    taxi: 'назовите ориентир «Loft Offices 3, Dubai Internet City, Entrance B, Unit 206». Парковка бесплатная у Entrance B.',
    mapLabel: 'На карте:',
    map: 'открыть в Google Maps',
    insideHead: 'Что происходит внутри',
    atmosphereHead: 'Атмосфера',
    galleryAlt: 'Клубный дом Vision — атмосфера',
    callout:
      'Клубный дом закрыт для внешних посетителей. Попасть внутрь можно только через вступление в клуб или по приглашению резидента. Кандидаты приглашаются на ознакомительную встречу после подачи заявки.',
    ctaTitle: 'Хотите попасть в Клубный дом?',
    ctaBody:
      'Оставьте заявку — менеджер клуба свяжется, расскажет об условиях резидентства и пригласит на ближайшую встречу в Клубный дом.',
    ctaBtn: 'Оставить заявку →',
    back: '← Вернуться на главную',
  },
  en: {
    title: 'Vision Club Clubhouse — a private members’ space in Dubai',
    description:
      'The Vision Club Clubhouse is a private space in Dubai Internet City where the business club’s 220+ members meet. Address, directions, what happens inside and opening hours for members.',
    highlights: [
      {
        title: 'A private club, not a co-working space',
        body: 'The Clubhouse is neither a co-working space nor an office centre. It is a private space, open only to club members and their invited guests.',
      },
      {
        title: 'Forum groups and business deep dives',
        body: 'This is where forum groups meet: confidential sessions of ten entrepreneurs operating at a similar scale, working through the strategic, financial and personal sides of their businesses.',
      },
      {
        title: 'Dinners and member circles',
        body: 'Regular member dinners and meetings of our circles — AI & IT, Music & Arts, Marketing, the Tea Circle, Cinemalogy and more.',
      },
      {
        title: 'Meeting prospective members',
        body: 'Candidates for membership are invited to the Clubhouse to meet the co-founders and other members of the club.',
      },
    ],
    ldName: 'Vision Club Clubhouse',
    ldHours: 'Members and invited guests only, by prior appointment through the club team.',
    home: 'Home',
    crumb: 'Clubhouse',
    crumbsAria: 'Breadcrumb',
    h1: ['The ', 'Vision Club', ' Clubhouse in Dubai'],
    lead: 'The Vision Clubhouse is a private space in Dubai Internet City where the club’s 220+ members come together. It hosts forum groups, dinners, meetings with guests, business deep dives and member circles. Not a co-working space or an office centre, but a members-only space among peers.',
    coverAlt: 'The Vision Clubhouse in Dubai',
    addressHead: 'Address and contact details',
    addressLabel: 'Address',
    country: 'UAE',
    area: 'Area',
    whatsappAria: 'Message us on WhatsApp',
    hoursLabel: 'Opening hours',
    hours: 'Mon–Sat, 10:00–23:00, for members and invited guests (by appointment).',
    howHead: 'Getting here',
    metroLabel: 'By metro:',
    metro: 'Red Line to Nakheel or Internet City station, then a 10–15-minute walk to Loft Offices 3.',
    taxiLabel: 'By taxi or Careem:',
    taxi: 'ask for “Loft Offices 3, Dubai Internet City, Entrance B, Unit 206”. Free parking is available at Entrance B.',
    mapLabel: 'On the map:',
    map: 'open in Google Maps',
    insideHead: 'Inside the Clubhouse',
    atmosphereHead: 'Atmosphere',
    galleryAlt: 'The Vision Clubhouse — atmosphere',
    callout:
      'The Clubhouse is closed to the public. Entry is only through membership or at the invitation of a member. Candidates are invited to an introductory meeting once they have applied.',
    ctaTitle: 'Would you like to visit the Clubhouse?',
    ctaBody:
      'Submit an application and a member of our team will be in touch to explain how membership works and invite you to our next gathering at the Clubhouse.',
    ctaBtn: 'Apply for membership →',
    back: '← Back to the home page',
  },
};

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

export default function ClubhousePage({ lang = 'ru' }: { lang?: Lang }) {
  const t = COPY[lang];
  const en = lang === 'en';
  const PAGE_URL = `${SITE.url}${href('clubhouse', lang)}`;
  const homeUrl = en ? `${SITE.url}/en/` : SITE.url;

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
    image: `${SITE.url}${GALLERY[0].src}`,
    isAccessibleForFree: false,
    publicAccess: false,
    containedInPlace: {
      '@type': 'Place',
      name: 'Dubai Internet City',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
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
    image: `${SITE.url}${GALLERY[0].src}`,
    priceRange: '$$$$',
    parentOrganization: { '@id': `${SITE.url}/#organization` },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Dubai+Internet+City+Loft+Offices+3+Vision+Club',
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

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* compact sticky header */}
      <ArticlePageHeader lang={lang} page="clubhouse" />

      <article className="article-root">
        <div className="article-inner">
          <nav aria-label={t.crumbsAria} className="crumbs">
            <Link href={href('home', lang)}>{t.home}</Link>
            <span aria-hidden>·</span>
            <span aria-current="page">{t.crumb}</span>
          </nav>

          <h1 className="osw article-title">
            {t.h1[0]}<span style={{ color: 'var(--accent)' }}>{t.h1[1]}</span>{t.h1[2]}
          </h1>

          <p className="article-lead">{t.lead}</p>

          <div className="article-cover">
            <Image
              src={asset(GALLERY[0].src)}
              alt={t.coverAlt}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 820px) 100vw, 900px"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 18, objectFit: 'cover' }}
            />
          </div>

          <div className="article-body">
          <h2 className="osw" id="address">
            <a href="#address" aria-hidden className="anchor">#</a>
            {t.addressHead}
          </h2>

          <div className="table-wrap">
            <table>
              <tbody>
                <tr>
                  <th>{t.addressLabel}</th>
                  <td>{SITE.address.street}, {SITE.address.locality}, {SITE.address.region}, {t.country}</td>
                </tr>
                <tr>
                  <th>{t.area}</th>
                  <td>Dubai Internet City (Al Sufouh 2)</td>
                </tr>
                <tr>
                  <th>WhatsApp</th>
                  <td>
                    <a
                      href={en ? SITE.whatsappEn : SITE.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.whatsappAria} ${SITE.phone}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        color: 'var(--accent)',
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="#25D366"
                        aria-hidden
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
                      </svg>
                      {SITE.phone}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td><a href={`mailto:${SITE.email}`} style={{ color: 'var(--accent)' }}>{SITE.email}</a></td>
                </tr>
                <tr>
                  <th>{t.hoursLabel}</th>
                  <td>{t.hours}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="osw" id="how-to-get">
            <a href="#how-to-get" aria-hidden className="anchor">#</a>
            {t.howHead}
          </h2>

          <p>
            <strong>{t.metroLabel}</strong> {t.metro}
          </p>
          <p>
            <strong>{t.taxiLabel}</strong> {t.taxi}
          </p>
          <p>
            <strong>{t.mapLabel}</strong>{' '}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Dubai+Internet+City+Loft+Offices+3"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              {t.map}
            </a>
            .
          </p>

          <h2 className="osw" id="whats-inside">
            <a href="#whats-inside" aria-hidden className="anchor">#</a>
            {t.insideHead}
          </h2>

          <ul>
            {t.highlights.map((h) => (
              <li key={h.title}>
                <strong>{h.title}.</strong> {h.body}
              </li>
            ))}
          </ul>

          <h2 className="osw" id="atmosphere">
            <a href="#atmosphere" aria-hidden className="anchor">#</a>
            {t.atmosphereHead}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
              margin: '20px 0 32px',
            }}
          >
            {GALLERY.map((g) => (
              <div key={g.src} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 16, overflow: 'hidden' }}>
                <Image
                  src={asset(g.src)}
                  alt={t.galleryAlt}
                  fill
                  sizes="(max-width: 820px) 50vw, 400px"
                  loading="lazy"
                  style={{ objectFit: 'cover', objectPosition: g.pos }}
                />
              </div>
            ))}
          </div>

          <aside className="callout callout-muted">
            <p>{t.callout}</p>
          </aside>
          </div>

          <aside className="article-cta">
            <div>
              <div className="osw article-cta-title">{t.ctaTitle}</div>
              <p>{t.ctaBody}</p>
            </div>
            <Link href={anchor(lang, 'apply')} className="vc-cta osw article-cta-btn">{t.ctaBtn}</Link>
          </aside>

          <div className="article-bottom-link">
            <Link href={href('home', lang)}>{t.back}</Link>
          </div>
        </div>
      </article>

      <Footer lang={lang} page="clubhouse" />
      <StickyCTA lang={lang} />
      <ContactWidget lang={lang} />
      <MainCTAModal lang={lang} />
    </main>
  );
}
