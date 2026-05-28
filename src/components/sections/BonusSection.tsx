import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const DARK_BG = 'linear-gradient(160deg, #001D48 0%, #002D60 40%, #003D78 70%, #001530 100%)';

const CHECKLIST = [
  'Planetary positions at birth and the life cycles they set in motion.',
  'Vastu principles — aligning spaces with what your chart reveals.',
  'Remedies from classical scripture: rituals and mantras for your situation.',
  'The same depth whether you meet him online or in person.',
];

function MandalaDecor() {
  const rings = [120, 95, 70, 45];
  return (
    <svg viewBox="0 0 280 280" className="w-full h-full" fill="none" aria-hidden>
      <defs>
        <radialGradient id="mGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D88A22" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="140" r="130" fill="url(#mGlow)" />
      {rings.map((r, i) => (
        <circle key={r} cx="140" cy="140" r={r} stroke="#D88A22" strokeWidth="0.6" opacity={0.15 + i * 0.06}
          strokeDasharray={i % 2 === 0 ? undefined : '4 8'} />
      ))}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <g key={i}>
            <line x1={140 + 45 * Math.cos(a)} y1={140 + 45 * Math.sin(a)}
              x2={140 + 120 * Math.cos(a)} y2={140 + 120 * Math.sin(a)}
              stroke="#D88A22" strokeWidth="0.4" opacity="0.18" />
            <circle cx={140 + 118 * Math.cos(a)} cy={140 + 118 * Math.sin(a)} r="3" fill="#D88A22" opacity="0.3" />
          </g>
        );
      })}
      {['☉','☽','♂','♀','♃','♄','☿','☊'].map((g, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <text key={g} x={140 + 82 * Math.cos(a)} y={140 + 82 * Math.sin(a)}
            fontSize="13" fill="#F3B757" opacity="0.35" textAnchor="middle" dominantBaseline="central"
            fontFamily='"Cormorant Garamond","Apple Symbols","Segoe UI Symbol",serif'>
            {g}
          </text>
        );
      })}
      <circle cx="140" cy="140" r="22" fill="#D88A22" opacity="0.08" />
      <circle cx="140" cy="140" r="10" fill="#D88A22" opacity="0.18" />
      <circle cx="140" cy="140" r="4"  fill="#F3B757" opacity="0.8" />
    </svg>
  );
}

export function BonusSection() {
  return (
    <section
      id="knowledge"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: DARK_BG }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_60%,rgba(0,94,168,0.1),transparent_60%)] blur-3xl" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(216,138,34,0.08),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left: Mandala */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[300px]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(216,138,34,0.15),transparent_60%)] blur-2xl" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full"
              >
                <MandalaDecor />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>
              Gurudev Anand's Teachings
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Learn the foundations{' '}
              <span className="italic font-light" style={{ background: 'linear-gradient(135deg,#F3B757,#D88A22)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                he works from
              </span>
            </h2>

            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8">
              Gurudev Anand shares the principles behind his practice — so you arrive at a session already oriented to the depth he offers.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-4"
            >
              {CHECKLIST.map((t) => (
                <motion.li
                  key={t}
                  variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-gold-400/15 border border-gold-400/25 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold-400/25 transition-colors">
                    <CheckCircle2 size={12} className="text-gold-400" />
                  </div>
                  <span className="text-sm text-white/90 leading-relaxed">{t}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-10 pt-8 border-t border-white/[0.07]">
              <div className="flex flex-wrap gap-3">
                {['Jyotish', 'Vastu Shastra', 'Medical Astrology', 'Muhurat'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-gold-400/20 bg-gold-400/[0.06] text-[11px] font-bold text-gold-300/70 uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
