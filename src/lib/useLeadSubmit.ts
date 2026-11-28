'use client';
import { useCallback, useEffect, useState } from 'react';
import type { Lang } from '@/lib/i18n';

const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || '';
const API_KEY = process.env.NEXT_PUBLIC_LEAD_API_KEY || '';

const UTM_KEY = 'vc_utm';
const UTM_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const RL_KEY = 'vc_lead_rl';
const RL_MAX = 5; // max submissions per minute per browser
const RL_WINDOW_MS = 60_000;

type UtmParams = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
};

export type LeadSource = 'vision-site' | 'vision-guest';
export type LeadFormId = 'hero' | 'join' | 'guest' | 'cta';

export interface LeadFields {
  name: string;
  phone: string;
  email?: string;
  position: string;
  revenue: string;
  consent: boolean;
}

interface LeadPayload extends LeadFields {
  source: LeadSource;
  form: LeadFormId;
  /** Только у английской формы: lang='en'. CRM кладёт лишние поля в анкету лида. */
  lang?: 'en';
  utm: UtmParams;
  referrer: string;
  page: string;
  submitted_at: string;
}

export type LeadState = 'idle' | 'sending' | 'success' | 'error';

/** Capture UTM params on first visit; persist for 30 days in localStorage. */
export function useUtmCapture() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const grabbed: UtmParams = {
        source: params.get('utm_source'),
        medium: params.get('utm_medium'),
        campaign: params.get('utm_campaign'),
        content: params.get('utm_content'),
        term: params.get('utm_term'),
      };
      const hasAny = Object.values(grabbed).some(Boolean);
      if (!hasAny) return;
      const raw = window.localStorage.getItem(UTM_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed?.ts && Date.now() - parsed.ts < UTM_TTL_MS) return; // keep first-touch
        } catch {}
      }
      window.localStorage.setItem(
        UTM_KEY,
        JSON.stringify({ ts: Date.now(), utm: grabbed })
      );
    } catch {
      // localStorage may be disabled — noop
    }
  }, []);
}

function readUtm(): UtmParams {
  const empty: UtmParams = {
    source: null,
    medium: null,
    campaign: null,
    content: null,
    term: null,
  };
  if (typeof window === 'undefined') return empty;
  try {
    const raw = window.localStorage.getItem(UTM_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    if (!parsed?.ts || Date.now() - parsed.ts > UTM_TTL_MS) return empty;
    return { ...empty, ...parsed.utm };
  } catch {
    return empty;
  }
}

function checkRateLimit(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const now = Date.now();
    const raw = window.localStorage.getItem(RL_KEY);
    const stamps: number[] = raw ? JSON.parse(raw) : [];
    const recent = stamps.filter((t) => now - t < RL_WINDOW_MS);
    if (recent.length >= RL_MAX) return false;
    recent.push(now);
    window.localStorage.setItem(RL_KEY, JSON.stringify(recent));
    return true;
  } catch {
    return true;
  }
}

const MESSAGES = {
  ru: {
    unavailable: 'Форма временно недоступна. Свяжитесь с нами напрямую.',
    rateLimit: 'Слишком много попыток. Подождите минуту и попробуйте снова.',
    consent: 'Нужно согласие на обработку персональных данных.',
    name: 'Заполните имя и телефон.',
    phone: 'Введите корректный номер телефона.',
    fields: 'Заполните все поля: позицию и оборот бизнеса.',
    failed: 'Не удалось отправить. Попробуйте ещё раз.',
    network: 'Сеть недоступна. Проверьте соединение и попробуйте снова.',
  },
  en: {
    unavailable: 'The form is temporarily unavailable. Please contact us directly.',
    rateLimit: 'Too many attempts. Please wait a minute and try again.',
    consent: 'Please confirm that you agree to the processing of your personal data.',
    name: 'Please enter your name and phone number.',
    phone: 'Please enter a valid phone number.',
    fields: 'Please complete all fields, including your role and revenue.',
    failed: 'Your request could not be sent. Please try again.',
    network: 'No connection. Please check your network and try again.',
  },
};

/**
 * lang меняет только тексты ошибок и поле `lang` в заявке. source и значения
 * позиции/оборота уходят в CRM в том же формате, что и с русской формы.
 */
export function useLeadSubmit(source: LeadSource, form: LeadFormId, lang: Lang = 'ru') {
  const t = MESSAGES[lang];
  const [state, setState] = useState<LeadState>('idle');
  const [error, setError] = useState<string>('');

  const reset = useCallback(() => {
    setState('idle');
    setError('');
  }, []);

  const submit = useCallback(
    async (fields: LeadFields) => {
      if (!ENDPOINT || !API_KEY) {
        setState('error');
        setError(t.unavailable);
        return false;
      }
      if (!checkRateLimit()) {
        setState('error');
        setError(t.rateLimit);
        return false;
      }
      if (!fields.consent) {
        setState('error');
        setError(t.consent);
        return false;
      }
      if (!fields.name.trim()) {
        setState('error');
        setError(t.name);
        return false;
      }
      if (fields.phone.replace(/\D/g, '').length < 8) {
        setState('error');
        setError(t.phone);
        return false;
      }
      if (!fields.position.trim() || !fields.revenue.trim()) {
        setState('error');
        setError(t.fields);
        return false;
      }

      setState('sending');
      setError('');

      const payload: LeadPayload = {
        source,
        form,
        ...(lang === 'en' ? { lang: 'en' as const } : {}),
        name: fields.name.trim(),
        phone: normalisePhone(fields.phone),
        email: fields.email?.trim() || undefined,
        position: fields.position,
        revenue: fields.revenue,
        consent: true,
        utm: readUtm(),
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        page: typeof window !== 'undefined' ? window.location.href : '',
        submitted_at: new Date().toISOString(),
      };

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': API_KEY,
          },
          body: JSON.stringify(payload),
          mode: 'cors',
        });
        if (res.ok) {
          setState('success');
          trackPixelLead();
          return true;
        }
        let detail = t.failed;
        // CRM отвечает по-русски — на английской странице показываем свой текст.
        if (lang === 'ru') {
          try {
            const data = await res.json();
            if (data?.detail) detail = String(data.detail);
          } catch {}
        }
        setError(detail);
        setState('error');
        return false;
      } catch {
        setState('error');
        setError(t.network);
        return false;
      }
    },
    [source, form, lang, t]
  );

  return { submit, reset, state, error };
}

function normalisePhone(raw: string): string {
  // PhoneField already emits a full international number ("+<dial><digits>").
  // Just strip separators and keep it in E.164 form.
  const digits = raw.replace(/\D/g, '');
  return digits ? `+${digits}` : '';
}

/** Meta Pixel: count a lead only after the CRM accepted the form. */
function trackPixelLead() {
  try {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    fbq?.('track', 'Lead');
  } catch {
    // pixel blocked by adblock — noop
  }
}
