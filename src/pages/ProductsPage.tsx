import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { products as allProducts } from '../data/products';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(allProducts.map(product => product.category)));
  
  // Filter products when category changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    setSelectedCategory(categoryParam);
    
    if (categoryParam) {
      setProducts(allProducts.filter(product => product.category === categoryParam));
    } else {
      setProducts(allProducts);
    }
  }, [searchParams]);
  
  const handleCategoryChange = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">All Products</h1>
      
      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-medium">Filter by Category</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(null)}
          >
            All
          </Button>
          
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}