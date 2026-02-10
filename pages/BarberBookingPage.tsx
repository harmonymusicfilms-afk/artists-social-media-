
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, MapPin, Star, Scissors, Clock, Calendar, CheckCircle, X, Filter, ChevronRight } from 'lucide-react';

interface BarberBookingPageProps {
  onNavigate: (page: string) => void;
}

interface Service {
  name: string;
  price: number;
  duration: string; // e.g., "30 min"
}

interface BarberShop {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  isOpen: boolean;
  services: Service[];
  tags: string[];
}

const MOCK_BARBERS: BarberShop[] = [
  {
    id: 'b1',
    name: 'The Classic Cut',
    location: 'Bandra West, Mumbai',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1000&auto=format&fit=crop',
    isOpen: true,
    services: [
      { name: 'Classic Haircut', price: 250, duration: '30 min' },
      { name: 'Beard Trim & Shape', price: 150, duration: '20 min' },
      { name: 'Head Massage', price: 300, duration: '45 min' },
      { name: 'Royal Shave', price: 200, duration: '30 min' }
    ],
    tags: ['Unisex', 'AC']
  },
  {
    id: 'b2',
    name: 'Urban Grooming Studio',
    location: 'Koramangala, Bangalore',
    rating: 4.5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1503951914205-b27cf115480c?q=80&w=1000&auto=format&fit=crop',
    isOpen: true,
    services: [
      { name: 'Fade Haircut', price: 350, duration: '45 min' },
      { name: 'Hair Color', price: 800, duration: '60 min' },
      { name: 'De-Tan Facial', price: 600, duration: '45 min' }
    ],
    tags: ['Premium', 'Credit Card Accepted']
  },
  {
    id: 'b3',
    name: 'Scissors & Razors',
    location: 'Connaught Place, Delhi',
    rating: 4.2,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1599351431202-6e0005079746?q=80&w=1000&auto=format&fit=crop',
    isOpen: false,
    services: [
      { name: 'Quick Cut', price: 150, duration: '20 min' },
      { name: 'Kids Haircut', price: 120, duration: '30 min' },
      { name: 'Face Massage', price: 250, duration: '30 min' }
    ],
    tags: ['Budget Friendly']
  },
  {
    id: 'b4',
    name: 'Elite Salon & Spa',
    location: 'Jubilee Hills, Hyderabad',
    rating: 4.9,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
    isOpen: true,
    services: [
      { name: 'Advanced Hair Styling', price: 500, duration: '60 min' },
      { name: 'Keratin Treatment', price: 2500, duration: '120 min' },
      { name: 'Full Body Spa', price: 1500, duration: '90 min' }
    ],
    tags: ['Luxury', 'Spa']
  },
  {
    id: 'b5',
    name: 'Barber Bros',
    location: 'Salt Lake, Kolkata',
    rating: 4.6,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1000&auto=format&fit=crop',
    isOpen: true,
    services: [
      { name: 'Haircut', price: 200, duration: '30 min' },
      { name: 'Shave', price: 100, duration: '20 min' },
      { name: 'Hair Wash', price: 100, duration: '15 min' }
    ],
    tags: ['Men Only']
  }
];

const BookingModal: React.FC<{ shop: BarberShop; onClose: () => void }> = ({ shop, onClose }) => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');

    const toggleService = (serviceName: string) => {
        setSelectedServices(prev => 
            prev.includes(serviceName) ? prev.filter(s => s !== serviceName) : [...prev, serviceName]
        );
    };

    const totalAmount = shop.services
        .filter(s => selectedServices.includes(s.name))
        .reduce((sum, s) => sum + s.price, 0);

    const handleConfirm = () => {
        if (selectedServices.length === 0 || !date || !time) return;
        setStep('confirm');
        // Simulate API call
        setTimeout(() => setStep('success'), 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-zoom-in flex flex-col max-h-[90vh]">
                
                {step !== 'success' && (
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Appointment</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{shop.name}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"><X size={20}/></button>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {step === 'select' && (
                        <div className="space-y-6">
                            {/* Services */}
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2"><Scissors size={16} /> Select Services</h4>
                                <div className="space-y-2">
                                    {shop.services.map(service => (
                                        <div 
                                            key={service.name} 
                                            onClick={() => toggleService(service.name)}
                                            className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer transition-all ${
                                                selectedServices.includes(service.name) 
                                                ? 'border-brand-orange bg-brand-orange/5' 
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedServices.includes(service.name) ? 'bg-brand-orange border-brand-orange' : 'border-gray-400'}`}>
                                                    {selectedServices.includes(service.name) && <CheckCircle size={12} className="text-white" />}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{service.name}</p>
                                                    <p className="text-xs text-gray-500">{service.duration}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-gray-700 dark:text-gray-300">₹{service.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="date" 
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="time" 
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'confirm' && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">Confirming your slot...</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-zoom-in">
                                <CheckCircle size={40} />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">Your appointment at <span className="font-bold">{shop.name}</span> is set for <strong>{date}</strong> at <strong>{time}</strong>.</p>
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6 text-left border border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Summary</p>
                                {selectedServices.map(s => (
                                    <div key={s} className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-700 dark:text-gray-300">{s}</span>
                                        <span className="font-medium text-gray-900 dark:text-white">₹{shop.services.find(serv => serv.name === s)?.price}</span>
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2 flex justify-between font-bold">
                                    <span className="text-gray-900 dark:text-white">Total</span>
                                    <span className="text-brand-orange">₹{totalAmount}</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:opacity-90 transition-opacity">
                                Done
                            </button>
                        </div>
                    )}
                </div>

                {step === 'select' && (
                    <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Total</p>
                            <p className="text-2xl font-bold text-brand-orange">₹{totalAmount}</p>
                        </div>
                        <button 
                            onClick={handleConfirm}
                            disabled={selectedServices.length === 0 || !date || !time}
                            className="px-8 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Confirm Booking
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export const BarberBookingPage: React.FC<BarberBookingPageProps> = ({ onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedShop, setSelectedShop] = useState<BarberShop | null>(null);

    const filteredBarbers = useMemo(() => {
        return MOCK_BARBERS.filter(b => 
            b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            b.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.services.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm]);

    return (
        <div id="barber-booking-top" className="min-h-screen bg-gray-50 dark:bg-brand-darker pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex-1">
                        <button 
                            onClick={() => onNavigate('dashboard')} 
                            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold hover:text-brand-orange mb-4 transition-colors"
                        >
                            <ArrowLeft size={18} /> Back to Dashboard
                        </button>
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                            Look Sharp, <span className="text-brand-orange">Feel Sharp.</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Book appointments with the best barbers and salons near you.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full md:w-auto min-w-[300px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search by name, service, or location..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Filters Row (Simplified) */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                    {['Near Me', 'Top Rated', 'Open Now', 'Budget Friendly', 'Luxury'].map(filter => (
                        <button key={filter} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300 hover:border-brand-orange hover:text-brand-orange whitespace-nowrap transition-colors">
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBarbers.map(shop => (
                        <div key={shop.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                            <div className="relative h-48 overflow-hidden">
                                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-lg flex items-center gap-1">
                                        <Star size={12} className="text-amber-400 fill-current" /> {shop.rating}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-lg ${shop.isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                        {shop.isOpen ? 'Open Now' : 'Closed'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-xl text-gray-900 dark:text-white line-clamp-1">{shop.name}</h3>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-4">
                                    <MapPin size={14} className="shrink-0" /> {shop.location}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {shop.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center justify-between">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        Starting at <span className="text-brand-orange font-bold text-lg ml-1">₹{Math.min(...shop.services.map(s => s.price))}</span>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedShop(shop)}
                                        className="px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                                    >
                                        Book <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredBarbers.length === 0 && (
                    <div className="text-center py-20">
                        <Scissors size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">No Barbers Found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
                    </div>
                )}

            </div>

            {selectedShop && (
                <BookingModal 
                    shop={selectedShop} 
                    onClose={() => setSelectedShop(null)} 
                />
            )}
        </div>
    );
};
