import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TestimonialCard, type Testimonial } from '../ui/TestimonialCard';
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from '../ui/ThreeDScrollTrigger';
import { GURU_IMG, GURU_IMG_GALLERY, GURU_IMG_RESOURCE } from '../../lib/constants';

const DARK_BG = 'linear-gradient(160deg, #031825 0%, #062E3C 40%, #084557 70%, #031018 100%)';
const ROTATE_MS = 4500;

const TESTIMONIALS: Testimonial[] = [
  { name: 'Ananya Mehra',    role: 'Entrepreneur, Mumbai',          text: 'Gurudev Anand pinpointed the exact month my career shift would click — it did. He took time to explain my chart, not just predict. The remedies he gave brought a calm I cannot describe.' },
  { name: 'Rohan Kapoor',    role: 'Tech Lead, Bengaluru',          text: 'I had consulted many astrologers before meeting Gurudev Anand. None offered the depth and clarity he did. He is grounded, precise, and genuinely caring — you feel heard, not processed.' },
  { name: 'Priya Nair',      role: 'Doctor, Dubai',                 text: 'His Medical astrology session helped me trace a health pattern I had missed for years. Gurudev Anand explained why certain periods had been harder. My family now swears by his guidance.' },
  { name: 'Vikram Desai',    role: 'Business Owner, Pune',          text: 'Gurudev Anand mapped my dashas before a major partnership decision. His timing advice saved us from signing at the wrong moment — within months, the right offer appeared.' },
  { name: 'Kavita Sharma',   role: 'Homemaker, Delhi',              text: 'We consulted Gurudev Anand for our son\'s education and marriage prospects. He was patient with every question and gave remedies our family could actually follow.' },
  { name: 'Arjun Reddy',     role: 'Software Engineer, Hyderabad',  text: 'The Vastu session changed how we use our home office. Gurudev Anand\'s suggestions were practical, not fear-based — and the energy in the house feels noticeably lighter.' },
  { name: 'Meera Iyer',      role: 'Chartered Accountant, Chennai', text: 'I was sceptical until Gurudev Anand described career phases I had lived through without telling him my history. That accuracy earned my trust completely.' },
  { name: 'Suresh Patel',    role: 'Retailer, Ahmedabad',           text: 'Gurudev Anand helped us choose an auspicious date for our shop inauguration. Sales in the first quarter exceeded every forecast we had made.' },
  { name: 'Deepika Banerjee',role: 'Professor, Kolkata',            text: 'His couple compatibility reading for my daughter gave our family clarity we had lacked for two years. We finally understood where the friction was coming from.' },
  { name: 'Rahul Khanna',    role: 'Marketing Director, Chandigarh',text: 'Urgent consultation with Gurudev Anand during a legal dispute — he named the window when matters would ease. It unfolded almost exactly as he said.' },
];

const ROW_A = TESTIMONIALS.slice(0, 5);
const ROW_B = TESTIMONIALS.slice(5);

const GALLERY = [
  { src: GURU_IMG_GALLERY, alt: 'Gurudev Anand' },
  { src: GURU_IMG, alt: 'Gurudev Anand' },
  { src: GURU_IMG_RESOURCE, alt: 'Gurudev Anand' },
];

function MobileRotator({ items }: { items: { src: string; alt: string }[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % items.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [items.length]);
  return (
    <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-white/[0.1]">
      {items.map((item, i) => (
        <img key={item.src} src={item.src} alt={item.alt}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          loading={i === 0 ? 'eager' : 'lazy'} />
      ))}
    </div>
  );
}

export function TestimonialsGallerySection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: DARK_BG }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(232,118,28,0.07),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#ffb36a' }}>
            Client Stories
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            What clients say about{' '}
            <span className="italic font-light" style={{ background: 'linear-gradient(135deg,#ffb36a,#e07210)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Gurudev Anand
            </span>
          </h2>
          <p className="mt-4 text-white/90 text-sm leading-relaxed">
            From Mumbai to Dubai — career turns, marriage decisions, health, and family matters.
          </p>
        </motion.div>

        {/* Scrolling testimonials */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 [perspective:1200px]">
          <ThreeDScrollTriggerContainer className="space-y-5 py-2">
            <ThreeDScrollTriggerRow direction={1} baseVelocity={3} className="py-1">
              {ROW_A.map((t) => <TestimonialCard key={t.name} testimonial={t} />)}
            </ThreeDScrollTriggerRow>
            <ThreeDScrollTriggerRow direction={-1} baseVelocity={2.5} className="py-1">
              {ROW_B.map((t) => <TestimonialCard key={t.name} testimonial={t} />)}
            </ThreeDScrollTriggerRow>
          </ThreeDScrollTriggerContainer>
        </div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#ffb36a' }}>Gallery</span>
          </div>
          <div className="md:hidden"><MobileRotator items={GALLERY} /></div>
          <div className="hidden md:grid grid-cols-3 gap-5 max-w-5xl mx-auto">
            {GALLERY.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="overflow-hidden rounded-2xl border border-white/[0.1] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] aspect-[4/5] cursor-default"
              >
                <img src={item.src} alt={item.alt}
                  className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  loading="lazy" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Press */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 max-w-xl rounded-2xl border border-white/20 bg-white/[0.08] p-6 text-center shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)]"
        >
          <span className="mb-2 inline-block text-[9px] font-bold uppercase tracking-[0.28em] text-gold-300">Press</span>
          <p className="mb-5 text-xs leading-relaxed text-white sm:text-sm">
            National and international outlets have featured Gurudev Anand for his work in Vedic astrology.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Times of India', 'Tribune', 'Hindustan Times', 'Bhagya Channel', 'Living India Channel', 'Dainik Bhaskar', 'The Voice of Chandigarh'].map((b) => (
              <span
                key={b}
                className="cursor-default rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:border-gold-400/50 hover:bg-white/15"
              >
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
