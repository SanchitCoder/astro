import { useEffect, useState, type RefObject } from 'react';

const MOBILE_MQ = '(max-width: 639px)';

/** Show sticky CTA on mobile only after the hero section has scrolled out of view. */
export function useStickyAfterHero(heroRef: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const mq = window.matchMedia(MOBILE_MQ);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!mq.matches) return;
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-64px 0px 0px 0px' },
    );

    const onMqChange = () => {
      if (!mq.matches) setVisible(false);
    };

    observer.observe(hero);
    mq.addEventListener('change', onMqChange);

    return () => {
      observer.disconnect();
      mq.removeEventListener('change', onMqChange);
    };
  }, [heroRef]);

  return visible;
}
