import { Compass, Clock, Heart, Activity, Home as HomeIcon, Sparkles } from 'lucide-react';
import { TextReveal } from '../ui/TextReveal';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MouseEvent as ReactMouseEvent } from 'react';

/* ︎ = Variation Selector-15: forces text (not emoji) rendering on Android/iOS */
const T = '︎';
const ITEMS = [
  { num: '01', icon: Compass,  title: 'General Consultation',  desc: 'A full chart reading — career, relationships, finance, and life direction.', accent: '#D88A22', glyph: '☉' + T, tint: 'rgba(216,138,34,0.06)' },
  { num: '02', icon: Clock,    title: 'Urgent Consultation',   desc: 'Priority session for decisions that cannot wait. Focused, direct, clear.',    accent: '#f59e0b', glyph: '♄' + T, tint: 'rgba(245,158,11,0.06)' },
  { num: '03', icon: Heart,    title: 'Couple Consultation',   desc: 'Compatibility, marriage timing, and harmony — both charts read together.',    accent: '#C62828', glyph: '♀' + T, tint: 'rgba(198,40,40,0.06)' },
  { num: '04', icon: Activity, title: 'Medical Astrology',     desc: 'Health-related planetary patterns with classical Vedic preventive remedies.', accent: '#10b981', glyph: '♂' + T, tint: 'rgba(16,185,129,0.06)' },
  { num: '05', icon: HomeIcon, title: 'Vastu Consultation',    desc: 'Align your home or workspace with what your birth chart reveals.',           accent: '#005EA8', glyph: '✦' + T, tint: 'rgba(0,94,168,0.06)' },
  { num: '06', icon: Sparkles, title: 'Personalised Remedies', desc: 'Mantras, rituals, and gemstone guidance chosen for your kundali alone.',    accent: '#a78bfa', glyph: '♃' + T, tint: 'rgba(167,139,250,0.06)' },
];

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
      className="group relative flex min-h-[200px] cursor-default flex-col overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ background: `linear-gradient(145deg, ${item.tint} 0%, transparent 55%)` }}
      />

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,${item.accent}44,transparent)` }}
      />

      <div
        className="pointer-events-none absolute -right-3 top-0 select-none text-[4.5rem] leading-none opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.1] sm:text-[6rem] lg:text-[8rem]"
        style={{ color: item.accent, fontFamily: '"Playfair Display","Apple Symbols","Segoe UI Symbol",serif' }}
      >
        {item.glyph}
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 100%, ${item.accent}12, transparent 60%)` }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ borderColor: `${item.accent}30` }}
      />

      <div className="relative flex h-full flex-col p-6">
        <div className="mb-5 flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${item.accent}14`, border: `1px solid ${item.accent}28` }}
          >
            <item.icon size={16} style={{ color: item.accent }} />
          </div>
          <span className="font-cinzel text-[10px] font-bold text-ink-300">{item.num}</span>
        </div>
        <h3 className="mb-2 font-cinzel text-sm font-bold uppercase tracking-wide text-ink-900">{item.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-ink-600">{item.desc}</p>

        <div
          className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg,transparent,${item.accent}35,transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export function WhatYouLearnSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-warm-50 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(216,138,34,0.08),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,94,168,0.06),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="section-eyebrow mb-4 block">Services</span>
          <TextReveal as="h2" className="section-heading">
            How Gurudev Anand{' '}
            <span className="text-gradient-gold italic font-light">guides you</span>
          </TextReveal>
          <p className="mt-4 text-sm leading-relaxed text-ink-700 md:text-base">
            Every session delivered personally — tailored to your birth details and the questions you bring.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1400px' }}>
          {ITEMS.map((it, i) => <ServiceCard key={it.title} item={it} index={i} />)}
        </div>
      </div>
    </section>
  );
}
