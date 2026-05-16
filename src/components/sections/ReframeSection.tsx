import { Brain, Briefcase, Heart, Coins, Activity, CalendarClock } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { FeatureTile } from '../ui/FeatureTile';
import { GlowingCard, GlowingCards } from '../ui/GlowingCards';

const TILES = [
  {
    icon: Brain,
    title: 'Personality Insights',
    desc: 'Guru Ji maps your innate strengths, tendencies, and blind spots from your birth chart — so you understand yourself before you change course.',
  },
  {
    icon: Briefcase,
    title: 'Career Timing',
    desc: 'He identifies when to push, pause, or pivot professionally, drawing on dashas and transits rather than guesswork.',
  },
  {
    icon: Heart,
    title: 'Relationship Compatibility',
    desc: 'For marriage and partnership questions, he reads how two charts interact and what each person needs for harmony.',
  },
  {
    icon: Coins,
    title: 'Financial Patterns',
    desc: 'Wealth houses and planetary cycles are explained in plain terms, with guidance on easing blockages Guru Ji sees in your chart.',
  },
  {
    icon: Activity,
    title: 'Health & Energy',
    desc: 'Through Medical astrology, he highlights tendencies worth watching and preventive steps aligned with classical remedy traditions.',
  },
  {
    icon: CalendarClock,
    title: 'Auspicious Timing',
    desc: 'Major milestones — weddings, moves, launches — benefit from muhurat guidance he selects with your kundali in view.',
  },
];

const GLOW_PALETTE = ['#29ABE2', '#004A7C', '#C5A059', '#1a7aad', '#085580', '#96773e'] as const;

export function ReframeSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-royal-900 tracking-tight">
              How Guru Ji Sadhguru ANAND reads your chart
            </h2>
            <p className="mt-5 text-slate-600 text-base md:text-lg leading-relaxed">
              He does not treat astrology as fortune-telling. For him, the planets, houses, and signs are a language —
              one he has studied for over twenty-five years — and your kundali is the text. In every consultation he
              translates that language into grounded insight: what is active in your life now, what is coming, and what
              you can do about it.
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          <GlowingCards
            enableGlow
            responsive={false}
            gap="1.25rem"
            maxWidth="80rem"
            padding="0"
            glowRadius={160}
            glowOpacity={0.38}
            childrenLayoutClassName="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {TILES.map((t, i) => (
              <GlowingCard
                key={t.title}
                glowColor={GLOW_PALETTE[i % GLOW_PALETTE.length]}
                className="min-w-0"
              >
                <Reveal delay={i * 70} variant="fade" once={false}>
                  <FeatureTile icon={t.icon} title={t.title} description={t.desc} plain />
                </Reveal>
              </GlowingCard>
            ))}
          </GlowingCards>
        </div>

      </div>
    </section>
  );
}
