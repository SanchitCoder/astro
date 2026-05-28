import type { CSSProperties } from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

const SIGNS = [
  { id: 'aries', name: 'Aries', glyph: '\u2648' },
  { id: 'taurus', name: 'Taurus', glyph: '\u2649' },
  { id: 'gemini', name: 'Gemini', glyph: '\u264A' },
  { id: 'cancer', name: 'Cancer', glyph: '\u264B' },
  { id: 'leo', name: 'Leo', glyph: '\u264C' },
  { id: 'virgo', name: 'Virgo', glyph: '\u264D' },
  { id: 'libra', name: 'Libra', glyph: '\u264E' },
  { id: 'scorpio', name: 'Scorpio', glyph: '\u264F' },
  { id: 'sagittarius', name: 'Sagittarius', glyph: '\u2650' },
  { id: 'capricorn', name: 'Capricorn', glyph: '\u2651' },
  { id: 'aquarius', name: 'Aquarius', glyph: '\u2652' },
  { id: 'pisces', name: 'Pisces', glyph: '\u2653' },
] as const;

type Sign = (typeof SIGNS)[number];

function StarField({ seed }: { seed: string }) {
  const stars = useMemo(() => {
    let h = 0;
    const rand = () => {
      h = (h * 9301 + 49297) % 233280;
      return h / 233280;
    };
    for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i) * 997) % 233280;
    return Array.from({ length: 72 }, () => {
      rand();
      return {
        left: `${rand() * 100}%`,
        top: `${rand() * 100}%`,
        size: rand() * 1.6 + 0.35,
        delay: `${rand() * -14}s`,
        duration: `${10 + rand() * 9}s`,
      };
    });
  }, [seed]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white zodiac-star-twinkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}

function DustMotes({ seed }: { seed: string }) {
  const motes = useMemo(() => {
    let h = 216;
    const rand = () => {
      h = (h * 1103515245 + 12345) % 2147483648;
      return (h & 2147483647) / 2147483647;
    };
    for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i) * 131) >>> 0;
    return Array.from({ length: 18 }, () => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      delay: `${rand() * -20}s`,
      duration: `${18 + rand() * 16}s`,
      driftX: (rand() - 0.5) * 28,
      scale: 0.4 + rand() * 0.9,
    }));
  }, [seed]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen" aria-hidden>
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-tr from-cta-400/50 via-white/80 to-gold-300/40 blur-[0.5px] zodiac-mote-drift opacity-60"
          style={{
            left: m.left,
            top: m.top,
            animationDelay: m.delay,
            animationDuration: m.duration,
            ['--z-drift-x' as string]: `${m.driftX}px`,
            ['--z-mote-scale' as string]: String(m.scale),
          }}
        />
      ))}
    </div>
  );
}

function ZodiacCell({
  sign,
  floatDelay,
  stripId,
  interactive,
}: {
  sign: Sign;
  floatDelay: number;
  stripId: number;
  interactive: boolean;
}) {
  const uid = useId();
  const tipId = `zodiac-tip-${sign.id}-${stripId}-${uid.replace(/:/g, '')}`;

  return (
    <div
      className="group relative flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center md:h-[5.25rem] md:w-[5.25rem] zodiac-depth-tilt"
      style={{ ['--z-float-delay' as string]: `${floatDelay}s` }}
    >
      <div
        className="relative z-10 flex h-[4.25rem] w-[4.25rem] items-center justify-center md:h-[5.25rem] md:w-[5.25rem] rounded-full border border-warm-300 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(0,0,0,0.35)] outline-none transition-[transform,box-shadow,filter,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform focus-visible:ring-2 focus-visible:ring-cta-400/60 group-hover:z-20 group-hover:scale-[1.12] group-hover:border-cta-400/35 group-hover:shadow-[0_0_0_1px_rgba(0,94,168,0.25),0_18px_50px_-12px_rgba(0,0,0,0.65),0_0_40px_rgba(0,94,168,0.22)] motion-reduce:transition-none"
        tabIndex={interactive ? 0 : -1}
        role={interactive ? 'img' : undefined}
        aria-labelledby={interactive ? tipId : undefined}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-cta-500/15 via-transparent to-gold-400/10 opacity-70 blur-md transition-opacity duration-500 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(0,94,168,0.35),transparent_62%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <span
          className="relative zodiac-icon-float inline-flex select-none bg-gradient-to-b from-[#FBE7C7] from-25% via-[#D88A22] to-[#9A5E14] bg-clip-text font-serif text-[2.1rem] leading-none text-transparent drop-shadow-[0_0_14px_rgba(216,138,34,0.5)] transition-[transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[2.65rem] group-hover:scale-[1.06] group-hover:drop-shadow-[0_0_22px_rgba(0,94,168,0.55),0_0_36px_rgba(216,138,34,0.4)] motion-reduce:group-hover:scale-100"
          style={{ fontFamily: '"Cormorant Garamond", "Apple Symbols", "Segoe UI Symbol", serif' }}
        >
          {sign.glyph}
        </span>
      </div>

      {interactive ? (
        <span id={tipId} className="sr-only">
          {sign.name}
        </span>
      ) : null}

      <div
        className="pointer-events-none absolute bottom-[calc(100%+0.65rem)] left-1/2 z-30 min-w-[7.5rem] -translate-x-1/2 translate-y-1 scale-[0.97] rounded-xl border border-orange-200 bg-white px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700 opacity-0 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-within:opacity-100"
        aria-hidden
      >
        <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/12 bg-white" />
        {sign.name}
      </div>
    </div>
  );
}

function MarqueeStrip({ stripId }: { stripId: number }) {
  const interactive = stripId === 0;
  return (
    <div
      className="flex shrink-0 items-center gap-x-6 md:gap-x-7"
      aria-hidden={!interactive}
    >
      {SIGNS.map((sign, i) => (
        <ZodiacCell
          key={`${stripId}-${sign.id}`}
          sign={sign}
          floatDelay={i * 0.42}
          stripId={stripId}
          interactive={interactive}
        />
      ))}
    </div>
  );
}

export function ZodiacMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [fineMotion, setFineMotion] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMq = window.matchMedia('(max-width: 639px)');
    const update = () => {
      setFineMotion(!reducedMq.matches);
      setIsMobile(mobileMq.matches);
    };
    update();
    reducedMq.addEventListener('change', update);
    mobileMq.addEventListener('change', update);
    return () => {
      reducedMq.removeEventListener('change', update);
      mobileMq.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !fineMotion || isMobile) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty('--zm-parallax-x', x.toFixed(4));
        el.style.setProperty('--zm-parallax-y', y.toFixed(4));
      });
    };

    const reset = () => {
      el.style.setProperty('--zm-parallax-x', '0');
      el.style.setProperty('--zm-parallax-y', '0');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', reset);
    };
  }, [fineMotion, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-y border-warm-200 bg-[#030712] pt-4 pb-6 md:pt-5 md:pb-7"
      style={
        {
          ['--zm-parallax-x' as string]: '0',
          ['--zm-parallax-y' as string]: '0',
        } as CSSProperties
      }
      aria-labelledby="zodiac-marquee-heading"
    >
      <h2 id="zodiac-marquee-heading" className="sr-only">
        The twelve zodiac signs in continuous motion
      </h2>
      <div
        className="pointer-events-none absolute inset-0 opacity-90 transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{
          transform: fineMotion
            ? 'translate3d(calc(var(--zm-parallax-x) * 22px), calc(var(--zm-parallax-y) * 16px), 0)'
            : undefined,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(0,94,168,0.16),transparent_55%),radial-gradient(ellipse_90%_60%_at_100%_50%,rgba(216,138,34,0.09),transparent_45%),radial-gradient(ellipse_80%_50%_at_0%_60%,rgba(0,45,96,0.22),transparent_50%)]" />
        <div
          className="absolute -left-1/4 top-1/2 h-[120%] w-[80%] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,94,168,0.12),transparent)] blur-3xl motion-safe:animate-zodiac-nebula-drift"
          aria-hidden
        />
        <div
          className="absolute -right-1/4 top-0 h-[85%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(216,138,34,0.1),transparent)] blur-3xl motion-safe:animate-zodiac-nebula-drift-reverse"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-soft-light motion-safe:animate-zodiac-slow-pan"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, transparent 0, transparent 80px, rgba(255,255,255,0.02) 80px, rgba(255,255,255,0.02) 82px)',
          }}
          aria-hidden
        />
      </div>

      <StarField seed="gurudev-anand-zodiac-v1" />
      <DustMotes seed="motes-v1" />

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.92)_0%,transparent_4%,transparent_96%,rgba(3,7,18,0.92)_100%)]"
        aria-hidden
      />

      <div
        className="relative z-[2] w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]"
        style={isMobile ? undefined : { perspective: '1400px' }}
      >
        <div
          className={`flex flex-nowrap px-2 sm:px-3 md:px-4 ${
            fineMotion
              ? `w-max zodiac-marquee-track${isMobile ? ' zodiac-marquee-track--mobile' : ''}`
              : 'mx-auto w-max justify-center'
          }`}
        >
          <MarqueeStrip stripId={0} />
          {fineMotion ? <MarqueeStrip stripId={1} /> : null}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden
      />
    </section>
  );
}
