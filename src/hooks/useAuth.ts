// src/hooks/useAuth.tsx
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = (): AuthContextType => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      if (res.data.accessToken && res.data.refreshToken) {
        // Store tokens
        localStorage.setItem('accessToken', res.data.accessToken);

        // Save refreshToken in cookies for security
        document.cookie = `refreshToken=${res.data.refreshToken}; path=/; secure; samesite=strict`;

        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login failed', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
    loading,
  };
};

export { AuthContext };
