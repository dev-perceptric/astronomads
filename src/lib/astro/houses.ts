import * as Astronomy from 'astronomy-engine';
import { cuspsFromFrame } from './chart';
import { norm } from './constants';

/*
 * Ten ways to divide a chart into houses, for the house systems article and its comparison tool.
 * Every system shares the same frame: the right ascension of the Midheaven (RAMC), the obliquity of
 * the ecliptic and the latitude. Checked against Swiss Ephemeris in houses.test.ts.
 */

export type HouseSystemKey = 'placidus' | 'koch' | 'porphyry' | 'regiomontanus' | 'campanus' | 'alcabitius' | 'equal' | 'whole-sign' | 'meridian' | 'morinus';

export const HOUSE_SYSTEMS: { key: HouseSystemKey; name: string; divides: string; era: string }[] = [
  { key: 'whole-sign', name: 'Whole sign', divides: 'Whole signs, starting with the rising sign', era: 'Hellenistic, 1st century BCE onward' },
  { key: 'equal', name: 'Equal', divides: 'The ecliptic, in 30° steps from the Ascendant', era: 'Hellenistic, revived in the 20th century' },
  { key: 'porphyry', name: 'Porphyry', divides: 'Each quadrant of the ecliptic, in thirds', era: 'Late antiquity, 3rd century CE' },
  { key: 'alcabitius', name: 'Alcabitius', divides: 'The Ascendant’s day and night arcs, in thirds of time', era: 'Medieval Arabic, 10th century' },
  { key: 'campanus', name: 'Campanus', divides: 'The prime vertical, in 30° steps', era: 'Medieval Latin, 13th century' },
  { key: 'regiomontanus', name: 'Regiomontanus', divides: 'The celestial equator, in 30° steps', era: 'Renaissance, 15th century' },
  { key: 'placidus', name: 'Placidus', divides: 'Each degree’s own day and night arc, in thirds of time', era: 'Baroque, 17th century' },
  { key: 'morinus', name: 'Morinus', divides: 'The equator, projected through the poles of the ecliptic', era: '17th century' },
  { key: 'meridian', name: 'Meridian', divides: 'The equator, projected through the celestial poles', era: '20th century' },
  { key: 'koch', name: 'Koch', divides: 'The Midheaven degree’s day arc at the birthplace, in thirds', era: '20th century (1971)' },
];

const D = Math.PI / 180;
const deg = (r: number) => norm(r / D);

/** The ecliptic degree rising for an RAMC (degrees) at a pole height (degrees). With the real latitude it is the Ascendant. */
export function ascAtPole(theta: number, pole: number, eps: number): number {
  const t = theta * D;
  return deg(Math.atan2(Math.cos(t), -(Math.sin(t) * Math.cos(eps) + Math.tan(pole * D) * Math.sin(eps))));
}

/** The ecliptic degree with a given right ascension (projection through the celestial poles). */
export const lonFromRa = (ra: number, eps: number) => deg(Math.atan2(Math.sin(ra * D), Math.cos(ra * D) * Math.cos(eps)));

/** The frame of a moment and place: RAMC in degrees and obliquity in radians. */
export function frameOf(date: Date, lon: number): { ramc: number; eps: number } {
  const ramc = norm(Astronomy.SiderealTime(date) * 15 + lon);
  const eps = (23.4392911 - 0.0130042 * (Astronomy.MakeTime(date).tt / 36525)) * D;
  return { ramc, eps };
}

/** Builds 12 cusps from the five the quadrant systems compute (11, 12, 1, 2, 3) and the Midheaven. */
const fromFive = (mc: number, [c11, c12, c1, c2, c3]: number[]) => {
  const east = [c1, c2, c3, norm(mc + 180), norm(c11 + 180), norm(c12 + 180)];
  return [...east, ...east.map((c) => norm(c + 180))];
};

/**
 * House cusps 1 to 12 in ecliptic longitude. Returns null where a system has no answer: Placidus near
 * and beyond the polar circles, where some degrees never rise or set.
 */
export function houseCusps(system: HouseSystemKey, ramc: number, eps: number, lat: number): number[] | null {
  const mc = lonFromRa(ramc, eps);
  const asc = ascAtPole(ramc, lat, eps);
  switch (system) {
    case 'placidus':
      return cuspsFromFrame(ramc * D, eps, lat);
    case 'equal':
      return Array.from({ length: 12 }, (_, i) => norm(asc + 30 * i));
    case 'whole-sign':
      return Array.from({ length: 12 }, (_, i) => norm(Math.floor(asc / 30) * 30 + 30 * i));
    case 'porphyry': {
      const a = norm(asc - mc) / 3;
      const b = norm(mc + 180 - asc) / 3;
      return fromFive(mc, [mc + a, mc + 2 * a, asc, asc + b, asc + 2 * b].map(norm));
    }
    case 'regiomontanus': {
      // Equal 30° steps of the equator, each projected onto the ecliptic through the north and south points.
      const c = (h: number) => ascAtPole(ramc + h - 90, Math.atan(Math.tan(lat * D) * Math.sin(h * D)) / D, eps);
      return fromFive(mc, [c(30), c(60), asc, c(120), c(150)]);
    }
    case 'campanus': {
      // Equal 30° steps of the prime vertical, turned into an equator offset and a pole height.
      const c = (a: number) => {
        const h = Math.atan2(Math.cos(lat * D) * Math.sin(a * D), Math.cos(a * D)) / D;
        const pole = Math.asin(Math.sin(lat * D) * Math.sin(a * D)) / D;
        return ascAtPole(ramc + h - 90, pole, eps);
      };
      return fromFive(mc, [c(30), c(60), asc, c(120), c(150)]);
    }
    case 'alcabitius': {
      // Thirds of the Ascendant degree's day arc and night arc, in right ascension.
      const dec = Math.asin(Math.sin(eps) * Math.sin(asc * D));
      const ad = Math.asin(Math.max(-1, Math.min(1, Math.tan(lat * D) * Math.tan(dec)))) / D;
      const day = 90 + ad;
      const night = 180 - day;
      return fromFive(mc, [lonFromRa(ramc + day / 3, eps), lonFromRa(ramc + (2 * day) / 3, eps), asc, lonFromRa(ramc + day + night / 3, eps), lonFromRa(ramc + day + (2 * night) / 3, eps)]);
    }
    case 'koch': {
      // Thirds of the Midheaven degree's day arc at the birthplace, each read as a rising degree.
      const dec = Math.asin(Math.sin(eps) * Math.sin(mc * D));
      const x = Math.tan(lat * D) * Math.tan(dec);
      if (Math.abs(x) > 1) return null;
      const ad = Math.asin(x) / D;
      const oa = ramc - ad;
      const d = (90 + ad) / 3;
      const c = (k: number) => ascAtPole(oa + k * d - 90, lat, eps);
      return fromFive(mc, [c(1), c(2), asc, c(4), c(5)]);
    }
    case 'meridian':
      // Equal steps of the equator from the RAMC, carried to the ecliptic along hour circles.
      return Array.from({ length: 12 }, (_, i) => lonFromRa(ramc + 90 + 30 * i, eps));
    case 'morinus':
      // Equal steps of the equator from the RAMC, carried to the ecliptic through the ecliptic's poles.
      return Array.from({ length: 12 }, (_, i) => {
        const a = (ramc + 90 + 30 * i) * D;
        return deg(Math.atan2(Math.sin(a) * Math.cos(eps), Math.cos(a)));
      });
  }
}

/* ---------- Hemispheres and quadrants ---------- */

export type Region = 'north' | 'south' | 'east' | 'west';
export type Quadrant = 1 | 2 | 3 | 4; // 1: houses 1 to 3, 2: 4 to 6, 3: 7 to 9, 4: 10 to 12

/**
 * Where a house sits. Houses 1 to 6 lie below the horizon (the northern hemisphere of the chart),
 * 7 to 12 above it (southern). Houses 10 to 3 lie on the Ascendant side (eastern), 4 to 9 on the
 * Descendant side (western).
 */
export const regionOf = (house: number) => ({
  vertical: house <= 6 ? ('north' as const) : ('south' as const),
  horizontal: house >= 10 || house <= 3 ? ('east' as const) : ('west' as const),
  quadrant: (Math.ceil(house / 3) as Quadrant),
});
