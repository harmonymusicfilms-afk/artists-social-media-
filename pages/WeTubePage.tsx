
import React, { useState, useMemo } from 'react';
import { CURRENT_USER_PROFILE, USER_PROFILES } from '../constants';
import { Video, UserProfile } from '../types';
import { VideoGridItem } from '../components/wetube/VideoGridItem';
import { VideoDetailView } from '../components/wetube/VideoDetailView';
import { WeTubeSidebar } from '../components/wetube/WeTubeSidebar';
import { ShortsPlayer } from '../components/wetube/ShortsPlayer';
import { SubmitVideoModal } from '../components/wetube/SubmitVideoModal';
import { CreateChannelModal } from '../components/wetube/CreateChannelModal';
import { TrendingView } from '../components/wetube/TrendingView';
import { SearchResultsView } from '../components/wetube/SearchResultsView';
import { WeTubeChannelPage } from './WeTubeChannelPage';
import { ArrowLeft, Search, Bell, Youtube as YoutubeIcon, Clapperboard, Upload, Play, TrendingUp, BadgeCheck, Plus, Tv, Filter, Flame, Clock, Grid } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useWeTubeData } from '../hooks/useWeTubeData';
import { apiCreateVideo } from '../lib/api';

interface WeTubePageProps {
  onNavigate: (page: string) => void;
}

// ... (Keeping helper components WeTubeHero, CategoryPills, HorizontalVideoShelf, VerifiedCreatorsShelf exactly as they were)
// Re-declaring them here for completeness of the file replacement

const WeTubeHero: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };
    return (
        <div className="relative w-full h-[320px] md:h-[400px] bg-gray-900 rounded-3xl overflow-hidden mb-10 shadow-2xl mx-auto">
            <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop" alt="WeTube Hero" className="w-full h-full object-cover opacity-50"/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full w-fit mb-6 backdrop-blur-sm animate-fade-in">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Live & Trending</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight animate-slide-up">Broadcast Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Creative Vision</span></h1>
                <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed font-light animate-slide-up" style={{ animationDelay: '0.1s' }}>Discover the latest videos, shorts, and live streams from verified creators worldwide.</p>
                <form onSubmit={handleSearch} className="relative w-full max-w-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg p-1">
                            <Search className="text-gray-400 ml-4" size={20} />
                            <input type="text" placeholder="Search videos..." className="w-full px-4 py-3 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500" value={query} onChange={(e) => setQuery(e.target.value)}/>
                            <button type="submit" className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-600 dark:hover:bg-red-600 transition-colors">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CategoryPills: React.FC<{ active: string, setActive: (c: string) => void }> = ({ active, setActive }) => {
  const categories = ['All', 'Music', 'Comedy', 'Vlogs', 'Gaming', 'News', 'Lifestyle', 'Tech', 'Education', 'Sports'];
  return (
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-4 pt-2 px-1">
       {categories.map(cat => (
         <button key={cat} onClick={() => setActive(cat)} className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm ${active === cat ? 'bg-red-600 text-white shadow-red-500/20 transform scale-105' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-red-500 hover:text-red-500'}`}>{cat}</button>
       ))}
    </div>
  );
};

const HorizontalVideoShelf: React.FC<{ title: string, icon: React.ElementType, videos: Video[], onSelectVideo: (v: Video) => void, onSelectChannel: (id: string) => void }> = ({ title, icon: Icon, videos, onSelectVideo, onSelectChannel }) => (
    <section className="mb-16">
        <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg text-red-600"><Icon size={24} /></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            </div>
            <button className="text-sm font-bold text-red-600 hover:text-red-700 dark:hover:text-red-400">View All</button>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-6 -mx-4 px-4 scrollbar-hide snap-x">
          {videos.map(video => (
            <div key={video.id} className="w-80 shrink-0 snap-center">
                <VideoGridItem video={video} onSelect={onSelectVideo} onSelectChannel={onSelectChannel} />
            </div>
          ))}
        </div>
    </section>
);

const VerifiedCreatorsShelf: React.FC<{ creators: UserProfile[], onSelectChannel: (id: string) => void }> = ({ creators, onSelectChannel }) => (
    <section className="mb-16 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-8">
          <BadgeCheck className="text-blue-500" size={28} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verified Creators</h2>
        </div>
         <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide">
            {creators.map(creator => (
                <div key={creator.id} onClick={() => onSelectChannel(creator.id)} className="flex flex-col items-center gap-3 w-32 shrink-0 cursor-pointer group">
                    <div className="relative p-1 rounded-full border-2 border-transparent group-hover:border-blue-500 transition-all duration-300">
                        <img src={creator.avatar} alt={creator.displayName} className="w-24 h-24 rounded-full object-cover shadow-md group-hover:shadow-xl transition-all" />
                         <BadgeCheck size={24} className="absolute bottom-1 right-1 text-white fill-blue-500 bg-white dark:bg-gray-900 rounded-full" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate w-full">{creator.displayName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">120K Subs</p>
                    </div>
                    <button className="px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Visit</button>
                </div>
            ))}
        </div>
    </section>
);

export const WeTubePage: React.FC<WeTubePageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { videos, shorts } = useWeTubeData(); // Get videos from API hook

  type View = 'home' | 'video' | 'shorts' | 'trending' | 'search' | 'channel';
  const [activeView, setActiveView] = useState<View>('home');
  const [previousView, setPreviousView] = useState<View>('home');
  
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedChannelProfile, setSelectedChannelProfile] = useState<UserProfile | null>(null);
  const [selectedShortIndex, setSelectedShortIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [mainFeedFilter, setMainFeedFilter] = useState<'Latest' | 'Popular'>('Latest');
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] = useState(false);
  const [hasChannel, setHasChannel] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Video[]>([]);

  const approvedVideos = useMemo(() => videos.filter(v => v.status === 'approved'), [videos]);
  const trendingVideos = useMemo(() => [...approvedVideos].sort((a,b) => b.stats.views - a.stats.views).slice(0,10), [approvedVideos]);
  const verifiedCreators = useMemo(() => USER_PROFILES.filter(p => p.weTubeVerificationStatus === 'verified'), []);

  const filteredVideos = useMemo(() => {
    let result = approvedVideos;
    if (activeCategory !== 'All') {
        result = result.filter(video => video.category === activeCategory);
    }
    if (mainFeedFilter === 'Popular') {
        return result.sort((a,b) => b.stats.likes - a.stats.likes);
    }
    return result; // Default Sort order from API
  }, [activeCategory, approvedVideos, mainFeedFilter]);

  const handleSelectVideo = (video: Video) => {
    if (video.status === 'pending') return;
    setPreviousView(activeView);
    setSelectedVideo(video);
    setActiveView('video');
    window.scrollTo(0, 0);
  };
  
  const handleSelectChannel = (profileId: string) => {
      const profile = USER_PROFILES.find(p => p.id === profileId); // In real app, fetch profile by ID
      if (profile) {
          setPreviousView(activeView === 'shorts' ? 'home' : activeView);
          setSelectedChannelProfile(profile);
          setActiveView('channel');
          window.scrollTo(0,0);
      }
  };

  const handleAddVideo = async (newVideo: Video) => {
    if (user?.id) {
        await apiCreateVideo(newVideo, user.id);
        alert('Video submitted for approval!');
        setIsSubmitModalOpen(false);
    }
  };

  const handleSelectShort = (index: number) => {
    setSelectedShortIndex(index);
    setPreviousView(activeView);
    setActiveView('shorts');
  };

  const handleBack = () => {
    setSelectedVideo(null);
    setSelectedChannelProfile(null);
    setActiveView(previousView);
  };
  
  const handleCloseShorts = () => {
    setSelectedShortIndex(null);
    setActiveView(previousView);
  }

  const handleSidebarNavigate = (view: 'home' | 'trending' | 'subscriptions' | 'library') => {
    if (view === 'home' || view === 'trending') {
      setActiveView(view);
    }
    setIsSidebarOpen(false);
  };

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const results = [...videos, ...shorts].filter(v => 
        (v.status === 'approved') && (
            v.title.toLowerCase().includes(lowerQuery) ||
            v.description.toLowerCase().includes(lowerQuery) ||
            v.creator.name.toLowerCase().includes(lowerQuery)
        )
    );
    setSearchResults(results);
    setActiveView('search');
  };

  const handleCreateChannel = (channelData: any) => {
      setHasChannel(true);
      alert(`Channel "${channelData.name}" created successfully!`);
  };

  const handleViewMyChannel = () => {
      if (user?.profileId) handleSelectChannel(user.profileId);
      setIsSidebarOpen(false);
  };

  const PageHeader: React.FC = () => {
    return (
     <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          {activeView !== 'home' && activeView !== 'trending' && (
             <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"><ArrowLeft size={22} /></button>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden">
            <YoutubeIcon size={24} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveView('home')}>
             <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Play size={16} fill="currentColor" />
             </div>
            <span className="hidden md:block text-xl font-bold tracking-tight text-gray-900 dark:text-white">WeTube</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
             <button onClick={() => { setSearchQuery(''); setActiveView('search'); }} className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 md:hidden">
                <Search size={20} />
             </button>
             <button onClick={() => hasChannel ? setIsSubmitModalOpen(true) : setIsCreateChannelModalOpen(true)} className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-full font-semibold text-sm transition-colors">
                {hasChannel ? <Upload size={18} /> : <Plus size={18} />}
                <span>{hasChannel ? 'Upload' : 'Create'}</span>
            </button>
             <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>
            <button onClick={() => onNavigate('user-profile')} className="ml-2 ring-2 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700 rounded-full transition-all">
                <img src={user?.profileId ? CURRENT_USER_PROFILE.avatar : 'https://picsum.photos/100/100?random=500'} className="w-9 h-9 rounded-full object-cover" />
            </button>
        </div>
      </header>
  )};

  const renderMainContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-12">
            <WeTubeHero onSearch={handleSearchSubmit} />
            <section>
                <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Grid size={20} className="text-red-500" /> Browse Categories
                    </h2>
                </div>
                <CategoryPills active={activeCategory} setActive={setActiveCategory} />
            </section>
            <HorizontalVideoShelf 
                title="Trending Now" 
                icon={TrendingUp} 
                videos={trendingVideos} 
                onSelectVideo={handleSelectVideo} 
                onSelectChannel={handleSelectChannel} 
            />
            <VerifiedCreatorsShelf creators={verifiedCreators} onSelectChannel={handleSelectChannel} />
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Videos</h2>
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                      <button onClick={() => setMainFeedFilter('Latest')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${mainFeedFilter === 'Latest' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'}`}><Clock size={16} /> Latest</button>
                      <button onClick={() => setMainFeedFilter('Popular')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${mainFeedFilter === 'Popular' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'}`}><Flame size={16} /> Popular</button>
                  </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {filteredVideos.map(video => (
                  <VideoGridItem key={video.id} video={video} onSelect={handleSelectVideo} onSelectChannel={handleSelectChannel} />
                ))}
              </div>
              {filteredVideos.length === 0 && (
                  <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                      <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">No videos found</h3>
                      <p className="text-gray-500">Try changing the category or filter.</p>
                  </div>
              )}
            </section>
          </div>
        );
      case 'trending': return <TrendingView onSelectVideo={handleSelectVideo} onSelectChannel={handleSelectChannel} />;
      case 'search': return <SearchResultsView query={searchQuery} results={searchResults} onSelectVideo={handleSelectVideo} onSelectChannel={handleSelectChannel} />;
      case 'video':
        if (selectedVideo) {
          return (
            <div className="p-4 lg:p-6 max-w-[1800px] mx-auto">
              <button onClick={handleBack} className="flex items-center gap-2 mb-4 font-semibold hover:text-brand-orange text-gray-600 dark:text-gray-300"><ArrowLeft size={18}/> Back to Feed</button>
              <VideoDetailView video={selectedVideo} recommendedVideos={videos.filter(v => v.id !== selectedVideo.id && v.status === 'approved')} onSelectVideo={handleSelectVideo} onSelectChannel={handleSelectChannel} />
            </div>
          );
        }
        return null;
      case 'channel':
        if (selectedChannelProfile) {
          return <WeTubeChannelPage creatorProfile={selectedChannelProfile} videos={videos.filter(v => v.submittedBy === selectedChannelProfile.id)} shorts={shorts.filter(s => s.submittedBy === selectedChannelProfile.id)} onSelectVideo={handleSelectVideo} onSelectChannel={handleSelectChannel} onSelectShort={(index) => { const channelShorts = shorts.filter(s => s.submittedBy === selectedChannelProfile.id); if (channelShorts[index]) { const globalIndex = shorts.findIndex(s => s.id === channelShorts[index].id); if (globalIndex !== -1) handleSelectShort(globalIndex); } }} />;
        }
        return null;
      default: return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {activeView !== 'shorts' && <PageHeader />}
      <div className="flex">
        <WeTubeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onNavigate={handleSidebarNavigate} activeView={activeView} hasChannel={hasChannel} onCreateChannel={() => setIsCreateChannelModalOpen(true)} onViewChannel={handleViewMyChannel} onReturnToDashboard={() => onNavigate('dashboard')} />
        <main className={`flex-1 lg:ml-60 transition-all duration-300 ${activeView === 'shorts' ? 'z-50' : ''}`}>{renderMainContent()}</main>
      </div>
       {activeView === 'shorts' && selectedShortIndex !== null && <ShortsPlayer shorts={shorts} initialIndex={selectedShortIndex} onClose={handleCloseShorts} onSelectChannel={handleSelectChannel} />}
       <SubmitVideoModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} onSave={handleAddVideo} />
       <CreateChannelModal isOpen={isCreateChannelModalOpen} onClose={() => setIsCreateChannelModalOpen(false)} currentUser={CURRENT_USER_PROFILE} onCreate={handleCreateChannel} />
    </div>
  );
};
