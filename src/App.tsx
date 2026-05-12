import { useBooking } from './hooks/useBooking';
import { Navbar } from './components/layout/Navbar';
import { StickyBottomBar } from './components/layout/StickyBottomBar';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturedInBar } from './components/sections/FeaturedInBar';
import { PainPointsSection } from './components/sections/PainPointsSection';
import { ReframeSection } from './components/sections/ReframeSection';
import { WhatYouLearnSection } from './components/sections/WhatYouLearnSection';
import { MentorSection } from './components/sections/MentorSection';
import { BonusSection } from './components/sections/BonusSection';
import { TestimonialsGallerySection } from './components/sections/TestimonialsGallerySection';
import { FAQSection } from './components/sections/FAQSection';
import { FooterSection } from './components/sections/FooterSection';
import { BookingModal } from './components/BookingModal';
import { ChatWidget } from './components/ChatWidget';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { PHONE, PHONE_TEL, WHATSAPP_URL } from './lib/constants';

function App() {
  const booking = useBooking();

  return (
    <div className="min-h-screen bg-white text-charcoal">
      <Navbar onBook={() => booking.book('normal')} />
      <main>
        <HeroSection onBook={() => booking.book('normal')} />
        <FeaturedInBar />
        <PainPointsSection onBook={() => booking.book('normal')} />
        <ReframeSection onBook={() => booking.book('normal')} />
        <WhatYouLearnSection onBook={(t) => booking.book(t)} />
        <MentorSection onBook={() => booking.book('normal')} />
        <BonusSection onBook={() => booking.book('normal')} />
        <TestimonialsGallerySection onBook={() => booking.book('normal')} />
        <FAQSection onBook={() => booking.book('normal')} />
      </main>
      <FooterSection />
      <StickyBottomBar onBook={() => booking.book('normal')} />
      <BookingModal open={booking.open} onClose={booking.close} defaultType={booking.type} />
      <WhatsAppWidget whatsappHref={WHATSAPP_URL} />
      <ChatWidget phone={PHONE} phoneTel={PHONE_TEL} onBookConsultation={() => booking.book('normal')} />
    </div>
  );
}

export default App;
