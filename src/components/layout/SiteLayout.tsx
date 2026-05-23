import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { FooterSection } from '../sections/FooterSection';
import { ConnectModal } from '../ConnectModal';
import { ChatWidget } from '../ChatWidget';
import { WhatsAppWidget } from '../WhatsAppWidget';
import { useConnectModal } from '../../hooks/useConnectModal';
import { PHONE, PHONE_TEL, WHATSAPP_URL } from '../../lib/constants';

export type SiteOutletContext = {
  onConnect: () => void;
  /** @deprecated Use onConnect */
  onBook: () => void;
};

export function SiteLayout() {
  const connect = useConnectModal();
  const openConnect = connect.openConnect;
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen overflow-x-clip bg-warm-50 text-ink-900">
      <Navbar />
      <main className="fab-safe-pb sm:pb-0">
        <Outlet
          context={{
            onConnect: openConnect,
            onBook: openConnect,
          } satisfies SiteOutletContext}
        />
      </main>
      <FooterSection />
      <ConnectModal open={connect.open} onClose={connect.closeConnect} />
      <WhatsAppWidget whatsappHref={WHATSAPP_URL} />
      <ChatWidget phone={PHONE} phoneTel={PHONE_TEL} />
    </div>
  );
}
