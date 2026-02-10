
import React, { useState, useEffect } from 'react';
import { CURRENT_USER_PROFILE } from '../constants';
import { MLMPost } from '../types';
import { Users, Star, MessageSquare, ArrowLeft } from 'lucide-react';
import { MLMPostCard } from '../components/mlm/MLMPostCard';
import { CreatePostModal } from '../components/mlm/CreatePostModal';
import { ChatOverlay } from '../components/artists/ChatOverlay';
import { useAuth } from '../hooks/useAuth';
import { apiFetchMLMPosts, apiCreateMLMPost } from '../lib/api';

interface MLMPlatformPageProps {
  onNavigate: (page: string) => void;
}

export const MLMPlatformPage: React.FC<MLMPlatformPageProps> = ({ onNavigate }) => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<MLMPost[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [chatTargetId, setChatTargetId] = useState<string | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            const data = await apiFetchMLMPosts();
            setPosts(data);
        };
        loadPosts();
    }, []);

    const handlePostCreate = async (newPostData: MLMPost) => {
        if (user) {
            await apiCreateMLMPost(newPostData, user.id);
            const data = await apiFetchMLMPosts();
            setPosts(data);
        }
    };
    
    // ... (rest of the component remains similar, but uses the fetched posts)
    
    return (
        <div id="mlm-platform-top" className="min-h-screen bg-gray-100 dark:bg-brand-darker pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <button 
                    onClick={() => onNavigate('dashboard')} 
                    className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold hover:text-brand-orange mb-6 transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                        MLM Network Platform
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Connect, share your business plans, and grow your network.
                    </p>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Main Content Feed */}
                    <div className="lg:col-span-8">
                        {/* Create Post CTA */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center gap-4 mb-6">
                            <img src={CURRENT_USER_PROFILE.avatar} alt="My Avatar" className="w-12 h-12 rounded-full" />
                            <div 
                                onClick={() => setIsCreateModalOpen(true)}
                                className="flex-1 text-left px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                Share your plan or update...
                            </div>
                            <button 
                                onClick={() => setIsCreateModalOpen(true)}
                                className="px-5 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90"
                            >
                                Create Post
                            </button>
                        </div>

                        {/* Posts Feed */}
                        <div className="space-y-6">
                            {posts.map(post => (
                                <MLMPostCard 
                                    key={post.id} 
                                    post={post} 
                                    onChat={(userId) => setChatTargetId(userId)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar (Simplified for brevity, same as before) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                             <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">My Profile</h3>
                                <button onClick={() => onNavigate('user-profile')} className="text-xs font-semibold text-brand-orange">View Profile &rarr;</button>
                             </div>
                             <div className="flex items-center gap-4">
                                <div className="relative shrink-0">
                                    <img src={CURRENT_USER_PROFILE.avatar} alt="My Avatar" className="w-16 h-16 rounded-full" />
                                    {CURRENT_USER_PROFILE.status === 'online' && (
                                        <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">{CURRENT_USER_PROFILE.displayName}</p>
                                    <p className="text-sm text-yellow-500 font-semibold">{CURRENT_USER_PROFILE.mlm?.level} Member</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Team Size: {CURRENT_USER_PROFILE.mlm?.teamSize}</p>
                                </div>
                             </div>
                        </div>
                    </div>

                </div>
            </div>

            <CreatePostModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                profile={CURRENT_USER_PROFILE}
                onPostCreate={handlePostCreate}
            />

            {chatTargetId && (
                <ChatOverlay 
                    onClose={() => setChatTargetId(null)} 
                    initialTargetUserId={chatTargetId} 
                />
            )}
        </div>
    );
};
