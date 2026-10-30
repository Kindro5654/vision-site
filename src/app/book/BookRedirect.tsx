'use client';

import { useEffect } from 'react';
import { META_PIXEL_ID } from '@/lib/site';

// Сменился менеджер или username — меняется только эта строка.
export const TG_URL =
  'https://t.me/manager_vision_club?text=' +
  encodeURIComponent('Здравствуйте! Пишу по поводу вступления в Vision Club');

// fbq отправляет события только после загрузки своего конфига (до секунды и дольше),
// при быстром переходе они теряются. Поэтому скан шлём прямым запросом к пикселю
// и уходим в Telegram, как только он ответил, но не позже MAX_WAIT_MS.
const MAX_WAIT_MS = 1500;

// Счётчик сканов в CRM («Трафик» → «QR из книги»). Лида не создаёт.
const CRM_SCAN_URL = 'https://crm.vision-club.ae/api/webhooks/qr-scan';

function visitorId(): string | null {
  try {
    let id = localStorage.getItem('vc_visitor');
    if (!id) {
      id = (crypto.randomUUID?.() ?? `${Date.now()}${Math.random()}`).replace(/[^A-Za-z0-9]/g, '');
      localStorage.setItem('vc_visitor', id);
    }
    return id;
  } catch {
    return null;
  }
}

// sendBeacon доживает до конца даже после перехода; строка уходит как text/plain —
// «простой» запрос без CORS-предзапроса.
function sendCrmScan() {
  const body = JSON.stringify({ source: 'book', visitor: visitorId() });
  try {
    if (navigator.sendBeacon?.(CRM_SCAN_URL, body)) return;
  } catch {}
  fetch(CRM_SCAN_URL, { method: 'POST', body, keepalive: true, mode: 'no-cors' }).catch(() => {});
}

function pixelUrl() {
  const fbp = document.cookie.match(/(?:^|; )_fbp=([^;]+)/)?.[1];
  const q = new URLSearchParams({
    id: META_PIXEL_ID,
    ev: 'QR_Book_Scan',
    dl: window.location.href,
    rl: document.referrer,
    ts: String(Date.now()),
    'cd[source]': 'book',
  });
  if (fbp) q.set('fbp', fbp);
  return `https://www.facebook.com/tr?${q}`;
}

export default function BookRedirect() {
  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.replace(TG_URL);
    };

    sendCrmScan();
    const img = new Image();
    img.onload = img.onerror = go;
    img.src = pixelUrl();
    try {
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', 'qr_book_scan', { source: 'book' });
    } catch {}

    const timer = setTimeout(go, MAX_WAIT_MS);
    return () => {
      done = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#0B0B0D',
        color: '#EDEAE4',
        fontFamily: 'system-ui, sans-serif',
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div>
        <p>Открываем Telegram…</p>
        <p>
          <a href={TG_URL} style={{ color: '#F2851B' }}>
            Нажмите, если чат не открылся
          </a>
        </p>
      </div>
    </main>
  );
}
