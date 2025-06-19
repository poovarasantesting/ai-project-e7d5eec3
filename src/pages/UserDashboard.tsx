import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut, FileText, Bell, BookOpen } from "lucide-react";

export default function UserDashboard() {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <User className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Logged in as <span className="font-medium text-blue-500">{currentUser?.username}</span></span>
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
              <CardTitle className="text-lg">My Documents</CardTitle>
              <CardDescription>Your saved documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-500">Documents</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                View Documents
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <CardDescription>Recent alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Bell className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-500">New notifications</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                View All
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Knowledge Base</CardTitle>
              <CardDescription>Help and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Access guides and tutorials</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                Browse Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}