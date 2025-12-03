import Link from "next/link";
import { FolderOpen } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/mock-data";

export default function CategoriesPage() {
  return (
    <div className="container py-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase text-muted-foreground">Categories</p>
          <h1 className="text-3xl font-bold">Shop by category</h1>
          <p className="text-muted-foreground">Explore collections to find the right items faster.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/products">Browse all products</Link>
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card className="p-8 text-center space-y-3">
          <FolderOpen className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="text-xl font-semibold">No categories yet</h2>
          <p className="text-muted-foreground">
            Categories will appear once products are added. Check back soon or view all products instead.
          </p>
          <Button asChild>
            <Link href="/products">View products</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>{category.description}</p>
                <Button asChild variant="outline">
                  <Link href={`/categories/${category.slug}`}>View {category.name}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
