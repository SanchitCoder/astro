import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { FooterSection } from '../sections/FooterSection';
import { BookingModal } from '../BookingModal';
import { ChatWidget } from '../ChatWidget';
import { WhatsAppWidget } from '../WhatsAppWidget';
import { useBooking } from '../../hooks/useBooking';
import { PHONE, PHONE_TEL, WHATSAPP_URL } from '../../lib/constants';

export type SiteOutletContext = {
  onBook: () => void;
};

export function SiteLayout() {
  const booking = useBooking();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-white text-charcoal">
      <Navbar onBook={() => booking.book('normal')} />
      <main>
        <Outlet context={{ onBook: () => booking.book('normal') } satisfies SiteOutletContext} />
      </main>
      <FooterSection />
      <BookingModal open={booking.open} onClose={booking.close} defaultType={booking.type} />
      <WhatsAppWidget whatsappHref={WHATSAPP_URL} />
      <ChatWidget phone={PHONE} phoneTel={PHONE_TEL} />
    </div>
  );
}
