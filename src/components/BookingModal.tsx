import { useEffect, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, Sparkles } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  defaultType?: string;
};

export function BookingModal({ open, onClose, defaultType = 'normal' }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    consultation_type: defaultType,
    format: 'video',
    message: '',
  });

  useEffect(() => {
    if (!open) return;
    setForm((prev) => ({ ...prev, consultation_type: defaultType }));
  }, [defaultType, open]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setDone(true);
  };

  const reset = () => {
    setDone(false);
    setForm({ name: '', email: '', phone: '', consultation_type: defaultType, format: 'video', message: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink-900/40 p-3 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={reset}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[min(92dvh,100svh)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-3xl border border-warm-200 bg-gradient-to-b from-white to-warm-50 shadow-[0_32px_64px_-16px_rgba(0,94,168,0.18),0_12px_32px_-8px_rgba(0,0,0,0.08)] sm:max-h-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold gradient top border */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

            {/* Close */}
            <button
              onClick={reset}
              className="absolute top-4 right-4 rounded-full border border-warm-200 bg-white p-2 text-ink-400 shadow-sm transition-colors hover:border-gold-400/40 hover:text-ink-900"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {done ? (
              <div className="p-10 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mb-5"
                >
                  <CheckCircle2 className="text-emerald-400" size={30} />
                </motion.div>
                <h3 className="font-cinzel text-xl text-ink-900 mb-2">Booking Received</h3>
                <p className="text-ink-500 text-sm leading-relaxed mb-7">
                  Thank you. Our team will reach out within a few hours to confirm your
                  consultation slot with Gurudev Anand.
                </p>
                <button
                  onClick={reset}
                  className="btn-shimmer rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-7 py-3 text-sm font-bold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="p-7 md:p-8">
                <div className="mb-7">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold-600">
                    <Sparkles size={10} />
                    Book Your Session
                  </div>
                  <h3 className="font-cinzel text-xl text-ink-900">Schedule a consultation</h3>
                  <p className="mt-1 text-sm text-ink-500">Share your details. We will confirm a convenient time.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Field label="Email" required className="md:col-span-2">
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
                  <Field label="Format">
                    <select
                      value={form.format}
                      onChange={(e) => setForm({ ...form, format: e.target.value })}
                      className="contact-input"
                    >
                      <option value="video">Video Call</option>
                      <option value="audio">Audio Call</option>
                    </select>
                  </Field>
                  <Field label="Brief concern (optional)" className="md:col-span-2">
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What would you like to discuss..."
                      className="contact-input resize-none"
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-shimmer mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(216,138,34,0.3)] transition-shadow duration-300 hover:shadow-gold-glow disabled:opacity-60"
                >
                  {loading && <Loader2 className="animate-spin" size={16} />}
                  {loading ? 'Submitting…' : 'Confirm Booking Request'}
                </button>
                <p className="mt-3 text-center text-[11px] text-ink-400">
                  Your details are confidential and used only to schedule your consultation.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-ink-600">
        {label} {required && <span className="text-gold-500">*</span>}
      </span>
      {children}
    </label>
  );
}

