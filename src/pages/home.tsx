import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Authentication Demo</h1>
        <p className="text-xl mb-8">
          A simple authentication system with user and admin roles.
        </p>

        {isAuthenticated ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-green-800">
              <p className="font-medium">You are logged in as {user?.name}</p>
              <p className="text-sm">Role: {user?.role}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
              
              {user?.role === "admin" && (
                <Button asChild variant="outline" size="lg">
                  <Link to="/admin">Admin Panel</Link>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="mb-6">
              This demo includes test accounts for both admin and regular user roles.
            </p>
            
            <Button asChild size="lg">
              <Link to="/login">Sign In</Link>
            </Button>
            
            <div className="pt-6 border-t mt-6">
              <h2 className="text-lg font-medium mb-2">Test Credentials</h2>
              <div className="grid gap-3 md:grid-cols-2 text-sm">
                <div className="border rounded-md p-3">
                  <p className="font-medium">Admin Account</p>
                  <p>Email: admin@example.com</p>
                  <p>Password: admin123</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="font-medium">User Account</p>
                  <p>Email: user@example.com</p>
                  <p>Password: user123</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}