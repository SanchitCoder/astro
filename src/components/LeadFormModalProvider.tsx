import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { ConnectModal } from './ConnectModal';
import type { FormSource } from '../lib/submitToWebhook';

const OpenLeadFormContext = createContext<(() => void) | null>(null);

export function useOpenLeadForm(): () => void {
  const open = useContext(OpenLeadFormContext);
  if (!open) {
    throw new Error('useOpenLeadForm must be used within LeadFormModalProvider');
  }
  return open;
}

type Props = {
  children: ReactNode;
  source: FormSource;
  onSuccess?: () => void;
};

/** Standalone landing pages: shared CTA modal + n8n webhook submit */
export function LeadFormModalProvider({ children, source, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);

  return (
    <OpenLeadFormContext.Provider value={openForm}>
      {children}
      <ConnectModal open={open} onClose={closeForm} source={source} onSuccess={onSuccess} />
    </OpenLeadFormContext.Provider>
  );
}
