import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, Neural Nexus",
    content: "The cybersecurity solutions provided by this agency are simply years ahead of the competition. They secured our neural interface protocols when no one else could.",
    rating: 5
  },
  {
    name: "Marcus Void",
    role: "Director, Cyberdyne Systems",
    content: "Implementation was seamless. The neon aesthetic isn't just for show - their code is as clean and bright as their visuals. Absolutely recommended.",
    rating: 5
  },
  {
    name: "Elena Rigby",
    role: "Ops Lead, Off-World Colonies",
    content: "We needed robust communication encryption for our off-world teams. They delivered a system that's unbreakable and incredibly fast.",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const headingRef = useRef(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    const el = headingRef.current;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(el, 
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 bg-black overflow-hidden relative" id="testimonials">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f3ff_1px,transparent_1px),linear-gradient(to_bottom,#00f3ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400 tracking-wider"
        >
          CLIENT TRANSMISSIONS
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-gray-900/50 border border-cyan-500/30 p-8 md:p-12 rounded-2xl backdrop-blur-sm relative min-h-[300px] flex flex-col justify-center items-center text-center transition-all duration-500 hover:border-[#00f2ff] hover:shadow-[0_0_30px_rgba(0,242,255,0.3)]">
            {/* Quote Icon */}
            <div className="absolute top-4 left-8 text-6xl text-cyan-500/20 font-serif">"</div>
            
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 italic leading-relaxed">
              {testimonials[currentIndex].content}
            </p>

            <div>
              <h4 className="text-cyan-400 font-bold text-lg mb-1">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-cyan-500/60 text-sm font-mono">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 text-cyan-500 hover:text-cyan-300 transition-colors bg-black/50 rounded-full border border-cyan-500/30 hover:bg-cyan-900/20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 text-cyan-500 hover:text-cyan-300 transition-colors bg-black/50 rounded-full border border-cyan-500/30 hover:bg-cyan-900/20"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-cyan-400 w-8' 
                    : 'bg-cyan-900/50 hover:bg-cyan-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}