import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

type UserRole = 'user' | 'admin';

// Test credentials
const TEST_CREDENTIALS = {
  admin: {
    email: 'admin@example.com',
    password: 'admin123'
  },
  user: {
    email: 'user@example.com',
    password: 'user123'
  }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const credentials = role === 'admin' ? TEST_CREDENTIALS.admin : TEST_CREDENTIALS.user;
    
    if (email === credentials.email && password === credentials.password) {
      // Store login info in localStorage
      localStorage.setItem('authUser', JSON.stringify({ email, role }));
      
      toast({
        title: "Login successful",
        description: `Welcome ${role === 'admin' ? 'Administrator' : 'User'}!`,
      });
      
      // Redirect based on role
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="user" onValueChange={(value) => setRole(value as UserRole)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="user@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-blue-500 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-xs text-gray-500">
                  <p>Test credentials:</p>
                  <p>Email: user@example.com</p>
                  <p>Password: user123</p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" className="w-full">Sign In</Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="admin">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    placeholder="admin@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input 
                    id="admin-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-xs text-gray-500">
                  <p>Test credentials:</p>
                  <p>Email: admin@example.com</p>
                  <p>Password: admin123</p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" className="w-full">Admin Sign In</Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}