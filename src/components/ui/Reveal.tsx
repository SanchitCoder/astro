import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** When false, element fades out again after leaving the viewport */
  once?: boolean;
  /**
   * `default` — lift + opacity (section headings).
   * `fade` — opacity only; use with cards so `card-lift` hover transforms are not overridden.
   */
  variant?: 'default' | 'fade';
};

export function Reveal({ children, className = '', delay = 0, once = true, variant = 'default' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const motionClass = variant === 'fade' ? 'reveal-fade' : 'reveal';

  return (
    <div
      ref={ref}
      className={`${motionClass} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
