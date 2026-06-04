import { motion } from 'framer-motion';
import { TextReveal } from '../ui/TextReveal';
import { ArrowRight, Clock } from 'lucide-react';

const DARK_BG = 'linear-gradient(160deg, #001D48 0%, #002D60 40%, #003D78 70%, #001530 100%)';

/* ︎ = Variation Selector-15: forces text (not emoji) rendering on Android/iOS */
const T = '︎';
const ARTICLES = [
  {
    category: 'Vedic Astrology',
    title: 'Understanding Your Dasha Periods',
    excerpt: 'How planetary ruling periods shape the decades of your life — and how to work with them intelligently.',
    read: '5 min read',
    accent: '#D88A22',
    img: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80&auto=format&fit=crop',
    glyph: '♄' + T,
  },
  {
    category: 'Medical Astrology',
    title: 'Health Patterns in the Birth Chart',
    excerpt: 'Classical Vedic tradition has long mapped bodily tendencies to planetary positions. What your chart shows.',
    read: '6 min read',
    accent: '#34d399',
    img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80&auto=format&fit=crop',
    glyph: '♂' + T,
  },
  {
    category: 'Vastu Shastra',
    title: 'Aligning Your Home With Your Chart',
    excerpt: 'Vastu is not superstition — it is spatial awareness. Gurudev Anand explains the underlying principles.',
    read: '4 min read',
    accent: '#3387D3',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop',
    glyph: '✦' + T,
  },
];

export function BlogSection({ onConnect }: { onConnect?: () => void }) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: DARK_BG }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(0,94,168,0.1),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(216,138,34,0.07),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-14 gap-6 flex-wrap"
        >
          <div>
            <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>Resources</span>
            <TextReveal as="h2" className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Explore the{' '}
              <span className="italic font-light" style={{ background: 'linear-gradient(135deg,#F3B757,#D88A22)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                tradition
              </span>
            </TextReveal>
          </div>
          <button
            type="button"
            onClick={onConnect}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-gold-300"
          >
            All Articles
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ARTICLES.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={onConnect}
              onKeyDown={(e) => {
                if (onConnect && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onConnect();
                }
              }}
              role={onConnect ? 'button' : undefined}
              tabIndex={onConnect ? 0 : undefined}
              className="group relative rounded-2xl overflow-hidden border border-white/[0.08] cursor-pointer bg-white/[0.03] hover:border-white/[0.15] transition-colors duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001530] via-[#001530]/60 to-[#001530]/10" />
                {/* Planet glyph overlay */}
                <div
                  className="absolute top-3 right-3 text-4xl opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                  style={{ color: a.accent, fontFamily: '"Playfair Display","Apple Symbols","Segoe UI Symbol",serif' }}
                >
                  {a.glyph}
                </div>
                {/* Category pill */}
                <div
                  className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: `${a.accent}20`, border: `1px solid ${a.accent}35`, color: a.accent }}
                >
                  {a.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2 font-cinzel text-sm font-bold leading-snug tracking-wide text-white group-hover:text-gold-300 transition-colors">
                  {a.title}
                </h3>
                <p className="text-xs text-white/90 leading-relaxed mb-4">{a.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/90">
                    <Clock size={11} /><span>{a.read}</span>
                  </div>
                  <span className="text-[11px] font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform" style={{ color: a.accent }}>
                    Read <ArrowRight size={11} />
                  </span>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg,transparent,${a.accent}50,transparent)` }} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
