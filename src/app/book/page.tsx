import type { Metadata } from 'next';
import BookRedirect from './BookRedirect';

// QR-код из книги ведёт сюда. Адрес /book напечатан — не переименовывать.
export const metadata: Metadata = {
  title: 'Vision Club — открываем Telegram',
  robots: { index: false, follow: false },
};

export default function BookPage() {
  return <BookRedirect />;
}
