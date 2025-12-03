import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, products } from "@/lib/mock-data";

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const category = categories.find((entry) => entry.slug === params.slug);

  if (!category) {
    return notFound();
  }

  const categoryProducts = products.filter((product) => product.category === category.name);

  return (
    <div className="container py-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase text-muted-foreground">Category</p>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/products">Back to products</Link>
        </Button>
      </div>

      {categoryProducts.length === 0 ? (
        <Card className="p-8 text-center space-y-3">
          <CardTitle>No products here yet</CardTitle>
          <CardContent className="text-muted-foreground">
            Items will appear once this category contains products. Try browsing all products instead.
          </CardContent>
          <Button asChild>
            <Link href="/products">View all products</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                  <Button asChild size="sm">
                    <Link href={`/products/${product.slug}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
