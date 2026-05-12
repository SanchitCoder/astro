import { useState } from 'react';
import { Sparkles, ArrowRight, Phone } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { AccordionItem } from '../ui/AccordionItem';
import { CTAButton } from '../ui/CTAButton';
import { PHONE, PHONE_TEL } from '../../lib/constants';

const ITEMS = [
  { q: 'How does the consultation work?', a: 'You share your birth details, book a slot and meet Guru Ji on a private audio or video call. A personalised reading and remedies follow.' },
  { q: 'How long is a session?', a: 'Standard sessions are 30 minutes. Extended 60-minute sessions are available for deeper cases.' },
  { q: 'Is the consultation online or in-person?', a: 'Both formats are available. Online sessions happen via video or audio call worldwide.' },
  { q: 'What details do I need to provide?', a: 'Your full name, date, exact time and place of birth. For couple sessions, both partners’ details.' },
  { q: 'Is there a refund policy?', a: 'Bookings are one-time and non-refundable, but rescheduling is supported based on Guru Ji’s availability.' },
  { q: 'How soon can I book?', a: 'Most clients are confirmed within 24–48 hours. Urgent slots are available when possible.' },
  { q: 'What problems can I discuss?', a: 'Career, relationships, marriage, finance, health, family, Vastu, legal concerns and spiritual questions.' },
  { q: 'Are remedies included?', a: 'Yes — every consultation includes personalised remedies rooted in classical Vedic scriptures.' },
];

type Props = {
  onBook: () => void;
};

export function FAQSection({ onBook }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="mb-14 rounded-xl bg-cta-gradient relative overflow-hidden text-white p-10 md:p-12 text-center">
            <div className="absolute inset-0 opacity-35 pointer-events-none">
              <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full bg-cta-400/40 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-royal-900/50 blur-3xl" />
            </div>
            <div className="relative">
              <Sparkles className="mx-auto text-gold-400 mb-5" size={40} />
              <h2 className="font-sans text-3xl md:text-5xl font-bold text-white">
                Start your <span className="text-gold-400">guidance session</span> today
              </h2>
              <p className="mt-5 text-white/80 max-w-xl mx-auto text-base md:text-lg">
                One call with Guru Ji can unlock the clarity you have been searching for. Book now and let your
                journey toward a clearer life begin.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <CTAButton variant="primary" onClick={onBook} icon={ArrowRight}>
                  Book Your Consultation
                </CTAButton>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-md bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition"
                >
                  <Phone size={17} /> {PHONE}
                </a>
              </div>
              <p className="mt-5 text-sm text-white/60">
                Confidential · Available worldwide · Trusted by 1.2 lakh+ clients
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-md bg-royal-50 text-royal-800 text-xs font-bold uppercase tracking-wider">
              FAQs
            </span>
            <h2 className="mt-4 section-heading">FAQ&apos;s: Here&apos;s everything you may ask</h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.q}>
              <AccordionItem
                question={it.q}
                answer={it.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
