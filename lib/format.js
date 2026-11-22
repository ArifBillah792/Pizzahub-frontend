export const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

// { pending: 2, accepted: 5 } → [{ name: "Pending", value: 2 }, { name: "Accepted", value: 5 }, ...]
export const toChartData = (counts = {}, keys) =>
  keys.map((key) => ({ name: key.charAt(0).toUpperCase() + key.slice(1), value: counts[key] || 0 }));