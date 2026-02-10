
import React, { useState } from 'react';
import { UserProfile, Video } from '../types';
import { BadgeCheck, Clapperboard, Film, ListVideo, Play, User, Globe, Calendar, Eye, Share2, MoreVertical, Search, Signal } from 'lucide-react';
import { VideoGridItem } from '../components/wetube/VideoGridItem';

interface WeTubeChannelPageProps {
    creatorProfile: UserProfile;
    videos: Video[];
    shorts: Video[];
    onSelectVideo: (video: Video) => void;
    onSelectShort: (index: number) => void;
    onSelectChannel: (profileId: string) => void;
}

const ShortsGridItem: React.FC<{ short: Video; onClick: () => void }> = ({ short, onClick }) => (
    <div onClick={onClick} className="aspect-[9/16] relative rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all">
        <img src={short.thumbnailUrl} alt={short.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
            <h4 className="font-bold text-sm line-clamp-2 mb-1">{short.title}</h4>
            <p className="text-xs text-gray-300 flex items-center gap-1 font-medium">
                <Play size={10} className="fill-current"/> {short.stats.views.toLocaleString()} views
            </p>
        </div>
    </div>
);

const PlaylistCard: React.FC<{ title: string; count: number; cover: string }> = ({ title, count, cover }) => (
    <div className="group cursor-pointer">
        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-gray-200 dark:bg-gray-800">
            <img src={cover} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-y-0 right-0 w-2/5 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                <span className="text-lg font-bold">{count}</span>
                <ListVideo size={20} className="mt-1" />
            </div>
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-brand-orange transition-colors">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">View full playlist</p>
    </div>
);

export const WeTubeChannelPage: React.FC<WeTubeChannelPageProps> = ({ creatorProfile, videos, shorts, onSelectVideo, onSelectShort, onSelectChannel }) => {
    const [activeTab, setActiveTab] = useState('Videos');
    const [isSubscribed, setIsSubscribed] = useState(false);
    
    // Mock Data for Channel Stats
    const subscriberCount = 125000; 
    const videoCount = videos.length + shorts.length + 45; // Mock total
    const totalViews = 15420000;
    const joinDate = "Joined Sep 12, 2018";

    const tabs = [
        { name: 'Videos', icon: Film },
        { name: 'Shorts', icon: Clapperboard },
        { name: 'Live', icon: Signal },
        { name: 'Playlists', icon: ListVideo },
        { name: 'About', icon: User },
    ];

    const handleSubscribe = () => setIsSubscribed(!isSubscribed);
    
    const formatCount = (count: number) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count.toString();
    }
    
    const renderTabContent = () => {
        switch(activeTab) {
            case 'Videos':
                return videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 animate-fade-in">
                        {videos.map(video => <VideoGridItem key={video.id} video={video} onSelect={onSelectVideo} onSelectChannel={onSelectChannel} />)}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <Film size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">This channel has not posted any videos yet.</p>
                    </div>
                );

            case 'Shorts':
                 return shorts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fade-in">
                        {shorts.map((short, index) => <ShortsGridItem key={short.id} short={short} onClick={() => onSelectShort(index)} />)}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <Clapperboard size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No shorts available.</p>
                    </div>
                );

            case 'Live':
                return (
                    <div className="text-center py-20 animate-fade-in">
                        <Signal size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Offline</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">No upcoming live streams scheduled.</p>
                    </div>
                );

            case 'Playlists':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                        <PlaylistCard title="Music Videos" count={12} cover={videos[0]?.thumbnailUrl || "https://picsum.photos/400/225?random=1"} />
                        <PlaylistCard title="Behind the Scenes" count={5} cover={videos[1]?.thumbnailUrl || "https://picsum.photos/400/225?random=2"} />
                        <PlaylistCard title="Vlogs 2023" count={24} cover={shorts[0]?.thumbnailUrl || "https://picsum.photos/400/225?random=3"} />
                        <PlaylistCard title="Tutorials" count={8} cover={shorts[1]?.thumbnailUrl || "https://picsum.photos/400/225?random=4"} />
                    </div>
                );
                
            case 'About':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Description</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {creatorProfile.bio}
                                    {'\n\n'}
                                    Welcome to my official WeTube channel! Here you will find all my latest music videos, vlogs, and behind-the-scenes content.
                                    {'\n\n'}
                                    Don't forget to subscribe and hit the bell icon!
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Details</h3>
                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">For business inquiries:</span>
                                        <a href={`mailto:${creatorProfile.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{creatorProfile.email}</a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Location:</span>
                                        <span>{creatorProfile.address.city}, {creatorProfile.address.country}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Stats</h3>
                                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <p className="flex items-center gap-3">
                                        <Calendar size={18} /> {joinDate}
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Eye size={18} /> {totalViews.toLocaleString()} views
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Film size={18} /> {videoCount} videos
                                    </p>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <button className="flex items-center gap-2 text-brand-orange hover:underline">
                                        <Share2 size={18} /> Share Channel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            {/* Banner Area */}
            <div className="w-full h-40 md:h-56 lg:h-64 bg-gray-200 dark:bg-gray-700 relative overflow-hidden group">
                <img src={creatorProfile.coverPhoto} alt="Channel banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Channel Info Header */}
            <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 pb-4">
                <div className="flex flex-col md:flex-row gap-6 -mt-8 md:-mt-10 relative z-10 mb-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                        <img 
                            src={creatorProfile.avatar} 
                            alt={creatorProfile.displayName} 
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-900 shadow-lg object-cover bg-white dark:bg-gray-800"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col md:justify-end pb-2 text-center md:text-left mt-2 md:mt-0">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{creatorProfile.displayName}</h1>
                            {creatorProfile.weTubeVerificationStatus === 'verified' && (
                                <span title="Verified"><BadgeCheck size={24} className="text-blue-500 fill-blue-500/20" /></span>
                            )}
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
                            <span className="text-gray-900 dark:text-white font-bold">@{creatorProfile.displayName.toLowerCase().replace(/\s/g, '')}</span>
                            <span>•</span>
                            <span>{formatCount(subscriberCount)} subscribers</span>
                            <span>•</span>
                            <span>{videoCount} videos</span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                            <button 
                                onClick={handleSubscribe}
                                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all transform active:scale-95 ${
                                isSubscribed 
                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700' 
                                : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-gray-200 shadow-md'
                            }`}
                            >
                                {isSubscribed ? 'Subscribed' : 'Subscribe'}
                            </button>
                            <button className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
                                <Search size={20} />
                            </button>
                            <button className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-800 overflow-x-auto scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center gap-2 px-6 py-3.5 font-bold text-sm whitespace-nowrap border-b-2 transition-all ${
                                activeTab === tab.name 
                                ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                            }`}
                        >
                            <tab.icon size={18} className={activeTab === tab.name ? 'stroke-[2.5px]' : ''} />
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Tab Content */}
            <div className="flex-1 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};
