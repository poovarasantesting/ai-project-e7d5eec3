import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuthStore } from '../store/authStore';

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      
      <h1 className="mb-2 text-3xl font-bold">Order Successful!</h1>
      <p className="mb-8 max-w-md text-gray-600">
        Thank you for your purchase! Your order has been processed successfully.
        You will receive a confirmation email shortly.
      </p>
      
      <div className="mb-8 w-full max-w-md rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
        <div className="mb-4 flex justify-between border-b pb-4">
          <span className="text-gray-600">Order ID</span>
          <span className="font-medium">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
        </div>
        <div className="mb-4 flex justify-between border-b pb-4">
          <span className="text-gray-600">Date</span>
          <span className="font-medium">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status</span>
          <span className="font-medium text-green-600">Confirmed</span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link to="/account">
          <Button variant="outline">View Your Account</Button>
        </Link>
        <Link to="/products">
          <Button>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}