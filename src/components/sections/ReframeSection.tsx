import { motion } from 'framer-motion';

const DARK_BG = 'linear-gradient(160deg, #031825 0%, #062E3C 40%, #084557 70%, #031018 100%)';

const TILES = [
  { glyph: '☉', planet: 'Sun',    title: 'Personality & Soul', desc: 'Your core identity, purpose, and the strengths that define your path.', accent: '#ffb36a' },
  { glyph: '☽', planet: 'Moon',   title: 'Mind & Emotions',   desc: 'Emotional patterns, instincts, and how you process the world within.', accent: '#c7d2fe' },
  { glyph: '♂', planet: 'Mars',   title: 'Health & Energy',   desc: 'Vitality cycles, physical tendencies, and optimal timing for action.', accent: '#fca5a5' },
  { glyph: '♀', planet: 'Venus',  title: 'Love & Harmony',    desc: 'Relationship patterns, compatibility, and the timing of union.', accent: '#f9a8d4' },
  { glyph: '♃', planet: 'Jupiter','title': 'Wealth & Growth', desc: 'Expansion cycles, financial periods, and where fortune favours you.', accent: '#86efac' },
  { glyph: '♄', planet: 'Saturn', title: 'Career & Karma',    desc: 'Discipline, timing of recognition, and the life lessons you carry.', accent: '#93c5fd' },
];

export function ReframeSection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: DARK_BG }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(232,118,28,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(11,120,150,0.12),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#ffb36a' }}>
            Planetary Wisdom
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Each planet governs{' '}
            <span className="italic font-light" style={{ background: 'linear-gradient(135deg,#ffb36a,#e07210)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              a dimension of life
            </span>
          </h2>
          <p className="mt-4 text-white/45 text-sm md:text-base leading-relaxed">
            Vedic astrology reads the full orchestra of your chart — not just one planet, but every influence in concert.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TILES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.04] overflow-hidden p-6 cursor-default"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${t.accent}14, transparent 65%)` }}
              />
              <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg,transparent,${t.accent}50,transparent)` }} />

              {/* Planet glyph */}
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 font-serif"
                  style={{ background: `${t.accent}14`, border: `1px solid ${t.accent}28`, color: t.accent, fontFamily: '"Cormorant Garamond","Apple Symbols","Segoe UI Symbol",serif' }}
                >
                  {t.glyph}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${t.accent}80` }}>
                  {t.planet}
                </span>
              </div>

              <h3 className="font-cinzel text-sm font-bold text-white/90 tracking-wide uppercase mb-2">{t.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
