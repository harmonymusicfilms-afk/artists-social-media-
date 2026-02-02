import React from 'react';
import { Star } from 'lucide-react';
import { CastingArtist } from '../../types';

interface CastingArtistCardProps {
    artist: CastingArtist;
    onViewProfile: (artist: CastingArtist) => void;
}

export const CastingArtistCard: React.FC<CastingArtistCardProps> = ({ artist, onViewProfile }) => (
    <div 
        onClick={() => onViewProfile(artist)}
        className="bg-casting-card rounded-lg shadow-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
    >
        <div className="relative">
            <img src={artist.image} alt={artist.name} className="w-full h-72 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            <div className="absolute top-3 right-3">
                {artist.isPlatinum && <div className="w-5 h-5 bg-casting-accent rounded-full border-2 border-white" title="Platinum Artist"></div>}
            </div>

            <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-1.5">
                    <Star size={16} className="fill-casting-accent text-casting-accent" />
                    <span className="font-bold text-sm drop-shadow-md">{artist.rating.toFixed(1)}</span>
                </div>
            </div>
        </div>
        <div className="p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-casting-text-dark group-hover:text-casting-primary transition-colors">{artist.name}</h3>
                    <p className="text-sm text-casting-text-light">{artist.category} from {artist.city}</p>
                </div>
            </div>
            <button className="mt-4 w-full bg-casting-primary text-white py-2.5 rounded-md text-sm font-bold transition-colors duration-300 hover:bg-casting-accent">
                View Profile
            </button>
        </div>
    </div>
);
