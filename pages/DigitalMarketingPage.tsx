import React from 'react';
import { ArrowLeft, Target, Eye, BookOpen, Briefcase, DollarSign, TrendingUp, ShieldCheck, Users, BrainCircuit, BarChart2, MessageCircle, Laptop, CheckCircle, FileText, User } from 'lucide-react';

interface DigitalMarketingPageProps {
  onNavigate: (page: string) => void;
}

const Section: React.FC<{ children: React.ReactNode; className?: string, id?: string }> = ({ children, className = '', id }) => (
  <section id={id} className={`py-12 md:py-16 ${className}`}>
    <div className="max-w-4xl mx-auto px-6">
      {children}
    </div>
  </section>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-brand-orange pl-4">{children}</h2>
);

const InfoCard: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center shrink-0">
                <Icon size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{children}</p>
    </div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start gap-3">
        <div className="w-5 h-5 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mt-1 shrink-0">
            <span className="w-2 h-2 bg-brand-green rounded-full"></span>
        </div>
        <span className="text-gray-700 dark:text-gray-300">{children}</span>
    </li>
);

const IncomeTier: React.FC<{ level: string, duration: string, tasks: string, income: string }> = ({ level, duration, tasks, income }) => (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all hover:border-brand-orange hover:shadow-lg transform hover:-translate-y-1">
        <p className="text-sm font-bold text-brand-orange uppercase tracking-wider">{level}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{duration}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-medium">{tasks}</p>
        <div className="text-right mt-auto pt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">Expected Income</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{income}</p>
        </div>
    </div>
);

const StepCard: React.FC<{ number: number, title: string, children: React.ReactNode }> = ({ number, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-12 h-12 bg-brand-orange text-white font-bold text-xl rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-md">
      {number}
    </div>
    <div>
      <h4 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300">{children}</p>
    </div>
  </div>
);


export const DigitalMarketingPage: React.FC<DigitalMarketingPageProps> = ({ onNavigate }) => {
  return (
    <div id="digital-marketing-top" className="min-h-screen bg-gray-100 dark:bg-brand-darker pt-24 pb-12">
      <main>
        {/* Header Section */}
        <section className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold hover:text-brand-orange mb-8 transition-colors">
              <ArrowLeft size={18} /> Back to Dashboard
            </button>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Digital Marketing Training & Online Job Platform</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">A complete, professional ecosystem designed to skill, deploy, and employ individuals in digital marketing.</p>
          </div>
        </section>

        <Section>
          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard icon={Eye} title="Vision">To create a scalable digital workforce by providing accessible, practical, and employment-oriented digital marketing education.</InfoCard>
            <InfoCard icon={Target} title="Mission">To deliver industry-relevant training, provide real project experience, and connect trained candidates with verified online jobs and clients.</InfoCard>
          </div>
        </Section>
        
        <Section className="bg-white dark:bg-gray-800">
          <SectionTitle>What Is Digital Marketing?</SectionTitle>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">Digital Marketing is the backbone of modern business growth. It is the practice of promoting products, services, and brands using online platforms where today’s audience spends most of their time.</p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">In today’s digital economy, no business can survive or scale without marketing. It's essential for visibility, trust, and sales across platforms like YouTube, Facebook, Instagram, and Google.</p>
        </Section>

        <Section>
          <SectionTitle>Online Training System</SectionTitle>
          <ul className="space-y-4">
            <ListItem><strong>100% Online Training:</strong> Live instructor-led sessions and a 24/7 recorded video library.</ListItem>
            <ListItem><strong>Practical Methodology:</strong> Learn through concept-based lessons, practical assignments, and real campaign execution.</ListItem>
            <ListItem><strong>Accessible Learning:</strong> Training delivered in Simple English, with step-by-step explanations suitable for beginners on any device.</ListItem>
          </ul>
        </Section>

        <Section className="bg-white dark:bg-gray-800">
          <SectionTitle>Detailed Training Curriculum</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">Core Skills</h4>
                <ul className="space-y-2 text-sm">
                    <ListItem>Social Media Strategy & Page Management</ListItem>
                    <ListItem>Facebook & Instagram Ads Setup</ListItem>
                    <ListItem>Google Ads (Search, Display & Local)</ListItem>
                    <ListItem>SEO Fundamentals & On-Page Optimization</ListItem>
                </ul>
            </div>
             <div>
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">Advanced Modules</h4>
                <ul className="space-y-2 text-sm">
                    <ListItem>Lead Generation Systems</ListItem>
                    <ListItem>Funnel & Landing Page Optimization</ListItem>
                    <ListItem>WhatsApp Automation & CRM Tools</ListItem>
                    <ListItem>Analytics, Tracking & Reporting</ListItem>
                </ul>
            </div>
          </div>
        </Section>

         <Section>
          <SectionTitle>Income Potential After Learning</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <IncomeTier level="Beginner" duration="0–3 Months" tasks="Social media handling & basic content tasks." income="₹10k – 20k" />
            <IncomeTier level="Intermediate" duration="3–6 Months" tasks="Running paid ads & lead generation for 3-5 clients." income="₹25k – 50k" />
            <IncomeTier level="Advanced" duration="6–12 Months" tasks="Full campaign strategy & funnel optimization." income="₹60k – 1L+" />
            <IncomeTier level="Agency/Business" duration="Ongoing" tasks="Managing multiple high-value clients and teams." income="₹1.5L – 5L+" />
          </div>
        </Section>
        
        <Section className="bg-white dark:bg-gray-800">
          <SectionTitle>Career Growth & Agency Opportunities</SectionTitle>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">Digital marketing offers long-term career scalability. After acquiring practical experience, you can even start your own digital marketing agency. We provide guidance on client acquisition, service pricing, and team management.</p>
           <div className="flex flex-wrap gap-2">
              {['Digital Marketing Executive', 'Performance Marketer', 'Campaign Strategist', 'Growth Manager', 'Digital Consultant'].map(role => (
                <span key={role} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold">{role}</span>
              ))}
           </div>
        </Section>

        <Section>
          <SectionTitle>Who Can Join?</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
             {[{icon: User, label: 'Students'}, {icon: Briefcase, label: 'Job Seekers'}, {icon: Users, label: 'Homemakers'}, {icon: TrendingUp, label: 'Entrepreneurs'}].map(item => (
                <div key={item.label} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <item.icon className="mx-auto text-brand-orange mb-2" size={32}/>
                    <p className="font-semibold">{item.label}</p>
                </div>
             ))}
          </div>
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">Minimum 10th pass with basic computer knowledge. No prior experience required.</p>
        </Section>

         <Section className="bg-gray-800 text-white rounded-2xl">
          <SectionTitle>Getting Started</SectionTitle>
          <div className="space-y-6">
            <StepCard number={1} title="Register on the Website">Create your account to get access to our full-service platform.</StepCard>
            <StepCard number={2} title="Access the Training Dashboard">Complete the structured, self-paced learning modules and live sessions.</StepCard>
            <StepCard number={3} title="Work on Live Projects">Build your portfolio by working on real-world campaigns with our guidance.</StepCard>
            <StepCard number={4} title="Start Earning">Begin your career through allocated online digital jobs and freelance opportunities.</StepCard>
          </div>
          <div className="mt-10 text-center">
            <button className="px-8 py-4 bg-brand-orange text-white rounded-full font-bold text-lg shadow-lg hover:bg-brand-orange/90 hover:scale-105 transition-all duration-300">
              Register and Start Learning
            </button>
          </div>
        </Section>

      </main>
    </div>
  );
};
