import React, { useState } from 'react';
import { 
  Leaf, Search, Bell, Settings, ChevronDown, ChevronRight, Plus, 
  Clock, TrendingUp, Briefcase, ShieldCheck, Filter, MoreVertical, 
  Eye, Check, X, ChevronLeft, MessageCircle, ShieldAlert, ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// Mock data for the pending jobs table
const pendingJobs = [
  {
    id: 1,
    title: "Senior AI Ethics Researcher",
    organization: "OpenFuture NGO",
    sector: "AI",
    sectorColor: "purple",
    date: "Oct 24, 2023",
    status: "Pending",
  },
  {
    id: 2,
    title: "Community Arts Liaison",
    organization: "Creative Commons",
    sector: "Arts",
    sectorColor: "pink",
    date: "Oct 23, 2023",
    status: "Pending",
  },
  {
    id: 3,
    title: "Data Scientist II",
    organization: "Tech4Good",
    sector: "IT",
    sectorColor: "sky",
    date: "Oct 22, 2023",
    status: "Pending",
  },
  {
    id: 4,
    title: "Outreach Coordinator",
    organization: "EcoWorld",
    sector: "Environment",
    sectorColor: "green",
    date: "Oct 20, 2023",
    status: "Reviewing",
    isHighlighted: true,
  }
];

interface AdminJobPageProps {
  onNavigate: (page: string) => void;
}

export const AdminJobPage: React.FC<AdminJobPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{ title: string, organization: string } | null>(null);
  
  // State for the rejection form
  const [rejectionReason, setRejectionReason] = useState('Incomplete Job Description');
  const [rejectionComments, setRejectionComments] = useState('');

  const handleApproveClick = (job: { title: string, organization: string }) => {
    setSelectedJob(job);
    setIsApproveModalOpen(true);
  };

  const handleRejectClick = (job: { title: string, organization: string }) => {
    setSelectedJob(job);
    setIsRejectModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsApproveModalOpen(false);
    setIsRejectModalOpen(false);
    setSelectedJob(null);
    setRejectionReason('Incomplete Job Description');
    setRejectionComments('');
  };

  const getSectorClasses = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'pink': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'sky': return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'green': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-background-light text-secondary antialiased min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-secondary pt-20">
      
      <main className="w-full max-w-[1440px] mx-auto px-6 md:px-10 pt-6 pb-20">
        
        {/* Back Button */}
        <button 
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center gap-2 text-secondary/60 hover:text-primary-dark font-semibold mb-6 transition-colors"
        >
            <ArrowLeft size={18} /> Back to Dashboard
        </button>

        {/* Breadcrumbs & Heading */}
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-secondary/50">Admin Dashboard</span>
            <ChevronRight size={12} className="text-secondary/30" />
            <span className="text-secondary">Job Control</span>
          </div>
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-secondary">Job Control Center</h1>
              <p className="text-secondary/60 text-base max-w-2xl">Manage pending job posts, review NGO submissions, and monitor ecosystem health.</p>
            </div>
            <button className="bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/10">
              <Plus size={20} />
              Create Manual Post
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-surface-light shadow-soft group hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-primary/20 rounded-lg text-secondary">
                <Clock size={24} className="fill-current" />
              </div>
              <span className="flex items-center text-xs font-bold text-accent-green bg-accent-green/10 px-2 py-1 rounded-md">
                <TrendingUp size={14} className="mr-1" /> +12%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-secondary/60">Pending Reviews</span>
              <span className="text-3xl font-black text-secondary mt-1">{pendingJobs.length}</span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-surface-light shadow-soft group hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-surface-light rounded-lg text-secondary">
                <Briefcase size={24} className="fill-current" />
              </div>
              <span className="flex items-center text-xs font-bold text-accent-green bg-accent-green/10 px-2 py-1 rounded-md">
                <TrendingUp size={14} className="mr-1" /> +5%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-secondary/60">Total Applications</span>
              <span className="text-3xl font-black text-secondary mt-1">1,240</span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-surface-light shadow-soft group hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-surface-light rounded-lg text-secondary">
                <ShieldCheck size={24} className="fill-current" />
              </div>
              <span className="flex items-center text-xs font-bold text-accent-green bg-accent-green/10 px-2 py-1 rounded-md">
                <TrendingUp size={14} className="mr-1" /> +2%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-secondary/60">Verified Users</span>
              <span className="text-3xl font-black text-secondary mt-1">85%</span>
            </div>
          </div>
        </div>

        {/* Pending Jobs Table */}
        <div className="bg-white rounded-2xl border border-surface-light shadow-soft overflow-hidden">
          <div className="px-6 py-5 border-b border-surface-light flex items-center justify-between">
            <h3 className="font-bold text-lg text-secondary">Pending Job Posts</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-light rounded-lg transition-colors text-secondary/60">
                <Filter size={20} />
              </button>
              <button className="p-2 hover:bg-surface-light rounded-lg transition-colors text-secondary/60">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-light/50 border-b border-surface-light">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-secondary/50">Job Title</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-secondary/50">Organization</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-secondary/50">Sector</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-secondary/50">Date Posted</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-secondary/50">Status</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-secondary/50 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-light text-sm">
                {pendingJobs.map(job => (
                  <tr key={job.id} className={`group transition-colors ${job.isHighlighted ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-surface-light/30'}`}>
                    <td className="py-4 px-6 font-semibold text-secondary">{job.title}</td>
                    <td className="py-4 px-6 text-secondary/80">{job.organization}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${getSectorClasses(job.sectorColor)}`}>{job.sector}</span>
                    </td>
                    <td className="py-4 px-6 text-secondary/60">{job.date}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${job.status === 'Reviewing' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> {job.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary/40 hover:text-secondary hover:bg-surface-light transition-colors" title="View Details">
                          <Eye size={20} />
                        </button>
                        <button onClick={() => handleApproveClick(job)} className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-green hover:bg-accent-green/10 transition-colors" title="Approve">
                          <Check size={20} />
                        </button>
                        <button onClick={() => handleRejectClick(job)} className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-red hover:bg-accent-red/10 transition-colors" title="Reject">
                          <X size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-surface-light flex items-center justify-between">
            <span className="text-xs text-secondary/50">Showing {pendingJobs.length} of {pendingJobs.length} pending posts</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-light text-secondary/40 hover:bg-surface-light transition-colors" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary text-white shadow-md">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-light text-secondary hover:bg-surface-light transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 z-30 group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-[#25D366]/40 transition-all duration-300">
        <MessageCircle size={28} className="fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-sm font-bold whitespace-nowrap">WhatsApp Support</span>
      </button>

      {/* Reject Modal */}
      {isRejectModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm transition-opacity duration-300" onClick={handleCloseModals} />
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-zoom-in border border-white/40 ring-1 ring-black/5">
            {/* Header */}
            <div className="px-8 py-6 border-b border-surface-light flex items-center justify-between bg-surface-light/30">
              <div className="flex items-center gap-3 text-accent-red">
                <div className="w-10 h-10 rounded-full bg-accent-red/10 flex items-center justify-center">
                  <ShieldAlert size={24} />
                </div>
                <h3 className="text-xl font-bold text-secondary">Reject Job Posting</h3>
              </div>
              <button onClick={handleCloseModals} className="text-secondary/40 hover:text-secondary transition-colors">
                <X size={24} />
              </button>
            </div>
            {/* Body */}
            <div className="px-8 py-6 flex flex-col gap-5">
              <p className="text-secondary/70 text-sm leading-relaxed">
                You are about to reject the post <strong className="text-secondary">"{selectedJob.title}"</strong> by {selectedJob.organization}. Please provide a reason for this action.
              </p>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Reason for Rejection</label>
                <div className="relative">
                  <select value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} className="w-full bg-surface-light border-0 rounded-xl px-4 py-3 text-sm text-secondary focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer">
                    <option>Incomplete Job Description</option>
                    <option>Inappropriate Content</option>
                    <option>Duplicate Posting</option>
                    <option>Incorrect Categorization</option>
                    <option>Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary/50">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Additional Comments</label>
                <textarea value={rejectionComments} onChange={(e) => setRejectionComments(e.target.value)} className="w-full bg-surface-light border-0 rounded-xl px-4 py-3 text-sm text-secondary focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-none" placeholder="Please provide specific details to help the organization correct their post..."></textarea>
              </div>
            </div>
            {/* Footer */}
            <div className="px-8 py-5 bg-surface-light/30 border-t border-surface-light flex justify-end gap-3">
              <button onClick={handleCloseModals} className="px-5 py-2.5 rounded-xl text-sm font-bold text-secondary border border-secondary/10 hover:bg-surface-light transition-colors">
                Cancel
              </button>
              <button onClick={() => { alert(`Post "${selectedJob.title}" Rejected. Reason: ${rejectionReason}`); handleCloseModals(); }} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-accent-red hover:bg-red-600 transition-colors shadow-lg shadow-accent-red/20 flex items-center gap-2">
                <ShieldAlert size={18} />
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Approve Modal */}
      {isApproveModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm transition-opacity duration-300" onClick={handleCloseModals} />
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-zoom-in border border-white/40 ring-1 ring-black/5">
            {/* Header */}
            <div className="px-8 py-6 border-b border-surface-light flex items-center justify-between bg-surface-light/30">
              <div className="flex items-center gap-3 text-accent-green">
                <div className="w-10 h-10 rounded-full bg-accent-green/10 flex items-center justify-center">
                  <Check size={24} />
                </div>
                <h3 className="text-xl font-bold text-secondary">Approve Job Posting</h3>
              </div>
              <button onClick={handleCloseModals} className="text-secondary/40 hover:text-secondary transition-colors">
                <X size={24} />
              </button>
            </div>
            {/* Body */}
            <div className="px-8 py-10">
              <p className="text-secondary/70 text-center text-base leading-relaxed">
                Are you sure you want to approve and publish the job post <br />
                <strong className="text-secondary text-lg">"{selectedJob.title}"</strong>?
              </p>
            </div>
            {/* Footer */}
            <div className="px-8 py-5 bg-surface-light/30 border-t border-surface-light flex justify-end gap-3">
              <button onClick={handleCloseModals} className="px-5 py-2.5 rounded-xl text-sm font-bold text-secondary border border-secondary/10 hover:bg-surface-light transition-colors">
                Cancel
              </button>
              <button onClick={() => { alert(`Post "${selectedJob.title}" Approved!`); handleCloseModals(); }} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-accent-green hover:bg-green-600 transition-colors shadow-lg shadow-accent-green/20 flex items-center gap-2">
                <Check size={18} />
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};