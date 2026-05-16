import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  dark?: boolean;
  /** Omit outer card shell — compose inside GlowingCard or similar wrappers */
  plain?: boolean;
};

export function FeatureTile({ icon: Icon, title, description, dark, plain }: Props) {
  const inner = (
    <>
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${
          dark ? 'bg-cta-500/20 text-cta-400' : 'bg-section text-royal-800'
        }`}
      >
        <Icon size={18} />
      </div>
      <h3 className={`font-serif text-lg font-semibold ${dark ? 'text-white' : 'text-royal-900'}`}>{title}</h3>
      <p className={`mt-1.5 text-sm ${dark ? 'text-white/70' : 'text-slate-600'}`}>{description}</p>
    </>
  );

  if (plain) {
    return <div className="flex flex-col items-start">{inner}</div>;
  }

  return (
    <div
      className={`card-lift rounded-lg border p-6 ${
        dark
          ? 'border-white/10 bg-white/5 backdrop-blur hover:bg-white/10'
          : 'border-slate-200 bg-white hover:shadow-premium'
      }`}
    >
      {inner}
    </div>
  );
}
