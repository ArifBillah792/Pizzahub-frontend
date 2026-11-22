import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, MapPin, SearchX, Star } from "lucide-react";
import { getSession } from "@/lib/session";
import { apiFetch } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { ImageGallery } from "@/components/image-gallery";
import { OrderForm } from "@/components/order-form";

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;

  // private page: logged-out users go to Sign In, then come back here
  const session = await getSession();
  if (!session) redirect(`/sign-in?redirect=/menu/${id}`);

  const { data: item, error } = await apiFetch(`/menu-items/${id}`);

  if (error) {
    return (
      <main className="mx-auto flex max-w-xl flex-col items-center gap-3 px-4 py-24 text-center">
        <SearchX className="size-14 text-muted-foreground" />
        <h1 className="text-3xl font-extrabold">Item not available</h1>
        <p className="text-muted-foreground">{error}</p>
        <Link
          href="/menu"
          className="font-semibold text-primary hover:underline"
        >
          Back to the menu
        </Link>
      </main>
    );
  }

  const { user } = session;
  const vendor = item.vendor;
  const vendorName = vendor.businessName || vendor.name;
  const isOwnItem = item.vendorId === user.id;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to the menu
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ImageGallery images={item.images} alt={item.itemName} />

        <div className="space-y-6">
          <div>
            <span className="text-sm font-semibold tracking-wider text-primary uppercase">
              {item.category}
            </span>
            <h1 className="mt-2 text-4xl font-extrabold">{item.itemName}</h1>
            <p className="text-glow mt-3 text-3xl font-extrabold text-primary">
              {formatPrice(item.price)}
            </p>
          </div>

          <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
            {item.description}
          </p>

          <p className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-primary" /> {item.location}
          </p>

          {/* vendor */}
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            {vendor.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={vendor.image}
                alt={vendorName}
                className="size-12 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-12 items-center justify-center rounded-full bg-muted text-lg font-bold text-accent">
                {vendorName?.charAt(0)}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Sold by</p>
              <p className="truncate font-semibold">{vendorName}</p>
            </div>
            {vendor.isPremium && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                <Star className="size-3 fill-current" /> Premium
              </span>
            )}
          </div>

          {/* order */}
          {user.role === "customer" ? (
            <OrderForm itemId={item._id} />
          ) : (
            <p className="rounded-2xl border border-border bg-muted p-4 text-sm text-muted-foreground">
              {user.role === "admin"
                ? "Admins cannot place customer orders."
                : isOwnItem
                  ? "This is your own menu item, so you can't order it."
                  : "Only customer accounts can place orders."}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
