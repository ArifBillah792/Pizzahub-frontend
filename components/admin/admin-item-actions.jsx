"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, EyeOff, Eye, Trash2, X } from "lucide-react";
import { setMenuItemStatus, adminDeleteMenuItem } from "@/lib/actions/admin";
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

export function AdminItemActions({ item }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);

  async function changeStatus(status) {
    setBusy(true);
    const { data, error } = await setMenuItemStatus(item._id, status);
    setBusy(false);
    if (error) return toast.error(error);
    toast.success(data.message);
    router.refresh();
  }

  async function handleDelete() {
    setBusy(true);
    const { error } = await adminDeleteMenuItem(item._id);
    setBusy(false);
    if (error) return toast.error(error);
    setOpen(false);
    toast.success("Menu item deleted");
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      {item.status !== "approved" && (
        <Button
          size="sm"
          className="bg-green-600 text-white hover:bg-green-700"
          disabled={busy}
          onClick={() => changeStatus("approved")}
        >
          {item.status === "inactive" ? (
            <>
              <Eye /> Activate
            </>
          ) : (
            <>
              <Check /> Approve
            </>
          )}
        </Button>
      )}
      {item.status === "pending" && (
        <Button
          size="sm"
          variant="secondary"
          disabled={busy}
          onClick={() => changeStatus("rejected")}
        >
          <X /> Reject
        </Button>
      )}
      {item.status === "approved" && (
        <Button
          size="sm"
          variant="secondary"
          disabled={busy}
          onClick={() => changeStatus("inactive")}
        >
          <EyeOff /> Deactivate
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
              Use this for inappropriate items. Its pending orders are
              cancelled. You can&apos;t undo this.
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
