import { Product, User, Order, Cart, Category } from './types';

export const products: Product[] = [];

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "customer",
    createdAt: "2023-01-15T00:00:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "customer",
    createdAt: "2023-02-20T00:00:00Z"
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2022-12-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Merchant One",
    email: "merchant1@example.com",
    role: "merchant",
    createdAt: "2023-03-10T00:00:00Z"
  }
];

export const categories: Category[] = [];

// Cart sample
export const sampleCart: Cart = {
  id: 1,
  userId: 1,
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0
};
