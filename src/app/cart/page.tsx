"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart();

  if (itemCount === 0) {
    return (
      <div className="container py-16 text-center space-y-4">
        <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">Add something you love and return here to check out.</p>
        <Button asChild>
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your cart</h1>
          <p className="text-muted-foreground">You have {itemCount} item{itemCount !== 1 && "s"} ready to go.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/products">Continue shopping</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-lg border p-4">
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
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                    Remove
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="w-10 text-sm text-center font-medium">{item.quantity}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border p-6 space-y-4 h-fit">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <Separator />
          <Button asChild className="w-full">
            <Link href="/checkout">Proceed to checkout</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/products">Add more items</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
