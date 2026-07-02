'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useMounted, reveal } from '@/lib/useMounted';
import { asset } from '@/lib/site';
import { useLeadSubmit, useUtmCapture } from '@/lib/useLeadSubmit';
import FormStatus from '@/components/FormStatus';

const NAV = ['О клубе', 'Мероприятия', 'Резиденты', 'Спикеры', 'Клубный дом'];
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

const checkOn = `var(--accent) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231A0E03' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'><path d='M5 12l5 5L20 6'/></svg>") center/14px no-repeat`;

export default function Hero() {
  const m = useMounted();
  useUtmCapture();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [revenue, setRevenue] = useState('');
  const [consent, setConsent] = useState(true);
  const { submit, state, error } = useLeadSubmit('vision-site', 'hero');

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
      className="hero-root"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -200,
          left: '48%',
          width: 840,
          height: 840,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(233,107,30,.4),transparent 62%)',
          filter: 'blur(34px)',
          animation: 'vcGlow 7s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 200,
          left: -140,
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(233,107,30,.16),transparent 66%)',
          filter: 'blur(44px)',
          pointerEvents: 'none',
        }}
      />
      {/* grid mask */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.5,
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 65% at 32% 18%,#000,transparent 75%)',
          maskImage:
            'radial-gradient(ellipse 75% 65% at 32% 18%,#000,transparent 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* header */}
      <header
        className="vc-hero-head"
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 1720,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          padding: '24px clamp(24px, 4vw, 64px)',
          borderBottom: '1px solid rgba(255,255,255,.08)',
          whiteSpace: 'nowrap',
        }}
      >
        <Image
          src={asset('/assets/logo-vision.png')}
          alt="Vision Club"
          width={120}
          height={26}
          priority
          style={{ height: 26, width: 'auto', flexShrink: 0 }}
        />
        <nav
          style={{
            flex: '1 1 auto',
            display: 'flex',
            justifyContent: 'center',
            gap: 30,
            minWidth: 0,
          }}
        >
          {NAV.map((item) => (
            <a
              key={item}
              href="#"
              className="vc-link osw"
              style={{
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                flexShrink: 0,
              }}
            >
              {item}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <a
            href="tel:+971585506498"
            className="vc-phone"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--text)',
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 10px var(--accent)',
              }}
            />
            +971 58 550 6498
          </a>
          <a
            href="#join"
            className="vc-cta osw"
            style={{
              borderRadius: 999,
              padding: '11px 22px',
              background: 'var(--accent)',
              color: '#1A0E03',
              fontWeight: 600,
              fontSize: 13.5,
              letterSpacing: '.04em',
              textTransform: 'uppercase',
            }}
          >
            Оставить заявку
          </a>
        </div>
      </header>

      {/* body */}
      <div
        className="vc-hero-body"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1720,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.04fr .96fr',
          gap: 56,
          padding: '60px clamp(24px, 4vw, 64px) 72px',
          alignItems: 'stretch',
        }}
      >
        {/* left */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="eyebrow" style={reveal(m, 0.02)}>
            <span className="eyebrow-line" />
            <span className="eyebrow-text">Только по приглашению · Дубай</span>
          </div>
          <h1
            className="osw"
            style={{
              margin: '22px 0 0',
              fontWeight: 700,
              fontSize: 78,
              lineHeight: 1.06,
              letterSpacing: '.005em',
              textTransform: 'uppercase',
              color: 'var(--heading)',
              textWrap: 'balance' as any,
              textShadow: '0 0 70px rgba(233,107,30,.14)',
              ...reveal(m, 0.1),
            }}
          >
            VISION <span style={{ color: 'var(--accent)' }}>—</span>
            <br />
            международный бизнес-клуб
          </h1>
          <p
            style={{
              margin: '24px 0 0',
              maxWidth: 460,
              fontSize: 19,
              lineHeight: 1.55,
              color: 'var(--muted)',
              ...reveal(m, 0.18),
            }}
          >
            Мы объединяем 220+ ТОП-предпринимателей в Дубае и 1200 резидентов по миру через
            Альянс клубов.
          </p>

          <form
            onSubmit={onSubmit}
            style={{
              marginTop: 34,
              display: 'flex',
              flexDirection: 'column',
              gap: 13,
              ...reveal(m, 0.26),
            }}
          >
            <div
              className="vc-field"
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 14,
                background: 'rgba(255,255,255,.015)',
                padding: '0 18px',
                height: 60,
              }}
            >
              <input
                className="vc-na"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя и Фамилия"
                aria-label="Имя и фамилия"
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
            </div>
            <div
              className="vc-field"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 14,
                background: 'rgba(255,255,255,.015)',
                padding: '0 18px',
                height: 60,
              }}
            >
              <span
                aria-hidden
                style={{
                  position: 'relative',
                  width: 24,
                  height: 16,
                  borderRadius: 3,
                  overflow: 'hidden',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(#00843D 33.3%,#fff 33.3% 66.6%,#111 66.6%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 7,
                    background: '#CE1126',
                  }}
                />
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
                  height: '100%',
                  border: 0,
                  background: 'transparent',
                  color: 'var(--text)',
                  fontSize: 16,
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>
              <SelectField options={POS} label="Позиция" value={position} onChange={setPosition} />
              <SelectField options={REV} label="Оборот" value={revenue} onChange={setRevenue} />
            </div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                marginTop: 5,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  width: 20,
                  height: 20,
                  border: '1px solid rgba(255,255,255,.25)',
                  borderRadius: 6,
                  background: consent ? (checkOn as any) : 'transparent',
                  cursor: 'pointer',
                  position: 'relative',
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
              className="vc-cta osw"
              style={{
                marginTop: 8,
                height: 64,
                border: 0,
                borderRadius: 14,
                background: 'var(--accent)',
                color: '#1A0E03',
                fontWeight: 700,
                fontSize: 17,
                letterSpacing: '.04em',
                textTransform: 'uppercase',
                cursor: state === 'sending' ? 'wait' : 'pointer',
                opacity: state === 'sending' ? 0.7 : 1,
              }}
            >
              {state === 'sending' ? 'Отправляем…' : 'Получить приглашение'}
            </button>
            <FormStatus state={state} error={error} successText="Спасибо! Менеджер клуба свяжется с вами в ближайшее время." />
          </form>
        </div>

        {/* photo */}
        <div
          className="vc-hero-photo"
          style={{
            position: 'relative',
            borderRadius: 18,
            overflow: 'hidden',
            minHeight: 560,
            opacity: 1,
            transform: m ? 'scale(1)' : 'scale(1.05)',
            transition: 'transform 1.4s cubic-bezier(.4,0,.2,1) .12s',
          }}
        >
          <Image
            src={asset('/assets/hero-speakers.webp')}
            alt="Резиденты Vision Club"
            fill
            sizes="(max-width: 820px) 100vw, 50vw"
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg,rgba(11,11,13,.05) 40%,rgba(11,11,13,.78) 100%)',
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08)',
              borderRadius: 18,
            }}
          />
          <div
            className="vc-hero-stats"
            style={{
              position: 'absolute',
              left: 22,
              bottom: 22,
              display: 'flex',
              gap: 12,
            }}
          >
            <StatChip num="220+" label="ТОП-предпринимателей в Дубае" />
            <StatChip num="1200" label="резидентов по миру через Альянс клубов" accent />
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectField({
  options,
  label,
  value,
  onChange,
}: {
  options: string[];
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="vc-na vc-field"
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          width: '100%',
          height: 60,
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 14,
          background: 'rgba(255,255,255,.015)',
          color: value ? 'var(--text)' : '#7C786F',
          fontSize: 15,
          padding: '0 40px 0 18px',
          outline: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="" disabled hidden>
          {label === 'Позиция' ? 'Ваша позиция' : 'Оборот бизнеса'}
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

function StatChip({ num, label, accent }: { num: string; label: string; accent?: boolean }) {
  return (
    <div
      className="vc-stat"
      style={{
        backdropFilter: 'blur(14px)',
        background: 'rgba(14,14,16,.55)',
        border: '1px solid rgba(255,255,255,.14)',
        borderRadius: 14,
        padding: '14px 18px',
        transition: 'transform .4s cubic-bezier(.2,.7,.2,1), border-color .4s',
      }}
    >
      <div
        className="osw"
        style={{
          fontWeight: 700,
          fontSize: 30,
          lineHeight: 1,
          color: accent ? 'var(--accent)' : 'var(--heading)',
        }}
      >
        {num}
      </div>
      <div style={{ fontSize: 12.5, color: '#B6B2A9', marginTop: 5 }}>{label}</div>
    </div>
  );
}
