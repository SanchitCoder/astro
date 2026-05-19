import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { MouseEvent as ReactMouseEvent } from 'react';

const AREAS = [
  {
    glyph: '♄',
    planet: 'Saturn',
    title: 'Career & Purpose',
    body: 'Your 10th house and Saturn cycles govern ambition, recognition, and the precise window for your professional breakthrough.',
    bg: 'linear-gradient(145deg, #020d1c 0%, #062e3c 45%, #0b5878 100%)',
    glow: 'rgba(11,120,150,0.65)',
    glowHover: 'rgba(77,195,224,0.55)',
    accent: '#4DC3E0',
    tag: 'Career · Finance · Status',
    ringColor: 'rgba(77,195,224,0.12)',
    ringColor2: 'rgba(77,195,224,0.06)',
  },
  {
    glyph: '♀',
    planet: 'Venus',
    title: 'Love & Marriage',
    body: 'Venus transits, the 7th house, and navamsa compatibility — read together to reveal the timing and nature of your union.',
    bg: 'linear-gradient(145deg, #15020e 0%, #540025 45%, #9b1239 100%)',
    glow: 'rgba(251,113,133,0.55)',
    glowHover: 'rgba(251,113,133,0.7)',
    accent: '#fb7185',
    tag: 'Marriage · Relationships',
    ringColor: 'rgba(251,113,133,0.12)',
    ringColor2: 'rgba(251,113,133,0.06)',
  },
  {
    glyph: '♂',
    planet: 'Mars',
    title: 'Health & Vitality',
    body: 'Classical Vedic tradition maps bodily tendencies to planetary positions — a precise map of what to watch and when.',
    bg: 'linear-gradient(145deg, #020f06 0%, #063820 45%, #05604a 100%)',
    glow: 'rgba(52,211,153,0.55)',
    glowHover: 'rgba(52,211,153,0.7)',
    accent: '#34d399',
    tag: 'Health · Medical Astrology',
    ringColor: 'rgba(52,211,153,0.12)',
    ringColor2: 'rgba(52,211,153,0.06)',
  },
  {
    glyph: '♃',
    planet: 'Jupiter',
    title: 'Wealth & Prosperity',
    body: "Jupiter's transit through your 2nd and 11th houses marks the dasha windows most aligned with financial growth.",
    bg: 'linear-gradient(145deg, #160b00 0%, #5c3200 45%, #b85c0e 100%)',
    glow: 'rgba(255,179,106,0.55)',
    glowHover: 'rgba(255,179,106,0.7)',
    accent: '#ffb36a',
    tag: 'Wealth · Timing',
    ringColor: 'rgba(255,179,106,0.12)',
    ringColor2: 'rgba(255,179,106,0.06)',
  },
];

function AreaCard({ area, index }: { area: typeof AREAS[0]; index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 280, damping: 28 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 280, damping: 28 });

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative rounded-3xl overflow-hidden cursor-default min-h-[340px] md:min-h-[380px] flex flex-col"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: area.bg }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      {/* Orbital rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[320px] h-[320px] rounded-full border pointer-events-none animate-[spin_25s_linear_infinite]"
        style={{ borderColor: area.ringColor }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[220px] h-[220px] rounded-full border pointer-events-none animate-[spin_18s_linear_infinite_reverse]"
        style={{ borderColor: area.ringColor2 }}
      />

      {/* Large planet glyph */}
      <div className="absolute inset-0 flex items-center justify-center -translate-y-8 pointer-events-none">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Glow behind glyph */}
          <div
            className="absolute inset-0 blur-[60px] rounded-full scale-150 group-hover:scale-[1.8] transition-transform duration-700"
            style={{ background: area.glow, width: '120px', height: '120px', left: '-10px', top: '-10px' }}
          />
          <span
            className="relative block select-none text-[5rem] leading-none sm:text-[7rem] lg:text-[9rem]"
            style={{
              lineHeight: 1,
              color: 'transparent',
              background: `linear-gradient(160deg, ${area.accent} 0%, rgba(255,255,255,0.8) 50%, ${area.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 30px ${area.glow})`,
              fontFamily: '"Cormorant Garamond", "Apple Symbols", "Segoe UI Symbol", serif',
            }}
          >
            {area.glyph}
          </span>
        </motion.div>
      </div>

      {/* Planet label at top right */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border"
          style={{ color: area.accent, borderColor: `${area.accent}40`, background: `${area.accent}12` }}
        >
          {area.planet}
        </span>
      </div>

      {/* Bottom content */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6 z-10"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)' }}
      >
        {/* Tag */}
        <div className="mb-3">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em]"
            style={{ color: `${area.accent}cc` }}
          >
            {area.tag}
          </span>
        </div>

        <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
          {area.title}
        </h3>
        <p className="text-sm text-white/55 leading-relaxed mb-4">{area.body}</p>

        <div
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide transition-all duration-300 group-hover:gap-3"
          style={{ color: area.accent }}
        >
          Explore <ArrowRight size={12} />
        </div>
      </div>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl border opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ borderColor: `${area.accent}35` }}
      />
    </motion.div>
  );
}

export function LifeAreasSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-warm-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(232,118,28,0.05),transparent_65%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="section-eyebrow mb-4 block">What the Stars Govern</span>
          <h2 className="section-heading">
            Every life area has a{' '}
            <span className="text-gradient-gold italic font-light">planetary signature</span>
          </h2>
          <p className="mt-4 text-ink-500 text-sm md:text-base leading-relaxed">
            Vedic astrology maps each dimension of human life to a planet and a house. Understanding yours changes everything.
          </p>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          style={{ perspective: '1400px' }}
        >
          {AREAS.map((area, i) => (
            <AreaCard key={area.planet} area={area} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
