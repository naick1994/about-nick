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
    <div className="relative h-full flex flex-col rounded-lg border border-border px-5 py-4">
      <div className="flex items-baseline justify-between mb-4">
        <div className="text-xs text-muted-foreground">Session log</div>
        <div className="text-xs text-muted-foreground tabular-nums">
          {totalSessions} logged
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 flex-1 content-center">
        {SESSION_STATS.map((s) => (
          <div key={s.label} className="flex items-baseline justify-between gap-3">
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">{s.label}</span>
            <span className="text-lg font-medium tabular-nums whitespace-nowrap">
              {s.value.toFixed(s.decimals)}
              <span className="text-xs text-muted-foreground font-medium ml-0.5">{s.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
