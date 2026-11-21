import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { formatPrice } from "@/lib/format";

export function MenuCard({ item }) {
  const vendor = item.vendor || {};
  const vendorName = vendor.businessName || vendor.name;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(230,57,70,0.18)]">
      {/* image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.images?.[0]}
          alt={item.itemName}
          className="size-full object-cover transition duration-500 group-hover:scale-110"
        />
        {vendor.isPremium && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-[0_0_20px_rgba(255,201,77,0.5)]">
            <Star className="size-3 fill-current" /> Premium
          </span>
        )}
        <span className="absolute right-3 bottom-3 rounded-full bg-background/90 px-3 py-1 text-base font-extrabold text-primary backdrop-blur">
          {formatPrice(item.price)}
        </span>
      </div>

      {/* text */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold tracking-wider text-primary uppercase">
          {item.category}
        </span>
        <h3 className="line-clamp-1 text-lg font-bold">{item.itemName}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-4" /> {item.location}
        </p>

        {/* vendor + button, always at the bottom */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-border pt-4">
          <div className="flex min-w-0 items-center gap-2">
            {vendor.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={vendor.image}
                alt={vendorName}
                className="size-8 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-accent">
                {vendorName?.charAt(0)}
              </span>
            )}
            <span className="truncate text-sm font-medium">{vendorName}</span>
          </div>
          <Link
            href={`/menu/${item._id}`}
            className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
