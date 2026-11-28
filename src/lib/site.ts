export const SITE = {
  name: 'Vision Club',
  title: 'Vision Club — международный бизнес-клуб в Дубае',
  description:
    'Vision Club — закрытый бизнес-клуб для предпринимателей и топ-менеджеров в Дубае. Основан в 2021 году: 220+ предпринимателей из 70+ отраслей, 1 200+ резидентов Альянса клубов в 10 странах. Вход от $1 млн оборота, только по приглашению.',
  // English versions of title/description for /en/ pages.
  titleEn: 'Vision Club — an international business club in Dubai',
  descriptionEn:
    'Vision Club is a private business club in Dubai for entrepreneurs and senior executives. Founded in 2021, it brings together 220+ entrepreneurs from 70+ industries and is part of Alliance Clubs, a network of 1,200+ members in 10 countries. Membership is by invitation, for businesses with $1M+ in annual revenue.',
  url: 'https://vision-club.ae',
  phone: '+971 58 550 6498',
  phoneE164: '+971585506498',
  whatsapp:
    'https://wa.me/971585506498?text=' +
    encodeURIComponent('Здравствуйте! С сайта Vision Club — расскажите про резидентство'),
  whatsappEn:
    'https://wa.me/971585506498?text=' +
    encodeURIComponent('Hello! I found you on the Vision Club website and would like to know more about membership.'),
  contactTelegram:
    'https://t.me/manager_vision_club?text=' +
    encodeURIComponent('Пишу вам с сайта Vision Club, подскажите по резидентству:'),
  contactTelegramEn:
    'https://t.me/manager_vision_club?text=' +
    encodeURIComponent('Hello! I am writing from the Vision Club website about membership:'),
  email: 'info@vision-club.ae',
  legal: {
    name: 'Vision Club FZCO',
    address: 'IFZA Properties, DSO-IFZA, Dubai Silicon Oasis, Dubai, UAE',
    phone: '+971 58 513 2203',
    phoneE164: '+971585132203',
    email: 'info@vision-club.ae',
  },
  ogImage: '/assets/hero-speakers.webp',
  themeColor: '#0B0B0D',
  accent: '#E96B1E',
  locale: 'ru_RU',
  address: {
    street: 'Loft Offices 3, Entrance B, 2nd floor, Unit 206',
    streetRu: 'Loft Offices 3, Entrance B, 2 этаж, офис 206',
    mapUrl: 'https://maps.app.goo.gl/Veyi57yx5gSWd1Kr7',
    parkingMapUrl: 'https://maps.app.goo.gl/dYN7dEpHLLcNnpp79',
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
    { name: 'Алексей Наказный', nameEn: 'Aleksey Nakazny', role: 'Co-founder' },
    { name: 'Дарья Наказная', nameEn: 'Daria Nakaznaya', role: 'Co-founder' },
  ],
} as const;

export const META_PIXEL_ID = '561860935084473';
export const GA4_ID = 'G-V5MTK3RRQY';
export const YM_ID = 114753180;

export const asset = (p: string) => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (p.startsWith('http') || p.startsWith('data:')) return p;
  return base + (p.startsWith('/') ? p : '/' + p);
};
