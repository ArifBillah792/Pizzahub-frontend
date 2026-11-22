import Link from "next/link";
import { Pizza } from "lucide-react";

export const metadata = { title: "Page not found | PizzaHub" };

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-24 text-center">
      <div className="relative">
        <span className="text-glow text-8xl font-extrabold text-primary">
          404
        </span>
        <Pizza className="absolute -top-4 -right-10 size-12 rotate-12 text-accent" />
      </div>
      <h1 className="text-3xl font-extrabold">This slice is missing!</h1>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to the good stuff.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="glow-red rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          Back to Home
        </Link>
        <Link
          href="/menu"
          className="rounded-full border border-border px-6 py-3 font-semibold hover:border-primary hover:text-primary"
        >
          Browse Menu
        </Link>
      </div>
    </main>
  );
}
