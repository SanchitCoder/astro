import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { SiteOutletContext } from '../components/layout/SiteLayout';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Globe,
} from 'lucide-react';
import { ContactForm } from '../components/contact/ContactForm';
import {
  EMAIL,
  EMAIL_MAILTO,
  PHONE,
  PHONE_TEL,
  WHATSAPP_URL,
  GURU_IMG_ABOUT,
} from '../lib/constants';

const ADDRESS = 'C/o Rahul Store, Sector 28-C, Chandigarh, India';

const TRUST_POINTS = [
  { icon: Shield, text: 'Private, confidential one-to-one sessions' },
  { icon: Globe, text: 'Clients across 50+ countries — online & in-person' },
  { icon: Clock, text: 'Most enquiries answered within 24–48 hours' },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function ContactPage() {
  const { onBook } = useOutletContext<SiteOutletContext>();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-warm-50 pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_20%,rgba(11,120,150,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(6,74,94,0.2),transparent_55%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-eyebrow mb-4 block">Contact</span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-3xl text-white">
              Speak with{' '}
              <span className="text-gradient-gold">Gurudev Anand</span>
            </h1>
            <p className="mt-5 text-ink-600 text-base md:text-lg max-w-2xl leading-relaxed">
              Whether you need clarity on career, marriage, health, or Vastu — reach out to schedule
              a private consultation. Gurudev Anand and his team are here to guide you with the same
              care offered to over 1.2 lakh clients worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 md:py-24 bg-warm-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={itemVariants}>
                <ContactForm onBook={onBook} />
              </motion.div>
            </motion.div>

            <div className="lg:col-span-2 space-y-5">
              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl border border-warm-300 bg-warm-50 aspect-[4/3] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
              >
                <img
                  src={GURU_IMG_ABOUT}
                  alt="Gurudev Anand"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Direct contact card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="rounded-2xl glass-card border border-warm-300 p-6 space-y-4"
              >
                <h2 className="font-cinzel text-sm font-bold text-ink-900 flex items-center gap-2">
                  <Sparkles size={14} className="text-gold-400" />
                  Direct Contact
                </h2>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href={PHONE_TEL} className="flex items-start gap-3 group">
                      <Phone size={15} className="text-gold-400 shrink-0 mt-0.5" />
                      <span>
                        <span className="block text-ink-400 text-[10px] uppercase tracking-wide mb-0.5">Phone</span>
                        <span className="font-semibold text-ink-700 group-hover:text-gold-300 transition-colors">{PHONE}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={EMAIL_MAILTO} className="flex items-start gap-3 group">
                      <Mail size={15} className="text-gold-400 shrink-0 mt-0.5" />
                      <span>
                        <span className="block text-ink-400 text-[10px] uppercase tracking-wide mb-0.5">Email</span>
                        <span className="font-semibold text-ink-700 group-hover:text-gold-300 transition-colors break-all">{EMAIL}</span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={15} className="text-gold-400 shrink-0 mt-0.5" />
                    <span>
                      <span className="block text-ink-400 text-[10px] uppercase tracking-wide mb-0.5">Office</span>
                      <span className="text-ink-600 leading-relaxed">{ADDRESS}</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={15} className="text-gold-400 shrink-0 mt-0.5" />
                    <span>
                      <span className="block text-ink-400 text-[10px] uppercase tracking-wide mb-0.5">Hours</span>
                      <span className="text-ink-600">Mon – Sat · 10 AM – 7 PM IST</span>
                    </span>
                  </li>
                </ul>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-ink-900 font-bold text-sm uppercase tracking-wide transition btn-shimmer"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </motion.div>

              {/* Trust points */}
              <motion.ul
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="space-y-3"
              >
                {TRUST_POINTS.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 rounded-xl glass-card border border-warm-300 px-4 py-3 text-sm"
                  >
                    <Icon size={15} className="text-gold-400 shrink-0 mt-0.5" />
                    <span className="text-ink-600 leading-relaxed">{text}</span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-14 md:py-20 bg-warm-50 border-t border-warm-200">
        <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              What happens after you reach out?
            </h2>
            <p className="mt-4 text-ink-500 text-sm md:text-base leading-relaxed">
              Our team reviews your message and birth details, then contacts you to confirm a slot
              with Gurudev Anand. You will receive guidance on audio or video call — whichever you
              prefer — from anywhere in the world.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onBook}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-cosmic-950 font-bold text-sm uppercase tracking-wide btn-shimmer hover:shadow-gold-glow transition-shadow duration-300"
              >
                Book via quick form
                <ArrowRight size={15} />
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-card border border-orange-200 text-ink-700 text-sm font-semibold hover:border-gold-400/30 hover:text-gold-300 transition-all duration-300"
              >
                Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
