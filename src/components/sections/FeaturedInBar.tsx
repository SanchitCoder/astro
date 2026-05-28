const PRESS = [
  'Times of India', 'Tribune', 'Hindustan Times',
  'Bhagya Channel', 'Living India Channel', 'Dainik Bhaskar', 'The Voice of Chandigarh',
];

const ITEMS = [...PRESS, ...PRESS];

export function FeaturedInBar() {
  return (
    <section
      className="relative py-5 overflow-hidden border-y border-white/[0.06]"
      style={{ background: 'linear-gradient(90deg, #001530 0%, #002D60 50%, #001530 100%)' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_50%_50%,rgba(216,138,34,0.06),transparent_70%)] pointer-events-none" />

      <div className="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.28em] text-white">
          Featured In
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,black_6%,black_94%,transparent_100%)]">
        <div className="press-marquee-track flex w-max gap-3">
          {ITEMS.map((name, i) => (
            <span
              key={i}
              className="shrink-0 cursor-default whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-gold-400/40 hover:bg-white/15"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
