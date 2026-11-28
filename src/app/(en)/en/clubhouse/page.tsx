import ClubhousePage, { clubhouseMetadata } from '@/components/ClubhousePage';

export const metadata = clubhouseMetadata('en');

export default function Page() {
  return <ClubhousePage lang="en" />;
}
