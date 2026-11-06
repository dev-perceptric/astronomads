import { findAspect, positionsAt, type Chart, type PointKey } from './chart';
import { type AspectDef, type BodyKey } from './constants';

/**
 * Transits: planets in the sky at a moment in aspect to the points of a birth chart. Used for the
 * personal daily horoscope. Orbs are tight, so a transit shows only while it is close to exact.
 */
export type Transit = {
  transit: BodyKey;
  natal: Exclude<PointKey, 'nnode' | 'snode'>;
  def: AspectDef;
  orb: number;
  /** Getting closer to exact (applying) or moving away */
  applying: boolean;
  /** How much it matters today, 0 to about 1 */
  weight: number;
};

/** Widest orb, in degrees, for each moving planet. */
const ORB: Record<BodyKey, number> = { moon: 4, sun: 2.5, mercury: 2, venus: 2, mars: 2, jupiter: 2, saturn: 1.5, uranus: 1.2, neptune: 1.2, pluto: 1.2 };
/** Slow planets mark bigger chapters; the Moon colors a few hours. */
const MOVER_WEIGHT: Record<BodyKey, number> = { moon: 0.55, sun: 0.75, mercury: 0.65, venus: 0.7, mars: 0.75, jupiter: 0.85, saturn: 0.95, uranus: 0.9, neptune: 0.85, pluto: 0.9 };
const NATAL_WEIGHT: Partial<Record<PointKey, number>> = { sun: 1, moon: 1, asc: 0.95, mc: 0.85, venus: 0.85, mars: 0.8, mercury: 0.8, jupiter: 0.65, saturn: 0.7, uranus: 0.45, neptune: 0.45, pluto: 0.5 };

/** Roughly how long a transit from this planet lasts, for wording. */
export const DURATION: Record<BodyKey, string> = {
  moon: 'a few hours',
  sun: 'a few days',
  mercury: 'a few days',
  venus: 'a few days',
  mars: 'about a week',
  jupiter: 'a few weeks',
  saturn: 'a few months',
  uranus: 'up to a year',
  neptune: 'up to a year',
  pluto: 'up to two years',
};

export function natalPoints(natal: Chart): { key: Transit['natal']; lon: number }[] {
  const pts: { key: Transit['natal']; lon: number }[] = natal.placements.map((p) => ({ key: p.body, lon: p.lon }));
  if (natal.asc !== null && natal.mc !== null) pts.push({ key: 'asc', lon: natal.asc }, { key: 'mc', lon: natal.mc });
  return pts;
}

/** Every transit to the chart at this moment, most important first. */
export function transitsAt(natal: Chart, date: Date): Transit[] {
  const sky = positionsAt(date);
  const later = positionsAt(new Date(date.getTime() + 6 * 3600e3));
  const points = natalPoints(natal);
  const out: Transit[] = [];
  for (const t of sky) {
    const tLater = later.find((x) => x.body === t.body)!;
    for (const n of points) {
      const hit = findAspect(t.lon, n.lon);
      if (!hit || hit.orb > ORB[t.body]) continue;
      const next = findAspect(tLater.lon, n.lon);
      const applying = next !== null && next.def.kind === hit.def.kind && next.orb < hit.orb;
      const closeness = 1 - hit.orb / ORB[t.body];
      out.push({ transit: t.body, natal: n.key, def: hit.def, orb: hit.orb, applying, weight: MOVER_WEIGHT[t.body] * (NATAL_WEIGHT[n.key] ?? 0.5) * (0.35 + 0.65 * closeness) * (applying ? 1 : 0.85) });
    }
  }
  return out.sort((a, b) => b.weight - a.weight);
}

/** The transits of the coming days (the Moon left out), each once, on the day it is closest. */
export function weekAhead(natal: Chart, from: Date, days = 7): (Transit & { day: Date })[] {
  const best = new Map<string, Transit & { day: Date }>();
  for (let i = 1; i <= days; i++) {
    const day = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + i, 12));
    for (const t of transitsAt(natal, day)) {
      if (t.transit === 'moon' || ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].includes(t.transit)) continue;
      const key = `${t.transit}-${t.def.kind}-${t.natal}`;
      const prev = best.get(key);
      if (!prev || t.orb < prev.orb) best.set(key, { ...t, day });
    }
  }
  return [...best.values()].sort((a, b) => a.day.getTime() - b.day.getTime() || b.weight - a.weight);
}
