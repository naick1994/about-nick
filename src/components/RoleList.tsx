import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export type RoleItem = {
  title: string; org: string; orgUrl?: string; period: string; desc: string[];
  logo?: string; logoScale?: number; era: string;
};

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSeen(true); },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [seen]);
  return { ref, seen };
}

function RoleRow({ item, index, isOpen, onToggle }: {
  item: RoleItem; index: number; isOpen: boolean; onToggle: () => void;
}) {
  const { ref, seen } = useInViewOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="relative border-b border-border last:border-b-0 group/row"
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateX(0)' : 'translateX(-16px)',
        transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`,
      }}
    >
      <div
        className="absolute -left-4 top-0 bottom-0 w-[3px] bg-primary origin-top scale-y-0 group-hover/row:scale-y-100 transition-transform duration-300"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary/[0.03] opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative w-full flex items-center gap-4 py-4 pl-4 -ml-4 pr-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
      >
        {item.logo ? (
          <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-card border border-border transition-transform duration-300 group-hover/row:scale-110">
            <img
              src={item.logo}
              alt={`${item.org} logo`}
              className="w-full h-full object-contain"
              style={item.logoScale ? { transform: `scale(${item.logoScale})` } : undefined}
            />
          </div>
        ) : (
          <div className="w-11 h-11 rounded-lg shrink-0 bg-card border border-border" />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[15px] transition-colors duration-200 group-hover/row:text-primary">{item.title}</span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-primary/80 border border-primary/30 rounded-full px-1.5 py-0.5 shrink-0">
              {item.era}
            </span>
          </div>
          <div className="text-sm text-muted-foreground truncate">{item.org}</div>
        </div>

        <div className="text-[11px] text-muted-foreground/70 font-mono tabular-nums shrink-0 hidden sm:block">
          {item.period}
        </div>
        <ChevronDown
          className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden"
          >
            <div className="pl-[60px] pb-4 -mt-1">
              <div className="text-[11px] text-muted-foreground/70 font-mono tabular-nums mb-2 sm:hidden">
                {item.period}
              </div>
              {item.orgUrl && (
                <a
                  href={item.orgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline underline-offset-2 mb-2 inline-block"
                >
                  {item.orgUrl.replace(/^https?:\/\//, '')}
                </a>
              )}
              {item.desc.length > 0 && (
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                  {item.desc.map((line) => <li key={line}>{line}</li>)}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Expandable role index. No filters, no forced sequence: a fast list
// that reveals itself with a stagger as it scrolls in, and opens on
// demand.
export function RoleList({ items }: { items: RoleItem[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="border-t border-border">
      {items.map((item, i) => {
        const key = item.title + item.org;
        return (
          <RoleRow
            key={key}
            item={item}
            index={i}
            isOpen={openKey === key}
            onToggle={() => setOpenKey(openKey === key ? null : key)}
          />
        );
      })}
    </div>
  );
}
