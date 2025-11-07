export interface TableRow {
  id: string;
  dayKey: string;
  dateString: string;
  temp: number;
  feelsLike: number;
  conditions: string;
  humidity: number;
}

export interface DayGroup {
  key: string;
  label: string;
  rows: TableRow[];
}

export function shiftedDate(dtSeconds: number, tzOffsetSeconds: number): Date {
  return new Date((dtSeconds + tzOffsetSeconds) * 1000);
}

export function dayDateFromShifted(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function toDatetimeLocal(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const h = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${y}-${m}-${day}T${h}:${min}`;
}
