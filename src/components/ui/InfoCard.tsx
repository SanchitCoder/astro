import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export function InfoCard({ icon: Icon, label, value }: Props) {
  return (
    <div className="rounded-lg bg-white/10 border border-white/15 backdrop-blur-md px-4 py-3 flex items-start gap-3">
      <div className="w-10 h-10 rounded-md bg-cta-500/25 text-cta-400 flex items-center justify-center shrink-0">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">{label}</div>
        <div className="text-sm md:text-base font-semibold text-white mt-0.5 leading-snug">{value}</div>
      </div>
    </div>
  );
}
