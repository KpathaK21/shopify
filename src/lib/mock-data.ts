import { Product, User, Order, Cart } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Minimalist Desk Lamp",
    slug: "minimalist-desk-lamp",
    description: "A sleek, adjustable desk lamp with touch controls and multiple brightness settings. Perfect for your home office or study area.",
    price: 89.99,
    compareAtPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=266&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534115509038-2c01d01f3922?q=80&w=1887&auto=format&fit=crop",
    ],
    category: "Home Office",
    tags: ["lighting", "desk", "home office", "minimalist"],
    stock: 45,
    ratings: {
      average: 4.7,
      count: 28
    },
    isFeatured: true,
    isNew: false,
    createdAt: "2023-09-15T00:00:00Z",
    updatedAt: "2023-09-15T00:00:00Z"
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    description: "High-quality ergonomic chair with lumbar support, adjustable height, and breathable mesh back. Designed for comfort during long work hours.",
    price: 249.99,
    compareAtPrice: 299.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=2000&auto=format&fit=crop",
    ],
    category: "Furniture",
    tags: ["chair", "office", "ergonomic", "furniture"],
    stock: 18,
    ratings: {
      average: 4.9,
      count: 42
    },
    isFeatured: true,
    isNew: true,
    createdAt: "2023-10-05T00:00:00Z",
    updatedAt: "2023-10-05T00:00:00Z"
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    slug: "wireless-earbuds",
    description: "Premium wireless earbuds with active noise cancellation, crystal-clear sound, and long battery life. Includes wireless charging case.",
    price: 129.99,
    compareAtPrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1889&auto=format&fit=crop",
    ],
    category: "Electronics",
    tags: ["earbuds", "audio", "wireless", "music"],
    stock: 62,
    ratings: {
      average: 4.5,
      count: 107
    },
    isFeatured: true,
    isNew: true,
    createdAt: "2023-11-01T00:00:00Z",
    updatedAt: "2023-11-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Smart Watch",
    slug: "smart-watch",
    description: "Feature-packed smartwatch with health monitoring, notifications, GPS, and a vibrant touchscreen display. Compatible with iOS and Android.",
    price: 199.99,
    compareAtPrice: 229.99,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1772&auto=format&fit=crop",
    ],
    category: "Electronics",
    tags: ["smart watch", "wearable", "fitness", "tech"],
    stock: 27,
    ratings: {
      average: 4.6,
      count: 89
    },
    isFeatured: true,
    isNew: false,
    createdAt: "2023-08-15T00:00:00Z",
    updatedAt: "2023-08-15T00:00:00Z"
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    slug: "portable-bluetooth-speaker",
    description: "Waterproof Bluetooth speaker with 360° sound, 20-hour battery life, and durable design. Perfect for outdoor activities and parties.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1964&auto=format&fit=crop",
    ],
    category: "Electronics",
    tags: ["speaker", "bluetooth", "audio", "portable"],
    stock: 35,
    ratings: {
      average: 4.4,
      count: 53
    },
    isFeatured: false,
    isNew: true,
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2023-12-01T00:00:00Z"
  },
  {
    id: 6,
    name: "Leather Laptop Sleeve",
    slug: "leather-laptop-sleeve",
    description: "Handcrafted genuine leather sleeve for laptops up to 15 inches. Features a soft microfiber lining and magnetic closure.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1495465798138-718f86d1a4bc?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547043736-b2247cb88ff7?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "Accessories",
    tags: ["laptop", "sleeve", "leather", "accessories"],
    stock: 42,
    ratings: {
      average: 4.8,
      count: 19
    },
    isFeatured: false,
    isNew: false,
    createdAt: "2023-07-10T00:00:00Z",
    updatedAt: "2023-07-10T00:00:00Z"
  },
  {
    id: 7,
    name: "Smart Home Security Camera",
    slug: "smart-home-security-camera",
    description: "HD security camera with night vision, motion detection, and two-way audio. Connects to your smartphone for real-time monitoring.",
    price: 119.99,
    compareAtPrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626426775115-b9c1b93877b7?q=80&w=1964&auto=format&fit=crop",
    ],
    category: "Smart Home",
    tags: ["security", "camera", "smart home", "wifi"],
    stock: 23,
    ratings: {
      average: 4.3,
      count: 37
    },
    isFeatured: false,
    isNew: false,
    createdAt: "2023-09-20T00:00:00Z",
    updatedAt: "2023-09-20T00:00:00Z"
  },
  {
    id: 8,
    name: "Minimalist Wall Clock",
    slug: "minimalist-wall-clock",
    description: "Silent wall clock with a clean, modern design. Features a non-ticking mechanism and is perfect for living rooms, offices, or bedrooms.",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1488991975158-0bb365999a3c?q=80&w=1949&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554926272-866d7738ca1c?q=80&w=1974&auto=format&fit=crop",
    ],
    category: "Home Decor",
    tags: ["clock", "wall", "minimalist", "decor"],
    stock: 55,
    ratings: {
      average: 4.7,
      count: 24
    },
    isFeatured: false,
    isNew: false,
    createdAt: "2023-06-05T00:00:00Z",
    updatedAt: "2023-06-05T00:00:00Z"
  },
];

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

export const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1801&auto=format&fit=crop",
    description: "Latest gadgets and electronic devices"
  },
  {
    id: 2,
    name: "Clothing",
    slug: "clothing",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
    description: "Fashion and apparel for all seasons"
  },
  {
    id: 3,
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
    description: "Everything for your home"
  },
  {
    id: 4,
    name: "Furniture",
    slug: "furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    description: "Stylish and functional furniture"
  },
  {
    id: 5,
    name: "Home Office",
    slug: "home-office",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=2070&auto=format&fit=crop",
    description: "Create your perfect workspace"
  },
  {
    id: 6,
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1611923134239-2cbe6c8a1c9a?q=80&w=2070&auto=format&fit=crop",
    description: "Complete your look with accessories"
  },
  {
    id: 7,
    name: "Smart Home",
    slug: "smart-home",
    image: "https://images.unsplash.com/photo-1558002038-2a738451c364?q=80&w=2070&auto=format&fit=crop",
    description: "Make your home smarter with technology"
  },
  {
    id: 8,
    name: "Home Decor",
    slug: "home-decor",
    image: "https://images.unsplash.com/photo-1615800002234-05c4d488696c?q=80&w=2070&auto=format&fit=crop",
    description: "Decorate your space with style"
  },
];

// Cart sample
export const sampleCart: Cart = {
  id: 1,
  userId: 1,
  items: [
    {
      id: 1,
      productId: 1,
      name: "Minimalist Desk Lamp",
      price: 89.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=266&auto=format&fit=crop",
    },
    {
      id: 2,
      productId: 3,
      name: "Wireless Earbuds",
      price: 129.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop",
    }
  ],
  subtotal: 349.97,
  tax: 28.00,
  shipping: 15.00,
  total: 392.97
};
