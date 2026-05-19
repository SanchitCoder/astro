import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ── Inline SVG illustrations ─────────────────────────────── */

function JyotishIllustration() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" aria-hidden>
      {/* Outer circle */}
      <circle cx="100" cy="100" r="90" stroke="#e07210" strokeWidth="0.8" opacity="0.3" />
      <circle cx="100" cy="100" r="70" stroke="#e07210" strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="50" stroke="#e07210" strokeWidth="0.8" opacity="0.3" />
      <circle cx="100" cy="100" r="28" stroke="#ffb36a" strokeWidth="0.5" opacity="0.35" />
      {/* Dividing lines (12 houses) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 50 * Math.cos(angle);
        const y1 = 100 + 50 * Math.sin(angle);
        const x2 = 100 + 90 * Math.cos(angle);
        const y2 = 100 + 90 * Math.sin(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e07210" strokeWidth="0.5" opacity="0.3" />
        );
      })}
      {/* Planet dots at various positions */}
      {[
        { angle: 15, r: 80, label: '☉', color: '#ffb36a' },
        { angle: 75, r: 78, label: '☽', color: '#e0e0ff' },
        { angle: 135, r: 82, label: '♂', color: '#f87171' },
        { angle: 210, r: 79, label: '♃', color: '#86efac' },
        { angle: 285, r: 81, label: '♄', color: '#93c5fd' },
        { angle: 330, r: 76, label: '♀', color: '#f9a8d4' },
      ].map(({ angle, r, label, color }) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + r * Math.cos(rad);
        const y = 100 + r * Math.sin(rad);
        return (
          <g key={label}>
            <circle cx={x} cy={y} r="6" fill={color} opacity="0.25" />
            <circle cx={x} cy={y} r="2.5" fill={color} opacity="0.8" />
            <text x={x + 10} y={y + 4} fontSize="8" fill={color} opacity="0.7" fontFamily="serif">{label}</text>
          </g>
        );
      })}
      {/* Center sun */}
      <circle cx="100" cy="100" r="10" fill="#e07210" opacity="0.2" />
      <circle cx="100" cy="100" r="5" fill="#ffb36a" opacity="0.6" />
      <circle cx="100" cy="100" r="2" fill="#fff" opacity="0.9" />
      {/* Connecting lines between some planets */}
      <path d="M133,80 L122,118 L78,118 L67,80 Z" stroke="#e07210" strokeWidth="0.4" fill="none" opacity="0.2" />
    </svg>
  );
}

function VastuIllustration() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" aria-hidden>
      {/* Outer square */}
      <rect x="20" y="20" width="160" height="160" stroke="#0b7896" strokeWidth="0.8" opacity="0.35" rx="4" />
      {/* Inner grid (3x3 = 9 zones) */}
      {[73, 127].map(x => (
        <line key={`v${x}`} x1={x} y1="20" x2={x} y2="180" stroke="#0b7896" strokeWidth="0.5" opacity="0.25" />
      ))}
      {[73, 127].map(y => (
        <line key={`h${y}`} x1="20" y1={y} x2="180" y2={y} stroke="#0b7896" strokeWidth="0.5" opacity="0.25" />
      ))}
      {/* Center Brahmasthan */}
      <rect x="73" y="73" width="54" height="54" fill="#0b7896" opacity="0.08" rx="2" />
      <circle cx="100" cy="100" r="18" stroke="#0b7896" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="6" fill="#0b7896" opacity="0.5" />
      {/* Compass directions */}
      <text x="96" y="16" fontSize="9" fill="#0b7896" opacity="0.7" fontWeight="bold" fontFamily="sans-serif">N</text>
      <text x="96" y="196" fontSize="9" fill="#0b7896" opacity="0.7" fontWeight="bold" fontFamily="sans-serif">S</text>
      <text x="183" y="103" fontSize="9" fill="#0b7896" opacity="0.7" fontWeight="bold" fontFamily="sans-serif">E</text>
      <text x="7" y="103" fontSize="9" fill="#0b7896" opacity="0.7" fontWeight="bold" fontFamily="sans-serif">W</text>
      {/* Zone labels */}
      {[
        { x: 27, y: 55, label: 'NW' }, { x: 88, y: 55, label: 'N' }, { x: 143, y: 55, label: 'NE' },
        { x: 27, y: 103, label: 'W' }, { x: 88, y: 107, label: '✦' }, { x: 143, y: 103, label: 'E' },
        { x: 27, y: 153, label: 'SW' }, { x: 88, y: 153, label: 'S' }, { x: 143, y: 153, label: 'SE' },
      ].map(({ x, y, label }) => (
        <text key={label} x={x} y={y} fontSize="8" fill="#4DC3E0" opacity="0.55" fontFamily="sans-serif" textAnchor="middle">{label}</text>
      ))}
      {/* Energy arrows */}
      <path d="M100 22 L100 40" stroke="#0b7896" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0b7896" opacity="0.5" />
        </marker>
      </defs>
    </svg>
  );
}

function MedicalIllustration() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" aria-hidden>
      {/* Stylised human silhouette — simplified */}
      {/* Head */}
      <circle cx="100" cy="38" r="18" stroke="#34d399" strokeWidth="0.8" opacity="0.4" />
      {/* Body */}
      <path d="M82 56 Q80 80 78 120 L122 120 Q120 80 118 56 Z" stroke="#34d399" strokeWidth="0.8" fill="#34d399" fillOpacity="0.05" opacity="0.5" />
      {/* Arms */}
      <path d="M80 70 Q60 90 52 110" stroke="#34d399" strokeWidth="0.8" opacity="0.3" />
      <path d="M120 70 Q140 90 148 110" stroke="#34d399" strokeWidth="0.8" opacity="0.3" />
      {/* Legs */}
      <path d="M88 120 Q84 155 82 175" stroke="#34d399" strokeWidth="0.8" opacity="0.3" />
      <path d="M112 120 Q116 155 118 175" stroke="#34d399" strokeWidth="0.8" opacity="0.3" />

      {/* Chakra points with planet associations */}
      {[
        { cy: 38, r: 4, color: '#a78bfa', label: '☿', ly: 28 },  // Crown - Mercury
        { cy: 62, r: 3.5, color: '#60a5fa', label: '☽', ly: 52 }, // Throat - Moon
        { cy: 82, r: 4, color: '#34d399', label: '♀', ly: 72 },  // Heart - Venus
        { cy: 100, r: 3.5, color: '#fbbf24', label: '☉', ly: 90 }, // Solar - Sun
        { cy: 115, r: 3, color: '#f97316', label: '♂', ly: 108 }, // Sacral - Mars
      ].map(({ cy, r, color, label, ly }) => (
        <g key={label}>
          <circle cx="100" cy={cy} r={r * 2.5} fill={color} opacity="0.08" />
          <circle cx="100" cy={cy} r={r} fill={color} opacity="0.6" />
          <circle cx="100" cy={cy} r={r - 1.5} fill="white" opacity="0.5" />
          <text x="115" y={ly + 4} fontSize="7.5" fill={color} opacity="0.7" fontFamily="serif">{label}</text>
          <line x1="104" y1={cy} x2="113" y2={ly + 1} stroke={color} strokeWidth="0.4" opacity="0.3" />
        </g>
      ))}

      {/* Aura rings */}
      <ellipse cx="100" cy="105" rx="60" ry="90" stroke="#34d399" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 4" />
      <ellipse cx="100" cy="105" rx="75" ry="105" stroke="#34d399" strokeWidth="0.3" opacity="0.06" strokeDasharray="4 4" />
    </svg>
  );
}

const SCIENCES = [
  {
    icon: '🪐',
    eyebrow: 'Jyotish',
    title: 'Vedic Astrology',
    subtitle: 'The Science of Planetary Time',
    body: 'Over five thousand years of observational astronomy distilled into a system that maps planetary cycles to human experience — career, relationships, health, and fate. Gurudev Anand uses this framework to read what is unfolding and why.',
    accent: '#e07210',
    border: 'border-gold-400/20',
    bg: 'from-[#FFF8F2] to-[#FFF0E0]',
    illustration: JyotishIllustration,
    keywords: ['Kundali Reading', 'Dasha Analysis', 'Transits & Timing'],
  },
  {
    icon: '🏛',
    eyebrow: 'Vastu Shastra',
    title: 'Sacred Space Design',
    subtitle: 'The Science of Living Spaces',
    body: 'Vastu aligns the geometry of your living and working space with the cardinal directions and elemental forces. When space is in order, energy flows. Gurudev Anand applies Vastu principles tailored to your personal chart.',
    accent: '#0b7896',
    border: 'border-nebula-500/20',
    bg: 'from-[#F2FAFF] to-[#E8F6FF]',
    illustration: VastuIllustration,
    keywords: ['Home Vastu', 'Office Vastu', 'Remedial Corrections'],
  },
  {
    icon: '🌿',
    eyebrow: 'Medical Astrology',
    title: 'Health & Planetary Body',
    subtitle: 'The Science of Bodily Patterns',
    body: 'Each planet governs bodily systems. Each house maps to organs and tendencies. Medical astrology in the Vedic tradition offers a preventive lens — not diagnosis but awareness of planetary cycles that affect the body.',
    accent: '#059669',
    border: 'border-emerald-500/20',
    bg: 'from-[#F2FFF8] to-[#E8FFF0]',
    illustration: MedicalIllustration,
    keywords: ['Health Indicators', 'Preventive Guidance', 'Planetary Remedies'],
  },
];

export function VedicSciencesSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-warm-100">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(12,95,120,0.05),transparent_60%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-eyebrow mb-4 block">Three Ancient Sciences</span>
          <h2 className="section-heading">
            The wisdom{' '}
            <span className="text-gradient-gold italic font-light">behind the consultation</span>
          </h2>
          <p className="mt-4 text-ink-500 text-sm md:text-base leading-relaxed">
            Gurudev Anand draws from three interlocking Vedic disciplines — each complete, each powerful, most transformative together.
          </p>
        </motion.div>

        <div className="space-y-8">
          {SCIENCES.map((s, i) => {
            const Illo = s.illustration;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={s.eyebrow}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-3xl border ${s.border} overflow-hidden bg-gradient-to-br ${s.bg} hover:shadow-lg transition-shadow duration-500`}
              >
                <div
                  className={`grid lg:grid-cols-2 gap-0 items-stretch ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  {/* Content */}
                  <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-2xl">{s.icon}</span>
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full border"
                          style={{ color: s.accent, borderColor: `${s.accent}35`, background: `${s.accent}10` }}
                        >
                          {s.eyebrow}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink-900 mb-1 leading-tight">
                        {s.title}
                      </h3>
                      <p
                        className="text-sm font-semibold mb-4 uppercase tracking-wide"
                        style={{ color: s.accent }}
                      >
                        {s.subtitle}
                      </p>

                      <p className="text-sm md:text-base text-ink-600 leading-relaxed mb-6">
                        {s.body}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-7">
                        {s.keywords.map((k) => (
                          <span
                            key={k}
                            className="px-3 py-1 rounded-full text-[11px] font-semibold border"
                            style={{ color: s.accent, borderColor: `${s.accent}30`, background: `${s.accent}08` }}
                          >
                            {k}
                          </span>
                        ))}
                      </div>

                      <button
                        className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 group-hover:gap-3"
                        style={{ color: s.accent }}
                      >
                        Learn more <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  </div>

                  {/* Illustration */}
                  <div className="relative min-h-[280px] lg:min-h-0 flex items-center justify-center p-10 lg:p-14">
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${s.accent}18, transparent 70%)`,
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-full max-w-[220px] md:max-w-[260px] aspect-square"
                    >
                      <Illo />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.accent}50, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
