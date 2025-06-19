import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState } from "@/types/auth";
import { toast } from "sonner";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Test users data
const TEST_USERS: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
  },
];

// Admin: admin@example.com / admin123
// User: user@example.com / user123
const TEST_CREDENTIALS = {
  "admin@example.com": "admin123",
  "user@example.com": "user123",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      isAuthenticated: !!storedUser,
    };
  });

  // Store user data in localStorage when it changes
  useEffect(() => {
    if (authState.user) {
      localStorage.setItem("user", JSON.stringify(authState.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [authState.user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check credentials against test data
    if (TEST_CREDENTIALS[email] === password) {
      const user = TEST_USERS.find(user => user.email === email);
      if (user) {
        setAuthState({
          user,
          isAuthenticated: true,
        });
        toast.success(`Welcome back, ${user.name}!`);
        return true;
      }
    }
    
    toast.error("Invalid email or password");
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};