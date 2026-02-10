
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Menu, X, Sun, Moon, LogOut, User as UserIcon, LayoutDashboard, Briefcase, Compass, Home, Settings, ChevronDown } from 'lucide-react';
import { CURRENT_USER_PROFILE } from '../constants';

interface NavbarProps {
  onNavigate: (page: string, sectionId?: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll detection for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close profile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: string, sectionId?: string) => {
    onNavigate(page, sectionId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { 
      name: 'Home', 
      icon: Home, 
      action: () => handleNavClick('dashboard', 'dashboard-top'),
      isActive: currentPage === 'dashboard' 
    },
    { 
      name: 'Explore', 
      icon: Compass, 
      action: () => handleNavClick('dashboard', 'explore-section'),
      isActive: false 
    },
    { 
      name: 'Jobs', 
      icon: Briefcase, 
      action: () => handleNavClick('jobs', 'jobs-top'),
      isActive: currentPage === 'jobs' 
    },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => handleNavClick('dashboard', 'dashboard-top')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-red-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <span className="font-bold text-xl">A</span>
            </div>
            <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
              Artists<span className="text-brand-orange">Social</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  link.isActive
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <link.icon size={16} />
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated && user ? (
              <div className="relative" ref={profileMenuRef}>
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:shadow-md transition-all group"
                >
                  <img 
                    src={CURRENT_USER_PROFILE.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover border-2 border-brand-orange"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-gray-900 dark:text-white leading-none">{user.name}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Online</p>
                  </div>
                  <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button onClick={() => { handleNavClick('dashboard', 'dashboard-top'); setIsProfileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-2">
                      <LayoutDashboard size={16} /> Dashboard
                    </button>
                    <button onClick={() => { handleNavClick('user-profile'); setIsProfileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-2">
                      <UserIcon size={16} /> My Profile
                    </button>
                    <button onClick={() => { handleNavClick('settings'); setIsProfileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-2">
                      <Settings size={16} /> Settings
                    </button>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                    <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => handleNavClick('auth')}
                className="px-6 py-2.5 bg-brand-orange text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
             <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-colors ${
                  link.isActive
                    ? 'bg-brand-orange/10 text-brand-orange'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <link.icon size={20} />
                {link.name}
              </button>
            ))}
            
            <div className="border-t border-gray-100 dark:border-gray-800 my-4"></div>
            
            {isAuthenticated ? (
              <>
                <button onClick={() => handleNavClick('user-profile')} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <UserIcon size={20} /> My Profile
                </button>
                <button onClick={() => handleNavClick('settings')} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Settings size={20} /> Settings
                </button>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                  <LogOut size={20} /> Sign Out
                </button>
              </>
            ) : (
              <button 
                onClick={() => handleNavClick('auth')}
                className="w-full py-3 bg-brand-orange text-white font-bold rounded-xl shadow-md"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
