
import React, { useState } from 'react';
import { ArrowLeft, Trophy, Award, Calendar, Image as ImageIcon, X, ChevronLeft, ChevronRight, Search, Code, Video, Users, BookOpen } from 'lucide-react';

interface StudentCompetitionsPageProps {
  onNavigate: (page: string) => void;
}

const GALLERY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop", category: "Events", title: "Annual Art Competition 2023", desc: "Students showcasing their creativity live." },
  { id: 2, src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop", category: "Toppers", title: "State Level Winner", desc: "Priya Singh receiving the Gold Medal." },
  { id: 3, src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop", category: "Certificates", title: "Certificate Distribution Ceremony", desc: "Honoring our participants." },
  { id: 4, src: "https://images.unsplash.com/photo-1577896335477-2858506f48db?q=80&w=1000&auto=format&fit=crop", category: "Toppers", title: "Top 10 Achievers", desc: "Group photo of the merit list holders." },
  { id: 5, src: "https://images.unsplash.com/photo-1544928147-79a2af1f9850?q=80&w=1000&auto=format&fit=crop", category: "Events", title: "Debate Championship", desc: "Intense finals at the city auditorium." },
  { id: 6, src: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1000&auto=format&fit=crop", category: "Certificates", title: "Participation Awards", desc: "Encouraging every student's effort." },
  { id: 7, src: "https://images.unsplash.com/photo-1565514020176-db99d5059dc3?q=80&w=1000&auto=format&fit=crop", category: "Events", title: "Science Fair 2023", desc: "Innovative projects on display." },
  { id: 8, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop", category: "Toppers", title: "Math Olympiad Winner", desc: "Rahul Sharma with his trophy." },
];

const UPCOMING_EVENTS = [
  { id: 1, title: "Junior Scholarship Exam", category: "Exam", class: "1-5", fee: 250, date: "Dec 15", icon: Trophy, color: "blue" },
  { id: 2, title: "Middle School Challenge", category: "Exam", class: "6-8", fee: 300, date: "Dec 18", icon: Trophy, color: "purple" },
  { id: 3, title: "Senior Merit Search", category: "Exam", class: "9-12", fee: 350, date: "Dec 20", icon: Trophy, color: "orange" },
  { id: 4, title: "Intro to AI & ML", category: "Workshop", class: "8-12", fee: 500, date: "Jan 05", icon: BookOpen, color: "green" },
  { id: 5, title: "Career in Design", category: "Webinar", class: "9-12", fee: 0, date: "Jan 08", icon: Video, color: "pink" },
  { id: 6, title: "National Coding Cup", category: "Coding Challenge", class: "6-12", fee: 150, date: "Jan 12", icon: Code, color: "indigo" },
  { id: 7, title: "Public Speaking Mastery", category: "Seminar", class: "All", fee: 200, date: "Jan 15", icon: Users, color: "teal" },
];

const GALLERY_CATEGORIES = ["All", "Events", "Toppers", "Certificates"];
const EVENT_CATEGORIES = ["All", "Exam", "Workshop", "Seminar", "Webinar", "Coding Challenge"];

export const StudentCompetitionsPage: React.FC<StudentCompetitionsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("Gallery");
  
  // Gallery State
  const [activeGalleryCategory, setActiveGalleryCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Event State
  const [activeEventFilter, setActiveEventFilter] = useState("All");

  const filteredImages = activeGalleryCategory === "All" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeGalleryCategory);

  const filteredEvents = activeEventFilter === "All"
    ? UPCOMING_EVENTS
    : UPCOMING_EVENTS.filter(event => event.category === activeEventFilter);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center gap-2 text-gray-500 hover:text-brand-orange mb-4 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Student Competitions</h1>
              <p className="text-gray-500 dark:text-gray-400">Celebrating excellence, creativity, and academic achievements.</p>
            </div>
            <div className="flex bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              {["Gallery", "Upcoming", "Results"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                    activeTab === tab 
                      ? 'bg-brand-orange text-white shadow' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Tab */}
        {activeTab === "Gallery" && (
          <div className="animate-fade-in">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
              {GALLERY_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveGalleryCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    activeGalleryCategory === cat
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-transparent'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-brand-orange'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((img, index) => (
                <div 
                  key={img.id} 
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-gray-200 dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all"
                >
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">{img.category}</span>
                    <h3 className="text-white font-bold text-sm leading-tight">{img.title}</h3>
                  </div>
                  <div className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Competitions Tab */}
        {activeTab === "Upcoming" && (
          <div className="animate-fade-in">
            {/* Event Filter Pills */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {EVENT_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveEventFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${
                    activeEventFilter === cat
                      ? 'bg-brand-orange text-white border-brand-orange shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => {
                  const Icon = event.icon;
                  return (
                    <div key={event.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden group hover:border-brand-orange/50 transition-colors">
                      <div className="absolute top-0 right-0 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold px-3 py-1 rounded-bl-lg">
                        {event.fee === 0 ? 'Free' : `Fee: ₹${event.fee}`}
                      </div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl bg-opacity-10 dark:bg-opacity-20 text-${event.color}-600 bg-${event.color}-500`}>
                          <Icon size={24} />
                        </div>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-full">
                          Registration Open
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-orange transition-colors">
                        {event.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-6">
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-semibold rounded">
                          {event.category}
                        </span>
                        <span className="text-gray-400 text-xs">•</span>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Class {event.class}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                        <span className="flex items-center gap-1.5"><Calendar size={16} className="text-brand-orange" /> {event.date}</span>
                        <span className="flex items-center gap-1.5"><Award size={16} /> National Level</span>
                      </div>
                      
                      <button className="w-full py-2.5 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-brand-orange/20">
                        Register Now
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Events Found</h3>
                  <p>There are no upcoming {activeEventFilter} events at the moment.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Tab (Placeholder) */}
        {activeTab === "Results" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Results</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search student..." className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-orange dark:text-white" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-semibold">
                  <tr>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Competition</th>
                    <th className="p-4">Rank</th>
                    <th className="p-4 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 font-medium text-gray-900 dark:text-white">Student Name {i}</td>
                      <td className="p-4">State Level Art Contest</td>
                      <td className="p-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">Rank {i}</span></td>
                      <td className="p-4 text-right font-mono">9{8-i}.5%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm" onClick={closeLightbox}>
          
          <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-20">
            <X size={32} />
          </button>

          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md z-20">
            <ChevronLeft size={24} />
          </button>

          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md z-20">
            <ChevronRight size={24} />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredImages[selectedImageIndex].src} 
              alt={filteredImages[selectedImageIndex].title} 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold">{filteredImages[selectedImageIndex].title}</h3>
              <p className="text-gray-300 text-sm mt-1">{filteredImages[selectedImageIndex].desc}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-brand-orange text-black text-xs font-bold rounded-full uppercase">
                {filteredImages[selectedImageIndex].category}
              </span>
            </div>
          </div>
          
          <div className="absolute bottom-4 text-white/50 text-sm">
            {selectedImageIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
};
