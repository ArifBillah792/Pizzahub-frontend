import { Check, Clock, Truck, X } from "lucide-react";
import { formatDate } from "@/lib/format";

export function OrderTimeline({ order }) {
  const { status, createdAt, updatedAt, deliveryDate } = order;

  const steps = [
    {
      label: "Order placed",
      note: formatDate(createdAt),
      state: "done",
      icon: Check,
    },
    {
      label: "Waiting for the restaurant",
      note:
        status === "pending"
          ? "The restaurant will accept or reject soon"
          : "Reviewed",
      state: status === "pending" ? "current" : "done",
      icon: Clock,
    },
  ];

  if (status === "accepted") {
    steps.push({
      label: "Accepted by the restaurant",
      note: updatedAt ? formatDate(updatedAt) : "",
      state: "done",
      icon: Check,
    });
    steps.push({
      label: "Delivery day",
      note: formatDate(deliveryDate),
      state: "current",
      icon: Truck,
    });
  } else if (status === "rejected") {
    steps.push({
      label: "Rejected by the restaurant",
      note: updatedAt ? formatDate(updatedAt) : "",
      state: "failed",
      icon: X,
    });
  } else if (status === "cancelled") {
    steps.push({
      label: "Cancelled",
      note: updatedAt ? formatDate(updatedAt) : "",
      state: "failed",
      icon: X,
    });
  } else {
    steps.push({
      label: "Accepted by the restaurant",
      note: "Waiting",
      state: "upcoming",
      icon: Check,
    });
    steps.push({
      label: "Delivery day",
      note: formatDate(deliveryDate),
      state: "upcoming",
      icon: Truck,
    });
  }

  const dotStyle = {
    done: "bg-green-600 text-white",
    current: "glow-red bg-primary text-primary-foreground animate-pulse",
    failed: "bg-destructive text-white",
    upcoming: "bg-muted text-muted-foreground",
  };

  return (
    <ol className="space-y-0">
      {steps.map((step, i) => (
        <li key={step.label} className="relative flex gap-4 pb-8 last:pb-0">
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute top-10 left-5 h-[calc(100%-2.5rem)] w-0.5 bg-border"
            />
          )}
          <span
            className={`relative flex size-10 shrink-0 items-center justify-center rounded-full ${dotStyle[step.state]}`}
          >
            <step.icon className="size-5" />
          </span>
          <div className="pt-1.5">
            <p
              className={`font-semibold ${step.state === "upcoming" ? "text-muted-foreground" : ""}`}
            >
              {step.label}
            </p>
            {step.note && (
              <p className="text-sm text-muted-foreground">{step.note}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
