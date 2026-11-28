import AboutPage, { aboutMetadata } from '@/components/AboutPage';

// Разметка и тексты — в components/AboutPage.tsx (общая с /en/about/).
export const metadata = aboutMetadata('ru');

export default function Page() {
  return <AboutPage lang="ru" />;
}
