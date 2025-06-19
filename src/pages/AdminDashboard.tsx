import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { LogOut, ShieldAlert, Users, AlertTriangle, Settings } from "lucide-react";

export default function AdminDashboard() {
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
      title: "Admin Logged out",
      description: "You have been successfully logged out from admin panel.",
    });
    navigate("/admin/login");
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div className="flex items-center">
          <ShieldAlert className="h-8 w-8 text-amber-500 mr-2" />
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome, admin@example.com</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Admin Status</CardTitle>
            <CardDescription>Administrator Access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShieldAlert className="h-8 w-8 text-amber-500 mr-2" />
              <span className="text-2xl font-bold">Full Access</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <CardDescription>Total User Accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">254</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            <CardDescription>Pending Notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-500 mr-2" />
              <span className="text-2xl font-bold">3</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Activity</CardTitle>
              <CardDescription>Latest actions by users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">user@example.com</span>
                    <span className="text-muted-foreground">2 minutes ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Logged in from 192.168.1.105</p>
                </div>
                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">john.doe@example.com</span>
                    <span className="text-muted-foreground">15 minutes ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Updated profile information</p>
                </div>
                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">sarah.smith@example.com</span>
                    <span className="text-muted-foreground">1 hour ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Created new account</p>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium">alex.johnson@example.com</span>
                    <span className="text-muted-foreground">3 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Password reset requested</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Admin Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  User Management
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  System Settings
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Security Logs
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Backup & Restore
                </Button>
                <Button className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50" variant="outline">
                  Emergency Controls
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}