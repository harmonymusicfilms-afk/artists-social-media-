
import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { PLATFORM_ROLE_DESCRIPTIONS } from '../constants';
import { UserProfile, PlatformRole, ArtistCategory, PortfolioItem, User } from '../types';
import { apiFetchUserProfile, apiUpdateProfile } from '../lib/api';
import { ArrowLeft, Edit, MapPin, Briefcase, Award, TrendingUp, Instagram, Youtube as YoutubeIcon, Languages, Sparkles, Palette, Users, Phone, Facebook, Globe, Shield, Star, Verified, Plus, Image as ImageIcon, Video, Film, MoreVertical, Trash2, Clock, BadgeCheck, X, ChevronLeft, ChevronRight, AlertTriangle, User as UserIcon, Heart, ExternalLink } from 'lucide-react';
import { EditProfileModal } from '../components/EditProfileModal';
import { PortfolioAddItemModal } from '../components/PortfolioAddItemModal';

interface UserProfilePageProps {
  onNavigate: (page: string) => void;
}

const ARTISTIC_ROLES: PlatformRole[] = [
    PlatformRole.Artist,
    PlatformRole.PerformingArtsTeacher,
];

// Enhanced Profile Completion Calculation
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

// ... (Keeping PortfolioCard and PortfolioViewer components unchanged for brevity, assume they are defined above or imported)
// Copying PortfolioCard and Viewer from previous file content to ensure file completeness
const PortfolioCard: React.FC<{ item: PortfolioItem; onView: () => void; onEdit: () => void; onDelete: () => void; }> = ({ item, onView, onEdit, onDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const Icon = useMemo(() => {
        if (item.youtubeUrl) return YoutubeIcon;
        if (item.type === 'photo') return ImageIcon;
        if (item.type === 'video') return Video;
        if (item.type === 'short') return Film;
        return ImageIcon;
    }, [item]);

    return (
        <div onClick={() => !menuOpen && onView()} className="group relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <img src={item.thumbnailUrl || item.mediaUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-2 left-2 p-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white">
                <Icon size={14} />
            </div>
            <div className="absolute top-2 right-2">
                 <button onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }} className="p-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={14} />
                 </button>
                 {menuOpen && (
                     <div onMouseLeave={() => setMenuOpen(false)} className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-10">
                         <button onClick={(e) => { e.stopPropagation(); onEdit(); setMenuOpen(false); }} className="w-full text-left flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                           <Edit size={14} /> Edit
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); onDelete(); setMenuOpen(false); }} className="w-full text-left flex items-center gap-2 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                           <Trash2 size={14} /> Delete
                         </button>
                     </div>
                 )}
            </div>
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
            
            {/* Prev Button */}
            {canGoPrev && (
                <button onClick={() => onNavigate(currentIndex - 1)} className="absolute left-4 md:left-8 z-20 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <ChevronLeft className="text-white" />
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
                    {item.youtubeUrl && embedUrl && <iframe src={embedUrl} title={item.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full aspect-video" />}
                    {item.mediaUrl && item.type === 'photo' && <img src={item.mediaUrl} alt={item.title} className="max-w-full max-h-full object-contain" />}
                    {item.mediaUrl && (item.type === 'video' || item.type === 'short') && <video src={item.mediaUrl} controls autoPlay className="max-w-full max-h-full object-contain" />}
                </div>
            </div>

             {/* Next Button */}
            {canGoNext && (
                 <button onClick={() => onNavigate(currentIndex + 1)} className="absolute right-4 md:right-8 z-20 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <ChevronRight className="text-white" />
                </button>
            )}
        </div>
    );
};

const VerificationControls: React.FC<{ profile: UserProfile; currentUser: User | null; onRequest: () => void; onAdminAction: (status: 'verified' | 'unverified') => void; }> = ({ profile, currentUser, onRequest, onAdminAction }) => {
    const isOwner = currentUser?.profileId === profile.id;
    const isAdmin = currentUser?.isAdmin;

    if (isOwner) {
        switch (profile.weTubeVerificationStatus) {
            case 'unverified': return <button onClick={onRequest} className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors"><BadgeCheck size={16} /> Request WeTube Verification</button>;
            case 'pending': return <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-sm font-bold rounded-lg"><Clock size={16} /> Verification Pending Review</div>;
            case 'verified': return null;
        }
    }
    return null;
};

const DeleteConfirmationModal: React.FC<{ onConfirm: () => void; onCancel: () => void; }> = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 text-center animate-zoom-in">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-red-500" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Delete Item?</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This action is permanent and cannot be undone.</p>
        <div className="flex gap-4 mt-6">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600">Delete</button>
        </div>
      </div>
    </div>
);

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ onNavigate }) => {
    const { user, updateUser } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    
    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddPortfolioModalOpen, setIsAddPortfolioModalOpen] = useState(false);
    
    // Portfolio States
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [viewingItemIndex, setViewingItemIndex] = useState<number | null>(null);
    const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            if (user?.profileId) {
                setLoading(true);
                const data = await apiFetchUserProfile(user.profileId);
                setProfile(data);
                setLoading(false);
            }
        };
        loadProfile();
    }, [user?.profileId]);

    const profileCompletion = useMemo(() => profile ? calculateProfileCompletion(profile) : 0, [profile]);
    const isArtisticRole = useMemo(() => profile ? ARTISTIC_ROLES.includes(profile.platformRole) : false, [profile]);
    const isMLMRole = useMemo(() => profile?.platformRole === PlatformRole.MLMMember, [profile]);

    const handleSave = async (updatedData: Partial<UserProfile>) => {
        if (!profile) return;
        const newProfile = { ...profile, ...updatedData };
        
        // Deep merge for nested objects (simplified)
        if (updatedData.socials) newProfile.socials = { ...profile.socials, ...updatedData.socials };
        if (updatedData.artist) newProfile.artist = { ...profile.artist, ...(updatedData.artist as any) };
        
        // Optimistic UI Update
        setProfile(newProfile);
        // Persist to DB
        await apiUpdateProfile(profile.id, updatedData);
        // Update user context name if changed
        if (updatedData.fullName) updateUser({ name: updatedData.fullName });
    };
    
    const handleSavePortfolioItem = async (item: PortfolioItem) => {
      // NOTE: In a real app, this should call apiCreatePortfolioItem
      // For now, we update local state assuming success or using existing mock structure
      setProfile(prev => {
        if (!prev) return null;
        const portfolio = prev.portfolio || [];
        const existingIndex = portfolio.findIndex(p => p.id === item.id);
        
        if (existingIndex > -1) { // Update
          const newPortfolio = [...portfolio];
          newPortfolio[existingIndex] = item;
          return { ...prev, portfolio: newPortfolio };
        } else { // Add
          return { ...prev, portfolio: [item, ...portfolio] };
        }
      });
      setIsAddPortfolioModalOpen(false);
      setEditingItem(null);
    };

    const handleDeleteItem = (id: string) => {
        setProfile(prev => {
            if(!prev) return null;
            return {
                ...prev,
                portfolio: (prev.portfolio || []).filter(item => item.id !== id)
            }
        });
        setDeletingItemId(null);
    };
    
    const handleVerificationAction = (status: 'verified' | 'unverified') => {
        if(profile) setProfile({ ...profile, weTubeVerificationStatus: status });
    };
    
    const handleRequestVerification = () => {
        if(profile) setProfile({ ...profile, weTubeVerificationStatus: 'pending' });
    };
    
    const openItemViewer = (item: PortfolioItem) => {
        const index = (profile?.portfolio || []).findIndex(p => p.id === item.id);
        if (index > -1) setViewingItemIndex(index);
    };

    const handleEditItem = (item: PortfolioItem) => {
        setEditingItem(item);
        setIsAddPortfolioModalOpen(true);
    };

    if (loading || !profile) {
        return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Loading Profile...</div>;
    }

    return (
        <div id="user-profile-top" className="min-h-screen bg-gray-100 dark:bg-brand-darker pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold hover:text-brand-orange mb-6">
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>

                {/* Profile Header */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="relative group/cover">
                        <img src={profile.coverPhoto} alt="Cover" className="w-full h-48 md:h-64 object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover/cover:bg-black/20 transition-colors pointer-events-none" />
                        <button 
                            onClick={() => setIsEditModalOpen(true)}
                            className="absolute top-4 right-16 px-3 py-1.5 bg-black/40 backdrop-blur-sm text-white font-bold text-xs rounded-lg shadow-md hover:bg-brand-orange opacity-0 group-hover/cover:opacity-100 transition-all flex items-center gap-1.5"
                        >
                            <Edit size={12} /> Edit Cover
                        </button>
                        <img src={profile.avatar} alt={profile.displayName} className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white dark:border-gray-800 absolute bottom-0 left-6 transform translate-y-1/2" />
                        <button onClick={() => setIsEditModalOpen(true)} className="absolute top-4 right-4 px-4 py-2 bg-black/40 backdrop-blur-sm text-white font-bold text-xs rounded-lg shadow-md hover:bg-black/60 flex items-center gap-1.5 transition-colors"><Edit size={14} /> Edit Profile</button>
                    </div>
                    
                    {/* Rest of the profile layout ... (Copied from previous UserProfilePage but using 'profile' state) */}
                    <div className="pt-20 px-6 pb-6">
                        <div className="flex flex-col md:flex-row justify-between items-start">
                            <div>
                                <div className="flex items-center gap-3 relative group/name">
                                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.fullName}</h1>
                                  {profile.isVerified && <span title="Platform Verified"><Verified size={24} className="text-blue-500 fill-current shrink-0" /></span>}
                                  {profile.weTubeVerificationStatus === 'verified' && <span title="WeTube Verified Creator"><BadgeCheck size={24} className="text-red-500 fill-red-500/20 shrink-0" /></span>}
                                </div>
                                <div className="flex items-center gap-3 flex-wrap mt-1">
                                    <p className="text-brand-green font-semibold">@{profile.displayName}</p>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="text-gray-500 dark:text-gray-400">Joined {profile.joinedDate}</span>
                                    </div>
                                </div>
                                
                                <div 
                                    title={PLATFORM_ROLE_DESCRIPTIONS[profile.platformRole]} 
                                    className="mt-4 group relative inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange/10 to-brand-orange/20 dark:from-brand-orange/20 dark:to-brand-orange/30 text-brand-orange font-extrabold text-sm px-4 py-2 rounded-lg border border-brand-orange/30 shadow-sm"
                                >
                                    <Shield size={18} className="fill-brand-orange/20" />
                                    <span className="uppercase tracking-wide">{profile.platformRole}</span>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-4">
                                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {profile.address.city}, {profile.address.state}</span>
                                    <span className="flex items-center gap-1.5"><Briefcase size={14} /> {profile.experience} years experience</span>
                                </div>
                                <VerificationControls profile={profile} currentUser={user} onRequest={handleRequestVerification} onAdminAction={handleVerificationAction} />
                            </div>
                            <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                                <div className="flex items-center gap-2">
                                   {profile.socials.whatsapp && <a href={`https://wa.me/${profile.socials.whatsapp.replace(/\D/g, '')}`} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 hover:text-green-500"><Phone size={18}/></a>}
                                   {profile.socials.instagram && <a href={profile.socials.instagram} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 hover:text-pink-500"><Instagram size={18}/></a>}
                                   {profile.socials.youtube && <a href={profile.socials.youtube} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 hover:text-red-500"><YoutubeIcon size={18}/></a>}
                                   {profile.socials.facebook && <a href={profile.socials.facebook} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 hover:text-blue-600"><Facebook size={18}/></a>}
                                   {profile.socials.website && <a href={profile.socials.website} target="_blank" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-white"><Globe size={18}/></a>}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-1"><h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Profile Completion</h4><span className={`text-sm font-bold ${profileCompletion > 80 ? 'text-brand-green' : 'text-brand-orange'}`}>{profileCompletion}%</span></div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"><div className="bg-gradient-to-r from-brand-orange to-brand-green h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${profileCompletion}%` }} /></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 group/bio relative">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2"><UserIcon size={18} className="text-brand-orange" /> About Me</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{profile.bio || "Write something about yourself..."}</p>
                            <button onClick={() => setIsEditModalOpen(true)} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-brand-orange opacity-0 group-hover/bio:opacity-100 transition-opacity bg-gray-50 dark:bg-gray-700 rounded-full">
                                <Edit size={14} />
                            </button>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"><h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Sparkles size={18} className="text-brand-orange" /> Skills</h3><div className="flex flex-wrap gap-2">{profile.skills.map(skill => <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">{skill}</span>)}</div></div>
                        
                        {/* Artist Details */}
                         {isArtisticRole && profile.artist && (
                             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 group/artist relative">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Palette size={18} className="text-pink-500" /> Artist Details</h3>
                                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-4">
                                    <div><p className="font-semibold mb-2">Primary Category:</p><span className="px-3 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold flex items-center gap-1.5 w-fit"><Star size={12} /> {profile.artist.primaryCategory}</span></div>
                                    {profile.artist.secondaryCategories && profile.artist.secondaryCategories.length > 0 && <div><p className="font-semibold mb-2">Secondary Categories:</p><div className="flex flex-wrap gap-2">{profile.artist.secondaryCategories.map(cat => <span key={cat} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">{cat}</span>)}</div></div>}
                                    <div className="flex justify-between items-center py-1">
                                        <span className="font-semibold text-gray-600 dark:text-gray-400">Rate / Fee:</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{profile.artist.rate || 'N/A'}</span>
                                    </div>
                                </div>
                                <button onClick={() => setIsEditModalOpen(true)} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-brand-orange opacity-0 group-hover/artist:opacity-100 transition-opacity bg-gray-50 dark:bg-gray-700 rounded-full">
                                    <Edit size={14} />
                                </button>
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <button 
                                        onClick={() => { setEditingItem(null); setIsAddPortfolioModalOpen(true); }}
                                        className="w-full py-2 bg-brand-orange/10 text-brand-orange font-bold text-xs rounded-lg hover:bg-brand-orange hover:text-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Plus size={14} /> Add to Portfolio
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-7">
                       <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 h-full">
                            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2"><Briefcase size={18} className="text-brand-orange" /> My Portfolio</h3><button onClick={() => { setEditingItem(null); setIsAddPortfolioModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-lg shadow-md hover:bg-brand-orange/90 transition-colors"><Plus size={14}/> Add New Item</button></div>
                            {(!profile.portfolio || profile.portfolio.length === 0) ? <div className="text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl"><Palette size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" /><h4 className="font-semibold text-gray-700 dark:text-gray-300">Your portfolio is empty.</h4><p className="text-sm text-gray-500 dark:text-gray-400">Add your work to get discovered.</p></div> : <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{profile.portfolio.map(item => <PortfolioCard key={item.id} item={item} onView={() => openItemViewer(item)} onEdit={() => handleEditItem(item)} onDelete={() => setDeletingItemId(item.id)} />)}</div>}
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} profile={profile} onSave={handleSave} />
            <PortfolioAddItemModal isOpen={isAddPortfolioModalOpen || !!editingItem} onClose={() => { setIsAddPortfolioModalOpen(false); setEditingItem(null); }} onSave={handleSavePortfolioItem} itemToEdit={editingItem} />
            {viewingItemIndex !== null && <PortfolioViewer portfolio={profile.portfolio || []} currentIndex={viewingItemIndex} onClose={() => setViewingItemIndex(null)} onNavigate={setViewingItemIndex} />}
            {deletingItemId && <DeleteConfirmationModal onConfirm={() => handleDeleteItem(deletingItemId)} onCancel={() => setDeletingItemId(null)} />}
        </div>
    );
};
