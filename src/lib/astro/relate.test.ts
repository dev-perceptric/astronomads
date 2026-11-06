import { describe, expect, it } from 'vitest';
import { computeChart, eclipticLongitude, positionsAt } from './chart';
import { bestDates, composite, davison, exactHits, midpoint, overlays, relate } from './relate';
import { synastry } from './synastry';

const sep = (a: number, b: number) => Math.abs(((a - b + 540) % 360) - 180);
const OBAMA = { date: '1961-08-04', time: '19:24', lat: 21.3069, lon: -157.8583, timeZone: 'Pacific/Honolulu' };
const LONDON = { date: '1990-03-15', time: '08:30', lat: 51.5074, lon: -0.1278, timeZone: 'Europe/London' };

describe('two charts', () => {
  const a = computeChart(OBAMA);
  const b = computeChart(LONDON);

  it('takes the midpoint along the shorter arc', () => {
    expect(midpoint(10, 30)).toBeCloseTo(20);
    expect(midpoint(350, 10)).toBeCloseTo(0);
    expect(midpoint(10, 350)).toBeCloseTo(0);
    expect(midpoint(100, 280)).toBeCloseTo(190);
  });

  it('matches love compatibility exactly in love mode', () => {
    const love = relate(a.placements, b.placements, 'love');
    const old = synastry(a, b);
    expect(love.scores).toEqual(old.scores);
    expect(love.overall).toBe(old.overall);
  });

  it('scores friendship, work and family on the same scale', () => {
    for (const mode of ['friend', 'work', 'family'] as const) {
      const r = relate(a.placements, b.placements, mode);
      expect(Object.keys(r.scores)).toHaveLength(5);
      for (const v of Object.values(r.scores)) {
        expect(v).toBeGreaterThanOrEqual(8);
        expect(v).toBeLessThanOrEqual(97);
      }
    }
  });

  it('builds the composite from midpoints with the Midheaven above the horizon', () => {
    const c = composite(a, b, OBAMA.lat, LONDON.lat);
    for (const p of c.placements) {
      const pa = a.placements.find((x) => x.body === p.body)!.lon;
      const pb = b.placements.find((x) => x.body === p.body)!.lon;
      expect(sep(p.lon, pa)).toBeCloseTo(sep(p.lon, pb), 6);
      expect(sep(p.lon, pa)).toBeLessThanOrEqual(90);
    }
    expect(c.houses).toHaveLength(12);
    expect(sep(c.houses![9], c.mc!)).toBeLessThan(0.01);
    expect(sep(c.houses![0], c.asc!)).toBeLessThan(0.01);
    const d = (((c.asc! - c.mc!) % 360) + 360) % 360;
    expect(d).toBeLessThan(180);
  });

  it('casts the Davison chart halfway in time and place', () => {
    const d = davison(a, b, OBAMA, LONDON);
    expect(d.utc.getTime()).toBe((a.utc.getTime() + b.utc.getTime()) / 2);
    expect(d.lat).toBeCloseTo((OBAMA.lat + LONDON.lat) / 2);
    expect(d.chart.placements.find((p) => p.body === 'sun')!.lon).toBeCloseTo(positionsAt(d.utc).find((p) => p.body === 'sun')!.lon, 6);
    // Honolulu and London are closer going west across the Pacific and America: halfway lands in North America.
    expect(d.lon).toBeLessThan(-60);
    expect(d.lon).toBeGreaterThan(-100);
  });

  it('puts each planet in one of the other chart’s houses', () => {
    const o = overlays(a, b);
    expect(o).toHaveLength(10);
    for (const x of o) expect(x.house).toBeGreaterThanOrEqual(1);
  });

  it('finds exact slow aspects to the minute of arc', () => {
    const from = new Date(Date.UTC(2026, 0, 1));
    const to = new Date(Date.UTC(2027, 0, 1));
    const hits = exactHits(['jupiter', 'saturn'], [{ key: 'x', lon: 100 }], from, to);
    expect(hits.length).toBeGreaterThan(0);
    for (const h of hits) {
      const lon = eclipticLongitude(h.mover === 'jupiter' ? 'Jupiter' : 'Saturn', h.date);
      expect(Math.abs(sep(lon, 100) - h.def.angle)).toBeLessThan(0.02);
    }
  });

  it('scores 90 days and labels each one', () => {
    const days = bestDates(a, b, new Date(Date.UTC(2026, 10, 1)));
    expect(days).toHaveLength(90);
    expect(new Set(days.map((d) => d.kind)).size).toBeGreaterThan(2);
  });
});
