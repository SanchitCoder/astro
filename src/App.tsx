import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Phone, Menu, X, Star, Sparkles, ShieldCheck, Globe as Globe2, Clock, Users, Heart, Briefcase, Coins, Home as HomeIcon, Flame, Brain, Compass, Activity, CalendarClock, PlayCircle, ChevronDown, Video, Headphones, CheckCircle2, ArrowRight, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, Award } from 'lucide-react';
import { BookingModal } from './components/BookingModal';
import { ChatWidget } from './components/ChatWidget';
import { WhatsAppWidget } from './components/WhatsAppWidget';

/** Contact details aligned with SadhguruANAND site */
const PHONE = '+91 95551 40404';
const PHONE_TEL = 'tel:+919555140404';
const EMAIL = 'info@sadhguruanand.com';
const EMAIL_MAILTO = `mailto:${EMAIL}`;
const WHATSAPP_URL = 'https://wa.me/919555140404';

const GURU_IMG =
  'https://images.pexels.com/photos/6076009/pexels-photo-6076009.jpeg?auto=compress&cs=tinysrgb&w=1200';

function useBooking() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>('normal');
  return {
    open,
    type,
    book: (t: string = 'normal') => {
      setType(t);
      setOpen(true);
    },
    close: () => setOpen(false),
  };
}

function Reveal({
  children,
  className = '',
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function App() {
  const booking = useBooking();

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-slate-800">
      <TopBar onBook={() => booking.book('normal')} />
      <Hero onBook={() => booking.book('normal')} />
      <Reveal><TrustStrip /></Reveal>
      <Reveal><ProblemSection onBook={() => booking.book('normal')} /></Reveal>
      <Reveal><ServicesSection onBook={(t) => booking.book(t)} /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><AboutGuru onBook={() => booking.book('normal')} /></Reveal>
      <Reveal><Knowledge /></Reveal>
      <Reveal><Zodiac /></Reveal>
      <Reveal><PricingSection onBook={(t) => booking.book(t)} /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><FinalCTA onBook={() => booking.book('normal')} /></Reveal>
      <Reveal><Footer /></Reveal>
      <BookingModal open={booking.open} onClose={booking.close} defaultType={booking.type} />
      <WhatsAppWidget whatsappHref={WHATSAPP_URL} />
      <ChatWidget
        phone={PHONE}
        phoneTel={PHONE_TEL}
        onBookConsultation={() => booking.book('normal')}
      />
    </div>
  );
}

/* ---------------- TopBar ---------------- */
function TopBar({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About Guru Ji', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Consultations', href: '#pricing' },
    { label: 'Articles', href: '#knowledge' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_6px_24px_-16px_rgba(10,23,64,0.25)] border-b border-slate-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full gold-border flex items-center justify-center shadow-md">
            <Sparkles size={18} className="text-royal-900" />
          </div>
          <span
            className={`font-serif text-xl md:text-2xl font-semibold tracking-wide ${
              scrolled ? 'text-royal-900' : 'text-white'
            }`}
          >
            Sadhguru<span className="text-gold-500">ANAND</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-sm font-medium transition ${
                scrolled ? 'text-slate-700 hover:text-royal-800' : 'text-white/90 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <a
            href={EMAIL_MAILTO}
            className={`hidden xl:inline-flex max-w-[200px] min-w-0 items-center gap-2 text-xs font-semibold truncate ${
              scrolled ? 'text-slate-600 hover:text-royal-800' : 'text-white/85 hover:text-white'
            }`}
            title={EMAIL}
          >
            <Mail size={15} className="text-gold-500 shrink-0" />
            <span className="truncate">{EMAIL}</span>
          </a>
          <a
            href={PHONE_TEL}
            className={`hidden md:inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap ${
              scrolled ? 'text-royal-900' : 'text-white'
            }`}
          >
            <Phone size={16} className="text-gold-500 shrink-0" />
            {PHONE}
          </a>
          <button
            onClick={onBook}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white text-xs sm:text-sm font-semibold uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 transition touch-manipulation"
          >
            Contact Now
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden p-2 rounded-md ${scrolled ? 'text-royal-900' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-slate-700 font-medium"
              >
                {l.label}
              </a>
            ))}
            <a href={PHONE_TEL} className="py-2 text-royal-800 font-semibold flex items-center gap-2">
              <Phone size={16} /> {PHONE}
            </a>
            <a href={EMAIL_MAILTO} className="py-2 text-royal-800 font-semibold flex items-center gap-2">
              <Mail size={16} /> {EMAIL}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-emerald-700 font-semibold"
            >
              WhatsApp — {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden bg-hero-gradient text-white pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold-400/20 blur-3xl animate-drift" />
        <div className="absolute top-40 right-0 w-[30rem] h-[30rem] rounded-full bg-royal-500/30 blur-3xl animate-drift-reverse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="lg:pr-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur text-xs md:text-sm font-medium tracking-wide">
            <Sparkles size={14} className="text-gold-400" />
            Vedic Astrology · Since 1998
          </div>
          <h1 className="mt-6 font-serif font-semibold text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.08]">
            Remove <span className="text-gradient-gold">Uncertainty</span> from
            <br className="hidden md:block" /> Career, Relationships & Finance
          </h1>
          <p className="mt-5 text-white/80 text-base md:text-lg max-w-xl">
            Personalised Vedic astrology consultations with Guru Ji Sadhguru ANAND. Get clarity on your life path,
            precise timing, and actionable remedies rooted in 25+ years of practice.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onBook}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition"
            >
              Book Your Consultation
              <ArrowRight size={18} />
            </button>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition"
            >
              <Phone size={16} /> Talk to Guru Ji
            </a>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-white/70">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://images.pexels.com/photos/${
                    [1239291, 415829, 733872, 1181690][i]
                  }/pexels-photo-${[1239291, 415829, 733872, 1181690][i]}.jpeg?auto=compress&cs=tinysrgb&w=80`}
                  className="w-7 h-7 rounded-full border-2 border-royal-900 object-cover"
                  alt=""
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-gold-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} fill="currentColor" />
              ))}
            </div>
            <span>Trusted by 1.2 lakh+ clients worldwide</span>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            {[
              { k: '25+', v: 'Years of practice' },
              { k: '1.2L+', v: 'Consultations' },
              { k: '50+', v: 'Countries served' },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur px-4 py-3 card-lift">
                <div className="font-serif text-2xl md:text-3xl text-gradient-gold">{s.k}</div>
                <div className="text-xs text-white/70 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="relative" delay={120}>
          <div className="absolute -inset-4 md:-inset-6 rounded-[2.5rem] gold-border opacity-80 blur-[2px]" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-premium bg-royal-900 aspect-[4/5] max-w-md mx-auto">
            <img
              src={GURU_IMG}
              alt="Guru Ji Sadhguru ANAND"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
                <Award size={18} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold">Guru Ji Sadhguru ANAND</div>
                <div className="text-xs text-white/70">Vedic Astrologer · Vastu · Medical Astrology</div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex absolute -left-6 top-20 items-center gap-2 rounded-2xl bg-white text-royal-900 px-4 py-3 shadow-xl">
            <CalendarClock size={18} className="text-gold-500" />
            <div>
              <div className="text-xs text-slate-500">Next Available</div>
              <div className="text-sm font-semibold">Today · 5 PM IST</div>
            </div>
          </div>
          <div className="hidden md:flex absolute -right-6 bottom-16 items-center gap-2 rounded-2xl bg-white text-royal-900 px-4 py-3 shadow-xl">
            <ShieldCheck size={18} className="text-emerald-600" />
            <div>
              <div className="text-xs text-slate-500">100% Confidential</div>
              <div className="text-sm font-semibold">Private 1:1 Session</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Trust Strip ---------------- */
function TrustStrip() {
  const items = [
    { icon: Award, label: 'Experienced Astrologer' },
    { icon: Users, label: 'Personalised Consultation' },
    { icon: CalendarClock, label: 'Online Booking' },
    { icon: Sparkles, label: 'Vedic Remedies' },
    { icon: Globe2, label: 'Available Worldwide' },
    { icon: ShieldCheck, label: 'Confidential Sessions' },
  ];
  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3 text-sm text-slate-700 card-lift">
            <div className="w-9 h-9 rounded-lg bg-royal-50 text-royal-800 flex items-center justify-center">
              <it.icon size={16} />
            </div>
            <span className="font-medium">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Problem ---------------- */
function ProblemSection({ onBook }: { onBook: () => void }) {
  const items = [
    { icon: Briefcase, title: 'Career Confusion', desc: 'Stuck in direction, job delays, or struggling for that next breakthrough.' },
    { icon: Heart, title: 'Relationship Issues', desc: 'Marriage delays, compatibility doubts, or recurring conflicts at home.' },
    { icon: Coins, title: 'Financial Stress', desc: 'Blocked income, uncontrolled expenses, or unstable cash flow cycles.' },
    { icon: HomeIcon, title: 'Family Conflict', desc: 'Ongoing disputes, disharmony, or generational disputes weighing on you.' },
    { icon: Clock, title: 'Delayed Success', desc: 'Despite effort, results are slow, opportunities keep slipping past you.' },
    { icon: Flame, title: 'Fear & Indecision', desc: 'Negative patterns, anxiety, or inability to take confident decisions.' },
  ];
  return (
    <section className="py-20 md:py-28 bg-soft-gradient">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-gold-400/15 text-gold-600 text-xs font-semibold uppercase tracking-wider">
            Why Now
          </span>
          <h2 className="mt-4 section-heading">
            Remove uncertainty from <span className="text-gradient-gold">career, relationships,</span>
            <br className="hidden md:block" /> finances and health
          </h2>
          <p className="mt-4 text-slate-600 text-base md:text-lg">
            Life has patterns. When you understand them, the right decisions become obvious. Guru Ji reads your
            kundali to surface what is silently shaping your journey.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="group rounded-2xl bg-white border border-slate-100 p-6 hover:-translate-y-1 hover:shadow-premium transition card-lift"
            >
              <div className="w-11 h-11 rounded-xl bg-royal-50 text-royal-800 flex items-center justify-center mb-4 group-hover:bg-royal-800 group-hover:text-white transition">
                <it.icon size={20} />
              </div>
              <h3 className="font-serif text-xl text-royal-900 font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{it.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onBook}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-royal-800 text-white font-semibold shadow-lg hover:bg-royal-900 transition"
          >
            Get Clarity Today <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function ServicesSection({ onBook }: { onBook: (t: string) => void }) {
  const services = [
    { id: 'normal', title: 'General Consultation', desc: 'Holistic reading on career, relationships, finance and life direction.', duration: '30 mins', icon: Compass },
    { id: 'urgent', title: 'Urgent Consultation', desc: 'Priority slot for pressing life decisions requiring immediate clarity.', duration: '30 mins', icon: Clock },
    { id: 'couple', title: 'Couple Consultation', desc: 'Compatibility, marriage timing and harmony guidance for partners.', duration: '30 mins', icon: Heart },
    { id: 'medical', title: 'Medical Astrology', desc: 'Astrological insight into health patterns and preventive remedies.', duration: '30 mins', icon: Activity },
    { id: 'vastu', title: 'Vastu Consultation', desc: 'Align home and workspace energies for prosperity and peace.', duration: '30 mins', icon: HomeIcon },
    { id: 'normal', title: 'Personalised Remedies', desc: 'Custom rituals, mantras and gemstone guidance rooted in your chart.', duration: 'Included', icon: Sparkles },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-royal-50 text-royal-800 text-xs font-semibold uppercase tracking-wider">
              Our Services
            </span>
            <h2 className="mt-4 section-heading">Guidance crafted for every corner of your life</h2>
          </div>
          <p className="text-slate-600 md:max-w-md">
            Whether you seek clarity on a pressing decision or long-term transformation, there is a consultation
            designed for you.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="group relative rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-[#fdfaf1] p-7 hover:shadow-premium transition card-lift"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/10 rounded-bl-[3rem] rounded-tr-3xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-royal-900 text-gold-400 flex items-center justify-center mb-5">
                  <s.icon size={22} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-royal-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Clock size={13} /> {s.duration}
                  </span>
                  <button
                    onClick={() => onBook(s.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-800 hover:text-gold-600 transition"
                  >
                    Book Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How It Works ---------------- */
function HowItWorks() {
  const items = [
    { icon: Brain, title: 'Personality Insights', desc: 'Understand your innate strengths, tendencies and blind spots.' },
    { icon: Briefcase, title: 'Career Timing', desc: 'Identify the right windows to switch, start or accelerate.' },
    { icon: Heart, title: 'Relationship Compatibility', desc: 'Read how your chart harmonises with a partner or family.' },
    { icon: Coins, title: 'Financial Patterns', desc: 'Decode money cycles and remove blockages in wealth flow.' },
    { icon: Activity, title: 'Health & Energy', desc: 'Recognise dosha imbalances and plan preventive care.' },
    { icon: CalendarClock, title: 'Auspicious Timing', desc: 'Choose the right muhurat for major life milestones.' },
  ];
  return (
    <section className="py-20 md:py-28 bg-[#0a1740] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-royal-500/40 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            How Astrology Helps
          </span>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl font-semibold">
            Astrology is not about predictions. <span className="text-gradient-gold">It is about patterns.</span>
          </h2>
          <p className="mt-4 text-white/75 text-base md:text-lg">
            Planetary positions, houses and signs are a framework. Guru Ji translates them into grounded,
            actionable insight for modern life.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-6 hover:bg-white/10 transition card-lift"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center mb-4">
                <it.icon size={18} />
              </div>
              <h3 className="font-serif text-lg font-semibold">{it.title}</h3>
              <p className="mt-1.5 text-sm text-white/70">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function AboutGuru({ onBook }: { onBook: () => void }) {
  const badges = ['Telegraph', 'Mid-Day', 'News18', 'Tribune', 'LatestLY'];
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold-400/30 to-royal-200 blur-xl opacity-70" />
          <div className="relative rounded-[1.75rem] overflow-hidden shadow-premium aspect-[4/5]">
            <img
              src="https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg?auto=compress&cs=tinysrgb&w=1000"
              className="w-full h-full object-cover"
              alt="Guru Ji"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
            <div className="flex items-center gap-1 text-gold-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} fill="currentColor" />
              ))}
            </div>
            <div>
              <div className="font-semibold text-royal-900 text-sm">4.9 / 5</div>
              <div className="text-xs text-slate-500">10,000+ reviews</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="inline-block px-3 py-1 rounded-full bg-gold-400/15 text-gold-600 text-xs font-semibold uppercase tracking-wider">
            Meet Your Mentor
          </span>
          <h2 className="mt-4 section-heading">Guru Ji Sadhguru ANAND</h2>
          <p className="mt-4 text-slate-600">
            With over 25 years of dedicated practice in Vedic astrology, Vastu Shastra and Medical astrology,
            Guru Ji has guided more than 1.2 lakh individuals across 50+ countries to clarity, calm and purpose.
          </p>
          <p className="mt-3 text-slate-600">
            His approach blends ancient scriptures with grounded, modern counsel — translating planetary wisdom
            into decisions you can act on today. Every session is personal, confidential and focused on outcomes.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              'Award-winning expert in Vedic & Medical astrology',
              'Featured across leading Indian and global media',
              'Personalised remedies drawn from classical texts',
              'Private 1:1 consultations — online & in-person',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Featured In</span>
            {badges.map((b) => (
              <span key={b} className="font-serif text-slate-500 text-lg">
                {b}
              </span>
            ))}
          </div>

          <button
            onClick={onBook}
            className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold shadow-lg hover:-translate-y-0.5 transition"
          >
            Book a Consultation <ArrowRight size={17} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Knowledge ---------------- */
function Knowledge() {
  const items = [
    {
      img: 'https://images.pexels.com/photos/6498308/pexels-photo-6498308.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Astrology',
      title: 'Introduction to Vedic Astrology',
      desc: 'How planetary positions at birth shape your personality and life cycles.',
    },
    {
      img: 'https://images.pexels.com/photos/6076010/pexels-photo-6076010.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Vastu',
      title: 'Vastu Shastra Fundamentals',
      desc: 'The ancient science of aligning spaces for energy, harmony and success.',
    },
    {
      img: 'https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Remedies',
      title: 'Vedic Remedies That Work',
      desc: 'Practical rituals and mantras rooted in classical scriptural guidance.',
    },
  ];
  return (
    <section id="knowledge" className="py-20 md:py-28 bg-soft-gradient">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-royal-50 text-royal-800 text-xs font-semibold uppercase tracking-wider">
              Learn With Us
            </span>
            <h2 className="mt-4 section-heading">Knowledge & insights</h2>
          </div>
          <p className="text-slate-600 md:max-w-sm">
            Curated articles and video content to deepen your understanding of Vedic wisdom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <a
              key={i}
              href="#"
              className="group rounded-3xl overflow-hidden bg-white border border-slate-100 hover:shadow-premium transition card-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={it.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-royal-900 text-xs font-semibold">
                  {it.tag}
                </div>
                <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/95 flex items-center justify-center">
                  <PlayCircle size={22} className="text-royal-800" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-royal-900">{it.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{it.desc}</p>
                <div className="mt-4 text-sm font-semibold text-royal-800 group-hover:text-gold-600 inline-flex items-center gap-1.5">
                  Read more <ArrowRight size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Zodiac ---------------- */
function Zodiac() {
  const signs = [
    { name: 'Aries', symbol: '♈' },
    { name: 'Taurus', symbol: '♉' },
    { name: 'Gemini', symbol: '♊' },
    { name: 'Cancer', symbol: '♋' },
    { name: 'Leo', symbol: '♌' },
    { name: 'Virgo', symbol: '♍' },
    { name: 'Libra', symbol: '♎' },
    { name: 'Scorpio', symbol: '♏' },
    { name: 'Sagittarius', symbol: '♐' },
    { name: 'Capricorn', symbol: '♑' },
    { name: 'Aquarius', symbol: '♒' },
    { name: 'Pisces', symbol: '♓' },
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-gold-400/15 text-gold-600 text-xs font-semibold uppercase tracking-wider">
            Rashi Chakra
          </span>
          <h2 className="mt-4 section-heading">Explore your zodiac</h2>
          <p className="mt-4 text-slate-600">
            Discover the unique imprint of your sign and how its ruling planets shape your path.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5">
          {signs.map((s) => (
            <button
              key={s.name}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-soft-gradient transition card-lift"
            >
              <div className="w-20 h-20 rounded-full gold-border p-[2px]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-serif text-3xl text-royal-900 group-hover:bg-royal-900 group-hover:text-gold-400 transition">
                  {s.symbol}
                </div>
              </div>
              <div className="text-sm font-semibold text-royal-900">{s.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
function PricingSection({ onBook }: { onBook: (t: string) => void }) {
  const plans = [
    { id: 'normal', name: 'Normal Consultation', duration: '30 mins', audio: 11000, video: 15000 },
    { id: 'urgent', name: 'Urgent Consultation', duration: '30 mins', audio: 25000, video: 30000, highlight: true },
    { id: 'couple', name: 'Couple Consultation', duration: '30 mins', audio: 30000, video: 40000 },
    { id: 'couple', name: 'Urgent Couple', duration: '30 mins', audio: 50000, video: 60000 },
    { id: 'medical', name: 'Medical Astrology', duration: '30 mins', audio: 11000, video: 15000 },
    { id: 'medical', name: 'Urgent Medical', duration: '30 mins', audio: 20000, video: 25000 },
    { id: 'vastu', name: 'Vastu Consultation', duration: '30 mins', audio: 30000, video: 40000 },
    { id: 'urgent', name: 'Extended Urgent (1hr)', duration: '60 mins', audio: 75000, video: 90000 },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-soft-gradient">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-royal-50 text-royal-800 text-xs font-semibold uppercase tracking-wider">
            Book Your Call
          </span>
          <h2 className="mt-4 section-heading">One call can change everything</h2>
          <p className="mt-4 text-slate-600">
            Transparent pricing. Choose the consultation that fits your need — Guru Ji will do the rest.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-6 border transition hover:-translate-y-1 hover:shadow-premium card-lift ${
                p.highlight
                  ? 'bg-royal-900 text-white border-royal-800 ring-gold'
                  : 'bg-white border-slate-100'
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white text-[11px] font-bold uppercase tracking-wider">
                  Most Booked
                </div>
              )}
              <h3 className={`font-serif text-xl font-semibold ${p.highlight ? 'text-white' : 'text-royal-900'}`}>
                {p.name}
              </h3>
              <div className={`mt-1 flex items-center gap-1.5 text-sm ${p.highlight ? 'text-white/70' : 'text-slate-500'}`}>
                <Clock size={14} /> {p.duration}
              </div>

              <div className="mt-5 space-y-2">
                <div
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                    p.highlight ? 'bg-white/10' : 'bg-royal-50'
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Headphones size={15} /> Audio
                  </span>
                  <span className="font-semibold">₹{p.audio.toLocaleString('en-IN')}</span>
                </div>
                <div
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                    p.highlight ? 'bg-white/10' : 'bg-royal-50'
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Video size={15} /> Video
                  </span>
                  <span className="font-semibold">₹{p.video.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => onBook(p.id)}
                className={`mt-6 w-full py-3 rounded-full font-semibold text-sm transition ${
                  p.highlight
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:-translate-y-0.5'
                    : 'bg-royal-800 text-white hover:bg-royal-900'
                }`}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          One-time consultations. Slots confirmed after booking. For priority, call{' '}
          <a href={PHONE_TEL} className="text-royal-800 font-semibold">
            {PHONE}
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const items = [
    {
      name: 'Ananya Mehra',
      role: 'Entrepreneur, Mumbai',
      text: 'Guru Ji pinpointed the exact month my career shift would click — it did. The remedies brought a calm I cannot describe.',
    },
    {
      name: 'Rohan Kapoor',
      role: 'Tech Lead, Bengaluru',
      text: 'I consulted many astrologers before. None offered the depth and clarity Guru Ji provided. Grounded, precise, genuinely caring.',
    },
    {
      name: 'Priya Nair',
      role: 'Doctor, Dubai',
      text: 'The Medical astrology session helped me trace a pattern I had missed for years. My family now swears by his guidance.',
    },
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-gold-400/15 text-gold-600 text-xs font-semibold uppercase tracking-wider">
            Client Stories
          </span>
          <h2 className="mt-4 section-heading">Transformations that speak for themselves</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div
              key={i}
              className="rounded-3xl bg-gradient-to-br from-white to-[#fdfaf1] border border-slate-100 p-7 shadow-sm hover:shadow-premium transition card-lift"
            >
              <div className="flex items-center gap-1 text-gold-500 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed">“{t.text}”</p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-royal-900 text-gold-400 flex items-center justify-center font-serif text-lg">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-royal-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    { q: 'How does the consultation work?', a: 'You share your birth details, book a slot and meet Guru Ji on a private audio or video call. A personalised reading and remedies follow.' },
    { q: 'How long is a session?', a: 'Standard sessions are 30 minutes. Extended 60-minute sessions are available for deeper cases.' },
    { q: 'Is the consultation online or in-person?', a: 'Both formats are available. Online sessions happen via video or audio call worldwide.' },
    { q: 'What details do I need to provide?', a: 'Your full name, date, exact time and place of birth. For couple sessions, both partners’ details.' },
    { q: 'Is there a refund policy?', a: 'Bookings are one-time and non-refundable, but rescheduling is supported based on Guru Ji’s availability.' },
    { q: 'How soon can I book?', a: 'Most clients are confirmed within 24–48 hours. Urgent slots are available when possible.' },
    { q: 'What problems can I discuss?', a: 'Career, relationships, marriage, finance, health, family, Vastu, legal concerns and spiritual questions.' },
    { q: 'Are remedies included?', a: 'Yes — every consultation includes personalised remedies rooted in classical Vedic scriptures.' },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28 bg-soft-gradient">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-royal-50 text-royal-800 text-xs font-semibold uppercase tracking-wider">
            FAQs
          </span>
          <h2 className="mt-4 section-heading">Everything you may ask</h2>
        </div>

        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition ${
                  isOpen ? 'bg-white border-royal-100 shadow-premium' : 'bg-white border-slate-100'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-royal-900">{it.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gold-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">{it.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCTA({ onBook }: { onBook: () => void }) {
  return (
    <section className="py-20 md:py-28 bg-cta-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full bg-gold-400/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-royal-500/40 blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 lg:px-8 text-center text-white">
        <Sparkles className="mx-auto text-gold-400 mb-5" size={40} />
        <h2 className="font-serif text-3xl md:text-5xl font-semibold">
          Start your <span className="text-gradient-gold">guidance session</span> today
        </h2>
        <p className="mt-5 text-white/80 max-w-xl mx-auto text-base md:text-lg">
          One call with Guru Ji can unlock the clarity you have been searching for. Book now and let your
          journey toward a clearer life begin.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onBook}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold shadow-xl hover:-translate-y-0.5 transition"
          >
            Book Your Consultation <ArrowRight size={18} />
          </button>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition"
          >
            <Phone size={17} /> {PHONE}
          </a>
        </div>
        <p className="mt-5 text-sm text-white/60">Confidential · Available worldwide · Trusted by 1.2 lakh+ clients</p>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer id="contact" className="bg-[#05102e] text-white/80">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full gold-border flex items-center justify-center">
              <Sparkles size={18} className="text-royal-900" />
            </div>
            <span className="font-serif text-xl text-white">
              Sadhguru<span className="text-gold-400">ANAND</span>
            </span>
          </div>
          <p className="text-sm text-white/60 max-w-xs">
            Premium Vedic astrology, Vastu and remedies from Guru Ji Sadhguru ANAND. Clarity, calm, purpose.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-white transition"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-white text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-gold-400">About Guru Ji</a></li>
            <li><a href="#services" className="hover:text-gold-400">Services</a></li>
            <li><a href="#pricing" className="hover:text-gold-400">Consultations</a></li>
            <li><a href="#knowledge" className="hover:text-gold-400">Articles</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-white text-lg mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gold-400">Timing of Money</a></li>
            <li><a href="#" className="hover:text-gold-400">Manglik Dosh</a></li>
            <li><a href="#" className="hover:text-gold-400">Shakti Rasa or Rasi</a></li>
            <li><a href="#" className="hover:text-gold-400">Dasvani</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-white text-lg mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone size={15} className="text-gold-400 mt-1 flex-shrink-0" />
              <a href={PHONE_TEL}>{PHONE}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={15} className="text-gold-400 mt-1 flex-shrink-0" />
              <a href={EMAIL_MAILTO}>{EMAIL}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="text-gold-400 mt-1 flex-shrink-0" />
              <span>C/o Rahul Strore, Sector 28-C, Chandigarh, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} SadhguruANAND. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold-400">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
