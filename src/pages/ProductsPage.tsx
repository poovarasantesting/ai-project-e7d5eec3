import React, { useState, useEffect } from "react";
import { getProducts, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    
    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(allProducts.map(product => product.category))
    );
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(lowerSearchTerm) ||
          product.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search input */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        {/* Category filters */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Filter className="mr-2 h-4 w-4" />
            <h3 className="font-medium">Categories</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("")}
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
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}