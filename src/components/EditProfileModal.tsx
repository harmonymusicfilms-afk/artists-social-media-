
import React, { useState, useEffect, useMemo } from 'react';
import { X, Save, Briefcase, MapPin, Languages, Sparkles, Link as LinkIcon, User, Image, Phone, Facebook, Globe, Palette, Shield, DollarSign, Award, Plus, Trash2, Youtube, Music } from 'lucide-react';
import { UserProfile, PlatformRole, ArtistCategory } from '../types';
import { PLATFORM_ROLES, ARTIST_CATEGORIES, MUSIC_PRESETS } from '../constants';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updatedData: Partial<UserProfile>) => void;
}

const SectionHeader: React.FC<{ title: string, className?: string }> = ({ title, className }) => (
    <div className={`border-b border-gray-200 dark:border-gray-700 pb-2 mb-5 ${className || ''}`}>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
);

// Define which roles are considered artistic
const ARTISTIC_ROLES: PlatformRole[] = [
    PlatformRole.Artist,
    PlatformRole.PerformingArtsTeacher,
];

const MUSIC_CATEGORIES = [ArtistCategory.Musician, ArtistCategory.Singer, ArtistCategory.DJ];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState<Partial<UserProfile>>(profile);
  const [extraYoutubeLink, setExtraYoutubeLink] = useState('');
  const [bioLength, setBioLength] = useState(0);

  const isArtisticRole = useMemo(() => 
    ARTISTIC_ROLES.includes(formData.platformRole as PlatformRole),
    [formData.platformRole]
  );

  const isMusicProfile = useMemo(() => 
    MUSIC_CATEGORIES.includes(formData.artist?.primaryCategory as ArtistCategory),
    [formData.artist?.primaryCategory]
  );

  useEffect(() => {
    if (isOpen) {
      setFormData(profile);
      setBioLength((profile.bio || '').length);
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'bio') {
        setBioLength(value.length);
    }

    const [section, field] = name.split('.');

    if (section === 'artist' && field) {
       setFormData(prev => ({
        ...prev,
        artist: { ...(prev.artist as any), [field]: value }
      }));
    } else if (field) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...(prev as any)[section], [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const items = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
    const [section, field] = fieldName.split('.');
    
    if (field) { // Nested array like 'artist.genres'
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...(prev as any)[section],
                [field]: items
            }
        }));
    } else { // Top-level array like 'skills'
        setFormData(prev => ({
            ...prev,
            [fieldName]: items
        }));
    }
  };

  const handleToggleItem = (fieldName: string, item: string) => {
      const [section, field] = fieldName.split('.');
      if (section === 'artist' && field) {
          const currentItems = (formData.artist as any)?.[field] || [];
          const newItems = currentItems.includes(item) 
            ? currentItems.filter((i: string) => i !== item)
            : [...currentItems, item];
          
          setFormData(prev => ({
              ...prev,
              artist: { ...(prev.artist as any), [field]: newItems }
          }));
      }
  };

  const handleSecondaryCategoryToggle = (category: ArtistCategory) => {
    const currentCategories = formData.artist?.secondaryCategories || [];
    const isSelected = currentCategories.includes(category);
    
    let newCategories: ArtistCategory[];
    if (isSelected) {
      newCategories = currentCategories.filter(c => c !== category);
    } else {
      newCategories = [...currentCategories, category];
    }

    setFormData(prev => ({
      ...prev,
      artist: { ...(prev.artist as any), secondaryCategories: newCategories }
    }));
  };

  const addYoutubeLink = () => {
      if (!extraYoutubeLink) return;
      const currentLinks = formData.socials?.youtubeLinks || [];
      setFormData(prev => ({
          ...prev,
          socials: {
              ...(prev.socials || {}),
              youtubeLinks: [...currentLinks, extraYoutubeLink]
          }
      }));
      setExtraYoutubeLink('');
  };

  const removeYoutubeLink = (index: number) => {
      const currentLinks = formData.socials?.youtubeLinks || [];
      const newLinks = currentLinks.filter((_, i) => i !== index);
      setFormData(prev => ({
          ...prev,
          socials: {
              ...(prev.socials || {}),
              youtubeLinks: newLinks
          }
      }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Your Profile</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            
            {/* --- BASIC INFORMATION --- */}
            <section>
                <SectionHeader title="Basic Information" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="fullName" value={formData.fullName || ''} onChange={handleChange} type="text" placeholder="e.g., John Doe" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Display Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="displayName" value={formData.displayName || ''} onChange={handleChange} type="text" placeholder="e.g., JohnnyD" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Avatar URL</label>
                        <div className="relative">
                            <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="avatar" value={formData.avatar || ''} onChange={handleChange} type="text" placeholder="https://example.com/avatar.jpg" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Cover Photo URL</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="coverPhoto" value={formData.coverPhoto || ''} onChange={handleChange} type="text" placeholder="https://example.com/cover.jpg" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                </div>

                 <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {isArtisticRole ? 'Bio / About Artist' : 'Bio / About Me'}
                        </label>
                        <span className={`text-xs transition-colors duration-300 ${bioLength > 250 ? 'text-red-500 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
                            {bioLength}/300
                        </span>
                    </div>
                    <textarea 
                        name="bio" 
                        value={formData.bio || ''} 
                        onChange={handleChange} 
                        rows={4} 
                        maxLength={300}
                        placeholder={isArtisticRole ? "Tell us about your artistic journey, style, and vision..." : "Tell everyone about yourself..."}
                        className={`w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl outline-none focus:ring-2 focus:ring-brand-orange transition-all duration-300 ${bioLength > 280 ? 'border-red-300 focus:border-red-500 ring-red-200' : 'border-gray-200 dark:border-gray-600'}`}
                    ></textarea>
                </div>
            </section>
            
            {/* --- PROFESSIONAL DETAILS --- */}
            <section>
                <SectionHeader title="Professional Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">My Role on Platform</label>
                        <div className="relative">
                           <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                           <select name="platformRole" value={formData.platformRole} onChange={handleChange} className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange appearance-none">
                               {PLATFORM_ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                           </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Experience (Years)</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="experience" value={formData.experience || 0} onChange={handleChange} type="number" placeholder="e.g., 5" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                </div>
                 <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Skills (comma-separated)</label>
                    <div className="relative">
                        <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={formData.skills?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'skills')} type="text" placeholder="e.g., Public Speaking, Sales, Leadership" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                    </div>
                </div>
                <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Languages (comma-separated)</label>
                    <div className="relative">
                        <Languages className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={formData.languages?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'languages')} type="text" placeholder="e.g., English, Hindi, Marathi" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                    </div>
                </div>
            </section>
            
            {/* --- CONTACT & SOCIALS --- */}
             <section>
                <SectionHeader title="Contact & Social Links" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">WhatsApp Number</label>
                         <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="socials.whatsapp" value={formData.socials?.whatsapp || ''} onChange={handleChange} type="text" placeholder="+91 12345 67890" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Instagram Link</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="socials.instagram" value={formData.socials?.instagram || ''} onChange={handleChange} type="text" placeholder="https://instagram.com/..." className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Main YouTube Link</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="socials.youtube" value={formData.socials?.youtube || ''} onChange={handleChange} type="text" placeholder="https://youtube.com/..." className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Facebook Link</label>
                        <div className="relative">
                            <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="socials.facebook" value={formData.socials?.facebook || ''} onChange={handleChange} type="text" placeholder="https://facebook.com/..." className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Website Link</label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="socials.website" value={formData.socials?.website || ''} onChange={handleChange} type="text" placeholder="https://myportfolio.com" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                </div>

                {/* Additional YouTube Links */}
                {isArtisticRole && (
                    <div className="mt-6">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Additional YouTube Links</label>
                        <div className="flex gap-2 mb-3">
                            <div className="relative flex-1">
                                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={extraYoutubeLink} 
                                    onChange={(e) => setExtraYoutubeLink(e.target.value)} 
                                    placeholder="https://youtube.com/..." 
                                    className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange"
                                />
                            </div>
                            <button type="button" onClick={addYoutubeLink} className="p-3 bg-brand-orange text-white rounded-xl hover:bg-brand-orange/90">
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.socials?.youtubeLinks?.map((link, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                                    <Youtube size={16} className="text-red-500" />
                                    <span className="flex-1 truncate">{link}</span>
                                    <button type="button" onClick={() => removeYoutubeLink(idx)} className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 p-1 rounded-full">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
            
             {/* --- ARTIST SPECIFIC DETAILS --- */}
             {isArtisticRole && formData.artist && (
                 <section>
                    <SectionHeader title="Artist Details" />
                     
                    {/* Categories */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Primary Artist Category</label>
                        <select name="artist.primaryCategory" value={formData.artist?.primaryCategory} onChange={handleChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange appearance-none">
                           {ARTIST_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Secondary Artist Categories</label>
                        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                           {ARTIST_CATEGORIES.filter(cat => cat !== formData.artist?.primaryCategory).map(cat => (
                             <button
                                type="button"
                                key={cat}
                                onClick={() => handleSecondaryCategoryToggle(cat)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 border
                                   ${formData.artist?.secondaryCategories?.includes(cat)
                                     ? 'bg-brand-orange text-white border-transparent'
                                     : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500 hover:border-brand-orange hover:text-brand-orange'
                                   }
                                `}
                             >
                               {cat}
                             </button>
                           ))}
                        </div>
                    </div>

                    {/* MUSIC SPECIFIC DETAILS */}
                    {isMusicProfile && (
                        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
                            <h4 className="font-bold text-brand-orange mb-4 flex items-center gap-2"><Music size={18} /> Music Specialties</h4>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Vocal Types</label>
                                    <div className="flex flex-wrap gap-2">
                                        {MUSIC_PRESETS.vocalTypes.map(type => (
                                            <button key={type} type="button" onClick={() => handleToggleItem('artist.specialties', type)}
                                                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                                                    formData.artist?.specialties?.includes(type) ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                                                }`}
                                            >{type}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Instruments</label>
                                    <div className="flex flex-wrap gap-2">
                                        {MUSIC_PRESETS.instruments.map(inst => (
                                            <button key={inst} type="button" onClick={() => handleToggleItem('artist.specialties', inst)}
                                                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                                                    formData.artist?.specialties?.includes(inst) ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                                                }`}
                                            >{inst}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Genres</label>
                                    <div className="flex flex-wrap gap-2">
                                        {MUSIC_PRESETS.genres.map(genre => (
                                            <button key={genre} type="button" onClick={() => handleToggleItem('artist.genres', genre)}
                                                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                                                    formData.artist?.genres?.includes(genre) ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                                                }`}
                                            >{genre}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Roles & Profession</label>
                                    <div className="flex flex-wrap gap-2">
                                        {MUSIC_PRESETS.roles.map(role => (
                                            <button key={role} type="button" onClick={() => handleToggleItem('artist.specialties', role)}
                                                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                                                    formData.artist?.specialties?.includes(role) ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                                                }`}
                                            >{role}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                     {/* GENERAL ARTIST FIELDS */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                         {!isMusicProfile && (
                             <>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Genres (comma-separated)</label>
                                    <div className="relative">
                                        <Palette className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input value={formData.artist?.genres?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'artist.genres')} type="text" placeholder="e.g., Abstract, Realism" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Specialties (comma-separated)</label>
                                    <div className="relative">
                                        <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input value={formData.artist?.specialties?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'artist.specialties')} type="text" placeholder="e.g., Oil Painting, Sketching" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                                    </div>
                                </div>
                             </>
                         )}
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance/Work Type</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {(isMusicProfile ? MUSIC_PRESETS.performanceTypes : ['Live', 'Studio', 'Online']).map(type => (
                                    <button key={type} type="button" onClick={() => handleToggleItem('artist.performanceType', type)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                                            (formData.artist?.performanceType as any[])?.includes(type) 
                                            ? 'bg-brand-green text-white border-brand-green' 
                                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600'
                                        }`}
                                    >{type}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Rate / Fee</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input name="artist.rate" value={formData.artist?.rate || ''} onChange={handleChange} type="text" placeholder="e.g. ₹5,000/event or ₹1,000/hour" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Achievements (comma-separated)</label>
                            <div className="relative">
                                <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input value={formData.artist?.achievements?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'artist.achievements')} type="text" placeholder="e.g. Winner of Idol 2022, Best Singer Award" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                            </div>
                        </div>
                    </div>
                 </section>
             )}
        </form>
        
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-end gap-4 sticky bottom-0">
            <button type="button" onClick={onClose} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Cancel
            </button>
            <button type="submit" onClick={handleSubmit} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 active:scale-95 transition-all">
                <Save size={18} /> Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};
