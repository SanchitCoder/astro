import { motion } from 'framer-motion';
import { TextReveal } from '../ui/TextReveal';
import { CheckCircle2, Star, Newspaper } from 'lucide-react';
import { ConsultationCallCard } from './ConsultationCallCard';

const DARK_BG = 'linear-gradient(160deg, #001D48 0%, #002D60 40%, #003D78 70%, #001530 100%)';

const BULLETS = [
  'Reads each kundali personally — no assistants, no templated reports',
  'Draws remedies from classical texts, adapted to your chart and life',
  'Available online and in person, with complete confidentiality',
  'Known for plain, actionable explanations of complex planetary influences',
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
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(216,138,34,0.1),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,94,168,0.15),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: Gurudev portrait ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1 max-w-md mx-auto w-full lg:max-w-none"
          >
            <ConsultationCallCard />
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
              <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>
                About Gurudev Anand
              </span>
              <TextReveal as="h2" className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Gurudev{' '}
                <span className="italic font-light" style={{ background: 'linear-gradient(135deg,#F3B757,#D88A22)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  Anand
                </span>
              </TextReveal>
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
