import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, PlatformRole } from '../types';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TEMP: Initialize with a default user to bypass Login/Signup screens as requested.
  // This effectively "closes" the authentication gate for development/viewing.
  const [user, setUser] = useState<User | null>({
    id: 'guest-bypass',
    email: 'guest@artist.social',
    name: 'Guest Artist',
    profileId: 'profile-current', // Mock unified profile for the guest user
    isAdmin: true, // Set guest as admin for demo purposes
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
  });
  
  // Set initial authentication state to true to skip AuthPage
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Check local storage on mount to see if a real user was previously logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updatePreferences = (prefs: Partial<User['preferences']>) => {
    if (!user) return;
    const updatedUser = { 
      ...user, 
      preferences: { ...user.preferences, ...prefs } 
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser, updatePreferences }}>
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