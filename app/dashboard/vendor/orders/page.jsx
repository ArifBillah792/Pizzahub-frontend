import { CalendarDays, ClipboardList, Mail, MapPin } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { OrderStatusButtons } from "@/components/orders/order-actions";

export default async function CustomerOrdersPage() {
  const { data: orders, error } = await apiFetch("/orders/vendor", {
    auth: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Customer Orders</h1>
        {orders && (
          <p className="mt-1 text-muted-foreground">
            {orders.filter((o) => o.status === "pending").length} pending ·{" "}
            {orders.length} total
          </p>
        )}
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
          {error}
        </p>
      )}

      {orders?.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-12 text-center">
          <ClipboardList className="size-10 text-muted-foreground" />
          <h2 className="text-xl font-bold">No orders yet</h2>
          <p className="text-muted-foreground">
            Orders for your approved items will appear here.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {orders?.map((order) => (
          <article
            key={order._id}
            className="space-y-3 rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold">
                  {order.item?.itemName || "Deleted item"}
                </h2>
                <StatusBadge status={order.status} />
              </div>
              {order.status === "pending" && (
                <OrderStatusButtons orderId={order._id} />
              )}
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="space-y-1 rounded-xl bg-muted/50 p-3">
                <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                  Customer
                </p>
                <p className="font-semibold">{order.customer?.name}</p>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <Mail className="size-4" /> {order.customer?.email}
                </p>
              </div>
              <div className="space-y-1 rounded-xl bg-muted/50 p-3">
                <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                  Delivery
                </p>
                <p className="flex items-center gap-1.5">
                  <CalendarDays className="size-4 text-primary" />{" "}
                  {formatDate(order.deliveryDate)}
                </p>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-4" /> {order.deliveryAddress}
                </p>
              </div>
            </div>

            {order.message && (
              <p className="rounded-xl border border-border p-3 text-sm">
                <span className="font-semibold">Message:</span> {order.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Requested on {formatDate(order.createdAt)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
