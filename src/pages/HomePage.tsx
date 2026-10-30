import React from 'react';
import { Hero3D } from '../components/home/Hero3D';
import { BuyerInquiryDesk } from '../components/home/BuyerInquiryDesk';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { VisionPlaceholder } from '../components/home/VisionPlaceholder';
import { WhyChoosePlaceholder } from '../components/home/WhyChoosePlaceholder';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Section A: Hero with 3D Depth & Custom Image Option */}
      <Hero3D />

      {/* Section B: Buyer Inquiry Desk */}
      <BuyerInquiryDesk />

      {/* Section C: Featured Properties (3-4 listings) */}
      <FeaturedProperties />

      {/* Section D: Company Vision Section */}
      <VisionPlaceholder />

      {/* Section E: Why Choose Vistiria */}
      <WhyChoosePlaceholder />
    </div>
  );
};
