import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { MOCK_CHATS, USER_PROFILES } from '../../constants';
import { ChatConversation, ChatMessage, UserProfile } from '../../types';
import { Send, Search, X, MoreVertical, Paperclip } from 'lucide-react';

interface ChatOverlayProps {
    onClose: () => void;
    initialTargetUserId?: string | null;
}

const ConversationListItem: React.FC<{
    conversation: ChatConversation;
    currentUser: UserProfile;
    otherUser: UserProfile;
    isActive: boolean;
    onClick: () => void;
}> = ({ conversation, otherUser, isActive, onClick }) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    
    return (
        <div onClick={onClick} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-brand-orange/10' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
            <div className="relative shrink-0">
                <img src={otherUser.avatar} alt={otherUser.displayName} className="w-12 h-12 rounded-full object-cover" />
                {otherUser.status === 'online' && (
                     <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" title="Online"></span>
                )}
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-900 dark:text-white truncate">{otherUser.displayName}</h4>
                    <p className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{lastMessage.timestamp}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{lastMessage.text}</p>
            </div>
        </div>
    );
};

const ChatWindow: React.FC<{
    conversation: ChatConversation;
    currentUser: UserProfile;
    otherUser: UserProfile;
    onSendMessage: (text: string) => void;
}> = ({ conversation, currentUser, otherUser, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation.messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage.trim());
            setNewMessage('');
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-r-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                       <img src={otherUser.avatar} alt={otherUser.displayName} className="w-10 h-10 rounded-full" />
                       {otherUser.status === 'online' && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{otherUser.displayName}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{otherUser.status === 'online' ? 'Online' : `Last seen ${otherUser.status}`}</p>
                    </div>
                </div>
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><MoreVertical /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {conversation.messages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                       {msg.senderId !== currentUser.id && <img src={otherUser.avatar} className="w-8 h-8 rounded-full self-end" />}
                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.senderId === currentUser.id ? 'bg-brand-orange text-white rounded-br-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-lg'}`}>
                           <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
                 {conversation.messages[conversation.messages.length - 1].senderId === currentUser.id && (
                     <div className="flex gap-3 justify-start animate-pulse">
                         <img src={otherUser.avatar} className="w-8 h-8 rounded-full self-end" />
                         <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75" />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300" />
                         </div>
                     </div>
                 )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                    <button type="button" className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><Paperclip /></button>
                    <input value={newMessage} onChange={e => setNewMessage(e.target.value)} type="text" placeholder="Type a message..." className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-transparent rounded-full focus:ring-2 focus:ring-brand-orange outline-none" />
                    <button type="submit" className="p-3 bg-brand-orange text-white rounded-full shadow-lg hover:bg-brand-orange/90 disabled:opacity-50" disabled={!newMessage.trim()}><Send /></button>
                </form>
            </div>
        </div>
    );
};


export const ChatOverlay: React.FC<ChatOverlayProps> = ({ onClose, initialTargetUserId }) => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<ChatConversation[]>(MOCK_CHATS);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    const currentUserProfile = USER_PROFILES.find(p => p.id === user?.profileId);

    useEffect(() => {
        if (initialTargetUserId) {
            const existingConvo = conversations.find(c => c.participantIds.includes(initialTargetUserId));
            if (existingConvo) {
                setActiveConversationId(existingConvo.id);
            } else {
                // Create a new conversation (mock)
                const newConvo: ChatConversation = {
                    id: `chat-new-${Date.now()}`,
                    participantIds: [currentUserProfile!.id, initialTargetUserId],
                    messages: [],
                };
                setConversations(prev => [newConvo, ...prev]);
                setActiveConversationId(newConvo.id);
            }
        } else if (conversations.length > 0) {
            setActiveConversationId(conversations[0].id);
        }
    }, [initialTargetUserId]);

    const handleSendMessage = (text: string) => {
        if (!activeConversationId || !currentUserProfile) return;

        const newMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: currentUserProfile.id,
            text,
            timestamp: 'Just now',
            isRead: true,
        };

        const updatedConversations = conversations.map(c => 
            c.id === activeConversationId ? { ...c, messages: [...c.messages, newMessage] } : c
        );
        setConversations(updatedConversations);

        // Simulate reply
        setTimeout(() => {
            const otherUserId = conversations.find(c => c.id === activeConversationId)?.participantIds.find(id => id !== currentUserProfile.id);
            if (otherUserId) {
                const replyMessage: ChatMessage = {
                    id: `msg-reply-${Date.now()}`,
                    senderId: otherUserId,
                    text: "Sounds great! Let me check my calendar and get back to you.",
                    timestamp: 'Just now',
                    isRead: false,
                };
                 setConversations(prev => prev.map(c => 
                    c.id === activeConversationId ? { ...c, messages: [...c.messages, replyMessage] } : c
                ));
            }
        }, 2000);
    };

    if (!currentUserProfile) return null;
    
    const activeConversation = conversations.find(c => c.id === activeConversationId);
    const otherUser = activeConversation ? USER_PROFILES.find(p => p.id === activeConversation.participantIds.find(id => id !== currentUserProfile.id)) : null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center animate-fade-in">
            <div className="relative w-full h-full max-w-5xl bg-gray-100/50 dark:bg-gray-900/50 rounded-2xl shadow-2xl grid grid-cols-12 overflow-hidden">
                <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all"><X size={20} /></button>
                
                {/* Left: Conversation List */}
                <div className="col-span-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-4 flex flex-col border-r border-white/20 dark:border-black/20">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-brand-orange outline-none" />
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 -mr-2 pr-2">
                        {conversations.map(convo => {
                            const otherUserId = convo.participantIds.find(id => id !== currentUserProfile.id);
                            const otherUserData = USER_PROFILES.find(p => p.id === otherUserId);
                            if (!otherUserData) return null;
                            
                            return (
                               <ConversationListItem 
                                    key={convo.id}
                                    conversation={convo}
                                    currentUser={currentUserProfile}
                                    otherUser={otherUserData}
                                    isActive={activeConversationId === convo.id}
                                    onClick={() => setActiveConversationId(convo.id)}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Right: Active Chat */}
                <div className="col-span-8">
                   {activeConversation && otherUser ? (
                       <ChatWindow 
                           conversation={activeConversation}
                           currentUser={currentUserProfile}
                           otherUser={otherUser}
                           onSendMessage={handleSendMessage}
                        />
                   ) : (
                       <div className="h-full flex items-center justify-center text-center text-gray-500 dark:text-gray-400">
                           <div>
                               <h3 className="text-xl font-bold">Select a conversation</h3>
                               <p>Start messaging with your connections.</p>
                           </div>
                       </div>
                   )}
                </div>
            </div>
        </div>
    );
};