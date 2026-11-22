"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/lib/actions/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function OrderForm({ itemId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const deliveryDate = form.deliveryDate.value;
    const deliveryAddress = form.deliveryAddress.value.trim();
    const message = form.message.value.trim();

    if (!deliveryDate) return toast.error("Please choose a delivery date");
    if (deliveryDate < today)
      return toast.error("Delivery date cannot be in the past");
    if (deliveryAddress.length < 5)
      return toast.error("Please enter a full delivery address");

    setLoading(true);
    const { error } = await createOrder({
      itemId,
      deliveryDate,
      deliveryAddress,
      message,
    });
    setLoading(false);

    if (error) return toast.error(error);
    toast.success("Order placed! The restaurant will confirm it soon.");
    router.push("/dashboard/customer/orders");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-primary/40 bg-card p-5"
    >
      <h2 className="text-xl font-bold">Place your order</h2>

      <div className="space-y-2">
        <Label htmlFor="deliveryDate">Delivery Date</Label>
        <Input id="deliveryDate" name="deliveryDate" type="date" min={today} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryAddress">Delivery Address</Label>
        <Input
          id="deliveryAddress"
          name="deliveryAddress"
          placeholder="Street, building, apartment, city"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Special Instructions (optional)</Label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={300}
          placeholder="e.g. Extra cheese, ring the bell twice"
          className="w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <Button type="submit" className="glow-red w-full" disabled={loading}>
        {loading ? "Placing order..." : "Place Order"}
      </Button>
    </form>
  );
}
