
import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CURRENT_USER_PROFILE, PLATFORM_ROLE_DESCRIPTIONS } from '../constants';
import { UserProfile, PlatformRole, ArtistCategory, PortfolioItem, User } from '../types';
// FIX: Import `User` icon as `UserIcon` to resolve name conflict with `User` type.
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

const calculateProfileCompletion = (profile: UserProfile): number => {
    const checks = [
        !!profile.fullName,
        !!profile.platformRole,
        profile.address && !!profile.address.city,
        profile.experience > 0,
        profile.socials && (!!profile.socials.youtube || !!profile.socials.instagram),
        profile.bio && profile.bio.length > 20,
        profile.skills && profile.skills.length > 0,
        profile.languages && profile.languages.length > 0,
        !!profile.avatar,
        !!profile.coverPhoto,
        !!profile.artist?.genres && profile.artist.genres.length > 0,
    ];
    
    const completedChecks = checks.filter(Boolean).length;
    const totalChecks = checks.length;
    return totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;
};


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
            <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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

    if (isAdmin && profile.weTubeVerificationStatus === 'pending') {
        return (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-300">Admin Action Required</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">This user has requested WeTube verification.</p>
                <div className="flex gap-2">
                    <button onClick={() => onAdminAction('verified')} className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-md hover:bg-green-600">Approve</button>
                    <button onClick={() => onAdminAction('unverified')} className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-md hover:bg-red-600">Deny</button>
                </div>
            </div>
        );
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
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile>(CURRENT_USER_PROFILE);
    
    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddPortfolioModalOpen, setIsAddPortfolioModalOpen] = useState(false);
    
    // Portfolio States
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [viewingItemIndex, setViewingItemIndex] = useState<number | null>(null);
    const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

    const profileCompletion = useMemo(() => calculateProfileCompletion(profile), [profile]);
    const isArtisticRole = useMemo(() => ARTISTIC_ROLES.includes(profile.platformRole), [profile.platformRole]);
    const isMLMRole = useMemo(() => profile.platformRole === PlatformRole.MLMMember, [profile.platformRole]);

    const handleSave = (updatedData: Partial<UserProfile>) => {
        const newProfile = { ...profile, ...updatedData };
        // Deep merge logic simplified for nested objects
        if (updatedData.socials) newProfile.socials = { ...profile.socials, ...updatedData.socials };
        if (updatedData.artist) newProfile.artist = { ...profile.artist, ...(updatedData.artist as any) };
        if (updatedData.mlm) newProfile.mlm = { ...profile.mlm, ...(updatedData.mlm as any) };
        
        setProfile(newProfile);
    };
    
    const handleSavePortfolioItem = (item: PortfolioItem) => {
      setProfile(prev => {
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
        setProfile(prev => ({
            ...prev,
            portfolio: (prev.portfolio || []).filter(item => item.id !== id)
        }));
        setDeletingItemId(null);
    };
    
    const handleVerificationAction = (status: 'verified' | 'unverified') => setProfile(p => ({ ...p, weTubeVerificationStatus: status }));
    const handleRequestVerification = () => setProfile(p => ({ ...p, weTubeVerificationStatus: 'pending' }));
    
    const openItemViewer = (item: PortfolioItem) => {
        const index = (profile.portfolio || []).findIndex(p => p.id === item.id);
        if (index > -1) setViewingItemIndex(index);
    };

    const handleEditItem = (item: PortfolioItem) => {
        setEditingItem(item);
        setIsAddPortfolioModalOpen(true);
    };

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
                    <div className="pt-20 px-6 pb-6">
                        <div className="flex flex-col md:flex-row justify-between items-start">
                            <div>
                                <div className="flex items-center gap-3 relative group/name">
                                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.fullName}</h1>
                                  {profile.isVerified && <Verified size={24} className="text-blue-500 fill-current shrink-0" title="Platform Verified"/>}
                                  {profile.weTubeVerificationStatus === 'verified' && <BadgeCheck size={24} className="text-red-500 fill-red-500/20 shrink-0" title="WeTube Verified Creator"/>}
                                  <button onClick={() => setIsEditModalOpen(true)} className="p-1 text-gray-400 hover:text-brand-orange opacity-0 group-hover/name:opacity-100 transition-opacity">
                                      <Edit size={14} />
                                  </button>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap mt-1">
                                    <p className="text-brand-green font-semibold">@{profile.displayName}</p>
                                    <div className="flex items-center gap-2 text-xs">
                                        {profile.status === 'online' ? <><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span><span className="font-semibold text-green-600 dark:text-green-400">Online</span></> : <span className="text-gray-500 dark:text-gray-400">Last seen {profile.status}</span>}
                                    </div>
                                </div>
                                <div title={PLATFORM_ROLE_DESCRIPTIONS[profile.platformRole]} className="mt-4 group relative inline-flex items-center gap-2 bg-brand-orange/10 dark:bg-brand-orange/20 text-brand-orange font-bold text-sm px-3 py-1.5 rounded-full"><Shield size={16} /><span>{profile.platformRole}</span></div>
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
                                {/* Additional YouTube Links */}
                                {profile.socials.youtubeLinks && profile.socials.youtubeLinks.length > 0 && (
                                    <div className="flex flex-wrap gap-2 justify-end">
                                        {profile.socials.youtubeLinks.map((link, idx) => (
                                            <a key={idx} href={link} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-900/10 text-red-600 text-xs rounded border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-colors">
                                                <YoutubeIcon size={12} /> <span className="max-w-[80px] truncate">Link {idx + 1}</span> <ExternalLink size={10} />
                                            </a>
                                        ))}
                                    </div>
                                )}
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
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
                            <button onClick={() => setIsEditModalOpen(true)} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-brand-orange opacity-0 group-hover/bio:opacity-100 transition-opacity bg-gray-50 dark:bg-gray-700 rounded-full">
                                <Edit size={14} />
                            </button>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"><h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Sparkles size={18} className="text-brand-orange" /> Skills</h3><div className="flex flex-wrap gap-2">{profile.skills.map(skill => <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">{skill}</span>)}</div></div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"><h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Languages size={18} className="text-brand-orange" /> Languages</h3><div className="flex flex-wrap gap-2">{profile.languages.map(lang => <span key={lang} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">{lang}</span>)}</div></div>
                        
                        {/* ... (Group Memberships - unchanged) ... */}
                        {profile.groupMemberships && profile.groupMemberships.length > 0 ? (
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                                        <Heart size={18} className="text-red-500" /> My Groups & Communities
                                    </h3>
                                    <button onClick={() => onNavigate('ngo-shg')} className="text-xs font-semibold text-brand-orange hover:underline">Find More</button>
                                </div>
                                <div className="space-y-4">
                                    {profile.groupMemberships.map((group) => (
                                        <div key={group.groupId} onClick={() => onNavigate('ngo-shg')} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group/item">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden flex items-center justify-center shrink-0 border border-gray-300 dark:border-gray-500">
                                                    {group.groupImage ? (
                                                        <img src={group.groupImage} alt={group.groupName} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Users size={18} className="text-gray-500 dark:text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-900 dark:text-white leading-tight group-hover/item:text-brand-orange transition-colors">{group.groupName}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                                                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                                            group.role === 'Admin' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                                                        }`}>{group.role}</span>
                                                        <span>• Joined {group.joinedDate}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-400 group-hover/item:translate-x-1 transition-transform" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
                                <Heart size={32} className="mx-auto text-gray-300 mb-3" />
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">No Groups Yet</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Join NGOs or SHGs to connect with communities.</p>
                                <button onClick={() => onNavigate('ngo-shg')} className="w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-bold rounded-lg hover:bg-brand-orange hover:text-white transition-colors">
                                    Browse Groups
                                </button>
                             </div>
                        )}

                         {isMLMRole && profile.mlm && (
                             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-blue-500" /> Network Achievements</h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><span className="font-semibold text-gray-600 dark:text-gray-400">Rank</span><span className="font-bold text-yellow-500 flex items-center gap-1.5"><Star size={14} />{profile.mlm.level}</span></div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><span className="font-semibold text-gray-600 dark:text-gray-400">Team Size</span><span className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5"><Users size={14} />{profile.mlm.teamSize}</span></div>
                                    {profile.mlm.achievements.map((ach, i) => <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><Award size={16} className="text-brand-green shrink-0" /><span className="font-semibold text-gray-700 dark:text-gray-300">{ach.title}</span></div>)}
                                </div>
                            </div>
                        )}

                         {isArtisticRole && profile.artist && (
                             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 group/artist relative">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Palette size={18} className="text-pink-500" /> Artist Details</h3>
                                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-4">
                                    <div><p className="font-semibold mb-2">Primary Category:</p><span className="px-3 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold flex items-center gap-1.5 w-fit"><Star size={12} /> {profile.artist.primaryCategory}</span></div>
                                    {profile.artist.secondaryCategories?.length > 0 && <div><p className="font-semibold mb-2">Secondary Categories:</p><div className="flex flex-wrap gap-2">{profile.artist.secondaryCategories.map(cat => <span key={cat} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">{cat}</span>)}</div></div>}
                                    <p><strong>Genres:</strong> {profile.artist.genres.join(', ')}</p>
                                    <p><strong>Specialties:</strong> {profile.artist.specialties.join(', ')}</p>
                                    <p><strong>Available for Booking:</strong> {profile.artist.availableForBooking ? 'Yes' : 'No'}</p>
                                </div>
                                <button onClick={() => setIsEditModalOpen(true)} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-brand-orange opacity-0 group-hover/artist:opacity-100 transition-opacity bg-gray-50 dark:bg-gray-700 rounded-full">
                                    <Edit size={14} />
                                </button>
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
