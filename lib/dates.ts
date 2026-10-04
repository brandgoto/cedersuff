/** Next Monday strictly after `from` (a Monday rolls to the following week), e.g. "Mon, Oct 5". */
export function nextMondayLabel(from = new Date()) {
  const d = new Date(from);
  d.setDate(d.getDate() + (((8 - d.getDay()) % 7) || 7));
  return d.toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" });
}
