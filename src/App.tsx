import { useEffect, useRef, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { NavBar } from './components/layout/NavBar';
import { QuickActions } from './components/layout/QuickActions';
import { TopBar } from './components/layout/TopBar';
import { About } from './components/sections/About';
import { AdditionalSkills } from './components/sections/AdditionalSkills';
import { Contact } from './components/sections/Contact';
import { Courses } from './components/sections/Courses';
import { CtaBand } from './components/sections/CtaBand';
import { DownloadBanner } from './components/sections/DownloadBanner';
import { Hero } from './components/sections/Hero';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { ModalProvider } from './context/ModalContext';

export function App() {
  const topBarRef = useRef<HTMLElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  // The nav bar shows its compact logo once the brand strip above has scrolled away.
  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const observer = new IntersectionObserver(([entry]) => setIsStuck(!entry.isIntersecting));
    observer.observe(topBar);
    return () => observer.disconnect();
  }, []);

  return (
    <ModalProvider>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <TopBar ref={topBarRef} />
      <NavBar isStuck={isStuck} />
      <main id="main">
        <Hero />
        <Courses />
        <AdditionalSkills />
        <DownloadBanner />
        <WhyChooseUs />
        <About />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <QuickActions />
    </ModalProvider>
  );
}
