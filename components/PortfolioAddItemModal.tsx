
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
  
  // State for fields
  const [mediaType, setMediaType] = useState<'photo' | 'video' | 'short'>('photo');
  
  const [newItem, setNewItem] = useState<Partial<Omit<PortfolioItem, 'id'>>>({
    title: '',
    caption: '',
    mediaUrl: '',
    thumbnailUrl: '',
    youtubeUrl: ''
  });

  const resetState = () => {
      setMediaType('photo');
      setNewItem({
        title: '',
        caption: '',
        mediaUrl: '',
        thumbnailUrl: '',
        youtubeUrl: ''
      });
  };

  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        setNewItem(itemToEdit);
        setMediaType(itemToEdit.type);
      } else {
        resetState();
      }
    }
  }, [isOpen, itemToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation Logic
    if (!newItem.title) {
        alert('Please enter a title for your work.');
        return;
    }

    if (mediaType === 'photo' && !newItem.mediaUrl) {
        alert('Please provide a Media URL for the photo.');
        return;
    }

    if (mediaType !== 'photo' && !newItem.thumbnailUrl) {
        alert('Please provide a Thumbnail URL for the video/short.');
        return;
    }

    // Video/Short specific validation
    if ((mediaType === 'video' || mediaType === 'short') && !newItem.youtubeUrl && !newItem.mediaUrl) {
         alert('Please provide either a YouTube URL or a direct Media URL for the video content.');
         return;
    }

    // YouTube URL Validation if provided
    if (newItem.youtubeUrl) {
        const youtubeEmbed = getYouTubeEmbedUrl(newItem.youtubeUrl);
        if (!youtubeEmbed) {
            alert('Invalid YouTube URL provided. Please check the link.');
            return;
        }
    }

    const finalItem: Omit<PortfolioItem, 'id'> = {
        type: mediaType,
        title: newItem.title!,
        caption: newItem.caption || '',
        thumbnailUrl: newItem.thumbnailUrl || (mediaType === 'photo' ? newItem.mediaUrl! : ''), // Auto-use mediaUrl as thumb for photos if thumb not provided
        mediaUrl: newItem.mediaUrl || '',
        youtubeUrl: newItem.youtubeUrl || ''
    };

    onSave({ ...finalItem, id: isEditMode && itemToEdit ? itemToEdit.id : `p${Date.now()}` });
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{isEditMode ? 'Edit Portfolio Item' : 'Add New Work'}</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><X size={20} /></button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
                
                {/* Media Type Dropdown */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Media Type *</label>
                    <div className="relative">
                        <select
                            value={mediaType}
                            onChange={(e) => setMediaType(e.target.value as any)}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange appearance-none"
                        >
                            <option value="photo">Photo</option>
                            <option value="video">Video</option>
                            <option value="short">Short</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            ▼
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                    <div className="relative">
                        <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input name="title" value={newItem.title || ''} onChange={handleChange} type="text" placeholder="e.g., Sunset Over the Valley" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Caption / Description</label>
                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-4 text-gray-400" />
                        <textarea name="caption" value={newItem.caption || ''} onChange={handleChange} rows={3} placeholder="A short description of your work..." className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Media URL {mediaType === 'photo' ? '*' : '(Direct Link)'}</label>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input name="mediaUrl" value={newItem.mediaUrl || ''} onChange={handleChange} type="text" placeholder={mediaType === 'photo' ? "https://example.com/image.jpg" : "https://example.com/video.mp4"} className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Direct link to the source file (image or video).</p>
                </div>

                {(mediaType === 'video' || mediaType === 'short') && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">YouTube URL (Optional)</label>
                        <div className="relative">
                            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="youtubeUrl" value={newItem.youtubeUrl || ''} onChange={handleChange} type="text" placeholder="https://youtube.com/watch?v=..." className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Thumbnail URL {mediaType !== 'photo' ? '*' : '(Optional)'}</label>
                     <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input name="thumbnailUrl" value={newItem.thumbnailUrl || ''} onChange={handleChange} type="text" placeholder="https://example.com/thumbnail.jpg" className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" required={mediaType !== 'photo'} />
                     </div>
                     <p className="text-xs text-gray-500 mt-1">Preview image for the portfolio grid.</p>
                </div>
                
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-end gap-4 sticky bottom-0">
              <button type="button" onClick={onClose} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 active:scale-95 transition-all">
                <Save size={18} /> {isEditMode ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
