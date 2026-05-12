import { useEffect, useState, FormEvent } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';

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

  if (!open) return null;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setDone(true);
  };

  const reset = () => {
    setDone(false);
    setForm({ name: '', email: '', phone: '', consultation_type: defaultType, format: 'video', message: '' });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-royal-900/70 backdrop-blur-sm animate-fade-in"
      onClick={reset}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-premium overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={reset}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {done ? (
          <div className="p-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <CheckCircle2 className="text-emerald-600" size={32} />
            </div>
            <h3 className="font-serif text-2xl text-royal-900 mb-2">Booking Received</h3>
            <p className="text-slate-600 mb-6">
              Thank you. Our team will reach out within a few hours to confirm your consultation slot with Guru Ji.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 rounded-md bg-cta-500 text-white font-medium hover:bg-cta-600 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-8">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/15 text-gold-600 text-xs font-semibold tracking-wide uppercase mb-3">
                Book Your Call
              </div>
              <h3 className="font-serif text-2xl text-royal-900">Schedule a consultation</h3>
              <p className="text-sm text-slate-500 mt-1">Share your details. We will confirm a convenient time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Full name" required>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Phone" required>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Email" required className="md:col-span-2">
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Consultation type">
                <select
                  value={form.consultation_type}
                  onChange={(e) => setForm({ ...form, consultation_type: e.target.value })}
                  className="input"
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
                  className="input"
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
                  className="input resize-none"
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-3.5 rounded-md bg-cta-500 text-white font-semibold hover:bg-cta-600 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? 'Submitting' : 'Confirm Booking Request'}
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">
              Your details are confidential and used only to schedule your consultation.
            </p>
          </form>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.7rem 0.9rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          background: #fff;
          font-size: 0.95rem;
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus { outline: none; border-color: #29abe2; box-shadow: 0 0 0 3px rgba(41, 171, 226, 0.2); }
      `}</style>
    </div>
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
