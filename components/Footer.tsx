
import React from 'react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              Artists<span className="text-brand-orange">Social</span>
            </span>
            <p className="text-sm text-gray-500 mt-2">Connecting creativity worldwide.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <a href="#" onClick={(e) => handleNav(e, 'terms')} className="hover:text-brand-orange transition-colors">Terms of Service</a>
            <a href="#" onClick={(e) => handleNav(e, 'privacy')} className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <a href="#" onClick={(e) => handleNav(e, 'contact')} className="hover:text-brand-orange transition-colors">Contact Us</a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Artists Social Media. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
