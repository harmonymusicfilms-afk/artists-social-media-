
import React, { useState, useEffect } from 'react';
import { HERO_IMAGES } from '../constants';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden flex items-center justify-center bg-gray-900">
      {/* Background Carousel */}
      {HERO_IMAGES.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="space-y-6 text-white max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider">
            <span>New Platform Live</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Connect. <br/>
            Create. <br/>
            Collaborate.
          </h1>
          <p className="text-lg text-gray-300 font-light max-w-lg leading-relaxed">
            The ultimate professional platform for artists to showcase work, find jobs, and connect with the creative community.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
              Get Started
            </button>
            <button className="px-8 py-3 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
              Explore Services
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="hidden md:block relative">
          <div className="w-full max-w-md mx-auto aspect-[3/4] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-out border border-gray-200 dark:border-gray-700">
             <img 
                src="https://picsum.photos/600/800?random=10" 
                alt="Featured Artist"
                className="w-full h-full object-cover"
             />
             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-xs font-bold text-brand-orange mb-1">FEATURED ARTIST</p>
                <h3 className="text-2xl font-bold mb-2">Artist Spotlight</h3>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>View Profile</span>
                    <ArrowRight size={16} />
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};
