export default function Loading() {
  return (
    <div className="space-y-3">
      <div className="h-9 w-56 animate-pulse rounded-lg bg-muted" />
      {[1, 2, 3].map((n) => (
        <div key={n} className="h-28 animate-pulse rounded-2xl bg-card" />
      ))}
    </div>
  );
}
