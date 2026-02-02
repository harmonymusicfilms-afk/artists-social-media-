import React from 'react';
import { Studio } from '../../types';
import { MapPin, Star, Mic, Video, Guitar, Camera, Footprints } from 'lucide-react';

interface StudioCardProps {
    studio: Studio;
    onSelect: (id: string) => void;
}

const typeIcons = {
    'Recording': Mic,
    'Video': Video,
    'Jam Room': Guitar,
    'Photography': Camera,
    'Dance': Footprints
};

export const StudioCard: React.FC<StudioCardProps> = ({ studio, onSelect }) => {
    const Icon = typeIcons[studio.type] || Mic;

    return (
        <div 
            onClick={() => onSelect(studio.id)}
            className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
            <div className="relative aspect-video">
                <img src={studio.coverPhoto} alt={studio.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded-full">
                    <Star size={12} className="text-amber-400 fill-current" />
                    <span>{studio.rating.toFixed(1)}</span>
                </div>
                 <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded-full">
                    <Icon size={12} />
                    <span>{studio.type}</span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate group-hover:text-brand-orange">{studio.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-1">
                    <MapPin size={14} /> {studio.location}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Starts from</p>
                        <p className="font-bold text-gray-800 dark:text-gray-200">₹{studio.pricing.hourly || 'N/A'}<span className="text-sm font-normal text-gray-500">/hr</span></p>
                    </div>
                    <button className="px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-bold rounded-lg hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange transition-colors">
                        View
                    </button>
                </div>
            </div>
        </div>
    );
};
