import { Brain, Briefcase, Heart, Coins, Activity, CalendarClock, ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { FeatureTile } from '../ui/FeatureTile';
import { CTAButton } from '../ui/CTAButton';

const TILES = [
  { icon: Brain, title: 'Personality Insights', desc: 'Understand your innate strengths, tendencies and blind spots.' },
  { icon: Briefcase, title: 'Career Timing', desc: 'Identify the right windows to switch, start or accelerate.' },
  { icon: Heart, title: 'Relationship Compatibility', desc: 'Read how your chart harmonises with a partner or family.' },
  { icon: Coins, title: 'Financial Patterns', desc: 'Decode money cycles and remove blockages in wealth flow.' },
  { icon: Activity, title: 'Health & Energy', desc: 'Recognise dosha imbalances and plan preventive care.' },
  { icon: CalendarClock, title: 'Auspicious Timing', desc: 'Choose the right muhurat for major life milestones.' },
];

type Props = {
  onBook: () => void;
};

export function ReframeSection({ onBook }: Props) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-royal-900 tracking-tight">
              Astrology is not about predictions. <span className="text-cta-600">It is about patterns.</span>
            </h2>
            <p className="mt-5 text-slate-600 text-base md:text-lg">
              Planetary positions, houses and signs are a framework. Guru Ji translates them into grounded,
              actionable insight for modern life.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TILES.map((t) => (
            <Reveal key={t.title}>
              <FeatureTile icon={t.icon} title={t.title} description={t.desc} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <CTAButton variant="primary" onClick={onBook} icon={ArrowRight}>
              Book Your Consultation
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
