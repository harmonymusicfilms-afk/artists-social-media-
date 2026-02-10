
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Music, Mic2, Speaker, Package, PenTool, Wrench, ShieldCheck, Phone, CheckCircle, UploadCloud, Plus, X, CreditCard, ShoppingCart, Tag, Clock, MapPin, Filter, User, Guitar, Disc, Settings2, Calendar, Video, Film, Play, Heart } from 'lucide-react';
import { MOCK_MUSIC_PRODUCTS } from '../constants';
import { MusicProduct, RepairRequest, Transaction, MusicCategory, RentalBooking } from '../types';

interface MusicIndustryPageProps {
  onNavigate: (page: string) => void;
}

const UPI_ID = "7073741421@upi";
const HELPLINE = "7073741421";

// --- Types ---
interface MusicMedia {
    id: string;
    title: string;
    artist: string;
    url: string;
    thumbnail: string;
    type: 'Video' | 'Audio';
    likes: number;
}

// --- Mock Data ---
const MOCK_MUSIC_MEDIA: MusicMedia[] = [
    {
        id: 'mm1',
        title: 'Acoustic Soul Session',
        artist: 'Rohan Guitarist',
        url: 'https://www.youtube.com/watch?v=placeholder',
        thumbnail: 'https://images.unsplash.com/photo-1510915361408-d59c9113f6f0?q=80&w=1000&auto=format&fit=crop',
        type: 'Video',
        likes: 124
    },
    {
        id: 'mm2',
        title: 'Drum Solo Improvisation',
        artist: 'Beats by Ankit',
        url: 'https://www.youtube.com/watch?v=placeholder',
        thumbnail: 'https://images.unsplash.com/photo-1519892300165-cb5542fb4747?q=80&w=1000&auto=format&fit=crop',
        type: 'Video',
        likes: 89
    },
    {
        id: 'mm3',
        title: 'Original Track - "Midnight Rain"',
        artist: 'Sarah Keys',
        url: 'https://soundcloud.com/placeholder',
        thumbnail: 'https://images.unsplash.com/photo-1514320291940-0e588f02695e?q=80&w=1000&auto=format&fit=crop',
        type: 'Audio',
        likes: 256
    }
];

// --- Components ---

const ProductCard: React.FC<{ product: MusicProduct; onAction: (product: MusicProduct) => void }> = ({ product, onAction }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col h-full group">
    <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-2 right-2 flex gap-2">
         <span className={`px-2 py-1 text-xs font-bold rounded-md uppercase ${product.type === 'Sale' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {product.type === 'Sale' ? 'Buy' : 'Rent'}
         </span>
         <span className="px-2 py-1 bg-black/60 text-white text-xs font-bold rounded-md uppercase backdrop-blur-sm">
            {product.condition}
         </span>
      </div>
    </div>
    <div className="p-4 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-2">
         <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">{product.name}</h3>
      </div>
      <p className="text-xs text-gray-500 mb-2">{product.category}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
         <MapPin size={12} /> {product.location}
      </p>
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{product.type === 'Rent' ? 'Per Day' : 'Price'}</p>
            <p className="font-bold text-lg text-brand-orange">₹{product.price.toLocaleString()}</p>
        </div>
        <button 
            onClick={() => onAction(product)}
            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
            {product.type === 'Rent' ? 'Rent Now' : 'Buy Now'}
        </button>
      </div>
    </div>
  </div>
);

const MediaCard: React.FC<{ media: MusicMedia }> = ({ media }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 group cursor-pointer">
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
            <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    {media.type === 'Video' ? <Play size={24} className="ml-1 text-black"/> : <Music size={24} className="text-black"/>}
                </div>
            </div>
            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-[10px] font-bold uppercase rounded backdrop-blur-sm">
                {media.type}
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-brand-orange transition-colors">{media.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{media.artist}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1"><Heart size={14} className="fill-current text-red-500"/> {media.likes} Likes</span>
                <span className="text-brand-orange hover:underline">Watch Now</span>
            </div>
        </div>
    </div>
);

const SellProductModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (product: MusicProduct) => void }> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<MusicProduct>>({
        name: '',
        category: 'Guitars',
        price: 0,
        type: 'Sale',
        condition: 'Used',
        image: '',
        description: '',
        location: '',
        status: 'Available'
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Reset form when opening
    useEffect(() => {
        if(isOpen) {
            setFormData({
                name: '',
                category: 'Guitars',
                price: 0,
                type: 'Sale',
                condition: 'Used',
                image: '',
                description: '',
                location: '',
                status: 'Available'
            });
            setImageFile(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            // Create a preview URL
            const previewUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, image: previewUrl }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: MusicProduct = {
            id: `prod-${Date.now()}`,
            name: formData.name || 'Untitled',
            category: formData.category as MusicCategory || 'Guitars',
            price: Number(formData.price) || 0,
            type: formData.type as 'Sale' | 'Rent' || 'Sale',
            condition: formData.condition as 'New' | 'Used' || 'Used',
            image: formData.image || 'https://picsum.photos/seed/music/600/600',
            description: formData.description || '',
            seller: 'Current User', // Mocked
            location: formData.location || '',
            status: 'Available'
        };
        onSave(newProduct);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-zoom-in">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">List Your Gear</h3>
                    <button onClick={onClose}><X size={20} className="text-gray-500" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                        <input type="text" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Category</label>
                            <select className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as MusicCategory})}>
                                <option value="Guitars">Guitars</option>
                                <option value="Keyboards">Keyboards</option>
                                <option value="Drums">Drums</option>
                                <option value="Microphones">Microphones</option>
                                <option value="Speakers">Speakers</option>
                                <option value="Studio Equipment">Studio Equipment</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Type</label>
                            <select className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as 'Sale'|'Rent'})}>
                                <option value="Sale">Sell</option>
                                <option value="Rent">Rent Out</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                            <input type="number" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Condition</label>
                            <select className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value as any})}>
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                                <option value="Refurbished">Refurbished</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Location</label>
                        <input type="text" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="City, Area" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea rows={3} required className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Product Image</label>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="h-full object-contain" />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-xs text-gray-500">Click to upload image</p>
                                </div>
                            )}
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
                    <button type="submit" className="w-full py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-opacity-90">List Item</button>
                </form>
            </div>
        </div>
    );
};

const SubmitMediaModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (media: MusicMedia) => void }> = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [url, setUrl] = useState('');
    const [type, setType] = useState<'Video' | 'Audio'>('Video');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newMedia: MusicMedia = {
            id: `media-${Date.now()}`,
            title,
            artist,
            url,
            thumbnail: 'https://picsum.photos/seed/musicvideo/400/225', // Mock thumbnail
            type,
            likes: 0
        };
        onSave(newMedia);
        onClose();
        setTitle('');
        setArtist('');
        setUrl('');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-zoom-in">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Submit Your Music</h3>
                    <button onClick={onClose}><X size={20} className="text-gray-500" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Track/Video Title</label>
                        <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g. Summer Vibes" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Artist Name</label>
                        <input type="text" required value={artist} onChange={e => setArtist(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g. DJ Cool" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Link (YouTube/SoundCloud)</label>
                        <input type="url" required value={url} onChange={e => setUrl(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="https://..." />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={type === 'Video'} onChange={() => setType('Video')} className="text-brand-orange focus:ring-brand-orange" />
                                <span className="text-sm dark:text-gray-300">Video</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={type === 'Audio'} onChange={() => setType('Audio')} className="text-brand-orange focus:ring-brand-orange" />
                                <span className="text-sm dark:text-gray-300">Audio</span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-opacity-90">Submit</button>
                </form>
            </div>
        </div>
    );
};

const PaymentModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    item: MusicProduct | null; 
    type: 'Sale' | 'Rent' | 'Repair';
    amount?: number;
    onSubmit: (txnId: string, file: File, startDate?: string, endDate?: string) => void;
}> = ({ isOpen, onClose, item, type, amount, onSubmit }) => {
    const [txnId, setTxnId] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dates, setDates] = useState({ start: '', end: '' });

    if (!isOpen) return null;

    const finalAmount = amount || (item ? item.price : 0);
    // If Rent, calculate advance. If Sale/Repair, usually full or advance. 
    // Prompt said "30% Advance". Let's apply that rule generally or specifically for Rent.
    const advanceAmount = Math.round(finalAmount * 0.3);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!txnId || !file) {
            alert("Please provide Transaction ID and upload screenshot.");
            return;
        }
        if (type === 'Rent' && (!dates.start || !dates.end)) {
            alert("Please select rental dates.");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit(txnId, file, dates.start, dates.end);
            setIsSubmitting(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-zoom-in">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Secure Payment</h3>
                    <button onClick={onClose}><X size={20} className="text-gray-500" /></button>
                </div>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="text-center mb-6">
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Advance Payable (30%)</p>
                        <h2 className="text-4xl font-extrabold text-brand-orange">₹{advanceAmount}</h2>
                        <p className="text-xs text-gray-400 mt-1">Total Value: ₹{finalAmount}</p>
                    </div>

                    <div className="bg-white p-4 border-2 border-dashed border-gray-300 rounded-xl mb-6 flex flex-col items-center justify-center">
                        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-2">
                            <span className="text-gray-500 font-bold text-lg">UPI QR CODE</span>
                        </div>
                        <p className="font-mono text-sm font-bold text-gray-700">{UPI_ID}</p>
                        <p className="text-xs text-green-600 font-semibold mt-1">Scan to Pay</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {type === 'Rent' && (
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Start Date</label>
                                    <input type="date" required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" 
                                        onChange={e => setDates({...dates, start: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">End Date</label>
                                    <input type="date" required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                        onChange={e => setDates({...dates, end: e.target.value})} />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Transaction ID (UTR)</label>
                            <input 
                                type="text" 
                                required
                                value={txnId}
                                onChange={e => setTxnId(e.target.value)}
                                placeholder="Enter 12-digit UTR number"
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-brand-orange dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Upload Payment Screenshot</label>
                            <label className="flex items-center gap-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <UploadCloud size={18} className="text-brand-orange"/>
                                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{file ? file.name : "Choose File..."}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} required />
                            </label>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full py-3 bg-brand-green text-white font-bold rounded-xl shadow-lg hover:bg-opacity-90 transition-all mt-4 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? 'Verifying...' : 'Submit Payment Details'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const MusicIndustryPage: React.FC<MusicIndustryPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'Store' | 'Rent' | 'Repair' | 'Admin' | 'Media'>('Store');
  const [adminTab, setAdminTab] = useState<'Transactions' | 'Products' | 'Rentals' | 'Repairs'>('Transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'New' | 'Used'>('All');
  const [activeCategory, setActiveCategory] = useState<MusicCategory | 'All'>('All');
  
  // Data State with LocalStorage
  const [products, setProducts] = useState<MusicProduct[]>(() => {
      const saved = localStorage.getItem('music_products');
      return saved ? JSON.parse(saved) : MOCK_MUSIC_PRODUCTS;
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
      const saved = localStorage.getItem('music_transactions');
      return saved ? JSON.parse(saved) : [];
  });

  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>(() => {
      const saved = localStorage.getItem('music_repairs');
      return saved ? JSON.parse(saved) : [];
  });

  const [rentals, setRentals] = useState<RentalBooking[]>(() => {
      const saved = localStorage.getItem('music_rentals');
      return saved ? JSON.parse(saved) : [];
  });

  const [musicMedia, setMusicMedia] = useState<MusicMedia[]>(() => {
      const saved = localStorage.getItem('music_media');
      return saved ? JSON.parse(saved) : MOCK_MUSIC_MEDIA;
  });

  // Persist State
  useEffect(() => { localStorage.setItem('music_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('music_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('music_repairs', JSON.stringify(repairRequests)); }, [repairRequests]);
  useEffect(() => { localStorage.setItem('music_rentals', JSON.stringify(rentals)); }, [rentals]);
  useEffect(() => { localStorage.setItem('music_media', JSON.stringify(musicMedia)); }, [musicMedia]);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<MusicProduct | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isSubmitMediaModalOpen, setIsSubmitMediaModalOpen] = useState(false);
  
  // Repair Form State
  const [repairForm, setRepairForm] = useState({ item: '', issue: '', contact: '' });

  const handleProductAction = (product: MusicProduct) => {
      setSelectedProduct(product);
      setIsPaymentModalOpen(true);
  };

  const handlePaymentSubmit = (txnId: string, file: File, startDate?: string, endDate?: string) => {
      const newTransaction: Transaction = {
          id: txnId,
          type: selectedProduct ? selectedProduct.type : 'Repair', // Fallback if needed
          itemId: selectedProduct?.id,
          itemName: selectedProduct?.name || 'Unknown Item',
          amount: selectedProduct ? Math.round(selectedProduct.price * 0.3) : 0,
          date: new Date().toISOString().split('T')[0],
          status: 'Pending',
          screenshotUrl: URL.createObjectURL(file) // Mock URL
      };
      
      setTransactions(prev => [newTransaction, ...prev]);

      if (selectedProduct?.type === 'Rent' && startDate && endDate) {
          const newRental: RentalBooking = {
              id: `rent-${Date.now()}`,
              productId: selectedProduct.id,
              productName: selectedProduct.name,
              startDate,
              endDate,
              totalCost: selectedProduct.price, // Simplify: price per day * days could be calc
              status: 'Pending',
              renterName: 'Current User'
          };
          setRentals(prev => [newRental, ...prev]);
      }

      alert(`Payment Submitted!\nTransaction ID: ${txnId}\nStatus: Pending Verification.\nYou will receive a confirmation message on ${HELPLINE}.`);
  };

  const handleRepairSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newRequest: RepairRequest = {
          id: `REP-${Date.now()}`,
          item: repairForm.item,
          issue: repairForm.issue,
          contact: repairForm.contact,
          status: 'Pending',
          date: new Date().toLocaleDateString(),
      };
      setRepairRequests(prev => [newRequest, ...prev]);
      alert("Repair Request Submitted! A technician will contact you shortly.");
      setRepairForm({ item: '', issue: '', contact: '' });
  };

  const handleAddProduct = (newProduct: MusicProduct) => {
      setProducts(prev => [newProduct, ...prev]);
  };

  const handleSubmitMedia = (newMedia: MusicMedia) => {
      setMusicMedia(prev => [newMedia, ...prev]);
  };

  // Admin Actions
  const approveTransaction = (id: string) => {
      setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'Verified' } : t));
      // Logic to update rental status or product status could go here
  };

  const filteredProducts = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'Store' ? p.type === 'Sale' : (activeTab === 'Rent' ? p.type === 'Rent' : true);
      const matchesFilter = filterType === 'All' || p.condition === filterType;
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesTab && matchesFilter && matchesCategory;
  });

  const categoriesList = [
      { id: 'All', label: 'All', icon: Package },
      { id: 'Guitars', label: 'Guitars', icon: Guitar },
      { id: 'Keyboards', label: 'Keyboards', icon: Music },
      { id: 'Drums', label: 'Drums', icon: Disc },
      { id: 'Microphones', label: 'Microphones', icon: Mic2 },
      { id: 'Speakers', label: 'Speakers', icon: Speaker },
      { id: 'Studio Equipment', label: 'Studio', icon: Settings2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-darker pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-brand-orange mb-2 transition-colors">
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                    <Music className="text-brand-orange" /> Music Industry Hub
                </h1>
            </div>
            <div className="flex gap-4">
                {activeTab === 'Store' && (
                    <button onClick={() => setIsSellModalOpen(true)} className="flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-full shadow-md font-bold hover:bg-opacity-90">
                        <Plus size={20} /> Sell Gear
                    </button>
                )}
                {activeTab === 'Media' && (
                    <button onClick={() => setIsSubmitMediaModalOpen(true)} className="flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-full shadow-md font-bold hover:bg-opacity-90">
                        <UploadCloud size={20} /> Submit Music
                    </button>
                )}
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-5 py-2.5 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                    <Phone size={20} className="text-green-600 animate-pulse" />
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Helpline</p>
                        <p className="text-lg font-black text-gray-900 dark:text-white leading-none">{HELPLINE}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 w-fit mx-auto md:mx-0">
            {['Store', 'Rent', 'Repair', 'Media', 'Admin'].map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                        activeTab === tab 
                        ? 'bg-brand-orange text-white shadow-lg transform scale-105' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                    {tab === 'Store' && <ShoppingCart size={16} className="inline mr-2" />}
                    {tab === 'Rent' && <Clock size={16} className="inline mr-2" />}
                    {tab === 'Repair' && <Wrench size={16} className="inline mr-2" />}
                    {tab === 'Media' && <Video size={16} className="inline mr-2" />}
                    {tab === 'Admin' && <ShieldCheck size={16} className="inline mr-2" />}
                    {tab}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <main>
            {/* STORE & RENT VIEW */}
            {(activeTab === 'Store' || activeTab === 'Rent') && (
                <>
                    {/* Search & Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder={`Search ${activeTab === 'Store' ? 'instruments to buy' : 'gear to rent'}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                            />
                        </div>
                        <div className="flex gap-2 bg-white dark:bg-gray-800 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700">
                            {['All', 'New', 'Used'].map(f => (
                                <button 
                                    key={f} 
                                    onClick={() => setFilterType(f as any)}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${filterType === f ? 'bg-gray-100 dark:bg-gray-700 text-brand-orange' : 'text-gray-500'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Icons Bar */}
                    <div className="flex gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                        {categoriesList.map(cat => (
                            <div key={cat.id} 
                                onClick={() => setActiveCategory(cat.id as any)}
                                className={`flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group p-2 rounded-xl transition-all ${activeCategory === cat.id ? 'bg-white dark:bg-gray-800 shadow-md scale-105' : ''}`}>
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md border transition-colors ${activeCategory === cat.id ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 group-hover:border-brand-orange'}`}>
                                    <cat.icon size={24} />
                                </div>
                                <span className={`text-xs font-semibold ${activeCategory === cat.id ? 'text-brand-orange' : 'text-gray-600 dark:text-gray-400'}`}>{cat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onAction={handleProductAction} />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <Package size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No Items Found</h3>
                            <p className="text-gray-500">Try adjusting your search filters.</p>
                        </div>
                    )}
                </>
            )}

            {/* REPAIR VIEW */}
            {activeTab === 'Repair' && (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Disclaimer & Info */}
                    <div className="space-y-6">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-6 rounded-2xl">
                            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-400 flex items-center gap-2 mb-2">
                                <ShieldCheck size={20} /> Repair Disclaimer
                            </h3>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
                                Repair services are facilitated between the User and the Technician. 
                                <span className="font-bold"> The Website owner is not responsible for any damage, delay, or loss during the repair process.</span> 
                                Please verify the technician's credentials before handing over expensive equipment.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Why Choose Us?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-green-500" /> Expert Technicians for all instruments
                                </li>
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-green-500" /> Transparent Pricing
                                </li>
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-green-500" /> Home Pickup Available (Select Cities)
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Repair Request Form */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Book a Repair</h3>
                        <form onSubmit={handleRepairSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Instrument / Gear Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={repairForm.item}
                                    onChange={e => setRepairForm({...repairForm, item: e.target.value})}
                                    placeholder="e.g. Yamaha Keyboard, Gibson Guitar"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Issue Description</label>
                                <textarea 
                                    required
                                    rows={4}
                                    value={repairForm.issue}
                                    onChange={e => setRepairForm({...repairForm, issue: e.target.value})}
                                    placeholder="Describe the problem in detail..."
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Contact Number</label>
                                <input 
                                    type="tel" 
                                    required
                                    value={repairForm.contact}
                                    onChange={e => setRepairForm({...repairForm, contact: e.target.value})}
                                    placeholder="Your mobile number"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                                />
                            </div>
                            <button type="submit" className="w-full py-4 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 transition-all flex items-center justify-center gap-2">
                                <Wrench size={18} /> Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MEDIA VIEW */}
            {activeTab === 'Media' && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {musicMedia.map(media => (
                            <MediaCard key={media.id} media={media} />
                        ))}
                    </div>
                    {musicMedia.length === 0 && (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <Music size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No Media Found</h3>
                            <p className="text-gray-500">Be the first to share your music!</p>
                        </div>
                    )}
                </div>
            )}

            {/* ADMIN VIEW */}
            {activeTab === 'Admin' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">Admin Mode</span>
                        </div>
                        <div className="flex gap-2">
                            {['Transactions', 'Products', 'Rentals', 'Repairs'].map(t => (
                                <button key={t} onClick={() => setAdminTab(t as any)} 
                                    className={`px-4 py-2 rounded-lg text-sm font-bold ${adminTab === t ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto p-4">
                        {adminTab === 'Transactions' && (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Transaction ID</th>
                                        <th className="px-6 py-4 font-bold">Type</th>
                                        <th className="px-6 py-4 font-bold">Item</th>
                                        <th className="px-6 py-4 font-bold">Amount</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {transactions.map(txn => (
                                        <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-6 py-4 font-mono text-sm">{txn.id}</td>
                                            <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-gray-200 rounded text-xs font-bold">{txn.type}</span></td>
                                            <td className="px-6 py-4 text-sm">{txn.itemName}</td>
                                            <td className="px-6 py-4 text-sm font-bold">₹{txn.amount}</td>
                                            <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${txn.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{txn.status}</span></td>
                                            <td className="px-6 py-4 text-right">
                                                {txn.status === 'Pending' && <button onClick={() => approveTransaction(txn.id)} className="text-green-600 font-bold hover:underline">Approve</button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {/* Other Admin Tabs placeholders for brevity, similar structure */}
                        {adminTab === 'Products' && (
                            <div className="p-4">
                                <p className="mb-4 font-bold">Manage Products ({products.length})</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {products.map(p => (
                                        <div key={p.id} className="flex justify-between items-center p-3 border rounded bg-gray-50 dark:bg-gray-700">
                                            <span>{p.name} ({p.category})</span>
                                            <span className="font-bold">₹{p.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {adminTab === 'Rentals' && (
                            <div className="p-4">
                                <p className="mb-4 font-bold">Active Rentals ({rentals.length})</p>
                                {rentals.length === 0 && <p className="text-gray-500">No active rentals.</p>}
                                {rentals.map(r => (
                                    <div key={r.id} className="flex justify-between items-center p-3 border rounded mb-2">
                                        <div>
                                            <p className="font-bold">{r.productName}</p>
                                            <p className="text-xs">{r.startDate} to {r.endDate}</p>
                                        </div>
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{r.status}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {adminTab === 'Repairs' && (
                            <div className="p-4">
                                <p className="mb-4 font-bold">Repair Requests ({repairRequests.length})</p>
                                {repairRequests.length === 0 && <p className="text-gray-500">No repair requests.</p>}
                                {repairRequests.map(r => (
                                    <div key={r.id} className="flex justify-between items-center p-3 border rounded mb-2">
                                        <div>
                                            <p className="font-bold">{r.item}</p>
                                            <p className="text-xs text-gray-500">{r.issue}</p>
                                        </div>
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">{r.status}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>

        {/* Footer / Legal */}
        <footer className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
                <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-brand-orange transition-colors">Disclaimer</a>
                <a href="#" className="hover:text-brand-orange transition-colors">User Agreement</a>
                <a href="#" className="hover:text-brand-orange transition-colors">Refund Policy</a>
            </div>
            <p>&copy; {new Date().getFullYear()} Music Industry Hub. All rights reserved.</p>
        </footer>

      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        item={selectedProduct}
        type={selectedProduct?.type || 'Sale'}
        onSubmit={handlePaymentSubmit}
      />

      <SellProductModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onSave={handleAddProduct}
      />

      <SubmitMediaModal
        isOpen={isSubmitMediaModalOpen}
        onClose={() => setIsSubmitMediaModalOpen(false)}
        onSave={handleSubmitMedia}
      />
    </div>
  );
};
