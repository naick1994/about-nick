import { AnimatedCounter } from '@/components/AnimatedCounter';

// Real logged kite session data, not decoration — the same kind of Woo
// readout he builds for other riders, applied to himself. Distance and
// speed (the session-level numbers) lead, then the two jump peaks.
const SESSION_STATS = [
  { value: 119, decimals: 0, unit: 'm', label: 'Max distance' },
  { value: 79, decimals: 0, unit: 'kmh', label: 'Max speed' },
  { value: 18.6, decimals: 1, unit: 'm', label: 'Max height' },
  { value: 9.1, decimals: 1, unit: 's', label: 'Max airtime' },
];

export function SessionStats({ totalSessions }: { totalSessions: number }) {
  return (
    <div className="group relative h-full flex flex-col rounded-xl border border-border bg-card/70 backdrop-blur px-5 py-4 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-hover)]">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
      <div className="flex items-baseline justify-between mb-4">
        <div className="text-[10px] font-mono tracking-widest uppercase text-primary">Session log</div>
        <div className="text-xs text-muted-foreground font-mono tabular-nums">
          <AnimatedCounter target={totalSessions} /> logged
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 flex-1 content-center">
        {SESSION_STATS.map((s) => (
          <div key={s.label} className="flex items-baseline justify-between gap-3">
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">{s.label}</span>
            <span className="text-lg font-bold tabular-nums whitespace-nowrap">
              <AnimatedCounter target={s.value} decimals={s.decimals} />
              <span className="text-xs text-muted-foreground font-medium ml-0.5">{s.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
