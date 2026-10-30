import React from 'react';
import { useNavigation, PageRoute } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { BUSINESS_INFO } from '../../constants/business';
import { Phone, MessageCircle, MapPin, Mail, ArrowUpRight, ShieldCheck, Server, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openSiteVisitModal } = useNavigation();
  const { user, isAdmin } = useAuth();

  return (
    <footer className="bg-[#0B0F18] text-[#E8CEAB] border-t border-[#DEC5A0]/20 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#DEC5A0]/15">
          
          {/* Column 1: Brand & Scope (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif-display text-2xl font-normal tracking-tight text-[#F3E2C8] text-glow-gold block">
              {BUSINESS_INFO.brandName}
            </span>
            <p className="text-sm leading-relaxed text-[#DEC5A0]/80 text-glow-gold-subtle max-w-md">
              Specialized real estate advisory representing premier residential and commercial properties across India. Focused exclusively on property sales to provide transparent, unconflicted acquisition guidance.
            </p>
            <div className="pt-2 text-xs text-[#DEC5A0]/90 text-glow-gold-subtle space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DEC5A0] shrink-0" />
                <span>Office: {BUSINESS_INFO.officeLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DEC5A0] shrink-0" />
                <span>Coverage: {BUSINESS_INFO.geographicCoverage}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links & Admin Access (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F3E2C8] text-glow-gold-subtle">
              Site Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home Overview', page: 'home' as PageRoute },
                { label: 'Property Catalogue', page: 'properties' as PageRoute },
                { label: 'About Vistiria Properties', page: 'about' as PageRoute },
                { label: 'Contact & Inquiry Desk', page: 'contact' as PageRoute },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="text-[#DEC5A0]/75 hover:text-[#F3E2C8] hover:text-glow-gold transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => openSiteVisitModal()}
                  className="text-[#F3E2C8] text-glow-gold-subtle hover:text-white transition-colors cursor-pointer text-left font-medium"
                >
                  Schedule Site Visit →
                </button>
              </li>
            </ul>

            {/* Admin Console Entry Button in Footer */}
            <div className="pt-3">
              <button
                onClick={() => navigateTo('admin')}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-[#DEC5A0]/35 bg-white/[0.03] hover:bg-[#DEC5A0]/15 hover:border-[#DEC5A0] text-xs font-semibold text-[#F3E2C8] transition-all group shadow-sm hover:shadow-[0_0_15px_rgba(222,197,160,0.2)] cursor-pointer"
                title="Management Portal for Properties & Inquiries"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#DEC5A0] group-hover:scale-110 transition-transform" />
                  <span>Admin Console</span>
                </div>
                {isAdmin ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    AUTHORIZED
                  </span>
                ) : user ? (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#DEC5A0]/20 text-[#DEC5A0]">
                    LOGGED IN
                  </span>
                ) : (
                  <Lock className="w-3.5 h-3.5 text-[#DEC5A0]/60 group-hover:text-[#DEC5A0]" />
                )}
              </button>
            </div>
          </div>

          {/* Column 3: Direct Consultant Contact Channels (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F3E2C8] text-glow-gold-subtle">
              Direct Senior Advisory
            </h4>
            <div className="bg-[#0E131F] border border-[#DEC5A0]/25 rounded-xl p-4 sm:p-5 space-y-3.5 shadow-xl">
              <div>
                <span className="text-[11px] text-[#DEC5A0]/80 uppercase tracking-wider block text-glow-gold-subtle">Lead Consultant</span>
                <span className="text-base font-semibold text-[#F3E2C8] text-glow-gold-subtle">{BUSINESS_INFO.consultantName}</span>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={BUSINESS_INFO.phoneTelLink}
                  className="inline-flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-[#F3E2C8] bg-white/[0.04] hover:bg-[#DEC5A0]/15 rounded-lg transition-colors border border-[#DEC5A0]/30 shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#DEC5A0]" />
                    <span className="text-glow-gold-subtle">Direct Call: {BUSINESS_INFO.phoneDisplay}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#DEC5A0]" />
                </a>

                <a
                  href={BUSINESS_INFO.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 rounded-lg transition-colors border border-emerald-800/50 shadow-[0_0_12px_rgba(16,185,129,0.12)]"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp (+91 9211657522)</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </a>

                <div className="flex items-center gap-2 px-3.5 py-2.5 text-xs text-[#DEC5A0]/70 bg-black/40 rounded-lg border border-[#DEC5A0]/20 text-glow-gold-subtle">
                  <Mail className="w-3.5 h-3.5 text-[#DEC5A0] shrink-0" />
                  <span className="italic">{BUSINESS_INFO.emailPlaceholder}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Verified Statements & Admin Console Direct Button */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#DEC5A0]/70 text-glow-gold-subtle">
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.brandName}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-center md:text-right">
            <span>Business Activity: Specialized Real Estate Sales</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Office: Sector 66, Gurugram, Delhi NCR</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-[#DEC5A0]">
              <Server className="w-3 h-3 text-[#DEC5A0]" />
              <span>Hostinger Production Ready</span>
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <button
              onClick={() => navigateTo('admin')}
              className="inline-flex items-center gap-1.5 text-[#DEC5A0] hover:text-[#F3E2C8] hover:underline font-medium transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3 text-[#DEC5A0]" />
              <span>Admin Console</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

