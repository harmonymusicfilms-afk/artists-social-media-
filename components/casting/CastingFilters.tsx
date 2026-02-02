import React from 'react';
import { Filter } from 'lucide-react';

interface CastingFiltersProps {
    activeTab: string;
    filters: any;
    onFilterChange: React.Dispatch<React.SetStateAction<any>>;
}

export const CastingFilters: React.FC<CastingFiltersProps> = ({ activeTab, filters, onFilterChange }) => {
    
    const handleReset = () => {
        onFilterChange({
            keyword: filters.keyword,
            location: filters.location,
            category: 'All',
            gender: 'All',
            projectType: 'All',
        });
    };
    
    if (activeTab === 'Agencies' || activeTab === 'Studios') {
        return null;
    }

    return (
        <div className="pt-8">
            <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-2 font-semibold text-casting-text-dark">
                    <Filter size={18} />
                    Filters:
                </span>
                
                {activeTab === 'Artists' && (
                    <>
                        <select 
                            value={filters.category} 
                            onChange={e => onFilterChange(f => ({ ...f, category: e.target.value }))}
                            className="bg-casting-card border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-casting-primary"
                        >
                            <option value="All">All Categories</option>
                            <option value="Actor">Actor</option>
                            <option value="Model">Model</option>
                            <option value="Dancer">Dancer</option>
                            <option value="Singer">Singer</option>
                            <option value="Influencer">Influencer</option>
                        </select>
                         <select 
                            value={filters.gender} 
                            onChange={e => onFilterChange(f => ({ ...f, gender: e.target.value }))}
                            className="bg-casting-card border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-casting-primary"
                        >
                            <option value="All">Any Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </>
                )}

                {activeTab === 'Projects' && (
                     <select 
                        value={filters.projectType}
                        onChange={e => onFilterChange(f => ({ ...f, projectType: e.target.value }))}
                        className="bg-casting-card border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-casting-primary"
                    >
                        <option value="All">All Project Types</option>
                        <option value="Film">Film</option>
                        <option value="Ad">Ad</option>
                        <option value="Music Video">Music Video</option>
                        <option value="OTT">OTT</option>
                     </select>
                )}

                <button onClick={handleReset} className="text-sm text-casting-text-light hover:text-casting-primary underline">
                    Reset
                </button>
            </div>
        </div>
    );
};