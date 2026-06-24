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

export default function Page() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', width: '100%' }}>
      <Hero />
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
      <Join />
      <FAQ />
      <Blog />
      <Footer />
      <StickyCTA />
    </main>
  );
}
