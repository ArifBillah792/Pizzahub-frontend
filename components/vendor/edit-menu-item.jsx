"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MenuItemForm } from "@/components/menu-item-form";
import { updateMenuItem } from "@/lib/actions/menu-items";

export function EditMenuItem({ item }) {
  const router = useRouter();

  async function handleUpdate(data) {
    const { error } = await updateMenuItem(item._id, data);
    if (error) return toast.error(error);
    toast.success("Changes saved and sent for review");
    router.push("/dashboard/vendor/menu-items");
    router.refresh();
  }

  return (
    <MenuItemForm
      initialData={item}
      submitLabel="Save Changes"
      onSubmit={handleUpdate}
    />
  );
}
