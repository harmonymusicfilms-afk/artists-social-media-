import React, { useState, useMemo } from 'react';
import { MLMPost } from '../../types';
import { MoreVertical, Heart, MessageSquare, Share2, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface MLMPostCardProps {
    post: MLMPost;
}

const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube.com')) {
            videoId = urlObj.searchParams.get('v') || '';
        }
    } catch (e) {
        return null;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

export const MLMPostCard: React.FC<MLMPostCardProps> = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const embedUrl = post.youtubeUrl ? getYouTubeEmbedUrl(post.youtubeUrl) : null;

    const mediaItems = useMemo(() => {
        const items: { type: 'youtube' | 'image'; url: string }[] = [];
        if (embedUrl) {
            items.push({ type: 'youtube', url: embedUrl });
        }
        post.images.forEach(imgUrl => {
            items.push({ type: 'image', url: imgUrl });
        });
        return items;
    }, [post.youtubeUrl, post.images, embedUrl]);

    const nextMedia = () => {
        setCurrentMediaIndex(prev => (prev + 1) % mediaItems.length);
    };

    const prevMedia = () => {
        setCurrentMediaIndex(prev => (prev - 1 + mediaItems.length) % mediaItems.length);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={post.profile.avatar} alt={post.profile.displayName} className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white">{post.profile.displayName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{post.profile.mlm?.level} Member · {post.createdAt}</p>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-4">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
                <p className={`text-sm text-gray-600 dark:text-gray-300 leading-relaxed ${!isExpanded && 'line-clamp-3'}`}>
                    {post.description}
                </p>
                {post.description.length > 200 && (
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-semibold text-brand-orange hover:underline mt-1">
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </div>

            {/* Media Gallery */}
            {mediaItems.length > 0 && (
                <div className="relative bg-black aspect-video group/media">
                    {/* Media Content */}
                    {mediaItems.map((item, index) => (
                        <div key={index} className={`absolute inset-0 transition-opacity duration-300 ${index === currentMediaIndex ? 'opacity-100 z-10' : 'opacity-0'}`}>
                            {item.type === 'image' && (
                                <img src={item.url} alt={`Post media ${index + 1}`} className="w-full h-full object-contain" />
                            )}
                            {item.type === 'youtube' && (
                                <iframe
                                    src={item.url}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            )}
                        </div>
                    ))}

                    {/* Navigation Arrows */}
                    {mediaItems.length > 1 && (
                        <>
                            <button onClick={prevMedia} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover/media:opacity-100 transition-opacity z-20"><ChevronLeft /></button>
                            <button onClick={nextMedia} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover/media:opacity-100 transition-opacity z-20"><ChevronRight /></button>
                        </>
                    )}

                    {/* Navigation Dots */}
                    {mediaItems.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                            {mediaItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentMediaIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentMediaIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}


            {/* PDF Attachment */}
            {post.pdfUrl && (
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                    <a href={post.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm font-semibold text-brand-orange hover:text-brand-orange/80 transition-colors group">
                        <span className="flex items-center gap-2">
                           <Download size={16} />
                           Download Plan Details (PDF)
                        </span>
                        <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            )}

            {/* Actions */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-around text-gray-500 dark:text-gray-400">
                <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 text-sm font-semibold hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}
                >
                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} /> {post.stats.likes + (isLiked ? 1 : 0)} Likes
                </button>
                 <button className="flex items-center gap-2 text-sm font-semibold hover:text-brand-green transition-colors">
                    <MessageSquare size={20} /> Chat
                </button>
                <button onClick={() => alert('Feature coming soon!')} className="flex items-center gap-2 text-sm font-semibold hover:text-blue-500 transition-colors">
                    <Share2 size={20} /> Share
                </button>
            </div>
        </div>
    );
};