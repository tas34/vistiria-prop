import React from 'react';
import { motion } from 'motion/react';
import { useProperties } from '../../context/PropertyContext';
import { PropertyCard } from '../properties/PropertyCard';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const FeaturedProperties: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { featuredProperties } = useProperties();
  const featuredList = featuredProperties.slice(0, 4);

  return (
    <section className="py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FAF9F5]" aria-label="Featured Properties">
      
      {/* Editorial Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-neutral-200/80 pb-6"
      >
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.24em] text-amber-900 uppercase">
              Section C · Curated Portfolio
            </span>
            <div className="h-[1px] w-12 bg-amber-800/40" />
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tight leading-tight">
            Featured Property Acquisitions
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Curated luxury condominiums, sky penthouses, and private estates across Gurugram and Delhi NCR. Direct advisory with consultant Satyam Gupta.
          </p>
        </div>

        <button
          onClick={() => navigateTo('properties')}
          className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-neutral-900 hover:text-amber-900 transition-colors cursor-pointer group shrink-0 pb-1"
        >
          <span>View Complete Catalogue</span>
          <ArrowRight className="w-4 h-4 text-amber-800 group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </motion.div>

      {/* Disclaimed Sample Listings Note */}
      <div className="mb-10 p-4 bg-white/80 border border-neutral-200/90 rounded-xl flex items-center gap-3 text-xs text-neutral-600 shadow-sm">
        <AlertCircle className="w-4 h-4 text-amber-800 shrink-0" />
        <span>
          <strong>Layout Demonstration:</strong> Properties below are realistic sample placeholders illustrating card composition, specifications, and site visit request workflows.
        </span>
      </div>

      {/* 3–4 Property Grid with Staggered Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {featuredList.map((property, idx) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <PropertyCard property={property} featured={true} />
          </motion.div>
        ))}
      </div>

    </section>
  );
};
