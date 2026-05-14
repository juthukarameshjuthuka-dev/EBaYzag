import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _pass: string) => {
    // Simulated login
    if (email === 'admin@luxora.com') {
      setUser({ id: 'admin-1', name: 'Admin One', email, role: 'admin' });
    } else {
      setUser({ id: 'user-1', name: 'John Doe', email, role: 'user' });
    }
  };

  const logout = () => setUser(null);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
