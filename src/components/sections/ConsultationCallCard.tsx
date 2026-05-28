import { GURU_IMG } from '../../lib/constants';

/** Left column of the About section — Gurudev portrait only (`image.png`). */
export function ConsultationCallCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Ambient gold halo */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-[3rem] opacity-80 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at 50% 70%, rgba(216,138,34,0.28) 0%, rgba(216,138,34,0.08) 45%, transparent 70%)',
        }}
      />

      {/* Soft outer glow ring */}
      <div className="pointer-events-none absolute -inset-3 rounded-[2.75rem] border border-gold-400/20 shadow-[0_0_48px_rgba(216,138,34,0.22)]" />

      {/* Portrait frame */}
      <div
        className="relative overflow-hidden rounded-[2.5rem] border border-gold-400/35 bg-white p-2 shadow-[0_28px_56px_-14px_rgba(0,0,0,0.55),0_12px_32px_-8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-gold-300/25 sm:p-3"
        style={{
          boxShadow:
            '0 28px 56px -14px rgba(0,0,0,0.55), 0 12px 32px -8px rgba(0,0,0,0.35), 0 0 0 1px rgba(243,183,87,0.2), 0 0 40px rgba(216,138,34,0.12)',
        }}
      >
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-white via-white to-warm-50">
          <img
            src={GURU_IMG}
            alt="Gurudev Anand"
            className="block h-auto w-full object-contain object-center"
          />
        </div>

        {/* Bottom vignette for depth on the dark section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#001530]/10 to-transparent" />
      </div>

      {/* Highlight accent — top edge shine */}
      <div className="pointer-events-none absolute inset-x-6 top-3 h-px rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent" />
    </div>
  );
}
