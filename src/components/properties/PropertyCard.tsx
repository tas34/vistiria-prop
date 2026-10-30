import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PropertyListing } from '../../types/property';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowUpRight, Calendar, MapPin, Image as ImageIcon } from 'lucide-react';

interface PropertyCardProps {
  property: PropertyListing;
  featured?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured = false }) => {
  const { navigateTo, openSiteVisitModal } = useNavigation();
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-2xl hover:border-neutral-300 transition-all duration-300 flex flex-col overflow-hidden will-change-transform"
    >
      {/* Media Container with 4:3 Aspect Ratio, crisp crop & gentle hover zoom */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        {!imageError ? (
          <img
            src={property.heroImage}
            alt={property.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800 text-neutral-400 p-4 text-center">
            <ImageIcon className="w-8 h-8 mb-2 text-neutral-500" />
            <span className="text-xs">{property.title}</span>
          </div>
        )}

        {/* Clean unboxed sample disclaimer & property type label */}
        <div className="absolute top-3.5 left-3.5 bg-neutral-950/85 backdrop-blur-md text-white/95 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-md border border-white/10">
          {property.type} · SAMPLE LISTING
        </div>

        {/* Price Tag Overlay with tabular figures */}
        <div className="absolute bottom-3.5 right-3.5 bg-[#0B0F18]/92 backdrop-blur-md text-[#F3E2C8] text-glow-gold-subtle px-3.5 py-1.5 text-sm font-semibold tracking-tight rounded-md border border-[#DEC5A0]/35 tabular-nums shadow-lg">
          {property.priceDisplay}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        
        <div className="space-y-2.5">
          {/* Unboxed Metadata Header (No pill badges) */}
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="flex items-center gap-1 font-medium text-neutral-800">
              <MapPin className="w-3.5 h-3.5 text-amber-800 shrink-0" />
              <span>{property.location}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{property.city}</span>
          </div>

          {/* Property Title */}
          <h3 className="font-serif-display text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-amber-900 transition-colors leading-snug">
            {property.title}
          </h3>

          {/* Configuration & Brief */}
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
            {property.overview}
          </p>
        </div>

        {/* Specifications Strip with tabular numerals */}
        <div className="pt-3.5 border-t border-neutral-100 grid grid-cols-3 gap-2 text-xs text-neutral-600">
          <div>
            <span className="text-[10px] uppercase text-neutral-400 block tracking-wider">Config</span>
            <span className="font-medium text-neutral-900 block truncate">{property.configuration.split('+')[0]}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-neutral-400 block tracking-wider">Carpet Area</span>
            <span className="font-medium text-neutral-900 tabular-nums block">{property.carpetAreaSqFt.toLocaleString()} sq.ft</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-neutral-400 block tracking-wider">Floor</span>
            <span className="font-medium text-neutral-900 truncate block">{property.floorLevel.split(' ')[0]}</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-2 flex items-center gap-2.5">
          <button
            onClick={() => navigateTo('property-detail', property.id)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 rounded-lg transition-colors cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openSiteVisitModal(property)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-[#DEC5A0] hover:bg-[#E8CEAB] active:bg-[#C9B08B] rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
            title="Request a Site Visit"
          >
            <Calendar className="w-3.5 h-3.5 text-neutral-950" />
            <span className="hidden sm:inline">Site Visit</span>
          </button>
        </div>

      </div>
    </motion.article>
  );
};
