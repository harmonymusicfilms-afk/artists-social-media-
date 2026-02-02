import React, { Fragment } from 'react';
import { Home, Clapperboard, Youtube, Library, History, PlaySquare, Clock, ThumbsUp, Menu, X, TrendingUp, PlusCircle, MonitorPlay, ArrowLeft } from 'lucide-react';

interface WeTubeSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onNavigate: (view: 'home' | 'trending' | 'subscriptions' | 'library') => void;
    activeView: string;
    hasChannel: boolean;
    onCreateChannel: () => void;
    onViewChannel: () => void;
    onReturnToDashboard: () => void;
}

const NavLink: React.FC<{ icon: React.ElementType, label: string, active?: boolean, onClick?: () => void, className?: string }> = ({ icon: Icon, label, active, onClick, className }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick?.(); }} className={`flex items-center gap-5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
        active 
        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' 
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
    } ${className || ''}`}>
        <Icon size={22} />
        <span>{label}</span>
    </a>
);

const SidebarContent: React.FC<{ 
    onNavigate: WeTubeSidebarProps['onNavigate'], 
    activeView: string,
    hasChannel: boolean,
    onCreateChannel: () => void,
    onViewChannel: () => void,
    onReturnToDashboard: () => void
}> = ({ onNavigate, activeView, hasChannel, onCreateChannel, onViewChannel, onReturnToDashboard }) => (
    <div className="p-3 space-y-2">
        <NavLink 
            icon={ArrowLeft} 
            label="Back to Dashboard" 
            onClick={onReturnToDashboard} 
            className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600 mb-4 border border-gray-200 dark:border-gray-700" 
        />
        
        <NavLink icon={Home} label="Home" active={activeView === 'home'} onClick={() => onNavigate('home')} />
        <NavLink icon={TrendingUp} label="Trending" active={activeView === 'trending'} onClick={() => onNavigate('trending')} />
        <NavLink icon={Clapperboard} label="Shorts" />
        <NavLink icon={Youtube} label="Subscriptions" />
        <hr className="border-gray-200 dark:border-gray-700 my-3" />
        
        {/* Channel Section */}
        {hasChannel ? (
            <NavLink icon={MonitorPlay} label="Your Channel" onClick={onViewChannel} className="text-brand-orange dark:text-brand-orange" />
        ) : (
            <NavLink icon={PlusCircle} label="Create Channel" onClick={onCreateChannel} className="text-brand-orange dark:text-brand-orange" />
        )}
        
        <NavLink icon={Library} label="Library" />
        <NavLink icon={History} label="History" />
        <NavLink icon={PlaySquare} label="Your videos" />
        <NavLink icon={Clock} label="Watch later" />
        <NavLink icon={ThumbsUp} label="Liked videos" />
    </div>
);

export const WeTubeSidebar: React.FC<WeTubeSidebarProps> = ({ isOpen, setIsOpen, onNavigate, activeView, hasChannel, onCreateChannel, onViewChannel, onReturnToDashboard }) => {
    return (
        <>
            {/* Mobile Sidebar (Drawer) */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
                <div 
                    className={`absolute inset-0 bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
                    onClick={() => setIsOpen(false)} 
                />
                <div className={`absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                   <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                     <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                       <X size={24} />
                     </button>
                     <div className="flex items-center gap-2 cursor-pointer">
                        <Youtube className="w-8 h-8 text-red-600" />
                        <span className="text-2xl font-bold tracking-tighter">WeTube</span>
                     </div>
                   </div>
                   <SidebarContent 
                        onNavigate={onNavigate} 
                        activeView={activeView} 
                        hasChannel={hasChannel} 
                        onCreateChannel={onCreateChannel}
                        onViewChannel={onViewChannel}
                        onReturnToDashboard={onReturnToDashboard}
                    />
                </div>
            </div>

            {/* Desktop Sidebar (Fixed) */}
            <aside className="hidden lg:block fixed top-[65px] left-0 h-[calc(100vh-65px)] w-60 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30">
                <SidebarContent 
                    onNavigate={onNavigate} 
                    activeView={activeView}
                    hasChannel={hasChannel}
                    onCreateChannel={onCreateChannel}
                    onViewChannel={onViewChannel}
                    onReturnToDashboard={onReturnToDashboard}
                />
            </aside>
        </>
    );
};