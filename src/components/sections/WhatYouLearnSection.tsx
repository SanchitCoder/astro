import { Compass, Clock, Heart, Activity, Home as HomeIcon, Sparkles } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { LearnCard } from '../ui/LearnCard';

const ITEMS = [
  {
    icon: Compass,
    title: 'General Consultation',
    desc: 'A full reading with Guru Ji on career, relationships, finance, and life direction — he walks through your chart and answers what matters most to you now.',
  },
  {
    icon: Clock,
    title: 'Urgent Consultation',
    desc: 'When a decision cannot wait, Guru Ji offers a priority session focused on the immediate question — timing, risk, and the clearest path forward.',
  },
  {
    icon: Heart,
    title: 'Couple Consultation',
    desc: 'Guru Ji studies both partners’ charts for compatibility, marriage timing, and harmony — with honest guidance for couples at any stage.',
  },
  {
    icon: Activity,
    title: 'Medical Astrology',
    desc: 'He examines health-related houses and planetary influences to surface patterns worth attention, alongside preventive remedies from the Vedic tradition.',
  },
  {
    icon: HomeIcon,
    title: 'Vastu Consultation',
    desc: 'Guru Ji advises on aligning your home or workspace for prosperity and peace, connecting spatial energy with what your chart reveals.',
  },
  {
    icon: Sparkles,
    title: 'Personalised Remedies',
    desc: 'Mantras, rituals, and gemstone guidance chosen for your chart — not copied from a list, but prescribed by Guru Ji after he has read your kundali.',
  },
];

export function WhatYouLearnSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-soft-gradient">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-md bg-royal-50 text-royal-800 text-xs font-bold uppercase tracking-wider">
              Consult with Guru Ji
            </span>
            <h2 className="mt-4 section-heading">How Guru Ji Sadhguru ANAND can guide you</h2>
            <p className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed">
              Each service below is delivered by Guru Ji personally — in a private audio or video session, or in person
              when available. He tailors the depth and focus of every meeting to your birth details and the questions you
              bring.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} variant="fade" once={false} delay={(i % 6) * 60}>
              <LearnCard icon={it.icon} title={it.title} description={it.desc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
