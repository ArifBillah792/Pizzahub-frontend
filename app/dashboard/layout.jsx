import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default async function DashboardLayout({ children }) {
  const session = await getSession();
  if (!session) redirect("/sign-in?redirect=/dashboard");

  const { name, email, image, role } = session.user;

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
      <DashboardSidebar user={{ name, email, image, role }} />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
