import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, isAuthenticated, logout, User } from "@/lib/auth";
import { toast } from "sonner";
import { UserCircle, LogOut, ShoppingBag } from "lucide-react";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    
    setUser(getCurrentUser());
  }, [navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out");
    navigate("/");
  };

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile section */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <UserCircle className="h-24 w-24 text-indigo-600" />
              </div>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div>{user.email}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Account ID</div>
                  <div>{user.id}</div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Account overview section */}
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Welcome back, <strong>{user.name}</strong>! This is a demo account page for our e-commerce website.
                </p>
                <p>
                  In a real application, you would see your order history, saved addresses, payment methods, and other account settings here.
                </p>
                <div className="flex justify-center mt-4">
                  <Button 
                    onClick={() => navigate("/products")}
                    className="flex items-center"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Order history section (demo) */}
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="mb-2">You haven't placed any orders yet.</p>
                <p className="text-sm">Your order history will appear here once you make a purchase.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}