import RootDocument, { rootMetadata, rootViewport } from '@/components/RootDocument';

// Корневой layout английской версии (/en/...): <html lang="en">.
export const metadata = rootMetadata('en');
export const viewport = rootViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
