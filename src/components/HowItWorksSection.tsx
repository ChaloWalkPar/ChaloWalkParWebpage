import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOW_IT_WORKS_STEPS } from '../data/content';
import { ResponsiveImage } from './ResponsiveImage';
import { revealSplitWords, SplitWords } from './SplitWords';

gsap.registerPlugin(ScrollTrigger);

const NUMBER_COLORS = ['text-[#8A4A10]', 'text-[#C97A1E]', 'text-[#F2A33D]'];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const driftRef = useRef<HTMLDivElement | null>(null);
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      revealSplitWords(sectionRef.current, '.loop-split .w');

      const mm = gsap.matchMedia();

      mm.add('(min-width: 761px)', () => {
        gsap.from('.panel-in-desktop', {
          y: 110,
          opacity: 0,
          duration: 1.05,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 62%',
            once: true,
          },
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const idx = Math.min(
              HOW_IT_WORKS_STEPS.length - 1,
              Math.floor(self.progress * HOW_IT_WORKS_STEPS.length)
            );
            setActivePanel(idx);
          },
        });

        if (driftRef.current) {
          gsap.to(driftRef.current, {
            x: 60,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });

      mm.add('(max-width: 760px)', () => {
        gsap.from('.mobile-step-card', {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FBE8C7] text-[#202821] min-h-[680px] md:h-[100vh] overflow-hidden border-y border-[#8A4A10]/10"
    >
      {/* Drifting soft atmospheric accent + 3 frosted glass squares (Petalyx loop-cloud motif) */}
      <div
        ref={driftRef}
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute top-[4vh] -left-[4vw] w-[min(36vw,500px)] h-48 z-[3]"
      >
        <div className="drift-a h-full w-full rounded-full bg-gradient-to-br from-[#FBE8C7]/65 via-[#F7F3EA]/70 to-transparent blur-2xl" />
        <div className="glass-sq aspect-square w-[15%] left-[6%] top-[30%]" />
        <div className="glass-sq aspect-square w-[13%] left-[23%] top-[58%]" />
        <div className="glass-sq aspect-square w-[13%] left-[38%] top-[24%]" />
      </div>

      {/* Full-bleed background photo, crossfades to match the active step */}
      <div className="hidden md:block absolute inset-0 z-[1]" aria-hidden="true">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <div
            key={step.number}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: activePanel === index ? 1 : 0 }}
          >
            <ResponsiveImage
              webpSrc={step.imageWebp}
              fallbackSrc={step.imageFallback}
              alt=""
              className="h-full w-full"
              imgClassName="h-full w-full object-cover"
              objectPosition={step.objectPosition}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[#F8DCA6]/65" />
      </div>

      {/* Centered Editorial Heading */}
      <div className="relative md:absolute md:top-[8.5vh] left-0 right-0 z-[4] pt-16 md:pt-0 px-5 text-center">
        <p className="text-xs font-semibold tracking-wide text-[#C97A1E]">
          How it works
        </p>
        <h2 className="loop-split mt-3 heading-editorial text-[#202821]">
          <SplitWords
            segments={[
              { text: 'Three simple steps.', breakAfter: true },
              { text: 'A new ' },
              { text: 'everyday habit.', italic: true },
            ]}
          />
        </h2>
      </div>

      {/* Desktop: Petalyx 3-Panel Vertical Hover Accordion with Giant Numbers */}
      <div className="hidden md:flex absolute inset-0 z-[2]">
        {HOW_IT_WORKS_STEPS.map((step, index) => {
          const isActive = activePanel === index;
          const shortNum = String(index + 1);
          return (
            <div
              key={step.number}
              aria-label={`Step ${shortNum}: ${step.title}`}
              aria-current={isActive}
              style={{
                flexGrow: isActive ? 1 : 0,
                flexShrink: 0,
                flexBasis: 'clamp(108px, 11.5vw, 176px)',
                transition: 'flex-grow 0.9s cubic-bezier(0.77, 0, 0.18, 1)',
              }}
              className={`accordion-panel relative h-full overflow-hidden outline-none ${
                index < HOW_IT_WORKS_STEPS.length - 1
                  ? 'border-r border-[#8A4A10]/12'
                  : ''
              } ${isActive ? 'is-active' : ''}`}
            >
              <div className="panel-in-desktop absolute left-[clamp(14px,1.8vw,28px)] bottom-[9vh] flex items-end gap-[clamp(29px,3.6vw,55px)] w-max">
                {/* Giant Oversized Number (clipped cleanly when collapsed) */}
                <span
                  aria-hidden="true"
                  className={`font-semibold leading-[0.74] tracking-[-0.07em] select-none tabular-nums ${NUMBER_COLORS[index]}`}
                  style={{ fontSize: 'clamp(170px, 34vh, 360px)' }}
                >
                  {shortNum}
                </span>

                {/* Active Panel Content — title sized as a big header, not number-scale (that wrapped 4-word titles onto 4 lines) */}
                <div className="accordion-step relative w-[min(460px,36vw)] pb-1">
                  <h3
                    className="font-editorial font-normal tracking-[-0.03em] text-[#202821] mb-4"
                    style={{ fontSize: 'clamp(32px, 4.6vw, 64px)', lineHeight: 1.05 }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed text-[#202821]/80 max-w-[40ch]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: Clean Vertically Stacked Step List */}
      <div className="md:hidden mt-10 pb-16 divide-y divide-[#8A4A10]/12 border-t border-[#8A4A10]/12">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <article
            key={step.number}
            className="mobile-step-card px-5 py-8 flex items-end gap-5"
          >
            <span
              className={`text-[112px] font-semibold leading-[0.76] tracking-[-0.07em] tabular-nums ${NUMBER_COLORS[index]}`}
            >
              {index + 1}
            </span>
            <div className="pb-1">
              <h3 className="font-editorial text-[clamp(26px,9vw,40px)] leading-tight font-normal tracking-[-0.02em] text-[#202821]">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#202821]/80">
                {step.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
