import { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

// Get cart from local storage
export function getCart(): CartItem[] {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Add product to cart
export function addToCart(product: Product, quantity: number = 1): CartItem[] {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
  
  if (existingItemIndex >= 0) {
    // Update quantity if product already in cart
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({ product, quantity });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

// Update quantity of a product in the cart
export function updateCartItemQuantity(productId: string, quantity: number): CartItem[] {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.product.id === productId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity;
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  return cart;
}

// Remove product from cart
export function removeFromCart(productId: string): CartItem[] {
  const cart = getCart().filter(item => item.product.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

// Clear cart
export function clearCart(): void {
  localStorage.removeItem("cart");
}

// Calculate total price of the cart
export function getCartTotal(): number {
  return getCart().reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}

// Get total number of items in cart
export function getCartItemCount(): number {
  return getCart().reduce((count, item) => count + item.quantity, 0);
}