import Link from "next/link";
import { CalendarDays, MapPin, ShoppingBag, Store } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { CancelOrderButton } from "@/components/orders/order-actions";

export default async function MyOrdersPage() {
  const { data: orders, error } = await apiFetch("/orders/mine", {
    auth: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">My Orders</h1>
        {orders && (
          <p className="mt-1 text-muted-foreground">{orders.length} order(s)</p>
        )}
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
          {error}
        </p>
      )}

      {orders?.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-12 text-center">
          <ShoppingBag className="size-10 text-muted-foreground" />
          <h2 className="text-xl font-bold">No orders yet</h2>
          <Link
            href="/menu"
            className="font-semibold text-primary hover:underline"
          >
            Browse the menu
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {orders?.map((order) => (
          <article
            key={order._id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row"
          >
            {order.item?.images?.[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={order.item.images[0]}
                alt={order.item.itemName}
                className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-32"
              />
            ) : (
              <div className="flex h-24 w-full items-center justify-center rounded-xl bg-muted text-xs text-muted-foreground sm:w-32">
                Item removed
              </div>
            )}

            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold">
                  {order.item?.itemName || "Deleted item"}
                </h2>
                <StatusBadge status={order.status} />
                {order.item?.price && (
                  <span className="text-sm font-semibold text-primary">
                    {formatPrice(order.item.price)}
                  </span>
                )}
              </div>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Store className="size-4" />{" "}
                {order.vendor?.businessName || order.vendor?.name}
              </p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="size-4" /> Delivery:{" "}
                <span className="text-foreground">
                  {formatDate(order.deliveryDate)}
                </span>
              </p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" /> {order.deliveryAddress}
              </p>
              {order.message && (
                <p className="text-sm italic text-muted-foreground">
                  &ldquo;{order.message}&rdquo;
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Ordered on {formatDate(order.createdAt)}
              </p>
            </div>

            <div className="flex gap-2 sm:flex-col sm:self-center">
              <Link
                href={`/dashboard/customer/orders/${order._id}`}
                className="rounded-lg border border-border px-3 py-1.5 text-center text-sm font-semibold hover:border-primary hover:text-primary"
              >
                View details
              </Link>
              {order.status === "pending" && (
                <CancelOrderButton orderId={order._id} />
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
