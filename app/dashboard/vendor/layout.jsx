import { requireRole } from "@/lib/session";

export default async function VendorLayout({ children }) {
  await requireRole("vendor");
  return children;
}
