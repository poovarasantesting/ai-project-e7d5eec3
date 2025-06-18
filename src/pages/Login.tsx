import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Mock login logic
    if (isAdmin) {
      // Admin login
      if (email === "admin@example.com" && password === "admin123") {
        toast({
          title: "Success",
          description: "Admin login successful",
        });
        navigate("/admin-dashboard");
      } else {
        toast({
          title: "Error",
          description: "Invalid admin credentials",
          variant: "destructive",
        });
      }
    } else {
      // User login
      if (email.includes("@") && password.length >= 6) {
        toast({
          title: "Success",
          description: "User login successful",
        });
        navigate("/user-dashboard");
      } else {
        toast({
          title: "Error",
          description: "Invalid user credentials",
          variant: "destructive",
        });
      }
    }
  };

  const toggleLoginType = () => {
    setIsAdmin(!isAdmin);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isAdmin ? "Admin Login" : "User Login"}</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder={isAdmin ? "admin@example.com" : "user@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={toggleLoginType}>
            Switch to {isAdmin ? "User" : "Admin"} Login
          </Button>
          <Button variant="outline">Forgot Password?</Button>
        </CardFooter>
      </Card>
    </div>
  );
}