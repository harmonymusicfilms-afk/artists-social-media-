
import React from 'react';
import { Job } from '../types';
import { MapPin, Clock, Briefcase, Heart, Star } from 'lucide-react';

interface JobCardProps {
  job: Job;
  variant?: 'vertical' | 'horizontal' | 'featured';
  onClick: (job: Job) => void;
  isLoading?: boolean;
  isSaved?: boolean;
  onSave?: (e: React.MouseEvent, jobId: number) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, variant = 'vertical', onClick, isLoading, isSaved = false, onSave }) => {
  const isHorizontal = variant === 'horizontal';
  const isFeatured = variant === 'featured';
  const isCompact = isHorizontal || isFeatured;

  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm animate-pulse flex flex-col ${isCompact ? 'w-[300px] shrink-0 h-[260px]' : 'w-full'}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="w-full pr-4">
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mb-3" />
            <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md" />
          </div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />
        </div>
        <div className="space-y-3 mb-6 flex-grow">
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(job)}
      className={`
        group relative rounded-xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm
        transition-all duration-300 cursor-pointer hover:shadow-md hover:border-brand-orange/30
        ${isCompact ? 'w-[300px] shrink-0 flex flex-col justify-between' : 'w-full'}
      `}
    >
      {isFeatured && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-br-lg rounded-tl-lg flex items-center gap-1 uppercase tracking-wider">
            <Star size={10} className="fill-current" /> FEATURED
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div className="pr-8"> 
          <span className={`
            inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2
            ${job.type === 'Remote' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 
              job.type === 'Full Time' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}
          `}>
            {job.type}
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-orange transition-colors line-clamp-1">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{job.company}</p>
        </div>
        
        {/* Save Button */}
        {onSave && (
          <button 
            onClick={(e) => onSave(e, job.id)}
            className={`p-2 rounded-full transition-colors -mr-2 -mt-2 z-10 relative
              ${isSaved 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        )}
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <MapPin size={14} className="mr-2 shrink-0 text-gray-400" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Briefcase size={14} className="mr-2 shrink-0 text-gray-400" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock size={14} className="mr-2 shrink-0 text-gray-400" />
          <span>{job.postedAt}</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex -space-x-2">
           {[1,2,3].map(i => (
             <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700" />
           ))}
        </div>
        <span className="text-xs font-bold text-brand-orange group-hover:translate-x-1 transition-transform">
          View Details &rarr;
        </span>
      </div>
    </div>
  );
};
