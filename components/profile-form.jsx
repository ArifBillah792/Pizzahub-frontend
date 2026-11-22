"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/actions/upload-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileForm({ user }) {
  const router = useRouter();
  const [image, setImage] = useState(user.image || "");
  const [status, setStatus] = useState(""); // "" | "uploading" | "saving"

  async function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setStatus("uploading");
    const formData = new FormData();
    formData.append("image", file);
    const result = await uploadImage(formData);
    setStatus("");
    if (result.error) return toast.error(result.error);
    setImage(result.url);
    toast.success("Photo uploaded. Click Save Changes to keep it.");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const businessName = e.target.businessName?.value.trim();

    if (name.length < 2)
      return toast.error("Name must be at least 2 characters");
    if (user.role === "vendor" && !businessName)
      return toast.error("Please enter your restaurant name");

    setStatus("saving");
    const updates = { name };
    if (image) updates.image = image;
    if (user.role === "vendor") updates.businessName = businessName;

    const { error } = await authClient.updateUser(updates);
    setStatus("");
    if (error)
      return toast.error(error.message || "Could not save your profile");

    toast.success("Profile updated");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-border bg-card p-6"
    >
      {/* photo */}
      <div className="flex items-center gap-5">
        <Avatar className="size-20 ring-2 ring-primary/60">
          <AvatarImage src={image} alt={user.name} />
          <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
            {user.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary">
          <Upload className="size-4" />
          {status === "uploading" ? "Uploading..." : "Change photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="sr-only"
            disabled={status !== ""}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" defaultValue={user.name} />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user.email} disabled />
        </div>
        {user.role === "vendor" && (
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="businessName">Restaurant Name</Label>
            <Input
              id="businessName"
              name="businessName"
              defaultValue={user.businessName}
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 rounded-xl bg-muted/50 p-4 text-sm">
        <span>
          Role:{" "}
          <span className="font-semibold capitalize text-accent">
            {user.role}
          </span>
        </span>
        {user.role === "vendor" && (
          <span>
            · Plan:{" "}
            <span className="font-semibold capitalize text-accent">
              {user.subscriptionPlan || "free"}
            </span>
          </span>
        )}
        <span className="w-full text-xs text-muted-foreground">
          Your role and plan can&apos;t be changed here.
        </span>
      </div>

      <Button type="submit" className="glow-red" disabled={status !== ""}>
        {status === "saving" ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
