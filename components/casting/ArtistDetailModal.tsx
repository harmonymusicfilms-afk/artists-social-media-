import React, { useState } from 'react';
import { X, Instagram, Youtube, Globe, Star, CheckCircle, Mail, Phone, Heart } from 'lucide-react';
import { CastingArtist } from '../../types';

interface ArtistDetailModalProps {
    artist: CastingArtist;
    onClose: () => void;
}

export const ArtistDetailModal: React.FC<ArtistDetailModalProps> = ({ artist, onClose }) => {
    const [activeTab, setActiveTab] = useState('About');

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-4xl bg-casting-card rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in border border-white/10">
                <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all">
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="relative">
                    <img src={artist.coverImage} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-6 flex items-end gap-4">
                        <img src={artist.image} className="w-32 h-32 rounded-full object-cover border-4 border-casting-card shadow-lg transform translate-y-1/2" />
                        <div className="pb-5 hidden sm:block">
                            <h2 className="text-3xl font-bold text-white drop-shadow-lg">{artist.name}</h2>
                            <p className="text-gray-200 drop-shadow-md">{artist.category} from {artist.city}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto pt-20 px-6 pb-6">
                    <div className="sm:hidden text-center mb-4">
                        <h2 className="text-2xl font-bold text-casting-text-dark">{artist.name}</h2>
                        <p className="text-casting-text-light">{artist.category} from {artist.city}</p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                           {artist.socials.instagram && <a href={artist.socials.instagram} target="_blank" className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:text-pink-500"><Instagram size={18}/></a>}
                           {artist.socials.youtube && <a href={artist.socials.youtube} target="_blank" className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:text-red-500"><Youtube size={18}/></a>}
                           {artist.socials.website && <a href={artist.socials.website} target="_blank" className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800"><Globe size={18}/></a>}
                        </div>
                        <div className="flex items-center gap-2">
                           <button className="px-5 py-2.5 bg-gray-100 text-sm font-bold text-casting-text-dark rounded-lg flex items-center gap-1.5 hover:bg-gray-200 transition-colors"><Heart size={16}/> Follow</button>
                           <button className="px-5 py-2.5 bg-casting-primary text-white text-sm font-bold rounded-lg flex items-center gap-1.5 hover:bg-casting-accent transition-colors"><Mail size={16}/> Request Booking</button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <div className="flex gap-6 text-sm font-semibold text-casting-text-light">
                            {['About', 'Portfolio', 'Reviews'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 border-b-2 transition-colors ${activeTab === tab ? 'border-casting-primary text-casting-primary' : 'border-transparent hover:border-gray-300'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="py-6">
                       {activeTab === 'About' && (
                           <div className="space-y-6">
                               <p className="text-casting-text-light leading-relaxed">{artist.bio}</p>
                               <div>
                                   <h4 className="font-bold text-casting-text-dark mb-3">Skills</h4>
                                   <div className="flex flex-wrap gap-2">
                                       {artist.skills.map(skill => (
                                            <span key={skill} className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                               <CheckCircle size={14} className="text-casting-primary" /> {skill}
                                            </span>
                                       ))}
                                   </div>
                               </div>
                           </div>
                       )}
                       {activeTab === 'Portfolio' && (
                           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                               {artist.portfolio.map(item => (
                                   <div key={item.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden group relative">
                                       <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                           <p className="text-white text-xs font-bold line-clamp-2">{item.title}</p>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       )}
                    </div>
                </div>
            </div>
        </div>
    );
};
