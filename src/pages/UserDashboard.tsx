import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { LogOut, User, Clock, BarChart } from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <p className="text-muted-foreground">Welcome, user@example.com</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <CardDescription>User Level Access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">Active</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Time</CardTitle>
            <CardDescription>Local System Time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-500 mr-2" />
              <span className="text-2xl font-bold">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Activity Score</CardTitle>
            <CardDescription>Your Activity Level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-8 w-8 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">75%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <div className="flex justify-between">
                <span className="font-medium">Login</span>
                <span className="text-muted-foreground">Just now</span>
              </div>
              <p className="text-sm text-muted-foreground">Successful login from your current device</p>
            </div>
            <div className="border-b pb-2">
              <div className="flex justify-between">
                <span className="font-medium">Password Changed</span>
                <span className="text-muted-foreground">3 days ago</span>
              </div>
              <p className="text-sm text-muted-foreground">You updated your account password</p>
            </div>
            <div className="border-b pb-2">
              <div className="flex justify-between">
                <span className="font-medium">Profile Updated</span>
                <span className="text-muted-foreground">1 week ago</span>
              </div>
              <p className="text-sm text-muted-foreground">You updated your profile information</p>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="font-medium">Account Created</span>
                <span className="text-muted-foreground">1 month ago</span>
              </div>
              <p className="text-sm text-muted-foreground">Your account was created</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}