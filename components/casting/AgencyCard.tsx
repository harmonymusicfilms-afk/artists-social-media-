
import React from 'react';
import { MapPin, Globe, Star, Mail, CheckCircle } from 'lucide-react';
import { CastingAgency } from '../../types';

interface AgencyCardProps {
    agency: CastingAgency;
    onContact?: (agency: CastingAgency) => void;
}

export const AgencyCard: React.FC<AgencyCardProps> = ({ agency, onContact }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
        <div className="relative h-32 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:h-36 transition-all duration-300">
            <div className="absolute -bottom-10 left-6">
                <img src={agency.image} alt={agency.name} className="w-20 h-20 rounded-xl border-4 border-white dark:border-gray-800 object-cover shadow-md bg-white" />
            </div>
            {agency.verified && (
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-bold flex items-center gap-1">
                    <CheckCircle size={12} className="fill-blue-500 text-white" /> Verified
                </div>
            )}
        </div>
        <div className="pt-12 px-6 pb-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-casting-primary transition-colors">{agency.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin size={12} /> {agency.location}
                    </p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded text-xs font-bold text-yellow-700 dark:text-yellow-400">
                    <Star size={10} className="fill-current" /> {agency.rating}
                </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">{agency.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                {agency.specialties.map(spec => (
                    <span key={spec} className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-[10px] font-bold uppercase tracking-wider rounded border border-purple-100 dark:border-purple-800">
                        {spec}
                    </span>
                ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button onClick={() => onContact?.(agency)} className="flex-1 py-2.5 bg-casting-primary text-white text-sm font-bold rounded-lg hover:bg-casting-accent transition-colors shadow-sm">
                    Contact Agency
                </button>
                {agency.contact.website && (
                    <a href={`https://${agency.contact.website}`} target="_blank" rel="noreferrer" className="p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-casting-primary hover:border-casting-primary transition-all bg-gray-50 dark:bg-gray-700/50">
                        <Globe size={18} />
                    </a>
                )}
            </div>
        </div>
    </div>
);
