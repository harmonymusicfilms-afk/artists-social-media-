import React, { useState, useMemo } from 'react';
import { MOCK_VIDEOS, MOCK_SHORTS, CURRENT_USER_PROFILE, USER_PROFILES } from '../constants';
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
import { ArrowLeft, Search, Bell, Youtube as YoutubeIcon, Clapperboard, Upload, Play, TrendingUp, BadgeCheck, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface WeTubePageProps {
  onNavigate: (page: string) => void;
}

const FeaturedVideo: React.FC<{ video: Video, onSelect: (video: Video) => void, onSelectChannel: (profileId: string) => void }> = ({ video, onSelect, onSelectChannel }) => (
    <section className="relative aspect-video md:aspect-[2.4/1] w-full rounded-2xl overflow-hidden mb-12 group">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">{video.title}</h2>
            <div className="flex items-center gap-3 mt-3 cursor-pointer w-fit" onClick={() => onSelectChannel(video.submittedBy)}>
                <img src={video.creator.avatar} alt={video.creator.name} className="w-10 h-10 rounded-full border-2 border-white/50" />
                <div>
                    <p className="font-semibold">{video.creator.name}</p>
                    <p className="text-xs text-gray-300">{video.stats.views.toLocaleString()} views</p>
                </div>
            </div>
            <p className="hidden md:block text-sm text-gray-200 mt-4 line-clamp-2">{video.description}</p>
            <button onClick={() => onSelect(video)} className="mt-6 flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-200 transition-colors">
                <Play size={18} className="fill-current"/> Watch Now
            </button>
        </div>
    </section>
);


const CategoryPills: React.FC<{ active: string, setActive: (c: string) => void }> = ({ active, setActive }) => {
  const categories = ['All', 'Music', 'Comedy', 'Vlogs', 'Gaming', 'News', 'Lifestyle', 'Tech', 'Entertainment'];
  return (
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
       {categories.map(cat => (
         <button 
           key={cat} 
           onClick={() => setActive(cat)}
           className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
             active === cat 
               ? 'bg-gray-900 dark:bg-white text-white dark:text-black' 
               : 'bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700'
           }`}
         >
           {cat}
         </button>
       ))}
    </div>
  );
};

const HorizontalVideoShelf: React.FC<{ title: string, icon: React.ElementType, videos: Video[], onSelectVideo: (v: Video) => void, onSelectChannel: (id: string) => void }> = ({ title, icon: Icon, videos, onSelectVideo, onSelectChannel }) => (
    <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="text-red-600" />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="flex overflow-x-auto gap-x-4 gap-y-8 -mx-4 px-4 pb-4 scrollbar-hide">
          {videos.map(video => (
            <div key={video.id} className="w-72 shrink-0">
                <VideoGridItem video={video} onSelect={onSelectVideo} onSelectChannel={onSelectChannel} />
            </div>
          ))}
        </div>
    </section>
);


const ShortsShelf: React.FC<{ onSelectShort: (index: number) => void }> = ({ onSelectShort }) => (
  <section className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      <Clapperboard className="text-red-600" />
      <h2 className="text-2xl font-bold">Shorts</h2>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {MOCK_SHORTS.slice(0, 6).map((short, index) => (
        <div key={short.id} onClick={() => onSelectShort(index)} className="aspect-[9/16] relative rounded-xl overflow-hidden cursor-pointer group">
           <img src={short.thumbnailUrl} alt={short.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
           <div className="absolute bottom-2 left-2 right-2 text-white">
             <h4 className="font-bold text-sm line-clamp-2">{short.title}</h4>
             <p className="text-xs text-gray-300">{short.stats.views.toLocaleString()} views</p>
           </div>
        </div>
      ))}
    </div>
  </section>
);

const VerifiedCreatorsShelf: React.FC<{ creators: UserProfile[], onSelectChannel: (id: string) => void }> = ({ creators, onSelectChannel }) => (
    <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <BadgeCheck className="text-red-600" />
          <h2 className="text-2xl font-bold">Verified Creators</h2>
        </div>
         <div className="flex overflow-x-auto gap-6 -mx-4 px-4 pb-4 scrollbar-hide">
            {creators.map(creator => (
                <div key={creator.id} onClick={() => onSelectChannel(creator.id)} className="flex flex-col items-center gap-2 w-28 shrink-0 cursor-pointer group">
                    <div className="relative">
                        <img src={creator.avatar} alt={creator.displayName} className="w-24 h-24 rounded-full object-cover transition-transform group-hover:scale-105 border-4 border-transparent group-hover:border-red-500" />
                         <BadgeCheck size={24} className="absolute bottom-1 right-1 text-red-500 fill-red-500/20 bg-gray-100 dark:bg-gray-800 rounded-full p-0.5" />
                    </div>
                    <p className="text-sm font-semibold truncate w-full text-center">{creator.displayName}</p>
                </div>
            ))}
        </div>
    </section>
);


export const WeTubePage: React.FC<WeTubePageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  type View = 'home' | 'video' | 'shorts' | 'trending' | 'search' | 'channel';
  const [activeView, setActiveView] = useState<View>('home');
  const [previousView, setPreviousView] = useState<View>('home');
  
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedChannelProfile, setSelectedChannelProfile] = useState<UserProfile | null>(null);
  const [selectedShortIndex, setSelectedShortIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  // Channel State
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] = useState(false);
  const [hasChannel, setHasChannel] = useState(false); // Default to false for demo
  
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [shorts, setShorts] = useState<Video[]>(MOCK_SHORTS);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Video[]>([]);

  const approvedVideos = useMemo(() => videos.filter(v => v.status === 'approved'), [videos]);
  const trendingVideos = useMemo(() => [...approvedVideos].sort((a,b) => b.stats.views - a.stats.views).slice(0,10), [approvedVideos]);
  const verifiedCreators = useMemo(() => USER_PROFILES.filter(p => p.weTubeVerificationStatus === 'verified'), []);


  const filteredVideos = useMemo(() => {
    if (activeCategory === 'All') {
        return approvedVideos;
    }
    return approvedVideos.filter(video => video.category === activeCategory);
  }, [activeCategory, approvedVideos]);


  const handleSelectVideo = (video: Video) => {
    if (video.status === 'pending') return;
    setPreviousView(activeView);
    setSelectedVideo(video);
    setActiveView('video');
    window.scrollTo(0, 0);
  };
  
  const handleSelectChannel = (profileId: string) => {
      const profile = USER_PROFILES.find(p => p.id === profileId);
      if (profile) {
          setPreviousView(activeView === 'shorts' ? 'home' : activeView);
          setSelectedChannelProfile(profile);
          setActiveView('channel');
          window.scrollTo(0,0);
      }
  };

  const handleAddVideo = (newVideo: Video) => {
    setVideos(prev => [newVideo, ...prev]);
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
    const results = [...MOCK_VIDEOS, ...MOCK_SHORTS].filter(v => 
        (v.status === 'approved') && (
            v.title.toLowerCase().includes(lowerQuery) ||
            v.description.toLowerCase().includes(lowerQuery) ||
            v.creator.name.toLowerCase().includes(lowerQuery) ||
            v.hashtags.some(tag => tag.toLowerCase().includes(lowerQuery))
        )
    );
    setSearchResults(results);
    setActiveView('search');
  };

  const handleCreateChannel = (channelData: { name: string; handle: string; description: string }) => {
      setHasChannel(true);
      alert(`Channel "${channelData.name}" created successfully!`);
      // In a real app, you would save this to the backend
  };

  const handleViewMyChannel = () => {
      // For demo, we just navigate to the current user's profile view as if it were a channel
      handleSelectChannel(CURRENT_USER_PROFILE.id);
      setIsSidebarOpen(false);
  };

  const PageHeader: React.FC = () => {
    const [query, setQuery] = useState('');
    return (
     <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          {activeView !== 'home' && activeView !== 'trending' && (
             <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"><ArrowLeft size={24} /></button>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden">
            <YoutubeIcon size={24} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('home')}>
             <YoutubeIcon className="w-8 h-8 text-red-600" />
            <span className="hidden md:block text-2xl font-bold tracking-tighter text-gray-900 dark:text-white">WeTube</span>
          </div>
        </div>
        <div className="hidden sm:flex flex-grow max-w-lg mx-4 items-center">
            <input 
              type="text" 
              placeholder="Search" 
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearchSubmit(query) }}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-l-full focus:outline-none focus:ring-2 focus:ring-brand-orange placeholder:text-gray-500 dark:placeholder:text-gray-400" 
            />
            <button onClick={() => handleSearchSubmit(query)} className="px-5 py-2 bg-gray-200 dark:bg-gray-700 border-y border-r border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-300 dark:hover:bg-gray-600">
                <Search />
            </button>
        </div>
        <div className="flex items-center gap-2">
             <button onClick={() => hasChannel ? setIsSubmitModalOpen(true) : setIsCreateChannelModalOpen(true)} className="p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title={hasChannel ? "Upload Video" : "Create Channel to Upload"}>
                {hasChannel ? <Upload /> : <Plus />}
            </button>
             <button className="p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <Bell />
            </button>
            <button onClick={() => onNavigate('user-profile')} className="ml-2">
                <img src={user?.profileId ? CURRENT_USER_PROFILE.avatar : 'https://picsum.photos/100/100?random=500'} className="w-8 h-8 rounded-full" />
            </button>
        </div>
      </header>
  )};

  const renderMainContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <div className="p-4 lg:p-6 space-y-8">
            {approvedVideos.length > 0 && <FeaturedVideo video={approvedVideos[0]} onSelect={handleSelectVideo} onSelectChannel={handleSelectChannel} />}
            <HorizontalVideoShelf title="Trending Now" icon={TrendingUp} videos={trendingVideos} onSelectVideo={handleSelectVideo} onSelectChannel={handleSelectChannel} />
            <ShortsShelf onSelectShort={handleSelectShort} />
            <VerifiedCreatorsShelf creators={verifiedCreators} onSelectChannel={handleSelectChannel} />

            <section>
              <h2 className="text-2xl font-bold mb-4">Latest Uploads</h2>
              <div className="mb-6">
                <CategoryPills active={activeCategory} setActive={setActiveCategory} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {filteredVideos.map(video => (
                  <VideoGridItem key={video.id} video={video} onSelect={handleSelectVideo} onSelectChannel={handleSelectChannel} />
                ))}
              </div>
            </section>
          </div>
        );
      case 'trending':
        return <TrendingView onSelectVideo={handleSelectVideo} onSelectChannel={handleSelectChannel} />;
      case 'search':
        return <SearchResultsView query={searchQuery} results={searchResults} onSelectVideo={handleSelectVideo} onSelectChannel={handleSelectChannel} />;
      case 'video':
        if (selectedVideo) {
          return (
            <div className="p-4 lg:p-6">
              <button onClick={handleBack} className="flex items-center gap-2 mb-4 font-semibold hover:text-brand-orange"><ArrowLeft size={18}/> Back</button>
              <VideoDetailView 
                video={selectedVideo}
                recommendedVideos={videos.filter(v => v.id !== selectedVideo.id && v.status === 'approved')}
                onSelectVideo={handleSelectVideo}
                onSelectChannel={handleSelectChannel}
              />
            </div>
          );
        }
        return null;
      case 'channel':
        if (selectedChannelProfile) {
          return (
              <WeTubeChannelPage 
                creatorProfile={selectedChannelProfile}
                videos={videos.filter(v => v.submittedBy === selectedChannelProfile.id)}
                shorts={shorts.filter(s => s.submittedBy === selectedChannelProfile.id)}
                onSelectVideo={handleSelectVideo}
                onSelectChannel={handleSelectChannel}
                onSelectShort={(index) => {
                    const channelShorts = shorts.filter(s => s.submittedBy === selectedChannelProfile.id);
                    const selectedShort = channelShorts[index];
                    if (selectedShort) {
                        const globalIndex = shorts.findIndex(s => s.id === selectedShort.id);
                        if (globalIndex !== -1) handleSelectShort(globalIndex);
                    }
                }}
              />
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {activeView !== 'shorts' && <PageHeader />}
      
      <div className="flex">
        <WeTubeSidebar 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen} 
            onNavigate={handleSidebarNavigate} 
            activeView={activeView}
            hasChannel={hasChannel}
            onCreateChannel={() => setIsCreateChannelModalOpen(true)}
            onViewChannel={handleViewMyChannel}
            onReturnToDashboard={() => onNavigate('dashboard')}
        />
        
        <main className="flex-1 lg:ml-60">
           {renderMainContent()}
        </main>
      </div>

       {activeView === 'shorts' && selectedShortIndex !== null && (
         <ShortsPlayer
            shorts={shorts}
            initialIndex={selectedShortIndex}
            onClose={handleCloseShorts}
            onSelectChannel={handleSelectChannel}
         />
       )}
       
       <SubmitVideoModal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          onSave={handleAddVideo}
       />

       <CreateChannelModal
          isOpen={isCreateChannelModalOpen}
          onClose={() => setIsCreateChannelModalOpen(false)}
          currentUser={CURRENT_USER_PROFILE}
          onCreate={handleCreateChannel}
       />
    </div>
  );
};