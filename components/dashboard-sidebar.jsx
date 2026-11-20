"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  ListOrdered,
  PlusCircle,
  Receipt,
  Settings,
  ShoppingBag,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuByRole = {
  vendor: [
    { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard },
    {
      label: "My Menu Items",
      href: "/dashboard/vendor/menu-items",
      icon: UtensilsCrossed,
    },
    {
      label: "Add Menu Item",
      href: "/dashboard/vendor/menu-items/new",
      icon: PlusCircle,
    },
    {
      label: "Customer Orders",
      href: "/dashboard/vendor/orders",
      icon: ClipboardList,
    },
    {
      label: "Subscription",
      href: "/dashboard/vendor/subscription",
      icon: CreditCard,
    },
    { label: "Profile Settings", href: "/dashboard/profile", icon: Settings },
  ],
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    {
      label: "My Orders",
      href: "/dashboard/customer/orders",
      icon: ShoppingBag,
    },
    { label: "Profile Settings", href: "/dashboard/profile", icon: Settings },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    {
      label: "Manage Menu Items",
      href: "/dashboard/admin/menu-items",
      icon: ListOrdered,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: Receipt,
    },
  ],
};

export function DashboardSidebar({ user }) {
  const pathname = usePathname();
  const menu = menuByRole[user.role] || [];

  return (
    <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-64 lg:self-start">
      <div className="rounded-2xl border border-border bg-card p-4">
        {/* profile section */}
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Avatar className="size-11 ring-2 ring-primary/60">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-primary font-bold text-primary-foreground">
              {user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-semibold">{user.name}</p>
            <p className="text-xs capitalize text-accent">{user.role}</p>
          </div>
        </div>

        {/* menu: a row of pills on mobile, a list on desktop */}
        <nav className="mt-4 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {menu.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "glow-red bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
