import { useEffect, useMemo, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS, BRAND, CONTACT } from '../data/content';
import { GridSquareField } from './GridSquareField';
import { revealSplitWords, SplitWords } from './SplitWords';
import { ViewportVideo } from './ViewportVideo';

gsap.registerPlugin(ScrollTrigger);

interface ClosingCtaSectionProps {
  onExploreApp: () => void;
}

export function ClosingCtaSection({ onExploreApp }: ClosingCtaSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const leaves = useMemo(() => {
    let seed = 91;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    return Array.from({ length: 18 }, () => ({
      left: `${(rand() * 100).toFixed(2)}%`,
      dx: `${Math.round((rand() - 0.5) * 160)}px`,
      duration: `${(9 + rand() * 9).toFixed(2)}s`,
      delay: `-${(rand() * 15).toFixed(2)}s`,
      scale: Number((0.6 + rand() * 0.8).toFixed(2)),
    }));
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -10 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      }

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 72,
          scale: 0.94,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 1.15,
          ease: 'power3.out',
          clearProps: 'transform,filter,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 62%',
            once: true,
          },
        });
      }

      revealSplitWords(sectionRef.current, '.cta-split .w');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="join"
      ref={sectionRef}
      className="relative h-[106vh] min-h-[700px] w-full overflow-hidden bg-[#F3C077] text-[#202821]"
    >
      <GridSquareField count={16} />

      {/* Lower 78% Golden-Hour Closing Walking Video masked into crisp top light */}
      <div
        ref={bgRef}
        className="cta-media-mask absolute left-0 right-0 bottom-0 h-[78%] z-[2] will-change-transform"
        aria-hidden="true"
      >
        <ViewportVideo
          src={ASSETS.closingVideoWide}
          poster={ASSETS.closingPoster}
          ariaLabel="Walkers moving forward along a sunlit tree-lined avenue in golden morning light"
          className="h-[116%] w-full object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18221A]/55 via-transparent to-transparent" />
      </div>

      {/* Subtle falling golden-hour leaves */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
      >
        {leaves.map((leaf, idx) => (
          <span
            key={idx}
            className="falling-leaf"
            style={
              {
                left: leaf.left,
                animationDuration: leaf.duration,
                animationDelay: leaf.delay,
                transform: `scale(${leaf.scale})`,
                '--dx': leaf.dx,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Petalyx Frosted White-to-Translucent Card centered over the sunlit path */}
      <div
        ref={cardRef}
        className="relative z-[4] mx-auto mt-[18vh] sm:mt-[24vh] w-[min(680px,calc(100%-32px))] rounded-[26px] px-7 sm:px-10 pt-10 pb-12 text-center bg-[#F7F3EA] shadow-[0_30px_60px_rgba(24,36,27,0.2)]"
      >
        <img
          src={BRAND.emblemSrc}
          alt="Chalo Walk Par official circular emblem"
          width={76}
          height={76}
          className="mx-auto h-16 w-16 sm:h-[76px] sm:w-[76px] rounded-full object-contain shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
        />

        <p className="mt-4 text-xs font-semibold tracking-wide text-[#C97A1E]">
          {BRAND.hindiTagline}
        </p>

        <h2 className="cta-split mt-3 text-[clamp(1.75rem,3.1vw,2.65rem)] font-normal tracking-[-0.03em] leading-[1.12] text-[#202821]">
          <SplitWords
            segments={[
              { text: 'Your next step ' },
              { text: 'starts today.', italic: true },
            ]}
          />
        </h2>

        <p className="mt-3.5 mx-auto max-w-md text-sm sm:text-base leading-relaxed text-[#202821]/85">
          Make time for movement. Find your people. Build a healthier everyday routine.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href={CONTACT.careers}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile inline-flex h-11 items-center gap-2 rounded-full bg-[#8A4A10] px-6 text-sm font-semibold text-[#F7F3EA] hover:bg-[#C97A1E] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Join Chalo Walk Par</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onExploreApp}
            className="inline-flex h-11 items-center rounded-full border border-[#8A4A10]/25 bg-white/85 px-6 text-sm font-semibold text-[#202821] hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Explore the App
          </button>
        </div>
      </div>
    </section>
  );
}
