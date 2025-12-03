import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteDescription, siteName, siteTagline } from "@/lib/site-info";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container flex flex-col items-center text-center space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Welcome to {siteName}
          </h1>
          <p className="text-muted-foreground max-w-[42rem] text-lg md:text-xl">
            {siteDescription}
            {" "}
            {siteTagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="font-medium">
              <Link href="/products">Shop My Collection</Link>
            </Button>
            <Button size="lg" variant="outline" className="font-medium">
              <Link href="/contact">Ask About Custom Orders</Link>
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
                <Button variant="ghost" className="gap-1 font-medium" disabled>
                  Browse Everything <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <Card className="p-6 md:p-8 flex flex-col items-center text-center space-y-4">
                <ClipboardList className="h-10 w-10 text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">No products are live yet</h3>
                  <p className="text-muted-foreground max-w-xl">
                    Add your first product to start selling. Once a product is added, it will appear here as part of your featured collection.
                  </p>
                </div>
                <Button asChild>
                  <Link href="/products">Go to product setup</Link>
                </Button>
              </Card>
            </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container">
            <div className="flex flex-col space-y-6 md:space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
                <Button variant="ghost" className="gap-1 font-medium" disabled>
                  All Categories <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <Card className="p-6 md:p-8 flex flex-col items-center text-center space-y-3">
                <ClipboardList className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground max-w-xl">
                  Categories will show up here after you add real items to your store and group them. Create at least one product to unlock category browsing.
                </p>
              </Card>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="bg-primary/5 border rounded-2xl p-8 md:p-10 lg:p-12 flex flex-col items-center text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Looking for something specific?</h2>
            <p className="text-muted-foreground max-w-[42rem]">
              If you have a product request, need a custom bundle, or want to know what’s coming next,
              I’d love to hear from you. Send a note and I’ll get back quickly.
            </p>
            <Button size="lg" className="font-medium mt-4">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
