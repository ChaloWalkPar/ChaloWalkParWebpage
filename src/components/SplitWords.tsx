import { Fragment } from 'react';
import gsap from 'gsap';

/**
 * Scrub-tied word reveal shared by every section's headline — continuous
 * blur-to-sharp wipe instead of a once-off snap, so it tracks scroll smoothly
 * and reverses cleanly if the user scrolls back up.
 */
export function revealSplitWords(trigger: Element | null, selector: string) {
  if (!trigger) return;
  gsap.fromTo(
    selector,
    { opacity: 0, y: 26, filter: 'blur(10px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top 92%',
        end: 'top 55%',
        scrub: 0.6,
      },
    }
  );
}

export interface WordSegment {
  text: string;
  italic?: boolean;
  breakAfter?: boolean;
}

interface SplitWordsProps {
  segments: WordSegment[];
  wordClassName?: string;
}

export function SplitWords({
  segments,
  wordClassName = 'w',
}: SplitWordsProps) {
  return (
    <>
      {segments.map((segment, segIdx) => {
        const words = segment.text.trim().split(/\s+/);
        const content = words.map((word, wIdx) => (
          <Fragment key={`${segIdx}-${wIdx}`}>
            <span className={wordClassName}>{word}</span>
            {wIdx < words.length - 1 ? ' ' : ''}
          </Fragment>
        ));

        return (
          <Fragment key={segIdx}>
            {segment.italic ? <em>{content}</em> : content}
            {segment.breakAfter ? <br /> : segIdx < segments.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </>
  );
}
