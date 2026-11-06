import * as Astronomy from 'astronomy-engine';
import { angles, eclipticLongitude, positionsAt } from './chart';
import { BODIES, norm, type Body, type BodyKey } from './constants';
import { localToUtc } from './time';

/*
 * Timing math for the calculators: sign changes, stations, returns, progressions and planetary
 * hours. Everything searches the engine's true positions of date, stepping and then halving the gap.
 */

type Engine = Body['engine'];
const DAY = 86400e3;
const DEG = Math.PI / 180;
export const YEAR_DAYS = 365.2422;
const lonOf = (engine: Engine, t: number) => eclipticLongitude(engine, new Date(t));
/** -180..180 */
const wrap = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;
export const engineOf = (k: BodyKey) => BODIES.find((b) => b.key === k)!.engine;

function bisect(f: (t: number) => boolean, lo: number, hi: number, tol = 30e3): number {
  // f(lo) false, f(hi) true
  while (hi - lo > tol) {
    const mid = (lo + hi) / 2;
    if (f(mid)) hi = mid;
    else lo = mid;
  }
  return hi;
}

/** A sensible search step for each body, small enough to never skip a crossing. */
function stepFor(engine: Engine): number {
  if (engine === 'Moon') return 2 * 3600e3;
  if (engine === 'Sun' || engine === 'Mercury' || engine === 'Venus') return 12 * 3600e3;
  if (engine === 'Mars') return DAY;
  return 3 * DAY;
}

/** Every moment between two dates when a body reaches a longitude, in either direction. */
export function crossings(engine: Engine, target: number, from: Date, to: Date, step = stepFor(engine)): Date[] {
  const out: Date[] = [];
  const f = (t: number) => wrap(lonOf(engine, t) - target);
  let a = from.getTime();
  let fa = f(a);
  for (let b = a + step; a < to.getTime(); b += step) {
    const fb = f(b);
    if (Math.sign(fa) !== Math.sign(fb) && Math.abs(fa) < 90 && Math.abs(fb) < 90) {
      const rising = fb > fa;
      out.push(new Date(bisect((t) => (rising ? f(t) >= 0 : f(t) <= 0), a, b, 1e3)));
    }
    a = b;
    fa = fb;
  }
  return out.filter((d) => d.getTime() <= to.getTime());
}

/** Every sign change of a body between two dates. */
export function signChanges(engine: Engine, from: Date, to: Date, step = stepFor(engine)): { date: Date; sign: number }[] {
  const out: { date: Date; sign: number }[] = [];
  const sign = (t: number) => Math.floor(lonOf(engine, t) / 30);
  let a = from.getTime();
  let sa = sign(a);
  for (let b = a + step; a < to.getTime(); b += step) {
    const sb = sign(b);
    if (sb !== sa) {
      const t = bisect((x) => sign(x) !== sa, a, b);
      if (t <= to.getTime()) out.push({ date: new Date(t), sign: sign(t) });
    }
    a = b;
    sa = sb;
  }
  return out;
}

/**
 * A body's sign on a calendar day when the birth time is unknown. A day runs from UTC+14 to UTC-12,
 * so the body is checked across that whole span; if it changed signs, both are given with the moment.
 */
export function signForDay(engine: Engine, date: string, timeZone?: string): { certain: true; sign: number; lon: number } | { certain: false; from: number; to: number; change: Date } {
  const [y, m, d] = date.split('-').map(Number);
  const day = new Date(0);
  day.setUTCFullYear(y, m - 1, d);
  const midnight = day.getTime();
  // With the birth place known the day is its own 24 hours; without it, every time zone on Earth.
  const first = timeZone ? localToUtc(date, '00:00', timeZone) : new Date(midnight - 14 * 3600e3);
  const last = timeZone ? localToUtc(addDays(date, 1), '00:00', timeZone) : new Date(midnight + 36 * 3600e3);
  const changes = signChanges(engine, first, last, engine === 'Moon' ? 3600e3 : 6 * 3600e3);
  if (changes.length === 0) return { certain: true, sign: Math.floor(lonOf(engine, midnight + 12 * 3600e3) / 30), lon: lonOf(engine, midnight + 12 * 3600e3) };
  const c = changes[0];
  return { certain: false, from: Math.floor(lonOf(engine, first.getTime()) / 30), to: c.sign, change: c.date };
}

export type Station = { body: BodyKey; kind: 'retrograde' | 'direct'; date: Date; lon: number };

/** Daily motion in degrees (negative when retrograde). */
export function speed(engine: Engine, t: number): number {
  return wrap(lonOf(engine, t + 3600e3) - lonOf(engine, t - 3600e3)) * 12;
}

/** The days a planet stands still and turns, between two dates. */
export function stations(body: BodyKey, from: Date, to: Date): Station[] {
  const engine = engineOf(body);
  const step = engine === 'Mercury' || engine === 'Venus' ? DAY / 2 : DAY;
  const out: Station[] = [];
  let a = from.getTime();
  let va = speed(engine, a);
  for (let b = a + step; a < to.getTime(); b += step) {
    const vb = speed(engine, b);
    if (Math.sign(va) !== Math.sign(vb)) {
      const toRetro = vb < 0;
      const t = bisect((x) => (toRetro ? speed(engine, x) < 0 : speed(engine, x) > 0), a, b, 60e3);
      if (t <= to.getTime()) out.push({ body, kind: toRetro ? 'retrograde' : 'direct', date: new Date(t), lon: lonOf(engine, t) });
    }
    a = b;
    va = vb;
  }
  return out;
}

export type Retrograde = {
  body: BodyKey;
  /** Turns retrograde */
  start: Station;
  /** Turns direct */
  end: Station;
  /** First reaches the degree where it will later turn direct */
  preShadow: Date | null;
  /** Passes the degree where it turned retrograde */
  postShadow: Date | null;
};

/** Every retrograde period that touches the span, with its shadow dates. */
export function retrogrades(body: BodyKey, from: Date, to: Date): Retrograde[] {
  const engine = engineOf(body);
  const pad = body === 'mercury' ? 60 : body === 'venus' ? 80 : body === 'mars' ? 120 : 220;
  const list = stations(body, new Date(from.getTime() - pad * DAY), new Date(to.getTime() + pad * DAY));
  const out: Retrograde[] = [];
  for (let i = 0; i < list.length - 1; i++) {
    const start = list[i];
    const end = list[i + 1];
    if (start.kind !== 'retrograde' || end.kind !== 'direct') continue;
    if (end.date < from || start.date > to) continue;
    const before = crossings(engine, end.lon, new Date(start.date.getTime() - pad * DAY), start.date);
    const after = crossings(engine, start.lon, end.date, new Date(end.date.getTime() + pad * DAY));
    out.push({ body, start, end, preShadow: before.length ? before[before.length - 1] : null, postShadow: after.length ? after[0] : null });
  }
  return out;
}

export const RETRO_BODIES: BodyKey[] = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

/** The exact moment the Sun returns to its birth longitude in a given year (within a few days of the birthday). */
export function solarReturn(natalSun: number, birthUtc: Date, year: number): Date {
  const around = new Date(birthUtc.getTime());
  around.setUTCFullYear(year);
  const hits = crossings('Sun', natalSun, new Date(around.getTime() - 4 * DAY), new Date(around.getTime() + 4 * DAY), 6 * 3600e3);
  return hits[0];
}

/** The next lunar returns from a date. */
export function lunarReturns(natalMoon: number, from: Date, count = 13): Date[] {
  return crossings('Moon', natalMoon, from, new Date(from.getTime() + (count + 1) * 27.4 * DAY), 3 * 3600e3)
    .filter((d) => d > from)
    .slice(0, count);
}

export type PlanetReturn = {
  /** 1 for the first return, 2 for the second */
  n: number;
  /** Each exact crossing of the birth degree (one or three) */
  passes: Date[];
  /** Saturn enters the sign it held at birth */
  enters: Date | null;
  /** Saturn moves on to the next sign */
  leaves: Date | null;
};

/** Saturn's returns to its birth degree up to an age. */
export function saturnReturns(natalSaturn: number, birthUtc: Date, toAge = 100): PlanetReturn[] {
  const start = new Date(birthUtc.getTime() + 5 * YEAR_DAYS * DAY);
  const end = new Date(birthUtc.getTime() + toAge * YEAR_DAYS * DAY);
  const hits = crossings('Saturn', natalSaturn, start, end, 4 * DAY);
  const groups: Date[][] = [];
  for (const h of hits) {
    const g = groups[groups.length - 1];
    if (g && h.getTime() - g[g.length - 1].getTime() < 3 * YEAR_DAYS * DAY) g.push(h);
    else groups.push([h]);
  }
  const sign = Math.floor(norm(natalSaturn) / 30);
  return groups.map((passes, i) => {
    const enterSearch = signChanges('Saturn', new Date(passes[0].getTime() - 3.2 * YEAR_DAYS * DAY), passes[0], 5 * DAY).filter((c) => c.sign === sign);
    const leaveSearch = signChanges('Saturn', passes[passes.length - 1], new Date(passes[passes.length - 1].getTime() + 3.2 * YEAR_DAYS * DAY), 5 * DAY).filter((c) => c.sign === (sign + 1) % 12);
    return { n: i + 1, passes, enters: enterSearch[0]?.date ?? null, leaves: leaveSearch[0]?.date ?? null };
  });
}

/* ---------- Secondary progressions: one day after birth for each year of life ---------- */

export const progressedMoment = (birthUtc: Date, at: Date) => new Date(birthUtc.getTime() + ((at.getTime() - birthUtc.getTime()) / YEAR_DAYS));
/** The real date that a moment in the progressed chart stands for. */
export const realDate = (birthUtc: Date, progressed: Date) => new Date(birthUtc.getTime() + (progressed.getTime() - birthUtc.getTime()) * YEAR_DAYS);

/** The Ascendant for a Midheaven at a latitude. */
export function ascFromMc(mc: number, lat: number, date: Date): number {
  const centuries = Astronomy.MakeTime(date).tt / 36525;
  const eps = (23.4392911 - 0.0130042 * centuries) * DEG;
  const ramc = Math.atan2(Math.sin(mc * DEG) * Math.cos(eps), Math.cos(mc * DEG));
  const phi = lat * DEG;
  return norm(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) / DEG);
}

export const PHASES = ['New', 'Crescent', 'First Quarter', 'Gibbous', 'Full', 'Disseminating', 'Last Quarter', 'Balsamic'];
const elong = (t: number) => norm(lonOf('Moon', t) - lonOf('Sun', t));

export type Progressed = {
  moment: Date;
  positions: { body: BodyKey; lon: number; retrograde: boolean }[];
  /** Solar arc Midheaven and the Ascendant it gives at the birth place; null without a birth time */
  mc: number | null;
  asc: number | null;
  phase: number;
  /** When this progressed lunation phase began, in real time */
  phaseStart: Date;
  phaseEnd: Date;
};

export function progressions(birthUtc: Date, natalSun: number, natalMc: number | null, lat: number, at: Date): Progressed {
  const moment = progressedMoment(birthUtc, at);
  const positions = positionsAt(moment);
  const pSun = positions.find((p) => p.body === 'sun')!.lon;
  const mc = natalMc === null ? null : norm(natalMc + norm(pSun - natalSun));
  const asc = mc === null ? null : ascFromMc(mc, lat, moment);
  const now = elong(moment.getTime());
  const phase = Math.floor(now / 45) % 8;
  const inPhase = (t: number) => Math.floor(elong(t) / 45) % 8 === phase;
  // Step back and forward in progressed time (hours) to the edges of this phase.
  let back = moment.getTime();
  while (inPhase(back - 3600e3 * 6) && back - birthUtc.getTime() > -40 * DAY) back -= 3600e3 * 6;
  const start = bisect((t) => inPhase(t), back - 3600e3 * 6, back);
  let fwd = moment.getTime();
  while (inPhase(fwd + 3600e3 * 6)) fwd += 3600e3 * 6;
  const end = bisect((t) => !inPhase(t), fwd, fwd + 3600e3 * 6);
  return { moment, positions, mc, asc, phase, phaseStart: realDate(birthUtc, new Date(start)), phaseEnd: realDate(birthUtc, new Date(end)) };
}

/** The progressed Moon's and Sun's sign changes over a lifetime, as real dates. */
export function progressedTimeline(birthUtc: Date, years = 100): { moon: { date: Date; sign: number }[]; sun: { date: Date; sign: number }[]; phases: { date: Date; phase: number }[] } {
  const end = new Date(birthUtc.getTime() + years * DAY);
  const toReal = (list: { date: Date; sign: number }[]) => list.map((c) => ({ date: realDate(birthUtc, c.date), sign: c.sign }));
  const phases: { date: Date; phase: number }[] = [];
  const ph = (t: number) => Math.floor(elong(t) / 45) % 8;
  let a = birthUtc.getTime();
  let pa = ph(a);
  for (let b = a + 3 * 3600e3; a < end.getTime(); b += 3 * 3600e3) {
    const pb = ph(b);
    if (pb !== pa) {
      const t = bisect((x) => ph(x) !== pa, a, b);
      phases.push({ date: realDate(birthUtc, new Date(t)), phase: ph(t) });
    }
    a = b;
    pa = pb;
  }
  return { moon: toReal(signChanges('Moon', birthUtc, end, 2 * 3600e3)), sun: toReal(signChanges('Sun', birthUtc, end, 12 * 3600e3)), phases };
}

/* ---------- Planetary hours ---------- */

export type HourPlanet = 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn';
/** Slowest to fastest, the old order of the heavens. */
export const CHALDEAN: HourPlanet[] = ['saturn', 'jupiter', 'mars', 'sun', 'venus', 'mercury', 'moon'];
/** Sunday to Saturday */
export const DAY_RULERS: HourPlanet[] = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];

export type PlanetaryDay = {
  date: string;
  ruler: HourPlanet;
  sunrise: Date;
  sunset: Date;
  nextSunrise: Date;
  hours: { planet: HourPlanet; start: Date; end: Date; night: boolean }[];
};

/** The planetary hours of a local calendar day at a place, from sunrise to the next sunrise. Null in polar day or night. */
export function planetaryDay(date: string, lat: number, lon: number, timeZone: string): PlanetaryDay | null {
  const midnight = localToUtc(date, '00:00', timeZone);
  const obs = new Astronomy.Observer(lat, lon, 0);
  const rise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, obs, +1, midnight, 1);
  if (!rise) return null;
  const set = Astronomy.SearchRiseSet(Astronomy.Body.Sun, obs, -1, rise.date, 1);
  if (!set) return null;
  const next = Astronomy.SearchRiseSet(Astronomy.Body.Sun, obs, +1, set.date, 1);
  if (!next) return null;
  const [y, m, d] = date.split('-').map(Number);
  const wd = new Date(Date.UTC(2000, m - 1, d));
  wd.setUTCFullYear(y);
  const ruler = DAY_RULERS[wd.getUTCDay()];
  const first = CHALDEAN.indexOf(ruler);
  const dayLen = (set.date.getTime() - rise.date.getTime()) / 12;
  const nightLen = (next.date.getTime() - set.date.getTime()) / 12;
  const hours = Array.from({ length: 24 }, (_, i) => {
    const night = i >= 12;
    const start = night ? set.date.getTime() + (i - 12) * nightLen : rise.date.getTime() + i * dayLen;
    return { planet: CHALDEAN[(first + i) % 7], start: new Date(start), end: new Date(start + (night ? nightLen : dayLen)), night };
  });
  return { date, ruler, sunrise: rise.date, sunset: set.date, nextSunrise: next.date, hours };
}

/* ---------- Rising signs through a day ---------- */

/** "2024-02-28" plus days, as YYYY-MM-DD. */
export function addDays(date: string, n: number): string {
  const [y, m, d] = date.split('-').map(Number);
  const dt = new Date(0);
  dt.setUTCFullYear(y, m - 1, d + n);
  return `${String(dt.getUTCFullYear()).padStart(4, '0')}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`;
}

/** When each sign rises over a local calendar day at a place, in 2 minute steps. */
export function risingTimeline(date: string, lat: number, lon: number, timeZone: string): { sign: number; start: Date; end: Date }[] {
  const start = localToUtc(date, '00:00', timeZone).getTime();
  const end = localToUtc(addDays(date, 1), '00:00', timeZone).getTime();
  const sign = (t: number) => Math.floor(angles(new Date(t), lat, lon).asc / 30);
  const out: { sign: number; start: Date; end: Date }[] = [];
  let a = start;
  let sa = sign(a);
  let segStart = start;
  const step = 2 * 60e3;
  for (let b = a + step; b <= end; b += step) {
    const sb = sign(b);
    if (sb !== sa) {
      const t = bisect((x) => sign(x) !== sa, a, b, 5e3);
      out.push({ sign: sa, start: new Date(segStart), end: new Date(t) });
      segStart = t;
      sa = sb;
    }
    a = b;
  }
  out.push({ sign: sa, start: new Date(segStart), end: new Date(end) });
  return out;
}

/* ---------- Ephemeris ---------- */

export type EphemerisMonth = {
  days: { date: Date; positions: { body: BodyKey; lon: number; retrograde: boolean }[]; node: number }[];
  events: { date: Date; text: string; body: BodyKey | null; kind: 'ingress' | 'station' | 'new' | 'full' }[];
};

/** Daily positions at 00:00 UTC for a month, with its sign changes, stations and New and Full Moons. */
export function ephemerisMonth(year: number, month: number, trueNode: (d: Date) => number): EphemerisMonth {
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1));
  const count = Math.round((end.getTime() - start.getTime()) / DAY);
  const days = Array.from({ length: count }, (_, i) => {
    const date = new Date(start.getTime() + i * DAY);
    return { date, positions: positionsAt(date), node: trueNode(date) };
  });
  const SIGN_NAMES = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const events: EphemerisMonth['events'] = [];
  for (const b of BODIES) {
    if (b.key === 'moon') continue;
    for (const c of signChanges(b.engine, start, end)) events.push({ date: c.date, text: `${b.name} enters ${SIGN_NAMES[c.sign]}`, body: b.key, kind: 'ingress' });
  }
  for (const k of RETRO_BODIES) {
    for (const st of stations(k, start, end)) events.push({ date: st.date, text: `${BODIES.find((b) => b.key === k)!.name} turns ${st.kind === 'retrograde' ? 'retrograde' : 'direct'}`, body: k, kind: 'station' });
  }
  for (const [angle, kind, label] of [
    [0, 'new', 'New Moon'],
    [180, 'full', 'Full Moon'],
  ] as const) {
    let t = new Date(start.getTime() - DAY);
    for (;;) {
      const hit = Astronomy.SearchMoonPhase(angle, t, 40);
      if (!hit || hit.date >= end) break;
      if (hit.date >= start) {
        const sign = Math.floor(lonOf('Moon', hit.date.getTime()) / 30);
        events.push({ date: hit.date, text: `${label} in ${SIGN_NAMES[sign]}`, body: 'moon', kind });
      }
      t = new Date(hit.date.getTime() + DAY);
    }
  }
  events.sort((a, b) => a.date.getTime() - b.date.getTime());
  return { days, events };
}
