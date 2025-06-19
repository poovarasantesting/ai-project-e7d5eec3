import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Check authentication
  useEffect(() => {
    const authUser = localStorage.getItem('authUser');
    if (!authUser) {
      navigate('/login');
      return;
    }
    
    const { role } = JSON.parse(authUser);
    if (role === 'admin') {
      navigate('/admin');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('authUser');
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>User Account</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You're logged in as a standard user. This is your personal dashboard.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
            <CardDescription>Recent actions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No recent activity to display.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Things you can do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full">View Profile</Button>
            <Button className="w-full" variant="outline">Update Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}