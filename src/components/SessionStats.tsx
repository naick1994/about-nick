import { AnimatedCounter } from '@/components/AnimatedCounter';

// Real logged kite session data, not decoration — the same kind of Woo
// readout he builds for other riders, applied to himself.
const SESSION_STATS = [
  { value: 18.6, decimals: 1, unit: 'm', label: 'Highest jump' },
  { value: 9.1, decimals: 1, unit: 's', label: 'Max airtime' },
  { value: 119, decimals: 0, unit: 'm', label: 'Max distance' },
  { value: 79, decimals: 0, unit: 'kmh', label: 'Max speed' },
];

export function SessionStats({ totalSessions }: { totalSessions: number }) {
  return (
    <div className="group relative rounded-xl border border-border bg-card/70 backdrop-blur px-5 py-4 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-hover)]">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
      <div className="flex items-baseline justify-between mb-4">
        <div className="text-[10px] font-mono tracking-widest uppercase text-primary">Session log</div>
        <div className="text-xs text-muted-foreground font-mono tabular-nums">
          <AnimatedCounter target={totalSessions} /> sessions logged
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {SESSION_STATS.map((s) => (
          <div key={s.label}>
            <div className="text-xl md:text-2xl font-bold tabular-nums leading-none">
              <AnimatedCounter target={s.value} decimals={s.decimals} />
              <span className="text-xs text-muted-foreground font-medium ml-0.5">{s.unit}</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1.5 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
