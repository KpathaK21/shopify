import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container py-12 space-y-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-medium uppercase text-muted-foreground">About</p>
        <h1 className="text-4xl font-bold tracking-tight">A storefront built for shoppers</h1>
        <p className="text-lg text-muted-foreground">
          Explore products, learn more about our mission, and reach out anytime. This demo store is
          designed to make it easy to browse items, add them to your cart, and check out without
          friction.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/products">Start shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Curated catalog
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Browse featured and upcoming products. As we add inventory, new arrivals will appear
            across the site automatically.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Fast checkout
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Purchase as a guest or sign in for a personalized experience. Your cart stays with you
            while you explore.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Real-time updates
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Navigation links stay in sync with available pages, so everything in the header now leads
            to a live destination.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
