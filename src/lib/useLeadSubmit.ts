'use client';
import { useCallback, useEffect, useState } from 'react';

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
export type LeadFormId = 'hero' | 'join' | 'guest';

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

export function useLeadSubmit(source: LeadSource, form: LeadFormId) {
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
        setError('Форма временно недоступна. Свяжитесь с нами напрямую.');
        return false;
      }
      if (!checkRateLimit()) {
        setState('error');
        setError('Слишком много попыток. Подождите минуту и попробуйте снова.');
        return false;
      }
      if (!fields.consent) {
        setState('error');
        setError('Нужно согласие на обработку персональных данных.');
        return false;
      }
      if (!fields.name.trim() || !fields.phone.trim()) {
        setState('error');
        setError('Заполните имя и телефон.');
        return false;
      }

      setState('sending');
      setError('');

      const payload: LeadPayload = {
        source,
        form,
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
          return true;
        }
        let detail = 'Не удалось отправить. Попробуйте ещё раз.';
        try {
          const data = await res.json();
          if (data?.detail) detail = String(data.detail);
        } catch {}
        setError(detail);
        setState('error');
        return false;
      } catch {
        setState('error');
        setError('Сеть недоступна. Проверьте соединение и попробуйте снова.');
        return false;
      }
    },
    [source, form]
  );

  return { submit, reset, state, error };
}

function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  // UI already presents +971 prefix as static, so raw is local portion.
  return digits.startsWith('971') ? `+${digits}` : `+971 ${raw.trim()}`;
}
