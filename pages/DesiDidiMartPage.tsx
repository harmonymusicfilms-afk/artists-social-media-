
import React from 'react';
import { ArrowLeft, ShoppingBag, Heart, Users, CheckCircle, Gift, MapPin, Smartphone, Truck, ShieldCheck, Phone, MessageCircle, Star } from 'lucide-react';

interface DesiDidiMartPageProps {
  onNavigate: (page: string) => void;
}

const ProductCardWithImage: React.FC<{ title: string, items: string, icon: React.ElementType, image: string, color: string }> = ({ title, items, icon: Icon, image, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col h-full">
        <div className="relative h-48 overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
            <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${color} text-white shadow-lg z-10 backdrop-blur-sm bg-opacity-90`}>
                <Icon size={20} />
            </div>
            <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white mb-0 group-hover:translate-x-1 transition-transform">{title}</h3>
        </div>
        <div className="p-6 flex-1 flex flex-col">
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{items}</p>
            <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Explore Products &rarr;
            </div>
        </div>
    </div>
);

const FeatureCard: React.FC<{ title: string, desc: string, icon: React.ElementType }> = ({ title, desc, icon: Icon }) => (
    <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-pink-200 transition-colors">
        <div className="shrink-0">
            <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center">
                <Icon size={20} />
            </div>
        </div>
        <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
        </div>
    </div>
);

export const DesiDidiMartPage: React.FC<DesiDidiMartPageProps> = ({ onNavigate }) => {
  return (
    <div id="desi-didi-mart-top" className="min-h-screen bg-[#fffbf2] dark:bg-gray-900 pt-20 pb-12 font-sans">
      
      {/* Header & Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold hover:text-brand-orange mb-6 transition-colors"
        >
            <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-2xl mb-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/sativa.png')] opacity-20"></div>
            <div className="relative z-10 px-6 py-16 md:py-24 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
                        Meri Pehal Initiative
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                        Desi Didi Mart
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-pink-100 mb-6 italic">
                        "Jahan Desi Apnapan Milan, Aur Har Didi Bane Aatmanirbhar!"
                    </p>
                    <p className="text-white/90 text-sm md:text-base max-w-xl leading-relaxed mb-8">
                        Namaste! Ye ek khaas pahal hai <strong>Meri Pehal Fast Help Artist Welfare Association Trust</strong> ki. 
                        Women empowerment aur self-employment sirf words nahi, balki ek reality hai.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <button onClick={() => document.getElementById('contact-section')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-3 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:bg-pink-50 transition-all transform hover:scale-105">
                            Judiye Humse
                        </button>
                        <button onClick={() => document.getElementById('products-section')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-3 bg-pink-700/50 text-white border border-white/30 font-bold rounded-full hover:bg-pink-700 transition-all">
                            Samaan Dekhein
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/3 aspect-square relative">
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl transform scale-90"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1622792672322-a9bd9c426646?q=80&w=1000&auto=format&fit=crop" 
                        alt="Indian Woman Entrepreneur" 
                        className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white/20 rotate-3 hover:rotate-0 transition-transform duration-500"
                    />
                </div>
            </div>
        </div>

        {/* Promotional Gallery (New Section) */}
        <section className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Star className="text-brand-orange fill-current" /> Community Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group shadow-lg">
                    <img src="https://images.unsplash.com/photo-1596468138838-70668f7c0248?q=80&w=1000&auto=format&fit=crop" alt="Promo 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-xs font-bold bg-brand-orange px-2 py-1 rounded mb-2 inline-block">Featured</span>
                        <h3 className="font-bold text-lg">Pure Handmade Pickles</h3>
                    </div>
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group shadow-lg">
                    <img src="https://images.unsplash.com/photo-1606913084603-3e7702b01627?q=80&w=1000&auto=format&fit=crop" alt="Promo 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-xs font-bold bg-pink-600 px-2 py-1 rounded mb-2 inline-block">Best Seller</span>
                        <h3 className="font-bold text-lg">Authentic Spices</h3>
                    </div>
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group shadow-lg">
                    <img src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1000&auto=format&fit=crop" alt="Promo 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-xs font-bold bg-green-600 px-2 py-1 rounded mb-2 inline-block">New Arrival</span>
                        <h3 className="font-bold text-lg">Handloom Sarees</h3>
                    </div>
                </div>
            </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Humara Mission</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Hum maante hain ki asli taqat ghar ki mahilaon mein hoti hai. Humara mission clear hai: 
                    <span className="font-bold text-pink-600 dark:text-pink-400 mx-1">Har Didi ko Dukaandar banana!</span> 
                    Chahe woh gaane wali ho, naachne wali ho, ya ghar sambhalne wali – har haath mein hunar hai, bas ek mauka chahiye.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard 
                    title="Gaaon se Shehar tak" 
                    desc="Panchayat, Block aur District level par centres. Aapke hi mohalle aur gaon mein!" 
                    icon={MapPin} 
                />
                <FeatureCard 
                    title="Free Training" 
                    desc="Product banane ki free training. Pickle ho ya herbal soap, sab sikhayenge!" 
                    icon={Users} 
                />
                <FeatureCard 
                    title="Asli Desi, Asli Pure" 
                    desc="100% local aur pure products. Market se 30-40% sasta, seedha aapka fayda." 
                    icon={ShieldCheck} 
                />
                <FeatureCard 
                    title="SHG Groups Welcome" 
                    desc="Aapke group ke achhe products hum fair price par kharidenge aur bade market tak pahunchayenge." 
                    icon={Heart} 
                />
            </div>
        </section>

        {/* Products Section */}
        <section id="products-section" className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-brand-orange pl-4">
                Kya-Kya Milega? <span className="text-lg font-normal text-gray-500 ml-2">Bas naam bataiye aur paaiye</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProductCardWithImage 
                    title="Kitchen se Jude" 
                    items="Mirchi, haldi, dhaniya powder, atta, besan, sarson ka tel, daal, chawal, chai, cheeni – sab desi quality mein!"
                    icon={ShoppingBag}
                    image="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop"
                    color="bg-orange-500"
                />
                <ProductCardWithImage 
                    title="Haath se Bana" 
                    items="Achaar, jam, biscuits, namkeen, agarbatti – ghar jaisa swaad!"
                    icon={Heart}
                    image="https://images.unsplash.com/photo-1621996659490-3275b4d0d951?q=80&w=1000&auto=format&fit=crop"
                    color="bg-red-500"
                />
                <ProductCardWithImage 
                    title="Safai ka Saaman" 
                    items="Jhadoo, pochha, floor cleaner, handwash, herbal sabun – chemical-free!"
                    icon={CheckCircle}
                    image="https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"
                    color="bg-teal-500"
                />
                <ProductCardWithImage 
                    title="Pehnawa aur Saaman" 
                    items="Kapde, jootey, jute bags, kapde ke thailay – fashionable aur eco-friendly!"
                    icon={ShoppingBag}
                    image="https://images.unsplash.com/photo-1610189012906-4783382c591d?q=80&w=1000&auto=format&fit=crop"
                    color="bg-purple-500"
                />
                <ProductCardWithImage 
                    title="Electronics bhi" 
                    items="LED bulbs, rechargeable lights, mobile chargers, power banks, smart TV – sab saste dam mein!"
                    icon={Smartphone}
                    image="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop"
                    color="bg-blue-600"
                />
                <ProductCardWithImage 
                    title="Online & Offline" 
                    items="Nazdeeki centre par aake kharido ya Website/App se ghar baithe order karo. Home delivery available!"
                    icon={Truck}
                    image="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1000&auto=format&fit=crop"
                    color="bg-gray-800"
                />
            </div>
        </section>

        {/* Membership Bonus Section */}
        <section className="mb-20">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Gift className="text-brand-orange" size={32} />
                            <h2 className="text-3xl md:text-4xl font-bold">Membership Card</h2>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-300 mb-6">Apki Pehchaan, Apka Fayda!</h3>
                        
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-400 mt-1" size={20} />
                                <span className="text-lg"><strong>30-40% Discount</strong> har kharidari par!</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="text-green-400 mt-1" size={20} />
                                <div>
                                    <span className="text-lg font-bold text-brand-orange">Special Bonus:</span>
                                    <p className="text-gray-300 mt-1">Agar lagatar 11 mahine tak har mahine ₹3000 ki shopping karte hain, toh <strong>12th month paaiye ₹3000 ka bonus card – bilkul free!</strong></p>
                                </div>
                            </li>
                        </ul>
                        <p className="text-sm bg-white/10 p-4 rounded-xl border border-white/10 italic">
                            "Matlab socho – jitna kharchoge, utna bachoge, aur ek saal mein poora ₹3000 wapas!"
                        </p>
                    </div>
                    
                    {/* Visual representation of Card */}
                    <div className="w-full md:w-96 h-56 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl shadow-2xl p-6 flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform duration-300 relative group cursor-pointer">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-30"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h4 className="font-bold text-xl uppercase tracking-widest text-white">Desi Didi</h4>
                                <span className="text-xs uppercase opacity-80 text-white">Privilege Card</span>
                            </div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chip_icon.svg/1024px-Chip_icon.svg.png" className="w-10 h-10 opacity-80 filter brightness-200" alt="Chip" />
                        </div>
                        <div className="relative z-10 text-white">
                            <p className="font-mono text-lg tracking-widest shadow-black drop-shadow-md">XXXX XXXX XXXX 9876</p>
                            <div className="flex justify-between items-end mt-2">
                                <span className="text-xs uppercase opacity-80">Valid Thru<br/>12/30</span>
                                <span className="font-bold uppercase tracking-wide">Priya Sharma</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA / Contact Section */}
        <section id="contact-section" className="text-center max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Judiye Humse!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Kya aap banna chahti hain is revolution ka hissa?<br/>
                Kya apke haath mein bhi koi hunar hai jo market tak pahunchna chahiye?<br/>
                Ya phir sirf achhe quality ke desi products ghar mangwana chahte hain?
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a 
                    href="https://wa.me/917073741421" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full shadow-lg hover:bg-[#20bd5a] transition-transform hover:scale-105"
                >
                    <MessageCircle size={24} /> WhatsApp: 7073741421
                </a>
                <button className="flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-gray-700 text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transition-colors">
                    <Phone size={24} /> Call Us Now
                </button>
            </div>
            
            <p className="mt-8 text-sm text-gray-500 font-medium">
                Desi Didi Mart – Sirf dukaan nahi, ye hai ek Aatmanirbhar Bharat ki ore uthaya hua kadam!
            </p>
        </section>

      </div>
    </div>
  );
};
