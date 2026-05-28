import { motion } from 'framer-motion';
import { TextReveal } from '../ui/TextReveal';
import { ArrowRight } from 'lucide-react';

const IMG_JYOTISH = new URL('../../assets/sciences/jyotish.jpeg', import.meta.url).href;
const IMG_VASTU = new URL('../../assets/sciences/vastu.jpeg', import.meta.url).href;
const IMG_MEDICAL = new URL('../../assets/sciences/medical.jpeg', import.meta.url).href;

const SCIENCES = [
  {
    icon: '🪐',
    eyebrow: 'Jyotish',
    title: 'Vedic Astrology',
    subtitle: 'The Science of Planetary Time',
    body: 'Over five thousand years of observational astronomy distilled into a system that maps planetary cycles to human experience — career, relationships, health, and fate. Gurudev Anand uses this framework to read what is unfolding and why.',
    accent: '#D88A22',
    border: 'border-gold-400/20',
    bg: 'from-[#F8F9FB] to-[#EFF1F5]',
    image: IMG_JYOTISH,
    imageAlt: 'Zodiac wheel with twelve signs and planetary positions',
    keywords: ['Kundali Reading', 'Dasha Analysis', 'Transits & Timing'],
    imageFirst: false,
  },
  {
    icon: '🏛',
    eyebrow: 'Vastu Shastra',
    title: 'Sacred Space Design',
    subtitle: 'The Science of Living Spaces',
    body: 'Vastu aligns the geometry of your living and working space with the cardinal directions and elemental forces. When space is in order, energy flows. Gurudev Anand applies Vastu principles tailored to your personal chart.',
    accent: '#005EA8',
    border: 'border-nebula-500/20',
    bg: 'from-[#F0F4FB] to-[#E6EEF8]',
    image: IMG_VASTU,
    imageAlt: 'Vastu Shastra nine-zone directional chart',
    keywords: ['Home Vastu', 'Office Vastu', 'Remedial Corrections'],
    imageFirst: true,
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
    image: IMG_MEDICAL,
    imageAlt: 'Astrological body map — zodiac signs and the human body',
    keywords: ['Health Indicators', 'Preventive Guidance', 'Planetary Remedies'],
    imageFirst: false,
  },
] as const;

function ScienceImage({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  return (
    <div
      className="flex min-h-[260px] w-full items-center justify-center p-6 sm:min-h-[300px] sm:p-8 lg:min-h-full lg:p-10"
      style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${accent}12, transparent 70%)` }}
    >
      <img
        src={src}
        alt={alt}
        width={520}
        height={520}
        className="mx-auto block w-full max-w-[min(100%,480px)] object-contain drop-shadow-md"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

function ScienceContent({ s, onConnect }: { s: (typeof SCIENCES)[number]; onConnect?: () => void }) {
  return (
    <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
      <div className="mb-5 flex items-center gap-3">
        <span className="text-2xl">{s.icon}</span>
        <span
          className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ color: s.accent, borderColor: `${s.accent}35`, background: `${s.accent}10` }}
        >
          {s.eyebrow}
        </span>
      </div>

      <h3 className="mb-1 font-serif text-2xl font-bold leading-tight text-ink-900 md:text-3xl">{s.title}</h3>
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide" style={{ color: s.accent }}>
        {s.subtitle}
      </p>
      <p className="mb-6 text-sm leading-relaxed text-ink-600 md:text-base">{s.body}</p>

      <div className="mb-7 flex flex-wrap gap-2">
        {s.keywords.map((k) => (
          <span
            key={k}
            className="rounded-full border px-3 py-1 text-[11px] font-semibold"
            style={{ color: s.accent, borderColor: `${s.accent}30`, background: `${s.accent}08` }}
          >
            {k}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onConnect}
        className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3"
        style={{ color: s.accent }}
      >
        Learn more <ArrowRight size={14} />
      </button>
    </div>
  );
}

export function VedicSciencesSection({ onConnect }: { onConnect?: () => void }) {
  return (
    <section id="sciences" className="relative overflow-hidden bg-warm-100 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,94,168,0.05),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="section-eyebrow mb-4 block">Three Ancient Sciences</span>
          <TextReveal as="h2" className="section-heading">
            The wisdom{' '}
            <span className="text-gradient-gold italic font-light">behind the consultation</span>
          </TextReveal>
          <p className="mt-4 text-sm leading-relaxed text-ink-500 md:text-base">
            Gurudev Anand draws from three interlocking Vedic disciplines — each complete, each powerful, most
            transformative together.
          </p>
        </motion.div>

        <div className="space-y-8">
          {SCIENCES.map((s, i) => (
            <motion.article
              key={s.eyebrow}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group overflow-hidden rounded-3xl border ${s.border} bg-gradient-to-br ${s.bg} shadow-sm transition-shadow duration-500 hover:shadow-lg`}
            >
              <div className="grid lg:grid-cols-2 lg:items-stretch">
                {s.imageFirst ? (
                  <>
                    <ScienceImage src={s.image} alt={s.imageAlt} accent={s.accent} />
                    <ScienceContent s={s} onConnect={onConnect} />
                  </>
                ) : (
                  <>
                    <ScienceContent s={s} onConnect={onConnect} />
                    <ScienceImage src={s.image} alt={s.imageAlt} accent={s.accent} />
                  </>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
