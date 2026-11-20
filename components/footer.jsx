import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Menu", href: "/menu" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Become a Vendor", href: "/sign-up" },
];

const categoryLinks = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
];

const socials = [
  {
    label: "PizzaHub on X",
    href: "https://x.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "PizzaHub on Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.23 2.68.23v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
  {
    label: "PizzaHub on Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-sidebar">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* brand */}
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">
            PizzaHub connects pizza lovers with the best local pizzerias. Hot,
            fresh and baked with care.
          </p>
        </div>

        {/* quick links */}
        <div>
          <h3 className="mb-4 font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* categories */}
        <div>
          <h3 className="mb-4 font-semibold">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            {categoryLinks.map((name) => (
              <li key={name}>
                <Link
                  href={`/menu?category=${encodeURIComponent(name)}`}
                  className="text-muted-foreground transition hover:text-primary"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact + social */}
        <div>
          <h3 className="mb-4 font-semibold">Contact Us</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> Cairo, Egypt
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> hello@pizzahub.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> +20 100 123 4567
            </li>
          </ul>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-primary hover:text-primary-foreground"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PizzaHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
