import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

// Mock users for demo
const MOCK_USERS = [
  { id: "1", email: "admin@example.com", password: "admin123", name: "Admin User", role: "admin" as const },
  { id: "2", email: "user@example.com", password: "user123", name: "Regular User", role: "user" as const }
];

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    }
    
    toast.error("Invalid email or password");
    return false;
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error("User with this email already exists");
      return false;
    }
    
    // In a real app, you would create the user in the database
    // For this demo, we'll just log in the user with "user" role
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: "user" as const
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    toast.success("Registration successful!");
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("You have been logged out");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
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