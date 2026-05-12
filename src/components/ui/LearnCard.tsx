import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function LearnCard({ icon: Icon, title, description }: Props) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-premium transition card-lift shadow-sm">
      <div className="w-11 h-11 rounded-md bg-cta-500 text-white flex items-center justify-center mb-4">
        <Icon size={20} />
      </div>
      <h3 className="font-sans text-lg font-bold text-royal-900">{title}</h3>
      <p className="mt-2 text-sm text-charcoal-muted leading-relaxed">{description}</p>
    </div>
  );
}
