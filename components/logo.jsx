import Link from "next/link";
import { Pizza } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="glow-red flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Pizza className="size-5" />
      </span>
      <span className="text-xl font-extrabold tracking-tight">
        Pizza<span className="text-accent">Hub</span>
      </span>
    </Link>
  );
}
