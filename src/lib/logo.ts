/**
 * The Astronomads logo, drawn as SVG markup from vector paths (no font needed).
 *
 * - Wordmark: ASTRONOMADS in carved Roman capitals. Each letter is solid, with a thin line in the
 *   ground color cut just inside its strokes, like letters carved in marble.
 * - Symbol: a carved Roman "A" inside an orbit ring, with a four-point star traveling on the ring.
 * - Lockup: symbol and wordmark side by side.
 * - Icon: the symbol on a solid ground, without the cut, for favicons and app icons.
 */
export type LogoPaths = {
  wordmark: { d: string; width: number; height: number };
  monogram: { d: string; width: number; height: number };
};

export type LogoKind = 'wordmark' | 'symbol' | 'lockup' | 'icon';

export type LogoOptions = {
  fg?: string; // letter and ring color
  ground?: string; // color behind the logo, used for the carved cut and the ring gap
  accent?: string; // star color, defaults to fg
  cut?: boolean; // carved inline cut; turn off below about 24px
  title?: string;
};

const SYMBOL = 120; // symbol box size
const CUT_SHIFT = 2.8; // carved line offset, in em/100 units
const CUT_WIDTH = 1.2;

function carved(d: string, fg: string, ground: string, cut: boolean, tx: number, ty: number, s: number): string {
  const line = cut
    ? `<path d="${d}" fill="none" stroke="${ground}" stroke-width="${CUT_WIDTH}" stroke-linejoin="round" transform="translate(${CUT_SHIFT} 0)"/>`
    : '';
  return `<g transform="translate(${r(tx)} ${r(ty)}) scale(${r(s, 4)})"><path d="${d}" fill="${fg}"/>${line}</g>`;
}

const r = (n: number, p = 2) => +n.toFixed(p);

/** Symbol drawn in a 120 × 120 box at (x, y), scaled by s. */
function symbol(P: LogoPaths, fg: string, ground: string, accent: string, cut: boolean, x: number, y: number, s: number, ringWidth = 2.6): string {
  const c = SYMBOL / 2;
  const ring = 51;
  // Monogram: optically centered, sitting slightly low inside the ring.
  const h = 56;
  const ms = h / P.monogram.height;
  const mw = P.monogram.width * ms;
  const mono = carved(P.monogram.d, fg, ground, cut, c - mw / 2, c - h / 2 + 2, ms);
  // Star on the ring at the upper right, with a gap in the ring behind it.
  const a = (-48 * Math.PI) / 180;
  const sx = c + ring * Math.cos(a);
  const sy = c + ring * Math.sin(a);
  const k = 11; // star radius
  const w = 2.6; // star waist
  const star = [
    [0, -k], [w, -w], [k, 0], [w, w], [0, k], [-w, w], [-k, 0], [-w, -w],
  ]
    .map(([px, py], i) => `${i ? 'L' : 'M'}${r(sx + px)} ${r(sy + py)}`)
    .join(' ');
  return `<g transform="translate(${r(x)} ${r(y)}) scale(${r(s, 4)})">
<circle cx="${c}" cy="${c}" r="${ring}" fill="none" stroke="${fg}" stroke-width="${ringWidth}"/>
<circle cx="${r(sx)}" cy="${r(sy)}" r="9" fill="${ground}"/>
<path d="${star} Z" fill="${accent}"/>
${mono}
</g>`;
}

export function logoSvg(P: LogoPaths, kind: LogoKind, opts: LogoOptions = {}): string {
  const fg = opts.fg ?? '#FFFFFF';
  const ground = opts.ground ?? '#000000';
  const accent = opts.accent ?? fg;
  const cut = opts.cut ?? true;
  const title = opts.title ?? 'Astronomads';
  const pad = CUT_SHIFT + 2;
  let w: number;
  let h: number;
  let body: string;

  if (kind === 'wordmark') {
    w = P.wordmark.width + pad;
    h = P.wordmark.height;
    body = carved(P.wordmark.d, fg, ground, cut, 0, 0, 1);
  } else if (kind === 'symbol') {
    w = SYMBOL;
    h = SYMBOL;
    body = symbol(P, fg, ground, accent, cut, 0, 0, 1);
  } else if (kind === 'lockup') {
    const size = P.wordmark.height * 1.55;
    const gap = size * 0.24;
    w = size + gap + P.wordmark.width + pad;
    h = size;
    body = symbol(P, fg, ground, accent, cut, 0, 0, size / SYMBOL) + carved(P.wordmark.d, fg, ground, cut, size + gap, (size - P.wordmark.height) / 2, 1);
  } else {
    // App icon: solid ground, heavier ring, no cut, a little inset.
    w = SYMBOL;
    h = SYMBOL;
    body = `<rect width="${SYMBOL}" height="${SYMBOL}" rx="26" fill="${ground}"/>` + symbol(P, fg, ground, accent, false, 8, 8, (SYMBOL - 16) / SYMBOL, 4);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>`;
}
