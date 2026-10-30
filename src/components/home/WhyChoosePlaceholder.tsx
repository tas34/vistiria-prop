import React from 'react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../../constants/business';
import { Building2, UserCheck, MapPin, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const WhyChoosePlaceholder: React.FC = () => {
  const verifiedPillars = [
    {
      icon: Building2,
      title: 'Dedicated Property Sales Specialization',
      badge: 'Sales Exclusive',
      description:
        'Vistiria Properties operates exclusively as a property sales firm. By choosing not to purchase, speculate in, or rent properties, our advisory remains focused on connecting buyers with prime acquisitions.',
    },
    {
      icon: UserCheck,
      title: 'Direct Senior Consultant Access',
      badge: 'Direct Advisory',
      description:
        'Every prospective buyer interacts directly with lead consultant Satyam Gupta. Inquiries and site visits are handled personally with direct transparency, eliminating layers of intermediate call centers.',
    },
    {
      icon: MapPin,
      title: 'Gurugram Presence with All-India Reach',
      badge: 'National Reach',
      description:
        'Centrally based in Sector 66, Gurugram at the heart of Delhi NCR’s high-growth architectural corridors, with operational scope for residential and commercial property sales across India.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#0B0F17] text-[#F3E2C8] relative overflow-hidden border-t border-white/5" aria-label="Why Choose Vistiria">
      {/* Ambient atmospheric lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DEC5A0]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#DEC5A0]/40 text-xs font-semibold tracking-[0.24em] uppercase text-[#DEC5A0] text-glow-gold-subtle shadow-[0_0_15px_rgba(222,197,160,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#DEC5A0]" />
            <span>Section E · Verified Pillars</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F3E2C8] text-glow-gold tracking-tight">
            Why Choose {BUSINESS_INFO.brandName}
          </h2>
          <p className="text-sm sm:text-base text-[#E8CEAB] text-glow-gold-subtle leading-relaxed max-w-2xl mx-auto font-light">
            Based strictly on authorized business fundamentals. Direct client representation without speculation, rental conflicts, or inflated claims.
          </p>
        </motion.div>

        {/* 3 Verified Pillars Grid with Staggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {verifiedPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative bg-gradient-to-b from-[#0E131F] to-[#0A0D15] text-[#F3E2C8] p-8 rounded-2xl border border-[#DEC5A0]/30 shadow-2xl hover:border-[#DEC5A0]/70 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-300 space-y-6 flex flex-col justify-between overflow-hidden"
              >
                {/* Gold top hairline highlight */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#DEC5A0]/50 to-transparent group-hover:via-[#DEC5A0] transition-all duration-300" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-white/[0.04] border border-[#DEC5A0]/45 text-[#DEC5A0] flex items-center justify-center shadow-[0_0_20px_rgba(222,197,160,0.18)] group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-[#DEC5A0]" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#DEC5A0] bg-[#DEC5A0]/15 px-2.5 py-1 rounded-md border border-[#DEC5A0]/30 text-glow-gold-subtle">
                      {pillar.badge}
                    </span>
                  </div>
                  
                  <h3 className="font-serif-display text-xl font-normal text-[#F3E2C8] text-glow-gold leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E8CEAB] text-glow-gold-subtle leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DEC5A0]/20 flex items-center gap-2 text-xs font-medium text-[#DEC5A0] text-glow-gold-subtle">
                  <ShieldCheck className="w-4 h-4 text-[#DEC5A0]" />
                  <span>Verified Business Practice</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
