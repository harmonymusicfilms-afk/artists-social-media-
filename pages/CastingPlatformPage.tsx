import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Mic, Clapperboard, Briefcase, Building, ArrowLeft } from 'lucide-react';
import { CastingArtist, CastingProject } from '../types';
import { MOCK_CASTING_ARTISTS, MOCK_CASTING_PROJECTS } from '../constants';
import { CastingArtistCard } from '../components/casting/ArtistCard';
import { ProjectCard } from '../components/casting/ProjectCard';
import { Skeleton } from '../components/ui/Skeleton';
import { ArtistDetailModal } from '../components/casting/ArtistDetailModal';
import { ProjectDetailModal } from '../components/casting/ProjectDetailModal';
import { CastingFilters } from '../components/casting/CastingFilters';

interface CastingPlatformPageProps {
  onNavigate: (page: string) => void;
}

export const CastingPlatformPage: React.FC<CastingPlatformPageProps> = ({ onNavigate }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Artists');
    
    const [selectedArtist, setSelectedArtist] = useState<CastingArtist | null>(null);
    const [selectedProject, setSelectedProject] = useState<CastingProject | null>(null);

    const [filters, setFilters] = useState({
      keyword: '',
      location: '',
      category: 'All',
      gender: 'All',
      projectType: 'All',
    });

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, [activeTab, filters]);

    const filteredArtists = useMemo(() => {
        return MOCK_CASTING_ARTISTS.filter(artist => {
            const keywordMatch = filters.keyword === '' || 
                                 artist.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                                 artist.skills.some(skill => skill.toLowerCase().includes(filters.keyword.toLowerCase()));
            const locationMatch = filters.location === '' || artist.city.toLowerCase().includes(filters.location.toLowerCase());
            const categoryMatch = filters.category === 'All' || artist.category === filters.category;
            const genderMatch = filters.gender === 'All' || artist.gender === filters.gender;
            return keywordMatch && locationMatch && categoryMatch && genderMatch;
        });
    }, [filters]);

    const filteredProjects = useMemo(() => {
        return MOCK_CASTING_PROJECTS.filter(project => {
             const keywordMatch = filters.keyword === '' || 
                                 project.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                                 project.agency.toLowerCase().includes(filters.keyword.toLowerCase());
            const locationMatch = filters.location === '' || project.location.toLowerCase().includes(filters.location.toLowerCase());
            const typeMatch = filters.projectType === 'All' || project.type === filters.projectType;
            return keywordMatch && locationMatch && typeMatch;
        });
    }, [filters]);

    const tabs = [
        { name: 'Artists', icon: Mic },
        { name: 'Projects', icon: Clapperboard },
        { name: 'Agencies', icon: Briefcase },
        { name: 'Studios', icon: Building }
    ];

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${activeTab === 'Artists' ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
                    {Array(8).fill(0).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className={`w-full ${activeTab === 'Artists' ? 'aspect-[3/4]' : 'h-48'} rounded-lg`} />
                            <Skeleton className="h-5 w-3/4 rounded-md" />
                            <Skeleton className="h-4 w-1/2 rounded-md" />
                        </div>
                    ))}
                </div>
            );
        }

        switch (activeTab) {
            case 'Artists':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredArtists.map(artist => <CastingArtistCard key={artist.id} artist={artist} onViewProfile={() => setSelectedArtist(artist)} />)}
                    </div>
                );
            case 'Projects':
                return (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map(project => <ProjectCard key={project.id} project={project} onViewDetails={() => setSelectedProject(project)} />)}
                    </div>
                );
            case 'Agencies':
            case 'Studios':
                return (
                    <div className="text-center py-20 text-casting-text-light">
                        <h3 className="text-2xl font-bold text-casting-text-dark">Coming Soon!</h3>
                        <p>The {activeTab} directory is currently under construction.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-casting-bg text-casting-text-dark min-h-screen">
            <main>
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white bg-casting-secondary overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30" style={{backgroundImage: "url('https://picsum.photos/1920/1080?random=99')"}} />
                    <div className="absolute inset-0 bg-gradient-to-t from-casting-secondary via-casting-secondary/70 to-transparent" />
                    
                    {/* Back Button Overlay */}
                    <button 
                        onClick={() => onNavigate('dashboard')} 
                        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white font-semibold transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
                    >
                        <ArrowLeft size={18} /> Back to Dashboard
                    </button>

                    <div className="relative z-10 px-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                            ALL ARTIST CASTING AGENCY STUDIOZ
                        </h1>
                        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
                            India’s most powerful digital ecosystem for casting, talent discovery, and production.
                        </p>
                    </div>
                </section>

                {/* Search Bar */}
                <div className="transform -translate-y-1/2 z-20 relative px-4">
                    <div className="max-w-4xl mx-auto bg-casting-card shadow-2xl rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 border border-gray-200/50">
                        <div className="w-full flex-1 relative">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-casting-text-light" />
                            <input 
                              type="text" 
                              placeholder="Search artists, roles..." 
                              className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none text-casting-text-dark" 
                              value={filters.keyword}
                              onChange={(e) => setFilters(f => ({ ...f, keyword: e.target.value }))}
                            />
                        </div>
                        <div className="w-full md:w-px h-px md:h-8 bg-gray-200" />
                        <div className="w-full flex-1 relative">
                            <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-casting-text-light" />
                             <input 
                              type="text" 
                              placeholder="Location (e.g., Mumbai)" 
                              className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none text-casting-text-dark"
                              value={filters.location}
                              onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                            />
                        </div>
                        <button className="w-full md:w-auto px-10 py-3 bg-casting-primary text-white font-bold rounded-lg hover:bg-casting-accent transition-colors duration-300">
                            Search
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-12">
                    {/* Tabs */}
                    <div className="flex justify-center border-b border-gray-200">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-colors
                                        ${activeTab === tab.name
                                            ? 'border-b-2 border-casting-primary text-casting-primary'
                                            : 'text-casting-text-light hover:text-casting-text-dark'
                                        }
                                    `}
                                >
                                    <Icon size={16} />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Filters */}
                    <CastingFilters
                      activeTab={activeTab}
                      filters={filters}
                      onFilterChange={setFilters}
                    />

                    {/* Content Grid */}
                    <div className="mt-8">
                        {renderContent()}
                    </div>
                </section>
            </main>
            
            {selectedArtist && (
                <ArtistDetailModal 
                    artist={selectedArtist}
                    onClose={() => setSelectedArtist(null)}
                />
            )}

            {selectedProject && (
                <ProjectDetailModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
};