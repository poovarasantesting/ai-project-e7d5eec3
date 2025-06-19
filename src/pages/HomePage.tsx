import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Shield, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getProducts().slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop the Latest Trends</h1>
              <p className="text-lg mb-6">
                Discover our curated collection of premium products at amazing prices.
                Fast shipping and excellent customer service guaranteed.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" 
                alt="Shopping" 
                className="rounded-lg shadow-lg w-full max-h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">
                All our products are carefully selected to ensure the highest quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your products delivered to your doorstep quickly and reliably.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Shop with confidence with our secure payment processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link to="/products">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
          <p className="text-lg mb-8">
            Join thousands of satisfied customers and experience our quality products today.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              Browse Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}