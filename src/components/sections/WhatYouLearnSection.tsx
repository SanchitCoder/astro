import { Compass, Clock, Heart, Activity, Home as HomeIcon, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MouseEvent as ReactMouseEvent } from 'react';

const ITEMS = [
  { num: '01', icon: Compass,  title: 'General Consultation', desc: 'A full chart reading — career, relationships, finance, and life direction.', accent: '#e07210', glyph: '☉', bg: 'from-[#1a0a00] via-[#5c2800] to-[#0a0500]' },
  { num: '02', icon: Clock,    title: 'Urgent Consultation',  desc: 'Priority session for decisions that cannot wait. Focused, direct, clear.',    accent: '#f59e0b', glyph: '♄', bg: 'from-[#0f0c00] via-[#4a3800] to-[#080600]' },
  { num: '03', icon: Heart,    title: 'Couple Consultation',  desc: 'Compatibility, marriage timing, and harmony — both charts read together.',    accent: '#f43f5e', glyph: '♀', bg: 'from-[#1a0008] via-[#5c001a] to-[#0a0005]' },
  { num: '04', icon: Activity, title: 'Medical Astrology',    desc: 'Health-related planetary patterns with classical Vedic preventive remedies.', accent: '#10b981', glyph: '♂', bg: 'from-[#001209] via-[#003820] to-[#000a05]' },
  { num: '05', icon: HomeIcon, title: 'Vastu Consultation',   desc: 'Align your home or workspace with what your birth chart reveals.',           accent: '#4DC3E0', glyph: '✦', bg: 'from-[#00080f] via-[#002a3c] to-[#000508]' },
  { num: '06', icon: Sparkles, title: 'Personalised Remedies', desc: 'Mantras, rituals, and gemstone guidance chosen for your kundali alone.',    accent: '#a78bfa', glyph: '♃', bg: 'from-[#0a0014] via-[#2e0050] to-[#060008]' },
];

const DARK_BG = 'linear-gradient(160deg, #031825 0%, #062E3C 40%, #084557 70%, #031018 100%)';

function ServiceCard({ item, index }: { item: typeof ITEMS[0]; index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 280, damping: 28 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 280, damping: 28 });

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className={`group relative rounded-2xl border border-white/[0.08] overflow-hidden cursor-default min-h-[200px] flex flex-col bg-gradient-to-br ${item.bg}`}
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${item.accent}55,transparent)` }} />

      {/* Large bg glyph */}
      <div
        className="pointer-events-none absolute -right-3 top-0 select-none text-[4.5rem] leading-none opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.14] sm:text-[6rem] lg:text-[8rem]"
        style={{ color: item.accent, fontFamily: '"Cormorant Garamond","Apple Symbols","Segoe UI Symbol",serif' }}
      >
        {item.glyph}
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 100%, ${item.accent}18, transparent 60%)` }}
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ borderColor: `${item.accent}35` }}
      />

      {/* Content */}
      <div className="relative p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}30` }}
          >
            <item.icon size={16} style={{ color: item.accent }} />
          </div>
          <span className="font-cinzel text-[10px] font-bold opacity-30 text-white">{item.num}</span>
        </div>
        <h3 className="font-cinzel text-sm font-bold text-white/90 tracking-wide uppercase mb-2">{item.title}</h3>
        <p className="text-sm text-white/45 leading-relaxed flex-1">{item.desc}</p>

        {/* Bottom line */}
        <div className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg,transparent,${item.accent}40,transparent)` }} />
      </div>
    </motion.div>
  );
}

export function WhatYouLearnSection() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: DARK_BG }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,118,28,0.1),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(11,120,150,0.14),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#ffb36a' }}>
            Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            How Gurudev Anand{' '}
            <span className="italic font-light" style={{ background: 'linear-gradient(135deg,#ffb36a,#e07210)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              guides you
            </span>
          </h2>
          <p className="mt-4 text-white/45 text-sm md:text-base leading-relaxed">
            Every session delivered personally — tailored to your birth details and the questions you bring.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: '1400px' }}>
          {ITEMS.map((it, i) => <ServiceCard key={it.title} item={it} index={i} />)}
        </div>
      </div>
    </section>
  );
}
