import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { StatusBadge } from "@/components/status-badge";
import { EditMenuItem } from "@/components/vendor/edit-menu-item";

export default async function EditMenuItemPage({ params }) {
  const { id } = await params;
  const { data: item, error } = await apiFetch(`/menu-items/mine/${id}`, {
    auth: true,
  });

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <h1 className="text-2xl font-bold">Menu item not found</h1>
        <p className="mt-2 text-muted-foreground">{error}</p>
        <Link
          href="/dashboard/vendor/menu-items"
          className="mt-4 inline-block font-semibold text-primary"
        >
          Back to My Menu Items
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-extrabold">{item.itemName}</h1>
          <StatusBadge status={item.status} />
        </div>
        <p className="mt-1 text-muted-foreground">
          Saving changes sends the item to admin review again.
        </p>
      </div>
      <EditMenuItem item={item} />
    </div>
  );
}
