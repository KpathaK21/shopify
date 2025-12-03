"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, ShoppingCart, Search, User, X, Plus, Minus, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { siteName } from "@/lib/site-info";

export function SiteHeader() {
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:w-80">
              <nav className="mt-10 flex flex-col gap-4">
                <Link href="/" className="font-medium text-foreground">Home</Link>
                <Link href="/products" className="font-medium text-foreground">Shop All</Link>
                <Link href="/categories" className="font-medium text-foreground">Categories</Link>
                <Link href="/about" className="font-medium text-foreground">About</Link>
                <Link href="/contact" className="font-medium text-foreground">Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="hidden md:block">
            <h1 className="text-xl font-bold">{siteName}</h1>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium text-foreground/70 hover:text-foreground">Home</Link>
            <Link href="/products" className="font-medium text-foreground/70 hover:text-foreground">Shop All</Link>
            <Link href="/categories" className="font-medium text-foreground/70 hover:text-foreground">Categories</Link>
            <Link href="/about" className="font-medium text-foreground/70 hover:text-foreground">About</Link>
            <Link href="/contact" className="font-medium text-foreground/70 hover:text-foreground">Contact</Link>
          </nav>
        </div>

        {/* Mobile Logo */}
        <Link href="/" className="md:hidden">
          <h1 className="text-xl font-bold">{siteName}</h1>
        </Link>

        <div className="flex items-center gap-2">
          {/* Search */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full">
              <div className="py-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search products..." className="pl-8" />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Shopping Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-lg">
              <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full max-h-full">
                {itemCount === 0 ? (
                  <div className="flex flex-col items-center justify-center h-96">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-6">Your cart is empty</p>
                    <Button variant="outline" className="mt-2" asChild>
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1 overflow-auto py-6">
                    <ul className="space-y-5">
                      {items.map((item) => (
                        <li key={item.id} className="flex gap-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm font-medium">
                                  <Link href={`/products/${item.productId}`}>{item.name}</Link>
                                </h3>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeItem(item.id)}
                                  className="h-5 w-5 -mt-1"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">${item.price}</p>
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center border rounded-md overflow-hidden">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-7 w-7 rounded-none"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <div className="w-8 text-xs text-center font-medium">
                                  {item.quantity}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-7 w-7 rounded-none"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="text-sm font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-medium">Subtotal</span>
                        <span className="text-base font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Shipping and taxes calculated at checkout
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button asChild>
                          <Link href="/checkout">Checkout</Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href="/cart">View Cart</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/70 hover:text-foreground"
                aria-label={user ? `Account menu for ${user.name}` : "Account"}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Signed in as
                    <div className="font-medium text-foreground">{user.name}</div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onSelect={signOut}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="w-full cursor-pointer">
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="w-full cursor-pointer">
                      Register
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
