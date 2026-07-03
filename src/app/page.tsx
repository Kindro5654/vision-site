import Hero from '@/components/Hero';
import GuestMonth from '@/components/GuestMonth';
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
import MainCTAModal from '@/components/MainCTAModal';
import { HOMEPAGE_FAQ } from '@/lib/faq';
import { SITE } from '@/lib/site';
import { CLUB_EVENTS, nextRecurrence, nextRecurrenceEnd } from '@/lib/events';

const CLUBHOUSE_VIDEO_ID = 'WDTME_9tmpQ';

export default function Page() {
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
    mainEntity: HOMEPAGE_FAQ.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE.url },
    ],
  };

  const clubhousePlace = {
    '@type': 'Place',
    name: 'Клубный дом Vision',
    address,
  };

  // ItemList of Event entries. Placeholder next-month startDate signals recurring
  // format; specific dated events are managed inside the app / CRM.
  const validFrom = new Date().toISOString();
  const eventsLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Мероприятия Vision Club',
    numberOfItems: CLUB_EVENTS.length,
    itemListElement: CLUB_EVENTS.map((ev, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: ev.title,
        description: ev.desc,
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
          url: `${SITE.url}/#apply`,
        },
      },
    })),
  };

  const videoLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Клубный дом Vision — онлайн-экскурсия',
    description:
      'Онлайн-экскурсия по Клубному дому Vision в Дубае: приватное пространство для встреч предпринимателей, форум-групп и глубоких разговоров единомышленников.',
    thumbnailUrl: [
      `https://img.youtube.com/vi/${CLUBHOUSE_VIDEO_ID}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${CLUBHOUSE_VIDEO_ID}/hqdefault.jpg`,
    ],
    uploadDate: '2026-05-01T00:00:00+00:00',
    duration: 'PT1M',
    contentUrl: `https://www.youtube.com/watch?v=${CLUBHOUSE_VIDEO_ID}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${CLUBHOUSE_VIDEO_ID}`,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'ru-RU',
  };

  // Speakable for voice assistants (Google Assistant, Alexa). Marks concise
  // answer-shaped content that reads well as speech.
  const speakableLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE.url}/#webpage`,
    url: SITE.url,
    name: SITE.title,
    inLanguage: 'ru-RU',
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
      <Hero />
      <GuestMonth />
      <Founders />
      <Numbers />
      <Events />
      <Cases />
      <Audience />
      <Residents />
      <Unique />
      <Clubhouse />
      <Alliance />
      <Speakers />
      <AppSection />
      <Gallery />
      <a id="apply" aria-hidden />
      <Join />
      <FAQ />
      <Blog />
      <Footer />
      <StickyCTA />
      <MainCTAModal />
    </main>
  );
}
