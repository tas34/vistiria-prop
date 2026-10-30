import React, { useState, useMemo } from 'react';
import { useProperties } from '../context/PropertyContext';
import { PropertyCard } from '../components/properties/PropertyCard';
import { useNavigation } from '../context/NavigationContext';
import { PropertyType } from '../types/property';
import { Search, Filter, AlertCircle, ArrowUpDown, Building, X, MessageSquare, Loader2 } from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const { openSiteVisitModal } = useNavigation();
  const { properties, loading } = useProperties();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');

  const propertyTypes: { label: string; value: string }[] = [
    { label: 'All Categories', value: 'all' },
    { label: 'Condominiums', value: 'apartment' },
    { label: 'Sky Penthouses', value: 'penthouse' },
    { label: 'Private Villas', value: 'villa' },
    { label: 'Duplex Residences', value: 'duplex' },
  ];

  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }
      // Search filter (title, location, city, microMarket)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.microMarket.toLowerCase().includes(query) ||
          item.city.toLowerCase().includes(query) ||
          item.configuration.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (priceSort === 'asc') return a.priceNumeric - b.priceNumeric;
      if (priceSort === 'desc') return b.priceNumeric - a.priceNumeric;
      return 0;
    });
  }, [searchQuery, selectedType, priceSort]);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
          <span>Property Sales Catalogue</span>
          <span aria-hidden="true">·</span>
          <span>India Acquisitions</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tight">
          Current Property Portfolio
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Explore curated residential and commercial property opportunities. Direct advisory with consultant Satyam Gupta.
        </p>
      </div>

      {/* Disclaimed Sample Listings Notice */}
      <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Design Development Notice:</strong> These listings represent sample placeholders with verified architectural parameters to demonstrate catalogue layout, specifications, and site visit scheduling.
          </span>
        </div>
        <button
          onClick={() => openSiteVisitModal()}
          className="self-start sm:self-auto px-3 py-1.5 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors whitespace-nowrap shrink-0"
        >
          General Site Visit Inquiry
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
        
        {/* Row 1: Search and Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by title, location (e.g. Sector 66, Golf Course Rd), or configuration..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-[#FAF9F5] border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Price Sorting */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-neutral-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as 'default' | 'asc' | 'desc')}
              className="px-3 py-2 text-xs bg-[#FAF9F5] border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40"
            >
              <option value="default">Featured Order</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Row 2: Category Filter Tabs (Single-line functional buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-neutral-100 scrollbar-none">
          <span className="text-xs text-neutral-400 font-medium whitespace-nowrap shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Category:</span>
          </span>
          {propertyTypes.map((type) => {
            const isSelected = selectedType === type.value;
            return (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Count & Disclaimers */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <div>
          Showing <strong className="text-neutral-900">{filteredProperties.length}</strong> available properties
        </div>
        <div>
          Office: Sector 66, Gurugram
        </div>
      </div>

      {/* Property Cards Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-neutral-200 text-center space-y-4">
          <Building className="w-12 h-12 text-neutral-400 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-serif-display text-lg font-bold text-neutral-900">
              No matching properties found
            </h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              We could not find properties matching your current filter criteria. Reset your filters or submit a bespoke inquiry.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setPriceSort('default');
            }}
            className="px-4 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Off-Market / Special Inquiry Banner with Dark Blue & Golden Glow */}
      <div className="p-8 sm:p-10 bg-[#0E131F] text-[#F3E2C8] rounded-2xl border border-[#DEC5A0]/25 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif-display text-xl sm:text-2xl font-normal text-[#F3E2C8] text-glow-gold">
            Seeking bespoke off-market acquisitions across India?
          </h3>
          <p className="text-xs sm:text-sm text-[#E8CEAB] text-glow-gold-subtle max-w-xl leading-relaxed">
            Inquire directly with consultant Satyam Gupta for confidential and off-market residential and commercial opportunities.
          </p>
        </div>

        <button
          onClick={() => openSiteVisitModal()}
          className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#DEC5A0] hover:bg-[#E8CEAB] rounded-lg shadow-[0_0_20px_rgba(222,197,160,0.3)] transition-all whitespace-nowrap cursor-pointer shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-neutral-950" />
          <span>Inquire with Consultant</span>
        </button>
      </div>

    </div>
  );
};
