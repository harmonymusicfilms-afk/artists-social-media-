
import React, { useState, useMemo } from 'react';
import { MOCK_NGO_SHG_GROUPS, CURRENT_USER_PROFILE } from '../constants';
import { NgoShgGroup } from '../types';
import { Search, MapPin, Users, Heart, ArrowLeft, Filter, Phone, Mail, Globe, CheckCircle, X, CreditCard, Gift, Send, ShieldCheck, Plus, Edit2, Save, UploadCloud } from 'lucide-react';

interface NGOSHGPageProps {
  onNavigate: (page: string) => void;
}

const JoinGroupModal: React.FC<{ group: NgoShgGroup; onClose: () => void }> = ({ group, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-zoom-in">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Join {group.name}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input type="text" required className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input type="tel" required className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Why do you want to join?</label>
                <textarea required rows={3} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white resize-none" placeholder="Share your motivation..." />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? 'Sending Request...' : 'Send Join Request'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Request Sent!</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">The group admin has received your request and will contact you shortly.</p>
              <button onClick={onClose} className="px-6 py-2 bg-gray-100 dark:bg-gray-700 font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DonateModal: React.FC<{ group: NgoShgGroup; onClose: () => void }> = ({ group, onClose }) => {
  const [amount, setAmount] = useState<string>('');
  const [step, setStep] = useState<'amount' | 'payment' | 'success'>('amount');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonate = () => {
    if (!amount) return;
    setStep('payment');
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2000);
  };

  const predefinedAmounts = ['100', '500', '1000', '2000'];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-zoom-in">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-brand-orange/5">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Donate to {group.name}</h3>
            <p className="text-xs text-brand-orange font-medium mt-1">Support the cause: {group.focusArea}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {step === 'amount' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Select Amount (₹)</label>
                <div className="grid grid-cols-4 gap-3">
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className={`py-2 rounded-lg font-bold border transition-all ${
                        amount === amt
                          ? 'bg-brand-orange text-white border-brand-orange'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-brand-orange'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Or Enter Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white font-bold text-lg"
                    placeholder="0"
                  />
                </div>
              </div>

              <button 
                onClick={handleDonate}
                disabled={!amount || parseInt(amount) <= 0}
                className="w-full py-4 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform transition-transform active:scale-95"
              >
                Proceed to Pay ₹{amount || '0'}
              </button>
              
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck size={12} /> Secure Payment Gateway
              </p>
            </div>
          )}

          {step === 'payment' && (
            <div className="py-10 text-center">
               <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
               <h4 className="text-lg font-bold text-gray-900 dark:text-white">Processing Payment...</h4>
               <p className="text-gray-500 dark:text-gray-400 mt-2">Please wait while we verify your transaction.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift size={40} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Your donation of <span className="font-bold text-gray-900 dark:text-white">₹{amount}</span> was successful.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">A receipt has been sent to your email.</p>
              <button onClick={onClose} className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:opacity-90 transition-opacity">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GroupFormModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (group: NgoShgGroup) => void; 
  initialData?: NgoShgGroup | null 
}> = ({ isOpen, onClose, onSave, initialData }) => {
  
  const [formData, setFormData] = useState<Partial<NgoShgGroup>>({
    name: '',
    type: 'NGO',
    focusArea: '',
    location: '',
    description: '',
    image: '',
    members: 1,
    contact: { phone: '', email: '', website: '' },
    isVerified: false
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset for new entry
      setFormData({
        name: '',
        type: 'NGO',
        focusArea: '',
        location: '',
        description: '',
        image: 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 1000), // Default random image
        members: 1,
        contact: { phone: '', email: '', website: '' },
        isVerified: false
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.focusArea || !formData.location || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    const newGroup: NgoShgGroup = {
      id: initialData ? initialData.id : `group-${Date.now()}`,
      name: formData.name || '',
      type: formData.type as 'NGO' | 'SHG',
      focusArea: formData.focusArea || '',
      location: formData.location || '',
      members: formData.members || 1,
      description: formData.description || '',
      image: formData.image || '',
      contact: formData.contact || {},
      isVerified: formData.isVerified || false,
      ownerId: initialData?.ownerId || CURRENT_USER_PROFILE.id // Assign current user as owner for new groups
    };

    onSave(newGroup);
    onClose();
  };

  const handleContactChange = (field: keyof typeof formData.contact, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-zoom-in flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? 'Edit Group Details' : 'Register Your Group'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form id="group-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Group Name *</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                  placeholder="e.g. Sunrise Foundation"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Type *</label>
                <div className="flex gap-4">
                  {(['NGO', 'SHG'] as const).map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="groupType"
                        checked={formData.type === type}
                        onChange={() => setFormData({...formData, type})}
                        className="w-4 h-4 text-brand-orange focus:ring-brand-orange"
                      />
                      <span className="text-sm dark:text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Focus / Work Area *</label>
                <input 
                  type="text" 
                  value={formData.focusArea} 
                  onChange={(e) => setFormData({...formData, focusArea: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                  placeholder="e.g. Education, Health, Women Empowerment"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location Area *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                  <input 
                    type="text" 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                    placeholder="City, State"
                    required 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description *</label>
              <textarea 
                rows={4}
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white resize-none"
                placeholder="Tell us about your organization's mission and activities..."
                required 
              />
            </div>

            <div>
               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Group Cover Image URL</label>
               <div className="relative">
                  <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                  <input 
                    type="text" 
                    value={formData.image} 
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none dark:text-white"
                    placeholder="https://example.com/image.jpg"
                  />
               </div>
            </div>

            <div className="space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
              <h4 className="font-bold text-gray-900 dark:text-white">Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Phone</label>
                    <input 
                      type="text" 
                      value={formData.contact?.phone} 
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange dark:text-white"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={formData.contact?.email} 
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange dark:text-white"
                    />
                 </div>
                 <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Website</label>
                    <input 
                      type="text" 
                      value={formData.contact?.website} 
                      onChange={(e) => handleContactChange('website', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange dark:text-white"
                      placeholder="www.example.org"
                    />
                 </div>
              </div>
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-end gap-4">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="group-form"
            className="px-8 py-2.5 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 transition-transform hover:scale-[1.02] flex items-center gap-2"
          >
            <Save size={18} /> {initialData ? 'Update Group' : 'Register Group'}
          </button>
        </div>
      </div>
    </div>
  );
};

const GroupCard: React.FC<{ 
  group: NgoShgGroup; 
  onClick: (group: NgoShgGroup) => void;
  onEdit?: (group: NgoShgGroup) => void;
}> = ({ group, onClick, onEdit }) => {
  const isOwner = group.ownerId === CURRENT_USER_PROFILE.id;

  return (
    <div 
      onClick={() => onClick(group)}
      className="group relative h-96 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Full Background Image */}
      <img src={group.image} alt={group.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      
      {/* Overlay Gradient: Darker on hover to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-300 group-hover:bg-black/70 group-hover:via-black/70" />

      {/* Type Badge & Edit Button */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        {isOwner && onEdit && (
           <button 
             onClick={(e) => { e.stopPropagation(); onEdit(group); }}
             className="p-1.5 bg-black/50 text-white rounded-full hover:bg-brand-orange transition-colors backdrop-blur-sm"
             title="Edit Group"
           >
             <Edit2 size={14} />
           </button>
        )}
        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${group.type === 'NGO' ? 'bg-blue-600' : 'bg-pink-600'}`}>
          {group.type}
        </span>
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 text-white">
        
        {/* Title Section: Always visible, adjusts position on hover */}
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2 origin-bottom">
          <div className="flex items-center justify-between mb-1">
              <h3 className="text-2xl font-bold drop-shadow-md flex items-center gap-2 leading-tight">
                {group.name}
                {group.isVerified && <CheckCircle size={18} className="text-blue-400 fill-blue-400/20" />}
              </h3>
          </div>
          <p className="text-sm text-gray-300 font-medium mb-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300 h-auto group-hover:h-0 overflow-hidden">
              {group.focusArea}
          </p>
        </div>

        {/* Hover Reveal Section: Description & Stats */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
          <div className="overflow-hidden">
            <div className="pt-2 border-t border-white/20">
                <p className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">Focus: {group.focusArea}</p>
                <p className="text-sm text-gray-200 leading-relaxed line-clamp-4 mb-4">
                  {group.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-brand-orange" />
                    <span className="truncate max-w-[120px]">{group.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-brand-orange" />
                    <span>{group.members.toLocaleString()} Members</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GroupDetailModal: React.FC<{ 
  group: NgoShgGroup; 
  onClose: () => void; 
  onJoin: () => void; 
  onDonate: () => void;
  onEdit: () => void;
}> = ({ group, onClose, onJoin, onDonate, onEdit }) => {
  const isOwner = group.ownerId === CURRENT_USER_PROFILE.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in">
        
        {/* Header Image */}
        <div className="relative h-64 shrink-0">
          <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 flex gap-2">
             {isOwner && (
               <button onClick={onEdit} className="p-2 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors shadow-sm">
                 <Edit2 size={20} />
               </button>
             )}
             <button onClick={onClose} className="p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors backdrop-blur-sm">
               <X size={20} />
             </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
             <div className="flex items-center gap-3 mb-1">
               <h2 className="text-3xl font-bold text-white">{group.name}</h2>
               <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${group.type === 'NGO' ? 'bg-blue-600' : 'bg-pink-600'}`}>{group.type}</span>
             </div>
             <p className="text-gray-200">{group.focusArea} &bull; {group.location}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">About Us</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{group.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                 <Users size={18} className="text-brand-orange" />
                 {group.members.toLocaleString()} Active Members
               </div>
               {group.isVerified && (
                 <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-300">
                   <CheckCircle size={18} /> Verified Organization
                 </div>
               )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Contact & Connect</h3>
              <div className="space-y-3">
                {group.contact.phone && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Phone size={18} className="text-gray-400" />
                    <span>{group.contact.phone}</span>
                  </div>
                )}
                {group.contact.email && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Mail size={18} className="text-gray-400" />
                    <span>{group.contact.email}</span>
                  </div>
                )}
                {group.contact.website && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Globe size={18} className="text-gray-400" />
                    <a href={`https://${group.contact.website}`} target="_blank" rel="noreferrer" className="hover:text-brand-orange underline">
                      {group.contact.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex gap-4">
          <button 
            onClick={onJoin}
            className="flex-1 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 transition-transform hover:scale-[1.02]"
          >
            Join Group
          </button>
          <button 
            onClick={onDonate}
            className="flex-1 py-3 bg-white dark:bg-gray-700 text-brand-orange dark:text-white border border-brand-orange dark:border-transparent font-bold rounded-xl hover:bg-brand-orange/10 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
          >
            <Heart size={18} /> Donate
          </button>
        </div>

      </div>
    </div>
  );
};

export const NGOSHGPage: React.FC<NGOSHGPageProps> = ({ onNavigate }) => {
  // State for all groups (combining mock data and user added ones)
  const [groups, setGroups] = useState<NgoShgGroup[]>(MOCK_NGO_SHG_GROUPS);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'NGO' | 'SHG'>('All');
  const [selectedGroup, setSelectedGroup] = useState<NgoShgGroup | null>(null);
  
  // Modal States
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<NgoShgGroup | null>(null);

  const filteredGroups = useMemo(() => {
    return groups.filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            group.focusArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            group.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || group.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType, groups]);

  const handleJoinClick = () => {
    setIsJoinModalOpen(true);
  };

  const handleDonateClick = () => {
    setIsDonateModalOpen(true);
  };

  const handleRegisterGroup = () => {
    setEditingGroup(null);
    setIsFormModalOpen(true);
  };

  const handleEditGroupClick = () => {
    if (selectedGroup) {
      setEditingGroup(selectedGroup);
      setIsFormModalOpen(true);
      // Close detail modal momentarily or keep it under? 
      // Better to close detail modal to avoid z-index stacking issues if not managed carefully, 
      // but users prefer keeping context. We'll close detail modal for simplicity.
      setSelectedGroup(null); 
    }
  };

  const handleEditGroupFromCard = (group: NgoShgGroup) => {
    setEditingGroup(group);
    setIsFormModalOpen(true);
  };

  const handleSaveGroup = (groupData: NgoShgGroup) => {
    setGroups(prev => {
      const exists = prev.find(g => g.id === groupData.id);
      if (exists) {
        return prev.map(g => g.id === groupData.id ? groupData : g);
      }
      return [groupData, ...prev];
    });
    
    // If we were editing, show the updated detail view
    if (editingGroup) {
        setSelectedGroup(groupData);
    }
  };

  return (
    <div id="ngo-shg-top" className="min-h-screen bg-gray-50 dark:bg-brand-darker pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold hover:text-brand-orange mb-8 transition-colors"
        >
            <ArrowLeft size={18} /> Back to Dashboard
        </button>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-500 text-white mb-12 shadow-xl">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10 p-8 md:p-16 text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Empower Communities, <br/> Create Change.</h1>
              <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-8">
                Connect with verified NGOs and Self-Help Groups (SHGs) to volunteer, donate, or collaborate on social impact projects across India.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button onClick={() => document.getElementById('search-section')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-3 bg-white text-emerald-700 font-bold rounded-full shadow-lg hover:bg-emerald-50 transition-transform hover:scale-105">Find a Group</button>
                 <button 
                    onClick={handleRegisterGroup}
                    className="px-8 py-3 bg-emerald-700/50 backdrop-blur-sm border border-emerald-400/30 text-white font-bold rounded-full hover:bg-emerald-700/70 transition-colors flex items-center justify-center gap-2"
                 >
                    <Plus size={18} /> Register Your Group
                 </button>
              </div>
           </div>
        </div>

        {/* Search & Filter Section */}
        <div id="search-section" className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 z-30 bg-gray-50/90 dark:bg-brand-darker/90 backdrop-blur-sm py-4">
           <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, cause, or location..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
              />
           </div>
           
           <div className="flex items-center gap-2 p-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              {(['All', 'NGO', 'SHG'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    filterType === type 
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
           </div>
        </div>

        {/* Groups Grid */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGroups.map(group => (
              <GroupCard 
                key={group.id} 
                group={group} 
                onClick={setSelectedGroup} 
                onEdit={handleEditGroupFromCard}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
             <Heart size={48} className="mx-auto text-gray-300 mb-4" />
             <h3 className="text-xl font-bold text-gray-900 dark:text-white">No groups found</h3>
             <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search filters.</p>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {selectedGroup && (
        <GroupDetailModal 
          group={selectedGroup} 
          onClose={() => setSelectedGroup(null)} 
          onJoin={handleJoinClick}
          onDonate={handleDonateClick}
          onEdit={handleEditGroupClick}
        />
      )}

      {/* Register/Edit Group Modal */}
      <GroupFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveGroup}
        initialData={editingGroup}
      />

      {/* Sub Modals */}
      {selectedGroup && isJoinModalOpen && (
        <JoinGroupModal 
          group={selectedGroup} 
          onClose={() => setIsJoinModalOpen(false)} 
        />
      )}

      {selectedGroup && isDonateModalOpen && (
        <DonateModal 
          group={selectedGroup} 
          onClose={() => setIsDonateModalOpen(false)} 
        />
      )}
    </div>
  );
};
