import React, { useState } from 'react';
import { BUSINESS_INFO } from '../constants/business';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, AlertCircle, Clock, Server, ExternalLink, HelpCircle, Loader2 } from 'lucide-react';
import { createInquiry } from '../services/inquiryService';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Property Acquisition Inquiry');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showHostingerGuide, setShowHostingerGuide] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid 10-digit phone number is required';
    }
    if (!message.trim()) errs.message = 'Please provide details of your property inquiry';
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
        email: email || undefined,
        type: 'general',
        message: `Subject: ${subject}\n\nDetails: ${message}`,
      });
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error('Failed to submit contact inquiry to Firestore:', err);
      setSubmitError('Unable to save inquiry to database. You can still reach consultant directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const msg = `Hello Satyam Gupta, I am reaching out through the Vistiria Properties contact desk.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nSubject: ${subject}\nMessage: ${message}`;
    const url = BUSINESS_INFO.getWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
          <span>Direct Contact Desk</span>
          <span aria-hidden="true">·</span>
          <span>Sector 66, Gurugram</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tight">
          Contact Vistiria Properties
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          Connect directly with lead consultant <strong>{BUSINESS_INFO.consultantName}</strong> for residential and commercial property sales representation across India.
        </p>
      </div>

      {/* Main Grid: Contact Channels & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Channels & Office Coordinates (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Consultant Profile Card */}
          <div className="bg-[#0E131F] text-[#F3E2C8] p-6 sm:p-7 rounded-2xl border border-[#DEC5A0]/25 shadow-2xl space-y-5">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#DEC5A0] text-glow-gold-subtle block">
                Direct Advisory
              </span>
              <h2 className="font-serif-display text-2xl font-normal text-[#F3E2C8] text-glow-gold">
                {BUSINESS_INFO.consultantName}
              </h2>
              <p className="text-xs text-[#E8CEAB] text-glow-gold-subtle">
                Lead Real Estate Consultant · Vistiria Properties
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Phone Link */}
              <a
                href={BUSINESS_INFO.phoneTelLink}
                className="flex items-center justify-between p-3.5 bg-black/40 hover:bg-[#DEC5A0]/15 border border-[#DEC5A0]/30 rounded-xl transition-all group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#DEC5A0]/20 text-[#DEC5A0] flex items-center justify-center shrink-0 border border-[#DEC5A0]/30 shadow-[0_0_10px_rgba(222,197,160,0.2)]">
                    <Phone className="w-4 h-4 text-[#DEC5A0]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#DEC5A0]/70 uppercase tracking-wider block text-glow-gold-subtle">Direct Phone</span>
                    <span className="text-sm font-semibold text-[#F7EFE2] group-hover:text-[#F3E2C8] text-glow-gold-subtle">
                      {BUSINESS_INFO.phoneDisplay}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#DEC5A0] group-hover:text-white font-medium text-glow-gold-subtle">Call Now →</span>
              </a>

              {/* WhatsApp Link */}
              <a
                href={BUSINESS_INFO.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-700/60 rounded-xl transition-all group shadow-[0_0_12px_rgba(16,185,129,0.15)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-900/60 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-600/40">
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-400 uppercase tracking-wider block">WhatsApp Direct</span>
                    <span className="text-sm font-semibold text-emerald-200">
                      +91 9211657522
                    </span>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 group-hover:text-white">Chat →</span>
              </a>

              {/* Office Location */}
              <div className="p-3.5 bg-black/40 border border-[#DEC5A0]/20 rounded-xl space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.05] text-[#DEC5A0] flex items-center justify-center shrink-0 border border-[#DEC5A0]/25">
                    <MapPin className="w-4 h-4 text-[#DEC5A0]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#DEC5A0]/70 uppercase tracking-wider block text-glow-gold-subtle">Office Location</span>
                    <span className="text-sm font-medium text-[#F7EFE2] text-glow-gold-subtle">
                      {BUSINESS_INFO.officeLocation}
                    </span>
                  </div>
                </div>
                <div className="pt-2 pl-12">
                  <a
                    href="https://www.google.com/maps/search/Sector+66,+Gurugram,+Haryana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#DEC5A0] hover:text-[#F3E2C8] text-glow-gold-subtle font-medium transition-colors"
                  >
                    <span>View Sector 66 on Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#DEC5A0]" />
                  </a>
                </div>
              </div>

              {/* Email Address Note */}
              <div className="p-3.5 bg-black/50 border border-dashed border-[#DEC5A0]/30 rounded-xl flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#DEC5A0] shrink-0 mt-0.5" />
                <div className="text-xs text-[#E8CEAB] text-glow-gold-subtle leading-relaxed">
                  <strong className="text-[#F7EFE2] block mb-0.5">Company Email Address:</strong>
                  <span>{BUSINESS_INFO.emailPlaceholder}. Please connect via phone or WhatsApp for immediate correspondence.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hostinger Deployment Guide Toggle */}
          <div className="bg-[#0B0F18] text-[#F3E2C8] p-5 rounded-2xl border border-[#DEC5A0]/25 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#DEC5A0] text-glow-gold-subtle">
                <Server className="w-4 h-4 text-[#DEC5A0]" />
                <span>Hostinger Deployment Status</span>
              </div>
              <button
                onClick={() => setShowHostingerGuide(!showHostingerGuide)}
                className="text-xs text-[#DEC5A0] hover:text-[#F3E2C8] underline cursor-pointer text-glow-gold-subtle"
              >
                {showHostingerGuide ? 'Hide Guide' : 'View Instructions'}
              </button>
            </div>
            <p className="text-xs text-[#DEC5A0]/80 text-glow-gold-subtle leading-relaxed">
              This application is configured for direct static hosting on Hostinger with single-page routing rewrite rules included in <code className="text-[#F3E2C8] bg-black/50 px-1.5 py-0.5 rounded border border-[#DEC5A0]/30">public/.htaccess</code>.
            </p>

            {showHostingerGuide && (
              <div className="pt-3 border-t border-[#DEC5A0]/20 text-xs text-[#E8CEAB] space-y-2 animate-in fade-in duration-150">
                <div className="font-semibold text-[#F7EFE2] text-glow-gold-subtle">How to Deploy on Hostinger:</div>
                <ol className="list-decimal list-inside space-y-1 text-[#DEC5A0]/90 text-glow-gold-subtle">
                  <li>Run <code className="text-[#F3E2C8] bg-black/50 px-1 py-0.5 rounded border border-[#DEC5A0]/30">npm run build</code> in the root directory.</li>
                  <li>Upload the contents of the generated <code className="text-[#F3E2C8] bg-black/50 px-1 py-0.5 rounded border border-[#DEC5A0]/30">dist/</code> directory into Hostinger’s <code className="text-[#F3E2C8] bg-black/50 px-1 py-0.5 rounded border border-[#DEC5A0]/30">public_html/</code> via File Manager or Git.</li>
                  <li>Verify that <code className="text-[#F3E2C8] bg-black/50 px-1 py-0.5 rounded border border-[#DEC5A0]/30">.htaccess</code> is present in <code className="text-[#F3E2C8] bg-black/50 px-1 py-0.5 rounded border border-[#DEC5A0]/30">public_html/</code> to handle client-side routing on page refresh.</li>
                </ol>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Inquiries Form (Span 7) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          
          <div className="border-b border-neutral-100 pb-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block">
              Inquiry Form
            </span>
            <h2 className="font-serif-display text-2xl font-bold text-neutral-900">
              Submit a Purchase or Representation Request
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Direct submission with zero registration or sign-in barrier.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 bg-amber-50/60 border border-amber-200 rounded-2xl text-center space-y-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-amber-800" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif-display text-xl font-bold text-neutral-900">
                  Inquiry Form Validated
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-neutral-900">{name}</strong>. Your message regarding <strong className="text-neutral-900">{subject}</strong> has been prepared.
                </p>
                <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs text-amber-900 max-w-md mx-auto text-left">
                  <div className="font-semibold mb-1">Frontend Mode Notice:</div>
                  <p>In accordance with project guidelines, no backend database is connected yet. You can transmit this exact inquiry immediately to consultant <strong>Satyam Gupta</strong> via WhatsApp:</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 9211657522)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
                >
                  New Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    placeholder="e.g. Ananya Sen"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40 ${
                      errors.name ? 'border-rose-400 ring-1 ring-rose-300' : 'border-neutral-300'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="contactPhone"
                    type="tel"
                    placeholder="e.g. 9811002233"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40 ${
                      errors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-neutral-300'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactEmail" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40"
                  />
                </div>

                <div>
                  <label htmlFor="contactSubject" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    id="contactSubject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40"
                  >
                    <option value="Property Acquisition Inquiry">Property Acquisition Inquiry</option>
                    <option value="Schedule a Private Site Visit">Schedule a Private Site Visit</option>
                    <option value="Gurugram / NCR Market Advisory">Gurugram / NCR Market Advisory</option>
                    <option value="Off-Market Portfolio Inquiry">Off-Market Portfolio Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contactMessage" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Inquiry Details & Preferences *
                </label>
                <textarea
                  id="contactMessage"
                  rows={4}
                  placeholder="Please specify target micro-market, preferred configuration (e.g. 4 BHK), budget range, or specific property of interest..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40 ${
                    errors.message ? 'border-rose-400 ring-1 ring-rose-300' : 'border-neutral-300'
                  }`}
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
              </div>

              {submitError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-neutral-500">
                  * Consultant Satyam Gupta will respond directly to the provided phone or WhatsApp.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-[#DEC5A0] hover:bg-[#E8CEAB] active:bg-[#C9B08B] disabled:opacity-50 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-neutral-950 animate-spin" />
                      <span>Saving Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-neutral-950" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
