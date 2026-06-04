import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextReveal } from '../ui/TextReveal';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import { GURU_IMG } from '../../lib/constants';

/* ─────────────────────────────────────────────────────────────
   Zodiac Wheel — the hero's primary visual element
───────────────────────────────────────────────────────────── */

/* ︎ = Variation Selector-15: forces text (not emoji) rendering on Android/iOS */
const T = '︎';
const ZODIAC_SIGNS = [
  { glyph: '♈' + T, name: 'Aries' },
  { glyph: '♉' + T, name: 'Taurus' },
  { glyph: '♊' + T, name: 'Gemini' },
  { glyph: '♋' + T, name: 'Cancer' },
  { glyph: '♌' + T, name: 'Leo' },
  { glyph: '♍' + T, name: 'Virgo' },
  { glyph: '♎' + T, name: 'Libra' },
  { glyph: '♏' + T, name: 'Scorpio' },
  { glyph: '♐' + T, name: 'Sagittarius' },
  { glyph: '♑' + T, name: 'Capricorn' },
  { glyph: '♒' + T, name: 'Aquarius' },
  { glyph: '♓' + T, name: 'Pisces' },
];

const PLANETS = [
  { glyph: '☉' + T, angle: 22,  r: 185, color: '#F3B757', size: 5 },
  { glyph: '☽' + T, angle: 65,  r: 192, color: '#c7d2fe', size: 4 },
  { glyph: '♂' + T, angle: 120, r: 188, color: '#fca5a5', size: 4 },
  { glyph: '♃' + T, angle: 190, r: 183, color: '#86efac', size: 5 },
  { glyph: '♄' + T, angle: 255, r: 190, color: '#93c5fd', size: 4 },
  { glyph: '♀' + T, angle: 310, r: 186, color: '#f9a8d4', size: 4 },
  { glyph: '☿' + T, angle: 350, r: 181, color: '#fde68a', size: 3.5 },
];

const ASPECT_PAIRS = [[0, 3], [1, 4], [2, 5], [3, 6]];

const WHEEL_VIEW_SIZE = 560;

function ZodiacWheel({ className }: { className?: string }) {
  const size = WHEEL_VIEW_SIZE;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.48;
  const signR   = size * 0.42;
  const midR    = size * 0.37;
  const innerR  = size * 0.32;
  const portraitR = size * 0.26;

  const planetCoords = PLANETS.map(p => {
    const rad = (p.angle * Math.PI) / 180;
    return {
      ...p,
      px: cx + (p.r / 200) * midR * Math.cos(rad),
      py: cy + (p.r / 200) * midR * Math.sin(rad),
    };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none h-full w-full select-none ${className ?? ''}`}
      aria-hidden
    >
      <defs>
        <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#D88A22" stopOpacity="0.18" />
          <stop offset="60%"  stopColor="#005EA8" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#D88A22" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <clipPath id="portraitClip">
          <circle cx={cx} cy={cy} r={portraitR - 4} />
        </clipPath>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx={cx} cy={cy} r={outerR} fill="url(#wheelGlow)" />

      {/* Outermost ring */}
      <circle cx={cx} cy={cy} r={outerR}     fill="none" stroke="#D88A22" strokeWidth="0.6" opacity="0.3" />
      <circle cx={cx} cy={cy} r={signR}      fill="none" stroke="#D88A22" strokeWidth="0.4" opacity="0.2" strokeDasharray="4 8" />
      <circle cx={cx} cy={cy} r={midR}       fill="none" stroke="#3387D3" strokeWidth="0.4" opacity="0.18" />
      <circle cx={cx} cy={cy} r={innerR}     fill="none" stroke="#D88A22" strokeWidth="0.6" opacity="0.25" />
      <circle cx={cx} cy={cy} r={portraitR}  fill="none" stroke="#D88A22" strokeWidth="1"   opacity="0.4" />

      {/* 12 sector dividers */}
      {ZODIAC_SIGNS.map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx + innerR  * Math.cos(angle)}
            y1={cy + innerR  * Math.sin(angle)}
            x2={cx + outerR  * Math.cos(angle)}
            y2={cy + outerR  * Math.sin(angle)}
            stroke="#D88A22"
            strokeWidth="0.4"
            opacity="0.2"
          />
        );
      })}

      {/* Degree tick marks */}
      {Array.from({ length: 72 }).map((_, i) => {
        const angle = (i * 5 * Math.PI) / 180;
        const isMajor = i % 6 === 0;
        const r1 = isMajor ? outerR - 8 : outerR - 4;
        return (
          <line
            key={i}
            x1={cx + r1       * Math.cos(angle)}
            y1={cy + r1       * Math.sin(angle)}
            x2={cx + outerR   * Math.cos(angle)}
            y2={cy + outerR   * Math.sin(angle)}
            stroke="#D88A22"
            strokeWidth={isMajor ? 0.8 : 0.4}
            opacity={isMajor ? 0.35 : 0.15}
          />
        );
      })}

      {/* Zodiac glyphs */}
      {ZODIAC_SIGNS.map((sign, i) => {
        const angle = ((i * 30 + 15) * Math.PI) / 180;
        const r = (signR + outerR) / 2;
        return (
          <text
            key={sign.name}
            x={cx + r * Math.cos(angle)}
            y={cy + r * Math.sin(angle)}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="18"
            fill="#F3B757"
            opacity="0.7"
            fontFamily='"Playfair Display","Apple Symbols","Segoe UI Symbol",serif'
          >
            {sign.glyph}
          </text>
        );
      })}

      {/* Aspect lines between planets */}
      {ASPECT_PAIRS.map(([a, b], i) => {
        const pa = planetCoords[a];
        const pb = planetCoords[b];
        if (!pa || !pb) return null;
        return (
          <line
            key={i}
            x1={pa.px} y1={pa.py}
            x2={pb.px} y2={pb.py}
            stroke="#3387D3"
            strokeWidth="0.5"
            opacity="0.18"
            strokeDasharray="3 5"
          />
        );
      })}

      {/* Planet dots + glyphs */}
      {planetCoords.map((p) => (
        <g key={p.glyph}>
          {/* Glow */}
          <circle cx={p.px} cy={p.py} r={p.size * 3} fill={p.color} opacity="0.12" />
          {/* Dot */}
          <circle cx={p.px} cy={p.py} r={p.size} fill={p.color} opacity="0.9" />
          {/* Label */}
          <text
            x={p.px + p.size * 2.2}
            y={p.py + p.size * 0.8}
            fontSize="9"
            fill={p.color}
            opacity="0.65"
            fontFamily='"Playfair Display","Apple Symbols","Segoe UI Symbol",serif'
          >
            {p.glyph}
          </text>
        </g>
      ))}

      {/* Center glow */}
      <circle cx={cx} cy={cy} r={portraitR} fill="url(#centerGlow)" />

      {/* Inner mandala ring details */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={cx + (portraitR + 14) * Math.cos(angle)}
            cy={cy + (portraitR + 14) * Math.sin(angle)}
            r="3"
            fill="#D88A22"
            opacity="0.35"
          />
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating ambient particles
───────────────────────────────────────────────────────────── */
const PARTICLES = [
  { x: '8%',  y: '15%', size: 2,   delay: 0,   dur: 7  },
  { x: '15%', y: '65%', size: 1.5, delay: 1.5, dur: 9  },
  { x: '88%', y: '20%', size: 2.5, delay: 0.8, dur: 8  },
  { x: '92%', y: '72%', size: 1.5, delay: 2,   dur: 11 },
  { x: '45%', y: '8%',  size: 2,   delay: 3,   dur: 6  },
  { x: '70%', y: '90%', size: 1.5, delay: 1,   dur: 10 },
  { x: '25%', y: '88%', size: 2,   delay: 4,   dur: 7  },
  { x: '80%', y: '45%', size: 1,   delay: 0.5, dur: 12 },
];

const FLOATING_GLYPHS = [
  { glyph: '♈' + T, x: '6%',  y: '22%', delay: 0   },
  { glyph: '♌' + T, x: '90%', y: '18%', delay: 1   },
  { glyph: '♎' + T, x: '4%',  y: '72%', delay: 2   },
  { glyph: '♐' + T, x: '92%', y: '68%', delay: 0.5 },
  { glyph: '♒' + T, x: '48%', y: '5%',  delay: 1.5 },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/* ─────────────────────────────────────────────────────────────
   HeroSection
───────────────────────────────────────────────────────────── */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const wheelY  = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY   = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden lg:min-h-screen"
      style={{ background: 'linear-gradient(160deg, #001D48 0%, #002D60 40%, #003D78 70%, #001530 100%)' }}
    >
      {/* ── Ambient light blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,94,168,0.25),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(216,138,34,0.15),transparent_65%)] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,94,168,0.1),transparent_60%)] blur-3xl" />
      </div>

      {/* ── Star field ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.4, 1] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── Floating zodiac glyphs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        {FLOATING_GLYPHS.map((g) => (
          <motion.div
            key={g.glyph}
            className="absolute font-serif text-2xl select-none"
            style={{
              left: g.x, top: g.y,
              color: '#D88A22',
              fontFamily: '"Playfair Display","Apple Symbols","Segoe UI Symbol",serif',
            }}
            animate={{ y: [0, -14, 0], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, delay: g.delay, ease: 'easeInOut' }}
          >
            {g.glyph}
          </motion.div>
        ))}
      </div>

      {/* ── Main content grid ── */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-0 lg:min-h-[80vh]">

          {/* ── LEFT: Text ── */}
          <motion.div
            style={{ y: textY }}
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
            className="order-2 z-10 space-y-6 sm:space-y-7 lg:order-1 lg:pr-10"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-gold-400/35 bg-gold-400/10 px-3 py-1.5 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-gold-300 sm:justify-start sm:px-4 sm:text-[10px] sm:tracking-[0.22em] lg:text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                Vedic Astrology · Vastu · Medical Astrology
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <TextReveal
                as="h1"
                className="font-serif text-4xl sm:text-5xl lg:text-[3.1rem] xl:text-[3.6rem] font-bold leading-[1.08] tracking-tight text-white"
                stagger={0.07}
              >
                The Stars Map
                <br />
                <span
                  className="italic font-light"
                  style={{
                    background: 'linear-gradient(130deg, #F3B757 0%, #D88A22 50%, #F3B757 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Your Life's Timing
                </span>
                <br />
                <span className="font-light text-3xl text-white sm:text-4xl lg:text-[2.5rem]">— Read Precisely</span>
              </TextReveal>
            </motion.div>

            {/* Body */}
            <motion.div variants={itemVariants}>
              <p className="max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
                Over twenty-five years of kundali readings — career, marriage, health, and wealth decoded from your birth chart with classical Vedic precision.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid max-w-sm grid-cols-3 gap-2 sm:gap-3">
              {[
                { value: '25+', label: 'Years' },
                { value: '1.2L+', label: 'Clients' },
                { value: '50+', label: 'Countries' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center backdrop-blur-sm sm:p-4"
                >
                  <div
                    className="font-cinzel text-lg font-bold sm:text-xl md:text-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #F3B757 0%, #D88A22 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-white/90">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                to="/webinar"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide btn-shimmer transition-all duration-300 animate-pulse-glow hover:shadow-gold-glow sm:w-auto"
                style={{ background: 'linear-gradient(135deg, #F3B757 0%, #D88A22 50%, #9A5E14 100%)', color: '#002D60' }}
              >
                Book Consultation
                <ArrowRight size={15} />
              </Link>
              <a
                href="#kundali"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-gold-400/40 hover:text-gold-200 sm:w-auto"
              >
                Free Kundali
              </a>
            </motion.div>

            {/* Rating */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={13} className="text-gold-400 fill-gold-400" />
                ))}
              </div>
              <span className="text-xs font-medium text-white/90">4.9 / 5 &nbsp;·&nbsp; 10,000+ reviews</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Zodiac Wheel + Portrait ── */}
          <motion.div
            style={{ y: wheelY }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 mx-auto aspect-square w-full max-w-[min(92vw,420px)] sm:max-w-[460px] lg:order-2 lg:max-w-[520px]"
          >
            {/* Outer slow-spin layer */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <ZodiacWheel />
            </motion.div>

            {/* Counter-rotating inner ring for depth */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              className="pointer-events-none absolute inset-[21%] rounded-full border border-gold-400/12"
            />

            {/* Static portrait centered in wheel */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="relative aspect-square w-[52%] max-w-[220px] sm:max-w-[260px]">
              {/* Glow pulse */}
              <div
                className="absolute -inset-6 rounded-full pointer-events-none animate-pulse-glow"
                style={{ background: 'radial-gradient(circle, rgba(216,138,34,0.3) 0%, transparent 70%)' }}
              />
              {/* Portrait */}
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-gold-400/40 shadow-[0_0_60px_rgba(216,138,34,0.35),0_0_120px_rgba(216,138,34,0.12)]">
                <img
                  src={GURU_IMG}
                  alt="Gurudev Anand"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Name badge */}
              <div
                className="absolute -bottom-8 left-1/2 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full border border-gold-400/30 px-3 py-1.5 text-center backdrop-blur-md sm:max-w-none sm:whitespace-nowrap sm:px-4"
                style={{ background: 'rgba(0,45,96,0.85)' }}
              >
                <span className="font-cinzel text-[10px] font-bold text-gold-300 tracking-widest uppercase">
                  Gurudev Anand
                </span>
              </div>
              {/* Live dot */}
              <div className="absolute -top-2 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wide">Live</span>
              </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8 sm:flex"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-white/60" />
        </motion.div>
      </motion.div>

      {/* ── Bottom fade into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-50 to-transparent pointer-events-none" />
    </section>
  );
}
