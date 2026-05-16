import { useEffect, useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { PressCapsule } from '../ui/PressCapsule';
import { TestimonialCard, type Testimonial } from '../ui/TestimonialCard';
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from '../ui/ThreeDScrollTrigger';
import { GURU_IMG, GURU_IMG_GALLERY, GURU_IMG_RESOURCE } from '../../lib/constants';

const ROTATE_MS = 4500;

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ananya Mehra',
    role: 'Entrepreneur, Mumbai',
    text: 'Guru Ji Sadhguru ANAND pinpointed the exact month my career shift would click — it did. He took time to explain my chart, not just predict. The remedies he gave brought a calm I cannot describe.',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Tech Lead, Bengaluru',
    text: 'I had consulted many astrologers before meeting Guru Ji. None offered the depth and clarity he did. He is grounded, precise, and genuinely caring — you feel heard, not processed.',
  },
  {
    name: 'Priya Nair',
    role: 'Doctor, Dubai',
    text: 'His Medical astrology session helped me trace a health pattern I had missed for years. Guru Ji explained why certain periods had been harder. My family now swears by his guidance.',
  },
  {
    name: 'Vikram Desai',
    role: 'Business Owner, Pune',
    text: 'Guru Ji mapped my dashas before a major partnership decision. His timing advice saved us from signing at the wrong moment — within months, the right offer appeared.',
  },
  {
    name: 'Kavita Sharma',
    role: 'Homemaker, Delhi',
    text: 'We consulted Guru Ji for our son’s education and marriage prospects. He was patient with every question and gave remedies our family could actually follow.',
  },
  {
    name: 'Arjun Reddy',
    role: 'Software Engineer, Hyderabad',
    text: 'The Vastu session changed how we use our home office. Guru Ji’s suggestions were practical, not fear-based — and the energy in the house feels noticeably lighter.',
  },
  {
    name: 'Meera Iyer',
    role: 'Chartered Accountant, Chennai',
    text: 'I was sceptical until Guru Ji described career phases I had lived through without telling him my history. That accuracy earned my trust completely.',
  },
  {
    name: 'Suresh Patel',
    role: 'Retailer, Ahmedabad',
    text: 'Guru Ji helped us choose an auspicious date for our shop inauguration. Sales in the first quarter exceeded every forecast we had made.',
  },
  {
    name: 'Deepika Banerjee',
    role: 'Professor, Kolkata',
    text: 'His couple compatibility reading for my daughter gave our family clarity we had lacked for two years. We finally understood where the friction was coming from.',
  },
  {
    name: 'Rahul Khanna',
    role: 'Marketing Director, Chandigarh',
    text: 'Urgent consultation with Guru Ji during a legal dispute — he named the window when matters would ease. It unfolded almost exactly as he said.',
  },
];

const ROW_A = TESTIMONIALS.slice(0, 5);
const ROW_B = TESTIMONIALS.slice(5);

const GALLERY_ALT = 'Guru Ji Sadhguru ANAND';

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

function MobileGalleryRotator({ items }: { items: { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * items.length));

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
      {items.map((item, i) => (
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          loading={i === index ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}
    </div>
  );
}

export function TestimonialsGallerySection() {
  return (
    <section className="py-20 md:py-28 bg-soft-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 rounded-md bg-gold-400/15 text-gold-700 text-xs font-bold uppercase tracking-wider">
              Client Stories
            </span>
            <h2 className="mt-4 section-heading">What clients say about Guru Ji Sadhguru ANAND</h2>
            <p className="mt-4 text-charcoal-muted text-sm md:text-base leading-relaxed">
              People from Mumbai to Dubai have sat with Guru Ji for career turns, marriage decisions, health concerns,
              and family matters. Scroll the page — the reviews move with you.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-12 text-center">
            <span className="inline-block px-3 py-1 rounded-md bg-royal-50 text-royal-800 text-xs font-bold uppercase tracking-wider">
              Rashi Chakra
            </span>
            <p className="mt-3 text-charcoal-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Guru Ji reads every sign with equal care — the rashi chakra is the backdrop; your individual kundali is
              where his attention stays in every consultation.
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

        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 [perspective:1200px]">
          <ThreeDScrollTriggerContainer className="space-y-5 py-2">
            <ThreeDScrollTriggerRow direction={1} baseVelocity={3} className="py-1">
              {ROW_A.map((t) => (
                <TestimonialCard key={t.name} testimonial={t} />
              ))}
            </ThreeDScrollTriggerRow>
            <ThreeDScrollTriggerRow direction={-1} baseVelocity={2.5} className="py-1">
              {ROW_B.map((t) => (
                <TestimonialCard key={t.name} testimonial={t} />
              ))}
            </ThreeDScrollTriggerRow>
          </ThreeDScrollTriggerContainer>
        </div>

        <Reveal>
          <div className="mt-12 max-w-xl mx-auto rounded-lg bg-royal-900 text-white p-6 border border-royal-800 text-center md:text-left">
            <div className="text-xs uppercase tracking-widest text-gold-400 font-bold">Press</div>
            <p className="mt-2 text-sm text-white/75 leading-relaxed">
              National and international outlets have featured Guru Ji Sadhguru ANAND for his work in Vedic astrology.
            </p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
              {['Telegraph', 'Mid-Day', 'News18', 'Tribune', 'LatestLY'].map((b) => (
                <PressCapsule key={b} label={b} variant="dark" />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-md bg-royal-50 text-royal-800 text-xs font-bold uppercase tracking-wider">
              Guru Ji Sadhguru ANAND
            </span>
          </div>
          <div className="md:hidden">
            <MobileGalleryRotator items={GALLERY_ITEMS} />
          </div>
          <div className="hidden md:grid grid-cols-3 gap-4 max-w-5xl mx-auto">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.src}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm aspect-[4/5]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
