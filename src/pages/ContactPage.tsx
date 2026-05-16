import { Link, useOutletContext } from 'react-router-dom';
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
import { Reveal } from '../components/ui/Reveal';
import { ContactForm } from '../components/contact/ContactForm';
import {
  EMAIL,
  EMAIL_MAILTO,
  PHONE,
  PHONE_TEL,
  WHATSAPP_URL,
  GURU_IMG_ABOUT,
} from '../lib/constants';

const ADDRESS = 'C/o Rahul Strore, Sector 28-C, Chandigarh, India';

const TRUST_POINTS = [
  { icon: Shield, text: 'Private, confidential one-to-one sessions' },
  { icon: Globe, text: 'Clients across 50+ countries — online & in-person' },
  { icon: Clock, text: 'Most enquiries answered within 24–48 hours' },
];

export function ContactPage() {
  const { onBook } = useOutletContext<SiteOutletContext>();

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient text-white pt-12 md:pt-16 pb-14 md:pb-20">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-20 left-0 w-80 h-80 rounded-full bg-cta-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-royal-400/30 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <Reveal>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Contact</p>
            <h1 className="mt-3 font-sans font-bold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl text-white">
              Speak with <span className="text-gradient-gold">Guru Ji Sadhguru ANAND</span>
            </h1>
            <p className="hero-copy mt-5 text-base md:text-lg max-w-2xl leading-relaxed text-white">
              Whether you need clarity on career, marriage, health, or Vastu — reach out to schedule a private
              consultation. Guru Ji and his team are here to guide you with the same care offered to over 1.2 lakh
              clients worldwide.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-soft-gradient">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            <Reveal className="lg:col-span-3">
              <ContactForm onBook={onBook} />
            </Reveal>

            <div className="lg:col-span-2 space-y-5">
              <Reveal delay={80}>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[4/3] bg-slate-100">
                  <img
                    src={GURU_IMG_ABOUT}
                    alt="Guru Ji Sadhguru ANAND"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="rounded-2xl bg-royal-900 text-white p-6 border border-royal-800 space-y-4">
                  <h2 className="font-sans text-lg font-bold flex items-center gap-2">
                    <Sparkles size={18} className="text-gold-400" />
                    Direct contact
                  </h2>
                  <ul className="space-y-4 text-sm">
                    <li>
                      <a
                        href={PHONE_TEL}
                        className="flex items-start gap-3 hover:text-gold-400 transition"
                      >
                        <Phone size={18} className="text-gold-400 shrink-0 mt-0.5" />
                        <span>
                          <span className="block text-white/60 text-xs uppercase tracking-wide">Phone</span>
                          <span className="font-semibold">{PHONE}</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={EMAIL_MAILTO}
                        className="flex items-start gap-3 hover:text-gold-400 transition"
                      >
                        <Mail size={18} className="text-gold-400 shrink-0 mt-0.5" />
                        <span>
                          <span className="block text-white/60 text-xs uppercase tracking-wide">Email</span>
                          <span className="font-semibold break-all">{EMAIL}</span>
                        </span>
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin size={18} className="text-gold-400 shrink-0 mt-0.5" />
                      <span>
                        <span className="block text-white/60 text-xs uppercase tracking-wide">Office</span>
                        <span className="text-white/90 leading-relaxed">{ADDRESS}</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-white/80">
                      <Clock size={18} className="text-gold-400 shrink-0 mt-0.5" />
                      <span>
                        <span className="block text-white/60 text-xs uppercase tracking-wide">Hours</span>
                        Mon – Sat · 10 AM – 7 PM IST
                      </span>
                    </li>
                  </ul>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition"
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <ul className="space-y-3">
                  {TRUST_POINTS.map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm text-charcoal shadow-sm"
                    >
                      <Icon size={18} className="text-cta-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
          <Reveal>
            <h2 className="section-heading text-2xl md:text-3xl">What happens after you reach out?</h2>
            <p className="mt-4 text-charcoal-muted text-sm md:text-base leading-relaxed">
              Our team reviews your message and birth details, then contacts you to confirm a slot with Guru Ji Sadhguru
              ANAND. You will receive guidance on audio or video call — whichever you prefer — from anywhere in the
              world.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onBook}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cta-500 hover:bg-cta-600 text-white font-semibold text-sm transition shadow-sm"
              >
                Book via quick form
                <ArrowRight size={16} />
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-slate-300 text-royal-900 font-semibold text-sm hover:bg-section transition"
              >
                Back to home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
