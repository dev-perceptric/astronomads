import * as Astronomy from 'astronomy-engine';
import { ASPECTS, BODIES, SIGNS, norm, type AspectDef, type BodyKey, type Element } from './constants';
import { localToUtc } from './time';

const DEG = Math.PI / 180;

export type BirthInput = {
  date: string; // YYYY-MM-DD
  time: string | null; // HH:MM, null when unknown
  lat: number;
  lon: number;
  timeZone: string;
};

export type Placement = {
  body: BodyKey;
  lon: number;
  sign: number; // 0..11
  degree: number; // 0..29
  minute: number; // 0..59
  house: number | null; // 1..12
  retrograde: boolean;
};

export type PointKey = BodyKey | 'asc' | 'mc';

export type Aspect = {
  a: PointKey;
  b: PointKey;
  def: AspectDef;
  orb: number;
};

export type Chart = {
  utc: Date;
  timeKnown: boolean;
  placements: Placement[];
  asc: number | null;
  mc: number | null;
  /** House cusps 1 to 12 */
  houses: number[] | null;
  houseSystem: HouseSystem | null;
  aspects: Aspect[];
  elements: Record<Element, number>;
};

/** Geocentric ecliptic longitude of date, in degrees */
export function eclipticLongitude(engine: (typeof BODIES)[number]['engine'], date: Date): number {
  if (engine === 'Sun') return norm(Astronomy.SunPosition(date).elon);
  if (engine === 'Moon') return norm(Astronomy.EclipticGeoMoon(date).lon);
  const v = Astronomy.GeoVector(engine as Astronomy.Body, date, true);
  return norm(Astronomy.Ecliptic(v).elon);
}

/** Right ascension of the Midheaven and obliquity of the ecliptic, both in radians */
function frame(date: Date, lon: number): { ramc: number; eps: number } {
  const gst = Astronomy.SiderealTime(date); // hours
  const ramc = norm(gst * 15 + lon) * DEG;
  const centuries = Astronomy.MakeTime(date).tt / 36525;
  const eps = (23.4392911 - 0.0130042 * centuries) * DEG; // mean obliquity of the ecliptic
  return { ramc, eps };
}

/** Ascendant and Midheaven for a UTC instant and place */
export function angles(date: Date, lat: number, lon: number): { asc: number; mc: number } {
  const { ramc, eps } = frame(date, lon);
  const phi = lat * DEG;
  const asc = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps)));
  const mc = Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps));
  return { asc: norm(asc / DEG), mc: norm(mc / DEG) };
}

export type HouseSystem = 'placidus' | 'whole-sign';

/**
 * Placidus house cusps 1 to 12, in degrees of ecliptic longitude.
 * Each intermediate cusp divides its quadrant's semi-arc into thirds, solved by iteration.
 * Returns null near the poles, where some degrees never rise or set and Placidus has no answer.
 */
export function placidusCusps(date: Date, lat: number, lon: number): number[] | null {
  const { ramc, eps } = frame(date, lon);
  const phi = lat * DEG;
  const { asc, mc } = angles(date, lat, lon);
  const lonFromRa = (ra: number) => Math.atan2(Math.sin(ra), Math.cos(ra) * Math.cos(eps));
  const semiArc = (ra: number, nocturnal: boolean): number | null => {
    const decl = Math.asin(Math.sin(eps) * Math.sin(lonFromRa(ra)));
    const x = -Math.tan(phi) * Math.tan(decl);
    if (x < -1 || x > 1) return null;
    const dsa = Math.acos(x);
    return nocturnal ? Math.PI - dsa : dsa;
  };
  const solve = (fraction: number, nocturnal: boolean): number | null => {
    const base = nocturnal ? ramc + Math.PI : ramc;
    const sign = nocturnal ? -1 : 1;
    let ra = base + sign * fraction * (Math.PI / 2);
    for (let i = 0; i < 60; i++) {
      const arc = semiArc(ra, nocturnal);
      if (arc === null) return null;
      const next = base + sign * fraction * arc;
      if (Math.abs(next - ra) < 1e-10) break;
      ra = next;
    }
    return norm(lonFromRa(ra) / DEG);
  };
  const c11 = solve(1 / 3, false);
  const c12 = solve(2 / 3, false);
  const c2 = solve(2 / 3, true);
  const c3 = solve(1 / 3, true);
  if (c11 === null || c12 === null || c2 === null || c3 === null) return null;
  const first = [asc, c2, c3, norm(mc + 180), norm(c11 + 180), norm(c12 + 180)];
  return [...first, ...first.map((c) => norm(c + 180))];
}

/** Which house (1..12) a longitude falls in, given 12 cusps in order */
export function houseOf(lon: number, cusps: number[]): number {
  for (let i = 0; i < 12; i++) {
    const start = cusps[i];
    const span = norm(cusps[(i + 1) % 12] - start);
    if (norm(lon - start) < span) return i + 1;
  }
  return 12;
}

export function separation(a: number, b: number): number {
  const d = Math.abs(norm(a) - norm(b)) % 360;
  return d > 180 ? 360 - d : d;
}

export function findAspect(a: number, b: number, orbScale = 1): { def: AspectDef; orb: number } | null {
  const d = separation(a, b);
  for (const def of ASPECTS) {
    const orb = Math.abs(d - def.angle);
    if (orb <= def.orb * orbScale) return { def, orb };
  }
  return null;
}

export function positionsAt(date: Date): { body: BodyKey; lon: number; retrograde: boolean }[] {
  const later = new Date(date.getTime() + 12 * 3600 * 1000);
  return BODIES.map((b) => {
    const lon = eclipticLongitude(b.engine, date);
    const next = eclipticLongitude(b.engine, later);
    let delta = next - lon;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    return { body: b.key, lon, retrograde: b.key !== 'sun' && b.key !== 'moon' && delta < 0 };
  });
}

export function computeChart(input: BirthInput): Chart {
  const timeKnown = Boolean(input.time);
  const utc = localToUtc(input.date, input.time ?? '12:00', input.timeZone);
  const raw = positionsAt(utc);

  let asc: number | null = null;
  let mc: number | null = null;
  let houses: number[] | null = null;
  let houseSystem: HouseSystem | null = null;
  if (timeKnown) {
    ({ asc, mc } = angles(utc, input.lat, input.lon));
    houses = placidusCusps(utc, input.lat, input.lon);
    houseSystem = 'placidus';
    if (!houses) {
      // Placidus fails near the poles; whole sign houses always work.
      const first = Math.floor(asc / 30) * 30;
      houses = Array.from({ length: 12 }, (_, i) => norm(first + i * 30));
      houseSystem = 'whole-sign';
    }
  }

  const placements: Placement[] = raw.map(({ body, lon, retrograde }) => {
    const sign = Math.floor(lon / 30);
    const inSign = lon - sign * 30;
    let degree = Math.floor(inSign);
    let minute = Math.round((inSign - degree) * 60);
    if (minute === 60) {
      degree += 1;
      minute = 0;
    }
    const house = houses ? houseOf(lon, houses) : null;
    return { body, lon, sign, degree, minute, house, retrograde };
  });

  const points: { key: PointKey; lon: number }[] = placements.map((p) => ({ key: p.body, lon: p.lon }));
  if (asc !== null && mc !== null) points.push({ key: 'asc', lon: asc }, { key: 'mc', lon: mc });

  const aspects: Aspect[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      // The Ascendant and Midheaven are angles of one frame, never aspected to each other.
      if (points[i].key === 'asc' && points[j].key === 'mc') continue;
      const hit = findAspect(points[i].lon, points[j].lon);
      if (hit) aspects.push({ a: points[i].key, b: points[j].key, ...hit });
    }
  }
  aspects.sort((x, y) => x.orb - y.orb);

  const elements: Record<Element, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  for (const p of placements) {
    const w = p.body === 'sun' || p.body === 'moon' ? 2 : 1;
    elements[SIGNS[p.sign].element] += w;
  }
  if (asc !== null) elements[SIGNS[Math.floor(asc / 30)].element] += 2;

  return { utc, timeKnown, placements, asc, mc, houses, houseSystem, aspects, elements };
}

export function moonPhase(date: Date): { angle: number; name: string; illumination: number } {
  const angle = Astronomy.MoonPhase(date);
  const illumination = (1 - Math.cos(angle * DEG)) / 2;
  const names = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
  ];
  return { angle, name: names[Math.round(angle / 45) % 8], illumination };
}

export function formatDegree(lon: number): string {
  const inSign = norm(lon) % 30;
  let d = Math.floor(inSign);
  let m = Math.round((inSign - d) * 60);
  if (m === 60) {
    d += 1;
    m = 0;
  }
  return `${d}°${String(m).padStart(2, '0')}′`;
}
