import Hero from '@/components/Hero';
import Founders from '@/components/Founders';
import Numbers from '@/components/Numbers';
import Events from '@/components/Events';
import Cases from '@/components/Cases';
import Audience from '@/components/Audience';
import Residents from '@/components/Residents';
import Unique from '@/components/Unique';
import Clubhouse from '@/components/Clubhouse';
import Alliance from '@/components/Alliance';
import Speakers from '@/components/Speakers';
import AppSection from '@/components/AppSection';
import Gallery from '@/components/Gallery';
import Join from '@/components/Join';
import FAQ from '@/components/FAQ';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import ContactWidget from '@/components/ContactWidget';
import MainCTAModal from '@/components/MainCTAModal';
import { HOMEPAGE_FAQ, HOMEPAGE_FAQ_EN } from '@/lib/faq';
import { SITE } from '@/lib/site';
import { CLUB_EVENTS, nextRecurrence, nextRecurrenceEnd } from '@/lib/events';
import { SCHEMA_LANG, type Lang } from '@/lib/i18n';

const CLUBHOUSE_VIDEO_ID = 'WDTME_9tmpQ';

const LD = {
  ru: {
    home: 'Главная',
    clubhouse: 'Клубный дом Vision',
    events: 'Мероприятия Vision Club',
    videoName: 'Клубный дом Vision — онлайн-экскурсия',
    videoDesc:
      'Онлайн-экскурсия по Клубному дому Vision в Дубае: приватное пространство для встреч предпринимателей, форум-групп и глубоких разговоров единомышленников.',
    title: SITE.title,
  },
  en: {
    home: 'Home',
    clubhouse: 'Vision Clubhouse',
    events: 'Vision Club events',
    videoName: 'Vision Clubhouse — virtual tour',
    videoDesc:
      'A virtual tour of the Vision Clubhouse in Dubai: a private space where entrepreneurs meet, forum groups convene and like-minded people have meaningful conversations.',
    title: SITE.titleEn,
  },
} as const;

/** Главная страница. Русская (/) и английская (/en/) рендерятся этим же компонентом. */
export default function HomePage({ lang = 'ru' }: { lang?: Lang }) {
  const t = LD[lang];
  const pageUrl = lang === 'en' ? `${SITE.url}/en/` : SITE.url;
  const faq = lang === 'en' ? HOMEPAGE_FAQ_EN : HOMEPAGE_FAQ;

  const address = {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(lang === 'en' ? { inLanguage: SCHEMA_LANG.en } : {}),
    mainEntity: faq.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: pageUrl },
    ],
  };

  const clubhousePlace = {
    '@type': 'Place',
    name: t.clubhouse,
    address,
  };

  // ItemList of Event entries. Placeholder next-month startDate signals recurring
  // format; specific dated events are managed inside the app / CRM.
  const validFrom = new Date().toISOString();
  const eventsLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.events,
    numberOfItems: CLUB_EVENTS.length,
    itemListElement: CLUB_EVENTS.map((ev, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: lang === 'en' ? ev.en.title : ev.title,
        description: lang === 'en' ? ev.en.desc : ev.desc,
        ...(lang === 'en' ? { inLanguage: SCHEMA_LANG.en } : {}),
        startDate: nextRecurrence(1),
        endDate: nextRecurrenceEnd(1),
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: clubhousePlace,
        image: `${SITE.url}${ev.src}`,
        organizer: { '@id': `${SITE.url}/#organization` },
        performer: { '@id': `${SITE.url}/#organization` },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          category: 'MembershipOnly',
          price: '0',
          priceCurrency: 'AED',
          validFrom,
          url: lang === 'en' ? `${SITE.url}/en/#apply` : `${SITE.url}/#apply`,
        },
      },
    })),
  };

  const videoLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: t.videoName,
    description: t.videoDesc,
    thumbnailUrl: [
      `https://img.youtube.com/vi/${CLUBHOUSE_VIDEO_ID}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${CLUBHOUSE_VIDEO_ID}/hqdefault.jpg`,
    ],
    uploadDate: '2026-05-01T00:00:00+00:00',
    duration: 'PT1M',
    contentUrl: `https://www.youtube.com/watch?v=${CLUBHOUSE_VIDEO_ID}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${CLUBHOUSE_VIDEO_ID}`,
    publisher: { '@id': `${SITE.url}/#organization` },
    // Видео само по себе русское — на английской странице меняются только название и описание.
    inLanguage: 'ru-RU',
  };

  // Speakable for voice assistants (Google Assistant, Alexa). Marks concise
  // answer-shaped content that reads well as speech.
  const speakableLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': lang === 'en' ? `${SITE.url}/en/#webpage` : `${SITE.url}/#webpage`,
    url: pageUrl,
    name: t.title,
    inLanguage: SCHEMA_LANG[lang],
    isPartOf: { '@id': `${SITE.url}/#website` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        '.vc-hero-body h1',
        '.vc-hero-body p',
        '.eyebrow-text',
        '.faq-item p',
      ],
    },
  };

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      <Hero lang={lang} />
      <Founders lang={lang} />
      <Numbers lang={lang} />
      <Events lang={lang} />
      <Cases lang={lang} />
      <Audience lang={lang} />
      <Residents lang={lang} />
      <Unique lang={lang} />
      <Clubhouse lang={lang} />
      <Alliance lang={lang} />
      <Speakers lang={lang} />
      <AppSection lang={lang} />
      <Gallery lang={lang} />
      <a id="apply" aria-hidden />
      <Join lang={lang} />
      <FAQ lang={lang} />
      {/* Блог только на русском — на английской главной блок не показываем. */}
      {lang === 'ru' && <Blog />}
      <Footer lang={lang} />
      <StickyCTA lang={lang} />
      <ContactWidget lang={lang} />
      <MainCTAModal lang={lang} />
    </main>
  );
}
