"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { Check, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function CheckoutPage() {
  const { items, itemCount, subtotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");

  // Shipping cost based on selected method
  const shippingCost = shippingMethod === "standard" ? 4.99 : 14.99;

  // Calculate tax (simplified as 8% of subtotal)
  const taxAmount = subtotal * 0.08;

  // Calculate total
  const total = subtotal + shippingCost + taxAmount;

  // If cart is empty, redirect to products
  if (itemCount === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Add some products to your cart before proceeding to checkout.
        </p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully! (This is just a demo)");
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-1">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main checkout form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Shipping Address */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-2">
                    Street Address
                  </label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="apt" className="block text-sm font-medium mb-2">
                    Apartment, suite, etc. (optional)
                  </label>
                  <Input
                    id="apt"
                    placeholder="Apt 4B"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <Input
                      id="city"
                      placeholder="New York"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-2">
                      State
                    </label>
                    <Input
                      id="state"
                      placeholder="NY"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium mb-2">
                      ZIP Code
                    </label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      className="w-full"
                    />
                  </div>
                </div>
              </form>
            </div>

            <Separator />

            {/* Shipping Method */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Shipping Method</h2>
              <div className="space-y-3">
                <div
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer
                    ${shippingMethod === "standard" ? "border-primary ring-1 ring-primary" : ""}`}
                  onClick={() => setShippingMethod("standard")}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center
                      ${shippingMethod === "standard" ? "border-primary" : "border-gray-300"}`}>
                      {shippingMethod === "standard" && <Check className="h-3 w-3 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-sm text-muted-foreground">Delivery in 5-7 business days</p>
                    </div>
                  </div>
                  <span className="font-medium">$4.99</span>
                </div>

                <div
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer
                    ${shippingMethod === "express" ? "border-primary ring-1 ring-primary" : ""}`}
                  onClick={() => setShippingMethod("express")}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center
                      ${shippingMethod === "express" ? "border-primary" : "border-gray-300"}`}>
                      {shippingMethod === "express" && <Check className="h-3 w-3 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-muted-foreground">Delivery in 1-2 business days</p>
                    </div>
                  </div>
                  <span className="font-medium">$14.99</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Payment Information</h2>
              <div className="p-6 border rounded-lg space-y-4">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="font-medium">Credit Card</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                      Name on Card
                    </label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium mb-2">
                        CVC
                      </label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg overflow-hidden sticky top-20">
              <div className="p-6 bg-muted/50">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="h-16 w-16 rounded-md border overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full mt-2" size="lg" onClick={handleSubmit}>
                  Place Order
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  By placing your order, you agree to our{" "}
                  <Link href="/terms" className="underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
