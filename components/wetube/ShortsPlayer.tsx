
import React, { useState, useRef, useEffect } from 'react';
import { Video, Comment } from '../../types';
import { X, Play, Volume2, VolumeX, Heart, MessageSquare, Share2, MoreVertical, Loader2, AlertTriangle, ThumbsDown, Music, Plus, Smile, Send, Maximize, Minimize, Disc } from 'lucide-react';
import { MOCK_COMMENTS, CURRENT_USER_PROFILE } from '../../constants';

interface ShortsPlayerProps {
    shorts: Video[];
    initialIndex: number;
    onClose: () => void;
    onSelectChannel: (profileId: string) => void;
}

const CommentItem: React.FC<{ comment: Comment, isReply?: boolean }> = ({ comment, isReply = false }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(comment.likes);

    const handleLike = () => {
        setIsLiked(prev => !prev);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <div className={`flex gap-3 ${isReply ? 'mt-4' : ''}`}>
            <img src={comment.user.avatar} className={`${isReply ? 'w-6 h-6' : 'w-9 h-9'} rounded-full mt-1`} />
            <div className="flex-1">
                <div className="text-xs">
                    <span className="font-semibold text-gray-600 dark:text-gray-300 mr-2">{comment.user.name}</span>
                    <span className="text-gray-400 dark:text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200 mt-0.5">{comment.text}</p>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <button onClick={handleLike} className={`flex items-center gap-1 font-semibold hover:text-red-500 ${isLiked ? 'text-red-500' : ''}`}>
                        <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} /> {likeCount > 0 && likeCount}
                    </button>
                    <button className="font-semibold">Reply</button>
                </div>
                {comment.replies && (
                    <div className="mt-2">
                        {comment.replies.map(reply => <CommentItem key={reply.id} comment={reply} isReply />)}
                    </div>
                )}
            </div>
        </div>
    );
};


const CommentsPanel: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    stats: Video['stats'];
}> = ({ isOpen, onClose, stats }) => {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() === '') return;
        
        const commentToAdd: Comment = {
            id: `new-${Date.now()}`,
            user: { name: CURRENT_USER_PROFILE.displayName, avatar: CURRENT_USER_PROFILE.avatar },
            text: newComment,
            timestamp: 'Just now',
            likes: 0,
            replies: [],
        };
        setComments(prev => [commentToAdd, ...prev]);
        setNewComment('');
    };

    return (
        <div className={`fixed inset-0 z-30 transition-all duration-300 pointer-events-auto ${isOpen ? 'visible' : 'invisible'}`}>
            {/* Backdrop */}
            <div onClick={onClose} className={`absolute inset-0 bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Panel */}
            <div className={`absolute bottom-0 left-0 right-0 h-[75%] bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 text-center relative">
                    <div className="w-10 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2 cursor-grab" onPointerDown={onClose} />
                    <h3 className="font-bold text-gray-900 dark:text-white">{stats.comments.toLocaleString()} Comments</h3>
                    <button onClick={onClose} className="absolute top-1/2 -translate-y-1/2 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={20} />
                    </button>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <img src={CURRENT_USER_PROFILE.avatar} className="w-9 h-9 rounded-full" />
                        <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white"
                            />
                            <button type="button" className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 mr-2"><Smile size={20} /></button>
                            <button type="submit" disabled={!newComment.trim()} className="text-red-500 disabled:text-gray-400 font-semibold text-sm">
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ControlButton: React.FC<{
  icon: React.ElementType;
  label?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  activeClassName?: string;
  count?: string | number;
}> = ({ icon: Icon, label, count, isActive, isDisabled, onClick, className = '', activeClassName = '' }) => {
  return (
    <button 
        onClick={isDisabled ? undefined : onClick} 
        disabled={isDisabled}
        className={`group flex flex-col items-center gap-1 transition-all duration-200 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-90'}`}
    >
        <div className={`p-3 rounded-full bg-black/20 backdrop-blur-sm transition-colors ${isActive ? 'bg-black/40' : 'hover:bg-black/30'}`}>
            <Icon 
                size={28} 
                className={`text-white drop-shadow-md transition-all duration-300 ${className} ${isActive ? activeClassName : ''}`} 
                fill={isActive && activeClassName.includes('fill-current') ? 'currentColor' : isActive && activeClassName.includes('fill-white') ? 'white' : 'none'}
            />
        </div>
        {(label || count) && (
            <span className="text-xs font-bold text-white drop-shadow-md tracking-wide">
                {count || label}
            </span>
        )}
    </button>
  );
};

const ShortItem: React.FC<{
    short: Video;
    isVisible: boolean;
    onSelectChannel: (profileId: string) => void;
    onClose: () => void;
    onToggleFullscreen: () => void;
    isNativeFullscreen: boolean;
}> = ({ short, isVisible, onSelectChannel, onClose, onToggleFullscreen, isNativeFullscreen }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Interaction State
    const [isLiking, setIsLiking] = useState(false); 
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [likeCount, setLikeCount] = useState(short.stats.likes);
    const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const handlePlay = () => {
        const video = videoRef.current;
        if (video) {
            video.play().then(() => setIsPlaying(true)).catch(e => {
                // Auto-play might be blocked, mute and try again
                if (e.name === 'NotAllowedError') {
                    setIsMuted(true);
                    video.muted = true;
                    video.play().then(() => setIsPlaying(true)).catch(e => console.error("Autoplay failed:", e));
                } else if (e.name !== 'AbortError') {
                    setHasError(true);
                }
                setIsPlaying(false);
            });
        }
    };
    
    const handlePause = () => {
        const video = videoRef.current;
        if (video) {
            video.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (isVisible) {
            handlePlay();
        } else {
            handlePause();
            if (videoRef.current) videoRef.current.currentTime = 0;
        }
    }, [isVisible]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) handlePause();
            else if (isVisible) handlePlay();
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [isVisible]);
    
    const togglePlay = () => isPlaying ? handlePause() : handlePlay();
    
    const handleLikeToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiking(true);
        setTimeout(() => setIsLiking(false), 300);

        setIsLiked(current => {
            const newLikedState = !current;
            setLikeCount(count => newLikedState ? count + 1 : count - 1);
            if (newLikedState && isDisliked) setIsDisliked(false);
            return newLikedState;
        });
    };

    const handleDislikeToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDisliked(current => {
            const newDislikedState = !current;
            if (newDislikedState && isLiked) {
                setIsLiked(false);
                setLikeCount(count => count - 1);
            }
            return newDislikedState;
        });
    };
    
    const handleChannelClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelectChannel(short.submittedBy);
        onClose();
    };

    const handleSubscribeToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSubscribed(prev => !prev);
    };

    const formatStat = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };
    
    const soundTitle = `Original Sound - ${short.creator.name}`;
    const isCaptionLong = short.description.length > 80;


    return (
        <div className="w-full h-full relative snap-start flex items-center justify-center bg-black">
            <video
                ref={videoRef}
                src={short.mediaUrl}
                loop
                playsInline
                muted={isMuted}
                className="w-full h-full object-cover"
                onClick={togglePlay}
                onCanPlay={() => { setIsLoading(false); setHasError(false); }}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
                onError={() => { setIsLoading(false); setHasError(true); }}
            />

            {hasError && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
                    <AlertTriangle size={48} className="text-red-500 mb-4" />
                    <h3 className="text-lg font-bold text-white">Video Unavailable</h3>
                    <p className="text-sm text-gray-300">This video may have been removed or is restricted.</p>
                 </div>
            )}
            {isLoading && !hasError && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader2 size={48} className="text-white/80 animate-spin" />
                 </div>
            )}
            {!isPlaying && !isLoading && !hasError && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20" onClick={togglePlay}>
                     <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer animate-zoom-in">
                        <Play size={48} className="text-white/80 fill-white/80 ml-1" />
                     </div>
                 </div>
            )}
            
            {!hasError && (
              <div className="absolute inset-0 text-white pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                {/* Top Controls */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-auto">
                    <button onClick={onClose} className="p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors">
                        <X size={24} />
                    </button>
                    <div className="flex gap-4">
                        <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors">
                            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                        </button>
                        <button onClick={onToggleFullscreen} className="p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors">
                            {isNativeFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                        </button>
                    </div>
                </div>

                {/* Bottom Info Area */}
                <div className="absolute bottom-0 left-0 p-4 pb-8 flex items-end max-w-[calc(100%-80px)]">
                    <div className="flex-1 space-y-4 self-end pointer-events-auto">
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleChannelClick}>
                            <span className="font-bold text-lg drop-shadow-md group-hover:underline">@{short.creator.name}</span>
                            {!isSubscribed && (
                                <button 
                                    onClick={handleSubscribeToggle}
                                    className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    Subscribe
                                </button>
                            )}
                        </div>
                        
                        <div className="text-sm drop-shadow-md cursor-pointer transition-all" onClick={() => isCaptionLong && setIsCaptionExpanded(!isCaptionExpanded)}>
                            <p className={`${!isCaptionExpanded && isCaptionLong && 'line-clamp-2'} leading-relaxed text-gray-100`}>
                                {short.description}
                            </p>
                            {isCaptionLong && (
                                <span className="font-bold text-gray-300 text-xs mt-1 block">
                                    {isCaptionExpanded ? 'Show less' : '...more'}
                                </span>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm pt-2 w-full max-w-[250px]">
                            <Music size={14} />
                            <div className="overflow-hidden relative h-5 flex-1">
                                <div className="absolute whitespace-nowrap will-change-transform animate-marquee">
                                    <span className="mr-8">{soundTitle}</span>
                                </div>
                                 <div className="absolute whitespace-nowrap will-change-transform animate-marquee2">
                                    <span className="mr-8">{soundTitle}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Floating Control Bar */}
                <div className="absolute bottom-8 right-2 z-20 flex flex-col items-center gap-6 pointer-events-auto">
                    {/* Creator Avatar */}
                    <div className="relative group cursor-pointer" onClick={handleChannelClick}>
                        <img src={short.creator.avatar} className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg transition-transform group-hover:scale-110" />
                        {!isSubscribed && (
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm" onClick={handleSubscribeToggle}>
                                <Plus size={12} strokeWidth={3} />
                            </div>
                        )}
                    </div>
                    
                    {/* Like */}
                    <ControlButton 
                        icon={Heart} 
                        count={formatStat(likeCount)} 
                        isActive={isLiked} 
                        onClick={handleLikeToggle} 
                        className={isLiking ? 'scale-125 transition-transform duration-150' : ''}
                        activeClassName="text-red-500 fill-current" 
                    />
                    
                    {/* Dislike */}
                    <ControlButton 
                        icon={ThumbsDown} 
                        label="Dislike" 
                        isActive={isDisliked} 
                        onClick={handleDislikeToggle} 
                        activeClassName="fill-white"
                    />
                    
                    {/* Comment */}
                    <ControlButton 
                        icon={MessageSquare} 
                        count={formatStat(short.stats.comments)} 
                        onClick={() => setIsCommentsOpen(true)} 
                    />
                    
                    {/* Share */}
                    <ControlButton 
                        icon={Share2} 
                        label="Share" 
                        onClick={() => alert('Share functionality coming soon!')} 
                    />

                    {/* Remix / Use Sound */}
                    <ControlButton 
                        icon={Disc} 
                        label="Remix" 
                        onClick={() => alert('Remixing this sound...')}
                        className="animate-spin-slow"
                    />
                    
                    {/* More Options */}
                    <ControlButton 
                        icon={MoreVertical} 
                        onClick={() => alert('More options')} 
                    />

                    {/* Album Art (Static for now, usually matches Remix) */}
                    <div className="w-10 h-10 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center overflow-hidden animate-spin-slow mt-2">
                         <img src={short.thumbnailUrl} className="w-full h-full object-cover opacity-80" />
                    </div>
                </div>
                
                 <CommentsPanel 
                    isOpen={isCommentsOpen}
                    onClose={() => setIsCommentsOpen(false)}
                    stats={short.stats}
                 />
              </div>
            )}
        </div>
    );
};


export const ShortsPlayer: React.FC<ShortsPlayerProps> = ({ shorts, initialIndex, onClose, onSelectChannel }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

    const toggleNativeFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsNativeFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            // Scroll to initial index immediately
            container.scrollTop = initialIndex * container.clientHeight;

            const handleScroll = () => {
                if(container){
                    const newIndex = Math.round(container.scrollTop / container.clientHeight);
                    if (newIndex !== currentIndex) {
                        setCurrentIndex(newIndex);
                    }
                }
            };
            // Use a small timeout to attach scroll listener to avoid initial scroll triggering
            setTimeout(() => {
                 container.addEventListener('scroll', handleScroll, { passive: true });
            }, 100);
            
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []); // Only run once on mount (and use initialIndex then)

    return (
        <div className="fixed inset-0 bg-black z-50 text-white">
            <div 
                ref={containerRef}
                className="w-full h-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {shorts.map((short, index) => (
                    <ShortItem 
                        key={short.id} 
                        short={short} 
                        isVisible={index === currentIndex} 
                        onSelectChannel={onSelectChannel}
                        onClose={onClose}
                        onToggleFullscreen={toggleNativeFullscreen}
                        isNativeFullscreen={isNativeFullscreen}
                    />
                ))}
            </div>
        </div>
    );
};
