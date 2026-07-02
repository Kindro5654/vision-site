import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, asset } from '@/lib/site';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import MainCTAModal from '@/components/MainCTAModal';

const PAGE_URL = `${SITE.url}/klubnyi-dom/`;
const PAGE_TITLE = 'Клубный дом Vision Club — приватное пространство в Дубае';
const PAGE_DESCRIPTION =
  'Клубный дом Vision — приватное пространство в Dubai Internet City для встреч 220+ резидентов бизнес-клуба. Адрес, как добраться, что внутри, часы работы для резидентов.';

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

const GALLERY = [
  { src: '/assets/gallery/g14.webp', pos: 'center 40%' },
  { src: '/assets/gallery/nr0.webp', pos: 'center 42%' },
  { src: '/assets/gallery/g10.webp', pos: 'center 45%' },
  { src: '/assets/gallery/g01.webp', pos: 'center 40%' },
];

const HIGHLIGHTS = [
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
];

export default function ClubhousePage() {
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
    '@id': `${SITE.url}/klubnyi-dom/#place`,
    name: 'Клубный дом Vision Club',
    description: PAGE_DESCRIPTION,
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
    '@id': `${SITE.url}/klubnyi-dom/#business`,
    name: 'Клубный дом Vision Club',
    alternateName: 'Vision Club House Dubai',
    description: PAGE_DESCRIPTION,
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
      description: 'Только для резидентов и приглашённых гостей — по предварительной записи через менеджера клуба.',
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Клубный дом', item: PAGE_URL },
    ],
  };

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* compact sticky header */}
      <header className="article-page-head">
        <div className="article-page-head-inner">
          <Link href="/" className="article-page-brand">
            <Image
              src={asset('/assets/logo-vision.png')}
              alt="Vision Club"
              width={110}
              height={24}
              priority
              style={{ height: 24, width: 'auto' }}
            />
          </Link>
          <Link href="/#apply" className="vc-cta osw article-page-cta">Оставить заявку</Link>
        </div>
      </header>

      <article className="article-root">
        <div className="article-inner">
          <nav aria-label="Хлебные крошки" className="crumbs">
            <Link href="/">Главная</Link>
            <span aria-hidden>·</span>
            <span aria-current="page">Клубный дом</span>
          </nav>

          <h1 className="osw article-title">
            Клубный дом <span style={{ color: 'var(--accent)' }}>Vision Club</span> в Дубае
          </h1>

          <p className="article-lead">
            Клубный дом Vision — приватное пространство в Dubai Internet City, где собираются
            220+ резидентов клуба. Здесь проходят форум-группы, ужины, встречи с гостями,
            разборы бизнесов и подклубы. Не коворкинг и не бизнес-центр — закрытая
            территория для своих.
          </p>

          <div className="article-cover">
            <Image
              src={asset(GALLERY[0].src)}
              alt="Клубный дом Vision в Дубае"
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
            Адрес и контакты
          </h2>

          <div className="table-wrap">
            <table>
              <tbody>
                <tr>
                  <th>Адрес</th>
                  <td>{SITE.address.street}, {SITE.address.locality}, {SITE.address.region}, ОАЭ</td>
                </tr>
                <tr>
                  <th>Район</th>
                  <td>Dubai Internet City (Al Sufouh 2)</td>
                </tr>
                <tr>
                  <th>Телефон</th>
                  <td><a href={`tel:${SITE.phoneE164}`} style={{ color: 'var(--accent)' }}>{SITE.phone}</a></td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td><a href={`mailto:${SITE.email}`} style={{ color: 'var(--accent)' }}>{SITE.email}</a></td>
                </tr>
                <tr>
                  <th>Режим работы</th>
                  <td>Пн–Сб 10:00–23:00 для резидентов и приглашённых гостей (по предварительной записи).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="osw" id="how-to-get">
            <a href="#how-to-get" aria-hidden className="anchor">#</a>
            Как добраться
          </h2>

          <p>
            <strong>На метро:</strong> Red Line, станция «Nakheel» или «Internet City» — 10–15
            минут пешком до Loft Offices 3.
          </p>
          <p>
            <strong>На такси / Careem:</strong> назовите ориентир «Loft Offices 3, Dubai Internet
            City, Entrance B, Unit 206». Парковка бесплатная у Entrance B.
          </p>
          <p>
            <strong>На карте:</strong>{' '}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Dubai+Internet+City+Loft+Offices+3"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              открыть в Google Maps
            </a>
            .
          </p>

          <h2 className="osw" id="whats-inside">
            <a href="#whats-inside" aria-hidden className="anchor">#</a>
            Что происходит внутри
          </h2>

          <ul>
            {HIGHLIGHTS.map((h) => (
              <li key={h.title}>
                <strong>{h.title}.</strong> {h.body}
              </li>
            ))}
          </ul>

          <h2 className="osw" id="atmosphere">
            <a href="#atmosphere" aria-hidden className="anchor">#</a>
            Атмосфера
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
                  alt="Клубный дом Vision — атмосфера"
                  fill
                  sizes="(max-width: 820px) 50vw, 400px"
                  loading="lazy"
                  style={{ objectFit: 'cover', objectPosition: g.pos }}
                />
              </div>
            ))}
          </div>

          <aside className="callout callout-muted">
            <p>
              Клубный дом закрыт для внешних посетителей. Попасть внутрь можно только через
              вступление в клуб или по приглашению резидента. Кандидаты приглашаются на
              ознакомительную встречу после подачи заявки.
            </p>
          </aside>
          </div>

          <aside className="article-cta">
            <div>
              <div className="osw article-cta-title">Хотите попасть в Клубный дом?</div>
              <p>
                Оставьте заявку — менеджер клуба свяжется, расскажет об условиях резидентства и
                пригласит на ближайшую встречу в Клубный дом.
              </p>
            </div>
            <Link href="/#apply" className="vc-cta osw article-cta-btn">Оставить заявку →</Link>
          </aside>

          <div className="article-bottom-link">
            <Link href="/">← Вернуться на главную</Link>
          </div>
        </div>
      </article>

      <Footer />
      <StickyCTA />
      <MainCTAModal />
    </main>
  );
}
