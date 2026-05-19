type Props = {
  value: string;
  label: string;
  light?: boolean;
};

export function StatBlock({ value, label }: Props) {
  return (
    <div className="rounded-2xl glass-card border border-warm-300 px-4 py-3 text-center hover:border-gold-400/20 transition-colors">
      <div className="font-cinzel text-xl md:text-2xl font-bold text-gradient-gold">{value}</div>
      <div className="text-xs mt-1 text-ink-400 uppercase tracking-wide font-semibold leading-tight">
        {label}
      </div>
    </div>
  );
}
