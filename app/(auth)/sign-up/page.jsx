"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pizza, Store } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { uploadImage } from "@/lib/actions/upload-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "@/components/google-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const roles = [
  { value: "customer", label: "Customer", icon: Pizza },
  { value: "vendor", label: "Vendor (Restaurant)", icon: Store },
];

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.fullName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const businessName =
      role === "vendor" ? form.businessName.value.trim() : undefined;
    const imageFile = form.image.files[0];

    // password rules from the requirements
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password))
      return toast.error("Password needs at least one uppercase letter");
    if (!/[a-z]/.test(password))
      return toast.error("Password needs at least one lowercase letter");
    if (role === "vendor" && !businessName)
      return toast.error("Please enter your restaurant name");

    setLoading(true);

    // optional profile image → ImgBB
    let image;
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const result = await uploadImage(formData);
      if (result.error) {
        setLoading(false);
        return toast.error(result.error);
      }
      image = result.url;
    }

    const { error } = await signUp.email({
      name,
      email,
      password,
      image,
      role,
      businessName,
    });
    setLoading(false);

    if (error)
      return toast.error(error.message || "Sign up failed. Please try again.");

    toast.success("Welcome to PizzaHub!");
    router.push(
      role === "vendor" ? "/dashboard/vendor" : "/dashboard/customer",
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Join PizzaHub
          </CardTitle>
          <CardDescription>
            Create your account to order or sell pizza
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* role */}
            <div className="space-y-2">
              <Label>I am joining as</Label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 text-sm font-medium transition ${
                      role === value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card"
                    }`}
                  >
                    <Icon className="size-5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Your name"
                required
              />
            </div>

            {role === "vendor" && (
              <div className="space-y-2">
                <Label htmlFor="businessName">Restaurant Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  placeholder="e.g. Napoli Corner"
                />
              </div>
            )}

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
                placeholder="At least 6 characters"
                required
              />
              <p className="text-xs text-muted-foreground">
                Use 6+ characters with an uppercase and a lowercase letter.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image (optional)</Label>
              <Input id="image" name="image" type="file" accept="image/*" />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> OR{" "}
            <span className="h-px flex-1 bg-border" />
          </div>
          <GoogleButton role={role} label="Sign up with Google" />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
