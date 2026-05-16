import { XCircle } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

const PROBLEMS = [
  {
    title: 'Career Confusion',
    line: 'When promotions stall or the right path feels hidden, Guru Ji traces the planetary periods shaping your professional life and names the windows worth acting on.',
  },
  {
    title: 'Relationship Issues',
    line: 'Marriage delays, compatibility doubts, and recurring conflict at home often reflect deeper chart patterns — he reads both partners with care when needed.',
  },
  {
    title: 'Financial Stress',
    line: 'Blocked income and unstable cycles can feel personal; Guru Ji explains the wealth houses and timing in your kundali so you see what is temporary and what needs remedy.',
  },
  {
    title: 'Family Conflict',
    line: 'Generational tension and disharmony at home are areas he has guided countless families through, with counsel rooted in dharma and practical steps.',
  },
  {
    title: 'Delayed Success',
    line: 'When effort alone is not enough, he shows why certain dashas delay results and how to align your actions with more supportive planetary phases.',
  },
  {
    title: 'Fear & Indecision',
    line: 'Anxiety and second-guessing often lift once the chart is understood — Guru Ji is known for calm, clear explanations that restore confidence in your next step.',
  },
];

export function PainPointsSection() {
  return (
    <section className="py-20 md:py-28 bg-soft-gradient">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="quote-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl mx-auto font-normal">
              &ldquo;Why does uncertainty keep returning in career, relationships and finance, despite your
              effort?&rdquo;
            </h2>
            <p className="mt-6 text-charcoal-muted text-sm md:text-base leading-relaxed">
              Life has patterns — in career, love, money, and health — that repeat until they are understood. Guru Ji
              Sadhguru ANAND has spent decades reading kundalis for people who feel they have tried everything else. He
              does not offer vague reassurance; he names what your chart shows, why it has felt stuck, and what can
              shift when you work with the right timing and remedies.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} variant="fade" once={false} delay={i * 55}>
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
          <p className="mt-12 text-center font-sans text-lg md:text-xl text-royal-900 max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold">
              Guru Ji Sadhguru ANAND
            </span>{' '}
            brings that understanding to you in a private session — patient, thorough, and focused on the decisions
            you are carrying today.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
