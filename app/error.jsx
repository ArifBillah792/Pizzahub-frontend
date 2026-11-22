"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export default function Error({ reset }) {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-24 text-center">
      <TriangleAlert className="size-16 text-accent" />
      <h1 className="text-3xl font-extrabold">Something went wrong</h1>
      <p className="text-muted-foreground">
        We couldn&apos;t load this page. Please try again. If it keeps
        happening, come back in a moment.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => reset()}
          className="glow-red rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-border px-6 py-3 font-semibold hover:border-primary hover:text-primary"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
