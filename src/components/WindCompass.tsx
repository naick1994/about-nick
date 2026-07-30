const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const KITEABLE_KN = 20;

function compassLabel(deg: number) {
  return DIRECTIONS[Math.round(deg / 45) % 8];
}

// A little honest, wind-driven status: above kiteable threshold, he's
// probably on the water, not at the laptop.
function kiteStatus(speedKn: number) {
  if (speedKn >= KITEABLE_KN) {
    return {
      emoji: '🪁', text: 'Good wind, probably in the water',
      classes: 'bg-primary/15 border-primary/40 text-primary',
      dot: 'bg-primary',
    };
  }
  return {
    emoji: '💻', text: `Light wind (${Math.round(speedKn)}kn), probably at the desk`,
    classes: 'bg-muted/50 border-border text-muted-foreground',
    dot: 'bg-muted-foreground',
  };
}

// A live instrument dial: full compass ring with cardinal labels, a
// gradient-swept needle pointing where the wind is coming from (standard
// meteorological convention), plus gusts and temperature underneath.
export function WindCompass({ directionDeg, speedKn, gustsKn, temperatureC }: {
  directionDeg: number; speedKn: number; gustsKn: number; temperatureC: number;
}) {
  const status = kiteStatus(speedKn);
  return (
    <div className="group relative rounded-xl border border-border bg-card/70 backdrop-blur px-5 py-4 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-hover)]">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <defs>
              <radialGradient id="dialGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="40" cy="40" r="38" fill="url(#dialGlow)" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
            <circle cx="40" cy="40" r="27" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="1.5 3.5" />
            {['N', 'E', 'S', 'W'].map((label, i) => {
              const angle = i * 90;
              const rad = (angle * Math.PI) / 180;
              const x = 40 + Math.sin(rad) * 30;
              const y = 40 - Math.cos(rad) * 30;
              return (
                <text
                  key={label}
                  x={x} y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-muted-foreground"
                  style={{ fontSize: 7, fontWeight: 700, fontFamily: 'ui-monospace, monospace' }}
                >
                  {label}
                </text>
              );
            })}
            <g style={{ transform: `rotate(${directionDeg}deg)`, transformOrigin: '40px 40px', transition: 'transform 0.9s cubic-bezier(0.25,0.1,0.25,1)' }}>
              <line x1="40" y1="40" x2="40" y2="14" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="40" cy="14" r="3" fill="hsl(var(--primary))" />
              <circle cx="40" cy="14" r="6" fill="hsl(var(--primary))" opacity="0.25" className="motion-safe:animate-pulse" />
            </g>
            <circle cx="40" cy="40" r="2.5" fill="hsl(var(--foreground))" />
          </svg>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-primary mb-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            Tarifa · live wind
          </div>
          <div className="text-2xl font-bold tabular-nums leading-none">
            {Math.round(speedKn)}<span className="text-xs font-medium text-muted-foreground ml-1">kn</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-mono tabular-nums">
            from {compassLabel(directionDeg)} · gusts {Math.round(gustsKn)}kn · {Math.round(temperatureC)}°C
          </div>
        </div>
      </div>

      <div className={`mt-3 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.classes}`}>
        <span className="relative flex h-2 w-2 shrink-0">
          <span className={`motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full ${status.dot} opacity-75`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${status.dot}`} />
        </span>
        <span className="motion-safe:animate-pulse">{status.emoji} {status.text}</span>
      </div>
    </div>
  );
}
