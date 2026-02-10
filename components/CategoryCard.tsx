
import React, { useState } from 'react';
import * as icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  desc: string;
  details?: string;
  iconName: string;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, desc, details, iconName, onClick }) => {
  // Dynamically render icon with fallback to Info
  const Icon = (icons as any)[iconName] || icons.Info;
  const [isHovered, setIsHovered] = useState(false);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm 
      transition-all duration-500 ease-out cursor-pointer overflow-hidden flex flex-col h-full
      hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.3)] dark:hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)]
      hover:-translate-y-[4px] hover:scale-[1.03]
      hover:border-brand-orange/60 dark:hover:border-brand-green/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleExploreClick}
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-transparent dark:from-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Pulsing Border Aura */}
      <div className="absolute inset-0 rounded-xl border-2 border-brand-orange/20 dark:border-brand-green/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse pointer-events-none transition-opacity duration-500" />

      <div className="p-6 flex flex-col h-full relative z-10">
        
        {/* Header: Icon + Title */}
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center text-gray-500 dark:text-gray-400 
              group-hover:bg-brand-orange/10 group-hover:text-brand-orange dark:group-hover:bg-brand-green/10 dark:group-hover:text-brand-green
              group-hover:ring-1 group-hover:ring-brand-orange/50 dark:group-hover:ring-brand-green/50
              group-hover:scale-110 transition-all duration-500 shrink-0">
                {Icon ? <Icon size={24} /> : <span>?</span>}
            </div>
            
            {/* Title with color change and slight scale on hover */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white
              group-hover:text-brand-orange dark:group-hover:text-brand-green 
              group-hover:scale-[1.02] origin-left
              transition-all duration-300 leading-tight">
                {title}
            </h3>
        </div>
        
        {/* Description Area: Swaps between short one-line and detailed multi-line */}
        <div className="relative mb-4 flex-grow min-h-[3.5rem]">
             {/* Default Short Description (Visible when not hovered) */}
             <p className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-all duration-300 absolute top-0 left-0 w-full ${isHovered ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'} line-clamp-2`}>
                {desc || "Discover opportunities in this category."}
             </p>
             
             {/* Detailed Description (Visible on hover) */}
             <p className={`text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-300 absolute top-0 left-0 w-full ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'} line-clamp-4`}>
                {details || desc || "Discover opportunities in this category."}
             </p>
        </div>

        <div className={`flex items-center gap-2 text-sm font-semibold text-brand-orange dark:text-brand-green opacity-0 group-hover:opacity-100 transition-all duration-500 transform ${isHovered ? 'translate-x-0' : '-translate-x-4'} mt-auto`}>
            <span>Explore</span>
            <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};
