import React from 'react';
import { Video } from '../../types';
import { ThumbsUp, MessageSquare, Eye, BadgeCheck } from 'lucide-react';

interface VideoListItemProps {
    video: Video;
    onSelect: (video: Video) => void;
    onSelectChannel: (profileId: string) => void;
    rank?: number;
}

const formatStat = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
};

export const VideoListItem: React.FC<VideoListItemProps> = ({ video, onSelect, onSelectChannel, rank }) => {
    
    const handleChannelClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelectChannel(video.submittedBy);
    };

    return (
        <div onClick={() => onSelect(video)} className="flex flex-col sm:flex-row gap-4 cursor-pointer group p-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors">
            {rank && (
                <div className="hidden sm:flex items-center justify-center text-2xl font-bold text-gray-400 dark:text-gray-500 px-4">
                    {rank}
                </div>
            )}
            <div className="relative aspect-video sm:w-64 sm:h-36 shrink-0">
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover rounded-lg" />
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">{video.duration}</span>
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-brand-orange dark:group-hover:text-brand-orange">{video.title}</h3>
                <div onClick={handleChannelClick} className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400 w-fit z-10">
                    <img src={video.creator.avatar} alt={video.creator.name} className="w-6 h-6 rounded-full" />
                    <span className="flex items-center gap-1.5">
                        {video.creator.name}
                        {video.creator.isVerified && <BadgeCheck size={14} className="text-blue-500 fill-blue-500/20" />}
                    </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{video.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-500 font-semibold">
                    <span className="flex items-center gap-1"><Eye size={14}/> {formatStat(video.stats.views)}</span>
                    <span className="flex items-center gap-1"><ThumbsUp size={14}/> {formatStat(video.stats.likes)}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={14}/> {formatStat(video.stats.comments)}</span>
                    <span>&bull; {video.uploadDate}</span>
                </div>
            </div>
        </div>
    );
};