"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { cancelOrder, updateOrderStatus } from "@/lib/actions/orders";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// customer: cancel a pending order
export function CancelOrderButton({ orderId }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleCancel() {
    setBusy(true);
    const { error } = await cancelOrder(orderId);
    setBusy(false);
    if (error) return toast.error(error);
    setOpen(false);
    toast.success("Order cancelled");
    router.refresh();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button size="sm" variant="destructive" />}>
        Cancel Order
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
          <AlertDialogDescription>
            The restaurant will no longer prepare it. You can&apos;t undo this.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep order</AlertDialogCancel>
          <Button variant="destructive" disabled={busy} onClick={handleCancel}>
            {busy ? "Cancelling..." : "Yes, cancel"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// vendor: accept or reject a pending order
export function OrderStatusButtons({ orderId }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleStatus(status) {
    setBusy(true);
    const { error } = await updateOrderStatus(orderId, status);
    setBusy(false);
    if (error) return toast.error(error);
    toast.success(`Order ${status}`);
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        className="bg-green-600 text-white hover:bg-green-700"
        disabled={busy}
        onClick={() => handleStatus("accepted")}
      >
        <Check /> Accept
      </Button>
      <Button
        size="sm"
        variant="destructive"
        disabled={busy}
        onClick={() => handleStatus("rejected")}
      >
        <X /> Reject
      </Button>
    </div>
  );
}
