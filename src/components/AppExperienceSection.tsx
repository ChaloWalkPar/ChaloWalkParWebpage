import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Smartphone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APP_CAPABILITIES, ASSETS, CONTACT } from '../data/content';
import { GridSquareField } from './GridSquareField';
import { PhoneMockup } from './PhoneMockup';
import { ResponsiveImage } from './ResponsiveImage';
import { revealSplitWords, SplitWords } from './SplitWords';

gsap.registerPlugin(ScrollTrigger);

export function AppExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const centerPhoneRef = useRef<HTMLDivElement | null>(null);
  const leftPhoneRef = useRef<HTMLDivElement | null>(null);
  const rightPhoneRef = useRef<HTMLDivElement | null>(null);

  // Only 3 capabilities have a real app screenshot — the phone stage cycles through just those,
  // so it never flickers between a real screenshot and the placeholder card.
  const SCREENS = APP_CAPABILITIES.filter((cap) => cap.screenshotSrc);

  const [screenIndex, setScreenIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(SCREENS[0]?.id ?? APP_CAPABILITIES[0].id);

  const activeCapability = SCREENS[screenIndex];
  const prevCapability = SCREENS[(screenIndex - 1 + SCREENS.length) % SCREENS.length];
  const nextCapability = SCREENS[(screenIndex + 1) % SCREENS.length];

  const selectCapability = (cap: (typeof APP_CAPABILITIES)[number]) => {
    setSelectedId(cap.id);
    if (!cap.screenshotSrc) return;
    const idx = SCREENS.findIndex((s) => s.id === cap.id);
    if (idx !== -1) setScreenIndex(idx);
  };

  const cycleScreen = (dir: 1 | -1) => {
    const nextIdx = (screenIndex + dir + SCREENS.length) % SCREENS.length;
    setScreenIndex(nextIdx);
    setSelectedId(SCREENS[nextIdx].id);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      revealSplitWords(sectionRef.current, '.app-split .w');

      gsap.from('.cap-row', {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      if (centerPhoneRef.current) {
        gsap.fromTo(
          centerPhoneRef.current,
          { y: 40, scale: 0.95 },
          {
            y: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top 85%',
              end: 'center 52%',
              scrub: 0.7,
            },
          }
        );
      }

      if (leftPhoneRef.current) {
        gsap.fromTo(
          leftPhoneRef.current,
          { x: -28, rotateY: 16, rotateZ: -6 },
          {
            x: 0,
            rotateY: 6,
            rotateZ: -3,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top 85%',
              end: 'center 50%',
              scrub: 0.8,
            },
          }
        );
      }

      if (rightPhoneRef.current) {
        gsap.fromTo(
          rightPhoneRef.current,
          { x: 28, rotateY: -16, rotateZ: 6 },
          {
            x: 0,
            rotateY: -6,
            rotateZ: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top 85%',
              end: 'center 50%',
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="app"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#FBE8C7]/65 via-[#F7D9A0]/55 to-[#F3C488]/45 text-[#202821] py-24 sm:py-32 lg:py-36 px-5 sm:px-8"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <ResponsiveImage
          webpSrc={ASSETS.soloWalkerWebp}
          fallbackSrc={ASSETS.soloWalkerPng}
          alt=""
          className="h-full w-full"
          imgClassName="h-full w-full object-cover opacity-[0.08]"
          objectPosition="70% 30%"
        />
      </div>

      <GridSquareField count={18} />

      <div className="relative z-[2] mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-wide text-[#C97A1E]">
            The Chalo Walk Par experience
          </p>
          <h2 className="app-split mt-3.5 heading-editorial text-[#202821]">
            <SplitWords
              segments={[
                { text: 'Your everyday movement.', breakAfter: true },
                { text: 'Made ' },
                { text: 'meaningful.', italic: true },
              ]}
            />
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#6B756D]">
            Chalo Walk Par brings your walking activity, progress, and community together in
            one simple experience.
          </p>

          <a
            href={CONTACT.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#161C17] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2E3830] transition-colors cursor-pointer"
          >
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            Get it on Google Play
          </a>
        </div>

      </div>

      {/* Mobile: horizontal scroll carousel — screenshot thumbnail above, label + description
          below, one card per capability, so each one is clearly visible mid-scroll */}
      <div className="lg:hidden relative z-[2] mt-12">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-5 -mx-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {APP_CAPABILITIES.map((cap) => (
            <button
              key={cap.id}
              type="button"
              onClick={() => selectCapability(cap)}
              className="cap-row shrink-0 w-[210px] snap-start text-left"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-[#161C17] shadow-[0_14px_32px_-14px_rgba(138,74,16,0.35)]">
                {cap.screenshotSrc ? (
                  <img
                    src={cap.screenshotSrc}
                    alt={cap.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-3 text-center text-[11px] font-medium text-white/50">
                    {cap.placeholderNote}
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#8A4A10]/60" />
                <span className="text-sm font-semibold text-[#202821]">{cap.title}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#6B756D]">{cap.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Interactive Capability Selector + Layered Smartphone Stage, with carousel-style
          preview phones flanking the text columns on very wide screens */}
      <div className="hidden lg:flex relative z-[2] mt-14 lg:mt-20 mx-auto max-w-[1680px] items-center justify-center gap-4 2xl:gap-8 px-5 sm:px-8">
        <div
          ref={leftPhoneRef}
          onClick={() => cycleScreen(-1)}
          role="button"
          tabIndex={0}
          aria-label={`Preview ${prevCapability.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              cycleScreen(-1);
            }
          }}
          className="hidden 2xl:block shrink-0 opacity-70 scale-[0.74] cursor-pointer transition-opacity hover:opacity-95"
        >
          <PhoneMockup
            title={prevCapability.title}
            description={prevCapability.description}
            placeholderLabel={prevCapability.placeholderNote}
            screenFocus={prevCapability.screenFocus}
            stepIndex={prevCapability.index}
            screenshotSrc={prevCapability.screenshotSrc}
            variant="secondary"
          />
        </div>

        <div
          ref={stageRef}
          className="w-full max-w-6xl shrink grid grid-cols-12 gap-8 items-center relative"
        >
          {/* Subtle connecting horizon hairlines behind smartphones on desktop */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1100 320"
            className="hidden lg:block pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-64 text-[#8A4A10]/14 z-0"
            fill="none"
          >
            <path d="M290 60 C 370 60, 410 140, 470 155" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M290 160 L 455 160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M290 260 C 370 260, 410 185, 470 170" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M810 60 C 730 60, 690 140, 630 155" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M810 160 L 645 160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M810 260 C 730 260, 690 185, 630 170" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Left Column: Capabilities 01 - 03 */}
          <div className="col-span-1 lg:col-span-4 divide-y divide-[#8A4A10]/12 order-1 relative z-10">
            {APP_CAPABILITIES.slice(0, 3).map((cap) => {
              const isSelected = selectedId === cap.id;
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => selectCapability(cap)}
                  onMouseEnter={() => selectCapability(cap)}
                  className="cap-row w-full text-left flex items-start gap-2 sm:gap-3 py-3 sm:py-4 cursor-pointer group"
                >
                  <ArrowRight
                    className={`mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-all ${
                      isSelected ? 'text-[#F28C28] translate-x-1' : 'text-[#8A4A10]/50 group-hover:translate-x-0.5'
                    }`}
                  />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:gap-3">
                      <span
                        className={`text-sm sm:text-base font-semibold ${
                          isSelected ? 'text-[#8A4A10]' : 'text-[#202821]'
                        }`}
                      >
                        {cap.title}
                      </span>
                      <span className="text-xs font-semibold tabular-nums text-[#6B756D]">
                        {cap.index}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#6B756D]">
                      {cap.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center Column: Layered Smartphone Mockups — hidden on mobile, where the active
              screenshot shows as a background behind the two label columns instead */}
          <div className="hidden lg:flex lg:col-span-4 relative items-center justify-center py-4 order-2 [perspective:1200px] z-10">
            <div ref={centerPhoneRef} className="relative z-10">
              <PhoneMockup
                title={activeCapability.title}
                description={activeCapability.description}
                placeholderLabel={activeCapability.placeholderNote}
                screenFocus={activeCapability.screenFocus}
                stepIndex={activeCapability.index}
                screenshotSrc={activeCapability.screenshotSrc}
                variant="primary"
              />
            </div>
          </div>

          {/* Right Column: Capabilities 04 - 06 */}
          <div className="col-span-1 lg:col-span-4 divide-y divide-[#8A4A10]/12 order-2 lg:order-3 relative z-10">
            {APP_CAPABILITIES.slice(3, 6).map((cap) => {
              const isSelected = selectedId === cap.id;
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => selectCapability(cap)}
                  onMouseEnter={() => selectCapability(cap)}
                  className="cap-row w-full text-left flex items-start gap-2 sm:gap-3 py-3 sm:py-4 cursor-pointer group"
                >
                  <ArrowRight
                    className={`mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-all ${
                      isSelected ? 'text-[#F28C28] translate-x-1' : 'text-[#8A4A10]/50 group-hover:translate-x-0.5'
                    }`}
                  />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:gap-3">
                      <span
                        className={`text-sm sm:text-base font-semibold ${
                          isSelected ? 'text-[#8A4A10]' : 'text-[#202821]'
                        }`}
                      >
                        {cap.title}
                      </span>
                      <span className="text-xs font-semibold tabular-nums text-[#6B756D]">
                        {cap.index}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#6B756D]">
                      {cap.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={rightPhoneRef}
          onClick={() => cycleScreen(1)}
          role="button"
          tabIndex={0}
          aria-label={`Preview ${nextCapability.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              cycleScreen(1);
            }
          }}
          className="hidden 2xl:block shrink-0 opacity-70 scale-[0.74] cursor-pointer transition-opacity hover:opacity-95"
        >
          <PhoneMockup
            title={nextCapability.title}
            description={nextCapability.description}
            placeholderLabel={nextCapability.placeholderNote}
            screenFocus={nextCapability.screenFocus}
            stepIndex={nextCapability.index}
            screenshotSrc={nextCapability.screenshotSrc}
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
}
