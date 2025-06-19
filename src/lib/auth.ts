import { atom } from "jotai";

export interface User {
  id: string;
  username: string;
  role: "user" | "admin";
}

// Test credentials
export const TEST_USERS = [
  { username: "user", password: "password", id: "1", role: "user" },
  { username: "admin", password: "admin123", id: "2", role: "admin" },
];

// Auth atom to store the current user
export const userAtom = atom<User | null>(null);

// Login function
export const login = (username: string, password: string): User | null => {
  const user = TEST_USERS.find(
    (u) => u.username === username && u.password === password
  );
  
  if (user) {
    return {
      id: user.id,
      username: user.username,
      role: user.role as "user" | "admin",
    };
  }
  
  return null;
};

// Logout function
export const logout = () => {
  return null;
};