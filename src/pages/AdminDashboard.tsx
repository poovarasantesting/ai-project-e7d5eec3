import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, LogOut, Users } from "lucide-react";

export default function AdminDashboard() {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    
    if (currentUser?.role !== "admin") {
      navigate("/user");
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!isAuthenticated || currentUser?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Logged in as <span className="font-medium text-indigo-600">{currentUser.username}</span></span>
            <Button variant="outline" onClick={logout} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Users</CardTitle>
              <CardDescription>Manage system users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-gray-500">Total users</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Analytics</CardTitle>
              <CardDescription>System performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-20 flex items-center justify-center">
                <p className="text-sm text-gray-500">Analytics dashboard coming soon</p>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Settings</CardTitle>
              <CardDescription>System configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-20 flex items-center justify-center">
                <p className="text-sm text-gray-500">Manage system settings</p>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                Configure
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}