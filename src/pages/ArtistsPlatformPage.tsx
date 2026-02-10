
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserProfile, PlatformRole, PortfolioItem, ArtistCategory } from '../types';
import { USER_PROFILES, ARTIST_CATEGORIES } from '../constants';
import { Edit, Star, Verified, MoreVertical, Instagram, Facebook, Youtube, Globe, Palette, UserPlus, MessageSquare as MessageSquareIcon, Image as ImageIcon, Video as VideoIcon, Film, Trash2, X, ChevronLeft, ChevronRight, Plus, ExternalLink, MapPin, Briefcase, Award, User as UserIcon, Search, Filter, ArrowLeft } from 'lucide-react';
import { EditProfileModal } from '../components/EditProfileModal';
import { PortfolioAddItemModal } from '../components/PortfolioAddItemModal';
import { ChatOverlay } from '../components/artists/ChatOverlay';

interface ArtistsPlatformPageProps {
  onNavigate: (page: string) => void;
  targetArtistId?: string | null;
}

// --- Helper function for profile completion ---
const calculateProfileCompletion = (profile: UserProfile): number => {
    let score = 0;
    if (profile.fullName) score += 10;
    if (profile.bio && profile.bio.length > 20) score += 10;
    if (profile.artist?.primaryCategory) score += 10;
    if (profile.artist?.secondaryCategories && profile.artist.secondaryCategories.length > 0) score += 5;
    if (profile.address?.city) score += 10;
    if (profile.experience !== undefined && profile.experience >= 0) score += 5;
    if (profile.artist?.rate) score += 10;
    if (profile.socials && (profile.socials.youtube || profile.socials.instagram || profile.socials.website || profile.socials.facebook)) score += 10;
    if (profile.portfolio && profile.portfolio.length > 0) score += 20;
    if (profile.artist?.achievements && profile.artist.achievements.length > 0) score += 10;
    return Math.min(score, 100);
};

// --- MOCK DATA SERVICE ---
const useArtistData = () => {
    const [artists, setArtists] = useState<UserProfile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setArtists(USER_PROFILES);
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);
    
    const getArtistById = (id: string) => artists.find(a => a.id === id);
    
    const saveArtist = (updatedProfile: Partial<UserProfile>) => {
        setArtists(prev => 
            prev.map(a => {
                if (a.id === updatedProfile.id) {
                    const newProfile = { ...a, ...updatedProfile };
                    if (updatedProfile.artist) {
                        newProfile.artist = { ...(a.artist as object), ...updatedProfile.artist };
                    }
                    if (updatedProfile.portfolio) {
                        newProfile.portfolio = updatedProfile.portfolio;
                    }
                    if (updatedProfile.socials) {
                        newProfile.socials = { ...(a.socials || {}), ...updatedProfile.socials };
                    }
                    return newProfile;
                }
                return a;
            })
        );
    };

    return { artists, getArtistById, saveArtist, isLoading };
};

// --- SUB-COMPONENTS ---

const PortfolioCard: React.FC<{ 
    item: PortfolioItem; 
    onView: () => void; 
    onEdit?: () => void; 
    onDelete?: () => void;
    isOwner: boolean;
}> = ({ item, onView, onEdit, onDelete, isOwner }) => {
    
    const Icon = useMemo(() => {
        if (item.youtubeUrl) return Youtube;
        if (item.type === 'photo') return ImageIcon;
        if (item.type === 'video') return VideoIcon;
        if (item.type === 'short') return Film;
        return ImageIcon;
    }, [item]);

    return (
        <div onClick={onView} className="group relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-2 left-2 p-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white">
                <Icon size={14} />
            </div>
            
            {isOwner && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                     {onEdit && (
                         <button 
                            onClick={(e) => { e.stopPropagation(); onEdit(); }} 
                            className="p-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-brand-orange transition-colors"
                            title="Edit"
                         >
                            <Edit size={14} />
                         </button>
                     )}
                     {onDelete && (
                         <button 
                            onClick={(e) => { e.stopPropagation(); onDelete(); }} 
                            className="p-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-red-500 transition-colors"
                            title="Delete"
                         >
                            <Trash2 size={14} />
                         </button>
                     )}
                </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h4 className="font-bold text-sm truncate">{item.title}</h4>
                <p className="text-xs text-gray-200 line-clamp-2">{item.caption}</p>
            </div>
        </div>
    );
};

const PortfolioViewer: React.FC<{ portfolio: PortfolioItem[]; currentIndex: number | null; onClose: () => void; onNavigate: (index: number) => void; }> = ({ portfolio, currentIndex, onClose, onNavigate }) => {
    if (currentIndex === null) return null;
    const item = portfolio[currentIndex];
    if (!item) return null;

    const getYouTubeEmbedUrl = (url: string) => {
        let videoId = '';
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === 'youtu.be') videoId = urlObj.pathname.slice(1);
            else if (urlObj.hostname.includes('youtube.com')) videoId = urlObj.searchParams.get('v') || '';
        } catch (e) { return null; }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    };
    
    const embedUrl = item.youtubeUrl ? getYouTubeEmbedUrl(item.youtubeUrl) : null;
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < portfolio.length - 1;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" onClick={onClose} />
            {canGoPrev && (
                <button onClick={() => onNavigate(currentIndex - 1)} className="absolute left-4 md:left-8 z-20 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                    <ChevronLeft />
                </button>
            )}
            <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in">
                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <div className="text-white">
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.caption}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-white bg-gray-800 hover:bg-gray-700"><X size={20} /></button>
                </div>
                <div className="flex-1 flex items-center justify-center p-4 bg-black">
                    {item.youtubeUrl && embedUrl && <iframe src={embedUrl} title={item.title} frameBorder="0" allowFullScreen className="w-full aspect-video" />}
                    {item.mediaUrl && item.type === 'photo' && <img src={item.mediaUrl} alt={item.title} className="max-w-full max-h-full object-contain" />}
                    {item.mediaUrl && (item.type === 'video' || item.type === 'short') && <video src={item.mediaUrl} controls autoPlay className="max-w-full max-h-full object-contain" />}
                </div>
            </div>
            {canGoNext && (
                 <button onClick={() => onNavigate(currentIndex + 1)} className="absolute right-4 md:right-8 z-20 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                    <ChevronRight />
                </button>
            )}
        </div>
    );
};

const ArtistCard: React.FC<{ artist: UserProfile; onSelect: (id: string) => void; isSelected: boolean }> = ({ artist, onSelect, isSelected }) => {
    return (
        <div 
            onClick={() => onSelect(artist.id)}
            className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-4 relative overflow-hidden
                ${isSelected 
                    ? 'bg-white dark:bg-gray-800 border-brand-orange shadow-lg ring-1 ring-brand-orange' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-brand-orange/50 hover:shadow-md'
                }`}
        >
            <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                    <img src={artist.avatar} alt={artist.displayName} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700 group-hover:border-brand-orange/30 transition-colors" />
                    {artist.status === 'online' && (
                        <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" title="Online"></span>
                    )}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate text-lg group-hover:text-brand-orange transition-colors">
                            {artist.displayName}
                        </h3>
                        {artist.isVerified && <Verified size={18} className="text-blue-500 fill-blue-500/20" />}
                    </div>
                    
                    <p className="text-sm text-brand-orange font-medium mb-1">
                        {artist.artist?.primaryCategory || artist.platformRole}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {artist.address.city}</span>
                        <span className="flex items-center gap-1"><Briefcase size={12} /> {artist.experience}y Exp</span>
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed min-h-[2.5em]">
                {artist.bio || "No bio available."}
            </p>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <Star size={14} className="text-amber-400 fill-current" />
                    <span>4.9</span>
                    <span className="text-xs text-gray-400 font-normal">(25)</span>
                </div>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Profile <ChevronRight size={14} />
                </span>
            </div>
        </div>
    );
};

const ArtistCardSkeleton: React.FC = () => (
    <div className="p-5 rounded-2xl border border-white/5 bg-white/5 relative overflow-hidden h-[180px] flex flex-col gap-4">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
        </div>
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="mt-auto flex justify-between items-center">
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
    </div>
);

interface ArtistProfileDetailProps { 
    artist: UserProfile; 
    onEdit: () => void; 
    onStartChat: (artistId: string) => void;
    onAddPortfolioItem: () => void;
    onEditPortfolioItem: (item: PortfolioItem) => void;
    onDeletePortfolioItem: (id: string) => void;
    onViewPortfolioItem: (item: PortfolioItem) => void;
}

const ArtistProfileDetail: React.FC<ArtistProfileDetailProps> = ({ 
    artist, onEdit, onStartChat, onAddPortfolioItem, onEditPortfolioItem, onDeletePortfolioItem, onViewPortfolioItem 
}) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('About');
    const [isFollowed, setIsFollowed] = useState(false);
    const isCurrentUserProfile = user?.profileId === artist.id;

    const profileCompletionScore = useMemo(() => calculateProfileCompletion(artist), [artist]);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col shadow-sm">
            {/* Header */}
            <div className="relative group/cover">
                <img src={artist.coverPhoto} alt="Cover" className="w-full h-48 object-cover" />
                {isCurrentUserProfile && (
                    <button 
                        onClick={onEdit}
                        className="absolute top-4 right-16 p-2 bg-black/40 backdrop-blur-sm text-white rounded-lg shadow-md hover:bg-brand-orange transition-colors opacity-0 group-hover/cover:opacity-100"
                        title="Edit Cover & Profile"
                    >
                        <Edit size={16} />
                    </button>
                )}
                <div className="absolute bottom-0 left-6 translate-y-1/2 group/avatar">
                    <img src={artist.avatar} alt={artist.displayName} className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-md bg-white dark:bg-gray-800" />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                     <button className="p-2.5 bg-white/80 backdrop-blur-sm text-gray-800 rounded-lg shadow-md hover:bg-white transition-colors">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>
            
            {/* Info */}
            <div className="pt-20 px-6 pb-4">
                <div className="flex justify-between items-start">
                    <div className="relative group/info">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{artist.displayName}</h2>
                            {artist.isVerified && <Verified size={20} className="text-blue-500 fill-current" />}
                            {isCurrentUserProfile && (
                                <button onClick={onEdit} className="p-1 text-gray-400 hover:text-brand-orange opacity-0 group-hover/info:opacity-100 transition-opacity">
                                    <Edit size={14} />
                                </button>
                            )}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">{artist.artist?.primaryCategory || artist.platformRole} <span className="mx-1">•</span> {artist.address.city}</p>
                        {/* Status Indicator */}
                        <div className="mt-2 flex items-center gap-2 text-xs">
                            {artist.status === 'online' ? (
                                <>
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="font-semibold text-green-600 dark:text-green-400">Online Now</span>
                                </>
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400">Last seen {artist.status}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2">
                             {isCurrentUserProfile ? (
                                 <button onClick={onEdit} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-xs rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1.5 transition-colors border border-gray-200 dark:border-gray-700">
                                    <Edit size={14} /> Edit Profile
                                </button>
                             ) : (
                                <>
                                    <button 
                                        className="px-4 py-2 bg-brand-green text-white font-bold text-xs rounded-lg shadow-md hover:bg-brand-green/90 transition-colors flex items-center gap-1.5"
                                        onClick={() => alert("Hiring feature coming soon!")}
                                    >
                                        <Briefcase size={14} /> Hire Artist
                                    </button>
                                    <button 
                                        onClick={() => setIsFollowed(!isFollowed)}
                                        className={`px-4 py-2 font-bold text-xs rounded-lg shadow-sm border flex items-center gap-1.5 transition-colors ${isFollowed ? 'bg-gray-100 text-gray-800 border-gray-300' : 'bg-brand-orange text-white border-transparent hover:bg-brand-orange/90'}`}
                                    >
                                        <UserPlus size={14} /> {isFollowed ? 'Following' : 'Follow'}
                                    </button>
                                    <button onClick={() => onStartChat(artist.id)} className="p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" title="Message">
                                        <MessageSquareIcon size={18} />
                                    </button>
                                </>
                             )}
                        </div>
                        <div className="flex items-center gap-2">
                            {artist.socials.instagram && <a href={artist.socials.instagram} target="_blank" className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-500 hover:text-pink-500 transition-colors"><Instagram size={18}/></a>}
                            {artist.socials.youtube && <a href={artist.socials.youtube} target="_blank" className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-500 hover:text-red-500 transition-colors"><Youtube size={18}/></a>}
                            {artist.socials.website && <a href={artist.socials.website} target="_blank" className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"><Globe size={18}/></a>}
                        </div>
                    </div>
                </div>
                
                {/* Profile Completion Score */}
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {isCurrentUserProfile ? 'Your Profile Completion' : 'Profile Strength'}
                        </h4>
                        <span className={`text-xs font-bold ${profileCompletionScore >= 80 ? 'text-brand-green' : 'text-brand-orange'}`}>
                            {profileCompletionScore}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${profileCompletionScore >= 80 ? 'bg-brand-green' : 'bg-brand-orange'}`}
                            style={{ width: `${profileCompletionScore}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-6 mt-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-6 text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {['About', 'Portfolio', 'Reviews'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 border-b-2 transition-colors ${activeTab === tab ? 'border-brand-orange text-brand-orange' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 dark:bg-gray-900/50">
                {activeTab === 'About' && (
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-6 animate-fade-in">
                        {/* Bio Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative group/bio">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-base flex items-center gap-2">
                                <UserIcon size={18} className="text-brand-orange" /> Biography
                            </h3>
                            <p className="leading-relaxed">{artist.bio || "No biography provided yet."}</p>
                            {isCurrentUserProfile && (
                                <button onClick={onEdit} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-brand-orange bg-gray-50 dark:bg-gray-700 rounded-full opacity-0 group-hover/bio:opacity-100 transition-all">
                                    <Edit size={14} />
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Professional Details Card */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-base border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
                                    <Briefcase size={18} className="text-green-500" /> Professional Details
                                </h3>
                                <div className="space-y-3">
                                    {artist.artist && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 dark:text-gray-400">Status</span>
                                                <span className={`font-semibold ${artist.isVerified ? 'text-blue-500' : 'text-gray-500'}`}>
                                                    {artist.isVerified ? 'Verified Artist' : 'Unverified'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 dark:text-gray-400">Primary Category</span>
                                                <span className="font-semibold text-brand-orange">{artist.artist.primaryCategory}</span>
                                            </div>
                                            {artist.artist.secondaryCategories && artist.artist.secondaryCategories.length > 0 && (
                                                <div className="flex justify-between items-start">
                                                    <span className="text-gray-500 dark:text-gray-400">Other Categories</span>
                                                    <div className="flex flex-wrap justify-end gap-1 max-w-[60%]">
                                                        {artist.artist.secondaryCategories.map(cat => (
                                                            <span key={cat} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{cat}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-start">
                                                <span className="text-gray-500 dark:text-gray-400">Specialties</span>
                                                <div className="flex flex-wrap justify-end gap-1 max-w-[60%]">
                                                    {artist.artist.specialties.map(spec => (
                                                        <span key={spec} className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{spec}</span>
                                                    ))}
                                                </div>
                                            </div>
                                             <div className="flex justify-between items-center">
                                                <span className="text-gray-500 dark:text-gray-400">Experience</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{artist.experience} Years</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 dark:text-gray-400">Rate / Fee</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{artist.artist.rate || 'N/A'}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Personal Details Card */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-base border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
                                    <MapPin size={18} className="text-blue-500" /> Location & Info
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">City</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{artist.address.city}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">State</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{artist.address.state}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">Country</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{artist.address.country}</span>
                                    </div>
                                    {artist.address.pincode && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 dark:text-gray-400">Pincode</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">{artist.address.pincode}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">Joined</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{artist.joinedDate}</span>
                                    </div>
                                     <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">Languages</span>
                                        <span className="font-semibold text-gray-900 dark:text-white text-right max-w-[60%] truncate">{artist.languages.join(', ')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Achievements Section */}
                        {artist.artist?.achievements && artist.artist.achievements.length > 0 && (
                             <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-6 rounded-xl border border-amber-100 dark:border-amber-900/30">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-base flex items-center gap-2">
                                    <Award size={18} className="text-amber-500" /> Key Achievements
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {artist.artist.achievements.map((ach, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-amber-100/50 dark:border-amber-900/20">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                                                <Award size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{ach}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                 {activeTab === 'Portfolio' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
                        {/* Add New Item Button (Owner Only) */}
                        {isCurrentUserProfile && (
                            <button 
                                onClick={onAddPortfolioItem}
                                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 hover:text-brand-orange hover:border-brand-orange hover:bg-brand-orange/5 transition-all"
                            >
                                <Plus size={32} />
                                <span className="text-xs font-bold mt-2">Add Work</span>
                            </button>
                        )}
                        
                        {/* Portfolio Items */}
                        {artist.portfolio?.map((item) => (
                            <PortfolioCard 
                                key={item.id} 
                                item={item} 
                                onView={() => onViewPortfolioItem(item)}
                                onEdit={() => onEditPortfolioItem(item)}
                                onDelete={() => onDeletePortfolioItem(item.id)}
                                isOwner={isCurrentUserProfile}
                            />
                        ))}
                        
                        {(!artist.portfolio || artist.portfolio.length === 0) && !isCurrentUserProfile && (
                            <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
                                <Palette size={48} className="mx-auto mb-4 opacity-50" />
                                <p>No portfolio items yet.</p>
                            </div>
                        )}
                    </div>
                 )}
                 
                 {activeTab === 'Reviews' && (
                     <div className="animate-fade-in text-center py-10">
                         <div className="inline-block p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-full mb-4">
                             <Star size={40} className="text-yellow-500 fill-current" />
                         </div>
                         <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reviews & Ratings</h3>
                         <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-2">
                             Feature coming soon! Clients will be able to rate and review artists here.
                         </p>
                     </div>
                 )}
            </div>
        </div>
    );
};

export const ArtistsPlatformPage: React.FC<ArtistsPlatformPageProps> = ({ onNavigate, targetArtistId }) => {
    const { user } = useAuth();
    const { artists, saveArtist, isLoading } = useArtistData();
    const [selectedArtistId, setSelectedArtistId] = useState<string | null>(targetArtistId || null);
    
    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [locationFilter, setLocationFilter] = useState('');

    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
    const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);
    const [chatTargetId, setChatTargetId] = useState<string | null>(null);
    const [viewingPortfolioIndex, setViewingPortfolioIndex] = useState<number | null>(null);

    const filteredArtists = useMemo(() => {
        return artists.filter(artist => {
            const matchesSearch = artist.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  artist.bio.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || 
                                    artist.artist?.primaryCategory === selectedCategory ||
                                    artist.artist?.secondaryCategories?.includes(selectedCategory as ArtistCategory);
            const matchesLocation = locationFilter === '' || artist.address.city.toLowerCase().includes(locationFilter.toLowerCase());
            
            // Only show artistic roles
            const isArtist = [PlatformRole.Artist, PlatformRole.PerformingArtsTeacher, PlatformRole.TrainerCoach].includes(artist.platformRole);
            
            return matchesSearch && matchesCategory && matchesLocation && isArtist;
        });
    }, [artists, searchTerm, selectedCategory, locationFilter]);

    const selectedArtist = useMemo(() => artists.find(a => a.id === selectedArtistId), [artists, selectedArtistId]);

    const handleSaveProfile = (updatedData: Partial<UserProfile>) => {
        saveArtist(updatedData);
        // Refresh local state if the edited artist is the selected one
        if (selectedArtist && updatedData.id === selectedArtist.id) {
             // force update logic handled by hook
        }
    };

    const handlePortfolioSave = (item: PortfolioItem) => {
        if (!selectedArtist) return;
        const currentPortfolio = selectedArtist.portfolio || [];
        const existingIndex = currentPortfolio.findIndex(p => p.id === item.id);
        let newPortfolio;
        if (existingIndex >= 0) {
            newPortfolio = [...currentPortfolio];
            newPortfolio[existingIndex] = item;
        } else {
            newPortfolio = [item, ...currentPortfolio];
        }
        saveArtist({ id: selectedArtist.id, portfolio: newPortfolio });
        setIsPortfolioModalOpen(false);
        setEditingPortfolioItem(null);
    };

    const handlePortfolioDelete = (itemId: string) => {
        if (!selectedArtist) return;
        const newPortfolio = (selectedArtist.portfolio || []).filter(p => p.id !== itemId);
        saveArtist({ id: selectedArtist.id, portfolio: newPortfolio });
    };

    // Main Render
    return (
        <div id="artists-platform-top" className="min-h-screen bg-gray-50 dark:bg-brand-darker pt-24 pb-12 font-sans">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
                
                {/* Navigation / Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => selectedArtistId ? setSelectedArtistId(null) : onNavigate('dashboard')} 
                            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold hover:text-brand-orange transition-colors"
                        >
                            <ArrowLeft size={18} /> {selectedArtistId ? 'Back to Artists' : 'Back to Dashboard'}
                        </button>
                        {!selectedArtistId && (
                            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                <Palette className="text-brand-orange" /> Artists Directory
                            </h1>
                        )}
                    </div>
                    
                    {!selectedArtistId && (
                        <div className="flex gap-2">
                            <button 
                                onClick={() => onNavigate('user-profile')}
                                className="px-5 py-2.5 bg-brand-orange text-white text-sm font-bold rounded-xl shadow-md hover:bg-brand-orange/90 transition-all flex items-center gap-2"
                            >
                                <UserIcon size={16} /> My Profile
                            </button>
                        </div>
                    )}
                </div>

                {/* Content Area */}
                {selectedArtistId && selectedArtist ? (
                    // Detail View
                    <div className="flex-1 animate-fade-in">
                        <ArtistProfileDetail 
                            artist={selectedArtist}
                            onEdit={() => setIsEditModalOpen(true)}
                            onStartChat={(id) => setChatTargetId(id)}
                            onAddPortfolioItem={() => { setEditingPortfolioItem(null); setIsPortfolioModalOpen(true); }}
                            onEditPortfolioItem={(item) => { setEditingPortfolioItem(item); setIsPortfolioModalOpen(true); }}
                            onDeletePortfolioItem={handlePortfolioDelete}
                            onViewPortfolioItem={(item) => {
                                const idx = (selectedArtist.portfolio || []).findIndex(p => p.id === item.id);
                                setViewingPortfolioIndex(idx);
                            }}
                        />
                    </div>
                ) : (
                    // List View
                    <div className="flex-1 flex flex-col">
                        {/* Filters */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 sticky top-20 z-20">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Search artists by name or bio..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                                    />
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                    <div className="relative min-w-[150px]">
                                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <select 
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full pl-9 pr-8 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white appearance-none cursor-pointer"
                                        >
                                            <option value="All">All Categories</option>
                                            {ARTIST_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div className="relative min-w-[150px]">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="text" 
                                            placeholder="Location" 
                                            value={locationFilter}
                                            onChange={(e) => setLocationFilter(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Artists Grid */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Array(8).fill(0).map((_, i) => <ArtistCardSkeleton key={i} />)}
                            </div>
                        ) : filteredArtists.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredArtists.map(artist => (
                                    <ArtistCard 
                                        key={artist.id} 
                                        artist={artist} 
                                        onSelect={setSelectedArtistId}
                                        isSelected={false}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                                <Palette size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Artists Found</h3>
                                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modals */}
            {selectedArtist && (
                <EditProfileModal 
                    isOpen={isEditModalOpen} 
                    onClose={() => setIsEditModalOpen(false)} 
                    profile={selectedArtist} 
                    onSave={handleSaveProfile} 
                />
            )}

            <PortfolioAddItemModal 
                isOpen={isPortfolioModalOpen} 
                onClose={() => { setIsPortfolioModalOpen(false); setEditingPortfolioItem(null); }} 
                onSave={handlePortfolioSave}
                itemToEdit={editingPortfolioItem}
            />

            {chatTargetId && (
                <ChatOverlay 
                    onClose={() => setChatTargetId(null)} 
                    initialTargetUserId={chatTargetId} 
                />
            )}

            {selectedArtist && viewingPortfolioIndex !== null && (
                <PortfolioViewer 
                    portfolio={selectedArtist.portfolio || []} 
                    currentIndex={viewingPortfolioIndex} 
                    onClose={() => setViewingPortfolioIndex(null)}
                    onNavigate={setViewingPortfolioIndex}
                />
            )}
        </div>
    );
};
