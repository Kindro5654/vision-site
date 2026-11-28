import RootDocument, { rootMetadata, rootViewport } from '@/components/RootDocument';

// Корневой layout русской версии: <html lang="ru">. Английская — в app/(en)/layout.tsx.
export const metadata = rootMetadata('ru');
export const viewport = rootViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="ru">{children}</RootDocument>;
}
