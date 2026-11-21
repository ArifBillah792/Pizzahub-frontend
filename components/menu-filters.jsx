"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const fieldClass =
  "h-11 w-full rounded-xl border border-input bg-input/30 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function MenuFilters({ current }) {
  const router = useRouter();

  // builds the URL from the form, e.g. /menu?search=marg&sort=price_asc
  function applyFilters(form) {
    const params = new URLSearchParams();
    for (const key of ["search", "category", "location", "sort"]) {
      const value = form.elements[key].value.trim();
      if (value) params.set(key, value);
    }
    const query = params.toString();
    router.push(query ? `/menu?${query}` : "/menu");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        applyFilters(e.currentTarget);
      }}
      className="grid gap-3 rounded-2xl border border-border bg-card p-4 md:grid-cols-[2fr_1.3fr_1.3fr_1.2fr_auto]"
    >
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          name="search"
          defaultValue={current.search}
          placeholder="Search pizza by name..."
          className={`${fieldClass} pl-9`}
        />
      </div>

      <select
        name="category"
        defaultValue={current.category}
        onChange={(e) => applyFilters(e.target.form)}
        className={fieldClass}
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        name="location"
        defaultValue={current.location}
        placeholder="Area or city"
        className={fieldClass}
      />

      <select
        name="sort"
        defaultValue={current.sort}
        onChange={(e) => applyFilters(e.target.form)}
        className={fieldClass}
      >
        <option value="">Newest first</option>
        <option value="price_asc">Price: low to high</option>
        <option value="price_desc">Price: high to low</option>
      </select>

      <Button type="submit" className="glow-red h-11">
        Search
      </Button>
    </form>
  );
}
