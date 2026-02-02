import React, { useState } from 'react';
import { Video } from '../../types';
import { MoreVertical, ChevronDown, ChevronUp, Clock, BadgeCheck, ThumbsUp, Eye } from 'lucide-react';

interface VideoGridItemProps {
    video: Video;
    onSelect: (video: Video) => void;
    onSelectChannel?: (profileId: string) => void;
}

const formatStat = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
};

export const VideoGridItem: React.FC<VideoGridItemProps> = ({ video, onSelect, onSelectChannel }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isPending = video.status === 'pending';

    const handleSelect = () => {
        if (isPending) return;
        onSelect(video);
    };

    const handleChannelClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onSelectChannel) {
            onSelectChannel(video.submittedBy);
        }
    };

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleMoreClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        alert('More options coming soon!');
    };

    return (
        <div onClick={handleSelect} className={`group flex flex-col gap-3 ${isPending ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg group-hover:shadow-red-500/20 transition-shadow">
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">{video.duration}</span>
                {isPending && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-2 text-center">
                        <Clock size={24} />
                        <p className="text-sm font-bold mt-2">Pending Approval</p>
                    </div>
                )}
            </div>
            <div className="flex gap-3">
                <img onClick={handleChannelClick} src={video.creator.avatar} alt={video.creator.name} className="w-9 h-9 rounded-full mt-1 z-10 shrink-0" />
                <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug">{video.title}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <div onClick={handleChannelClick} className="flex items-center gap-1.5 w-fit z-10 hover:text-gray-900 dark:hover:text-white">
                            <p>{video.creator.name}</p>
                            {video.creator.isVerified && <BadgeCheck size={14} className="text-blue-500 fill-blue-500/20" />}
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                             <span className="flex items-center gap-1"><Eye size={12}/> {formatStat(video.stats.views)} views</span>
                             <span className="flex items-center gap-1"><ThumbsUp size={12}/> {formatStat(video.stats.likes)} likes</span>
                        </div>
                    </div>
                </div>
                {!isPending && (
                    <button onClick={handleMoreClick} className="p-1 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity self-start rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 z-10">
                        <MoreVertical size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>
                )}
            </div>
        </div>
    );
};
