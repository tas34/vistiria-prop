import React, { useState, useEffect } from 'react';
import { useNavigation, PageRoute } from '../../context/NavigationContext';
import { BUSINESS_INFO } from '../../constants/business';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo, openSiteVisitModal } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Properties', page: 'properties' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact Us', page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  const isHome = currentPage === 'home';
  const showTransparent = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent
          ? 'bg-gradient-to-b from-black/85 via-black/40 to-transparent border-b border-white/10'
          : 'bg-[#0B0F18]/95 backdrop-blur-md border-b border-[#DEC5A0]/25 shadow-2xl shadow-black/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark with Architectural Monogram */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC5A0] rounded flex items-center gap-2.5"
            aria-label="Vistiria Properties - Return to Home"
          >
            <div className="w-8 h-8 rounded border border-[#DEC5A0]/50 bg-black/40 flex items-center justify-center text-[#DEC5A0] group-hover:bg-[#DEC5A0]/20 group-hover:border-[#DEC5A0] transition-all shrink-0 shadow-[0_0_12px_rgba(222,197,160,0.2)]">
              <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5z" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <span className="font-serif-display text-xl sm:text-2xl font-normal tracking-tight text-[#F7EFE2] group-hover:text-[#F3E2C8] group-hover:text-glow-gold transition-all whitespace-nowrap shrink-0">
              {BUSINESS_INFO.brandName}
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`relative py-2 text-sm whitespace-nowrap shrink-0 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC5A0] rounded ${
                    isActive
                      ? 'text-[#F3E2C8] text-glow-gold-subtle font-semibold'
                      : 'text-neutral-300 hover:text-[#F3E2C8] hover:text-glow-gold-subtle font-medium'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DEC5A0] rounded-full shadow-[0_0_10px_#DEC5A0]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Client Actions & Direct Call */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href={BUSINESS_INFO.phoneTelLink}
              className="text-xs font-medium text-[#DEC5A0] hover:text-[#F3E2C8] text-glow-gold-subtle flex items-center gap-1.5 px-2 py-1 rounded transition-colors"
              title="Call Lead Consultant"
            >
              <Phone className="w-3.5 h-3.5 text-[#DEC5A0]" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <button
              onClick={() => openSiteVisitModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-neutral-950 bg-[#DEC5A0] hover:bg-[#E8CEAB] active:bg-[#C9B08B] rounded-lg shadow-[0_0_18px_rgba(222,197,160,0.3)] hover:shadow-[0_0_24px_rgba(222,197,160,0.5)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC5A0] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-neutral-950" />
              <span>Inquire / Site Visit</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-200 hover:text-[#F3E2C8] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC5A0]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#DEC5A0]/20 bg-[#0B0F18]/98 backdrop-blur-xl px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-in fade-in duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#DEC5A0]/15 text-[#F3E2C8] text-glow-gold-subtle font-semibold border-l-2 border-[#DEC5A0]'
                      : 'text-neutral-300 hover:bg-white/5 hover:text-[#F3E2C8]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#DEC5A0]/20 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openSiteVisitModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-neutral-950 bg-[#DEC5A0] hover:bg-[#E8CEAB] rounded-lg"
            >
              <MessageSquare className="w-4 h-4 text-neutral-950" />
              <span>Request a Site Visit</span>
            </button>
            <a
              href={BUSINESS_INFO.phoneTelLink}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-200 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
            >
              <Phone className="w-4 h-4 text-[#DEC5A0]" />
              <span>Call Satyam Gupta ({BUSINESS_INFO.phoneDisplay})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
