import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Link, Loader2, AlertTriangle, Send, Type } from 'lucide-react';
import { Video } from '../../types';
import { CURRENT_USER_PROFILE } from '../../constants';

interface SubmitVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (video: Video) => void;
}

// Mock function to simulate fetching YouTube video details
const fetchYouTubeVideoDetails = async (url: string): Promise<Partial<Video>> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url.includes('youtube.com') || url.includes('youtu.be')) {
                // Extract video ID for thumbnail
                let videoId = '';
                try {
                    const urlObj = new URL(url);
                    if (urlObj.hostname === 'youtu.be') {
                        videoId = urlObj.pathname.slice(1);
                    } else {
                        videoId = urlObj.searchParams.get('v') || '';
                    }
                } catch (e) {
                    // Fallback for simple regex if URL parsing fails
                    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);
                    videoId = match ? match[1] : 'mP0SGoN3I3w';
                }
                
                resolve({
                    title: "AGENT 327: OPERATION BARBERSHOP",
                    description: "This is a fetched description for the video. Agent 327 is a comic series by Dutch artist Martin Lodewijk. This animated film is a teaser for a feature film adaptation...",
                    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                    duration: "3:49",
                    creator: {
                        id: 'BlenderStudio',
                        name: 'Blender Studio',
                        avatar: 'https://picsum.photos/seed/blender/40/40',
                        subscribers: '1.5M',
                        isVerified: true,
                    },
                    embedUrl: `https://www.youtube.com/embed/${videoId}`,
                });
            } else {
                reject(new Error("Invalid YouTube URL. Please provide a valid link."));
            }
        }, 1500);
    });
};


export const SubmitVideoModal: React.FC<SubmitVideoModalProps> = ({ isOpen, onClose, onSave }) => {
  const [url, setUrl] = useState('');
  const [fetchedVideo, setFetchedVideo] = useState<Partial<Video> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    if (!isOpen) {
        // Reset state when modal is closed
        setTimeout(() => {
            setUrl('');
            setFetchedVideo(null);
            setIsLoading(false);
            setError(null);
            setSubmitStatus('idle');
        }, 300);
    }
  }, [isOpen]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUrl = e.target.value;
      setUrl(newUrl);
      setFetchedVideo(null);
      setError(null);
      if (newUrl.trim() === '') {
          setIsLoading(false);
          return;
      }
      setIsLoading(true);
      
      fetchYouTubeVideoDetails(newUrl)
        .then(data => {
            setFetchedVideo(data);
            setError(null);
        })
        .catch(err => {
            setError(err.message);
            setFetchedVideo(null);
        })
        .finally(() => {
            setIsLoading(false);
        });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fetchedVideo) {
      setFetchedVideo({ ...fetchedVideo, title: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fetchedVideo || !fetchedVideo.title) {
        setError("A video title is required to submit.");
        return;
    }

    const newVideo: Video = {
      id: `vid-${Date.now()}`,
      type: 'video',
      youtubeUrl: url,
      submittedBy: CURRENT_USER_PROFILE.id,
      submittedAt: 'Just now',
      uploadDate: 'N/A',
      status: 'pending',
      stats: { views: 0, likes: 0, dislikes: 0, comments: 0, shares: 0 },
      hashtags: [],
      ...fetchedVideo
    } as Video;

    onSave(newVideo);
    setSubmitStatus('success');
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={submitStatus === 'idle' ? onClose : undefined} />
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add a New Video</h2>
          {submitStatus === 'idle' && <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><X size={20} /></button>}
        </div>
        
        {submitStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
              <CheckCircle size={48} className="text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Video Submitted!</h3>
              <p className="text-gray-500 dark:text-gray-400">Your video is now pending review by our moderation team. Thank you for your contribution!</p>
              <button onClick={onClose} className="mt-6 px-8 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90">
                Done
              </button>
            </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">YouTube Video URL</label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={url} onChange={handleUrlChange} type="url" placeholder="Paste a YouTube link here..." className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange" required />
                  </div>
                </div>

                {fetchedVideo && !isLoading && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Video Title *</label>
                        <div className="relative">
                            <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                value={fetchedVideo.title || ''}
                                onChange={handleTitleChange}
                                type="text"
                                placeholder="Enter a title for your video"
                                className="w-full p-3 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange"
                                required
                            />
                        </div>
                    </div>
                )}

                {/* Preview / Status Section */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl min-h-[120px] flex items-center justify-center">
                    {isLoading && <Loader2 className="animate-spin text-brand-orange" size={32} />}
                    
                    {error && !isLoading && (
                        <div className="text-center text-red-500">
                           <AlertTriangle className="mx-auto mb-2" />
                           <p className="font-semibold text-sm">{error}</p>
                        </div>
                    )}

                    {fetchedVideo && !isLoading && (
                         <div className="flex gap-4 w-full">
                            <img src={fetchedVideo.thumbnailUrl} className="w-32 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <img src={fetchedVideo.creator?.avatar} className="w-6 h-6 rounded-full" />
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{fetchedVideo.creator?.name}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{fetchedVideo.description}</p>
                            </div>
                         </div>
                    )}

                    {!url && !isLoading && (
                        <p className="text-sm text-gray-400">Video preview will appear here.</p>
                    )}
                </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-end">
                <button type="submit" disabled={!fetchedVideo || !fetchedVideo.title || isLoading} className="flex items-center justify-center gap-2 px-8 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    <Send size={18} /> Submit Video
                </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};