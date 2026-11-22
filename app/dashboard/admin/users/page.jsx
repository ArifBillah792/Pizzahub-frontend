import { Users } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { FilterBar } from "@/components/filter-bar";

export default async function ManageUsersPage({ searchParams }) {
  const { search = "", role = "" } = await searchParams;
  const params = new URLSearchParams({ search, role });
  const { data: users, error } = await apiFetch(`/admin/users?${params}`, {
    auth: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Manage Users</h1>
        {users && (
          <p className="mt-1 text-muted-foreground">{users.length} user(s)</p>
        )}
      </div>

      <FilterBar
        basePath="/dashboard/admin/users"
        current={{ search, role }}
        searchPlaceholder="Search by name or email..."
        selects={[
          {
            name: "role",
            label: "All roles",
            options: ["customer", "vendor", "admin"],
          },
        ]}
      />

      {error && (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
          {error}
        </p>
      )}

      {users?.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-12 text-center">
          <Users className="size-10 text-muted-foreground" />
          <h2 className="text-xl font-bold">No users found</h2>
        </div>
      )}

      {users?.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-xs tracking-wider text-muted-foreground uppercase">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Restaurant</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-border last:border-0"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {u.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={u.image}
                          alt={u.name}
                          className="size-9 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex size-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                          {u.name?.charAt(0)}
                        </span>
                      )}
                      <div>
                        <p className="font-semibold">{u.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 capitalize">{u.role}</td>
                  <td className="p-4">{u.businessName || "—"}</td>
                  <td className="p-4 capitalize">
                    {u.role === "vendor" ? u.subscriptionPlan || "free" : "—"}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {u.createdAt ? formatDate(u.createdAt) : "—"}
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
