import type { Aspect, Chart, PointKey } from '../chart';
import { bodyByKey, type BodyKey } from '../constants';
import { natalAspectLine } from '../readings';
import { ANGLE_ASPECT } from './angleAspects';
import { IN_HOUSE } from './inHouse';
import { IN_SIGN } from './inSign';
import { POINT_INFO } from './points';

export { ANGLE_ASPECT, IN_HOUSE, IN_SIGN, POINT_INFO };

export const isAngle = (k: PointKey): k is 'asc' | 'mc' => k === 'asc' || k === 'mc';
export const pointName = (k: PointKey) => (k === 'asc' ? 'Ascendant' : k === 'mc' ? 'Midheaven' : bodyByKey(k).name);

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
  const p = chart.placements.find((x) => x.body === k);
  return p ? { lon: p.lon, sign: p.sign, house: p.house, retrograde: p.retrograde } : null;
}

/** The reading for one natal aspect. Aspects to the Ascendant or Midheaven get their own written text. */
export function aspectReading(a: Aspect): string {
  const angle = isAngle(a.a) ? a.a : isAngle(a.b) ? a.b : null;
  const body = (angle === a.a ? a.b : a.a) as BodyKey;
  if (angle && !isAngle(body)) return ANGLE_ASPECT[body][angle][a.def.tone];
  return natalAspectLine(a.a, a.def.kind, a.b);
}

/** The first sentence of a reading, for cards. */
export const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

/** Every point in reading order: the planets, then the Ascendant and Midheaven when the time is known. */
export function readingOrder(chart: Chart): PointKey[] {
  const list: PointKey[] = chart.placements.map((p) => p.body);
  if (chart.asc !== null && chart.mc !== null) list.push('asc', 'mc');
  return list;
}
