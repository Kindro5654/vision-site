'use client';
import { useEffect, useState } from 'react';

export function useMounted(delay = 80) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setM(true), delay);
    return () => window.clearTimeout(id);
  }, [delay]);
  return m;
}

export function reveal(mounted: boolean, delay = 0): React.CSSProperties {
  return mounted
    ? {
        opacity: 1,
        transform: 'translateY(0)',
        transition: `transform .7s cubic-bezier(.4,0,.2,1) ${delay}s, opacity .7s ease ${delay}s`,
      }
    : { opacity: 1, transform: 'translateY(18px)' };
}
