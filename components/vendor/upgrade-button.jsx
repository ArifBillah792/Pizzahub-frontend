"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Crown } from "lucide-react";
import { startCheckout } from "@/lib/actions/subscription";
import { Button } from "@/components/ui/button";

export function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    const { data, error } = await startCheckout();
    if (error) {
      setLoading(false);
      return toast.error(error);
    }
    window.location.href = data.url; // go to Stripe's secure payment page
  }

  return (
    <Button
      className="glow-red w-full"
      size="lg"
      disabled={loading}
      onClick={handleUpgrade}
    >
      <Crown /> {loading ? "Redirecting to Stripe..." : "Upgrade to Premium"}
    </Button>
  );
}
