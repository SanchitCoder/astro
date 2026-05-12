import { XCircle, ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { CTAButton } from '../ui/CTAButton';

const PROBLEMS = [
  { title: 'Career Confusion', line: 'Stuck in direction, job delays, or struggling for that next breakthrough.' },
  { title: 'Relationship Issues', line: 'Marriage delays, compatibility doubts, or recurring conflicts at home.' },
  { title: 'Financial Stress', line: 'Blocked income, uncontrolled expenses, or unstable cash flow cycles.' },
  { title: 'Family Conflict', line: 'Ongoing disputes, disharmony, or generational disputes weighing on you.' },
  { title: 'Delayed Success', line: 'Despite effort, results are slow, opportunities keep slipping past you.' },
  { title: 'Fear & Indecision', line: 'Negative patterns, anxiety, or inability to take confident decisions.' },
];

type Props = {
  onBook: () => void;
};

export function PainPointsSection({ onBook }: Props) {
  return (
    <section className="py-20 md:py-28 bg-soft-gradient">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="quote-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl mx-auto font-normal">
              &ldquo;Why does uncertainty keep returning in career, relationships and finance, despite your
              effort?&rdquo;
            </h2>
            <p className="mt-6 text-charcoal-muted text-sm md:text-base">
              Life has patterns. When you understand them, the right decisions become obvious. Guru Ji reads your
              kundali to surface what is silently shaping your journey.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {PROBLEMS.map((p) => (
            <Reveal key={p.title}>
              <div className="flex gap-4 rounded-lg bg-white border border-slate-200 p-5 md:p-6 shadow-sm hover:shadow-premium transition card-lift">
                <XCircle className="text-rose-600 shrink-0 mt-0.5" size={22} />
                <div>
                  <div className="font-sans font-bold text-royal-900">{p.title}</div>
                  <p className="mt-1 text-sm text-charcoal-muted leading-relaxed">{p.line}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 text-center font-sans text-xl md:text-2xl font-bold text-royal-900">
            The answer is in a <span className="text-cta-600">personalised Vedic astrology consultation</span> with Guru Ji Sadhguru ANAND.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex justify-center">
            <CTAButton variant="secondary" onClick={onBook} icon={ArrowRight}>
              Get Clarity Today
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
