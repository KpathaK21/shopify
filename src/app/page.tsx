import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Placeholder data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Minimalist Desk Lamp",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=266&auto=format&fit=crop",
    category: "Home Office",
    isFeatured: true,
    isNew: false,
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "Furniture",
    isFeatured: true,
    isNew: true,
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop",
    category: "Electronics",
    isFeatured: true,
    isNew: true,
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    category: "Electronics",
    isFeatured: true,
    isNew: false,
  },
];

// Placeholder data for categories
const categories = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1801&auto=format&fit=crop",
  },
  {
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container flex flex-col items-center text-center space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Your One-Stop E-commerce Solution
          </h1>
          <p className="text-muted-foreground max-w-[42rem] text-lg md:text-xl">
            Create, manage, and grow your online store with our powerful platform.
            Start selling your products online today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="font-medium">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="font-medium">
              <Link href="/dashboard">Create Your Store</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex flex-col space-y-6 md:space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
              <Button variant="ghost" className="gap-1 font-medium">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group">
                  <CardHeader className="p-0 relative aspect-square">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                      {product.isNew && (
                        <Badge className="absolute top-2 right-2">New</Badge>
                      )}
                    </Link>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">
                      {product.category}
                    </div>
                    <h3 className="font-medium mt-1">
                      <Link href={`/products/${product.id}`}>{product.name}</Link>
                    </h3>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <div className="font-semibold">${product.price}</div>
                    <Button size="sm" variant="ghost">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container">
          <div className="flex flex-col space-y-6 md:space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
              <Button variant="ghost" className="gap-1 font-medium">
                All Categories <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  key={category.name}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white text-xl font-medium">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="bg-primary/5 border rounded-2xl p-8 md:p-10 lg:p-12 flex flex-col items-center text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Ready to Start Your Online Business?</h2>
            <p className="text-muted-foreground max-w-[42rem]">
              Join thousands of entrepreneurs who have launched their online stores with ShopHub.
              Our platform provides everything you need to create, manage, and grow your e-commerce business.
            </p>
            <Button size="lg" className="font-medium mt-4">
              <Link href="/register">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
