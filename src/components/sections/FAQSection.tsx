import { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { AccordionItem } from '../ui/AccordionItem';

const ITEMS = [
  {
    q: 'How does a consultation with Guru Ji Sadhguru ANAND work?',
    a: 'You share your full birth details in advance. Guru Ji reads your kundali before or during the session, then meets you on a private audio or video call. He explains what he sees in your chart, answers your questions, and outlines remedies tailored to you — not a generic report.',
  },
  {
    q: 'How long is a session with Guru Ji?',
    a: 'Standard sessions with Guru Ji are thirty minutes — enough time for a focused reading and your most pressing questions. When your situation needs more depth, he also offers extended sixty-minute sessions.',
  },
  {
    q: 'Can I consult Guru Ji online or in person?',
    a: 'Both are available. Clients worldwide meet Guru Ji by secure audio or video call. In-person sessions are offered when his schedule and location allow — the same personal attention either way.',
  },
  {
    q: 'What details does Guru Ji need from me?',
    a: 'Your full name, date of birth, exact time of birth, and place of birth. For couple consultations, both partners’ details. Accuracy matters — Guru Ji uses these to cast and interpret your chart with care.',
  },
  {
    q: 'What is Guru Ji’s refund policy?',
    a: 'Bookings are one-time and non-refundable. If you need to reschedule, his team will support you based on Guru Ji’s availability.',
  },
  {
    q: 'How soon can I speak with Guru Ji?',
    a: 'Most clients are confirmed within twenty-four to forty-eight hours. When your matter is urgent, ask about priority slots — Guru Ji accommodates pressing cases when possible.',
  },
  {
    q: 'What can I discuss with Guru Ji?',
    a: 'Career, relationships, marriage, finance, health, family, Vastu, legal concerns, and spiritual questions — the areas he has guided clients through for over twenty-five years. Bring what weighs on you; he will orient the session accordingly.',
  },
  {
    q: 'Are remedies included in Guru Ji’s consultations?',
    a: 'Yes. Every session includes personalised remedies rooted in classical Vedic scriptures — mantras, rituals, or other guidance Guru Ji selects for your chart and circumstances.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-md bg-royal-50 text-royal-800 text-xs font-bold uppercase tracking-wider">
              FAQs
            </span>
            <h2 className="mt-4 section-heading">Questions clients ask about Guru Ji</h2>
            <p className="mt-4 text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Before you speak with Guru Ji Sadhguru ANAND, here is how his consultations are structured — and what you
              can expect from time with him.
            </p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.q} variant="fade" once={false} delay={i * 45}>
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
