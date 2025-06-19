import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Shield, User as UserIcon } from 'lucide-react';

export default function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700 mr-2 hidden sm:block">
              {user.name}
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <div className="mr-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500">{user.email}</span>
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {isAdmin ? 
                    <><Shield className="h-3 w-3 mr-1" /> Admin</> : 
                    <><UserIcon className="h-3 w-3 mr-1" /> User</>
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {isAdmin ? (
          <AdminDashboard />
        ) : (
          <UserDashboard />
        )}
      </main>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-2">User Management</h3>
          <p className="text-gray-500 text-sm mb-4">
            You have full access to manage users and their permissions.
          </p>
          <Button variant="outline">Manage Users</Button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-2">Content Management</h3>
          <p className="text-gray-500 text-sm mb-4">
            Create, edit, and publish content across the platform.
          </p>
          <Button variant="outline">Manage Content</Button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-2">System Settings</h3>
          <p className="text-gray-500 text-sm mb-4">
            Configure system-wide settings and parameters.
          </p>
          <Button variant="outline">Settings</Button>
        </div>
      </div>
    </div>
  );
}

function UserDashboard() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-2">Your Profile</h3>
          <p className="text-gray-500 text-sm mb-4">
            Manage your personal information and account settings.
          </p>
          <Button variant="outline">Edit Profile</Button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-2">Your Activity</h3>
          <p className="text-gray-500 text-sm mb-4">
            View your recent activity and interactions.
          </p>
          <Button variant="outline">View Activity</Button>
        </div>
      </div>
    </div>
  );
}