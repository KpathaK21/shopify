"use client";

import Image from "next/image";
import Link from "next/link";
import { products, categories } from "@/lib/mock-data";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/types";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProductsPage() {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">Browse our collection of high-quality products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="hidden lg:block space-y-6">
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Add a product to see categories here.</p>
                ) : (
                  categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Link
                        href={`/categories/${category.slug}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {category.name}
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Link
                    href="/products?price=under-50"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Under $50
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link
                    href="/products?price=50-100"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    $50 - $100
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link
                    href="/products?price=100-200"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    $100 - $200
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link
                    href="/products?price=over-200"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Over $200
                  </Link>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-4">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Link
                    href="/products?availability=in-stock"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    In Stock
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link
                    href="/products?availability=on-sale"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    On Sale
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="lg:col-span-3">
            <div className="flex flex-col space-y-6">
              {/* Sort and Filter toolbar */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {products.length} products
                </p>
                <div className="flex items-center gap-4">
                  <div className="lg:hidden">
                    <Button variant="outline" size="sm">Filters</Button>
                  </div>
                  <select
                    className="text-sm border rounded-md py-1.5 px-3 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    defaultValue="newest"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>

              {/* Products grid */}
              {products.length === 0 ? (
                <Card className="p-8 md:p-10">
                  <div className="flex flex-col gap-4 text-center items-center">
                    <h2 className="text-2xl font-semibold">No products available yet</h2>
                    <p className="text-muted-foreground max-w-2xl">
                      Your storefront is empty so customers will not see any items here until you add a real product. Follow these steps to list your first item.
                    </p>
                    <div className="text-left w-full max-w-2xl space-y-3">
                      <h3 className="font-medium">How to add a product</h3>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Prepare your product details: name, price, slug/URL handle, description, and at least one image URL.</li>
                        <li>Open <code>backend/main.go</code> and add a new entry to the <code>products</code> slice with your real details, images, and stock level; restart the Go server if it is running.</li>
                        <li>If you are using the static frontend data, add the same product object to <code>src/lib/mock-data.ts</code> so the Next.js pages render it.</li>
                        <li>Refresh the site; the new product will appear here and on the homepage.</li>
                      </ol>
                    </div>
                    <Button asChild size="lg">
                      <Link href="/contact">Need help? Contact us</Link>
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden group">
                      <CardHeader className="p-0 relative aspect-square">
                        <Link href={`/products/${product.slug}`}>
                          <div className="relative w-full h-full overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          </div>
                          {product.isNew && (
                            <Badge className="absolute top-2 right-2">New</Badge>
                          )}
                          {product.compareAtPrice && (
                            <Badge variant="outline" className="absolute top-2 left-2 bg-background text-foreground">
                              Sale
                            </Badge>
                          )}
                        </Link>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">
                          {product.category}
                        </div>
                        <h3 className="font-medium mt-1 line-clamp-1">
                          <Link href={`/products/${product.slug}`}>{product.name}</Link>
                        </h3>
                        {product.ratings && (
                          <div className="flex items-center mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.round(product.ratings?.average || 0)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground ml-1">
                              ({product.ratings.count})
                            </span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="font-semibold">
                          {product.compareAtPrice ? (
                            <div className="flex gap-2 items-center">
                              <span>${product.price}</span>
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.compareAtPrice}
                              </span>
                            </div>
                          ) : (
                            <span>${product.price}</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <Button variant="outline" size="icon" disabled>
                    <span className="sr-only">Previous</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm" className="font-medium h-8 w-8 p-0">
                    1
                  </Button>
                  <Button variant="ghost" size="sm" className="font-medium text-muted-foreground h-8 w-8 p-0">
                    2
                  </Button>
                  <Button variant="ghost" size="sm" className="font-medium text-muted-foreground h-8 w-8 p-0">
                    3
                  </Button>
                  <span className="px-2 text-muted-foreground">...</span>
                  <Button variant="ghost" size="sm" className="font-medium text-muted-foreground h-8 w-8 p-0">
                    8
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Next</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
