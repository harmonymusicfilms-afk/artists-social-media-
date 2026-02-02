
import React, { useState, useEffect, useRef } from 'react';
import { 
    HeartPulse, Stethoscope, Briefcase, Sparkles, Building, FileText, Phone, Mail, Globe, 
    ShieldCheck, QrCode, TestTube, Microscope, Waves, UserCheck, CheckCircle, Droplets, User, 
    Wind, X, HandCoins, HandHeart, Group, ArrowLeft, Target, Eye, MapPin, Users, Wallet, CreditCard, Star, LayoutDashboard
} from 'lucide-react';

// --- Parallax Utility ---
const useParallax = (speed: number = 0.1) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const offset = window.scrollY;
                ref.current.style.transform = `translateY(${offset * speed}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return ref;
};

type HealthCardView = 'main' | 'services' | 'about' | 'contact' | 'get-card' | 'free-card-form' | 'benefits-overview';

const HealthHeader: React.FC<{
  currentView: HealthCardView;
  onNavigate: (view: HealthCardView) => void;
  onBackToDashboard: () => void;
}> = ({ currentView, onNavigate, onBackToDashboard }) => {
  const handleLinkClick = (e: React.MouseEvent, view: HealthCardView) => {
    e.preventDefault();
    onNavigate(view);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('main')}>
                <div className="p-2 bg-health-primary/20 rounded-lg border border-health-primary/50 group-hover:shadow-[0_0_15px_#00f2ff] transition-all">
                    <HeartPulse className="text-health-primary" size={24} />
                </div>
                <div>
                    <h1 className="font-display font-bold text-lg text-white leading-tight tracking-wide">WHEC INDIA</h1>
                    <p className="text-[10px] text-gray-400 leading-tight font-mono uppercase tracking-widest">Dreams to Achieve Trust</p>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-health-primary hover:shadow-[0_0_10px_#00f2ff] transition-all">Services</a>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-health-primary hover:shadow-[0_0_10px_#00f2ff] transition-all">About</a>
                <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-health-primary hover:shadow-[0_0_10px_#00f2ff] transition-all">Contact</a>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={onBackToDashboard} 
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors border border-white/10 rounded-full hover:bg-white/10"
                >
                    <LayoutDashboard size={14} /> Dashboard
                </button>
                <a href="#health-card" onClick={(e) => handleLinkClick(e, 'get-card')} className="hidden md:block px-5 py-2 bg-health-primary text-black font-bold rounded-full text-xs uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_#00f2ff] transition-all">
                    Get Health Card
                </a>
            </div>
        </nav>
    </header>
  );
};


const Section: React.FC<{id: string, children: React.ReactNode, className?: string}> = ({id, children, className}) => (
    <section id={id} className={`py-16 md:py-24 relative ${className}`}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            {children}
        </div>
    </section>
);

const SectionTitle: React.FC<{title: string, subtitle: string}> = ({title, subtitle}) => (
    <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter uppercase mb-4 drop-shadow-lg">{title}</h2>
        <p className="text-lg text-gray-400 font-light">{subtitle}</p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-health-primary to-transparent mx-auto mt-6"></div>
    </div>
);

const services = [
    { icon: Microscope, title: "All Diagnostic Services" },
    { icon: X, title: "X-Ray Services" },
    { icon: Waves, title: "Ultrasound Services" },
    { icon: TestTube, title: "Blood Test" },
    { icon: Droplets, title: "Stool Test" },
    { icon: User, title: "Urine Test" },
    { icon: Stethoscope, title: "Advanced Diagnostics" },
    { icon: Wind, title: "Nature Therapy" },
    { icon: UserCheck, title: "Advance Physiotherapy" },
    { icon: HeartPulse, title: "Specialized Treatment" },
];

const detailedServicesWithDesc = [
  { icon: Microscope, title: "All Diagnostic Services", description: "Comprehensive health check-ups and diagnostic solutions to provide a complete overview of your health status." },
  { icon: X, title: "X-Ray Services", description: "High-quality digital X-ray imaging for accurate diagnosis of bone fractures, infections, and other abnormalities." },
  { icon: Waves, title: "Ultrasound Services", description: "Non-invasive ultrasound scans for monitoring pregnancies, diagnosing organ conditions, and guiding procedures." },
  { icon: TestTube, title: "Blood, Stool & Urine Tests", description: "A wide array of lab tests to detect diseases, monitor conditions, and assess overall organ function." },
  { icon: Stethoscope, title: "Advanced Diagnostics", description: "State-of-the-art diagnostic tools and technologies for complex health issues, ensuring precise results." },
  { icon: Wind, title: "Nature Therapy", description: "Holistic healing programs that utilize natural elements and environments to promote mental and physical well-being." },
  { icon: UserCheck, title: "Advance Physiotherapy", description: "Specialized physiotherapy treatments to restore movement, reduce pain, and recover from injury or surgery." },
  { icon: HeartPulse, title: "Specialized Treatment", description: "Tailored treatment programs for chronic diseases and specific health conditions, managed by experts." },
];

const ServicesDetailPage: React.FC<{ onBack: () => void; onNavigate: (view: HealthCardView) => void; }> = ({ onBack, onNavigate }) => {
  return (
    <main className="animate-fade-in pt-20">
      <Section id="detailed-services">
        <div className="flex items-center mb-12">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-wider hover:text-health-primary transition-colors text-xs">
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
        <SectionTitle 
          title="Our Healthcare Services" 
          subtitle="Dedicated to providing accessible, high-quality diagnostic and therapeutic care for everyone." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {detailedServicesWithDesc.map(service => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col h-full hover:border-health-primary/50 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-health-primary/10 text-health-primary rounded-xl flex items-center justify-center shrink-0 border border-health-primary/30 group-hover:bg-health-primary group-hover:text-black transition-all shadow-[0_0_15px_#00f2ff]">
                    <Icon size={28} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide leading-tight">{service.title}</h3>
                </div>
                <p className="text-gray-400 text-sm flex-grow mb-8 leading-relaxed font-light">{service.description}</p>
                <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="mt-auto w-full text-center px-6 py-3 bg-white/5 border border-white/10 text-health-primary font-bold uppercase tracking-widest rounded-lg text-xs hover:bg-health-primary hover:text-black transition-all">
                  Book Appointment
                </a>
              </div>
            );
          })}
        </div>
      </Section>
    </main>
  );
};

const complianceDetails = [
    { label: "Company Regd. No", value: "U51909OR2022PTC040904" },
    { label: "PAN No", value: "AADCW3854A" },
    { label: "GST No", value: "21AADCW3854A1ZT" },
    { label: "MSME (UDYAM)", value: "UDYAM-OD-19-0032410" },
    { label: "ESIC No", value: "44000381680000999" },
    { label: "Registered Office", value: "Plot No-265/2578, Bhoi Sahi, Baramunda, Bhubaneswar, Khordha, Odisha – 751003" }
];

const AboutUsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <main className="animate-fade-in pt-20">
        <div className="pt-12">
            <div className="max-w-7xl mx-auto px-6">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-wider hover:text-health-primary transition-colors mb-8 text-xs">
                    <ArrowLeft size={16} /> Back to Home
                </button>
                <SectionTitle 
                    title="About WHEC India"
                    subtitle="A Public Welfare & Social Service Provider Committed to Building a Healthier, Stronger Nation."
                />
            </div>
        </div>

        <Section id="about-intro">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wide">Our Journey Towards <span className="text-health-primary">Impact</span></h3>
                    <p className="text-gray-400 leading-relaxed mb-6 font-light">
                        WHEC India Private Limited was founded with a singular, powerful goal: to provide employment, healthcare access, financial empowerment, and social security to every household. We are a social service organization dedicated to bridging the gaps in society and ensuring that essential services are accessible and affordable for all, especially in rural and semi-urban India.
                    </p>
                    <p className="text-gray-400 leading-relaxed font-light">
                        Through our core initiative, <strong className="text-health-primary">Swasthya Saathi</strong>, we are revolutionizing healthcare access by providing affordable diagnostic services and long-term health support.
                    </p>
                </div>
                <div className="flex justify-center relative">
                    <div className="absolute inset-0 bg-health-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
                    <img src="https://picsum.photos/seed/community/600/600" alt="Community gathering" className="relative z-10 rounded-2xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"/>
                </div>
            </div>
        </Section>
        
        <Section id="vision-mission">
             <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center hover:border-health-primary/50 transition-colors">
                    <div className="w-16 h-16 bg-health-secondary/20 text-health-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Eye size={32} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-wide">Our Vision</h3>
                    <p className="text-gray-400 font-light">To create a self-reliant and healthy society where every individual has the opportunity to thrive with dignity, financial stability, and access to quality healthcare.</p>
                </div>
                 <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center hover:border-health-primary/50 transition-colors">
                    <div className="w-16 h-16 bg-health-primary/20 text-health-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_#00f2ff]">
                        <Target size={32} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-wide">Our Mission</h3>
                    <p className="text-gray-400 font-light">To empower communities through sustainable employment opportunities, accessible healthcare via the Swasthya Saathi program, and comprehensive social welfare initiatives.</p>
                </div>
             </div>
        </Section>

        <Section id="our-commitment">
            <SectionTitle title="Core Commitments" subtitle="Fostering holistic growth in three key areas." />
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-8 glass-panel rounded-2xl border border-white/10 hover:-translate-y-2 transition-transform">
                    <HeartPulse size={48} className="text-health-primary mx-auto mb-6 drop-shadow-md"/>
                    <h4 className="font-display font-bold text-xl text-white mb-3 uppercase tracking-wide">Accessible Healthcare</h4>
                    <p className="text-gray-400 text-sm font-light">Making diagnostic and health services affordable for all through our Swasthya Saathi card and health camps.</p>
                </div>
                 <div className="text-center p-8 glass-panel rounded-2xl border border-white/10 hover:-translate-y-2 transition-transform">
                    <Briefcase size={48} className="text-blue-500 mx-auto mb-6 drop-shadow-md"/>
                    <h4 className="font-display font-bold text-xl text-white mb-3 uppercase tracking-wide">Sustainable Employment</h4>
                    <p className="text-gray-400 text-sm font-light">Creating self-employment opportunities by supporting individuals to start their own Social Service Centers.</p>
                </div>
                 <div className="text-center p-8 glass-panel rounded-2xl border border-white/10 hover:-translate-y-2 transition-transform">
                    <Group size={48} className="text-emerald-500 mx-auto mb-6 drop-shadow-md"/>
                    <h4 className="font-display font-bold text-xl text-white mb-3 uppercase tracking-wide">Social Welfare</h4>
                    <p className="text-gray-400 text-sm font-light">Promoting community well-being through initiatives like the Swachh Gramin Abhiyan for better sanitation and hygiene.</p>
                </div>
            </div>
        </Section>

        <Section id="compliance">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                     <ShieldCheck size={48} className="text-health-primary mx-auto mb-4"/>
                     <h2 className="text-3xl font-display font-bold text-white tracking-wide uppercase">Compliance & Legal</h2>
                     <p className="mt-4 text-gray-400 font-mono text-sm">We operate with complete transparency and are fully compliant with all regulatory standards.</p>
                </div>
                <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-4">
                    {complianceDetails.map(detail => (
                        <div key={detail.label} className="flex flex-col sm:flex-row justify-between sm:items-start border-b border-white/5 pb-4 last:border-b-0 last:pb-0 gap-2">
                            <span className="font-bold text-gray-300 uppercase tracking-wider text-xs shrink-0 pt-1">{detail.label}</span>
                            <span className="font-mono text-sm text-health-primary sm:text-right">{detail.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    </main>
);

const ContactPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const contactDetails = [
        { icon: MapPin, label: "Office Address", value: "Plot No-265/2578, Bhoi Sahi, Baramunda, Bhubaneswar, Khordha, Odisha – 751003, India" },
        { icon: Phone, label: "Phone Number", value: "7735168551", href: "tel:7735168551" },
        { icon: Mail, label: "Email ID", value: "swasthyasaathi@yahoo.com", href: "mailto:swasthyasaathi@yahoo.com" },
        { icon: Globe, label: "Website", value: "www.swasthyasaathi.in", href: "https://www.swasthyasaathi.in" }
    ];

    return (
        <main className="animate-fade-in pt-20">
            <div className="pt-12">
                <div className="max-w-7xl mx-auto px-6">
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-wider hover:text-health-primary transition-colors mb-8 text-xs">
                        <ArrowLeft size={16} /> Back to Home
                    </button>
                    <SectionTitle
                        title="Get In Touch"
                        subtitle="We are here to serve your health and wellness needs. Reach out to us with any questions."
                    />
                </div>
            </div>

            <Section id="contact-details">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left: Contact Info & Map */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-display font-bold text-white mb-8 uppercase tracking-wide">Contact Information</h3>
                            <div className="space-y-6">
                                {contactDetails.map(item => {
                                    const Icon = item.icon;
                                    const isLink = !!item.href;
                                    const content = (
                                        <div key={item.label} className="flex items-start gap-4 p-4 glass-panel rounded-xl border border-white/5 hover:border-health-primary/30 transition-colors">
                                            <div className="w-10 h-10 bg-health-primary/10 text-health-primary rounded-lg flex items-center justify-center shrink-0">
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-300 text-xs uppercase tracking-wider mb-1">{item.label}</h4>
                                                <p className={`text-sm text-gray-400 font-light ${isLink ? 'hover:text-health-primary' : ''}`}>{item.value}</p>
                                            </div>
                                        </div>
                                    );
                                    return isLink ? <a href={item.href} target="_blank" rel="noopener noreferrer">{content}</a> : content;
                                })}
                            </div>
                        </div>
                        <div>
                             <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wide">Location</h3>
                             <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.4249826379!2d85.7369399895243!3d20.30113197828063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha%2C%20India!5e0!3m2!1sen!2sus!4v1628582239458!5m2!1sen!2sus" 
                                    width="100%" 
                                    height="350" 
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                                    allowFullScreen={true} 
                                    loading="lazy"
                                    title="WHEC India Location"
                                ></iframe>
                             </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="glass-panel p-8 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-display font-bold text-white mb-8 uppercase tracking-wide">Send Message</h3>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                                <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-health-primary outline-none text-white placeholder-gray-600 transition-colors" placeholder="John Doe" />
                            </div>
                             <div>
                                <label htmlFor="mobile" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Mobile Number</label>
                                <input type="tel" id="mobile" name="mobile" required className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-health-primary outline-none text-white placeholder-gray-600 transition-colors" placeholder="+91..." />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                                <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-health-primary outline-none text-white placeholder-gray-600 transition-colors" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Your Message</label>
                                <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-health-primary outline-none text-white placeholder-gray-600 transition-colors resize-none" placeholder="How can we help?"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full px-8 py-4 bg-health-primary text-black font-bold rounded-lg shadow-[0_0_20px_#00f2ff] hover:bg-white transition-all uppercase tracking-widest text-sm">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Section>
        </main>
    );
};

const GetHealthCardPage: React.FC<{ onBack: () => void, onApplyNow: () => void }> = ({ onBack, onApplyNow }) => {
    const benefits = [
        { icon: ShieldCheck, title: "Affordable Diagnostics", description: "Access a wide range of diagnostic tests and health check-ups at significantly reduced prices." },
        { icon: Users, title: "Healthcare for Your Family", description: "A single card that extends its benefits to your family, ensuring everyone has access to quality care." },
        { icon: Stethoscope, title: "Easy Healthcare Access", description: "Seamlessly connect with our growing network of healthcare providers and diagnostic centers." },
        { icon: Wallet, title: "Low Annual Cost", description: "Secure your health and peace of mind for a full year with a minimal, one-time subscription fee." },
    ];

    return (
        <main className="animate-fade-in pt-20">
            <div className="pt-12">
                <div className="max-w-7xl mx-auto px-6">
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-wider hover:text-health-primary transition-colors mb-8 text-xs">
                        <ArrowLeft size={16} /> Back to Home
                    </button>
                    <SectionTitle
                        title="Get Your Swasthya Saathi Card"
                        subtitle="Unlock a world of affordable, accessible healthcare for you and your family."
                    />
                </div>
            </div>

            <Section id="card-benefits">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map(benefit => {
                        const Icon = benefit.icon;
                        return (
                            <div key={benefit.title} className="glass-panel p-8 rounded-2xl border border-white/10 text-center hover:border-health-primary/30 transition-colors group">
                                <div className="w-16 h-16 bg-health-primary/10 text-health-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-[0_0_15px_#00f2ff] transition-all">
                                    <Icon size={32} />
                                </div>
                                <h3 className="font-display font-bold text-lg text-white mb-3 uppercase tracking-wide">{benefit.title}</h3>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">{benefit.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Section id="card-pricing">
                <div className="max-w-3xl mx-auto text-center">
                     <div className="glass-panel p-12 rounded-3xl border border-health-primary/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-health-primary/20 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <h3 className="text-sm font-bold text-health-secondary uppercase tracking-widest mb-2">Annual Subscription</h3>
                        <div className="my-6 flex items-center justify-center gap-2">
                            <span className="text-7xl font-display font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">₹150</span>
                            <span className="text-xl font-bold text-gray-500">+ GST</span>
                        </div>
                        <p className="text-lg text-gray-300 font-light mb-8">Secure your health for a full year.</p>
                        <button onClick={onApplyNow} className="inline-flex items-center justify-center gap-2 px-12 py-4 bg-health-primary text-black font-bold rounded-full text-sm uppercase tracking-widest shadow-[0_0_20px_#00f2ff] hover:bg-white hover:scale-105 transition-all">
                            <CreditCard size={18} /> Apply Now
                        </button>
                    </div>
                </div>
            </Section>
        </main>
    );
};

const FreeHealthCardFormPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <main className="animate-fade-in pt-20">
            <div className="pt-12">
                <div className="max-w-7xl mx-auto px-6">
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-wider hover:text-health-primary transition-colors mb-8 text-xs">
                        <ArrowLeft size={16} /> Back to Home
                    </button>
                    <SectionTitle
                        title="Free Health Card Registration"
                        subtitle="Free Health Card initiative for social welfare & healthcare access. Limited offer."
                    />
                </div>
            </div>
            <Section id="free-card-form">
                <div className="max-w-2xl mx-auto glass-panel p-10 rounded-3xl border border-white/10">
                    <form onSubmit={(e) => { e.preventDefault(); alert('Application Submitted!'); }} className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="text" id="fullName" name="fullName" required className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-health-primary outline-none text-white placeholder-gray-600 transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="mobileNumber" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Mobile Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="tel" id="mobileNumber" name="mobileNumber" required className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-health-primary outline-none text-white placeholder-gray-600 transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="fullAddress" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Address</label>
                             <div className="relative">
                                <MapPin className="absolute left-3 top-4 text-gray-400" size={18} />
                                <textarea id="fullAddress" name="fullAddress" rows={4} required className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-health-primary outline-none text-white placeholder-gray-600 transition-colors resize-none"></textarea>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="aadhaar" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Aadhaar / ID Number <span className="text-gray-600 font-normal normal-case">(Optional)</span></label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="text" id="aadhaar" name="aadhaar" className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-health-primary outline-none text-white placeholder-gray-600 transition-colors" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="w-full px-8 py-4 bg-health-primary text-black font-bold rounded-lg shadow-[0_0_20px_#00f2ff] hover:bg-white transition-all uppercase tracking-widest text-sm mt-4">
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </Section>
        </main>
    );
};

const BenefitsOverviewPage: React.FC<{ onBack: () => void, onApplyNow: () => void }> = ({ onBack, onApplyNow }) => {
    const benefits = [
        { icon: Microscope, title: "Comprehensive Diagnostic Access", description: "Gain access to a wide range of tests from blood work to advanced imaging." },
        { icon: Star, title: "Priority Service", description: "Receive priority appointments and faster service at our diagnostic centers." },
        { icon: Wallet, title: "Affordable Healthcare", description: "Enjoy significant discounts on diagnostic tests and consultations." },
        { icon: Building, title: "All-in-One Facilities", description: "Conveniently access multiple diagnostic services under one roof." },
    ];

    return (
        <main className="animate-fade-in pt-20">
            <div className="pt-12">
                <div className="max-w-7xl mx-auto px-6">
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-wider hover:text-health-primary transition-colors mb-8 text-xs">
                        <ArrowLeft size={16} /> Back to Home
                    </button>
                    <SectionTitle
                        title="Unlock Health Benefits"
                        subtitle="Your Swasthya Saathi Health Card is the key to affordable, accessible healthcare."
                    />
                </div>
            </div>

            <Section id="card-benefits-detailed">
                <div className="grid md:grid-cols-2 gap-8">
                    {benefits.map(benefit => {
                        const Icon = benefit.icon;
                        return (
                            <div key={benefit.title} className="glass-panel p-8 rounded-2xl border border-white/10 flex items-start gap-6 hover:border-health-primary/30 transition-colors">
                                <div className="w-14 h-14 bg-health-primary/10 text-health-primary rounded-xl flex items-center justify-center shrink-0 mt-1 border border-health-primary/20">
                                    <Icon size={28} />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-xl text-white mb-2 uppercase tracking-wide">{benefit.title}</h3>
                                    <p className="text-gray-400 text-sm font-light leading-relaxed">{benefit.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Section id="card-cta">
                <div className="max-w-3xl mx-auto text-center">
                     <div className="glass-panel p-12 rounded-3xl border border-health-primary/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-health-primary/10 to-transparent pointer-events-none"></div>
                        <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Ready to Secure Your Health?</h3>
                        <p className="text-lg text-gray-400 mt-4 font-light mb-8">Get your annual Swasthya Saathi Health Card today.</p>
                        <button onClick={onApplyNow} className="inline-flex items-center justify-center gap-2 px-12 py-4 bg-health-primary text-black font-bold rounded-full text-sm uppercase tracking-widest shadow-[0_0_20px_#00f2ff] hover:bg-white hover:scale-105 transition-all">
                            <CreditCard size={18} /> Apply for Card
                        </button>
                    </div>
                </div>
            </Section>
        </main>
    );
};

const swachhKitItems = ["Bucket", "Mug", "Phenyl", "Toilet Cleaner", "Bleaching Powder", "Hand Wash", "Sanitizers"];

interface HealthCardPageProps {
    onNavigate: (page: string) => void;
}

export const HealthCardPage: React.FC<HealthCardPageProps> = ({ onNavigate }) => {
    const [view, setView] = useState<HealthCardView>('main');
    const heroRef = useParallax(0.2);
    const swasthyaRef = useParallax(0.1);
    const swachhRef = useParallax(0.15);

    const handleNavigation = (targetView: HealthCardView) => {
        setView(targetView);
        window.scrollTo(0, 0);
    };

    const handleScrollTo = (e: React.MouseEvent, sectionId: string) => {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };
    
    return (
        <div className="bg-[#050505] text-white font-sans selection:bg-health-primary selection:text-black min-h-screen overflow-x-hidden">
            <HealthHeader 
                currentView={view} 
                onNavigate={handleNavigation} 
                onBackToDashboard={() => onNavigate('dashboard')}
            />
            
            {view === 'main' && (
                <main className="pt-20">
                    {/* Hero Section */}
                    <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 text-center overflow-hidden">
                        {/* Background Effects with Parallax */}
                        <div ref={heroRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-health-primary/10 rounded-full blur-[120px] pointer-events-none will-change-transform"></div>
                        
                        <div className="max-w-5xl mx-auto px-6 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-health-primary/30 bg-health-primary/10 backdrop-blur-md mb-6">
                                <span className="w-2 h-2 rounded-full bg-health-primary animate-pulse"></span>
                                <span className="text-[10px] font-mono text-health-primary tracking-widest uppercase">Healthcare Revolution</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-none mb-6">
                                ALL DIAGNOSTIC SERVICES <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-health-primary to-blue-500">UNDER ONE ROOF</span>
                            </h1>
                            <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto font-light">Your Health, Our Priority. Advanced diagnostics and social welfare for a better tomorrow.</p>
                            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                                <a href="#health-card" onClick={(e) => { e.preventDefault(); handleNavigation('free-card-form'); }} className="w-full sm:w-auto px-10 py-4 bg-health-primary text-black font-bold rounded-full text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:bg-white transition-all hover:scale-105">Get Free Health Card</a>
                                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }} className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full text-sm uppercase tracking-widest hover:bg-white/10 hover:border-health-primary transition-all">Schedule Appointment</a>
                            </div>
                        </div>
                    </section>

                    {/* Services Section */}
                    <Section id="services">
                        <SectionTitle title="Comprehensive Health Services" subtitle="Providing a wide range of diagnostic and therapeutic services." />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {services.map(service => {
                                const Icon = service.icon;
                                return (
                                    <div key={service.title} className="text-center p-6 rounded-2xl glass-panel border border-white/5 hover:border-health-primary/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                                        <div className="w-14 h-14 bg-health-primary/10 text-health-primary rounded-xl flex items-center justify-center mx-auto mb-4 border border-health-primary/20 group-hover:bg-health-primary group-hover:text-black transition-colors shadow-[0_0_10px_rgba(0,242,255,0.1)]">
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="font-bold text-gray-200 group-hover:text-white text-sm uppercase tracking-wide">{service.title}</h3>
                                    </div>
                                );
                            })}
                        </div>
                    </Section>

                    {/* Swasthya Saathi Section */}
                    <Section id="swasthya-saathi">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="font-bold text-health-primary uppercase tracking-widest text-xs mb-2 block">Our Core Initiative</span>
                                <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-6">What is Swasthya Saathi?</h2>
                                <p className="text-lg text-gray-400 font-light leading-relaxed mb-8">Swasthya Saathi is a healthcare initiative by WHEC India Private Limited, focused on providing easy, affordable and accessible diagnostic & health services for all.</p>
                                <ul className="space-y-5">
                                    <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                        <CheckCircle className="text-health-primary mt-1 shrink-0" />
                                        <span className="text-gray-300 text-sm"><strong>Free / Affordable Health Card</strong> with an annual subscription of just ₹150 + GST.</span>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                        <CheckCircle className="text-health-primary mt-1 shrink-0" />
                                        <span className="text-gray-300 text-sm">Easy access to a wide range of <strong>diagnostic services</strong>.</span>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                        <CheckCircle className="text-health-primary mt-1 shrink-0" />
                                        <span className="text-gray-300 text-sm">Special focus on <strong>poor & middle-class families</strong> in rural India.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-health-primary/20 to-blue-600/20 blur-[80px] rounded-full"></div>
                                <div ref={swasthyaRef} className="will-change-transform">
                                    <img src="https://picsum.photos/seed/doctor/600/600" alt="Doctor" className="relative z-10 rounded-3xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"/>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Health Card Section */}
                    <Section id="health-card">
                        <SectionTitle title="Personal Health Card" subtitle="A simple, secure card for long-term health support." />
                        <div className="max-w-md mx-auto relative group perspective-1000">
                            {/* Card Glow */}
                            <div className="absolute inset-0 bg-health-primary blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            
                            <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl shadow-2xl text-white border border-white/10 overflow-hidden transform group-hover:rotate-y-12 transition-transform duration-500 ease-out preserve-3d">
                                {/* Holographic Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,transparent_100%)] pointer-events-none"></div>
                                
                                <div className="p-8 space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-display font-black tracking-wider text-health-primary">Swasthya Saathi</h3>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400">WHEC India Health Card</p>
                                        </div>
                                        <HeartPulse size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                    </div>
                                    <div className="flex items-center gap-4 pt-4">
                                        <ShieldCheck size={48} className="text-white/20" />
                                        <div className="font-mono text-2xl tracking-widest text-white text-shadow-glow">
                                            <span>XXXX</span> <span>XXXX</span> <span>XXXX</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end pt-4 border-t border-white/10">
                                        <div className="text-left">
                                            <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Card Holder</p>
                                            <p className="font-bold tracking-wide">APPLICANT NAME</p>
                                        </div>
                                        <div className="bg-white p-1 rounded-md">
                                            <QrCode size={50} className="text-black" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-16 max-w-4xl mx-auto">
                            <a href="#benefits-overview" onClick={(e) => { e.preventDefault(); handleNavigation('benefits-overview'); }} className="block text-2xl font-display font-bold text-center text-white mb-10 hover:text-health-primary transition-colors cursor-pointer uppercase tracking-wide">
                                Unlock Access to Premium Services &rarr;
                            </a>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {services.map(service => {
                                    const Icon = service.icon;
                                    return (
                                    <div key={service.title} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="w-8 h-8 bg-health-primary/20 text-health-primary rounded-full flex items-center justify-center shrink-0">
                                            <Icon size={14} />
                                        </div>
                                        <span className="font-medium text-gray-300 text-sm">{service.title}</span>
                                    </div>
                                    );
                                })}
                            </div>
                            <div className="mt-12 text-center">
                                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('get-card'); }} className="inline-block px-12 py-4 bg-health-primary text-black font-bold rounded-full text-sm uppercase tracking-widest shadow-[0_0_20px_#00f2ff] hover:bg-white hover:scale-105 transition-all">
                                    Get Your Card for ₹150 + GST
                                </a>
                            </div>
                        </div>
                    </Section>
                    
                    {/* Swachh Gramin Abhiyan */}
                    <Section id="swachh-abhiyan">
                        <SectionTitle title="Swachh Gramin Abhiyan" subtitle="A clean environment creates a healthy society." />
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="flex justify-center relative order-2 md:order-1">
                                <div className="absolute inset-0 bg-green-500/20 blur-[80px] rounded-full"></div>
                                <div ref={swachhRef} className="will-change-transform">
                                    <img src="https://picsum.photos/seed/clean/600/600" alt="Clean village" className="relative z-10 rounded-3xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"/>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <h3 className="text-3xl font-display font-bold text-white mb-4 uppercase">Program Includes</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">Sanitation & hygiene awareness drives and distribution of Swachh Gramin Abhiyan Kits.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {swachhKitItems.map(item => (
                                        <div key={item} className="glass-panel p-4 rounded-xl border border-white/10 flex items-center gap-3 hover:border-health-primary/30 transition-colors">
                                            <div className="w-8 h-8 bg-health-primary/10 text-health-primary flex items-center justify-center rounded-full"><Sparkles size={16}/></div>
                                            <span className="font-semibold text-gray-200 text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Self Employment */}
                    <Section id="employment">
                        <SectionTitle title="Financial Support" subtitle="Start your own Social Service / Diagnostic Center." />
                        <div className="glass-panel p-10 rounded-3xl border border-white/10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wide">Program Highlights</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 text-gray-300 text-sm"><HandCoins className="text-health-primary shrink-0"/> <strong>No Loan, No Interest:</strong> A unique support model.</li>
                                    <li className="flex items-center gap-4 text-gray-300 text-sm"><Briefcase className="text-health-primary shrink-0"/> <strong>Low Investment, High Return:</strong> Based on dedication.</li>
                                    <li className="flex items-center gap-4 text-gray-300 text-sm"><HeartPulse className="text-health-primary shrink-0"/> <strong>Support Period:</strong> Up to 36 months.</li>
                                    <li className="flex items-center gap-4 text-gray-300 text-sm"><HandHeart className="text-health-primary shrink-0"/> <strong>Funding:</strong> ₹40,000 to ₹5,00,000.</li>
                                </ul>
                            </div>
                            <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10">
                                <h4 className="font-bold text-xl text-health-primary uppercase tracking-wide mb-2">Become a Partner</h4>
                                <p className="text-gray-400 text-sm mb-6">Start your journey towards financial empowerment.</p>
                                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }} className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full text-xs uppercase tracking-widest hover:bg-health-primary transition-colors">Enquire Now</a>
                            </div>
                        </div>
                    </Section>
                    
                    {/* Social Service Center */}
                    <Section id="social-service">
                        <SectionTitle 
                            title="Social Service Centers" 
                            subtitle="One Stop Solution for Essential Digital & Public Services"
                        />
                        <div className="max-w-4xl mx-auto space-y-8">
                            {/* Service Card 1 */}
                            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden hover:border-health-primary/30 transition-all">
                                <div className="grid md:grid-cols-2 items-center">
                                    <div className="h-64 md:h-full relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-health-primary/20 mix-blend-overlay z-10"></div>
                                        <img 
                                            src="https://picsum.photos/seed/indian-computer-shop/800/600" 
                                            alt="Computer service"
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wide">
                                            🖥️ 1. Computer & Printing
                                        </h3>
                                        <ul className="space-y-3 text-gray-400 mb-6 text-sm">
                                            {["Document Printing", "Online Form Filling", "Resume Printing", "Scan & Photocopy"].map(item => (
                                                <li key={item} className="flex items-start gap-3">
                                                    <CheckCircle size={16} className="text-health-primary mt-0.5 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-4 border-t border-white/10">
                                            <div className="flex justify-between text-xs text-gray-500 font-mono">
                                                <span>Black Print</span>
                                                <span className="text-health-primary">₹3 / page</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             {/* Service Card 2 */}
                             <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden hover:border-health-primary/30 transition-all">
                                <div className="grid md:grid-cols-2 items-center">
                                    <div className="p-8 md:order-1">
                                        <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wide">
                                            👆 2. Biometric Services
                                        </h3>
                                        <ul className="space-y-3 text-gray-400 mb-6 text-sm">
                                            {["Aadhaar Authentication", "Fingerprint & Iris Scan", "Identity Verification"].map(item => (
                                                <li key={item} className="flex items-start gap-3">
                                                    <CheckCircle size={16} className="text-health-primary mt-0.5 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                                            *Services as per govt guidelines.
                                        </p>
                                    </div>
                                    <div className="h-64 md:h-full md:order-2 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-health-primary/20 mix-blend-overlay z-10"></div>
                                        <img 
                                            src="https://picsum.photos/seed/indian-biometric/800/600" 
                                            alt="Biometric"
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>
                </main>
            )}

            {view === 'services' && <ServicesDetailPage onBack={() => handleNavigation('main')} onNavigate={handleNavigation} />}
            {view === 'about' && <AboutUsPage onBack={() => handleNavigation('main')} />}
            {view === 'contact' && <ContactPage onBack={() => handleNavigation('main')} />}
            {view === 'get-card' && <GetHealthCardPage onBack={() => handleNavigation('main')} onApplyNow={() => handleNavigation('contact')} />}
            {view === 'free-card-form' && <FreeHealthCardFormPage onBack={() => handleNavigation('main')} />}
            {view === 'benefits-overview' && <BenefitsOverviewPage onBack={() => handleNavigation('main')} onApplyNow={() => handleNavigation('get-card')} />}
            
            <footer id="contact" className="bg-black border-t border-white/10 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 text-center md:text-left mb-12">
                        <div>
                            <h3 className="font-display font-bold text-lg text-white mb-4 uppercase tracking-wider">WHEC India</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Plot No-265/2578, Bhoi Sahi, Baramunda, Bhubaneswar, Khordha, Odisha – 751003</p>
                        </div>
                         <div>
                            <h3 className="font-display font-bold text-lg text-white mb-4 uppercase tracking-wider">Contact</h3>
                            <ul className="space-y-3 text-gray-500 text-sm">
                                <li className="flex items-center justify-center md:justify-start gap-3"><Phone size={14} className="text-health-primary"/> 7735168551</li>
                                <li className="flex items-center justify-center md:justify-start gap-3"><Mail size={14} className="text-health-primary"/> swasthyasaathi@yahoo.com</li>
                                <li className="flex items-center justify-center md:justify-start gap-3"><Globe size={14} className="text-health-primary"/> www.swasthyasaathi.in</li>
                            </ul>
                        </div>
                        <div className="text-center md:text-right">
                             <HeartPulse size={40} className="text-health-primary mx-auto md:ml-auto md:mr-0 mb-4" />
                             <p className="text-gray-600 text-xs font-mono uppercase tracking-widest">Dreams to Achieve Trust</p>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-8 text-center text-xs text-gray-600 font-mono uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} WHEC India Pvt. Ltd. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};
