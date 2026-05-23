import { useEffect, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { submitToN8nWebhook, WebhookSubmitError } from '../lib/submitToWebhook';
import { PHONE } from '../lib/constants';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ConnectModal({ open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (open) return;
    const t = window.setTimeout(() => {
      setDone(false);
      setError(null);
      setForm({ name: '', email: '', phone: '' });
    }, 300);
    return () => window.clearTimeout(t);
  }, [open]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await submitToN8nWebhook({
        source: 'connect_modal',
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof WebhookSubmitError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
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
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[min(92dvh,100svh)] w-full max-w-md overflow-y-auto overscroll-contain rounded-3xl border border-warm-200 bg-gradient-to-b from-white to-warm-50 shadow-[0_32px_64px_-16px_rgba(12,95,120,0.18),0_12px_32px_-8px_rgba(0,0,0,0.08)] sm:max-h-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 rounded-full border border-warm-200 bg-white p-2 text-ink-400 shadow-sm transition-colors hover:border-gold-400/40 hover:text-ink-900"
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
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15"
                >
                  <CheckCircle2 className="text-emerald-400" size={30} />
                </motion.div>
                <h3 className="mb-2 font-cinzel text-xl text-ink-900">Thank you</h3>
                <p className="mb-7 text-sm leading-relaxed text-ink-500">
                  We received your details. Gurudev Anand&apos;s team will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={close}
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
                    Get in touch
                  </div>
                  <h3 className="font-cinzel text-xl leading-tight text-ink-900 md:text-2xl">
                    Let&apos;s Connect To Know More
                  </h3>
                  <p className="mt-2 text-sm text-ink-500">
                    Share your name and contact details — we&apos;ll reach out with guidance from Gurudev Anand.
                  </p>
                </div>

                <div className="space-y-4">
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
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={PHONE}
                      className="contact-input"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="contact-input"
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-shimmer mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(224,114,16,0.3)] transition-shadow duration-300 hover:shadow-gold-glow disabled:opacity-60"
                >
                  {loading && <Loader2 className="animate-spin" size={16} />}
                  {loading ? 'Sending…' : 'Submit'}
                </button>
                {error && (
                  <p className="mt-3 text-center text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}
                <p className="mt-3 text-center text-[11px] text-ink-400">
                  Your details are confidential and used only to respond to your enquiry.
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
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-ink-600">
        {label} {required && <span className="text-gold-500">*</span>}
      </span>
      {children}
    </label>
  );
}
