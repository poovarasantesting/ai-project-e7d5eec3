import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Simple mock login - in a real app, this would call an API
  const login = async (username: string, password: string) => {
    // For demo purposes, accept any non-empty username/password
    if (username.trim() && password.trim()) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser({
        id: '1',
        name: username
      });
      
      toast({
        title: "Login successful",
        description: `Welcome, ${username}!`,
      });
      
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Please enter valid credentials",
      variant: "destructive",
    });
    
    return false;
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}