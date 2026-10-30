import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SiteVisitModal } from './components/properties/SiteVisitModal';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage, toastMessage } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-neutral-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main View Router - pt-0 on home for transparent hero overlay, pt-20 on sub-pages */}
      <main className={`flex-1 ${currentPage === 'home' ? 'pt-0' : 'pt-20'}`}>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'properties' && <PropertiesPage />}
        {currentPage === 'property-detail' && <PropertyDetailPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'admin' && <AdminPage />}
      </main>

      {/* Comprehensive Verified Business Footer */}
      <Footer />

      {/* Interactive Site Visit & Inquiry Modal */}
      <SiteVisitModal />

      {/* Global Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B0F18] text-[#F3E2C8] px-5 py-3.5 rounded-xl shadow-2xl border border-[#DEC5A0]/35 flex items-center gap-3 text-xs animate-in slide-in-from-bottom-3 duration-200 shadow-black/80">
          <CheckCircle2 className="w-4 h-4 text-[#DEC5A0] shrink-0" />
          <span className="text-glow-gold-subtle font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <NavigationProvider>
          <MainContent />
        </NavigationProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}
