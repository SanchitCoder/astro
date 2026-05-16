import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const LINKS = [
  { label: 'Home', to: '/', hash: '#home' },
  { label: 'About Guru Ji', to: '/', hash: '#about' },
  { label: 'Services', to: '/', hash: '#services' },
  { label: 'Consultations', to: '/', hash: '#services' },
  { label: 'Articles', to: '/', hash: '#knowledge' },
  { label: 'Contact', to: '/contact' },
];

type Props = {
  onBook: () => void;
};

function NavItem({ to, hash, label }: { to: string; hash?: string; label: string }) {
  const location = useLocation();
  const href = hash ? `${to}${hash}` : to;
  const isContact = to === '/contact';
  const isActive = isContact
    ? location.pathname === '/contact'
    : location.pathname === '/' && hash && location.hash === hash;

  if (isContact) {
    return (
      <Link
        to={to}
        className={`hover:text-white/85 transition py-1 inline-block ${isActive ? 'text-gold-400' : ''}`}
      >
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={`hover:text-white/85 transition py-1 inline-block ${isActive ? 'text-gold-400' : ''}`}
    >
      {label}
    </a>
  );
}

/** White top row + medium-blue secondary bar (reference layout) */
export function Navbar({ onBook }: Props) {
  return (
    <header className="sticky top-0 z-[60] shadow-md">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5 md:py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gold-400/15 border border-gold-500/30 text-gold-700 text-[11px] md:text-xs font-bold uppercase tracking-wide whitespace-nowrap hover:bg-gold-400/25 transition">
              <Sparkles size={13} className="text-gold-600 shrink-0" />
              Vedic Astrology · Since 1998
            </Link>
          </div>
          <p className="hidden text-center text-sm md:text-base font-semibold text-royal-900 leading-snug sm:block sm:flex-1 sm:px-4 sm:line-clamp-none">
            Guru Ji Sadhguru ANAND — Vedic Astrology · Vastu · Medical Astrology
          </p>
          <div className="hidden justify-center sm:flex sm:justify-end shrink-0">
            <button
              type="button"
              onClick={onBook}
              className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-md bg-cta-500 hover:bg-cta-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wide transition w-full sm:w-auto justify-center shadow-sm"
            >
              Contact Now
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
      <nav className="bg-royal-500 border-b border-royal-600" aria-label="Primary">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2.5 text-[11px] sm:text-xs font-bold text-white uppercase tracking-widest">
            {LINKS.map((l) => (
              <li key={l.label}>
                <NavItem to={l.to} hash={l.hash} label={l.label} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
