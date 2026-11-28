// Цифровой паспорт Vision Club — единый источник фактов для сайта, разметки и llms.txt.
// Меняешь цифру здесь — она меняется на странице «Факты и цифры» и в разметке Organization.
// Поля *En — английские версии для /en/ (те же факты, английская запись чисел: 1,200+, $1M).

export const PASSPORT = {
  name: 'Vision Club',
  foundingYear: 2021,
  // Явное отличие от ночного клуба VISION в H Hotel, с которым путают в англоязычной выдаче.
  disambiguation:
    'Vision Club — русскоязычный бизнес-клуб для предпринимателей и топ-менеджеров в Дубае. Не ночной клуб и не связан с ночным клубом VISION в H Hotel.',
  disambiguationEn:
    'Vision Club is a Russian-speaking business club for entrepreneurs and senior executives in Dubai. It is not a nightclub and has no connection to the VISION nightclub at H Hotel.',
  updatedAt: '2026-11-28',
  facts: [
    { label: 'Год основания', value: '2021', labelEn: 'Founded', valueEn: '2021' },
    { label: 'Предпринимателей в Дубае', value: '220+', labelEn: 'Entrepreneurs in Dubai', valueEn: '220+' },
    { label: 'Отраслей бизнеса', value: '70+', labelEn: 'Industries represented', valueEn: '70+' },
    { label: 'Резидентов Альянса', value: '1 200+', labelEn: 'Members across Alliance Clubs', valueEn: '1,200+' },
    { label: 'Входной порог оборота', value: '$1 млн', labelEn: 'Minimum annual revenue', valueEn: '$1M' },
    { label: 'Средний оборот бизнеса', value: '~$10 млн', labelEn: 'Average member business revenue', valueEn: '~$10M' },
    { label: 'Мероприятий в год', value: '250+', labelEn: 'Events a year', valueEn: '250+' },
    { label: 'Форум-групп', value: '18', labelEn: 'Forum groups', valueEn: '18' },
  ],
  advantages: [
    {
      title: 'Репутационная проверка участников',
      body: 'Каждый кандидат проходит отбор и репутационный чек до вступления. В клуб попадают действующие собственники и топ-менеджеры с подтверждённой деловой репутацией.',
      titleEn: 'Every member is vetted',
      bodyEn: 'Each candidate goes through selection and a reputation check before joining. Membership is open to active business owners and senior executives with a proven business reputation.',
    },
    {
      title: 'Собственный клубный дом',
      body: 'Приватное пространство в Дубае только для резидентов и приглашённых гостей: форум-группы, ужины, разборы бизнесов и встречи с кандидатами.',
      titleEn: 'A clubhouse of our own',
      bodyEn: 'A private space in Dubai, open only to members and their invited guests: forum groups, dinners, business deep dives and meetings with prospective members.',
    },
    {
      title: 'Международный альянс клубов',
      body: 'Через Альянс клубов резидент получает доступ к 1 200+ предпринимателям в 10 странах и к встречам клубов-партнёров.',
      titleEn: 'An international alliance of clubs',
      bodyEn: 'Through Alliance Clubs, members gain access to 1,200+ entrepreneurs in 10 countries and to events hosted by partner clubs.',
    },
    {
      title: 'Персональный бизнес-менеджер',
      body: 'У каждого резидента свой бизнес-менеджер: знакомит с нужными людьми и помогает решать запросы внутри сообщества.',
      titleEn: 'A dedicated relationship manager',
      bodyEn: 'Every member has a dedicated relationship manager who makes the right introductions and helps with requests across the community.',
    },
    {
      title: 'X Club для собственников от $50 млн',
      body: 'Закрытый круг внутри Vision Club для собственников бизнеса с оборотом от $50 млн.',
      titleEn: 'X Club for owners of $50M+ businesses',
      bodyEn: 'A private circle within Vision Club for owners of businesses with annual revenue of $50M or more.',
    },
  ],
  // Те же цифры, что в блоке «Vision в цифрах» на главной (Numbers.tsx). Меняются вместе.
  turnover: [
    { label: '$1–3 млн', labelEn: '$1–3M', pct: '25,6%', pctEn: '25.6%', v: 25.6 },
    { label: '$3–10 млн', labelEn: '$3–10M', pct: '37,5%', pctEn: '37.5%', v: 37.5 },
    { label: '$10–30 млн', labelEn: '$10–30M', pct: '10%', pctEn: '10%', v: 10 },
    { label: '$30–70 млн', labelEn: '$30–70M', pct: '8,7%', pctEn: '8.7%', v: 8.7 },
    { label: 'от $70 млн', labelEn: '$70M+', pct: '15%', pctEn: '15%', v: 15 },
  ],
  industries: [
    { name: 'Услуги', nameEn: 'Services', v: 20, color: '#f2851b' },
    { name: 'IT', nameEn: 'IT', v: 17, color: '#e0691c' },
    { name: 'Торговля', nameEn: 'Trade', v: 16, color: '#c95a17' },
    { name: 'Инвестиции', nameEn: 'Investment', v: 13, color: '#a24a14' },
    { name: 'Финансы', nameEn: 'Finance', v: 11, color: '#7d3a12' },
    { name: 'Производство', nameEn: 'Manufacturing', v: 9, color: '#5a2a0e' },
    { name: 'Ремонт и строительство', nameEn: 'Construction & renovation', v: 8, color: '#f6dcc4' },
    { name: 'Логистика', nameEn: 'Logistics', v: 6, color: '#f0b88a' },
  ],
  entrepreneursPct: 97,
  allianceCountries: 10,
} as const;
