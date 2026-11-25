import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { AppExperienceSection } from './components/AppExperienceSection';
import { CommunitySection } from './components/CommunitySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { EventsSection } from './components/EventsSection';
import { ClosingCtaSection } from './components/ClosingCtaSection';
import { FounderSection } from './components/FounderSection';
import { FooterSection } from './components/FooterSection';
import { BrandMark } from './components/BrandMark';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderFading, setLoaderFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLoaderFading(true), 1050);
    const removeTimer = setTimeout(() => setLoaderVisible(false), 1200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    if (prefersReduced) {
      setIntroDone(true);
      ScrollTrigger.refresh();
      return () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    // Petalyx signature intro zoom-out from blurred golden-hour backdrop
    lenis.stop();

    const ctx = gsap.context(() => {
      gsap.set('#heroTitle .w', { opacity: 0, y: 24, filter: 'blur(10px)' });
      gsap.set('.hero-sub', { opacity: 0, y: 16 });
      gsap.set('.nav-pill', { opacity: 0, y: -16 });

      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          if (shellRef.current) {
            gsap.set(shellRef.current, { clearProps: 'transform,borderRadius' });
          }
          setIntroDone(true);
          lenis.start();
          ScrollTrigger.refresh();
        },
      });

      tl.fromTo(
        shellRef.current,
        { scale: 0.9, borderRadius: 28 },
        { scale: 1, borderRadius: 0, duration: 1.35, ease: 'expo.inOut' }
      )
        .to(
          '.nav-pill',
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .to(
          '#heroTitle .w',
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.95,
            stagger: 0.065,
            ease: 'power3.out',
            clearProps: 'filter',
          },
          '-=0.7'
        )
        .to(
          '.hero-sub',
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.65'
        )
        .from(
          '.cloud-l',
          { x: -110, opacity: 0, duration: 1.4, ease: 'power3.out' },
          0.35
        )
        .from(
          '.cloud-r',
          { x: 110, opacity: 0, duration: 1.4, ease: 'power3.out' },
          0.35
        )
        .from(
          '#heroGlass .glass-sq',
          {
            opacity: 0,
            scale: 0.6,
            duration: 0.6,
            stagger: { each: 0.05, from: 'random' },
            ease: 'back.out(2)',
          },
          '-=0.95'
        );
    });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleNavigate = useCallback((href: string) => {
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetEl, { duration: 1.5 });
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleExploreApp = useCallback(() => {
    handleNavigate('#app');
  }, [handleNavigate]);

  return (
    <>
      {loaderVisible && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#F6B35B] to-[#E0720F] transition-opacity duration-150 ${
            loaderFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <BrandMark size={96} fast />
        </div>
      )}

      <div id="app-shell" ref={shellRef}>
        <Navbar onNavigate={handleNavigate} />

        <main>
          <HeroSection onExploreApp={handleExploreApp} />
          <BenefitsSection />
          <AppExperienceSection />
          <CommunitySection />
          <HowItWorksSection />
          <EventsSection />
          <FounderSection />
          <ClosingCtaSection onExploreApp={handleExploreApp} />
        </main>

        <FooterSection onNavigate={handleNavigate} />
      </div>
    </>
  );
}
