import { Link } from 'react-router-dom';
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

export function ConsultCTASection() {
  return (
    <section className="relative overflow-hidden bg-warm-100 py-24 md:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(232,118,28,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_50%,rgba(12,95,120,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(12,95,120,0.08),transparent_55%)]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/10 animate-[spin_80s_linear_infinite]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-nebula-400/15 animate-[spin_50s_linear_infinite_reverse]" />
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
          <span className="section-eyebrow mb-4 block">Book a Session</span>
          <h2 className="section-heading mx-auto max-w-3xl">
            One call can{' '}
            <span className="text-gradient-gold italic font-light">change everything</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-500 md:text-base">
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
              className="flex items-center gap-3 rounded-2xl border border-warm-200 bg-white px-5 py-3 shadow-sm transition-colors hover:border-gold-400/40 hover:shadow-md"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold-400/25 bg-gold-400/10">
                <m.icon size={14} className="text-gold-500" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-ink-900">{m.label}</div>
                <div className="text-xs text-ink-500">{m.sub}</div>
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
          <Link
            to="/consultation"
            className="btn-shimmer inline-flex w-full animate-pulse-glow items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_24px_rgba(224,114,16,0.35)] transition-all duration-300 hover:shadow-gold-glow sm:w-auto"
          >
            Book Consultation
            <ArrowRight size={15} />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-warm-300 bg-white px-8 py-4 text-sm font-semibold text-ink-700 shadow-sm transition-all duration-300 hover:border-gold-400/50 hover:text-gold-600 sm:w-auto"
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
          className="mx-auto mt-14 grid max-w-md grid-cols-3 gap-4 border-t border-warm-200 pt-10"
        >
          {TRUST.map((t) => (
            <div key={t.label} className="text-center">
              <div className="font-cinzel text-2xl font-bold text-gradient-gold">{t.value}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-ink-500">{t.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
