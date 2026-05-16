import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle2, Send } from 'lucide-react';

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
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
          <CheckCircle2 className="text-emerald-600" size={32} />
        </div>
        <h3 className="font-sans text-2xl font-bold text-royal-900 mb-2">Message received</h3>
        <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. Our team will contact you within a few hours to confirm your consultation with
          Guru Ji Sadhguru ANAND.
        </p>
        {onBook && (
          <button
            type="button"
            onClick={onBook}
            className="mt-6 text-sm font-semibold text-cta-600 hover:text-cta-700"
          >
            Prefer to book directly? Open booking form →
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm"
    >
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-md bg-royal-50 text-royal-800 text-xs font-bold uppercase tracking-wider">
          Send a message
        </span>
        <h3 className="mt-3 font-sans text-xl md:text-2xl font-bold text-royal-900">Request a consultation</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Share your birth details and concern. Guru Ji&apos;s team will reply with available slots — usually within
          24–48 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name" required>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="contact-input"
          />
        </Field>
        <Field label="Phone" required>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="contact-input"
          />
        </Field>
        <Field label="Email" required className="sm:col-span-2">
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
        className="mt-6 w-full py-3.5 rounded-md bg-cta-500 text-white font-semibold hover:bg-cta-600 transition flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {loading ? 'Sending…' : 'Send message'}
      </button>
      <p className="text-center text-xs text-slate-400 mt-3">
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
      <span className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-gold-600">*</span>}
      </span>
      {children}
    </label>
  );
}
