import Link from "next/link";
import {
  ArrowRight,
  Beef,
  CalendarCheck,
  Clock,
  CupSoda,
  Leaf,
  Pizza,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Hero } from "@/components/home/hero";
import { FadeIn } from "@/components/home/fade-in";
import { SectionHeading } from "@/components/home/section-heading";
import { MenuCard } from "@/components/menu-card";

const categories = [
  { name: "Classic Pizzas", icon: Pizza },
  { name: "Vegetarian Pizzas", icon: Leaf },
  { name: "Meat Lovers", icon: Beef },
  { name: "Specialty / Gourmet Pizzas", icon: Sparkles },
  { name: "Sides & Appetizers", icon: UtensilsCrossed },
  { name: "Beverages & Desserts", icon: CupSoda },
];

const steps = [
  {
    icon: Search,
    title: "Find your pizza",
    text: "Browse menus from local pizzerias. Search by name or filter by category and area.",
  },
  {
    icon: ShoppingBag,
    title: "Place your order",
    text: "Pick a delivery date and address, and add special instructions for the kitchen.",
  },
  {
    icon: CalendarCheck,
    title: "Track and enjoy",
    text: "Watch your order go from pending to accepted in your dashboard, then dig in.",
  },
];

export default async function HomePage() {
  const { data: featured } = await apiFetch("/menu-items/featured");

  return (
    <main>
      <Hero />

      {/* Featured Menu Items */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Fresh from the oven"
            title="Featured"
            highlight="Menu Items"
            description="Hand-picked pizzas from our best local restaurants. Premium vendors are featured first."
          />
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            View full menu <ArrowRight className="size-4" />
          </Link>
        </div>

        {featured?.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item, i) => (
              <FadeIn key={item._id} delay={(i % 3) * 0.1} className="h-full">
                <MenuCard item={item} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            New pizzas are on their way. Check back soon!
          </p>
        )}
      </section>

      {/* Pizza Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="Pick your craving"
          title="Pizza"
          highlight="Categories"
          center
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ name, icon: Icon }, i) => (
            <FadeIn key={name} delay={i * 0.06}>
              <Link
                href={`/menu?category=${encodeURIComponent(name)}`}
                className="group flex h-full flex-col items-center gap-4 rounded-3xl border border-border bg-card p-6 text-center transition hover:-translate-y-1 hover:border-primary"
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-7" />
                </span>
                <span className="text-sm font-semibold">{name}</span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Why Choose PizzaHub (bento grid) */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="The PizzaHub difference"
          title="Why Choose"
          highlight="PizzaHub?"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <FadeIn className="md:row-span-2">
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/20 to-card p-8">
              <span className="glow-red flex size-14 items-center justify-center rounded-2xl bg-primary">
                <Store className="size-7 text-primary-foreground" />
              </span>
              <div>
                <h3 className="text-2xl font-extrabold">
                  Only real local pizzerias
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Every restaurant has its own profile, so you always know who
                  is baking your pizza and where they are.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-3xl bg-primary p-7 text-primary-foreground">
              <Clock className="size-8" />
              <h3 className="mt-4 text-xl font-bold">Live order tracking</h3>
              <p className="mt-2 text-sm opacity-90">
                See the moment the restaurant accepts your order.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="h-full rounded-3xl bg-accent p-7 text-accent-foreground">
              <ShieldCheck className="size-8" />
              <h3 className="mt-4 text-xl font-bold">Every item reviewed</h3>
              <p className="mt-2 text-sm opacity-90">
                Our team approves each menu item before it appears.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3} className="md:col-span-2">
            <div className="flex h-full items-center gap-5 rounded-3xl border border-border bg-card p-7">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-green-600/20">
                <CalendarCheck className="size-7 text-green-400" />
              </span>
              <div>
                <h3 className="text-xl font-bold">Order for any day</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose a delivery date and address, add special instructions,
                  and we pass them straight to the kitchen.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How PizzaHub Works */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="Simple as one, two, slice"
          title="How PizzaHub"
          highlight="Works"
          center
        />
        <div className="relative mt-12 grid gap-10 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute top-8 right-[16%] left-[16%] hidden border-t-2 border-dashed border-border md:block"
          />
          {steps.map(({ icon: Icon, title, text }, i) => (
            <FadeIn
              key={title}
              delay={i * 0.15}
              className="relative flex flex-col items-center text-center"
            >
              <span className="glow-red flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground ring-8 ring-background">
                <Icon className="size-7" />
              </span>
              <span className="mt-4 text-xs font-bold tracking-widest text-accent">
                STEP {i + 1}
              </span>
              <h3 className="mt-1 text-xl font-bold">{title}</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                {text}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
