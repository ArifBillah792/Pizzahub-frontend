const styles = {
  pending: "border-accent/40 bg-accent/15 text-accent",
  approved: "border-green-500/40 bg-green-500/15 text-green-400",
  accepted: "border-green-500/40 bg-green-500/15 text-green-400",
  rejected: "border-destructive/40 bg-destructive/15 text-destructive",
  cancelled: "border-border bg-muted text-muted-foreground",
  inactive: "border-border bg-muted text-muted-foreground",
  paid: "border-green-500/40 bg-green-500/15 text-green-400",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${styles[status] || styles.inactive}`}
    >
      {status}
    </span>
  );
}
