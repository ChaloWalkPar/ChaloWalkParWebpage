import { useEffect, useRef, useState } from 'react';

interface ViewportVideoProps {
  src: string;
  poster: string;
  ariaLabel: string;
  className?: string;
  alwaysActive?: boolean;
}

export function ViewportVideo({
  src,
  poster,
  ariaLabel,
  className = 'w-full h-full object-cover',
  alwaysActive = false,
}: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (
      nav.connection?.saveData ||
      nav.connection?.effectiveType === '2g' ||
      nav.connection?.effectiveType === 'slow-2g'
    ) {
      setIsLowBandwidth(true);
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || isLowBandwidth) return;

    if (alwaysActive) {
      video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [alwaysActive, reducedMotion, isLowBandwidth]);

  if (reducedMotion || isLowBandwidth) {
    return (
      <img
        src={poster}
        alt={ariaLabel}
        referrerPolicy="no-referrer"
        className={className}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={alwaysActive}
      preload={alwaysActive ? 'auto' : 'metadata'}
      aria-label={ariaLabel}
      className={className}
    />
  );
}
