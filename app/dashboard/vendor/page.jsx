import { CheckCircle2, Clock, Crown, Eye, UtensilsCrossed } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { toChartData } from "@/lib/format";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusChart } from "@/components/dashboard/status-chart";

export default async function VendorOverview() {
  const { data: s, error } = await apiFetch("/stats/vendor", { auth: true });
  if (error)
    return (
      <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
        {error}
      </p>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Vendor Overview</h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s how your restaurant is doing.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total menu items"
          value={s.totalItems}
          icon={UtensilsCrossed}
        />
        <StatCard
          label="Active menu items"
          value={s.activeItems}
          icon={Eye}
          tone="green"
        />
        <StatCard
          label="Pending orders"
          value={s.pendingOrders}
          icon={Clock}
          tone="accent"
        />
        <StatCard
          label="Accepted orders"
          value={s.acceptedOrders}
          icon={CheckCircle2}
          tone="green"
        />
        <StatCard
          label="Current plan"
          value={s.plan}
          icon={Crown}
          tone="accent"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <StatusChart
          title="Orders by status"
          data={toChartData(s.ordersByStatus, [
            "pending",
            "accepted",
            "rejected",
            "cancelled",
          ])}
        />
        <StatusChart
          title="Menu items by status"
          type="pie"
          data={toChartData(s.itemsByStatus, [
            "pending",
            "approved",
            "rejected",
            "inactive",
          ])}
        />
      </div>
    </div>
  );
}
