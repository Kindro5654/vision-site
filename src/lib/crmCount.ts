// Счётчик кликов в CRM («Трафик» → «Кнопка на сайте»). Лида не создаёт, в Meta не уходит.
const CRM_COUNT_URL = 'https://crm.vision-club.ae/api/webhooks/qr-scan';

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
// «простой» запрос без CORS-предзапроса. Сбой счётчика не должен мешать переходу.
export function countClick(source: string) {
  try {
    const body = JSON.stringify({ source, visitor: visitorId() });
    if (navigator.sendBeacon?.(CRM_COUNT_URL, body)) return;
    fetch(CRM_COUNT_URL, { method: 'POST', body, keepalive: true, mode: 'no-cors' }).catch(() => {});
  } catch {}
}
