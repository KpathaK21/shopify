import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { siteDescription, siteName, siteTagline } from "@/lib/site-info";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{siteName}</h3>
            <p className="text-sm text-muted-foreground">{siteDescription}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Shop</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                All Products
              </Link>
              <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground">
                Categories
              </Link>
              <Link href="/featured" className="text-sm text-muted-foreground hover:text-foreground">
                Featured
              </Link>
              <Link href="/new-arrivals" className="text-sm text-muted-foreground hover:text-foreground">
                New Arrivals
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">About</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="/story" className="text-sm text-muted-foreground hover:text-foreground">
                My Story
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground">
                Shipping Policy
              </Link>
              <Link href="/refund" className="text-sm text-muted-foreground hover:text-foreground">
                Refund Policy
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteName}. {siteTagline}
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-8.9 9-8.9 1.6 0 3 .5 4 1.5z" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
