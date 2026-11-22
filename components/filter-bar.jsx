"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const fieldClass =
  "h-10 rounded-xl border border-input bg-input/30 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function FilterBar({
  basePath,
  current,
  searchPlaceholder,
  selects = [],
}) {
  const router = useRouter();

  function apply(form) {
    const params = new URLSearchParams();
    for (const [key, value] of new FormData(form).entries()) {
      if (String(value).trim()) params.set(key, String(value).trim());
    }
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        apply(e.currentTarget);
      }}
      className="flex flex-wrap gap-3 rounded-2xl border border-border bg-card p-4"
    >
      <div className="relative min-w-56 flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          name="search"
          defaultValue={current.search}
          placeholder={searchPlaceholder}
          className={`${fieldClass} w-full pl-9`}
        />
      </div>
      {selects.map((s) => (
        <select
          key={s.name}
          name={s.name}
          defaultValue={current[s.name] || ""}
          onChange={(e) => apply(e.target.form)}
          className={fieldClass}
        >
          <option value="">{s.label}</option>
          {s.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ))}
      <Button type="submit" className="h-10">
        Search
      </Button>
    </form>
  );
}
