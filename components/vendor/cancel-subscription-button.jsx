"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cancelSubscription } from "@/lib/actions/subscription";
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

export function CancelSubscriptionButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleCancel() {
    setBusy(true);
    const { data, error } = await cancelSubscription();
    setBusy(false);
    if (error) return toast.error(error);
    setOpen(false);
    toast.success(data.message);
    router.refresh();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button variant="outline" className="w-full" />}
      >
        Cancel subscription
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Premium?</AlertDialogTitle>
          <AlertDialogDescription>
            You keep Premium until the end of the paid month. After that you go
            back to the Free plan (3 active items).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Premium</AlertDialogCancel>
          <Button variant="destructive" disabled={busy} onClick={handleCancel}>
            {busy ? "Cancelling..." : "Yes, cancel"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
