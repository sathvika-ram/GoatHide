'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'CUSTOMER';
  referralCode: string;
  loyaltyPoints: number;
  orders?: any[];
  loyaltyTransactions?: any[];
}

interface AuthContextProps {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, referralCode?: string) => Promise<boolean>;
  logout: () => void;
  updateLoyaltyPoints: (points: number) => void;
  syncProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('gh_token');
    const savedUser = localStorage.getItem('gh_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const syncProfile = async () => {
    const savedToken = localStorage.getItem('gh_token') || token;
    if (!savedToken) return;

    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('gh_user', JSON.stringify(data.user));
      }
    } catch (e) {
      console.log('API offline, using cached profile state');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('gh_token', data.token);
        localStorage.setItem('gh_user', JSON.stringify(data.user));
        return true;
      }
      
      const errorData = await res.json();
      alert(errorData.error || 'Login failed');
      return false;
    } catch (e) {
      console.log('Connection failed. Enabling mock login mode.');
      // Mock login for offline presentation
      if (email && password) {
        const mockUser: UserProfile = {
          id: 'mock-user-123',
          email,
          name: email.split('@')[0].toUpperCase(),
          role: email.includes('admin') ? 'ADMIN' : 'CUSTOMER',
          referralCode: 'GH-MOCK-77',
          loyaltyPoints: 350,
          orders: [],
          loyaltyTransactions: [
            { id: '1', points: 100, type: 'EARNED', description: 'Mock sign-up bonus', createdAt: new Date() },
            { id: '2', points: 250, type: 'EARNED', description: 'Mock purchase points', createdAt: new Date() }
          ],
        };
        setToken('mock-jwt-token');
        setUser(mockUser);
        localStorage.setItem('gh_token', 'mock-jwt-token');
        localStorage.setItem('gh_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, referralCode?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, referralCode }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('gh_token', data.token);
        localStorage.setItem('gh_user', JSON.stringify(data.user));
        return true;
      }

      const errorData = await res.json();
      alert(errorData.error || 'Registration failed');
      return false;
    } catch (e) {
      console.log('Connection failed. Enabling mock sign-up mode.');
      const mockUser: UserProfile = {
        id: 'mock-user-123',
        email,
        name,
        role: 'CUSTOMER',
        referralCode: `GH-${name.substring(0, 3).toUpperCase()}-99`,
        loyaltyPoints: referralCode ? 100 : 50,
        orders: [],
        loyaltyTransactions: [
          { id: '1', points: referralCode ? 100 : 50, type: 'EARNED', description: 'Mock registration reward', createdAt: new Date() }
        ],
      };
      setToken('mock-jwt-token');
      setUser(mockUser);
      localStorage.setItem('gh_token', 'mock-jwt-token');
      localStorage.setItem('gh_user', JSON.stringify(mockUser));
      return true;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('gh_token');
    localStorage.removeItem('gh_user');
  };

  const updateLoyaltyPoints = (points: number) => {
    if (user) {
      const updated = { ...user, loyaltyPoints: user.loyaltyPoints + points };
      setUser(updated);
      localStorage.setItem('gh_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, updateLoyaltyPoints, syncProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
