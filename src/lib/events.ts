export interface ClubEvent {
  num: string;
  tag: string;
  title: string;
  desc: string;
  src: string;
  objPos: string;
  /** For schema.org — how often the event recurs. */
  recurrence: 'monthly' | 'quarterly' | 'ad-hoc';
}

export const CLUB_EVENTS: ClubEvent[] = [
  { num: '01', tag: 'Главное', title: 'Большая встреча VISION CLUB', desc: 'Главное событие месяца, где мы подводим итоги, делимся результатами, инсайтами и кейсами резидентов.', src: '/assets/events/big-meeting.jpg', objPos: 'center 40%', recurrence: 'monthly' },
  { num: '02', tag: 'Закрытый формат', title: 'Форум-группы', desc: 'Закрытый форум, где участники делятся бизнес-задачами, получают опыт коллег и находят решения от практиков.', src: '/assets/events/forum.webp', objPos: 'center 30%', recurrence: 'monthly' },
  { num: '03', tag: 'Неформально', title: 'VISION Факап Найт', desc: 'Вечер, когда резиденты делятся личными историями факапов и главными выводами из них.', src: '/assets/events/fakap.webp', objPos: 'center 35%', recurrence: 'quarterly' },
  { num: '04', tag: 'Актив', title: 'Неформальные встречи', desc: 'Гольф, яхты, хайкинг, мафия, выезды с семьями — и многие другие!', src: '/assets/events/informal.jpeg', objPos: 'center 30%', recurrence: 'monthly' },
  { num: '05', tag: 'Бизнес', title: 'Company Visit', desc: 'Закрытые визиты к компаниям-резидентам и на знаковые объекты Дубая — смотрим бизнес изнутри.', src: '/assets/events/company-visit.webp', objPos: 'center 35%', recurrence: 'monthly' },
  { num: '06', tag: 'Тревел', title: 'Путешествия клуба', desc: 'Совместные поездки по миру: новые страны, приключения и нетворкинг за пределами Дубая.', src: '/assets/events/travel.jpeg', objPos: 'center 50%', recurrence: 'quarterly' },
  { num: '07', tag: 'Кино', title: 'Синемалогия', desc: 'Совместный просмотр и глубокий разбор фильмов — о людях, бизнесе и решениях.', src: '/assets/events/cinema.jpg', objPos: 'center 40%', recurrence: 'monthly' },
  { num: '08', tag: 'Семья', title: 'Подклуб Дети', desc: 'Семейные встречи и активности для детей резидентов — растём и развиваемся вместе.', src: '/assets/events/kids.webp', objPos: 'center 30%', recurrence: 'monthly' },
  { num: '09', tag: 'Дискуссия', title: 'Дискуссионный подклуб', desc: 'Острые честные дискуссии о бизнесе, обществе и личных ценностях.', src: '/assets/events/discussion.webp', objPos: 'center 30%', recurrence: 'monthly' },
  { num: '10', tag: 'Чай', title: 'Чайный подклуб', desc: 'Камерные чайные церемонии и медленные разговоры в тёплом кругу единомышленников.', src: '/assets/events/tea.webp', objPos: 'center 45%', recurrence: 'monthly' },
  { num: '11', tag: 'AI & IT', title: 'Подклуб AI & IT', desc: 'Практика искусственного интеллекта и технологий: инструменты, кейсы и тренды.', src: '/assets/events/ai-it.webp', objPos: 'center 30%', recurrence: 'monthly' },
  { num: '12', tag: 'Культура', title: 'Подклуб Music & Arts', desc: 'Искусство, музыка и культура — вечера для тех, кто ценит прекрасное.', src: '/assets/events/music-arts.webp', objPos: 'center 35%', recurrence: 'monthly' },
  { num: '13', tag: 'Маркетинг', title: 'Подклуб Маркетинг', desc: 'Разбор маркетинговых стратегий и обмен рабочими инструментами роста.', src: '/assets/events/marketing.webp', objPos: 'center 35%', recurrence: 'monthly' },
];

/** Rough monthly cadence: return next 1st-of-month at 19:00 Dubai time. */
export function nextRecurrence(offsetMonths = 1): string {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() + offsetMonths, 1);
  d.setUTCHours(15, 0, 0, 0); // 19:00 Dubai = 15:00 UTC
  return d.toISOString();
}
