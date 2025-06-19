import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    );
  }
  
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
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          <p className="mb-4 text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Category</h2>
            <p className="text-gray-600 capitalize">{product.category}</p>
          </div>
          
          <Button 
            size="lg" 
            onClick={handleAddToCart}
            className="w-full md:w-auto"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Related Products section could be added here */}
    </div>
  );
}