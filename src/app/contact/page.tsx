"use client";

import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Thanks for reaching out! We'll reply shortly.");
  };

  return (
    <div className="container py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase text-muted-foreground">Contact</p>
          <h1 className="text-4xl font-bold tracking-tight">We're here to help</h1>
          <p className="text-muted-foreground max-w-2xl">
            Send a note with any questions about products, shipping, or custom orders. We reply fast
            so you can keep shopping.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" required type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" name="message" rows={5} required placeholder="Tell us what you need" />
              </div>
              <Button type="submit" className="gap-2">
                <Send className="h-4 w-4" /> Send message
              </Button>
              {status && <p className="text-green-600 text-sm">{status}</p>}
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              support@example.com
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +1 (555) 123-4567
            </div>
            <p>Business hours: 9am - 6pm EST, Monday to Friday</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
