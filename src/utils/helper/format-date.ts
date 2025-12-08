export function formatDate(
  date: string | Date | null,
  withTime: boolean = false
): string {
  if (!date) return "—";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "Invalid date";

  if (withTime) {
    return d.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
