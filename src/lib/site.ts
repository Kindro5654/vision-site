export const SITE = {
  name: 'Vision Club',
  title: 'Vision Club — международный бизнес-клуб в Дубае',
  description:
    'Vision Club — закрытый бизнес-клуб для предпринимателей и топ-менеджеров. 220+ резидентов в Дубае, 1200 партнёров через Альянс клубов в 10 странах. Только по приглашению.',
  url: 'https://visionclub.ae',
  phone: '+971 58 550 6498',
  email: 'hello@visionclub.ae',
  ogImage: '/assets/hero-speakers.webp',
  themeColor: '#0B0B0D',
  accent: '#E96B1E',
  locale: 'ru_RU',
} as const;

export const asset = (p: string) => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (p.startsWith('http') || p.startsWith('data:')) return p;
  return base + (p.startsWith('/') ? p : '/' + p);
};
