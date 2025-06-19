import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "@/lib/products";
import { addToCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShoppingCart, ChevronLeft, Plus, Minus } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(getProduct(id || ""));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/products" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden border">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-bold text-indigo-600 mb-4">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Category</h3>
            <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decreaseQuantity}
                disabled={quantity === 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 font-medium text-lg">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button 
            className="w-full"
            size="lg" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}