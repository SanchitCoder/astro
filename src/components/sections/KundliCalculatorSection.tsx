import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, MapPin, ChevronRight, Star } from 'lucide-react';

const DARK_BG = 'linear-gradient(160deg, #031825 0%, #062E3C 40%, #084557 70%, #031018 100%)';

const REVEALS = [
  { glyph: '☉', label: 'Ascendant, moon sign & all planetary positions' },
  { glyph: '♄', label: 'Active dasha periods shaping your life right now' },
  { glyph: '♃', label: 'Key houses — career, relationships, wealth, health' },
];

function SpinningChart() {
  const houses = Array.from({ length: 12 }, (_, i) => i);
  const cx = 160, cy = 160, R = 140, r = 80;
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" fill="none" aria-hidden>
      <defs>
        <radialGradient id="kcGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e07210" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={R}  fill="url(#kcGlow)" stroke="#e07210" strokeWidth="0.6" opacity="0.3" />
      <circle cx={cx} cy={cy} r={r}  fill="none"          stroke="#4DC3E0" strokeWidth="0.5" opacity="0.25" />
      <circle cx={cx} cy={cy} r={48} fill="none"          stroke="#e07210" strokeWidth="0.8" opacity="0.2" strokeDasharray="3 5" />
      {houses.map(i => {
        const a = (i * 30 * Math.PI) / 180;
        return <line key={i} x1={cx + r * Math.cos(a)} y1={cy + r * Math.sin(a)} x2={cx + R * Math.cos(a)} y2={cy + R * Math.sin(a)} stroke="#e07210" strokeWidth="0.4" opacity="0.2" />;
      })}
      {[
        { angle: 20,  g: '☉', c: '#ffb36a' }, { angle: 80,  g: '☽', c: '#c7d2fe' },
        { angle: 140, g: '♂', c: '#fca5a5' }, { angle: 200, g: '♃', c: '#86efac' },
        { angle: 265, g: '♄', c: '#93c5fd' }, { angle: 315, g: '♀', c: '#f9a8d4' },
      ].map(({ angle, g, c }) => {
        const a = (angle * Math.PI) / 180, pr = (R + r) / 2;
        return (
          <g key={g}>
            <circle cx={cx + pr * Math.cos(a)} cy={cy + pr * Math.sin(a)} r="5" fill={c} opacity="0.2" />
            <circle cx={cx + pr * Math.cos(a)} cy={cy + pr * Math.sin(a)} r="2.5" fill={c} opacity="0.8" />
            <text x={cx + pr * Math.cos(a) + 9} y={cy + pr * Math.sin(a) + 4} fontSize="9" fill={c} opacity="0.6" fontFamily="serif">{g}</text>
          </g>
        );
      })}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return <circle key={i} cx={cx + 56 * Math.cos(a)} cy={cy + 56 * Math.sin(a)} r="2.5" fill="#e07210" opacity="0.3" />;
      })}
      <circle cx={cx} cy={cy} r="20" fill="#e07210" opacity="0.08" />
      <circle cx={cx} cy={cy} r="8"  fill="#e07210" opacity="0.2" />
      <circle cx={cx} cy={cy} r="3"  fill="#ffb36a" opacity="0.9" />
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
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: DARK_BG }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(11,120,150,0.18),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,118,28,0.12),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — visual + copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Spinning chart */}
            <div className="relative mx-auto mb-10 aspect-square w-full max-w-[240px] sm:max-w-[280px] lg:mx-0">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(224,114,16,0.2),transparent_60%)] blur-2xl" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full"
              >
                <SpinningChart />
              </motion.div>
            </div>

            <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#ffb36a' }}>
              Free Kundali
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Know what your{' '}
              <span className="italic font-light" style={{ background: 'linear-gradient(135deg,#ffb36a,#e07210)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                birth chart
              </span>{' '}reveals
            </h2>
            <p className="text-white/45 text-sm md:text-base leading-relaxed mb-8">
              Enter your birth details and receive a personalised Vedic chart — the same foundation Gurudev Anand uses in every consultation.
            </p>

            <ul className="space-y-4">
              {REVEALS.map((item) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <span className="text-base leading-none mt-0.5 shrink-0" style={{ color: '#ffb36a', fontFamily: 'serif' }}>{item.glyph}</span>
                  <span className="text-sm text-white/55 leading-relaxed">{item.label}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-gold-400/20 to-transparent" />
              <span className="text-[10px] text-white/25 uppercase tracking-widest font-bold">100% Free</span>
              <div className="h-px flex-1 bg-gradient-to-l from-gold-400/20 to-transparent" />
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/[0.09] bg-white/[0.05] backdrop-blur-sm p-7 md:p-9 space-y-4"
              style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)' }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Star size={12} className="text-gold-400 fill-gold-400" />
                  <h3 className="font-cinzel text-sm font-bold text-white/90 tracking-wider uppercase">
                    Generate Your Free Kundali
                  </h3>
                </div>
                <p className="text-xs text-white/30">No account required</p>
              </div>

              {[
                { icon: User,     type: 'text',  placeholder: 'Full Name',                    key: 'name',  required: true },
                { icon: Calendar, type: 'date',  placeholder: '',                              key: 'dob',   required: true },
                { icon: Clock,    type: 'time',  placeholder: '',                              key: 'time',  required: false },
                { icon: MapPin,   type: 'text',  placeholder: 'Place of Birth (City, Country)', key: 'place', required: true },
              ].map(({ icon: Icon, type, placeholder, key, required }) => (
                <div key={key} className="relative group">
                  <Icon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-gold-400/70 transition-colors pointer-events-none" />
                  <input
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-white/[0.07] border border-white/[0.1] rounded-xl px-4 py-3 pl-9 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold-400/50 focus:bg-white/[0.1] transition-all [color-scheme:dark]"
                  />
                </div>
              ))}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide btn-shimmer transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #ffb36a 0%, #e07210 50%, #c05e0d 100%)', color: '#062E3C', boxShadow: submitted ? '0 0 30px rgba(224,114,16,0.5)' : 'none' }}
              >
                {submitted ? '✦ Chart Sent!' : 'Generate Kundali'}
                <ChevronRight size={15} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
