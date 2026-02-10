
import React, { useState } from 'react';
import { X, CheckCircle, UploadCloud, FileText, Image as ImageIcon, Youtube, Send, AlertCircle, Trash2 } from 'lucide-react';
import { MLMPost, UserProfile } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onPostCreate: (post: MLMPost) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, profile, onPostCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const currentErrors = { ...errors };
      delete currentErrors.images;

      // Limit total images
      if (images.length + files.length > 4) {
        setErrors({ ...currentErrors, images: "Maximum 4 images allowed." });
        return;
      }
      
      const newImagePreviews: string[] = [];
      let hasSizeError = false;

      files.forEach((file: File) => {
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
          hasSizeError = true;
          return;
        }
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          newImagePreviews.push(loadEvent.target?.result as string);
          if (newImagePreviews.length === (files.length - (hasSizeError ? 1 : 0))) {
            setImages(prev => [...prev, ...newImagePreviews]);
          }
        };
        reader.readAsDataURL(file);
      });

      if (hasSizeError) {
          alert("Some images were skipped because they exceed the 2MB limit.");
      }
      setErrors(currentErrors);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type !== 'application/pdf') {
            setErrors(prev => ({ ...prev, pdf: "Only PDF files are allowed." }));
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit for PDF
            setErrors(prev => ({ ...prev, pdf: "PDF file must be under 5MB." }));
            return;
        }
        setPdfFile(file);
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.pdf;
            return newErrors;
        });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "A plan title is required.";
    if (!description.trim() || description.length < 20) newErrors.description = "Please provide more details (min 20 chars).";
    
    // Validate YouTube URL if provided
    if (youtubeUrl) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)$/;
        if (!youtubeUrl.match(regExp)) {
            newErrors.youtube = "Please enter a valid YouTube URL.";
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate Upload & API Call
    setTimeout(() => {
        const newPost: MLMPost = {
            id: `post-${Date.now()}`,
            profile,
            createdAt: 'Just now',
            title,
            description,
            images,
            youtubeUrl: youtubeUrl || undefined,
            // Create a temporary object URL for the PDF for demo purposes
            pdfUrl: pdfFile ? URL.createObjectURL(pdfFile) : undefined,
            stats: { likes: 0, shares: 0, comments: 0 },
        };
        onPostCreate(newPost);
        setIsSubmitting(false);
        setSubmitStatus('success');
    }, 1500);
  };
  
  const handleReset = () => {
    setTitle('');
    setDescription('');
    setImages([]);
    setPdfFile(null);
    setYoutubeUrl('');
    setErrors({});
    setSubmitStatus('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleReset} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Plan Post</h2>
          <button onClick={handleReset} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"><X size={20} /></button>
        </div>
        
        {submitStatus === 'success' ? (
           <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Plan Posted Successfully!</h3>
              <p className="text-gray-500 dark:text-gray-400">Your new business plan is now live for your network.</p>
              <button onClick={handleReset} className="mt-6 px-8 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 transition-transform hover:scale-105">
                Back to Feed
              </button>
            </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-6">
                
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Plan Title *</label>
                  <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    type="text" 
                    placeholder="e.g., Diamond Success Roadmap 2024" 
                    className={`w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl outline-none focus:ring-2 focus:ring-brand-orange dark:text-white transition-all ${errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`} 
                  />
                  {errors.title && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Plan Details *</label>
                  <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    rows={5} 
                    placeholder="Describe your plan, potential earnings, and benefits clearly..." 
                    className={`w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl outline-none focus:ring-2 focus:ring-brand-orange dark:text-white resize-none transition-all ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                  ></textarea>
                  {errors.description && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.description}</p>}
                </div>
                
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Upload Images <span className="text-xs font-normal text-gray-500">(Max 4, up to 2MB each)</span>
                    </label>
                    <div className="grid grid-cols-4 gap-4 mb-2">
                        {images.map((img, index) => (
                            <div key={index} className="relative aspect-square group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                                <img src={img} className="w-full h-full object-cover" alt="Preview" />
                                <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                        {images.length < 4 && (
                             <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-brand-orange hover:bg-brand-orange/5 transition-all text-gray-400 hover:text-brand-orange group">
                                <ImageIcon size={24} className="group-hover:scale-110 transition-transform" />
                                <span className="text-xs mt-1 font-medium">Add</span>
                                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        )}
                    </div>
                    {errors.images && <p className="text-xs text-red-500 mt-1">{errors.images}</p>}
                </div>

                {/* PDF and YouTube */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* PDF Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Attach PDF Plan</label>
                        {pdfFile ? (
                            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <FileText size={18} className="text-red-500 shrink-0" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{pdfFile.name}</span>
                                </div>
                                <button type="button" onClick={() => setPdfFile(null)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group">
                                <UploadCloud className="text-gray-400 group-hover:text-brand-orange transition-colors" size={20} />
                                <span className="text-sm text-gray-500 dark:text-gray-400">Upload PDF Document</span>
                                <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" />
                            </label>
                        )}
                        {errors.pdf && <p className="text-xs text-red-500 mt-1">{errors.pdf}</p>}
                    </div>

                    {/* YouTube Link */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">YouTube Video Link</label>
                         <div className="relative">
                            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                             <input 
                                value={youtubeUrl} 
                                onChange={e => setYoutubeUrl(e.target.value)} 
                                type="text" 
                                placeholder="https://youtube.com/watch?v=..." 
                                className={`w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border rounded-xl outline-none focus:ring-2 focus:ring-brand-orange dark:text-white transition-all ${errors.youtube ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`} 
                             />
                        </div>
                        {errors.youtube && <p className="text-xs text-red-500 mt-1">{errors.youtube}</p>}
                    </div>
                </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-end gap-3">
                <button 
                    type="button" 
                    onClick={handleReset} 
                    className="px-6 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="flex items-center justify-center gap-2 px-8 py-2.5 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                   {isSubmitting ? (
                     <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Posting...
                     </>
                   ) : (
                     <>
                        <Send size={18} /> Publish Plan
                     </>
                   )}
                </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
