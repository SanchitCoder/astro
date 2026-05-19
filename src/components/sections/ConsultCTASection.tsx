import { motion } from 'framer-motion';
import { Phone, Video, ArrowRight, Star } from 'lucide-react';
import { WHATSAPP_URL } from '../../lib/constants';

const MODES = [
  { icon: Phone, label: 'Audio Call', sub: '30 or 60 min' },
  { icon: Video, label: 'Video Call', sub: 'Face-to-face' },
];

const TRUST = [
  { value: '4.9★', label: 'Client Rating' },
  { value: '1.2L+', label: 'Consultations' },
  { value: '50+', label: 'Countries' },
];

export function ConsultCTASection({ onBook }: { onBook?: () => void }) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-nebula-800">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(232,118,28,0.14),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_50%,rgba(12,95,120,0.3),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(12,95,120,0.3),transparent_55%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold-400/[0.06] animate-[spin_80s_linear_infinite] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-400/[0.08] animate-[spin_50s_linear_infinite_reverse] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-gold-400/[0.12] animate-[spin_30s_linear_infinite] pointer-events-none" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 lg:px-8 text-center">

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-1 mb-6"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={16} className="text-gold-400 fill-gold-400" />
          ))}
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow mb-4 block" style={{ color: '#ffb36a' }}>Book a Session</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight">
            One call can{' '}
            <span className="text-gradient-gold italic font-light">change everything</span>
          </h2>
          <p className="mt-5 text-white/55 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Gurudev Anand reads your chart personally — no assistants, no templates. Clarity you can act on.
          </p>
        </motion.div>

        {/* Mode pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {MODES.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-sm hover:border-gold-400/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                <m.icon size={14} className="text-gold-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white/90">{m.label}</div>
                <div className="text-xs text-white/40">{m.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
        >
          <button
            onClick={onBook}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-nebula-900 btn-shimmer transition-all duration-300 animate-pulse-glow hover:shadow-gold-glow sm:w-auto"
          >
            Book Consultation
            <ArrowRight size={15} />
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-8 py-4 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-gold-400/40 hover:text-gold-300 sm:w-auto"
          >
            WhatsApp Enquiry
          </a>
        </motion.div>

        {/* Trust numbers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-14 pt-10 border-t border-white/10 grid grid-cols-3 max-w-md mx-auto gap-4"
        >
          {TRUST.map((t) => (
            <div key={t.label} className="text-center">
              <div className="font-cinzel text-2xl font-bold text-gradient-gold">{t.value}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wide mt-1 font-bold">{t.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
