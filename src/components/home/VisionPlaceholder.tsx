import React from 'react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../../constants/business';
import { Compass, ShieldCheck } from 'lucide-react';

export const VisionPlaceholder: React.FC = () => {
  return (
    <section className="py-24 sm:py-28 bg-[#0B0F17] text-white border-y border-white/10 relative overflow-hidden" aria-label="Company Vision">
      {/* Subtle background ambient atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.24em] uppercase text-[#DEC5A0] text-glow-gold-subtle"
        >
          <Compass className="w-3.5 h-3.5 text-[#DEC5A0]" />
          <span>Section D · Strategic Focus</span>
        </motion.div>

        {/* Master Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F3E2C8] text-glow-gold tracking-tight leading-tight max-w-3xl mx-auto"
        >
          Company Vision & Advisory Philosophy
        </motion.h2>

        {/* Neutral Approved Placeholder Layout (Dark Cinematic Framing) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative p-8 sm:p-12 bg-black/40 rounded-2xl border border-dashed border-[#DEC5A0]/30 text-left space-y-5 max-w-3xl mx-auto shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-[#DEC5A0]/20 pb-4">
            <span className="text-xs font-semibold text-[#DEC5A0] text-glow-gold-subtle uppercase tracking-[0.2em]">
              Approved Content Slot
            </span>
            <span className="text-[11px] font-medium text-[#DEC5A0] bg-[#DEC5A0]/15 px-3 py-1 rounded border border-[#DEC5A0]/40 shadow-[0_0_12px_rgba(222,197,160,0.2)]">
              Awaiting Authorized Copy
            </span>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[#E8CEAB] text-glow-gold-subtle">
            <strong className="text-[#F7EFE2] text-glow-gold-subtle font-semibold">{BUSINESS_INFO.brandName}</strong> is founded on the principle of direct, focused real estate sales representation. In accordance with client specifications, this section will be populated with the authorized vision statement, long-term strategic direction, and client service commitments once explicitly approved.
          </p>

          <div className="pt-3 text-xs text-[#E8CEAB] space-y-2 bg-black/60 p-5 rounded-xl border border-[#DEC5A0]/25 shadow-inner">
            <div className="font-semibold text-[#F7EFE2] text-glow-gold-subtle tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#DEC5A0]" />
              <span>Verified Operational Parameters in Effect:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[#DEC5A0]/90 pl-1 text-glow-gold-subtle">
              <li>Exclusively represents property sales; does not purchase or manage rental properties.</li>
              <li>Geographic coverage encompasses prime residential and commercial destinations across India.</li>
              <li>Operations headquartered at Sector 66, Gurugram, Delhi NCR under lead consultant Satyam Gupta.</li>
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
