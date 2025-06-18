import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Bell, 
  LogOut 
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Admin has been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
                <Users className="mr-3 h-5 w-5" />
                Users
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
                <BarChart3 className="mr-3 h-5 w-5" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
                <FileText className="mr-3 h-5 w-5" />
                Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Button>
            </div>
          </nav>
        </div>
        <div className="p-4">
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={handleLogout} className="md:hidden">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-100">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h2 className="text-lg font-medium text-gray-900">Overview</h2>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Stats grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                        <p className="text-3xl font-semibold text-gray-900">1,254</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Active Sessions</p>
                        <p className="text-3xl font-semibold text-gray-900">432</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                        <Bell className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Notifications</p>
                        <p className="text-3xl font-semibold text-gray-900">42</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Reports</p>
                        <p className="text-3xl font-semibold text-gray-900">15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User table */}
              <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Users</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest registered users in the system</p>
                  </div>
                  <Button>Add User</Button>
                </div>
                <div className="border-t border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          { id: 1, name: "Jane Cooper", email: "jane.cooper@example.com", status: "Active" },
                          { id: 2, name: "Cody Fisher", email: "cody.fisher@example.com", status: "Inactive" },
                          { id: 3, name: "Esther Howard", email: "esther.howard@example.com", status: "Active" },
                          { id: 4, name: "Cameron Williamson", email: "cameron.williamson@example.com", status: "Active" },
                          { id: 5, name: "Brooklyn Simmons", email: "brooklyn.simmons@example.com", status: "Inactive" },
                        ].map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="destructive" size="sm">Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}