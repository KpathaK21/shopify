// Product types
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  ratings?: {
    average: number;
    count: number;
  };
  variants?: ProductVariant[];
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: number;
  name: string;
  options: {
    name: string;
    value: string;
  }[];
  price: number;
  stock: number;
  image?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'merchant';
  createdAt: string;
}

// Order types
export interface Order {
  id: number;
  userId: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  variantId?: number;
  variantName?: string;
  image: string;
}

export interface Address {
  id: number;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

// Cart types
export interface Cart {
  id: number;
  userId?: number;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  variantId?: number;
  variantName?: string;
  image: string;
}
