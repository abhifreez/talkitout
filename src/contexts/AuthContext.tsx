import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AuthContextType, AuthUser, LoginCredentials } from '@/types/admin';
import { authApi } from '@/services/api';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'auth_token';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      
      if (token) {
        try {
          const response = await authApi.validateToken(token);
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            localStorage.removeItem(AUTH_TOKEN_KEY);
          }
        } catch (error) {
          console.error('Auth validation error:', error);
          localStorage.removeItem(AUTH_TOKEN_KEY);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        toast.success('Login successful!');
      } else {
        toast.error(response.error || 'Login failed');
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    toast.info('Logged out successfully');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
