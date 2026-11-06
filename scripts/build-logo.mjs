// Turns the ASTRONOMADS wordmark and the "A" monogram into vector paths, so the logo never depends on a font.
// Font: Cinzel 500 (SIL Open Font License 1.1), fetched from Google Fonts as TTF.
// Usage: node scripts/build-logo.mjs <path to Cinzel-500.ttf>
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/build-logo.mjs <Cinzel-500.ttf>');
  process.exit(1);
}
const font = opentype.parse(fs.readFileSync(file).buffer.slice(0));
const SIZE = 100; // em size in output units

function setText(text, tracking) {
  const glyphs = font.stringToGlyphs(text);
  const scale = SIZE / font.unitsPerEm;
  let x = 0;
  const parts = [];
  glyphs.forEach((g, i) => {
    parts.push(g.getPath(x, 0, SIZE));
    x += g.advanceWidth * scale + tracking * SIZE;
    const next = glyphs[i + 1];
    if (next) x += font.getKerningValue(g, next) * scale;
  });
  const p = new opentype.Path();
  for (const part of parts) p.extend(part);
  const box = p.getBoundingBox();
  // Move to origin so the bounding box starts at 0,0.
  const shifted = new opentype.Path();
  for (const c of p.commands) {
    const n = { ...c };
    for (const k of ['x', 'y', 'x1', 'y1', 'x2', 'y2']) {
      if (k in n) n[k] = k.startsWith('x') ? n[k] - box.x1 : n[k] - box.y1;
    }
    shifted.commands.push(n);
  }
  return { d: shifted.toPathData(2), width: +(box.x2 - box.x1).toFixed(2), height: +(box.y2 - box.y1).toFixed(2) };
}

const out = {
  font: 'Cinzel 500, SIL Open Font License 1.1',
  wordmark: setText('ASTRONOMADS', 0.04),
  monogram: setText('A', 0),
};
const dest = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'src', 'components', 'logo-paths.json');
fs.writeFileSync(dest, JSON.stringify(out, null, 1));
console.log('wordmark', out.wordmark.width, 'x', out.wordmark.height, '| monogram', out.monogram.width, 'x', out.monogram.height);
