import { CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { CTAButton } from '../ui/CTAButton';
import { GURU_IMG_ABOUT } from '../../lib/constants';

const BULLETS = [
  'Award-winning expert in Vedic & Medical astrology',
  'Featured across leading Indian and global media',
  'Personalised remedies drawn from classical texts',
  'Private 1:1 consultations — online & in-person',
  'With over 25 years of dedicated practice in Vedic astrology, Vastu Shastra and Medical astrology',
  'Guided more than 1.2 lakh individuals across 50+ countries to clarity, calm and purpose',
  'His approach blends ancient scriptures with grounded, modern counsel',
];

const BADGES = ['Telegraph', 'Mid-Day', 'News18', 'Tribune', 'LatestLY'];

type Props = {
  onBook: () => void;
};

export function MentorSection({ onBook }: Props) {
  return (
    <section id="about" className="py-20 md:py-28 bg-royal-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-royal-500/40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            Meet Your Mentor
          </span>
          <h2 className="mt-4 font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-white">Guru Ji Sadhguru ANAND</h2>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal className="space-y-5">
            <ul className="space-y-3">
              {BULLETS.map((t) => (
                <li key={t} className="flex items-start gap-3 text-white/85">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-sm md:text-base leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>

            <p className="text-white/75 text-sm md:text-base leading-relaxed pt-2">
              With over 25 years of dedicated practice in Vedic astrology, Vastu Shastra and Medical astrology, Guru Ji
              has guided more than 1.2 lakh individuals across 50+ countries to clarity, calm and purpose. His approach
              blends ancient scriptures with grounded, modern counsel — translating planetary wisdom into decisions you
              can act on today. Every session is personal, confidential and focused on outcomes.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 pt-4">
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4 text-center">
                <Award className="mx-auto text-gold-400 mb-2" size={22} />
                <div className="text-xs text-white/60 uppercase tracking-wide font-semibold">Experience</div>
                <div className="font-sans text-xl font-bold text-gradient-gold mt-1">25+ Years</div>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4 text-center">
                <Award className="mx-auto text-gold-400 mb-2" size={22} />
                <div className="text-xs text-white/60 uppercase tracking-wide font-semibold">Consultations</div>
                <div className="font-sans text-xl font-bold text-gradient-gold mt-1">1.2 Lakh+</div>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4 text-center">
                <Award className="mx-auto text-gold-400 mb-2" size={22} />
                <div className="text-xs text-white/60 uppercase tracking-wide font-semibold">Reach</div>
                <div className="font-sans text-xl font-bold text-gradient-gold mt-1">50+ Countries</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold-400/25 to-royal-500/30 blur-xl opacity-80" />
              <div className="relative rounded-[1.75rem] overflow-hidden shadow-premium aspect-[4/5] max-w-md mx-auto">
                <img src={GURU_IMG_ABOUT} className="w-full h-full object-cover" alt="Guru Ji" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-slate-100 text-royal-900 whitespace-nowrap">
                <div className="font-semibold text-sm">4.9 / 5</div>
                <div className="text-xs text-slate-500 border-l border-slate-200 pl-3">10,000+ reviews</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-14 pt-10 border-t border-white/10">
            <span className="text-xs uppercase tracking-widest text-white/50 font-bold">Featured In</span>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {BADGES.map((b) => (
                <span key={b} className="font-sans font-semibold text-white/80 text-lg">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex justify-center lg:justify-start">
            <CTAButton variant="primary" onClick={onBook} icon={ArrowRight}>
              Book a Consultation
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
