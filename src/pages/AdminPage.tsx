import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, requireAuth, USERS } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { user, logout } = useAuthStore();
  const { toast } = useToast();
  
  // Check if user is authenticated and has admin role
  if (!requireAuth('admin')) {
    // If user is authenticated but not admin, go to dashboard
    if (requireAuth()) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You don't have permission to access the admin area.",
      });
      return <Navigate to="/dashboard" />;
    }
    // Otherwise go to login
    return <Navigate to="/login" />;
  }
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h2 className="text-lg font-medium mb-2">Admin Information</h2>
          <p><span className="font-medium">Name:</span> {user?.name}</p>
          <p><span className="font-medium">Username:</span> {user?.username}</p>
          <p><span className="font-medium">Role:</span> {user?.role}</p>
          <p><span className="font-medium">ID:</span> {user?.id}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">User Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {USERS.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Admin Controls</h2>
          <p className="mb-2">This is a protected admin area. Only users with admin role can access this page.</p>
          <Button 
            onClick={() => toast({
              title: "Admin Action",
              description: "You triggered an admin-only action!",
            })}
            className="mr-2"
          >
            Admin Action
          </Button>
          <Button variant="outline" onClick={handleLogout} className="mt-4">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}