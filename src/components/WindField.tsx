import { useEffect, useRef } from 'react';

type WindFieldProps = {
  speedKn: number;
  directionDeg: number;
};

type Particle = { x: number; y: number; len: number; speed: number; opacity: number };

// Ambient full-bleed canvas: short streaks drifting in the real current
// wind direction for Tarifa, at a speed scaled from the real reading, so
// the background isn't decorative motion but a rough visualization of
// actual conditions. Meteorological direction is where wind comes FROM,
// so particles travel at direction + 180deg.
export function WindField({ speedKn, directionDeg }: WindFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0, height = 0;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const COUNT = 55;
    const travelRad = ((directionDeg + 180) * Math.PI) / 180;
    const dx = Math.sin(travelRad);
    const dy = -Math.cos(travelRad);
    // Map knots to a pleasant on-screen px/frame range.
    const speedScale = 0.05 + Math.min(speedKn, 35) * 0.045;

    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 18 + Math.random() * 26,
      speed: speedScale * (0.6 + Math.random() * 0.8),
      opacity: 0.08 + Math.random() * 0.16,
    }));

    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        ctx.strokeStyle = `hsl(${primary} / ${p.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - dx * p.len, p.y - dy * p.len);
        ctx.stroke();
      }
    };

    if (reducedMotion) {
      drawFrame();
      const onResize = () => { resize(); drawFrame(); };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const step = () => {
      for (const p of particlesRef.current) {
        p.x += dx * p.speed;
        p.y += dy * p.speed;
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;
      }
      drawFrame();
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speedKn, directionDeg]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
