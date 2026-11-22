import { Clock, ListOrdered, Receipt, Store, User, Users } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { toChartData } from "@/lib/format";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusChart } from "@/components/dashboard/status-chart";

export default async function AdminOverview() {
  const { data: s, error } = await apiFetch("/stats/admin", { auth: true });
  if (error)
    return (
      <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
        {error}
      </p>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Admin Overview</h1>
        <p className="mt-1 text-muted-foreground">
          Everything happening on PizzaHub at a glance.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Registered users" value={s.totalUsers} icon={Users} />
        <StatCard
          label="Vendors"
          value={s.totalVendors}
          icon={Store}
          tone="accent"
        />
        <StatCard
          label="Customers"
          value={s.totalCustomers}
          icon={User}
          tone="green"
        />
        <StatCard label="Menu items" value={s.totalItems} icon={ListOrdered} />
        <StatCard
          label="Pending menu items"
          value={s.pendingItems}
          icon={Clock}
          tone="accent"
        />
        <StatCard
          label="Transactions"
          value={s.totalTransactions}
          icon={Receipt}
          tone="green"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <StatusChart
          title="Users by role"
          type="pie"
          data={toChartData(s.usersByRole, ["customer", "vendor", "admin"])}
        />
        <StatusChart
          title="Menu items by status"
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
