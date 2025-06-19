import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export default function HomePage() {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                Shop the Latest Trends
              </h1>
              <p className="mb-6 text-lg text-gray-600">
                Discover high-quality products at affordable prices. Your one-stop
                destination for all your shopping needs.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products">
                  <Button size="lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                alt="Shopping"
                className="max-h-[400px] rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">Featured Products</h2>
            <Link to="/products" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            Shop by Category
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Link to="/products?category=electronics" className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop" 
                  alt="Electronics" 
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Electronics</h3>
              </div>
            </Link>
            
            <Link to="/products?category=clothing" className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
                  alt="Clothing" 
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Clothing</h3>
              </div>
            </Link>
            
            <Link to="/products?category=footwear" className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop" 
                  alt="Footwear" 
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Footwear</h3>
              </div>
            </Link>
            
            <Link to="/products?category=accessories" className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=2064&auto=format&fit=crop" 
                  alt="Accessories" 
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Accessories</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6 mx-auto max-w-xl text-primary-foreground/90">
            Stay updated with our latest products and exclusive offers.
          </p>
          <div className="mx-auto flex max-w-md flex-col items-center space-y-4 sm:flex-row sm:space-x-2 sm:space-y-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border-0 bg-white/10 px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}