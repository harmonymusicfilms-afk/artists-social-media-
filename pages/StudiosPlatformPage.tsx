import React, { useState, useEffect, useMemo } from 'react';
import { Studio } from '../types';
import { MOCK_STUDIOS } from '../constants';
import { StudioCard } from '../components/studios/StudioCard';
import { StudioProfile } from '../components/studios/StudioProfile';
import { Search, MapPin, SlidersHorizontal, Plus, ArrowLeft } from 'lucide-react';

interface StudiosPlatformPageProps {
    initialStudioId?: string | null;
    onNavigate: (page: string) => void;
}

export const StudiosPlatformPage: React.FC<StudiosPlatformPageProps> = ({ initialStudioId, onNavigate }) => {
    const [studios, setStudios] = useState<Studio[]>(MOCK_STUDIOS);
    const [selectedStudioId, setSelectedStudioId] = useState<string | null>(initialStudioId || null);

    const [filters, setFilters] = useState({
        searchTerm: '',
        location: '',
        type: 'All'
    });

    useEffect(() => {
        if (initialStudioId) {
            setSelectedStudioId(initialStudioId);
        }
    }, [initialStudioId]);

    const filteredStudios = useMemo(() => {
        return studios.filter(studio => {
            const searchTermMatch = filters.searchTerm === '' || 
                                    studio.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                                    studio.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const locationMatch = filters.location === '' || 
                                  studio.location.toLowerCase().includes(filters.location.toLowerCase());
            const typeMatch = filters.type === 'All' || studio.type === filters.type;
            return searchTermMatch && locationMatch && typeMatch;
        });
    }, [filters, studios]);
    
    const selectedStudio = useMemo(() => {
        return studios.find(s => s.id === selectedStudioId) || null;
    }, [selectedStudioId, studios]);

    const studioTypes = ['All', 'Recording', 'Video', 'Jam Room', 'Photography', 'Dance'];

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters(prev => ({...prev, [e.target.name]: e.target.value }));
    }

    if (selectedStudio) {
        return <StudioProfile studio={selectedStudio} onBack={() => setSelectedStudioId(null)} />;
    }

    return (
        <div id="studios-platform-top" className="min-h-screen bg-gray-50 dark:bg-brand-darker pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <button 
                    onClick={() => onNavigate('dashboard')} 
                    className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold hover:text-brand-orange mb-6 transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                        Find Your Creative Space
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover and book professional recording, video, and rehearsal studios near you.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 mb-10 flex flex-col md:flex-row gap-4 items-center sticky top-20 z-10">
                    <div className="relative flex-1 w-full">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            name="searchTerm"
                            value={filters.searchTerm}
                            onChange={handleFilterChange}
                            type="text"
                            placeholder="Search by studio name or keyword..."
                            className="w-full p-3 pl-10 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg outline-none focus:ring-2 focus:ring-brand-orange"
                        />
                    </div>
                     <div className="relative flex-1 w-full">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            type="text"
                            placeholder="Location (e.g., Mumbai)"
                            className="w-full p-3 pl-10 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg outline-none focus:ring-2 focus:ring-brand-orange"
                        />
                    </div>
                     <div className="relative flex-1 w-full">
                        <SlidersHorizontal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="w-full p-3 pl-10 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg outline-none focus:ring-2 focus:ring-brand-orange appearance-none"
                        >
                            {studioTypes.map(type => <option key={type} value={type}>{type === 'All' ? 'All Studio Types' : type}</option>)}
                        </select>
                    </div>
                     <button className="w-full md:w-auto px-6 py-3 bg-brand-orange text-white font-bold rounded-lg shadow-lg hover:bg-brand-orange/90 flex items-center justify-center gap-2">
                        <Plus size={18} /> Add Your Studio
                    </button>
                </div>
                
                {/* Studio Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredStudios.map(studio => (
                        <StudioCard key={studio.id} studio={studio} onSelect={setSelectedStudioId} />
                    ))}
                </div>

                {filteredStudios.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <h3 className="text-xl font-bold">No Studios Found</h3>
                        <p>Try adjusting your search filters to find more creative spaces.</p>
                    </div>
                )}
            </div>
        </div>
    );
};