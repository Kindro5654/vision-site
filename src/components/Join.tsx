'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { asset } from '@/lib/site';
import { useLeadSubmit, useUtmCapture } from '@/lib/useLeadSubmit';
import FormStatus from '@/components/FormStatus';

const AVATARS = [
  { src: '/assets/people/res-butova.jpg', pos: 'center 22%' },
  { src: '/assets/people/res-krasnoperova.jpg', pos: 'center 25%' },
  { src: '/assets/people/res-tretyak.jpg', pos: 'center 22%' },
  { src: '/assets/people/res-neuberger.jpg', pos: 'center 22%' },
  { src: '/assets/people/res-podnebesny.jpg', pos: 'center 22%' },
];

const REV = ['Оборот: до $1 M', 'Оборот: от $1 до $5 M', 'Оборот: от $5 до $20 M', 'Оборот: более $20 M'];
const POS = ['Предприниматель / собственник', 'Топ-менеджер / C-level', 'Инвестор', 'Эксперт / консультант'];

const checkOn = `var(--accent) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23160B03' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'><path d='M5 12l5 5L20 6'/></svg>") center/15px no-repeat`;

export default function Join() {
  const m = useMounted();
  useUtmCapture();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [revenue, setRevenue] = useState('');
  const [consent, setConsent] = useState(false);
  const { submit, state, error } = useLeadSubmit('vision-site', 'join');

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

  return (
    <section
      id="join"
      className="vc-join-root"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '76px clamp(16px, 4vw, 96px) 88px',
      }}
    >
      <div
        className="vc-join-card"
        style={{
          position: 'relative',
          maxWidth: 2400,
          margin: '0 auto',
          borderRadius: 30,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.08)',
          boxShadow: '0 50px 110px -50px rgba(0,0,0,.7)',
          background: 'linear-gradient(165deg,#1c1c20,#101012)',
          ...reveal(m, 0.05),
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg,rgba(10,10,12,.96) 32%,rgba(10,10,12,.72) 56%,rgba(10,10,12,.5) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -160,
            left: -100,
            width: 620,
            height: 620,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(233,107,30,.28),transparent 62%)',
            filter: 'blur(28px)',
            animation: 'vcGlowJ 7s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        <div
          className="vc-join-inner"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 52,
            padding: '60px 60px 64px',
            alignItems: 'center',
          }}
        >
          {/* left */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 11,
                border: '1px solid rgba(255,255,255,.18)',
                borderRadius: 999,
                padding: '9px 20px',
                backdropFilter: 'blur(6px)',
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
                  fontSize: 13,
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: '#EDEAE4',
                }}
              >
                Только по приглашению
              </span>
            </div>
            <h2
              className="osw vc-join-head"
              style={{
                fontWeight: 700,
                fontSize: 70,
                lineHeight: 1.07,
                letterSpacing: '.01em',
                textTransform: 'uppercase',
                marginTop: 24,
                textWrap: 'balance' as any,
              }}
            >
              <span style={{ color: 'var(--heading)' }}>
                Вступайте<br />в бизнес-клуб
              </span>
              <br />
              <span style={{ color: 'var(--accent)' }}>Vision</span>
            </h2>
            <p
              className="vc-join-sub"
              style={{
                fontSize: 20,
                lineHeight: 1.5,
                color: '#B6B2A9',
                marginTop: 24,
                maxWidth: 480,
              }}
            >
              Оставьте заявку — менеджер клуба свяжется с вами, расскажет об условиях резидентства и пригласит на ближайшую встречу.
            </p>

            <div className="vc-join-stat" style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 38 }}>
              <div style={{ display: 'flex' }}>
                {AVATARS.map((a, i) => (
                  <span
                    key={a.src}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      border: '2px solid var(--bg)',
                      marginLeft: i === 0 ? 0 : -12,
                      overflow: 'hidden',
                      background: 'var(--panel-4)',
                      display: 'block',
                      position: 'relative',
                    }}
                  >
                    <Image src={asset(a.src)} alt="" fill sizes="48px" style={{ objectFit: 'cover', objectPosition: a.pos }} />
                  </span>
                ))}
              </div>
              <div>
                <div className="osw" style={{ fontWeight: 700, fontSize: 26, lineHeight: 1, color: 'var(--heading)' }}>
                  1200<span style={{ color: 'var(--accent)' }}>+</span>
                </div>
                <div style={{ fontSize: 15, color: 'var(--muted-2)', marginTop: 3 }}>резидентов уже в клубе</div>
              </div>
            </div>
          </div>

          {/* form */}
          <div
            className="vc-join-form"
            style={{
              backdropFilter: 'blur(22px)',
              background: 'rgba(18,18,21,.62)',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 24,
              padding: '34px 34px 36px',
              boxShadow: '0 30px 70px -30px rgba(0,0,0,.7)',
            }}
          >
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <FieldInput aria="Имя" placeholder="Имя и фамилия" value={name} onChange={setName} />
              <div
                className="vc-field"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  border: '1px solid rgba(255,255,255,.12)',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,.02)',
                  padding: '0 18px',
                  height: 60,
                }}
              >
                <span style={{ position: 'relative', width: 24, height: 16, borderRadius: 3, overflow: 'hidden', display: 'inline-block', flexShrink: 0 }} aria-hidden>
                  <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(#00843D 33.3%,#fff 33.3% 66.6%,#111 66.6%)' }} />
                  <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 7, background: '#CE1126' }} />
                </span>
                <span style={{ color: '#C9C5BD', fontSize: 16, fontWeight: 500 }}>+971</span>
                <span style={{ width: 1, height: 22, background: 'rgba(255,255,255,.12)' }} />
                <input
                  className="vc-na"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 000-0000"
                  aria-label="Телефон"
                  inputMode="tel"
                  style={{
                    width: '100%',
                    border: 0,
                    background: 'transparent',
                    color: 'var(--text)',
                    fontSize: 16,
                  }}
                />
              </div>
              <SelectField options={REV} aria="Оборот" value={revenue} onChange={setRevenue} />
              <SelectField options={POS} aria="Позиция" value={position} onChange={setPosition} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    width: 21,
                    height: 21,
                    border: '1px solid rgba(255,255,255,.28)',
                    borderRadius: 6,
                    background: consent ? (checkOn as any) : 'transparent',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 14, color: '#8C887F' }}>
                  Даю согласие на обработку персональных данных
                </span>
              </label>
              <button
                type="submit"
                disabled={state === 'sending' || state === 'success'}
                className="vc-sub osw"
                style={{
                  marginTop: 8,
                  height: 64,
                  border: 0,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg,#F2851B,#E0691C)',
                  color: '#160B03',
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: '.05em',
                  textTransform: 'uppercase',
                  cursor: state === 'sending' ? 'wait' : 'pointer',
                  opacity: state === 'sending' ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                {state === 'sending' ? 'Отправляем…' : 'Оставить заявку'}
                {state !== 'sending' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </button>
              <FormStatus state={state} error={error} successText="Спасибо! Менеджер клуба свяжется с вами в ближайшее время." />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldInput({
  aria,
  placeholder,
  value,
  onChange,
  type = 'text',
}: {
  aria: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
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
        padding: '0 18px',
        height: 60,
      }}
    >
      <input
        className="vc-na"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={aria}
        style={{
          width: '100%',
          border: 0,
          background: 'transparent',
          color: 'var(--text)',
          fontSize: 16,
        }}
      />
    </div>
  );
}

function SelectField({
  options,
  aria,
  value,
  onChange,
}: {
  options: string[];
  aria: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="vc-field"
      style={{
        position: 'relative',
        border: '1px solid rgba(255,255,255,.12)',
        borderRadius: 14,
        background: 'rgba(255,255,255,.02)',
        height: 60,
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
          fontSize: 15,
          cursor: 'pointer',
          padding: '0 42px 0 18px',
        }}
      >
        <option value="" disabled hidden>
          {aria === 'Позиция' ? 'Ваша позиция' : 'Оборот бизнеса'}
        </option>
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
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: 'var(--accent)',
          fontSize: 11,
        }}
      >
        ▼
      </span>
    </div>
  );
}
