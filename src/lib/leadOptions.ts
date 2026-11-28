import type { Lang } from '@/lib/i18n';

// Варианты «Позиция» / «Оборот» в формах заявки.
// value всегда русский: CRM раскладывает позицию и оборот по полям лида,
// ища в строке русские слова («инвестор», «1 до 5» …). Английская форма
// показывает английскую подпись, но отправляет то же value, что и русская.
export type LeadOption = { value: string; label: string };

const opt = (value: string, en: string, lang: Lang): LeadOption => ({
  value,
  label: lang === 'en' ? en : value,
});

/** Hero и модалка «Получить приглашение». */
export const positionOptions = (lang: Lang): LeadOption[] => [
  opt('Предприниматель / собственник бизнеса', 'Founder / business owner', lang),
  opt('Топ-менеджер / C-level', 'Senior executive / C-suite', lang),
  opt('Инвестор', 'Investor', lang),
  opt('Эксперт / консультант', 'Expert / adviser', lang),
];

export const revenueOptions = (lang: Lang): LeadOption[] => [
  opt('Оборот: от 0 до 1 млн $', 'Revenue: under $1M', lang),
  opt('Оборот: от 1 до 5 млн $', 'Revenue: $1M–5M', lang),
  opt('Оборот: от 5 до 20 млн $', 'Revenue: $5M–20M', lang),
  opt('Оборот: более 20 млн $', 'Revenue: over $20M', lang),
];

/** Форма «Вступайте в бизнес-клуб» внизу страницы (исторически свои формулировки). */
export const joinPositionOptions = (lang: Lang): LeadOption[] => [
  opt('Предприниматель / собственник', 'Founder / business owner', lang),
  opt('Топ-менеджер / C-level', 'Senior executive / C-suite', lang),
  opt('Инвестор', 'Investor', lang),
  opt('Эксперт / консультант', 'Expert / adviser', lang),
];

export const joinRevenueOptions = (lang: Lang): LeadOption[] => [
  opt('Оборот: до $1 M', 'Revenue: under $1M', lang),
  opt('Оборот: от $1 до $5 M', 'Revenue: $1M–5M', lang),
  opt('Оборот: от $5 до $20 M', 'Revenue: $5M–20M', lang),
  opt('Оборот: более $20 M', 'Revenue: over $20M', lang),
];

/** Подписи общих элементов форм. */
export const FORM_COPY = {
  ru: {
    name: 'Имя и фамилия',
    positionPlaceholder: 'Ваша позиция',
    revenuePlaceholder: 'Оборот бизнеса',
    positionAria: 'Позиция',
    revenueAria: 'Оборот',
    consent: 'Даю согласие на обработку персональных данных',
    sending: 'Отправляем…',
    success: 'Спасибо! Менеджер клуба свяжется с вами в ближайшее время.',
  },
  en: {
    name: 'Full name',
    positionPlaceholder: 'Your role',
    revenuePlaceholder: 'Annual revenue',
    positionAria: 'Your role',
    revenueAria: 'Annual revenue',
    consent: 'I agree to the processing of my personal data',
    sending: 'Sending…',
    success: 'Thank you. A member of our team will be in touch shortly.',
  },
} satisfies Record<Lang, Record<string, string>>;
