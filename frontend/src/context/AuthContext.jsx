import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'realestate_auth';

export const AuthProvider = ({ children }) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const parsed = stored ? JSON.parse(stored) : null;

  const [token, setToken] = useState(parsed?.token || '');
  const [user, setUser] = useState(parsed?.user || null);

  const login = (authPayload) => {
    const next = {
      token: authPayload.token,
      user: authPayload.user
    };
    setToken(next.token);
    setUser(next.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), login, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
