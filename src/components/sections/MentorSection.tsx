import { CheckCircle2, Award } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { PressCapsule } from '../ui/PressCapsule';
import { GURU_IMG_ABOUT } from '../../lib/constants';

const BULLETS = [
  'Award-winning practitioner in Vedic and Medical astrology, recognised for depth and accuracy',
  'Featured in leading Indian and international media for his work with clients and public guidance',
  'Reads each kundali personally — no assistants, no templated reports',
  'Offers private one-to-one consultations online and in person, with complete confidentiality',
  'Draws remedies directly from classical texts, adapted to your chart and daily life',
  'Known for explaining complex planetary influences in plain, actionable language',
];

const BADGES = ['Telegraph', 'Mid-Day', 'News18', 'Tribune', 'LatestLY'];

export function MentorSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-royal-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-royal-500/40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            About Guru Ji
          </span>
          <h2 className="mt-4 font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-white">Guru Ji Sadhguru ANAND</h2>
          <p className="mt-4 text-white text-base md:text-lg max-w-3xl leading-relaxed">
            A trusted name in Vedic astrology, Vastu Shastra, and Medical astrology — devoted to helping people understand
            why their lives unfold the way they do, and what they can do next.
          </p>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal className="space-y-6">
            <div className="about-copy space-y-4 text-sm md:text-base leading-relaxed">
              <p className="text-white">
                Guru Ji Sadhguru ANAND has spent over twenty-five years in disciplined study and practice of the Vedic
                sciences. What began as a calling rooted in tradition has grown into a lifetime of service: more than 1.2
                lakh consultations with people from every walk of life — business leaders, homemakers, students, couples,
                and families seeking direction.
              </p>
              <p className="text-white">
                Those who sit with him describe a rare combination — scholarly rigour and human warmth. He does not rush
                through a chart. He walks you through your houses, dashas, and transits so you understand not only what
                may lie ahead, but why certain cycles have felt heavy or stalled. His counsel on career moves, marriage
                timing, health tendencies, and Vastu corrections comes from the same foundation: classical scripture,
                applied with care to your unique birth details.
              </p>
              <p className="text-white">
                Whether you are facing a single urgent decision or a longer season of uncertainty, Guru Ji meets you where
                you are. Every session is personal, confidential, and focused on outcomes you can work toward — remedies,
                timing, and perspective you can carry into daily life.
              </p>
            </div>

            <ul className="space-y-3 pt-2">
              {BULLETS.map((t) => (
                <li key={t} className="flex items-start gap-3 text-white/85">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-sm md:text-base leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              {(
                [
                  { label: 'Experience', value: '25+ Years' },
                  { label: 'Consultations', value: '1.2 Lakh+' },
                  { label: 'Reach', value: '50+ Countries' },
                ] as const
              ).map((stat, i) => (
                <Reveal key={stat.label} variant="fade" once={false} delay={i * 70}>
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-4 text-center">
                    <Award className="mx-auto text-gold-400 mb-2" size={22} />
                    <div className="text-xs text-white/60 uppercase tracking-wide font-semibold">{stat.label}</div>
                    <div className="font-sans text-xl font-bold text-gradient-gold mt-1">{stat.value}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold-400/25 to-royal-500/30 blur-xl opacity-80" />
              <div className="relative rounded-[1.75rem] overflow-hidden shadow-premium aspect-[4/5] max-w-md mx-auto">
                <img src={GURU_IMG_ABOUT} className="w-full h-full object-cover" alt="Guru Ji Sadhguru ANAND" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-slate-100 text-royal-900 whitespace-nowrap">
                <div className="font-semibold text-sm">4.9 / 5</div>
                <div className="text-xs text-slate-500 border-l border-slate-200 pl-3">10,000+ client reviews</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-14 pt-10 border-t border-white/10">
            <span className="text-xs uppercase tracking-widest text-white/50 font-bold">As featured in</span>
            <p className="mt-2 text-sm text-white/60 max-w-2xl leading-relaxed">
              National and international publications have profiled Guru Ji Sadhguru ANAND for his contributions to
              Vedic astrology and the lives he has helped transform.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 md:gap-3">
              {BADGES.map((b) => (
                <PressCapsule key={b} label={b} variant="dark" />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
