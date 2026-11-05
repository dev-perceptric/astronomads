import { describe, expect, it } from 'vitest';
import { computeChart, findAspect, moonPhase, separation } from './chart';
import { SIGNS } from './constants';
import { localToUtc } from './time';

const signName = (lon: number) => SIGNS[Math.floor(lon / 30)].name;
const inSign = (lon: number) => lon % 30;

describe('localToUtc', () => {
  it('uses historical offsets (Honolulu 1961 was UTC−10)', () => {
    expect(localToUtc('1961-08-04', '19:24', 'Pacific/Honolulu').toISOString()).toBe('1961-08-05T05:24:00.000Z');
  });

  it('applies summer time (London, June 1998 is UTC+1)', () => {
    expect(localToUtc('1998-06-21', '12:00', 'Europe/London').toISOString()).toBe('1998-06-21T11:00:00.000Z');
  });

  it('applies winter time (London, January 1998 is UTC+0)', () => {
    expect(localToUtc('1998-01-21', '12:00', 'Europe/London').toISOString()).toBe('1998-01-21T12:00:00.000Z');
  });

  it('returns a real instant for a clock time skipped by a daylight saving change', () => {
    const d = localToUtc('2021-03-28', '01:30', 'Europe/London');
    expect(Number.isNaN(d.getTime())).toBe(false);
    expect(Math.abs(d.getTime() - Date.UTC(2021, 2, 28, 1, 0))).toBeLessThanOrEqual(3600 * 1000);
  });

  it('rejects a broken date', () => {
    expect(() => localToUtc('1998-xx-01', '12:00', 'UTC')).toThrow();
  });
});

describe('computeChart', () => {
  // Barack Obama: 4 Aug 1961, 19:24, Honolulu (birth certificate time).
  // Reference positions: Sun 12°33′ Leo, Moon 3°21′ Gemini, Ascendant 18°03′ Aquarius, MC 28°52′ Scorpio.
  const obama = computeChart({ date: '1961-08-04', time: '19:24', lat: 21.3069, lon: -157.8583, timeZone: 'Pacific/Honolulu' });
  const at = (key: string) => obama.placements.find((p) => p.body === key)!;

  it('places the Sun and Moon within a tenth of a degree', () => {
    expect(signName(at('sun').lon)).toBe('Leo');
    expect(inSign(at('sun').lon)).toBeCloseTo(12.55, 1);
    expect(signName(at('moon').lon)).toBe('Gemini');
    expect(inSign(at('moon').lon)).toBeCloseTo(3.36, 1);
  });

  it('places the angles within a fifth of a degree', () => {
    expect(signName(obama.asc!)).toBe('Aquarius');
    expect(Math.abs(inSign(obama.asc!) - 18.05)).toBeLessThan(0.2);
    expect(signName(obama.mc!)).toBe('Scorpio');
    expect(Math.abs(inSign(obama.mc!) - 28.87)).toBeLessThan(0.2);
  });

  it('uses whole sign houses from the rising sign', () => {
    expect(obama.houses![0]).toBe(300); // Aquarius
    expect(at('sun').house).toBe(7); // Leo is the 7th sign from Aquarius
  });

  it('marks retrograde planets', () => {
    // Jupiter and Saturn were both retrograde in early August 1961.
    expect(at('jupiter').retrograde).toBe(true);
    expect(at('saturn').retrograde).toBe(true);
    expect(at('sun').retrograde).toBe(false);
  });

  it('hides houses and angles when the birth time is unknown', () => {
    const c = computeChart({ date: '1961-08-04', time: null, lat: 21.3, lon: -157.86, timeZone: 'Pacific/Honolulu' });
    expect(c.timeKnown).toBe(false);
    expect(c.asc).toBeNull();
    expect(c.houses).toBeNull();
    expect(c.placements.every((p) => p.house === null)).toBe(true);
    expect(c.aspects.some((a) => a.a === 'asc' || a.b === 'asc')).toBe(false);
  });

  it('sorts aspects tightest first', () => {
    const orbs = obama.aspects.map((a) => a.orb);
    expect([...orbs].sort((x, y) => x - y)).toEqual(orbs);
  });
});

describe('aspects', () => {
  it('measures separation across 0° Aries', () => {
    expect(separation(355, 5)).toBe(10);
    expect(separation(10, 190)).toBe(180);
  });

  it('finds trines within orb and nothing outside', () => {
    expect(findAspect(10, 131)?.def.kind).toBe('trine');
    expect(findAspect(10, 140)).toBeNull();
  });
});

describe('moonPhase', () => {
  it('names the full moon of 28 Jan 2021, 19:16 UTC', () => {
    expect(moonPhase(new Date('2021-01-28T19:16:00Z')).name).toBe('Full Moon');
  });
});
