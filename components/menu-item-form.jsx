"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ImagePlus, X } from "lucide-react";
import { uploadImage } from "@/lib/actions/upload-image";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAX_IMAGES = 4;
const fieldClass =
  "w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function MenuItemForm({
  initialData,
  submitLabel = "Submit",
  onSubmit,
}) {
  const [existingImages, setExistingImages] = useState(
    initialData?.images || [],
  );
  const [newFiles, setNewFiles] = useState([]);
  const [status, setStatus] = useState(""); // "" | "uploading" | "saving"

  function handleFiles(e) {
    const files = Array.from(e.target.files);
    if (existingImages.length + newFiles.length + files.length > MAX_IMAGES) {
      toast.error(`You can add up to ${MAX_IMAGES} images`);
      return;
    }
    setNewFiles((prev) => [...prev, ...files]);
    e.target.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      itemName: form.itemName.value.trim(),
      category: form.category.value,
      description: form.description.value.trim(),
      price: Number(form.price.value),
      location: form.location.value.trim(),
    };

    // the same rules as the server
    if (data.itemName.length < 3)
      return toast.error("Item name must be at least 3 characters");
    if (!data.category) return toast.error("Please choose a category");
    if (data.description.length < 10)
      return toast.error("Description must be at least 10 characters");
    if (!data.price || data.price <= 0)
      return toast.error("Price must be greater than 0");
    if (data.location.length < 2) return toast.error("Please enter a location");
    if (existingImages.length + newFiles.length === 0)
      return toast.error("Please add at least one image");

    // 1. upload new images to ImgBB
    setStatus("uploading");
    const uploadedUrls = [];
    for (const file of newFiles) {
      const formData = new FormData();
      formData.append("image", file);
      const result = await uploadImage(formData);
      if (result.error) {
        setStatus("");
        return toast.error(result.error);
      }
      uploadedUrls.push(result.url);
    }

    // 2. save the item
    setStatus("saving");
    await onSubmit({ ...data, images: [...existingImages, ...uploadedUrls] });
    setStatus("");
  }

  const busy = status !== "";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-border bg-card p-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="itemName">Item Name</Label>
          <Input
            id="itemName"
            name="itemName"
            defaultValue={initialData?.itemName}
            placeholder="e.g. Margherita Classica"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            defaultValue={initialData?.category || ""}
            className={`${fieldClass} h-10`}
          >
            <option value="" disabled>
              Choose a category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0.01"
            defaultValue={initialData?.price}
            placeholder="12.99"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="location">Location (area / city)</Label>
          <Input
            id="location"
            name="location"
            defaultValue={initialData?.location}
            placeholder="e.g. Zamalek, Cairo"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={initialData?.description}
            placeholder="Ingredients, size, what makes it special…"
            className={fieldClass}
          />
        </div>
      </div>

      {/* images */}
      <div className="space-y-2">
        <Label>Images (1 to {MAX_IMAGES})</Label>
        <div className="flex flex-wrap gap-3">
          {existingImages.map((url) => (
            <div
              key={url}
              className="relative size-24 overflow-hidden rounded-xl border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() =>
                  setExistingImages((prev) => prev.filter((u) => u !== url))
                }
                className="absolute top-1 right-1 rounded-full bg-black/70 p-1"
                aria-label="Remove image"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
          {newFiles.map((file, i) => (
            <div
              key={i}
              className="relative size-24 overflow-hidden rounded-xl border border-primary/60"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="size-full object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setNewFiles((prev) => prev.filter((_, idx) => idx !== i))
                }
                className="absolute top-1 right-1 rounded-full bg-black/70 p-1"
                aria-label="Remove image"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
          {existingImages.length + newFiles.length < MAX_IMAGES && (
            <label className="flex size-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border text-xs text-muted-foreground transition hover:border-primary hover:text-primary">
              <ImagePlus className="size-6" />
              Add image
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFiles}
                className="sr-only"
              />
            </label>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          The first image is the cover photo on menu cards.
        </p>
      </div>

      <Button
        type="submit"
        className="glow-red w-full sm:w-auto"
        disabled={busy}
      >
        {status === "uploading"
          ? "Uploading images..."
          : status === "saving"
            ? "Saving..."
            : submitLabel}
      </Button>
    </form>
  );
}
