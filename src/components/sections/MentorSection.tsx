import { motion } from 'framer-motion';
import { CheckCircle2, Star, Newspaper } from 'lucide-react';
import { GURU_IMG_ABOUT } from '../../lib/constants';

const DARK_BG = 'linear-gradient(160deg, #031825 0%, #062E3C 40%, #084557 70%, #031018 100%)';

const BULLETS = [
  'Reads each kundali personally — no assistants, no templated reports',
  'Draws remedies from classical texts, adapted to your chart and life',
  'Available online and in person, with complete confidentiality',
  'Known for plain, actionable explanations of complex planetary influences',
];

const STATS = [
  { value: '25+', label: 'Years', glyph: '♄' },
  { value: '1.2L+', label: 'Consultations', glyph: '☉' },
  { value: '50+', label: 'Countries', glyph: '♃' },
];

const PRESS = ['Times of India', 'Tribune', 'Hindustan Times', 'Bhagya Channel', 'Living India Channel', 'Dainik Bhaskar'];

export function MentorSection() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: DARK_BG }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,118,28,0.1),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(11,120,150,0.15),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: portrait ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Halo */}
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-gold-400/15 via-nebula-600/10 to-transparent blur-3xl pointer-events-none" />

            {/* Orbital ring */}
            <div className="absolute -inset-8 rounded-full border border-gold-400/[0.08] animate-[spin_40s_linear_infinite] pointer-events-none" />

            {/* Portrait */}
            <div className="relative rounded-[2.5rem] overflow-hidden border border-gold-400/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] max-w-md mx-auto lg:max-w-none">
              <img
                src={GURU_IMG_ABOUT}
                alt="Gurudev Anand"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031018]/80 via-transparent to-transparent" />

              {/* Floating stat badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute top-5 right-2 rounded-2xl border border-white/[0.1] bg-white/[0.08] px-3 py-2 backdrop-blur-md text-center shadow-xl sm:-right-4 sm:px-4 sm:py-2.5"
              >
                <div className="font-cinzel text-lg font-bold" style={{ background: 'linear-gradient(135deg,#ffb36a,#e07210)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>4.9 / 5</div>
                <div className="text-[9px] text-white/90 uppercase tracking-wide">10,000+ reviews</div>
              </motion.div>
            </div>

            {/* Bottom stats row */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-4 text-center">
                  <div className="text-lg font-serif mb-0.5" style={{ color: '#ffb36a', fontFamily: '"Cormorant Garamond","Apple Symbols","Segoe UI Symbol",serif' }}>{s.glyph}</div>
                  <div className="font-cinzel text-base font-bold" style={{ background: 'linear-gradient(135deg,#ffb36a,#e07210)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{s.value}</div>
                  <div className="text-[10px] text-white/90 uppercase tracking-wide mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: text ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 space-y-7"
          >
            <div>
              <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#ffb36a' }}>
                About Gurudev Anand
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Gurudev{' '}
                <span className="italic font-light" style={{ background: 'linear-gradient(135deg,#ffb36a,#e07210)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  Anand
                </span>
              </h2>
            </div>

            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Over twenty-five years and 1.2 lakh consultations — Gurudev Anand reads your chart with scholarly rigour and human warmth, walking you through your dashas and transits so you understand what is unfolding and why.
            </p>

            {/* Star rating */}
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-gold-400 fill-gold-400" />)}
              <span className="text-xs text-white/90 ml-1">Trusted by clients across 50+ countries</span>
            </div>

            {/* Bullets */}
            <ul className="space-y-3">
              {BULLETS.map((b) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={15} className="text-gold-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/90 leading-relaxed">{b}</span>
                </motion.li>
              ))}
            </ul>

            {/* Press */}
            <div className="pt-5 border-t border-white/[0.07]">
              <div className="flex items-center gap-2 mb-3">
                <Newspaper size={13} className="text-gold-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white">As featured in</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESS.map((b) => (
                  <span
                    key={b}
                    className="cursor-default rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:border-gold-400/50 hover:bg-white/15"
                  >
                    {b}
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
