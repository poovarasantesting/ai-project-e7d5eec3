import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* User stats card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Your Activity</h3>
                  <div className="mt-5">
                    <dl className="grid grid-cols-1 gap-5">
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Last Login</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                          {new Date().toLocaleString()}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Completed Tasks</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">12</dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Messages</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0">3 new</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Quick actions card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                  <div className="mt-5 space-y-3">
                    <Button className="w-full">View Profile</Button>
                    <Button variant="outline" className="w-full">Update Settings</Button>
                    <Button variant="secondary" className="w-full">Download Reports</Button>
                  </div>
                </div>
              </div>

              {/* Recent notifications card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Recent Notifications</h3>
                  <div className="mt-5 space-y-4">
                    <div className="border-l-4 border-green-500 pl-3 py-2">
                      <p className="text-sm text-gray-700">Your profile was updated successfully</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-3 py-2">
                      <p className="text-sm text-gray-700">New message from admin</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3 py-2">
                      <p className="text-sm text-gray-700">Please complete your profile</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}