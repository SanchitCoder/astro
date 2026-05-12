import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  dark?: boolean;
};

export function FeatureTile({ icon: Icon, title, description, dark }: Props) {
  return (
    <div
      className={`rounded-lg border p-6 card-lift ${
        dark
          ? 'bg-white/5 border-white/10 backdrop-blur hover:bg-white/10'
          : 'bg-white border-slate-200 hover:shadow-premium'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
          dark ? 'bg-cta-500/20 text-cta-400' : 'bg-section text-royal-800'
        }`}
      >
        <Icon size={18} />
      </div>
      <h3 className={`font-serif text-lg font-semibold ${dark ? 'text-white' : 'text-royal-900'}`}>{title}</h3>
      <p className={`mt-1.5 text-sm ${dark ? 'text-white/70' : 'text-slate-600'}`}>{description}</p>
    </div>
  );
}
