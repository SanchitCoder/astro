import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Menu, X, Phone, ChevronDown } from 'lucide-react';
import { PHONE, PHONE_TEL } from '../../lib/constants';

const PROGRAM_LINKS = [
  { label: 'Masterclass',    to: '/masterclass'       },
  { label: '2 Day Webinar',  to: '/mega-webinar'      },
  { label: 'One to One',     to: '/book-consultation' },
];

const LINKS = [
  { label: 'Home',     to: '/',        hash: '#home'      },
  { label: 'About',    to: '/',        hash: '#about'     },
  { label: 'Services', to: '/',        hash: '#services'  },
  { label: 'Articles', to: '/',        hash: '#knowledge' },
  { label: 'Contact',  to: '/contact'                   },
];

const programPaths = new Set(PROGRAM_LINKS.map((l) => l.to));

function NavProgramsDropdown({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = programPaths.has(location.pathname);

  const itemCls =
    'block px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90 transition-colors hover:bg-white/10 hover:text-gold-300';

  return (
    <div
      className="relative md:inline-block w-full md:w-auto"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`relative flex w-full items-center justify-between gap-1 py-1 text-left text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-200 group md:inline-flex md:w-auto md:justify-start ${
          isActive ? 'text-gold-300' : 'text-white/95 hover:text-gold-300'
        }`}
      >
        Programs
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:absolute md:left-0 md:top-full md:z-50 md:mt-2 md:min-w-[200px] md:overflow-hidden md:rounded-xl md:border md:border-white/10 md:bg-nebula-700 md:py-1 md:shadow-[0_12px_32px_rgba(0,0,0,0.35)] mt-2 pl-3 md:pl-0 md:mt-2 border-l border-white/15 md:border-l-0"
          >
            {PROGRAM_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className={`${itemCls} ${
                  location.pathname === item.to ? 'text-gold-300 md:bg-white/5' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ to, hash, label, onClick }: { to: string; hash?: string; label: string; onClick?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isPageRoute = to === '/contact';
  const isActive = isPageRoute
    ? location.pathname === to
    : location.pathname === '/' && hash && location.hash === hash;

  const cls = `relative block w-full text-left text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-200 py-1 group md:inline md:w-auto ${
    isActive ? 'text-gold-300' : 'text-white/95 hover:text-gold-300'
  }`;

  const inner = (
    <>
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
    </>
  );

  const handleHashNav = (e: React.MouseEvent) => {
    if (!hash) return;
    e.preventDefault();
    onClick?.();
    const id = hash.replace('#', '');
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: id });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', hash);
  };

  if (isPageRoute) {
    return <Link to={to} className={cls} onClick={onClick}>{inner}</Link>;
  }
  if (hash) {
    return (
      <a href={hash ? `${to}${hash}` : to} className={cls} onClick={handleHashNav}>
        {inner}
      </a>
    );
  }
  return <Link to={to} className={cls} onClick={onClick}>{inner}</Link>;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-[60] overflow-visible bg-nebula-600 shadow-[0_2px_20px_rgba(0,94,168,0.35)] font-montserrat"
    >
      {/* Top info bar */}
      <div className="hidden md:flex items-center justify-between border-b border-white/10 bg-nebula-700/60 px-8 py-1.5 text-[10px] text-white/90">
        <span className="uppercase tracking-widest font-bold">Vedic Astrology · Vastu · Medical Astrology</span>
        <a href={PHONE_TEL} className="flex items-center gap-1.5 hover:text-gold-300 transition-colors font-bold">
          <Phone size={10} />
          {PHONE} &nbsp;·&nbsp; 10 AM – 5 PM Only
        </a>
      </div>

      <div className="mx-auto flex min-h-[4rem] max-w-7xl items-center justify-between gap-4 px-4 md:min-h-[4.5rem] lg:px-8">
        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 shadow-gold-glow md:h-11 md:w-11">
            <Sparkles size={20} className="text-nebula-800" />
          </div>
          <span className="font-cinzel text-lg font-bold leading-none tracking-wide text-gradient-gold sm:text-xl md:text-2xl">
            Gurudev Anand
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {LINKS.slice(0, 3).map((l) => (
            <NavItem key={l.label} to={l.to} hash={l.hash} label={l.label} />
          ))}
          <NavProgramsDropdown />
          {LINKS.slice(3).map((l) => (
            <NavItem key={l.label} to={l.to} hash={l.hash} label={l.label} />
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-ink-900 text-xs font-bold uppercase tracking-wide btn-shimmer hover:shadow-gold-glow transition-shadow duration-300 shrink-0"
        >
          Consult Now
          <ArrowRight size={13} />
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden min-h-[44px] min-w-[44px] p-2 text-white transition-colors hover:text-gold-400"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden max-h-[min(70dvh,100svh)] overflow-y-auto overscroll-contain bg-nebula-700 border-t border-white/10 px-4 pt-4 pb-5 space-y-1 shadow-lg"
          >
            {LINKS.slice(0, 3).map((l) => (
              <div key={l.label} className="border-b border-white/10 py-2.5">
                <NavItem to={l.to} hash={l.hash} label={l.label} onClick={() => setMobileOpen(false)} />
              </div>
            ))}
            <div className="border-b border-white/10 py-2.5">
              <NavProgramsDropdown onNavigate={() => setMobileOpen(false)} />
            </div>
            {LINKS.slice(3).map((l) => (
              <div key={l.label} className="border-b border-white/10 py-2.5 last:border-0">
                <NavItem to={l.to} hash={l.hash} label={l.label} onClick={() => setMobileOpen(false)} />
              </div>
            ))}
            <a
              href={PHONE_TEL}
              className="mt-3 flex items-center gap-2 py-2.5 text-sm font-semibold text-white/95 transition-colors hover:text-gold-300"
              onClick={() => setMobileOpen(false)}
            >
              <Phone size={16} />
              {PHONE}
            </a>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 block w-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500 py-3 text-center text-sm font-bold uppercase tracking-wide text-ink-900"
            >
              Book a Session
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
