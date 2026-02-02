import React, { useState, useEffect } from 'react';
import { X, CheckCircle, UploadCloud, Briefcase, MapPin, DollarSign, FileText, ChevronDown } from 'lucide-react';
import { JOB_CATEGORIES_DATA, JOB_ROLES_BY_CATEGORY } from '../constants';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    role: '',
    location: '',
    salary: '',
    type: 'Full Time',
    description: '',
    applyMethod: 'In-app'
  });

  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (formData.category && JOB_ROLES_BY_CATEGORY[formData.category]) {
      setAvailableRoles(JOB_ROLES_BY_CATEGORY[formData.category]);
    } else {
      setAvailableRoles([]);
    }
    // Reset role when category changes
    setFormData(prev => ({ ...prev, role: '' }));
  }, [formData.category]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.category && availableRoles.length > 0 && !formData.role) {
      newErrors.role = 'Role is required for this category';
    }
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      // Simulate a random success/error
      if (Math.random() > 0.1) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      category: '',
      role: '',
      location: '',
      salary: '',
      type: 'Full Time',
      description: '',
      applyMethod: 'In-app'
    });
    setErrors({});
    setSubmitStatus('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleReset}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Post a Job</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Find the perfect talent for your needs.</p>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
          
          {submitStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Submission Successful!</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Your job posting has been submitted for review. Our admin team will verify the details and it will go live within 24 hours.
              </p>
              <button 
                onClick={handleReset}
                className="mt-6 px-8 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 transition-all"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Job Title *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Senior Graphic Designer"
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all dark:text-white ${errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                  </div>
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category *</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all dark:text-white appearance-none cursor-pointer ${errors.category ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <option value="">Select Category</option>
                      {JOB_CATEGORIES_DATA.map(cat => (
                        <option key={cat.id} value={cat.title}>{cat.title}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
                  </div>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Specific Role *</label>
                  <div className="relative">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={!formData.category || availableRoles.length === 0}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all dark:text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${errors.role ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <option value="">Select Role</option>
                      {availableRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
                  </div>
                  {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai / Remote"
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all dark:text-white ${errors.location ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Salary / Budget</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="e.g. ₹25,000 / month"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Job Type</label>
                   <div className="relative">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all dark:text-white appearance-none cursor-pointer"
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Remote">Remote</option>
                      <option value="Contract">Contract</option>
                    </select>
                     <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Job Description *</label>
                <div className="relative">
                   <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                   <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the responsibilities, requirements, and benefits..."
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all dark:text-white ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                </div>
                {errors.description ? (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                ) : (
                  <p className="text-gray-400 text-xs mt-1 text-right">{formData.description.length}/50 min chars</p>
                )}
              </div>

              {/* Apply Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">How should candidates apply?</label>
                <div className="grid grid-cols-3 gap-4">
                  {['In-app', 'WhatsApp', 'Call'].map((method) => (
                    <div 
                      key={method}
                      onClick={() => setFormData(prev => ({ ...prev, applyMethod: method }))}
                      className={`cursor-pointer rounded-xl p-3 text-center border transition-all ${
                        formData.applyMethod === method 
                          ? 'bg-brand-orange/10 border-brand-orange text-brand-orange font-bold' 
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-orange/50'
                      }`}
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>

              {errors.form && <p className="text-red-500 text-sm text-center font-medium">{errors.form}</p>}

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-4">
                 <button
                   type="button"
                   onClick={handleReset}
                   className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                 >
                   Cancel
                 </button>
                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="flex-1 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                   {isSubmitting ? (
                     <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Posting...
                     </>
                   ) : (
                     <>
                        <UploadCloud size={18} /> Submit for Review
                     </>
                   )}
                 </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};