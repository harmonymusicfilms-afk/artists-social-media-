import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Video, Film, Type, MessageSquare, Link as LinkIcon, Youtube, UploadCloud } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioAddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: PortfolioItem) => void;
  itemToEdit?: PortfolioItem | null;
}

const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube.com')) {
            videoId = urlObj.searchParams.get('v') || '';
        }
    } catch (e) { return null; }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

export const PortfolioAddItemModal: React.FC<PortfolioAddItemModalProps> = ({ isOpen, onClose, onSave, itemToEdit }) => {
  const isEditMode = !!itemToEdit;
  type UploadMethod = 'photo' | 'youtube' | 'directVideo';
  
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>('photo');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  
  const [newItem, setNewItem] = useState<Partial<Omit<PortfolioItem, 'id'>>>({
    type: 'photo',
    title: '',
    caption: '',
    thumbnailUrl: ''
  });

  const resetState = () => {
      setUploadMethod('photo');
      setFile(null);
      setFileName('');
      setNewItem({
        type: 'photo',
        title: '',
        caption: '',
        thumbnailUrl: ''
      });
  };

  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        setNewItem(itemToEdit);
        if (itemToEdit.youtubeUrl) {
          setUploadMethod('youtube');
        } else if (itemToEdit.type === 'video' || itemToEdit.type === 'short') {
          setUploadMethod('directVideo');
        } else {
          setUploadMethod('photo');
        }
        setFileName(itemToEdit.mediaUrl || '');
      } else {
        resetState();
      }
    }
  }, [isOpen, itemToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (uploadMethod === 'directVideo' && selectedFile.size > 10 * 1024 * 1024) {
          alert('Video file size cannot exceed 10MB.');
          return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      
      if (uploadMethod === 'photo') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewItem(prev => ({ ...prev, thumbnailUrl: reader.result as string, mediaUrl: reader.result as string }));
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || (!newItem.thumbnailUrl && uploadMethod !== 'directVideo')) {
      alert('Please fill in title and provide a thumbnail.');
      return;
    }

    let finalItem: Omit<PortfolioItem, 'id'>;

    switch (uploadMethod) {
        case 'photo':
            if (!file && !isEditMode) { alert('Please select a photo to upload.'); return; }
            finalItem = {
                ...newItem,
                type: 'photo',
                mediaUrl: file ? URL.createObjectURL(file) : newItem.mediaUrl, // Simulate upload
                youtubeUrl: undefined,
            };
            break;

        case 'youtube':
            if (!newItem.youtubeUrl || !getYouTubeEmbedUrl(newItem.youtubeUrl)) { alert('Please enter a valid YouTube URL.'); return; }
            finalItem = { ...newItem, type: 'video', mediaUrl: undefined };
            break;
            
        case 'directVideo':
            if (!file && !isEditMode) { alert('Please select a video to upload.'); return; }
            finalItem = {
                ...newItem,
                type: newItem.type === 'short' ? 'short' : 'video',
                mediaUrl: file ? URL.createObjectURL(file) : newItem.mediaUrl, // Simulate upload
                thumbnailUrl: newItem.thumbnailUrl || 'https://picsum.photos/400/400?random=99', // Placeholder if no thumb
                youtubeUrl: undefined,
            };
            break;

        default:
            return;
    }

    onSave({ ...finalItem, id: isEditMode ? itemToEdit.id : `p${Date.now()}` });
    onClose();
  };
  
  const TABS: { id: UploadMethod, label: string, icon: React.ElementType }[] = [
      { id: 'photo', label: 'Photo', icon: ImageIcon },
      { id: 'youtube', label: 'YouTube Video', icon: Youtube },
      { id: 'directVideo', label: 'Video/Short Upload', icon: UploadCloud },
  ];

  return (
    isOpen && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{isEditMode ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><X size={20} /></button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                   {TABS.map(tab => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setUploadMethod(tab.id)}
                          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                            uploadMethod === tab.id ? 'border-brand-orange bg-brand-orange/10' : 'border-gray-200 dark:border-gray-600 hover:border-brand-orange/50'
                          }`}
                        >
                          <tab.icon />
                          <span className="font-semibold text-sm capitalize">{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                        <div className="relative">
                            <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="title" value={newItem.title || ''} onChange={handleChange} type="text" placeholder="e.g., Sunset Over the Valley" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" required />
                        </div>
                    </div>

                    {uploadMethod === 'youtube' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">YouTube Video URL *</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input name="youtubeUrl" value={newItem.youtubeUrl || ''} onChange={handleChange} type="url" placeholder="https://youtube.com/watch?v=..." className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" required />
                            </div>
                        </div>
                    )}

                    {uploadMethod === 'photo' && (
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Upload Photo *</label>
                            <label className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-brand-orange">
                               <ImageIcon className="text-gray-400" />
                               <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{fileName || 'Click to select a file'}</span>
                               <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" required={!newItem.mediaUrl} />
                           </label>
                         </div>
                    )}
                    
                    {uploadMethod === 'directVideo' && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Upload Video * <span className="font-normal text-gray-400">(Max 10MB)</span></label>
                                 <label className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-brand-orange">
                                   <Video className="text-gray-400" />
                                   <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{fileName || 'Click to select a video file'}</span>
                                   <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" required={!newItem.mediaUrl} />
                               </label>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Format</label>
                                <div className="flex gap-4">
                                   <label className="flex items-center gap-2 cursor-pointer">
                                       <input type="radio" name="type" value="video" checked={newItem.type === 'video'} onChange={handleChange} className="w-4 h-4 text-brand-orange focus:ring-brand-orange/50"/>
                                       <span className="text-sm">Standard Video (16:9)</span>
                                   </label>
                                   <label className="flex items-center gap-2 cursor-pointer">
                                       <input type="radio" name="type" value="short" checked={newItem.type === 'short'} onChange={handleChange} className="w-4 h-4 text-brand-orange focus:ring-brand-orange/50"/>
                                       <span className="text-sm">Short (9:16)</span>
                                   </label>
                                </div>
                            </div>
                        </>
                    )}
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Thumbnail URL *</label>
                         <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="thumbnailUrl" value={newItem.thumbnailUrl || ''} onChange={handleChange} type="text" placeholder="https://example.com/thumbnail.jpg" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" required />
                         </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Caption</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-4 text-gray-400" />
                            <textarea name="caption" value={newItem.caption || ''} onChange={handleChange} rows={3} placeholder="A short description of your work..." className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-end gap-4 sticky bottom-0">
              <button type="button" onClick={onClose} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 active:scale-95 transition-all">
                <Save size={18} /> {isEditMode ? 'Update Item' : 'Add to Portfolio'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};