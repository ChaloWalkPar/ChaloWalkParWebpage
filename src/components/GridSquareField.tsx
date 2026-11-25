import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

interface GridSquareFieldProps {
  count?: number;
  className?: string;
}

export function GridSquareField({ count = 20, className = '' }: GridSquareFieldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const squares = useMemo(() => {
    const items: { left: number; top: number; delay: number; repeatDelay: number }[] = [];
    const seen = new Set<string>();
    let seed = count * 37;

    const nextRand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < count * 2 && items.length < count; i++) {
      const col = Math.floor(nextRand() * 30);
      const row = Math.floor(nextRand() * 6);
      const key = `${col}-${row}`;
      if (seen.has(key)) continue;
      seen.add(key);

      items.push({
        left: col * 48 - 10,
        top: row * 48 + 6,
        delay: nextRand() * 4,
        repeatDelay: nextRand() * 3,
      });
    }
    return items;
  }, [count]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const nodes = containerRef.current?.querySelectorAll<HTMLElement>('.grid-sq');
      nodes?.forEach((node, idx) => {
        const sq = squares[idx];
        if (!sq) return;
        gsap.fromTo(
          node,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: sq.delay,
            repeatDelay: sq.repeatDelay,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [squares]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`sq-field-mask pointer-events-none absolute inset-x-0 top-0 h-[42%] z-[1] overflow-hidden ${className}`}
    >
      {squares.map((sq, idx) => (
        <div
          key={idx}
          className="grid-sq"
          style={{ left: `${sq.left}px`, top: `${sq.top}px`, opacity: 0 }}
        />
      ))}
    </div>
  );
}
