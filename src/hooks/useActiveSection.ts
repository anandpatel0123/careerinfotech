import { useEffect, useState } from 'react';
import { NAV_LINKS, type NavSectionId } from '../data/site';

/** Tracks which nav section sits at the reading line, just above the middle of the screen. */
export function useActiveSection() {
  const [active, setActive] = useState<NavSectionId>('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as NavSectionId);
        }
      },
      { rootMargin: '-40% 0px -59% 0px' },
    );

    for (const { id } of NAV_LINKS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return active;
}
