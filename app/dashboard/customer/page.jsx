import { apiFetch } from "@/lib/api";

export default async function CustomerOverview() {
  const { data, error } = await apiFetch("/me", { auth: true });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold">Customer Overview</h1>
      <pre className="rounded-xl bg-card p-4 text-sm">
        {JSON.stringify(data || error, null, 2)}
      </pre>
    </div>
  );
}
