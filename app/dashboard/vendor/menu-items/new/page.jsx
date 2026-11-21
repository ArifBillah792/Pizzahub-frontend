"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MenuItemForm } from "@/components/menu-item-form";
import { createMenuItem } from "@/lib/actions/menu-items";

export default function AddMenuItemPage() {
  const router = useRouter();

  async function handleCreate(data) {
    const { error, status } = await createMenuItem(data);

    if (error) {
      if (status === 403) {
        return toast.error(error, {
          action: {
            label: "Upgrade",
            onClick: () => router.push("/dashboard/vendor/subscription"),
          },
        });
      }
      return toast.error(error);
    }

    toast.success("Menu item submitted! It will appear after admin approval.");
    router.push("/dashboard/vendor/menu-items");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Add Menu Item</h1>
        <p className="mt-1 text-muted-foreground">
          New items are reviewed by our team before customers can see them.
        </p>
      </div>
      <MenuItemForm submitLabel="Submit for Review" onSubmit={handleCreate} />
    </div>
  );
}
