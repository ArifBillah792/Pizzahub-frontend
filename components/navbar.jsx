"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { LayoutDashboard, LogOut, Menu, Settings, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// extra links for each role
const roleLinks = {
  customer: [{ label: "My Orders", href: "/dashboard/customer/orders" }],
  vendor: [
    { label: "My Menu Items", href: "/dashboard/vendor/menu-items" },
    { label: "Customer Orders", href: "/dashboard/vendor/orders" },
  ],
  admin: [
    { label: "Manage Users", href: "/dashboard/admin/users" },
    { label: "Manage Menu", href: "/dashboard/admin/menu-items" },
  ],
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const user = session?.user;

  const links = [
    { label: "Home", href: "/" },
    { label: "Browse Menu", href: "/menu" },
    ...(user ? roleLinks[user.role] || [] : []),
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  async function handleLogout() {
    await signOut();
    toast.success("You have been logged out");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Logo />

        {/* desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-semibold transition hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="size-10 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar className="size-10 ring-2 ring-primary/60">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="bg-primary font-bold text-primary-foreground">
                    {user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs font-normal capitalize text-muted-foreground">
                      {user.role}
                    </p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/dashboard" />}>
                  <LayoutDashboard /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/dashboard/profile" />}>
                  <Settings /> Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button
                variant="ghost"
                nativeButton={false}
                render={<Link href="/sign-in" />}
              >
                Sign In
              </Button>
              <Button
                className="glow-red"
                nativeButton={false}
                render={<Link href="/sign-up" />}
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-semibold ${
                    isActive(link.href)
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {!user && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/sign-in" onClick={() => setOpen(false)} />}
              >
                Sign In
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/sign-up" onClick={() => setOpen(false)} />}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
