"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Loader2 } from "lucide-react";
import { getMyPlan } from "@/lib/actions/subscription";

// asks the server every 2 seconds whether the webhook has activated Premium
export function PaymentStatus() {
  const [status, setStatus] = useState("checking"); // checking | active | slow

  useEffect(() => {
    let tries = 0;
    const timer = setInterval(async () => {
      tries += 1;
      const { data } = await getMyPlan();
      if (data?.isPremium) {
        setStatus("active");
        clearInterval(timer);
      } else if (tries >= 10) {
        setStatus("slow");
        clearInterval(timer);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  if (status === "checking") {
    return (
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-14 animate-spin text-primary" />
        <h1 className="text-3xl font-extrabold">Confirming your payment…</h1>
        <p className="text-muted-foreground">
          Stripe is confirming the payment. This usually takes a few seconds.
        </p>
      </div>
    );
  }

  if (status === "slow") {
    return (
      <div className="flex flex-col items-center gap-4">
        <Clock className="size-14 text-accent" />
        <h1 className="text-3xl font-extrabold">Payment received</h1>
        <p className="text-muted-foreground">
          Confirmation is taking longer than usual. Premium will activate
          automatically. Check your Subscription page in a minute.
        </p>
        <Link
          href="/dashboard/vendor/subscription"
          className="font-semibold text-primary hover:underline"
        >
          Go to Subscription
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <CheckCircle2 className="size-16 text-green-400" />
      <h1 className="text-3xl font-extrabold">
        Welcome to <span className="text-glow text-primary">Premium</span>!
      </h1>
      <p className="text-muted-foreground">
        Your payment is verified. You now have unlimited menu items, a Premium
        badge and featured placement.
      </p>
      <div className="flex gap-3">
        <Link
          href="/dashboard/vendor/menu-items/new"
          className="glow-red rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
        >
          Add a menu item
        </Link>
        <Link
          href="/dashboard/vendor/subscription"
          className="rounded-full border border-border px-5 py-2.5 font-semibold"
        >
          View subscription
        </Link>
      </div>
    </div>
  );
}
