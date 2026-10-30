/**
 * Verified business information for Vistiria Properties.
 * Strictly adheres to the authorized brief.
 * No invented history, claims, awards, or legal approvals.
 */

export const BUSINESS_INFO = {
  brandName: 'Vistiria Properties',
  officeLocation: 'Sector 66, Gurugram, Delhi NCR, India',
  city: 'Gurugram',
  region: 'Delhi NCR',
  country: 'India',
  geographicCoverage: 'Properties across India',
  businessActivity: 'Property Sales (Exclusively sells residential and commercial properties; does not purchase, rent, or develop)',
  consultantName: 'Satyam Gupta',
  phoneDisplay: '+91 9211657522',
  phoneRaw: '9211657522',
  phoneInternational: '+919211657522',
  phoneTelLink: 'tel:+919211657522',
  whatsAppNumber: '9211657522',
  whatsAppInternational: '919211657522',
  whatsAppLink: 'https://wa.me/919211657522',
  emailPlaceholder: 'Official email address pending confirmation',
  // Generates direct WhatsApp chat link with optional pre-filled text
  getWhatsAppUrl: (message?: string) => {
    const base = 'https://wa.me/919211657522';
    if (!message) return base;
    return `${base}?text=${encodeURIComponent(message)}`;
  },
} as const;
