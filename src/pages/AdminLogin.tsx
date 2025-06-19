import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { Lock, ShieldAlert } from "lucide-react";

// Test admin credentials
const TEST_ADMIN = {
  email: "admin@example.com",
  password: "admin123"
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (email === TEST_ADMIN.email && password === TEST_ADMIN.password) {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard!",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Admin login failed",
          description: "Invalid admin credentials. Please try again.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
      <Card className="w-full max-w-md border-amber-500">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <ShieldAlert className="h-10 w-10 text-amber-500" />
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your admin credentials to access the control panel
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Test credentials: {TEST_ADMIN.email} / {TEST_ADMIN.password}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full mb-2 bg-amber-500 hover:bg-amber-600" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Admin Login"}
            </Button>
            <div className="text-sm text-center text-muted-foreground mt-2">
              Not an admin?{" "}
              <Link to="/login" className="text-primary underline-offset-4 hover:underline">
                User login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}