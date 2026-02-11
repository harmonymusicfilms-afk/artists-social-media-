
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff, ArrowRight, Lock, Mail, User as UserIcon, Loader2, Sparkles } from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, loginAsGuest } = useAuth();
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Credentials required.');
      setIsLoading(false);
      return;
    }

    if (!isLogin && !name) {
      setError('Name required.');
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await login(email, password);
        if (error) throw error;
        onLoginSuccess();
      } else {
        const { error } = await signup(email, password, name);
        if (error) throw error;
        setSuccessMsg('Account created! Please check your email to confirm registration or login if auto-confirmed.');
        setTimeout(() => {
             setIsLogin(true);
             setSuccessMsg('');
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
      setIsLoading(true);
      await loginAsGuest();
      setIsLoading(false);
      onLoginSuccess();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] px-4 relative overflow-hidden">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale brightness-50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
      
      {/* Neon Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-orange/20 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[120px] animate-pulse-slow"></div>

      <div className="w-full max-w-md glass-panel rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10 border border-white/10 animate-float backdrop-blur-2xl">
        <div className="p-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-6 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-brand-orange shadow-[0_0_20px_rgba(0,242,255,0.2)]">
                <Lock size={32} />
            </div>
            <h2 className="text-3xl font-display font-black text-white tracking-widest uppercase">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-xs font-mono text-brand-green mt-2 uppercase tracking-widest">
              {isLogin ? 'Please login to continue' : 'Join the community'}
            </p>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-mono text-center rounded">
              {successMsg}
            </div>
          )}

          {error && (
             <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono text-center rounded">
               !! {error}
             </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                <div className="relative group">
                    <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-orange transition-colors" />
                    <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-white placeholder-gray-600 font-mono text-sm"
                    placeholder="John Doe"
                    disabled={isLoading}
                    />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-orange transition-colors" />
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-white placeholder-gray-600 font-mono text-sm"
                    placeholder="user@example.com"
                    disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-orange transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-white placeholder-gray-600 font-mono text-sm"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-4 bg-brand-orange text-black font-bold uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:bg-white hover:shadow-[0_0_30px_rgba(0,242,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Login' : 'Sign Up')}
              {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Guest Login Option */}
          <div className="mt-6 flex flex-col items-center">
              <div className="relative flex py-2 items-center w-full">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Or</span>
                  <div className="flex-grow border-t border-white/10"></div>
              </div>
              
              <button
                onClick={handleGuestLogin}
                disabled={isLoading}
                className="mt-2 flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/20 rounded-full text-gray-300 text-sm font-semibold hover:bg-white/10 hover:text-white hover:border-brand-orange transition-all group"
              >
                <Sparkles size={16} className="text-brand-orange group-hover:animate-pulse" />
                Enter as Guest (Demo)
              </button>
          </div>

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMsg(''); }}
                className="text-brand-orange font-bold hover:text-white transition-colors ml-1"
                disabled={isLoading}
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
