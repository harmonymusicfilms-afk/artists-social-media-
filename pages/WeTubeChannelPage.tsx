import React, { useState } from 'react';
import { UserProfile, Video } from '../types';
import { BadgeCheck, Clapperboard, Film, ListVideo, Play, User } from 'lucide-react';
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
    <div onClick={onClick} className="aspect-[9/16] relative rounded-lg overflow-hidden cursor-pointer group">
        <img src={short.thumbnailUrl} alt={short.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 text-white">
            <h4 className="font-bold text-sm line-clamp-2">{short.title}</h4>
            <p className="text-xs text-gray-300 flex items-center gap-1"><Play size={12} className="fill-white"/> {short.stats.views.toLocaleString()}</p>
        </div>
    </div>
);


export const WeTubeChannelPage: React.FC<WeTubeChannelPageProps> = ({ creatorProfile, videos, shorts, onSelectVideo, onSelectShort, onSelectChannel }) => {
    const [activeTab, setActiveTab] = useState('Videos');
    const [isSubscribed, setIsSubscribed] = useState(false);
    
    // This is a mock subscriber count. In a real app, this would come from the profile.
    const [subscriberCount, setSubscriberCount] = useState(125000); 

    const tabs = [
        { name: 'Videos', icon: Film },
        { name: 'Shorts', icon: Clapperboard },
        { name: 'Live', icon: Play },
        { name: 'Playlists', icon: ListVideo },
        { name: 'About', icon: User },
    ];

    const handleSubscribe = () => {
        setIsSubscribed(prev => {
            setSubscriberCount(count => prev ? count - 1 : count + 1);
            return !prev;
        });
    };
    
    const formatSubscribers = (count: number) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count.toString();
    }
    
    const renderTabContent = () => {
        switch(activeTab) {
            case 'Videos':
                return videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                        {videos.map(video => <VideoGridItem key={video.id} video={video} onSelect={onSelectVideo} onSelectChannel={onSelectChannel} />)}
                    </div>
                ) : <p className="text-center text-gray-500 dark:text-gray-400 py-10">This channel has not posted any videos yet.</p>;

            case 'Shorts':
                 return shorts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {shorts.map((short, index) => <ShortsGridItem key={short.id} short={short} onClick={() => onSelectShort(index)} />)}
                    </div>
                ) : <p className="text-center text-gray-500 dark:text-gray-400 py-10">This channel has not posted any shorts yet.</p>;
                
            case 'About':
                return <div className="max-w-2xl text-gray-600 dark:text-gray-300 leading-relaxed"><p>{creatorProfile.bio}</p></div>;
                
            default:
                return <p className="text-center text-gray-500 dark:text-gray-400 py-10">{activeTab} section coming soon!</p>;
        }
    }

    return (
        <div className="flex flex-col">
            {/* Banner */}
            <div className="w-full h-32 md:h-48 bg-gray-200 dark:bg-gray-700">
                <img src={creatorProfile.coverPhoto} alt="Channel banner" className="w-full h-full object-cover"/>
            </div>

            {/* Channel Info */}
            <div className="px-4 lg:px-6 py-4 bg-white dark:bg-gray-800/50">
                <div className="flex flex-col sm:flex-row gap-4">
                    <img src={creatorProfile.avatar} alt={creatorProfile.displayName} className="w-24 h-24 md:w-32 md:h-32 rounded-full -mt-12 md:-mt-16 border-4 border-white dark:border-gray-800 shrink-0"/>
                    <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <h1 className="text-2xl md:text-3xl font-bold">{creatorProfile.displayName}</h1>
                                {creatorProfile.weTubeVerificationStatus === 'verified' && <BadgeCheck size={24} className="text-red-500 fill-red-500/20 shrink-0" title="WeTube Verified Creator"/>}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">@{creatorProfile.displayName} &bull; {formatSubscribers(subscriberCount)} subscribers</p>
                        </div>
                        <button 
                            onClick={handleSubscribe}
                            className={`px-5 py-2.5 font-semibold rounded-full text-sm transition-colors w-full sm:w-auto ${
                            isSubscribed 
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                            : 'bg-gray-800 dark:bg-white text-white dark:text-black hover:opacity-90'
                        }`}
                        >
                            {isSubscribed ? 'Subscribed' : 'Subscribe'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="sticky top-[65px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-md z-20 border-b border-gray-200 dark:border-gray-700">
                 <div className="px-4 lg:px-6 flex items-center gap-4 overflow-x-auto scrollbar-hide">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex items-center gap-2 px-3 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                                    activeTab === tab.name 
                                    ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                <Icon size={18} />
                                {tab.name}
                            </button>
                        );
                    })}
                </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-4 lg:p-6">
                {renderTabContent()}
            </div>
        </div>
    );
};
