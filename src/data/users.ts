import { User } from "../types/auth";

export const users: User[] = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Admin User"
  },
  {
    id: 2,
    username: "john",
    password: "pass123",
    role: "user",
    name: "John Smith"
  },
  {
    id: 3,
    username: "sarah",
    password: "pass456",
    role: "user",
    name: "Sarah Johnson"
  }
];