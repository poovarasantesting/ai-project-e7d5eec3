import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user data on component mount
    const storedUser = localStorage.getItem("chatAppUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    // This is a simple simulation - in a real app, you'd call an API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation - in a real app, you'd verify against a backend
        if (password.length >= 6) {
          const user = { username };
          localStorage.setItem("chatAppUser", JSON.stringify(user));
          setUser(user);
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("chatAppUser");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}