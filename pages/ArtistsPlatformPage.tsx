
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserProfile, PlatformRole, PortfolioItem } from '../types';
import { USER_PROFILES } from '../constants';
import { Edit, Star, Bookmark, Verified, MoreVertical, Instagram, Facebook, Youtube, Globe, Palette, UserPlus, Camera, MessageSquare as MessageSquareIcon, Image as ImageIcon, Video as VideoIcon, Film, Trash2, X, ChevronLeft, ChevronRight, Plus, ExternalLink } from 'lucide-react';
import { EditProfileModal } from '../components/EditProfileModal';
import { PortfolioAddItemModal } from '../components/PortfolioAddItemModal';
import { ChatOverlay } from '../components/artists/ChatOverlay';

// --- Helper function for profile completion ---
const calculateProfileCompletion = (profile: UserProfile): number => {
    const checks = [
        // 1. Name
        !!profile.fullName,
        // 2. Bio (meaningful length)
        (profile.bio || '').length > 20,
        // 3. Primary Category
        !!profile.artist?.primaryCategory,
        // 4. Secondary Categories
        (profile.artist?.secondaryCategories?.length || 0) > 0,
        // 5. Location
        !!profile.address?.city,
        // 6. Experience (Present and non-negative)
        profile.experience !== undefined && profile.experience >= 0,
        // 7. Rate
        !!profile.artist?.rate,
        // 8. YouTube (Main link or additional links)
        !!profile.socials?.youtube || (profile.socials?.youtubeLinks && profile.socials.youtubeLinks.length > 0),
        // 9. Instagram
        !!profile.socials?.instagram,
        // 10. Website
        !!profile.socials?.website,
        // 11. Portfolio items
        (profile.portfolio?.length || 0) > 0,
        // 12. Achievements
        (profile.artist?.achievements?.length || 0) > 0
    ];
    
    // Optional: Keep Skills/Languages as bonus or core? 
    // The user list didn't explicitly exclude them, but the list was specific "including...". 
    // I'll keep them to ensure higher standards for 100%.
    checks.push((profile.skills?.length || 0) > 0);
    checks.push((profile.languages?.length || 0) > 0);

    const completedChecks = checks.filter(Boolean).length;
    const totalChecks = checks.length;
    return totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;
};

// --- MOCK DATA SERVICE ---
const useArtistData = () => {
    const [artists, setArtists] = useState<UserProfile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Simulate network delay
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
                    // Deep merge for nested artist object
                    if (updatedProfile.artist) {
                        newProfile.artist = { ...(a.artist as object), ...updatedProfile.artist };
                    }
                    // Merge portfolio if present
                    if (updatedProfile.portfolio) {
                        newProfile.portfolio = updatedProfile.portfolio;
                    }
                    // Merge socials
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

const ArtistCard: React.FC<{ artist?: UserProfile; onSelect?: (id: string) => void; isSelected?: boolean; isLoading?: boolean }> = ({ artist, onSelect, isSelected, isLoading }) => {
    if (isLoading) {
        return (
            <div className="p-4 rounded-2xl border border-white/5 bg-white/5 relative overflow-hidden h-[120px]">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 shrink-0" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 bg-white/10 rounded" />
                        <div className="h-3 w-24 bg-white/5 rounded" />
                        <div className="h-3 w-20 bg-white/5 rounded" />
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div className="h-3 w-16 bg-white/5 rounded" />
                    <div className="h-6 w-16 bg-white/10 rounded-lg" />
                </div>
            </div>
        );
    }

    if (!artist) return null;

    return (
        <div className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${isSelected ? 'bg-brand-orange/5 border-brand-orange shadow-lg' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-brand-orange/50 hover:shadow-md'}`}>
            <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                    <img src={artist.avatar} alt={artist.displayName} className="w-16 h-16 rounded-full object-cover" />
                    {artist.status === 'online' && (
                        <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" title="Online"></span>
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-gray-900 dark:text-white">{artist.displayName}</h3>
                        {artist.isVerified && <Verified size={16} className="text-blue-500 fill-current" />}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                    {artist.platformRole} {artist.artist?.primaryCategory && `· ${artist.artist.primaryCategory}`}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{artist.address.city}, {artist.address.state}</p>
                </div>
                <Bookmark size={20} className="text-gray-400 hover:text-brand-orange transition-colors" />
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="text-amber-400 fill-current" />
                    <span className="font-bold text-gray-700 dark:text-gray-300">4.9</span>
                    <span className="text-xs text-gray-400">(25 reviews)</span>
                </div>
                <button onClick={() => onSelect?.(artist.id)} className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 rounded-lg hover:bg-brand-orange hover:text-white transition-colors">
                    View
                </button>
            </div>
        </div>
    );
};

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
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
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
                    <img src={artist.avatar} alt={artist.displayName} className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-900" />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                     <button className="p-2.5 bg-white/80 backdrop-blur-sm text-gray-800 rounded-lg shadow-md hover:bg-white">
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
                        <p className="text-gray-500 dark:text-gray-400">{artist.platformRole} from {artist.address.city}</p>
                        {/* Status Indicator */}
                        <div className="mt-2 flex items-center gap-2 text-xs">
                            {artist.status === 'online' ? (
                                <>
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="font-semibold text-green-600 dark:text-green-400">Online</span>
                                </>
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400">Last seen {artist.status}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                             {isCurrentUserProfile ? (
                                 <button onClick={onEdit} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-xs rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1.5 transition-colors border border-gray-200 dark:border-gray-700">
                                    <Edit size={14} /> Edit Profile
                                </button>
                             ) : (
                                <>
                                    <button 
                                        onClick={() => setIsFollowed(!isFollowed)}
                                        className={`px-4 py-2 font-bold text-xs rounded-lg shadow-md flex items-center gap-1.5 transition-colors ${isFollowed ? 'bg-gray-200 text-gray-800' : 'bg-brand-orange text-white hover:bg-brand-orange/90'}`}
                                    >
                                        <UserPlus size={14} /> {isFollowed ? 'Following' : 'Follow'}
                                    </button>
                                    <button onClick={() => onStartChat(artist.id)} className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-bold text-xs rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-1.5 transition-colors">
                                        <MessageSquareIcon size={14} /> Message
                                    </button>
                                </>
                             )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            {artist.socials.instagram && <a href={artist.socials.instagram} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500 hover:text-pink-500"><Instagram size={18}/></a>}
                            {artist.socials.youtube && <a href={artist.socials.youtube} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500 hover:text-red-500"><Youtube size={18}/></a>}
                            {artist.socials.website && <a href={artist.socials.website} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-white"><Globe size={18}/></a>}
                        </div>
                    </div>
                </div>
                
                {/* Additional YouTube Links */}
                {artist.socials.youtubeLinks && artist.socials.youtubeLinks.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {artist.socials.youtubeLinks.map((link, idx) => (
                            <a key={idx} href={link} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-900/10 text-red-600 text-xs rounded border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-colors">
                                <Youtube size={12} /> <span className="max-w-[100px] truncate">Link {idx + 1}</span> <ExternalLink size={10} />
                            </a>
                        ))}
                    </div>
                )}
                
                {/* Profile Completion Score */}
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                            {isCurrentUserProfile ? 'Your Profile Completion' : 'Profile Strength'}
                        </h4>
                        <span className={`text-sm font-bold ${profileCompletionScore >= 80 ? 'text-brand-green' : 'text-brand-orange'}`}>
                            {profileCompletionScore}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${profileCompletionScore >= 80 ? 'bg-brand-green' : 'bg-brand-orange'}`}
                            style={{ width: `${profileCompletionScore}%` }}
                        />
                    </div>
                    {isCurrentUserProfile && profileCompletionScore < 100 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Complete your profile to boost visibility. Add Rate, Achievements, and Social Links.
                        </p>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="px-6 mt-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-6 text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {['About', 'Portfolio', 'Reviews'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 border-b-2 transition-colors ${activeTab === tab ? 'border-brand-orange text-brand-orange' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'About' && (
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-6 relative group/bio">
                      <div className="flex justify-between items-start">
                          <p className="leading-relaxed">{artist.bio}</p>
                          {isCurrentUserProfile && (
                              <button onClick={onEdit} className="p-1 text-gray-400 hover:text-brand-orange opacity-0 group-hover/bio:opacity-100 transition-opacity">
                                  <Edit size={14} />
                              </button>
                          )}
                      </div>
                      
                      {artist.artist && (
                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Primary Category:</p>
                            <span className="px-3 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold flex items-center gap-1.5 w-fit">
                                <Star size={12} /> {artist.artist.primaryCategory}
                            </span>
                          </div>
                          {artist.artist.secondaryCategories && artist.artist.secondaryCategories.length > 0 && (
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Secondary Categories:</p>
                                <div className="flex flex-wrap gap-2">
                                    {artist.artist.secondaryCategories.map(cat => (
                                        <span key={cat} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">{cat}</span>
                                    ))}
                                </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div><strong>Experience:</strong> {artist.experience} years</div>
                          <div><strong>Rate:</strong> {artist.artist?.rate || 'Contact for rates'}</div>
                          <div><strong>Languages:</strong> {artist.languages.join(', ')}</div>
                          {artist.artist?.genres && <div><strong>Genres:</strong> {artist.artist.genres.join(', ')}</div>}
                          {artist.artist?.specialties && <div><strong>Specialties:</strong> {artist.artist.specialties.join(', ')}</div>}
                      </div>
                      
                      {artist.artist?.achievements && artist.artist.achievements.length > 0 && (
                          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                              <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Achievements:</p>
                              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                  {artist.artist.achievements.map((ach, idx) => (
                                      <li key={idx}>{ach}</li>
                                  ))}
                              </ul>
                          </div>
                      )}
                    </div>
                )}
                 {activeTab === 'Portfolio' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {artist.portfolio && artist.portfolio.length > 0 ? (
                            artist.portfolio.map(item => (
                                <PortfolioCard 
                                    key={item.id} 
                                    item={item} 
                                    onView={() => onViewPortfolioItem(item)} 
                                    onEdit={isCurrentUserProfile ? () => onEditPortfolioItem(item) : undefined}
                                    onDelete={isCurrentUserProfile ? () => onDeletePortfolioItem(item.id) : undefined}
                                    isOwner={isCurrentUserProfile}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                <Camera size={40} className="mx-auto mb-2" />
                                <p>No portfolio items yet.</p>
                                {isCurrentUserProfile && (
                                    <button onClick={onAddPortfolioItem} className="mt-4 px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold flex items-center gap-2 mx-auto hover:bg-brand-orange/90 transition-colors">
                                        <Plus size={16} /> Add to Portfolio
                                    </button>
                                )}
                            </div>
                        )}
                        {/* Always show Add button for owner if portfolio has items */}
                        {isCurrentUserProfile && artist.portfolio && artist.portfolio.length > 0 && (
                             <button onClick={onAddPortfolioItem} className="aspect-square flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-brand-orange dark:hover:border-brand-orange transition-colors group">
                                <Plus size={32} className="text-gray-400 group-hover:text-brand-orange mb-2" />
                                <span className="text-sm text-gray-500 group-hover:text-brand-orange font-semibold">Add New</span>
                             </button>
                        )}
                    </div>
                 )}
                 {activeTab === 'Reviews' && (
                    <div className="text-center text-gray-500 py-10">
                        <MessageSquareIcon size={40} className="mx-auto mb-2" />
                        Reviews feature coming soon.
                    </div>
                 )}
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
interface ArtistsPlatformPageProps {
  targetArtistId?: string | null;
  onNavigate: (page: string) => void;
}

export const ArtistsPlatformPage: React.FC<ArtistsPlatformPageProps> = ({ targetArtistId, onNavigate }) => {
    const { user } = useAuth();
    const { artists, getArtistById, saveArtist, isLoading } = useArtistData();
    
    const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [initialChatTargetId, setInitialChatTargetId] = useState<string | null>(null);

    // Portfolio Modal State
    const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
    const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);
    const [viewingPortfolioItemIndex, setViewingPortfolioItemIndex] = useState<number | null>(null);

    const selectedArtist = useMemo(() => {
        if (!selectedArtistId) return null;
        return getArtistById(selectedArtistId);
    }, [selectedArtistId, artists]);

    useEffect(() => {
        if (!isLoading) {
            if (targetArtistId) {
                setSelectedArtistId(targetArtistId);
            } else if (user?.profileId) {
                setSelectedArtistId(user.profileId);
            } else {
                setSelectedArtistId(artists[0]?.id || null);
            }
        }
    }, [user, targetArtistId, artists, isLoading]);

    const handleOpenEditModal = () => {
        if (user?.profileId === selectedArtistId) {
            setIsEditModalOpen(true);
        }
    };
    
    const handleSaveFromModal = (data: Partial<UserProfile>) => {
        saveArtist({ id: selectedArtistId!, ...data });
        setIsEditModalOpen(false);
    };

    const handleStartChat = (artistId: string) => {
        if (artistId === user?.profileId) return;
        setInitialChatTargetId(artistId);
        setIsChatOpen(true);
    };

    // Portfolio Handlers
    const handleAddPortfolioItem = () => {
        setEditingPortfolioItem(null);
        setIsPortfolioModalOpen(true);
    };

    const handleEditPortfolioItem = (item: PortfolioItem) => {
        setEditingPortfolioItem(item);
        setIsPortfolioModalOpen(true);
    };

    const handleSavePortfolioItem = (item: PortfolioItem) => {
        if (!selectedArtistId) return;
        const currentPortfolio = selectedArtist?.portfolio || [];
        
        let newPortfolio;
        const exists = currentPortfolio.find(p => p.id === item.id);
        
        if (exists) {
            newPortfolio = currentPortfolio.map(p => p.id === item.id ? item : p);
        } else {
            newPortfolio = [item, ...currentPortfolio];
        }

        saveArtist({ id: selectedArtistId, portfolio: newPortfolio });
        setIsPortfolioModalOpen(false);
        setEditingPortfolioItem(null);
    };

    const handleDeletePortfolioItem = (itemId: string) => {
        if (!selectedArtistId) return;
        if (confirm("Are you sure you want to delete this item?")) {
            const currentPortfolio = selectedArtist?.portfolio || [];
            const newPortfolio = currentPortfolio.filter(p => p.id !== itemId);
            saveArtist({ id: selectedArtistId, portfolio: newPortfolio });
        }
    };

    const handleViewPortfolioItem = (item: PortfolioItem) => {
        if (!selectedArtist) return;
        const index = selectedArtist.portfolio?.findIndex(p => p.id === item.id) ?? -1;
        if (index !== -1) setViewingPortfolioItemIndex(index);
    };

    const hasProfile = !!user?.profileId;

    return (
        <div id="artists-platform-top" className="min-h-screen bg-gray-50 dark:bg-brand-darker pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">Artists Directory</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Discover and connect with talented artists from across the nation.</p>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Directory or Create Profile CTA */}
                    <div className="lg:col-span-1 space-y-4">
                         <div className="h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                             {!hasProfile && (
                                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-dashed border-brand-orange text-center h-full flex flex-col justify-center items-center mb-4">
                                    <UserPlus size={48} className="text-brand-orange mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Profile Awaits</h3>
                                    <p className="text-gray-500 dark:text-gray-400 my-4">Complete your profile to get discovered and access all features.</p>
                                    <button onClick={() => onNavigate('user-profile')} className="px-6 py-3 bg-brand-orange text-white font-bold rounded-lg shadow-lg hover:bg-brand-orange/90 transition-colors">
                                        Complete Your Profile
                                    </button>
                                </div>
                            )}
                            {isLoading 
                                ? Array(6).fill(0).map((_, i) => <ArtistCard key={i} isLoading={true} />)
                                : artists.map(artist => (
                                    <div key={artist.id} className="mb-4">
                                         <ArtistCard 
                                            artist={artist} 
                                            onSelect={setSelectedArtistId} 
                                            isSelected={selectedArtistId === artist.id}
                                          />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* Right: Profile Viewer */}
                    <div className="lg:col-span-2">
                       {selectedArtist ? (
                           <ArtistProfileDetail 
                               artist={selectedArtist} 
                               onEdit={handleOpenEditModal} 
                               onStartChat={handleStartChat}
                               onAddPortfolioItem={handleAddPortfolioItem}
                               onEditPortfolioItem={handleEditPortfolioItem}
                               onDeletePortfolioItem={handleDeletePortfolioItem}
                               onViewPortfolioItem={handleViewPortfolioItem}
                           />
                       ) : (
                           <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-8">
                               <div className="text-center text-gray-500">
                                   <Palette size={48} className="mx-auto mb-4" />
                                   <h3 className="font-bold text-lg">Select an Artist</h3>
                                   <p className="text-sm">Choose an artist from the directory to view their full profile.</p>
                               </div>
                           </div>
                       )}
                    </div>
                </div>
            </div>

            {selectedArtist && (
                <>
                    <EditProfileModal
                        isOpen={isEditModalOpen && user?.profileId === selectedArtistId}
                        onClose={() => setIsEditModalOpen(false)}
                        profile={selectedArtist}
                        onSave={handleSaveFromModal}
                    />
                    
                    <PortfolioAddItemModal
                        isOpen={isPortfolioModalOpen}
                        onClose={() => { setIsPortfolioModalOpen(false); setEditingPortfolioItem(null); }}
                        onSave={handleSavePortfolioItem}
                        itemToEdit={editingPortfolioItem}
                    />

                    {viewingPortfolioItemIndex !== null && selectedArtist.portfolio && (
                        <PortfolioViewer
                            portfolio={selectedArtist.portfolio}
                            currentIndex={viewingPortfolioItemIndex}
                            onClose={() => setViewingPortfolioItemIndex(null)}
                            onNavigate={setViewingPortfolioItemIndex}
                        />
                    )}
                </>
            )}
            
            {/* Floating Chat Button */}
            <button
                onClick={() => { setInitialChatTargetId(null); setIsChatOpen(true); }}
                className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-brand-orange text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-orange/90 transition-transform hover:scale-110"
                aria-label="Open Chat"
            >
                <MessageSquareIcon size={28} />
            </button>

            {isChatOpen && (
                <ChatOverlay
                  onClose={() => setIsChatOpen(false)}
                  initialTargetUserId={initialChatTargetId}
                />
            )}
        </div>
    );
};
