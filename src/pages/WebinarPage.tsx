import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ChevronDown, ArrowRight, Calendar,
  Play, Sparkles, Phone, Star, Clock, Users,
} from 'lucide-react';
import { submitToN8nWebhook, WebhookSubmitError } from '../lib/submitToWebhook';
import { PHONE_TEL, WHATSAPP_URL, GURU_IMG_RESOURCE } from '../lib/constants';
import { TextReveal } from '../components/ui/TextReveal';

/* ── Shared constants ───────────────────────────────────────────────────── */
const DARK_BG = 'linear-gradient(160deg, #001D48 0%, #002D60 40%, #003D78 70%, #001530 100%)';
const GOLD    = 'linear-gradient(135deg,#F3B757 0%,#D88A22 50%,#9A5E14 100%)';

const IMG = {
  hero:    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80&auto=format&fit=crop',
  kundali: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=80&auto=format&fit=crop',
  moon:    'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=900&q=80&auto=format&fit=crop',
  planets: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=900&q=80&auto=format&fit=crop',
  stars:   'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=900&q=80&auto=format&fit=crop',
  milky:   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&auto=format&fit=crop',
  cosmos:  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&auto=format&fit=crop',
};

const WEBINAR_DATE = new Date('2025-06-28T05:30:00.000Z');

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

/* ── Countdown tile (dark variant) ─────────────────────────────────────── */
function DarkTile({ v, label }: { v: number; label: string }) {
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

/* ── Image card (used on dark "What You'll Learn" section) ──────────────── */
function ImgCard({ src, title, desc, accent, delay }: { src: string; title: string; desc: string; accent: string; delay: number }) {
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
      <div className="relative h-52 overflow-hidden">
        <img
          src={src} alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy" decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001530]/90 via-[#001530]/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />
      </div>
      <div className="p-5" style={{ background: 'rgba(0,21,48,0.88)' }}>
        <h3 className="font-cinzel text-sm font-bold uppercase tracking-wide text-white mb-1.5">{title}</h3>
        <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ── Register form ──────────────────────────────────────────────────────── */
function RegisterForm({ dark = false }: { dark?: boolean }) {
  const [form, setForm]     = useState({ name: '', email: '', phone: '' });
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

  const inputBase = dark
    ? 'bg-white/[0.06] border-white/10 text-white placeholder-white/30'
    : 'bg-white border-warm-200 text-ink-900 placeholder-ink-400 shadow-sm';
  const labelColor = dark ? 'text-white/50' : 'text-ink-500';

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 px-4 space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-emerald-500/10 border border-emerald-500/25">
          <CheckCircle2 size={26} className="text-emerald-500" />
        </div>
        <h3 className={`font-serif text-xl font-bold ${dark ? 'text-white' : 'text-ink-900'}`}>You're in!</h3>
        <p className={`text-sm max-w-xs mx-auto ${dark ? 'text-white/60' : 'text-ink-500'}`}>
          Webinar link coming to your email. Join our WhatsApp group for reminders.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide ${dark ? 'bg-white/[0.08] border border-white/15 text-white' : 'bg-warm-100 border border-warm-200 text-ink-700'}`}>
            WhatsApp Group
          </a>
          <a href={PHONE_TEL}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide"
            style={{ background: GOLD, color: '#002D60' }}>
            <Phone size={11} /> Call Us
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {(['name', 'email', 'phone'] as const).map((f) => (
        <div key={f}>
          <label className={`block text-[10px] font-semibold uppercase tracking-wide mb-1.5 ${labelColor}`}>
            {f === 'name' ? 'Full Name' : f === 'email' ? 'Email Address' : 'WhatsApp Number'}
          </label>
          <input
            type={f === 'email' ? 'email' : f === 'phone' ? 'tel' : 'text'}
            required
            value={form[f]}
            onChange={(e) => setForm((p) => ({ ...p, [f]: e.target.value }))}
            placeholder={f === 'name' ? 'Your name' : f === 'email' ? 'your@email.com' : '+91 98765 00000'}
            className={`w-full rounded-xl px-4 py-3 text-sm outline-none border transition-colors duration-200 ${inputBase}`}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(216,138,34,0.6)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.1)' : '')}
          />
        </div>
      ))}
      <AnimatePresence>
        {status === 'error' && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-rose-500">{errMsg}</motion.p>
        )}
      </AnimatePresence>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide btn-shimmer transition-opacity"
        style={{ background: GOLD, color: '#002D60', opacity: status === 'submitting' ? 0.7 : 1 }}
      >
        {status === 'submitting' ? 'Registering…' : 'Reserve My Free Spot →'}
      </button>
      <p className={`text-center text-[10px] ${dark ? 'text-white/30' : 'text-ink-400'}`}>Free · No spam · Replay sent to all registrants</p>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export function WebinarPage() {
  const { days, hours, mins, secs } = useCountdown(WEBINAR_DATE);
  const registerRef = useRef<HTMLDivElement>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [sticky, setSticky]   = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting), { rootMargin: '-60px 0px 0px 0px' });
    if (registerRef.current) obs.observe(registerRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollToReg = () => registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <div>

      {/* ── Gold ribbon ───────────────────────────────────────────── */}
      <div className="py-2 px-4 text-center text-[10px] font-bold uppercase tracking-[0.22em]" style={{ background: GOLD, color: '#001530' }}>
        <Sparkles size={9} className="inline mb-0.5 mr-1.5" />
        Free Live Webinar · 28 June 2025 · 11 AM IST · Limited Seats
        <Sparkles size={9} className="inline mb-0.5 ml-1.5" />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          HERO — DARK (cosmic bg image)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden" style={{ background: DARK_BG }}>
        <img src={IMG.hero} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001D48]/50 via-transparent to-[#001530]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(216,138,34,0.1),transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ background: 'rgba(243,183,87,0.1)', border: '1px solid rgba(243,183,87,0.28)', color: '#F3B757' }}>
            <Play size={9} className="fill-current" />
            Live Vedic Astrology Masterclass
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.05]">
              Decode Your<br />
              <span className="italic font-light" style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Destiny</span>
            </h1>
            <p className="mt-5 text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              One live session with Gurudev Anand. Your chart, your dashas, your life — decoded.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="flex flex-wrap justify-center gap-3">
            {[{ icon: Calendar, t: '28 June 2025, Saturday' }, { icon: Clock, t: '11:00 AM – 12:20 PM IST' }, { icon: Users, t: 'Free · 80 minutes' }].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-2 text-xs text-white/70 rounded-full px-4 py-2"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Icon size={11} className="text-gold-400" />{t}
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30 mb-3">Starts in</p>
            <div className="flex justify-center items-center gap-3">
              <DarkTile v={days} label="Days" />
              <span className="text-2xl text-white/20 pb-4">:</span>
              <DarkTile v={hours} label="Hrs" />
              <span className="text-2xl text-white/20 pb-4">:</span>
              <DarkTile v={mins} label="Min" />
              <span className="text-2xl text-white/20 pb-4">:</span>
              <DarkTile v={secs} label="Sec" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
            <button type="button" onClick={scrollToReg}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-bold uppercase tracking-wide btn-shimmer animate-pulse-glow"
              style={{ background: GOLD, color: '#002D60' }}>
              Register Free Now <ArrowRight size={16} />
            </button>
            <p className="mt-3 text-[10px] text-white/30 uppercase tracking-widest">No credit card · Free replay</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={22} className="text-white/25" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STATS STRIP — LIGHT
      ══════════════════════════════════════════════════════════════ */}
      <div className="py-12 bg-warm-50 border-y border-warm-200">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[{ v: '25+', l: 'Years of Practice' }, { v: '1.2L', l: 'Clients Guided' }, { v: '50+', l: 'Countries' }, { v: 'Free', l: 'No Cost to Attend' }].map((s) => (
            <div key={s.l}>
              <div className="font-cinzel text-2xl md:text-3xl font-bold" style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{s.v}</div>
              <div className="text-[10px] text-ink-500 uppercase tracking-widest mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          WHAT YOU'LL LEARN — DARK
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 overflow-hidden" style={{ background: DARK_BG }}>
        <div className="absolute pointer-events-none inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="text-center max-w-xl mx-auto mb-14">
            <span className="section-eyebrow mb-3 block" style={{ color: '#F3B757' }}>What You'll Learn</span>
            <TextReveal as="h2" className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              One session,{' '}
              <span className="italic font-light" style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>six revelations</span>
            </TextReveal>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5 mb-5">
            <ImgCard src={IMG.kundali} title="Read Your Kundali"      desc="Houses and planets that map your purpose and life path."         accent="#F3B757" delay={0} />
            <ImgCard src={IMG.cosmos}  title="Decode Your Dasha"      desc="How planetary periods control the timing of major events."        accent="#93c5fd" delay={0.07} />
            <ImgCard src={IMG.moon}    title="Love & Relationships"    desc="What your chart reveals about partnership timing."                accent="#f9a8d4" delay={0.14} />
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <ImgCard src={IMG.planets} title="Wealth Cycles"          desc="Jupiter periods and the windows that open financial doors."       accent="#86efac" delay={0.21} />
            <ImgCard src={IMG.milky}   title="Career Clarity"         desc="Which periods favour moves, promotions, and new ventures."        accent="#fca5a5" delay={0.28} />
            <ImgCard src={IMG.stars}   title="Live Q&A"               desc="Ask your chart question in the final open session."               accent="#c7d2fe" delay={0.35} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          AGENDA — LIGHT
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm-50">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="text-center mb-12">
            <span className="section-eyebrow mb-3 block">Session Agenda</span>
            <TextReveal as="h2" className="font-serif text-3xl md:text-4xl font-bold text-ink-900 leading-tight">
              80 minutes,{' '}
              <span className="text-gradient-gold italic font-light">no filler</span>
            </TextReveal>
          </motion.div>

          <div className="space-y-3">
            {[
              { time: '11:00', dur: '10 min', title: 'Welcome & Vedic Foundations',         glyph: '☉' },
              { time: '11:10', dur: '20 min', title: 'Reading the Blueprint of Your Chart', glyph: '♄' },
              { time: '11:30', dur: '20 min', title: 'Dashas — The Clock of Destiny',       glyph: '☽' },
              { time: '11:50', dur: '20 min', title: 'Love, Wealth & Career Indicators',    glyph: '♃' },
              { time: '12:10', dur: '20 min', title: 'Live Q&A with Gurudev Anand',         glyph: '♀' },
            ].map((item, i) => (
              <motion.div key={item.time}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4 bg-white border border-warm-200 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: 'rgba(216,138,34,0.08)', border: '1px solid rgba(216,138,34,0.18)', color: '#D88A22', fontFamily: '"Cormorant Garamond","Apple Symbols","Segoe UI Symbol",serif' }}>
                  {item.glyph}
                </div>
                <span className="font-cinzel text-xs font-bold w-12 shrink-0 text-gold-400">{item.time}</span>
                <span className="text-sm font-semibold text-ink-800 flex-1">{item.title}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest rounded-full px-2.5 py-1 shrink-0 bg-warm-100 text-ink-500 border border-warm-200">{item.dur}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOST — DARK
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 overflow-hidden relative" style={{ background: DARK_BG }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(216,138,34,0.08),transparent_65%)] blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden grid lg:grid-cols-[2fr_3fr]"
            style={{ border: '1px solid rgba(243,183,87,0.15)', background: 'rgba(255,255,255,0.03)' }}>
            {/* Portrait */}
            <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden">
              <img src={GURU_IMG_RESOURCE} alt="Gurudev Anand — host" className="absolute inset-0 w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#001D48]/70 lg:bg-gradient-to-r lg:from-transparent lg:to-[#001D48]" />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center px-8 py-10 lg:px-10">
              <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>Your Host</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                Gurudev{' '}
                <span className="italic font-light" style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Anand</span>
              </h2>
              <p className="text-sm text-white/65 leading-relaxed mb-7 max-w-md">
                Twenty-five years and 1.2 lakh personal consultations. Featured in the Times of India, Hindustan Times, and national television. He brings the same personal depth to every live session.
              </p>
              <div className="flex flex-wrap gap-3 mb-7">
                {[{ g: '♄', v: '25+', l: 'Years' }, { g: '☉', v: '1.2L+', l: 'Clients' }, { g: '♃', v: '50+', l: 'Countries' }].map((s) => (
                  <div key={s.l} className="flex items-center gap-2 rounded-xl px-4 py-2.5" style={{ background: 'rgba(243,183,87,0.07)', border: '1px solid rgba(243,183,87,0.18)' }}>
                    <span className="text-base" style={{ color: '#F3B757', fontFamily: '"Cormorant Garamond","Apple Symbols","Segoe UI Symbol",serif' }}>{s.g}</span>
                    <div>
                      <div className="font-cinzel text-sm font-bold leading-none" style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{s.v}</div>
                      <div className="text-[9px] text-white/40 uppercase tracking-wide mt-0.5">{s.l}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map((i) => <Star key={i} size={13} className="text-gold-400 fill-gold-400" />)}
                <span className="text-xs text-white/40 ml-1">4.9 / 5 · 10,000+ reviews</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TESTIMONIALS — LIGHT
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm-100">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="text-center mb-12">
            <span className="section-eyebrow mb-3 block">Past Attendees</span>
            <TextReveal as="h2" className="font-serif text-3xl md:text-4xl font-bold text-ink-900 leading-tight">
              What people{' '}
              <span className="text-gradient-gold italic font-light">took home</span>
            </TextReveal>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: 'Priya M.',  loc: 'Dubai',   text: 'I joined not expecting much. Two hours later I understood my kundali better than I had in forty years.', stars: 5 },
              { name: 'Arjun K.', loc: 'London',  text: 'The dasha session was a revelation. I finally understood why certain years felt so heavy — and what was coming next.', stars: 5 },
              { name: 'Sunita R.',loc: 'Toronto', text: 'He answered my career question live with such depth. The whole room felt it. I had chills.', stars: 5 },
            ].map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-2xl p-6 flex flex-col overflow-hidden bg-white border border-warm-200 shadow-card">
                <span className="absolute top-3 right-4 text-6xl font-serif leading-none select-none pointer-events-none text-gold-200">"</span>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={12} className="text-gold-400 fill-gold-400" />)}
                </div>
                <p className="text-sm text-ink-600 leading-relaxed flex-1 mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-cinzel text-xs font-bold bg-gold-200 text-gold-600 border border-gold-300">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900 leading-none">{t.name}</p>
                    <p className="text-[10px] text-ink-400 mt-0.5">{t.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          REGISTER — DARK
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 relative overflow-hidden" style={{ background: DARK_BG }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(216,138,34,0.08),transparent_70%)] blur-3xl" />
        </div>
        <div className="relative max-w-lg mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="text-center mb-10">
            <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>Join Us Live</span>
            <TextReveal as="h2" className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
              Secure your{' '}
              <span className="italic font-light" style={{ background: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>free seat</span>
            </TextReveal>
            <p className="mt-3 text-white/45 text-sm">28 June · 11 AM IST · Free · 80 minutes</p>
          </motion.div>
          <motion.div ref={registerRef}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl p-7"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(12px)' }}>
            <RegisterForm dark />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-400" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-400" /> No spam</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-400" /> Replay included</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FAQ — LIGHT
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-warm-50">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} className="text-center mb-10">
            <span className="section-eyebrow mb-3 block">FAQs</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-900">Common questions</h2>
          </motion.div>
          <div className="space-y-2">
            {[
              { q: 'Is this webinar free?',             a: 'Yes — completely free. Register and receive the join link before the session.' },
              { q: 'Do I need to know my birth chart?', a: 'No prior knowledge required. Gurudev Anand walks through basics from the ground up. Birth time is helpful but not mandatory.' },
              { q: 'Will there be a replay?',           a: 'Yes — a replay link is sent to all registrants within 48 hours.' },
              { q: 'Can I ask a personal question?',    a: 'The final 20 minutes is a live Q&A. Submit your question at registration or ask live.' },
              { q: 'What platform?',                    a: 'Zoom. The join link arrives by email and WhatsApp after registration.' },
            ].map((item, i) => (
              <motion.div key={item.q}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-xl overflow-hidden transition-all duration-200 bg-white border"
                style={{ borderColor: faqOpen === i ? 'rgba(216,138,34,0.4)' : '#E5E7EB' }}>
                <button type="button" onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left">
                  <span className="flex-1 text-sm font-semibold text-ink-900">{item.q}</span>
                  <motion.div animate={{ rotate: faqOpen === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={15} className={faqOpen === i ? 'text-gold-400' : 'text-ink-400'} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm text-ink-600 leading-relaxed border-t border-warm-100 pt-3">{item.a}</p>
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
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 pointer-events-none">
            <div className="max-w-md mx-auto rounded-2xl px-5 py-4 flex items-center justify-between gap-4 pointer-events-auto shadow-2xl"
              style={{ background: 'rgba(0,29,72,0.95)', border: '1px solid rgba(243,183,87,0.22)', backdropFilter: 'blur(18px)' }}>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">Free Live Webinar</p>
                <p className="text-[10px] text-white/40 truncate">28 June · 11 AM IST · 80 min</p>
              </div>
              <button type="button" onClick={scrollToReg}
                className="shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide btn-shimmer"
                style={{ background: GOLD, color: '#002D60' }}>
                Register Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
