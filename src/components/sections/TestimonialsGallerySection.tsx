import { Star, ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { CTAButton } from '../ui/CTAButton';
import { GURU_IMG, GURU_IMG_GALLERY, GURU_IMG_RESOURCE } from '../../lib/constants';

const TESTIMONIALS = [
  {
    name: 'Ananya Mehra',
    role: 'Entrepreneur, Mumbai',
    text: 'Guru Ji pinpointed the exact month my career shift would click — it did. The remedies brought a calm I cannot describe.',
    tall: true,
  },
  {
    name: 'Rohan Kapoor',
    role: 'Tech Lead, Bengaluru',
    text: 'I consulted many astrologers before. None offered the depth and clarity Guru Ji provided. Grounded, precise, genuinely caring.',
    tall: false,
  },
  {
    name: 'Priya Nair',
    role: 'Doctor, Dubai',
    text: 'The Medical astrology session helped me trace a pattern I had missed for years. My family now swears by his guidance.',
    tall: true,
  },
];

const GALLERY_ALT = 'Guru Ji Sadhguru ANAND';

/** Bento-style gallery — no `image copy.png` (guru-about) here; Meet your mentor keeps that shot. */
const GALLERY_ITEMS: { src: string; alt: string }[] = [
  { src: GURU_IMG_GALLERY, alt: GALLERY_ALT },
  { src: GURU_IMG, alt: GALLERY_ALT },
  { src: GURU_IMG_RESOURCE, alt: GALLERY_ALT },
];

const SIGNS = [
  { name: 'Aries', symbol: '♈', bg: 'bg-pink-100' },
  { name: 'Taurus', symbol: '♉', bg: 'bg-amber-100' },
  { name: 'Gemini', symbol: '♊', bg: 'bg-sky-100' },
  { name: 'Cancer', symbol: '♋', bg: 'bg-emerald-100' },
  { name: 'Leo', symbol: '♌', bg: 'bg-yellow-100' },
  { name: 'Virgo', symbol: '♍', bg: 'bg-violet-100' },
  { name: 'Libra', symbol: '♎', bg: 'bg-rose-100' },
  { name: 'Scorpio', symbol: '♏', bg: 'bg-orange-100' },
  { name: 'Sagittarius', symbol: '♐', bg: 'bg-teal-100' },
  { name: 'Capricorn', symbol: '♑', bg: 'bg-indigo-100' },
  { name: 'Aquarius', symbol: '♒', bg: 'bg-cyan-100' },
  { name: 'Pisces', symbol: '♓', bg: 'bg-fuchsia-100' },
];

type Props = {
  onBook: () => void;
};

export function TestimonialsGallerySection({ onBook }: Props) {
  return (
    <section className="py-20 md:py-28 bg-soft-gradient">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 rounded-md bg-gold-400/15 text-gold-700 text-xs font-bold uppercase tracking-wider">
              Client Stories
            </span>
            <h2 className="mt-4 section-heading">Transformations that speak for themselves</h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-12 text-center">
            <span className="inline-block px-3 py-1 rounded-md bg-royal-50 text-royal-800 text-xs font-bold uppercase tracking-wider">
              Rashi Chakra
            </span>
            <p className="mt-3 text-charcoal-muted max-w-xl mx-auto text-sm md:text-base">
              Discover the unique imprint of your sign and how its ruling planets shape your path.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 md:gap-3">
              {SIGNS.map((s) => (
                <div
                  key={s.name}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-full ${s.bg} border border-white/80 shadow-sm min-w-[4.5rem]`}
                >
                  <span className="font-sans text-xl font-bold text-royal-900">{s.symbol}</span>
                  <span className="text-[10px] font-bold text-charcoal-muted">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {TESTIMONIALS.map((t) => (
            <Reveal key={t.name}>
              <div
                className={`break-inside-avoid rounded-lg bg-white border border-slate-200 p-6 md:p-7 shadow-sm hover:shadow-premium transition card-lift mb-4 ${
                  t.tall ? 'min-h-[220px]' : ''
                }`}
              >
                <div className="flex items-center gap-1 text-gold-500 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-charcoal leading-relaxed text-sm md:text-base">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-royal-800 text-gold-400 flex items-center justify-center font-sans text-base font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-royal-900 text-sm">{t.name}</div>
                    <div className="text-xs text-charcoal-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {GALLERY_ITEMS.map((item) => (
            <Reveal key={item.src}>
              <div className="break-inside-avoid mb-4 w-full max-w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-premium transition card-lift">
                <div className="relative aspect-[4/5] w-full bg-slate-100">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="break-inside-avoid mb-4 rounded-lg bg-royal-900 text-white p-6 border border-royal-800">
              <div className="text-xs uppercase tracking-widest text-gold-400 font-bold">Press</div>
              <p className="mt-2 font-sans font-semibold text-lg text-white">Telegraph · Mid-Day · News18 · Tribune · LatestLY</p>
            </div>
          </Reveal>
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
