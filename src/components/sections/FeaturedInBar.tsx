import { Reveal } from '../ui/Reveal';

const BADGES = ['Telegraph', 'Mid-Day', 'News18', 'Tribune', 'LatestLY'];

export function FeaturedInBar() {
  return (
    <section className="bg-section border-y border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
        <Reveal className="shrink-0">
          <span className="text-xs uppercase tracking-widest text-charcoal-muted font-bold">Featured In</span>
        </Reveal>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3 flex-1">
          {BADGES.map((b) => (
            <span key={b} className="font-sans font-semibold text-royal-800 text-base md:text-lg">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
