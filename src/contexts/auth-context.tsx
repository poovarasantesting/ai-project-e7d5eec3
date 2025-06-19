import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, UserRole } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

// Define test users
const TEST_USERS = {
  admin: {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  },
  user: {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Regular+User&background=27AE60&color=fff',
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
            error: null,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: "Failed to restore auth state",
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check admin credentials
      if (email === TEST_USERS.admin.email && password === TEST_USERS.admin.password) {
        const { password: _, ...adminUser } = TEST_USERS.admin;
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        setAuthState({
          isAuthenticated: true,
          user: adminUser,
          loading: false,
          error: null,
        });
        toast({
          title: "Welcome Admin",
          description: "You have successfully logged in as an admin",
        });
        return true;
      }
      
      // Check regular user credentials
      if (email === TEST_USERS.user.email && password === TEST_USERS.user.password) {
        const { password: _, ...regularUser } = TEST_USERS.user;
        localStorage.setItem('currentUser', JSON.stringify(regularUser));
        setAuthState({
          isAuthenticated: true,
          user: regularUser,
          loading: false,
          error: null,
        });
        toast({
          title: "Welcome",
          description: "You have successfully logged in",
        });
        return true;
      }

      // Invalid credentials
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: "Invalid email or password",
      }));
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid email or password",
      });
      return false;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: "Login failed",
      }));
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};