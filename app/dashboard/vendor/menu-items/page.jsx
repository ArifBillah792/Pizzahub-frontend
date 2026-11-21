import Link from "next/link";
import { MapPin, PlusCircle, UtensilsCrossed } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { MenuItemActions } from "@/components/vendor/menu-item-actions";

export default async function MyMenuItemsPage() {
  const { data: items, error } = await apiFetch("/menu-items/mine", {
    auth: true,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">My Menu Items</h1>
          {items && (
            <p className="mt-1 text-muted-foreground">
              {items.length} item(s) in your menu
            </p>
          )}
        </div>
        <Button
          className="glow-red"
          nativeButton={false}
          render={<Link href="/dashboard/vendor/menu-items/new" />}
        >
          <PlusCircle /> Add Menu Item
        </Button>
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
          {error}
        </p>
      )}

      {items?.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-12 text-center">
          <UtensilsCrossed className="size-10 text-muted-foreground" />
          <h2 className="text-xl font-bold">No menu items yet</h2>
          <p className="text-muted-foreground">
            Add your first pizza so customers can find you.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {items?.map((item) => (
          <article
            key={item._id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.images[0]}
              alt={item.itemName}
              className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-32"
            />

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-lg font-bold">{item.itemName}</h2>
                <StatusBadge status={item.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                {item.category} ·{" "}
                <span className="font-semibold text-foreground">
                  {formatPrice(item.price)}
                </span>
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" /> {item.location}
              </p>
              {item.status === "pending" && (
                <p className="text-xs text-accent">
                  Waiting for admin approval.
                </p>
              )}
              {item.status === "rejected" && (
                <p className="text-xs text-destructive">
                  Rejected by admin. Edit it to send it for review again.
                </p>
              )}
            </div>

            <MenuItemActions item={item} />
          </article>
        ))}
      </div>
    </div>
  );
}
