import type { CSSProperties } from 'react';
import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverEffect?: boolean;
}

export interface GlowingCardsProps {
  children: React.ReactNode;
  className?: string;
  enableGlow?: boolean;
  /** Spotlight radius in px */
  glowRadius?: number;
  glowOpacity?: number;
  animationDuration?: number;
  gap?: string;
  maxWidth?: string;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  responsive?: boolean;
  /** When set, replaces the default flex row/wrap layout (e.g. CSS grid for card grids) */
  childrenLayoutClassName?: string;
  customTheme?: {
    cardBg?: string;
    cardBorder?: string;
    textColor?: string;
    hoverBg?: string;
  };
}

export function GlowingCard({
  children,
  className,
  glowColor = '#3b82f6',
  hoverEffect = true,
  style,
  ...props
}: GlowingCardProps) {
  return (
    <div
      className={cn(
        'relative z-[1] flex min-h-full min-w-0 flex-1 flex-col rounded-2xl border-2 bg-white p-6 text-charcoal shadow-sm',
        'transition-all duration-300 ease-out',
        hoverEffect && 'hover:-translate-y-0.5 hover:shadow-premium',
        className,
      )}
      style={
        {
          ...style,
          '--glow-color': glowColor,
          borderColor: glowColor,
          boxShadow: '0 12px 28px -18px rgba(0, 51, 102, 0.12)',
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}

export function GlowingCards({
  children,
  className,
  enableGlow = true,
  glowRadius = 200,
  glowOpacity = 0.14,
  animationDuration = 500,
  gap = '1.25rem',
  maxWidth = '80rem',
  padding = '0',
  backgroundColor,
  borderRadius = '1rem',
  responsive = true,
  childrenLayoutClassName,
  customTheme,
}: GlowingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;

    if (!container || !spotlight || !enableGlow) return;

    spotlight.style.opacity = '0';
    spotlight.style.transition = `opacity ${animationDuration}ms ease-out`;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      spotlight.style.setProperty('--sx', `${x}px`);
      spotlight.style.setProperty('--sy', `${y}px`);
      spotlight.style.opacity = String(glowOpacity);
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = '0';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableGlow, glowOpacity, animationDuration]);

  const containerStyle = {
    '--gap': gap,
    '--max-width': maxWidth,
    '--padding': padding,
    '--border-radius': borderRadius,
    '--spot-radius': `${glowRadius}px`,
    backgroundColor: backgroundColor || undefined,
    ...customTheme,
  } as CSSProperties;

  const layoutClass =
    childrenLayoutClassName ??
    cn(
      'relative z-[1] flex w-full flex-wrap items-stretch justify-center gap-[var(--gap)]',
      responsive && 'flex-col sm:flex-row',
    );

  return (
    <div className={cn('relative w-full', className)} style={containerStyle}>
      <div ref={containerRef} className="relative mx-auto max-w-[var(--max-width)] overflow-hidden rounded-[var(--border-radius)]" style={{ padding }}>
        {enableGlow ? (
          <div
            ref={spotlightRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 select-none"
            style={{
              background:
                'radial-gradient(var(--spot-radius) var(--spot-radius) at var(--sx, 50%) var(--sy, 40%), rgba(41, 171, 226, 0.45), transparent 62%)',
              mixBlendMode: 'multiply',
            }}
          />
        ) : null}
        <div className={layoutClass}>{children}</div>
      </div>
    </div>
  );
}
