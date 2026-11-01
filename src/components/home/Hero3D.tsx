import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { BUSINESS_INFO } from '../../constants/business';
import { resolveAssetUrl } from '../../utils/assetUrl';
import heroSlide01Img from '../../assets/images/WhatsApp_Image_2026-10-29_at_4.49.15_PM_83440257.jpeg';
import heroSlide02Img from '../../assets/images/hero_luxury_penthouse_1793271569251.jpg';
import heroSlide03Img from '../../assets/images/property_golf_course_tower_1793271569410.jpg';
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Home as HomeIcon,
  Sparkles,
} from 'lucide-react';

interface HeroSlide {
  id: string;
  number: string;
  kicker: string;
  headlineFirst: string;
  headlineSecond: string;
  subtitle: string;
  image: string;
  propertyId?: string;
  locationTag: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-01',
    number: '01',
    kicker: 'PREMIUM PROPERTIES',
    headlineFirst: 'Find Your',
    headlineSecond: 'Perfect Home',
    subtitle: 'Modern living. Prime locations. Exceptional value. Your dream home is closer than you think.',
    image: heroSlide01Img,
    propertyId: 'the-palm-estate-villa',
    locationTag: 'DLF Phase 1 / Golf Greens',
  },
  {
    id: 'slide-02',
    number: '02',
    kicker: 'PENTHOUSE COLLECTION',
    headlineFirst: 'Sky-High',
    headlineSecond: 'Architectural Luxury',
    subtitle: 'Double-height glass walls, panoramic twilight horizons, and bespoke Italian craftsmanship in Sector 66.',
    image: heroSlide02Img,
    propertyId: 'sovereign-penthouse-sector-66',
    locationTag: 'Sector 66, Gurugram',
  },
  {
    id: 'slide-03',
    number: '03',
    kicker: 'HIGH-RISE RESIDENCES',
    headlineFirst: 'Prestige',
    headlineSecond: 'Living in Gurugram',
    subtitle: 'Cantilevered balcony terraces overlooking lush landscaped resort greens on Golf Course Extension Road.',
    image: heroSlide03Img,
    propertyId: 'park-horizon-condominiums',
    locationTag: 'Golf Course Extension Road',
  },
];

export const Hero3D: React.FC = () => {
  const { navigateTo, openSiteVisitModal } = useNavigation();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = HERO_SLIDES[activeSlideIndex];

  // GSAP element references
  const heroRootRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const trustBarRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  // Auto-advance slides with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // GSAP Entrance & Transition Animation for Hero Elements
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([kickerRef.current, headingRef.current, subheadingRef.current, ctaContainerRef.current, trustBarRef.current], {
          opacity: 1,
          y: 0,
          x: 0,
        });
        return;
      }

      // Master entrance timeline with silky high-end easing
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, x: -35 },
        { opacity: 1, x: 0, duration: 1.1, delay: 0.1 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 45, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.35, ease: 'power4.out' },
          '-=0.85'
        )
        .fromTo(
          subheadingRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.1 },
          '-=0.9'
        )
        .fromTo(
          ctaContainerRef.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'back.out(1.2)' },
          '-=0.75'
        )
        .fromTo(
          trustBarRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.65'
        );
    }, heroRootRef);

    return () => ctx.revert();
  }, [activeSlideIndex]);

  // GSAP-based interactive mouse parallax & scroll parallax
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const root = heroRootRef.current;
    if (!root) return;

    // Mouse movement handler using GSAP tweens for natural weighted inertia
    const handleMouseMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

      // Parallax on Heading (deep floating layer)
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          x: xNorm * 18,
          y: yNorm * 14,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      // Parallax on Subheading
      if (subheadingRef.current) {
        gsap.to(subheadingRef.current, {
          x: xNorm * 10,
          y: yNorm * 8,
          duration: 1.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      // Parallax on CTA Button
      if (ctaContainerRef.current) {
        gsap.to(ctaContainerRef.current, {
          x: xNorm * 14,
          y: yNorm * 10,
          duration: 1.0,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      // Subtle background depth shift
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          scale: 1.05 + Math.abs(xNorm) * 0.02,
          x: -xNorm * 22,
          y: -yNorm * 18,
          duration: 1.8,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      }
    };

    // Scroll parallax: elements subtly drift upward as user scrolls towards next section
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 700) return;

      if (headingRef.current && subheadingRef.current && ctaContainerRef.current) {
        const factor = scrollY * 0.25;
        const opacityFactor = Math.max(0, 1 - scrollY / 600);

        gsap.to([headingRef.current, subheadingRef.current], {
          y: -factor,
          opacity: opacityFactor,
          duration: 0.3,
          ease: 'none',
          overwrite: 'auto',
        });
      }
    };

    root.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      root.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToNextSection = () => {
    const nextElem = document.getElementById('buyer-inquiry-desk');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 550, behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    if (currentSlide.propertyId) {
      navigateTo('property-detail', currentSlide.propertyId);
    } else {
      navigateTo('properties');
    }
  };

  return (
    <section
      ref={heroRootRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-between overflow-hidden bg-[#0A0D14] text-white perspective-[1400px] select-none"
      aria-label="Vistiria Properties Master Hero Experience"
    >
      {/* ============================================================ */}
      {/* LAYER 1: 3D Photographic Background with Ambient Twilight     */}
      {/* ============================================================ */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full transform-gpu scale-105 origin-center pointer-events-none transition-transform will-change-transform"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={resolveAssetUrl(currentSlide.image)}
              alt={currentSlide.headlineSecond}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallbackApplied) {
                  target.dataset.fallbackApplied = 'true';
                  target.src = resolveAssetUrl('/assets/aistudio/WhatsApp_Image_2026-10-29_at_4.49.15_PM_83440257.jpeg');
                }
              }}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Twilight Sunset Warmth Glow Animation */}
        <motion.div
          animate={{
            opacity: [0.45, 0.7, 0.45],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-500/25 via-orange-500/15 to-transparent blur-3xl pointer-events-none"
        />

        {/* Animated Water Reflection Shimmer over Pool area */}
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            x: [-15, 15, -15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 left-1/3 w-[55%] h-44 bg-gradient-to-t from-amber-400/20 via-orange-400/10 to-transparent blur-2xl pointer-events-none"
        />

        {/* Cinema-Grade Architectural Vignette & Contrast Scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-l from-black/50 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* LAYER 2: Main GSAP-Animated Content Stack                    */}
      {/* ============================================================ */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full h-full flex flex-col justify-between">
        
        {/* Main Left Content Stack */}
        <div className="max-w-2xl pt-10 sm:pt-14 space-y-6">
          
          {/* 1. Kicker with Horizontal Golden Line (GSAP Animated) */}
          <div ref={kickerRef} className="flex items-center gap-4 opacity-0">
            <span className="text-xs font-semibold tracking-[0.28em] text-[#DEC5A0] uppercase">
              {currentSlide.kicker}
            </span>
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-[#DEC5A0] to-transparent" />
          </div>

          {/* 2. Master Headline: "Find Your / Perfect Home" (GSAP Animated) */}
          <div className="space-y-1">
            <h1
              ref={headingRef}
              className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F7EFE2] leading-[1.08] opacity-0 will-change-transform"
            >
              <span className="block text-white/95">{currentSlide.headlineFirst}</span>
              <span className="block text-[#E8CEAB] font-serif italic font-normal">
                {currentSlide.headlineSecond}
              </span>
            </h1>
          </div>

          {/* 3. Subtitle Description (GSAP Animated) */}
          <p
            ref={subheadingRef}
            className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-lg text-balance opacity-0 will-change-transform"
          >
            {currentSlide.subtitle}
          </p>

          {/* 4. "EXPLORE PROPERTIES →" Pill Outline Button with Animated Arrow (GSAP Animated) */}
          <div
            ref={ctaContainerRef}
            className="pt-2 flex flex-wrap items-center gap-4 opacity-0 will-change-transform"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExploreClick}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#D5B88D] bg-black/40 hover:bg-[#D5B88D]/15 text-[#F7EFE2] hover:text-white text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 shadow-lg shadow-black/40 hover:shadow-[#D5B88D]/25 cursor-pointer"
            >
              <span>EXPLORE PROPERTIES</span>
              <ArrowRight className="w-4 h-4 text-[#E3C8A0] group-hover:translate-x-1.5 transition-transform duration-300" />
            </motion.button>

            {/* Quick Site Visit Action */}
            <button
              onClick={() => openSiteVisitModal()}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DEC5A0]" />
              <span>Schedule Guided Site Visit</span>
            </button>
          </div>

          {/* 5. Three Key Trust Highlights (GSAP Animated) */}
          <div
            ref={trustBarRef}
            className="pt-6 grid grid-cols-3 gap-4 max-w-md border-t border-white/10 opacity-0"
          >
            {/* 1. Verified Listings */}
            <div className="flex flex-col items-start gap-1.5 group cursor-pointer" onClick={() => navigateTo('properties')}>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#DEC5A0] group-hover:bg-[#DEC5A0]/20 transition-colors">
                <HomeIcon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium tracking-wide text-neutral-300 group-hover:text-white transition-colors">
                Verified Listings
              </span>
            </div>

            {/* 2. Senior Advisory · Satyam Gupta */}
            <div className="flex flex-col items-start gap-1.5 group cursor-pointer" onClick={() => navigateTo('about')}>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#DEC5A0] group-hover:bg-[#DEC5A0]/20 transition-colors">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium tracking-wide text-neutral-300 group-hover:text-white transition-colors">
                Senior Advisory
              </span>
            </div>

            {/* 3. Prime Locations */}
            <div className="flex flex-col items-start gap-1.5 group cursor-pointer" onClick={() => navigateTo('contact')}>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#DEC5A0] group-hover:bg-[#DEC5A0]/20 transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium tracking-wide text-neutral-300 group-hover:text-white transition-colors">
                Prime Locations
              </span>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* BOTTOM ROW: Scroll Mouse (Left) & Mini Gallery (Right)      */}
        {/* ============================================================ */}
        <div className="pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          
          {/* Bottom Left: Mouse Scroll to Explore Indicator */}
          <button
            onClick={scrollToNextSection}
            className="inline-flex items-center gap-3 text-neutral-400 hover:text-[#DEC5A0] transition-colors cursor-pointer group"
            aria-label="Scroll to explore buyer inquiry desk"
          >
            {/* Animated Mouse Icon */}
            <div className="w-5 h-8 rounded-full border border-neutral-400 group-hover:border-[#DEC5A0] flex justify-center pt-1.5 transition-colors">
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  opacity: [1, 0.2, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-1 h-1.5 rounded-full bg-[#DEC5A0]"
              />
            </div>

            <span className="text-[10px] font-semibold tracking-[0.24em] uppercase text-neutral-400 group-hover:text-neutral-200">
              SCROLL TO EXPLORE
            </span>
            <div className="w-8 h-[1px] bg-neutral-600 group-hover:bg-[#DEC5A0] transition-colors" />
          </button>

          {/* Bottom Right: Interactive 3-Card Mini Gallery Carousel */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = activeSlideIndex === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`relative w-20 sm:w-24 aspect-[4/3] rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[#DEC5A0] ring-2 ring-[#DEC5A0]/40 scale-105 shadow-xl'
                        : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                    }`}
                    title={slide.headlineSecond}
                  >
                    <img
                      src={slide.image}
                      alt={slide.headlineSecond}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* "VIEW GALLERY →" trigger */}
            <div className="flex justify-end">
              <button
                onClick={() => navigateTo('properties')}
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-300 hover:text-[#DEC5A0] transition-colors cursor-pointer group"
              >
                <span>VIEW GALLERY</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* RIGHT EDGE: Numeric Slide Selectors (01 / 02 / 03)           */}
      {/* ============================================================ */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-4 text-xs font-mono">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = activeSlideIndex === idx;
          return (
            <button
              key={slide.id}
              onClick={() => setActiveSlideIndex(idx)}
              className={`group flex items-center gap-2 cursor-pointer transition-all ${
                isActive ? 'text-[#DEC5A0] font-bold scale-110' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <span className="tabular-nums">{slide.number}</span>
              {isActive && (
                <motion.div
                  layoutId="activeSlideIndicator"
                  className="w-3 h-[2px] bg-[#DEC5A0] rounded-full shadow-[0_0_8px_#DEC5A0]"
                />
              )}
            </button>
          );
        })}
      </div>

    </section>
  );
};
