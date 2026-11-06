import { anglesFromFrame, chartAt, chartFrom, cuspsFromFrame, findAspect, houseOf, obliquity, positionsAt, ramcFromMc, type Chart } from './chart';
import { norm, type AspectDef, type BodyKey } from './constants';
import { pairKey, type Contact } from './synastry';

/*
 * Two people beyond love: friendship, work and family scores from the same contacts, the composite
 * and Davison charts, house overlays, the big three match, best dates and the couple's year ahead.
 */

export type RelMode = 'love' | 'friend' | 'work' | 'family';

export const MODE_THEMES = {
  love: ['attraction', 'emotional', 'communication', 'commitment', 'growth'],
  friend: ['fun', 'trust', 'talk', 'support', 'growth'],
  work: ['decisions', 'communication', 'reliability', 'drive', 'money'],
  family: ['warmth', 'understanding', 'structure', 'freedom', 'growth'],
} as const;

/** Which planet pairs feed which theme in each mode, and how strongly. */
const MODE_PAIRS: Record<RelMode, Record<string, Record<string, number>>> = {
  love: {
    attraction: { 'venus-mars': 1, 'sun-venus': 0.8, 'sun-mars': 0.7, 'mars-mars': 0.5, 'venus-venus': 0.5, 'mars-pluto': 0.6, 'venus-pluto': 0.6, 'moon-mars': 0.5, 'venus-uranus': 0.4 },
    emotional: { 'moon-moon': 1, 'sun-moon': 1, 'moon-venus': 0.8, 'moon-neptune': 0.5, 'moon-jupiter': 0.6, 'moon-saturn': 0.5, 'moon-pluto': 0.5, 'moon-mars': 0.4 },
    communication: { 'mercury-mercury': 1, 'sun-mercury': 0.8, 'moon-mercury': 0.7, 'mercury-venus': 0.6, 'mercury-mars': 0.5, 'mercury-jupiter': 0.6, 'mercury-uranus': 0.4, 'mercury-saturn': 0.4 },
    commitment: { 'sun-saturn': 1, 'moon-saturn': 0.9, 'venus-saturn': 0.9, 'sun-sun': 0.6, 'jupiter-saturn': 0.6, 'mars-saturn': 0.5, 'saturn-saturn': 0.4, 'sun-moon': 0.6 },
    growth: { 'sun-jupiter': 1, 'venus-jupiter': 0.9, 'moon-jupiter': 0.7, 'mercury-jupiter': 0.6, 'jupiter-jupiter': 0.5, 'sun-pluto': 0.5, 'sun-uranus': 0.4, 'venus-neptune': 0.4 },
  },
  friend: {
    fun: { 'sun-jupiter': 1, 'venus-jupiter': 0.8, 'moon-jupiter': 0.6, 'mars-jupiter': 0.6, 'sun-venus': 0.6, 'venus-venus': 0.6, 'sun-sun': 0.5, 'mercury-jupiter': 0.5, 'venus-uranus': 0.4 },
    trust: { 'moon-moon': 1, 'sun-moon': 0.9, 'moon-venus': 0.7, 'moon-saturn': 0.6, 'sun-saturn': 0.6, 'venus-saturn': 0.5, 'mercury-saturn': 0.4 },
    talk: { 'mercury-mercury': 1, 'sun-mercury': 0.8, 'moon-mercury': 0.7, 'mercury-venus': 0.6, 'mercury-jupiter': 0.6, 'mercury-uranus': 0.5, 'mercury-mars': 0.5 },
    support: { 'sun-moon': 1, 'moon-venus': 0.8, 'moon-jupiter': 0.8, 'sun-jupiter': 0.6, 'moon-moon': 0.6, 'venus-venus': 0.5, 'mars-jupiter': 0.4 },
    growth: { 'sun-jupiter': 0.8, 'sun-uranus': 0.6, 'sun-saturn': 0.5, 'sun-pluto': 0.5, 'mercury-uranus': 0.5, 'jupiter-jupiter': 0.5, 'jupiter-saturn': 0.4, 'moon-pluto': 0.4 },
  },
  work: {
    decisions: { 'sun-sun': 0.8, 'sun-mars': 0.8, 'mars-saturn': 0.7, 'sun-saturn': 0.7, 'mars-mars': 0.6, 'mercury-mars': 0.6, 'sun-jupiter': 0.5 },
    communication: { 'mercury-mercury': 1, 'sun-mercury': 0.8, 'mercury-saturn': 0.6, 'mercury-jupiter': 0.6, 'mercury-mars': 0.5, 'moon-mercury': 0.5, 'mercury-venus': 0.4 },
    reliability: { 'sun-saturn': 1, 'moon-saturn': 0.8, 'mercury-saturn': 0.7, 'mars-saturn': 0.7, 'jupiter-saturn': 0.6, 'saturn-saturn': 0.5, 'venus-saturn': 0.5 },
    drive: { 'sun-mars': 1, 'mars-mars': 0.8, 'mars-jupiter': 0.8, 'sun-jupiter': 0.6, 'mars-pluto': 0.6, 'sun-pluto': 0.5, 'mars-uranus': 0.5 },
    money: { 'venus-jupiter': 0.8, 'venus-saturn': 0.8, 'jupiter-saturn': 0.7, 'venus-venus': 0.6, 'sun-venus': 0.5, 'venus-pluto': 0.5, 'sun-jupiter': 0.5 },
  },
  family: {
    warmth: { 'sun-moon': 1, 'moon-moon': 0.9, 'moon-venus': 0.9, 'sun-venus': 0.7, 'moon-jupiter': 0.7, 'venus-venus': 0.5 },
    understanding: { 'moon-mercury': 0.9, 'mercury-mercury': 0.8, 'sun-mercury': 0.7, 'moon-moon': 0.7, 'sun-sun': 0.5, 'moon-neptune': 0.4 },
    structure: { 'moon-saturn': 1, 'sun-saturn': 0.9, 'mercury-saturn': 0.7, 'mars-saturn': 0.7, 'saturn-saturn': 0.5, 'venus-saturn': 0.5 },
    freedom: { 'sun-uranus': 0.8, 'moon-uranus': 0.8, 'mars-uranus': 0.7, 'sun-jupiter': 0.6, 'mars-jupiter': 0.6, 'moon-jupiter': 0.5, 'mercury-uranus': 0.5 },
    growth: { 'sun-jupiter': 1, 'moon-jupiter': 0.7, 'mercury-jupiter': 0.6, 'sun-pluto': 0.5, 'jupiter-saturn': 0.5, 'sun-saturn': 0.4 },
  },
};

const ORB_SCALE = 0.75;
const BODY_WEIGHT: Record<BodyKey, number> = { sun: 1, moon: 1, mercury: 0.7, venus: 1, mars: 0.9, jupiter: 0.6, saturn: 0.7, uranus: 0.35, neptune: 0.35, pluto: 0.4 };

/** Tense contacts add spark to attraction and push to drive; Saturn's conjunctions steady structure and reliability. */
function toneValue(theme: string, c: Contact): number {
  if (c.def.tone === 'ease') return 1;
  const steady = theme === 'commitment' || theme === 'reliability' || theme === 'structure';
  if (c.def.tone === 'blend') return c.key.includes('saturn') && !steady ? 0.2 : 0.85;
  if (theme === 'attraction') return 0.35;
  if (theme === 'drive') return 0.15;
  return c.key.includes('saturn') ? -0.7 : -0.45;
}

/** Every contact between two charts (planets only), strongest first. */
export function contactsOf(a: { body: BodyKey; lon: number }[], b: { body: BodyKey; lon: number }[]): Contact[] {
  const out: Contact[] = [];
  for (const pa of a) {
    for (const pb of b) {
      const hit = findAspect(pa.lon, pb.lon, ORB_SCALE);
      if (!hit) continue;
      const tight = 1 - hit.orb / (hit.def.orb * ORB_SCALE);
      out.push({ a: pa.body, b: pb.body, def: hit.def, orb: hit.orb, key: pairKey(pa.body, pb.body), weight: BODY_WEIGHT[pa.body] * BODY_WEIGHT[pb.body] * (0.4 + 0.6 * tight) });
    }
  }
  return out.sort((x, y) => y.weight - x.weight);
}

/** Theme scores from 8 to 97 (50 neutral) for a kind of relationship. The same scale as love compatibility. */
export function relate(a: { body: BodyKey; lon: number }[], b: { body: BodyKey; lon: number }[], mode: RelMode): { contacts: Contact[]; scores: Record<string, number>; overall: number } {
  const contacts = contactsOf(a, b);
  const scores: Record<string, number> = {};
  for (const theme of MODE_THEMES[mode]) {
    let sum = 0;
    for (const c of contacts) {
      const w = MODE_PAIRS[mode][theme][c.key];
      if (w) sum += w * c.weight * toneValue(theme, c);
    }
    scores[theme] = Math.round(Math.max(8, Math.min(97, 50 + 46 * Math.tanh(sum / 1.4))));
  }
  const list = Object.values(scores);
  return { contacts, scores, overall: Math.round(list.reduce((t, x) => t + x, 0) / list.length) };
}

/* ---------- Composite and Davison ---------- */

/** The midpoint of two longitudes along the shorter arc. */
export function midpoint(x: number, y: number): number {
  const d = norm(y - x);
  return d <= 180 ? norm(x + d / 2) : norm(y + (360 - d) / 2);
}

/**
 * The composite chart: every planet at the midpoint of the pair. The Midheaven is the midpoint of the two
 * Midheavens; the Ascendant and Placidus houses follow from it at the average latitude.
 */
export function composite(a: Chart, b: Chart, latA: number, latB: number): Chart {
  const utc = new Date((a.utc.getTime() + b.utc.getTime()) / 2);
  const raw = a.placements.map((pa) => {
    const pb = b.placements.find((x) => x.body === pa.body)!;
    return { body: pa.body, lon: midpoint(pa.lon, pb.lon), retrograde: false };
  });
  const north = midpoint(a.nodes[0].lon, b.nodes[0].lon);
  if (a.mc === null || b.mc === null) return chartFrom({ utc, timeKnown: false, raw, asc: null, mc: null, houses: null, houseSystem: null, north });
  let mc = midpoint(a.mc, b.mc);
  // The midpoint of the Midheavens can land on the far side of the Ascendants; keep it above the horizon.
  if (a.asc !== null && b.asc !== null) {
    const asc = midpoint(a.asc, b.asc);
    const d = norm(asc - mc);
    if (d > 180) mc = norm(mc + 180);
  }
  const lat = (latA + latB) / 2;
  const eps = obliquity(utc);
  const ramc = ramcFromMc(mc, eps);
  const { asc } = anglesFromFrame(ramc, eps, lat);
  let houses = cuspsFromFrame(ramc, eps, lat);
  let houseSystem: 'placidus' | 'whole-sign' = 'placidus';
  if (!houses) {
    const first = Math.floor(asc / 30) * 30;
    houses = Array.from({ length: 12 }, (_, i) => norm(first + i * 30));
    houseSystem = 'whole-sign';
  }
  return chartFrom({ utc, timeKnown: true, raw, asc, mc, houses, houseSystem, north });
}

/** The Davison chart: the moment halfway between the births, at the place halfway between them. */
export function davison(a: Chart, b: Chart, placeA: { lat: number; lon: number }, placeB: { lat: number; lon: number }): { chart: Chart; utc: Date; lat: number; lon: number } {
  const utc = new Date((a.utc.getTime() + b.utc.getTime()) / 2);
  const lat = (placeA.lat + placeB.lat) / 2;
  let lon = midpoint(norm(placeA.lon), norm(placeB.lon));
  if (lon > 180) lon -= 360;
  return { chart: chartAt(utc, lat, lon, a.timeKnown && b.timeKnown), utc, lat, lon };
}

/** Where one person's planets fall in the other's houses. */
export function overlays(guest: Chart, host: Chart): { body: BodyKey; house: number }[] {
  if (!host.houses) return [];
  return guest.placements.map((p) => ({ body: p.body, house: houseOf(p.lon, host.houses!) }));
}

/* ---------- Best dates ---------- */

export type DayKind = 'romance' | 'talk' | 'adventure' | 'home' | 'plans' | 'care';
export type DayScore = { date: Date; kind: DayKind; score: number; tension: number; moonSign: number };

const MOVERS: BodyKey[] = ['moon', 'mercury', 'venus', 'mars', 'jupiter'];
const DAY_ORB: Partial<Record<BodyKey, number>> = { moon: 6, mercury: 3, venus: 3, mars: 3, jupiter: 3 };
/** Which mover meeting which natal point feeds which kind of day, when the contact is easy or a blend. */
const KIND_OF: Record<string, DayKind> = {
  'venus-venus': 'romance', 'venus-mars': 'romance', 'venus-moon': 'care', 'venus-sun': 'romance', 'moon-venus': 'romance', 'moon-mars': 'adventure',
  'mercury-sun': 'talk', 'mercury-moon': 'talk', 'mercury-venus': 'talk', 'mercury-mars': 'plans',
  'mars-sun': 'adventure', 'mars-mars': 'adventure', 'mars-venus': 'romance', 'mars-moon': 'plans',
  'jupiter-sun': 'plans', 'jupiter-moon': 'care', 'jupiter-venus': 'romance', 'jupiter-mars': 'adventure',
  'moon-moon': 'home', 'moon-sun': 'care',
};

/** Scores the next days for two charts: which kind of day each is, and how much friction it carries. */
export function bestDates(a: Chart, b: Chart, from: Date, days = 90): DayScore[] {
  const natal = (c: Chart) => c.placements.filter((p) => ['sun', 'moon', 'venus', 'mars'].includes(p.body));
  const pa = natal(a);
  const pb = natal(b);
  const out: DayScore[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + i, 12));
    const sky = positionsAt(date).filter((x) => MOVERS.includes(x.body));
    const kinds: Record<DayKind, number> = { romance: 0, talk: 0, adventure: 0, home: 0, plans: 0, care: 0 };
    const both: Record<DayKind, [number, number]> = { romance: [0, 0], talk: [0, 0], adventure: [0, 0], home: [0, 0], plans: [0, 0], care: [0, 0] };
    let tension = 0;
    [pa, pb].forEach((points, who) => {
      for (const m of sky) {
        for (const n of points) {
          const hit = findAspect(m.lon, n.lon);
          if (!hit || hit.orb > DAY_ORB[m.body]!) continue;
          const close = 1 - hit.orb / DAY_ORB[m.body]!;
          if (hit.def.tone === 'tension') {
            if (m.body === 'mars' || m.body === 'moon' || n.body === 'mars') tension += 0.5 + close;
            continue;
          }
          const kind = KIND_OF[`${m.body}-${n.body}`];
          if (!kind) continue;
          const w = (m.body === 'moon' ? 0.8 : 1) * (0.5 + close);
          kinds[kind] += w;
          both[kind][who] += w;
        }
      }
    });
    const moonLon = sky.find((x) => x.body === 'moon')!.lon;
    const moonSign = Math.floor(moonLon / 30);
    // The Moon in a water sign leans toward home days.
    if ([3, 7, 11].includes(moonSign)) kinds.home += 0.4;
    let kind: DayKind = 'care';
    let best = -1;
    for (const k of Object.keys(kinds) as DayKind[]) {
      // A day that reaches both people counts more.
      const v = kinds[k] * (both[k][0] > 0 && both[k][1] > 0 ? 1.4 : 1);
      if (v > best) {
        best = v;
        kind = k;
      }
    }
    out.push({ date, kind, score: best - tension * 0.6, tension, moonSign });
  }
  return out;
}

/* ---------- Couple's year ahead ---------- */

export type SkyHit = { date: Date; mover: BodyKey; target: string; targetLon: number; def: AspectDef };

const ASPECT_ANGLES = [0, 60, 90, 120, 180] as const;

/**
 * Every exact aspect from slow planets to a set of points over a span. Each planet's position is
 * computed once per step and checked against every target, then the crossing is narrowed to minutes.
 */
export function exactHits(movers: BodyKey[], targets: { key: string; lon: number }[], from: Date, to: Date): SkyHit[] {
  const out: SkyHit[] = [];
  const DAY = 86400e3;
  for (const mover of movers) {
    const lonAt = (t: number) => positionsAt(new Date(t)).find((x) => x.body === mover)!.lon;
    const step = mover === 'jupiter' ? 2 * DAY : 4 * DAY;
    const goals: { key: string; lon: number; aim: number; angle: number }[] = [];
    for (const tg of targets)
      for (const ang of ASPECT_ANGLES) {
        goals.push({ key: tg.key, lon: tg.lon, aim: norm(tg.lon + ang), angle: ang });
        if (ang !== 0 && ang !== 180) goals.push({ key: tg.key, lon: tg.lon, aim: norm(tg.lon - ang), angle: ang });
      }
    const wrap = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;
    let a = from.getTime();
    let la = lonAt(a);
    for (let b = a + step; a < to.getTime(); b += step) {
      const lb = lonAt(b);
      for (const g of goals) {
        const fa = wrap(la - g.aim);
        const fb = wrap(lb - g.aim);
        if (Math.sign(fa) === Math.sign(fb) || Math.abs(fa) > 30 || Math.abs(fb) > 30) continue;
        let lo = a;
        let hi = b;
        const rising = fb > fa;
        while (hi - lo > 600e3) {
          const mid = (lo + hi) / 2;
          const v = wrap(lonAt(mid) - g.aim);
          if (rising ? v >= 0 : v <= 0) hi = mid;
          else lo = mid;
        }
        if (hi > to.getTime()) continue;
        const def = findAspect(lonAt(hi), g.lon)?.def;
        if (def) out.push({ date: new Date(hi), mover, target: g.key, targetLon: g.lon, def });
      }
      a = b;
      la = lb;
    }
  }
  return out.sort((x, y) => x.date.getTime() - y.date.getTime());
}

export const SLOW: BodyKey[] = ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

