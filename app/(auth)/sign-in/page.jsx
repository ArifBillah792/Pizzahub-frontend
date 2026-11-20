"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dashboardByRole = {
  admin: "/dashboard/admin",
  vendor: "/dashboard/vendor",
  customer: "/dashboard/customer",
};

export default function SignInPage({ searchParams }) {
  const { redirect } = use(searchParams);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setLoading(true);
    const { data, error } = await signIn.email({ email, password });
    setLoading(false);

    if (error)
      return toast.error(error.message || "Sign in failed. Please try again.");

    toast.success(`Welcome back, ${data.user.name}!`);
    router.push(redirect || dashboardByRole[data.user.role] || "/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Sign in to order your favourite pizza
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to PizzaHub?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
