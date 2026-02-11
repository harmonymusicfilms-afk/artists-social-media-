
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';
import { supabase } from '../lib/supabase';
import { apiFetchUserProfile } from '../lib/api';
import { CURRENT_USER_PROFILE } from '../constants';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileAndSetUser = async (sessionUser: any) => {
      // 1. Try fetching rich profile from 'profiles' table
      const profile = await apiFetchUserProfile(sessionUser.id);
      
      const appUser: User = {
          id: sessionUser.id,
          email: sessionUser.email || '',
          name: profile?.displayName || sessionUser.user_metadata?.name || sessionUser.email?.split('@')[0],
          profileId: sessionUser.id, // Profile ID is same as Auth ID in this schema
          isAdmin: false, // Implement admin logic later
          preferences: {
            privacy: {
              mobile: false,
              whatsapp: false,
              email: true,
              address: false,
              publicProfile: true
            },
            theme: 'light'
          }
      };
      setUser(appUser);
      setIsAuthenticated(true);
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await fetchProfileAndSetUser(session.user);
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchProfileAndSetUser(session.user);
      } else {
        // Only clear if not in Guest mode
        // For this demo, if we are authenticated via guest login, we want to stay authenticated
        if (!user || user.id !== CURRENT_USER_PROFILE.id) {
             setUser(null);
             setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const loginAsGuest = async () => {
    setIsLoading(true);
    // Mock user matching CURRENT_USER_PROFILE from constants to ensure data consistency in demo
    const guestUser: User = {
        id: CURRENT_USER_PROFILE.id, // Match mock ID from constants
        email: CURRENT_USER_PROFILE.email,
        name: CURRENT_USER_PROFILE.displayName,
        profileId: CURRENT_USER_PROFILE.id,
        isAdmin: false,
        preferences: {
            privacy: {
                mobile: false, whatsapp: false, email: true, address: false, publicProfile: true
            },
            theme: 'light'
        }
    };
    
    // Simulate network delay
    setTimeout(() => {
        setUser(guestUser);
        setIsAuthenticated(true);
        setIsLoading(false);
    }, 800);
  };

  const signup = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    });

    if (!error && data.user) {
        // Create initial profile in 'profiles' table
        const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            email: email,
            full_name: name,
            display_name: name,
            platform_role: 'JobSeeker' // Default role
        });
        
        if (profileError) {
            console.error("Error creating profile:", profileError);
        }
    }

    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...userData });
  };

  const updatePreferences = (prefs: Partial<User['preferences']>) => {
    if (!user) return;
    setUser({ 
      ...user, 
      preferences: { ...user.preferences, ...prefs } 
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, loginAsGuest, signup, logout, updateUser, updatePreferences }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
