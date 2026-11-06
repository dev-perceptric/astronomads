// Gives every written sign (a file in src/lib/zodiac/copy/) its own plain page folder:
// src/app/(site)/zodiac/<sign>/page.tsx. Plain folders because Hostinger can't serve scripts
// from [bracket] folders. Run after adding a sign's copy: node scripts/sign-pages.mjs
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const copyDir = path.join(root, 'src/lib/zodiac/copy');
const signs = readdirSync(copyDir)
  .map((f) => f.replace(/\.ts$/, ''))
  .filter((s) => !['index', 'types'].includes(s));

for (const sign of signs) {
  const dir = path.join(root, 'src/app/(site)/zodiac', sign);
  const file = path.join(dir, 'page.tsx');
  if (existsSync(file)) continue;
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    file,
    `import SignPage, { signMetadata } from '../_sign/SignPage';

// Built once at deploy time; the live parts update in the browser.
export const dynamic = 'force-static';
export const metadata = signMetadata('${sign}');

export default function Page() {
  return <SignPage slug="${sign}" />;
}
`,
  );
  console.log('made', path.relative(root, file));
}

// The index of written signs, in zodiac order.
const ORDER = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
const written = ORDER.filter((s) => signs.includes(s));
writeFileSync(
  path.join(copyDir, 'index.ts'),
  `import type { SignKey } from '@/components/Glyph';
${written.map((s) => `import { ${s.toUpperCase()} } from './${s}';`).join('\n')}
import type { SignCopy } from './types';

/** Signs whose page is written. Made by scripts/sign-pages.mjs; pages are built only for these. */
export const SIGN_COPY: Partial<Record<SignKey, SignCopy>> = { ${written.map((s) => `${s}: ${s.toUpperCase()}`).join(', ')} };
export type { SignCopy };
`,
);
console.log('index lists', written.length, 'signs');
