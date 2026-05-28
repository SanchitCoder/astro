import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { EMAIL, EMAIL_MAILTO, PHONE, PHONE_TEL } from '../../lib/constants';

const SOCIAL_ICONS = [Facebook, Instagram, Youtube, Twitter];

export function FooterSection() {
  return (
    <footer id="contact" className="relative bg-nebula-700 overflow-hidden">
      {/* Top gradient separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      <div className="absolute top-0 inset-x-0 h-[200px] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(216,138,34,0.08),transparent_80%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-10 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center">
              <Sparkles size={15} className="text-nebula-900" />
            </div>
            <span className="font-cinzel text-base font-bold text-gradient-gold">
              Gurudev Anand
            </span>
          </div>
          <p className="text-sm text-white/90 max-w-xs leading-relaxed">
            Vedic astrologer, Vastu consultant, and Medical astrology practitioner with over
            twenty-five years of one-to-one guidance for clients worldwide.
          </p>
          <div className="mt-6 flex gap-2.5">
            {SOCIAL_ICONS.map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
                className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/90 hover:text-gold-400 hover:border-gold-400/30 transition-colors duration-200"
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-cinzel text-xs font-bold text-white/95 uppercase tracking-widest mb-5">
            Explore
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: 'About Gurudev Anand', href: '/#about' },
              { label: 'Services', href: '/#services' },
              { label: 'Webinar', href: '/webinar', route: true },
              { label: 'Articles', href: '/#knowledge' },
              { label: 'Contact', href: '/contact', route: true },
            ].map((l) => (
              <li key={l.label}>
                {'route' in l && l.route ? (
                  <Link
                    to={l.href}
                    className="text-white/90 hover:text-gold-300 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    className="text-white/90 hover:text-gold-300 transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-cinzel text-xs font-bold text-white/95 uppercase tracking-widest mb-5">
            Resources
          </h4>
          <ul className="space-y-3 text-sm">
            {['Timing of Money', 'Manglik Dosh', 'Shakti Rasa or Rasi', 'Dasvani'].map((r) => (
              <li key={r}>
                <a href="#" className="text-white/90 hover:text-gold-300 transition-colors duration-200">
                  {r}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-cinzel text-xs font-bold text-white/95 uppercase tracking-widest mb-5">
            Contact
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone size={14} className="text-gold-400 mt-0.5 flex-shrink-0" />
              <a href={PHONE_TEL} className="text-white/90 hover:text-gold-300 transition-colors">{PHONE}</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={14} className="text-gold-400 mt-0.5 flex-shrink-0" />
              <a href={EMAIL_MAILTO} className="text-white/90 hover:text-gold-300 transition-colors break-all">
                {EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-gold-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/90">C/o Rahul Store, Sector 28-C, Chandigarh, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="fab-safe-pb sm:pb-0 max-w-7xl mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/80 md:flex-row lg:px-8">
          <span>© {new Date().getFullYear()} Gurudev Anand. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
