import React, { useState } from 'react';
import { Studio } from '../../types';
import { ArrowLeft, Star, MapPin, Share2, Bookmark, Check, Edit, Info, Image as ImageIcon, Wrench, MessageSquare, Phone, Mail } from 'lucide-react';

interface StudioProfileProps {
    studio: Studio;
    onBack: () => void;
}

const StarRating: React.FC<{ rating: number, totalReviews: number }> = ({ rating, totalReviews }) => (
    <div className="flex items-center gap-2">
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={`
                    ${i < Math.round(rating) ? 'text-amber-400 fill-current' : 'text-gray-300 dark:text-gray-600'}
                `} />
            ))}
        </div>
        <span className="font-bold text-gray-800 dark:text-gray-200">{rating.toFixed(1)}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">({totalReviews} reviews)</span>
    </div>
);


export const StudioProfile: React.FC<StudioProfileProps> = ({ studio, onBack }) => {
    const [activeTab, setActiveTab] = useState('About');

    const tabs = [
        { name: 'About', icon: Info },
        { name: 'Gallery', icon: ImageIcon },
        { name: 'Equipment', icon: Wrench },
        { name: 'Reviews', icon: MessageSquare }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'About':
                return (
                    <div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{studio.description}</p>
                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Amenities</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {studio.amenities.map(amenity => (
                                <div key={amenity} className="flex items-center gap-2 text-sm">
                                    <Check size={16} className="text-brand-green" />
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Gallery':
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {studio.gallery.map((img, i) => (
                            <div key={i} className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                <img src={img} alt={`Gallery image ${i+1}`} className="w-full h-full object-cover"/>
                            </div>
                        ))}
                    </div>
                );
            case 'Equipment':
                return (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {studio.equipment.map(item => (
                            <div key={item.name} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-brand-orange">
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{item.brand}</span>
                            </div>
                        ))}
                    </div>
                );
            case 'Reviews':
                return (
                    <div className="space-y-6">
                        {studio.reviews.map(review => (
                             <div key={review.id} className="flex gap-4">
                                <img src={review.author.avatar} alt={review.author.name} className="w-10 h-10 rounded-full"/>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-gray-800 dark:text-gray-200">{review.author.name}</span>
                                        <span className="text-xs text-gray-400">&bull; {review.date}</span>
                                    </div>
                                     <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'} />)}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                );
            default: return null;
        }
    }

    return (
        <div className="animate-fade-in">
             <button onClick={onBack} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold hover:text-brand-orange mb-6">
                <ArrowLeft size={18} /> Back to Directory
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="relative">
                    <img src={studio.coverPhoto} alt="Cover" className="w-full h-48 md:h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-6 text-white drop-shadow-lg">
                        <span className="px-3 py-1 bg-brand-orange text-white text-xs font-bold rounded-full uppercase tracking-wider">{studio.type}</span>
                        <h1 className="text-3xl md:text-4xl font-extrabold mt-2">{studio.name}</h1>
                        <p className="flex items-center gap-2 mt-1"><MapPin size={16} /> {studio.location}</p>
                    </div>
                </div>

                {/* Main Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="flex justify-between items-center mb-6">
                            <StarRating rating={studio.rating} totalReviews={studio.totalReviews} />
                            <div className="flex items-center gap-2">
                                <button className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"><Share2 size={18}/></button>
                                <button className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"><Bookmark size={18}/></button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-brand-orange text-white text-sm font-bold rounded-lg hover:bg-brand-orange/90"><Edit size={16}/> Edit</button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                            <div className="flex gap-4 -mb-px">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.name}
                                        onClick={() => setActiveTab(tab.name)}
                                        className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab.name ? 'border-brand-orange text-brand-orange' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
                                    >
                                        <tab.icon size={16} />
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        {renderTabContent()}
                    </div>

                    {/* Pricing & Booking Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                           <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">Pricing</h3>
                            <div className="space-y-3 mb-6">
                               {studio.pricing.hourly && <div className="flex justify-between items-baseline"><span className="text-gray-600 dark:text-gray-300">Per Hour</span><span className="font-bold text-2xl text-gray-800 dark:text-gray-100">₹{studio.pricing.hourly}</span></div>}
                               {studio.pricing.daily && <div className="flex justify-between items-baseline"><span className="text-gray-600 dark:text-gray-300">Per Day (8 hrs)</span><span className="font-bold text-2xl text-gray-800 dark:text-gray-100">₹{studio.pricing.daily}</span></div>}
                               {studio.pricing.monthly && <div className="flex justify-between items-baseline"><span className="text-gray-600 dark:text-gray-300">Monthly</span><span className="font-bold text-2xl text-gray-800 dark:text-gray-100">₹{studio.pricing.monthly}</span></div>}
                            </div>
                            {studio.pricing.notes && <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 italic">{studio.pricing.notes}</p>}

                            <button className="w-full px-6 py-3 bg-brand-green text-white font-bold rounded-lg shadow-lg hover:bg-brand-green/90 transition-transform hover:scale-105">Request to Book</button>
                            
                            <div className="text-center mt-6">
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Have questions?</p>
                                 <div className="flex justify-center gap-4 mt-2">
                                    <a href="#" className="flex items-center gap-1.5 text-xs text-brand-orange font-bold"><Phone size={14} /> Call Now</a>
                                    <a href="#" className="flex items-center gap-1.5 text-xs text-brand-orange font-bold"><Mail size={14} /> Send Email</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
