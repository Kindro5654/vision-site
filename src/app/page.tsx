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

export default function Page() {
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

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', width: '100%' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
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
