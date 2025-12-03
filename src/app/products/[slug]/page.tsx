"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/mock-data";
import { useCart } from "@/lib/cart";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Share2, Heart, ShoppingCart } from "lucide-react";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // If product not found
  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground mb-6">
          The product you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-foreground">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-foreground">Products</Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/categories/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-foreground"
              >
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.isNew && (
                <Badge className="absolute top-2 right-2">New</Badge>
              )}
              {product.compareAtPrice && (
                <Badge variant="outline" className="absolute top-2 left-2 bg-background text-foreground">
                  Sale
                </Badge>
              )}
            </div>

            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-auto pb-1">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md
                      ${activeImage === index ? "ring-2 ring-primary" : "ring-1 ring-border"}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>

              {/* Ratings */}
              {product.ratings && (
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
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
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.ratings.average} out of 5 ({product.ratings.count} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mt-4">
                {product.compareAtPrice ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <span className="text-muted-foreground line-through">${product.compareAtPrice}</span>
                    <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      Save ${(product.compareAtPrice - product.price).toFixed(2)}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-2xl font-bold">${product.price}</span>
                )}
              </div>

              {/* Availability */}
              <div className="mt-2 text-sm">
                {product.stock > 0 ? (
                  <span className="text-green-600 dark:text-green-400">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>

            <Separator />

            {/* Short description */}
            <div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Add to cart */}
            <div className="flex flex-col space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none border-r"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="px-4 py-2 w-12 text-center font-medium">
                    {quantity}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10 rounded-none border-l"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 gap-2"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Heart className="h-4 w-4" />
                  Save to Wishlist
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Additional info */}
            <div className="flex flex-col space-y-3">
              <div className="grid grid-cols-2">
                <span className="text-sm text-muted-foreground">SKU:</span>
                <span className="text-sm">PROD-{product.id.toString().padStart(6, '0')}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm">
                  <Link
                    href={`/categories/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:underline"
                  >
                    {product.category}
                  </Link>
                </span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-sm text-muted-foreground">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/products?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm hover:underline"
                    >
                      {tag}
                      {tag !== product.tags[product.tags.length - 1] && ", "}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product tabs (description, reviews, etc) - simplified for now */}
        <div className="mt-8 border-t pt-8">
          <div className="flex border-b">
            <button className="px-4 py-2 font-medium border-b-2 border-primary">
              Description
            </button>
            <button className="px-4 py-2 text-muted-foreground hover:text-foreground">
              Reviews ({product.ratings?.count || 0})
            </button>
            <button className="px-4 py-2 text-muted-foreground hover:text-foreground">
              Shipping
            </button>
          </div>

          <div className="py-6">
            <p>{product.description}</p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eu lorem et ultricies.
              In porta lorem at dui semper, non ultrices velit varius. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia curae; Donec at nulla commodo, finibus
              nisl non, vestibulum turpis.
            </p>
            <p className="mt-4">
              Suspendisse potenti. Fusce vitae diam maximus, pulvinar dui eget, imperdiet purus.
              Aliquam efficitur dignissim nibh, vel mollis quam tincidunt at. Nullam eleifend nisl eget
              ante sagittis cursus. Proin ultrices metus non eros egestas cursus.
            </p>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
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
                    </Link>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">
                      {product.category}
                    </div>
                    <h3 className="font-medium mt-1 line-clamp-1">
                      <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <div className="font-semibold">${product.price}</div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addItem(product, 1)}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
