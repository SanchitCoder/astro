type Props = {
  value: string;
  label: string;
  light?: boolean;
};

export function StatBlock({ value, label, light }: Props) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-center ${
        light
          ? 'bg-white/5 border-white/10 text-white'
          : 'bg-section border-slate-200 text-royal-900'
      }`}
    >
      <div className={`font-sans text-xl md:text-2xl font-bold ${light ? 'text-white' : 'text-gradient-gold'}`}>
        {value}
      </div>
      <div className={`text-xs mt-1 ${light ? 'text-white' : 'text-charcoal-muted'}`}>{label}</div>
    </div>
  );
}
