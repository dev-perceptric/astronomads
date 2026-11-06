import type { Aspect, Chart, PointKey } from '../chart';
import { isNode, type BodyKey, type NodeKey } from '../constants';
import { isAngle } from '../points';
import { natalAspectLine } from '../readings';
import { ANGLE_ASPECT } from './angleAspects';
import { IN_HOUSE as PLANET_IN_HOUSE } from './inHouse';
import { IN_SIGN as POINT_IN_SIGN } from './inSign';
import { NODE_ANGLE, NODE_CONTACT, NODE_INFO, NODE_IN_HOUSE, NODE_IN_SIGN } from './nodes';
import { ELEMENT_LOW, ELEMENT_STRONG, MODE_STRONG, NATAL_ASPECT } from './natalAspects';
import { pairKey } from '../synastry';
import { POINT_INFO as CORE_INFO, type PointInfo } from './points';

/** What every point stands for: planets, nodes, Ascendant and Midheaven. */
export const POINT_INFO: Record<PointKey, PointInfo> = { ...CORE_INFO, ...NODE_INFO };
/** Every point in every sign. Index 0 is Aries. */
export const IN_SIGN: Record<PointKey, string[]> = { ...POINT_IN_SIGN, ...NODE_IN_SIGN };
/** Every planet and node in every house. Index 0 is the 1st house. */
export const IN_HOUSE: Record<BodyKey | NodeKey, string[]> = { ...PLANET_IN_HOUSE, ...NODE_IN_HOUSE };

export { ANGLE_ASPECT, ELEMENT_LOW, ELEMENT_STRONG, MODE_STRONG, NATAL_ASPECT, NODE_ANGLE, NODE_CONTACT };
export { isAngle, pointColor, pointName, pointWeight } from '../points';

/** "1st", "2nd", "3rd", "11th" */
export const ordinal = (n: number) => {
  const tail = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th';
  return `${n}${tail}`;
};

/** Where a point sits: its longitude, sign index and house (null when the birth time is unknown). */
export function pointPosition(chart: Chart, k: PointKey): { lon: number; sign: number; house: number | null; retrograde: boolean } | null {
  if (k === 'asc' || k === 'mc') {
    const lon = k === 'asc' ? chart.asc : chart.mc;
    if (lon === null) return null;
    return { lon, sign: Math.floor(lon / 30), house: k === 'asc' ? 1 : 10, retrograde: false };
  }
  if (isNode(k)) {
    const n = chart.nodes.find((x) => x.key === k);
    return n ? { lon: n.lon, sign: n.sign, house: n.house, retrograde: false } : null;
  }
  const p = chart.placements.find((x) => x.body === k);
  return p ? { lon: p.lon, sign: p.sign, house: p.house, retrograde: p.retrograde } : null;
}

/** The reading for one natal aspect. Aspects to the angles and the nodes get their own written text. */
export function aspectReading(a: Aspect): string {
  const node = isNode(a.a) ? a.a : isNode(a.b) ? a.b : null;
  const angle = isAngle(a.a) ? a.a : isAngle(a.b) ? a.b : null;
  if (node) {
    const other = node === a.a ? a.b : a.a;
    if (isAngle(other)) return NODE_ANGLE[node][other];
    if (!isNode(other)) return NODE_CONTACT[other][node];
  }
  if (angle) {
    const body = angle === a.a ? a.b : a.a;
    if (!isAngle(body) && !isNode(body)) return ANGLE_ASPECT[body][angle][a.def.tone];
  }
  if (!angle && !node) {
    const written = NATAL_ASPECT[pairKey(a.a as BodyKey, a.b as BodyKey)]?.[a.def.tone];
    if (written) return written;
  }
  return natalAspectLine(a.a, a.def.kind, a.b);
}

/** The first sentence of a reading, for cards. */
export const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

/** Every point in reading order: the planets, the nodes, then the Ascendant and Midheaven when the time is known. */
export function readingOrder(chart: Chart): PointKey[] {
  const list: PointKey[] = chart.placements.map((p) => p.body);
  for (const n of chart.nodes) list.push(n.key);
  if (chart.asc !== null && chart.mc !== null) list.push('asc', 'mc');
  return list;
}
