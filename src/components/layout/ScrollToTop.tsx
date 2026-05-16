import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll to top on route change; leave hash-only navigation to anchor targets. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
