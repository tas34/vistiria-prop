export type PropertyType = 'apartment' | 'penthouse' | 'villa' | 'duplex';

export interface PropertyListing {
  id: string;
  title: string;
  location: string;
  microMarket: string;
  city: string;
  state: string;
  priceDisplay: string;
  priceNumeric: number; // in INR Crores
  type: PropertyType;
  configuration: string; // e.g. "4 BHK + Maid's Room"
  carpetAreaSqFt: number;
  superAreaSqFt: number;
  floorLevel: string;
  furnishingStatus: 'Bare Shell' | 'Semi-Furnished' | 'Fully Furnished Designer';
  facing: string;
  overview: string;
  specifications: {
    bedrooms: number;
    bathrooms: number;
    balconies: number;
    parkingSlots: number;
  };
  amenities: string[];
  heroImage: string;
  gallery: string[];
  isFeatured: boolean;
  isSamplePlaceholder: boolean;
}

export interface SiteVisitRequest {
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
}

export interface BuyerInquiry {
  fullName: string;
  phone: string;
  email: string;
  budgetRange: string;
  propertyType: string;
  preferredCity: string;
  message: string;
}
