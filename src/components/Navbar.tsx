import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated, logout, getCurrentUser } from "@/lib/auth";
import { getCartItemCount } from "@/lib/cart";
import { toast } from "sonner";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);
    
    if (authStatus) {
      const user = getCurrentUser();
      setUserName(user?.name || "");
    }
    
    // Get cart count
    setCartCount(getCartItemCount());
    
    // Set up interval to periodically check cart count
    const interval = setInterval(() => {
      setCartCount(getCartItemCount());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserName("");
    toast.success("Successfully logged out");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">ShopEasy</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/products" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              Products
            </Link>
            
            <div className="flex items-center ml-4 space-x-2">
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <Link to="/account">
                    <Button variant="ghost" className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      {userName}
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <Link to="/cart" className="relative mr-2">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" onClick={toggleMenu} size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/account" 
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Button variant="outline" onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}>
                  Logout
                </Button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}