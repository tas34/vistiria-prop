import React from 'react';
import { BUSINESS_INFO } from '../constants/business';
import { useNavigation } from '../context/NavigationContext';
import {
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Building2,
  User,
  Compass,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Layers,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, openSiteVisitModal } = useNavigation();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Cinematic Architectural Header Banner */}
      <div className="relative bg-gradient-to-b from-[#0E131F] via-[#0B0F18] to-[#090D15] text-[#F3E2C8] rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#DEC5A0]/30 shadow-2xl overflow-hidden">
        {/* Ambient atmospheric lighting */}
        <div className="absolute -top-32 right-0 w-[450px] h-[450px] bg-[#DEC5A0]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 left-0 w-[400px] h-[400px] bg-[#DEC5A0]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(222,197,160,0.12),transparent)] pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          {/* Glowing Kicker Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#DEC5A0]/40 text-[#DEC5A0] text-xs font-semibold uppercase tracking-[0.22em] shadow-[0_0_15px_rgba(222,197,160,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#DEC5A0]" />
            <span>Verified Company Profile · Sector 66, Gurugram</span>
          </div>

          {/* Master Title */}
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal text-[#F3E2C8] text-glow-gold tracking-tight leading-[1.15]">
            About {BUSINESS_INFO.brandName}
          </h1>

          {/* Narrative Lead */}
          <p className="text-base sm:text-lg text-[#E8CEAB] text-glow-gold-subtle leading-relaxed max-w-3xl font-light">
            Specialized luxury real estate sales practice representing premier residential condominiums, penthouses, and private estates across India, operating directly from our headquarters in Sector 66, Gurugram.
          </p>

          {/* Verified Operational Highlights Ribbon */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#DEC5A0]/20 text-xs">
            <div className="flex items-center gap-2.5 text-[#E8CEAB] text-glow-gold-subtle">
              <Building2 className="w-4 h-4 text-[#DEC5A0] shrink-0" />
              <span>Dedicated Property Sales Practice</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#E8CEAB] text-glow-gold-subtle">
              <User className="w-4 h-4 text-[#DEC5A0] shrink-0" />
              <span>Lead Consultant: Satyam Gupta</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#E8CEAB] text-glow-gold-subtle">
              <MapPin className="w-4 h-4 text-[#DEC5A0] shrink-0" />
              <span>Gurugram HQ · Pan-India Coverage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Company Framework Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Verified Business Scope */}
        <div className="group relative bg-gradient-to-b from-[#0E131F] to-[#0A0D15] text-[#F3E2C8] p-8 rounded-2xl border border-[#DEC5A0]/30 shadow-2xl hover:border-[#DEC5A0]/70 transition-all duration-300 space-y-6 flex flex-col justify-between overflow-hidden">
          {/* Gold top hairline highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#DEC5A0]/50 to-transparent group-hover:via-[#DEC5A0] transition-all duration-300" />
          
          <div className="space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-white/[0.04] border border-[#DEC5A0]/45 text-[#DEC5A0] flex items-center justify-center shadow-[0_0_20px_rgba(222,197,160,0.18)] group-hover:scale-105 transition-transform duration-300">
              <Building2 className="w-6 h-6 text-[#DEC5A0]" />
            </div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-normal text-[#F3E2C8] text-glow-gold leading-snug">
              Specialized Sales Mandate
            </h3>
            <p className="text-xs sm:text-sm text-[#E8CEAB] text-glow-gold-subtle leading-relaxed">
              Vistiria Properties operates exclusively to sell real estate. The firm does not purchase, speculate in, rent out, or develop properties. This dedicated focus ensures focused representation for buyers seeking quality acquisitions.
            </p>
          </div>
          <div className="pt-4 border-t border-[#DEC5A0]/20 flex items-center gap-2 text-xs font-medium text-[#DEC5A0] text-glow-gold-subtle">
            <ShieldCheck className="w-4 h-4 text-[#DEC5A0]" />
            <span>Verified Sales Scope</span>
          </div>
        </div>

        {/* Card 2: Strategic Location */}
        <div className="group relative bg-gradient-to-b from-[#0E131F] to-[#0A0D15] text-[#F3E2C8] p-8 rounded-2xl border border-[#DEC5A0]/30 shadow-2xl hover:border-[#DEC5A0]/70 transition-all duration-300 space-y-6 flex flex-col justify-between overflow-hidden">
          {/* Gold top hairline highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#DEC5A0]/50 to-transparent group-hover:via-[#DEC5A0] transition-all duration-300" />
          
          <div className="space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-white/[0.04] border border-[#DEC5A0]/45 text-[#DEC5A0] flex items-center justify-center shadow-[0_0_20px_rgba(222,197,160,0.18)] group-hover:scale-105 transition-transform duration-300">
              <MapPin className="w-6 h-6 text-[#DEC5A0]" />
            </div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-normal text-[#F3E2C8] text-glow-gold leading-snug">
              Headquarters & National Reach
            </h3>
            <p className="text-xs sm:text-sm text-[#E8CEAB] text-glow-gold-subtle leading-relaxed">
              Office location: <strong className="text-[#F7EFE2] text-glow-gold-subtle font-semibold">Sector 66, Gurugram, Delhi NCR, India</strong>. While positioned in one of India’s foremost architectural and business corridors, our property sales mandate encompasses prime destinations across India.
            </p>
          </div>
          <div className="pt-4 border-t border-[#DEC5A0]/20 flex items-center gap-2 text-xs font-medium text-[#DEC5A0] text-glow-gold-subtle">
            <MapPin className="w-4 h-4 text-[#DEC5A0]" />
            <span>Sector 66, Gurugram</span>
          </div>
        </div>

        {/* Card 3: Senior Advisory */}
        <div className="group relative bg-gradient-to-b from-[#0E131F] to-[#0A0D15] text-[#F3E2C8] p-8 rounded-2xl border border-[#DEC5A0]/30 shadow-2xl hover:border-[#DEC5A0]/70 transition-all duration-300 space-y-6 flex flex-col justify-between overflow-hidden">
          {/* Gold top hairline highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#DEC5A0]/50 to-transparent group-hover:via-[#DEC5A0] transition-all duration-300" />
          
          <div className="space-y-4">
            <div className="w-13 h-13 rounded-2xl bg-white/[0.04] border border-[#DEC5A0]/45 text-[#DEC5A0] flex items-center justify-center shadow-[0_0_20px_rgba(222,197,160,0.18)] group-hover:scale-105 transition-transform duration-300">
              <User className="w-6 h-6 text-[#DEC5A0]" />
            </div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-normal text-[#F3E2C8] text-glow-gold leading-snug">
              Senior Consultant Representation
            </h3>
            <p className="text-xs sm:text-sm text-[#E8CEAB] text-glow-gold-subtle leading-relaxed">
              Client engagements and site visits are coordinated directly with lead consultant <strong className="text-[#F7EFE2] text-glow-gold-subtle font-semibold">{BUSINESS_INFO.consultantName}</strong>. Direct advisory guarantees accurate property information and personalized transaction handling.
            </p>
          </div>
          <div className="pt-4 border-t border-[#DEC5A0]/20 flex items-center gap-2 text-xs font-medium text-[#DEC5A0] text-glow-gold-subtle">
            <ShieldCheck className="w-4 h-4 text-[#DEC5A0]" />
            <span>Direct Advisory</span>
          </div>
        </div>

      </div>

      {/* Structured Approved Content Slots (Elevated to Ultra-Luxury Architectural Charter) */}
      <div className="relative bg-gradient-to-b from-[#0E131F] via-[#0B0F18] to-[#090D15] p-8 sm:p-12 rounded-3xl border border-[#DEC5A0]/30 shadow-2xl space-y-8 overflow-hidden text-[#F3E2C8]">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#DEC5A0] text-glow-gold-subtle uppercase tracking-[0.2em]">
            <Compass className="w-4 h-4 text-[#DEC5A0]" />
            <span>Advisory Charter & Corporate Narrative</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F3E2C8] text-glow-gold tracking-tight">
            Mission, Vision & Editorial Narrative
          </h2>
          <p className="text-xs sm:text-sm text-[#E8CEAB] text-glow-gold-subtle max-w-2xl leading-relaxed font-light">
            Per brief instructions, no marketing narratives, historical claims, or mission statements are invented. These structured slots are ready for approved text upon client authorization.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Mission Slot */}
          <div className="p-7 sm:p-8 bg-black/40 rounded-2xl border border-dashed border-[#DEC5A0]/35 backdrop-blur-md space-y-4 shadow-inner hover:border-[#DEC5A0]/65 transition-all">
            <div className="flex items-center justify-between border-b border-[#DEC5A0]/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F3E2C8] text-glow-gold">
                Company Mission
              </span>
              <span className="text-[11px] font-semibold text-[#DEC5A0] bg-[#DEC5A0]/15 px-3 py-1 rounded-md border border-[#DEC5A0]/30 shadow-[0_0_10px_rgba(222,197,160,0.15)]">
                SLOT 01 · PENDING
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#E8CEAB] text-glow-gold-subtle leading-relaxed italic font-light">
              [Authorized mission statement to be provided by client. Content will describe the core principles and standards guiding Vistiria Properties in property sales.]
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#DEC5A0]/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DEC5A0]" />
              <span>Awaiting official client statement</span>
            </div>
          </div>

          {/* Differentiating Factors Slot */}
          <div className="p-7 sm:p-8 bg-black/40 rounded-2xl border border-dashed border-[#DEC5A0]/35 backdrop-blur-md space-y-4 shadow-inner hover:border-[#DEC5A0]/65 transition-all">
            <div className="flex items-center justify-between border-b border-[#DEC5A0]/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F3E2C8] text-glow-gold">
                Service Differentiators
              </span>
              <span className="text-[11px] font-semibold text-[#DEC5A0] bg-[#DEC5A0]/15 px-3 py-1 rounded-md border border-[#DEC5A0]/30 shadow-[0_0_10px_rgba(222,197,160,0.15)]">
                SLOT 02 · PENDING
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#E8CEAB] text-glow-gold-subtle leading-relaxed italic font-light">
              [Authorized service differentiators to be provided by client. Content will outline specific procedural commitments and property vetting standards.]
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#DEC5A0]/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DEC5A0]" />
              <span>Awaiting authorized service criteria</span>
            </div>
          </div>

        </div>

      </div>

      {/* Direct Executive Contact Banner */}
      <div className="p-8 sm:p-12 bg-gradient-to-r from-[#0E131F] via-[#121828] to-[#0E131F] text-[#F3E2C8] rounded-3xl border border-[#DEC5A0]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#DEC5A0] text-glow-gold-subtle">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#DEC5A0]" />
            <span>Direct Client Representation</span>
          </div>
          <h3 className="font-serif-display text-xl sm:text-2xl lg:text-3xl font-normal text-[#F3E2C8] text-glow-gold">
            Connect with Consultant {BUSINESS_INFO.consultantName}
          </h3>
          <p className="text-xs sm:text-sm text-[#E8CEAB] text-glow-gold-subtle max-w-xl leading-relaxed font-light">
            Have questions regarding property availability, pricing, or our acquisition sales process across India?
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
          <a
            href={BUSINESS_INFO.whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold tracking-wider text-emerald-300 bg-emerald-950/60 hover:bg-emerald-950/90 border border-emerald-700/60 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp (+91 9211657522)</span>
          </a>
          <button
            onClick={() => navigateTo('contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#DEC5A0] hover:bg-[#E8CEAB] rounded-xl shadow-[0_0_25px_rgba(222,197,160,0.35)] transition-all cursor-pointer"
          >
            <span>Visit Contact Page</span>
            <ArrowRight className="w-4 h-4 text-neutral-950" />
          </button>
        </div>
      </div>

    </div>
  );
};
