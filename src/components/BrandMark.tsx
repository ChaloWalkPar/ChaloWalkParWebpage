import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface BrandMarkProps {
  size?: number;
  className?: string;
  /** Play the draw-in once this mark scrolls into view, instead of immediately on mount. */
  playOnScroll?: boolean;
  /** Compressed ~0.85s version of the draw-in, for loader use where every ms counts. */
  fast?: boolean;
}

export function BrandMark({
  size = 76,
  className = '',
  playOnScroll = false,
  fast = false,
}: BrandMarkProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const dot0Ref = useRef<SVGCircleElement | null>(null);
  const dot1Ref = useRef<SVGCircleElement | null>(null);
  const dot2Ref = useRef<SVGCircleElement | null>(null);
  const emblemRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const dots = [dot0Ref.current, dot1Ref.current, dot2Ref.current].filter(
      Boolean
    ) as SVGCircleElement[];
    const fadeDots = [dot1Ref.current, dot2Ref.current].filter(Boolean) as SVGCircleElement[];
    if (!ringRef.current || !emblemRef.current || dots.length < 3) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(ringRef.current, { strokeDashoffset: 0 });
      gsap.set(emblemRef.current, { opacity: 1, scale: 1 });
      gsap.set(fadeDots, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline(
        playOnScroll
          ? { scrollTrigger: { trigger: wrapRef.current, start: 'top 92%', once: true } }
          : {}
      );

      if (fast) {
        tl.from(dots, { scale: 0, opacity: 0, duration: 0.18, stagger: 0.04, ease: 'back.out(2)' })
          .to(dots, { attr: { cx: 40, cy: 40 }, duration: 0.22, ease: 'power3.inOut' }, '-=0.05')
          .to(fadeDots, { opacity: 0, duration: 0.1 })
          .to(emblemRef.current, { opacity: 1, scale: 1, duration: 0.28, ease: 'back.out(1.7)' }, '-=0.05')
          .to(ringRef.current, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.inOut' }, '-=0.15');
      } else {
        tl.to(dots, {
          y: -8,
          duration: 0.24,
          stagger: 0.08,
          yoyo: true,
          repeat: 3,
          ease: 'sine.inOut',
        })
          .to(dots, { attr: { cx: 40, cy: 40 }, y: 0, duration: 0.42, ease: 'power3.inOut' })
          .to(fadeDots, { opacity: 0, duration: 0.15 })
          .to(emblemRef.current, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.7)' }, '-=0.1')
          .to(ringRef.current, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.25');
      }
    }, wrapRef);

    return () => ctx.revert();
  }, [playOnScroll, fast]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`relative shrink-0 flex items-center justify-center ${className}`}
      style={{ height: size, width: size }}
    >
      <svg viewBox="0 0 80 80" className="h-full w-full overflow-visible">
        <circle
          ref={ringRef}
          cx="40"
          cy="40"
          r="37"
          fill="none"
          stroke="#8A4A10"
          strokeWidth="2.2"
          strokeDasharray="233"
          strokeDashoffset="233"
          transform="rotate(-90 40 40)"
        />
        <circle ref={dot0Ref} cx="22" cy="40" r="4" fill="#8A4A10" />
        <circle ref={dot1Ref} cx="40" cy="40" r="4" fill="#C97A1E" />
        <circle ref={dot2Ref} cx="58" cy="40" r="4" fill="#D99A43" />
      </svg>

      <img
        ref={emblemRef}
        src={BRAND.emblemSrc}
        alt="Chalo Walk Par official logo"
        width={64}
        height={64}
        className="absolute inset-0 m-auto rounded-full object-contain opacity-0 scale-75"
        style={{ height: size * 0.84, width: size * 0.84 }}
      />
    </div>
  );
}
