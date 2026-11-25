import { Smartphone } from 'lucide-react';
import { BRAND } from '../data/content';

interface PhoneMockupProps {
  title: string;
  description: string;
  placeholderLabel: string;
  screenFocus: string;
  stepIndex?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  screenshotSrc?: string;
}

export function PhoneMockup({
  title,
  description,
  placeholderLabel,
  screenFocus,
  stepIndex,
  variant = 'primary',
  className = '',
  screenshotSrc,
}: PhoneMockupProps) {
  const isPrimary = variant === 'primary';

  return (
    <div
      className={`relative mx-auto select-none ${
        isPrimary ? 'w-[272px] sm:w-[300px] lg:w-[316px]' : 'w-[228px] sm:w-[248px]'
      } ${className}`}
    >
      {/* Realistic smartphone outer shell */}
      <div
        className={`relative rounded-[44px] bg-[#161C17] p-[11px] shadow-[0_28px_70px_-18px_rgba(32,40,33,0.42)] ring-1 ring-white/15`}
      >
        {/* Side hardware buttons */}
        <span
          aria-hidden="true"
          className="absolute -left-[2px] top-24 h-8 w-[2px] rounded-l bg-[#2E3830]"
        />
        <span
          aria-hidden="true"
          className="absolute -left-[2px] top-36 h-12 w-[2px] rounded-l bg-[#2E3830]"
        />
        <span
          aria-hidden="true"
          className="absolute -right-[2px] top-28 h-14 w-[2px] rounded-r bg-[#2E3830]"
        />

        {/* Inner bezel & screen */}
        <div className="relative overflow-hidden rounded-[34px] bg-[#F7F3EA] aspect-[9/19.2] flex flex-col justify-between border border-black/10">
          {/* Top speaker / camera dynamic island — real screenshots already carry their own status bar, so skip the fake one */}
          {!screenshotSrc && (
            <div className="relative z-10 pt-3 px-5 flex items-center justify-center">
              <div className="h-[22px] w-[84px] rounded-full bg-[#161C17] flex items-center justify-end pr-2.5">
                <span className="h-2 w-2 rounded-full bg-[#8A4A10]/80 ring-1 ring-white/15" />
              </div>
            </div>
          )}

          {screenshotSrc ? (
            <img
              src={screenshotSrc}
              alt={`${title} — Chalo Walk Par app screenshot`}
              className="absolute inset-0 h-full w-full object-contain object-top bg-[#F7F3EA]"
            />
          ) : (
            /* Honest, clearly identifiable App Screenshot Placeholder */
            <div className="flex-1 px-5 py-4 flex flex-col justify-between">
              {/* App header inside placeholder */}
              <div className="flex items-center justify-between pt-2 pb-3 border-b border-[#8A4A10]/10">
                <div className="flex items-center gap-2">
                  <img
                    src={BRAND.emblemSrc}
                    alt="Chalo Walk Par emblem"
                    className="h-7 w-7 rounded-full object-contain"
                  />
                  <span className="text-xs font-semibold tracking-tight text-[#8A4A10]">
                    Chalo Walk Par
                  </span>
                </div>
                {stepIndex && (
                  <span className="text-xs font-medium text-[#6B756D] tabular-nums">
                    {stepIndex}
                  </span>
                )}
              </div>

              {/* Central clearly-marked screenshot slot */}
              <div className="my-auto py-4">
                <div className="rounded-2xl border border-dashed border-[#C97A1E]/35 bg-[#FBE8C7]/35 p-4 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#8A4A10] text-[#F7F3EA]">
                    <Smartphone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] font-semibold tracking-wide text-[#C97A1E]">
                    {placeholderLabel}
                  </p>
                  <h4 className="mt-2 font-editorial text-xl leading-snug text-[#202821]">
                    {title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#202821]/75">
                    {description}
                  </p>
                </div>

                <div className="mt-4 px-1">
                  <p className="text-[11px] font-medium text-[#6B756D]">
                    Screen focus:
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-[#8A4A10]">
                    {screenFocus}
                  </p>
                </div>
              </div>

              {/* Bottom placeholder footer & home indicator */}
              <div className="pt-2">
                <p className="text-center text-[10px] text-[#6B756D]">
                  Ready for verified Chalo Walk Par app capture
                </p>
                <div className="mt-3 mx-auto h-1 w-24 rounded-full bg-[#202821]/20" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
