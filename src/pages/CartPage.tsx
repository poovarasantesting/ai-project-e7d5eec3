import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  getCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart, 
  getCartTotal, 
  CartItem 
} from "@/lib/cart";
import { isAuthenticated } from "@/lib/auth";
import { toast } from "sonner";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = getCart();
    setCartItems(items);
    setTotal(getCartTotal());
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
    loadCart();
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast.success("Item removed from cart");
    loadCart();
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
    loadCart();
  };

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      toast.error("Please log in to checkout");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    
    // In a real app, this would proceed to checkout
    toast.success("Order placed successfully!");
    clearCart();
    loadCart();
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products">
            <Button>
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Cart header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Subtotal</div>
            </div>
            
            {/* Cart items */}
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                  {/* Product details */}
                  <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden border mr-4">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link to={`/product/${item.product.id}`} className="font-medium hover:text-indigo-600">
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.product.category}
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-500 text-sm flex items-center mt-2 hover:text-red-700 md:hidden"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 md:text-center mb-4 md:mb-0">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>
                    ${item.product.price.toFixed(2)}
                  </div>
                  
                  {/* Quantity controls */}
                  <div className="md:col-span-2 md:text-center mb-4 md:mb-0">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Quantity:</div>
                    <div className="flex items-center md:justify-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="md:col-span-2 md:text-center flex justify-between items-center">
                    <div className="md:hidden text-sm text-gray-500">Subtotal:</div>
                    <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                    <button 
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-500 hidden md:flex items-center hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart actions */}
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
              <Link to="/products">
                <Button variant="outline" size="sm">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="border-t pt-2 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button 
              className="w-full"
              onClick={handleCheckout}
            >
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}