import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Send, Sparkles } from 'lucide-react';

type Props = {
  onBook?: () => void;
};

export function ContactForm({ onBook }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    consultation_type: 'normal',
    format: 'video',
    message: '',
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl glass-card border border-warm-300 p-10 text-center"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center mb-5">
          <CheckCircle2 className="text-emerald-400" size={30} />
        </div>
        <h3 className="font-cinzel text-xl text-ink-900 mb-2">Message Received</h3>
        <p className="text-ink-500 text-sm leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. Our team will contact you within a few hours to confirm
          your consultation with Gurudev Anand.
        </p>
        {onBook && (
          <button
            type="button"
            onClick={onBook}
            className="mt-6 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
          >
            Prefer a quick enquiry? Let&apos;s connect →
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl glass-card border border-warm-300 p-6 md:p-8"
    >
      <div className="mb-7">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 text-[11px] font-bold uppercase tracking-widest mb-3">
          <Sparkles size={10} />
          Send a Message
        </div>
        <h3 className="font-cinzel text-xl text-ink-900">Request a consultation</h3>
        <p className="mt-2 text-sm text-ink-500 leading-relaxed">
          Share your birth details and concern. Gurudev Anand&apos;s team will reply with available
          slots — usually within 24–48 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name" required>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            className="contact-input"
          />
        </Field>
        <Field label="Phone" required>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 98763 44400"
            className="contact-input"
          />
        </Field>
        <Field label="Email" required className="sm:col-span-2">
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            className="contact-input"
          />
        </Field>
        <Field label="Consultation type">
          <select
            value={form.consultation_type}
            onChange={(e) => setForm({ ...form, consultation_type: e.target.value })}
            className="contact-input"
          >
            <option value="normal">Normal Consultation</option>
            <option value="urgent">Urgent Consultation</option>
            <option value="couple">Couple Consultation</option>
            <option value="medical">Medical Astrology</option>
            <option value="vastu">Vastu Consultation</option>
          </select>
        </Field>
        <Field label="Preferred format">
          <select
            value={form.format}
            onChange={(e) => setForm({ ...form, format: e.target.value })}
            className="contact-input"
          >
            <option value="video">Video call</option>
            <option value="audio">Audio call</option>
          </select>
        </Field>
        <Field label="Your message" className="sm:col-span-2">
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Birth date, time, place, and what you would like guidance on…"
            className="contact-input resize-none"
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full py-3.5 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-cosmic-950 font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 btn-shimmer hover:shadow-gold-glow transition-shadow duration-300"
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
        {loading ? 'Sending…' : 'Send Message'}
      </button>
      <p className="text-center text-[11px] text-ink-300 mt-3">
        Your details are confidential and used only to schedule your consultation.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
  className = '',
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[11px] font-bold text-ink-400 uppercase tracking-widest mb-1.5">
        {label} {required && <span className="text-gold-400">*</span>}
      </span>
      {children}
    </label>
  );
}
