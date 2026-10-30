import React, { createContext, useContext, useState, useEffect } from 'react';
import { PropertyListing } from '../types/property';
import { SAMPLE_PROPERTIES } from '../data/properties';

export type PageRoute = 'home' | 'properties' | 'property-detail' | 'about' | 'contact' | 'admin';

interface NavigationContextType {
  currentPage: PageRoute;
  selectedPropertyId: string | null;
  selectedProperty: PropertyListing | null;
  setSelectedProperty: (prop: PropertyListing | null) => void;
  navigateTo: (page: PageRoute, propertyId?: string) => void;
  // Modal state for site visits
  isSiteVisitModalOpen: boolean;
  activeVisitProperty: PropertyListing | null;
  openSiteVisitModal: (property?: PropertyListing | null) => void;
  closeSiteVisitModal: () => void;
  // Custom hero image state (allows user to provide image URL / local path)
  customHeroImageUrl: string;
  setCustomHeroImageUrl: (url: string) => void;
  resetHeroImageToDefault: () => void;
  defaultHeroImageUrl: string;
  // Notification toast
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const DEFAULT_HERO_IMAGE = './assets/aistudio/WhatsApp_Image_2026-10-29_at_4.49.15_PM_83440257.jpeg';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [customSelectedProperty, setCustomSelectedProperty] = useState<PropertyListing | null>(null);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [activeVisitProperty, setActiveVisitProperty] = useState<PropertyListing | null>(null);
  const [customHeroImageUrl, setCustomHeroImageUrl] = useState<string>(() => {
    return localStorage.getItem('vistiria_hero_image') || DEFAULT_HERO_IMAGE;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state from URL hash or pathname on load (works on both root domains & GitHub Pages subpaths)
  useEffect(() => {
    const handleUrlChange = () => {
      const cleanHash = window.location.hash.replace(/^#\/?/, '');
      const segments = window.location.pathname.split('/').filter(Boolean);
      const lastSegment = segments[segments.length - 1] || '';
      const secondLastSegment = segments[segments.length - 2] || '';

      let target = cleanHash;
      if (!target) {
        if (secondLastSegment === 'properties') {
          target = `properties/${lastSegment}`;
        } else if (['properties', 'about', 'contact', 'admin'].includes(lastSegment)) {
          target = lastSegment;
        }
      }

      if (target.startsWith('properties/')) {
        const id = target.replace('properties/', '');
        setSelectedPropertyId(id);
        setCurrentPage('property-detail');
      } else if (target === 'properties') {
        setCurrentPage('properties');
        setSelectedPropertyId(null);
      } else if (target === 'about') {
        setCurrentPage('about');
        setSelectedPropertyId(null);
      } else if (target === 'contact') {
        setCurrentPage('contact');
        setSelectedPropertyId(null);
      } else if (target === 'admin') {
        setCurrentPage('admin');
        setSelectedPropertyId(null);
      } else {
        setCurrentPage('home');
        setSelectedPropertyId(null);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (page: PageRoute, propertyId?: string) => {
    setCurrentPage(page);
    if (page === 'property-detail' && propertyId) {
      setSelectedPropertyId(propertyId);
      window.history.pushState({}, '', `#/properties/${propertyId}`);
    } else if (page === 'home') {
      setSelectedPropertyId(null);
      window.history.pushState({}, '', '#/');
    } else {
      setSelectedPropertyId(null);
      window.history.pushState({}, '', `#/${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSiteVisitModal = (property?: PropertyListing | null) => {
    setActiveVisitProperty(property || null);
    setIsSiteVisitModalOpen(true);
  };

  const closeSiteVisitModal = () => {
    setIsSiteVisitModalOpen(false);
  };

  const handleSetCustomHeroImage = (url: string) => {
    setCustomHeroImageUrl(url);
    try {
      localStorage.setItem('vistiria_hero_image', url);
    } catch {
      // Ignore localStorage issues
    }
    showToast('Hero image updated successfully.');
  };

  const resetHeroImageToDefault = () => {
    setCustomHeroImageUrl(DEFAULT_HERO_IMAGE);
    try {
      localStorage.removeItem('vistiria_hero_image');
    } catch {
      // Ignore
    }
    showToast('Hero image restored to default architectural visual.');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 4000);
  };

  const selectedProperty = customSelectedProperty || (selectedPropertyId
    ? SAMPLE_PROPERTIES.find((p) => p.id === selectedPropertyId) || null
    : null);

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        selectedPropertyId,
        selectedProperty,
        setSelectedProperty: setCustomSelectedProperty,
        navigateTo,
        isSiteVisitModalOpen,
        activeVisitProperty,
        openSiteVisitModal,
        closeSiteVisitModal,
        customHeroImageUrl,
        setCustomHeroImageUrl: handleSetCustomHeroImage,
        resetHeroImageToDefault,
        defaultHeroImageUrl: DEFAULT_HERO_IMAGE,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
