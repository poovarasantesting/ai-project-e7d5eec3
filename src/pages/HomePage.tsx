import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export default function HomePage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Auth Demo</h1>
        <p className="text-xl text-gray-600 mb-8">
          A demonstration of user and admin authentication with protected routes
        </p>
        
        {currentUser ? (
          <Card className="mb-8 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <p className="mb-4">
                You are currently logged in as <strong>{currentUser.name}</strong> ({currentUser.role})
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => navigate(isAdmin(currentUser) ? "/admin" : "/dashboard")}
                >
                  Go to {isAdmin(currentUser) ? "Admin Panel" : "Dashboard"}
                </Button>
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Change Account
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="mb-4">
                Please log in to access the dashboard
              </p>
              <Button onClick={() => navigate("/login")}>
                Login
              </Button>
            </CardContent>
          </Card>
        )}
        
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-2">User Account</h2>
            <p className="text-gray-600 mb-4">
              Regular user accounts have access to the user dashboard.
            </p>
            <div className="text-sm bg-gray-100 p-3 rounded mb-2">
              <div><strong>Email:</strong> user@example.com</div>
              <div><strong>Password:</strong> password123</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Admin Account</h2>
            <p className="text-gray-600 mb-4">
              Admin accounts have access to the admin panel and user dashboard.
            </p>
            <div className="text-sm bg-gray-100 p-3 rounded mb-2">
              <div><strong>Email:</strong> admin@example.com</div>
              <div><strong>Password:</strong> admin123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}