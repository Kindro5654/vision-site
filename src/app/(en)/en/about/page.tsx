import AboutPage, { aboutMetadata } from '@/components/AboutPage';

export const metadata = aboutMetadata('en');

export default function Page() {
  return <AboutPage lang="en" />;
}
