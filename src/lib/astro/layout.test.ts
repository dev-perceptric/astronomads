import { describe, expect, it } from 'vitest';
import { computeChart } from './chart';
import { clearanceNeeded, distanceToLines, placeSignSymbols, SIGN_SYMBOL } from './layout';

const RADIUS = 216; // middle of the wheel's sign ring

function linesOf(c: ReturnType<typeof computeChart>) {
  const lines = [...(c.houses ?? [])];
  if (c.asc !== null && c.mc !== null) lines.push(c.asc, (c.asc + 180) % 360, c.mc, (c.mc + 180) % 360);
  return lines;
}

describe('sign symbols in the wheel', () => {
  // 600 charts across latitudes from 60°S to 66°N and every hour of the day, including bunched Placidus cusps.
  const charts: ReturnType<typeof computeChart>[] = [];
  for (let lat = -60; lat <= 66; lat += 6) {
    for (let h = 0; h < 24; h += 1) {
      const day = String(1 + ((lat + 60) % 28)).padStart(2, '0');
      charts.push(computeChart({ date: `1990-06-${day}`, time: `${String(h).padStart(2, '0')}:20`, lat, lon: lat * 2, timeZone: 'UTC' }));
    }
  }

  it('never lets a house or axis line touch a full-size symbol', () => {
    for (const c of charts) {
      const lines = linesOf(c);
      for (const spot of placeSignSymbols(lines, RADIUS)) {
        if (spot.size === SIGN_SYMBOL.full) expect(distanceToLines(spot.lon, lines)).toBeGreaterThanOrEqual(clearanceNeeded(spot.size, RADIUS) - 1e-9);
      }
    }
  });

  it('keeps every symbol inside its own sign', () => {
    for (const c of charts) {
      placeSignSymbols(linesOf(c), RADIUS).forEach((spot, i) => {
        expect(spot.lon).toBeGreaterThan(i * 30);
        expect(spot.lon).toBeLessThan(i * 30 + 30);
      });
    }
  });

  it('only shrinks a symbol when lines leave no room, and then clears them', () => {
    let shrunk = 0;
    for (const c of charts) {
      const lines = linesOf(c);
      for (const spot of placeSignSymbols(lines, RADIUS)) {
        if (spot.size < SIGN_SYMBOL.full) {
          shrunk++;
          expect(spot.size).toBeGreaterThanOrEqual(SIGN_SYMBOL.min);
          if (spot.size > SIGN_SYMBOL.min) expect(distanceToLines(spot.lon, lines)).toBeGreaterThanOrEqual(clearanceNeeded(spot.size, RADIUS) - 0.01);
        }
      }
    }
    expect(shrunk).toBeLessThan(charts.length * 12 * 0.1);
  });

  it('keeps the symbol in the middle of its sign when nothing is in the way', () => {
    const spots = placeSignSymbols([], RADIUS);
    spots.forEach((spot, i) => expect(spot.lon).toBe(i * 30 + 15));
  });
});
