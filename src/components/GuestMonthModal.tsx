'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLeadSubmit, useUtmCapture } from '@/lib/useLeadSubmit';
import FormStatus from '@/components/FormStatus';

const POS = [
  'Предприниматель / собственник бизнеса',
  'Топ-менеджер / C-level',
  'Инвестор',
  'Эксперт / консультант',
];
const REV = [
  'Оборот: от 0 до 1 млн $',
  'Оборот: от 1 до 5 млн $',
  'Оборот: от 5 до 20 млн $',
  'Оборот: более 20 млн $',
];

const checkOn = `var(--accent) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23160B03' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'><path d='M5 12l5 5L20 6'/></svg>") center/15px no-repeat`;

export default function GuestMonthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useUtmCapture();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [revenue, setRevenue] = useState('');
  const [consent, setConsent] = useState(false);
  const { submit, state, error, reset } = useLeadSubmit('vision-guest', 'guest');
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ESC closes the modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Reset form state whenever modal reopens
  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submit({ name, phone, position, revenue, consent });
    if (ok) {
      setName('');
      setPhone('');
      setPosition('');
      setRevenue('');
    }
  };

  if (!open || !mounted) return null;

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gm-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(4,4,6,.78)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        overflowY: 'auto',
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 560,
          background: 'linear-gradient(165deg,#1c1c20,#101012)',
          border: '1px solid rgba(233,107,30,.3)',
          borderRadius: 24,
          padding: '32px 32px 34px',
          boxShadow:
            '0 40px 100px -30px rgba(0,0,0,.7), 0 0 40px -10px rgba(233,107,30,.35)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 34,
            height: 34,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,.15)',
            background: 'rgba(255,255,255,.03)',
            color: 'var(--muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            border: '1px solid rgba(233,107,30,.4)',
            borderRadius: 999,
            padding: '7px 16px',
            marginBottom: 18,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent)',
            }}
          />
          <span
            className="osw"
            style={{
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            Гостевой месяц
          </span>
        </div>

        <h3
          id="gm-modal-title"
          className="osw"
          style={{
            fontWeight: 700,
            fontSize: 30,
            lineHeight: 1.1,
            letterSpacing: '.005em',
            textTransform: 'uppercase',
            color: 'var(--heading)',
            marginBottom: 10,
          }}
        >
          Забронировать <span style={{ color: 'var(--accent)' }}>гостевой месяц</span>
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: '#B8B4AB', marginBottom: 22 }}>
          Оставьте контакты — менеджер клуба свяжется с вами в течение рабочего дня, расскажет об условиях гостевого доступа и подберёт ближайшую встречу.
        </p>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ModalInput placeholder="Имя и фамилия" value={name} onChange={setName} aria="Имя" />
          <div
            className="vc-field"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 14,
              background: 'rgba(255,255,255,.02)',
              padding: '0 16px',
              height: 56,
            }}
          >
            <span style={{ position: 'relative', width: 22, height: 15, borderRadius: 3, overflow: 'hidden', display: 'inline-block', flexShrink: 0 }} aria-hidden>
              <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(#00843D 33.3%,#fff 33.3% 66.6%,#111 66.6%)' }} />
              <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: '#CE1126' }} />
            </span>
            <span style={{ color: '#C9C5BD', fontSize: 15, fontWeight: 500 }}>+971</span>
            <span style={{ width: 1, height: 20, background: 'rgba(255,255,255,.12)' }} />
            <input
              className="vc-na"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(00) 000-0000"
              aria-label="Телефон"
              inputMode="tel"
              style={{ width: '100%', border: 0, background: 'transparent', color: 'var(--text)', fontSize: 15 }}
            />
          </div>
          <ModalSelect options={POS} value={position} onChange={setPosition} aria="Позиция" placeholder="Ваша позиция" />
          <ModalSelect options={REV} value={revenue} onChange={setRevenue} aria="Оборот" placeholder="Оборот бизнеса" />

          <label style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, cursor: 'pointer', userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                width: 20,
                height: 20,
                border: '1px solid rgba(255,255,255,.28)',
                borderRadius: 6,
                background: consent ? (checkOn as any) : 'transparent',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 13, color: '#8C887F' }}>
              Даю согласие на обработку персональных данных
            </span>
          </label>

          <button
            type="submit"
            disabled={state === 'sending' || state === 'success'}
            className="osw"
            style={{
              marginTop: 8,
              height: 58,
              border: 0,
              borderRadius: 14,
              background: 'linear-gradient(180deg,#F2851B,#E0691C)',
              color: '#1A0E03',
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '.03em',
              textTransform: 'uppercase',
              cursor: state === 'sending' ? 'wait' : 'pointer',
              opacity: state === 'sending' ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'transform .2s, box-shadow .2s, filter .2s',
              boxShadow: '0 12px 30px -10px rgba(233,107,30,.55)',
            }}
          >
            {state === 'sending' ? 'Отправляем…' : 'Забронировать месяц →'}
          </button>
          <FormStatus state={state} error={error} successText="Спасибо! Менеджер свяжется с вами по гостевому месяцу." />
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

function ModalInput({
  placeholder,
  value,
  onChange,
  type = 'text',
  aria,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  aria: string;
}) {
  return (
    <div
      className="vc-field"
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,.12)',
        borderRadius: 14,
        background: 'rgba(255,255,255,.02)',
        padding: '0 16px',
        height: 56,
      }}
    >
      <input
        className="vc-na"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={aria}
        style={{ width: '100%', border: 0, background: 'transparent', color: 'var(--text)', fontSize: 15 }}
      />
    </div>
  );
}

function ModalSelect({
  options,
  value,
  onChange,
  aria,
  placeholder,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  aria: string;
  placeholder: string;
}) {
  return (
    <div
      className="vc-field"
      style={{
        position: 'relative',
        border: '1px solid rgba(255,255,255,.12)',
        borderRadius: 14,
        background: 'rgba(255,255,255,.02)',
        height: 56,
      }}
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={aria}
        className="vc-na"
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          width: '100%',
          height: '100%',
          border: 0,
          background: 'transparent',
          color: value ? 'var(--text)' : '#6E6A62',
          fontSize: 14.5,
          cursor: 'pointer',
          padding: '0 40px 0 16px',
        }}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          right: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: 'var(--accent)',
          fontSize: 10,
        }}
      >
        ▼
      </span>
    </div>
  );
}
