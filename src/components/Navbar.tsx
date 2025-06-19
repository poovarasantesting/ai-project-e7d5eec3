import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">
            ShopEasy
          </Link>
          
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link to="/products" className="text-sm hover:text-primary">
              Products
            </Link>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/account">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => logout()}
                  className="hidden sm:inline-flex"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register" className="hidden sm:block">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}