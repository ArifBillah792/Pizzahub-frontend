import { Receipt } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";

export default async function TransactionsPage() {
  const { data: transactions, error } = await apiFetch("/admin/transactions", {
    auth: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Transactions</h1>
        <p className="mt-1 text-muted-foreground">
          Read-only record of Premium payments, saved from verified Stripe
          events.
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
          {error}
        </p>
      )}

      {transactions?.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-12 text-center">
          <Receipt className="size-10 text-muted-foreground" />
          <h2 className="text-xl font-bold">No transactions yet</h2>
          <p className="text-muted-foreground">
            They appear when vendors upgrade to Premium.
          </p>
        </div>
      )}

      {transactions?.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border text-xs tracking-wider text-muted-foreground uppercase">
              <tr>
                <th className="p-4">Vendor</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t._id}
                  className="border-b border-border last:border-0"
                >
                  <td className="p-4">
                    <p className="font-semibold">
                      {t.vendor?.businessName ||
                        t.vendor?.name ||
                        "Deleted vendor"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.vendor?.email}
                    </p>
                  </td>
                  <td className="p-4 capitalize">{t.plan}</td>
                  <td className="p-4 font-semibold">
                    {formatPrice(t.amount)}{" "}
                    <span className="text-xs text-muted-foreground uppercase">
                      {t.currency}
                    </span>
                  </td>
                  <td className="p-4">
                    <StatusBadge
                      status={t.status === "paid" ? "approved" : t.status}
                    />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {formatDate(t.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
