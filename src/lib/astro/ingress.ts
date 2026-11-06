import * as Astronomy from 'astronomy-engine';
import { eclipticLongitude } from './chart';
import type { Body } from './constants';

type Engine = Body['engine'];
const lonOf = (engine: Engine, t: Date) => eclipticLongitude(engine, t);

/**
 * The next moment after `from` when a body enters a sign (0 = Aries), found by stepping and then
 * halving the gap to under a minute. Works for the Sun, Moon and planets, retrograde re-entries included.
 */
export function nextIngress(engine: Engine, sign: number, from: Date, limitDays = 800): Date | null {
  const step = engine === 'Moon' ? 2 * 3600e3 : engine === 'Sun' || engine === 'Mercury' || engine === 'Venus' ? 12 * 3600e3 : 86400e3;
  const inSign = (t: Date) => Math.floor(lonOf(engine, t) / 30) === sign;
  let a = from.getTime();
  let wasIn = inSign(from);
  for (let t = a + step; t < from.getTime() + limitDays * 86400e3; t += step) {
    const now = inSign(new Date(t));
    if (now && !wasIn) {
      let lo = t - step;
      let hi = t;
      while (hi - lo > 30e3) {
        const mid = (lo + hi) / 2;
        if (inSign(new Date(mid))) hi = mid;
        else lo = mid;
      }
      return new Date(hi);
    }
    wasIn = now;
    a = t;
  }
  return null;
}

/** When the Sun is in a sign in a given year: from the ingress that falls in that year to the next sign's ingress. */
export function sunSeason(sign: number, year: number): { start: Date; end: Date } {
  const start = nextIngress('Sun', sign, new Date(Date.UTC(year, 0, 1)))!;
  const end = nextIngress('Sun', (sign + 1) % 12, start)!;
  return { start, end };
}

/**
 * The Sun's sign for a birth date when the time or place may be unknown. A calendar day runs from
 * UTC+14 to UTC-12, so the Sun is checked across that whole span; on a cusp day the answer needs the time.
 */
export function sunSignForDay(date: string): { certain: true; sign: number; lon: number } | { certain: false; from: number; to: number; ingress: Date } {
  const [y, m, d] = date.split('-').map(Number);
  const day = new Date(0);
  day.setUTCFullYear(y, m - 1, d);
  const midnight = day.getTime();
  const first = new Date(midnight - 14 * 3600e3);
  const last = new Date(midnight + 36 * 3600e3);
  const a = Astronomy.SunPosition(first).elon;
  const b = Astronomy.SunPosition(last).elon;
  const sa = Math.floor(a / 30);
  const sb = Math.floor(b / 30);
  if (sa === sb) return { certain: true, sign: sa, lon: Astronomy.SunPosition(new Date(midnight + 12 * 3600e3)).elon };
  return { certain: false, from: sa, to: sb, ingress: nextIngress('Sun', sb, first)! };
}
