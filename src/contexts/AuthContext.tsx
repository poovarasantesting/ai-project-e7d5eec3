import { createContext, useContext, useState, ReactNode } from "react";
import { User, AuthState } from "../types/auth";
import { users } from "../data/users";
import { toast } from "sonner";

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = (username: string, password: string): boolean => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setAuthState({
        isAuthenticated: true,
        user,
      });
      toast.success(`Welcome back, ${user.name}!`);
      return true;
    }
    
    toast.error("Invalid username or password");
    return false;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};