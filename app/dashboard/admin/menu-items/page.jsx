import { ListOrdered } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/format";
import { CATEGORIES } from "@/lib/constants";
import { FilterBar } from "@/components/filter-bar";
import { StatusBadge } from "@/components/status-badge";
import { AdminItemActions } from "@/components/admin/admin-item-actions";

export default async function ManageMenuItemsPage({ searchParams }) {
  const { search = "", status = "", category = "" } = await searchParams;
  const params = new URLSearchParams({ search, status, category });
  const { data: items, error } = await apiFetch(`/admin/menu-items?${params}`, {
    auth: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Manage Menu Items</h1>
        {items && (
          <p className="mt-1 text-muted-foreground">{items.length} item(s)</p>
        )}
      </div>

      <FilterBar
        basePath="/dashboard/admin/menu-items"
        current={{ search, status, category }}
        searchPlaceholder="Search by item name..."
        selects={[
          {
            name: "status",
            label: "All statuses",
            options: ["pending", "approved", "rejected", "inactive"],
          },
          { name: "category", label: "All categories", options: CATEGORIES },
        ]}
      />

      {error && (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
          {error}
        </p>
      )}

      {items?.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-12 text-center">
          <ListOrdered className="size-10 text-muted-foreground" />
          <h2 className="text-xl font-bold">No menu items found</h2>
        </div>
      )}

      <div className="space-y-3">
        {items?.map((item) => (
          <article
            key={item._id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 md:flex-row md:items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.images[0]}
              alt={item.itemName}
              className="h-28 w-full rounded-xl object-cover md:h-20 md:w-28"
            />
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold">{item.itemName}</h2>
                <StatusBadge status={item.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                {item.category} ·{" "}
                <span className="font-semibold text-foreground">
                  {formatPrice(item.price)}
                </span>{" "}
                · {item.location}
              </p>
              <p className="text-xs text-muted-foreground">
                By {item.vendor?.businessName || item.vendor?.name} · submitted{" "}
                {formatDate(item.createdAt)}
              </p>
            </div>
            <AdminItemActions item={item} />
          </article>
        ))}
      </div>
    </div>
  );
}
