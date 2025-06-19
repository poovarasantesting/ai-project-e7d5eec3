import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TEST_USERS } from "@/lib/auth";

export default function AdminPage() {
  const currentUser = getCurrentUser();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          Admin Access
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Registered user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{TEST_USERS.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Admins</CardTitle>
            <CardDescription>Administrative users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {TEST_USERS.filter(user => user.role === "admin").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Regular Users</CardTitle>
            <CardDescription>Standard user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {TEST_USERS.filter(user => user.role === "user").length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-md border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">User Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {TEST_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{user.id}</td>
                  <td className="px-4 py-3 text-sm">{user.name}</td>
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "admin" 
                        ? "bg-purple-100 text-purple-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}