export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Sample product data
export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness and stay connected with this sleek smartwatch.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Soft, comfortable t-shirt made from 100% organic cotton.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop",
    category: "Clothing"
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1627123423350-39d5f0bf220b?q=80&w=500&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: "5",
    name: "Ceramic Coffee Mug",
    description: "Elegant ceramic mug that keeps your coffee warm longer.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=500&auto=format&fit=crop",
    category: "Home"
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with amazing sound quality.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=500&auto=format&fit=crop",
    category: "Electronics"
  }
];

export function getProducts(): Product[] {
  return products;
}

export function getProduct(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}