import type { LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outlineLight' | 'gold';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
};

export function CTAButton({
  children,
  variant = 'primary',
  className = '',
  icon: Icon,
  fullWidth,
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 font-bold rounded-full shadow-md transition-all duration-300 touch-manipulation disabled:opacity-60 text-sm uppercase tracking-wide';
  const sizes = 'px-7 py-3.5';
  const variants: Record<Variant, string> = {
    gold: 'bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-cosmic-950 hover:shadow-gold-glow btn-shimmer',
    primary: 'bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-cosmic-950 hover:shadow-gold-glow btn-shimmer',
    secondary: 'glass-card border border-orange-200 text-ink-900 hover:border-gold-400/30 hover:text-gold-300',
    outlineLight: 'glass-card border border-orange-200 text-ink-900 hover:border-gold-400/30 hover:text-gold-300',
  };
  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${base} ${sizes} ${variants[variant]} ${width} ${className}`}
      type="button"
      {...rest}
    >
      {children}
      {Icon ? <Icon size={16} /> : null}
    </button>
  );
}
