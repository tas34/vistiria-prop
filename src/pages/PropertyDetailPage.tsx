import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useProperties } from '../context/PropertyContext';
import { SAMPLE_PROPERTIES } from '../data/properties';
import { BUSINESS_INFO } from '../constants/business';
import {
  ArrowLeft,
  Calendar,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Compass,
  Building,
  Maximize2,
  Layers,
  ShieldCheck,
  Share2,
  AlertCircle
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { selectedProperty, selectedPropertyId, navigateTo, openSiteVisitModal, showToast } = useNavigation();
  const { properties } = useProperties();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // If no property found or selected, check live properties or fallback
  const property =
    (selectedPropertyId ? properties.find((p) => p.id === selectedPropertyId) : null) ||
    selectedProperty ||
    properties[0] ||
    SAMPLE_PROPERTIES[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} in ${property.location} (${property.priceDisplay}) — Vistiria Properties`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard.');
    }
  };

  const handleWhatsAppProperty = () => {
    const msg = `Hello Satyam Gupta, I am inquiring about "${property.title}" (${property.priceDisplay}, ${property.location}). Could you please share comprehensive details and availability for a private site visit?`;
    window.open(BUSINESS_INFO.getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Breadcrumb & Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <button
          onClick={() => navigateTo('properties')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Properties Catalogue</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-neutral-500" />
            <span>Share Listing</span>
          </button>
          <span className="text-xs text-neutral-400">·</span>
          <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            SAMPLE LISTING
          </span>
        </div>
      </div>

      {/* Main Title & Price Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="flex items-center gap-1 font-semibold text-neutral-800">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>{property.location}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{property.microMarket}</span>
            <span aria-hidden="true">·</span>
            <span>{property.city}, {property.state}</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tight leading-tight">
            {property.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 pt-1">
            <span className="font-medium text-neutral-900">{property.configuration}</span>
            <span aria-hidden="true">·</span>
            <span>Carpet: <strong className="text-neutral-900 tabular-nums">{property.carpetAreaSqFt.toLocaleString()} sq.ft</strong></span>
            <span aria-hidden="true">·</span>
            <span>Super Built-up: <strong className="text-neutral-900 tabular-nums">{property.superAreaSqFt.toLocaleString()} sq.ft</strong></span>
            <span aria-hidden="true">·</span>
            <span>Floor: <strong className="text-neutral-900">{property.floorLevel}</strong></span>
          </div>
        </div>

        {/* Price Card */}
        <div className="bg-neutral-900 text-white p-5 rounded-2xl border border-neutral-800 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0">
          <div className="text-xs text-neutral-400 uppercase tracking-wider">Acquisition Value</div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
            {property.priceDisplay}
          </div>
          <div className="text-[11px] text-neutral-400">Exclusive Sales Representation</div>
        </div>
      </div>

      {/* Gallery Showcase Section */}
      <div className="space-y-4">
        {/* Main Display Image */}
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full bg-neutral-950 rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
          <img
            src={property.gallery[activeImageIndex] || property.heroImage}
            alt={`${property.title} view ${activeImageIndex + 1}`}
            className="w-full h-full object-cover object-center transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 text-xs rounded-md">
            Image {activeImageIndex + 1} of {property.gallery.length} · Verified Architectural Visualization
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {property.gallery.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? 'border-amber-700 ring-2 ring-amber-700/30'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Split Details & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
        
        {/* Left Column: Property Narrative, Specs & Amenities (Span 8) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Narrative Overview */}
          <div className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm">
            <h2 className="font-serif-display text-2xl font-bold text-neutral-900 tracking-tight">
              Property Overview
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {property.overview}
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed pt-2 border-t border-neutral-100">
              * Note: Vistiria Properties provides this sample listing as a baseline specification model for buyer inquiries and site tour coordination.
            </p>
          </div>

          {/* Verified Specifications Table */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="font-serif-display text-2xl font-bold text-neutral-900 tracking-tight">
              Architectural Specifications
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-neutral-200/80">
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Configuration</span>
                <span className="font-semibold text-neutral-900 mt-0.5 block">{property.configuration}</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-neutral-200/80">
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Carpet Area</span>
                <span className="font-semibold text-neutral-900 tabular-nums mt-0.5 block">{property.carpetAreaSqFt.toLocaleString()} sq.ft</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-neutral-200/80">
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Super Built-up</span>
                <span className="font-semibold text-neutral-900 tabular-nums mt-0.5 block">{property.superAreaSqFt.toLocaleString()} sq.ft</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-neutral-200/80">
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Floor Level</span>
                <span className="font-semibold text-neutral-900 mt-0.5 block">{property.floorLevel}</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-neutral-200/80">
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Orientation / Facing</span>
                <span className="font-semibold text-neutral-900 mt-0.5 block">{property.facing}</span>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-neutral-200/80">
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Furnishing Status</span>
                <span className="font-semibold text-neutral-900 mt-0.5 block">{property.furnishingStatus}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-neutral-100 text-xs">
              <div>
                <span className="text-neutral-500 block">Bedrooms</span>
                <strong className="text-neutral-900 text-base">{property.specifications.bedrooms}</strong>
              </div>
              <div>
                <span className="text-neutral-500 block">Bathrooms</span>
                <strong className="text-neutral-900 text-base">{property.specifications.bathrooms}</strong>
              </div>
              <div>
                <span className="text-neutral-500 block">Balconies</span>
                <strong className="text-neutral-900 text-base">{property.specifications.balconies}</strong>
              </div>
              <div>
                <span className="text-neutral-500 block">Reserved Parking</span>
                <strong className="text-neutral-900 text-base">{property.specifications.parkingSlots} Slots</strong>
              </div>
            </div>
          </div>

          {/* Key Amenities */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="font-serif-display text-2xl font-bold text-neutral-900 tracking-tight">
              Selected Features & Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-700">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAF9F5] border border-neutral-200/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Site Visit & Consultant Action Card (Span 4) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200 shadow-xl space-y-6">
            
            <div className="border-b border-neutral-100 pb-4 space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block">
                Direct Property Action
              </span>
              <h3 className="font-serif-display text-xl font-bold text-neutral-900">
                Arrange a Private Inspection
              </h3>
              <p className="text-xs text-neutral-600">
                Schedule a guided walkthrough with lead consultant <strong>{BUSINESS_INFO.consultantName}</strong>.
              </p>
            </div>

            {/* Request Site Visit Button */}
            <button
              onClick={() => openSiteVisitModal(property)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-[#DEC5A0] hover:bg-[#E8CEAB] active:bg-[#C9B08B] rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-neutral-950" />
              <span>Request a Site Visit</span>
            </button>

            {/* Direct WhatsApp Action */}
            <button
              type="button"
              onClick={handleWhatsAppProperty}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold tracking-wider text-emerald-950 bg-emerald-100 hover:bg-emerald-200/90 border border-emerald-300 rounded-xl transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>Chat on WhatsApp (+91 9211657522)</span>
            </button>

            {/* Direct Phone Link */}
            <a
              href={BUSINESS_INFO.phoneTelLink}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-neutral-600" />
              <span>Call Satyam Gupta</span>
            </a>

            {/* Verified Direct Advisory Notice */}
            <div className="pt-2 text-[11px] text-neutral-500 space-y-2 border-t border-neutral-100 leading-normal">
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Sign-In Required:</strong> Requests are processed directly by our consultant without account creation or login hurdles.
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>
                  Requests do not constitute a confirmed appointment until verified directly with the buyer.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
