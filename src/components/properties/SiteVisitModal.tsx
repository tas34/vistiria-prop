import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useProperties } from '../../context/PropertyContext';
import { BUSINESS_INFO } from '../../constants/business';
import { X, Calendar, Clock, Phone, User, Mail, MessageSquare, CheckCircle2, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { createInquiry } from '../../services/inquiryService';

export const SiteVisitModal: React.FC = () => {
  const { isSiteVisitModalOpen, closeSiteVisitModal, activeVisitProperty } = useNavigation();
  const { properties } = useProperties();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [notes, setNotes] = useState('');

  // Form states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (activeVisitProperty) {
      setSelectedPropertyId(activeVisitProperty.id);
    } else if (properties.length > 0) {
      setSelectedPropertyId(properties[0].id);
    }
    // Reset submission state upon opening
    if (isSiteVisitModalOpen) {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setSubmitError(null);
      setErrors({});
    }
  }, [activeVisitProperty, isSiteVisitModalOpen, properties]);

  if (!isSiteVisitModalOpen) return null;

  const currentProperty = properties.find((p) => p.id === selectedPropertyId);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date for the visit';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await createInquiry({
        fullName,
        phone,
        email: email || undefined,
        type: 'site_visit',
        propertyId: currentProperty?.id || selectedPropertyId,
        propertyTitle: currentProperty?.title || 'Selected Property',
        preferredDate,
        preferredTimeSlot,
        message: notes || undefined,
      });
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error('Failed to save site visit to Firestore:', err);
      setSubmitError('Unable to log request to database. You can still reach consultant directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const propTitle = currentProperty ? currentProperty.title : 'Prime Property';
    const message = `Hello Satyam Gupta, I would like to request a site visit for "${propTitle}".\n\nName: ${fullName}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nPreferred Date: ${preferredDate}\nPreferred Time: ${preferredTimeSlot}\nNotes: ${notes || 'None'}`;
    const url = BUSINESS_INFO.getWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-visit-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        
        {/* Header with Dark Blue Obsidian & Golden Glow */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#DEC5A0]/25 bg-[#0E131F] text-[#F3E2C8]">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#DEC5A0] text-glow-gold-subtle block">
              Direct Sales Desk
            </span>
            <h2 id="site-visit-title" className="font-serif-display text-xl sm:text-2xl font-normal text-[#F3E2C8] text-glow-gold">
              {isSubmitted ? 'Site Visit Request Logged' : 'Schedule a Private Site Visit'}
            </h2>
          </div>
          <button
            onClick={closeSiteVisitModal}
            className="p-2 text-[#DEC5A0] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-[#DEC5A0]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            /* Success State with WhatsApp Draft option */
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-amber-800" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif-display text-xl font-bold text-neutral-900">
                  Request Received for Review
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-neutral-900">{fullName}</strong>. Your preferred site visit date ({preferredDate}, {preferredTimeSlot}) for{' '}
                  <strong className="text-neutral-900">{currentProperty?.title || 'Selected Property'}</strong> has been registered.
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-50 text-amber-900 text-xs font-medium border border-amber-200/60 mt-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Important: This is a formal request, not an automatic confirmation. Consultant Satyam Gupta will call to verify availability.</span>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2 pb-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-left space-y-3">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                      Instant WhatsApp Transmission
                    </h4>
                    <p className="text-xs text-neutral-600">
                      Transmit your scheduled visit request directly to consultant <strong>Satyam Gupta</strong> via WhatsApp right now with pre-filled details.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Request to Satyam Gupta (+91 9211657522)</span>
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeSiteVisitModal}
                  className="px-5 py-2.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Property Selector */}
              <div>
                <label htmlFor="propertySelect" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Target Property
                </label>
                <select
                  id="propertySelect"
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40 focus:border-amber-800"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — {p.location} ({p.priceDisplay})
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modalFullName" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      id="modalFullName"
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40 ${
                        errors.fullName ? 'border-rose-400 ring-1 ring-rose-300' : 'border-neutral-300'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="modalPhone" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      id="modalPhone"
                      type="tel"
                      placeholder="e.g. 9811002233"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40 ${
                        errors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-neutral-300'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modalEmail" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      id="modalEmail"
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modalDate" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Preferred Visit Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      id="modalDate"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={preferredDate}
                      onChange={(e) => {
                        setPreferredDate(e.target.value);
                        if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                      }}
                      className={`w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40 ${
                        errors.preferredDate ? 'border-rose-400 ring-1 ring-rose-300' : 'border-neutral-300'
                      }`}
                    />
                  </div>
                  {errors.preferredDate && <p className="text-xs text-rose-600 mt-1">{errors.preferredDate}</p>}
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label htmlFor="modalTimeSlot" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Preferred Time Window
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <select
                    id="modalTimeSlot"
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40"
                  >
                    <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                    <option value="12:00 PM - 02:00 PM">Midday (12:00 PM - 02:00 PM)</option>
                    <option value="03:00 PM - 05:00 PM">Afternoon (03:00 PM - 05:00 PM)</option>
                    <option value="05:00 PM - 07:00 PM">Evening Sunset (05:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests or Questions */}
              <div>
                <label htmlFor="modalNotes" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Specific Inquiries or Requirements
                </label>
                <textarea
                  id="modalNotes"
                  rows={2}
                  placeholder="e.g. Inquiring about floor plans, payment schedule, or immediate inspection..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40"
                />
              </div>

              {submitError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-[11px] text-neutral-500 leading-normal">
                No account or sign-in required. Submitting logs your site visit request for consultant Satyam Gupta. A confirmation call will follow to finalize schedule.
              </p>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeSiteVisitModal}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-[#DEC5A0] hover:bg-[#E8CEAB] active:bg-[#C9B08B] disabled:opacity-50 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-neutral-950 animate-spin" />
                      <span>Saving Request...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-3.5 h-3.5 text-neutral-950" />
                      <span>Submit Site Visit Request</span>
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
