export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    description: "High-quality wireless headphones with noise cancellation technology.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "electronics"
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness, receive notifications, and more with this stylish smart watch.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    category: "electronics"
  },
  {
    id: "3",
    name: "Casual T-Shirt",
    description: "Comfortable cotton t-shirt, perfect for everyday wear.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    category: "clothing"
  },
  {
    id: "4",
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned soles for maximum comfort.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    category: "footwear"
  },
  {
    id: "5",
    name: "Stainless Steel Water Bottle",
    description: "Eco-friendly insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
    category: "accessories"
  },
  {
    id: "6",
    name: "Wireless Earbuds",
    description: "Compact wireless earbuds with crystal clear sound and long battery life.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop",
    category: "electronics"
  },
  {
    id: "7",
    name: "Denim Jacket",
    description: "Classic denim jacket that goes with everything in your wardrobe.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=1974&auto=format&fit=crop",
    category: "clothing"
  },
  {
    id: "8",
    name: "Backpack",
    description: "Durable backpack with multiple compartments, perfect for travel or daily use.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
    category: "accessories"
  }
];