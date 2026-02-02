import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft, Save } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { user, updatePreferences } = useAuth();
  
  const [privacy, setPrivacy] = useState(user?.preferences.privacy || {
      mobile: false, whatsapp: false, email: true, address: false, publicProfile: true
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      updatePreferences({ privacy });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-darker pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-brand-orange mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
        </button>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-gray-800">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your privacy and account preferences.</p>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy & Visibility</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Control what information is visible on your public profile.</p>
              
              <div className="space-y-4">
                 {[
                   { key: 'publicProfile', label: 'Public Profile', desc: 'Allow others to see your profile' },
                   { key: 'email', label: 'Show Email', desc: 'Display email on your profile' },
                   { key: 'mobile', label: 'Show Mobile Number', desc: 'Display mobile number on your profile' },
                   { key: 'whatsapp', label: 'Show WhatsApp', desc: 'Allow users to contact via WhatsApp' },
                   { key: 'address', label: 'Show Address', desc: 'Display your location/address' },
                 ].map((item) => (
                   <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => handleToggle(item.key as any)}
                        className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 ${privacy[item.key as keyof typeof privacy] ? 'bg-brand-green' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${privacy[item.key as keyof typeof privacy] ? 'translate-x-7' : 'translate-x-0'}`} />
                      </button>
                   </div>
                 ))}
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : (
                  <>
                    <Save size={18} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};