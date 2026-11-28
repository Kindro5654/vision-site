import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { alternatesFor } from '@/lib/i18n';

export const metadata: Metadata = {
  alternates: alternatesFor('home', 'ru'),
};

export default function Page() {
  return <HomePage lang="ru" />;
}
