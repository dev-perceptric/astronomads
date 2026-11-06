// Writes the logo files to public/brand and the favicon to src/app/icon.svg.
// Usage: node scripts/write-logo-files.ts  (Node 22.18+ runs TypeScript directly)
import fs from 'node:fs';
import path from 'node:path';
import { logoSvg, type LogoPaths } from '../src/lib/logo.ts';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const P: LogoPaths = JSON.parse(fs.readFileSync(path.join(root, 'src/components/logo-paths.json'), 'utf8'));
const out = path.join(root, 'public/brand');
fs.mkdirSync(out, { recursive: true });

const ASTRAL = '#6A62F7';
const files: [string, string][] = [
  ['wordmark-white.svg', logoSvg(P, 'wordmark', { fg: '#FFFFFF', ground: '#000000' })],
  ['wordmark-black.svg', logoSvg(P, 'wordmark', { fg: '#000000', ground: '#FFFFFF' })],
  ['symbol-white.svg', logoSvg(P, 'symbol', { fg: '#FFFFFF', ground: '#000000', accent: ASTRAL })],
  ['symbol-black.svg', logoSvg(P, 'symbol', { fg: '#000000', ground: '#FFFFFF', accent: ASTRAL })],
  ['lockup-white.svg', logoSvg(P, 'lockup', { fg: '#FFFFFF', ground: '#000000', accent: ASTRAL })],
  ['lockup-black.svg', logoSvg(P, 'lockup', { fg: '#000000', ground: '#FFFFFF', accent: ASTRAL })],
  ['icon.svg', logoSvg(P, 'icon', { fg: '#FFFFFF', ground: '#000000', accent: ASTRAL })],
];
for (const [name, svg] of files) fs.writeFileSync(path.join(out, name), svg);
fs.writeFileSync(path.join(root, 'src/app/icon.svg'), logoSvg(P, 'icon', { fg: '#FFFFFF', ground: '#000000', accent: ASTRAL }));
console.log(`Wrote ${files.length} files to public/brand and src/app/icon.svg`);
