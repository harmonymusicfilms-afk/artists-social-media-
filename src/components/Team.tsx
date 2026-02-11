
import { useRef, useEffect } from 'react';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Alex Vance",
    role: "Lead Cybersecurity Architect",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    expertise: ["Zero Trust Security", "Quantum Cryptography"],
    bio: "Pioneering the next generation of secure communication protocols.",
    socials: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    name: "Dr. Maya Kova",
    role: "AI Threat Specialist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    expertise: ["Neural Networks", "Threat Detection"],
    bio: "Specializing in identifying and neutralizing AI-driven threats.",
    socials: { linkedin: "#", twitter: "#", mail: "#" }
  },
  {
    name: "Jett Ryu",
    role: "Systems Penetration Tester",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    expertise: ["Ethical Hacking", "Network Defense"],
    bio: "Breaking systems to make them stronger. The ultimate stress tester.",
    socials: { github: "#", twitter: "#" }
  },
  {
    name: "Zara Quinn",
    role: "Frontend Engineering Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    expertise: ["React/Next.js", "WebGL/Three.js"],
    bio: "Crafting immersive, secure, and performant user interfaces.",
    socials: { linkedin: "#", github: "#" }
  }
];

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Safety check for sectionRef
      if (!sectionRef.current) return;

      // Animate section title
      gsap.fromTo(".team-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Staggered card reveal
      cardsRef.current.forEach((card, index) => {
        if (!card) return; // Skip if ref is null
        
        gsap.fromTo(card,
          { opacity: 0, y: 100, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-black relative overflow-hidden" id="team">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="team-title text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-wider">
          THE VANGUARD
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative h-[400px] perspective-1000"
            >
              {/* Card Container */}
              <div className="absolute inset-0 w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <div className="h-full w-full bg-gray-900/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl overflow-hidden flex flex-col items-center p-6 transition-all duration-300 group-hover:border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                    <div className="w-32 h-32 rounded-full border-2 border-cyan-500/50 p-1 mb-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-cyan-400 font-mono text-sm mb-4">{member.role}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mt-auto">
                      {member.expertise.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded text-[10px] text-cyan-300 font-mono uppercase tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)]">
                  <div className="h-full w-full bg-cyan-900/20 backdrop-blur-xl border border-cyan-400/50 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                    <h4 className="text-xl font-bold text-white mb-4">Bio Data</h4>
                    <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="flex gap-4">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} className="p-2 bg-black/50 rounded-full text-cyan-400 hover:text-white hover:bg-cyan-600 transition-all duration-300">
                          <Linkedin size={20} />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a href={member.socials.twitter} className="p-2 bg-black/50 rounded-full text-cyan-400 hover:text-white hover:bg-cyan-600 transition-all duration-300">
                          <Twitter size={20} />
                        </a>
                      )}
                      {member.socials.github && (
                        <a href={member.socials.github} className="p-2 bg-black/50 rounded-full text-cyan-400 hover:text-white hover:bg-cyan-600 transition-all duration-300">
                          <Github size={20} />
                        </a>
                      )}
                      {member.socials.mail && (
                        <a href={member.socials.mail} className="p-2 bg-black/50 rounded-full text-cyan-400 hover:text-white hover:bg-cyan-600 transition-all duration-300">
                          <Mail size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
