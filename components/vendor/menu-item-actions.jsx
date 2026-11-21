"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { setItemAvailability, deleteMenuItem } from "@/lib/actions/menu-items";
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

export function MenuItemActions({ item }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);

  async function changeAvailability(available) {
    setBusy(true);
    const { data, error } = await setItemAvailability(item._id, available);
    setBusy(false);
    if (error) return toast.error(error);
    toast.success(data.message);
    router.refresh();
  }

  async function handleDelete() {
    setBusy(true);
    const { error } = await deleteMenuItem(item._id);
    setBusy(false);
    if (error) return toast.error(error);
    setOpen(false);
    toast.success(`"${item.itemName}" was deleted`);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        variant="outline"
        nativeButton={false}
        render={<Link href={`/dashboard/vendor/menu-items/${item._id}`} />}
      >
        <Pencil /> View &amp; Edit
      </Button>

      {item.status === "approved" && (
        <Button
          size="sm"
          variant="secondary"
          disabled={busy}
          onClick={() => changeAvailability(false)}
        >
          <EyeOff /> Hide
        </Button>
      )}

      {item.status === "inactive" && item.inactiveBy !== "admin" && (
        <Button
          size="sm"
          variant="secondary"
          disabled={busy}
          onClick={() => changeAvailability(true)}
        >
          <Eye /> Show
        </Button>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button size="sm" variant="destructive" />}>
          <Trash2 /> Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete &quot;{item.itemName}&quot;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This removes the item for good and cancels its pending orders. You
              can&apos;t undo this.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={busy}
              onClick={handleDelete}
            >
              {busy ? "Deleting..." : "Yes, delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
