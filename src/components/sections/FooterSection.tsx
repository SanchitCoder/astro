import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { EMAIL, EMAIL_MAILTO, PHONE, PHONE_TEL } from '../../lib/constants';

export function FooterSection() {
  return (
    <footer id="contact" className="bg-royal-900 text-white/80 pb-28 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full gold-border flex items-center justify-center">
              <Sparkles size={18} className="text-royal-900" />
            </div>
            <span className="font-sans text-xl text-white font-bold">
              Sadhguru<span className="text-gold-400">ANAND</span>
            </span>
          </div>
          <p className="text-sm text-white/60 max-w-xs">
            Premium Vedic astrology, Vastu and remedies from Guru Ji Sadhguru ANAND. Clarity, calm, purpose.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-white transition"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-sans text-white text-lg font-bold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-gold-400">
                About Guru Ji
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-gold-400">
                Services
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-gold-400">
                Consultations
              </a>
            </li>
            <li>
              <a href="#knowledge" className="hover:text-gold-400">
                Articles
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-white text-lg font-bold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gold-400">
                Timing of Money
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold-400">
                Manglik Dosh
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold-400">
                Shakti Rasa or Rasi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold-400">
                Dasvani
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-white text-lg font-bold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone size={15} className="text-gold-400 mt-1 flex-shrink-0" />
              <a href={PHONE_TEL}>{PHONE}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={15} className="text-gold-400 mt-1 flex-shrink-0" />
              <a href={EMAIL_MAILTO}>{EMAIL}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="text-gold-400 mt-1 flex-shrink-0" />
              <span>C/o Rahul Strore, Sector 28-C, Chandigarh, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} SadhguruANAND. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold-400">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
