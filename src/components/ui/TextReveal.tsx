import React, { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const CLIP_STYLE: CSSProperties = {
  display: 'inline-block',
  overflow: 'hidden',
  verticalAlign: 'bottom',
  paddingBottom: '0.12em',
  marginBottom: '-0.12em',
};

function RevealUnit({
  delay,
  inView,
  children,
}: {
  delay: number;
  inView: boolean;
  children: ReactNode;
}) {
  return (
    <span style={CLIP_STYLE}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: '112%' }}
        animate={inView ? { y: '0%' } : { y: '112%' }}
        transition={{ duration: 0.7, delay, ease: [...EASE] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function processNode(
  child: ReactNode,
  counter: { n: number },
  baseDelay: number,
  stagger: number,
  inView: boolean,
): ReactNode {
  // <br /> — pass through unchanged so line breaks are preserved
  if (React.isValidElement(child) && child.type === 'br') return child;

  // Plain text — split into individual words
  if (typeof child === 'string') {
    const parts = child.split(/(\s+)/);
    return parts.map((part, i) => {
      if (/^\s+$/.test(part) || part === '') return part;
      const idx = counter.n++;
      return (
        <RevealUnit key={`w${idx}i${i}`} delay={baseDelay + idx * stagger} inView={inView}>
          {part}
        </RevealUnit>
      );
    });
  }

  // Any React element (gradient span, italic span, etc.) — single reveal unit
  if (React.isValidElement(child)) {
    const idx = counter.n++;
    return (
      <RevealUnit key={`e${idx}`} delay={baseDelay + idx * stagger} inView={inView}>
        {child}
      </RevealUnit>
    );
  }

  return child;
}

interface TextRevealProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** Initial delay before first word (seconds) */
  delay?: number;
  /** Delay between each word / element unit (seconds) */
  stagger?: number;
  /** If true, animation only fires once */
  once?: boolean;
}

/**
 * Wraps heading text so each word slides up from below an overflow-clip
 * when the element enters the viewport. Gradient spans and other inline
 * elements are treated as single reveal units, preserving their styles.
 */
export function TextReveal({
  as: Tag = 'div',
  className = '',
  style,
  children,
  delay = 0,
  stagger = 0.06,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: '0px 0px -6% 0px',
  });

  const counter = { n: 0 };
  const processed = React.Children.map(children, (child) =>
    processNode(child, counter, delay, stagger, inView),
  );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error – ref on unknown element type
    <Tag ref={ref} className={className} style={style}>
      {processed}
    </Tag>
  );
}
