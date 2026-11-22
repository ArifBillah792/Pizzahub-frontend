import { CheckCircle2, Clock, ShoppingBag, XCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { toChartData } from "@/lib/format";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusChart } from "@/components/dashboard/status-chart";

export default async function CustomerOverview() {
  const { data: s, error } = await apiFetch("/stats/customer", { auth: true });
  if (error)
    return (
      <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
        {error}
      </p>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">My Overview</h1>
        <p className="mt-1 text-muted-foreground">
          A quick look at your pizza orders.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total orders"
          value={s.totalOrders}
          icon={ShoppingBag}
        />
        <StatCard
          label="Pending"
          value={s.pendingOrders}
          icon={Clock}
          tone="accent"
        />
        <StatCard
          label="Accepted"
          value={s.acceptedOrders}
          icon={CheckCircle2}
          tone="green"
        />
        <StatCard
          label="Rejected"
          value={s.rejectedOrders}
          icon={XCircle}
          tone="muted"
        />
      </div>
      <StatusChart
        title="My orders by status"
        data={toChartData(s.ordersByStatus, [
          "pending",
          "accepted",
          "rejected",
          "cancelled",
        ])}
      />
    </div>
  );
}
