import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../../constants/business';
import { Phone, MessageCircle, Mail, Send, CheckCircle2, AlertCircle, Building, MapPin, IndianRupee, Loader2 } from 'lucide-react';
import { createInquiry } from '../../services/inquiryService';

export const BuyerInquiryDesk: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState('Luxury Condominium');
  const [budgetRange, setBudgetRange] = useState('₹5 Cr – ₹10 Cr');
  const [preferredLocation, setPreferredLocation] = useState('Golf Course Ext. / Sector 66, Gurugram');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showEmailNotice, setShowEmailNotice] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid 10-digit phone number is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await createInquiry({
        fullName: name,
        phone,
        type: 'buyer_desk',
        budgetRange,
        preferredLocation,
        message: `Category: ${propertyType}. Notes: ${message || 'Inquiring for acquisitions'}`,
      });
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error('Failed to submit inquiry to Firebase:', err);
      setSubmitError('Unable to save inquiry to database. You can still reach consultant directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaWhatsApp = () => {
    const inquiryText = `Hello Satyam Gupta, I am inquiring about property acquisition with Vistiria Properties.\n\nName: ${name}\nPhone: ${phone}\nCategory: ${propertyType}\nBudget Range: ${budgetRange}\nPreferred Location: ${preferredLocation}\nSpecific Requirements: ${message || 'Please share available options'}`;
    const url = BUSINESS_INFO.getWhatsAppUrl(inquiryText);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailButtonClick = () => {
    setShowEmailNotice(true);
  };

  return (
    <motion.section
      id="buyer-inquiry-desk"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Buyer Inquiry Desk"
    >
      {/* Cinematic Architectural Console Container with Dark Blue Obsidian Canvas */}
      <div className="bg-[#0E131F] text-[#F3E2C8] rounded-2xl shadow-2xl shadow-black/50 border border-[#DEC5A0]/20 overflow-hidden backdrop-blur-xl">
        
        {/* Desk Header */}
        <div className="px-6 sm:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DEC5A0]/20 bg-[#0B0F18]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#DEC5A0] text-glow-gold-subtle">
              <span>Section B</span>
              <span aria-hidden="true">·</span>
              <span>Direct Advisory</span>
            </div>
            <h2 className="font-serif-display text-xl sm:text-2xl font-normal text-[#F3E2C8] text-glow-gold tracking-tight">
              Buyer Inquiry Desk & Direct Representation
            </h2>
          </div>
          
          <div className="text-xs text-[#E8CEAB] text-glow-gold-subtle md:text-right space-y-0.5">
            <div>Senior Consultant: <strong className="text-[#F7EFE2] text-glow-gold-subtle font-semibold">{BUSINESS_INFO.consultantName}</strong></div>
            <div className="text-[#DEC5A0]/80">Office: {BUSINESS_INFO.officeLocation}</div>
          </div>
        </div>

        {/* Desk Body */}
        <div className="p-6 sm:p-8 bg-[#0E131F]/95">
          
          {/* Side-by-Side Direct Contact Action Buttons on Desktop */}
          <div className="mb-8 p-4 sm:p-5 bg-black/40 rounded-xl border border-[#DEC5A0]/25 shadow-inner">
            <div className="text-xs font-semibold text-[#DEC5A0] text-glow-gold-subtle uppercase tracking-[0.2em] mb-3">
              Direct Contact Channels
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              
              {/* WhatsApp Button (Side-by-side with email) */}
              <a
                href={BUSINESS_INFO.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-700/60 rounded-xl transition-all cursor-pointer group shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp: {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              {/* Email Contact Button (Side-by-side with WhatsApp on desktop) */}
              <button
                type="button"
                onClick={handleEmailButtonClick}
                className="inline-flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-semibold text-[#F3E2C8] text-glow-gold-subtle bg-[#DEC5A0]/10 hover:bg-[#DEC5A0]/20 border border-[#DEC5A0]/40 rounded-xl transition-all cursor-pointer group shadow-[0_0_15px_rgba(222,197,160,0.12)]"
              >
                <Mail className="w-4 h-4 text-[#DEC5A0] group-hover:text-white transition-colors" />
                <span>Direct Email Inquiries</span>
              </button>

              {/* Direct Phone Dial */}
              <a
                href={BUSINESS_INFO.phoneTelLink}
                className="inline-flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-semibold text-[#F3E2C8] text-glow-gold-subtle bg-[#DEC5A0]/15 hover:bg-[#DEC5A0]/25 border border-[#DEC5A0]/50 rounded-xl transition-all cursor-pointer sm:col-span-2 lg:col-span-1 group shadow-[0_0_15px_rgba(222,197,160,0.15)]"
              >
                <Phone className="w-4 h-4 text-[#DEC5A0] group-hover:scale-110 transition-transform" />
                <span>Call Satyam Gupta</span>
              </a>

            </div>

            {/* Email verification notice when clicked */}
            {showEmailNotice && (
              <div className="mt-3 p-3.5 bg-amber-950/60 border border-[#DEC5A0]/40 rounded-lg text-xs text-[#F3E2C8] flex items-start justify-between gap-2 animate-in fade-in duration-150 shadow-md">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#DEC5A0] shrink-0 mt-0.5" />
                  <span className="text-glow-gold-subtle leading-relaxed">
                    Per verified business information, the official company email address has not yet been designated. To reach consultant <strong>Satyam Gupta</strong> immediately, please call or message via WhatsApp at <strong>+91 9211657522</strong>.
                  </span>
                </div>
                <button
                  onClick={() => setShowEmailNotice(false)}
                  className="text-[#DEC5A0] hover:text-white text-xs font-bold px-1"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Inquiry Form */}
          {isSubmitted ? (
            <div className="p-6 sm:p-8 bg-black/40 border border-[#DEC5A0]/40 rounded-xl space-y-4 text-center shadow-xl">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#DEC5A0]/20 text-[#DEC5A0] flex items-center justify-center border border-[#DEC5A0]/40 shadow-[0_0_20px_rgba(222,197,160,0.3)]">
                <CheckCircle2 className="w-6 h-6 text-[#DEC5A0]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-display text-xl font-normal text-[#F3E2C8] text-glow-gold">
                  Buyer Inquiry Form Validated
                </h3>
                <p className="text-xs text-[#E8CEAB] text-glow-gold-subtle max-w-lg mx-auto leading-relaxed">
                  Your acquisition preferences ({propertyType}, {budgetRange}, {preferredLocation}) have been organized. As no backend database is connected yet, you can send this exact validated summary directly to consultant <strong>Satyam Gupta</strong> via WhatsApp.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-lg shadow-emerald-950/50 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 9211657522)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-[#DEC5A0] bg-white/5 border border-[#DEC5A0]/30 rounded-lg hover:bg-white/10 text-glow-gold-subtle"
                >
                  Edit Preferences
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="deskName" className="block text-xs font-medium text-[#E8CEAB] text-glow-gold-subtle uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="deskName"
                    type="text"
                    placeholder="e.g. Vikram Malhotra"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs bg-black/60 border rounded-lg text-[#F7EFE2] placeholder-[#DEC5A0]/40 focus:outline-none focus:ring-1 focus:ring-[#DEC5A0] focus:border-[#DEC5A0] transition-colors shadow-inner ${
                      errors.name ? 'border-rose-400' : 'border-[#DEC5A0]/30'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="deskPhone" className="block text-xs font-medium text-[#E8CEAB] text-glow-gold-subtle uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="deskPhone"
                    type="tel"
                    placeholder="e.g. 9811002233"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs bg-black/60 border rounded-lg text-[#F7EFE2] placeholder-[#DEC5A0]/40 focus:outline-none focus:ring-1 focus:ring-[#DEC5A0] focus:border-[#DEC5A0] transition-colors shadow-inner ${
                      errors.phone ? 'border-rose-400' : 'border-[#DEC5A0]/30'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                {/* Property Type */}
                <div>
                  <label htmlFor="deskType" className="block text-xs font-medium text-[#E8CEAB] text-glow-gold-subtle uppercase tracking-wider mb-1.5">
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3 text-[#DEC5A0]" />
                      <span>Property Category</span>
                    </span>
                  </label>
                  <select
                    id="deskType"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#0B0F18] border border-[#DEC5A0]/30 rounded-lg text-[#F7EFE2] focus:outline-none focus:ring-1 focus:ring-[#DEC5A0] focus:border-[#DEC5A0] shadow-inner"
                  >
                    <option value="Luxury Condominium">Luxury Condominium</option>
                    <option value="Sky Penthouse">Sky Penthouse</option>
                    <option value="Private Villa">Private Luxury Villa</option>
                    <option value="Duplex Residence">Duplex Sky Residence</option>
                    <option value="Commercial Asset">Prime Commercial Asset</option>
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="deskBudget" className="block text-xs font-medium text-[#E8CEAB] text-glow-gold-subtle uppercase tracking-wider mb-1.5">
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-3 h-3 text-[#DEC5A0]" />
                      <span>Target Budget</span>
                    </span>
                  </label>
                  <select
                    id="deskBudget"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#0B0F18] border border-[#DEC5A0]/30 rounded-lg text-[#F7EFE2] focus:outline-none focus:ring-1 focus:ring-[#DEC5A0] focus:border-[#DEC5A0] shadow-inner"
                  >
                    <option value="₹3 Cr – ₹5 Cr">₹3 Cr – ₹5 Cr</option>
                    <option value="₹5 Cr – ₹10 Cr">₹5 Cr – ₹10 Cr</option>
                    <option value="₹10 Cr – ₹20 Cr">₹10 Cr – ₹20 Cr</option>
                    <option value="₹20 Cr+">₹20 Cr+ (Ultra-Luxury)</option>
                  </select>
                </div>

              </div>

              {/* Preferred Location & Notes Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div>
                  <label htmlFor="deskLocation" className="block text-xs font-medium text-[#E8CEAB] text-glow-gold-subtle uppercase tracking-wider mb-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#DEC5A0]" />
                      <span>Target Micro-Market</span>
                    </span>
                  </label>
                  <input
                    id="deskLocation"
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-[#DEC5A0]/30 rounded-lg text-[#F7EFE2] focus:outline-none focus:ring-1 focus:ring-[#DEC5A0] focus:border-[#DEC5A0] shadow-inner"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="deskNotes" className="block text-xs font-medium text-[#E8CEAB] text-glow-gold-subtle uppercase tracking-wider mb-1.5">
                    Specific Requirements (Configuration, Facing, Floor, etc.)
                  </label>
                  <input
                    id="deskNotes"
                    type="text"
                    placeholder="e.g. Minimum 4 BHK on high floor overlooking greens, ready possession"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-[#DEC5A0]/30 rounded-lg text-[#F7EFE2] placeholder-[#DEC5A0]/40 focus:outline-none focus:ring-1 focus:ring-[#DEC5A0] focus:border-[#DEC5A0] shadow-inner"
                  />
                </div>
              </div>

              {submitError && (
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DEC5A0]/20">
                <span className="text-[11px] text-[#DEC5A0]/80 text-glow-gold-subtle">
                  * Direct client inquiry saved securely to cloud database. Verified response directly from consultant Satyam Gupta.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-neutral-950 bg-[#DEC5A0] hover:bg-[#E8CEAB] active:bg-[#C9B08B] disabled:opacity-50 rounded-lg shadow-[0_0_22px_rgba(222,197,160,0.35)] hover:shadow-[0_0_28px_rgba(222,197,160,0.5)] transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-neutral-950 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-neutral-950" />
                      <span>Submit Acquisition Inquiry</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </motion.section>
  );
};
