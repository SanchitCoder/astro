import { Compass, Clock, Heart, Activity, Home as HomeIcon, Sparkles, ArrowRight, Video, Headphones } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { LearnCard } from '../ui/LearnCard';
import { CTAButton } from '../ui/CTAButton';
import { PHONE, PHONE_TEL } from '../../lib/constants';

const ITEMS = [
  {
    icon: Compass,
    title: 'General Consultation',
    desc: 'Holistic reading on career, relationships, finance and life direction.',
  },
  {
    icon: Clock,
    title: 'Urgent Consultation',
    desc: 'Priority slot for pressing life decisions requiring immediate clarity.',
  },
  {
    icon: Heart,
    title: 'Couple Consultation',
    desc: 'Compatibility, marriage timing and harmony guidance for partners.',
  },
  {
    icon: Activity,
    title: 'Medical Astrology',
    desc: 'Astrological insight into health patterns and preventive remedies.',
  },
  {
    icon: HomeIcon,
    title: 'Vastu Consultation',
    desc: 'Align home and workspace energies for prosperity and peace.',
  },
  {
    icon: Sparkles,
    title: 'Personalised Remedies',
    desc: 'Custom rituals, mantras and gemstone guidance rooted in your chart.',
  },
];

type Props = {
  onBook: (t: string) => void;
};

const TYPE_BY_INDEX = ['normal', 'urgent', 'couple', 'medical', 'vastu', 'normal'] as const;

const PLANS = [
  { id: 'normal', name: 'Normal Consultation', duration: '30 mins', audio: 11000, video: 15000 },
  { id: 'urgent', name: 'Urgent Consultation', duration: '30 mins', audio: 25000, video: 30000, highlight: true },
  { id: 'couple', name: 'Couple Consultation', duration: '30 mins', audio: 30000, video: 40000 },
  { id: 'couple', name: 'Urgent Couple', duration: '30 mins', audio: 50000, video: 60000 },
  { id: 'medical', name: 'Medical Astrology', duration: '30 mins', audio: 11000, video: 15000 },
  { id: 'medical', name: 'Urgent Medical', duration: '30 mins', audio: 20000, video: 25000 },
  { id: 'vastu', name: 'Vastu Consultation', duration: '30 mins', audio: 30000, video: 40000 },
  { id: 'urgent', name: 'Extended Urgent (1hr)', duration: '60 mins', audio: 75000, video: 90000 },
];

export function WhatYouLearnSection({ onBook }: Props) {
  return (
    <section id="services" className="py-20 md:py-28 bg-soft-gradient">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-md bg-royal-50 text-royal-800 text-xs font-bold uppercase tracking-wider">
              Our Services
            </span>
            <h2 className="mt-4 section-heading">What You Will Learn In Your Consultation</h2>
            <p className="mt-4 text-slate-600 text-base md:text-lg">
              Whether you seek clarity on a pressing decision or long-term transformation, there is a consultation
              designed for you.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title}>
              <div className="h-full flex flex-col">
                <LearnCard icon={it.icon} title={it.title} description={it.desc} />
                <button
                  type="button"
                  onClick={() => onBook(TYPE_BY_INDEX[i])}
                  className="mt-3 text-sm font-semibold text-cta-600 hover:text-cta-700 transition text-center"
                >
                  Book Now →
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <CTAButton variant="secondary" onClick={() => onBook('normal')} icon={ArrowRight}>
              Book Your Consultation
            </CTAButton>
          </div>
        </Reveal>

        <Reveal>
          <div id="pricing" className="mt-20 md:mt-28 scroll-mt-28 text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-md bg-royal-50 text-royal-800 text-xs font-bold uppercase tracking-wider">
              Book Your Call
            </span>
            <h2 className="mt-4 section-heading">One call can change everything</h2>
            <p className="mt-4 text-slate-600">
              Transparent pricing. Choose the consultation that fits your need — Guru Ji will do the rest.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((p, i) => (
            <Reveal key={`${p.name}-${i}`}>
              <div
                className={`relative rounded-lg p-6 border transition hover:-translate-y-1 hover:shadow-premium card-lift h-full flex flex-col ${
                  p.highlight
                    ? 'bg-royal-900 text-white border-royal-800 ring-gold'
                    : 'bg-white border-slate-200'
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md bg-cta-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    Most Booked
                  </div>
                )}
                <h3 className={`font-serif text-xl font-semibold ${p.highlight ? 'text-white' : 'text-royal-900'}`}>{p.name}</h3>
                <div className={`mt-1 flex items-center gap-1.5 text-sm ${p.highlight ? 'text-white/70' : 'text-slate-500'}`}>
                  <Clock size={14} /> {p.duration}
                </div>

                <div className="mt-5 space-y-2 flex-1">
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
                  type="button"
                  onClick={() => onBook(p.id)}
                  className={`mt-6 w-full py-3 rounded-md font-semibold text-sm transition ${
                    p.highlight
                      ? 'bg-cta-500 text-white hover:bg-cta-600'
                      : 'bg-royal-800 text-white hover:bg-royal-900'
                  }`}
                >
                  Book Now
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-sm text-slate-500">
            One-time consultations. Slots confirmed after booking. For priority, call{' '}
            <a href={PHONE_TEL} className="text-cta-600 font-semibold hover:text-cta-700">
              {PHONE}
            </a>
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <CTAButton variant="secondary" onClick={() => onBook('normal')} icon={ArrowRight}>
              Book Your Consultation
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
