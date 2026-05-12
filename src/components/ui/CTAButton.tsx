import type { LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outlineLight';

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
    'inline-flex items-center justify-center gap-2 font-semibold rounded-md shadow-md transition touch-manipulation disabled:opacity-60';
  const sizes = 'px-7 py-3.5 md:py-3.5 text-sm md:text-base';
  const variants: Record<Variant, string> = {
    primary: 'bg-cta-500 text-white hover:bg-cta-600 active:bg-cta-700',
    secondary: 'bg-royal-800 text-white hover:bg-royal-900',
    outlineLight: 'bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 shadow-none',
  };
  const width = fullWidth ? 'w-full' : '';

  return (
    <button className={`${base} ${sizes} ${variants[variant]} ${width} ${className}`} type="button" {...rest}>
      {children}
      {Icon ? <Icon size={18} /> : null}
    </button>
  );
}
