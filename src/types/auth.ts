export interface User {
  id: number;
  username: string;
  password: string;
  role: "admin" | "user";
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}