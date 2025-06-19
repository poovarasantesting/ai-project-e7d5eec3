// Hard-coded user credentials for testing purposes
export const TEST_USERS = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    name: "Test User",
    role: "user",
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
];

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Mock authentication functions
export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = TEST_USERS.find(
        (u) => u.email === email && u.password === password
      );
      
      if (user) {
        // Omit password from returned user object
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        resolve(userWithoutPassword as User);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 500); // Simulate network delay
  });
};

export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('currentUser');
      resolve();
    }, 300);
  });
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    return JSON.parse(userJson) as User;
  }
  return null;
};

// Helper function to check if a user has admin privileges
export const isAdmin = (user: User | null): boolean => {
  return user?.role === "admin";
};