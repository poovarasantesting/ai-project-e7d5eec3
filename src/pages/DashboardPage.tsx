import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const currentUser = getCurrentUser();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Name:</span> {currentUser?.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {currentUser?.email}
              </div>
              <div>
                <span className="font-medium">Role:</span> {currentUser?.role}
              </div>
              <div>
                <span className="font-medium">ID:</span> {currentUser?.id}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span>Active</span>
              </div>
              <p className="text-gray-600">
                Your account is in good standing. You have full access to all user features.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white p-4 rounded-md border">
          <p className="text-gray-500 italic">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
}