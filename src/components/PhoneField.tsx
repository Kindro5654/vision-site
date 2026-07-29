'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  COUNTRIES,
  Country,
  detectCountry,
  detectCountryByIp,
  formatNumber,
  maxDigits,
  parseE164,
} from '@/lib/countries';
import { asset } from '@/lib/site';

/** Real SVG flag (renders on every OS, unlike emoji flags). */
function Flag({ iso, size = 22 }: { iso: string; size?: number }) {
  return (
    // Tiny inline SVG flag — next/image adds no value for a 22px static asset.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`/assets/flags/${iso.toLowerCase()}.svg`)}
      alt=""
      width={size}
      height={Math.round((size * 3) / 4)}
      aria-hidden
      style={{
        borderRadius: 3,
        objectFit: 'cover',
        flexShrink: 0,
        display: 'block',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.12)',
      }}
    />
  );
}

/**
 * International phone field: auto-detects the visitor's country (offline),
 * lets them pick another from a searchable list, accepts digits only, and
 * masks the number per country. Emits the full E.164 string via onChange
 * ("+79991234567"), or '' when no local digits have been entered.
 */
export default function PhoneField({
  value,
  onChange,
  height = 60,
}: {
  value: string;
  onChange: (v: string) => void;
  height?: number;
}) {
  // Seed from the incoming value so a re-mounted field (e.g. a modal reopened
  // after closing) restores the number the parent still holds, instead of
  // wiping it via the emit effect below.
  const [country, setCountry] = useState<Country>(() => parseE164(value).country);
  const [digits, setDigits] = useState<string>(() => parseE164(value).digits);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  // True once the user types or picks a country — stops geo-detection from
  // overriding their intent (e.g. a slow IP lookup landing after they typed).
  const touchedRef = useRef(false);

  // Auto-detect only for a fresh, empty field — never override a restored value.
  // 1) Instant offline guess (timezone/locale) so the field is right immediately.
  // 2) IP lookup — the real physical location — corrects it if they differ
  //    (a traveller whose device is still on a home timezone/language).
  useEffect(() => {
    if (value) return; // restored value — keep it
    setCountry(detectCountry());
    let cancelled = false;
    detectCountryByIp().then((c) => {
      if (!cancelled && c && !touchedRef.current) setCountry(c);
    });
    return () => {
      cancelled = true;
    };
    // Mount-only: reads the initial value on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Parent cleared the field (e.g. after a successful submit) — reset digits.
  useEffect(() => {
    if (value === '') setDigits('');
  }, [value]);

  // Emit the full international number whenever country or digits change.
  useEffect(() => {
    onChange(digits ? `+${country.dial}${digits}` : '');
    // onChange is a stable useState setter in every call site; excluded on
    // purpose so this only re-emits on real country/digit changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, digits]);

  // Close the dropdown on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // Capture phase + stopPropagation so Escape closes only this dropdown and
    // not an enclosing modal that also listens for Escape on document.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [open]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    const digitsQ = q.replace(/\D/g, '');
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        (digitsQ && c.dial.includes(digitsQ))
    );
  }, [query]);

  const onDigits = (raw: string) => {
    touchedRef.current = true;
    const only = raw.replace(/\D/g, '').slice(0, maxDigits(country));
    setDigits(only);
  };

  const pick = (c: Country) => {
    touchedRef.current = true;
    setCountry(c);
    setOpen(false);
    setQuery('');
    // Re-clamp digits to the new country's length.
    setDigits((d) => d.replace(/\D/g, '').slice(0, maxDigits(c)));
    inputRef.current?.focus();
  };

  const placeholder = country.mask
    ? country.mask.replace(/#/g, '0')
    : '000 000 000';

  return (
    <div
      ref={rootRef}
      className="vc-field"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: '1px solid rgba(255,255,255,.12)',
        borderRadius: 14,
        background: 'rgba(255,255,255,.02)',
        padding: '0 16px',
        height,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Код страны: ${country.name}, +${country.dial}`}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          border: 0,
          background: 'transparent',
          color: '#C9C5BD',
          fontSize: 16,
          fontWeight: 500,
          cursor: 'pointer',
          padding: 0,
          fontFamily: 'inherit',
          flexShrink: 0,
          outline: 'none',
        }}
      >
        <Flag iso={country.iso} />
        <span>+{country.dial}</span>
        <span
          aria-hidden
          style={{
            fontSize: 9,
            color: 'var(--accent)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform .2s',
          }}
        >
          ▼
        </span>
      </button>

      <span
        style={{ width: 1, height: 22, background: 'rgba(255,255,255,.12)', flexShrink: 0 }}
        aria-hidden
      />

      <input
        ref={inputRef}
        className="vc-na"
        value={formatNumber(digits, country)}
        onChange={(e) => onDigits(e.target.value)}
        placeholder={placeholder}
        aria-label="Телефон"
        inputMode="numeric"
        autoComplete="tel-national"
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          background: 'transparent',
          color: 'var(--text)',
          fontSize: 16,
          outline: 'none',
        }}
      />

      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 50,
            background: '#141416',
            border: '1px solid rgba(255,255,255,.14)',
            borderRadius: 14,
            boxShadow: '0 30px 70px -30px rgba(0,0,0,.8)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: 10, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск страны или кода…"
              aria-label="Поиск страны"
              style={{
                width: '100%',
                height: 40,
                border: '1px solid rgba(255,255,255,.12)',
                borderRadius: 10,
                background: 'rgba(255,255,255,.03)',
                color: 'var(--text)',
                fontSize: 15,
                padding: '0 12px',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ maxHeight: 240, overflowY: 'auto', padding: 6 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '14px 12px', color: '#8C887F', fontSize: 14 }}>
                Ничего не найдено
              </div>
            ) : (
              filtered.map((c) => {
                const active = c.iso === country.iso;
                return (
                  <button
                    key={c.iso}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => pick(c)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 11,
                      width: '100%',
                      border: 0,
                      borderRadius: 9,
                      background: active ? 'rgba(233,107,30,.14)' : 'transparent',
                      color: 'var(--text)',
                      fontSize: 15,
                      fontFamily: 'inherit',
                      textAlign: 'left',
                      padding: '9px 11px',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLButtonElement).style.background =
                          'rgba(255,255,255,.05)';
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLButtonElement).style.background =
                          'transparent';
                    }}
                  >
                    <Flag iso={c.iso} size={22} />
                    <span style={{ flex: 1, minWidth: 0 }}>{c.name}</span>
                    <span style={{ color: '#8C887F', flexShrink: 0 }}>+{c.dial}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
