
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Menu, X, Sun, Moon, User as UserIcon, LogOut, Settings, LayoutDashboard, Briefcase, ShieldCheck, Clapperboard, Palette } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string, sectionId?: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string, sectionId?: string) => {
    if (currentPage === page && sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      onNavigate(page, sectionId);
    }
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200 dark:border-gray-800 shadow-sm py-2' 
          : 'bg-white dark:bg-gray-900 border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => handleNavClick('dashboard', 'dashboard-top')}
        >
          <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            A
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            ARTISTS<span className="text-brand-orange">SOCIAL</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'dashboard-top' },
            { id: 'casting-platform', label: 'Casting', icon: Clapperboard },
            { id: 'artists-platform', label: 'Artists', icon: Palette },
            { id: 'jobs', label: 'Jobs', icon: Briefcase, section: 'jobs-top' }
          ].map((item) => (
             <button 
                key={item.id}
                onClick={() => handleNavClick(item.id, item.section)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${currentPage === item.id 
                    ? 'text-brand-orange bg-orange-50 dark:bg-orange-900/20' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}
                `}
              >
                {item.label}
              </button>
          ))}

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-3" />

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-2"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile Dropdown */}
          {isAuthenticated && user && (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <UserIcon size={18} />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 animate-fade-in overflow-hidden">
                   <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                     <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                   </div>
                   
                   <button onClick={() => handleNavClick('dashboard')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors">
                     <LayoutDashboard size={16} /> Dashboard
                   </button>
                   <button onClick={() => handleNavClick('user-profile')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors">
                     <UserIcon size={16} /> My Profile
                   </button>
                   <button onClick={() => handleNavClick('admin-jobs')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors">
                     <ShieldCheck size={16} /> Admin
                   </button>
                   <button onClick={() => handleNavClick('settings')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors">
                     <Settings size={16} /> Settings
                   </button>
                   <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                     <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-3 transition-colors">
                       <LogOut size={16} /> Logout
                     </button>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
           <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl absolute top-full left-0 w-full px-4 py-2">
           <button onClick={() => handleNavClick('dashboard')} className="block w-full text-left py-3 text-gray-700 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-800">Dashboard</button>
           <button onClick={() => handleNavClick('user-profile')} className="block w-full text-left py-3 text-gray-700 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-800">Profile</button>
           <button onClick={() => handleNavClick('casting-platform')} className="block w-full text-left py-3 text-gray-700 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-800">Casting</button>
           <button onClick={() => handleNavClick('artists-platform')} className="block w-full text-left py-3 text-gray-700 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-800">Artists</button>
           <button onClick={() => handleNavClick('jobs')} className="block w-full text-left py-3 text-gray-700 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-800">Jobs</button>
           <button onClick={() => handleNavClick('admin-jobs')} className="block w-full text-left py-3 text-gray-700 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-800">Admin</button>
           <button onClick={() => handleNavClick('settings')} className="block w-full text-left py-3 text-gray-700 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-800">Settings</button>
           
           {isAuthenticated && (
             <button onClick={logout} className="block w-full text-left py-3 text-red-600 font-medium mt-2">Logout</button>
           )}
        </div>
      )}
    </nav>
  );
};
