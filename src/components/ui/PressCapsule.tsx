type Props = {
  label: string;
  variant?: 'light' | 'dark';
};

export function PressCapsule({ label }: Props) {
  return (
    <span className="inline-flex items-center rounded-full glass-card border border-warm-300 px-4 py-1.5 text-[11px] font-bold text-ink-500 uppercase tracking-wide hover:border-gold-400/25 hover:text-gold-300/70 transition-colors cursor-default">
      {label}
    </span>
  );
}
