import React, { useState } from 'react';
import { X, CheckCircle, Tv, AtSign, FileText } from 'lucide-react';
import { UserProfile } from '../../types';

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onCreate: (channelData: { name: string; handle: string; description: string }) => void;
}

export const CreateChannelModal: React.FC<CreateChannelModalProps> = ({ isOpen, onClose, currentUser, onCreate }) => {
  const [name, setName] = useState(currentUser.displayName);
  const [handle, setHandle] = useState(currentUser.displayName.toLowerCase().replace(/\s+/g, ''));
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
        onCreate({ name, handle, description });
        setIsSubmitting(false);
        onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-zoom-in border border-gray-100 dark:border-gray-800">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Tv className="text-brand-orange" /> Create Your Channel
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-gray-100 dark:border-gray-800 overflow-hidden mb-6 relative group cursor-pointer">
                <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white font-bold">Change</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Channel Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                        placeholder="My Awesome Channel"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Handle</label>
                    <div className="relative">
                        <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            value={handle} 
                            onChange={(e) => setHandle(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                            placeholder="mychannel"
                            required
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">This will be part of your channel URL.</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                    <div className="relative">
                        <FileText size={16} className="absolute left-3 top-3 text-gray-400" />
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white resize-none"
                            placeholder="Tell viewers what your channel is about..."
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Channel'}
                    </button>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="w-full mt-3 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};