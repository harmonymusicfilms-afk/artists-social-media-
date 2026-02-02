import React, { useState } from 'react';
import { MOCK_MLM_POSTS, MOCK_MLM_GROUPS, CURRENT_USER_PROFILE } from '../constants';
import { MLMPost } from '../types';
import { Users, Star, MessageSquare, ArrowLeft } from 'lucide-react';
import { MLMPostCard } from '../components/mlm/MLMPostCard';
import { CreatePostModal } from '../components/mlm/CreatePostModal';

interface MLMPlatformPageProps {
  onNavigate: (page: string) => void;
}

export const MLMPlatformPage: React.FC<MLMPlatformPageProps> = ({ onNavigate }) => {
    const [posts, setPosts] = useState<MLMPost[]>(MOCK_MLM_POSTS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handlePostCreate = (newPost: MLMPost) => {
        setPosts(prev => [newPost, ...prev]);
    };
    
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
                                <MLMPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* My Profile Card */}
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

                        {/* Groups Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Popular Groups</h3>
                            <div className="space-y-4">
                                {MOCK_MLM_GROUPS.map(group => (
                                    <div key={group.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img src={group.icon} alt={group.name} className="w-10 h-10 rounded-lg object-cover"/>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{group.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Users size={12}/> {group.memberCount.toLocaleString()} members</p>
                                            </div>
                                        </div>
                                        <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 rounded-full hover:bg-brand-orange hover:text-white">Join</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Featured Leaders Card */}
                         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Featured Leaders</h3>
                             <div className="space-y-4">
                                {MOCK_MLM_POSTS.map(post => post.profile).slice(0, 3).map(profile => (
                                     <div key={profile.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative shrink-0">
                                                <img src={profile.avatar} alt={profile.displayName} className="w-10 h-10 rounded-full object-cover"/>
                                                {profile.status === 'online' && (
                                                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{profile.displayName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-current"/> {profile.mlm?.level} Member</p>
                                            </div>
                                        </div>
                                        <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 rounded-full hover:bg-brand-green hover:text-white"><MessageSquare size={12} className="inline mr-1"/> Chat</button>
                                    </div>
                                ))}
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
        </div>
    );
};