export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
      <div className="h-72 w-full animate-pulse rounded-2xl bg-card lg:w-64" />
      <div className="flex-1 space-y-6">
        <div className="h-10 w-64 animate-pulse rounded-xl bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-24 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-2xl bg-card" />
      </div>
    </div>
  );
}
