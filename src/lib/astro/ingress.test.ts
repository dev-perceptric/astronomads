import { describe, expect, it } from 'vitest';
import { nextIngress, sunSeason, sunSignForDay } from './ingress';

const near = (a: Date, iso: string, minutes: number) => Math.abs(a.getTime() - new Date(iso).getTime()) <= minutes * 60e3;

describe('ingresses', () => {
  it('finds the March equinox (Sun into Aries) to the minute', () => {
    // Published equinox times (UTC): 2024-03-20 03:06, 2025-03-20 09:01, 2026-03-20 14:46.
    expect(near(sunSeason(0, 2024).start, '2024-03-20T03:06:00Z', 2)).toBe(true);
    expect(near(sunSeason(0, 2025).start, '2025-03-20T09:01:00Z', 2)).toBe(true);
    expect(near(sunSeason(0, 2026).start, '2026-03-20T14:46:00Z', 2)).toBe(true);
  });

  it('ends a season where the next one starts', () => {
    const s = sunSeason(0, 2027);
    expect(s.end.getTime()).toBe(sunSeason(1, 2027).start.getTime());
    expect(s.end.getUTCMonth()).toBe(3); // April
  });

  it('finds the next Moon ingress within a few days', () => {
    const t = nextIngress('Moon', 0, new Date('2027-01-01T00:00:00Z'))!;
    expect(t.getTime() - Date.UTC(2027, 0, 1)).toBeLessThan(28 * 86400e3);
  });
});

describe('sunSignForDay', () => {
  it('is certain away from a cusp', () => {
    expect(sunSignForDay('1990-04-05')).toMatchObject({ certain: true, sign: 0 });
    expect(sunSignForDay('1961-08-04')).toMatchObject({ certain: true, sign: 4 });
  });

  it('asks for the time on a cusp day', () => {
    const r = sunSignForDay('2026-03-20');
    expect(r.certain).toBe(false);
    if (!r.certain) {
      expect([r.from, r.to]).toEqual([11, 0]);
      expect(near(r.ingress, '2026-03-20T14:46:00Z', 2)).toBe(true);
    }
  });
});
