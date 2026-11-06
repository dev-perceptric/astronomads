import { describe, expect, it } from 'vitest';
import { chartAt, computeChart, eclipticLongitude } from './chart';
import { localToUtc } from './time';
import { addDays, lunarReturns, planetaryDay, progressedTimeline, progressions, retrogrades, risingTimeline, saturnReturns, signForDay, solarReturn, stations } from './timing';

const sep = (a: number, b: number) => Math.abs(((a - b + 540) % 360) - 180);
const OBAMA = { date: '1961-08-04', time: '19:24', lat: 21.3069, lon: -157.8583, timeZone: 'Pacific/Honolulu' };
const days = (a: Date, b: Date) => Math.abs(a.getTime() - b.getTime()) / 86400e3;

describe('timing', () => {
  it('finds the 2026 Mercury retrograde stations', () => {
    const list = stations('mercury', new Date(Date.UTC(2026, 0, 1)), new Date(Date.UTC(2027, 0, 1)));
    const retro = list.filter((s) => s.kind === 'retrograde').map((s) => s.date);
    const direct = list.filter((s) => s.kind === 'direct').map((s) => s.date);
    // Published dates: 26 Feb, 29 Jun, 24 Oct retrograde; 20 Mar, 23 Jul, 13 Nov direct (UTC, within a day)
    expect(retro).toHaveLength(3);
    expect(days(retro[0], new Date(Date.UTC(2026, 1, 26)))).toBeLessThan(1.5);
    expect(days(retro[1], new Date(Date.UTC(2026, 5, 29)))).toBeLessThan(1.5);
    expect(days(retro[2], new Date(Date.UTC(2026, 9, 24)))).toBeLessThan(1.5);
    expect(days(direct[0], new Date(Date.UTC(2026, 2, 20)))).toBeLessThan(1.5);
    expect(days(direct[1], new Date(Date.UTC(2026, 6, 23)))).toBeLessThan(1.5);
    expect(days(direct[2], new Date(Date.UTC(2026, 10, 13)))).toBeLessThan(1.5);
  });

  it('puts the shadow around each retrograde', () => {
    const [r] = retrogrades('mercury', new Date(Date.UTC(2026, 1, 1)), new Date(Date.UTC(2026, 2, 1)));
    expect(r.preShadow!.getTime()).toBeLessThan(r.start.date.getTime());
    expect(r.postShadow!.getTime()).toBeGreaterThan(r.end.date.getTime());
    expect(sep(eclipticLongitude('Mercury', r.preShadow!), r.end.lon)).toBeLessThan(0.01);
    expect(sep(eclipticLongitude('Mercury', r.postShadow!), r.start.lon)).toBeLessThan(0.01);
  });

  it('finds the solar return within the birthday and to the second of arc', () => {
    const natal = computeChart(OBAMA);
    const sun = natal.placements.find((p) => p.body === 'sun')!.lon;
    const sr = solarReturn(sun, natal.utc, 2025);
    expect(sep(eclipticLongitude('Sun', sr), sun)).toBeLessThan(0.001);
    expect(days(sr, new Date(Date.UTC(2025, 7, 5, 5)))).toBeLessThan(1.5);
  });

  it('finds 13 lunar returns about 27.3 days apart', () => {
    const natal = computeChart(OBAMA);
    const moon = natal.placements.find((p) => p.body === 'moon')!.lon;
    const list = lunarReturns(moon, new Date(Date.UTC(2026, 0, 1)));
    expect(list).toHaveLength(13);
    for (const d of list) expect(sep(eclipticLongitude('Moon', d), moon)).toBeLessThan(0.001);
    for (let i = 1; i < list.length; i++) expect(days(list[i], list[i - 1])).toBeGreaterThan(26.5);
  });

  it('finds Saturn returns near ages 29, 58 and 88 with one or three passes', () => {
    const natal = computeChart(OBAMA);
    const sat = natal.placements.find((p) => p.body === 'saturn')!.lon;
    const list = saturnReturns(sat, natal.utc);
    expect(list.length).toBe(3);
    const age = (d: Date) => (d.getTime() - natal.utc.getTime()) / (365.2422 * 86400e3);
    expect(age(list[0].passes[0])).toBeGreaterThan(27);
    expect(age(list[0].passes[0])).toBeLessThan(31);
    expect(age(list[1].passes[0])).toBeGreaterThan(56);
    expect(age(list[1].passes[0])).toBeLessThan(61);
    for (const r of list) {
      expect([1, 3]).toContain(r.passes.length);
      for (const p of r.passes) expect(sep(eclipticLongitude('Saturn', p), sat)).toBeLessThan(0.001);
      expect(r.enters!.getTime()).toBeLessThanOrEqual(r.passes[0].getTime());
      expect(r.leaves!.getTime()).toBeGreaterThanOrEqual(r.passes[r.passes.length - 1].getTime());
    }
  });

  it('progresses one day for each year of life', () => {
    const natal = computeChart(OBAMA);
    const sun = natal.placements.find((p) => p.body === 'sun')!.lon;
    const at30 = new Date(natal.utc.getTime() + 30 * 365.2422 * 86400e3);
    const p = progressions(natal.utc, sun, natal.mc, OBAMA.lat, at30);
    expect(days(p.moment, natal.utc)).toBeCloseTo(30, 3);
    const pSun = p.positions.find((x) => x.body === 'sun')!.lon;
    expect(sep(pSun, sun)).toBeGreaterThan(27);
    expect(sep(pSun, sun)).toBeLessThan(31);
    // Solar arc: the Midheaven moves exactly as far as the progressed Sun.
    expect(sep(p.mc! - natal.mc!, pSun - sun)).toBeLessThan(1e-6);
    expect(p.phaseStart.getTime()).toBeLessThanOrEqual(at30.getTime());
    expect(p.phaseEnd.getTime()).toBeGreaterThanOrEqual(at30.getTime());
    const tl = progressedTimeline(natal.utc, 90);
    expect(tl.moon.length).toBeGreaterThan(30);
    expect(tl.sun.length).toBeGreaterThanOrEqual(2);
    expect(tl.phases.length).toBeGreaterThan(20);
  });

  it('gives the Moon sign on a day, or both signs when it changed', () => {
    const r = signForDay('Moon', '2000-01-01');
    if (r.certain) expect(r.sign).toBeGreaterThanOrEqual(0);
    else expect(r.to).toBe((r.from + 1) % 12);
    let changes = 0;
    let wide = 0;
    for (let i = 0; i < 30; i++) {
      if (!signForDay('Moon', addDays('2024-01-01', i), 'Europe/London').certain) changes++;
      if (!signForDay('Moon', addDays('2024-01-01', i)).certain) wide++;
    }
    // The Moon changes sign about 11 times a month; a day with no known place spans 50 hours.
    expect(changes).toBeGreaterThanOrEqual(9);
    expect(changes).toBeLessThanOrEqual(13);
    expect(wide).toBeGreaterThan(changes);
  });

  it('splits day and night into planetary hours from real sunrise and sunset', () => {
    const d = planetaryDay('2024-06-21', 51.5074, -0.1278, 'Europe/London')!;
    const local = (x: Date) => x.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });
    expect(local(d.sunrise) >= '04:40' && local(d.sunrise) <= '04:46').toBe(true);
    expect(local(d.sunset) >= '21:18' && local(d.sunset) <= '21:24').toBe(true);
    expect(d.ruler).toBe('venus'); // Friday
    expect(d.hours[0].planet).toBe('venus');
    expect(d.hours[1].planet).toBe('mercury');
    expect(d.hours).toHaveLength(24);
    expect(d.hours[23].end.getTime()).toBeCloseTo(d.nextSunrise.getTime(), -3);
    // The next day's first hour follows on in the Chaldean order: Saturday is Saturn.
    expect(planetaryDay('2024-06-22', 51.5074, -0.1278, 'Europe/London')!.hours[0].planet).toBe('saturn');
    expect(planetaryDay('2024-06-21', 78.22, 15.65, 'Arctic/Longyearbyen')).toBeNull();
  });

  it('covers a whole day of rising signs', () => {
    const tl = risingTimeline('1961-08-04', OBAMA.lat, OBAMA.lon, OBAMA.timeZone);
    expect(tl.length).toBeGreaterThanOrEqual(12);
    const at = localToUtc('1961-08-04', '19:24', OBAMA.timeZone);
    const seg = tl.find((x) => x.start <= at && x.end > at)!;
    const natal = chartAt(at, OBAMA.lat, OBAMA.lon);
    expect(seg.sign).toBe(Math.floor(natal.asc! / 30));
  });
});
