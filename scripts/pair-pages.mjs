// Gives every written sign pairing (a file in src/lib/compat/pairs/) its own plain page folder:
// src/app/(site)/compatibility/<a>-and-<b>/page.tsx. Plain folders because Hostinger can't serve
// scripts from [bracket] folders. Run after adding a pair's copy: node scripts/pair-pages.mjs
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const copyDir = path.join(root, 'src/lib/compat/pairs');
const ORDER = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
const all = ORDER.flatMap((a, i) => ORDER.slice(i).map((b) => `${a}-${b}`));
const files = new Set(readdirSync(copyDir).map((f) => f.replace(/\.ts$/, '')));
const written = all.filter((p) => files.has(p));

for (const pair of written) {
  const [a, b] = pair.split('-');
  const dir = path.join(root, 'src/app/(site)/compatibility', `${a}-and-${b}`);
  const file = path.join(dir, 'page.tsx');
  if (existsSync(file)) continue;
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    file,
    `import { PAIR } from '@/lib/compat/pairs/${pair}';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('${a}', '${b}', PAIR);

export default function Page() {
  return <PairPage a="${a}" b="${b}" copy={PAIR} />;
}
`,
  );
  console.log('made', path.relative(root, file));
}

writeFileSync(
  path.join(copyDir, 'index.ts'),
  `/** Sign pairings whose page is written, in zodiac order. Made by scripts/pair-pages.mjs. */
export const PAIRS_WRITTEN: string[] = ${JSON.stringify(written)};
`,
);
console.log('index lists', written.length, 'pairs');
