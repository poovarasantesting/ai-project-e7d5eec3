import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };
  
  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from cart`);
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    
    toast.success("Order placed successfully!");
    clearCart();
    navigate('/checkout-success');
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <h1 className="mb-4 text-2xl font-bold">Your Cart is Empty</h1>
        <p className="mb-8 text-gray-600">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Shopping Cart</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border">
            <div className="p-4 border-b hidden sm:block">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <h3 className="font-semibold">Product</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-semibold">Price</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-semibold">Quantity</h3>
                </div>
                <div className="col-span-2 text-right">
                  <h3 className="font-semibold">Subtotal</h3>
                </div>
              </div>
            </div>
            
            {items.map(item => (
              <div key={item.id} className="p-4 border-b">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                  <div className="col-span-6 flex items-center space-x-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">
                        <Link to={`/products/${item.id}`} className="hover:text-primary">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 sm:hidden">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-span-2 hidden items-center justify-center sm:flex">
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border rounded">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-between sm:justify-end">
                    <span className="sm:pr-8">${(item.price * item.quantity).toFixed(2)}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
            >
              Clear Cart
            </Button>
          </div>
        </div>
        
        <div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="mt-6 w-full"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            
            <div className="mt-4 text-center">
              <Link to="/products" className="text-sm text-primary hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}