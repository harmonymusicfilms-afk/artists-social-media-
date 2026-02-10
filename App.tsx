
import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { SettingsPage } from './pages/SettingsPage';
import { JobsPage } from './pages/JobsPage';
import { AdminJobPage } from './pages/AdminJobPage';
import { ArtistsPlatformPage } from './pages/ArtistsPlatformPage';
import { CastingPlatformPage } from './pages/CastingPlatformPage';
import { MLMPlatformPage } from './pages/MLMPlatformPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { WeTubePage } from './pages/WeTubePage';
import { HealthCardPage } from './pages/HealthCardPage';
import { StudiosPlatformPage } from './pages/StudiosPlatformPage';
import { DigitalMarketingPage } from './pages/DigitalMarketingPage';
import { NGOSHGPage } from './pages/NGOSHGPage';
import { MusicIndustryPage } from './pages/MusicIndustryPage';
import { DesiDidiMartPage } from './pages/DesiDidiMartPage';
import { StudentCompetitionsPage } from './pages/StudentCompetitionsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { ContactUsPage } from './pages/ContactUsPage';
import { BarberBookingPage } from './pages/BarberBookingPage';
import { Artist } from './types';
import gsap from 'gsap';
import { Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  // Destructure isLoading to handle session restoration state
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [targetArtistId, setTargetArtistId] = useState<string | null>(null);
  const [targetStudioId, setTargetStudioId] = useState<string | null>(null);
  
  // GSAP Transition Refs & State
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [pendingSectionId, setPendingSectionId] = useState<string | null>(null);

  // Animation effect when currentPage changes
  useEffect(() => {
    if (pageContainerRef.current) {
        // Animate In - Gentle Fade
        gsap.fromTo(pageContainerRef.current, 
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
        );
    }

    // Handle Scroll after render and animation start
    if (pendingSectionId) {
        setTimeout(() => {
            const element = document.getElementById(pendingSectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setPendingSectionId(null);
        }, 100);
    } else {
        window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const handleNavigate = (page: string, sectionId?: string, data?: { artist?: Artist, studioId?: string }) => {
    
    // If we are on the same page and just scrolling to a section, don't do full transition
    if (currentPage === page && sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    // Prepare data updates function
    const updateState = () => {
        // Handle artist profile navigation for the main Artists Platform
        if (page === 'artists-platform' && data?.artist?.id) {
            setTargetArtistId(String(data.artist.id));
        } else if (page !== 'artists-platform') {
            setTargetArtistId(null);
        }
        
        // Handle studio profile navigation
        if (page === 'studios-platform' && data?.studioId) {
            setTargetStudioId(data.studioId);
        } else if (page !== 'studios-platform') {
            setTargetStudioId(null);
        }

        // Store section ID for the useEffect hook to handle after render
        if (sectionId) {
            setPendingSectionId(sectionId);
        }

        setCurrentPage(page);
    };

    // Animate Out before changing state
    if (pageContainerRef.current) {
        gsap.to(pageContainerRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: updateState
        });
    } else {
        updateState();
    }
  };

  const publicPages = [
    'jobs', 'artists-platform', 'casting-platform', 'mlm-platform', 
    'user-profile', 'we-tube', 'health-card', 'studios-platform', 
    'ngo-shg', 'music-industry', 'digital-marketing', 'desi-didi-mart',
    'student-competitions', 'privacy', 'terms', 'contact', 'barber-booking'
  ];

  // --- 1. HANDLING LOADING STATE ---
  // This prevents the AuthPage from flickering while Supabase restores the session
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
           <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse">
              <span className="font-bold text-2xl">A</span>
           </div>
           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Loader2 className="animate-spin" size={20} />
              <span className="font-semibold text-sm tracking-wide">Restoring Session...</span>
           </div>
        </div>
      </div>
    );
  }

  // --- 2. AUTHENTICATION CHECK ---
  if (!isAuthenticated && !publicPages.includes(currentPage)) {
    return <AuthPage onLoginSuccess={() => handleNavigate('dashboard')} />;
  }
  
  const showNavbar = !['we-tube', 'health-card'].includes(currentPage);
  const showFooter = !['casting-platform', 'we-tube', 'health-card'].includes(currentPage);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {showNavbar && <Navbar onNavigate={handleNavigate} currentPage={currentPage} />}
      
      {/* Content Container with Ref for GSAP */}
      <div className="flex-grow relative z-10" ref={pageContainerRef}>
        {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {currentPage === 'settings' && <SettingsPage onBack={() => handleNavigate('dashboard')} />}
        {currentPage === 'jobs' && <JobsPage onNavigate={handleNavigate} />}
        {currentPage === 'admin-jobs' && <AdminJobPage onNavigate={handleNavigate} />}
        {currentPage === 'artists-platform' && <ArtistsPlatformPage key={targetArtistId} targetArtistId={targetArtistId} onNavigate={handleNavigate} />}
        {currentPage === 'casting-platform' && <CastingPlatformPage onNavigate={handleNavigate} />}
        {currentPage === 'mlm-platform' && <MLMPlatformPage onNavigate={handleNavigate} />}
        {currentPage === 'user-profile' && <UserProfilePage onNavigate={handleNavigate} />}
        {currentPage === 'we-tube' && <WeTubePage onNavigate={handleNavigate} />}
        {currentPage === 'health-card' && <HealthCardPage onNavigate={handleNavigate} />}
        {currentPage === 'studios-platform' && <StudiosPlatformPage initialStudioId={targetStudioId} onNavigate={handleNavigate} />}
        {currentPage === 'digital-marketing' && <DigitalMarketingPage onNavigate={handleNavigate} />}
        {currentPage === 'ngo-shg' && <NGOSHGPage onNavigate={handleNavigate} />}
        {currentPage === 'music-industry' && <MusicIndustryPage onNavigate={handleNavigate} />}
        {currentPage === 'desi-didi-mart' && <DesiDidiMartPage onNavigate={handleNavigate} />}
        {currentPage === 'student-competitions' && <StudentCompetitionsPage onNavigate={handleNavigate} />}
        {currentPage === 'barber-booking' && <BarberBookingPage onNavigate={handleNavigate} />}
        {currentPage === 'privacy' && <PrivacyPolicyPage onNavigate={handleNavigate} />}
        {currentPage === 'terms' && <TermsOfServicePage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactUsPage onNavigate={handleNavigate} />}
      </div>

      {/* Conditionally render footer based on page */}
      {showFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
