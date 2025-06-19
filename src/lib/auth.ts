// Simple authentication store and utilities
import { create } from 'zustand';

// Define user types and roles
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

// Mock database of users
export const USERS: User[] = [
  {
    id: '1',
    username: 'user',
    role: 'user',
    name: 'Regular User'
  },
  {
    id: '2',
    username: 'admin',
    role: 'admin',
    name: 'Admin User'
  }
];

// Test credentials - in a real app, passwords would be hashed
const TEST_CREDENTIALS = {
  user: { username: 'user', password: 'password123' },
  admin: { username: 'admin', password: 'admin123' }
};

// Authentication store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (username: string, password: string) => {
    // Check for user credentials
    if (
      username === TEST_CREDENTIALS.user.username && 
      password === TEST_CREDENTIALS.user.password
    ) {
      set({ user: USERS[0], isAuthenticated: true });
      return true;
    }
    
    // Check for admin credentials
    if (
      username === TEST_CREDENTIALS.admin.username && 
      password === TEST_CREDENTIALS.admin.password
    ) {
      set({ user: USERS[1], isAuthenticated: true });
      return true;
    }
    
    return false;
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));

// Auth protection utility
export function requireAuth(role?: UserRole) {
  const { user, isAuthenticated } = useAuthStore.getState();
  
  if (!isAuthenticated || !user) {
    return false;
  }
  
  if (role && user.role !== role) {
    return false;
  }
  
  return true;
}