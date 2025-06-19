import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { useCartStore } from '../store/cartStore';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    
    toast.success(`${product.name} added to cart`);
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="mb-1 font-semibold">{product.name}</h3>
        </Link>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}