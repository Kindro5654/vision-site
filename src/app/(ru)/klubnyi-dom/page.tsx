import ClubhousePage, { clubhouseMetadata } from '@/components/ClubhousePage';

export const metadata = clubhouseMetadata('ru');

export default function Page() {
  return <ClubhousePage lang="ru" />;
}
