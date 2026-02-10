
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { JobCard } from '../components/JobCard';
import { DETAILED_JOB_CATEGORIES } from '../constants';
import { Job, JobCategoryExtended } from '../types';
import { apiFetchJobs, apiCreateJob } from '../lib/api';
import { Search, MapPin, Filter, X, Briefcase, DollarSign, CheckCircle, Phone, Globe, Share2, Bookmark, AlertCircle, ArrowLeft, Star, PenTool, Code, TrendingUp, FileText, Music } from 'lucide-react';
import { Skeleton } from '../components/ui/Skeleton';
import { PostJobModal } from '../components/PostJobModal';

// Helper for dynamic icons
import * as icons from 'lucide-react';

interface JobsPageProps {
  onNavigate: (page: string) => void;
}

const jobTypes = ['Full Time', 'Part Time', 'Freelance', 'Remote', 'Contract'];
const salaryRanges = [
  { id: 'any', label: 'Any Salary' },
  { id: '0-3', label: 'Under ₹3 LPA' },
  { id: '3-6', label: '₹3-6 LPA' },
  { id: '6-12', label: '₹6-12 LPA' },
  { id: '12+', label: 'Over ₹12 LPA' },
];
const experienceLevels = [
  { id: 'any', label: 'Any Experience' },
  { id: '0-1', label: 'Fresher (0-1 yr)' },
  { id: '1-3', label: 'Junior (1-3 yrs)' },
  { id: '3-5', label: 'Mid-level (3-5 yrs)' },
  { id: '5+', label: 'Senior (5+ yrs)' },
];

const CategoryDetailModal: React.FC<{ 
  category: JobCategoryExtended; 
  onClose: () => void; 
}> = ({ category, onClose }) => {
  const Icon = (icons as any)[category.icon] || Briefcase;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner */}
        <div className="relative h-40 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 text-white flex items-center px-8 overflow-hidden">
           <div className="absolute right-0 top-0 h-full w-1/3 bg-brand-orange/20 -skew-x-12 transform translate-x-12"></div>
           <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                 <Icon size={40} className="text-brand-orange" />
              </div>
              <div>
                 <h2 className="text-3xl font-bold">{category.title}</h2>
                 <p className="text-gray-300 mt-1">{category.subtitle}</p>
              </div>
           </div>
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
             <X size={20} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           
           {/* Definition */}
           <section className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About this Category</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {category.fullDefinition}
              </p>
           </section>

           {/* Services Grid */}
           <section className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Services Offered</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {category.services.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                       <CheckCircle size={18} className="text-brand-orange shrink-0" />
                       <span className="text-gray-700 dark:text-gray-200 font-medium">{service}</span>
                    </div>
                 ))}
              </div>
           </section>

           {/* Sample Freelancers */}
           <section>
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white">Top Rated Professionals</h3>
                 <span className="text-sm text-brand-orange font-semibold cursor-pointer hover:underline">View All</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {category.sampleFreelancers.map((freelancer) => (
                    <div key={freelancer.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-shadow">
                       <div className="flex items-center gap-4 mb-4">
                          <img src={freelancer.avatar} alt={freelancer.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                             <h4 className="font-bold text-gray-900 dark:text-white text-sm">{freelancer.name}</h4>
                             <p className="text-xs text-gray-500 dark:text-gray-400">{freelancer.title}</p>
                          </div>
                       </div>
                       <div className="flex flex-wrap gap-2 mb-4">
                          {freelancer.skills.slice(0, 2).map(skill => (
                             <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded">
                               {skill}
                             </span>
                          ))}
                       </div>
                       <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                          <div className="flex items-center gap-1 text-sm font-bold text-gray-800 dark:text-gray-200">
                             <Star size={14} className="text-amber-400 fill-current" /> {freelancer.rating}
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{freelancer.hourlyRate}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

        </div>

        {/* Footer CTAs */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex gap-4">
           <button className="flex-1 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
             Explore Freelancers
           </button>
           <button className="flex-1 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 transition-transform hover:scale-[1.01]">
             Post a Job in {category.title}
           </button>
        </div>

      </div>
    </div>
  );
};

export const JobsPage: React.FC<JobsPageProps> = ({ onNavigate }) => {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // New State for Category Details
  const [selectedCategory, setSelectedCategory] = useState<JobCategoryExtended | null>(null);
  
  // Modal State
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [filters, setFilters] = useState({
    jobTypes: [] as string[],
    salaryRange: 'any',
    experienceLevel: 'any',
  });

  // Saved Jobs State
  const [savedJobs, setSavedJobs] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedJobs');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
      const loadJobs = async () => {
          setIsLoading(true);
          const data = await apiFetchJobs();
          setJobs(data);
          setIsLoading(false);
      };
      loadJobs();
  }, []);

  const toggleSaveJob = (e: React.MouseEvent, jobId: number) => {
    e.stopPropagation();
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };
  
  const handleJobTypeChange = (type: string) => {
    setFilters(prev => {
      const newJobTypes = prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type];
      return { ...prev, jobTypes: newJobTypes };
    });
  };

  const handleFilterChange = (filterName: 'salaryRange' | 'experienceLevel', value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      jobTypes: [],
      salaryRange: 'any',
      experienceLevel: 'any',
    });
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // 1. Search term filter
      const termMatch = searchTerm.trim() === '' || 
                        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      // 2. Location filter
      const locationMatch = locationTerm.trim() === '' ||
                            job.location.toLowerCase().includes(locationTerm.toLowerCase());

      // 3. Job type filter
      const jobTypeMatch = filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type);

      // 4. Salary filter logic (Inclusive Ranges)
      const salaryMatch = (() => {
        if (filters.salaryRange === 'any') return true;
        
        // Simple heuristic for mock/string salary ranges
        const salaryLPA = job.minSalary / 100000; 

        if (filters.salaryRange === '12+') return salaryLPA >= 12;
        
        const parts = filters.salaryRange.split('-');
        if (parts.length === 2) {
            const min = Number(parts[0]);
            const max = Number(parts[1]);
            return salaryLPA >= min && salaryLPA <= max;
        }
        return true;
      })();

      // 5. Experience filter logic (Inclusive Ranges)
      const experienceMatch = (() => {
        if (filters.experienceLevel === 'any') return true;
        
        if (filters.experienceLevel === '0-1') return job.experience <= 1;
        if (filters.experienceLevel === '1-3') return job.experience >= 1 && job.experience <= 3;
        if (filters.experienceLevel === '3-5') return job.experience >= 3 && job.experience <= 5;
        if (filters.experienceLevel === '5+') return job.experience >= 5;
        
        return true;
      })();

      return termMatch && locationMatch && jobTypeMatch && salaryMatch && experienceMatch;
    });
  }, [searchTerm, locationTerm, filters, jobs]);

  const handleApply = (method: 'online' | 'whatsapp') => {
    if (!isAuthenticated) {
      alert("Please login to apply for this job. Join the community!");
      return;
    }
    alert(`Application started via ${method}!`);
  };

  const handlePostJobClick = () => {
    if (!isAuthenticated) {
      alert("Please login to post a job.");
      return;
    }
    setIsPostJobModalOpen(true);
  };

  const handleCreateJob = async (jobData: any) => {
      // In real app, user ID comes from auth context
      if (user) {
          await apiCreateJob(jobData, user.id);
          // Refresh jobs
          const data = await apiFetchJobs();
          setJobs(data);
      }
  };

  const featuredJobs = jobs.filter(j => j.isFeatured);

  return (
    <div id="jobs-top" className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-white dark:bg-gray-800 px-6 py-16 border-b border-gray-200 dark:border-gray-700 mb-12">
        <div className="absolute top-6 left-6 z-20">
            <button 
                onClick={() => onNavigate('dashboard')} 
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-brand-orange font-semibold transition-colors"
            >
                <ArrowLeft size={18} /> Back to Dashboard
            </button>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Find the Right Job. <br />
            <span className="text-brand-orange">Right Now.</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-light">
            Placement jobs, artist work, NGO projects, delivery jobs, work-from-home and more — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <button className="px-8 py-3 bg-brand-orange text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors">
               Browse Jobs
             </button>
             <button 
                onClick={handlePostJobClick}
                className="px-8 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
             >
               Post a Job
             </button>
          </div>
        </div>
      </section>

      {/* 2. SMART SEARCH BAR (Sticky) */}
      <div className="sticky top-[72px] z-30 px-6 -mt-8 mb-12">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-col md:flex-row gap-3">
           <div className="flex-1 flex items-center px-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange transition-all">
             <Search className="text-gray-400" size={20} />
             <input 
               type="text" 
               placeholder="Job title, skill, or company..." 
               className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white px-3 py-3 placeholder:text-gray-500"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <div className="flex-1 flex items-center px-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange transition-all">
             <MapPin className="text-gray-400" size={20} />
             <input 
               type="text" 
               placeholder="City or State" 
               className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white px-3 py-3 placeholder:text-gray-500"
               value={locationTerm}
               onChange={(e) => setLocationTerm(e.target.value)}
             />
           </div>
           <button className="w-full md:w-auto px-8 py-3 bg-brand-orange text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors">
             Find Jobs
           </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* 3. BROWSE CATEGORIES (Detailed Interactive Grid) */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Browse Categories</h2>
            <button className="text-brand-orange text-sm font-bold hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {isLoading ? Array(6).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-2xl" />
             )) : (
                DETAILED_JOB_CATEGORIES.map((cat) => {
                  // Dynamic Icon Rendering
                  const Icon = (icons as any)[cat.icon] || Briefcase;
                  
                  return (
                    <div 
                      key={cat.id} 
                      onClick={() => setSelectedCategory(cat)}
                      className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl hover:border-brand-orange/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between mb-4">
                         <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                            <Icon size={24} />
                         </div>
                         <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                            <ArrowLeft size={16} className="rotate-180 text-brand-orange" />
                         </div>
                      </div>
                      
                      <div>
                         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-orange transition-colors">
                           {cat.title}
                         </h3>
                         <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                           {cat.subtitle}
                         </p>
                         
                         {/* Skills Preview Pills */}
                         <div className="flex flex-wrap gap-2">
                            {cat.skillsPreview.split(',').map((skill, i) => (
                               <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-200 dark:border-gray-600">
                                 {skill.trim()}
                               </span>
                            ))}
                         </div>
                      </div>
                    </div>
                  );
                })
             )}
          </div>
        </section>

        {/* 4. FEATURED JOBS (Horizontal Scroll) */}
        {featuredJobs.length > 0 && (
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Opportunities</h2>
                </div>
                
                <div className="flex overflow-x-auto gap-6 pb-4 -mx-6 px-6 scrollbar-hide">
                    {isLoading ? Array(3).fill(0).map((_, i) => (
                    <JobCard key={i} job={jobs[0]} isLoading={true} variant="featured" onClick={() => {}} />
                    )) : (
                    featuredJobs.map((job) => (
                        <JobCard 
                        key={job.id} 
                        job={job} 
                        variant="featured"
                        onClick={setSelectedJob}
                        isSaved={savedJobs.includes(job.id)}
                        onSave={toggleSaveJob}
                        />
                    ))
                    )}
                </div>
            </section>
        )}

        {/* 5. LATEST JOBS LIST (Vertical) */}
        <section className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-32 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                     <Filter size={18} /> Filters
                   </h3>
                   <button onClick={handleResetFilters} className="text-xs text-gray-500 hover:text-brand-orange">RESET</button>
                </div>
                
                <div className="space-y-6">
                   <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Job Type</h4>
                      <div className="space-y-2">
                         {jobTypes.map(type => (
                           <label key={type} className="flex items-center gap-2 cursor-pointer">
                             <input 
                                type="checkbox"
                                checked={filters.jobTypes.includes(type)}
                                onChange={() => handleJobTypeChange(type)}
                                className="rounded text-brand-orange focus:ring-brand-orange"
                             />
                             <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                           </label>
                         ))}
                      </div>
                   </div>

                   <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Salary Range</h4>
                       <div className="space-y-2">
                        {salaryRanges.map(range => (
                          <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name="salaryRange" 
                              value={range.id}
                              checked={filters.salaryRange === range.id}
                              onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                              className="text-brand-orange focus:ring-brand-orange"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{range.label}</span>
                          </label>
                        ))}
                      </div>
                   </div>

                   <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Experience Level</h4>
                      <div className="space-y-2">
                        {experienceLevels.map(level => (
                          <label key={level.id} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name="experienceLevel" 
                              value={level.id}
                              checked={filters.experienceLevel === level.id}
                              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                              className="text-brand-orange focus:ring-brand-orange"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{level.label}</span>
                          </label>
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Job List */}
          <div className="w-full lg:w-3/4">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Jobs</h2>
                <div className="text-xs text-gray-500">Showing {filteredJobs.length} results</div>
             </div>
             
             <div className="space-y-4">
               {isLoading ? Array(5).fill(0).map((_, i) => (
                  <JobCard key={i} job={jobs[0]} isLoading={true} onClick={() => {}} />
               )) : filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={job}
                      onClick={setSelectedJob}
                      isSaved={savedJobs.includes(job.id)}
                      onSave={toggleSaveJob}
                    />
                  ))
               ) : (
                 <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <AlertCircle size={40} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">No Jobs Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
                 </div>
               )}
             </div>

             {filteredJobs.length > 10 && (
                <div className="mt-10 text-center">
                    <button className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Load More Jobs
                    </button>
                </div>
             )}
          </div>
        </section>
      </div>

      {/* --- JOB DETAIL MODAL --- */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedJob(null)}
          />
          <div className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            
            <div className="relative h-32 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
               <button 
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white text-black rounded-full transition-colors shadow-sm"
               >
                 <X size={20} />
               </button>
            </div>
            
            <div className="px-8 -mt-10 flex-1 overflow-y-auto relative z-10">
               <div className="flex justify-between items-end mb-6">
                 <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-3xl font-bold text-brand-orange">
                    {selectedJob.company.charAt(0)}
                 </div>
                 
                 <div className="flex gap-2 mb-2">
                   <button 
                     onClick={(e) => toggleSaveJob(e, selectedJob.id)}
                     className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors border
                       ${savedJobs.includes(selectedJob.id)
                         ? 'bg-orange-50 text-brand-orange border-orange-200'
                         : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
                       }
                     `}
                   >
                     <Bookmark size={16} fill={savedJobs.includes(selectedJob.id) ? "currentColor" : "none"} /> 
                     {savedJobs.includes(selectedJob.id) ? 'Saved' : 'Save'}
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm">
                     <Share2 size={16} /> Share
                   </button>
                 </div>
               </div>

               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedJob.title}</h2>
               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
                  <span className="flex items-center gap-1.5"><Briefcase size={16} /> {selectedJob.company}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={16} /> {selectedJob.location}</span>
                  <span className="flex items-center gap-1.5"><DollarSign size={16} /> {selectedJob.salary}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-xs font-bold border border-gray-200 dark:border-gray-700">{selectedJob.type}</span>
               </div>

               <div className="space-y-8 mb-10">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Job Description</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 flex items-center gap-1.5">
                          <CheckCircle size={14} className="text-brand-green" /> {skill}
                        </span>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row gap-4 items-center justify-between z-20">
              <div className="text-sm font-medium">
                {isAuthenticated ? (
                  <span className="text-green-600 flex items-center gap-2"><CheckCircle size={16} /> Eligibility Verified</span>
                ) : (
                  <span className="text-brand-orange">Authentication Required</span>
                )}
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                 <button 
                   onClick={() => handleApply('whatsapp')}
                   className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all text-sm shadow-sm
                   ${isAuthenticated 
                     ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white' 
                     : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                   `}
                   disabled={!isAuthenticated}
                 >
                   <Phone size={18} /> WhatsApp
                 </button>
                 <button 
                   onClick={() => handleApply('online')}
                   className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all text-sm shadow-md
                   ${isAuthenticated 
                     ? 'bg-brand-orange hover:bg-orange-600 text-white' 
                     : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                   `}
                   disabled={!isAuthenticated}
                 >
                   <Globe size={18} /> Apply Online
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CATEGORY DETAIL MODAL --- */}
      {selectedCategory && (
        <CategoryDetailModal 
          category={selectedCategory} 
          onClose={() => setSelectedCategory(null)} 
        />
      )}

      <PostJobModal 
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        // We'll pass a wrapped handler to match props
        // In reality, PostJobModal likely needs refinement to accept direct data submission
      />

    </div>
  );
};
