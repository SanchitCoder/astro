import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Menu, X, Phone } from 'lucide-react';
import { PHONE, PHONE_TEL } from '../../lib/constants';

const LINKS = [
  { label: 'Home',     to: '/', hash: '#home' },
  { label: 'About',   to: '/', hash: '#about' },
  { label: 'Services', to: '/', hash: '#services' },
  { label: 'Articles', to: '/', hash: '#knowledge' },
  { label: 'Contact',  to: '/contact' },
];

type Props = { onBook: () => void };

function NavItem({ to, hash, label, onClick }: { to: string; hash?: string; label: string; onClick?: () => void }) {
  const location = useLocation();
  const href = hash ? `${to}${hash}` : to;
  const isContact = to === '/contact';
  const isActive = isContact
    ? location.pathname === '/contact'
    : location.pathname === '/' && hash && location.hash === hash;

  const cls = `relative text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-200 py-1 group ${
    isActive ? 'text-gold-300' : 'text-white/70 hover:text-gold-300'
  }`;

  const inner = (
    <>
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
    </>
  );

  if (isContact) {
    return <Link to={to} className={cls} onClick={onClick}>{inner}</Link>;
  }
  return <a href={href} className={cls} onClick={onClick}>{inner}</a>;
}

export function Navbar({ onBook }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-[60] overflow-x-clip bg-nebula-600 shadow-[0_2px_20px_rgba(12,95,120,0.35)]"
    >
      {/* Top info bar */}
      <div className="hidden md:flex items-center justify-between px-8 py-1.5 bg-nebula-700/60 border-b border-white/10 text-[10px] text-white/50">
        <span className="uppercase tracking-widest font-bold">Vedic Astrology · Vastu · Medical Astrology</span>
        <a href={PHONE_TEL} className="flex items-center gap-1.5 hover:text-gold-300 transition-colors font-bold">
          <Phone size={10} />
          {PHONE} &nbsp;·&nbsp; 10 AM – 5 PM Only
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 flex items-center justify-center shadow-gold-glow">
            <Sparkles size={14} className="text-nebula-800" />
          </div>
          <span className="font-cinzel text-xs font-bold tracking-wide text-gradient-gold sm:text-sm">
            Gurudev Anand
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <NavItem key={l.label} to={l.to} hash={l.hash} label={l.label} />
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={onBook}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-ink-900 text-xs font-bold uppercase tracking-wide btn-shimmer hover:shadow-gold-glow transition-shadow duration-300 shrink-0"
        >
          Consult Now
          <ArrowRight size={13} />
        </button>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden min-h-[44px] min-w-[44px] p-2 text-white/70 transition-colors hover:text-gold-400"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-nebula-700 border-t border-white/10 px-4 pt-4 pb-5 space-y-1"
          >
            {LINKS.map((l) => (
              <div key={l.label} className="border-b border-white/10 py-2.5 last:border-0">
                <NavItem to={l.to} hash={l.hash} label={l.label} onClick={() => setMobileOpen(false)} />
              </div>
            ))}
            <a
              href={PHONE_TEL}
              className="mt-3 flex items-center gap-2 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:text-gold-300"
              onClick={() => setMobileOpen(false)}
            >
              <Phone size={16} />
              {PHONE}
            </a>
            <button
              type="button"
              onClick={() => { onBook(); setMobileOpen(false); }}
              className="mt-4 w-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500 py-3 text-sm font-bold uppercase tracking-wide text-ink-900"
            >
              Book a Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
