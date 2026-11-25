import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Youtube } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT, EVENTS } from '../data/content';
import { revealSplitWords, SplitWords } from './SplitWords';

gsap.registerPlugin(ScrollTrigger);

export function EventsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      revealSplitWords(sectionRef.current, '.events-split .w');

      gsap.from('.event-card', {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.events-track',
          start: 'top 85%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative bg-[#F5D9A6] text-[#202821] py-24 sm:py-32 lg:py-36 px-5 sm:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#C97A1E]">From our community</p>
            <h2 className="events-split mt-3.5 heading-editorial text-[#202821]">
              <SplitWords
                segments={[
                  { text: 'Walkathons &' },
                  { text: 'step stories.', italic: true },
                ]}
              />
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={CONTACT.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8A4A10] hover:text-[#C97A1E] transition-colors"
            >
              <Youtube className="h-4 w-4" />
              More on YouTube
            </a>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Scroll events left"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#8A4A10]/20 bg-white/70 hover:bg-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Scroll events right"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#8A4A10]/20 bg-white/70 hover:bg-white transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="events-track mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {EVENTS.map((clip) => {
            const isPlaying = playingId === clip.id;
            return (
              <div
                key={clip.id}
                className="event-card relative shrink-0 w-[280px] sm:w-[320px] aspect-[9/16] snap-start rounded-[22px] overflow-hidden shadow-[0_18px_40px_-16px_rgba(138,74,16,0.35)] bg-black"
              >
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${clip.id}?autoplay=1&playsinline=1`}
                    title={clip.title}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingId(clip.id)}
                    aria-label={`Play ${clip.title}`}
                    className="group absolute inset-0 h-full w-full cursor-pointer"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${clip.id}/hqdefault.jpg`}
                      alt={clip.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#8A4A10] shadow-md transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
                      </span>
                    </span>

                    <p className="absolute left-3 right-3 bottom-3 text-sm font-semibold text-white leading-snug text-left">
                      {clip.title}
                    </p>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
