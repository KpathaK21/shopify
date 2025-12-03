"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ShoppingBag, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="container py-16 text-center space-y-4">
        <User className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="text-3xl font-bold">You are not signed in</h1>
        <p className="text-muted-foreground">Sign in to view your profile and saved details.</p>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">Create account</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase text-muted-foreground">Account</p>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground">You can keep shopping or head to checkout anytime.</p>
        </div>
        <Button variant="outline" onClick={handleSignOut} className="gap-2">
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <div className="flex justify-between">
              <span>Name</span>
              <span className="font-medium text-foreground">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Email</span>
              <span className="font-medium text-foreground">{user.email}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>Ready to buy now or later? Your cart is always available.</p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/checkout" className="gap-2">
                  <ShoppingBag className="h-4 w-4" /> Go to checkout
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">Keep shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
