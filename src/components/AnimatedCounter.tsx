import { useEffect, useRef, useState } from 'react';

// Eases a displayed number up from 0 to `target` once the element scrolls
// into view. Snaps instantly under prefers-reduced-motion.
export function AnimatedCounter({ target, prefix = '', suffix = '', decimals = 0, duration = 1200 }: {
  target: number; prefix?: string; suffix?: string; decimals?: number; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || startedRef.current) return;
      startedRef.current = true;
      if (reducedMotion) { setValue(target); return; }
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(target * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref} className="tabular-nums">{prefix}{value.toFixed(decimals)}{suffix}</span>;
}
