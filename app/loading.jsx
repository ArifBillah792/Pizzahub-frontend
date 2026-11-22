import { Pizza } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Pizza className="size-12 animate-spin text-primary [animation-duration:1.5s]" />
      <p className="text-sm text-muted-foreground">Heating up the oven...</p>
    </div>
  );
}
