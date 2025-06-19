import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Users, Settings, Database } from "lucide-react";

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user?.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <ShieldAlert className="h-6 w-6 text-red-500" />
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>
      
      <p className="text-lg mb-8">Welcome to the admin control panel. This area is restricted to administrators only.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage system users and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Test User Accounts:</p>
              <ul className="space-y-2">
                <li className="text-sm bg-white p-2 rounded border">
                  <div className="font-medium">Admin User</div>
                  <div className="text-gray-500">admin@example.com / admin123</div>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Admin
                  </span>
                </li>
                <li className="text-sm bg-white p-2 rounded border">
                  <div className="font-medium">Regular User</div>
                  <div className="text-gray-500">user@example.com / user123</div>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                    User
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Configuration
            </CardTitle>
            <CardDescription>Configure global application settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              This panel would normally contain system settings that only administrators can modify.
            </p>
            <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-md border border-yellow-100">
              <Database className="h-5 w-5" />
              <div className="text-sm">
                This is a demo admin panel with simulated functionality.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}