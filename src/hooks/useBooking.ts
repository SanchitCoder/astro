import { useState } from 'react';

export function useBooking() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>('normal');
  return {
    open,
    type,
    book: (t: string = 'normal') => {
      setType(t);
      setOpen(true);
    },
    close: () => setOpen(false),
  };
}
