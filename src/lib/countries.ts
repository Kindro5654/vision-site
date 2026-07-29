// Country list + offline geo-detection for the phone field.
// No external API: we infer the visitor's country from browser timezone,
// then locale, then fall back to UAE. The user can always override.

export interface Country {
  iso: string; // ISO 3166-1 alpha-2
  dial: string; // country calling code, no '+'
  name: string; // Russian name
  mask?: string; // '#' = digit slot; other chars are literal separators
}

// Audience-focused list (Russian-speaking markets + global business hubs).
// Order roughly by relevance; the dropdown has search anyway.
export const COUNTRIES: Country[] = [
  { iso: 'AE', dial: '971', name: 'ОАЭ', mask: '## ### ####' },
  { iso: 'RU', dial: '7', name: 'Россия', mask: '### ### ## ##' },
  { iso: 'KZ', dial: '7', name: 'Казахстан', mask: '### ### ## ##' },
  { iso: 'UA', dial: '380', name: 'Украина', mask: '## ### ## ##' },
  { iso: 'BY', dial: '375', name: 'Беларусь', mask: '## ### ## ##' },
  { iso: 'GE', dial: '995', name: 'Грузия', mask: '### ## ## ##' },
  { iso: 'AM', dial: '374', name: 'Армения', mask: '## ### ###' },
  { iso: 'AZ', dial: '994', name: 'Азербайджан', mask: '## ### ## ##' },
  { iso: 'UZ', dial: '998', name: 'Узбекистан', mask: '## ### ## ##' },
  { iso: 'KG', dial: '996', name: 'Киргизия', mask: '### ### ###' },
  { iso: 'TR', dial: '90', name: 'Турция', mask: '### ### ## ##' },
  { iso: 'CY', dial: '357', name: 'Кипр', mask: '## ### ###' },
  { iso: 'US', dial: '1', name: 'США', mask: '### ### ####' },
  { iso: 'CA', dial: '1', name: 'Канада', mask: '### ### ####' },
  { iso: 'GB', dial: '44', name: 'Великобритания', mask: '#### ######' },
  { iso: 'DE', dial: '49', name: 'Германия', mask: '### ########' },
  { iso: 'FR', dial: '33', name: 'Франция', mask: '# ## ## ## ##' },
  { iso: 'IT', dial: '39', name: 'Италия', mask: '### ### ####' },
  { iso: 'ES', dial: '34', name: 'Испания', mask: '### ### ###' },
  { iso: 'PT', dial: '351', name: 'Португалия', mask: '### ### ###' },
  { iso: 'CH', dial: '41', name: 'Швейцария', mask: '## ### ## ##' },
  { iso: 'NL', dial: '31', name: 'Нидерланды', mask: '# ## ## ## ##' },
  { iso: 'AT', dial: '43', name: 'Австрия', mask: '### #######' },
  { iso: 'PL', dial: '48', name: 'Польша', mask: '### ### ###' },
  { iso: 'CZ', dial: '420', name: 'Чехия', mask: '### ### ###' },
  { iso: 'GR', dial: '30', name: 'Греция', mask: '### ### ####' },
  { iso: 'RS', dial: '381', name: 'Сербия', mask: '## ### ####' },
  { iso: 'ME', dial: '382', name: 'Черногория', mask: '## ### ###' },
  { iso: 'LV', dial: '371', name: 'Латвия', mask: '## ### ###' },
  { iso: 'LT', dial: '370', name: 'Литва', mask: '### #####' },
  { iso: 'EE', dial: '372', name: 'Эстония', mask: '### ####' },
  { iso: 'MD', dial: '373', name: 'Молдова', mask: '## ### ###' },
  { iso: 'IL', dial: '972', name: 'Израиль', mask: '## ### ####' },
  { iso: 'QA', dial: '974', name: 'Катар', mask: '#### ####' },
  { iso: 'SA', dial: '966', name: 'Саудовская Аравия', mask: '## ### ####' },
  { iso: 'KW', dial: '965', name: 'Кувейт', mask: '### #####' },
  { iso: 'BH', dial: '973', name: 'Бахрейн', mask: '#### ####' },
  { iso: 'OM', dial: '968', name: 'Оман', mask: '#### ####' },
  { iso: 'EG', dial: '20', name: 'Египет', mask: '## ### ####' },
  { iso: 'TH', dial: '66', name: 'Таиланд', mask: '## ### ####' },
  { iso: 'SG', dial: '65', name: 'Сингапур', mask: '#### ####' },
  { iso: 'HK', dial: '852', name: 'Гонконг', mask: '#### ####' },
  { iso: 'CN', dial: '86', name: 'Китай', mask: '### #### ####' },
  { iso: 'IN', dial: '91', name: 'Индия', mask: '##### #####' },
  { iso: 'ID', dial: '62', name: 'Индонезия', mask: '### ### ####' },
  { iso: 'AU', dial: '61', name: 'Австралия', mask: '### ### ###' },
];

const BY_ISO: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.iso, c])
);

export const DEFAULT_COUNTRY =
  BY_ISO['AE'] ?? COUNTRIES[0];

export function countryByIso(iso: string): Country | undefined {
  return BY_ISO[iso.toUpperCase()];
}

/** Number of digit slots a mask allows (falls back to E.164 max). */
export function maxDigits(country: Country): number {
  if (!country.mask) return 12;
  return (country.mask.match(/#/g) || []).length;
}

/** Format raw digits into the country mask; stops when digits run out. */
export function formatNumber(digits: string, country: Country): string {
  const mask = country.mask;
  if (!mask) return digits;
  let out = '';
  let i = 0;
  for (const ch of mask) {
    if (ch === '#') {
      if (i >= digits.length) break;
      out += digits[i++];
    } else {
      if (i >= digits.length) break;
      out += ch;
    }
  }
  return out;
}

/**
 * Parse a full international number ("+79991234567") back into a country +
 * local digits, so a re-mounted field can restore what the parent still holds.
 * Uses the longest matching dial-code prefix; shared dial codes (RU/KZ '7',
 * US/CA '1') resolve to the first listed country — fine for restoring input.
 */
export function parseE164(value: string): { country: Country; digits: string } {
  const cleaned = (value || '').replace(/\D/g, '');
  if (!cleaned) return { country: DEFAULT_COUNTRY, digits: '' };
  let best: Country | undefined;
  for (const c of COUNTRIES) {
    if (cleaned.startsWith(c.dial) && (!best || c.dial.length > best.dial.length)) {
      best = c;
    }
  }
  const country = best ?? DEFAULT_COUNTRY;
  const rest = best ? cleaned.slice(best.dial.length) : cleaned;
  return { country, digits: rest.slice(0, maxDigits(country)) };
}

// Compact timezone -> ISO map. Covers the realistic audience; anything
// unmapped falls through to locale, then the UAE default.
const TZ_TO_ISO: Record<string, string> = {
  'Asia/Dubai': 'AE',
  'Europe/Moscow': 'RU',
  'Europe/Kaliningrad': 'RU',
  'Europe/Samara': 'RU',
  'Europe/Volgograd': 'RU',
  'Europe/Saratov': 'RU',
  'Europe/Astrakhan': 'RU',
  'Asia/Yekaterinburg': 'RU',
  'Asia/Omsk': 'RU',
  'Asia/Novosibirsk': 'RU',
  'Asia/Krasnoyarsk': 'RU',
  'Asia/Irkutsk': 'RU',
  'Asia/Yakutsk': 'RU',
  'Asia/Vladivostok': 'RU',
  'Asia/Magadan': 'RU',
  'Asia/Kamchatka': 'RU',
  'Asia/Almaty': 'KZ',
  'Asia/Aqtau': 'KZ',
  'Asia/Aqtobe': 'KZ',
  'Asia/Atyrau': 'KZ',
  'Asia/Oral': 'KZ',
  'Asia/Qostanay': 'KZ',
  'Europe/Kyiv': 'UA',
  'Europe/Kiev': 'UA',
  'Europe/Simferopol': 'UA',
  'Europe/Minsk': 'BY',
  'Asia/Tbilisi': 'GE',
  'Asia/Yerevan': 'AM',
  'Asia/Baku': 'AZ',
  'Asia/Tashkent': 'UZ',
  'Asia/Samarkand': 'UZ',
  'Asia/Bishkek': 'KG',
  'Europe/Istanbul': 'TR',
  'Asia/Nicosia': 'CY',
  'Europe/Nicosia': 'CY',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Phoenix': 'US',
  'America/Los_Angeles': 'US',
  'America/Anchorage': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'Europe/London': 'GB',
  'Europe/Berlin': 'DE',
  'Europe/Paris': 'FR',
  'Europe/Rome': 'IT',
  'Europe/Madrid': 'ES',
  'Europe/Lisbon': 'PT',
  'Europe/Zurich': 'CH',
  'Europe/Amsterdam': 'NL',
  'Europe/Vienna': 'AT',
  'Europe/Warsaw': 'PL',
  'Europe/Prague': 'CZ',
  'Europe/Athens': 'GR',
  'Europe/Belgrade': 'RS',
  'Europe/Podgorica': 'ME',
  'Europe/Riga': 'LV',
  'Europe/Vilnius': 'LT',
  'Europe/Tallinn': 'EE',
  'Europe/Chisinau': 'MD',
  'Asia/Jerusalem': 'IL',
  'Asia/Qatar': 'QA',
  'Asia/Riyadh': 'SA',
  'Asia/Kuwait': 'KW',
  'Asia/Bahrain': 'BH',
  'Asia/Muscat': 'OM',
  'Africa/Cairo': 'EG',
  'Asia/Bangkok': 'TH',
  'Asia/Singapore': 'SG',
  'Asia/Hong_Kong': 'HK',
  'Asia/Shanghai': 'CN',
  'Asia/Kolkata': 'IN',
  'Asia/Jakarta': 'ID',
  'Asia/Pontianak': 'ID',
  'Asia/Makassar': 'ID',
  'Asia/Jayapura': 'ID',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
};

/**
 * Physical-location guess by IP — the most reliable signal for a traveller
 * (timezone/locale only reflect device settings, not where you actually are).
 * Free, keyless endpoints with a fallback; returns null on any failure so the
 * caller keeps the offline guess. Only resolves to a country we support.
 */
export async function detectCountryByIp(): Promise<Country | null> {
  if (typeof window === 'undefined') return null;
  const endpoints: { url: string; pick: (d: any) => unknown }[] = [
    { url: 'https://get.geojs.io/v1/ip/country.json', pick: (d) => d?.country },
    { url: 'https://ipwho.is/?fields=country_code', pick: (d) => d?.country_code },
  ];
  for (const ep of endpoints) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 2500);
      const res = await fetch(ep.url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) continue;
      const data = await res.json();
      const iso = String(ep.pick(data) || '').toUpperCase();
      const country = iso && countryByIso(iso);
      if (country) return country;
    } catch {
      // try the next endpoint
    }
  }
  return null;
}

/** Best-effort country guess, offline. Runs only in the browser. */
export function detectCountry(): Country {
  if (typeof window === 'undefined') return DEFAULT_COUNTRY;

  // 1) Timezone — most reliable signal for physical location.
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const iso = tz && TZ_TO_ISO[tz];
    if (iso && BY_ISO[iso]) return BY_ISO[iso];
  } catch {
    // Intl may be unavailable — fall through
  }

  // 2) Locale region, e.g. "ru-RU" -> RU, "en-GB" -> GB.
  try {
    const langs =
      (navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language]) || [];
    for (const lang of langs) {
      const region = lang.split('-')[1];
      if (region && BY_ISO[region.toUpperCase()]) {
        return BY_ISO[region.toUpperCase()];
      }
    }
  } catch {
    // noop
  }

  return DEFAULT_COUNTRY;
}
