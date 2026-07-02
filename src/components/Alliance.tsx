'use client';
import { useEffect, useRef, useState } from 'react';
import { useMounted, reveal } from '@/lib/useMounted';

const CLUBS = [
  { short: 'Wake UP!', name: 'Wake UP! Business club', country: 'США', lat: 40, lon: -98 },
  { short: 'LBC', name: 'London Business Club', country: 'Великобритания', lat: 51, lon: -1 },
  { short: 'BIZON', name: 'BIZON Business Club', country: 'Польша', lat: 52, lon: 20 },
  { short: 'CAPITAL', name: 'Club CAPITAL', country: 'Армения', lat: 40, lon: 45 },
  { short: 'YARD', name: 'YARD Business Club', country: 'Узбекистан', lat: 41, lon: 64 },
  { short: 'GROW', name: 'GROW Business Club', country: 'Кипр', lat: 35, lon: 33 },
  { short: 'JEWISH', name: 'Jewish Business Club', country: 'Израиль', lat: 31, lon: 35 },
  { short: 'vision', name: 'Vision Club Dubai', country: 'ОАЭ', lat: 25, lon: 55 },
  { short: 'HILL', name: 'HILL CLUB', country: 'Таиланд', lat: 15, lon: 100 },
];

const HUB_IDX = CLUBS.findIndex((c) => c.short === 'vision');

const LAND: ReadonlyArray<readonly [number, number, number, number]> = [
  // North America
  [72, 60, -168, -58], [60, 48, -140, -58], [49, 30, -125, -70], [30, 16, -112, -90], [17, 8, -92, -78],
  // Greenland
  [83, 60, -52, -20],
  // South America
  [11, -5, -80, -50], [-5, -23, -79, -36], [-23, -40, -73, -53], [-40, -54, -75, -65],
  // Europe
  [71, 55, -9, 45], [55, 44, -5, 30], [46, 36, -9, 28], [60, 50, -8, 1],
  // Africa
  [37, 18, -16, 33], [18, 2, -16, 48], [2, -18, 9, 42], [-18, -34, 14, 33],
  // Middle East
  [40, 13, 34, 60],
  // Asia
  [75, 52, 42, 180], [52, 40, 48, 143], [42, 28, 52, 122], [35, 8, 68, 97], [28, 8, 95, 120],
  // Australia
  [-11, -38, 114, 153],
  // Indonesia / islands
  [6, -9, 96, 140],
  // Japan
  [45, 32, 131, 143],
  // Madagascar
  [-12, -25, 43, 50],
];

const ACCENT = '#E96B1E';

export default function Alliance() {
  const m = useMounted();
  const [hov, setHov] = useState<number | null>(null);
  const [sel, setSel] = useState<number>(HUB_IDX);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ angle: -26 * (Math.PI / 180), target: null as number | null, drag: false, pause: 0, hov: hov, sel: sel });

  useEffect(() => { stateRef.current.hov = hov; }, [hov]);
  useEffect(() => { stateRef.current.sel = sel; }, [sel]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d')!;
    const tilt = 0.62;

    // Mutable dims — updated on resize, read by draw loop.
    let size = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let dotScale = 1;

    const fitCanvas = () => {
      const host = cv.parentElement;
      const avail = host ? host.clientWidth : 320;
      // Cap by both desktop max (540) and viewport width minus a safety margin
      const cap = Math.min(540, Math.max(0, window.innerWidth - 32));
      size = Math.round(Math.max(240, Math.min(cap, avail)));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      dotScale = size < 430 ? 1.7 : 1;
      cv.width = size * dpr;
      cv.height = size * dpr;
      cv.style.width = size + 'px';
      cv.style.height = size + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = size / 2;
      cy = size / 2;
      R = size * 0.4;
    };

    fitCanvas();

    const landAt = (x: number, y: number, z: number) => {
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (Math.atan2(x, z) * 180) / Math.PI;
      for (const L of LAND) if (lat <= L[0] && lat >= L[1] && lon >= L[2] && lon <= L[3]) return true;
      return false;
    };

    const N = 5200;
    const GA = Math.PI * (3 - Math.sqrt(5));
    const pts: Array<[number, number, number, boolean]> = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * GA;
      const x = Math.cos(th) * r;
      const z = Math.sin(th) * r;
      pts.push([x, y, z, landAt(x, y, z)]);
    }
    const D2R = Math.PI / 180;
    const markers: Array<[number, number, number]> = CLUBS.map((c) => {
      const la = c.lat * D2R;
      const lo = c.lon * D2R;
      return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
    });

    const screen: Array<[number, number] | null> = new Array(markers.length).fill(null);

    const rot = (px: number, py: number, pz: number, a: number) => {
      const x = px * Math.cos(a) + pz * Math.sin(a);
      const z = -px * Math.sin(a) + pz * Math.cos(a);
      const y1 = py * Math.cos(tilt) - z * Math.sin(tilt);
      const z1 = py * Math.sin(tilt) + z * Math.cos(tilt);
      return [x, y1, z1] as [number, number, number];
    };

    const draw = (now: number) => {
      const S = stateRef.current;
      if (S.target !== null) {
        S.angle += (S.target - S.angle) * 0.08;
        if (Math.abs(S.target - S.angle) < 0.003) {
          S.angle = S.target;
          S.target = null;
          S.pause = now + 2600;
        }
      } else if (!S.drag && now > S.pause) {
        S.angle += 0.0035;
      }
      const a = S.angle;
      ctx.clearRect(0, 0, size, size);

      // atmosphere
      const atm = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.16);
      atm.addColorStop(0, 'rgba(233,107,30,0.22)');
      atm.addColorStop(1, 'rgba(233,107,30,0)');
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.16, 0, 7);
      ctx.fill();

      // sphere body
      const g = ctx.createRadialGradient(cx - R * 0.32, cy - R * 0.36, R * 0.2, cx, cy, R);
      g.addColorStop(0, '#26262C');
      g.addColorStop(0.6, '#17171B');
      g.addColorStop(1, '#0C0C0F');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 7);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 7);
      ctx.stroke();

      // surface dots
      const focusActive = S.hov !== null || S.sel !== null;
      const dim = focusActive ? 0.4 : 1;
      for (let i = 0; i < N; i++) {
        const pt = pts[i];
        const p = rot(pt[0], pt[1], pt[2], a);
        if (p[2] <= 0.02) continue;
        const sx = cx + p[0] * R;
        const sy = cy - p[1] * R;
        if (pt[3]) {
          ctx.fillStyle = `rgba(222,218,210,${(0.5 + 0.45 * p[2]) * dim})`;
          ctx.beginPath();
          ctx.arc(sx, sy, (0.72 + p[2] * 1.05) * dotScale, 0, 7);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(120,122,130,${(0.03 + 0.07 * p[2]) * dim})`;
          ctx.beginPath();
          ctx.arc(sx, sy, (0.4 + p[2] * 0.42) * dotScale, 0, 7);
          ctx.fill();
        }
      }

      // connections from hub
      const mr = markers.map((mk) => rot(mk[0], mk[1], mk[2], a));
      for (let i = 0; i < mr.length; i++) {
        if (i === HUB_IDX) continue;
        const A = mr[HUB_IDX];
        const B = mr[i];
        if (A[2] <= 0 || B[2] <= 0) continue;
        let mxv = markers[HUB_IDX][0] + markers[i][0];
        let myv = markers[HUB_IDX][1] + markers[i][1];
        let mzv = markers[HUB_IDX][2] + markers[i][2];
        const ln = Math.hypot(mxv, myv, mzv) || 1;
        mxv = (mxv / ln) * 1.22;
        myv = (myv / ln) * 1.22;
        mzv = (mzv / ln) * 1.22;
        const M = rot(mxv, myv, mzv, a);
        const onLink = S.hov === i || S.sel === i;
        ctx.strokeStyle = onLink ? 'rgba(233,107,30,0.9)' : 'rgba(233,107,30,0.3)';
        ctx.lineWidth = onLink ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(cx + A[0] * R, cy - A[1] * R);
        ctx.quadraticCurveTo(cx + M[0] * R, cy - M[1] * R, cx + B[0] * R, cy - B[1] * R);
        ctx.stroke();
      }

      let label: { name: string; sx: number; sy: number } | null = null;
      for (let i = 0; i < mr.length; i++) {
        const p = mr[i];
        const sx = cx + p[0] * R;
        const sy = cy - p[1] * R;
        const front = p[2] > 0;
        screen[i] = front ? [sx, sy] : null;
        if (!front) continue;
        const on = i === S.hov || i === S.sel;
        const rad = (on ? 7 : 4.5) * dotScale;
        const gl = ctx.createRadialGradient(sx, sy, 0, sx, sy, rad * 3.4);
        gl.addColorStop(0, on ? 'rgba(233,107,30,0.85)' : 'rgba(233,107,30,0.45)');
        gl.addColorStop(1, 'rgba(233,107,30,0)');
        ctx.fillStyle = gl;
        ctx.beginPath();
        ctx.arc(sx, sy, rad * 3.4, 0, 7);
        ctx.fill();
        ctx.fillStyle = ACCENT;
        ctx.beginPath();
        ctx.arc(sx, sy, rad, 0, 7);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(sx, sy, rad * 0.34, 0, 7);
        ctx.fill();
        if (on) {
          ctx.strokeStyle = 'rgba(233,107,30,0.6)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(sx, sy, rad + 5, 0, 7);
          ctx.stroke();
          label = { name: CLUBS[i].name, sx, sy };
        }
      }

      if (label) {
        ctx.font = `600 14px var(--font-golos), 'Golos Text', sans-serif`;
        const w = ctx.measureText(label.name).width;
        const lx = Math.min(Math.max(label.sx + 14, 8), size - w - 18);
        const ly = label.sy - 13;
        ctx.fillStyle = 'rgba(10,10,12,0.92)';
        ctx.beginPath();
        if ((ctx as any).roundRect) (ctx as any).roundRect(lx - 9, ly - 16, w + 18, 25, 8);
        else ctx.rect(lx - 9, ly - 16, w + 18, 25);
        ctx.fill();
        ctx.strokeStyle = 'rgba(233,107,30,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#F4F1EC';
        ctx.fillText(label.name, lx, ly);
      }
    };

    let raf = 0;
    const loop = () => {
      draw(performance.now());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const hit = (e: PointerEvent) => {
      const rct = cv.getBoundingClientRect();
      const mx = (e.clientX - rct.left) * (size / rct.width);
      const my = (e.clientY - rct.top) * (size / rct.height);
      let best: number | null = null;
      let bd = 22;
      for (let i = 0; i < screen.length; i++) {
        const s = screen[i];
        if (!s) continue;
        const d = Math.hypot(s[0] - mx, s[1] - my);
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      return best;
    };
    let downX = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      stateRef.current.drag = true;
      downX = e.clientX;
      moved = false;
      stateRef.current.target = null;
      cv.style.cursor = 'grabbing';
      cv.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (stateRef.current.drag) {
        const dx = e.clientX - downX;
        if (Math.abs(dx) > 3) moved = true;
        stateRef.current.angle += dx * 0.006;
        downX = e.clientX;
      } else {
        const h = hit(e);
        if (h !== stateRef.current.hov) setHov(h);
        cv.style.cursor = h !== null ? 'pointer' : 'grab';
      }
    };
    const endDrag = () => {
      stateRef.current.drag = false;
      stateRef.current.pause = performance.now() + 1800;
      cv.style.cursor = 'grab';
    };
    const onUp = (e: PointerEvent) => {
      if (!moved) {
        const h = hit(e);
        if (h !== null) {
          setSel(h);
          stateRef.current.target = -CLUBS[h].lon * D2R;
        }
      }
      endDrag();
    };
    const onLeave = () => {
      stateRef.current.drag = false;
      setHov(null);
    };
    cv.addEventListener('pointerdown', onDown);
    cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerup', onUp);
    cv.addEventListener('pointerleave', onLeave);

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => fitCanvas());
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      cv.removeEventListener('pointerdown', onDown);
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerup', onUp);
      cv.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  const selectClub = (i: number) => {
    setSel(i);
    stateRef.current.target = -CLUBS[i].lon * (Math.PI / 180);
  };

  return (
    <section
      className="vc-sec"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--text)',
        overflow: 'hidden',
        padding: '80px 48px 92px',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '24%',
          transform: 'translate(-50%,-50%)',
          width: 760,
          height: 760,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(233,107,30,.12),transparent 62%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="vc-alliance-grid"
        style={{
          position: 'relative',
          maxWidth: 1600,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.02fr',
          gap: 56,
          alignItems: 'center',
          ...reveal(m, 0.05),
        }}
      >
        <div
          className="vc-globe-wrap"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 560,
          }}
        >
          <canvas ref={canvasRef} style={{ display: 'block', cursor: 'grab' }} aria-label="Карта международного Альянса клубов" />
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            <span className="eyebrow-line" />
            <span className="eyebrow-text">Альянс клубов</span>
          </div>
          <h2
            className="osw vc-allnce-head"
            style={{
              fontWeight: 700,
              fontSize: 46,
              lineHeight: 1.04,
              letterSpacing: '.01em',
              textTransform: 'uppercase',
              color: 'var(--heading)',
            }}
          >
            Vision <span style={{ color: 'var(--accent)' }}>—</span> часть международного альянса
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--muted)', marginTop: 18, maxWidth: 560 }}>
            Каждый резидент получает доступ к предпринимателям из США, Европы, Азии и Ближнего Востока,
            участвует в международных саммитах и формирует связи за пределами своей страны.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 22 }}>
            {['1200+ предпринимателей', '10 стран', 'слёты', 'решение запросов'].map((p) => (
              <span
                key={p}
                style={{
                  border: '1px solid rgba(233,107,30,.4)',
                  borderRadius: 999,
                  padding: '9px 18px',
                  fontSize: 14.5,
                  color: '#EDEAE4',
                }}
              >
                {p}
              </span>
            ))}
          </div>

          <div
            className="vc-allnce-clubs"
            style={{
              marginTop: 26,
              borderTop: '1px solid rgba(255,255,255,.1)',
              paddingTop: 8,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2px 18px',
            }}
          >
            {CLUBS.map((c, i) => {
              const active = i === sel;
              const hovd = i === hov;
              return (
                <div
                  key={c.short}
                  className="vc-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '11px 12px',
                    borderRadius: 11,
                    cursor: 'pointer',
                    background: active ? 'rgba(233,107,30,.12)' : hovd ? 'rgba(255,255,255,.05)' : undefined,
                    border: active ? '1px solid rgba(233,107,30,.4)' : '1px solid transparent',
                  }}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  onClick={() => selectClub(i)}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: active || hovd ? ACCENT : '#C85A1B',
                      boxShadow: active || hovd ? '0 0 8px rgba(233,107,30,.8)' : 'none',
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      color: '#F1EEE8',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {c.name}
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: 13,
                      color: active ? ACCENT : 'var(--muted-2)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {c.country}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
