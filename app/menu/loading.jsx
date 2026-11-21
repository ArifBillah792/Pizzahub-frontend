export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10">
      <div className="h-14 w-72 animate-pulse rounded-xl bg-muted" />
      <div className="h-20 animate-pulse rounded-2xl bg-card" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="h-96 animate-pulse rounded-3xl bg-card" />
        ))}
      </div>
    </main>
  );
}
