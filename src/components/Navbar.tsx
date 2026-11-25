import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND, CONTACT, NAV_ITEMS } from '../data/content';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  onNavigate: (href: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    onNavigate(href);
  };

  return (
    <>
      {/* Petalyx-inspired centered floating pill navigation */}
      <header className="nav-pill fixed top-4 sm:top-[22px] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-[820px] rounded-full bg-[#F7F3EA]/90 backdrop-blur-md border border-[#8A4A10]/10 shadow-[0_0_0_1px_rgba(138, 74, 16,0.04),0_8px_24px_rgba(32,40,33,0.08)] px-2.5 sm:px-3 py-1.5 pl-4 sm:pl-5 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Official Emblem + Single-line Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          aria-label="Chalo Walk Par home"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:rounded-full"
        >
          <BrandMark size={32} />
          <span className="text-[17px] sm:text-[19px] font-semibold tracking-[-0.03em] text-[#202821] whitespace-nowrap shrink-0">
            {BRAND.name}
          </span>
        </a>

        {/* Zone 2: Clean single-line typography nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-5 lg:gap-6 text-[13px] font-medium text-[#202821]/80"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.href);
              }}
              className="nav-link-underline whitespace-nowrap shrink-0 hover:text-[#8A4A10] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Tactile Pill Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={CONTACT.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile hidden md:inline-flex h-9 items-center justify-center rounded-full bg-[#8A4A10] px-4 text-[13px] font-semibold tracking-[-0.01em] text-[#F7F3EA] hover:bg-[#C97A1E] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Download App
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-[#202821] hover:bg-[#8A4A10]/10 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 bg-[#8A4A10] text-[#F7F3EA] flex flex-col justify-between px-6 pt-24 pb-10 md:hidden"
        >
          <nav className="flex flex-col gap-1.5" aria-label="Mobile links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className="py-3.5 text-2xl font-editorial tracking-tight text-[#F7F3EA] border-b border-white/12 hover:text-[#FBE8C7] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="space-y-4">
            <p className="text-sm text-[#FBE8C7]">{BRAND.hindiTagline}</p>
            <a
              href={CONTACT.playStore}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="btn-tactile block text-center w-full min-h-[48px] rounded-full bg-[#F28C28] px-6 py-3 text-base font-semibold text-white hover:bg-[#D99A43] cursor-pointer leading-[1.5rem]"
            >
              Download App
            </a>
          </div>
        </div>
      )}
    </>
  );
}
