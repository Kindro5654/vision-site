export const SITE = {
  name: 'Vision Club',
  title: 'Vision Club — международный бизнес-клуб в Дубае',
  description:
    'Vision Club — закрытый бизнес-клуб для предпринимателей и топ-менеджеров. 220+ резидентов в Дубае, 1200 партнёров через Альянс клубов в 10 странах. Только по приглашению.',
  url: 'https://vision-club.ae',
  phone: '+971 58 550 6498',
  phoneE164: '+971585506498',
  whatsapp: 'https://wa.me/971585506498',
  email: 'vision.club.sales@gmail.com',
  ogImage: '/assets/hero-speakers.webp',
  themeColor: '#0B0B0D',
  accent: '#E96B1E',
  locale: 'ru_RU',
  address: {
    street: 'Loft Offices 3, Entrance B, Unit 206',
    locality: 'Dubai Internet City, Al Sufouh 2',
    region: 'Dubai',
    country: 'AE',
  },
  socials: {
    instagram: 'https://www.instagram.com/vision.club.dubai/',
    linkedin: 'https://www.linkedin.com/company/vision-club-dubai',
    telegram: 'https://t.me/manager_vision_club',
  },
  founders: [
    { name: 'Алексей Наказный', role: 'Co-founder' },
    { name: 'Дарья Наказная', role: 'Co-founder' },
  ],
} as const;

export const asset = (p: string) => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (p.startsWith('http') || p.startsWith('data:')) return p;
  return base + (p.startsWith('/') ? p : '/' + p);
};
