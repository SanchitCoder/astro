type Props = {
  label: string;
  variant?: 'light' | 'dark';
};

export function PressCapsule({ label, variant = 'light' }: Props) {
  return (
    <span
      className={
        variant === 'dark'
          ? 'inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm'
          : 'inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-royal-800 shadow-sm'
      }
    >
      {label}
    </span>
  );
}
