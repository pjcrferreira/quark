import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/auth';

type User = any;
type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (payload: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children:any}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('quark:token'));

  useEffect(() => {
    if (token) {
      authService.setToken(token);
      authService.me()
        .then(res => setUser(res.data))
        .catch(() => {
          setUser(null);
          setToken(null);
          authService.logout();
        });
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    const t = res.data.token || res.data.access_token;
    if (!t) throw new Error('Token não retornado');
    authService.setToken(t);
    setToken(t);
    const me = await authService.me();
    setUser(me.data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const register = async (payload: any) => {
    await authService.register(payload);
  };

  return <AuthContext.Provider value={{ user, token, login, logout, register }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
