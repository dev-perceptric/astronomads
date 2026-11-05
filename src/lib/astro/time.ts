/**
 * Converts a local wall-clock birth time in an IANA time zone to a UTC instant.
 * Uses the browser's or Node's time zone database, which carries historical
 * rules (old offsets, war time, daylight saving changes).
 */
export function tzOffsetMs(utcMs: number, timeZone: string): number {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const p: Record<string, string> = {};
  for (const part of f.formatToParts(new Date(utcMs))) p[part.type] = part.value;
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
  return asUtc - Math.floor(utcMs / 1000) * 1000;
}

/** date: YYYY-MM-DD, time: HH:MM (24h) */
export function localToUtc(date: string, time: string, timeZone: string): Date {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  if ([y, m, d, hh, mm].some((n) => !Number.isFinite(n))) throw new Error('Invalid date or time');
  const wall = Date.UTC(y, m - 1, d, hh, mm);
  let guess = wall;
  // Two passes settle the offset, including near daylight saving changes.
  for (let i = 0; i < 2; i++) guess = wall - tzOffsetMs(guess, timeZone);
  return new Date(guess);
}

export function utcOffsetLabel(utc: Date, timeZone: string): string {
  const mins = Math.round(tzOffsetMs(utc.getTime(), timeZone) / 60000);
  const sign = mins < 0 ? '−' : '+';
  const a = Math.abs(mins);
  const h = Math.floor(a / 60);
  const m = a % 60;
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}
