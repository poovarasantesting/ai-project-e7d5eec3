import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, ShoppingBag, CreditCard, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { useAuthStore } from '../store/authStore';

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Account</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal details</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p>{user.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p>{user.email}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/products')}>
              Start Shopping
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment options</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No payment methods saved yet.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}