import { describe, expect, it } from 'vitest';
import { BODIES } from '../constants';
import { pairKey } from '../synastry';
import { ELEMENT_LOW, ELEMENT_STRONG, MODE_STRONG, NATAL_ASPECT } from './natalAspects';
import { SYNASTRY, THEME_TEXT } from './synastry';
import { TRANSIT_FAST } from './transitsFast';
import { TRANSIT_SLOW } from './transitsSlow';

const KEYS = BODIES.map((b) => b.key);
const TONES = ['blend', 'ease', 'tension'] as const;
const breaks = (t: string) => /[—–]|\bquietly\b|\bnot\b|n't\b/i.test(t);
const ok = (t: string | undefined, minWords: number) => {
  expect(t, 'missing').toBeTruthy();
  expect(t!.split(/\s+/).length).toBeGreaterThanOrEqual(minWords);
  expect(breaks(t!), t).toBe(false);
};

describe('aspect, synastry and transit readings', () => {
  it('has a natal reading for every pair of planets', () => {
    for (let i = 0; i < KEYS.length; i++) for (let j = i + 1; j < KEYS.length; j++) for (const t of TONES) ok(NATAL_ASPECT[pairKey(KEYS[i], KEYS[j])]?.[t], 20);
    for (const v of [...Object.values(ELEMENT_STRONG), ...Object.values(ELEMENT_LOW), ...Object.values(MODE_STRONG)]) ok(v, 30);
  });

  it('has a synastry reading for every pair, same planets included', () => {
    for (let i = 0; i < KEYS.length; i++) for (let j = i; j < KEYS.length; j++) for (const t of TONES) ok(SYNASTRY[pairKey(KEYS[i], KEYS[j])]?.[t], 20);
    for (const v of Object.values(THEME_TEXT)) for (const b of ['low', 'mid', 'high'] as const) ok(v[b], 18);
  });

  it('has a transit reading for every planet to every natal point', () => {
    const points = [...KEYS, 'asc', 'mc'];
    for (const [table, movers] of [
      [TRANSIT_FAST, ['sun', 'moon', 'mercury', 'venus', 'mars']],
      [TRANSIT_SLOW, ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto']],
    ] as const)
      for (const m of movers) for (const p of points) for (const t of TONES) ok((table as Record<string, Record<string, Record<string, string>>>)[m]?.[p]?.[t], 14);
  });
});
