import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { alternatesFor } from '@/lib/i18n';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: SITE.titleEn },
  description: SITE.descriptionEn,
  alternates: alternatesFor('home', 'en'),
};

export default function Page() {
  return <HomePage lang="en" />;
}
