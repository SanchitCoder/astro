import { ArrowRight, CalendarClock, Clock, Phone, Video, Coins } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { InfoCard } from '../ui/InfoCard';
import { StatBlock } from '../ui/StatBlock';
import { CTAButton } from '../ui/CTAButton';
import { GURU_IMG, PHONE_TEL } from '../../lib/constants';

type Props = {
  onBook: () => void;
};

export function HeroSection({ onBook }: Props) {
  return (
    <section id="home" className="relative overflow-hidden bg-hero-gradient text-white pt-10 md:pt-14 pb-16 md:pb-24">
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cta-500/20 blur-3xl animate-drift" />
        <div className="absolute top-40 right-0 w-[30rem] h-[30rem] rounded-full bg-royal-400/25 blur-3xl animate-drift-reverse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] max-w-4xl text-white">
            Remove <span className="text-gradient-gold">Uncertainty</span> from Career, Relationships & Finance
          </h1>
          <p className="mt-5 text-white/80 text-base md:text-lg max-w-2xl">
            Personalised Vedic astrology consultations with Guru Ji Sadhguru ANAND. Get clarity on your life path,
            precise timing, and actionable remedies rooted in 25+ years of practice.
          </p>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          <Reveal className="space-y-3">
            <InfoCard icon={CalendarClock} label="Next available" value="Today · 5 PM IST" />
            <InfoCard icon={Clock} label="Session length" value="30 mins (60 mins for extended urgent)" />
            <InfoCard icon={Coins} label="Transparent pricing" value="From ₹11,000 (audio) · ₹15,000 (video)" />
            <InfoCard icon={Video} label="Format" value="Private audio or video call — worldwide" />
          </Reveal>

          <Reveal className="relative lg:pl-2" delay={120}>
            <div className="absolute -inset-3 md:-inset-5 rounded-2xl gold-border opacity-80 blur-[2px]" />
            <div className="relative rounded-xl overflow-hidden shadow-premium bg-royal-900 aspect-[4/5] max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <img src={GURU_IMG} alt="Guru Ji Sadhguru ANAND" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 flex items-center gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold">Guru Ji Sadhguru ANAND</div>
                  <div className="text-xs text-white/70">Vedic Astrologer · Vastu · Medical Astrology</div>
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
        </div>

        <Reveal className="mt-8 max-w-md mx-auto lg:mx-0 lg:max-w-lg" delay={80}>
          <div className="grid grid-cols-3 gap-3">
            <StatBlock light value="25+" label="Years of practice" />
            <StatBlock light value="1.2L+" label="Consultations" />
            <StatBlock light value="50+" label="Countries served" />
          </div>
        </Reveal>

        <Reveal className="mt-10 max-w-xl mx-auto lg:mx-0 text-center lg:text-left space-y-3" delay={100}>
          <CTAButton variant="primary" onClick={onBook} fullWidth className="md:inline-flex md:w-auto md:min-w-[280px]" icon={ArrowRight}>
            Book Your Consultation
          </CTAButton>
          <p className="text-sm text-white/70">
            Trusted by 1.2 lakh+ clients worldwide · Most clients are confirmed within 24–48 hours
          </p>
        </Reveal>

        <Reveal className="mt-6 flex justify-center lg:justify-start" delay={140}>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition text-sm"
          >
            <Phone size={16} /> Talk to Guru Ji
          </a>
        </Reveal>
      </div>
    </section>
  );
}
