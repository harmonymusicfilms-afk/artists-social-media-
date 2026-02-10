
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Hero } from '../components/Hero';
import { CategoryCard } from '../components/CategoryCard';
import { Skeleton } from '../components/ui/Skeleton';
import { CATEGORIES, MOCK_VIDEOS, MOCK_STUDIOS, USER_PROFILES } from '../constants';
import { X, Heart, Share2, MapPin, Clock, Edit, Star as StarIcon, ChevronLeft, ChevronRight, Youtube, TrendingUp, BadgeCheck, Search, Zap } from 'lucide-react';
import { Artist, UserProfile, Video, Studio } from '../types';

interface Project {
  id: number;
  title: string;
  desc: string;
  img: string;
  location: string;
  tags: string[];
}

interface DashboardProps {
  onNavigate: (page: string, sectionId?: string, data?: { artist?: Artist, studioId?: string }) => void;
}

const WeTubeVideoCard: React.FC<{ video: Video; onNavigate: (page: string, sectionId?: string) => void; }> = ({ video, onNavigate }) => {
    return (
        <div 
            onClick={() => onNavigate('we-tube', 'we-tube-top')}
            className="w-72 shrink-0 group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div className="relative aspect-video overflow-hidden">
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-1.5 py-0.5 rounded">{video.duration}</span>
            </div>
            <div className="p-4 flex gap-3">
                <img src={video.creator.avatar} alt={video.creator.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"/>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug text-sm group-hover:text-brand-orange transition-colors">{video.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{video.creator.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>{video.stats.views.toLocaleString()} views</span>
                        <span className="flex items-center gap-1"><Heart size={10} className="fill-current" /> {video.stats.likes.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WeTubeCreatorPill: React.FC<{ profile: UserProfile; onNavigate: (page: string, sectionId?: string) => void; }> = ({ profile, onNavigate }) => (
    <div 
        onClick={() => onNavigate('we-tube', 'we-tube-top')}
        className="flex flex-col items-center gap-3 w-24 shrink-0 cursor-pointer group"
    >
        <div className="relative p-1 rounded-full border-2 border-transparent group-hover:border-brand-orange transition-colors">
            <img src={profile.avatar} alt={profile.displayName} className="w-16 h-16 rounded-full object-cover" />
             <BadgeCheck size={18} className="absolute bottom-0 right-0 text-white bg-blue-500 rounded-full" />
        </div>
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white truncate w-full text-center">{profile.displayName}</p>
    </div>
);


export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const userProfile = useMemo(() => {
    if (!user?.profileId) return null;
    return USER_PROFILES.find(p => p.id === user.profileId);
  }, [user]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [likedProjects, setLikedProjects] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('likedProjects');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
  }, [likedProjects]);

  const toggleLike = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    setLikedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };
  
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Services', 'Learning', 'Business', 'Community'];

  const [weTubeFilter, setWeTubeFilter] = useState('Latest');
  const [weTubeSearch, setWeTubeSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    
    // Construct a valid URL using the current origin to avoid "Invalid URL" errors
    // Check for 'null' origin which happens in some sandboxed environments
    let origin = 'https://artist.social';
    if (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null' && window.location.origin !== 'undefined') {
        origin = window.location.origin;
    }
    const shareUrl = `${origin}/project/${project.id}`;
    
    const shareData = { 
        title: project.title, 
        text: project.desc, 
        url: shareUrl 
    };

    if (navigator.share) {
      try { 
        await navigator.share(shareData); 
      } catch (err) { 
        console.error("Share failed or was canceled:", err);
      }
    } else {
      try { 
        await navigator.clipboard.writeText(shareUrl); 
        alert(`Link copied to clipboard: ${shareUrl}`); 
      } catch (err) { 
        console.error("Clipboard failed:", err);
        alert("Failed to copy link. Please try again.");
      }
    }
  };

  const handleEditProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Placeholder for edit functionality
    alert("Edit functionality coming soon!");
  };

  const filteredCategories = activeTab === 'All' 
    ? CATEGORIES 
    : CATEGORIES.filter(cat => cat.category === activeTab);

  const showcaseProjects: Project[] = [
    { id: 1, title: "Neon Dreams", desc: "Cyberpunk aesthetic photography series capturing the nightlife of Tokyo.", img: "https://picsum.photos/600/400?random=101", location: "Tokyo, JP", tags: ["Photography", "Night"] },
    { id: 2, title: "Abstract Flow", desc: "Fluid acrylics on large canvas exploring emotion through color.", img: "https://picsum.photos/600/400?random=102", location: "New York, NY", tags: ["Art", "Abstract"] },
    { id: 3, title: "Urban Jungle", desc: "Street art documentation in NYC focusing on hidden murals.", img: "https://picsum.photos/600/400?random=103", location: "Paris, FR", tags: ["Street Art", "Mural"] },
    { id: 4, title: "Sculpted Silence", desc: "Modern minimalist stone sculptures designed for zen gardens.", img: "https://picsum.photos/600/400?random=104", location: "Kyoto, JP", tags: ["Sculpture", "Minimal"] }
  ];

  const topStudios: Studio[] = MOCK_STUDIOS.slice(0, 5);
  
  const approvedVideos = useMemo(() => MOCK_VIDEOS.filter(v => v.status === 'approved'), [MOCK_VIDEOS]);
  const featuredVideo = useMemo(() => approvedVideos[0], [approvedVideos]);
  
  const weTubeVideos = useMemo(() => {
    let videos = [...approvedVideos];
    if (weTubeSearch.trim()) {
        const query = weTubeSearch.toLowerCase();
        videos = videos.filter(v => v.title.toLowerCase().includes(query) || v.creator.name.toLowerCase().includes(query));
    }
    if (weTubeFilter === 'Trending') {
      return videos.sort((a, b) => b.stats.views - a.stats.views);
    }
    return videos;
  }, [weTubeFilter, approvedVideos, weTubeSearch]);

  const verifiedCreators = useMemo(() => USER_PROFILES.filter(p => p.weTubeVerificationStatus === 'verified'), [USER_PROFILES]);
  const studiosScrollRef = useRef<HTMLDivElement>(null);

  const handleStudiosScroll = (direction: 'left' | 'right') => {
      if (studiosScrollRef.current) {
          const scrollAmount = direction === 'left' ? -350 : 350;
          studiosScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
  };

  return (
    <div id="dashboard-top" className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Hero />
      
      <main className="max-w-7xl mx-auto px-6 relative z-20 -mt-20">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, <span className="text-brand-orange">{user?.name}</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Your Role: <span className="font-semibold text-brand-green">{userProfile?.platformRole}</span>.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('user-profile')}
            className="px-8 py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-md"
          >
            My Profile
          </button>
        </div>

        {/* --- EXPLORE GRID --- */}
        <div id="explore-section" className="mb-24 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Explore Categories
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Find services, jobs, and community.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeTab === tab 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-transparent shadow-md' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-orange'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {isLoading ? (
               Array(8).fill(0).map((_, i) => (
                 <div key={i} className="h-64 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                    <Skeleton className="w-3/4 h-5 mb-2" />
                    <Skeleton className="w-full h-4" />
                 </div>
               ))
             ) : (
                filteredCategories.map((cat) => (
                  <CategoryCard 
                    key={cat.id}
                    title={cat.title}
                    desc={cat.desc}
                    details={cat.details}
                    iconName={cat.icon}
                    onClick={() => {
                        if (cat.path) {
                            onNavigate(cat.path, `${cat.path}-top`);
                        }
                    }}
                  />
                ))
             )}
          </div>
        </div>

        {/* Trending Artists */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Trending Artists</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             {isLoading ? (
               Array(4).fill(0).map((_, i) => (
                 <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse border border-gray-200 dark:border-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md" />
                        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md" />
                    </div>
                 </div>
               ))
             ) : (
                [1,2,3,4].map((i) => (
                  <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                    <img 
                      src={`https://picsum.photos/400/600?random=${i + 10}`} 
                      alt="Artist work" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-white">
                       <h4 className="font-bold text-lg">Artist {i}</h4>
                       <p className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-75">View Profile</p>
                    </div>
                  </div>
                ))
             )}
          </div>
        </div>

        {/* Project Showcase Section */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Project Showcase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
               Array(4).fill(0).map((_, i) => (
                 <div key={i} className="relative h-72 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5" />
                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md" />
                        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md" />
                    </div>
                </div>
               ))
             ) : (
                showcaseProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gray-900"
                  >
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    {/* Top Right Actions */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                        <button onClick={(e) => toggleLike(e, project.id)} className={`p-2 rounded-full backdrop-blur-md ${likedProjects.includes(project.id) ? 'bg-red-50 text-white' : 'bg-black/50 text-white hover:bg-red-500'}`}>
                            <Heart size={16} fill={likedProjects.includes(project.id) ? "currentColor" : "none"} />
                        </button>
                        <button onClick={(e) => handleShare(e, project)} className="p-2 bg-black/50 backdrop-blur-md hover:bg-brand-orange text-white rounded-full transition-colors">
                            <Share2 size={16} />
                        </button>
                    </div>

                    {/* Edit Project Button (Top Left) */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                      <button 
                        onClick={handleEditProject} 
                        className="bg-white/90 dark:bg-gray-800/90 text-black dark:text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm hover:bg-white dark:hover:bg-gray-700 flex items-center gap-1.5 transition-colors"
                      >
                        <Edit size={12} /> Edit Project
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-white font-bold text-lg mb-1">{project.title}</h4>
                       <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-2">
                           <MapPin size={12} className="text-brand-green" />
                           <span>{project.location}</span>
                       </div>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold rounded-sm backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                      </div>

                      <button 
                          onClick={() => setSelectedProject(project)}
                          className="w-full py-2 bg-white text-black text-xs font-bold rounded hover:bg-brand-orange hover:text-white transition-all"
                        >
                          View Details
                        </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
        
        {/* --- TOP STUDIOS SECTION --- */}
        <div className="mb-24">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Top Studios</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">High-fidelity recording environments.</p>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <button onClick={() => handleStudiosScroll('left')} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => handleStudiosScroll('right')} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div ref={studiosScrollRef} className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide -mx-6 px-6">
            {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                    <div key={i} className="w-80 h-[420px] rounded-2xl shrink-0 bg-white dark:bg-gray-800 flex flex-col shadow-sm">
                        <Skeleton className="h-56 w-full rounded-t-2xl" />
                        <div className="p-5 flex flex-col flex-grow">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-4" />
                        </div>
                    </div>
                ))
            ) : (
                topStudios.map(studio => (
                    <div 
                        key={studio.id} 
                        onClick={() => onNavigate('studios-platform', undefined, { studioId: studio.id })}
                        className="w-80 shrink-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col cursor-pointer transition-all duration-300"
                    >
                        <div className="relative h-56">
                            <img src={studio.coverPhoto} alt={studio.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                                <StarIcon size={12} className="fill-amber-400 text-amber-400" />
                                <span className="text-xs font-bold text-gray-900">{studio.rating}</span>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{studio.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-1">
                                <MapPin size={14} />
                                {studio.location}
                            </p>
                            <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Rate / Hr</p>
                                    <p className="text-lg font-bold text-brand-green">₹{studio.pricing.hourly}</p>
                                </div>
                                <button 
                                    className="px-4 py-2 border border-brand-orange text-brand-orange text-xs font-bold rounded hover:bg-brand-orange hover:text-white transition-all"
                                >
                                    Book
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            </div>
        </div>

        {/* --- WeTube Section --- */}
        <section id="wetube-dashboard" className="p-8 bg-gray-900 rounded-3xl overflow-hidden relative shadow-2xl">
            <div className="flex items-center justify-between mb-8 relative z-10 text-white">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-600 rounded-xl shadow-lg">
                        <Youtube className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">WeTube</h2>
                        <p className="text-gray-300 text-sm">Broadcast your creativity.</p>
                    </div>
                </div>
                <button onClick={() => onNavigate('we-tube', 'we-tube-top')} className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg text-sm hover:bg-gray-100 transition-all">
                    Enter
                </button>
            </div>
            
            {featuredVideo && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 relative z-10">
                <div className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-lg" onClick={() => onNavigate('we-tube', 'we-tube-top')}>
                    <img src={featuredVideo.thumbnailUrl} alt={featuredVideo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <Zap className="fill-red-600 text-red-600" size={32} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center text-white">
                    <p className="text-xs text-brand-orange font-bold uppercase tracking-wider mb-2">Featured Video</p>
                    <h3 className="text-3xl font-bold mb-4">{featuredVideo.title}</h3>
                    <p className="text-gray-300 mb-6 line-clamp-3">{featuredVideo.description}</p>
                    <button onClick={() => onNavigate('we-tube', 'we-tube-top')} className="self-start px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                        Watch Now
                    </button>
                </div>
            </div>
            )}
            
            {/* Controls */}
            <div className="mb-10 relative z-10">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        {['Latest', 'Trending'].map(filter => (
                            <button 
                                key={filter}
                                onClick={() => setWeTubeFilter(filter)} 
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors border ${weTubeFilter === filter ? 'bg-red-600 border-red-600 text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    
                    {/* Search Input */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="SEARCH..." 
                            value={weTubeSearch}
                            onChange={(e) => setWeTubeSearch(e.target.value)}
                            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-brand-orange outline-none text-sm placeholder:text-gray-500"
                        />
                    </div>
                 </div>
                 
                 {weTubeVideos.length > 0 ? (
                     <div className="flex overflow-x-auto gap-6 pb-4 -mx-6 px-6 scrollbar-hide">
                        {weTubeVideos.map(video => <WeTubeVideoCard key={video.id} video={video} onNavigate={onNavigate} />)}
                     </div>
                 ) : (
                     <div className="text-center py-10 text-gray-500">
                         <p>No video data found for query "{weTubeSearch}"</p>
                     </div>
                 )}
            </div>

            {/* Verified Creators */}
            <div className="relative z-10">
                 <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><BadgeCheck className="text-brand-orange" /> Verified Creators</h3>
                 <div className="flex overflow-x-auto gap-6 pb-4 -mx-6 px-6 scrollbar-hide">
                    {verifiedCreators.map(profile => <WeTubeCreatorPill key={profile.id} profile={profile} onNavigate={onNavigate} />)}
                 </div>
            </div>
        </section>

      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedProject(null)}
          />
          <div 
            className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-300"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="h-64 md:h-auto md:w-1/2 overflow-hidden relative">
               <img 
                 src={selectedProject.img} 
                 alt={selectedProject.title} 
                 className="w-full h-full object-cover"
               />
            </div>
            
            {/* Content Section */}
            <div className="flex-1 overflow-y-auto md:w-1/2 p-8 md:p-10 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                     <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                       {selectedProject.title}
                     </h2>
                     <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                       <span className="flex items-center gap-1 text-brand-green"><Clock size={14} /> 2 days left</span>
                       <span className="flex items-center gap-1"><MapPin size={14} /> {selectedProject.location}</span>
                     </div>
                  </div>
                  
                  <div className="flex gap-2 shrink-0">
                     <button 
                        onClick={(e) => toggleLike(e, selectedProject.id)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors border ${
                          likedProjects.includes(selectedProject.id)
                            ? 'bg-red-50 text-red-500 border-red-200'
                            : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                        }`}
                     >
                       <Heart size={20} fill={likedProjects.includes(selectedProject.id) ? "currentColor" : "none"} />
                     </button>
                     <button 
                        onClick={(e) => handleShare(e, selectedProject)}
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                     >
                       <Share2 size={20} />
                     </button>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-200 dark:bg-gray-700 mb-6" />

                <div className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
                    {selectedProject.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img src={`https://picsum.photos/100/100?random=${selectedProject.id + 50}`} className="w-full h-full object-cover" alt="Artist" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">Artist Name</p>
                          <p className="text-xs text-green-600 font-medium">Open for Commissions</p>
                        </div>
                     </div>
                     <button className="px-5 py-2 bg-brand-orange text-white text-sm font-bold rounded hover:bg-orange-600 transition-colors shadow-sm">
                       Contact
                     </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
