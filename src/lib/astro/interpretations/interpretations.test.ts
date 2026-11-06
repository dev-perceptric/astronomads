import { describe, expect, it } from 'vitest';
import { computeChart, type PointKey } from '../chart';
import { BODIES } from '../constants';
import { ANGLE_ASPECT, IN_HOUSE, IN_SIGN, NODE_ANGLE, NODE_CONTACT, POINT_INFO, aspectReading, firstSentence, ordinal, readingOrder } from '.';

const POINTS: PointKey[] = [...BODIES.map((b) => b.key), 'nnode', 'snode', 'asc', 'mc'];
const words = (t: string) => t.trim().split(/\s+/).length;
/** Copy rules from the brand voice: no dashes, no "quietly", no "not X, Y" turns. */
const breaksRules = (t: string) => /[—–]|\bquietly\b|\bnot\b|n't\b/i.test(t);

describe('interpretations', () => {
  it('has a meaning for every point', () => {
    for (const k of POINTS) {
      const info = POINT_INFO[k];
      expect(info.role.length).toBeGreaterThan(3);
      expect(info.keywords.length).toBeGreaterThanOrEqual(3);
      expect(words(info.text)).toBeGreaterThanOrEqual(25);
      expect(breaksRules(info.text)).toBe(false);
    }
  });

  it('has a reading for every point in every sign', () => {
    for (const k of POINTS) {
      expect(IN_SIGN[k]).toHaveLength(12);
      for (const t of IN_SIGN[k]) {
        expect(words(t)).toBeGreaterThanOrEqual(20);
        expect(breaksRules(t)).toBe(false);
      }
      expect(new Set(IN_SIGN[k]).size).toBe(12);
    }
  });

  it('has a reading for every planet and node in every house', () => {
    for (const k of [...BODIES.map((b) => b.key), 'nnode', 'snode'] as const) {
      expect(IN_HOUSE[k]).toHaveLength(12);
      for (const t of IN_HOUSE[k]) {
        expect(words(t)).toBeGreaterThanOrEqual(20);
        expect(breaksRules(t)).toBe(false);
      }
      expect(new Set(IN_HOUSE[k]).size).toBe(12);
    }
  });

  it('has a reading for every planet and angle sitting on a node', () => {
    for (const node of ['nnode', 'snode'] as const) {
      for (const b of BODIES) {
        expect(words(NODE_CONTACT[b.key][node])).toBeGreaterThanOrEqual(20);
        expect(breaksRules(NODE_CONTACT[b.key][node])).toBe(false);
      }
      for (const angle of ['asc', 'mc'] as const) {
        expect(words(NODE_ANGLE[node][angle])).toBeGreaterThanOrEqual(20);
        expect(breaksRules(NODE_ANGLE[node][angle])).toBe(false);
      }
    }
  });

  it('has a reading for every planet aspecting the Ascendant and Midheaven', () => {
    for (const b of BODIES) {
      for (const angle of ['asc', 'mc'] as const) {
        for (const tone of ['blend', 'ease', 'tension'] as const) {
          const t = ANGLE_ASPECT[b.key][angle][tone];
          expect(words(t)).toBeGreaterThanOrEqual(20);
          expect(breaksRules(t)).toBe(false);
        }
      }
    }
  });

  it('uses the written angle text for aspects to AC and MC', () => {
    const chart = computeChart({ date: '1961-08-04', time: '19:24', lat: 21.3069, lon: -157.8583, timeZone: 'Pacific/Honolulu' });
    const toAngle = chart.aspects.filter((a) => a.a === 'asc' || a.b === 'asc' || a.a === 'mc' || a.b === 'mc');
    expect(toAngle.length).toBeGreaterThan(0);
    for (const a of toAngle.filter((x) => !['nnode', 'snode'].includes(x.a) && !['nnode', 'snode'].includes(x.b))) {
      const angle = a.a === 'asc' || a.a === 'mc' ? a.a : (a.b as 'asc' | 'mc');
      const body = (angle === a.a ? a.b : a.a) as keyof typeof ANGLE_ASPECT;
      expect(aspectReading(a)).toBe(ANGLE_ASPECT[body][angle][a.def.tone]);
    }
    expect(readingOrder(chart)).toEqual(POINTS);
  });

  it('formats ordinals and first sentences', () => {
    expect([1, 2, 3, 4, 11, 12].map(ordinal)).toEqual(['1st', '2nd', '3rd', '4th', '11th', '12th']);
    expect(firstSentence('You lead. Then you rest.')).toBe('You lead.');
  });
});
