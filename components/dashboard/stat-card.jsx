const tones = {
  primary: "bg-primary/15 text-primary",
  accent: "bg-accent/15 text-accent",
  green: "bg-green-500/15 text-green-400",
  muted: "bg-muted text-muted-foreground",
};

export function StatCard({ label, value, icon: Icon, tone = "primary" }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
      <span
        className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
      >
        <Icon className="size-6" />
      </span>
      <div className="min-w-0">
        <p className="text-sm leading-tight text-muted-foreground">{label}</p>{" "}
        <p className="text-2xl font-extrabold">{value}</p>
      </div>
    </div>
  );
}
