import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, requireAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const { toast } = useToast();
  
  // If not authenticated, redirect to login
  if (!requireAuth()) {
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
        <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h2 className="text-lg font-medium mb-2">User Information</h2>
          <p><span className="font-medium">Name:</span> {user?.name}</p>
          <p><span className="font-medium">Username:</span> {user?.username}</p>
          <p><span className="font-medium">Role:</span> {user?.role}</p>
          <p><span className="font-medium">ID:</span> {user?.id}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Actions</h2>
          <div className="space-y-2">
            <p>This is a protected user dashboard page. Only logged-in users can see this content.</p>
            {user?.role === 'admin' && (
              <div className="mt-2">
                <p className="text-blue-600">
                  As an admin, you can also access the <a href="/admin" className="underline">Admin Dashboard</a>.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <Button onClick={handleLogout} variant="outline" className="mt-4">
          Logout
        </Button>
      </div>
    </div>
  );
}