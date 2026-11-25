import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS, FOUNDER } from '../data/content';
import { ResponsiveImage } from './ResponsiveImage';
import { revealSplitWords, SplitWords } from './SplitWords';

gsap.registerPlugin(ScrollTrigger);

export function FounderSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      revealSplitWords(sectionRef.current, '.founder-quote .w');

      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-28 px-5 sm:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <ResponsiveImage
          webpSrc={ASSETS.shoesWebp}
          fallbackSrc={ASSETS.shoesPng}
          alt=""
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
          objectPosition="60% 55%"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-black/70" />
      </div>

      <div ref={contentRef} className="mx-auto max-w-2xl">
        <div className="flex items-center gap-4">
          <img
            src={FOUNDER.photoSrc}
            alt={FOUNDER.name}
            className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-white/70"
          />
          <div>
            <p className="text-lg font-bold text-white">{FOUNDER.name}</p>
            <p className="text-sm font-semibold text-[#F2C879]">{FOUNDER.role}</p>
          </div>
        </div>

        <p className="founder-quote mt-6 text-base leading-relaxed text-white/90">
          <SplitWords segments={[{ text: `“${FOUNDER.quote}”` }]} />
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {FOUNDER.tags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3.5 py-1.5 text-sm font-semibold text-white"
            >
              <span aria-hidden="true">{tag.emoji}</span>
              {tag.label}
            </span>
          ))}
        </div>

        <div className="mt-7 pt-6 border-t border-white/25 text-sm leading-relaxed text-white/80">
          <p className="font-semibold text-white">{FOUNDER.credentials.title}</p>
          <p className="mt-1">{FOUNDER.credentials.institution}</p>
          <p>{FOUNDER.credentials.duration}</p>
          <p>{FOUNDER.credentials.location}</p>
        </div>
      </div>
    </section>
  );
}
