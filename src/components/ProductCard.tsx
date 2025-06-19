import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";
import { addToCart } from "@/lib/cart";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-lg">{product.name}</CardTitle>
        </CardHeader>
      </Link>
      <CardContent className="p-4">
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-2 font-bold text-lg">${product.price.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}