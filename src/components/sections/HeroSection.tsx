import { CalendarClock } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { StatBlock } from '../ui/StatBlock';
import { GURU_IMG } from '../../lib/constants';

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero-gradient text-white pt-10 md:pt-14 pb-16 md:pb-24">
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cta-500/20 blur-3xl animate-drift" />
        <div className="absolute top-40 right-0 w-[30rem] h-[30rem] rounded-full bg-royal-400/25 blur-3xl animate-drift-reverse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 lg:gap-0 items-center">
          {/* Heading — top on mobile, left column on desktop */}
          <Reveal className="order-1 lg:col-start-1 lg:row-start-1 lg:pr-10 xl:pr-14 lg:border-r lg:border-white/10">
            <p className="text-gold-400 text-sm md:text-base font-semibold uppercase tracking-widest">
              Guru Ji Sadhguru ANAND
            </p>
            <h1 className="mt-3 font-michroma font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] xl:text-[2.85rem] leading-[1.15] tracking-tight text-white">
              Remove <span className="text-gradient-gold">Uncertainty</span> from Career, Relationships & Finance
            </h1>
          </Reveal>

          {/* Portrait — above paragraphs on mobile, right column on desktop */}
          <Reveal
            className="relative order-2 my-8 lg:my-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:pl-10 xl:pl-14 max-w-md mx-auto lg:max-w-none w-full self-center"
            delay={120}
          >
            <div className="absolute -inset-3 md:-inset-5 rounded-2xl gold-border opacity-80 blur-[2px]" />
            <div className="relative rounded-xl overflow-hidden shadow-premium bg-royal-900 aspect-[4/5] max-w-md lg:max-w-none mx-auto">
              <img src={GURU_IMG} alt="Guru Ji Sadhguru ANAND" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 flex items-center gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold">Guru Ji Sadhguru ANAND</div>
                  <div className="text-xs text-white/70 leading-snug">
                    Vedic astrologer · Vastu consultant · Medical astrology · Practising since 1998
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex absolute -left-4 top-20 items-center gap-2 rounded-lg bg-white text-royal-900 px-4 py-3 shadow-xl max-w-[200px]">
              <CalendarClock size={18} className="text-cta-600 shrink-0" />
              <div>
                <div className="text-xs text-slate-500">Next Available</div>
                <div className="text-sm font-semibold">Today · 5 PM IST</div>
              </div>
            </div>
          </Reveal>

          {/* Body copy — below image on mobile, left column on desktop */}
          <div className="order-3 lg:col-start-1 lg:row-start-2 lg:pr-10 xl:pr-14 lg:border-r lg:border-white/10">
            <Reveal>
              <div className="hero-copy space-y-4 text-base md:text-lg leading-relaxed">
                <p className="text-white">
                  For more than twenty-five years, Guru Ji Sadhguru ANAND has guided individuals and families through the
                  lens of classical Vedic astrology — reading birth charts with precision, compassion, and a deep respect
                  for scripture.
                </p>
                <p className="text-white">
                  His consultations are not generic forecasts. He studies your kundali in detail, explains the patterns
                  behind your career, relationships, and finances, and offers remedies you can follow with confidence.
                  Clients across India and fifty countries turn to him when they need clarity they can act on.
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-8" delay={80}>
              <div className="grid grid-cols-3 gap-3 max-w-lg">
                <Reveal variant="fade" once={false} delay={0}>
                  <StatBlock light value="25+" label="Years of practice" />
                </Reveal>
                <Reveal variant="fade" once={false} delay={60}>
                  <StatBlock light value="1.2L+" label="Consultations" />
                </Reveal>
                <Reveal variant="fade" once={false} delay={120}>
                  <StatBlock light value="50+" label="Countries served" />
                </Reveal>
              </div>
            </Reveal>

            <Reveal className="mt-8" delay={100}>
              <p className="hero-copy text-sm text-white leading-relaxed max-w-xl">
                Trusted by more than 1.2 lakh clients worldwide. Guru Ji is known for patient, one-to-one sessions —
                whether you meet him online or in person — and for guidance that stays practical long after the call ends.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
