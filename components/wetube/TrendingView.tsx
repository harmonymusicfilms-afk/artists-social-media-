import React, { useState, useMemo } from 'react';
import { Video } from '../../types';
import { MOCK_VIDEOS } from '../../constants';
import { TrendingUp, Flame, MessageSquare, Clock } from 'lucide-react';
import { VideoListItem } from './VideoListItem';

const parseDate = (dateStr: string): Date => new Date(dateStr);

const calculateTrendingScore = (video: Video): number => {
    const likes = video.stats.likes;
    const comments = video.stats.comments;
    const uploadDate = parseDate(video.uploadDate);
    const ageInHours = (new Date().getTime() - uploadDate.getTime()) / (1000 * 60 * 60);

    // Gravity formula gives weight to likes and comments, penalized by age
    const score = (likes + comments * 5) / Math.pow(ageInHours + 2, 1.8);
    return score;
};

interface TrendingViewProps {
    onSelectVideo: (video: Video) => void;
    onSelectChannel: (profileId: string) => void;
}

export const TrendingView: React.FC<TrendingViewProps> = ({ onSelectVideo, onSelectChannel }) => {
    const [activeFilter, setActiveFilter] = useState('Trending');

    const sortedVideos = useMemo(() => {
        const videos = MOCK_VIDEOS.filter(v => v.status === 'approved');
        switch (activeFilter) {
            case 'Latest':
                return [...videos].sort((a, b) => parseDate(b.uploadDate).getTime() - parseDate(a.uploadDate).getTime());
            case 'Most Liked':
                return [...videos].sort((a, b) => b.stats.likes - a.stats.likes);
            case 'Most Discussed':
                return [...videos].sort((a, b) => b.stats.comments - a.stats.comments);
            case 'Trending':
            default:
                return [...videos].sort((a, b) => calculateTrendingScore(b) - calculateTrendingScore(a));
        }
    }, [activeFilter]);
    
    const filters = [
        { name: 'Trending', icon: TrendingUp },
        { name: 'Latest', icon: Clock },
        { name: 'Most Liked', icon: Flame },
        { name: 'Most Discussed', icon: MessageSquare },
    ];
    
    return (
        <div className="p-4 lg:p-6">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="text-brand-orange" /> Trending Videos
            </h2>

            <div className="flex flex-wrap items-center gap-3 mb-6">
                {filters.map(filter => {
                    const Icon = filter.icon;
                    return (
                        <button 
                            key={filter.name}
                            onClick={() => setActiveFilter(filter.name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                activeFilter === filter.name
                                ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                                : 'bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            <Icon size={16} />
                            <span>{filter.name}</span>
                        </button>
                    );
                })}
            </div>

            <div className="space-y-4">
                {sortedVideos.map((video, index) => (
                    <VideoListItem key={video.id} video={video} onSelect={onSelectVideo} onSelectChannel={onSelectChannel} rank={index + 1} />
                ))}
            </div>
        </div>
    );
};
