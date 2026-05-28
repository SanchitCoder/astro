import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function LearnCard({ icon: Icon, title, description }: Props) {
  return (
    <div className="group glass-card glass-card-hover rounded-2xl border border-warm-300 p-6 card-lift cursor-default">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-400/20 text-gold-400 flex items-center justify-center mb-5 group-hover:shadow-[0_0_20px_rgba(216,138,34,0.3)] transition-shadow duration-300">
        <Icon size={18} />
      </div>
      <h3 className="font-cinzel text-sm font-bold text-ink-900 tracking-wide mb-2.5">{title}</h3>
      <p className="text-sm text-ink-500 leading-relaxed">{description}</p>
    </div>
  );
}
