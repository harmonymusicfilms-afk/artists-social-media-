
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
  // Dynamically render icon
  const Icon = (icons as any)[iconName] || icons.CircleHelp || icons.Info;
  const [isHovered, setIsHovered] = useState(false);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleExploreClick}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-4 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
            {Icon ? <Icon size={24} /> : <span>?</span>}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-orange group-hover:scale-105 transition-all duration-300 origin-left">
            {title}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
          {desc}
        </p>

        <div className={`flex items-center gap-2 text-sm font-semibold text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity transform ${isHovered ? 'translate-x-0' : '-translate-x-4'}`}>
            <span>Explore</span>
            <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};
