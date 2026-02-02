import React, { useState } from 'react';
import { X, CheckCircle, UploadCloud, FileText, Image as ImageIcon, Youtube, Send } from 'lucide-react';
// FIX: The type `MLMProfile` is not exported from `types.ts`. The correct type for a user profile, even in the MLM context, is the unified `UserProfile`.
import { MLMPost, UserProfile } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onPostCreate: (post: MLMPost) => void;
}

const SAMPLE_PDF_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

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
      // Limit to 4 images
      if (images.length + files.length > 4) {
        alert("You can upload a maximum of 4 images.");
        return;
      }
      
      const newImagePreviews: string[] = [];
      // FIX: Explicitly type `file` as `File` to resolve type inference issues.
      files.forEach((file: File) => {
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
          alert(`File ${file.name} is too large. Please upload images under 2MB.`);
          return;
        }
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          newImagePreviews.push(loadEvent.target?.result as string);
          if (newImagePreviews.length === files.length) {
            setImages(prev => [...prev, ...newImagePreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title) newErrors.title = "A compelling title is required.";
    if (!description || description.length < 20) newErrors.description = "Description must be at least 20 characters long.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
        const newPost: MLMPost = {
            id: `post-${Date.now()}`,
            profile,
            createdAt: 'Just now',
            title,
            description,
            images,
            youtubeUrl,
            pdfUrl: pdfFile ? SAMPLE_PDF_URL : undefined,
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
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create a New Plan Post</h2>
          <button onClick={handleReset} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><X size={20} /></button>
        </div>
        
        {submitStatus === 'success' ? (
           <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
              <CheckCircle size={48} className="text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Post Created Successfully!</h3>
              <p className="text-gray-500 dark:text-gray-400">Your new plan is now live on the platform.</p>
              <button onClick={handleReset} className="mt-6 px-8 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90">
                Done
              </button>
            </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Plan Title *</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="e.g., The Ultimate Wellness Plan" className={`w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl outline-none focus:ring-2 focus:ring-brand-orange ${errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`} />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Plan Details *</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} placeholder="Describe your plan, benefits, and how to join..." className={`w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-xl outline-none focus:ring-2 focus:ring-brand-orange ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}></textarea>
                  {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                </div>
                
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Add Images (up to 4, max 2MB each)</label>
                    <div className="grid grid-cols-4 gap-4 mb-2">
                        {images.map((img, index) => (
                            <div key={index} className="relative aspect-square group">
                                <img src={img} className="w-full h-full object-cover rounded-lg" />
                                <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                            </div>
                        ))}
                        {images.length < 4 && (
                             <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-brand-orange hover:text-brand-orange transition-colors text-gray-400">
                                <ImageIcon size={24} />
                                <span className="text-xs mt-1">Add</span>
                                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        )}
                    </div>
                </div>

                {/* PDF and YouTube */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Attach PDF Plan</label>
                        <label className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer">
                            <FileText className="text-gray-400" />
                            <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{pdfFile ? pdfFile.name : 'Upload PDF Document'}</span>
                            <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">YouTube Video Link</label>
                         <div className="relative">
                            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                             <input value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} type="text" placeholder="https://youtube.com/watch?v=..." className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-end">
                <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 px-8 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 active:scale-95 transition-all disabled:opacity-70">
                   {isSubmitting ? (
                     <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Posting...
                     </>
                   ) : (
                     <>
                        <Send size={18} /> Publish Post
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
