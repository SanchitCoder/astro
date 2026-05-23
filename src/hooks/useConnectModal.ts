import { useState, useCallback } from 'react';

export function useConnectModal() {
  const [open, setOpen] = useState(false);

  const openConnect = useCallback(() => setOpen(true), []);
  const closeConnect = useCallback(() => setOpen(false), []);

  return { open, openConnect, closeConnect };
}
