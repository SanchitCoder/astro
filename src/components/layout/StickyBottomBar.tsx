import { ArrowRight } from 'lucide-react';
import { PHONE_TEL, PRICE_AUDIO_INR, PRICE_VIDEO_INR } from '../../lib/constants';

type Props = {
  onBook: () => void;
};

export function StickyBottomBar({ onBook }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[55] border-t border-slate-200 bg-white/95 backdrop-blur-md shadow-[0_-8px_30px_-12px_rgba(0,51,102,0.12)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-sm">
          <span className="text-charcoal-muted font-medium uppercase text-[11px] tracking-wide">Normal consultation</span>
          <div className="flex items-baseline gap-2">
            <span className="text-slate-400 line-through font-semibold">₹{PRICE_VIDEO_INR.toLocaleString('en-IN')}</span>
            <span className="text-xs font-bold uppercase text-gold-600 tracking-wide">Only</span>
            <span className="text-xl font-bold text-royal-900">₹{PRICE_AUDIO_INR.toLocaleString('en-IN')}</span>
            <span className="text-charcoal-muted text-xs hidden md:inline">audio · video from ₹{PRICE_VIDEO_INR.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href={PHONE_TEL}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-md border border-slate-300 text-royal-900 text-sm font-semibold hover:bg-section transition"
          >
            Call
          </a>
          <button
            type="button"
            onClick={onBook}
            className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-cta-500 hover:bg-cta-600 text-white text-sm font-bold uppercase tracking-wide transition shadow-sm"
          >
            Book Now
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
