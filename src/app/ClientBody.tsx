"use client";

import { useEffect } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased min-h-screen bg-background";
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
