import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS, BRAND, CONTACT } from '../data/content';
import { SplitWords } from './SplitWords';
import { ViewportVideo } from './ViewportVideo';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onExploreApp: () => void;
}

const GLASS_COORDS: [number, number][] = [
  [3, 64],
  [3, 71],
  [6.5, 71],
  [10, 71],
  [3, 78],
  [-1, 70],
  [45.5, 76],
  [49, 80],
  [49, 76],
  [52.5, 76],
  [86, 58],
  [86, 67],
  [82, 76],
  [89.5, 76],
  [86, 84],
];

export function HeroSection({ onExploreApp }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleWrapRef = useRef<HTMLDivElement | null>(null);
  const mediaWrapRef = useRef<HTMLDivElement | null>(null);
  const glassWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Flickering frosted glass squares
      const squares = glassWrapRef.current?.querySelectorAll<HTMLElement>('.glass-sq');
      squares?.forEach((sq, i) => {
        gsap.to(sq, {
          opacity: 0.16,
          duration: 0.9,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: (i * 0.37) % 3,
          repeatDelay: 1 + ((i * 0.73) % 3),
        });
      });

      // Hero scroll parallax
      if (titleWrapRef.current) {
        gsap.to(titleWrapRef.current, {
          yPercent: -42,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (mediaWrapRef.current) {
        gsap.to(mediaWrapRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      sectionRef.current?.querySelectorAll<HTMLElement>('[data-par]').forEach((el) => {
        const par = Number(el.dataset.par || 0);
        gsap.to(el, {
          y: par * 2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#FDECC8] text-[#202821]"
    >
      {/* Drifting soft golden-hour atmospheric layers (Petalyx cloud-drift feel) */}
      <div
        data-par="-60"
        aria-hidden="true"
        className="cloud-l pointer-events-none absolute -top-[4%] -left-[6%] w-[min(46vw,640px)] z-[4] opacity-70"
      >
        <div className="drift-a h-48 sm:h-64 w-full rounded-full bg-gradient-to-br from-white/85 via-[#F7F3EA]/70 to-transparent blur-2xl" />
      </div>

      <div
        data-par="-90"
        aria-hidden="true"
        className="cloud-r pointer-events-none absolute top-[2%] -right-[6%] w-[min(44vw,600px)] z-[4] opacity-70"
      >
        <div className="drift-b h-44 sm:h-60 w-full rounded-full bg-gradient-to-bl from-[#FFEBD2]/80 via-[#F7F3EA]/65 to-transparent blur-2xl" />
      </div>

      {/* Centered Editorial Headline dissolving above the golden-hour video */}
      <div
        ref={titleWrapRef}
        id="heroTitle"
        className="relative z-[6] mx-auto max-w-4xl px-5 sm:px-8 pt-[15vh] sm:pt-[17vh] text-center"
      >
        <p className="hero-sub text-xs sm:text-sm font-medium tracking-[0.02em] text-[#C97A1E]">
          {BRAND.hindiTagline}
        </p>

        <h1 className="split mt-3.5 display-hero text-[#202821]">
          <SplitWords
            segments={[
              { text: 'Every Step.', breakAfter: true },
              { text: 'A ' },
              { text: 'Healthier Tomorrow.', italic: true },
            ]}
          />
        </h1>

        <p
          className="hero-sub mt-5 mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#202821] font-medium"
          style={{ textShadow: '0 1px 14px rgba(255,255,255,0.85), 0 1px 2px rgba(255,255,255,0.6)' }}
        >
          Make walking a part of your everyday life. Track your progress, discover your
          community, and take one step closer to a healthier you.
        </p>

        <div className="hero-sub mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href={CONTACT.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile inline-flex h-11 items-center gap-2 rounded-full bg-[#8A4A10] px-6 text-sm font-semibold text-[#F7F3EA] hover:bg-[#C97A1E] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Start Walking</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onExploreApp}
            className="inline-flex h-11 items-center rounded-full border border-[#8A4A10]/20 bg-white/75 backdrop-blur-md px-6 text-sm font-semibold text-[#202821] hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Explore the App
          </button>
        </div>
      </div>

      {/* Lower 72% Golden-Hour Walking Video fading upward into Warm Cream */}
      <div
        ref={mediaWrapRef}
        className="hero-media hero-media-mask absolute left-0 right-0 bottom-0 h-[66%] sm:h-[70%] z-[2] will-change-transform"
        aria-hidden="true"
      >
        <ViewportVideo
          src={ASSETS.heroVideo}
          poster={ASSETS.heroPoster}
          ariaLabel="People walking together along a sunlit tree-lined park pathway in India"
          alwaysActive
          className="h-full w-full object-cover object-[center_70%]"
        />
        {/* Gentle bottom scrim for subtle scroll indicator legibility */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#18221A]/55 to-transparent" />
      </div>

      {/* Flickering Frosted Glass Squares (Petalyx signature pixel-glass motif) */}
      <div
        ref={glassWrapRef}
        id="heroGlass"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5]"
      >
        {GLASS_COORDS.map(([x, y], idx) => {
          const isCenter = x > 40 && x < 60;
          return (
            <div
              key={idx}
              className={`glass-sq aspect-square ${idx % 2 === 1 ? 'hidden md:block' : ''}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: isCenter
                  ? 'clamp(28px, 3.4vw, 44px)'
                  : 'clamp(36px, 5.4vw, 72px)',
              }}
            />
          );
        })}
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="hero-sub absolute bottom-5 left-1/2 -translate-x-1/2 z-[7]">
        <button
          type="button"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md px-4 py-2 text-xs font-medium text-[#202821] shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="h-3.5 w-3.5 text-[#C97A1E]" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
