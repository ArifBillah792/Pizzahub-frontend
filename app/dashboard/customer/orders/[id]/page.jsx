import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Store } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { CancelOrderButton } from "@/components/orders/order-actions";

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;
  const { data: order, error } = await apiFetch(`/orders/${id}`, {
    auth: true,
  });

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <p className="mt-2 text-muted-foreground">{error}</p>
        <Link
          href="/dashboard/customer/orders"
          className="mt-4 inline-block font-semibold text-primary"
        >
          Back to My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        href="/dashboard/customer/orders"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to My Orders
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-extrabold">Order Details</h1>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* order info */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
          {order.item?.images?.[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={order.item.images[0]}
              alt={order.item.itemName}
              className="aspect-video w-full rounded-xl object-cover"
            />
          )}
          <div>
            <h2 className="text-xl font-bold">
              {order.item?.itemName || "Deleted item"}
            </h2>
            {order.item?.price && (
              <p className="font-semibold text-primary">
                {formatPrice(order.item.price)}
              </p>
            )}
          </div>
          <p className="flex items-center gap-2 text-sm">
            <Store className="size-4 text-primary" />{" "}
            {order.vendor?.businessName || order.vendor?.name}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <CalendarDays className="size-4 text-primary" /> Delivery:{" "}
            {formatDate(order.deliveryDate)}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-primary" /> {order.deliveryAddress}
          </p>
          {order.message && (
            <p className="rounded-xl bg-muted/50 p-3 text-sm">
              <span className="font-semibold">Your note:</span> {order.message}
            </p>
          )}
          {order.status === "pending" && (
            <CancelOrderButton orderId={order._id} />
          )}
        </div>

        {/* timeline */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-5 text-lg font-bold">Order status</h2>
          <OrderTimeline order={order} />
        </div>
      </div>
    </div>
  );
}
