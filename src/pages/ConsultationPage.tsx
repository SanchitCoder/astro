import { useState, useEffect, useRef, type RefObject } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Star, CheckCircle2, ChevronDown, ArrowRight,
  Phone, Video, MapPin, Clock, Users, Newspaper,
  Zap, Heart, TrendingUp, Home as HomeIcon, Briefcase,
  Shield, Award, Play,
} from 'lucide-react';
import type { SiteOutletContext } from '../components/layout/SiteLayout';
import { useStickyAfterHero } from '../hooks/useStickyAfterHero';
import {
  GURU_IMG, GURU_IMG_ABOUT, GURU_IMG_RESOURCE, GURU_IMG_GALLERY,
  SCIENCE_IMG_JYOTISH, SCIENCE_IMG_VASTU, SCIENCE_IMG_MEDICAL,
  PRICE_AUDIO_INR, PRICE_VIDEO_INR,
  PHONE as PHONE_NUM, PHONE_TEL, WHATSAPP_URL,
} from '../lib/constants';

/* ─── shared ─────────────────────────────────────────────────── */
const DARK_BG  = 'linear-gradient(160deg, #001D48 0%, #002D60 40%, #003D78 70%, #001530 100%)';
const GOLD_GRD = 'linear-gradient(135deg, #F3B757 0%, #D88A22 50%, #9A5E14 100%)';

const fmtInr = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

function GoldCTA({ children, onClick, size = 'lg', className = '' }: {
  children: React.ReactNode; onClick?: () => void;
  size?: 'sm' | 'lg'; className?: string;
}) {
  const pad = size === 'lg' ? 'px-8 py-4 text-sm' : 'px-5 py-2.5 text-xs';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wide btn-shimmer transition-all duration-300 animate-pulse-glow hover:shadow-gold-glow ${pad} ${className}`}
      style={{ background: GOLD_GRD, color: '#002D60' }}
    >
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════
   1. ANNOUNCEMENT BAR
══════════════════════════════════════════════════════════════ */
function AnnouncementBar({ onBook }: { onBook?: () => void }) {
  const [slots] = useState(7);
  return (
    <div
      className="relative flex items-center justify-center gap-4 py-2.5 text-center text-[11px] font-bold"
      style={{ background: GOLD_GRD, color: '#002D60' }}
    >
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#002D60] animate-pulse" />
        Only <strong>{slots} slots</strong> remaining this week
      </span>
      <span className="hidden sm:inline">·</span>
      <button
        type="button"
        onClick={onBook}
        className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#002D60] px-3 py-1 text-[10px] text-white font-bold uppercase tracking-wide"
      >
        Reserve yours <ArrowRight size={10} />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. HERO — full-bleed image with overlay text
══════════════════════════════════════════════════════════════ */
/* ︎ = Variation Selector-15: forces text (not emoji) rendering on Android/iOS */
const T = '︎';
const HERO_STATS = [
  { value: '1.2L+', label: 'Consultations', glyph: '☉' + T },
  { value: '50+',   label: 'Countries',     glyph: '♃' + T },
  { value: '25+',   label: 'Years',         glyph: '♄' + T },
  { value: '4.9★',  label: '10k Reviews',   glyph: '♀' + T },
];

function HeroSection({
  onBook,
  heroRef,
}: {
  onBook?: () => void;
  heroRef?: RefObject<HTMLElement | null>;
}) {
  const localRef = useRef<HTMLElement>(null);
  const ref = heroRef ?? localRef;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-end overflow-hidden" style={{ background: DARK_BG }}>
      {/* Parallax portrait */}
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <img
          src={GURU_IMG}
          alt="Gurudev Anand"
          className="w-full h-full object-cover object-top"
          style={{ opacity: 0.35 }}
        />
        {/* Multi-stop gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, #001530 0%, rgba(0,21,48,0.85) 30%, rgba(0,21,48,0.45) 60%, rgba(0,21,48,0.2) 100%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(0,21,48,0.9) 0%, rgba(0,21,48,0.4) 55%, transparent 100%)',
        }} />
      </motion.div>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(216,138,34,0.08),transparent_60%)] blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,94,168,0.12),transparent_65%)] blur-3xl" />
      </div>

      {/* Right: large portrait card (desktop) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block w-[380px] xl:w-[420px] z-10">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glowing ring */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold-400/20 via-transparent to-nebula-600/15 blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden border border-gold-400/20 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.9)]">
            <img
              src={GURU_IMG_ABOUT}
              alt="Gurudev Anand"
              className="w-full aspect-[3/4] object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001530]/70 via-transparent to-transparent" />

            {/* Name plate */}
            <div className="absolute bottom-5 left-5 right-5">
              <div className="font-cinzel text-base font-bold tracking-widest uppercase" style={{ color: '#F3B757' }}>
                Gurudev Anand
              </div>
              <div className="text-xs text-white/60 mt-0.5">Vedic Astrologer · Vastu · Medical Astrology</div>
              <div className="mt-2 flex gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={11} className="fill-gold-400 text-gold-400" />)}
                <span className="text-[10px] text-white/60 ml-1">4.9 from 10,000+ clients</span>
              </div>
            </div>

            {/* Active badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#001530]/70 px-3 py-1.5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wide">Accepting Clients</span>
            </div>

            {/* Rating badge */}
            <div className="absolute top-4 right-4 rounded-2xl border border-white/10 bg-[#001530]/80 px-3 py-2 backdrop-blur-sm text-center">
              <div className="font-cinzel text-xl font-bold" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                4.9/5
              </div>
              <div className="text-[9px] text-white/50 uppercase tracking-wide">10k+ reviews</div>
            </div>
          </div>

          {/* Floating stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -left-10 top-1/3 rounded-2xl border border-white/10 bg-[#001530]/90 px-4 py-3 backdrop-blur-md shadow-xl"
          >
            <div className="font-cinzel text-base font-bold" style={{ color: '#F3B757' }}>1.2 Lakh+</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wide">Consultations</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute -right-6 bottom-1/3 rounded-2xl border border-white/10 bg-[#001530]/90 px-4 py-3 backdrop-blur-md shadow-xl"
          >
            <div className="font-cinzel text-base font-bold" style={{ color: '#F3B757' }}>50+</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wide">Countries</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Left: content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 pb-14 pt-24 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/35 bg-gold-400/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            Personal 1-on-1 Vedic Consultation
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[4rem] font-bold leading-[1.06] tracking-tight text-white">
            Remove{' '}
            <span className="italic font-light" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Uncertainty
            </span>
            <br />from Your Career,<br />
            <span className="text-white/70 font-light text-[0.85em]">Relationships &amp; Finances</span>
          </h1>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-white/80 max-w-lg">
            Read your kundali. Understand the timing behind every major life decision — decoded live in a private session with India's most trusted Vedic astrologer.
          </p>

          {/* Session pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { icon: <Video size={13} />, text: 'Audio or Video' },
              { icon: <Clock size={13} />, text: '60 – 90 Min' },
              { icon: <MapPin size={13} />, text: 'Online / In-Person' },
              { icon: <Shield size={13} />, text: '100% Private' },
            ].map((p) => (
              <span key={p.text} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[11px] text-white/80 font-medium">
                <span className="text-gold-400">{p.icon}</span>
                {p.text}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GoldCTA onClick={onBook}>
              Book Your Session Now <ArrowRight size={14} />
            </GoldCTA>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-7 py-4 text-sm font-semibold text-white transition-all hover:border-gold-400/35 hover:bg-white/[0.12]"
            >
              Chat on WhatsApp
            </a>
          </div>

          <p className="mt-3 text-[11px] text-white/35 uppercase tracking-wider">
            ↑ Hurry — limited slots available this week
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl lg:max-w-md"
        >
          {HERO_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.06] px-4 py-3 text-center backdrop-blur-sm"
            >
              <div className="font-serif text-sm mb-0.5" style={{ color: '#F3B757', fontFamily: '"Playfair Display","Apple Symbols","Segoe UI Symbol",serif' }}>
                {s.glyph}
              </div>
              <div className="font-cinzel text-lg font-bold" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {s.value}
              </div>
              <div className="text-[9px] text-white/50 uppercase tracking-wide mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#001530] to-transparent pointer-events-none" />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   3. FEATURED IN — scrolling press marquee
══════════════════════════════════════════════════════════════ */
const PRESS = ['Outlook', 'The Telegraph', 'News18', 'Latest17', 'The Tribune', 'Mid-Day', 'Hindustan Times', 'Dainik Bhaskar', 'Times of India', 'Living India News'];
const PRESS2 = [...PRESS, ...PRESS];

function FeaturedInBar() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] py-5" style={{ background: 'linear-gradient(90deg,#001530,#002D60,#001530)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_50%_50%,rgba(216,138,34,0.05),transparent_70%)] pointer-events-none" />
      <div className="mb-4 flex items-center gap-6 px-6 sm:px-10">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">Featured In</span>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      <div className="relative [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="press-marquee-track flex w-max gap-3" style={{ animationDuration: '40s' }}>
          {PRESS2.map((n, i) => (
            <span key={i} className="shrink-0 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 hover:border-gold-400/40 hover:text-white transition-colors">
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. PAIN POINTS — "Why does this keep happening to me?"
══════════════════════════════════════════════════════════════ */
const PAINS = [
  { icon: <TrendingUp size={18} />, text: 'Working hard but promotions & recognition feel stuck' },
  { icon: <Heart size={18} />,     text: 'Attracting the same type of person again and again' },
  { icon: <Briefcase size={18} />, text: 'Money doesn\'t stay or grow the way you want' },
  { icon: <Zap size={18} />,       text: 'Feel like you\'re living someone else\'s script' },
  { icon: <Users size={18} />,     text: 'Misunderstood by people you\'re closest to' },
  { icon: <HomeIcon size={18} />,  text: 'Health or home energy feels constantly off' },
];

function PainPointsSection({ onBook }: { onBook?: () => void }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: '#F8F9FB' }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(216,138,34,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,94,168,0.05),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: visual quote + pains */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400 mb-3">Kabhi socha hai</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 leading-tight mb-8">
              "Why does this<br />keep{' '}
              <span className="italic font-light" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                happening
              </span>
              <br />to me?"
            </h2>

            <div className="space-y-3">
              {PAINS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 rounded-xl border border-gold-400/12 bg-white px-4 py-3 shadow-sm"
                >
                  <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'rgba(216,138,34,0.1)', color: '#D88A22' }}>
                    {p.icon}
                  </span>
                  <p className="text-sm text-ink-700 leading-snug">{p.text}</p>
                  <span className="ml-auto text-[10px] font-bold rounded-full px-2 py-0.5 bg-red-50 text-red-400 border border-red-100 shrink-0">✗</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: image + answer card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="relative"
          >
            {/* Decorative glow */}
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-gold-400/10 via-transparent to-nebula-600/8 blur-3xl" />

            {/* Kundali chart illustration */}
            <div className="relative rounded-3xl overflow-hidden border border-gold-400/15 shadow-xl">
              <img src={GURU_IMG_GALLERY} alt="Kundali Reading" className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001530]/80 via-[#001530]/20 to-transparent" />

              {/* Answer overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="rounded-2xl border border-gold-400/30 bg-[#001530]/85 p-5 backdrop-blur-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#F3B757' }}>
                    The answer lies in your Kundali ♈
                  </p>
                  <p className="text-white/85 text-sm leading-relaxed">
                    Your birth chart is a precise map of planetary positions at the moment you were born. It explains <em>why</em> these patterns repeat — and exactly when they will shift.
                  </p>
                  <button
                    type="button"
                    onClick={onBook}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold uppercase tracking-wide btn-shimmer"
                    style={{ background: GOLD_GRD, color: '#002D60' }}
                  >
                    Uncover Life's Secrets – Book Now <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. PATTERNS — "It's about PATTERNS" with life area visuals
══════════════════════════════════════════════════════════════ */
const AREAS = [
  { img: SCIENCE_IMG_JYOTISH, glyph: '♑' + T, title: 'Your Personality Blueprint', sub: 'Who you truly are — beneath every role you play' },
  { img: SCIENCE_IMG_VASTU,   glyph: '♀' + T, title: 'Career & Money Timing',      sub: 'When to act, when to wait, which direction opens' },
  { img: SCIENCE_IMG_MEDICAL, glyph: '♂' + T, title: 'Relationship Dynamics',      sub: 'Compatibility, timing, and repeating patterns' },
  { img: null,                glyph: '♃' + T, title: 'Health & Energy Cycles',     sub: 'Why your body responds differently at certain times' },
  { img: null,                glyph: '☉' + T, title: 'Auspicious Timing',          sub: 'The most underrated factor in every major decision' },
];

function PatternsSection({ onBook }: { onBook?: () => void }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: '#EFF1F5' }}>
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-400 mb-3">The truth about Vedic Astrology</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 leading-tight">
            Astrology is not about{' '}
            <span className="italic font-light text-ink-400">predictions</span>.<br />
            It's about{' '}
            <span style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              PATTERNS.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-ink-500 text-base leading-relaxed">
            Planets ke positions, houses ka system, saptva energy — ye sab ek framework hai jo explain karta hai why your life moves the way it does.
          </p>
        </motion.div>

        {/* Image-rich area grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {AREAS.slice(0, 3).map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden border border-gold-400/15 shadow-card card-lift group"
              style={{ minHeight: 220 }}
            >
              {a.img ? (
                <>
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001530]/85 via-[#001530]/30 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#002D60,#003D78)' }} />
              )}
              <div className="relative p-6 flex flex-col justify-end h-full" style={{ minHeight: 220 }}>
                <div className="font-serif text-3xl mb-3" style={{ color: '#F3B757', fontFamily: '"Playfair Display","Apple Symbols","Segoe UI Symbol",serif' }}>
                  {a.glyph}
                </div>
                <h3 className="font-semibold text-white text-base leading-snug mb-1">{a.title}</h3>
                <p className="text-white/65 text-xs leading-snug">{a.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12 max-w-2xl mx-auto">
          {AREAS.slice(3).map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (i + 3) * 0.1 }}
              className="relative rounded-2xl overflow-hidden border border-gold-400/15 shadow-card card-lift"
              style={{ minHeight: 160 }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#002D60,#003D78)' }} />
              <div className="relative p-6 flex flex-col justify-end h-full" style={{ minHeight: 160 }}>
                <div className="font-serif text-3xl mb-2" style={{ color: '#F3B757', fontFamily: '"Playfair Display","Apple Symbols","Segoe UI Symbol",serif' }}>
                  {a.glyph}
                </div>
                <h3 className="font-semibold text-white text-sm leading-snug mb-1">{a.title}</h3>
                <p className="text-white/60 text-xs">{a.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <GoldCTA onClick={onBook}>
            Uncover Life's Secrets – Book Now <ArrowRight size={14} />
          </GoldCTA>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. HOW IT WORKS — 3-step process diagram
══════════════════════════════════════════════════════════════ */
const STEPS = [
  {
    n: '01',
    icon: <Phone size={22} />,
    title: 'Book Your Slot',
    desc: 'Fill the form or WhatsApp us. We confirm your session within 24 hours.',
    color: '#D88A22',
  },
  {
    n: '02',
    icon: <Play size={22} />,
    title: 'Share Birth Details',
    desc: 'Send your name, date, time & place of birth. Gurudev prepares your chart personally.',
    color: '#1A7FD0',
  },
  {
    n: '03',
    icon: <Award size={22} />,
    title: 'Receive Your Reading',
    desc: 'A private 1-on-1 session — your chart decoded, your questions answered, remedies delivered.',
    color: '#D88A22',
  },
];

function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: DARK_BG }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,94,168,0.1),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>Simple Process</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
            How your{' '}
            <span className="italic font-light" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              session works
            </span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connector line (desktop) */}
          <div className="absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-gold-400/30 via-nebula-400/40 to-gold-400/30 hidden md:block" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Step circle */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center border"
                  style={{ background: `${s.color}15`, borderColor: `${s.color}40`, color: s.color }}
                >
                  {s.icon}
                </div>
                {/* Step number badge */}
                <span
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center font-cinzel text-[10px] font-bold"
                  style={{ background: s.color, color: '#002D60' }}
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="font-cinzel text-base font-bold text-white mb-3">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-[220px] mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   7. WHAT YOU GAIN — 6 gain cards
══════════════════════════════════════════════════════════════ */
const GAINS = [
  { icon: <Award size={20} />,     title: 'Your Full Birth Chart Decoded',   desc: 'Every house, sign, and planet read in the context of your actual life — not a template.' },
  { icon: <TrendingUp size={20} />, title: 'Career & Money Clarity',         desc: 'Understand the planetary periods affecting your professional and financial trajectory right now.' },
  { icon: <Heart size={20} />,     title: 'Relationship Patterns Explained', desc: 'Why you attract who you attract — and what the chart says about compatibility and timing.' },
  { icon: <Zap size={20} />,       title: 'Personalised Remedies',          desc: 'Mantras, rituals, or gemstone guidance chosen specifically for your chart — from classical texts.' },
  { icon: <HomeIcon size={20} />,  title: 'Vastu & Space Alignment',        desc: 'How your home or workspace can be aligned with what your chart reveals for maximum harmony.' },
  { icon: <Shield size={20} />,    title: 'Actionable Life Strategy',       desc: 'Leave the session knowing exactly what to do, when to act, and what to avoid in the months ahead.' },
];

function WhatYouGainSection({ onBook }: { onBook?: () => void }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: '#F8F9FB' }}>
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#D88A22' }}>
            What You Will Gain
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 leading-tight">
            In Your{' '}
            <span className="italic font-light" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Personal Session
            </span>
          </h2>
          <p className="mt-4 text-ink-500 text-sm max-w-xl mx-auto leading-relaxed">
            Every consultation is a live, personal reading — not a template. Here's what unfolds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {GAINS.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card glass-card-hover rounded-2xl p-6 card-lift"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(216,138,34,0.1)', color: '#D88A22', border: '1px solid rgba(216,138,34,0.2)' }}
              >
                {g.icon}
              </div>
              <h3 className="font-semibold text-ink-900 text-sm mb-2 leading-snug">{g.title}</h3>
              <p className="text-ink-500 text-xs leading-relaxed">{g.desc}</p>
              <div className="mt-4 pt-3 border-t border-gold-400/10">
                <CheckCircle2 size={13} className="text-gold-500 inline mr-1.5" />
                <span className="text-[11px] text-gold-600 font-semibold">Included in every session</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <GoldCTA onClick={onBook}>
            Book My Personal Session <ArrowRight size={14} />
          </GoldCTA>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   8. MENTOR — split layout with large image
══════════════════════════════════════════════════════════════ */
const BULLETS = [
  '25+ years of Vedic Astrology practice',
  'Expert in Jyotish, Vastu Shastra & Medical Astrology',
  'Global clientele from US, UK, UAE & Middle East',
  'Reads every kundali personally — no assistants, no templates',
  'Award-winning speaker on prestigious platforms & podcasts',
  'Taught 1,000+ students to become professional astrologers',
  'Spiritual guide featured in Outlook, Tribune, Hindustan Times',
  'Known for plain, actionable explanations of complex planetary patterns',
];

function MentorSection({ onBook }: { onBook?: () => void }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: DARK_BG }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(216,138,34,0.09),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,94,168,0.12),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-gold-400/15 via-nebula-600/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -inset-8 rounded-full border border-gold-400/[0.07] animate-[spin_45s_linear_infinite] pointer-events-none" />
            <div className="relative rounded-[2.5rem] overflow-hidden border border-gold-400/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)] max-w-md mx-auto lg:max-w-none">
              <img src={GURU_IMG_ABOUT} alt="Gurudev Anand" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001530]/80 via-transparent to-transparent" />

              {/* Floating rating */}
              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="absolute top-5 right-2 rounded-2xl border border-white/10 bg-[#001530]/80 px-4 py-2.5 backdrop-blur-md text-center sm:-right-4"
              >
                <div className="font-cinzel text-xl font-bold" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>4.9 / 5</div>
                <div className="text-[9px] text-white/60 uppercase tracking-wide">10,000+ reviews</div>
              </motion.div>
            </div>

            {/* Stats row below image */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { val: '25+', lab: 'Years', g: '♄' },
                { val: '1.2L+', lab: 'Clients', g: '☉' },
                { val: '50+', lab: 'Countries', g: '♃' },
              ].map((s) => (
                <div key={s.lab} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 text-center">
                  <div className="font-serif text-lg mb-0.5" style={{ color: '#F3B757', fontFamily: '"Playfair Display","Apple Symbols","Segoe UI Symbol",serif' }}>{s.g}</div>
                  <div className="font-cinzel text-base font-bold" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{s.val}</div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wide mt-0.5">{s.lab}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div>
              <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>Meet Your Mentor</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Gurudev{' '}
                <span className="italic font-light" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Anand</span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-gold-400 text-gold-400" />)}
              <span className="text-xs text-white/70 ml-1">Trusted by clients across 50+ countries</span>
            </div>

            <ul className="space-y-2.5">
              {BULLETS.map((b) => (
                <motion.li key={b} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-start gap-3">
                  <CheckCircle2 size={15} className="text-gold-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/80 leading-relaxed">{b}</span>
                </motion.li>
              ))}
            </ul>

            {/* Press tags */}
            <div className="pt-4 border-t border-white/[0.07]">
              <div className="flex items-center gap-2 mb-3">
                <Newspaper size={13} className="text-gold-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">As featured in</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Outlook', 'Latest17', 'Mid-Day', 'Tribune', 'Hindustan Times'].map((p) => (
                  <span key={p} className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white/60">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <GoldCTA onClick={onBook}>
              Book My Session with Gurudev <ArrowRight size={14} />
            </GoldCTA>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   9. BONUS / FREE GUIDE — with real image
══════════════════════════════════════════════════════════════ */
function BonusSection({ onBook }: { onBook?: () => void }) {
  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: '#EFF1F5' }}>
      <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-gold-400/20 shadow-premium bg-white"
        >
          <div className="grid md:grid-cols-[240px_1fr]">
            {/* Book visual */}
            <div className="relative" style={{ background: DARK_BG }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(216,138,34,0.2),transparent_60%)]" />
              <div className="relative flex h-full items-center justify-center p-8">
                <div className="relative w-36">
                  <div className="rounded-xl overflow-hidden border-2 border-gold-400/40 shadow-2xl aspect-[3/4]">
                    <img src={GURU_IMG_RESOURCE} alt="Free Vedic Guide" className="w-full h-full object-cover" />
                  </div>
                  <div
                    className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg"
                    style={{ background: GOLD_GRD, color: '#002D60' }}
                  >
                    FREE
                  </div>
                  {/* Glow */}
                  <div className="absolute -inset-4 rounded-2xl bg-gold-400/20 blur-2xl -z-10" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#D88A22' }}>
                Exclusive Bonus — Yours When You Book
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-900 mb-3 leading-tight">
                Get Your{' '}
                <span style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  FREE Vedic Astrology
                </span>
                {' '}Foundation Guide
              </h2>
              <p className="text-ink-500 text-sm leading-relaxed mb-5">
                Gurudev Anand's exclusive starter guide — covering the core principles of Vedic astrology so you arrive prepared and get 3× more from your session.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-7">
                {['Chart Fundamentals', 'Planetary Influences', 'Classical Remedies', 'Auspicious Timing'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-ink-600">
                    <CheckCircle2 size={12} className="text-gold-500 shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
              <GoldCTA onClick={onBook}>
                Book & Claim Free Guide <ArrowRight size={14} />
              </GoldCTA>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   10. TESTIMONIALS
══════════════════════════════════════════════════════════════ */
const REVIEWS = [
  { name: 'Priya S.',    loc: 'Delhi',     stars: 5, text: 'Gurudev\'s reading identified the exact period of my career stagnation. The remedies shifted things within weeks — I finally got the promotion I\'d waited 3 years for.' },
  { name: 'Rahul M.',   loc: 'Mumbai',    stars: 5, text: 'I was sceptical. After the kundali session I understood repeating patterns in my relationships I couldn\'t explain for years. Genuinely life-changing.' },
  { name: 'Ananya K.',  loc: 'Bangalore', stars: 5, text: 'Very personal, not generic at all. He described my family dynamics from the chart alone, things I\'d never told anyone. Completely accurate.' },
  { name: 'Vikram P.',  loc: 'Toronto',   stars: 5, text: 'Consulted from Canada. Detailed, insightful, and the remedies are practical — not complicated rituals. Very accessible for someone abroad.' },
  { name: 'Meera J.',   loc: 'London',    stars: 5, text: 'He read my health patterns from the chart perfectly. The dietary advice from a Vedic lens has genuinely helped my energy levels.' },
  { name: 'Sanjay R.',  loc: 'Hyderabad', stars: 5, text: 'Three months after the consultation everything he predicted about my business timing came true. Booked a second session the same week.' },
];

function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: DARK_BG }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,94,168,0.08),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>Client Stories</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
            What clients say about{' '}
            <span className="italic font-light" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              their sessions
            </span>
          </h2>
          {/* Aggregate rating */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/[0.06] px-5 py-2">
            <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} size={13} className="fill-gold-400 text-gold-400" />)}</div>
            <span className="text-sm font-bold text-white">4.9 / 5</span>
            <span className="text-xs text-white/40">from 10,000+ sessions</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 hover:border-gold-400/20 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="flex mb-3">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} size={12} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-white/75 text-sm leading-relaxed mb-4 italic">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: 'rgba(216,138,34,0.15)', color: '#F3B757' }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-white">{r.name}</div>
                  <div className="text-[10px] text-white/35">{r.loc}</div>
                </div>
                <CheckCircle2 size={14} className="text-gold-400 ml-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   11. PRICING — audio vs video
══════════════════════════════════════════════════════════════ */
const PRICE_FEATURES = [
  'Personal kundali reading',
  'Classical Vedic analysis',
  'Personalised remedies',
  'Career & relationship insights',
  'Q&A throughout the session',
];

function PricingSection({ onBook }: { onBook?: () => void }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: '#F8F9FB' }}>
      <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#D88A22' }}>Transparent Pricing</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink-900 leading-tight">
            Choose your{' '}
            <span className="italic font-light" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              session format
            </span>
          </h2>
          <p className="mt-4 text-ink-500 text-sm max-w-lg mx-auto">
            Same depth of reading in both formats — pick what feels comfortable for you.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Audio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-warm-200 bg-white p-8 shadow-card"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-400/25 bg-gold-400/10">
              <Phone size={20} className="text-gold-500" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-ink-900 mb-1">Audio Session</h3>
            <p className="text-ink-400 text-xs mb-5">60–90 minutes · focused, direct guidance</p>
            <div className="mb-6">
              <span className="font-cinzel text-3xl font-bold" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {fmtInr(PRICE_AUDIO_INR)}
              </span>
              <span className="text-xs text-ink-400 ml-2">per session</span>
            </div>
            <ul className="space-y-2.5 mb-7">
              {PRICE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-ink-600">
                  <CheckCircle2 size={14} className="text-gold-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onBook}
              className="w-full rounded-full border-2 border-gold-400 py-3 text-sm font-bold uppercase tracking-wide text-gold-600 transition-all hover:bg-gold-400/10"
            >
              Book Audio Session
            </button>
          </motion.div>

          {/* Video — featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="relative rounded-3xl border border-gold-400/40 bg-white p-8 shadow-md ring-2 ring-gold-400/20"
          >
            {/* Popular badge */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-5 py-1.5 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap"
              style={{ background: GOLD_GRD, color: '#002D60' }}
            >
              ★ Most Popular
            </div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-400/25 bg-gold-400/10">
              <Video size={20} className="text-gold-500" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-ink-900 mb-1">Video Session</h3>
            <p className="text-ink-400 text-xs mb-5">Face-to-face · see the chart on screen together</p>
            <div className="mb-6">
              <span className="font-cinzel text-3xl font-bold" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {fmtInr(PRICE_VIDEO_INR)}
              </span>
              <span className="text-xs text-ink-400 ml-2">per session</span>
            </div>
            <ul className="space-y-2.5 mb-7">
              {[...PRICE_FEATURES, 'Screen-share of your birth chart'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-ink-600">
                  <CheckCircle2 size={14} className="text-gold-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <GoldCTA onClick={onBook} className="w-full">
              Book Video Session <ArrowRight size={14} />
            </GoldCTA>
          </motion.div>
        </div>

        {/* Trust line */}
        <div className="mt-10 text-center flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: <Shield size={14} />, text: '100% Confidential' },
            { icon: <Users size={14} />, text: '1.2 Lakh+ Sessions' },
            { icon: <Award size={14} />, text: '25+ Years Experience' },
          ].map((t) => (
            <span key={t.text} className="inline-flex items-center gap-2 text-xs text-ink-400 font-medium">
              <span className="text-gold-500">{t.icon}</span>
              {t.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   12. FAQ
══════════════════════════════════════════════════════════════ */
const FAQS = [
  { q: 'Where can I book the consultation?', a: 'Click any "Book Now" button on this page. We confirm your slot within 24 hours via WhatsApp or email.' },
  { q: 'Where will the consultation take place?', a: 'Online via audio or video call (Zoom / Google Meet / WhatsApp). In-person sessions are available at select locations when the schedule allows.' },
  { q: 'Will I receive a recording of the session?', a: 'Yes — upon request, a recording is provided so you can revisit insights and remedies at your own pace.' },
  { q: 'What details do you need from me?', a: 'Full name, date of birth, exact time of birth (from birth certificate if possible), and place of birth. For couple readings, both partners\' details.' },
  { q: 'Are the remedies complicated?', a: 'No. Gurudev Anand gives practical, accessible remedies — mantras, dietary adjustments, or simple rituals — nothing that requires special knowledge or materials.' },
  { q: 'Who should book a consultation?', a: 'Anyone seeking clarity on career, relationships, health, or finances. No prior knowledge of astrology is needed — everything is explained in plain language.' },
  { q: 'Can I book for my family or partner?', a: 'Yes — couple and family consultations are available. Mention this when booking so Gurudev Anand can prepare both charts in advance.' },
];

function FAQSection({ onBook }: { onBook?: () => void }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: DARK_BG }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(0,94,168,0.1),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#F3B757' }}>FAQs</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
            Here's everything you{' '}
            <span className="italic font-light" style={{ background: GOLD_GRD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              may ask
            </span>
          </h2>
        </motion.div>

        <div className="space-y-3 mb-12">
          {FAQS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${open === i ? 'border-gold-400/30 bg-gold-400/[0.04]' : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14]'}`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left"
              >
                <span
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-cinzel text-xs font-bold transition-colors"
                  style={{
                    background: open === i ? 'rgba(216,138,34,0.18)' : 'rgba(255,255,255,0.06)',
                    color: open === i ? '#F3B757' : 'rgba(255,255,255,0.3)',
                    border: open === i ? '1px solid rgba(216,138,34,0.35)' : '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`flex-1 text-sm font-semibold md:text-base ${open === i ? 'text-white' : 'text-white/90'}`}>{item.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                  <ChevronDown size={18} className={open === i ? 'text-gold-400' : 'text-white/50'} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 ml-11 text-white/75 text-sm leading-relaxed border-t border-white/[0.06] pt-4">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8">
          <p className="text-white/60 text-sm mb-5">Still have questions? Reach out directly.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <GoldCTA onClick={onBook} size="sm">
              Book Now <ArrowRight size={12} />
            </GoldCTA>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-xs font-semibold text-white hover:border-gold-400/30 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   13. STICKY BOTTOM BAR
══════════════════════════════════════════════════════════════ */
function StickyBar({
  onBook,
  heroRef,
}: {
  onBook?: () => void;
  heroRef: RefObject<HTMLElement | null>;
}) {
  const mobileVisible = useStickyAfterHero(heroRef);
  const [desktopVisible, setDesktopVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 639px)');
    const updateMobile = () => setIsMobile(mobileMq.matches);
    updateMobile();
    mobileMq.addEventListener('change', updateMobile);
    return () => mobileMq.removeEventListener('change', updateMobile);
  }, []);

  useEffect(() => {
    const fn = () => {
      if (window.matchMedia('(max-width: 639px)').matches) return;
      setDesktopVisible(window.scrollY > 600);
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const visible = isMobile ? mobileVisible : desktopVisible;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="webinar-sticky-offset sticky-cta-shell fixed inset-x-0 z-[70] pointer-events-none"
        >
          <div className="sticky-cta-bar pointer-events-auto">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold leading-tight text-white sm:text-xs">
                <span className="sm:hidden">Book your session</span>
                <span className="hidden sm:inline font-cinzel">From {fmtInr(PRICE_AUDIO_INR)}</span>
              </p>
              <p className="truncate text-[9px] text-white/45 sm:text-[10px]">
                <span className="sm:hidden">Limited slots · Gurudev Anand</span>
                <span className="hidden sm:inline">1-on-1 · Video {fmtInr(PRICE_VIDEO_INR)}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={onBook}
              className="sticky-cta-btn btn-shimmer min-h-[36px] sm:min-h-[38px]"
              style={{ background: GOLD_GRD, color: '#002D60' }}
            >
              Register Now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export function ConsultationPage() {
  const { onConnect } = useOutletContext<SiteOutletContext>();
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="pb-[calc(9.5rem+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <AnnouncementBar onBook={onConnect} />
      <HeroSection onBook={onConnect} heroRef={heroRef} />
      <FeaturedInBar />
      <PainPointsSection onBook={onConnect} />
      <PatternsSection onBook={onConnect} />
      <HowItWorksSection />
      <WhatYouGainSection onBook={onConnect} />
      <MentorSection onBook={onConnect} />
      <BonusSection onBook={onConnect} />
      <TestimonialsSection />
      <PricingSection onBook={onConnect} />
      <FAQSection onBook={onConnect} />
      <StickyBar onBook={onConnect} heroRef={heroRef} />
    </div>
  );
}
