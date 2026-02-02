
import React, { useState, useEffect, useRef } from 'react';
import { Video, Comment } from '../../types';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, Bell, Send, BadgeCheck, Maximize, Minimize, Trash2, Flag, Play, RotateCcw, RotateCw, Loader2, FastForward, Rewind } from 'lucide-react';
import { CURRENT_USER_PROFILE } from '../../constants';
import { useWeTubeData } from '../../hooks/useWeTubeData';

interface VideoDetailViewProps {
    video: Video;
    recommendedVideos: Video[];
    onSelectVideo: (video: Video) => void;
    onSelectChannel: (profileId: string) => void;
}

const formatNumber = (num: number, isSubscriber = false) => {
    if (isSubscriber) {
        if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    }
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
};

const CustomVideoPlayer = ({ video, toggleFullscreen, isFullscreen }: { video: Video, toggleFullscreen: () => void, isFullscreen: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [showSeekBack, setShowSeekBack] = useState(false);
    const [showSeekForward, setShowSeekForward] = useState(false);
    const [showPlayPauseAnim, setShowPlayPauseAnim] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
            setShowPlayPauseAnim(true);
            setTimeout(() => setShowPlayPauseAnim(false), 500);
        }
    };

    const handleSeek = (direction: 'forward' | 'backward') => {
        if (videoRef.current) {
            const newTime = videoRef.current.currentTime + (direction === 'forward' ? 5 : -5);
            videoRef.current.currentTime = newTime;
            if (direction === 'forward') {
                setShowSeekForward(true);
                setTimeout(() => setShowSeekForward(false), 500);
            } else {
                setShowSeekBack(true);
                setTimeout(() => setShowSeekBack(false), 500);
            }
        }
    };

    return (
        <div className="relative w-full h-full bg-black group select-none">
            <video
                ref={videoRef}
                src={video.mediaUrl}
                className="w-full h-full object-contain"
                loop
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => setIsBuffering(false)}
                onClick={togglePlay}
            />

            {/* Buffering Loader */}
            {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Loader2 size={48} className="text-white animate-spin opacity-80" />
                </div>
            )}

            {/* Play/Pause Animation Overlay */}
            {showPlayPauseAnim && !isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-zoom-in">
                    <div className="bg-black/40 rounded-full p-4 backdrop-blur-sm">
                        {isPlaying ? <Play size={32} className="text-white fill-white" /> : <div className="h-8 w-8 flex items-center justify-center"><div className="w-1 h-6 bg-white rounded-full mx-1"></div><div className="w-1 h-6 bg-white rounded-full mx-1"></div></div>}
                    </div>
                </div>
            )}

            {/* Seek Animations */}
            {showSeekBack && (
                <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none text-white animate-pulse">
                    <div className="flex"><Rewind size={32} fill="white" /><Rewind size={32} fill="white" className="-ml-4 opacity-50" /></div>
                    <span className="text-xs font-bold mt-1">-5s</span>
                </div>
            )}
            {showSeekForward && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none text-white animate-pulse">
                    <div className="flex"><FastForward size={32} fill="white" className="opacity-50" /><FastForward size={32} fill="white" className="-ml-4" /></div>
                    <span className="text-xs font-bold mt-1">+5s</span>
                </div>
            )}

            {/* Interactive Zones for Seek (Double Tap) */}
            <div 
                className="absolute inset-y-0 left-0 w-[35%] z-10"
                onDoubleClick={(e) => { e.stopPropagation(); handleSeek('backward'); }}
                onClick={(e) => { e.stopPropagation(); togglePlay(); }} // Fallback for single click
            />
            <div 
                className="absolute inset-y-0 right-0 w-[35%] z-10"
                onDoubleClick={(e) => { e.stopPropagation(); handleSeek('forward'); }}
                onClick={(e) => { e.stopPropagation(); togglePlay(); }} // Fallback for single click
            />
            {/* Center Zone for Play/Pause */}
            <div 
                className="absolute inset-y-0 left-[35%] right-[35%] z-10 flex items-center justify-center"
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            >
                {!isPlaying && !isBuffering && (
                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                        <Play size={32} className="text-white fill-white ml-1" />
                    </div>
                )}
            </div>

            {/* Fullscreen Toggle */}
            <button 
                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                className="absolute bottom-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
        </div>
    );
};

const RecommendedVideoCard: React.FC<{ video: Video, onSelect: (video: Video) => void, onSelectChannel: (profileId: string) => void }> = ({ video, onSelect, onSelectChannel }) => (
    <div onClick={() => onSelect(video)} className="flex gap-3 cursor-pointer group">
        <div className="w-40 h-24 relative flex-shrink-0">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover rounded-lg" />
            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-bold px-1 py-0.5 rounded-md">{video.duration}</span>
        </div>
        <div>
            <h4 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-white group-hover:text-brand-orange">{video.title}</h4>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                <div onClick={(e) => { e.stopPropagation(); onSelectChannel(video.submittedBy); }} className="flex items-center gap-1 w-fit hover:underline">
                    <p>{video.creator.name}</p>
                    {video.creator.isVerified && <BadgeCheck size={12} className="text-blue-500 fill-blue-500/20" />}
                </div>
                <p>{formatNumber(video.stats.views)} views &bull; {video.uploadDate}</p>
            </div>
        </div>
    </div>
);

const CommentItem: React.FC<{ comment: Comment, onDelete?: () => void }> = ({ comment, onDelete }) => {
    const [showActions, setShowActions] = useState(false);
    return (
        <div className="flex gap-4 group">
            <img src={comment.user.avatar} className="w-10 h-10 rounded-full flex-shrink-0 object-cover"/>
            <div className="flex-1">
                <div className="flex items-center gap-2 text-xs mb-1">
                    <span className={`font-bold ${comment.user.name === CURRENT_USER_PROFILE.displayName ? 'bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 rounded' : 'text-gray-900 dark:text-white'}`}>
                        {comment.user.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{comment.text}</p>
                <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <button className="flex items-center gap-1 hover:text-gray-800 dark:hover:text-gray-200"><ThumbsUp size={14}/> {comment.likes || ''}</button>
                    <button className="hover:text-gray-800 dark:hover:text-gray-200"><ThumbsDown size={14}/></button>
                    <button className="hover:text-gray-800 dark:hover:text-gray-200">Reply</button>
                </div>
            </div>
            <div className="relative">
                <button onClick={() => setShowActions(!showActions)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal size={16} className="text-gray-500"/>
                </button>
                {showActions && (
                    <div className="absolute top-8 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-32 z-10 overflow-hidden">
                        <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Flag size={12}/> Report
                        </button>
                        {onDelete && (
                            <button onClick={() => { onDelete(); setShowActions(false); }} className="flex items-center gap-2 w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                <Trash2 size={12}/> Delete
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


export const VideoDetailView: React.FC<VideoDetailViewProps> = ({ video: initialVideo, recommendedVideos, onSelectVideo, onSelectChannel }) => {
    const { 
        getVideo, getComments, isLiked, isDisliked, isSubscribed, 
        toggleLike, toggleDislike, toggleSubscribe, addComment, deleteComment, incrementViews 
    } = useWeTubeData();

    // Use live video data from hook, fallback to prop
    const video = getVideo(initialVideo.id) || initialVideo;
    const comments = getComments(video.id);
    const liked = isLiked(video.id);
    const disliked = isDisliked(video.id);
    const subscribed = isSubscribed(video.submittedBy); // Using submittedBy as creator ID key

    const playerContainerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [newComment, setNewComment] = useState('');
    
    // Simulate view increment on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            incrementViews(video.id);
        }, 5000); // Count view after 5 seconds
        return () => clearTimeout(timer);
    }, [video.id]);

    const toggleFullscreen = () => {
        if (!playerContainerRef.current) return;
        if (!document.fullscreenElement) {
            playerContainerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() === '') return;
        addComment(video.id, newComment);
        setNewComment('');
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Main Content */}
            <div className="lg:col-span-8">
                {/* Player */}
                <div ref={playerContainerRef} className="group/player relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                    {video.mediaUrl ? (
                        <CustomVideoPlayer 
                            video={video} 
                            toggleFullscreen={toggleFullscreen} 
                            isFullscreen={isFullscreen} 
                        />
                    ) : (
                        <>
                            <iframe 
                                src={video.embedUrl} 
                                title={video.title}
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                            <button 
                                onClick={toggleFullscreen}
                                className="absolute bottom-14 right-4 z-10 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover/player:opacity-100 hover:bg-black/70 transition-all"
                                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                            >
                                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                            </button>
                        </>
                    )}
                </div>

                {/* Video Info */}
                <div className="mt-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{video.title}</h1>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                        {/* Channel Info */}
                        <div className="flex items-center gap-3">
                            <img onClick={() => onSelectChannel(video.submittedBy)} src={video.creator.avatar} alt={video.creator.name} className="w-10 h-10 rounded-full cursor-pointer object-cover border border-gray-200 dark:border-gray-700" />
                            <div onClick={() => onSelectChannel(video.submittedBy)} className="cursor-pointer">
                                <p className="font-bold text-base flex items-center gap-1.5 text-gray-900 dark:text-white hover:text-brand-orange transition-colors">
                                    {video.creator.name}
                                    {video.creator.isVerified && <BadgeCheck size={16} className="text-blue-500 fill-blue-500/20" />}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{video.creator.subscribers} subscribers</p>
                            </div>
                            <button 
                                onClick={() => toggleSubscribe(video.submittedBy)}
                                className={`ml-4 px-5 py-2 font-semibold rounded-full text-sm transition-all ${
                                subscribed 
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                                : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 shadow-md hover:shadow-lg'
                            }`}
                            >
                                {subscribed ? <span className="flex items-center gap-1"><Bell size={14} className="fill-current"/> Subscribed</span> : 'Subscribe'}
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                                <button onClick={() => toggleLike(video.id)} className={`flex items-center gap-2 pl-4 pr-3 py-2 rounded-l-full transition-colors ${liked ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                    <ThumbsUp size={18} fill={liked ? 'currentColor' : 'none'}/>
                                    <span className="font-semibold text-sm">{formatNumber(video.stats.likes)}</span>
                                </button>
                                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
                                <button onClick={() => toggleDislike(video.id)} className={`px-3 py-2 rounded-r-full transition-colors ${disliked ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                    <ThumbsDown size={18} fill={disliked ? 'currentColor' : 'none'}/>
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors">
                                <Share2 size={18} /> Share
                            </button>
                             <button className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className={`mt-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isDescriptionExpanded ? 'bg-gray-200 dark:bg-gray-700' : ''}`} onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                    <div className="flex gap-4 font-semibold text-sm mb-2">
                        <p>{formatNumber(video.stats.views)} views</p>
                        <p>{video.uploadDate}</p>
                    </div>
                    <div className={`text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap ${!isDescriptionExpanded && 'line-clamp-2'}`}>
                        {video.description}
                        {video.hashtags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2 text-blue-600 dark:text-blue-400">
                                {video.hashtags.map(tag => <span key={tag}>{tag}</span>)}
                            </div>
                        )}
                    </div>
                    <button className="font-bold text-sm mt-1 text-gray-500 dark:text-gray-400">
                        {isDescriptionExpanded ? 'Show less' : '...more'}
                    </button>
                </div>

                {/* Comments Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                        {formatNumber(comments.length)} Comments
                    </h2>
                    
                    {/* Add Comment */}
                     <form onSubmit={handleCommentSubmit} className="flex items-start gap-4 mb-8">
                        <img src={CURRENT_USER_PROFILE.avatar} className="w-10 h-10 rounded-full object-cover"/>
                        <div className="flex-1">
                            <input 
                                type="text" 
                                placeholder="Add a comment..." 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-2 transition-colors text-sm"
                            />
                            {newComment && (
                                <div className="flex justify-end gap-2 mt-3 animate-in fade-in slide-in-from-top-2">
                                    <button type="button" onClick={() => setNewComment('')} className="px-4 py-2 text-sm font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                    <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-full bg-brand-orange text-white shadow-md hover:bg-brand-orange/90 transition-transform hover:scale-105">Comment</button>
                                </div>
                            )}
                        </div>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.length === 0 ? (
                            <p className="text-center text-gray-500 py-4">No comments yet. Be the first to share your thoughts!</p>
                        ) : (
                            comments.map(comment => (
                                <CommentItem 
                                    key={comment.id} 
                                    comment={comment}
                                    onDelete={comment.user.name === CURRENT_USER_PROFILE.displayName ? () => deleteComment(video.id, comment.id) : undefined}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Recommended Videos */}
            <div className="lg:col-span-4 space-y-4">
                <h3 className="font-bold text-lg mb-4 lg:hidden">Recommended</h3>
                {recommendedVideos.map(recVideo => (
                    <RecommendedVideoCard key={recVideo.id} video={recVideo} onSelect={onSelectVideo} onSelectChannel={onSelectChannel} />
                ))}
            </div>
        </div>
    );
};
