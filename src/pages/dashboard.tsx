import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-lg mb-8">Welcome, {user.name}!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <UserIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs">
                  <span className="capitalize">{user.role}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Access</CardTitle>
            <CardDescription>Your current permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className={`h-5 w-5 ${user.role === 'admin' ? 'text-green-500' : 'text-gray-400'}`} />
                <div>
                  <h4 className="font-medium">Admin Dashboard</h4>
                  <p className="text-sm text-gray-500">
                    {user.role === 'admin' 
                      ? 'You have access to the admin panel'
                      : 'You do not have admin privileges'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className="font-medium">User Dashboard</h4>
                  <p className="text-sm text-gray-500">You have access to the user dashboard</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {user.role === 'admin' && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Admin Notice</h3>
          <p className="text-blue-700 text-sm">
            As an admin, you have access to additional features. Visit the Admin Panel to manage users and system settings.
          </p>
        </div>
      )}
    </div>
  );
}