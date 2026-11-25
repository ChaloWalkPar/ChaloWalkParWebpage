import { useState } from 'react';
import { X } from 'lucide-react';
import { BRAND, CONTACT, NAV_ITEMS } from '../data/content';
import { BrandMark } from './BrandMark';

interface FooterSectionProps {
  onNavigate: (href: string) => void;
}

type InfoModalTopic = 'privacy' | 'terms' | null;

const PLACEHOLDER_COPY: Record<
  Exclude<InfoModalTopic, null>,
  { title: string; body: string }
> = {
  privacy: {
    title: 'Privacy Policy (Placeholder)',
    body: 'This is a clearly identifiable placeholder for the official Chalo Walk Par Privacy Policy URL and legal notice. Replace this modal or link with your verified Privacy Policy document before public release.',
  },
  terms: {
    title: 'Terms and Conditions (Placeholder)',
    body: 'This is a clearly identifiable placeholder for the official Chalo Walk Par Terms and Conditions. Insert your published terms URL and governing terms prior to launch.',
  },
};

export function FooterSection({ onNavigate }: FooterSectionProps) {
  const [infoModal, setInfoModal] = useState<InfoModalTopic>(null);

  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-[#F6B35B] to-[#E0720F] text-[#202821] px-[4vw] pt-12 pb-8 border-t border-black/10"
    >
      <div className="mx-auto max-w-6xl">
        {/* Petalyx 3-column signature grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 pb-10 border-b border-[#8A4A10]/14">
          {/* Animated Ring + Official Chalo Walk Par Emblem */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <BrandMark size={76} playOnScroll />

            <div>
              <p className="text-lg font-bold tracking-tight text-[#8A4A10]">
                {BRAND.name}
              </p>
              <p className="text-xs font-medium text-[#C97A1E]">{BRAND.hindiTagline}</p>
            </div>
          </div>

          {/* Center Nav Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-[#202821]"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.href);
                }}
                className="nav-link-underline hover:text-[#8A4A10]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Contact & Social */}
          <div className="text-center md:text-right text-xs text-[#8A4A10]/85 space-y-1.5">
            <a href={`mailto:${CONTACT.email}`} className="font-medium hover:text-[#202821]">
              {CONTACT.email}
            </a>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-[#202821]"
              >
                Instagram
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-[#202821]"
              >
                LinkedIn
              </a>
              <a
                href={CONTACT.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-[#202821]"
              >
                Get the app
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Placeholders */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8A4A10]/80">
          <p>
            © {new Date().getFullYear()} Chalo Walk Par. All rights reserved. · Everyday
            walking, activity tracking, and community groups.
          </p>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setInfoModal('privacy')}
              className="hover:text-[#202821] underline underline-offset-2 cursor-pointer"
            >
              Privacy Policy [Placeholder]
            </button>
            <button
              type="button"
              onClick={() => setInfoModal('terms')}
              className="hover:text-[#202821] underline underline-offset-2 cursor-pointer"
            >
              Terms and Conditions [Placeholder]
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Placeholder Info Dialog */}
      {infoModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-placeholder-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
          onClick={() => setInfoModal(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-[#F7F3EA] text-[#202821] p-7 shadow-2xl border border-[#8A4A10]/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3
                id="footer-placeholder-title"
                className="font-editorial text-2xl text-[#202821]"
              >
                {PLACEHOLDER_COPY[infoModal].title}
              </h3>
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                aria-label="Close dialog"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#202821]/70 hover:bg-[#8A4A10]/10 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#6B756D]">
              {PLACEHOLDER_COPY[infoModal].body}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="rounded-full bg-[#8A4A10] px-6 py-2.5 text-sm font-semibold text-[#F7F3EA] hover:bg-[#C97A1E] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
