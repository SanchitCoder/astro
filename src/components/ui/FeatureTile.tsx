import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  dark?: boolean;
  plain?: boolean;
};

export function FeatureTile({ icon: Icon, title, description, plain }: Props) {
  const inner = (
    <>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-nebula-600/15 border border-nebula-600/20 text-nebula-400">
        <Icon size={18} />
      </div>
      <h3 className="font-cinzel text-sm font-bold text-ink-900 tracking-wide mb-2">{title}</h3>
      <p className="text-sm text-ink-500 leading-relaxed">{description}</p>
    </>
  );

  if (plain) {
    return <div className="flex flex-col items-start">{inner}</div>;
  }

  return (
    <div className="glass-card glass-card-hover rounded-2xl border border-warm-300 p-6 card-lift">
      {inner}
    </div>
  );
}
