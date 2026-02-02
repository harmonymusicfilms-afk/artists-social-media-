import React from 'react';
import { Video } from '../../types';
import { Search } from 'lucide-react';
import { VideoListItem } from './VideoListItem'; 

interface SearchResultsViewProps {
    query: string;
    results: Video[];
    onSelectVideo: (video: Video) => void;
    onSelectChannel: (profileId: string) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({ query, results, onSelectVideo, onSelectChannel }) => {
    return (
        <div className="p-4 lg:p-6">
            <h2 className="text-2xl font-bold mb-6">
                Search results for: <span className="text-brand-orange">"{query}"</span>
            </h2>
            {results.length > 0 ? (
                <div className="space-y-4">
                    {results.map(video => (
                        <VideoListItem key={video.id} video={video} onSelect={onSelectVideo} onSelectChannel={onSelectChannel} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    <Search size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold">No results found</h3>
                    <p>Try checking your spelling or using different keywords.</p>
                </div>
            )}
        </div>
    );
};
