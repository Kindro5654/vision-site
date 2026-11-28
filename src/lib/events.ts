export interface ClubEvent {
  num: string;
  tag: string;
  title: string;
  desc: string;
  src: string;
  objPos: string;
  /** For schema.org — how often the event recurs. */
  recurrence: 'monthly' | 'quarterly' | 'ad-hoc';
  /** English copy for /en/. */
  en: { tag: string; title: string; desc: string };
}

export const CLUB_EVENTS: ClubEvent[] = [
  { num: '01', tag: 'Главное', title: 'Большая встреча VISION CLUB', desc: 'Главное событие месяца, где мы подводим итоги, делимся результатами, инсайтами и кейсами резидентов.', src: '/assets/events/big-meeting.webp', objPos: 'center 40%', recurrence: 'monthly' , en: { tag: "Flagship", title: "The VISION CLUB Monthly Gathering", desc: "The main event of the month, where we take stock and share results, insights and member stories." } },
  { num: '02', tag: 'Закрытый формат', title: 'Форум-группы', desc: 'Закрытый форум, где участники делятся бизнес-задачами, получают опыт коллег и находят решения от практиков.', src: '/assets/events/forum.webp', objPos: 'center 30%', recurrence: 'monthly' , en: { tag: "Private", title: "Forum Groups", desc: "A confidential forum where members bring real business challenges, draw on their peers' experience and find solutions from people who have been there." } },
  { num: '03', tag: 'Неформально', title: 'VISION Факап Найт', desc: 'Вечер, когда резиденты делятся личными историями факапов и главными выводами из них.', src: '/assets/events/fakap.webp', objPos: 'center 35%', recurrence: 'quarterly' , en: { tag: "Informal", title: "VISION Failure Night", desc: "An evening when members share personal stories of their biggest mistakes — and what they learned from them." } },
  { num: '04', tag: 'Актив', title: 'Неформальные встречи', desc: 'Гольф, яхты, хайкинг, мафия, выезды с семьями — и многие другие!', src: '/assets/events/informal.webp', objPos: 'center 30%', recurrence: 'monthly' , en: { tag: "Outdoors", title: "Social Gatherings", desc: "Golf, yachting, hiking, mafia nights, family trips and much more." } },
  { num: '05', tag: 'Бизнес', title: 'Company Visit', desc: 'Закрытые визиты к компаниям-резидентам и на знаковые объекты Дубая — смотрим бизнес изнутри.', src: '/assets/events/company-visit.webp', objPos: 'center 35%', recurrence: 'monthly' , en: { tag: "Business", title: "Company Visits", desc: "Private visits to member companies and landmark Dubai sites — a look at how businesses work from the inside." } },
  { num: '06', tag: 'Тревел', title: 'Путешествия клуба', desc: 'Совместные поездки по миру: новые страны, приключения и нетворкинг за пределами Дубая.', src: '/assets/events/travel.webp', objPos: 'center 50%', recurrence: 'quarterly' , en: { tag: "Travel", title: "Club Trips", desc: "Travelling the world together: new countries, adventure and networking beyond Dubai." } },
  { num: '07', tag: 'Кино', title: 'Синемалогия', desc: 'Совместный просмотр и глубокий разбор фильмов — о людях, бизнесе и решениях.', src: '/assets/events/cinema.webp', objPos: 'center 40%', recurrence: 'monthly' , en: { tag: "Cinema", title: "Cinemalogy", desc: "Film screenings followed by an in-depth discussion — about people, business and the decisions we make." } },
  { num: '08', tag: 'Семья', title: 'Подклуб Дети', desc: 'Семейные встречи и активности для детей резидентов — растём и развиваемся вместе.', src: '/assets/events/kids.webp', objPos: 'center 30%', recurrence: 'monthly' , en: { tag: "Family", title: "Kids Circle", desc: "Family get-togethers and activities for members' children — growing and learning together." } },
  { num: '09', tag: 'Дискуссия', title: 'Дискуссионный подклуб', desc: 'Острые честные дискуссии о бизнесе, обществе и личных ценностях.', src: '/assets/events/discussion.webp', objPos: 'center 30%', recurrence: 'monthly' , en: { tag: "Debate", title: "Discussion Circle", desc: "Frank, candid conversations about business, society and personal values." } },
  { num: '10', tag: 'Чай', title: 'Чайный подклуб', desc: 'Камерные чайные церемонии и медленные разговоры в тёплом кругу единомышленников.', src: '/assets/events/tea.webp', objPos: 'center 45%', recurrence: 'monthly' , en: { tag: "Tea", title: "Tea Circle", desc: "Intimate tea ceremonies and unhurried conversation in the company of like-minded people." } },
  { num: '11', tag: 'AI & IT', title: 'Подклуб AI & IT', desc: 'Практика искусственного интеллекта и технологий: инструменты, кейсы и тренды.', src: '/assets/events/ai-it.webp', objPos: 'center 30%', recurrence: 'monthly' , en: { tag: "AI & IT", title: "AI & IT Circle", desc: "Artificial intelligence and technology in practice: tools, case studies and trends." } },
  { num: '12', tag: 'Культура', title: 'Подклуб Music & Arts', desc: 'Искусство, музыка и культура — вечера для тех, кто ценит прекрасное.', src: '/assets/events/music-arts.webp', objPos: 'center 35%', recurrence: 'monthly' , en: { tag: "Culture", title: "Music & Arts Circle", desc: "Art, music and culture — evenings for those who appreciate the finer things." } },
  { num: '13', tag: 'Маркетинг', title: 'Подклуб Маркетинг', desc: 'Разбор маркетинговых стратегий и обмен рабочими инструментами роста.', src: '/assets/events/marketing.webp', objPos: 'center 35%', recurrence: 'monthly' , en: { tag: "Marketing", title: "Marketing Circle", desc: "Marketing strategies taken apart, and an exchange of growth tools that actually work." } },
];

/** Rough monthly cadence: return next 1st-of-month at 19:00 Dubai time. */
export function nextRecurrence(offsetMonths = 1): string {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() + offsetMonths, 1);
  d.setUTCHours(15, 0, 0, 0); // 19:00 Dubai = 15:00 UTC
  return d.toISOString();
}

/** Event ends ~3h after start (typical club evening). */
export function nextRecurrenceEnd(offsetMonths = 1): string {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() + offsetMonths, 1);
  d.setUTCHours(18, 0, 0, 0); // 22:00 Dubai = 18:00 UTC
  return d.toISOString();
}
