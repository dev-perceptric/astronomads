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

  it('places Placidus cusps within 0.1° of Swiss Ephemeris', () => {
    expect(obama.houseSystem).toBe('placidus');
    expectCusps(obama.houses!, OBAMA_CUSPS);
    expect(at('sun').house).toBe(6); // 12°33' Leo sits before the 7th cusp at 18°03' Leo
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

// Placidus cusps 1 to 12 from Swiss Ephemeris (swe.houses, 'P') for the same moments and places.
const OBAMA_CUSPS = [318.052, 355.908, 30.299, 58.893, 83.981, 109.023, 138.052, 175.908, 210.299, 238.893, 263.981, 289.023];
const REFERENCE: { name: string; date: string; time: string; lat: number; lon: number; tz: string; cusps: number[] }[] = [
  { name: 'Lisbon 1996', date: '1996-03-20', time: '06:40', lat: 38.7251, lon: -9.1498, tz: 'UTC', cusps: [358.21, 39.371, 66.887, 89.017, 110.99, 137.953, 178.21, 219.371, 246.887, 269.017, 290.99, 317.953] },
  { name: 'Sydney 1985 (south)', date: '1985-12-01', time: '22:15', lat: -33.8679, lon: 151.2073, tz: 'UTC', cusps: [298.129, 320.065, 345.794, 16.997, 52.368, 87.182, 118.129, 140.065, 165.794, 196.997, 232.368, 267.182] },
  { name: 'Oslo 2000 (far north)', date: '2000-06-15', time: '03:30', lat: 59.9127, lon: 10.7461, tz: 'UTC', cusps: [102.536, 113.483, 126.466, 144.679, 175.604, 232.869, 282.536, 293.483, 306.466, 324.679, 355.604, 52.869] },
  { name: 'Quito 1977 (equator)', date: '1977-02-02', time: '14:00', lat: -0.2299, lon: -78.5249, tz: 'UTC', cusps: [353.61, 25.988, 56.407, 84.605, 112.364, 141.791, 173.61, 205.988, 236.407, 264.605, 292.364, 321.791] },
];

function expectCusps(actual: number[], expected: number[]) {
  expected.forEach((e, i) => {
    const d = Math.abs(((actual[i] - e + 540) % 360) - 180);
    expect(d, `cusp ${i + 1}: ${actual[i].toFixed(3)} vs ${e}`).toBeLessThan(0.1);
  });
}

describe('Placidus houses', () => {
  for (const r of REFERENCE) {
    it(`matches Swiss Ephemeris for ${r.name}`, () => {
      const c = computeChart({ date: r.date, time: r.time, lat: r.lat, lon: r.lon, timeZone: r.tz });
      expect(c.houseSystem).toBe('placidus');
      expectCusps(c.houses!, r.cusps);
    });
  }

  it('falls back to whole sign houses above the polar circle', () => {
    const c = computeChart({ date: '2000-06-15', time: '03:30', lat: 78.22, lon: 15.65, timeZone: 'UTC' });
    expect(c.houseSystem).toBe('whole-sign');
    expect(c.houses).toHaveLength(12);
    expect(c.placements.every((p) => p.house !== null && p.house >= 1 && p.house <= 12)).toBe(true);
  });

  it('assigns every planet to the house whose cusps contain it', () => {
    const c = computeChart({ date: '1985-12-01', time: '22:15', lat: -33.8679, lon: 151.2073, timeZone: 'UTC' });
    for (const p of c.placements) {
      const start = c.houses![p.house! - 1];
      const end = c.houses![p.house! % 12];
      const span = (end - start + 360) % 360;
      expect((p.lon - start + 360) % 360).toBeLessThan(span);
    }
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
