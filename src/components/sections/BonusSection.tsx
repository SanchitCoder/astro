import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { CTAButton } from '../ui/CTAButton';
import { GURU_IMG } from '../../lib/constants';

const CHECKLIST_LEFT = [
  'How planetary positions at birth shape your personality and life cycles.',
  'The ancient science of aligning spaces for energy, harmony and success.',
  'Practical rituals and mantras rooted in classical scriptural guidance.',
];

const CHECKLIST_RIGHT = [
  'Personalised remedies drawn from classical texts',
  'Private 1:1 consultations — online & in-person',
  'Award-winning expert in Vedic & Medical astrology',
];

type Props = {
  onBook: () => void;
};

export function BonusSection({ onBook }: Props) {
  return (
    <section id="knowledge" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-section via-white to-royal-50/60 p-6 md:p-10 lg:p-12 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="absolute -inset-2 rounded-2xl gold-border opacity-60 blur-[1px]" />
                <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-[4/5] bg-white">
                  <img src={GURU_IMG} alt="Guru Ji Sadhguru ANAND" className="w-full h-full object-cover object-top" />
                </div>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-gold-400/20 text-gold-700 text-xs font-bold uppercase tracking-wider">
                  Learn With Us
                </span>
                <h2 className="mt-4 section-heading">
                  Unlock <span className="text-cta-600">Introduction to Vedic Astrology</span>
                </h2>
                <p className="mt-3 text-slate-600 text-sm md:text-base">
                  Curated articles and video content to deepen your understanding of Vedic wisdom — Introduction to
                  Vedic Astrology, Vastu Shastra Fundamentals, and Vedic Remedies That Work.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  <ul className="space-y-2.5">
                    {CHECKLIST_LEFT.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={17} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2.5">
                    {CHECKLIST_RIGHT.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={17} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <CTAButton variant="secondary" onClick={onBook} icon={ArrowRight}>
                    Book Your Consultation
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
