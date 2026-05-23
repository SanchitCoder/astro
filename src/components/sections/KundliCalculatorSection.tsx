import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, MapPin, ChevronRight, Star } from 'lucide-react';

const REVEALS = [
  { glyph: '☉', label: 'Ascendant, moon sign & all planetary positions' },
  { glyph: '♄', label: 'Active dasha periods shaping your life right now' },
  { glyph: '♃', label: 'Key houses — career, relationships, wealth, health' },
];

const KUNDLI_INPUT =
  'kundli-input w-full rounded-xl border border-warm-200 bg-white px-4 py-3.5 pl-10 text-sm text-ink-900 shadow-sm transition placeholder:text-ink-400 focus:border-gold-400/60 focus:bg-[#FFFAF6] focus:outline-none focus:ring-[3px] focus:ring-gold-400/15 [color-scheme:light]';

function SpinningChart() {
  const houses = Array.from({ length: 12 }, (_, i) => i);
  const cx = 160, cy = 160, R = 140, r = 80;
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <radialGradient id="kcGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e07210" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={R} fill="url(#kcGlow)" stroke="#e07210" strokeWidth="0.6" opacity="0.3" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#4DC3E0" strokeWidth="0.5" opacity="0.25" />
      <circle cx={cx} cy={cy} r={48} fill="none" stroke="#e07210" strokeWidth="0.8" opacity="0.2" strokeDasharray="3 5" />
      {houses.map((i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx + r * Math.cos(a)}
            y1={cy + r * Math.sin(a)}
            x2={cx + R * Math.cos(a)}
            y2={cy + R * Math.sin(a)}
            stroke="#e07210"
            strokeWidth="0.4"
            opacity="0.2"
          />
        );
      })}
      {[
        { angle: 20, g: '☉', c: '#ffb36a' },
        { angle: 80, g: '☽', c: '#c7d2fe' },
        { angle: 140, g: '♂', c: '#fca5a5' },
        { angle: 200, g: '♃', c: '#86efac' },
        { angle: 265, g: '♄', c: '#93c5fd' },
        { angle: 315, g: '♀', c: '#f9a8d4' },
      ].map(({ angle, g, c }) => {
        const a = (angle * Math.PI) / 180;
        const pr = (R + r) / 2;
        return (
          <g key={g}>
            <circle cx={cx + pr * Math.cos(a)} cy={cy + pr * Math.sin(a)} r="5" fill={c} opacity="0.2" />
            <circle cx={cx + pr * Math.cos(a)} cy={cy + pr * Math.sin(a)} r="2.5" fill={c} opacity="0.8" />
            <text x={cx + pr * Math.cos(a) + 9} y={cy + pr * Math.sin(a) + 4} fontSize="9" fill={c} opacity="0.6" fontFamily="serif">
              {g}
            </text>
          </g>
        );
      })}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return <circle key={i} cx={cx + 56 * Math.cos(a)} cy={cy + 56 * Math.sin(a)} r="2.5" fill="#e07210" opacity="0.3" />;
      })}
      <circle cx={cx} cy={cy} r="20" fill="#e07210" opacity="0.08" />
      <circle cx={cx} cy={cy} r="8" fill="#e07210" opacity="0.2" />
      <circle cx={cx} cy={cy} r="3" fill="#ffb36a" opacity="0.9" />
    </svg>
  );
}

export function KundliCalculatorSection() {
  const [form, setForm] = useState({ name: '', dob: '', time: '', place: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="kundali"
      className="relative overflow-hidden bg-gradient-to-b from-white via-warm-50 to-warm-100 py-16 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(224,114,16,0.08),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(12,95,120,0.06),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Form — first on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-warm-200 bg-white p-6 shadow-[0_20px_50px_-12px_rgba(12,95,120,0.12),0_4px_16px_rgba(0,0,0,0.04)] ring-1 ring-warm-100 md:p-9"
            >
              <div className="mb-5 border-b border-warm-100 pb-5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400/15">
                    <Star size={12} className="fill-gold-500 text-gold-500" />
                  </span>
                  <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-ink-900">
                    Generate Your Free Kundali
                  </h3>
                </div>
                <p className="pl-9 text-xs text-ink-500">No account required</p>
              </div>

              {[
                { icon: User, type: 'text', placeholder: 'Full Name', key: 'name', required: true },
                { icon: Calendar, type: 'date', placeholder: '', key: 'dob', required: true },
                { icon: Clock, type: 'time', placeholder: '', key: 'time', required: false },
                { icon: MapPin, type: 'text', placeholder: 'Place of Birth (City, Country)', key: 'place', required: true },
              ].map(({ icon: Icon, type, placeholder, key, required }) => (
                <div key={key} className="group relative">
                  <Icon
                    size={14}
                    className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-ink-400 transition-colors group-focus-within:text-gold-500"
                  />
                  <input
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className={KUNDLI_INPUT}
                  />
                </div>
              ))}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-shimmer mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_6px_24px_rgba(224,114,16,0.35)] transition-all duration-300 hover:shadow-[0_8px_28px_rgba(224,114,16,0.45)]"
              >
                {submitted ? '✦ Chart Sent!' : 'Generate Kundali'}
                <ChevronRight size={15} />
              </motion.button>
            </form>
          </motion.div>

          {/* Copy + chart — below form on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative mx-auto mb-8 aspect-square w-full max-w-[220px] sm:max-w-[260px] lg:mx-0 lg:mb-10 lg:max-w-[280px]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(224,114,16,0.12),transparent_65%)] blur-2xl" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                className="h-full w-full"
              >
                <SpinningChart />
              </motion.div>
            </div>

            <span className="section-eyebrow mb-3 block">Free Kundali</span>
            <h2 className="section-heading mb-3">
              Know what your <span className="text-gradient-gold italic font-light">birth chart</span> reveals
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-ink-600 md:text-base">
              Enter your birth details and receive a personalised Vedic chart — the same foundation Gurudev Anand uses in every consultation.
            </p>

            <ul className="space-y-3">
              {REVEALS.map((item) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 rounded-xl border border-warm-200 bg-white/80 px-4 py-3"
                >
                  <span className="mt-0.5 shrink-0 text-base leading-none text-gold-500" style={{ fontFamily: 'serif' }}>
                    {item.glyph}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-600">{item.label}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-gold-400/40 to-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600">100% Free</span>
              <div className="h-px flex-1 bg-gradient-to-l from-gold-400/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
