import Link from "next/link";
import { SearchX } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { MenuCard } from "@/components/menu-card";
import { MenuFilters } from "@/components/menu-filters";

export const metadata = { title: "Browse Menu | PizzaHub" };

export default async function MenuPage({ searchParams }) {
  const {
    search = "",
    category = "",
    location = "",
    sort = "",
  } = await searchParams;

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (location) params.set("location", location);
  if (sort) params.set("sort", sort);

  const { data: items, error } = await apiFetch(`/menu-items?${params}`);

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10">
      <header>
        <p className="text-sm font-semibold tracking-widest text-accent uppercase">
          Fresh from local ovens
        </p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
          Browse the <span className="text-glow text-primary">Menu</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Search pizzas by name, or filter by category and area. Sort by price
          to find your perfect deal.
        </p>
      </header>

      <MenuFilters current={{ search, category, location, sort }} />

      {error && (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
          {error}
        </p>
      )}

      {items && (
        <p className="text-sm text-muted-foreground">
          {items.length} item(s) found
        </p>
      )}

      {items?.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border p-14 text-center">
          <SearchX className="size-12 text-muted-foreground" />
          <h2 className="text-xl font-bold">No pizzas match your search</h2>
          <p className="text-muted-foreground">
            Try another name, category or area.
          </p>
          <Link
            href="/menu"
            className="font-semibold text-primary hover:underline"
          >
            Clear all filters
          </Link>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
    </main>
  );
}
