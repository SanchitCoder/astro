import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const DARK_BG = 'linear-gradient(160deg, #031825 0%, #062E3C 40%, #084557 70%, #031018 100%)';

const ITEMS = [
  { q: 'How does a consultation work?',    a: 'Share your birth details in advance. Gurudev Anand reads your kundali, then meets you on a private audio or video call — explaining what the chart shows and outlining remedies tailored to you.' },
  { q: 'Online or in person?',             a: 'Both. Clients worldwide meet by secure call. In-person sessions are available when his schedule allows — the same personal attention either way.' },
  { q: 'What details do you need?',        a: 'Full name, date of birth, exact time of birth, and place of birth. For couple consultations, both partners\' details.' },
  { q: 'How soon can I book?',             a: 'Most clients are confirmed within twenty-four to forty-eight hours. Urgent slots are available for pressing situations.' },
  { q: 'Are remedies included?',           a: 'Yes — every session includes personalised remedies from classical Vedic texts: mantras, rituals, or guidance chosen specifically for your chart.' },
];

function AccordionItem({ q, a, isOpen, onToggle, index }: { q: string; a: string; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${isOpen ? 'border-gold-400/30 bg-gold-400/[0.04]' : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14]'}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
      >
        {/* Number badge */}
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-cinzel text-xs font-bold transition-colors duration-300"
          style={{
            background: isOpen ? 'rgba(224,114,16,0.18)' : 'rgba(255,255,255,0.06)',
            color: isOpen ? '#ffb36a' : 'rgba(255,255,255,0.3)',
            border: isOpen ? '1px solid rgba(224,114,16,0.35)' : '1px solid rgba(255,255,255,0.09)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className={`flex-1 text-sm font-semibold transition-colors duration-200 md:text-base ${isOpen ? 'text-white' : 'text-white/95'}`}>
          {q}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <ChevronDown size={18} className={`transition-colors duration-200 ${isOpen ? 'text-gold-400' : 'text-white/80'}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 ml-11 text-white/90 text-sm leading-relaxed border-t border-white/[0.06] pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection({ onConnect }: { onConnect?: () => void }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: DARK_BG }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(11,120,150,0.1),transparent_70%)] blur-3xl" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(232,118,28,0.07),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#ffb36a' }}>FAQs</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Common{' '}
            <span className="italic font-light" style={{ background: 'linear-gradient(135deg,#ffb36a,#e07210)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              questions
            </span>
          </h2>
          <p className="mt-4 text-white/90 text-sm max-w-xl mx-auto leading-relaxed">
            How consultations with Gurudev Anand are structured and what to expect.
          </p>
        </motion.div>

        <div className="space-y-3">
          {ITEMS.map((it, i) => (
            <AccordionItem
              key={it.q}
              q={it.q}
              a={it.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 text-center rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8"
        >
          <p className="text-white/90 text-sm mb-5">Still have questions? Reach out directly.</p>
          <button
            type="button"
            onClick={onConnect}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide btn-shimmer transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #ffb36a 0%, #e07210 50%, #c05e0d 100%)', color: '#062E3C' }}
          >
            Contact Gurudev Anand
          </button>
        </motion.div>
      </div>
    </section>
  );
}
