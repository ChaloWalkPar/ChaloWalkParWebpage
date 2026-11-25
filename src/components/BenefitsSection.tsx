import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS, BENEFIT_PILLARS } from '../data/content';
import { GridSquareField } from './GridSquareField';
import { ResponsiveImage } from './ResponsiveImage';
import { revealSplitWords, SplitWords } from './SplitWords';

gsap.registerPlugin(ScrollTrigger);

export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgPhotoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      revealSplitWords(sectionRef.current, '.benefits-split .w');

      // Each card enters from a different direction: left, below, above, right
      const directions = [
        { x: -70, y: 0 },
        { x: 0, y: 70 },
        { x: 0, y: -70 },
        { x: 70, y: 0 },
      ];
      gsap.utils.toArray<HTMLElement>('.benefit-ticket').forEach((card, i) => {
        gsap.from(card, {
          ...directions[i % directions.length],
          opacity: 0,
          duration: 0.85,
          delay: i * 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.benefit-tickets-grid',
            start: 'top 82%',
            once: true,
          },
        });
      });

      if (bgPhotoRef.current) {
        gsap.fromTo(
          bgPhotoRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 25%',
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [physical, mental, ageing] = BENEFIT_PILLARS;

  const ticketCards = [
    {
      kicker: '01 · Body',
      title: physical.title,
      copy: physical.description,
      bg: 'bg-[#FBE8C7]',
      accent: 'text-[#8A4A10]',
    },
    {
      kicker: '02 · Mind',
      title: mental.title,
      copy: mental.description,
      bg: 'bg-[#E3EFE0]',
      accent: 'text-[#C97A1E]',
    },
    {
      kicker: '03 · Longevity',
      title: ageing.title,
      copy: ageing.description,
      bg: 'bg-[#E9EBD6]',
      accent: 'text-[#8A4A10]',
    },
    {
      kicker: '04 · Consistency',
      title: 'हर दिन 30 मिनट',
      copy: 'Make half an hour of everyday walking a calm anchor for your day.',
      bg: 'bg-[#F0E6CE]',
      accent: 'text-[#202821]',
    },
  ];

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative text-[#202821] min-h-screen flex flex-col justify-center py-24 sm:py-32 px-5 sm:px-8 overflow-hidden"
    >
      {/* Full-section photo backdrop, fades in as the section scrolls into view */}
      <div ref={bgPhotoRef} aria-hidden="true" className="absolute inset-0 -z-10 opacity-0">
        <ResponsiveImage
          webpSrc={ASSETS.shoesWebp}
          fallbackSrc={ASSETS.shoesPng}
          alt=""
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
          objectPosition="60% 55%"
        />
        <div className="absolute inset-0 bg-[#FFF4DC]/75" />
      </div>

      <GridSquareField count={22} />

      <div className="relative z-[3] mx-auto max-w-6xl w-full">
        {/* Centered Petalyx-style Header */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-wide text-[#C97A1E]">
            Walk towards a better you
          </p>
          <h2 className="benefits-split mt-3.5 heading-editorial text-[#202821]">
            <SplitWords
              segments={[
                { text: 'One simple habit.', breakAfter: true },
                { text: 'A world of ' },
                { text: 'positive change.', italic: true },
              ]}
            />
          </h2>
        </div>

        {/* 4 Petalyx Ticket-Notched Cards — back in a straight line, still big & square */}
        <div className="benefit-tickets-grid relative z-[4] mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ticketCards.map((card) => (
            <article
              key={card.kicker}
              className={`benefit-ticket ticket-card ${card.bg} min-h-[190px] sm:aspect-square sm:min-h-0 p-6 sm:p-7 flex flex-col justify-between rounded-[26px]`}
            >
              <span className="text-xs font-semibold tracking-wide text-[#8A4A10]/75">
                {card.kicker}
              </span>
              <div className="mt-3 sm:mt-5">
                <h3 className={`font-editorial text-3xl sm:text-3xl leading-tight ${card.accent}`}>
                  {card.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-base sm:text-sm leading-relaxed text-[#202821]/80">
                  {card.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Subtle grounding shadow ellipse underneath cards */}
        <div
          aria-hidden="true"
          className="mx-auto mt-[-6px] h-3 w-[88%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,0,0,0.08),transparent)]"
        />
      </div>
    </section>
  );
}
