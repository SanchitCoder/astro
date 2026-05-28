import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ChevronDown, ArrowRight, Calendar,
  Play, Sparkles, Phone, Star, Clock, Users,
} from 'lucide-react';
import { submitToN8nWebhook, WebhookSubmitError } from '../lib/submitToWebhook';
import { useStickyAfterHero } from '../hooks/useStickyAfterHero';
import { PHONE_TEL, WHATSAPP_URL, GURU_IMG_RESOURCE } from '../lib/constants';
import { TextReveal } from '../components/ui/TextReveal';

/* ── Constants ─────────────────────────────────────────────────────────── */
const GOLD = 'linear-gradient(135deg,#F3B757 0%,#D88A22 50%,#9A5E14 100%)';

/* Unsplash images — cosmic / astrology theme */
const IMG = {
  hero:    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80&auto=format&fit=crop',
  kundali: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=80&auto=format&fit=crop',
  moon:    'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=900&q=80&auto=format&fit=crop',
  planets: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=900&q=80&auto=format&fit=crop',
  stars:   'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=900&q=80&auto=format&fit=crop',
  milky:   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&auto=format&fit=crop',
  cosmos:  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&auto=format&fit=crop',
};

const WEBINAR_DATE = new Date('2025-06-28T05:30:00.000Z'); // 28 Jun 2025, 11 AM IST

/* ── Countdown hook ─────────────────────────────────────────────────────── */
function useCountdown(target: Date) {
  const [diff, setDiff] = useState(Math.max(0, target.getTime() - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, target.getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  return {
    days:  Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    mins:  Math.floor((diff % 3_600_000) / 60_000),
    secs:  Math.floor((diff % 60_000) / 1_000),
  };
}

/* ── Countdown tile ─────────────────────────────────────────────────────── */
function Tile({ v, label }: { v: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-cinzel text-2xl sm:text-3xl font-bold"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)' }}
      >
        <span style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          {String(v).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">{label}</span>
    </div>
  );
}

/* ── Image card (for benefits) ──────────────────────────────────────────── */
function ImgCard({
  src, title, desc, accent, delay,
}: { src: string; title: string; desc: string; accent: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-3xl cursor-default"
      style={{ border: `1px solid ${accent}25` }}
    >
      {/* photo */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={src}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001530]/90 via-[#001530]/30 to-transparent" />
        {/* accent top bar */}
        <div
          className="absolute inset-x-0 top-0 h-0.5"
          style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }}
        />
      </div>
      {/* text */}
      <div className="p-5" style={{ background: 'rgba(0,21,48,0.85)' }}>
        <h3 className="font-cinzel text-sm font-bold uppercase tracking-wide text-white mb-1.5">{title}</h3>
        <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ── Register form ──────────────────────────────────────────────────────── */
function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitToN8nWebhook({ source: 'webinar_registration', ...form });
      setStatus('success');
    } catch (err) {
      setErrMsg(err instanceof WebhookSubmitError ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 px-4 space-y-4"
      >
        <div
          className="w-14 h-14 mx-auto rounded-full flex items-center justify-center"
          style={{ background: 'rgba(134,239,172,0.12)', border: '1px solid rgba(134,239,172,0.3)' }}
        >
          <CheckCircle2 size={26} className="text-emerald-400" />
        </div>
        <h3 className="font-serif text-xl font-bold text-white">You're in!</h3>
        <p className="text-white/60 text-sm max-w-xs mx-auto">
          Webinar link coming to your email. Join our WhatsApp group for reminders.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide text-white"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            WhatsApp Group
          </a>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide"
            style={{ background: GOLD, color: '#002D60' }}
          >
            <Phone size={11} /> Call Us
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {(['name', 'email', 'phone'] as const).map((f) => (
        <input
          key={f}
          type={f === 'email' ? 'email' : f === 'phone' ? 'tel' : 'text'}
          required
          value={form[f]}
          onChange={(e) => setForm((p) => ({ ...p, [f]: e.target.value }))}
          placeholder={f === 'name' ? 'Your name' : f === 'email' ? 'Email address' : 'WhatsApp number'}
          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors duration-200"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(243,183,87,0.5)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
      ))}
      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-rose-400"
          >
            {errMsg}
          </motion.p>
        )}
      </AnimatePresence>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide btn-shimmer"
        style={{ background: GOLD, color: '#002D60', opacity: status === 'submitting' ? 0.7 : 1 }}
      >
        {status === 'submitting' ? 'Registering…' : 'Reserve My Free Spot →'}
      </button>
      <p className="text-center text-[10px] text-white/30">Free · No spam · Replay sent to all registrants</p>
    </form>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export function WebinarPage() {
  const { days, hours, mins, secs } = useCountdown(WEBINAR_DATE);
  const heroRef = useRef<HTMLElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const mobileSticky = useStickyAfterHero(heroRef);
  const [desktopSticky, setDesktopSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 639px)');
    const updateMobile = () => setIsMobile(mobileMq.matches);
    updateMobile();
    mobileMq.addEventListener('change', updateMobile);
    return () => mobileMq.removeEventListener('change', updateMobile);
  }, []);

  useEffect(() => {
    const run = () => {
      if (window.matchMedia('(max-width: 639px)').matches) return;
      setDesktopSticky(window.scrollY > window.innerHeight * 0.85);
    };
    run();
    window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);

  const sticky = isMobile ? mobileSticky : desktopSticky;

  const scrollToReg = () => registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <div className="min-h-screen bg-[#000d1e] pb-[calc(9.5rem+env(safe-area-inset-bottom,0px))] sm:pb-0">

      {/* ── Top ribbon ────────────────────────────────────────────────── */}
      <div className="py-2 px-4 text-center text-[10px] font-bold uppercase tracking-[0.22em]" style={{ background: GOLD, color: '#001530' }}>
        <Sparkles size={9} className="inline mb-0.5 mr-1.5" />
        Free Live Webinar · 28 June 2025 · 11 AM IST · Limited Seats
        <Sparkles size={9} className="inline mb-0.5 ml-1.5" />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden">
        {/* full-bleed cosmic bg */}
        <img
          src={IMG.hero}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000d1e]/60 via-transparent to-[#000d1e]" />
        {/* subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(216,138,34,0.12),transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ background: 'rgba(243,183,87,0.1)', border: '1px solid rgba(243,183,87,0.28)', color: '#F3B757' }}
          >
            <Play size={9} className="fill-current" />
            Live Vedic Astrology Masterclass
          </motion.div>

          {/* title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.05]">
              Decode Your
              <br />
              <span
                className="italic font-light"
                style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
              >
                Destiny
              </span>
            </h1>
            <p className="mt-5 text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              One live session with Gurudev Anand. Your chart, your dashas, your life — decoded.
            </p>
          </motion.div>

          {/* meta pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: Calendar, t: '28 June 2025, Saturday' },
              { icon: Clock,    t: '11:00 AM – 12:20 PM IST' },
              { icon: Users,    t: 'Free · 80 minutes' },
            ].map(({ icon: Icon, t }) => (
              <div
                key={t}
                className="flex items-center gap-2 text-xs text-white/70 rounded-full px-4 py-2"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Icon size={11} className="text-gold-400" />
                {t}
              </div>
            ))}
          </motion.div>

          {/* countdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30 mb-3">Starts in</p>
            <div className="flex justify-center items-center gap-3">
              <Tile v={days} label="Days" />
              <span className="text-2xl text-white/20 pb-4">:</span>
              <Tile v={hours} label="Hrs" />
              <span className="text-2xl text-white/20 pb-4">:</span>
              <Tile v={mins} label="Min" />
              <span className="text-2xl text-white/20 pb-4">:</span>
              <Tile v={secs} label="Sec" />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <button
              type="button"
              onClick={scrollToReg}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-bold uppercase tracking-wide btn-shimmer animate-pulse-glow"
              style={{ background: GOLD, color: '#002D60' }}
            >
              Register Free Now
              <ArrowRight size={16} />
            </button>
            <p className="mt-3 text-[10px] text-white/30 uppercase tracking-widest">No credit card · Free replay</p>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={22} className="text-white/25" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────── */}
      <div className="py-10 border-y border-white/[0.06]" style={{ background: 'rgba(0,29,72,0.7)' }}>
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { v: '25+',  l: 'Years of Practice' },
            { v: '1.2L', l: 'Clients Guided' },
            { v: '50+',  l: 'Countries' },
            { v: 'Free', l: 'No Cost to Attend' },
          ].map((s) => (
            <div key={s.l}>
              <div
                className="font-cinzel text-2xl md:text-3xl font-bold"
                style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
              >
                {s.v}
              </div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── What you'll learn — image cards ──────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-xl mx-auto mb-14"
          >
            <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>
              What You'll Learn
            </span>
            <TextReveal as="h2" className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              One session,{' '}
              <span className="italic font-light" style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                six revelations
              </span>
            </TextReveal>
          </motion.div>

          {/* 3-col top row */}
          <div className="grid sm:grid-cols-3 gap-5 mb-5">
            <ImgCard src={IMG.kundali} title="Read Your Kundali" desc="Understand the houses and planets that map your purpose and life path." accent="#F3B757" delay={0} />
            <ImgCard src={IMG.cosmos}  title="Decode Your Dasha" desc="Learn how planetary periods control the exact timing of major events." accent="#93c5fd" delay={0.07} />
            <ImgCard src={IMG.moon}    title="Love & Relationships" desc="What your chart reveals about partnership timing and compatibility." accent="#f9a8d4" delay={0.14} />
          </div>
          {/* 3-col bottom row */}
          <div className="grid sm:grid-cols-3 gap-5">
            <ImgCard src={IMG.planets} title="Wealth Cycles" desc="Jupiter periods and the planetary windows that open financial doors." accent="#86efac" delay={0.21} />
            <ImgCard src={IMG.milky}   title="Career Clarity" desc="Which periods favour moves, promotions, and new ventures." accent="#fca5a5" delay={0.28} />
            <ImgCard src={IMG.stars}   title="Live Q&A" desc="Ask Gurudev Anand your chart question in the final open session." accent="#c7d2fe" delay={0.35} />
          </div>
        </div>
      </section>

      {/* ── Agenda — visual timeline ──────────────────────────────────── */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        {/* bg image strip */}
        <div className="absolute inset-0 overflow-hidden">
          <img src={IMG.cosmos} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-[0.07]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000d1e] via-transparent to-[#000d1e]" />
        </div>

        <div className="relative max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>
              Session Agenda
            </span>
            <TextReveal as="h2" className="font-serif text-3xl md:text-4xl font-bold text-white">
              80 minutes,{' '}
              <span className="italic font-light" style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                no filler
              </span>
            </TextReveal>
          </motion.div>

          <div className="space-y-3">
            {[
              { time: '11:00', dur: '10 min', title: 'Welcome & Vedic Foundations', glyph: '☉' },
              { time: '11:10', dur: '20 min', title: 'Reading the Blueprint of Your Chart', glyph: '♄' },
              { time: '11:30', dur: '20 min', title: 'Dashas — The Clock of Destiny', glyph: '☽' },
              { time: '11:50', dur: '20 min', title: 'Love, Wealth & Career Indicators', glyph: '♃' },
              { time: '12:10', dur: '20 min', title: 'Live Q&A with Gurudev Anand', glyph: '♀' },
            ].map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* glyph */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: 'rgba(243,183,87,0.1)', border: '1px solid rgba(243,183,87,0.2)', color: '#F3B757', fontFamily: '"Cormorant Garamond","Apple Symbols","Segoe UI Symbol",serif' }}
                >
                  {item.glyph}
                </div>
                {/* time */}
                <span className="font-cinzel text-xs font-bold w-12 shrink-0" style={{ color: '#F3B757' }}>{item.time}</span>
                {/* title */}
                <span className="text-sm font-semibold text-white flex-1">{item.title}</span>
                {/* duration badge */}
                <span
                  className="text-[9px] font-bold uppercase tracking-widest rounded-full px-2.5 py-1 shrink-0"
                  style={{ background: 'rgba(243,183,87,0.08)', color: 'rgba(243,183,87,0.5)', border: '1px solid rgba(243,183,87,0.15)' }}
                >
                  {item.dur}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Host section ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(216,138,34,0.07),transparent_65%)] blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden grid lg:grid-cols-[2fr_3fr]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Portrait */}
            <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden">
              <img
                src={GURU_IMG_RESOURCE}
                alt="Gurudev Anand — host of the webinar"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* gradient fade into card bg on right edge */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000d1e]/80 lg:bg-gradient-to-r lg:from-transparent lg:to-[#000d1e]" />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center px-8 py-10 lg:px-10">
              <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>
                Your Host
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                Gurudev{' '}
                <span
                  className="italic font-light"
                  style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
                >
                  Anand
                </span>
              </h2>
              <p className="text-sm text-white/65 leading-relaxed mb-7 max-w-md">
                Twenty-five years and 1.2 lakh personal consultations. Gurudev Anand is one of India's most trusted Vedic astrologers — featured in the Times of India, Hindustan Times, and national television. He brings the same personal depth to every live session.
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3 mb-7">
                {[
                  { g: '♄', v: '25+', l: 'Years' },
                  { g: '☉', v: '1.2L+', l: 'Clients' },
                  { g: '♃', v: '50+', l: 'Countries' },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5"
                    style={{ background: 'rgba(243,183,87,0.07)', border: '1px solid rgba(243,183,87,0.18)' }}
                  >
                    <span
                      className="text-base"
                      style={{ color: '#F3B757', fontFamily: '"Cormorant Garamond","Apple Symbols","Segoe UI Symbol",serif' }}
                    >
                      {s.g}
                    </span>
                    <div>
                      <div
                        className="font-cinzel text-sm font-bold leading-none"
                        style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
                      >
                        {s.v}
                      </div>
                      <div className="text-[9px] text-white/40 uppercase tracking-wide mt-0.5">{s.l}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map((i) => <Star key={i} size={13} className="text-gold-400 fill-gold-400" />)}
                <span className="text-xs text-white/40 ml-1">4.9 / 5 · 10,000+ reviews</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials — visual quotes ─────────────────────────────── */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(0,94,168,0.09),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>Past Attendees</span>
            <TextReveal as="h2" className="font-serif text-3xl md:text-4xl font-bold text-white">
              What people{' '}
              <span className="italic font-light" style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                took home
              </span>
            </TextReveal>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: 'Priya M.', loc: 'Dubai', text: 'I joined not expecting much. Two hours later I understood my kundali better than I had in forty years.', stars: 5 },
              { name: 'Arjun K.', loc: 'London', text: 'The dasha session was a revelation. I finally understood why certain years felt so heavy — and what was coming next.', stars: 5 },
              { name: 'Sunita R.', loc: 'Toronto', text: 'He answered my career question live with such depth. The whole room felt it. I had chills.', stars: 5 },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-2xl p-6 flex flex-col overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* large quote mark */}
                <span
                  className="absolute top-3 right-4 text-6xl font-serif leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(243,183,87,0.1)' }}
                >
                  "
                </span>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={12} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-sm text-white/70 leading-relaxed flex-1 mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-cinzel text-xs font-bold"
                    style={{ background: 'rgba(243,183,87,0.12)', color: '#F3B757', border: '1px solid rgba(243,183,87,0.2)' }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-none">{t.name}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{t.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Register section ─────────────────────────────────────────── */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        {/* bg */}
        <div className="absolute inset-0 overflow-hidden">
          <img src={IMG.milky} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000d1e] via-transparent to-[#000d1e]" />
        </div>
        <div className="relative max-w-lg mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>
              Join Us Live
            </span>
            <TextReveal as="h2" className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
              Secure your{' '}
              <span className="italic font-light" style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                free seat
              </span>
            </TextReveal>
            <p className="mt-3 text-white/45 text-sm">28 June · 11 AM IST · Free · 80 minutes</p>
          </motion.div>

          <motion.div
            ref={registerRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl p-7"
            style={{ background: 'rgba(0,21,48,0.7)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(12px)' }}
          >
            <RegisterForm />
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>FAQs</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Common questions</h2>
          </motion.div>

          <div className="space-y-2">
            {[
              { q: 'Is this webinar free?', a: 'Yes — completely free. Register and receive the join link before the session.' },
              { q: 'Do I need to know my birth chart?', a: 'No prior knowledge required. Gurudev Anand walks through basics from the ground up. Birth time is helpful but not mandatory.' },
              { q: 'Will there be a replay?', a: 'Yes — a replay link is sent to all registrants within 48 hours.' },
              { q: 'Can I ask a personal question?', a: 'The final 20 minutes is a live Q&A. Submit your question at registration or ask live.' },
              { q: 'What platform?', a: 'Zoom. The join link arrives by email and WhatsApp after registration.' },
            ].map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-xl overflow-hidden transition-colors duration-200"
                style={{
                  border: faqOpen === i ? '1px solid rgba(243,183,87,0.28)' : '1px solid rgba(255,255,255,0.07)',
                  background: faqOpen === i ? 'rgba(243,183,87,0.04)' : 'rgba(255,255,255,0.03)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                >
                  <span className="flex-1 text-sm font-semibold text-white/90">{item.q}</span>
                  <motion.div animate={{ rotate: faqOpen === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={15} style={{ color: faqOpen === i ? '#F3B757' : 'rgba(255,255,255,0.3)' }} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-white/55 leading-relaxed border-t border-white/[0.06] pt-3">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky bar ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {sticky && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="webinar-sticky-offset sticky-cta-shell fixed inset-x-0 z-[70] pointer-events-none"
          >
            <div className="sticky-cta-bar pointer-events-auto">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold leading-tight text-white sm:text-xs">
                  Free Live Webinar
                </p>
                <p className="truncate text-[9px] text-white/45 sm:text-[10px]">28 Jun · 11 AM · 80 min</p>
              </div>
              <button
                type="button"
                onClick={scrollToReg}
                className="sticky-cta-btn btn-shimmer min-h-[36px] sm:min-h-[38px]"
                style={{ background: GOLD, color: '#002D60' }}
              >
                Register Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
