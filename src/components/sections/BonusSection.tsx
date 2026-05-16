import { CheckCircle2 } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

const CHECKLIST_LEFT = [
  'How Guru Ji explains the planetary positions at your birth and the life cycles they set in motion.',
  'His approach to Vastu — aligning spaces so the energy of your home supports the intentions in your chart.',
  'Remedies he prescribes from classical scripture: practical rituals and mantras suited to your situation.',
];

const CHECKLIST_RIGHT = [
  'Insights drawn from decades of reading kundalis, not generic online templates.',
  'The same one-to-one attention whether you meet him online or in person.',
  'A teacher who makes Vedic and Medical astrology accessible without diluting the tradition.',
];

export function BonusSection() {
  return (
    <section id="knowledge" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal variant="fade" once={false}>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-section via-white to-royal-50/60 p-6 md:p-10 lg:p-12 shadow-sm">
            <div className="mx-auto max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-md bg-gold-400/20 text-gold-700 text-xs font-bold uppercase tracking-wider">
                Guru Ji&apos;s Teachings
              </span>
              <h2 className="mt-4 section-heading">
                Learn the foundations <span className="text-cta-600">Guru Ji Sadhguru ANAND</span> works from
              </h2>
              <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
                Beyond private consultations, Guru Ji shares the principles behind his practice — introduction to Vedic
                astrology, Vastu Shastra fundamentals, and remedies that have stood the test of time. These resources
                reflect how he thinks and reads charts, so you arrive at a session already oriented to the depth he
                offers.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                <ul className="space-y-2.5">
                  {CHECKLIST_LEFT.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 size={17} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2.5">
                  {CHECKLIST_RIGHT.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 size={17} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
