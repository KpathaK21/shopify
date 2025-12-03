"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="container py-12 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl">Sign in</CardTitle>
          <CardDescription>Access your saved profile or continue as a guest.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              <LogIn className="h-4 w-4" /> Sign in
            </Button>
            <div className="text-sm text-center text-muted-foreground space-y-2">
              <p>
                New here? <Link className="text-primary underline" href="/register">Create an account</Link>
              </p>
              <p>
                Or check out as a guest by heading straight to the {" "}
                <Link className="text-primary underline" href="/checkout">checkout</Link>.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
