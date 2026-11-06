import { describe, expect, it } from 'vitest';
import { computeChart } from './chart';
import { THEMES, pairKey, synastry } from './synastry';
import { transitsAt, weekAhead } from './transits';

const obama = computeChart({ date: '1961-08-04', time: '19:24', lat: 21.3069, lon: -157.8583, timeZone: 'Pacific/Honolulu' });
const michelle = computeChart({ date: '1964-01-17', time: null, lat: 41.8781, lon: -87.6298, timeZone: 'America/Chicago' });

describe('synastry', () => {
  it('finds cross-chart contacts and gives every theme a score from 8 to 97', () => {
    const r = synastry(obama, michelle);
    expect(r.contacts.length).toBeGreaterThan(5);
    for (const c of r.contacts) expect(c.key).toBe(pairKey(c.a, c.b));
    for (const t of THEMES) {
      expect(r.scores[t]).toBeGreaterThanOrEqual(8);
      expect(r.scores[t]).toBeLessThanOrEqual(97);
    }
  });

  it('is symmetric: swapping the two people gives the same scores', () => {
    expect(synastry(obama, michelle).scores).toEqual(synastry(michelle, obama).scores);
  });

  it('a chart with itself scores high', () => {
    expect(synastry(obama, obama).overall).toBeGreaterThan(70);
  });
});

describe('transits', () => {
  it('lists close transits, most important first', () => {
    const list = transitsAt(obama, new Date('2026-11-06T12:00:00Z'));
    for (let i = 1; i < list.length; i++) expect(list[i - 1].weight).toBeGreaterThanOrEqual(list[i].weight);
    for (const t of list) expect(t.orb).toBeLessThanOrEqual(4);
  });

  it('finds the transit when a planet sits exactly on a natal point', () => {
    // On 2026-11-06 the Sun is near 14° Scorpio; Obama's Sun is 12°33' Leo: a square within orb.
    const list = transitsAt(obama, new Date('2026-11-06T12:00:00Z'));
    expect(list.some((t) => t.transit === 'sun' && t.natal === 'sun' && t.def.kind === 'square')).toBe(true);
  });

  it('builds a week ahead without the Moon or slow planets', () => {
    const week = weekAhead(obama, new Date('2026-11-06T12:00:00Z'));
    for (const t of week) expect(['sun', 'mercury', 'venus', 'mars']).toContain(t.transit);
  });
});
