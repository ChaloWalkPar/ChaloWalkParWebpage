import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS, COMMUNITY_HIGHLIGHTS, GENERATION_HIGHLIGHTS } from '../data/content';
import { ResponsiveImage } from './ResponsiveImage';
import { revealSplitWords, SplitWords } from './SplitWords';

gsap.registerPlugin(ScrollTrigger);

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      revealSplitWords(sectionRef.current, '.community-split .w');
      revealSplitWords(sectionRef.current, '.gen-split .w');

      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        );
      }

      gsap.from('.community-item', {
        y: 20,
        opacity: 0,
        duration: 0.75,
        stagger: 0.09,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      });

      // Bottom two-column block: left rises in from the left, right rises in from the right
      if (leftColRef.current) {
        gsap.from(leftColRef.current, {
          x: -48,
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      }

      if (rightColRef.current) {
        gsap.from(rightColRef.current, {
          x: 48,
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative text-[#F7F3EA] py-24 sm:py-32 lg:py-36 px-5 sm:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div ref={bgRef} className="absolute inset-0">
          <ResponsiveImage
            webpSrc={ASSETS.familyWebp}
            fallbackSrc={ASSETS.familyPng}
            alt=""
            className="h-full w-full"
            imgClassName="h-full w-full object-cover"
            objectPosition="55% 25%"
          />
        </div>
        <div className="absolute inset-0 bg-[#8A4A10]/82" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Top Editorial Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="community-item text-xs font-semibold tracking-wide text-[#FBE8C7]">
              Walk together. Grow together.
            </p>
            <h2 className="community-split mt-3.5 heading-editorial heading-editorial-dark text-white">
              <SplitWords
                segments={[
                  { text: 'Walking is better ' },
                  { text: 'together.', italic: true },
                ]}
              />
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="community-item text-base sm:text-lg leading-relaxed text-[#F7F3EA]/85">
              Every journey feels more meaningful when you have people beside you. Find your
              group, participate in challenges, and celebrate progress together.
            </p>
          </div>
        </div>

        {/* Community highlights (left) + every-generation story (right), over the full-bleed photo */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
          <div ref={leftColRef} className="border-b border-white/15">
            {COMMUNITY_HIGHLIGHTS.map((item, idx) => (
              <div
                key={item}
                className="community-item border-t border-white/15 py-4.5 flex items-baseline gap-4"
              >
                <span className="text-xs font-semibold text-[#D99A43] tabular-nums">
                  0{idx + 1}
                </span>
                <p className="text-base sm:text-lg font-medium text-[#F7F3EA]">{item}</p>
              </div>
            ))}
          </div>

          <div ref={rightColRef} className="community-item">
            <p className="text-xs font-semibold tracking-wide text-[#FBE8C7]">
              Every generation. Every journey.
            </p>
            <h2 className="gen-split mt-3.5 heading-editorial heading-editorial-dark text-white">
              <SplitWords
                segments={[
                  { text: 'A healthier journey has ' },
                  { text: 'no age limit.', italic: true },
                ]}
              />
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#F7F3EA]/85">
              Whether you&apos;re starting your first walking routine, staying active with
              your family, or making movement a part of healthy ageing, every step counts.
            </p>

            <div className="mt-8 border-b border-white/15">
              {GENERATION_HIGHLIGHTS.map((line, index) => (
                <div
                  key={line}
                  className="border-t border-white/15 py-4.5 flex items-baseline gap-4"
                >
                  <span className="text-xs font-semibold text-[#D99A43] tabular-nums">
                    0{index + 1}
                  </span>
                  <p className="text-base sm:text-lg font-medium text-[#F7F3EA]">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
