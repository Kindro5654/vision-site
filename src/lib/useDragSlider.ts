'use client';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Drag-to-scroll horizontal slider behavior matching the reference.
 * Returns a ref to attach to the scroll track and a step() function for arrow buttons.
 */
export function useDragSlider(stepPx = 432) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const snapTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = false;

    const onDown = (e: PointerEvent) => {
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const up = () => {
      down = false;
      el.style.cursor = 'grab';
    };
    const onClickCapture = (e: Event) => {
      if (moved) e.preventDefault();
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointerleave', up);
    el.addEventListener('click', onClickCapture, true);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointerleave', up);
      el.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  const step = useCallback(
    (dir: -1 | 1) => {
      const el = ref.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      const start = el.scrollLeft;
      const target = Math.max(0, Math.min(max, start + dir * stepPx));
      el.style.scrollSnapType = 'none';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const t0 = performance.now();
      const dur = 430;
      const ease = (k: number) => 1 - Math.pow(1 - k, 3);
      const anim = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        el.scrollLeft = start + (target - start) * ease(k);
        if (k < 1) rafRef.current = requestAnimationFrame(anim);
        else {
          el.scrollLeft = target;
          el.style.scrollSnapType = '';
        }
      };
      rafRef.current = requestAnimationFrame(anim);
      if (snapTimerRef.current) window.clearTimeout(snapTimerRef.current);
      snapTimerRef.current = window.setTimeout(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        el.scrollLeft = target;
        el.style.scrollSnapType = '';
      }, dur + 200);
    },
    [stepPx]
  );

  return { ref, step };
}
