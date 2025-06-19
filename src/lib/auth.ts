// Simple auth management with local storage
export interface User {
  id: string;
  name: string;
  email: string;
}

// Sample users
const DEMO_USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    password: "password123"
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123"
  }
];

export function login(email: string, password: string): User | null {
  // Find the user by email and password
  const user = DEMO_USERS.find(
    u => u.email === email && u.password === password
  );
  
  if (user) {
    // Store user data in localStorage (excluding password)
    const { password, ...userData } = user;
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  }
  
  return null;
}

export function logout(): void {
  localStorage.removeItem("user");
}

export function getCurrentUser(): User | null {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
}

export function isAuthenticated(): boolean {
  return !!getCurrentUser();
}