import { ELEMENT_COLORS, SIGNS } from './constants';

export type SignSpot = { key: string; lon: number; size: number; color: string };

/** Full size of a sign symbol in the wheel, and the space it keeps from any line. */
export const SIGN_SYMBOL = { full: 38, min: 24, gap: 5 };

/** Degrees of clearance a symbol of this size needs at this radius, from its center to any line. */
export const clearanceNeeded = (size: number, radius: number) => ((size / 2 + SIGN_SYMBOL.gap) / radius) * (180 / Math.PI);

/** Shortest angular distance from a longitude to any of the lines. */
export const distanceToLines = (lon: number, lines: number[]) => {
  let min = Infinity;
  for (const l of lines) {
    const d = Math.abs(((lon - l + 540) % 360) - 180);
    if (d < min) min = d;
  }
  return min;
};

/**
 * Places each sign symbol inside its 30° slot at the point farthest from any line crossing the ring
 * (house cusps and the four angles). Prefers the middle of the sign when it is clear, and shrinks the
 * symbol only when no spot in the sign can hold it at full size. No line ever touches a symbol.
 */
export function placeSignSymbols(lines: number[], radius: number): SignSpot[] {
  const { full, min } = SIGN_SYMBOL;
  return SIGNS.map((sign, i) => {
    const start = i * 30;
    const edge = clearanceNeeded(full, radius) * 0.55;
    let best = start + 15;
    let bestScore = -Infinity;
    // Search outward from the middle, so a clear middle always wins exactly.
    const candidates: number[] = [start + 15];
    for (let step = 0.25; step <= 15 - edge; step += 0.25) candidates.push(start + 15 - step, start + 15 + step);
    for (const lon of candidates) {
      const clear = distanceToLines(lon, lines);
      const score = clear >= clearanceNeeded(full, radius) ? 1000 - Math.abs(lon - (start + 15)) : clear;
      if (score > bestScore) {
        bestScore = score;
        best = lon;
      }
    }
    const clear = distanceToLines(best, lines);
    let size = full;
    if (clear < clearanceNeeded(full, radius)) {
      // Largest size whose clearance fits the space available.
      size = Math.max(min, ((clear * Math.PI) / 180) * radius * 2 - SIGN_SYMBOL.gap * 2);
    }
    return { key: sign.key, lon: best, size, color: ELEMENT_COLORS[sign.element] };
  });
}
