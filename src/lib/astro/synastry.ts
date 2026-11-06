import { findAspect, type Chart } from './chart';
import { BODIES, type AspectDef, type BodyKey } from './constants';

/**
 * Compatibility between two birth charts (synastry): every aspect between one person's planets and the
 * other's, and five theme scores built from them. Scores are a guide, made from weighted contacts.
 */
export type Theme = 'attraction' | 'emotional' | 'communication' | 'commitment' | 'growth';
export const THEMES: Theme[] = ['attraction', 'emotional', 'communication', 'commitment', 'growth'];

export type Contact = {
  /** Person A's planet and person B's planet */
  a: BodyKey;
  b: BodyKey;
  def: AspectDef;
  orb: number;
  /** Sorted pair key for readings, like "venus-mars" */
  key: string;
  /** How much this contact matters, 0 to 1 */
  weight: number;
};

const ORDER = BODIES.map((b) => b.key);
export const pairKey = (x: BodyKey, y: BodyKey) => (ORDER.indexOf(x) <= ORDER.indexOf(y) ? `${x}-${y}` : `${y}-${x}`);

/** Synastry orbs are a little tighter than in one chart. */
const ORB_SCALE = 0.75;

/** Personal planets carry the most weight in a relationship. */
const BODY_WEIGHT: Record<BodyKey, number> = { sun: 1, moon: 1, mercury: 0.7, venus: 1, mars: 0.9, jupiter: 0.6, saturn: 0.7, uranus: 0.35, neptune: 0.35, pluto: 0.4 };

/** Which pairs feed which theme, and how strongly. */
const THEME_PAIRS: Record<Theme, Record<string, number>> = {
  attraction: { 'venus-mars': 1, 'sun-venus': 0.8, 'sun-mars': 0.7, 'mars-mars': 0.5, 'venus-venus': 0.5, 'mars-pluto': 0.6, 'venus-pluto': 0.6, 'moon-mars': 0.5, 'venus-uranus': 0.4 },
  emotional: { 'moon-moon': 1, 'sun-moon': 1, 'moon-venus': 0.8, 'moon-neptune': 0.5, 'moon-jupiter': 0.6, 'moon-saturn': 0.5, 'moon-pluto': 0.5, 'moon-mars': 0.4 },
  communication: { 'mercury-mercury': 1, 'sun-mercury': 0.8, 'moon-mercury': 0.7, 'mercury-venus': 0.6, 'mercury-mars': 0.5, 'mercury-jupiter': 0.6, 'mercury-uranus': 0.4, 'mercury-saturn': 0.4 },
  commitment: { 'sun-saturn': 1, 'moon-saturn': 0.9, 'venus-saturn': 0.9, 'sun-sun': 0.6, 'jupiter-saturn': 0.6, 'mars-saturn': 0.5, 'saturn-saturn': 0.4, 'sun-moon': 0.6 },
  growth: { 'sun-jupiter': 1, 'venus-jupiter': 0.9, 'moon-jupiter': 0.7, 'mercury-jupiter': 0.6, 'jupiter-jupiter': 0.5, 'sun-pluto': 0.5, 'sun-uranus': 0.4, 'venus-neptune': 0.4 },
};

/**
 * How a contact's harmony moves a theme. Easy contacts help everywhere. Conjunctions help, except
 * Saturn's, which can weigh. Tense contacts cost a little, except in attraction, where they add spark.
 */
function toneValue(theme: Theme, c: Contact): number {
  if (c.def.tone === 'ease') return 1;
  if (c.def.tone === 'blend') return c.key.includes('saturn') && theme !== 'commitment' ? 0.2 : 0.85;
  return theme === 'attraction' ? 0.35 : c.key.includes('saturn') ? -0.7 : -0.45;
}

export function synastry(a: Chart, b: Chart): { contacts: Contact[]; scores: Record<Theme, number>; overall: number } {
  const contacts: Contact[] = [];
  for (const pa of a.placements) {
    for (const pb of b.placements) {
      const hit = findAspect(pa.lon, pb.lon, ORB_SCALE);
      if (!hit) continue;
      const tight = 1 - hit.orb / (hit.def.orb * ORB_SCALE);
      contacts.push({ a: pa.body, b: pb.body, def: hit.def, orb: hit.orb, key: pairKey(pa.body, pb.body), weight: BODY_WEIGHT[pa.body] * BODY_WEIGHT[pb.body] * (0.4 + 0.6 * tight) });
    }
  }
  contacts.sort((x, y) => y.weight - x.weight);

  const scores = {} as Record<Theme, number>;
  for (const theme of THEMES) {
    let sum = 0;
    for (const c of contacts) {
      const w = THEME_PAIRS[theme][c.key];
      if (w) sum += w * c.weight * toneValue(theme, c);
    }
    // 50 is neutral; a few strong easy contacts lift a theme toward the top.
    scores[theme] = Math.round(Math.max(8, Math.min(97, 50 + 46 * Math.tanh(sum / 1.4))));
  }
  const overall = Math.round(THEMES.reduce((t, k) => t + scores[k], 0) / THEMES.length);
  return { contacts, scores, overall };
}
